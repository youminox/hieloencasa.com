"use client";

import { useEffect, useState } from "react";
import {
  AmazonProductRecommendation,
  AmazonStoreRegion,
  AMAZON_TAG_ES,
  AMAZON_TAG_US,
  buildAmazonUrl,
  detectUserAmazonRegion,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";

interface AmazonAffiliateBoxProps {
  variant: "verdict" | "vs" | "inline" | "showcase" | "sidebar";
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
  source?: string;
}

function CategoryIcon({
  type,
}: {
  type: AmazonProductRecommendation["categoryType"];
}) {
  if (type === "nugget-premium" || type === "nugget-compact") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-900 border border-sky-300/60 text-2xl">
        🧊
      </div>
    );
  }
  if (type === "bullet-fast") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-900 border border-amber-300/60 text-2xl">
        ⚡
      </div>
    );
  }
  if (type === "clear-square") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-900 border border-teal-300/60 text-2xl">
        🥂
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#07111e] text-[#38bdf8] border border-[#0284c7]/40 shadow-2xs text-2xl">
      🧼
    </div>
  );
}

export default function AmazonAffiliateBox({
  variant,
  sectionTitle,
  sectionSubtitle,
  products,
  vsCompetitor,
  source = "article",
}: AmazonAffiliateBoxProps) {
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const changeRegion = (next: AmazonStoreRegion) => {
    setRegion(next);
    try {
      window.localStorage.setItem("hec_amazon_region", next);
    } catch {
      // ignore
    }
  };

  const primaryProduct = products[0];
  const storeName =
    region === "US" ? "Amazon.com (EE. UU.)" : "Amazon.es (España)";
  const shortStore = region === "US" ? "Amazon.com" : "Amazon.es";
  const activeTag = region === "US" ? AMAZON_TAG_US : AMAZON_TAG_ES;

  const onAmazonClick = (prod: AmazonProductRecommendation, pos: string) => {
    const url = buildAmazonUrl(prod, region);
    trackClick(`${source}-${variant}-${pos}`, {
      article_slug: prod.id,
      article_title: prod.title,
      category: "amazon",
      target_url: url,
    });
  };

  // 1. VERDICT VARIANT (Top box on transactional & review pages)
  if (variant === "verdict") {
    const url = buildAmazonUrl(primaryProduct, region);
    return (
      <section
        aria-label="Recomendación destacada de máquina de hielo de sobremesa y precio en Amazon"
        className="my-8 rounded-3xl border-2 border-[#0284c7]/40 bg-gradient-to-br from-[#f0f7fc] via-white to-[#e0f2fe]/60 p-5 sm:p-7 shadow-[0_20px_50px_-28px_rgba(2,132,199,0.3)]"
      >
          <div className="inline-flex items-center gap-1 rounded-full bg-white border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold text-slate-600">
            <span>Tienda Amazon:</span>
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
                region === "US"
                  ? "bg-[#0284c7] text-white font-extrabold"
                  : "hover:text-slate-900"
              }`}
            >
              🇺🇸 Amazon.com
            </button>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
                region === "ES"
                  ? "bg-[#0284c7] text-white font-extrabold"
                  : "hover:text-slate-900"
              }`}
            >
              🇪🇸 Amazon.es
            </button>
          </div>
        </div>

        <div className="mt-5 grid items-center gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="flex items-start gap-3.5">
              <CategoryIcon type={primaryProduct.categoryType} />
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-fxink leading-tight">
                  {primaryProduct.title}
                </h2>
                <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">
                  {primaryProduct.subtitle}
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-fxink">
              {primaryProduct.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#38bdf8]/30 text-xs font-extrabold text-[#0369a1]">
                    ✓
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm">
            {primaryProduct.specs && (
              <dl className="grid grid-cols-2 gap-2.5 text-xs mb-4">
                <div className="rounded-xl bg-fxsky p-2.5 col-span-2">
                  <dt className="text-[var(--muted)] font-semibold">
                    🧊 Tipo de Hielo y Rango de Precio
                  </dt>
                  <dd className="font-display font-extrabold text-fxblue mt-0.5">
                    {primaryProduct.specs.iceAndPrice}
                  </dd>
                </div>
                <div className="rounded-xl bg-fxsky p-2.5 col-span-2">
                  <dt className="text-[var(--muted)] font-semibold">
                    ⚡ Capacidad Diaria y Ciclo
                  </dt>
                  <dd className="font-display font-extrabold text-prune mt-0.5">
                    {primaryProduct.specs.capacity}
                  </dd>
                </div>
                <div className="rounded-xl bg-fxsky p-2.5 col-span-2">
                  <dt className="text-[var(--muted)] font-semibold">
                    📏 Tamaño y Espacio Bajo Gabinete
                  </dt>
                  <dd className="font-display font-extrabold text-fxink mt-0.5">
                    {primaryProduct.specs.dimensions}
                  </dd>
                </div>
                <div className="rounded-xl bg-fxsky p-2.5 col-span-2">
                  <dt className="text-[var(--muted)] font-semibold">
                    🔇 Nivel de Ruido y Uso Recomendado
                  </dt>
                  <dd className="font-display font-extrabold text-fxink mt-0.5">
                    {primaryProduct.specs.noiseAndUse}
                  </dd>
                </div>
              </dl>
            )}
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => onAmazonClick(primaryProduct, "verdict")}
              className="btn btn-buy shine w-full text-sm !py-3.5"
            >
              <span>🧊 {primaryProduct.ctaLabel}</span>
              <span aria-hidden>↗</span>
            </a>
            <p className="mt-2 text-center text-[11px] text-[var(--muted)]">
              Envío rápido Prime y cupones activos en {storeName} ({activeTag})
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 2. VS VARIANT (Side-by-side duel on comparison articles)
  if (variant === "vs") {
    const rival = vsCompetitor || products[1];
    const contenders = [primaryProduct, rival];
    return (
      <section
        aria-label="Comparativa de máquinas de hielo de sobremesa en Amazon"
        className="my-8 rounded-3xl border-2 border-[#38bdf8]/45 bg-gradient-to-br from-[#07111e] via-[#0b1c2c] to-[#081726] p-5 sm:p-7 text-white shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#38bdf8]/20 px-3 py-1 text-xs font-extrabold text-[#bae6fd]">
              ⚖️ Comparativa: Precio · Capacidad · Tamaño · Ruido · {storeName}
            </span>
            <h2 className="mt-1.5 font-display text-lg sm:text-xl font-extrabold">
              Duelo de Máquinas de Hielo en Amazon: ¿Uso Diario o Reuniones en
              Casa?
            </h2>
          </div>
          <div className="inline-flex items-center gap-1 rounded-xl bg-white/10 p-1 border border-white/15 text-xs">
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                region === "US"
                  ? "bg-amber-400 text-slate-950"
                  : "text-white/75 hover:text-white"
              }`}
            >
              🇺🇸 Amazon.com
            </button>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                region === "ES"
                  ? "bg-amber-400 text-slate-950"
                  : "text-white/75 hover:text-white"
              }`}
            >
              🇪🇸 Amazon.es
            </button>
          </div>
        </div>

                  <h3 className="mt-3 font-display text-lg font-extrabold text-white leading-snug">
                    {prod.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/75 leading-relaxed">
                    {prod.subtitle}
                  </p>
                  {prod.specs && (
                    <div className="mt-3 grid grid-cols-1 gap-1.5 rounded-xl bg-black/25 p-2.5 text-[11px]">
                      <div>
                        <span className="text-white/60">Hielo y Precio: </span>
                        <strong className="text-sky-300">
                          {prod.specs.iceAndPrice}
                        </strong>
                      </div>
                      <div>
                        <span className="text-white/60">Capacidad: </span>
                        <strong className="text-emerald-300">
                          {prod.specs.capacity}
                        </strong>
                      </div>
                      <div>
                        <span className="text-white/60">Tamaño: </span>
                        <strong className="text-white">
                          {prod.specs.dimensions}
                        </strong>
                      </div>
                      <div>
                        <span className="text-white/60">Ruido y Uso: </span>
                        <strong className="text-amber-300">
                          {prod.specs.noiseAndUse}
                        </strong>
                      </div>
                    </div>
                  )}
                  <ul className="mt-3.5 space-y-1.5 text-xs text-white/85">
                    {prod.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#38bdf8] font-extrabold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(prod, `vs-${idx}`)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 text-xs sm:text-sm font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-amber-400"
                >
                  <span>
                    {prod.ctaLabel} en {shortStore}
                  </span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // 3. INLINE VARIANT (Mid-article high CTR card)
  if (variant === "inline") {
    const url = buildAmazonUrl(primaryProduct, region);
    return (
      <aside
        aria-label="Recomendación destacada de máquina de hielo en Amazon"
        className="my-9 rounded-2xl border-2 border-sky-400/70 bg-gradient-to-br from-[#f8fcff] via-[#f0f7fc] to-[#e0f2fe]/55 p-5 sm:p-6 shadow-md"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-3 py-1 text-xs font-extrabold text-sky-950 border border-sky-400/40">
            {primaryProduct.badge}
          </span>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/90 border border-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
            <span>Tienda:</span>
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
                region === "US"
                  ? "bg-[#0284c7] text-white font-extrabold"
                  : "hover:text-slate-900"
              }`}
              title={`Ver en Amazon Estados Unidos (${AMAZON_TAG_US})`}
            >
              🇺🇸 US
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
                region === "ES"
                  ? "bg-[#0284c7] text-white font-extrabold"
                  : "hover:text-slate-900"
              }`}
              title={`Ver en Amazon España (${AMAZON_TAG_ES})`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>

            </div>
          </div>

          <div className="sm:shrink-0">
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => onAmazonClick(primaryProduct, "inline")}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:from-[#0369a1] hover:to-[#0284c7] hover:shadow-md"
            >
              <span>{primaryProduct.ctaLabel}</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 4. SIDEBAR VARIANT (Sticky right column on desktop)
  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border-2 border-sky-400/70 bg-gradient-to-b from-[#f8fcff] to-[#f0f7fc] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0369a1]">
            🧊 Top Máquinas en {shortStore}
          </span>
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`cursor-pointer ${
                region === "US" ? "text-[#0284c7] font-extrabold underline" : ""
              }`}
            >
              🇺🇸 US
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`cursor-pointer ${
                region === "ES" ? "text-[#0284c7] font-extrabold underline" : ""
              }`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>

                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(prod, `sidebar-${idx}`)}
                  className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0284c7] px-3 py-2 text-xs font-extrabold text-white transition hover:bg-[#0369a1]"
                >
                  <span>Consultar precio en {shortStore}</span>
                  <span>→</span>
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] text-slate-500 leading-tight text-center">
          Afiliado oficial Amazon ({activeTag}).
        </p>
      </div>
    );
  }

  // 5. SHOWCASE VARIANT (Full 3-product comparison grid)
  return (
    <section
      aria-label="Selección de máquinas de hielo de sobremesa recomendadas en Amazon"
      className="my-12 rounded-3xl border-2 border-sky-400/70 bg-gradient-to-br from-[#07111e] via-[#0b1c2c] to-[#081827] p-6 sm:p-8 text-white shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/20 px-3 py-1 text-xs font-extrabold text-sky-300">
            🧊 Selección Oficial HieloEnCasa.com · Disponible en {storeName}
          </span>
          <h2 className="mt-2.5 font-display text-xl sm:text-2xl font-extrabold text-white">
            {sectionTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/75">
            {sectionSubtitle}
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-center rounded-xl bg-white/10 p-1.5 border border-white/15 text-xs">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`rounded-lg px-2.5 py-1.5 font-bold transition cursor-pointer ${
                region === "US"
                  ? "bg-amber-400 text-slate-950 shadow-2xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              🇺🇸 Amazon.com
            </button>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`rounded-lg px-2.5 py-1.5 font-bold transition cursor-pointer ${
                region === "ES"
                  ? "bg-amber-400 text-slate-950 shadow-2xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              🇪🇸 Amazon.es
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {products.map((product, index) => {
          const url = buildAmazonUrl(product, region);
          const isFeatured = index === 0;

          return (
            <div
              key={product.id + index}
              className={`flex flex-col justify-between rounded-2xl p-5 transition ${
                isFeatured
                  ? "border-2 border-amber-400 bg-gradient-to-b from-sky-500/15 via-white/[0.06] to-white/[0.04] shadow-lg"
                  : "border border-white/15 bg-white/[0.05] hover:border-sky-400/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                      isFeatured
                        ? "bg-amber-400 text-slate-950"
                        : "bg-white/10 text-sky-300"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <h3 className="mt-3.5 font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                  {product.title}
                </h3>

                <p className="mt-2 text-xs text-white/75 leading-relaxed">
                  {product.subtitle}
                </p>

                {product.specs && (
                  <div className="mt-3 rounded-xl bg-black/30 p-2.5 text-[11px] border border-white/10 space-y-1">
                    <div>
                      <span className="text-sky-300 font-bold">
                        🧊 Hielo y Precio:{" "}
                      </span>
                      <span className="text-white/90">
                        {product.specs.iceAndPrice}
                      </span>
                    </div>
                    <div className="pt-1 border-t border-white/10">
                      <span className="text-emerald-300 font-bold">
                        ⚡ Capacidad:{" "}
                      </span>
                      <span className="text-white/90">
                        {product.specs.capacity}
                      </span>
                    </div>
                    <div className="pt-1 border-t border-white/10">
                      <span className="text-sky-300 font-bold">
                        📏 Tamaño:{" "}
                      </span>
                      <span className="text-white/90">
                        {product.specs.dimensions}
                      </span>
                    </div>
                    <div className="pt-1 border-t border-white/10">
                      <span className="text-amber-300 font-bold">
                        🔇 Ruido y Uso:{" "}
                      </span>
                      <span className="text-white/85">
                        {product.specs.noiseAndUse}
                      </span>
                    </div>
                  </div>
                )}

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-3.5 text-xs text-white/85">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 text-sky-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>


                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(product, `showcase-${index}`)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-extrabold transition ${
                    isFeatured
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-md"
                      : "bg-white/15 text-white hover:bg-amber-400 hover:text-slate-950"
                  }`}
                >
                  <span>{product.ctaLabel}</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[11px] text-white/55">
        En calidad de Afiliado de Amazon ({activeTag}), HieloEnCasa.com obtiene
        ingresos por las compras adscritas que cumplen los requisitos aplicables
        sin ningún sobrecoste para ti.
      </p>
    </section>
  );
}
