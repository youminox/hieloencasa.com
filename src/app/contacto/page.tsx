import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto y Asesoría – HieloEnCasa.com",
  description: `Contacta con ${LEGAL_OWNER}, titular de ${SITE_NAME}, en ${LEGAL_EMAIL} (${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes dudas sobre qué máquina de hielo elegir o necesitas comunicarte con el titular del portal?"
    >
      <h2>Datos oficiales de contacto</h2>
      <ul>
        <li>
          <strong>Titular del sitio web:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico directo:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>Respuesta inmediata con nuestro Asesor de Hielo IA</h2>
      <p>
        Si buscas una recomendación instantánea entre modelos de cubitos o de
        hielo tipo nugget según tu presupuesto, el espacio de tu encimera o la
        cantidad de invitados en tus reuniones, puedes abrir nuestro chat en
        línea las 24 horas:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesor de Máquinas de Hielo IA"
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
