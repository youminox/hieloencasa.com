import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  ICE_DISCLAIMER,
} from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Aviso Legal y Condiciones de Uso",
  description: `Aviso legal e información del titular de ${SITE_NAME}: ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Condiciones de Uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro={`Información legal sobre la titularidad, objeto y condiciones de uso del portal ${SITE_NAME}.`}
    >
      <h2>1. Datos identificativos del titular de la web</h2>
      <p>
        El presente sitio web <strong>{SITE_NAME}</strong> ({SITE_URL}) es
        propiedad y está gestionado por:
      </p>
      <ul>
        <li>
          <strong>Titular:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Objeto del sitio web</h2>
      <p>
        <strong>{SITE_NAME}</strong> es una guía informativa y comparativa en
        español dedicada a ayudar a los consumidores a elegir máquinas de hielo
        de sobremesa en Amazon Estados Unidos y Amazon España, evaluando modelos
        de cubitos y de hielo tipo nugget según su precio, capacidad diaria,
        tamaño y nivel de ruido tanto para el uso diario como para reuniones en
        casa.
      </p>

      <h2>3. Propiedad intelectual y marcas registradas</h2>
      <p>
        Los textos, comparativas, tablas, código y diseño original del sitio son
        titularidad de <strong>{LEGAL_OWNER}</strong>. Asimismo, en este portal{" "}
        {ICE_DISCLAIMER}.
      </p>

      <h2>4. Enlaces de afiliación y precios en Amazon</h2>
      <p>
        Este sitio web participa en el Programa de Afiliados de Amazon.com
        Associates (ID: <code>{AMAZON_TAG_US}</code>) y Amazon EU Associates
        (ID: <code>{AMAZON_TAG_ES}</code>). Los precios y la disponibilidad de
        los productos en Amazon pueden variar en tiempo real; prevalecerá
        siempre la información mostrada en la página oficial de Amazon en el
        momento de la compra.
      </p>

      <h2>5. Legislación aplicable y contacto</h2>
      <p>
        Para cualquier consulta legal, sugerencia o notificación relacionada con{" "}
        {SITE_NAME}, puede escribir directamente a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>, con domicilio en{" "}
        {LEGAL_LOCATION}.
      </p>
    </SimplePage>
  );
}
