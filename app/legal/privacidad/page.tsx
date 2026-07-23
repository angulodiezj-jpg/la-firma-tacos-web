import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/data/siteConfig";

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      notice={
        <>
          El texto siguiente es un modelo estándar RGPD/LOPDGDD para un sitio sin pedido online
          propio — te recomendamos que lo revise un gestor o abogado antes de publicarlo,
          especialmente si en el futuro añadís un formulario que recoja más datos de los
          actuales.
        </>
      }
    >
      <p>
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de 5 de
        diciembre, de Protección de Datos Personales y garantía de los derechos digitales
        (LOPDGDD), le informamos sobre el tratamiento de sus datos personales al utilizar este
        sitio web.
      </p>

      <h3>1. Responsable del tratamiento</h3>
      <ul>
        <li>
          <strong>Titular:</strong> J&amp;A FOOD MADRID SL
        </li>
        <li>
          <strong>NIF/CIF:</strong> B23895550
        </li>
        <li>
          <strong>Domicilio:</strong> {siteConfig.location.address}
        </li>
        <li>
          <strong>Correo electrónico de contacto:</strong> {siteConfig.location.email}
        </li>
        <li>
          <strong>Teléfono:</strong> {siteConfig.location.phone}
        </li>
      </ul>

      <h3>2. Finalidad del tratamiento</h3>
      <p>Los datos personales que nos facilite a través del formulario de contacto se tratarán con las siguientes finalidades:</p>
      <ul>
        <li>Responder a sus consultas, solicitudes de información o comentarios.</li>
        <li>Gestionar la relación comercial que, en su caso, se derive del contacto.</li>
      </ul>
      <p>
        Este sitio web <strong>no dispone de sistema de pedido online propio</strong>: los pedidos
        se realizan a través de plataformas externas (Uber Eats, Glovo), cada una con su propia
        política de privacidad, ajena a la de este sitio.
      </p>

      <h3>3. Legitimación</h3>
      <p>
        La base legal para el tratamiento de sus datos es su consentimiento, otorgado al enviar
        voluntariamente el formulario de contacto de esta web.
      </p>

      <h3>4. Conservación de los datos</h3>
      <p>
        Los datos se conservarán durante el tiempo necesario para atender su solicitud y, en su
        caso, durante los plazos de prescripción legal aplicables.
      </p>

      <h3>5. Destinatarios</h3>
      <p>
        No se cederán datos a terceros, salvo obligación legal. No se realizan transferencias
        internacionales de datos.
      </p>

      <h3>6. Derechos de las personas interesadas</h3>
      <p>
        Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del
        tratamiento y portabilidad de sus datos escribiendo a{" "}
        <a href={`mailto:${siteConfig.location.email}`}>{siteConfig.location.email}</a>, adjuntando
        copia de un documento que acredite su identidad. También tiene derecho a presentar una
        reclamación ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          www.aepd.es
        </a>
        ) si considera que el tratamiento no se ajusta a la normativa vigente.
      </p>

      <h3>7. Medidas de seguridad</h3>
      <p>
        Se han adoptado las medidas técnicas y organizativas necesarias para garantizar la
        seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no
        autorizado.
      </p>

      <h3>8. Menores de edad</h3>
      <p>
        Este sitio web no está dirigido a menores de 14 años. No recopilamos conscientemente datos
        de menores sin el consentimiento de sus padres o tutores.
      </p>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
      </p>
    </LegalPage>
  );
}
