"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Slider arrastrable Antes ↔ Después (estilo DayNightSlider de prunex1.com): Modo Uso Diario Silencioso (Iced Coffee, 26–34 lb, <43 dB) vs Modo Reuniones y Fiestas en Casa (40–45 lb/día, Cubo Cristalino / Nugget 44 lb). */
export default function UsageModeSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const pro = clamp((t - 0.45) / 0.45);
  const fullParty = clamp((t - 0.55) / 0.4);

  const phase =
    t < 0.35
      ? "Escenario A · Uso Diario en Casa (Iced Coffee, Termos 40 oz y Silencio <43 dB)"
      : t < 0.68
      ? "Transición · De Rutina Matutina a Fin de Semana con Invitados"
      : "Escenario B · Reuniones y Fiestas en Casa (40–45 lb/24h y Cubo que No Agua)";

  const capacityReading =
    t < 0.45 ? "26–34 lb/24h · <43 dB" : "40–45 lb/24h · 15–30 Invitados";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#07111e] shadow-[0_40px_80px_-40px_rgba(2,132,199,0.5)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if (
              (e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)
            )
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e0f2fe" />
              <stop offset="1" stopColor="#f8fafc" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0369a1" />
              <stop offset="0.55" stopColor="#0284c7" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#07111e" />
              <stop offset="0.7" stopColor="#0f766e" />
              <stop offset="1" stopColor="#1e1b4b" />
            </linearGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="1" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={mid} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={pro} />

          <circle
            cx="400"
            cy="230"
            r="240"
            fill="url(#dn-lamp)"
            opacity={pro}
          />

          <rect
            x="0"
            y="365"
            width="800"
            height="85"
            fill={pro > 0.5 ? "#0b1726" : "#dbe7f0"}
          />

          {pro < 0.5 ? (
            <g>
              <rect
                x="220"
                y="145"
                width="360"
                height="195"
                rx="18"
                fill="#0f172a"
                stroke="#0284c7"
                strokeWidth="4"
              />
              <rect
                x="238"
                y="162"
                width="324"
                height="161"
                rx="8"
                fill="#ffffff"
              />
              <rect
                x="252"
                y="174"
                width="142"
                height="136"
                rx="6"
                fill="#e0f2fe"
              />
              <text
                x="323"
                y="234"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="800"
                fill="#0369a1"
              >
                Hielo Nugget Suave
              </text>
              <text
                x="323"
                y="256"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill="#0f172a"
              >
                Iced Coffee &amp; Termos 40 oz
              </text>
              <rect
                x="406"
                y="174"
                width="142"
                height="136"
                rx="6"
                fill="#fef3c7"
              />
              <text
                x="477"
                y="234"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="800"
                fill="#b45309"
              >
                Cubitos Bala 6 Min
              </text>
              <text
                x="477"
                y="256"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill="#0f172a"
              >
                &lt;US$90 · 35–41 dB
              </text>
              <text
                x="400"
                y="128"
                textAnchor="middle"
                fontFamily="Outfit, sans-serif"
                fontWeight="800"
                fontSize="15.5"
                fill="#0369a1"
              >
                ☀️ Lunes a Viernes: Silencio en Cocina Abierta y Bajo Gabinete
                de 18&quot;
              </text>
            </g>
          ) : (
            <g opacity={fullParty}>
              <rect
                x="210"
                y="140"
                width="380"
                height="205"
                rx="18"
                fill="#0f172a"
                stroke="#fef08a"
                strokeWidth="4"
              />
              <rect
                x="228"
                y="156"
                width="344"
                height="173"
                rx="8"
                fill="#0f766e"
              />
              <text
                x="400"
                y="214"
                textAnchor="middle"
                fontSize="16"
                fontWeight="800"
                fill="#fef08a"
              >
                🥂 24 Cubos Cuadrados Cristalinos por Ciclo (40–45 lb/día)
              </text>
              <text
                x="400"
                y="246"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#ffffff"
              >
                EUHOMY 40 lb Clear Square · Frigidaire Nugget 44 lb · Opal 2.0
              </text>
              <text
                x="400"
                y="276"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#bae6fd"
              >
                ✓ Se derriten 3x más lento en whisky, cócteles y jarras para
                invitados
              </text>
            </g>
          )}

          <rect
            x="115"
            y="352"
            width="570"
            height="34"
            rx="10"
            fill="#07111e"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <text
            x="400"
            y="374"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12"
            fill="#fef08a"
          >
            {pro > 0.5
              ? "Reuniones en Casa: acumula 2–3 cestas en el congelador el día previo y deja la máquina activa"
              : "Uso Diario: prioriza autolimpieza de 1 botón, menos de 43 dB y tamaño compacto en encimera"}
          </text>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/50 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums">
            {capacityReading}
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/50 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fxlime">
            {pro > 0.5
              ? "Ganadoras para Reuniones y Fiestas"
              : "Ganadoras para Uso Diario"}
          </p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">
            {pro > 0.5
              ? "EUHOMY 40 lb Cristalino y Frigidaire Nugget 44 lb"
              : "EUHOMY Nugget 34 lb, Opal 2.0 y Silonn SLIM01"}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para comparar Uso Diario Silencioso vs Reuniones en Casa
            →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#07111e] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap">
          ☕ Uso Diario (&lt;43 dB)
        </span>
        <label className="sr-only" htmlFor="dn-range">
          Comparador entre uso diario y reuniones en casa
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${capacityReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">
          🥂 Reuniones (40–45 lb/día)
        </span>
      </div>
    </div>
  );
}
