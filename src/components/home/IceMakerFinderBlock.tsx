"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type IceMakerTier = {
  key: string;
  label: string;
  iceAndPrice: string;
  capacityAndSize: string;
  noiseSpec: string;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
};

export default function IceMakerFinderBlock({
  options,
}: {
  options: IceMakerTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [guestsCount, setGuestsCount] = useState(12);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.EUHOMY_NUGGET_34LB_COMPACT;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";

  const neededLbs = Math.round(guestsCount * 1.6);
  const glasses16oz = guestsCount * 3;
  const recommendedCap =
    guestsCount <= 4
      ? "26–33 lb/24h"
      : guestsCount <= 12
      ? "34–38 lb/24h"
      : "40–45 lb/24h + Reserva";

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-drink/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de máquina de hielo según tipo de hielo y uso"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-white text-fxbluedeep shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("(")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                <strong className="text-fxink">¿Cuándo te conviene?</strong>{" "}
                {p.idealFor}
              </p>
              <div className="mt-2.5 rounded-xl bg-fxsky p-2.5 text-xs space-y-0.5">
                <p className="font-bold text-fxblue">🧊 {p.iceAndPrice}</p>
                <p className="font-semibold text-fxink">
                  📏 {p.capacityAndSize}
                </p>
                <p className="font-semibold text-prune">🔇 {p.noiseSpec}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              🧊 Consultar precio en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-sm">
              Ver reseña →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#07111e] via-[#0b1c2c] to-[#091a28] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-drinklight/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora de Capacidad: Uso Diario vs Reuniones en Casa
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Para cuántas personas o invitados necesitas hielo?
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Desliza para calcular cuántas libras reales necesitas en un día normal
          de familia (1–5 personas) o en una reunión en casa (10–35 invitados).
        </p>
        <label
          htmlFor="guests-slider"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Personas en casa o invitados a la reunión</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-fxlime">
            {guestsCount} {guestsCount === 1 ? "persona" : "personas"}
          </span>
        </label>
        <input
          id="guests-slider"
          type="range"
          min={1}
          max={35}
          step={1}
          value={guestsCount}
          onChange={(e) => setGuestsCount(Number(e.target.value))}
          className="mt-3 w-full accent-[#38BDF8]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          <span>1–3 (Uso diario)</span>
          <span>8–12 (Cena familiar)</span>
          <span>20 (Fiesta / BBQ)</span>
          <span>35+ invitados</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Hielo Recomendado", `~${neededLbs} lb (${Math.round(neededLbs * 0.45)} kg)`],
            ["Vasos Fríos 16 oz", `~${glasses16oz} bebidas`],
            ["Capacidad Máquina", recommendedCap],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-drinklight/50 bg-drinklight/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-sm text-fxlime sm:text-base"
                    : "text-xs sm:text-base"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/60">
          <span>
            Para reuniones de 15+ invitados, guarda 2–3 cestas en el congelador
            la víspera y deja la máquina produciendo hielo fresco en vivo.
          </span>
          <OpenChatButton
            label="Pedir recomendación al Asesor IA"
            prompt={`Somos ${guestsCount} personas y me interesa la opción "${p.label}". ¿Qué máquina de hielo de sobremesa me conviene comprar en Amazon Estados Unidos por precio, capacidad, tamaño y ruido?`}
            className="text-fxlime font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
