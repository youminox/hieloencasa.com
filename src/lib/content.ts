import fs from "node:fs";
import path from "node:path";
import categories from "@/data/categories.json";
import keywordMap from "@/data/keyword_map.json";

export const SITE_URL = "https://hieloencasa.com";
export const SITE_NAME = "HieloEnCasa.com";
export const LEGAL_OWNER = "CARLOS LINGAN BORJA";
export const LEGAL_LOCATION = "Lima, Perú";
export const LEGAL_EMAIL = "info@charlielingan.com";
export const LEGAL_LINE =
  "Titular del sitio web: CARLOS LINGAN BORJA, domiciliado en Lima, Perú · Correo electrónico: info@charlielingan.com";
export const ICE_DISCLAIMER =
  "las marcas comerciales mencionadas (Amazon, GE Profile, Opal, Frigidaire, EUHOMY, Silonn, IGLOO, Luma Comfort, NewAir, Ecozy, Aeitto, KBice, COWSAR, CROWNFUL, AGLUCKY, Affresh, Brita, Stanley, Yeti, entre otras) pertenecen a sus respectivos propietarios; este portal ofrece guías comparativas independientes de máquinas de hielo de sobremesa según precio, capacidad, tamaño y nivel de ruido para uso diario o reuniones en casa, y participa en el Programa de Afiliados de Amazon";
export const PUBLISHED = "2026-11-24";
export const VERIFIED_LABEL = "24/11/2026";
export const CHAT_ENDPOINT =
  "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/hieloencasa-chat";

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "etiqueta" | "fabricante" | "aviso" | "tip";
      title?: string;
      text: string;
    }
  | { type: "steps"; items: { name: string; text: string }[] }
  | { type: "cta"; text: string };

export type Article = {
  slug: string;
  pillar: string;
  path: string;
  isPillar: boolean;
  isTransactional?: boolean;
  primaryKeyword: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  readingMinutes: number;
  image: { prompt: string; alt: string };
  blocks: Block[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
  imageUrl: string | null;
};

export type Category = (typeof categories)[number];

const DIR = path.join(process.cwd(), "src/content/articles");
const PUBLIC = path.join(process.cwd(), "public");
let cache: Article[] | null = null;

function isValidArticle(a: Partial<Article>): a is Article {
  return Boolean(
    a && a.slug && a.pillar && a.path && a.title && Array.isArray(a.blocks)
  );
}

const PILLAR_SCENE_POOLS: Record<string, string[]> = {
  "resenas-maquinas-de-hielo": [
    "cat-resenas-maquinas-de-hielo",
    "scene-resenas-2",
    "scene-resenas-3",
    "scene-resenas-4",
    "home-nugget-macro",
    "home-cubitos-bala",
    "home-cubo-cristalino",
  ],
  "comparativas-maquinas-de-hielo": [
    "cat-comparativas-maquinas-de-hielo",
    "scene-comparativas-2",
    "scene-comparativas-3",
    "scene-comparativas-4",
    "home-bajo-gabinete",
    "og-default",
  ],
  "mejores-maquinas-hielo-nugget": [
    "cat-mejores-maquinas-hielo-nugget",
    "scene-nugget-2",
    "scene-nugget-3",
    "scene-nugget-4",
    "home-nugget-macro",
    "home-uso-diario-cafe",
  ],
  "mejores-maquinas-cubitos-de-hielo": [
    "cat-mejores-maquinas-cubitos-de-hielo",
    "scene-cubitos-2",
    "scene-cubitos-3",
    "scene-cubitos-4",
    "home-cubitos-bala",
    "home-cubo-cristalino",
  ],
  "maquinas-por-uso-presupuesto-y-espacio": [
    "cat-maquinas-por-uso-presupuesto-y-espacio",
    "scene-uso-2",
    "scene-uso-3",
    "scene-uso-4",
    "home-uso-diario-cafe",
    "home-reuniones-fiesta",
  ],
  "cubitos-vs-hielo-nugget-y-tipos": [
    "cat-cubitos-vs-hielo-nugget-y-tipos",
    "scene-tipos-2",
    "scene-tipos-3",
    "scene-tipos-4",
    "home-nugget-macro",
    "home-cubo-cristalino",
  ],
  "capacidad-tamano-y-ubicacion-cocina": [
    "cat-capacidad-tamano-y-ubicacion-cocina",
    "scene-tamano-2",
    "scene-tamano-3",
    "scene-tamano-4",
    "home-bajo-gabinete",
    "home-hero-hielo",
  ],
  "ruido-consumo-electrico-y-funcionamiento": [
    "cat-ruido-consumo-electrico-y-funcionamiento",
    "scene-ruido-2",
    "scene-ruido-3",
    "scene-ruido-4",
    "home-silencio-oficina",
  ],
  "limpieza-descalcificacion-y-agua": [
    "cat-limpieza-descalcificacion-y-agua",
    "scene-limpieza-2",
    "scene-limpieza-3",
    "scene-limpieza-4",
    "home-autolimpieza-agua",
  ],
  "solucion-de-problemas-y-reparacion": [
    "cat-solucion-de-problemas-y-reparacion",
    "scene-fallas-2",
    "scene-fallas-3",
    "scene-fallas-4",
    "home-autolimpieza-agua",
  ],
  "uso-diario-bebidas-y-reuniones-en-casa": [
    "cat-uso-diario-bebidas-y-reuniones-en-casa",
    "scene-bebidas-2",
    "scene-bebidas-3",
    "scene-bebidas-4",
    "home-uso-diario-cafe",
    "home-reuniones-fiesta",
  ],
  "conservacion-hielo-y-accesorios": [
    "cat-conservacion-hielo-y-accesorios",
    "scene-accesorios-2",
    "scene-accesorios-3",
    "scene-accesorios-4",
    "home-reuniones-fiesta",
  ],
};

function resolveArticleImage(a: Article): string {
  const imgArt = path.join(PUBLIC, "img/articulos", `${a.slug}.webp`);
  if (fs.existsSync(imgArt)) {
    return `/img/articulos/${a.slug}.webp`;
  }
  const imgAmb = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
  return fs.existsSync(imgAmb)
    ? `/img/ambiente/cat-${a.pillar}.webp`
    : `/img/ambiente/og-default.webp`;
}

export function getAllContent(): Article[] {
  if (cache) return cache;
  const order = keywordMap.map((k: { path: string }) => k.path);
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    : [];
  const list: Article[] = [];
  const seen = new Set<string>();
  const pillarCountMap = new Map<string, number>();
  for (const f of files) {
    try {
      const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (!isValidArticle(a) || seen.has(a.path)) continue;
      seen.add(a.path);
      const imageUrl = resolveArticleImage(a);
      list.push({
        ...a,
        isPillar: Boolean(a.isPillar),
        isTransactional: Boolean(a.isTransactional),
        image:
          a.image && a.image.alt ? a.image : { prompt: "", alt: a.title },
        faqs: Array.isArray(a.faqs) ? a.faqs : [],
        related: Array.isArray(a.related) ? a.related : [],
        quickAnswer: a.quickAnswer || a.excerpt || "",
        excerpt: a.excerpt || a.metaDescription || "",
        seoTitle: a.seoTitle || a.title,
        metaDescription: a.metaDescription || a.excerpt || "",
        datePublished: a.datePublished || PUBLISHED,
        dateModified: a.dateModified || PUBLISHED,
        imageUrl,
      });
    } catch {
      // ignore invalid json during generation
    }
  }
  list.sort((x, y) => {
    const ix = order.indexOf(x.path);
    const iy = order.indexOf(y.path);
    if (ix === -1 && iy === -1) return x.path.localeCompare(y.path);
    if (ix === -1) return 1;
    if (iy === -1) return -1;
    return ix - iy;
  });
  cache = list;
  return list;
}

export const getCategories = (): Category[] => categories;
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getPillar = (slug: string) =>
  getAllContent().find((a) => a.isPillar && a.pillar === slug);
export const getArticle = (pillar: string, slug: string) =>
  getAllContent().find(
    (a) => !a.isPillar && a.pillar === pillar && a.slug === slug
  );
export const getArticlesIn = (pillar: string) =>
  getAllContent().filter((a) => !a.isPillar && a.pillar === pillar);
export const getByPath = (p: string) =>
  getAllContent().find((a) => a.path === p);

export function safeHref(p: string): string {
  if (getByPath(p)) return p;
  const pillar = p.split("/").filter(Boolean)[0];
  if (pillar && getCategory(pillar)) return `/${pillar}/`;
  return "/";
}

export function ambient(
  name: string,
  fallback = "/img/ambiente/home-hero-hielo.webp"
): string {
  const rel = `/img/ambiente/${name}.webp`;
  return fs.existsSync(path.join(PUBLIC, rel)) ? rel : fallback;
}

export const hasAmbient = (name: string) =>
  fs.existsSync(path.join(PUBLIC, `/img/ambiente/${name}.webp`));

export const OG_DEFAULT = () =>
  ambient("og-default", "/img/ambiente/home-hero-hielo.webp");

export function absolute(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function trimTitle(t: string) {
  return t.replace(/\s*\|\s*HieloEnCasa(?:\.com)?\s*$/i, "");
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@id": `${SITE_URL}/#carlos` },
  email: LEGAL_EMAIL,
  description:
    "Guía en español para elegir máquinas de hielo de sobremesa en Amazon Estados Unidos. Compara modelos de cubitos y de hielo tipo nugget según su precio, capacidad, tamaño y nivel de ruido para uso diario o reuniones en casa.",
};

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#carlos`,
  name: LEGAL_OWNER,
  email: LEGAL_EMAIL,
  jobTitle: "Fundador & Editor Jefe de HieloEnCasa.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  url: `${SITE_URL}/sobre-nosotros/`,
};
