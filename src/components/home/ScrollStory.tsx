"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Elige entre Cubitos Bala, Cubo Cristalino o Hielo Tipo Nugget",
    d: "Los cubitos bala (Silonn / EUHOMY 26 lb, <US$90) salen en solo 6 minutos para agua y refrescos diarios; el hielo tipo nugget masticable (Opal 2.0, Frigidaire, EUHOMY Nugget) es el rey del iced coffee y termos; y el cubo cuadrado cristalino (EUHOMY 40 lb / Luma Comfort) no agua cócteles ni whisky.",
  },
  {
    n: "02",
    t: "Verifica el Tamaño Bajo Gabinete (18\") y el Nivel de Ruido (dB)",
    d: "En Estados Unidos los gabinetes altos de cocina están a 18 pulgadas sobre la encimera. Nuestras máquinas seleccionadas miden entre 11.4\" y 16.5\" de alto y trabajan entre 35 dB y 46 dB para no molestar en cocinas abiertas.",
  },
  {
    n: "03",
    t: "Disfruta el Uso Diario: Café Frío, Agua Pura y Autolimpieza",
    d: "Llena el tanque con agua filtrada, sirve pepitas crujientes o cubitos recién hechos en tus vasos térmicos de 40 oz cada mañana y ejecuta el ciclo automático Self-Clean una vez por mes.",
  },
  {
    n: "04",
    t: "Abastece Reuniones y Fiestas en Casa sin Comprar Bolsas",
    d: "Cuando recibes de 10 a 30 invitados, enciende la máquina el día anterior para guardar 2 o 3 canastas en un contenedor hermético de congelador y déjala produciendo hielo fresco continuo durante toda la reunión.",
  },
];

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .sound-wave"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#0284C7", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".ice-cards"),
            { y: 0 },
            { y: -12, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#0F766E", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".chill-wave"),
            { rotate: -4, svgOrigin: "200 155", duration: 0.5 },
            1.15
          )
          .to(
            q(".sound-wave"),
            { opacity: 0.65, scaleX: 0.6, duration: 0.5 },
            1.25
          )
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#F59E0B", color: "#0f172a", duration: 0.2 },
            2
          )
          .to(
            q(".spec-bar"),
            { scale: 1.05, svgOrigin: "200 355", duration: 0.7 },
            2.05
          )
          .to(q(".sound-wave"), { opacity: 1, scaleX: 1, duration: 0.5 }, 2.1)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#0284C7", color: "#fff", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.4)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ruta-hielo"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">
              Del Café Frío Matutino a las Fiestas del Fin de Semana
            </span>
            <h2 className="section-title mt-3">
              Cuatro pasos.{" "}
              <span className="text-prune">
                Hielo puro y fresco en minutos sin tocar la plomería.
              </span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.78 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[#475569] sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-5 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Dato real: producir tu propio hielo e iced coffee en casa ahorra
              más de US$900 al año frente a comprar cafés helados y bolsas de
              supermercado.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(2,132,199,0.22)]"
              role="img"
              aria-label="Esquema animado de una máquina de hielo de sobremesa mostrando ventana de hielo, nivel de ruido bajo y capacidad diaria"
            >
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f0f7fc" />
                  <stop offset="1" stopColor="#dbeafe" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#07111e" />
                  <stop offset="0.65" stopColor="#0369a1" />
                  <stop offset="1" stopColor="#0f766e" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-night)"
                  opacity="0"
                />

                <g className="chill-wave">
                  <path
                    d="M140 125 A75 75 0 0 1 260 125"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M162 140 A48 48 0 0 1 238 140"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <text
                    x="200"
                    y="102"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10.5"
                    fill="#0369a1"
                  >
                    CICLO RÁPIDO 6–10 MIN · RECICLAJE TÉRMICO
                  </text>
                </g>

                {/* Cuerpo de la Máquina de Sobremesa */}
                <rect
                  x="95"
                  y="156"
                  width="210"
                  height="172"
                  rx="18"
                  fill="#1e293b"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                />
                {/* Ventana Iluminada con Hielo */}
                <rect
                  x="118"
                  y="178"
                  width="124"
                  height="112"
                  rx="10"
                  fill="#e0f2fe"
                />
                {/* Tanque Lateral Transparente */}
                <rect
                  x="252"
                  y="178"
                  width="34"
                  height="112"
                  rx="8"
                  fill="#bae6fd"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                />
                {/* Cubitos / Pepitas Nugget */}
                {[
                  [134, 250],
                  [160, 246],
                  [188, 252],
                  [214, 248],
                  [146, 224],
                  [175, 220],
                  [202, 226],
                ].map(([cx, cy], idx) => (
                  <rect
                    key={idx}
                    x={cx}
                    y={cy}
                    width="20"
                    height="18"
                    rx="5"
                    fill="#ffffff"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Tarjetas laterales Uso Diario vs Reuniones */}
                <g className="ice-cards">
                  <rect
                    x="18"
                    y="204"
                    width="94"
                    height="48"
                    rx="10"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />
                  <text
                    x="65"
                    y="224"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#0369a1"
                  >
                    ☕ Uso Diario
                  </text>
                  <text
                    x="65"
                    y="240"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#475569"
                  >
                    &lt;43 dB · Bajo 18&quot;
                  </text>

                  <rect
                    x="288"
                    y="204"
                    width="94"
                    height="48"
                    rx="10"
                    fill="#ffffff"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text
                    x="335"
                    y="224"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#b45309"
                  >
                    🥂 Reuniones
                  </text>
                  <text
                    x="335"
                    y="240"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#475569"
                  >
                    38–45 lb / 24h
                  </text>
                </g>

                <line
                  className="sound-wave"
                  x1="64"
                  y1="340"
                  x2="336"
                  y2="340"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.45"
                />

                <g className="spec-bar">
                  <rect
                    x="55"
                    y="354"
                    width="290"
                    height="36"
                    rx="10"
                    fill="#0f766e"
                    stroke="#fef08a"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="376"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10.5"
                    fill="#fef08a"
                  >
                    CUBITOS 6 MIN · HIELO NUGGET · CUBO CRISTALINO
                  </text>
                </g>

                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(42 18)"
                >
                  <rect
                    width="316"
                    height="46"
                    rx="14"
                    fill="#ffffff"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="23" r="13" fill="#0284c7" />
                  <text
                    x="24"
                    y="27"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    🧊
                  </text>
                  <text
                    x="44"
                    y="19"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#0f172a"
                  >
                    ¡Canasta llena lista para servir en casa!
                  </text>
                  <text
                    x="44"
                    y="34"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="10"
                    fill="#0369a1"
                  >
                    Autolimpieza Self-Clean · Sin conexión de plomería
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
