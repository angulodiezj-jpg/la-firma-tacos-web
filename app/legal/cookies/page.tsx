import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/data/siteConfig";

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      notice={
        <>
          ⚠️ Este texto asume que la web <strong>solo usa cookies técnicas</strong> (sin
          analítica ni publicidad). Si en el futuro añadís Google Analytics, píxeles de
          Meta/TikTok, o cualquier cookie de terceros, hay que actualizar esta página y añadir un
          banner de consentimiento — actualmente no lo necesita porque no hay cookies que
          requieran aceptación previa.
        </>
      }
    >
      <h3>¿Qué son las cookies?</h3>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web instala en el navegador del
        usuario para almacenar y recuperar información sobre su navegación.
      </p>

      <h3>Cookies que utiliza este sitio</h3>
      <p>Este sitio web utiliza únicamente cookies técnicas, necesarias para su funcionamiento básico:</p>
      <ul>
        <li>
          <strong>Preferencia de tema (claro/oscuro), si aplica:</strong> recuerda la preferencia
          visual del usuario en su navegador.
        </li>
      </ul>
      <p>
        No utilizamos cookies de análisis (como Google Analytics), publicidad, ni de redes
        sociales. Al no usar cookies no esenciales, no es necesario un banner de consentimiento
        de cookies conforme a la Guía de Cookies de la AEPD.
      </p>

      <h3>Enlaces externos</h3>
      <p>
        Este sitio enlaza a plataformas de terceros para realizar pedidos (Uber Eats, Glovo) y a
        redes sociales (Instagram, TikTok). Cada una de estas plataformas tiene su propia política
        de cookies, ajena a este sitio web, que se activa al acceder a ellas.
      </p>

      <h3>Cómo desactivar las cookies</h3>
      <p>
        Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la
        configuración de su navegador (Chrome, Safari, Firefox, Edge). Desactivar las cookies
        técnicas puede afectar al funcionamiento correcto del sitio.
      </p>

      <h3>Más información</h3>
      <p>
        Para cualquier duda sobre esta política, puede escribir a{" "}
        <a href={`mailto:${siteConfig.location.email}`}>{siteConfig.location.email}</a>.
      </p>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
      </p>
    </LegalPage>
  );
}
