"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import HeroSearch from "@/components/HeroSearch";
import OpenChatButton from "@/components/OpenChatButton";

/** Partículas en canvas (cristales de hielo ártico, burbujas frías y destellos ámbar) que el puntero repele. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let running = false;
    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const COLORS = [
      "56,189,248",
      "186,230,253",
      "2,132,199",
      "254,240,138",
      "255,255,255",
      "94,234,212",
    ];
    const N = w < 700 ? 48 : 110;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.05,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: Math.random() * 0.55 + 0.25,
    }));
    let mx = -999,
      my = -999;
    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - mx,
          dy = p.y - my,
          d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const f = (16000 - d2) / 16000;
          p.vx += (dx / 4000) * f;
          p.vy += (dy / 4000) * f;
        }
        p.vx *= 0.975;
        p.vy = p.vy * 0.975 - 0.006;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const play = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting ? play() : pause()
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ric =
      (window as any).requestIdleCallback ||
      ((f: () => void) => setTimeout(f, 300));
    ric(() => io.observe(c));
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      pause();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-[1] h-full w-full"
      aria-hidden
    />
  );
}

export default function Hero({ heroImage }: { heroImage: string }) {
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01)
        raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth - 0.5) * 22;
      ty = -(e.clientY / window.innerHeight - 0.5) * 16;
      kick();
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = Math.max(-16, Math.min(16, e.gamma / 2));
      ty = Math.max(-12, Math.min(12, (e.beta - 45) / 3));
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  const words = ["HieloEnCasa", ".com"];
  return (
    <section className="hero min-h-[100svh] pt-[68px]">
      <div className="hero-aurora" />
      <div className="hero-grid" />
      <Particles />
      <div className="wrap grid min-h-[calc(100svh-68px)] items-center gap-8 py-12 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:py-6">
        <div className="relative z-20">
          <span className="chip">
            <span className="h-2 w-2 animate-pulse rounded-full bg-drinklight" />{" "}
            Guía en Español · Amazon Estados Unidos · 1,132 Guías Especializadas
          </span>
          <h1 className="hero-title mt-5">
            <span className="block">
              {words.map((w, i) => (
                <span key={w}>
                  <span
                    className="hw"
                    style={{
                      animationDelay: `${0.08 + i * 0.14}s, ${-i * 1.2}s`,
                    }}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </span>{" "}
            <span className="mt-4 block text-[0.38em] font-bold leading-[1.22] tracking-[-0.02em] text-white/90">
              {[
                "Elige",
                "máquinas",
                "de",
                "hielo",
                "de",
                "sobremesa",
                "de",
                "cubitos",
                "y",
                "hielo",
                "tipo",
                "nugget",
              ].map((w, i) => (
                <Fragment key={w + i}>
                  <span className="reveal-word">
                    <span style={{ animationDelay: `${0.38 + i * 0.04}s` }}>
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
              <span className="reveal-word">
                <span
                  style={{ animationDelay: "0.88s" }}
                  className="text-[#fde68a]"
                >
                  para uso diario o reuniones en casa
                </span>
              </span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-white/78">
            Comparamos los mejores modelos en{" "}
            <strong className="text-white">Amazon Estados Unidos</strong> según
            su <strong className="text-white">precio en dólares</strong>,{" "}
            <strong className="text-white">capacidad real (26 a 55 lb/24h)</strong>,{" "}
            <strong className="text-white">
              tamaño bajo gabinetes de 18&quot;
            </strong>{" "}
            y{" "}
            <strong className="text-[#bae6fd]">
              nivel de ruido en decibelios (dB)
            </strong>{" "}
            para que aciertes a la primera.
          </p>

          <div className="mt-6">
            <HeroSearch />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/mejores-maquinas-hielo-nugget/"
              className="btn btn-lime shine text-sm sm:text-base"
              data-magnetic
            >
              🧊 Top Hielo Nugget Masticable
            </Link>
            <Link
              href="/mejores-maquinas-cubitos-de-hielo/"
              className="btn btn-buy shine text-sm sm:text-base"
              data-magnetic
            >
              ⚡ Top Máquinas de Cubitos
            </Link>
            <OpenChatButton
              label="Consultar Asesor IA"
              className="btn btn-glass text-sm sm:text-base"
              magnetic
            />
          </div>

          <ul
            className="mt-8 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3"
            aria-label="Métricas clave de HieloEnCasa.com"
          >
            {[
              ["1,132", "guías", "800 SEO + 320 Amazon"],
              ["6 min", "rápido", "Primer lote de cubitos"],
              ["<41 dB", "silencio", "Uso diario en cocina"],
            ].map(([v, u, l], i) => (
              <li
                key={l}
                className="glass px-3 py-3 sm:px-4"
                style={{
                  animation: `fadeup .8s ${0.85 + i * 0.1}s cubic-bezier(.2,.8,.2,1) both`,
                }}
              >
                <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {v}
                  {u && (
                    <span className="ml-1 text-sm font-bold text-fxlime">
                      {u}
                    </span>
                  )}
                </p>
                <p className="text-[0.72rem] leading-tight text-white/70 sm:text-xs">
                  {l}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tilt-stage relative z-10 mx-auto w-full max-w-[560px]">
          <div ref={card} className="tilt-card relative py-4">
            <div className="tilt-glow" />
            <div className="halo-ring" />
            <div className="relative" style={{ transform: "translateZ(50px)" }}>
              <div className="float-y relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-[32px] border-2 border-white/20 shadow-[0_40px_60px_rgba(0,0,0,0.65)]">
                <Image
                  src={heroImage}
                  alt="Máquina de hielo tipo nugget de acero inoxidable con tanque lateral junto a un vaso de iced coffee en encimera de cuarzo"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111e]/95 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
                  <div>
                    <span className="inline-block rounded-full bg-fxblue px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      Selección #1 Amazon EE. UU.
                    </span>
                    <p className="mt-1 font-display text-lg sm:text-xl font-extrabold leading-tight">
                      Cubitos en 6 Min &amp; Hielo Nugget Crujiente
                    </p>
                  </div>
                  <Link
                    href="/comparativas-maquinas-de-hielo/"
                    className="shrink-0 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur hover:bg-white/30"
                  >
                    Comparar →
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="price-badge right-0 top-0 sm:right-2 sm:top-1"
              aria-label="Desde menos de US$85 en Amazon EE. UU."
            >
              <svg viewBox="0 0 124 124" aria-hidden>
                <defs>
                  <path
                    id="pb-circle"
                    d="M62,62 m-49,0 a49,49 0 1,1 98,0 a49,49 0 1,1 -98,0"
                  />
                </defs>
                <text
                  fontSize="8.8"
                  fontWeight="700"
                  fill="#0f172a"
                  fontFamily="Outfit, sans-serif"
                >
                  <textPath
                    href="#pb-circle"
                    textLength="300"
                    lengthAdjust="spacing"
                  >
                    USO DIARIO Y REUNIONES · AMAZON USA ·
                  </textPath>
                </text>
              </svg>
              <div className="relative">
                <p className="font-display text-[1.18rem] font-extrabold leading-none">
                  26–45 lb
                </p>
                <p className="mt-0.5 text-[0.62rem] font-bold">
                  Hielo / 24h
                </p>
              </div>
            </div>
            <div
              className="absolute -left-1 bottom-2 hidden rounded-2xl border border-white/15 bg-[#07111e]/90 px-4 py-3 shadow-xl backdrop-blur sm:block"
              style={{ transform: "translateZ(80px)" }}
            >
              <p className="text-[0.68rem] uppercase tracking-wider text-white/60">
                Evaluación en 4 Ejes
              </p>
              <p className="font-display font-bold text-drinklight">
                Precio · Capacidad · Tamaño · Ruido
              </p>
            </div>
            <div
              className="absolute bottom-[44%] right-[-6px] hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur md:block"
              style={{ transform: "translateZ(120px)" }}
            >
              ☕ Ideal Iced Coffee Diario y Fiestas en Casa
            </div>
          </div>
        </div>
      </div>
      <a
        href="#como-elegir"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 lg:flex"
        aria-label="Bajar a cómo elegir tu máquina de hielo"
      >
        <span className="h-10 w-6 rounded-full border border-white/30 p-1">
          <span className="block h-2 w-full animate-bounce rounded-full bg-drinklight" />
        </span>
      </a>
    </section>
  );
}
