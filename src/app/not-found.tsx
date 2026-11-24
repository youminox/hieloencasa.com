import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { getContextualAmazonProducts } from "@/lib/amazon";

export default function NotFound() {
  const amz = getContextualAmazonProducts("404", "home", "Máquinas de Hielo");
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <div className="wrap py-20 text-center">
          <span className="eyebrow">Página no encontrada</span>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Esta página se derritió, pero el hielo sigue listo
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            Explora nuestras más de 1,100 guías de máquinas de hielo de
            sobremesa (cubitos y hielo tipo nugget) en Amazon Estados Unidos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-buy shine">
              Volver al inicio
            </Link>
            <Link href="/mejores-maquinas-hielo-nugget/" className="btn btn-ghost">
              Ver Máquinas Hielo Nugget
            </Link>
          </div>
        </div>
        <div className="wrap pb-10">
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle={amz.sectionTitle}
            sectionSubtitle={amz.sectionSubtitle}
            products={amz.products}
            source="404"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
