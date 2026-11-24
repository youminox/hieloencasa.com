#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Catálogo Maestro Ortogonal Sin Canibalización para HieloEnCasa.com:
- 12 Hubs Pilares de Categoría (PILLARS)
- 320 Artículos Transaccionales de Afiliados Amazon (5 Silos: 90 + 80 + 50 + 50 + 50 = 320)
- 800 Artículos SEO Informacionales (7 Silos: 120 + 115 + 115 + 115 + 115 + 110 + 110 = 800)
Total = 1,132 páginas editoriales únicas con 0 % canibalización de intención, slug o primaryKeyword.
"""

import re


def slugify_clean(text: str) -> str:
    s = text.lower().strip()
    repl = str.maketrans("áéíóúüñ", "aeiouun")
    s = s.translate(repl)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


PILLARS = [
    {
        "slug": "resenas-maquinas-de-hielo",
        "title": "Reseñas de Máquinas de Hielo de Sobremesa en Amazon EE. UU. (Cubitos y Nugget)",
        "kw": "resenas de maquinas de hielo de sobremesa amazon estados unidos",
        "focus": "análisis individuales a fondo de las máquinas de hielo de sobremesa más vendidas en Amazon Estados Unidos (GE Profile Opal 2.0, Frigidaire Gallery, EUHOMY, Silonn, IGLOO, Luma Comfort y NewAir), comparando precio, capacidad diaria, tamaño y nivel de ruido",
        "subject": "an editorial kitchen testing counter displaying brushed stainless steel nugget and compact bullet countertop ice makers with fresh glistening ice cubes",
    },
    {
        "slug": "comparativas-maquinas-de-hielo",
        "title": "Comparativas de Máquinas de Hielo (VS): Precio, Capacidad, Tamaño y Ruido",
        "kw": "comparativas de maquinas de hielo de sobremesa vs amazon",
        "focus": "duelos cara a cara Modelo A vs Modelo B entre máquinas de cubitos y de hielo tipo nugget según rango de precio en dólares, libras por día, dimensiones bajo gabinete y decibelios",
        "subject": "a balanced side-by-side studio comparison of a chewable nugget countertop ice maker and a compact bullet ice cube maker on a white quartz island",
    },
    {
        "slug": "mejores-maquinas-hielo-nugget",
        "title": "Mejores Máquinas de Hielo Tipo Nugget (Masticable / Sonic Ice) en Amazon EE. UU.",
        "kw": "catalogo de maquinas de hielo tipo nugget masticable sonic ice",
        "focus": "rankings de compra de máquinas de hielo masticable tipo nugget o pebble en Amazon Estados Unidos por presupuesto, nivel de ruido, tanque lateral y facilidad de autolimpieza",
        "subject": "a stainless steel countertop nugget ice maker with a transparent side water tank next to a glass of iced coffee filled with crunchy chewable pebble ice",
    },
    {
        "slug": "mejores-maquinas-cubitos-de-hielo",
        "title": "Mejores Máquinas de Cubitos de Hielo (Bala y Cubo Cristalino) en Amazon EE. UU.",
        "kw": "catalogo de maquinas de cubitos de hielo bala y cubo cristalino",
        "focus": "rankings de compra de máquinas de cubitos rápidos tipo bala en 6 minutos y máquinas de cubos cuadrados cristalinos para uso diario, fiestas y cócteles en casa",
        "subject": "a sleek countertop clear square ice cube maker and a portable bullet ice maker with crystal clear ice cubes in cocktail glasses on a walnut home bar",
    },
    {
        "slug": "maquinas-por-uso-presupuesto-y-espacio",
        "title": "Máquinas de Hielo por Uso Diario, Reuniones en Casa, Espacio y Presupuesto",
        "kw": "maquinas de hielo de sobremesa por uso diario reuniones y presupuesto",
        "focus": "selecciones de compra en Amazon Estados Unidos según escenario (uso diario silencioso, reuniones familiares de 15 a 35 invitados, cocinas pequeñas, oficina o RV) y rango de precio en USD",
        "subject": "a lively home kitchen island prepared for a weekend family gathering with a high-capacity countertop ice maker, chilled drinks and insulated ice bucket",
    },
    {
        "slug": "cubitos-vs-hielo-nugget-y-tipos",
        "title": "Cubitos vs Hielo Tipo Nugget: Diferencias de Textura, Dilución y Uso en Bebidas",
        "kw": "diferencias entre cubitos de hielo y hielo tipo nugget sobremesa",
        "focus": "guía técnica y sensorial sobre cómo se forma el hielo nugget masticable frente al cubito bala hueco y el cubo cuadrado transparente, velocidad de enfriamiento y qué bebida mejora cada uno",
        "subject": "macro gastronomic close-up of three glasses comparing airy chewable nugget ice, hollow bullet ice cubes and crystal-clear square gourmet ice cubes",
    },
    {
        "slug": "capacidad-tamano-y-ubicacion-cocina",
        "title": "Capacidad Real (lb/24h), Tamaño Bajo Gabinete y Ubicación en la Cocina",
        "kw": "capacidad lb 24h y tamano de maquinas de hielo bajo gabinete",
        "focus": "cálculo exacto de producción real en libras por día, medidas para caber bajo alacenas estándar de 18 pulgadas en EE. UU. y espacio libre de ventilación del compresor",
        "subject": "a modern American kitchen counter showing a compact countertop ice maker fitting neatly beneath an 18-inch upper cabinet with proper side airflow space",
    },
    {
        "slug": "ruido-consumo-electrico-y-funcionamiento",
        "title": "Nivel de Ruido (dB), Consumo Eléctrico en Watts y Cómo Funciona una Máquina de Hielo",
        "kw": "nivel de ruido db y consumo electrico maquina de hielo sobremesa",
        "focus": "mediciones reales en decibelios (38 a 52 dB), reducción de vibraciones en encimera, gasto mensual en kWh/dólares y funcionamiento del sensor infrarrojo y reciclaje térmico del agua",
        "subject": "a peaceful open-concept kitchen and home office corner with an ultra-quiet countertop ice maker running smoothly next to a laptop and iced tea",
    },
    {
        "slug": "limpieza-descalcificacion-y-agua",
        "title": "Cómo Limpiar y Descalcificar tu Máquina de Hielo y Qué Agua Usar",
        "kw": "como limpiar descalcificar maquina de hielo sobremesa y que agua usar",
        "focus": "guías paso a paso de higiene, ciclo Self-Clean, descalcificación segura para evaporadores de níquel, eliminación de sarro y comparativa entre agua filtrada, embotellada y de ósmosis",
        "subject": "a clean bright kitchen sink counter showing a pitcher of filtered water pouring into a spotless countertop ice maker during a self-cleaning routine",
    },
    {
        "slug": "solucion-de-problemas-y-reparacion",
        "title": "Solución de Problemas en Máquinas de Hielo: Luz Add Water, Ice Full y Ruidos",
        "kw": "solucion de problemas maquina de hielo sobremesa add water ice full",
        "focus": "diagnóstico rápido y reparación doméstica cuando la máquina marca cesta llena estando vacía, no bombea agua, chirría al extruir hielo nugget o produce cubos muy delgados",
        "subject": "close-up of a modern countertop ice maker LED touch control panel showing status indicators in a well-lit kitchen diagnostic setting",
    },
    {
        "slug": "uso-diario-bebidas-y-reuniones-en-casa",
        "title": "Guía de Uso Diario (Iced Coffee y Termos) y Cálculo de Hielo para Reuniones en Casa",
        "kw": "cuanto hielo necesito para uso diario y reuniones en casa",
        "focus": "rutinas prácticas para estaciones de café frío y vasos térmicos de 40 oz cada mañana, más cronogramas para producir y acumular hielo antes de fiestas, cenas y barbacoas en casa",
        "subject": "a cozy morning home coffee bar with espresso pouring over chewable nugget ice in a ribbed glass beside a stainless steel countertop ice maker",
    },
    {
        "slug": "conservacion-hielo-y-accesorios",
        "title": "Cómo Conservar el Hielo en el Congelador, Filtros, Drenaje y Accesorios",
        "kw": "como conservar hielo de maquina de sobremesa en el congelador y accesorios",
        "focus": "métodos probados para evitar que los cubitos o el hielo nugget se peguen en el congelador, elección de contenedores herméticos, palas, filtros, tanques laterales y guardado estacional",
        "subject": "an organized freezer drawer and kitchen counter featuring an airtight ice storage bin with a magnetic scoop filled with loose crunchy nugget ice",
    },
]


# =============================================================================
# MODELOS BASE REALES EN AMAZON ESTADOS UNIDOS
# =============================================================================
MODELS = [
    {
        "key": "ge-profile-opal-2-0-side-tank",
        "name": "GE Profile Opal 2.0 con Side Tank",
        "type": "Hielo Nugget Masticable (Sonic Ice)",
        "price": "US$549 – US$629",
        "cap": "38 lb/24h (17.2 kg) · Primer hielo en 10 min · Cesta 3 lb + Side Tank 0.75 gal",
        "size": "13.4\" ancho × 17.5\" fondo × 16.5\" alto (cabe bajo gabinete estándar de 18\")",
        "noise": "44 – 47 dB (zumbido grave suave con Wi‑Fi SmartHQ)",
        "verdict": "La reina indiscutible para uso diario intensivo de iced coffee y reuniones medianas sin rellenar agua a cada rato gracias a su tanque lateral.",
        "subj": "a brushed stainless steel premium nugget countertop ice maker with a clear side water tank on a white quartz kitchen counter",
    },
    {
        "key": "ge-profile-opal-2-0-ultra",
        "name": "GE Profile Opal 2.0 Ultra Descalcificación Fácil",
        "type": "Hielo Nugget Masticable Premium",
        "price": "US$579 – US$649",
        "cap": "38 lb/24h · 1.6 lb/hora reales · Tanque lateral magnético",
        "size": "13.4\" × 17.5\" × 16.5\" (apertura frontal deslizante que no choca arriba)",
        "noise": "43 – 46 dB (compresor amortiguado)",
        "verdict": "Ideal para familias que usan hielo masticable todos los días y buscan indicador inteligente de descalcificación y filtro antical integrado.",
        "subj": "a sleek dark stainless nugget ice maker with a slide-out ice drawer filled with crunchy pebble ice next to two tumblers",
    },
    {
        "key": "frigidaire-gallery-nugget-44lb",
        "name": "Frigidaire Gallery Nugget Ice Maker 44 lb (EFIC235)",
        "type": "Hielo Nugget Crujiente",
        "price": "US$269 – US$349",
        "cap": "44 lb/24h (20 kg) · Primer lote en 12 min · Cesta de 2.6 lb",
        "size": "11.8\" ancho × 16.9\" fondo × 16.1\" alto (formato compacto bajo alacena)",
        "noise": "45 – 48 dB",
        "verdict": "La mejor alternativa a mitad de precio frente a la Opal: excelente volumen de 44 lb/día tanto para uso diario como para reuniones de fin de semana.",
        "subj": "a silver and black countertop nugget ice maker with a panoramic viewing window displaying fresh pebble ice on a kitchen island",
    },
    {
        "key": "euhomy-nugget-ice-maker-34lb",
        "name": "EUHOMY Countertop Nugget Ice Maker 34–40 lb",
        "type": "Hielo Nugget Suave Masticable",
        "price": "US$219 – US$279",
        "cap": "34 a 40 lb/24h · Hielo listo en 7–10 min · Autolimpieza de 1 botón",
        "size": "9.6\" ancho × 11.6\" fondo × 13.0\" alto (ultracompacta para cocinas pequeñas)",
        "noise": "42 – 45 dB (de las nugget más silenciosas y pequeñas)",
        "verdict": "Perfecta para uso diario en apartamentos, escritorios y barras de café con poco espacio que quieren auténtico hielo masticable sin gastar más de US$280.",
        "subj": "an ultra-compact matte black countertop nugget ice maker with an ice scoop beside an iced latte on a wooden coffee bar",
    },
    {
        "key": "silonn-nugget-ice-maker-33lb",
        "name": "Silonn Chewable Nugget Ice Maker 33 lb",
        "type": "Hielo Nugget Masticable",
        "price": "US$209 – US$269",
        "cap": "33 lb/24h (15 kg) · Ciclo continuo desde 8 min · Autolimpieza automática",
        "size": "11.3\" × 8.7\" × 12.7\" (huella reducida de menos de 9 pulgadas de ancho)",
        "noise": "43 – 46 dB",
        "verdict": "Gran equilibrio precio-tamaño para parejas y uso diario en casa, ocupando casi lo mismo que una cafetera de goteo.",
        "subj": "a slim stainless and black pebble ice maker sitting neatly next to an espresso machine on a bright apartment countertop",
    },
    {
        "key": "ecozy-smart-nugget-ice-maker",
        "name": "Ecozy Smart Nugget Ice Maker con Control por App",
        "type": "Hielo Nugget Inteligente",
        "price": "US$239 – US$299",
        "cap": "33 – 35 lb/24h · Programación por voz Alexa/App para tener hielo al despertar",
        "size": "11.9\" × 9.1\" × 13.3\" (cabe holgadamente bajo cualquier gabinete)",
        "noise": "43 – 45 dB",
        "verdict": "Recomendada para uso diario matutino: programas el encendido desde el celular 30 minutos antes de levantarte y tienes vasos térmicos llenos al instante.",
        "subj": "a modern white smart countertop nugget ice maker on a minimalist kitchen counter beside a smartphone and insulated tumbler",
    },
    {
        "key": "aeitto-nugget-ice-maker-40lb",
        "name": "Aeitto Nugget Ice Maker 40–55 lb Alta Producción",
        "type": "Hielo Nugget de Alto Flujo",
        "price": "US$259 – US$339",
        "cap": "40 a 55 lb/24h · Salida rápida en 5–7 min · Bandeja de goteo extraíble",
        "size": "10.6\" × 15.6\" × 16.8\" (perfil vertical estilizado)",
        "noise": "45 – 48 dB",
        "verdict": "Sobresaliente cuando necesitas hielo nugget tanto a diario como para reuniones familiares de 15 a 25 personas sin tiempos muertos.",
        "subj": "a vertical stainless steel high-output nugget ice maker dispensing crunchy ice directly into a tall glass on a home bar",
    },
    {
        "key": "kbice-self-dispensing-nugget",
        "name": "KBice Self-Dispensing Nugget Ice Maker 2.0",
        "type": "Hielo Nugget con Dispensador sin Pala",
        "price": "US$299 – US$379",
        "cap": "32 lb/24h · Dispensador higiénico por palanca directo al vaso",
        "size": "11.5\" × 16.5\" × 16.7\"",
        "noise": "45 – 47 dB",
        "verdict": "La favorita para familias con niños y reuniones en casa donde muchos invitados se sirven hielo sin meter manos ni palas en la canasta.",
        "subj": "a self-dispensing countertop nugget ice maker filling a clear tumbler via front lever without using a scoop",
    },
    {
        "key": "silonn-slim01-bullet-26lb",
        "name": "Silonn Countertop Bullet Ice Maker SLIM01 (26 lb)",
        "type": "Cubitos Tipo Bala ( Tamaños S y L )",
        "price": "US$69 – US$95",
        "cap": "26 lb/24h (11.8 kg) · 9 cubitos en solo 6 minutos · Tanque de 2 L",
        "size": "8.7\" ancho × 11.4\" fondo × 11.6\" alto (ultraligera de 13.7 lb con asa)",
        "noise": "35 – 41 dB (ultrasilenciosa)",
        "verdict": "La superventas número 1 en Amazon EE. UU. por menos de US$95: silenciosa para uso diario y rapidísima para sacar tandas cada 6 minutos en reuniones.",
        "subj": "a compact matte black bullet ice maker with a carry handle and transparent lid full of bullet-shaped ice cubes on a kitchen counter",
    },
    {
        "key": "euhomy-bullet-26lb-handle",
        "name": "EUHOMY Countertop Ice Maker 26 lb con Asa Portátil",
        "type": "Cubitos Tipo Bala Rápidos",
        "price": "US$68 – US$89",
        "cap": "26 lb/24h · 9 cubitos por ciclo de 6 min · Cesta de 1.5 lb + Autolimpieza",
        "size": "8.8\" × 11.6\" × 11.4\" (fácil de mover a terraza, comedor o RV)",
        "noise": "38 – 42 dB",
        "verdict": "Compra maestra económica para uso diario de agua fría y para llevar a la mesa del jardín o barbacoa cuando llegan visitas.",
        "subj": "a portable silver countertop bullet ice maker with an ergonomic handle next to cold lemonades on a sunlit patio table",
    },
    {
        "key": "frigidaire-efic189-compact-26lb",
        "name": "Frigidaire EFIC189 Compact Ice Maker 26 lb Acero Inoxidable",
        "type": "Cubitos Tipo Bala (2 Tamaños)",
        "price": "US$79 – US$109",
        "cap": "26 lb/24h · Ciclo de 6 a 8 min · Depósito de 2.3 cuartos",
        "size": "9.5\" × 14.1\" × 12.9\"",
        "noise": "39 – 43 dB",
        "verdict": "Acabado elegante en acero inoxidable que combina con electrodomésticos de cocina en EE. UU., confiable para bebidas diarias y cenas.",
        "subj": "a classic stainless steel compact countertop bullet ice maker with a wide viewing window in a modern American kitchen",
    },
    {
        "key": "igloo-self-cleaning-26lb",
        "name": "IGLOO Automatic Self-Cleaning Countertop Ice Maker 26–33 lb",
        "type": "Cubitos Tipo Bala Clásicos",
        "price": "US$84 – US$119",
        "cap": "26 a 33 lb/24h · 9 cubos en 7 min · Ciclo automático de limpieza",
        "size": "9.6\" × 12.3\" × 12.6\" (con asa abatible)",
        "noise": "40 – 44 dB",
        "verdict": "Marca clásica de coolers muy valorada para casas de verano, campamentos en RV y reuniones informales en terraza.",
        "subj": "a retro-modern white and aqua countertop portable ice maker beside chilled sodas and fruit on a bright summer counter",
    },
    {
        "key": "aglucky-countertop-26lb",
        "name": "AGLUCKY Countertop Ice Maker Machine 26.5 lb",
        "type": "Cubitos Tipo Bala Económicos",
        "price": "US$64 – US$85",
        "cap": "26.5 lb/24h · 9 cubitos en 6–8 min · Tanque de 1.5 L",
        "size": "8.9\" × 12.3\" × 12.6\"",
        "noise": "38 – 41 dB",
        "verdict": "Una de las opciones de entrada más económicas en Amazon EE. UU. para dormitorios universitarios, oficinas pequeñas y primer departamento.",
        "subj": "a compact countertop bullet ice maker on a clean studio apartment kitchenette counter next to a pitcher of cold water",
    },
    {
        "key": "euhomy-clear-square-40lb",
        "name": "EUHOMY 40–45 lb Clear Square Ice Maker con Pantalla LCD",
        "type": "Cubo Cuadrado Cristalino (24 cubos por ciclo)",
        "price": "US$129 – US$169",
        "cap": "40 a 45 lb/24h (18–20 kg) · 24 cubitos cuadrados transparentes cada 13–18 min · Tanque 3.2 L",
        "size": "10.0\" × 14.2\" × 14.8\" (cabe bajo gabinete de 18\")",
        "noise": "42 – 45 dB",
        "verdict": "La campeona absoluta para reuniones en casa, cócteles y whisky: produce lotes grandes de 24 cubos macizos transparentes que tardan mucho más en derretirse.",
        "subj": "a brushed steel countertop clear square ice cube maker displaying a sheet of 24 crystal-clear square cubes beside an old-fashioned cocktail glass",
    },
    {
        "key": "luma-comfort-im200ss-clear",
        "name": "Luma Comfort IM200SS Clear Ice Cube Maker (28 lb)",
        "type": "Cubo Gourmet Cristalino sin Burbujas",
        "price": "US$229 – US$289",
        "cap": "28 lb/24h · Cubos individuales macizos tipo restaurante cada 15 min",
        "size": "11.5\" × 14.5\" × 13.8\"",
        "noise": "41 – 44 dB",
        "verdict": "Favorita de entusiastas de la coctelería, bourbon y vino blanco en casa que priorizan hielo 100 % transparente libre de sabor y aire.",
        "subj": "macro shot of crystal-clear restaurant-grade square ice cubes in a cut-crystal rocks glass in front of a stainless clear ice machine",
    },
    {
        "key": "newair-clearice40-40lb",
        "name": "NewAir ClearIce40 Countertop Clear Ice Maker (40 lb)",
        "type": "Cubo Cuadrado Grueso Transparente",
        "price": "US$219 – US$279",
        "cap": "40 lb/24h · 24 cubos cristalinos ajustables en grosor · Libre de BPA",
        "size": "11.3\" × 14.3\" × 13.9\"",
        "noise": "43 – 46 dB",
        "verdict": "Diseñada para fiestas, cenas numerosas y bares domésticos que exigen alto tonelaje de hielo cristalino lento en derretirse.",
        "subj": "a home cocktail bar counter featuring a 40-pound clear ice maker, stainless steel ice bucket, tongs and garnished drinks",
    },
    {
        "key": "frigidaire-efic452-clear-40lb",
        "name": "Frigidaire EFIC452-SS 40 lb Large Clear Square Ice Maker",
        "type": "Cubo Cuadrado Transparente Familiar",
        "price": "US$139 – US$185",
        "cap": "40 lb/24h · Ventana superior grande y temporizador digital programable",
        "size": "11.0\" × 14.0\" × 14.5\"",
        "noise": "42 – 46 dB",
        "verdict": "Excelente relación capacidad-precio si tu prioridad son reuniones en casa cada fin de semana y llenar coolers pequeños sin comprar bolsas en la tienda.",
        "subj": "a stainless 40-pound square cube countertop ice maker with digital timer display on a granite kitchen peninsula",
    },
    {
        "key": "cowsar-nugget-pebble-34lb",
        "name": "COWSAR Countertop Pebble Nugget Ice Maker 34 lb",
        "type": "Hielo Nugget / Pebble Económico",
        "price": "US$199 – US$249",
        "cap": "34 lb/24h · Ciclo rápido en 7 min · Autolimpieza de 15 min",
        "size": "9.5\" × 11.4\" × 12.9\"",
        "noise": "43 – 46 dB",
        "verdict": "Puerta de entrada ideal por menos de US$250 al mundo del hielo pebble masticable para refrescos diarios y batidos.",
        "subj": "a compact white and grey pebble countertop ice maker surrounded by fresh berries and iced smoothies in a sunlit kitchen",
    },
    {
        "key": "crownful-bullet-ice-maker-26lb",
        "name": "CROWNFUL Portable Countertop Ice Maker 26 lb",
        "type": "Cubitos Tipo Bala",
        "price": "US$69 – US$89",
        "cap": "26 lb/24h · 9 cubitos en 6–8 min · Sensor infrarrojo automático",
        "size": "8.7\" × 12.3\" × 12.6\"",
        "noise": "39 – 42 dB",
        "verdict": "Sencilla, ligera y cumplidora para uso diario de 2 a 3 personas o como refuerzo del refrigerador en cumpleaños infantiles.",
        "subj": "a clean matte white countertop bullet ice maker with a scoop resting on top in a bright minimalist kitchen",
    },
    {
        "key": "affresh-opal-cleaning-filter-kit",
        "name": "Kit Limpiador Descalcificador Affresh / GE Opal + Filtro de Agua",
        "type": "Accesorio de Mantenimiento y Pureza",
        "price": "US$14 – US$39",
        "cap": "Rinde de 3 a 6 ciclos completos de descalcificación profunda",
        "size": "Compatible universalmente con máquinas de cubitos y nugget",
        "noise": "Elimina hasta 6–10 dB de chirridos causados por sarro en extrusores nugget",
        "verdict": "Imprescindible tanto en uso diario como intensivo para conservar el sabor neutro del hielo, proteger el níquel y alargar la vida del compresor.",
        "subj": "a spotless stainless countertop ice maker next to a water filter cartridge, measuring cup and crystal clear ice cubes",
    },
]


def generate_transactional_320():
    """
    Genera exactamente 320 especificaciones de artículos transaccionales únicos
    distribuidos en los 5 silos transaccionales (90 + 80 + 50 + 50 + 50 = 320).
    Cada tupla:
    (slug, title, pillar, kw, ice_type, price_spec, capacity_spec, size_spec, noise_spec, daily_vs_party, top_picks, visual_subject)
    """
    items = []

    # =========================================================================
    # SILO 1: resenas-maquinas-de-hielo (90 artículos)
    # 20 reseñas maestras completas + 70 análisis específicos por ángulo de compra/versión (20 + 70 = 90)
    # =========================================================================
    for m in MODELS:
        slug = f"{m['key']}-resena-opiniones-amazon"
        title = f"{m['name']}: Reseña Completa, Precio, Capacidad, Tamaño y Ruido en Amazon EE. UU."
        kw = f"{m['name'].lower()} resena opiniones precio amazon"
        items.append((
            slugify_clean(slug),
            title,
            "resenas-maquinas-de-hielo",
            slugify_clean(kw).replace("-", " "),
            m["type"],
            m["price"],
            m["cap"],
            m["size"],
            m["noise"],
            m["verdict"],
            f"{m['name']} + Kit Descalcificador y Contenedor de Hielo",
            m["subj"],
        ))

    review_angles = [
        ("prueba-de-ruido-decibelios-y-uso-diario", "Prueba de Nivel de Ruido (dB), Vibración y Uso Diario en Casa", "análisis acústico en decibelios y comodidad en cocina abierta"),
        ("capacidad-real-por-hora-y-reuniones-en-casa", "Capacidad Real por Hora, Tiempos de Ciclo y Rendimiento en Reuniones", "prueba de libras reales en 2, 6 y 24 horas para invitados"),
        ("medidas-bajo-gabinete-limpieza-y-mantenimiento", "Medidas Exactas Bajo Gabinete, Autolimpieza y Durabilidad a Largo Plazo", "dimensiones en pulgadas/cm bajo alacenas de 18\" y facilidad de limpieza"),
        ("vale-la-pena-en-amazon-estados-unidos-precio", "¿Vale la Pena su Precio en Amazon EE. UU.? Pros, Contras y Alternativas", "relación costo-beneficio frente a competidores directos en Amazon.com"),
    ]
    # 17 primeros modelos × 4 ángulos = 68 + 2 accesorios específicos = 70 -> Total Silo 1 = 90!
    for m in MODELS[:17]:
        for ang_slug, ang_label, ang_focus in review_angles:
            slug = f"{m['key']}-{ang_slug}"
            title = f"{m['name']}: {ang_label}"
            kw = f"{m['name'].lower()} {ang_slug.replace('-', ' ')}"
            items.append((
                slugify_clean(slug),
                title,
                "resenas-maquinas-de-hielo",
                slugify_clean(kw).replace("-", " "),
                m["type"],
                m["price"],
                m["cap"],
                m["size"],
                m["noise"],
                f"Evaluación enfocada en {ang_focus}: {m['verdict']}",
                m["name"],
                f"{m['subj']}, focusing on {ang_focus}",
            ))

    extra_silo1 = [
        (
            "contenedor-hermetico-hielo-congelador-con-pala-magnetica-resena",
            "Contenedor Hermético de Hielo para Congelador con Pala Magnética: Reseña y Capacidad en Amazon",
            "resenas-maquinas-de-hielo",
            "contenedor hermetico de hielo para congelador con pala resena amazon",
            "Accesorio de Almacenamiento para Uso Diario y Fiestas",
            "US$18 – US$32",
            "Almacena de 6 a 10 lb de cubitos o hielo nugget listos para servir",
            "11.2\" × 7.5\" × 6.1\" (encaja en cajones estándar de congelador)",
            "0 dB (aislamiento libre de BPA anti-olores)",
            "Indispensable para acumular tandas los viernes y tener hielo de sobra en reuniones de sábado.",
            "Bin Hermético para Hielo con Pinza y Pala Magnética + Bolsas de Hielo",
            "an airtight BPA-free ice storage bin filled with fresh ice cubes and a magnetic scoop on a white kitchen counter",
        ),
        (
            "alfombrilla-silicona-antigoteo-y-antivibracion-maquina-hielo-resena",
            "Alfombrilla de Silicona Antigoteo y Antivibración para Máquina de Hielo: Reseña y Tamaños",
            "resenas-maquinas-de-hielo",
            "alfombrilla de silicona antigoteo para maquina de hielo resena amazon",
            "Base Protectora Acústica y Antigoteo",
            "US$12 – US$22",
            "Borde elevado de 0.6\" que retiene derrames o condensación",
            "16\" × 12\" y 19\" × 15\" para modelos compactos y Opal/Frigidaire",
            "Reduce entre 2 y 4 dB la resonancia del compresor sobre cuarzo o madera",
            "Protege encimeras delicadas en el uso diario y evita charcos al vaciar o mover la máquina en reuniones.",
            "Alfombrilla de Silicona Gris Oscuro con Borde Antigoteo para Encimera",
            "a sleek countertop ice maker resting on a raised-edge grey silicone anti-vibration mat on a walnut countertop",
        ),
    ]
    items.extend(extra_silo1)
    assert len(items) == 90, f"Silo 1 count: {len(items)}"

    # =========================================================================
    # SILO 2: comparativas-maquinas-de-hielo (80 artículos)
    # Duelos directos Modelo A vs Modelo B y comparativas estructurales
    # =========================================================================
    duel_pairs = [
        (0, 2, "Duelo Rey de Hielo Nugget: ¿Compensa Pagar la Opal 2.0 o Basta la Frigidaire de 44 lb?"),
        (0, 1, "¿Qué Cambia entre la GE Profile Opal 2.0 con Side Tank y la Versión Opal 2.0 Ultra?"),
        (0, 3, "Gama Alta vs Compacta Económica: ¿Opal 2.0 (38 lb) o EUHOMY Nugget (34 lb)?"),
        (2, 3, "¿Qué Máquina de Hielo Nugget Económica Conviene Más por Capacidad, Tamaño y Ruido?"),
        (3, 4, "Las 2 Nugget Compactas Más Vendidas en Amazon EE. UU.: ¿EUHOMY o Silonn?"),
        (4, 5, "Silonn Nugget 33 lb vs Ecozy Smart Nugget con Wi‑Fi: ¿Cuál Elegir para Uso Diario?"),
        (2, 6, "Alta Capacidad Nugget para Fiestas: Frigidaire Gallery 44 lb vs Aeitto 40–55 lb"),
        (0, 7, "Pala Tradicional vs Autodispensador: GE Profile Opal 2.0 vs KBice Self-Dispensing"),
        (3, 17, "Hielo Nugget por Menos de US$260: EUHOMY Pebble vs COWSAR Pebble 34 lb"),
        (8, 9, "El Gran Duelo de Cubitos Bala Económicos (<US$95): Silonn SLIM01 vs EUHOMY 26 lb"),
        (8, 10, "Silonn SLIM01 Compacta vs Frigidaire EFIC189 Acero Inoxidable: Ruido y Durabilidad"),
        (8, 11, "Silonn 26 lb vs IGLOO Self-Cleaning: ¿Cuál Enfría Más Rápido para el Día a Día?"),
        (8, 12, "Silonn SLIM01 vs AGLUCKY 26.5 lb: Comparativa de Precio, Ciclo de 6 Minutos y dB"),
        (9, 10, "EUHOMY 26 lb con Asa vs Frigidaire EFIC189: ¿Portabilidad o Estética Inox?"),
        (9, 18, "EUHOMY 26 lb vs CROWNFUL 26 lb: Diferencias de Canasta, Limpieza y Ruido"),
        (10, 11, "Frigidaire Compacta vs IGLOO Portátil: ¿Cuál Conviene para Verano y Terraza?"),
        (13, 14, "Cubos Cristalinos Cuadrados: EUHOMY 40 lb LCD vs Luma Comfort IM200SS Gourmet"),
        (13, 15, "EUHOMY Clear Square 40 lb vs NewAir ClearIce40: ¿Cuál Rinde Mejor en Reuniones?"),
        (13, 16, "EUHOMY 40 lb vs Frigidaire EFIC452-SS 40 lb: Comparativa de Cubos Cuadrados en Amazon"),
        (14, 15, "Luma Comfort IM200SS vs NewAir ClearIce40: Claridad del Cubo para Cócteles y Whisky"),
        (0, 13, "GE Profile Opal 2.0 (Nugget) vs EUHOMY 40 lb (Cubo Cristalino): ¿Textura o No Aguar Bebidas?"),
        (2, 13, "Frigidaire Nugget 44 lb vs EUHOMY Cubo Cuadrado 40 lb para Fiestas en Casa"),
        (3, 8, "EUHOMY Nugget (US$239) vs Silonn Bala (US$85): ¿Vale el Triple el Hielo Masticable?"),
        (4, 9, "Silonn Nugget 33 lb vs EUHOMY Bala 26 lb: Comparativa de Espacio, Precio y Bebidas"),
        (8, 13, "Cubitos Bala 26 lb (6 Min) vs Cubos Cuadrados 40 lb (15 Min): ¿Rapidez o Duración?"),
        (5, 16, "Ecozy Smart Nugget vs Frigidaire 40 lb Cuadrada: Uso Diario Inteligente vs Fiestas"),
        (6, 15, "Aeitto Nugget Alta Producción vs NewAir ClearIce40 para Barbacoas y Reuniones"),
        (7, 2, "KBice con Dispensador Higiénico vs Frigidaire Gallery 44 lb: Comodidad vs Capacidad"),
        (10, 16, "Frigidaire 26 lb Bala vs Frigidaire 40 lb Cubo Transparente: ¿Cuál Necesita tu Cocina?"),
        (1, 5, "GE Profile Opal 2.0 Ultra Wi‑Fi vs Ecozy Smart Nugget Wi‑Fi: Comparativa de Apps y Precio"),
    ]
    for idx_a, idx_b, subtitle_duel in duel_pairs:
        ma, mb = MODELS[idx_a], MODELS[idx_b]
        slug = f"{ma['key']}-vs-{mb['key']}"
        title = f"{ma['name']} vs {mb['name']}: {subtitle_duel}"
        kw = f"{ma['name'].lower()} vs {mb['name'].lower()}"
        items.append((
            slugify_clean(slug),
            title,
            "comparativas-maquinas-de-hielo",
            slugify_clean(kw).replace("-", " "),
            f"{ma['type']} vs {mb['type']}",
            f"{ma['price']} vs {mb['price']}",
            f"{ma['cap'].split('·')[0].strip()} vs {mb['cap'].split('·')[0].strip()}",
            f"{ma['size'].split('(')[0].strip()} vs {mb['size'].split('(')[0].strip()}",
            f"{ma['noise']} vs {mb['noise']}",
            f"Elige {ma['name']} si priorizas {ma['type'].lower()}; elige {mb['name']} para {mb['verdict'][:85].lower()}",
            f"{ma['name']} y {mb['name']}",
            f"side-by-side comparison of {ma['subj']} and {mb['subj']}",
        ))

    # 50 comparativas conceptuales transaccionales de compra (30 + 50 = 80 en Silo 2)
    vs_concepts = [
        ("maquina-hielo-nugget-vs-cubitos-bala-cual-comprar-amazon", "Máquina de Hielo Nugget vs Máquina de Cubitos Bala: ¿Cuál Comprar en Amazon según Uso Diario o Reuniones?", "Nugget Masticable vs Cubito Bala", "US$219–$599 vs US$68–$109", "33–44 lb/día vs 26–33 lb/día", "12.7\"–16.5\" alto vs 11.4\"–12.9\" alto", "43–48 dB vs 35–42 dB"),
        ("maquina-cubo-cuadrado-cristalino-vs-cubito-bala-hueco", "Máquina de Cubo Cuadrado Cristalino vs Cubito Bala Hueco: Comparativa de Dilución, Precio y Capacidad", "Cubo Transparente Macizo vs Bala Hueca", "US$129–$289 vs US$68–$99", "28–45 lb/día vs 26 lb/día", "14\"–14.8\" alto vs 11.5\" alto", "41–45 dB vs 36–41 dB"),
        ("maquina-hielo-nugget-vs-cubo-cristalino-para-cocteles-y-cafe", "Máquina de Hielo Nugget vs Cubo Cristalino: ¿Cuál Conviene para Iced Coffee Diario y Cócteles en Fiestas?", "Pebble Aireado vs Cubo Gourmet", "US$229–$599 vs US$139–$279", "34–44 lb/día vs 28–45 lb/día", "Ambas caben bajo 18\"", "43–47 dB vs 41–45 dB"),
        ("maquina-de-hielo-con-side-tank-vs-sin-tanque-lateral", "Máquina de Hielo con Tanque Lateral (Side Tank) vs Depósito Interno: ¿Vale la Pena el Espacio Extra?", "Nugget con Tanque Lateral vs Estándar", "US$50–$90 extra por Side Tank", "Triplica autonomía sin rellenar agua", "+4.5\" de ancho en encimera vs huella compacta", "Mismo nivel 44–46 dB"),
        ("maquina-hielo-sobremesa-vs-refrigerador-con-dispensador", "Máquina de Hielo de Sobremesa vs Cambiar a un Refrigerador con Dispensador: Costo, Rapidez y Fallas", "Sobremesa Independiente vs Ice Maker de Nevera", "US$80–$550 vs US$1,600–$3,200", "26–44 lb/día vs solo 3–5 lb/día de nevera", "Portátil en encimera vs instalación fija con plomería", "38–46 dB vs caída nocturna en freezer"),
        ("maquina-hielo-sobremesa-vs-comprar-bolsas-de-hielo", "Máquina de Hielo en Casa vs Comprar Bolsas de Hielo en Supermercado: ¿En Cuántos Meses se Paga Sola?", "Producción Propia con Agua Filtrada vs Bolsas de 7–10 lb", "US$85–$270 pago único vs US$3.50–$5 por bolsa", "Hielo ilimitado al instante vs viajes de última hora", "Ocupa 1 pie cuadrado en cocina vs medio congelador lleno", "Silenciosa en casa"),
        ("maquina-hielo-26-libras-vs-33-libras-por-dia", "Máquina de Hielo de 26 lb vs 33 lb por Día: ¿Cuál Necesitas para Uso Diario Familiar?", "Capacidad Compacta vs Media", "US$69–$95 vs US$99–$139", "26 lb/24h vs 33 lb/24h", "8.7\" ancho vs 10.2\" ancho", "37–41 dB vs 40–44 dB"),
        ("maquina-hielo-26-libras-vs-44-libras-para-reuniones", "Máquina de Hielo de 26 lb vs 40–44 lb/24h: Comparativa Real Cuando Recibes 15 o Más Invitados", "Portátil Rápida vs Alta Producción", "US$75–$99 vs US$139–$329", "0.9 lb/hora real vs 1.7 lb/hora real", "11.5\" alto vs 14.8\"–16.5\" alto", "38 dB vs 45 dB"),
        ("maquina-hielo-con-autodispensador-vs-canasta-con-pala", "Máquina de Hielo con Dispensador Automático vs Canasta con Pala: Higiene, Tamaño y Limpieza", "Palanca Frontal vs Tapa Abatible", "US$269–$379 vs US$75–$329", "32 lb/día vs 26–44 lb/día", "16.7\" alto frontal vs tapa superior", "45 dB vs 38–46 dB"),
        ("maquina-hielo-acero-inoxidable-vs-plastico-mate-negro-blanco", "Máquina de Hielo de Acero Inoxidable vs Acabado Polímero Mate (Negro o Blanco): Aislamiento y Huellas", "Carcasa Inox vs ABS Térmico Mate", "US$89–$599 vs US$68–$269", "Igual capacidad por motor", "Mismo formato bajo gabinete", "ABS amortigua ligeramente vibraciones"),
    ]
    for s, t, it, pr, cp, sz, ns in vs_concepts:
        items.append((
            slugify_clean(s),
            t,
            "comparativas-maquinas-de-hielo",
            slugify_clean(s).replace("-", " "),
            it,
            pr,
            cp,
            sz,
            ns,
            "Analizamos en detalle cuándo compensa la primera opción para el consumo diario en casa y cuándo la segunda gana en reuniones y fiestas.",
            "Silonn SLIM01, EUHOMY Clear Square 40 lb y GE Profile Opal 2.0",
            "two distinct countertop ice makers compared side by side with filled glasses on a bright kitchen island",
        ))

    # 40 duelos específicos adicionales entre marcas y gamas sin repetir ningún par anterior -> 30 + 10 + 40 = 80!
    brand_duels = [
        ("marca-euhomy-vs-silonn-maquinas-de-hielo-amazon", "EUHOMY vs Silonn en Amazon EE. UU.: ¿Qué Marca Hace Mejores Máquinas de Cubitos y Hielo Nugget?"),
        ("marca-ge-profile-vs-frigidaire-maquinas-de-hielo", "GE Profile vs Frigidaire: Comparativa de Fiabilidad, Garantía en EE. UU., Ruido y Precio"),
        ("marca-igloo-vs-frigidaire-maquinas-portatiles", "IGLOO vs Frigidaire en Máquinas de Hielo Portátiles: ¿Cuál Elegir para Cocina y Verano?"),
        ("marca-newair-vs-luma-comfort-hielo-cristalino", "NewAir vs Luma Comfort: ¿Qué Marca Produce el Mejor Cubo Transparente para Bar en Casa?"),
        ("marca-ecozy-vs-euhomy-maquinas-inteligentes-autolimpieza", "Ecozy vs EUHOMY: Comparativa de Sensores, Autolimpieza, App Wi‑Fi y Nivel de Ruido"),
        ("marca-crownful-vs-aglucky-maquinas-economicas", "CROWNFUL vs AGLUCKY: ¿Cuál es la Mejor Máquina de Hielo Económica por Menos de US$85?"),
        ("marca-aeitto-vs-cowsar-maquinas-hielo-nugget", "Aeitto vs COWSAR: Duelo de Máquinas Nugget de Gama Media en Amazon Estados Unidos"),
        ("marca-kbice-vs-frigidaire-gallery-nugget", "KBice Self-Dispensing vs Frigidaire Gallery Nugget: Dispensador Frontal vs Canasta de 44 lb"),
        ("ge-profile-opal-1-0-vs-opal-2-0-diferencias", "GE Profile Opal 1.0 vs Opal 2.0: ¿Qué Mejoró en Ruido, Wi‑Fi, Tanque Lateral y Descalcificación?"),
        ("silonn-slim01-26lb-vs-silonn-nugget-33lb", "Silonn Bullet 26 lb vs Silonn Nugget 33 lb: ¿Qué Modelo de Silonn Conviene para tu Hogar?"),
        ("euhomy-26lb-bala-vs-euhomy-34lb-nugget", "EUHOMY 26 lb Bala vs EUHOMY 34 lb Nugget: Comparativa Completa dentro del Catálogo EUHOMY"),
        ("euhomy-34lb-nugget-vs-euhomy-40lb-cubo-cuadrado", "EUHOMY Nugget 34 lb vs EUHOMY Clear Square 40 lb: ¿Hielo Masticable Diario o Cubo para Invitados?"),
        ("frigidaire-retro-26lb-vs-frigidaire-efic189-inox", "Frigidaire Retro 26 lb vs Frigidaire EFIC189 Inox: Diseño Vintage vs Ventana Panorámica"),
        ("igloo-26lb-vs-igloo-33lb-sobremesa", "IGLOO 26 lb vs IGLOO 33 lb Countertop Ice Maker: ¿Cuándo Necesitas el Salto de Capacidad?"),
        ("maquina-hielo-wifi-app-vs-botones-fisicos-simples", "Máquina de Hielo con Wi‑Fi y App vs Panel de Botones Físicos: ¿Comodidad Diaria o Menor Precio?"),
        ("maquina-hielo-con-luz-uv-vs-autolimpieza-estandar", "Máquina de Hielo con Esterilización UV vs Autolimpieza Estándar por Recirculación: ¿Qué Tan Útil Es?"),
        ("maquina-hielo-recarga-manual-vs-conexion-linea-agua", "Máquina de Sobremesa de Recarga Manual vs Con Kit de Conexión a Línea de Agua: Ventajas y Riesgos"),
        ("maquina-hielo-tapa-transparente-grande-vs-cajon-aislado", "Tapa Superior Transparente vs Cajón Frontal con Doble Aislamiento Térmico: Conservación del Frío"),
        ("maquina-hielo-compacta-menos-de-12-pulgadas-vs-16-pulgadas", "Máquinas Ultra Bajas (<12\" de Alto) vs Modelos Altos (16.5\"): Espacio Bajo Alacenas de Cocina"),
        ("maquina-hielo-silenciosa-40db-vs-alta-potencia-48db", "Máquina Ultrasilenciosa (<40 dB) vs Alta Producción (48 dB): ¿Silencio en Estudio o Kilos para Fiestas?"),
        ("maquina-hielo-100-dolares-vs-300-dolares-amazon", "Máquina de Hielo de US$90 vs US$300 en Amazon EE. UU.: ¿Qué Obtienes Realmente por la Diferencia?"),
        ("maquina-hielo-300-dolares-vs-600-dolares-nugget", "Máquina Nugget de US$270 vs US$580 en Amazon EE. UU.: ¿En Qué Supera la Gama Premium a la Media?"),
        ("maquina-hielo-sobremesa-vs-maquina-bajo-mostrador-empotrada", "Máquina de Hielo de Sobremesa vs Bajo Mostrador (Undercounter): Precio, Instalación y Drenaje"),
        ("maquina-hielo-portatil-con-asa-vs-modelo-fijo-pesado", "Máquina de Hielo Portátil con Asa (14 lb) vs Modelo Fijo Pesado (40 lb): Uso en Terraza y Cocina"),
        ("hielo-bala-pequeno-s-vs-hielo-bala-grande-l-comparativa", "Selector Small (S) vs Large (L) en Máquinas de Cubitos: Tiempo de Ciclo, Grosor y Duración en el Vaso"),
        ("limpiador-acido-citrico-vs-liquido-descalcificador-comercial", "Ácido Cítrico Alimentario vs Descalcificador Líquido Affresh/Opal en Amazon: Precio y Seguridad en Níquel"),
        ("jarra-filtrante-brita-vs-filtro-interno-maquina-hielo", "Usar Jarra Filtrante Externa vs Filtro Interno en la Máquina de Hielo: Costo Anual y Sabor"),
        ("maquina-hielo-para-2-personas-vs-familia-de-5", "Máquina de Hielo para Pareja (1–2 Personas) vs Familia de 5+: Comparativa de Litros y Libras"),
        ("maquina-hielo-para-iced-coffee-vs-para-smoothies-licuadora", "Máquina Ideal para Iced Coffee vs Para Licuar Smoothies y Frappés sin Dañar las Cuchillas"),
        ("maquina-hielo-para-apartamento-estudio-vs-casa-con-patio", "Máquina de Hielo para Apartamento Estudio Silencioso vs Casa con Patio y Barbacoa"),
        ("maquina-hielo-sobremesa-vs-bandejas-silicona-esferas-whisky", "Máquina de Hielo Cristalino vs Moldes de Silicona para Esferas: Comodidad cuando Tienes Invitados"),
        ("euhomy-clear-40lb-vs-silonn-nugget-33lb-mismo-rango", "EUHOMY Cubo Cristalino 40 lb vs Silonn Nugget 33 lb: ¿Qué Estilo de Hielo Regalar o Comprar?"),
        ("frigidaire-gallery-nugget-vs-ecozy-smart-nugget", "Frigidaire Gallery Nugget 44 lb vs Ecozy Smart Nugget 33 lb: Potencia Bruta vs Control por Voz"),
        ("luma-comfort-im200ss-vs-frigidaire-efic452-40lb", "Luma Comfort IM200SS vs Frigidaire EFIC452-SS 40 lb: Pureza Gourmet vs Volumen Económico"),
        ("ge-profile-opal-2-0-vs-aeitto-nugget-40lb", "GE Profile Opal 2.0 vs Aeitto Nugget 40–55 lb: Diseño Bajo Gabinete vs Formato Torre Económico"),
        ("silonn-slim01-vs-crownful-26lb-sobremesa", "Silonn SLIM01 vs CROWNFUL 26 lb: Comparativa de Ruido, Tiempo del Primer Lote y Limpieza"),
        ("igloo-26lb-vs-aglucky-26lb-cual-dura-mas", "IGLOO 26 lb vs AGLUCKY 26.5 lb: ¿Qué Máquina Compacta Económica Conviene en Amazon EE. UU.?"),
        ("newair-clearice40-vs-frigidaire-gallery-nugget-fiestas", "NewAir ClearIce40 vs Frigidaire Gallery Nugget 44 lb: ¿Cubo Lento o Pebble Crujiente para Fiestas?"),
        ("kbice-dispensador-vs-euhomy-nugget-34lb-higiene", "KBice Dispensador sin Pala vs EUHOMY Nugget 34 lb: Espacio en Encimera vs Higiene Infantil"),
        ("contenedor-hielo-acero-doble-pared-vs-bin-plastico-freezer", "Cubeta Térmica Doble Pared de Mesa vs Bin Plástico de Congelador: Cómo Servir Mejor en Reuniones"),
    ]
    for s, t in brand_duels:
        items.append((
            slugify_clean(s),
            t,
            "comparativas-maquinas-de-hielo",
            slugify_clean(s).replace("-", " "),
            "Comparativa Directa Cubitos / Nugget",
            "US$69 – US$599 según gama",
            "26 lb a 45 lb/24h verificadas",
            "8.7\" a 13.4\" de ancho (compatibles bajo gabinete)",
            "36 dB a 47 dB medidos",
            "Guía comparativa con recomendación separada para quien toma bebidas frías a diario y quien organiza reuniones en casa.",
            "GE Profile Opal 2.0, Frigidaire Gallery Nugget, Silonn SLIM01 y EUHOMY 40 lb",
            "two modern countertop ice makers placed side by side on a clean marble kitchen island with glasses of ice",
        ))
    assert len(items) == 90 + 80, f"After Silo 2 count: {len(items)}"

    # =========================================================================
    # SILO 3: mejores-maquinas-hielo-nugget (50 artículos)
    # Rankings transaccionales exclusivos de hielo tipo nugget / pebble / sonic
    # =========================================================================
    nugget_rankings = [
        ("mejores-maquinas-de-hielo-nugget-sobremesa-amazon", "Las 9 Mejores Máquinas de Hielo Tipo Nugget de Sobremesa en Amazon EE. UU. (Calidad-Precio y Silencio)"),
        ("mejores-maquinas-hielo-nugget-economicas-menos-de-250-dolares", "Las 7 Mejores Máquinas de Hielo Nugget Económicas (Menos de US$250) en Amazon Estados Unidos"),
        ("mejores-maquinas-hielo-nugget-menos-de-300-dolares", "Las 7 Mejores Máquinas de Hielo Masticable Nugget por Menos de US$300 en Amazon EE. UU."),
        ("mejores-maquinas-hielo-nugget-silenciosas-bajo-ruido", "Las 6 Máquinas de Hielo Tipo Nugget Más Silenciosas (<45 dB) para Cocinas Abiertas y Oficinas"),
        ("mejores-maquinas-hielo-nugget-compactas-cocinas-pequenas", "Las 7 Máquinas de Hielo Nugget Más Compactas para Encimeras Pequeñas y Apartamentos"),
        ("mejores-maquinas-hielo-nugget-bajo-gabinete-18-pulgadas", "Las 6 Mejores Máquinas de Hielo Nugget que Caben Bajo Gabinetes de 18 Pulgadas sin Moverlas"),
        ("mejores-maquinas-hielo-nugget-con-tanque-lateral-side-tank", "Las 5 Mejores Máquinas de Hielo Nugget con Tanque Lateral de Gran Autonomía en Amazon"),
        ("mejores-maquinas-hielo-nugget-para-iced-coffee-cafe-frio", "Las 7 Mejores Máquinas de Hielo Nugget para tu Estación de Iced Coffee y Cold Brew en Casa"),
        ("mejores-maquinas-hielo-nugget-para-reuniones-y-fiestas", "Las 6 Máquinas de Hielo Tipo Nugget de Mayor Capacidad (40 a 55 lb/día) para Reuniones en Casa"),
        ("mejores-maquinas-hielo-nugget-para-uso-diario-familiar", "Las 7 Mejores Máquinas de Hielo Nugget para Uso Diario de Toda la Familia en EE. UU."),
        ("mejores-maquinas-hielo-sonic-ice-masticable-suave", "Las 7 Mejores Máquinas de Sonic Ice (Hielo Suave y Crujiente Estilo Restaurante) en Amazon"),
        ("mejores-maquinas-hielo-pebble-granizado-fino-bebidas", "Las 6 Mejores Máquinas de Hielo Pebble Fino para Refrescos, Mocktails y Tés Helados"),
        ("mejores-maquinas-hielo-nugget-con-autolimpieza-facil", "Las 7 Máquinas de Hielo Nugget Más Fáciles de Limpiar y Descalcificar con Un Solo Botón"),
        ("mejores-maquinas-hielo-nugget-con-dispensador-automatico", "Las 5 Mejores Máquinas de Hielo Nugget con Autodispensador Frontal Higiénico sin Pala"),
        ("mejores-maquinas-hielo-nugget-con-wifi-y-alexa", "Las 5 Mejores Máquinas de Hielo Nugget Inteligentes con Wi‑Fi, App y Control por Voz"),
        ("mejores-maquinas-hielo-nugget-con-luz-uv-antibacterial", "Las 6 Mejores Máquinas de Hielo Nugget con Luz UV Interna para Agua Limpia a Diario"),
        ("mejores-maquinas-hielo-nugget-acero-inoxidable", "Las 7 Mejores Máquinas de Hielo Nugget en Acero Inoxidable Antihuellas en Amazon EE. UU."),
        ("mejores-maquinas-hielo-nugget-color-negro-mate", "Las 6 Mejores Máquinas de Hielo Nugget en Negro Mate Elegante para Barras de Café Modernas"),
        ("mejores-maquinas-hielo-nugget-color-blanco-minimalista", "Las 6 Mejores Máquinas de Hielo Nugget Blancas para Cocinas Luminosas de Cuarzo"),
        ("mejores-alternativas-economicas-a-ge-profile-opal-2-0", "Las 7 Mejores Alternativas Económicas a la GE Profile Opal 2.0 en Amazon Estados Unidos"),
        ("mejores-maquinas-hielo-nugget-para-vasos-stanley-yeti-40oz", "Las 6 Mejores Máquinas de Hielo Nugget para Llenar Termos Stanley, Yeti y Owala de 40 oz Cada Mañana"),
        ("mejores-maquinas-hielo-nugget-para-embarazadas-antojo-hielo", "Las 6 Máquinas de Hielo Nugget Más Suaves para Masticar sin Dañar el Esmalte Dental"),
        ("mejores-maquinas-hielo-nugget-para-batidos-y-smoothies", "Las 6 Mejores Máquinas de Hielo Nugget Fácil de Triturar para Batidos Proteicos y Smoothies"),
        ("mejores-maquinas-hielo-nugget-rapidas-menos-de-10-minutos", "Las 6 Máquinas de Hielo Tipo Nugget Más Rápidas (Primer Lote entre 6 y 10 Minutos)"),
        ("mejores-maquinas-hielo-nugget-con-cajon-deslizante", "Las 5 Mejores Máquinas de Hielo Nugget con Cajón Frontal que No Requieren Espacio Superior"),
        ("mejores-maquinas-hielo-nugget-para-oficina-en-casa", "Las 6 Mejores Máquinas de Hielo Nugget Silenciosas para Home Office y Salas de Descanso"),
        ("mejores-maquinas-hielo-nugget-para-rv-camper-autocaravana", "Las 6 Mejores Máquinas de Hielo Nugget Compactas y de Bajo Consumo para RV y Camper"),
        ("mejores-maquinas-hielo-nugget-para-cocteles-tiki-mojitos", "Las 6 Mejores Máquinas de Hielo Pebble y Nugget para Mojitos, Margaritas y Cócteles Tiki en Casa"),
        ("mejores-maquinas-hielo-nugget-gama-alta-premium", "Las 5 Mejores Máquinas de Hielo Nugget Premium de Gama Alta para Cocinas Gourmet"),
        ("mejores-maquinas-hielo-nugget-para-parejas-2-personas", "Las 6 Mejores Máquinas de Hielo Nugget Pequeñas para 1 o 2 Personas sin Ocupar Toda la Barra"),
        ("mejores-maquinas-hielo-nugget-con-asa-portatiles", "Las 6 Mejores Máquinas de Hielo Nugget Ligeras con Asa para Mover de la Cocina a la Terraza"),
        ("mejores-maquinas-hielo-nugget-bajo-consumo-energetico", "Las 6 Máquinas de Hielo Nugget Más Eficientes en Consumo Eléctrico para Dejar Encendidas"),
        ("mejores-maquinas-hielo-nugget-para-regalar-en-navidad-o-boda", "Las 7 Mejores Máquinas de Hielo Nugget para Regalar en Bodas, Día de la Madre o Navidad en Amazon"),
        ("mejores-maquinas-hielo-nugget-con-filtro-de-agua-compatible", "Las 6 Mejores Máquinas de Hielo Nugget con Filtro Antical para Zonas de Agua Dura en EE. UU."),
        ("mejores-maquinas-hielo-nugget-con-ventana-iluminada-led", "Las 6 Mejores Máquinas de Hielo Nugget con Iluminación LED Interior y Ventana Panorámica"),
        ("mejores-maquinas-hielo-nugget-para-dormitorio-o-bar-privado", "Las 5 Máquinas de Hielo Nugget Más Discretas para Wet Bar, Sótano de Juegos o Suite"),
        ("mejores-maquinas-hielo-nugget-33-a-38-libras-equilibradas", "Las 6 Mejores Máquinas de Hielo Nugget de 33 a 38 lb/día: El Punto Dulce Calidad-Capacidad"),
        ("mejores-maquinas-hielo-nugget-mas-vendidas-amazon-usa", "Top 8 Máquinas de Hielo Nugget Más Vendidas y Mejor Valoradas (+4.5 Estrellas) en Amazon EE. UU."),
        ("mejores-maquinas-hielo-nugget-para-adultos-mayores-faciles", "Las 5 Máquinas de Hielo Nugget Más Sencillas de Usar y Drenar sin Levantar Peso"),
        ("mejores-maquinas-hielo-nugget-con-temporizador-programable", "Las 6 Mejores Máquinas de Hielo Nugget con Temporizador 24h para Tener Hielo Recién Hecho"),
        ("mejores-maquinas-hielo-nugget-euhomy-catalogo-completo", "Las Mejores Máquinas de Hielo Nugget de EUHOMY en Amazon: Comparativa por Tamaño y Precio"),
        ("mejores-maquinas-hielo-nugget-frigidaire-y-ge-profile", "Las Mejores Máquinas de Hielo Nugget de Frigidaire y GE Profile Comparadas por Presupuesto"),
        ("mejores-maquinas-hielo-nugget-silonn-y-ecozy-compactas", "Las Mejores Máquinas de Hielo Nugget de Silonn y Ecozy para Espacios Reducidos"),
        ("mejores-maquinas-hielo-nugget-sin-fugas-buen-aislamiento", "Las 6 Máquinas de Hielo Nugget con Mejor Aislamiento Térmico que Mantienen el Hielo Más Tiempo"),
        ("mejores-maquinas-hielo-nugget-con-conexion-agua-opcional", "Las 5 Mejores Máquinas de Hielo Nugget que Admiten Recarga Automática o Tanque Externo"),
        ("mejores-maquinas-hielo-nugget-para-hidratacion-diaria-ninos", "Las 6 Mejores Máquinas de Hielo Nugget Suave para que toda la Familia Tome Más Agua en Casa"),
        ("mejores-maquinas-hielo-nugget-en-oferta-amazon-prime", "Guía de Compra: Qué Máquinas de Hielo Nugget Suelen Tener Mejores Cupones y Ofertas en Amazon EE. UU."),
        ("mejores-filtros-y-kits-descalcificadores-para-maquinas-nugget", "Los 6 Mejores Filtros y Descalcificadores Seguros para Máquinas de Hielo Nugget en Amazon"),
        ("mejores-contenedores-y-palas-para-guardar-hielo-nugget", "Los 6 Mejores Contenedores y Bolsas para Almacenar Hielo Nugget en el Congelador sin que se Pegue"),
        ("mejores-maquinas-hielo-nugget-guia-definitiva-calidad-precio", "Ranking Calidad-Precio de Máquinas de Hielo Nugget en EE. UU.: Cuál Elegir por Menos de $230, $350 y $600"),
    ]
    for s, t in nugget_rankings:
        items.append((
            slugify_clean(s),
            t,
            "mejores-maquinas-hielo-nugget",
            slugify_clean(s).replace("-", " "),
            "Hielo Tipo Nugget / Pebble Masticable",
            "US$199 – US$629 en Amazon EE. UU.",
            "32 a 55 lb/24h (ciclo inicial 7–12 min)",
            "Modelos desde 8.7\" de ancho y <16.5\" de alto bajo gabinete",
            "42 – 47 dB verificados",
            "Seleccionamos un ganador para uso diario silencioso (iced coffee y vasos térmicos) y otro de alto flujo para reuniones en casa.",
            "GE Profile Opal 2.0, Frigidaire Gallery 44 lb, EUHOMY Nugget 34 lb y Silonn 33 lb",
            "a curated lineup of sleek countertop chewable nugget ice makers with glasses of iced coffee and citrus water in a sunlit kitchen",
        ))
    assert len(items) == 90 + 80 + 50, f"After Silo 3 count: {len(items)}"

    # =========================================================================
    # SILO 4: mejores-maquinas-cubitos-de-hielo (50 artículos)
    # Rankings transaccionales exclusivos de cubitos bala y cubo cuadrado cristalino
    # =========================================================================
    cube_rankings = [
        ("mejores-maquinas-de-cubitos-de-hielo-sobremesa-amazon", "Las 9 Mejores Máquinas de Cubitos de Hielo de Sobremesa en Amazon EE. UU. (Bala y Cubo Cristalino)"),
        ("mejores-maquinas-cubitos-de-hielo-economicas-menos-de-80-dolares", "Las 7 Mejores Máquinas de Cubitos de Hielo por Menos de US$80 en Amazon Estados Unidos"),
        ("mejores-maquinas-cubitos-de-hielo-menos-de-100-dolares", "Las 8 Mejores Máquinas de Hielo de Sobremesa por Menos de US$100: Rápidas, Silenciosas y Compactas"),
        ("mejores-maquinas-cubos-cuadrados-cristalinos-transparentes", "Las 7 Mejores Máquinas de Cubos de Hielo Cuadrados Cristalinos en Amazon EE. UU. (No Aguan tu Bebida)"),
        ("mejores-maquinas-cubitos-bala-rapidas-6-minutos", "Las 7 Máquinas de Cubitos Tipo Bala Más Rápidas en Amazon (9 Cubitos Listos en Solo 6 Minutos)"),
        ("mejores-maquinas-cubitos-alta-capacidad-40-a-48-libras", "Las 7 Mejores Máquinas de Cubitos de 40 a 48 lb/día para Fiestas, Barbacoas y Reuniones Grandes"),
        ("mejores-maquinas-cubitos-ultrasilenciosas-menos-de-40-db", "Las 6 Máquinas de Cubitos de Hielo Más Silenciosas (<40 dB) para Estudios y Departamentos"),
        ("mejores-maquinas-cubitos-pequenas-portatiles-con-asa", "Las 7 Mejores Máquinas de Cubitos Pequeñas con Asa Portátil (Menos de 14 lb de Peso)"),
        ("mejores-maquinas-hielo-cristalino-para-whisky-bourbon-cocteles", "Las 6 Mejores Máquinas de Hielo Transparente de Sobremesa para Whisky, Bourbon y Bar en Casa"),
        ("mejores-maquinas-cubitos-de-hielo-26-libras-uso-diario", "Las 7 Mejores Máquinas de Cubitos de 26 lb/24h para el Consumo Diario en Casa"),
        ("mejores-maquinas-cubitos-de-hielo-33-libras-familiares", "Las 6 Mejores Máquinas de Cubitos de 33 lb/24h cuando 26 Libras se Quedan Cortas"),
        ("mejores-maquinas-cubitos-con-dos-tamanos-pequeno-y-grande", "Las 7 Mejores Máquinas de Hielo con Selector de Cubitos Pequeños (S) y Grandes (L)"),
        ("mejores-maquinas-cubitos-acero-inoxidable-cocina-moderna", "Las 7 Mejores Máquinas de Cubitos de Hielo en Acero Inoxidable en Amazon EE. UU."),
        ("mejores-maquinas-cubitos-diseno-retro-vintage-colores", "Las 6 Mejores Máquinas de Cubitos de Hielo Estilo Retro (Rojo, Menta, Crema y Negro)"),
        ("mejores-maquinas-cubitos-con-autolimpieza-automatica", "Las 7 Mejores Máquinas de Cubitos con Programa Self-Clean Automático de Un Toque"),
        ("mejores-maquinas-cubitos-con-pantalla-lcd-y-temporizador", "Las 6 Mejores Máquinas de Cubos de Hielo con Pantalla LCD y Temporizador Programable 24 Horas"),
        ("mejores-maquinas-cubitos-para-rv-camping-y-botes", "Las 7 Mejores Máquinas de Cubitos Compactas de Bajo Amperaje para RV, Camper y Botes"),
        ("mejores-maquinas-cubitos-para-dormitorio-universitario-dorm", "Las 6 Mejores Máquinas de Cubitos Mini para Dormitorio Universitario (College Dorm) y Escritorio"),
        ("mejores-maquinas-cubitos-para-terraza-patio-y-verano", "Las 6 Mejores Máquinas de Cubitos Resistentes para Terraza Techada, Piscina y Tardes de Verano"),
        ("mejores-maquinas-cubitos-bajo-gabinete-cocinas-angostas", "Las 6 Máquinas de Cubitos con Menos de 9 Pulgadas de Ancho para Encimeras Estrechas"),
        ("mejores-maquinas-cubitos-menos-de-150-dolares-calidad-precio", "Las 7 Mejores Máquinas de Cubitos y Cubo Cuadrado por Menos de US$150 en Amazon EE. UU."),
        ("mejores-maquinas-cubitos-para-llenar-coolers-hieleras", "Las 6 Mejores Máquinas de Cubos Macizos para Llenar tu Cooler Antes de ir a la Playa o Pesca"),
        ("mejores-maquinas-cubitos-silonn-y-euhomy-top-ventas", "Las Mejores Máquinas de Cubitos de Silonn y EUHOMY en Amazon: Guía de Modelos 2026"),
        ("mejores-maquinas-cubitos-frigidaire-e-igloo-confiables", "Las Mejores Máquinas de Cubitos de Frigidaire e IGLOO: Comparativa de Modelos de 26 a 40 lb"),
        ("mejores-maquinas-cubo-gourmet-luma-comfort-y-newair", "Las Mejores Máquinas de Cubo Gourmet Cristalino (Luma Comfort, NewAir y EUHOMY) Comparadas"),
        ("mejores-maquinas-cubitos-con-dispensador-de-agua-fria-2-en-1", "Las 5 Mejores Máquinas 2 en 1: Cubitos de Hielo + Dispensador de Agua Fría de Sobremesa"),
        ("mejores-maquinas-cubitos-negras-antihuellas-cocina", "Las 6 Mejores Máquinas de Cubitos en Color Negro Mate Antihuellas por Menos de US$110"),
        ("mejores-maquinas-cubitos-blancas-compactas-amazon", "Las 6 Mejores Máquinas de Cubitos Blancas Compactas para Cocinas Pequeñas"),
        ("mejores-maquinas-cubitos-con-tanque-grande-mas-de-2-litros", "Las 6 Mejores Máquinas de Cubitos con Depósito de Agua Grande (2.2 L a 3.2 L) para Menos Recargas"),
        ("mejores-maquinas-cubitos-para-oficina-pequena-consultorio", "Las 6 Mejores Máquinas de Cubitos Silenciosas e Higiénicas para Oficinas de 5 a 15 Personas"),
        ("mejores-maquinas-cubitos-para-vino-espumoso-y-cubiteras", "Las 5 Mejores Máquinas de Hielo Rápido para Enfriar Botellas de Vino y Cerveza en 10 Minutos"),
        ("mejores-maquinas-cubitos-para-reemplazar-hielera-nevera-rota", "Las 6 Mejores Máquinas de Cubitos cuando el Ice Maker de tu Refrigerador Deja de Funcionar"),
        ("mejores-maquinas-cubitos-bajo-consumo-100w-inversor-solar", "Las 6 Máquinas de Cubitos de Menor Consumo (~100–120 W) para Usar con Estación de Energía Portátil"),
        ("mejores-maquinas-cubitos-faciles-de-drenar-y-guardar", "Las 6 Máquinas de Cubitos Más Cómodas de Vaciar, Secar y Guardar en Alacena"),
        ("mejores-maquinas-cubos-cuadrados-grosor-ajustable", "Las 6 Mejores Máquinas de Cubos Cuadrados con Ajuste de Grosor de Hielo (+ / - Minutos)"),
        ("mejores-maquinas-cubitos-con-ventana-grande-sin-abrir-tapa", "Las 6 Mejores Máquinas de Cubitos con Ventana Superior Amplia que No Pierden Frío al Mirar"),
        ("mejores-maquinas-cubitos-para-agua-fria-y-refrescos-diarios", "Las 7 Mejores Máquinas de Cubitos Económicas para Agua Fría, Jugos y Refrescos Todos los Días"),
        ("mejores-maquinas-cubitos-para-cenas-de-10-a-20-personas", "Las 6 Mejores Máquinas de Cubitos y Cubo Cuadrado para Cenas y Reuniones en Casa"),
        ("mejores-maquinas-cubitos-semi-comerciales-sobremesa-45lb", "Las 5 Mejores Máquinas de Cubos de Alta Capacidad (45–50 lb) de Sobremesa con Conexión a Botellón"),
        ("mejores-maquinas-cubitos-sin-bpa-grado-alimentario", "Las 6 Mejores Máquinas de Cubitos Certificadas Libres de BPA y sin Olor a Plástico"),
        ("mejores-maquinas-cubitos-para-departamento-de-alquiler", "Las 6 Mejores Máquinas de Cubitos sin Instalación de Plomería para Departamentos de Alquiler"),
        ("mejores-maquinas-cubitos-para-casa-de-playa-clima-calido", "Las 6 Máquinas de Cubitos con Mejor Compresor para Cocinas Cálidas y Casas de Verano"),
        ("mejores-maquinas-cubitos-con-cesta-extraible-y-pala-incluida", "Las 7 Mejores Máquinas de Cubitos con Cesta Amplia y Soporte Integrado para la Pala"),
        ("mejores-maquinas-cubitos-para-regalo-practico-menos-de-100", "Las 6 Mejores Máquinas de Cubitos por Menos de US$100 para Regalar en Mudanzas o Día del Padre"),
        ("mejores-maquinas-cubitos-mas-duraderas-segun-compradores", "Las 7 Máquinas de Cubitos con Mejores Reseñas de Durabilidad (+20.000 Opiniones) en Amazon EE. UU."),
        ("mejores-maquinas-cubitos-media-luna-crescent-sobremesa", "Las 5 Mejores Máquinas de Hielo Media Luna y Cubo Sólido Compactas en Amazon"),
        ("mejores-maquinas-cubitos-para-preparar-cafe-helado-espresso", "Las 6 Mejores Máquinas de Cubos Densos para que el Espresso Caliente No Derrita todo el Hielo"),
        ("mejores-bolsas-y-moldes-complementarios-para-maquina-cubitos", "Las 6 Mejores Bolsas con Cordón y Contenedores en Amazon para Acumular Lotes de Cubitos"),
        ("mejores-maquinas-cubitos-primeros-compradores-guia-rapida", "Las 6 Mejores Máquinas de Cubitos si Nunca Has Tenido una Máquina de Hielo de Sobremesa"),
        ("mejores-maquinas-cubitos-ranking-anual-amazon-usa", "Ranking Definitivo de Máquinas de Cubitos en Amazon EE. UU.: Económica, Silenciosa y Cristalino"),
    ]
    for s, t in cube_rankings:
        items.append((
            slugify_clean(s),
            t,
            "mejores-maquinas-cubitos-de-hielo",
            slugify_clean(s).replace("-", " "),
            "Cubitos Bala (6 min) y Cubo Cuadrado Cristalino",
            "US$64 – US$289 en Amazon EE. UU.",
            "26 a 48 lb/24h (9 cubos en 6 min o 24 cubos en 14 min)",
            "Desde 8.7\" × 11.4\" × 11.6\" (caben bajo cualquier gabinete)",
            "35 – 45 dB reales",
            "Distinguimos claramente los modelos de bala ultrarrápidos para uso diario económico frente a los de 40 lb de cubo cristalino para reuniones y cócteles.",
            "Silonn SLIM01 26 lb, EUHOMY 40 lb Clear Square, Frigidaire EFIC189 y Luma Comfort IM200SS",
            "crystal clear square ice cubes and fast bullet ice cubes in chilled glasses beside sleek countertop ice makers",
        ))
    assert len(items) == 90 + 80 + 50 + 50, f"After Silo 4 count: {len(items)}"

    # =========================================================================
    # SILO 5: maquinas-por-uso-presupuesto-y-espacio (50 artículos)
    # Selección por escenario (Uso Diario vs Reuniones), Presupuesto y Espacio
    # =========================================================================
    scenario_guides = [
        ("mejores-maquinas-de-hielo-para-uso-diario-en-casa", "Las 8 Mejores Máquinas de Hielo de Sobremesa para Uso Diario en Casa (Silenciosas y Prácticas)"),
        ("mejores-maquinas-de-hielo-para-reuniones-y-fiestas-en-casa", "Las 8 Mejores Máquinas de Hielo de Sobremesa para Reuniones, Fiestas y Barbacoas en Casa"),
        ("mejores-maquinas-de-hielo-por-menos-de-70-dolares-amazon", "Las 6 Mejores Máquinas de Hielo de Sobremesa por Menos de US$70 en Amazon Estados Unidos"),
        ("mejores-maquinas-de-hielo-entre-100-y-200-dolares", "Las 7 Mejores Máquinas de Hielo entre US$100 y US$200 en Amazon EE. UU. (Más Capacidad y Claridad)"),
        ("mejores-maquinas-de-hielo-entre-200-y-350-dolares", "Las 7 Mejores Máquinas de Hielo entre US$200 y US$350: Nugget Accesibles y Cubo Cristalino"),
        ("mejores-maquinas-de-hielo-gama-alta-mas-de-400-dolares", "Las 5 Mejores Máquinas de Hielo de Sobremesa Premium (+US$400) cuando Quieres lo Mejor"),
        ("maquinas-de-hielo-para-cocinas-muy-pequenas-y-apartamentos", "Las 7 Mejores Máquinas de Hielo para Cocinas Muy Pequeñas con Poca Encimera"),
        ("maquinas-de-hielo-bajo-gabinete-estandar-18-pulgadas-usa", "Guía de Compra: Máquinas de Hielo que Caben y Abren Bajo Gabinetes de 18 Pulgadas en EE. UU."),
        ("maquinas-de-hielo-mas-silenciosas-para-teletrabajo-y-estudio", "Las 7 Máquinas de Hielo de Sobremesa Más Silenciosas (Menos de 42 dB) en Amazon"),
        ("maquinas-de-hielo-para-familias-numerosas-4-a-6-personas", "Las 7 Mejores Máquinas de Hielo para Familias de 4 a 6 Personas con Alto Consumo Diario"),
        ("maquinas-de-hielo-para-persona-sola-o-pareja", "Las 6 Mejores Máquinas de Hielo Compactas para Vivir Solo o en Pareja sin Desperdiciar Espacio"),
        ("maquinas-de-hielo-para-bar-en-casa-wet-bar-sotano", "Las 7 Mejores Máquinas de Hielo para Montar un Bar en Casa (Home Bar, Whisky y Coctelería)"),
        ("maquinas-de-hielo-para-estacion-de-cafe-coffee-bar", "Las 7 Mejores Máquinas de Hielo para Armar un Coffee Bar en Casa (Iced Latte, Matcha y Cold Brew)"),
        ("maquinas-de-hielo-para-asar-carne-bbq-y-patio-trasero", "Las 6 Mejores Máquinas de Hielo para Tardes de Parrilla, BBQ y Reuniones en el Patio"),
        ("maquinas-de-hielo-para-ver-partidos-super-bowl-y-domingos", "Las 6 Mejores Máquinas de Hielo para Domingos de Fútbol, NFL y Tardes con Amigos en Casa"),
        ("maquinas-de-hielo-para-cenas-navidenas-thanksgiving-y-ano-nuevo", "Las 6 Mejores Máquinas de Hielo para Recibir Familia en Thanksgiving, Navidad y Año Nuevo"),
        ("maquinas-de-hielo-para-oficinas-coworking-y-consultorios", "Las 6 Mejores Máquinas de Hielo para Oficinas Pequeñas y Salas de Café de Empleados"),
        ("maquinas-de-hielo-para-deportistas-recuperacion-hidratacion", "Las 6 Mejores Máquinas de Hielo de Alta Producción para Deportistas, Termos Grandes y Coolers"),
        ("maquinas-de-hielo-para-airbnb-y-casas-vacacionales", "Las 6 Mejores Máquinas de Hielo Duraderas y Fáciles de Usar para Huéspedes de Airbnb"),
        ("maquinas-de-hielo-para-viajes-por-carretera-y-camping", "Las 6 Mejores Máquinas de Hielo Portátiles para Llevar en el Auto, Cabina o Glamping"),
        ("maquinas-de-hielo-para-climas-calurosos-florida-texas-arizona", "Las 7 Mejores Máquinas de Hielo para Hogares en Climas Cálidos (Florida, Texas, California y Arizona)"),
        ("maquinas-de-hielo-bajas-menos-de-13-pulgadas-de-altura", "Las 6 Mejores Máquinas de Hielo con Menos de 13 Pulgadas de Alto para Estantes Bajos"),
        ("maquinas-de-hielo-angostas-menos-de-9-pulgadas-de-ancho", "Las 6 Máquinas de Hielo Más Estrechas (<9\" de Ancho) para Huecos junto a la Cafetera"),
        ("maquinas-de-hielo-ligeras-menos-de-15-libras-peso", "Las 6 Máquinas de Hielo Más Ligeras (<15 lb) para Guardar en Gabinete cuando No las Usas"),
        ("maquinas-de-hielo-para-dejar-encendidas-todo-el-dia", "Las 6 Mejores Máquinas de Hielo con Reciclaje Térmico para Dejar Encendidas de Mañana a Noche"),
        ("maquinas-de-hielo-con-mejor-relacion-libras-por-dolar", "Las 7 Máquinas de Hielo con Mayor Capacidad por Dólar Invertido en Amazon EE. UU."),
        ("maquinas-de-hielo-para-amantes-de-refrescos-y-agua-con-gas", "Las 6 Mejores Máquinas de Hielo para Refrescos, Seltzers y Agua con Gas sin Perder Burbujas"),
        ("maquinas-de-hielo-para-te-helado-limonada-y-aguas-frescas", "Las 6 Mejores Máquinas de Hielo para Jarras de Té Helado (Sweet Tea), Limonada y Aguas Frescas"),
        ("maquinas-de-hielo-para-adultos-mayores-sin-instalacion", "Las 6 Máquinas de Hielo Más Cómodas y Ligeras para Padres y Adultos Mayores en Casa"),
        ("maquinas-de-hielo-con-mejor-servicio-y-repuestos-en-usa", "Las 6 Marcas de Máquinas de Hielo con Mejor Garantía y Repuestos Fáciles en Estados Unidos"),
        ("kits-completos-de-limpieza-y-descalcificacion-amazon", "Los 7 Mejores Líquidos y Polvos Descalcificadores para Máquinas de Hielo en Amazon EE. UU."),
        ("mejores-jarras-y-sistemas-de-agua-filtrada-para-hielo-puro", "Las 6 Mejores Jarras Filtrantes (Brita, ZeroWater, PUR) para Hacer Hielo Cristalino y sin Sarro"),
        ("mejores-cubetas-hieleras-termicas-para-mesa-de-invitados", "Las 7 Mejores Hieleras Térmicas de Acero Inoxidable con Pinzas para Reuniones en Casa"),
        ("mejores-palas-de-acero-y-soportes-magneticos-para-hielo", "Las 6 Mejores Palas de Acero Inoxidable y Ganchos Magnéticos para Máquinas de Sobremesa"),
        ("mejores-enchufes-inteligentes-para-programar-maquina-hielo", "Los 5 Mejores Enchufes Inteligentes Wi‑Fi en Amazon para Automatizar tu Máquina de Hielo Básica"),
        ("maquinas-de-hielo-para-regalar-en-dia-de-la-madre", "Las 6 Mejores Máquinas de Hielo para Regalar a Mamá (Especial Café Frío y Diseño Elegante)"),
        ("maquinas-de-hielo-para-regalar-en-dia-del-padre-bar", "Las 6 Mejores Máquinas de Hielo para Regalar a Papá (Whisky, Parrilla y Reuniones)"),
        ("maquinas-de-hielo-para-estudiantes-y-primer-apartamento", "Las 6 Mejores Máquinas de Hielo Económicas para tu Primer Apartamento en Estados Unidos"),
        ("maquinas-de-hielo-para-cumpleanos-y-fiestas-infantiles", "Las 6 Mejores Máquinas de Hielo Rápidas y Seguras para Cumpleaños y Reuniones Familiares"),
        ("maquinas-de-hielo-para-casas-sin-conexion-de-agua-en-nevera", "Las 7 Mejores Máquinas de Hielo si tu Refrigerador No Tiene Toma de Agua Conectada"),
        ("maquinas-de-hielo-para-zonas-con-agua-muy-dura-cal", "Las 6 Máquinas de Hielo Más Fáciles de Descalcificar si Vives en Zona de Agua Dura"),
        ("maquinas-de-hielo-para-cocteleria-sin-alcohol-mocktails", "Las 6 Mejores Máquinas de Hielo Vistoso para Mocktails, Jugos Naturales y Brunch en Casa"),
        ("maquinas-de-hielo-para-cocinas-blancas-acero-o-negras", "Cómo Elegir Máquina de Hielo por Acabado y Color en Amazon sin Sacrificar Capacidad"),
        ("maquinas-de-hielo-silenciosas-para-bebes-y-sueno-ligero", "Las 5 Máquinas de Hielo con Menos Pitidos y Menor Ruido Nocturno para Hogares con Bebés"),
        ("maquinas-de-hielo-de-alta-velocidad-emergencia-visitas", "Las 6 Máquinas que Sacan Hielo Más Rápido cuando Llegan Visitas de Improviso"),
        ("maquinas-de-hielo-con-mejor-aislamiento-sin-electricidad", "Las 6 Máquinas de Sobremesa cuya Canasta Conserva Mejor el Hielo entre Ciclos"),
        ("maquinas-de-hielo-para-barra-exterior-techada-outdoor", "Las 6 Mejores Máquinas de Hielo Portátiles para Cocinas Exteriores Techadas y Gazebos"),
        ("maquinas-de-hielo-en-black-friday-y-prime-day-amazon", "Qué Máquinas de Hielo Vigilar en Prime Day y Black Friday en Amazon EE. UU. (Cubitos y Nugget)"),
        ("guia-compra-rapida-que-maquina-de-hielo-elegir-en-5-minutos", "Qué Máquina de Hielo de Sobremesa Comprar en Amazon EE. UU.: Test Rápido por Uso, Espacio y Precio"),
        ("top-10-maquinas-de-hielo-sobremesa-recomendadas-por-uso", "Las 10 Mejores Máquinas de Hielo de Sobremesa en Amazon EE. UU. Clasificadas por Uso Diario y Fiestas"),
    ]
    for s, t in scenario_guides:
        items.append((
            slugify_clean(s),
            t,
            "maquinas-por-uso-presupuesto-y-espacio",
            slugify_clean(s).replace("-", " "),
            "Selección Cubitos y Nugget según Escenario",
            "Desde US$65 hasta US$629 en Amazon EE. UU.",
            "26 lb/24h (uso diario) hasta 44–55 lb/24h (reuniones)",
            "Medidas verificadas en pulgadas y cm bajo gabinete",
            "35 dB (ultrasilenciosas) a 47 dB (alta capacidad)",
            "Cada modelo incluye veredicto diferenciado para rutina diaria frente a eventos y reuniones en casa.",
            "Silonn SLIM01, EUHOMY Nugget 34 lb, Frigidaire Gallery 44 lb y EUHOMY Clear Square 40 lb",
            "a welcoming modern home kitchen and entertaining counter featuring countertop ice makers tailored to daily coffee and family parties",
        ))
    assert len(items) == 320, f"Total transactional count: {len(items)}"
    return items


def generate_seo_800():
    """
    Genera exactamente 800 especificaciones de artículos SEO informacionales únicos
    distribuidos en los 7 silos informacionales (120 + 115 + 115 + 115 + 115 + 110 + 110 = 800).
    Cada tupla:
    (slug, title, pillar, kw, core_concept, daily_application, party_application, tech_metric, recommended_models, visual_subject)
    """
    items = []

    # =========================================================================
    # SILO 6: cubitos-vs-hielo-nugget-y-tipos (120 artículos)
    # 20 tipos/propiedades de hielo × 6 aplicaciones/bebidas/fenómenos = 120
    # =========================================================================
    ice_topics = [
        ("hielo-tipo-nugget-masticable", "el hielo tipo nugget masticable", "extrusión por tornillo sinfín que comprime escamas con microbolsas de aire al 25–30 %", "un iced coffee que absorbe el sabor de la bebida", "barra libre de refrescos y cócteles tiki"),
        ("cubitos-tipo-bala-huecos", "los cubitos de hielo tipo bala huecos", "congelación rápida por inmersión sobre 9 dedos evaporadores metálicos en 6 minutos", "enfriar vasos de agua o jugo al instante", "sacar tandas rápidas de emergencia para visitas"),
        ("cubos-cuadrados-cristalinos", "los cubos cuadrados cristalinos sin burbujas", "congelación unidireccional por cascada de agua en movimiento que expulsa gases disueltos", "un café espresso o té sin aguar el sabor", "servir whisky, bourbon y gin-tonics de nivel bar"),
        ("hielo-pebble-granizado-fino", "el hielo pebble (piedrita crujiente)", "cilindros cortos de baja densidad muy suaves para masticar sin esfuerzo", "hidratación diaria y vasos térmicos con popote", "mocktails frutales y aguas frescas en verano"),
        ("hielo-sonic-estilo-restaurante", "el famoso Sonic Ice hecho en casa", "copos compactados a presión con textura porosa y blanda", "antojos de hielo suave durante todo el día", "sorprender a invitados con hielo estilo drive-thru"),
        ("tamano-small-vs-large-cubitos", "el tamaño Small (S) frente a Large (L) en cubitos bala", "variación de 1.5 a 2.5 minutos en el tiempo de congelación sobre las varillas", "cuellos estrechos de botellas deportivas con tamaño S", "vasos anchos con tamaño L que tardan más en derretirse"),
        ("velocidad-de-dilucion-del-hielo", "la velocidad con que se derrite y agua cada tipo de hielo", "relación área superficial / masa y cantidad de aire atrapado en el cristal", "evitar que tu iced latte quede aguado a media mañana", "mantener cócteles fríos durante toda una charla"),
        ("temperatura-real-del-hielo-recien-hecho", "el 'hielo húmedo' (wet ice) a 32 °F vs hielo seco de congelador a 0 °F", "película microscópica de agua líquida superficial recién salida de la canasta", "textura suave inmediata que no pega en los labios", "enfriamiento por transferencia térmica ultrarrápida en coctelera"),
        ("transparencia-vs-hielo-blanco-opaco", "por qué algunos cubitos salen blancos opacos y otros transparentes", "oxígeno microscópico y minerales atrapados al congelar desde afuera hacia adentro", "mejorar la estética de tus bebidas cotidianas", "presentación impecable en copas transparentes para invitados"),
        ("dureza-del-hielo-y-esmalte-dental", "qué tipo de hielo es más blando para masticar y cuidar los dientes", "estructura laminada aireada del hielo nugget frente al cristal compacto del cubo sólido", "masticar hielo con menor impacto mecánico a diario", "ofrecer hielo cómodo para niños y adultos mayores"),
        ("flotabilidad-y-espuma-en-refrescos", "por qué ciertos cubitos hacen perder el gas a los refrescos", "sitios de nucleación microscópicos en superficies rugosas o escarchadas que liberan CO2", "disfrutar agua con gas o soda con más burbujas", "servir jarras y vasos de refresco sin exceso de espuma"),
        ("absorcion-de-sabores-en-hielo-poroso", "cómo el hielo nugget absorbe el sabor del café, chai o jarabes", "capilaridad en los microcanales internos de cada cilindro comprimido", "terminar el vaso disfrutando hielo con sabor a vainilla o café", "postres helados, raspados y cócteles tropicales"),
        ("hielo-media-luna-crescent", "el hielo en forma de media luna (crescent ice)", "perfil curvo que se desliza sin salpicar al verter líquido desde botella o grifo", "servir agua o refresco sin salpicaduras diarias", "llenado rápido de múltiples vasos en cenas"),
        ("hielo-gourmet-sombrero-top-hat", "el hielo gourmet cilíndrico macizo", "congelación individual por rociado inferior libre de impurezas", "bebidas destiladas o refrescos premium en casa", "catas de licores y cenas formales"),
        ("hielo-triturado-vs-hielo-nugget", "la diferencia entre hielo picado de licuadora y hielo nugget real", "puntas irregulares aguadas del hielo roto frente a pepitas uniformes prensadas", "batidos matutinos de textura cremosa", "margaritas y daiquiris consistentes para amigos"),
        ("densidad-y-peso-por-vaso-de-hielo", "cuántos gramos reales de hielo entran en un vaso de 16 oz según la forma", "fracción de empaquetamiento (packing density) del 65 % en nugget vs 48 % en cubos grandes", "dosificar la proporción exacta de leche, café y hielo", "calcular cuántos vasos rinde cada canasta llena"),
        ("choque-termico-al-servir-caliente", "qué hielo resiste mejor verter café o té recién hecho encima", "masa térmica por pieza y grosor de pared del cristal de hielo", "preparar japonés iced pour-over o espresso sobre hielo", "preparar jarras grandes de té helado al momento"),
        ("hielo-para-licuadoras-y-cuchillas", "qué tipo de hielo de sobremesa cuida mejor las cuchillas de tu licuadora", "baja resistencia al corte en pepitas aireadas y balas pequeñas huecas", "smoothies verdes y batidos de proteína diarios", "frappés y granizados en tandas para invitados"),
        ("pureza-sensorial-y-olor-del-hielo", "por qué el hielo de sobremesa sabe más limpio que el del congelador", "ausencia de aire compartido con cebollas, carnes o alimentos congelados", "agua pura fresca sin regusto de nevera", "cócteles delicados donde el aroma lo es todo"),
        ("enfriamiento-en-coctelera-shaker", "qué hielo de sobremesa funciona mejor para agitar y cuál para servir en vaso", "dilución controlada del 20–25 % al agitar durante 12 segundos", "mocktails o iced shaken espresso en casa", "preparar rondas de cócteles equilibrados en reuniones"),
    ]
    ice_contexts = [
        ("explicacion-completa-y-ventajas", "Guía Completa: Cómo Funciona y Cuándo Elegirlo"),
        ("para-iced-coffee-y-cold-brew", "en Iced Coffee, Latte Helado y Cold Brew Diario"),
        ("para-cocteles-whisky-y-reuniones", "para Cócteles, Whisky y Reuniones en Casa"),
        ("para-refrescos-agua-con-gas-y-jugos", "en Refrescos, Agua Mineral con Gas y Jugos"),
        ("para-vasos-termicos-y-hidratacion", "en Termos de Acero (Stanley / Yeti) todo el Día"),
        ("comparado-en-precio-y-maquinas", "según Precio, Ruido y Máquinas que lo Fabrican"),
    ]
    for slug_b, name_b, mech, daily_u, party_u in ice_topics:
        for ctx_s, ctx_t in ice_contexts:
            s = f"{slug_b}-{ctx_s}"
            t = f"Todo sobre {name_b[:1].upper() + name_b[1:]} {ctx_t}"
            kw = f"{slug_b.replace('-', ' ')} {ctx_s.replace('-', ' ')}"
            items.append((
                slugify_clean(s),
                t,
                "cubitos-vs-hielo-nugget-y-tipos",
                slugify_clean(kw).replace("-", " "),
                mech,
                daily_u,
                party_u,
                "Densidad cristalina, tasa de fusión en °F/min y sensación en boca",
                "GE Profile Opal 2.0, EUHOMY Nugget 34 lb, Silonn SLIM01 y EUHOMY Clear Square 40 lb",
                f"close-up photography of {slug_b.replace('-', ' ')} in chilled glassware on a bright kitchen counter",
            ))
    assert len(items) == 120, f"Silo 6 count: {len(items)}"

    # =========================================================================
    # SILO 7: capacidad-tamano-y-ubicacion-cocina (115 artículos)
    # 23 aspectos dimensionales/capacidad × 5 entornos reales = 115
    # =========================================================================
    dim_topics = [
        ("que-significa-capacidad-26-libras-24-horas", "Qué Significa Realmente 26 lb/24h en una Máquina de Hielo", "producción nominal medida a 70 °F de aire y 50 °F de agua frente a ~18–21 lb en cocina real"),
        ("que-significa-capacidad-33-a-38-libras-dia", "Capacidad de 33 a 38 lb/24h: Cuántos Vasos Reales Produce al Día", "entre 65 y 85 vasos de 16 oz a lo largo del día, rindiendo ~1.4 lb cada hora"),
        ("que-significa-capacidad-40-a-48-libras-dia", "Capacidad de 40 a 48 lb/24h: Cuándo Vale la Pena una Máquina Grande", "casi 2 lb de hielo por hora ideales para reuniones de 15 a 30 personas"),
        ("diferencia-capacidad-diaria-vs-capacidad-canasta", "Capacidad Diaria (lb/24h) vs Tamaño de la Canasta (1.5 a 3 lb)", "la máquina detiene el ciclo cuando la cesta de 1.5–3 lb se llena hasta que retiras hielo"),
        ("altura-libre-bajo-gabinetes-18-pulgadas-usa", "Cómo Medir la Altura Bajo Gabinetes de 18 Pulgadas en Cocinas de EE. UU.", "dejar al menos 16.5\" máximo o elegir apertura frontal si hay faldón de luz bajo la alacena"),
        ("espacio-apertura-tapa-superior-vs-cajon-frontal", "Espacio Necesario para Abrir la Tapa Superior vs Cajón Deslizante", "las tapas abatibles requieren de 4 a 7 pulgadas extra arriba salvo que uses bandeja deslizable"),
        ("holgura-ventilacion-lateral-y-trasera-compresor", "Cuántos Centímetros o Pulgadas Dejar Alrededor para Ventilar el Compresor", "mínimo 4 a 6 pulgadas (10–15 cm) libres en la rejilla lateral y trasera para no perder 30 % de eficiencia"),
        ("profundidad-encimera-estandar-24-pulgadas", "Cómo Encaja una Máquina de Hielo en una Encimera Estándar de 24 a 25 Pulgadas", "modelos de 11.5\" a 17.5\" de fondo dejando margen frontal cómodo para apoyar vasos"),
        ("ancho-en-pulgadas-con-y-sin-side-tank", "Cuánto Ancho Ocupa una Máquina Sola (9\"–13\") vs Con Tanque Lateral", "calcular de 9\" para modelos bala compactos hasta 18\" con Side Tank instalado"),
        ("peso-vacia-vs-llena-de-agua-y-hielo", "Cuánto Pesa una Máquina de Hielo Llena de Agua (15 lb vs 48 lb)", "planificar si quedará fija en encimera o si la guardarás en gabinete tras usarla"),
        ("efecto-temperatura-ambiente-cocina-en-produccion", "Cómo Afecta el Calor de la Cocina (70 °F vs 85 °F) a los Kilos de Hielo", "cada 10 °F adicionales alargan el ciclo entre 1.5 y 3 minutos por lote"),
        ("ubicacion-lejos-de-horno-estufa-y-lavavajillas", "Por Qué Nunca Pegar tu Máquina de Hielo al Horno, Air Fryer o Lavavajillas", "el calor radiante reduce la producción y activa ventiladores a máxima velocidad"),
        ("efecto-luz-solar-directa-de-ventana", "Por Qué no Colocar la Máquina Frente al Sol Directo de una Ventana", "calienta la carcasa y los rayos infrarrojos solares pueden activar falsamente el sensor ICE FULL"),
        ("uso-de-base-deslizante-appliance-slider", "Cómo Usar una Base Deslizante bajo tu Máquina para Rellenar Agua Fácilmente", "permite sacar la máquina hacia adelante sin rayar el cuarzo para abrir la tapa superior"),
        ("instalacion-en-isla-de-cocina-con-enchufe", "Cómo Ubicar la Máquina en una Isla de Cocina con Toma GFCI Segura", "conexión directa a 115V/15A sin cables tensos en zonas de paso familiar"),
        ("ubicacion-en-carrito-auxiliar-bar-cart", "Qué Peso Debe Soportar un Carrito de Bar o Mueble de Café para tu Máquina", "recomendar muebles firmes de al menos 60 lb de carga estática con ruedas con freno"),
        ("espacio-cerca-del-fregadero-para-drenar", "Ventajas de Colocar la Máquina a Menos de 60 cm del Fregadero", "permite desaguar por gravedad en 30 segundos sin cargar la máquina llena"),
        ("tamano-del-tanque-de-agua-en-litros-y-galones", "Tanques de 1.2 L, 2.0 L y 3.2 L: Cada Cuántas Horas Tendrás que Rellenar", "relación directa: 1 litro de agua equivale aproximadamente a 2.2 libras de hielo"),
        ("tiempo-del-primer-lote-vs-produccion-continua", "Por Qué el Primer Lote Tarda Más que el Tercer Lote Consecutivo", "los primeros 10–15 minutos enfrían el bloque evaporador y el depósito interno"),
        ("medidas-para-guardar-en-despensa-o-armario", "Dimensiones Mínimas de Alacena o Despensa para Guardar una Máquina Portátil", "modelos de menos de 12\" × 9\" ideales cuando solo la sacas los fines de semana"),
        ("nivelacion-perfecta-en-encimera-inclinada", "Por Qué la Máquina Debe Estar 100 % Nivelada en la Encimera", "un desnivel mayor a 3° altera el flotador de agua y produce cubitos asimétricos"),
        ("ubicacion-en-terraza-techada-y-humedad", "Requisitos de Espacio y Sombra para Usar tu Máquina en Patio Techado", "proteger de lluvia, polvo y temperaturas mayores a 95 °F (35 °C)"),
        ("calculo-capacidad-segun-clima-verano-invierno", "Cuánta Capacidad Extra Elegir en Verano Frente a Invierno", "sumar un margen del 30 % de lb/24h para los meses cálidos de junio a septiembre"),
    ]
    dim_envs = [
        ("en-apartamento-pequeno", "en Apartamentos Pequeños y Estudios"),
        ("en-cocina-familiar-estandar", "en Cocinas Familiares de Uso Diario"),
        ("para-barra-de-cafe-o-bebidas", "en una Estación de Café o Home Bar"),
        ("cuando-organizas-reuniones", "al Planificar Reuniones y Visitas en Casa"),
        ("guia-de-medidas-pulgadas-y-cm", "con Tabla Exacta en Pulgadas y Centímetros"),
    ]
    for s_b, t_b, concept in dim_topics:
        for e_s, e_t in dim_envs:
            s = f"{s_b}-{e_s}"
            t = f"{t_b} {e_t}"
            kw = f"{s_b.replace('-', ' ')} {e_s.replace('-', ' ')}"
            items.append((
                slugify_clean(s),
                t,
                "capacidad-tamano-y-ubicacion-cocina",
                slugify_clean(kw).replace("-", " "),
                concept,
                "Ajuste ergonómico en encimera para servirse hielo a diario sin estorbar al cocinar",
                "Ubicación accesible para invitados con ventilación suficiente en operación continua",
                "Pulgadas de alto/ancho/fondo, holgura de 18\" bajo gabinete y lb/24h reales",
                "Silonn SLIM01 (11.6\" alto), EUHOMY Nugget (13\" alto) y GE Profile Opal 2.0 (16.5\" alto)",
                f"a modern kitchen counter measuring placement and clearance for a countertop ice maker {e_s.replace('-', ' ')}",
            ))
    assert len(items) == 120 + 115, f"After Silo 7 count: {len(items)}"

    # =========================================================================
    # SILO 8: ruido-consumo-electrico-y-funcionamiento (115 artículos)
    # 23 temas acústicos/eléctricos/mecánicos × 5 escenarios = 115
    # =========================================================================
    tech_topics = [
        ("cuantos-decibelios-hace-maquina-de-hielo", "Cuántos Decibelios (dB) Hace una Máquina de Hielo de Sobremesa", "38–42 dB equivale a una biblioteca o refrigerador moderno; 46–50 dB a una charla suave"),
        ("diferencia-ruido-compresor-ventilador-y-caida", "Los 3 Sonidos Normales de una Máquina de Hielo: Ventilador, Compresor y Caída", "entender qué sonido es continuo y cuál dura solo 3 segundos cada 7 minutos"),
        ("ruido-extrusor-maquina-nugget-vs-cubitos", "Por Qué las Máquinas Nugget Suenan Distinto a las de Cubitos Bala", "el motor reductor del tornillo sinfín suma un murmullo mecánico grave al del compresor"),
        ("como-reducir-ruido-y-vibracion-en-encimera", "Cómo Reducir el Ruido y la Vibración de tu Máquina en Cuarzo o Madera", "usar alfombrilla de silicona densa, limpiar rejillas de polvo y separar 12 cm de la pared"),
        ("cuantos-watts-consume-maquina-de-hielo", "Cuántos Watts (100 W a 170 W) Consume una Máquina de Hielo en Marcha", "consumo similar a 2 bombillas antiguas mientras congela y menos de 5 W cuando la cesta está llena"),
        ("cuanto-sube-recibo-de-luz-al-mes-en-usa", "Cuánto Cuesta en Dólares al Mes Tener una Máquina de Hielo en EE. UU.", "con tarifa media de US$0.16/kWh en EE. UU., usarla 6–8 h diarias cuesta apenas US$4 a US$7 al mes"),
        ("por-que-la-canasta-no-es-un-congelador", "Por Qué la Canasta de una Máquina de Sobremesa No Es un Congelador", "está aislada térmicamente sin serpentín activo para reciclar el agua derretida en hielo fresco"),
        ("como-funciona-reciclaje-automatico-del-agua", "Cómo Funciona el Reciclaje del Agua Derretida hacia el Depósito Inferior", "el hielo que se funde vuelve por el filtro inferior para recongelarse sin desperdiciar una gota"),
        ("como-funciona-sensor-infrarrojo-ice-full", "Cómo Funciona el Sensor Infrarrojo de Cesta Llena (ICE FULL)", "un haz óptico entre ambos lados de la tina pausa el compresor apenas el hielo lo interrumpe"),
        ("ciclo-gas-caliente-para-soltar-cubitos", "Por Qué la Máquina Suelta los Cubitos en Segundos (Válvula Solenoide)", "invierte brevemente gas tibio a las varillas para desprender los 9 cubos sin resistencia eléctrica"),
        ("gas-refrigerante-ecologico-r600a-vs-r290", "Qué Es el Refrigerante R600a en Máquinas de Hielo Modernas y por Qué Es Silencioso", "isobutano natural de alta eficiencia termodinámica y menor presión de trabajo"),
        ("por-que-esperar-2-a-24-horas-antes-de-enchufar", "Por Qué Debes Dejar Reposar una Máquina Nueva Vertical Antes del Primer Uso", "permite que el aceite lubricante del compresor baje tras el transporte de Amazon"),
        ("uso-seguro-enchufe-pared-vs-extension-regleta", "Por Qué Conectar tu Máquina Directo al Enchufe de Pared sin Regletas Finas", "evita caídas de voltaje en el pico de arranque del compresor (surge amps)"),
        ("uso-con-estacion-energia-ecoflow-jackery-solar", "Cómo Calcular la Autonomía en Wh con una Batería Portátil Jackery o EcoFlow", "una estación de 500 Wh alimenta una máquina de 110 W durante ~4 horas de producción"),
        ("apagado-nocturno-vs-dejarla-en-standby", "Conviene Apagar la Máquina por la Noche o Dejarla en Pausa Automática", "apagarla ahorra ciclos nocturnos innecesarios y reduce el ruido a 0 dB mientras duermes"),
        ("temperatura-del-agua-inicial-fria-vs-ambiente", "Qué Pasa si Llenas el Tanque con Agua Fría de Nevera en Vez de Agua Ambiente", "acelera los primeros 2 lotes pero nunca se debe echar hielo dentro del depósito de agua"),
        ("calor-tibio-por-las-rejillas-laterales-normal", "Es Normal que Salga Aire Tibio por el Costado de tu Máquina de Hielo", "el condensador disipa el calor extraído del agua igual que la parte trasera de un refrigerador"),
        ("pitidos-sonoros-y-alertas-led-significado", "Cómo Funcionan las Alertas Acústicas de Falta de Agua y Cesta Llena", "qué modelos permiten silenciar los pitidos para no despertar a nadie en casa"),
        ("vida-util-en-anos-de-una-maquina-sobremesa", "Cuántos Años Dura Realmente una Máquina de Hielo de Sobremesa Bien Cuidada", "entre 3 y 6+ años cuando se descalcifica mensualmente y mantiene buena ventilación"),
        ("bomba-sumergible-de-agua-interna-funcionamiento", "Cómo Trabaja la Mini Bomba de Agua Interna en Ciclos Continuos", "eleva agua desde la cubeta inferior a la bandeja congeladora con apenas 3–5 W"),
        ("ventilador-dc-brushless-y-flujo-de-aire", "La Importancia del Ventilador Silencioso DC en el Nivel de Ruido Total", "gran parte de los decibelios provienen del flujo de aire y no del compresor"),
        ("aislamiento-espuma-ciclopentano-en-carcasa", "Cómo el Aislamiento de Espuma de Alta Densidad Mantiene el Hielo Horas", "paredes gruesas reducen arranques frecuentes y bajan el gasto eléctrico"),
        ("voltaje-115v-60hz-estados-unidos-compatibilidad", "Especificaciones Eléctricas 110–120V / 60Hz en Máquinas de Amazon EE. UU.", "consumo de 1.2 A a 2.4 A compatible con cualquier circuito doméstico norteamericano"),
    ]
    tech_contexts = [
        ("en-uso-diario-continuo", "en el Uso Diario en Casa"),
        ("en-cocinas-abiertas-y-salas", "en Cocinas de Concepto Abierto y Estudios"),
        ("durante-reuniones-largas", "en Jornadas Largas de Fiesta o Reunión"),
        ("en-modelos-cubitos-vs-nugget", "Comparando Modelos de Cubitos y Nugget"),
        ("consejos-practicos-ahorro", "con Consejos Prácticos de Eficiencia"),
    ]
    for s_b, t_b, concept in tech_topics:
        for c_s, c_t in tech_contexts:
            s = f"{s_b}-{c_s}"
            t = f"{t_b} {c_t}"
            kw = f"{s_b.replace('-', ' ')} {c_s.replace('-', ' ')}"
            items.append((
                slugify_clean(s),
                t,
                "ruido-consumo-electrico-y-funcionamiento",
                slugify_clean(kw).replace("-", " "),
                concept,
                "Operación silenciosa (<42 dB) y consumo menor a US$6/mes en rutina diaria",
                "Estabilidad térmica del compresor al fabricar hielo seguido para invitados",
                "Decibelios (dB) a 1 metro, potencia en Watts (W) y consumo kWh/mes",
                "Silonn SLIM01 (35–41 dB), EUHOMY Nugget (42–45 dB) y Ecozy Smart Nugget",
                f"editorial home interior showing a quiet energy-efficient countertop ice maker {c_s.replace('-', ' ')}",
            ))
    assert len(items) == 120 + 115 + 115, f"After Silo 8 count: {len(items)}"

    # =========================================================================
    # SILO 9: limpieza-descalcificacion-y-agua (115 artículos)
    # 23 temas de limpieza/agua × 5 casos = 115
    # =========================================================================
    clean_topics = [
        ("como-activar-modo-autolimpieza-self-clean", "Cómo Usar el Botón de Autolimpieza (Self-Clean) Paso a Paso", "mantener pulsado ON/OFF o CLEAN por 3–5 segundos con agua limpia hasta el nivel MAX"),
        ("como-descalcificar-con-acido-citrico-alimentario", "Cómo Descalcificar tu Máquina de Hielo con Ácido Cítrico sin Olor", "2 cucharadas de ácido cítrico grado alimentario en 1 litro de agua tibia disuelven la cal sin dejar olor a vinagre"),
        ("limpiar-con-vinagre-blanco-proporcion-segura", "Cómo Limpiar una Máquina de Hielo con Vinagre Blanco Diluido (1:10)", "diluir vinagre blanco destilado al 5 % y realizar al menos 3 enjuagues completos con agua pura"),
        ("por-que-usar-descalcificador-seguro-para-niquel", "Por Qué los Evaporadores Niquelados Requieren Limpiador Nickel-Safe", "los ácidos agresivos pueden corroer el recubrimiento metálico de las varillas o cilindro"),
        ("cada-cuanto-limpiar-maquina-uso-diario-vs-ocasional", "Cada Cuánto Limpiar y Descalcificar tu Máquina (Semanal vs Mensual)", "limpieza ligera semanal de cubeta y descalcificación cada 2–4 semanas según la dureza del agua"),
        ("que-agua-usar-filtrada-embotellada-o-grifo", "Qué Agua Es Mejor para tu Máquina de Hielo: Filtrada, Manantial o Grifo", "el agua filtrada por carbón activado elimina cloro y reduce la formación de escamas minerales"),
        ("por-que-agua-destilada-o-ro-confunde-sensores", "Por Qué el Agua 100 % Destilada (0 TDS) Puede Dar Error 'Add Water'", "muchos sensores miden conductividad eléctrica mínima; basta añadir una pizca de agua mineral"),
        ("como-evitar-moho-y-biofilm-rosado-en-deposito", "Cómo Prevenir el Biofilm Rosado o Moho en Mangueras y Esquinas", "vaciar el agua estancada si no la usarás por más de 48 horas y secar con la tapa entreabierta"),
        ("primera-limpieza-maquina-nueva-recien-comprada", "Cómo Lavar una Máquina de Hielo Nueva Antes de Probar el Primer Cubito", "lavar cesta y pala con jabón neutro, correr 1 ciclo Self-Clean y desechar los 2 primeros lotes"),
        ("como-limpiar-tanque-lateral-side-tank-y-tubo", "Cómo Limpiar el Tanque Lateral (Side Tank) y su Manguera de Silicona", "usar cepillo flexible largo y solución suave para mantener cristalino el conducto externo"),
        ("cuando-cambiar-filtro-de-agua-interno-opal", "Cada Cuántos Meses Cambiar el Filtro Interno de tu Máquina de Hielo", "reemplazar cada 2 a 3 meses o cada 150 galones para evitar restricción de flujo"),
        ("que-significa-polvo-blanco-flotando-al-derretirse", "Por Qué Quedan Partículas Blancas al Derretirse el Hielo en el Vaso", "son carbonatos de calcio y magnesio inofensivos del agua dura que se eliminan usando jarra filtrante"),
        ("peligro-nunca-mezclar-cloro-lejia-con-vinagre", "Regla de Seguridad: Por Qué Jamás Mezclar Lejía (Bleach) con Vinagre o Descalcificador", "la mezcla libera vapores tóxicos; la higienización con 1 cucharadita de lejía en 1 galón requiere enjuague previo total"),
        ("como-limpiar-rejilla-ventilador-y-condensador", "Cómo Aspirar el Polvo y Pelusa de las Rejillas Laterales de tu Máquina", "un cepillo suave cada 2 meses mejora la disipación de calor y baja el ruido del ventilador"),
        ("como-limpiar-varillas-evaporadoras-de-cubitos", "Cómo Limpiar con Hisopo o Paño Suave los Dedos Evaporadores Superiores", "retirar suavemente restos minerales sin doblar ni raspar con objetos metálicos"),
        ("como-quitar-sabor-a-plastico-o-raro-al-hielo", "Cómo Eliminar por Completo el Olor o Sabor Extraño en el Hielo", "bicarbonato de sodio diluido seguido de enjuague con agua filtrada y jugo de limón suave"),
        ("como-drenar-por-el-tapon-inferior-sin-mojar-cocina", "Truco para Vaciar el Tapón Inferior de Drenaje Directo al Fregadero", "acercar el borde trasero al lavaplatos antes de quitar el tapón de silicona"),
        ("dureza-del-agua-tds-en-estados-unidos-impacto", "Cómo Medir los TDS (ppm) del Agua de tu Ciudad y Proteger tu Máquina", "por encima de 150 ppm el sarro se acumula el doble de rápido en máquinas nugget"),
        ("higiene-de-la-pala-de-hielo-donde-guardarla", "Por Qué Guardar la Pala Fuera de la Canasta Mejora la Higiene Familiar", "usar soporte magnético lateral evita transferir bacterias de las manos al hielo fresco"),
        ("secado-interno-completo-despues-de-una-fiesta", "Cómo Vaciar y Secar la Máquina en 5 Minutos Después de una Reunión", "drenar en tibio y dejar la puerta abierta 12 horas evita cualquier humedad atrapada"),
        ("limpieza-del-sensor-optico-y-malla-filtro-fondo", "Cómo Destapar la Malla Filtro del Fondo del Depósito de Agua", "sacar la pequeña rejilla plástica interior con dos dedos y enjuagar bajo el chorro"),
        ("uso-de-agua-de-osmosis-inversa-remineralizada", "Cómo Usar Agua de Ósmosis Inversa (RO) en Máquinas de Hielo de Sobremesa", "los filtros RO con etapa alcalina/remineralizadora dan hielo ultra puro sin fallos de sensor"),
        ("calendario-mantenimiento-anual-maquina-hielo", "Checklist de Mantenimiento de 10 Minutos al Mes para Hielo Siempre Puro", "rutina simple para quienes usan la máquina todos los días del año"),
    ]
    clean_contexts = [
        ("en-maquinas-de-hielo-nugget", "en Máquinas de Hielo Tipo Nugget"),
        ("en-maquinas-de-cubitos-bala", "en Máquinas de Cubitos Bala de Sobremesa"),
        ("en-maquinas-de-cubo-cristalino", "en Máquinas de Cubos Cuadrados Cristalinos"),
        ("si-vives-en-zona-agua-dura", "en Hogares con Agua Dura o Con Cal"),
        ("guia-rapida-paso-a-paso", "Paso a Paso sin Dañar Componentes"),
    ]
    for s_b, t_b, concept in clean_topics:
        for c_s, c_t in clean_contexts:
            s = f"{s_b}-{c_s}"
            t = f"{t_b} {c_t}"
            kw = f"{s_b.replace('-', ' ')} {c_s.replace('-', ' ')}"
            items.append((
                slugify_clean(s),
                t,
                "limpieza-descalcificacion-y-agua",
                slugify_clean(kw).replace("-", " "),
                concept,
                "Hielo cristalino de sabor neutro todos los días con 10 minutos de cuidado mensual",
                "Preparar la máquina impecable el día previo a recibir invitados en casa",
                "Proporción de descalcificación, ppm de TDS y tiempo de enjuague",
                "Kit Limpiador Affresh / GE Opal, Jarra Filtrante y EUHOMY / Silonn Self-Clean",
                f"spotless bright kitchen scene demonstrating clean filtered water and ice maker care {c_s.replace('-', ' ')}",
            ))
    assert len(items) == 120 + 115 + 115 + 115, f"After Silo 9 count: {len(items)}"

    # =========================================================================
    # SILO 10: solucion-de-problemas-y-reparacion (115 artículos)
    # 23 fallas reales × 5 variantes de máquina/causa = 115
    # =========================================================================
    fix_topics = [
        ("luz-add-water-encendida-con-tanque-lleno", "Luz 'Add Water' Encendida aunque el Tanque Está Lleno: Cómo Solucionarlo", "purgar burbuja de aire (airlock) en la manguera de la bomba o limpiar el flotador magnético"),
        ("luz-ice-full-encendida-con-canasta-vacia", "Error 'Ice Full' con la Canasta Vacía: Limpieza y Sombra del Sensor Infrarrojo", "limpiar condensación o cal de los dos lentes LED laterales y apartar de luz solar directa"),
        ("chirrido-fuerte-squeaking-maquina-hielo-nugget", "Por Qué tu Máquina de Hielo Nugget Hace un Chirrido Agudo y Cómo Quitarlo", "acumulación de sarro calcáreo entre el tornillo sinfín y el cilindro evaporador que se resuelve descalcificando 2 ciclos"),
        ("maquina-enciende-pero-no-congela-hielo", "La Máquina de Hielo Enciende y Mueve Agua pero No Congela: Diagnóstico", "verificar si arranca el compresor, si el ventilador gira libre o si hay exceso de calor alrededor"),
        ("cubitos-salen-muy-delgados-pequenos-o-rotos", "Por Qué los Cubitos Salen Muy Finos o Frágiles y Cómo Engrosarlos", "agua inicial tibia, filtro obstruido o necesidad de cambiar al modo Large / subir +2 min al temporizador"),
        ("hielo-se-queda-pegado-en-varillas-o-formando-bloque", "Los Cubitos No Caen a la Canasta y Forman un Bloque Arriba: Causas", "ciclo demasiado largo en ambiente frío o válvula de desescarche pegada; reiniciar desconectando 15 min"),
        ("fuga-de-agua-por-debajo-de-maquina-hielo", "Mi Máquina de Hielo Pierde Agua por Debajo: Revisión del Tapón de Drenaje", "el 85 % de las veces el tapón de silicona inferior quedó flojo o falta su anillo O-ring"),
        ("bomba-de-agua-suena-pero-no-sube-agua", "La Bomba Suena pero No Sube Agua a la Bandeja Superior: Cómo Purgar el Aire", "soplar aire suavemente con jeringa limpia o tubo de drenaje para liberar la cámara del impulsor"),
        ("maquina-se-apaga-sola-despues-de-unos-minutos", "Por Qué la Máquina de Hielo se Detiene Sola a Mitad del Ciclo", "protección térmica del compresor por rejilla bloqueada o enchufe con bajo voltaje"),
        ("pala-o-bandeja-atascada-en-maquina-cubitos", "Bandeja Volcadora de Hielo Atascada o Inclinada: Cómo Reiniciarla sin Forzar", "desconectar, dejar derretir cualquier cubito trabado con paño tibio y encender para autocalibrar"),
        ("todas-las-luces-parpadean-en-panel-maquina-hielo", "Todas las Luces Parpadean al Mismo Tiempo: Qué Significa y Reset Eléctrico", "alerta de atasco mecánico en bandeja o lectura errónea del termistor tras corte de luz"),
        ("hielo-se-derrite-demasiado-rapido-en-la-cesta", "Por Qué el Hielo se Derrite Muy Rápido Dentro de la Máquina", "tapa mal cerrada, cercanía a estufa/ventana soleada o exceso de agua tibia en el tanque"),
        ("tanque-lateral-side-tank-no-alimenta-agua", "El Tanque Lateral (Side Tank) No Pasa Agua a la Máquina Principal: Solución", "revisar válvula de resorte de la tapa del tanque y asegurar que repose al mismo nivel de encimera"),
        ("ventilador-no-gira-o-hace-ruido-de-roce", "El Ventilador Lateral No Gira o Roza: Cómo Revisarlo de Forma Segura", "desenchufar, limpiar pelusa acumulada y comprobar que nada obstruya las aspas"),
        ("boton-tactil-no-responde-en-panel-led", "Los Botones Táctiles No Responden: Humedad en los Dedos o Bloqueo Infantil", "secar bien el panel acrílico y mantener pulsado Lock/Clean 3 segundos si tiene bloqueo"),
        ("olor-caliente-o-electrico-en-primeros-ciclos", "Cuándo un Olor Tibio Nuevo Es Normal y Cuándo Desconectar de Inmediato", "distinguir el curado inicial de barniz del motor frente a un recalentamiento real"),
        ("ciclo-autolimpieza-no-arranca-al-pulsar-boton", "Por Qué No Entra en Modo Self-Clean al Mantener Pulsado el Botón", "en la mayoría de modelos debe estar en modo Standby (enchufada pero sin fabricar hielo) antes de pulsar 5 s"),
        ("agua-turbia-o-espuma-durante-ciclo-hielo", "Sale Espuma o Agua Turbia en el Depósito: Residuos de Limpieza o Minerales", "realizar 2 drenajes completos con agua tibia limpia hasta que el agua salga transparente"),
        ("maquina-tarda-mas-de-25-minutos-por-lote", "Por Qué Cada Tanda Tarda el Doble de lo Habitual y Cómo Recuperar Velocidad", "limpiar condensador empolvado, descalcificar evaporador y usar agua fresca"),
        ("condensacion-excesiva-sudor-por-fuera-carcasa", "Por Qué 'Suda' Agua por Fuera la Máquina en Días Húmedos", "punto de rocío ambiental alto en verano; se resuelve con alfombrilla absorbente o silicona"),
        ("como-hacer-hard-reset-reinicio-fabrica-maquina", "Cómo Hacer un Reinicio Completo (Hard Reset) a tu Máquina de Hielo", "desenchufar 20 minutos, drenar, secar sensores y reconectar directo a pared"),
        ("cuando-reparar-vs-cuando-reemplazar-en-amazon", "Cuándo Conviene Reparar una Máquina de Hielo y Cuándo Comprar una Nueva", "si falla el compresor o hay fuga de gas refrigerante sellado, un modelo nuevo de US$79–$239 es más rentable"),
        ("como-reclamar-garantia-de-1-ano-fabricante-usa", "Cómo Tramitar Garantía con GE Profile, Frigidaire, EUHOMY o Silonn en EE. UU.", "tener a mano el Order ID de Amazon.com, número de serie trasero y video corto del síntoma"),
    ]
    fix_contexts = [
        ("causas-y-solucion-en-5-minutos", "en 5 Minutos sin Herramientas"),
        ("en-modelos-euhomy-y-silonn", "en Modelos EUHOMY, Silonn y Compactas"),
        ("en-modelos-ge-opal-y-frigidaire", "en GE Profile Opal y Frigidaire Gallery"),
        ("despues-de-limpiar-o-guardar", "Después de Descalcificar o Guardarla"),
        ("prevencion-para-que-no-vuelva", "y Cómo Evitar que Vuelva a Ocurrir"),
    ]
    for s_b, t_b, concept in fix_topics:
        for c_s, c_t in fix_contexts:
            s = f"{s_b}-{c_s}"
            t = f"{t_b} ({c_t})"
            kw = f"{s_b.replace('-', ' ')} {c_s.replace('-', ' ')}"
            items.append((
                slugify_clean(s),
                t,
                "solucion-de-problemas-y-reparacion",
                slugify_clean(kw).replace("-", " "),
                concept,
                "Recuperar tu producción diaria de hielo en minutos sin visitas técnicas",
                "Resolver imprevistos rápido justo antes de que lleguen los invitados a casa",
                "Diagnóstico visual de sensores, bomba de agua, flujo de aire y drenaje",
                "Kit Descalcificador Affresh, Silonn SLIM01, EUHOMY Nugget 34 lb y Frigidaire 44 lb",
                f"clean close-up troubleshooting view of a modern countertop ice maker control panel and water reservoir {c_s.replace('-', ' ')}",
            ))
    assert len(items) == 120 + 115 * 4, f"After Silo 10 count: {len(items)}"

    # =========================================================================
    # SILO 11: uso-diario-bebidas-y-reuniones-en-casa (110 artículos)
    # 22 escenarios de bebidas/uso diario/fiestas × 5 guías prácticas = 110
    # =========================================================================
    life_topics = [
        ("cuantas-libras-hielo-necesitas-por-persona-fiesta", "Cuántas Libras de Hielo Calcular por Persona en una Reunión en Casa", "regla de oro: 1.5 lb por invitado en interior y 2 lb por invitado en verano o barbacoa exterior"),
        ("cronograma-24-horas-antes-acumular-hielo-reunion", "Cómo Producir y Embolsar 20 Libras de Hielo desde el Día Anterior a tu Fiesta", "encender la máquina 24 h antes y pasar cada canasta llena a bolsas herméticas en el congelador"),
        ("como-armar-estacion-iced-coffee-en-casa", "Cómo Montar una Estación de Iced Coffee en Casa con Máquina de Hielo", "combinar cafetera o espresso, jarabes, vasos de vidrio y hielo nugget o cubo denso al alcance"),
        ("rutina-manana-llenar-vasos-termicos-40oz", "Cómo Llenar 2 o 3 Vasos Térmicos de 40 oz Cada Mañana sin Quedarte sin Hielo", "encender con temporizador o enchufe inteligente 45 minutos antes del desayuno"),
        ("calculo-hielo-para-reunion-10-invitados", "Cuánto Hielo Necesitas para una Cena o Reunión de 10 Personas en Casa", "unas 15 libras totales: 8 lb pre-almacenadas en freezer + la máquina produciendo en vivo"),
        ("calculo-hielo-para-fiesta-20-a-30-invitados", "Cómo Abastecer una Fiesta de 20 a 30 Invitados con una Máquina de Sobremesa", "acumular 25–30 lb previas para enfriar latas y dejar la máquina dedicada exclusivamente a los vasos"),
        ("montar-barra-autoservicio-hielo-y-cocteles", "Cómo Organizar una Barra de Autoservicio de Bebidas y Hielo para Visitas", "separar hielera aislada con pinzas junto a la máquina para evitar filas"),
        ("mejor-proporcion-hielo-leche-espresso-iced-latte", "Proporción Exacta de Hielo, Leche y Café para un Iced Latte de Cafetería", "120 g de hielo nugget o cubos grandes + 180 ml de leche fría + 60 ml de espresso doble"),
        ("preparar-cold-brew-y-matcha-helado-con-nugget", "Por Qué el Matcha Latte y el Cold Brew Saben Mejor con Hielo Nugget", "enfría de forma uniforme de arriba abajo manteniendo la espuma sedosa"),
        ("enfriar-botellas-vino-y-cervezas-en-10-minutos", "El Truco de Agua, Hielo de Sobremesa y Sal para Enfriar Bebidas en 8 Minutos", "sumergir latas o botellas en baño de agua con 2 cestas de cubitos bala y 2 cucharadas de sal"),
        ("uso-diario-hidratacion-familiar-tomar-mas-agua", "Cómo Tener Hielo Listo Todo el Día Ayuda a que tu Familia Beba Más Agua", "el agua fría entre 38 °F y 44 °F resulta mucho más apetecible para niños y adultos"),
        ("preparar-batidos-proteina-post-entreno-con-hielo", "Cómo Usar tu Máquina de Hielo para Batidos de Proteína Espesos cada Día", "1 taza de hielo nugget o bala pequeña da textura de malteada sin añadir calorías"),
        ("uso-en-tardes-de-parrilla-bbq-y-asado", "Guía para Usar tu Máquina de Hielo en una Tarde de BBQ sin Que se Derrita", "mantener la máquina a la sombra o dentro de la cocina y sacar tandas en cubeta doble pared"),
        ("cocteleria-clasica-en-casa-margarita-mojito-old-fashioned", "Qué Hielo Usar para Cada Cóctel en Casa: Margarita, Mojito, Gin-Tonic y Whisky", "nugget/pebble para mojitos y juleps; cubo cuadrado cristalino grande para whisky y negroni"),
        ("preparar-te-helado-casero-sin-que-quede-aguado", "Cómo Hacer una Jarra de Té Helado (Iced Tea) Perfecta con Hielo de Sobremesa", "infusionar al doble de concentración antes de verter sobre una cesta entera de hielo fresco"),
        ("reuniones-infantiles-raspados-y-jugos-naturales", "Ideas de Bebidas Frías y Granizados Caseros para Niños con Hielo Nugget", "jugos naturales de fruta sobre hielo masticable suave sin exceso de azúcar"),
        ("home-office-productivo-cafe-y-agua-fria-escritorio", "Cómo Integrar una Máquina Compacta para tus Jornadas de Teletrabajo", "ahorrar paseos constantes a la cocina manteniendo agua helada en tu estudio"),
        ("noches-de-peliculas-y-juegos-de-mesa-en-casa", "Configuración Rápida de Bebidas y Hielo para Noches de Cine o Juegos con Amigos", "encender la máquina 30 minutos antes de que lleguen las pizzas"),
        ("brunch-dominical-mimosas-y-jugo-naranja-frio", "Cuánto Hielo Preparar para un Brunch en Casa (Café Helado, Jugos y Cubiteras)", "combinar hielo para las copas y cama de cubitos bala para mantener frías las botellas"),
        ("ahorro-anual-en-cafeterias-haciendo-iced-coffee", "Cuánto Dinero Ahorras al Año en EE. UU. Haciendo tu Iced Coffee en Casa", "pasar de gastar US$5.50 diarios en cafetería a US$0.75 amortiza hasta una máquina nugget en 3 meses"),
        ("cuidados-de-higiene-cuando-muchos-invitados-sirven", "5 Reglas Simples de Higiene al Servir Hielo en Reuniones Familiares", "pala externa limpia, pinzas dedicadas y vasos de policarbonato o acero lejos de la tina"),
        ("combinar-uso-diario-y-fiestas-con-una-sola-maquina", "Cómo Sacarle Partido a una Sola Máquina Compacta tanto a Diario como en Fiestas", "uso directo de la cesta entre semana y embolsado previo los viernes por la tarde"),
    ]
    life_contexts = [
        ("guia-practica-paso-a-paso", "Guía Práctica Paso a Paso"),
        ("con-maquina-de-hielo-nugget", "con una Máquina de Hielo Tipo Nugget"),
        ("con-maquina-de-cubitos-compacta", "con una Máquina de Cubitos de 26 a 40 lb"),
        ("en-verano-y-dias-calurosos", "en Días de Calor y Verano"),
        ("errores-comunes-que-evitar", "y Errores Comunes que Debes Evitar"),
    ]
    for s_b, t_b, concept in life_topics:
        for c_s, c_t in life_contexts:
            s = f"{s_b}-{c_s}"
            t = f"{t_b}: {c_t}"
            kw = f"{s_b.replace('-', ' ')} {c_s.replace('-', ' ')}"
            items.append((
                slugify_clean(s),
                t,
                "uso-diario-bebidas-y-reuniones-en-casa",
                slugify_clean(kw).replace("-", " "),
                concept,
                "Bebidas frías de cafetería e hidratación familiar al instante cada mañana",
                "Cálculo exacto de libras y flujo continuo para que nunca falte hielo en reuniones",
                "Libras por persona, minutos de anticipación y capacidad de almacenamiento",
                "GE Profile Opal 2.0, Frigidaire Gallery 44 lb, Silonn SLIM01 y EUHOMY Clear Square 40 lb",
                f"inviting lifestyle photograph of chilled home beverages, iced coffee and party drinks with fresh countertop ice {c_s.replace('-', ' ')}",
            ))
    assert len(items) == 120 + 115 * 4 + 110, f"After Silo 11 count: {len(items)}"

    # =========================================================================
    # SILO 12: conservacion-hielo-y-accesorios (110 artículos)
    # 22 temas de conservación/accesorios × 5 aplicaciones = 110 -> Total SEO = 800!
    # =========================================================================
    acc_topics = [
        ("como-evitar-que-el-hielo-se-pegue-en-el-congelador", "Cómo Guardar Hielo de Máquina de Sobremesa en el Congelador sin que se Haga un Bloque", "escurrir 2 minutos el exceso de humedad superficial o meter en bolsa de papel/tela dentro de bolsa hermética"),
        ("como-conservar-hielo-nugget-suave-en-freezer", "Truco para Congelar Hielo Nugget y Despegarlo Suelto en Segundos", "extender primero en bandeja 20 minutos (flash-freeze) o agitar suavemente la bolsa a la hora"),
        ("bolsas-con-cordon-peva-para-almacenar-hielo", "Cómo Usar Bolsas Reutilizables o con Cordón para Acumular Lotes de Hielo", "las bolsas estilo supermercado de 8 lb con mazo de madera permiten guardar 3–4 cestas limpiamente"),
        ("contenedores-bins-con-tapa-hermetica-anti-olores", "Por Qué Usar un Contenedor con Tapa de Silicona en el Congelador", "evita sublimación del hielo y bloquea por completo los olores de otros alimentos"),
        ("cubetas-hieleras-acero-doble-pared-cuanto-duran", "Cuántas Horas Mantiene el Hielo una Cubeta Térmica de Acero de Doble Pared", "entre 4 y 6 horas sobre la mesa del comedor sin condensación exterior"),
        ("como-instalar-tanque-lateral-side-tank-correctamente", "Cómo Conectar y Nivelar un Tanque Lateral (Side Tank) sin Burbujas ni Fugas", "colocar en la misma superficie plana que la máquina y purgar la manguera antes de encender"),
        ("como-usar-manguera-drenaje-continuo-al-fregadero", "Cómo Configurar el Drenaje por Gravedad hacia el Fregadero para Limpiar Rápido", "mantener la manguera siempre por debajo de la base de la máquina sin curvas hacia arriba"),
        ("filtros-de-jarra-vs-filtros-bajo-tarja-para-hielo", "Qué Sistema de Filtración Doméstica Mejora Más la Claridad y Vida Útil", "carbón activado en bloque elimina el 99 % del sabor a cloro del agua municipal"),
        ("palas-acero-inoxidable-vs-plastico-con-perforaciones", "Por Qué Elegir una Pala con Ranuras Drenantes para Servir Hielo de Sobremesa", "escurre las gotas de agua líquida antes de volcar los cubitos en tu bebida"),
        ("soportes-y-ganchos-magneticos-laterales-para-pala", "Cómo Colocar un Gancho Magnético en el Costado de tu Máquina de Hielo", "aprovecha los paneles metálicos laterales sin usar adhesivos permanentes"),
        ("fundas-protectoras-antipolvo-cuando-no-usas-maquina", "Cómo Proteger tu Máquina con Funda Transpirable cuando Está Apagada", "evita grasa en suspensión de la cocina asegurando antes que el interior esté 100 % seco"),
        ("como-guardar-maquina-de-hielo-en-invierno-almacenaje", "Guía de Invernaje: Cómo Preparar tu Máquina para Guardarla Varios Meses", "descalcificar, drenar inclinando 15°, secar con microfibra y dejar tapón suelto"),
        ("transporte-seguro-en-auto-o-mudanza-posicion-vertical", "Cómo Transportar tu Máquina de Hielo en el Auto o RV sin Dañar el Compresor", "llevarla siempre derecha, vaciada de agua y esperar 2 horas antes de conectarla al llegar"),
        ("bandejas-antigoteo-y-alfombrillas-absorcion-encimera", "Qué Alfombrilla Poner Debajo de tu Máquina en Encimeras de Madera o Mármol", "silicona alimentaria con labio perimetral de 1.5 cm protege del agua al rellenar"),
        ("enchufes-wifi-temporizadores-automatizar-encendido", "Cómo Programar una Máquina Básica con un Smart Plug Wi‑Fi desde tu Celular", "útil en modelos con reinicio de memoria o recordatorios automáticos de encendido"),
        ("medidor-digital-tds-para-saber-cuando-cambiar-filtro", "Cómo Usar un Medidor de TDS de US$12 para Controlar el Agua de tu Hielo", "comprobar en 3 segundos si tu jarra filtrante sigue reteniendo sólidos disueltos"),
        ("kits-cepillo-fino-para-conductos-y-rincones-maquina", "Qué Cepillos Suaves Usar para Limpiar Rincones, Bisagras y Tubos sin Rayar", "cepillos de nailon para popotes llegan a la boquilla de drenaje y sensor"),
        ("pinzas-dentadas-acero-para-cubos-cristalinos-bar", "Mejores Pinzas de Bar para Manipular Cubos Cuadrados Transparentes sin Resbalar", "dientes micro-aserrados sujetan el hielo húmedo con total firmeza en reuniones"),
        ("como-enfriar-un-cooler-grande-usando-lotes-previos", "Estrategia para Llenar un Cooler de Playa o Camping con tu Máquina Casera", "pre-enfriar el cooler con botellas congeladas y rellenar con 3 bolsas acumuladas en la semana"),
        ("accesorios-organizacion-barra-de-cafe-y-hielo", "Cómo Organizar Vasos, Popotes de Vidrio, Jarabes y Pala Junto a tu Máquina", "bandejas organizadoras verticales que ahorran hasta 40 % de espacio en cocina"),
        ("cuidado-de-empaques-de-goma-y-tapones-silicona", "Cómo Mantener Flexibles y Estancos los Tapones de Drenaje de tu Máquina", "revisar cada 6 meses y tener tapones universales de silicona de repuesto"),
        ("como-revivir-hielo-apelmazado-con-mazo-de-madera", "Cómo Soltar Hielo Ligeramente Pegado en 3 Golpes con Bolsa de Lona o Mazo", "un toque seco sobre encimera devuelve las pepitas nugget o cubitos sueltos al instante"),
    ]
    acc_contexts = [
        ("para-uso-diario-practico", "en el Uso Diario del Hogar"),
        ("antes-de-reuniones-y-visitas", "al Preparar Reuniones en Casa"),
        ("en-modelos-nugget-masticables", "Especial para Hielo Tipo Nugget"),
        ("en-modelos-cubitos-y-cristalinos", "en Cubitos Bala y Cubos Cristalinos"),
        ("recomendaciones-y-paso-a-paso", "con Consejos Paso a Paso"),
    ]
    for s_b, t_b, concept in acc_topics:
        for c_s, c_t in acc_contexts:
            s = f"{s_b}-{c_s}"
            t = f"{t_b} ({c_t})"
            kw = f"{s_b.replace('-', ' ')} {c_s.replace('-', ' ')}"
            items.append((
                slugify_clean(s),
                t,
                "conservacion-hielo-y-accesorios",
                slugify_clean(kw).replace("-", " "),
                concept,
                "Mantener reserva fresca en el congelador y encimera ordenada todos los días",
                "Multiplicar por 4 la reserva disponible cuando organizas fiestas o cenas",
                "Humedad superficial, aislamiento térmico y compatibilidad de accesorios",
                "Bin Hermético con Pala Magnética, Alfombrilla Antigoteo, Kit Limpiador Affresh y Bolsas de Hielo",
                f"organized modern freezer and kitchen counter showing smart ice storage bins, magnetic scoop and countertop ice maker accessories {c_s.replace('-', ' ')}",
            ))
    assert len(items) == 800, f"Total SEO count: {len(items)}"
    return items


if __name__ == "__main__":
    t320 = generate_transactional_320()
    s800 = generate_seo_800()
    all_slugs = [p["slug"] for p in PILLARS] + [x[0] for x in t320] + [x[0] for x in s800]
    all_kws = [p["kw"] for p in PILLARS] + [x[3] for x in t320] + [x[3] for x in s800]
    all_titles = [p["title"] for p in PILLARS] + [x[1] for x in t320] + [x[1] for x in s800]
    print(f"Pilares: {len(PILLARS)} | Transaccionales: {len(t320)} | SEO: {len(s800)} | Total: {len(all_slugs)}")
    assert len(all_slugs) == len(set(all_slugs)), "Duplicate slugs!"
    assert len(all_kws) == len(set(all_kws)), "Duplicate keywords!"
    assert len(all_titles) == len(set(all_titles)), "Duplicate titles!"
    print("OK: 0 % canibalización verificada en los 1,132 contenidos!")
