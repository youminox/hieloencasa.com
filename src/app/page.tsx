import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import IceMechanismSvg from "@/components/home/IceMechanismSvg";
import IceCriteriaOrbit, {
  type OrbitItem,
} from "@/components/home/IceCriteriaOrbit";
import MetricsCounters, {
  type MetricItem,
} from "@/components/home/MetricsCounters";
import UsageModeSlider from "@/components/home/UsageModeSlider";
import MomentsCarousel, {
  type Moment,
} from "@/components/home/MomentsCarousel";
import IceMakerFinderBlock, {
  type IceMakerTier,
} from "@/components/home/IceMakerFinderBlock";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  ICE_DISCLAIMER,
  VERIFIED_LABEL,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "HieloEnCasa.com: Guía de Máquinas de Hielo de Sobremesa (Cubitos y Nugget) en Amazon EE. UU.",
  description:
    "Guía en español para elegir máquinas de hielo de sobremesa en Amazon Estados Unidos. Compara modelos de cubitos y de hielo tipo nugget según su precio, capacidad, tamaño y nivel de ruido para uso diario o reuniones en casa.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "HieloEnCasa.com: Comparativa de Máquinas de Hielo de Cubitos y Nugget en Amazon EE. UU.",
    description:
      "Compara máquinas de cubitos rápidos, cubo cristalino y hielo tipo nugget masticable por precio, lb/24h, tamaño bajo gabinete y decibelios.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Máquinas de hielo de sobremesa de cubitos y hielo tipo nugget en encimera de cocina",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Qué conviene más para casa: una máquina de cubitos o una de hielo tipo nugget?",
    a: "Depende de tu bebida y presupuesto. Las máquinas de cubitos tipo bala (como Silonn SLIM01 o EUHOMY 26 lb, entre US$69 y US$95) entregan 9 cubitos en solo 6 minutos y son ultrasilenciosas (<41 dB) para agua y refrescos diarios. Las máquinas de hielo tipo nugget (como EUHOMY Nugget, Frigidaire Gallery 44 lb o GE Profile Opal 2.0, de US$219 a US$629) fabrican pepitas porosas masticables ideales para iced coffee, vasos térmicos de 40 oz y smoothies. Y las de cubo cuadrado cristalino (EUHOMY 40 lb, ~US$149) son insuperables para cócteles, whisky y reuniones largas porque no aguan la bebida.",
  },
  {
    q: "¿Qué capacidad en libras por día (lb/24h) necesito para uso diario frente a reuniones en casa?",
    a: "Para el uso diario de 1 a 3 personas bastan 26 a 34 lb/24h (12 a 15 kg). Si recibes de 15 a 30 invitados en cenas, fiestas o barbacoas, conviene elegir un modelo de 38 a 45 lb/24h y además encenderlo el día previo para guardar 2 o 3 canastas en un contenedor hermético dentro del congelador.",
  },
  {
    q: "¿Caben las máquinas de hielo de sobremesa debajo de los gabinetes de cocina en Estados Unidos?",
    a: "Sí. En Estados Unidos la altura estándar entre la encimera y el gabinete superior es de 18 pulgadas (45.7 cm). Todos los modelos destacados en nuestras guías miden entre 11.4 y 16.5 pulgadas de altura. Recuerda dejar entre 4 y 6 pulgadas (10 a 15 cm) libres a los lados para ventilar el compresor.",
  },
  {
    q: "¿Cuánto ruido hacen en decibelios (dB) en una cocina abierta?",
    a: "Las máquinas compactas de cubitos bala emiten apenas 35 a 41 dB (similar a un refrigerador silencioso), salvo los 3 segundos en que caen los cubitos a la cesta. Las máquinas de hielo tipo nugget emiten entre 42 y 48 dB debido al motor extrusor interno; colocar una alfombrilla de silicona reduce cualquier vibración en la encimera.",
  },
  {
    q: "¿Mantienen congelado el hielo todo el día sin derretirse?",
    a: "La canasta interna cuenta con aislamiento térmico grueso pero no es un congelador a 0 °F: eso permite que el hielo no se pegue en un bloque duro. A medida que se derrite lentamente tras un par de horas, el agua fría cae al depósito inferior, se filtra y vuelve a convertirse automáticamente en hielo recién hecho.",
  },
  {
    q: "¿Qué agua debo usar y cada cuánto se limpia la máquina?",
    a: "Recomendamos agua potable filtrada (con jarra tipo Brita o filtro de refrigerador) para lograr hielo sin sabor a cloro y minimizar el sarro. Basta realizar un ciclo automático Self-Clean una vez cada 2 a 4 semanas con ácido cítrico alimentario o descalcificador seguro para níquel.",
  },
];

const CLAIMS = [
  "Cubitos en 6 Minutos",
  "Hielo Nugget Masticable",
  "Cubo Cuadrado Cristalino",
  "Bajo Gabinete <18 Pulgadas",
  "Ultrasilenciosas 35–45 dB",
  "26 a 55 lb por Día",
  "Sin Instalación de Plomería",
  "Precios en Amazon EE. UU.",
];

const CLAIMS_2 = [
  "GE Profile Opal 2.0 + Side Tank",
  "Frigidaire Gallery Nugget 44 lb",
  "EUHOMY Nugget Compacta",
  "Silonn SLIM01 26 lb (<US$90)",
  "EUHOMY 40 lb Clear Square LCD",
  "Luma Comfort Gourmet Ice",
  "Ideal Iced Coffee & Termos 40 oz",
  "Reuniones y Barbacoas en Casa",
];

const CAT_ICONS: Record<string, string> = {
  cube: "🧊",
  scale: "⚖️",
  sparkles: "✨",
  ice: "🥃",
  tag: "🏷️",
  layers: "🔬",
  ruler: "📏",
  volume: "🔇",
  droplet: "💧",
  wrench: "🛠️",
  party: "🥂",
  box: "📦",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const heroImg = ambient("home-hero-hielo");
  const homeAmz = getContextualAmazonProducts(
    "home",
    "resenas-maquinas-de-hielo",
    "Mejores Máquinas de Hielo de Sobremesa en Amazon EE. UU."
  );

  const orbit: OrbitItem[] = [
    {
      k: "nugget",
      name: "Hielo Tipo Nugget",
      img: null,
      icon: "🧊",
      role: "Pepitas aireadas, crujientes y fáciles de masticar",
      d: "Fabricado por extrusión comprimida con un 25–30 % de microbolsas de aire: absorbe el sabor del iced coffee, batidos y refrescos sin dañar los dientes.",
      href: safeHref(
        "/mejores-maquinas-hielo-nugget/mejores-maquinas-de-hielo-nugget-sobremesa-amazon/"
      ),
    },
    {
      k: "cubitos",
      name: "Cubitos Bala (6 Min)",
      img: null,
      icon: "⚡",
      role: "La opción más rápida, silenciosa y económica (<US$95)",
      d: "Entrega 9 cubitos huecos cada 6 a 8 minutos con dos tamaños (Small y Large), consumiendo apenas ~105 W en cocinas pequeñas, oficinas o campers.",
      href: safeHref(
        "/mejores-maquinas-cubitos-de-hielo/mejores-maquinas-de-cubitos-de-hielo-sobremesa-amazon/"
      ),
    },
    {
      k: "cristalino",
      name: "Cubo Cristalino",
      img: null,
      icon: "🥃",
      role: "24 cubos cuadrados transparentes por ciclo que no aguan",
      d: "Congelación pura sin burbujas de oxígeno que se derrite hasta 3 veces más lento: el favorito para reuniones en casa, cócteles y whisky.",
      href: safeHref(
        "/mejores-maquinas-cubitos-de-hielo/mejores-maquinas-cubos-cuadrados-cristalinos-transparentes/"
      ),
    },
    {
      k: "precio",
      name: "Precio en USD",
      img: null,
      icon: "💵",
      role: "Desde US$68 (Bala) hasta US$229–$629 (Nugget)",
      d: "Desglosamos exactamente qué obtienes en cada escalón de precio en Amazon EE. UU. y cuándo compensa dar el salto a tanque lateral o Wi‑Fi.",
      href: safeHref(
        "/comparativas-maquinas-de-hielo/maquina-hielo-100-dolares-vs-300-dolares-amazon/"
      ),
    },
    {
      k: "capacidad",
      name: "Capacidad lb/24h",
      img: null,
      icon: "⚖️",
      role: "26 lb para uso diario · 40–45 lb para fiestas",
      d: "Traducimos las libras nominales de fábrica a vasos reales por hora en tu cocina para que nunca te quedes sin hielo frente a tus invitados.",
      href: safeHref("/capacidad-tamano-y-ubicacion-cocina/"),
    },
    {
      k: "tamano",
      name: "Tamaño (<18\")",
      img: null,
      icon: "📏",
      role: "Altura libre bajo gabinetes estándar en EE. UU.",
      d: "Verificamos ancho, fondo, altura con tapa abierta y espacio de ventilación lateral (10–15 cm) para proteger tu encimera y el compresor.",
      href: safeHref(
        "/maquinas-por-uso-presupuesto-y-espacio/maquinas-de-hielo-bajo-gabinete-estandar-18-pulgadas-usa/"
      ),
    },
    {
      k: "ruido",
      name: "Ruido (35–47 dB)",
      img: null,
      icon: "🔇",
      role: "Confort acústico en cocinas abiertas y teletrabajo",
      d: "Comparamos decibelios medidos a 1 metro de distancia entre compresores silenciosos R600a y motores extrusores de hielo nugget.",
      href: safeHref("/ruido-consumo-electrico-y-funcionamiento/"),
    },
    {
      k: "limpieza",
      name: "Autolimpieza y Agua",
      img: null,
      icon: "💧",
      role: "Ciclo Self-Clean y prevención total de sarro",
      d: "Aprende qué agua usar y cómo descalcificar en 15 minutos con productos seguros para níquel evitando chirridos y malos sabores.",
      href: safeHref("/limpieza-descalcificacion-y-agua/"),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 1132,
      dec: 0,
      u: "guías",
      l: "800 Artículos SEO + 320 Transaccionales",
      pct: 100,
      note: "Arquitectura 0 % canibalización",
    },
    {
      v: 6,
      dec: 0,
      u: "min",
      l: "Primer lote en modelos rápidos de cubitos",
      pct: 94,
      note: "9 cubitos listos al instante",
    },
    {
      v: 44,
      dec: 0,
      u: "lb/24h",
      l: "Alta producción para reuniones en casa",
      pct: 92,
      note: "~85+ vasos fríos de 16 oz al día",
    },
    {
      v: 38,
      dec: 0,
      u: "dB",
      l: "Nivel sonoro en modelos ultrasilenciosos",
      pct: 88,
      note: "Ideal para cocina abierta y estudio",
    },
    {
      v: 16.5,
      dec: 1,
      u: "pulg",
      l: "Altura máxima bajo alacenas de 18\" en EE. UU.",
      pct: 95,
      note: "Encaje cómodo en encimera estándar",
    },
    {
      v: 69,
      dec: 0,
      u: "US$",
      l: "Precio desde el que arrancan las top ventas",
      pct: 90,
      note: "Envío rápido Prime en Amazon.com",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-uso-diario-cafe"),
      t: "Iced Coffee cada mañana",
      d: "Por qué el hielo tipo nugget masticable transforma tus lattes y cold brew en casa.",
      href: safeHref(
        "/mejores-maquinas-hielo-nugget/mejores-maquinas-hielo-nugget-para-iced-coffee-cafe-frio/"
      ),
      alt: "Espresso vertiéndose sobre hielo nugget en estación de café en casa",
    },
    {
      img: ambient("home-reuniones-fiesta"),
      t: "Reuniones y fiestas",
      d: "Máquinas de 40 a 45 lb/día que mantienen llenos los vasos de 20+ invitados.",
      href: safeHref(
        "/maquinas-por-uso-presupuesto-y-espacio/mejores-maquinas-de-hielo-para-reuniones-y-fiestas-en-casa/"
      ),
      alt: "Isla de cocina preparada con máquina de hielo y bebidas para invitados",
    },
    {
      img: ambient("home-cubitos-bala"),
      t: "9 cubitos en 6 minutos",
      d: "Las mejores máquinas portátiles por menos de US$95 en Amazon EE. UU.",
      href: safeHref(
        "/mejores-maquinas-cubitos-de-hielo/mejores-maquinas-cubitos-de-hielo-menos-de-100-dolares/"
      ),
      alt: "Máquina compacta negra de cubitos tipo bala con tapa abierta",
    },
    {
      img: ambient("home-cubo-cristalino"),
      t: "Whisky y cócteles puros",
      d: "Cubos cuadrados cristalinos sin burbujas que tardan el triple en derretirse.",
      href: safeHref(
        "/mejores-maquinas-cubitos-de-hielo/mejores-maquinas-cubos-cuadrados-cristalinos-transparentes/"
      ),
      alt: "Vaso de cristal con cubos cuadrados transparentes frente a máquina de hielo",
    },
    {
      img: ambient("home-bajo-gabinete"),
      t: "Bajo gabinetes de 18\"",
      d: "Medidas reales de altura, apertura de tapa y ventilación en cocinas de EE. UU.",
      href: safeHref(
        "/maquinas-por-uso-presupuesto-y-espacio/maquinas-de-hielo-bajo-gabinete-estandar-18-pulgadas-usa/"
      ),
      alt: "Máquina de hielo encajada bajo gabinete superior de cocina estadounidense",
    },
    {
      img: ambient("home-silencio-oficina"),
      t: "Silencio <42 dB",
      d: "Modelos ultrasilenciosos para apartamentos estudio, bebés y home office.",
      href: safeHref(
        "/maquinas-por-uso-presupuesto-y-espacio/maquinas-de-hielo-mas-silenciosas-para-teletrabajo-y-estudio/"
      ),
      alt: "Cocina abierta tranquila con máquina de hielo silenciosa",
    },
    {
      img: ambient("home-autolimpieza-agua"),
      t: "Autolimpieza en 15 min",
      d: "Cómo descalcificar sin olor a vinagre y qué agua usar para evitar sarro.",
      href: safeHref("/limpieza-descalcificacion-y-agua/"),
      alt: "Jarra de agua filtrada llenando máquina de hielo limpia",
    },
  ];

  const finderOptions: IceMakerTier[] = [
    {
      key: "nugget-compact",
      label: "🧊 Nugget Uso Diario (<US$270)",
      iceAndPrice: "Hielo Nugget Suave · ~US$219–$269",
      capacityAndSize: "34–40 lb/24h · 9.6\"×11.6\"×13.0\" (Ultracompacta)",
      noiseSpec: "42–45 dB · Autolimpieza 1 botón",
      img: ambient("home-nugget-macro"),
      alt: "Pala sirviendo hielo tipo nugget masticable fresco",
      idealFor:
        "Iced coffee diario, vasos térmicos de 40 oz y cocinas con poco espacio que quieren auténtico hielo masticable sin gastar US$600.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-hielo/euhomy-nugget-ice-maker-34lb-resena-opiniones-amazon/"
      ),
      productKey: "EUHOMY_NUGGET_34LB_COMPACT",
    },
    {
      key: "bullet-budget",
      label: "⚡ Cubitos Económica (<US$90)",
      iceAndPrice: "Cubitos Bala (S/L) · ~US$69–$95",
      capacityAndSize: "26 lb/24h (9 cubos en 6 min) · 8.7\"×11.4\"×11.6\"",
      noiseSpec: "35–41 dB (Ultrasilenciosa con asa)",
      img: ambient("home-cubitos-bala"),
      alt: "Máquina compacta de cubitos bala en 6 minutos",
      idealFor:
        "Uso diario económico de agua fría y refrescos, apartamentos pequeños, oficina o llevar a la terraza cuando llegan visitas.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-hielo/silonn-slim01-bullet-26lb-resena-opiniones-amazon/"
      ),
      productKey: "SILONN_SLIM01_BULLET_26LB",
    },
    {
      key: "clear-party",
      label: "🥂 Reuniones & Cócteles (40 lb)",
      iceAndPrice: "Cubo Cuadrado Cristalino · ~US$129–$169",
      capacityAndSize: "40–45 lb/24h (24 cubos/tanda) · 10\"×14.2\"×14.8\"",
      noiseSpec: "42–45 dB · Temporizador LCD 24h",
      img: ambient("home-cubo-cristalino"),
      alt: "Cubos cuadrados cristalinos en vaso de cóctel",
      idealFor:
        "Cenas, fiestas, barbacoas de 15 a 30 personas y amantes del whisky o refrescos que odian el hielo que se derrite rápido.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-hielo/euhomy-clear-square-40lb-resena-opiniones-amazon/"
      ),
      productKey: "EUHOMY_CLEAR_SQUARE_40LB",
    },
    {
      key: "opal-premium",
      label: "🏆 Nugget Premium + Side Tank",
      iceAndPrice: "Sonic Nugget + Wi‑Fi · ~US$549–$629",
      capacityAndSize: "38 lb/24h + Tanque 0.75 gal · 16.5\" alto",
      noiseSpec: "44–46 dB · Cajón frontal deslizante",
      img: ambient("home-hero-hielo"),
      alt: "GE Profile Opal 2.0 con tanque lateral en cocina",
      idealFor:
        "Familias fanáticas del hielo nugget estilo restaurante que quieren máxima autonomía de agua y horarios programables desde el celular.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-hielo/ge-profile-opal-2-0-side-tank-resena-opiniones-amazon/"
      ),
      productKey: "GE_OPAL_2_SIDE_TANK",
    },
  ];

  const POPULAR_PATHS = [
    "/comparativas-maquinas-de-hielo/maquina-hielo-nugget-vs-cubitos-bala-cual-comprar-amazon/",
    "/mejores-maquinas-hielo-nugget/mejores-maquinas-de-hielo-nugget-sobremesa-amazon/",
    "/mejores-maquinas-cubitos-de-hielo/mejores-maquinas-de-cubitos-de-hielo-sobremesa-amazon/",
    "/comparativas-maquinas-de-hielo/ge-profile-opal-2-0-side-tank-vs-frigidaire-gallery-nugget-44lb/",
    "/maquinas-por-uso-presupuesto-y-espacio/mejores-maquinas-de-hielo-para-uso-diario-en-casa/",
    "/maquinas-por-uso-presupuesto-y-espacio/mejores-maquinas-de-hielo-para-reuniones-y-fiestas-en-casa/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "HieloEnCasa.com – Guía de Máquinas de Hielo de Sobremesa en Amazon EE. UU.",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${heroImg}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      <main>
        {/* 1–2. Hero 3D Tilt + Partículas de Escarcha + Buscador Instantáneo */}
        <Hero heroImage={heroImg} />

        {/* 3. Doble Cinta Marquee en Sentidos Opuestos */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/80"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span key={t} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-drinklight to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/80"
              >
                {CLAIMS_2.map((t) => (
                  <span key={t} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-fxlime" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Cómo Elegir + 4 Tarjetas Spotlight (.spot) con Luz Radial */}
        <section id="como-elegir" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Cubitos vs Hielo Tipo Nugget en Amazon EE. UU.
              </span>
              <SplitHeading
                text="Compara precio, capacidad, tamaño y ruido"
                accent={{
                  text: "antes de elegir tu máquina",
                  className: "text-fxblue",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                No todas las máquinas de hielo de sobremesa sirven para lo
                mismo. Mientras un modelo portátil de{" "}
                <strong className="text-fxink">cubitos bala de 26 lb</strong>{" "}
                resuelve el agua fría diaria por menos de US$90 en silencio, una{" "}
                <strong className="text-fxink">
                  máquina de hielo tipo nugget masticable
                </strong>{" "}
                convierte tu cocina en una cafetería de especialidad, y una de{" "}
                <strong className="text-fxink">
                  cubos cuadrados cristalinos de 40 lb
                </strong>{" "}
                salva cualquier fiesta sin aguar los cócteles.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: "💵",
                    title: "1. Precio Real en USD",
                    desc: "Desde compactas de US$69–$95 hasta nugget compactas (US$219–$349) y gama alta Opal 2.0.",
                  },
                  {
                    icon: "⚡",
                    title: "2. Capacidad (lb/24h)",
                    desc: "26 lb/día para 1–3 personas a diario vs 38–45 lb/día para familias y reuniones en casa.",
                  },
                  {
                    icon: "📏",
                    title: "3. Tamaño Bajo Gabinete",
                    desc: "Altura verificada (<16.5\") para caber bajo alacenas estándar de 18\" en cocinas de EE. UU.",
                  },
                  {
                    icon: "🔇",
                    title: "4. Nivel de Ruido (dB)",
                    desc: "Mediciones de 35–41 dB en cubitos y 42–47 dB en motores extrusores de hielo nugget.",
                  },
                ].map((c, idx) => (
                  <div
                    key={c.title}
                    className="card spot p-5"
                    data-reveal
                    data-reveal-delay={String(Math.min(idx, 3))}
                  >
                    <p className="font-display text-lg font-extrabold text-fxink">
                      <span className="mr-1.5">{c.icon}</span>
                      {c.title}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--muted)]">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/comparativas-maquinas-de-hielo/maquina-hielo-nugget-vs-cubitos-bala-cual-comprar-amazon/"
                  className="btn btn-buy shine"
                  data-magnetic
                >
                  Comparativa: Nugget vs Cubitos →
                </Link>
                <Link
                  href="/cubitos-vs-hielo-nugget-y-tipos/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Ver los 3 tipos de hielo
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(7,17,30,0.6)] border border-[var(--line)]"
                data-reveal
              >
                <Image
                  src={ambient("cat-cubitos-vs-hielo-nugget-y-tipos")}
                  alt="Comparativa visual de hielo tipo nugget masticable, cubitos tipo bala y cubos cuadrados cristalinos"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--line)] shadow-md"
                data-reveal
                data-reveal-delay="1"
              >
                <Image
                  src={ambient("home-uso-diario-cafe")}
                  alt="Preparando iced coffee diario con máquina de hielo nugget"
                  fill
                  sizes="(max-width:1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--line)] shadow-md"
                data-reveal
                data-reveal-delay="2"
              >
                <Image
                  src={ambient("home-reuniones-fiesta")}
                  alt="Máquina de hielo de alta capacidad lista para reuniones y fiestas en casa"
                  fill
                  sizes="(max-width:1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. ScrollStory Fijada con GSAP en 4 Fases */}
        <ScrollStory />

        {/* 6. Diagrama Técnico SVG Animado (Nugget vs Bala vs Cubo Cristalino) */}
        <section className="relative overflow-hidden bg-[#07111e] py-24 text-white">
          <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <IceMechanismSvg />
            <div>
              <span className="eyebrow !text-drinklight" data-reveal>
                Ingeniería del Hielo en Casa
              </span>
              <SplitHeading
                text="Por qué la textura del hielo cambia"
                accent={{
                  text: "el sabor y la duración de tu bebida",
                  className: "text-[#fde68a]",
                }}
                className="section-title mt-3 text-white"
              />
              <p className="mt-5 text-white/75 text-lg" data-reveal>
                Cada tecnología de sobremesa congela el agua de forma distinta:
                el <strong className="text-white">tornillo extrusor</strong>{" "}
                compacta escamas con aire para lograr el famoso hielo masticable{" "}
                <em>Sonic</em>; los{" "}
                <strong className="text-white">9 dedos evaporadores</strong>{" "}
                entregan balas huecas ultrarrápidas en 6 minutos; y la{" "}
                <strong className="text-white">cascada vertical</strong> forma
                cubos cuadrados transparentes libres de burbujas.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 text-xs" data-reveal>
                <div className="glass p-4">
                  <p className="font-display text-base font-extrabold text-drinklight">
                    Hielo Nugget
                  </p>
                  <p className="mt-1 text-white/75">
                    Suave, poroso y crujiente. Absorbe café frío, batidos y
                    refrescos.
                  </p>
                </div>
                <div className="glass p-4">
                  <p className="font-display text-base font-extrabold text-fxlime">
                    Cubito Bala
                  </p>
                  <p className="mt-1 text-white/75">
                    Listo en 6 min. Superficie amplia que enfría agua al
                    instante por menos de US$90.
                  </p>
                </div>
                <div className="glass p-4">
                  <p className="font-display text-base font-extrabold text-emerald-300">
                    Cubo Cristalino
                  </p>
                  <p className="mt-1 text-white/75">
                    100 % macizo y transparente. Se derrite 3 veces más lento en
                    fiestas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Órbita Interactiva de 8 Criterios Clave */}
        <section className="wrap py-24">
          <IceCriteriaOrbit
            items={orbit}
            center={ambient("home-nugget-macro")}
          />
        </section>

        {/* 8. Contadores Animados + Tabla Oficial Comparativa de Modelos Estrella */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#07111e] via-[#0b1c2c] to-[#081926] py-24 text-white">
          <div className="wrap">
            <div className="max-w-3xl">
              <span className="eyebrow !text-fxlime" data-reveal>
                Datos Reales Verificados ({VERIFIED_LABEL})
              </span>
              <SplitHeading
                text="Las 5 máquinas de hielo más recomendadas"
                accent={{
                  text: "comparadas cara a cara en Amazon EE. UU.",
                  className: "text-drinklight",
                }}
                className="section-title mt-3 text-white"
              />
            </div>

            <div className="mt-10">
              <MetricsCounters data={metrics} />
            </div>

            <div
              className="mt-12 overflow-x-auto rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur"
              data-reveal
            >
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/15 bg-white/[0.06] font-display text-xs uppercase tracking-wider text-sky-200">
                    <th className="p-4">Modelo en Amazon EE. UU.</th>
                    <th className="p-4">Tipo de Hielo</th>
                    <th className="p-4">Precio Aprox.</th>
                    <th className="p-4">Capacidad</th>
                    <th className="p-4">Alto (Bajo 18&quot;)</th>
                    <th className="p-4">Ruido (dB)</th>
                    <th className="p-4">Uso Ideal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/85">
                  {[
                    [
                      "GE Profile Opal 2.0 + Side Tank",
                      "/resenas-maquinas-de-hielo/ge-profile-opal-2-0-side-tank-resena-opiniones-amazon/",
                      "Nugget Masticable",
                      "US$549–$629",
                      "38 lb/24h (10 min)",
                      "16.5\" (Cajón frontal)",
                      "44–46 dB",
                      "Uso diario familiar & Iced Coffee",
                    ],
                    [
                      "Frigidaire Gallery EFIC235",
                      "/resenas-maquinas-de-hielo/frigidaire-gallery-nugget-44lb-resena-opiniones-amazon/",
                      "Nugget Crujiente",
                      "US$269–$349",
                      "44 lb/24h (12 min)",
                      "16.1\" alto",
                      "45–48 dB",
                      "Uso diario + Reuniones fin de semana",
                    ],
                    [
                      "EUHOMY Nugget Compacta",
                      "/resenas-maquinas-de-hielo/euhomy-nugget-ice-maker-34lb-resena-opiniones-amazon/",
                      "Nugget Suave",
                      "US$219–$269",
                      "34–40 lb/24h (8 min)",
                      "13.0\" ultracompacta",
                      "42–45 dB",
                      "Apartamentos y barras de café",
                    ],
                    [
                      "Silonn SLIM01 Portátil",
                      "/resenas-maquinas-de-hielo/silonn-slim01-bullet-26lb-resena-opiniones-amazon/",
                      "Cubito Bala (S/L)",
                      "US$69–$95",
                      "26 lb/24h (6 min)",
                      "11.6\" con asa",
                      "35–41 dB",
                      "Uso diario económico ultrasilencioso",
                    ],
                    [
                      "EUHOMY Clear Square LCD",
                      "/resenas-maquinas-de-hielo/euhomy-clear-square-40lb-resena-opiniones-amazon/",
                      "Cubo Cristalino (24/ciclo)",
                      "US$129–$169",
                      "40–45 lb/24h (14 min)",
                      "14.8\" alto",
                      "42–45 dB",
                      "Fiestas, reuniones y whisky sin aguar",
                    ],
                  ].map(([name, href, ice, price, cap, h, db, use]) => (
                    <tr key={name} className="hover:bg-white/[0.05] transition">
                      <td className="p-4 font-display font-bold text-white">
                        <Link
                          href={safeHref(href)}
                          className="text-fxlime hover:underline"
                        >
                          {name} →
                        </Link>
                      </td>
                      <td className="p-4">{ice}</td>
                      <td className="p-4 font-semibold text-emerald-300">
                        {price}
                      </td>
                      <td className="p-4">{cap}</td>
                      <td className="p-4">{h}</td>
                      <td className="p-4">{db}</td>
                      <td className="p-4 text-sky-200">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 9. Comparador Arrastrable Antes ↔ Después (Uso Diario vs Reuniones en Casa) */}
        <section className="wrap py-24">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow" data-reveal>
              Comparador Interactivo de Escenario
            </span>
            <SplitHeading
              text="¿Uso diario silencioso"
              accent={{
                text: "o reuniones y fiestas en casa?",
                className: "text-prune",
              }}
              className="section-title mt-3"
            />
            <p className="mt-3 text-[var(--muted)]" data-reveal>
              Desliza el control para descubrir cómo cambian la capacidad
              recomendada, el tipo de cubo y los modelos ganadores entre lunes a
              viernes y un sábado con casa llena.
            </p>
          </div>
          <UsageModeSlider />
        </section>

        {/* 10. MomentsCarousel 4:5 (7 Escenarios Reales en Casa) */}
        <section className="bg-fxsky/70 py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Escenarios Reales en el Hogar
              </span>
              <SplitHeading
                text="Una guía pensada para cada rincón"
                accent={{
                  text: "y cada bebida de tu casa",
                  className: "text-fxblue",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Recomendador Interactivo + Calculadora de Libras de Hielo */}
        <section id="recomendador" className="wrap py-24">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow" data-reveal>
              Selector Interactivo &amp; Calculadora de Hielo
            </span>
            <SplitHeading
              text="Encuentra tu máquina exacta"
              accent={{
                text: "y consulta el precio hoy en Amazon",
                className: "text-fxblue",
              }}
              className="section-title mt-3"
            />
          </div>
          <IceMakerFinderBlock options={finderOptions} />

          {/* Vitrina Amazon Showcase Top 3 en la Home */}
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle={homeAmz.sectionTitle}
            sectionSubtitle={homeAmz.sectionSubtitle}
            products={homeAmz.products}
            source="home"
          />
        </section>

        {/* 12. Bento Grid de los 12 Silos Temáticos */}
        <section className="bg-fxsky py-24">
          <div className="wrap">
            <div className="max-w-3xl">
              <span className="eyebrow" data-reveal>
                Arquitectura de 1,132 Guías Especializadas
              </span>
              <SplitHeading
                text="Explora nuestras 12 categorías"
                accent={{
                  text: "de máquinas de hielo y mantenimiento",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cats.map((c, idx) => {
                const count = getArticlesIn(c.slug).length;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className="card spot group flex flex-col justify-between p-6"
                    data-reveal
                    data-reveal-delay={String(idx % 3)}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fxsky text-2xl">
                          {CAT_ICONS[c.icon] || "🧊"}
                        </span>
                        <span className="rounded-full bg-fxsky px-3 py-1 text-xs font-bold text-fxbluedeep">
                          {count} guías
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-extrabold text-fxink group-hover:text-fxblue">
                        {c.name}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3">
                        {c.description}
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-fxblue">
                      Explorar silo completo →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 13. Las 6 Guías y Comparativas Más Consultadas */}
        <section className="wrap py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow" data-reveal>
                Lecturas Imprescindibles
              </span>
              <SplitHeading
                text="Las comparativas más leídas"
                accent={{
                  text: "antes de comprar en Amazon",
                  className: "text-fxblue",
                }}
                className="section-title mt-3"
              />
            </div>
            <Link
              href="/resenas-maquinas-de-hielo/"
              className="btn btn-ghost text-sm"
            >
              Ver todas las reseñas →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((a, idx) => (
              <ArticleCard key={a.path} a={a} priority={idx < 3} />
            ))}
          </div>
        </section>

        {/* 14. Preguntas Frecuentes (FAQ Schema JSON-LD) + Bloque E-E-A-T */}
        <section className="bg-fxsky/60 py-24">
          <div className="wrap grid gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Dudas Frecuentes Resueltas
              </span>
              <SplitHeading
                text="Todo lo que debes saber"
                accent={{
                  text: "sobre máquinas de hielo de sobremesa",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <div className="mt-8 space-y-3">
                {FAQ.map((f) => (
                  <details key={f.q} className="card group p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                      {f.q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxblue transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card card-static p-7">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fxblue to-prune font-display text-xl font-extrabold text-white">
                    CL
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-fxbluedeep">
                      Transparencia Editorial &amp; Titularidad
                    </span>
                    <h3 className="font-display text-xl font-extrabold">
                      {LEGAL_OWNER}
                    </h3>
                    <p className="text-xs text-[var(--muted)]">
                      {LEGAL_LOCATION} · {LEGAL_EMAIL}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                  <strong>HieloEnCasa.com</strong> analiza de forma estructurada
                  el catálogo de máquinas de hielo de sobremesa de{" "}
                  <strong>Amazon Estados Unidos</strong>, contrastando fichas
                  técnicas de capacidad real en libras, dimensiones en pulgadas
                  bajo gabinete, consumo eléctrico en watts y decibelios reales
                  para orientar compras informadas. En este sitio{" "}
                  {ICE_DISCLAIMER}.
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold">
                  <Link
                    href="/politica-editorial/"
                    className="text-fxblue hover:underline"
                  >
                    Metodología editorial →
                  </Link>
                  <Link
                    href="/divulgacion-de-afiliados/"
                    className="text-prune hover:underline"
                  >
                    Divulgación Amazon Associates →
                  </Link>
                </div>
              </div>

              {/* 15. CTA Final Aurora con Asesor IA */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07111e] via-[#0369a1] to-[#0f766e] p-8 text-white shadow-xl">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#fef08a]">
                  🧊 Asesor IA Modelo Mini Activo 24/7
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight">
                  ¿No sabes qué modelo cabe en tu cocina o rinde para tus
                  reuniones?
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Cuéntale a nuestro chat inteligente tu presupuesto, si te
                  gusta masticar hielo nugget o prefieres cubitos rápidos, y
                  recibe el enlace directo a Amazon.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <OpenChatButton
                    label="Preguntar al Asesor de Hielo IA"
                    className="btn btn-lime shine text-sm"
                    magnetic
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
