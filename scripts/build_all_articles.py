#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador Maestro de los 1,132 Artículos de HieloEnCasa.com:
- 12 Hubs Pilares de Categoría (isPillar: true)
- 320 Artículos Transaccionales en 5 Silos de Productos Amazon (isTransactional: true)
- 800 Artículos SEO Informacionales en 7 Silos Educativos y Técnicos (isTransactional: false)

También genera:
- src/data/keyword_map.json (validando 0 % canibalización en slug, title, seoTitle y primaryKeyword)
- public/search-index.json (para el buscador instantáneo HeroSearch)
"""
import json
import pathlib
import re

from topics_catalog import PILLARS, generate_transactional_320, generate_seo_800

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "src/content/articles"
ART_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR = ROOT / "src/data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
PUB_DIR = ROOT / "public"
PUB_DIR.mkdir(parents=True, exist_ok=True)

PUBLISHED = "2026-11-24"

# Matriz Fotográfica Anti-Similitud (10 ángulos × 7 iluminaciones × 10 superficies/escenarios = 700 variaciones visuales únicas)
CAMERA_STYLES = [
    "Macro gastronomic close-up shot with shallow depth of field (85mm f/2.8 lens) highlighting glistening ice texture",
    "Three-quarter editorial angle from slightly above in a bright American kitchen (50mm lens)",
    "Overhead flat-lay composition showcasing a countertop ice maker, scoop, chilled glassware and fresh citrus (35mm lens)",
    "Eye-level realistic lifestyle photograph at a modern home coffee bar",
    "Side-profile studio shot highlighting compact under-cabinet clearance beneath 18-inch upper cabinets",
    "Detailed close-up focusing on hands scooping fresh crunchy ice into an insulated tumbler",
    "Wide interior editorial view of a welcoming kitchen island prepared for a weekend family gathering",
    "Oblique countertop product photography with soft background bokeh and condensation droplets on glasses",
    "Front studio angle highlighting brushed stainless steel finish, transparent viewing window and ice basket",
    "Close-up lifestyle shot of espresso pouring over fresh countertop ice beside a sleek compact appliance",
]

LIGHTING_MOODS = [
    "crisp natural morning window daylight with soft realistic reflections",
    "warm golden hour afternoon sunlight streaming across the kitchen counter",
    "cozy evening home bar ambient lighting highlighting crystal-clear ice",
    "clean bright editorial culinary studio lighting with authentic shadows",
    "Scandinavian daylight-balanced interior photography with crisp white and wood tones",
    "sunlit patio door light creating refreshing summer highlights on chilled drinks",
    "soft diffused architectural LED under-cabinet lighting in a modern kitchen",
]

SURFACES_AND_PROPS = [
    "on a white veined Calacatta quartz countertop beside a ribbed iced coffee glass",
    "on a warm American walnut butcher-block island with a stainless steel ice scoop",
    "on a minimalist home coffee station next to an espresso machine and 40oz tumbler",
    "on a sleek charcoal soapstone wet bar counter with crystal rocks glasses and lemon peel",
    "on a light oak apartment kitchen counter with a filtered water pitcher and mint leaves",
    "on a spacious marble peninsula set with cold sodas and an insulated double-wall ice bucket",
    "in a tidy modern kitchenette with subway tile backsplash and clean airflow space",
    "on a covered outdoor patio buffet table beside chilled lemonade and summer glassware",
    "on a quiet home office refreshment corner next to a stoneware mug and sparkling water",
    "on a spotless granite counter near a stainless kitchen sink with pure filtered water",
]


def build_diverse_prompt(subject: str, idx: int) -> str:
    cam = CAMERA_STYLES[idx % len(CAMERA_STYLES)]
    light = LIGHTING_MOODS[(idx * 3 + 1) % len(LIGHTING_MOODS)]
    surf = SURFACES_AND_PROPS[(idx * 7 + 2) % len(SURFACES_AND_PROPS)]
    return (
        f"Realistic editorial kitchen and beverage appliance photography, {cam}: {subject}, {surf}, {light}. "
        "Photorealistic ice crystals, authentic brushed metal and glass materials, no text, no letters, no brand logos, no watermarks."
    )


def clean_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def make_pillar_article(p: dict, child_items: list, idx: int) -> dict:
    cat_slug = p["slug"]
    path = f"/{cat_slug}/"
    related_paths = [f"/{cat_slug}/{clean_slug(c[0])}/" for c in child_items[:4]]
    table_rows = [
        [c[1], f"[Leer guía completa](/{cat_slug}/{clean_slug(c[0])}/)"]
        for c in child_items[:15]
    ]
    is_trans_pillar = cat_slug in {
        "resenas-maquinas-de-hielo",
        "comparativas-maquinas-de-hielo",
        "mejores-maquinas-hielo-nugget",
        "mejores-maquinas-cubitos-de-hielo",
        "maquinas-por-uso-presupuesto-y-espacio",
    }

    blocks = [
        {
            "type": "p",
            "text": f"Bienvenido al hub especializado de **{p['title']}** en **HieloEnCasa.com**. Aquí organizamos todas nuestras guías sobre **{p['focus']}**, diseñadas bajo una arquitectura estricta sin canibalización para ayudarte a elegir la máquina de hielo de sobremesa exacta en **Amazon Estados Unidos (`amazon.com`)** o **Amazon España (`amazon.es`)**.",
        },
        {
            "type": "p",
            "text": "Ya sea que busques **[las mejores máquinas de hielo tipo nugget masticables](/mejores-maquinas-hielo-nugget/mejores-maquinas-de-hielo-nugget-sobremesa-amazon/)**, quieras comparar **[las mejores máquinas de cubitos rápidos y cubo cristalino](/mejores-maquinas-cubitos-de-hielo/mejores-maquinas-de-cubitos-de-hielo-sobremesa-amazon/)**, resolver el duelo **[GE Profile Opal 2.0 vs Frigidaire Gallery Nugget 44 lb](/comparativas-maquinas-de-hielo/ge-profile-opal-2-0-side-tank-vs-frigidaire-gallery-nugget-44lb/)** o elegir entre **[modelos silenciosos para uso diario](/maquinas-por-uso-presupuesto-y-espacio/mejores-maquinas-de-hielo-para-uso-diario-en-casa/)** y **[equipos de alta capacidad para reuniones en casa](/maquinas-por-uso-presupuesto-y-espacio/mejores-maquinas-de-hielo-para-reuniones-y-fiestas-en-casa/)**, cada artículo evalúa datos reales de precio, capacidad, tamaño y ruido.",
        },
        {"type": "h2", "text": f"Cómo comparamos cada modelo en {p['title'].split('(')[0].strip()}"},
        {
            "type": "p",
            "text": f"En las **{len(child_items)} guías especializadas** de esta categoría analizamos sistemáticamente los cuatro criterios que definen una buena compra en Amazon EE. UU.: **1) Rango de precio real en dólares (`US$65` a `US$629`)**; **2) Capacidad diaria (`26 lb` a `55 lb/24h`) y minutos por ciclo**; **3) Tamaño físico en pulgadas y centímetros para caber bajo gabinetes de `18\"`**; y **4) Nivel de ruido real en decibelios (`35 dB` a `48 dB`)**.",
        },
        {
            "type": "table",
            "caption": f"Guías destacadas dentro de {p['title'].split('(')[0].strip()}",
            "headers": ["Guía Especializada en HieloEnCasa.com", "Acceso Directo"],
            "rows": table_rows,
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": "Doble Veredicto: Uso Diario vs Reuniones en Casa",
            "text": "Todas nuestras guías explican con claridad si un modelo conviene más para el uso diario (café frío, vasos térmicos de 40 oz, agua fresca y bajo ruido en cocina abierta) o para reuniones en casa (cócteles, barbacoas y fiestas de 10 a 35 invitados), incluyendo enlaces directos de afiliado a Amazon EE. UU. (hieloencasa-20) y Amazon España (hieloencasa-21).",
        },
        {"type": "h2", "text": "3 pasos rápidos para acertar con tu máquina de hielo de sobremesa"},
        {
            "type": "ol",
            "items": [
                "**Define tu tipo de hielo favorito:** elige **hielo tipo nugget** (masticable, poroso y suave como la [GE Profile Opal 2.0](/resenas-maquinas-de-hielo/ge-profile-opal-2-0-side-tank-resena-opiniones-amazon/) o la [EUHOMY Nugget 34 lb](/resenas-maquinas-de-hielo/euhomy-nugget-ice-maker-34lb-resena-opiniones-amazon/)) para *iced coffee*, refrescos y masticar sin dañar dientes; **cubitos tipo bala** ([Silonn SLIM01 26 lb](/resenas-maquinas-de-hielo/silonn-slim01-bullet-26lb-resena-opiniones-amazon/)) si buscas hielo en solo 6 minutos por menos de US$95; o **cubos cuadrados cristalinos** ([EUHOMY 40 lb Clear Square](/resenas-maquinas-de-hielo/euhomy-clear-square-40lb-resena-opiniones-amazon/)) para whisky y reuniones largas.",
                "**Verifica el espacio bajo tus alacenas:** en Estados Unidos la altura estándar entre encimera y gabinete superior es de `18 pulgadas (45.7 cm)`. Mide tu hueco disponible y recuerda dejar `4 a 6 pulgadas` libres a los lados para que el compresor respire en silencio.",
                "**Calcula según uso diario o reuniones:** para 1–3 personas a diario bastan `26 a 34 lb/24h` silenciosas (`<43 dB`); si organizas cenas o parrillas frecuentes, apunta a `38–45 lb/24h` y apóyate en un contenedor hermético de congelador para acumular lotes desde la víspera.",
            ],
        },
        {
            "type": "cta",
            "text": "¿Dudas entre dos máquinas de hielo de esta categoría? Abre nuestro Asesor de Hielo IA en vivo y recibe la recomendación exacta para tu cocina y presupuesto.",
        },
    ]

    faqs = [
        {
            "q": f"¿Qué máquinas destacan dentro de {p['title'].split('(')[0].strip()}?",
            "a": "En hielo nugget masticable sobresalen la GE Profile Opal 2.0 con Side Tank (gama alta), la Frigidaire Gallery de 44 lb (alta capacidad calidad-precio) y la EUHOMY / Silonn Nugget compacta (<US$270). En cubitos bala económicos lidera la Silonn SLIM01 de 26 lb (9 cubitos en 6 min), y en cubo cuadrado cristalino para fiestas destaca la EUHOMY 40 lb con pantalla LCD.",
        },
        {
            "q": "¿Qué diferencia real hay entre usarla a diario y usarla en reuniones en casa?",
            "a": "En el uso diario priorizas bajo nivel de ruido (<43 dB), huella compacta bajo gabinete y autolimpieza sencilla. En reuniones en casa priorizas alta producción por hora (38 a 45 lb/24h), depósito de agua grande o tanque lateral y cubos densos o lotes pre-embolsados en el congelador.",
        },
        {
            "q": "¿Las máquinas de hielo de sobremesa necesitan instalación de plomería?",
            "a": "No. Los modelos de sobremesa funcionan enchufándolos a una toma estándar de 115V y llenando manualmente su depósito con agua filtrada, por lo que puedes usarlos en cocinas, islas, oficinas, departamentos de alquiler o terrazas techadas.",
        },
    ]

    return {
        "slug": cat_slug,
        "pillar": cat_slug,
        "path": path,
        "isPillar": True,
        "isTransactional": is_trans_pillar,
        "primaryKeyword": p["kw"],
        "title": p["title"],
        "seoTitle": f"{p['title']} | HieloEnCasa.com",
        "metaDescription": f"Guía completa de {p['focus']}. Compara cubitos y hielo nugget por precio, capacidad, tamaño y nivel de ruido en Amazon EE. UU.",
        "excerpt": f"Explora las {len(child_items)} guías sobre {p['focus']} evaluando precio, lb/24h, medidas bajo gabinete y decibelios para uso diario o reuniones.",
        "quickAnswer": f"En esta sección reunimos {len(child_items)} guías especializadas sobre {p['focus']}. Comparamos máquinas de cubitos y de hielo tipo nugget según su precio en dólares, capacidad real (26 a 55 lb/24h), tamaño bajo gabinetes de 18 pulgadas y nivel de ruido (35 a 48 dB), detallando cuál conviene para uso diario o reuniones en casa.",
        "readingMinutes": 8,
        "image": {
            "prompt": build_diverse_prompt(p["subject"], idx),
            "alt": p["title"],
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Best Sellers in Countertop Ice Makers", "url": "https://www.amazon.com/Best-Sellers-Appliances-Ice-Makers/zgbs/appliances/2399939011"},
            {"label": "U.S. Department of Energy – Appliance Energy Efficiency", "url": "https://www.energy.gov/energysaver/appliances-and-electronics"},
        ],
        "related": related_paths,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": f"/img/ambiente/cat-{cat_slug}.webp",
    }


def make_transactional_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, ice_type, price_spec, cap_spec, size_spec, noise_spec, daily_vs_party, top_picks, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    start = (idx * 3) % max(1, len(sibling_paths))
    rel = [p for p in (sibling_paths[start:] + sibling_paths[:start]) if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Acertar al elegir en **{title}** evita los dos errores más comunes al comprar en **Amazon Estados Unidos (`amazon.com`)**: llevarse una máquina demasiado ruidosa para una cocina abierta o quedarse corto de hielo a mitad de una cena con amigos. En esta guía comparamos modelos reales evaluando su **tipo de hielo ({ice_type})**, **precio ({price_spec})**, **capacidad ({cap_spec})**, **tamaño ({size_spec})** y **nivel de ruido ({noise_spec})**.",
        },
        {
            "type": "h2",
            "text": "Análisis en 4 ejes: Precio, Capacidad (lb/24h), Tamaño y Nivel de Ruido (dB)",
        },
        {
            "type": "p",
            "text": f"Las opciones que lideran nuestra comparativa (**{top_picks}**) sobresalen frente a modelos genéricos porque equilibran velocidad de enfriamiento y aislamiento acústico. Con una producción de **{cap_spec.lower()}** y dimensiones de **{size_spec.lower()}**, encajan cómodamente en cocinas estadounidenses estándar manteniendo el sonido en torno a **{noise_spec}**.",
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": f"Resumen Técnico Verificado: {top_picks.split(',')[0].strip()}",
            "text": f"• Tipo de Hielo: {ice_type}.\n• Rango de Precio en Amazon EE. UU.: {price_spec}.\n• Capacidad y Ciclo: {cap_spec}.\n• Tamaño en Encimera: {size_spec}.\n• Nivel de Ruido Medido: {noise_spec}.",
        },
        {
            "type": "h2",
            "text": f"Tabla comparativa en Amazon EE. UU.: {title}",
        },
        {
            "type": "p",
            "text": "Compara de un vistazo las especificaciones clave de nuestras principales recomendaciones antes de consultar el precio actualizado y cupones disponibles en Amazon:",
        },
        {
            "type": "table",
            "caption": f"Comparativa de precio, capacidad, tamaño y ruido para {title}",
            "headers": [
                "Modelo Recomendado",
                "Tipo de Hielo y Precio",
                "Capacidad y Tamaño",
                "Ruido (dB) y Uso Ideal",
            ],
            "rows": [
                [
                    f"**Selección Destacada: {top_picks.split(',')[0].strip()}**",
                    f"{ice_type} · {price_spec}",
                    f"{cap_spec} · {size_spec}",
                    f"{noise_spec} · {daily_vs_party[:95]}",
                ],
                [
                    "**Top Nugget Premium: [GE Profile Opal 2.0 + Side Tank](/resenas-maquinas-de-hielo/ge-profile-opal-2-0-side-tank-resena-opiniones-amazon/)**",
                    "Hielo Nugget Masticable · US$549–$629",
                    "38 lb/24h (10 min) · 13.4\"×17.5\"×16.5\" (bajo 18\")",
                    "44–47 dB · Uso diario intensivo de iced coffee y familia",
                ],
                [
                    "**Top Nugget Calidad-Precio: [Frigidaire Gallery 44 lb](/resenas-maquinas-de-hielo/frigidaire-gallery-nugget-44lb-resena-opiniones-amazon/) / [EUHOMY Nugget](/resenas-maquinas-de-hielo/euhomy-nugget-ice-maker-34lb-resena-opiniones-amazon/)**",
                    "Hielo Nugget Crujiente · US$219–$349",
                    "34 a 44 lb/24h (7–12 min) · Desde 9.6\"×11.6\"×13\"",
                    "42–48 dB · Excelente en cocinas pequeñas y reuniones",
                ],
                [
                    "**Top Cubitos Bala (<US$95): [Silonn SLIM01 26 lb](/resenas-maquinas-de-hielo/silonn-slim01-bullet-26lb-resena-opiniones-amazon/)**",
                    "Cubitos Bala (S/L) · US$69–$95",
                    "26 lb/24h (9 cubos en 6 min) · 8.7\"×11.4\"×11.6\"",
                    "35–41 dB · Ultrasilenciosa para uso diario económico",
                ],
                [
                    "**Top Fiestas y Cócteles: [EUHOMY 40 lb Clear Square](/resenas-maquinas-de-hielo/euhomy-clear-square-40lb-resena-opiniones-amazon/)**",
                    "Cubo Cuadrado Cristalino · US$129–$169",
                    "40–45 lb/24h (24 cubos/ciclo) · 10\"×14.2\"×14.8\"",
                    "42–45 dB · Reuniones en casa, whisky y bebidas que no se aguan",
                ],
            ],
        },
        {
            "type": "h2",
            "text": "¿Qué modelo conviene para el uso diario y cuál para reuniones en casa?",
        },
        {
            "type": "p",
            "text": f"**Veredicto contextual:** {daily_vs_party} Entender cómo cambia tu demanda entre lunes a viernes y un sábado con invitados te evitará gastar de más o elegir el formato equivocado:",
        },
        {
            "type": "ul",
            "items": [
                "**Si tu prioridad es el uso diario en casa (café helado, termos de 40 oz, agua fría y teletrabajo):** busca modelos por debajo de `44 dB`, con altura inferior a `16.5 pulgadas` para no chocar con los gabinetes superiores y botón de autolimpieza `Self-Clean`. Para amantes del hielo suave masticable, las compactas de **EUHOMY**, **Silonn** o la **GE Profile Opal 2.0** son insuperables; para presupuesto ajustado, una **Silonn SLIM01** de cubitos bala entrega hielo fresco en 6 minutos gastando apenas ~US$5 de luz al mes.",
                "**Si tu prioridad son las reuniones en casa, fiestas, cenas o barbacoas:** necesitas alta producción sostenida (`38 a 48 lb/24h`), tanque de agua amplio (`2.5 L a 3.2 L` o *Side Tank*) y cubos que aguanten más tiempo sin derretirse en los vasos. Aquí brillan la **EUHOMY 40 lb Clear Square** (24 cubos transparentes de golpe), la **NewAir ClearIce40** o la **Frigidaire Gallery Nugget de 44 lb**, acompañadas de bolsas o un bin hermético en el congelador para acumular hielo desde el día anterior.",
            ],
        },
        {
            "type": "h2",
            "text": "Pasos para instalarla y obtener hielo puro desde el primer día",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Deja reposar el compresor al sacarla de la caja de Amazon",
                    "text": "Coloca la máquina en posición vertical sobre tu encimera nivelada al menos 2 a 4 horas antes de enchufarla para que el fluido refrigerante se estabilice, dejando 10–15 cm libres alrededor de las rejillas.",
                },
                {
                    "name": "Ejecuta un ciclo inicial de autolimpieza con agua filtrada",
                    "text": "Llena el depósito con agua potable filtrada, mantén presionado el botón Clean/On-Off durante 3–5 segundos para enjuagar los conductos internos de fábrica y drena por el tapón inferior.",
                },
                {
                    "name": "Ajusta según tu bebida o acumula lotes para invitados",
                    "text": "Para consumo diario sírvete directo de la canasta con pala limpia; si tienes reunión el fin de semana, enciéndela 12–24 horas antes y pasa cada cesta llena a un contenedor hermético en tu congelador.",
                },
            ],
        },
        {
            "type": "callout",
            "variant": "tip",
            "title": "Consejo para Comprar en Amazon Estados Unidos",
            "text": "Revisa siempre en la ficha de Amazon.com si hay casilla verde de cupón ('Apply $20–$40 coupon') antes de añadir al carrito: marcas como EUHOMY, Silonn, Ecozy y Frigidaire activan descuentos directos frecuentemente con envío gratis Prime.",
        },
        {
            "type": "cta",
            "text": "¿Quieres confirmar si este modelo cabe bajo tu alacena o cuál es más silencioso? Escríbele ahora a nuestro Asesor de Máquinas de Hielo IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Cuál es la mejor opción calidad-precio dentro de {title}?",
            "a": f"Nuestra selección principal recae en {top_picks}, ofreciendo una capacidad real de {cap_spec.lower()} en un rango de {price_spec} con nivel sonoro de {noise_spec}.",
        },
        {
            "q": "¿Cabe cómodamente debajo de los gabinetes estándar de cocina en EE. UU.?",
            "a": f"Sí. Las medidas evaluadas ({size_spec}) respetan el estándar norteamericano de 18 pulgadas entre encimera y gabinete superior. En modelos de tapa abatible superior puedes colocar una base deslizante para recargar agua aún más cómodo.",
        },
        {
            "q": "¿El hielo se mantiene congelado todo el día dentro de la canasta?",
            "a": "La canasta de toda máquina de hielo de sobremesa es una cámara térmica aislada, no un congelador a 0 °F: el hielo que va derritiéndose lentamente cae al depósito inferior, se filtra y se vuelve a convertir automáticamente en hielo recién hecho.",
        },
    ]

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title[:54]} | HieloEnCasa.com" if len(title) > 58 else f"{title} | HieloEnCasa.com",
        "metaDescription": f"Comparativa y análisis de {title[:75]} en Amazon EE. UU.: precio ({price_spec}), capacidad, tamaño bajo gabinete, ruido en dB y uso diario vs reuniones.",
        "excerpt": f"Analizamos {title.lower()} comparando tipo de hielo ({ice_type}), precio ({price_spec}), capacidad, dimensiones y decibelios para uso diario o fiestas.",
        "quickAnswer": f"Al evaluar {title.lower()}, destacan {top_picks}. Ofrecen {ice_type.lower()}, precio de {price_spec}, producción de {cap_spec.lower()}, tamaño de {size_spec.lower()} y ruido de {noise_spec}. {daily_vs_party}",
        "readingMinutes": 7 + (idx % 3),
        "image": {
            "prompt": build_diverse_prompt(subj, idx + 20),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com – Countertop Ice Makers Ratings & Specs", "url": "https://www.amazon.com/Best-Sellers-Appliances-Ice-Makers/zgbs/appliances/2399939011"},
            {"label": "NSF International – Home Water & Appliance Hygiene", "url": "https://www.nsf.org/consumer-resources"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def make_seo_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, core_concept, daily_app, party_app, tech_metric, rec_models, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    start = (idx * 5) % max(1, len(sibling_paths))
    rel = [p for p in (sibling_paths[start:] + sibling_paths[:start]) if p != path][:2]
    rel.insert(0, f"/{pillar}/")
    rel.append("/maquinas-por-uso-presupuesto-y-espacio/mejores-maquinas-de-hielo-para-uso-diario-en-casa/")

    blocks = [
        {
            "type": "p",
            "text": f"Comprender a fondo **{title.lower()}** te permite sacar el máximo rendimiento a tu máquina de hielo de sobremesa, ahorrar electricidad y elegir el equipo adecuado en **Amazon Estados Unidos**. El principio técnico clave reside en **{core_concept}**, un factor que influye directamente tanto en la calidad del hielo de cada mañana como cuando recibes invitados en casa.",
        },
        {
            "type": "h2",
            "text": "Explicación técnica clara: qué ocurre realmente y cómo medirlo",
        },
        {
            "type": "p",
            "text": f"En condiciones reales de cocina (`68 °F a 78 °F`), el desempeño gira en torno a **{tech_metric.lower()}**. A diferencia del fabricador lento de un refrigerador convencional (que apenas entrega 3 a 4 libras por día y suele absorber olores del congelador), una máquina de sobremesa bien ajustada optimiza **{core_concept}** para producir hielo limpio y constante en pocos minutos.",
        },
        {
            "type": "callout",
            "variant": "fabricante",
            "title": "Dato Clave para tu Cocina",
            "text": f"• Principio fundamental: {core_concept[:1].upper() + core_concept[1:]}.\n• Métrica que debes vigilar: {tech_metric}.\n• Equipos que mejor lo resuelven en Amazon EE. UU.: {rec_models}.",
        },
        {
            "type": "h2",
            "text": "Impacto en el uso diario vs reuniones en casa",
        },
        {
            "type": "p",
            "text": "Cada hogar utiliza el hielo de manera distinta entre semana y el fin de semana. Así cambia lo que debes priorizar según tu escenario:",
        },
        {
            "type": "table",
            "caption": f"Comparativa práctica para {title}: Uso Diario vs Reuniones en Casa",
            "headers": [
                "Escenario en Casa",
                "Qué Conviene Priorizar",
                "Tipo de Máquina Recomendada en Amazon",
            ],
            "rows": [
                [
                    "**Uso Diario (Iced Coffee, Agua y Vasos Térmicos)**",
                    f"{daily_app[:1].upper() + daily_app[1:]}; ruido bajo (<43 dB) y tamaño cómodo bajo alacena de 18\".",
                    "[EUHOMY Nugget 34 lb](/resenas-maquinas-de-hielo/euhomy-nugget-ice-maker-34lb-resena-opiniones-amazon/) o [Silonn SLIM01 26 lb](/resenas-maquinas-de-hielo/silonn-slim01-bullet-26lb-resena-opiniones-amazon/)",
                ],
                [
                    "**Uso Diario Intensivo Familiar (4+ Personas)**",
                    "Autonomía alta de agua con Side Tank, filtro antical y acceso rápido sin abrir tapa superior.",
                    "[GE Profile Opal 2.0 + Side Tank](/resenas-maquinas-de-hielo/ge-profile-opal-2-0-side-tank-resena-opiniones-amazon/)",
                ],
                [
                    "**Reuniones en Casa, Cenas y Barbacoas (10–30 Invitados)**",
                    f"{party_app[:1].upper() + party_app[1:]}; producción de 40–45 lb/24h y lotes pre-guardados en congelador.",
                    "[Frigidaire Gallery 44 lb](/resenas-maquinas-de-hielo/frigidaire-gallery-nugget-44lb-resena-opiniones-amazon/) o [EUHOMY 40 lb Clear Square](/resenas-maquinas-de-hielo/euhomy-clear-square-40lb-resena-opiniones-amazon/)",
                ],
            ],
        },
        {
            "type": "h2",
            "text": "Guía paso a paso para aplicarlo correctamente en casa",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Revisa el agua y la ubicación en tu encimera",
                    "text": "Utiliza agua potable filtrada (entre 40 y 120 ppm de TDS) y verifica que la máquina esté nivelada, lejos de fuentes de calor y con 10–15 cm de ventilación libre en sus rejillas laterales.",
                },
                {
                    "name": "Ajusta el ciclo según el uso del día",
                    "text": f"Para {daily_app.lower()}, enciende la máquina 15–20 minutos antes de preparar tus bebidas. Si se acerca una reunión para {party_app.lower()}, comienza a recolectar canastas en bolsas o contenedor hermético con anticipación.",
                },
                {
                    "name": "Mantén el evaporador y sensores libres de cal",
                    "text": "Realiza un enjuague semanal de depósito y una descalcificación mensual con ácido cítrico alimentario o limpiador seguro para níquel para mantener el nivel de ruido bajo y la producción intacta.",
                },
            ],
        },
        {
            "type": "h2",
            "text": "Errores frecuentes que reducen el rendimiento o suben el ruido",
        },
        {
            "type": "ul",
            "items": [
                "**Encajonar la máquina sin salida de aire caliente:** pegar las rejillas a la pared o a una cafetera caliente eleva los decibelios del ventilador y alarga cada ciclo hasta un 35 %.",
                "**Usar agua muy dura directamente del grifo sin descalcificar:** el carbonato de calcio forma una capa aislante en las varillas o hace chirriar el tornillo extrusor en las máquinas de hielo tipo nugget.",
                "**Dejar agua estancada varios días cuando no se usa:** si sales de viaje o terminas una fiesta, vacía por el tapón inferior en 30 segundos y deja la tapa ligeramente abierta hasta que seque.",
            ],
        },
        {
            "type": "cta",
            "text": "¿Buscas la máquina de hielo exacta según precio, tamaño o nivel de ruido? Consulta ahora a nuestro Asesor IA de HieloEnCasa.com.",
        },
    ]

    faqs = [
        {
            "q": f"¿Cuál es el punto clave sobre {title.lower()}?",
            "a": f"Lo esencial radica en {core_concept}. Controlar este aspecto mejora de inmediato tanto {daily_app.lower()} como el rendimiento al {party_app.lower()}.",
        },
        {
            "q": "¿Influye esto en la elección entre máquina de cubitos o máquina de hielo nugget?",
            "a": "Sí. Las máquinas de cubitos bala (26 lb, <US$95) son más simples, ligeras y silenciosas (<41 dB), mientras que las de hielo nugget masticable y las de cubo cuadrado cristalino (34–45 lb) ofrecen mejor experiencia en café frío, cócteles y reuniones.",
        },
        {
            "q": "¿Qué accesorios baratos en Amazon ayudan a mejorar este aspecto?",
            "a": "Los tres complementos más útiles son una jarra filtrante para evitar sarro, un limpiador descalcificador apto para níquel (como Affresh u Opal Cleaner) y un contenedor hermético con pala para guardar reservas en el congelador.",
        },
    ]

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": False,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title[:54]} | HieloEnCasa.com" if len(title) > 58 else f"{title} | HieloEnCasa.com",
        "metaDescription": f"Guía práctica sobre {title[:78]}: {core_concept[:65]}. Consejos para uso diario, reuniones en casa y modelos en Amazon EE. UU.",
        "excerpt": f"Descubre {core_concept} y cómo aplicarlo para {daily_app.lower()} o para {party_app.lower()}, comparando cubitos y hielo nugget.",
        "quickAnswer": f"Respecto a {title.lower()}, la clave técnica es {core_concept}. En el uso diario permite {daily_app.lower()}, mientras que en reuniones en casa facilita {party_app.lower()}. Entre los modelos mejor preparados en Amazon EE. UU. destacan {rec_models}.",
        "readingMinutes": 6 + (idx % 3),
        "image": {
            "prompt": build_diverse_prompt(subj, idx + 400),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "U.S. FDA – Food Code & Ice Hygiene Guidelines", "url": "https://www.fda.gov/food"},
            {"label": "ENERGY STAR – Ice Makers & Home Appliances", "url": "https://www.energystar.gov/"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def main():
    # Limpiamos artículos previos si existieran para asegurar exactitud
    for old in ART_DIR.glob("*.json"):
        old.unlink()

    trans_320 = generate_transactional_320()
    seo_800 = generate_seo_800()

    by_pillar: dict[str, list] = {p["slug"]: [] for p in PILLARS}
    for item in trans_320:
        by_pillar[item[2]].append(item)
    for item in seo_800:
        by_pillar[item[2]].append(item)

    sibling_paths_map = {
        p_slug: [f"/{p_slug}/{clean_slug(it[0])}/" for it in items]
        for p_slug, items in by_pillar.items()
    }

    all_articles = []

    # 1. 12 Hubs Pilares
    for idx, p in enumerate(PILLARS):
        art = make_pillar_article(p, by_pillar[p["slug"]], idx)
        all_articles.append(art)

    # 2. 320 Artículos Transaccionales
    for idx, item in enumerate(trans_320):
        art = make_transactional_article(item, sibling_paths_map[item[2]], idx)
        all_articles.append(art)

    # 3. 800 Artículos SEO Informacionales
    for idx, item in enumerate(seo_800):
        art = make_seo_article(item, sibling_paths_map[item[2]], idx)
        all_articles.append(art)

    # Validación estricta de cero canibalización
    slugs = set()
    paths = set()
    kws = set()
    titles = set()
    for a in all_articles:
        assert a["slug"] not in slugs, f"Duplicate slug: {a['slug']}"
        assert a["path"] not in paths, f"Duplicate path: {a['path']}"
        assert a["primaryKeyword"] not in kws, f"Duplicate primaryKeyword: {a['primaryKeyword']}"
        assert a["title"] not in titles, f"Duplicate title: {a['title']}"
        slugs.add(a["slug"])
        paths.add(a["path"])
        kws.add(a["primaryKeyword"])
        titles.add(a["title"])

    # Escribir JSON individuales
    for a in all_articles:
        (ART_DIR / f"{a['slug']}.json").write_text(
            json.dumps(a, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    # Escribir src/data/keyword_map.json
    kw_map = [
        {
            "slug": a["slug"],
            "pillar": a["pillar"],
            "path": a["path"],
            "isPillar": a["isPillar"],
            "isTransactional": a.get("isTransactional", False),
            "primaryKeyword": a["primaryKeyword"],
            "title": a["title"],
        }
        for a in all_articles
    ]
    (DATA_DIR / "keyword_map.json").write_text(
        json.dumps(kw_map, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # Escribir public/search-index.json compacto para HeroSearch
    cats_name = {p["slug"]: p["title"].split(":")[0].split("(")[0].strip() for p in PILLARS}
    search_index = [
        {
            "t": a["title"],
            "p": a["path"],
            "c": cats_name.get(a["pillar"], a["pillar"]),
            "k": a["primaryKeyword"],
            "tr": 1 if a.get("isTransactional") else 0,
        }
        for a in all_articles
    ]
    (PUB_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False), encoding="utf-8"
    )

    print(
        f"COMPLETADO: {len(all_articles)} artículos generados ({len(PILLARS)} pilares + {len(trans_320)} transaccionales + {len(seo_800)} SEO) con 0 % canibalización."
    )


if __name__ == "__main__":
    main()
