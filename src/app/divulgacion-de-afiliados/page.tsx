import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados de Amazon",
  description: `Declaración transparente de participación en el Programa de Afiliados de Amazon de ${SITE_NAME} (${LEGAL_OWNER}).`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionAfiliadosPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Transparencia total sobre cómo financiamos nuestras guías gratuitas y el Asesor IA."
    >
      <h2>Declaración oficial del Programa de Afiliados de Amazon</h2>
      <p>
        <strong>{SITE_NAME}</strong>, propiedad de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en {LEGAL_LOCATION} · correo{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa en el
        Programa de Afiliados de <strong>Amazon.com Services LLC</strong> (ID de
        rastreo Estados Unidos: <code>{AMAZON_TAG_US}</code>) y en el Programa
        de Afiliados de <strong>Amazon EU</strong> (ID de seguimiento España:{" "}
        <code>{AMAZON_TAG_ES}</code>), programas de publicidad para afiliados
        diseñados para ofrecer a sitios web un modo de obtener comisiones por
        publicidad, publicitando e incluyendo enlaces a{" "}
        <code>amazon.com</code> y <code>amazon.es</code>.
      </p>

      <h2>¿Paga más el usuario al usar nuestros enlaces?</h2>
      <p>
        <strong>Nunca.</strong> El precio del producto en Amazon es exactamente
        el mismo entres desde {SITE_NAME} o escribas la dirección directamente
        en tu navegador. Cuando realizas una compra que cumple los requisitos,
        Amazon nos abona una pequeña comisión que nos permite mantener
        actualizadas nuestras más de 1,100 guías gratuitas y nuestro chat de
        asesoría en línea.
      </p>

      <h2>Independencia en nuestras recomendaciones</h2>
      <p>
        Seleccionamos máquinas de hielo de cubitos y de hielo tipo nugget
        evaluando criterios objetivos de precio, capacidad real en libras por 24
        horas, dimensiones bajo gabinete, facilidad de limpieza y nivel de ruido
        en decibelios, diferenciando siempre qué modelo conviene para uso diario
        frente a reuniones en casa.
      </p>
    </SimplePage>
  );
}
