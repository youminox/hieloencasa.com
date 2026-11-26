export const AMAZON_TAG_US = "hieloencasa-20";
export const AMAZON_TAG_ES = "hieloencasa-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "nugget-premium"
  | "nugget-compact"
  | "bullet-fast"
  | "clear-square"
  | "cleaning-accessory";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType: AmazonCategoryType;
  specs?: {
    iceAndPrice: string;
    capacity: string;
    dimensions: string;
    noiseAndUse: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

/**
 * Genera el enlace oficial de afiliado Amazon según la región:
 * - EE. UU. / Latinoamérica / Global (US - Predeterminado): amazon.com con tag=hieloencasa-20
 * - España / Europa (ES): amazon.es con tag=hieloencasa-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detecta automáticamente la región del visitante.
 * Por defecto prioriza Amazon Estados Unidos ("US") y activa "ES" si navega desde España/Europa.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("hec_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  GE_OPAL_2_SIDE_TANK: {
    id: "ge-profile-opal-2-side-tank",
    badge: "🏆 #1 Hielo Nugget Premium · Uso Diario & Iced Coffee",
    title:
      "GE Profile Opal 2.0 Countertop Nugget Ice Maker con Side Tank (38 lb/24h · Wi‑Fi SmartHQ)",
    subtitle:
      "La referencia absoluta en hielo tipo nugget suave, poroso y masticable en EE. UU. Su tanque lateral de 0.75 galones triplica la producción sin rellenar agua y su cajón frontal abre sin chocar con los gabinetes.",
    features: [
      "Produce hasta 38 lb (17.2 kg) al día y sirve el primer lote de hielo nugget crujiente en 10 minutos o menos",
      "Altura de 16.5\" con apertura frontal deslizante que cabe cómodamente bajo alacenas estándar de 18 pulgadas",
      "Wi‑Fi integrado con App SmartHQ para programar horarios matutinos y alertas de descalcificación",
    ],
    categoryType: "nugget-premium",
    specs: {
      iceAndPrice: "Hielo Nugget Masticable · Gama Alta",
      capacity: "38 lb/24h · Cesta 3 lb + Side Tank 0.75 gal",
      dimensions: "13.4\" × 17.5\" × 16.5\" (Cabe bajo 18\")",
      noiseAndUse: "44–46 dB · Ideal Uso Diario Familiar e Iced Coffee",
    },
    queryUS: "GE Profile Opal 2.0 Countertop Nugget Ice Maker with Side Tank",
    queryES: "maquina de hielo nugget picado masticable sobremesa",
    ctaLabel: "Ver Precio de GE Profile Opal 2.0 en Amazon",
  },
  FRIGIDAIRE_GALLERY_NUGGET_44LB: {
    id: "frigidaire-gallery-nugget-44lb",
    badge: "⚡ Mejor Alternativa Nugget Alta Capacidad (44 lb/día)",
    title:
      "Frigidaire Gallery Countertop Crunchy Chewable Nugget Ice Maker (44 lb/24h · EFIC235)",
    subtitle:
      "Ofrece la experiencia del hielo nugget masticable estilo restaurante a casi la mitad de precio que la gama lujo, con 44 lb/día reales capaces de cubrir tanto el café diario como reuniones en casa.",
    features: [
      "Alta capacidad de hasta 44 lb/24h (20 kg) con primer lote listo entre 10 y 12 minutos",
      "Diseño moderno con ventana panorámica iluminada y función de autolimpieza automática",
      "Altura contenida de 16.1\" que encaja bajo gabinetes de cocina estándar en Estados Unidos",
    ],
    categoryType: "nugget-premium",
    specs: {
      iceAndPrice: "Hielo Nugget Crujiente · Gama Media",
      capacity: "44 lb/24h · Cesta de 2.6 lb",
      dimensions: "11.8\" × 16.9\" × 16.1\" (Bajo gabinete)",
      noiseAndUse: "45–48 dB · Uso Diario + Reuniones de Fin de Semana",
    },
    queryUS: "Frigidaire Gallery Countertop Crunchy Chewable Nugget Ice Maker 44 lbs",
    queryES: "Frigidaire maquina de hielo nugget sobremesa acero inoxidable",
    ctaLabel: "Ver Precio de Frigidaire Nugget 44 lb en Amazon",
  },
  EUHOMY_NUGGET_34LB_COMPACT: {
    id: "euhomy-nugget-34lb-compact",
    badge: "💎 #1 Calidad-Precio en Hielo Nugget Compacto",
    title:
      "EUHOMY Countertop Nugget Ice Maker (34–40 lb/24h · Ultracompacta con Autolimpieza)",
    subtitle:
      "Una de las máquinas de hielo tipo nugget más pequeñas y silenciosas de Amazon EE. UU.: mide apenas 13\" de alto, saca hielo suave en 7–10 minutos y cuesta menos de la mitad que los modelos grandes.",
    features: [
      "Tamaño ultracompacto (9.6\" × 11.6\" × 13.0\") ideal para apartamentos, barras de café y oficinas",
      "Hielo pebble blando fácil de masticar que enfría al instante iced lattes, smoothies y termos de 40 oz",
      "Programa automático Self-Clean de 1 botón en 15 minutos + pala y cesta desmontable libre de BPA",
    ],
    categoryType: "nugget-compact",
    specs: {
      iceAndPrice: "Hielo Nugget Suave · Económica",
      capacity: "34–40 lb/24h · Ciclo rápido de 7–10 min",
      dimensions: "9.6\" × 11.6\" × 13.0\" (Ultracompacta)",
      noiseAndUse: "42–45 dB · Uso Diario Silencioso en Cocina Pequeña",
    },
    queryUS: "EUHOMY Nugget Ice Maker Countertop Chewable Pebble Ice Self Cleaning",
    queryES: "EUHOMY maquina de hielo nugget sobremesa autolimpieza",
    ctaLabel: "Ver Precio de EUHOMY Nugget en Amazon",
  },
  SILONN_NUGGET_33LB_QUIET: {
    id: "silonn-nugget-33lb-quiet",
    badge: "🤫 Nugget Silenciosa de Huella Estrecha (8.7\" Ancho)",
    title:
      "Silonn Chewable Nugget Ice Maker Countertop (33 lb/24h · Autolimpieza y Bajo Ruido)",
    subtitle:
      "Diseñada para ocupar menos ancho que una cafetera en tu encimera, produciendo pepitas de hielo masticables de forma continua y silenciosa para 1 a 3 personas.",
    features: [
      "Perfil ultra estrecho de 8.7 pulgadas de ancho y 12.7 pulgadas de alto que cabe en cualquier rincón",
      "Operación suave de 43–46 dB con sensor óptico infrarrojo de cesta llena y falta de agua",
      "Carcasa en acero inoxidable antihuellas muy fácil de drenar y mantener",
    ],
    categoryType: "nugget-compact",
    specs: {
      iceAndPrice: "Hielo Nugget Masticable · precio variable en Amazon",
      capacity: "33 lb/24h · Flujo continuo desde 8 min",
      dimensions: "8.7\" × 11.3\" × 12.7\" (Súper angosta)",
      noiseAndUse: "43–46 dB · Ideal Uso Diario Parejas y Home Office",
    },
    queryUS: "Silonn Nugget Ice Maker Countertop Chewable Pebble Ice Machine 33lbs",
    queryES: "Silonn maquina de hielo nugget compacta sobremesa",
    ctaLabel: "Ver Precio de Silonn Nugget 33 lb en Amazon",
  },
  SILONN_SLIM01_BULLET_26LB: {
    id: "silonn-slim01-bullet-26lb",
    badge: "🔥 #1 Más Vendida en Amazon EE. UU. · 9 Cubitos en 6 Min",
    title:
      "Silonn Countertop Ice Maker SLIM01 (26 lb/24h · 2 Tamaños de Cubito, Asa Portátil y <40 dB)",
    subtitle:
      "La campeona económica indiscutible para tener hielo rápido sin gastar de más: entrega 9 cubitos tipo bala cada 6 minutos con un nivel sonoro inferior a 40 dB y pesa menos de 14 libras.",
    features: [
      "Selector de 2 tamaños de cubito: Small (enfría rápido botellas) y Large (dura más en vasos y refrescos)",
      "Ultrasilenciosa (~35–41 dB), con ventana superior transparente, asa de transporte y autolimpieza",
      "Consume apenas ~105 W en marcha",
    ],
    categoryType: "bullet-fast",
    specs: {
      iceAndPrice: "Cubitos Tipo Bala (S/L) · Económica",
      capacity: "26 lb/24h · 9 cubitos en solo 6 minutos",
      dimensions: "8.7\" × 11.4\" × 11.6\" (Con asa portátil)",
      noiseAndUse: "35–41 dB · Uso Diario Económico y Visitas Rápidas",
    },
    queryUS: "Silonn Ice Makers Countertop 9 Cubes Ready in 6 Mins 26lbs Per Day",
    queryES: "Silonn maquina de cubitos de hielo sobremesa 12kg 6 minutos",
    ctaLabel: "Ver Precio de Silonn 26 lb en Amazon",
  },
  EUHOMY_BULLET_26LB_HANDLE: {
    id: "euhomy-bullet-26lb-handle",
    badge: "🏕️ Mejor Portátil Económica para Cocina, Terraza y RV",
    title:
      "EUHOMY Countertop Ice Maker Machine 26 lb/24h con Asa, Pala y Autolimpieza",
    subtitle:
      "Ligera, resistente y lista en 6 minutos sin ninguna instalación: llévala de la cocina a la mesa del jardín, departamento universitario o casa rodante (RV).",
    features: [
      "9 cubitos bala por ciclo de 6–8 minutos con reciclaje térmico automático del agua derretida",
      "Asa ergonómica desmontable, cesta de 1.5 lb y soporte lateral para la pala higiénica",
      "Excelente opción por debajo de precio variable en Amazon en Amazon con cupones frecuentes",
    ],
    categoryType: "bullet-fast",
    specs: {
      iceAndPrice: "Cubitos Bala Rápidos · precio variable en Amazon",
      capacity: "26 lb/24h · Depósito de 1.5 L",
      dimensions: "8.8\" × 11.6\" × 11.4\" (13.8 lb de peso)",
      noiseAndUse: "38–42 dB · Uso Diario, Verano y Camping/RV",
    },
    queryUS: "EUHOMY Ice Maker Machine Countertop 26lbs in 24Hrs 9 Cubes Ready in 6 Mins",
    queryES: "EUHOMY maquina de hacer hielo portatil sobremesa 12kg",
    ctaLabel: "Ver Precio de EUHOMY 26 lb Portátil en Amazon",
  },
  FRIGIDAIRE_EFIC189_STAINLESS: {
    id: "frigidaire-efic189-stainless",
    badge: "✨ Clásica en Acero Inoxidable · Fiabilidad de Cocina",
    title:
      "Frigidaire EFIC189-SILVER Compact Ice Maker 26 lb/24h en Acero Inoxidable",
    subtitle:
      "Combina estética de electrodoméstico norteamericano en acero cepillado con una tapa de visión extragrande y depósito amplio de 2.3 cuartos para menos recargas diarias.",
    features: [
      "Produce 26 lb/día de cubitos bala en 2 grosores seleccionables desde su panel LED superior",
      "Carcasa de acero inoxidable fácil de limpiar que armoniza con refrigeradores y cafeteras modernas",
      "Compresor eficiente libre de CFC con sensores automáticos de agua y canasta llena",
    ],
    categoryType: "bullet-fast",
    specs: {
      iceAndPrice: "Cubitos Bala (2 Tamaños) · precio variable en Amazon",
      capacity: "26 lb/24h · Tanque amplio de 2.2 L",
      dimensions: "9.5\" × 14.1\" × 12.9\"",
      noiseAndUse: "39–43 dB · Uso Diario Confiable en Cocina",
    },
    queryUS: "Frigidaire EFIC189-SILVER Compact Ice Maker 26 lb per Day Silver",
    queryES: "Frigidaire maquina de cubitos de hielo acero inoxidable 12kg",
    ctaLabel: "Ver Precio de Frigidaire 26 lb Inox en Amazon",
  },
  EUHOMY_CLEAR_SQUARE_40LB: {
    id: "euhomy-clear-square-40lb",
    badge: "🥂 #1 Para Reuniones en Casa y Cócteles · 40–45 lb Cubo Cristalino",
    title:
      "EUHOMY 40–45 lb/Day Clear Square Ice Maker Countertop con Pantalla LCD y Temporizador",
    subtitle:
      "¿Organizas cenas, fiestas o barbacoas? Fabrica placas de 24 cubos cuadrados cristalinos y macizos por ciclo que tardan hasta 3 veces más en derretirse que los cubitos huecos.",
    features: [
      "Alta producción de 40 a 45 lb/24h con tanque doble de 3.2 L (acepta incluso botellón superior pequeño)",
      "Ajuste digital de grosor del cubo (+/- minutos) y temporizador programable 24 horas en pantalla LCD",
      "Hielo 100 % transparente sin burbujas que no agua el whisky, refrescos ni cócteles de tus invitados",
    ],
    categoryType: "clear-square",
    specs: {
      iceAndPrice: "Cubo Cuadrado Cristalino · precio variable en Amazon",
      capacity: "40–45 lb/24h · 24 cubos por tanda (13–18 min)",
      dimensions: "10.0\" × 14.2\" × 14.8\" (Cabe bajo 18\")",
      noiseAndUse: "42–45 dB · Ganadora para Reuniones, Fiestas y Bar",
    },
    queryUS: "EUHOMY 40Lbs Clear Ice Maker Countertop 24 Ice Cubes Ready LCD Display",
    queryES: "EUHOMY maquina de hielo cubos cuadrados transparentes 18kg LCD",
    ctaLabel: "Ver Precio de EUHOMY 40 lb Cristalino en Amazon",
  },
  LUMA_COMFORT_IM200SS_CLEAR: {
    id: "luma-comfort-im200ss-clear",
    badge: "🥃 Mejor Cubo Gourmet Individual para Whisky y Bourbon",
    title:
      "Luma Comfort IM200SS / NewAir ClearIce40 Crystal Clear Ice Cube Maker",
    subtitle:
      "Congelación cristalina de grado restaurante libre de impurezas y oxígeno atrapado: eleva al instante cualquier bar doméstico, cata de destilados o reunión elegante.",
    features: [
      "Cubos densos, pesados y ultra transparentes que enfrían sin alterar el perfil aromático de tus bebidas",
      "Entre 28 y 40 lb por día de producción sostenida en acabado acero inoxidable cepillado",
      "Aislamiento grueso y drenaje sencillo para mantenimiento impecable",
    ],
    categoryType: "clear-square",
    specs: {
      iceAndPrice: "Cubo Gourmet Transparente · precio variable en Amazon",
      capacity: "28–40 lb/24h · Cubos macizos individuales",
      dimensions: "11.5\" × 14.5\" × 13.8\"",
      noiseAndUse: "41–44 dB · Ideal Home Bar, Whisky y Cenas",
    },
    queryUS: "Luma Comfort Clear Ice Cube Maker Countertop Machine Stainless Steel",
    queryES: "maquina de hielo transparente cristalino gourmet cocteles",
    ctaLabel: "Ver Máquina de Hielo Gourmet en Amazon",
  },
  ECOZY_SMART_NUGGET_WIFI: {
    id: "ecozy-smart-nugget-wifi",
    badge: "📱 Mejor Nugget Inteligente con App y Control por Voz",
    title:
      "Ecozy Smart Nugget Ice Maker Countertop (33 lb/24h · Compatible con Alexa y App Móvil)",
    subtitle:
      "Enciéndela desde la cama con tu celular o con Alexa para encontrar la canasta llena de hielo nugget recién hecho al bajar a preparar tu café frío matutino.",
    features: [
      "Programación inteligente por horarios en iOS/Android y notificaciones de falta de agua o limpieza",
      "Produce 33 lb/día de hielo pebble masticable en un cuerpo compacto de solo 13.3\" de altura",
      "Incluye bolsas para congelar hielo extra antes de recibir visitas en casa",
    ],
    categoryType: "nugget-compact",
    specs: {
      iceAndPrice: "Hielo Nugget Wi‑Fi · precio variable en Amazon",
      capacity: "33–35 lb/24h · Programable desde App",
      dimensions: "9.1\" × 11.9\" × 13.3\"",
      noiseAndUse: "43–45 dB · Rutina Matutina Automatizada",
    },
    queryUS: "ecozy Smart Nugget Ice Maker Countertop Alexa Voice App Control",
    queryES: "maquina de hielo nugget inteligente WiFi app autolimpieza",
    ctaLabel: "Ver Precio de Ecozy Smart Nugget en Amazon",
  },
  AFFRESH_OPAL_DESCALER_FILTER: {
    id: "affresh-opal-descaler-filter",
    badge: "🧼 Imprescindible: Limpiador Nickel-Safe + Filtro Antical",
    title:
      "Affresh Ice Machine Cleaner / Kit Oficial GE Profile Opal Descalcificador y Filtro",
    subtitle:
      "Elimina el sarro mineral, previene los chirridos agudos en máquinas nugget y protege el recubrimiento de níquel de los evaporadores sin dejar olor a vinagre.",
    features: [
      "Fórmula segura para níquel y acero inoxidable recomendada para máquinas de cubitos y de hielo nugget",
      "Disuelve depósitos de calcio por agua dura en 1 ciclo Self-Clean devolviendo la velocidad original",
      "Rinde múltiples limpiezas mensuales para mantener el hielo 100 % puro e inodoro",
    ],
    categoryType: "cleaning-accessory",
    specs: {
      iceAndPrice: "Mantenimiento y Pureza · precio variable en Amazon",
      capacity: "3 a 6 descalcificaciones profundas por envase",
      dimensions: "Universal para todas las marcas de sobremesa",
      noiseAndUse: "Quita chirridos por cal · Uso Mensual Recomendado",
    },
    queryUS: "Affresh Ice Machine Cleaner Nickel Safe Countertop Nugget Descaler",
    queryES: "descalcificador limpiador maquina de hielo sobremesa acido citrico",
    ctaLabel: "Ver Descalcificador Seguro en Amazon",
  },
  FREEZER_ICE_BIN_SCOOP_KIT: {
    id: "freezer-ice-bin-scoop-kit",
    badge: "🧊 Truco Para Fiestas: Bin Hermético + Pala Magnética",
    title:
      "Contenedor Hermético de Hielo para Congelador con Tapa, Pinzas y Pala + Bolsas de Reserva",
    subtitle:
      "Multiplica la capacidad de cualquier máquina compacta: guarda 3 o 4 canastas el día previo a tu reunión sin que el hielo absorba olores del congelador.",
    features: [
      "Polímero grueso libre de BPA con tapa sellada apilable que cabe en cualquier cajón de freezer",
      "Incluye pala ergonómica con escurridor y pinzas dentadas higiénicas para invitados",
      "Complemento perfecto junto con una alfombrilla de silicona antigoteo bajo la máquina",
    ],
    categoryType: "cleaning-accessory",
    specs: {
      iceAndPrice: "Kit Almacenamiento y Fiesta · precio variable en Amazon",
      capacity: "Guarda de 6 a 10 lb de hielo listo para servir",
      dimensions: "11.2\" × 7.5\" × 6.1\" (Apilable en freezer)",
      noiseAndUse: "0 dB · Esencial para Reuniones y Reserva Diaria",
    },
    queryUS: "Ice Cube Bin for Freezer with Lid and Scoop Airtight Ice Storage Container",
    queryES: "contenedor hermetico para guardar hielo congelador con pala",
    ctaLabel: "Ver Contenedor de Hielo en Amazon",
  },
};

export interface ContextualAmazonSelection {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
}

export function getContextualAmazonProducts(
  slug: string,
  category: string,
  title = ""
): ContextualAmazonSelection {
  const text = `${slug} ${category} ${title}`.toLowerCase();

  // 1. Limpieza, agua, fallas o chirridos
  if (
    category === "limpieza-descalcificacion-y-agua" ||
    category === "solucion-de-problemas-y-reparacion" ||
    text.includes("limpi") ||
    text.includes("descalcific") ||
    text.includes("chirrido") ||
    text.includes("affresh") ||
    text.includes("add-water") ||
    text.includes("ice-full")
  ) {
    return {
      sectionTitle:
        "Kit Recomendado en Amazon para Limpieza, Pureza de Agua y Máquinas Fáciles de Cuidar",
      sectionSubtitle:
        "Mantén tu hielo sin sabor extraño, elimina el sarro sin dañar el níquel o renueva tu equipo por un modelo con autolimpieza automática.",
      products: [
        CATALOG.AFFRESH_OPAL_DESCALER_FILTER,
        CATALOG.EUHOMY_NUGGET_34LB_COMPACT,
        CATALOG.SILONN_SLIM01_BULLET_26LB,
      ],
      vsCompetitor: CATALOG.EUHOMY_NUGGET_34LB_COMPACT,
    };
  }

  // 2. Conservación, accesorios, congelador, contenedores
  if (
    category === "conservacion-hielo-y-accesorios" ||
    text.includes("contenedor") ||
    text.includes("congelador") ||
    text.includes("alfombrilla") ||
    text.includes("bolsas")
  ) {
    return {
      sectionTitle:
        "Accesorios y Máquinas Recomendadas para Guardar y Servir Hielo en Casa",
      sectionSubtitle:
        "Acumula lotes perfectos antes de tus reuniones sin que se peguen en el congelador y mantén tu encimera impecable.",
      products: [
        CATALOG.FREEZER_ICE_BIN_SCOOP_KIT,
        CATALOG.EUHOMY_CLEAR_SQUARE_40LB,
        CATALOG.AFFRESH_OPAL_DESCALER_FILTER,
      ],
      vsCompetitor: CATALOG.AFFRESH_OPAL_DESCALER_FILTER,
    };
  }

  // 3. Cubo cuadrado cristalino, fiestas, reuniones, whisky, cócteles, 40 lb
  if (
    text.includes("cristalino") ||
    text.includes("clear") ||
    text.includes("cuadrado") ||
    text.includes("luma") ||
    text.includes("newair") ||
    text.includes("whisky") ||
    text.includes("coctel") ||
    text.includes("reuniones") ||
    text.includes("fiesta") ||
    text.includes("bbq") ||
    text.includes("40lb") ||
    text.includes("40-a-48")
  ) {
    return {
      sectionTitle:
        "Mejores Máquinas de Alta Capacidad y Hielo Cristalino para Reuniones en Casa",
      sectionSubtitle:
        "Compara en Amazon EE. UU. los equipos de 40 a 45 lb/día que producen lotes grandes y no aguan cócteles ni refrescos.",
      products: [
        CATALOG.EUHOMY_CLEAR_SQUARE_40LB,
        CATALOG.FRIGIDAIRE_GALLERY_NUGGET_44LB,
        CATALOG.LUMA_COMFORT_IM200SS_CLEAR,
      ],
      vsCompetitor: CATALOG.FRIGIDAIRE_GALLERY_NUGGET_44LB,
    };
  }

  // 4. Hielo tipo Nugget / Sonic / Pebble / Iced Coffee / Opal
  if (
    category === "mejores-maquinas-hielo-nugget" ||
    text.includes("nugget") ||
    text.includes("opal") ||
    text.includes("pebble") ||
    text.includes("sonic") ||
    text.includes("masticable") ||
    text.includes("coffee") ||
    text.includes("cafe") ||
    text.includes("ecozy")
  ) {
    const startWithCompact =
      text.includes("economica") ||
      text.includes("compacta") ||
      text.includes("250") ||
      text.includes("euhomy-nugget") ||
      text.includes("silonn-nugget");
    if (startWithCompact) {
      return {
        sectionTitle:
          "Mejores Máquinas de Hielo Tipo Nugget Compactas y Calidad-Precio en Amazon",
        sectionSubtitle:
          "Auténtico hielo masticable crujiente para tu café frío y uso diario ocupando mínimo espacio bajo tus gabinetes.",
        products: [
          CATALOG.EUHOMY_NUGGET_34LB_COMPACT,
          CATALOG.SILONN_NUGGET_33LB_QUIET,
          CATALOG.FRIGIDAIRE_GALLERY_NUGGET_44LB,
        ],
        vsCompetitor: CATALOG.SILONN_NUGGET_33LB_QUIET,
      };
    }
    return {
      sectionTitle:
        "Top Máquinas de Hielo Tipo Nugget (Sonic Ice Masticable) en Amazon EE. UU.",
      sectionSubtitle:
        "Comparadas por precio, producción en lb/24h, altura bajo gabinete y nivel de ruido para uso diario o reuniones.",
      products: [
        CATALOG.GE_OPAL_2_SIDE_TANK,
        CATALOG.FRIGIDAIRE_GALLERY_NUGGET_44LB,
        CATALOG.EUHOMY_NUGGET_34LB_COMPACT,
      ],
      vsCompetitor: CATALOG.FRIGIDAIRE_GALLERY_NUGGET_44LB,
    };
  }

  // 5. Cubitos bala rápidos, económicas precio variable en Amazon, silenciosas, portátiles
  if (
    category === "mejores-maquinas-cubitos-de-hielo" ||
    text.includes("slim01") ||
    text.includes("bala") ||
    text.includes("26lb") ||
    text.includes("26-libras") ||
    text.includes("100-dolares") ||
    text.includes("80-dolares") ||
    text.includes("70-dolares") ||
    text.includes("portatil") ||
    text.includes("silenciosa")
  ) {
    return {
      sectionTitle:
        "Mejores Máquinas de Cubitos Rápidos (6 Minutos) y Silenciosas en Amazon EE. UU.",
      sectionSubtitle:
        "Ideales para uso diario económico, cocinas pequeñas, departamentos y tandas rápidas precio variable en Amazon.",
      products: [
        CATALOG.SILONN_SLIM01_BULLET_26LB,
        CATALOG.EUHOMY_BULLET_26LB_HANDLE,
        CATALOG.FRIGIDAIRE_EFIC189_STAINLESS,
      ],
      vsCompetitor: CATALOG.EUHOMY_BULLET_26LB_HANDLE,
    };
  }

  // 6. Selección general equilibrada (Cubitos vs Nugget vs Fiestas)
  return {
    sectionTitle:
      "Las 3 Mejores Máquinas de Hielo de Sobremesa en Amazon EE. UU. (Uso Diario y Reuniones)",
    sectionSubtitle:
      "Nuestras ganadoras verificadas en hielo nugget masticable, cubitos rápidos económicos y cubo cuadrado cristalino.",
    products: [
      CATALOG.EUHOMY_NUGGET_34LB_COMPACT,
      CATALOG.SILONN_SLIM01_BULLET_26LB,
      CATALOG.EUHOMY_CLEAR_SQUARE_40LB,
    ],
    vsCompetitor: CATALOG.SILONN_SLIM01_BULLET_26LB,
  };
}
