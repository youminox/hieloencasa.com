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
  title: "Política de Privacidad y Protección de Datos",
  description: `Política de privacidad de ${SITE_NAME}, operado por ${LEGAL_OWNER} (${LEGAL_LOCATION} · ${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad"
      crumb="Privacidad"
      href="/politica-de-privacidad/"
      intro={`Cómo protegemos la privacidad de los visitantes de ${SITE_NAME}.`}
    >
      <h2>1. Responsable del tratamiento de datos</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Qué información recopilamos</h2>
      <p>
        En <strong>{SITE_NAME}</strong> puedes navegar libremente por nuestras
        más de 1,100 guías sin necesidad de registrarte ni proporcionar datos
        personales identificables. Únicamente se procesan:
      </p>
      <ul>
        <li>
          <strong>Consultas en el Asesor de Hielo IA:</strong> los mensajes
          enviados voluntariamente en el widget de chat en línea se procesan
          para ofrecer respuestas sobre máquinas de hielo y recomendaciones de
          productos, asociándose a un identificador técnico anónimo de sesión.
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> si nos
          escribes a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>,
          utilizaremos tu dirección únicamente para responder tu consulta.
        </li>
        <li>
          <strong>Datos técnicos estándar y publicidad:</strong> métricas de
          navegación agregadas y servicios publicitarios de terceros como Google
          AdSense o redirecciones de afiliado hacia Amazon.com / Amazon.es.
        </li>
      </ul>

      <h2>3. Normativa aplicable y derechos del usuario</h2>
      <p>
        Cumplimos con los principios de la Ley N.º 29733 (Ley de Protección de
        Datos Personales del Perú), las normativas estatales de privacidad de
        Estados Unidos (CCPA/CPRA) y el Reglamento General de Protección de
        Datos (RGPD). Puedes solicitar el acceso, rectificación o eliminación de
        cualquier dato escribiendo en cualquier momento a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
