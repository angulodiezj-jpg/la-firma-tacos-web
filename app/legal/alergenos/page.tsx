import LegalPage from "@/components/LegalPage";

const catorceAlergenos = [
  "Gluten",
  "Crustáceos",
  "Huevos",
  "Pescado",
  "Cacahuetes",
  "Soja",
  "Lácteos",
  "Frutos de cáscara",
  "Apio",
  "Mostaza",
  "Granos de sésamo",
  "Dióxido de azufre y sulfitos",
  "Altramuces",
  "Moluscos",
];

export default function AlergenosPage() {
  return (
    <LegalPage title="Tabla de Alérgenos">
      <p>
        El Reglamento (UE) n.º 1169/2011 obliga a informar de la presencia de los siguientes 14
        alérgenos en los alimentos que se sirven en el establecimiento:
      </p>
      <ul style={{ columns: 2 }}>
        {catorceAlergenos.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      <h3>Tabla oficial por producto</h3>
      <p>
        A continuación, el detalle de alérgenos de cada plato de nuestra carta. Ante cualquier
        duda o alergia, consulta siempre con nuestro personal antes de realizar tu pedido.
      </p>

      <div className="not-prose relative left-1/2 right-1/2 -mx-[50vw] w-screen my-6 px-4">
        <div className="mx-auto max-w-5xl overflow-x-auto rounded-xl2 border border-line shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/legal/tabla-alergenos.jpg"
            alt="Tabla oficial de alérgenos de La Firma Tacos: 14 alérgenos de declaración obligatoria por producto de la carta"
            className="w-full min-w-[1100px]"
          />
        </div>
      </div>

      <p className="text-sm">
        <strong>Nota:</strong> todos nuestros productos se elaboran en instalaciones donde se
        manipulan los 14 alérgenos de declaración obligatoria. No podemos garantizar la ausencia
        total de trazas.
      </p>
    </LegalPage>
  );
}
