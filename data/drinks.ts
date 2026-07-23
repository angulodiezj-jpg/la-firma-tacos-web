// Logos/fotos reales de cada marca de bebida que servimos, para un apartado
// básico tipo o-tacos.com/fr: solo el logo de la marca, sin ficha por sabor.
export type DrinkBrand = {
  name: string;
  logo: string;
  ribbon?: string;
};

export const drinkBrands: DrinkBrand[] = [
  { name: "Coca-Cola", logo: "/images/drinks/coca-cola.png" },
  { name: "Fanta", logo: "/images/drinks/fanta.png" },
  { name: "Oasis", logo: "/images/drinks/oasis.png", ribbon: "Más Vendido" },
  { name: "Chill", logo: "/images/drinks/chill.png" },
  { name: "Lipton", logo: "/images/drinks/lipton.png" },
  { name: "Schweppes", logo: "/images/drinks/schweppes.png" },
  { name: "Agua Cortes", logo: "/images/drinks/agua-cortes.png" },
  { name: "Hawai", logo: "/images/drinks/hawai.png" },
  { name: "Aquarius", logo: "/images/drinks/aquarius.png" },
  { name: "Nestea", logo: "/images/drinks/nestea.png" },
  { name: "Selecto", logo: "/images/drinks/selecto.svg" },
  { name: "Hamoud Boualem", logo: "/images/drinks/hamoud-boualem.png" },
  { name: "Orangina", logo: "/images/drinks/orangina.jpg" },
  { name: "Pom's", logo: "/images/drinks/poms.png" },
  { name: "Capri Sun", logo: "/images/drinks/capri-sun.png" },
  { name: "Seven Up", logo: "/images/drinks/seven-up.png" },
];
