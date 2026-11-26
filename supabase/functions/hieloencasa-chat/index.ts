import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://hieloencasa.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "hieloencasa-20";
const AMAZON_TAG_ES = "hieloencasa-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "ge-profile-opal-2-side-tank": {
    id: "ge-profile-opal-2-side-tank",
    badge: "🏆 #1 Hielo Nugget Premium · Uso Diario & Iced Coffee",
    title:
      "GE Profile Opal 2.0 Countertop Nugget Ice Maker con Side Tank (38 lb/24h · Wi‑Fi SmartHQ)",
    subtitle:
      "Hielo nugget masticable estilo restaurante en 10 min, tanque lateral de 0.75 gal, 44–46 dB y altura de 16.5\" bajo gabinete.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("GE Profile Opal 2.0 Countertop Nugget Ice Maker with Side Tank")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("maquina de hielo nugget picado masticable sobremesa")}&tag=${AMAZON_TAG_ES}`,
  },
  "frigidaire-gallery-nugget-44lb": {
    id: "frigidaire-gallery-nugget-44lb",
    badge: "⚡ Mejor Nugget Alta Capacidad Calidad-Precio (44 lb/día)",
    title:
      "Frigidaire Gallery Countertop Crunchy Chewable Nugget Ice Maker (44 lb/24h · EFIC235)",
    subtitle:
      "Hasta 44 lb/24h de hielo nugget crujiente a mitad de precio que la gama lujo, ideal para uso diario familiar y reuniones.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Frigidaire Gallery Countertop Crunchy Chewable Nugget Ice Maker 44 lbs")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Frigidaire maquina de hielo nugget sobremesa acero inoxidable")}&tag=${AMAZON_TAG_ES}`,
  },
  "euhomy-nugget-34lb-compact": {
    id: "euhomy-nugget-34lb-compact",
    badge: "💎 #1 Nugget Compacta Económica",
    title:
      "EUHOMY Countertop Nugget Ice Maker (34–40 lb/24h · Ultracompacta con Autolimpieza)",
    subtitle:
      "Solo 9.6\"×11.6\"×13\", silenciosa (42–45 dB) y con autolimpieza de 1 botón para apartamentos, iced coffee y termos de 40 oz.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("EUHOMY Nugget Ice Maker Countertop Chewable Pebble Ice Self Cleaning")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("EUHOMY maquina de hielo nugget sobremesa autolimpieza")}&tag=${AMAZON_TAG_ES}`,
  },
  "silonn-nugget-33lb-quiet": {
    id: "silonn-nugget-33lb-quiet",
    badge: "🤫 Nugget Silenciosa Ultra Angosta (8.7\" de Ancho)",
    title:
      "Silonn Chewable Nugget Ice Maker Countertop (33 lb/24h · Autolimpieza y Bajo Ruido)",
    subtitle:
      "Ocupa menos ancho que una cafetera, 43–46 dB y flujo continuo de pepitas masticables desde los 8 minutos.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Silonn Nugget Ice Maker Countertop Chewable Pebble Ice Machine 33lbs")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Silonn maquina de hielo nugget compacta sobremesa")}&tag=${AMAZON_TAG_ES}`,
  },
  "silonn-slim01-bullet-26lb": {
    id: "silonn-slim01-bullet-26lb",
    badge: "🔥 #1 Cubitos Económica en Amazon EE. UU.",
    title:
      "Silonn Countertop Bullet Ice Maker SLIM01 (26 lb/24h · 9 Cubitos en 6 Min y <40 dB)",
    subtitle:
      "2 tamaños de cubito (S y L), ultrasilenciosa (35–41 dB), asa portátil y autolimpieza automática para el día a día.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Silonn Ice Makers Countertop 9 Cubes Ready in 6 Mins 26lbs Per Day")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Silonn maquina de cubitos de hielo sobremesa 12kg 6 minutos")}&tag=${AMAZON_TAG_ES}`,
  },
  "euhomy-bullet-26lb-handle": {
    id: "euhomy-bullet-26lb-handle",
    badge: "🏕️ Mejor Portátil Económica con Asa para Cocina, Patio y RV",
    title:
      "EUHOMY Countertop Ice Maker Machine 26 lb/24h con Asa Portátil y Autolimpieza",
    subtitle:
      "Pesa menos de 14 lb, entrega 9 cubitos cada 6–8 min y se lleva sin esfuerzo de la cocina a la terraza o camper.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("EUHOMY Ice Maker Machine Countertop 26lbs in 24Hrs 9 Cubes Ready in 6 Mins")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("EUHOMY maquina de hacer hielo portatil sobremesa 12kg")}&tag=${AMAZON_TAG_ES}`,
  },
  "euhomy-clear-square-40lb": {
    id: "euhomy-clear-square-40lb",
    badge: "🥂 #1 Para Reuniones y Cócteles · 40–45 lb Cubo Cristalino",
    title:
      "EUHOMY 40–45 lb/Day Clear Square Ice Maker Countertop con Pantalla LCD y Temporizador",
    subtitle:
      "Placas de 24 cubos cuadrados transparentes y macizos por tanda que tardan el triple en derretirse en fiestas y whisky.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("EUHOMY 40Lbs Clear Ice Maker Countertop 24 Ice Cubes Ready LCD Display")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("EUHOMY maquina de hielo cubos cuadrados transparentes 18kg LCD")}&tag=${AMAZON_TAG_ES}`,
  },
  "luma-comfort-im200ss-clear": {
    id: "luma-comfort-im200ss-clear",
    badge: "🥃 Mejor Cubo Gourmet Sin Burbujas para Whisky y Home Bar",
    title:
      "Luma Comfort IM200SS / NewAir ClearIce40 Crystal Clear Ice Cube Maker",
    subtitle:
      "Cubos cristalinos individuales de grado restaurante que enfrían destilados y cócteles sin aguarlos.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Luma Comfort Clear Ice Cube Maker Countertop Machine Stainless Steel")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("maquina de hielo transparente cristalino gourmet cocteles")}&tag=${AMAZON_TAG_ES}`,
  },
  "affresh-opal-descaler-filter": {
    id: "affresh-opal-descaler-filter",
    badge: "🧼 Esencial: Limpiador Descalcificador Nickel-Safe + Filtro",
    title:
      "Affresh Ice Machine Cleaner / Kit Oficial GE Profile Opal Descalcificador",
    subtitle:
      "Elimina sarro y chirridos en máquinas de cubitos y nugget cuidando el recubrimiento de níquel sin olor a vinagre.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Affresh Ice Machine Cleaner Nickel Safe Countertop Nugget Descaler")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("descalcificador limpiador maquina de hielo sobremesa acido citrico")}&tag=${AMAZON_TAG_ES}`,
  },
  "freezer-ice-bin-scoop-kit": {
    id: "freezer-ice-bin-scoop-kit",
    badge: "🧊 Truco Para Reuniones: Contenedor Hermético de Freezer + Pala",
    title:
      "Contenedor Hermético de Hielo para Congelador con Tapa, Pinzas y Pala + Bolsas",
    subtitle:
      "Permite acumular de 6 a 10 lb de hielo desde el día anterior a tu fiesta sin olores ni derrames.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Ice Cube Bin for Freezer with Lid and Scoop Airtight Ice Storage Container")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("contenedor hermetico para guardar hielo congelador con pala")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "maquina",
  "maquinas",
  "hielo",
  "sobremesa",
  "casa",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const [batch1, batch2] = await Promise.all([
    supabase
      .from("hieloencasa_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(0, 999),
    supabase
      .from("hieloencasa_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(1000, 1999),
  ]);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  for (const data of [batch1.data, batch2.data]) {
    if (Array.isArray(data)) {
      for (const r of data as ArticleRow[]) {
        if (!bySlug.has(r.slug)) {
          bySlug.set(r.slug, r);
          rows.push(r);
        }
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-hielo.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "mejores-maquinas-de-hielo-nugget-sobremesa-amazon",
    "mejores-maquinas-de-cubitos-de-hielo-sobremesa-amazon",
    "maquina-hielo-nugget-vs-cubitos-bala-cual-comprar-amazon",
    "mejores-maquinas-de-hielo-para-uso-diario-en-casa",
    "mejores-maquinas-de-hielo-para-reuniones-y-fiestas-en-casa",
    "ge-profile-opal-2-0-side-tank-vs-frigidaire-gallery-nugget-44lb",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "hieloencasa-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("hieloencasa_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini as requested by user)
    const { data: configRow } = await supabase
      .from("hieloencasa_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 🧊✨ Soy tu Asesor de Máquinas de Hielo IA de HieloEnCasa.com (modelo mini rápido). Cuéntame si prefieres hielo tipo nugget masticable o cubitos, si es para uso diario o reuniones en casa, y tu presupuesto o espacio en cocina, y te recomendaré el mejor modelo en Amazon Estados Unidos.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("hieloencasa_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug
            ? String(article_slug).slice(0, 180)
            : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("hieloencasa_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("hieloencasa_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor de Máquinas de Hielo IA está en mantenimiento breve. Puedes ver nuestras comparativas en [HieloEnCasa.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: [
          "Mejores máquinas hielo nugget",
          "Cubitos bala vs Hielo nugget",
        ],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "hec-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("hieloencasa_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("hieloencasa_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("hieloencasa_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const systemPrompt = `Eres el Asesor de Máquinas de Hielo de Sobremesa IA Oficial de HieloEnCasa.com (${SITE}), la guía líder en español con más de 1,100 artículos para elegir máquinas de hielo de sobremesa en Amazon Estados Unidos (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS INQUIETUDES Y BÚSQUEDAS DEL USUARIO comparando modelos de CUBITOS (bala rápidos en 6 min y cubo cuadrado cristalino) y de HIELO TIPO NUGGET (masticable / sonic ice) según estos 4 criterios clave:
   - PRECIO EN USD: económicas <US$95 (Silonn SLIM01 / EUHOMY 26 lb), cubo cristalino ~US$139–$279 (EUHOMY 40 lb / Luma Comfort), nugget compactas ~US$209–$349 (EUHOMY Nugget, Silonn Nugget, Frigidaire Gallery 44 lb) y nugget gama alta ~US$549–$629 (GE Profile Opal 2.0 con Side Tank).
   - CAPACIDAD (lb/24h): 26 lb/24h para uso diario ligero; 33–38 lb/24h para familias e iced coffee diario; 40–45 lb/24h para fiestas y reuniones en casa.
   - TAMAÑO Y ALTURA BAJO GABINETE: en EE. UU. los gabinetes estándar están a 18" (45.7 cm); todos nuestros modelos recomendados (de 11.4" a 16.5" de alto) caben debajo dejando 4–6" de ventilación lateral.
   - NIVEL DE RUIDO (dB): ultrasilenciosas de cubitos (35–41 dB) y nugget silenciosas (42–47 dB).
   - Explica SIEMPRE qué modelo conviene para el USO DIARIO (café frío, termos de 40 oz, silencio) frente a REUNIONES EN CASA (cócteles, barbacoas, alta producción).
   - Enlaza en tu respuesta entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluye sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EN AMAZON (${storeName}):
   - Recomienda siempre 1 o 2 productos exactos de nuestro CATÁLOGO AMAZON OFICIAL de abajo.
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".
${config.custom_instructions ? `\nINSTRUCCIONES ADICIONALES DEL ADMIN:\n${config.custom_instructions}\n` : ""}
CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN HIELOENCASA.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta clara, amable y experta en español comparando precio, capacidad, tamaño y ruido para uso diario o reuniones en casa, con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["euhomy-nugget-34lb-compact", "silonn-slim01-bullet-26lb"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["euhomy-nugget-34lb-compact"],
        suggested_options: [
          "¿Cubitos bala o hielo tipo nugget para uso diario?",
          "Mejor máquina para reuniones de 20 personas",
          "Máquinas silenciosas que caben bajo 18 pulgadas",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["euhomy-nugget-34lb-compact"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo revisar nuestra comparativa principal de [Máquinas de Hielo Nugget vs Cubitos en Amazon EE. UU.](${SITE}/comparativas-maquinas-de-hielo/maquina-hielo-nugget-vs-cubitos-bala-cual-comprar-amazon/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("hieloencasa_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("hieloencasa_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "hieloencasa.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras más de 1,100 guías de máquinas de hielo de sobremesa en [HieloEnCasa.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
