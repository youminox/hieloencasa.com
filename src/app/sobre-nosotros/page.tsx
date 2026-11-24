import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre Nosotros – HieloEnCasa.com",
  description: `Conoce la misión de ${SITE_NAME} y a su fundador ${LEGAL_OWNER} (${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title="Sobre HieloEnCasa.com"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="La guía independiente en español más completa sobre máquinas de hielo de sobremesa en Amazon Estados Unidos."
    >
      <h2>Nuestra misión</h2>
      <p>
        <strong>{SITE_NAME}</strong> nació para resolver una necesidad cotidiana
        de miles de hogares hispanohablantes en Estados Unidos, Latinoamérica y
        España: elegir una máquina de hielo de sobremesa sin perderse entre
        especificaciones confusas, modelos ruidosos o medidas que chocan con los
        gabinetes de la cocina.
      </p>
      <p>
        Reunimos más de <strong>1,100 guías estructuradas</strong> que comparan
        máquinas de cubitos rápidos, cubos cuadrados cristalinos y hielo tipo
        nugget masticable según su <strong>precio</strong>,{" "}
        <strong>capacidad</strong>, <strong>tamaño</strong> y{" "}
        <strong>nivel de ruido</strong>, indicando siempre cuál rinde mejor en
        el día a día y cuál brilla en fiestas y reuniones en casa.
      </p>

      <h2>Quién está detrás del proyecto</h2>
      <p>
        El sitio web es titularidad de <strong>{LEGAL_OWNER}</strong>,
        domiciliado en <strong>{LEGAL_LOCATION}</strong>. Si deseas ponerte en
        contacto directo con nosotros para sugerencias editoriales, correcciones
        o consultas comerciales, escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
