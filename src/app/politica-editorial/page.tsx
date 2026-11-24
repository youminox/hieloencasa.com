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
  title: "Política Editorial y Metodología de Comparación",
  description: `Cómo evaluamos máquinas de hielo de cubitos y tipo nugget en ${SITE_NAME} por precio, capacidad, tamaño y nivel de ruido.`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Los 4 criterios técnicos y los 2 escenarios domésticos con los que analizamos cada máquina de hielo."
    >
      <h2>1. Dirección editorial</h2>
      <p>
        Todo el contenido de <strong>{SITE_NAME}</strong> está dirigido y
        supervisado por <strong>{LEGAL_OWNER}</strong> (domiciliado en{" "}
        {LEGAL_LOCATION} · <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>).
      </p>

      <h2>2. Nuestros 4 criterios de evaluación</h2>
      <ol>
        <li>
          <strong>Rango de Precio y Valor por Dólar:</strong> contrastamos el
          precio habitual y cupones en Amazon Estados Unidos frente a su vida
          útil, garantía y consumo eléctrico mensual.
        </li>
        <li>
          <strong>Capacidad Real (`lb/24h` y Tiempo de Ciclo):</strong>{" "}
          distinguimos las libras nominales de laboratorio de la producción real
          en cocinas a 72–78 °F, el tamaño de la canasta y la autonomía de agua.
        </li>
        <li>
          <strong>Tamaño y Altura Bajo Gabinete:</strong> verificamos las
          pulgadas de ancho, fondo y alto para garantizar que encajen bajo el
          estándar estadounidense de 18 pulgadas con ventilación segura.
        </li>
        <li>
          <strong>Nivel de Ruido (`dB`):</strong> evaluamos el impacto acústico
          del compresor, el ventilador y el motor extrusor en cocinas abiertas y
          espacios de teletrabajo.
        </li>
      </ol>

      <h2>3. Uso diario frente a reuniones en casa</h2>
      <p>
        Cada guía especifica de forma transparente si un equipo está pensado
        para el <strong>uso diario</strong> (café helado, termos térmicos y bajo
        ruido) o para <strong>reuniones en casa</strong> (alta producción de 38
        a 45 lb/día y hielo de fusión lenta).
      </p>
    </SimplePage>
  );
}
