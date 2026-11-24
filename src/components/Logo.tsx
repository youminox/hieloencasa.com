import { useId } from "react";

/** Logotipo de HieloEnCasa.com: Cubo Cristalino Facetado + Destello Ártico */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#07111E" />
          <stop offset="0.52" stopColor="#0369A1" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id={`${id}ice`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E0F2FE" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF08A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      {/* Cubo isométrico cristalino */}
      <polygon
        points="32,12 50,22 50,42 32,52 14,42 14,22"
        fill={`url(#${id}ice)`}
        fillOpacity="0.92"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      <polyline
        points="14,22 32,32 50,22"
        fill="none"
        stroke="#0284C7"
        strokeWidth="2"
      />
      <line
        x1="32"
        y1="32"
        x2="32"
        y2="52"
        stroke="#0284C7"
        strokeWidth="2"
      />
      {/* Destello dorado superior */}
      <circle cx="46" cy="15" r="3.2" fill={`url(#${id}gold)`} />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        HieloEn<span className={dark ? "text-drinklight" : "text-fxblue"}>Casa</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
