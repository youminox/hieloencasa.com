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
  title: "Política de Cookies y Almacenamiento Local",
  description: `Información transparente sobre cookies y almacenamiento local en ${SITE_NAME} (${LEGAL_OWNER}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function CookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies"
      crumb="Cookies"
      href="/politica-de-cookies/"
      intro={`Uso transparente de cookies y localStorage técnico en ${SITE_NAME}.`}
    >
      <h2>1. Titular del sitio web</h2>
      <p>
        Esta web pertenece a <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>, con correo electrónico de contacto{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Almacenamiento local técnico (`localStorage`)</h2>
      <p>
        Para ofrecer una experiencia rápida y recordar tus preferencias sin
        invadir tu privacidad, utilizamos llaves técnicas en tu navegador:
      </p>
      <ul>
        <li>
          <code>hec_amazon_region</code>: recuerda si prefieres consultar
          precios en <strong>Amazon Estados Unidos (`US`)</strong> o{" "}
          <strong>Amazon España (`ES`)</strong>.
        </li>
        <li>
          <code>hec_visitor</code>, <code>hec_chat_session</code> y{" "}
          <code>hec_chat_messages</code>: conservan tu conversación reciente con
          el Asesor de Máquinas de Hielo IA mientras cambias de página.
        </li>
      </ul>

      <h2>3. Cookies de terceros (Amazon y Google)</h2>
      <p>
        Cuando haces clic en un enlace de afiliado hacia{" "}
        <strong>Amazon.com</strong> o <strong>Amazon.es</strong>, Amazon utiliza
        sus propias cookies para atribuir la compra adscrita dentro de su
        ventana reglamentaria sin sobrecoste alguno para ti. Asimismo, Google
        AdSense puede emplear cookies para mostrar anuncios relevantes según tu
        configuración de privacidad.
      </p>

      <h2>4. Cómo gestionar o borrar cookies</h2>
      <p>
        Puedes borrar los datos de navegación y cookies desde los ajustes de
        Chrome, Safari, Firefox o Edge en cualquier momento, o consultarnos en{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
