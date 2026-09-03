// Carta real de bebidas, tomada del lineup de producto de la marca.
// Cada referencia lleva su foto recortada a la misma proporción (300x400) y
// sobre el mismo fondo, para que la parrilla quede homogénea sin descuadres.
//
// Precios: se aplican los tramos ya vigentes en el TPV (Chill 1,80 €,
// refrescos y energéticas 2,00 €, Red Bull 2,50 €, agua y zumo infantil
// 1,50 €). El café Lavazza no tiene precio confirmado todavía: se marca con
// price 0 y la ficha muestra "Consultar" en vez de inventar una cifra.

export type Drink = {
  id: string;
  name: string;
  image: string;
  ribbon?: string;
  /** Precio propio, cuando esta referencia no va al precio de su familia. */
  price?: number;
};

export type DrinkGroup = {
  /** Familia visible como subtítulo dentro del apartado de bebidas. */
  group: string;
  /** Precio por defecto de la familia, en euros. 0 = pendiente de confirmar. */
  price: number;
  items: Drink[];
};

/** Precio final de una referencia: el suyo propio si lo tiene, si no el de su familia. */
export function drinkPrice(group: DrinkGroup, drink: Drink): number {
  return drink.price ?? group.price;
}

const IMG = "/images/drinks/producto";

export const drinkGroups: DrinkGroup[] = [
  {
    group: "Refrescos",
    price: 2.0,
    items: [
      { id: "fanta-naranja", name: "Fanta Naranja", image: `${IMG}/fanta-naranja.jpg` },
      { id: "fanta-limon", name: "Fanta Limón", image: `${IMG}/fanta-limon.jpg` },
      { id: "fanta-naranja-sanguina", name: "Fanta Naranja Sanguina", image: `${IMG}/fanta-naranja-sanguina.jpg` },
      { id: "fanta-fruta-dragon", name: "Fanta Fruta del Dragón", image: `${IMG}/fanta-fruta-dragon.jpg` },
      { id: "oasis-tropical", name: "Oasis Tropical", image: `${IMG}/oasis-tropical.jpg`, ribbon: "Más Vendido" },
      { id: "oasis-cassis-frambuesa", name: "Oasis Cassis Frambuesa", image: `${IMG}/oasis-cassis-framboise.jpg` },
      { id: "oasis-manzana-pera", name: "Oasis Manzana Pera", image: `${IMG}/oasis-pomme-poire.jpg` },
      { id: "orangina", name: "Orangina", image: `${IMG}/orangina.jpg` },
      { id: "poms", name: "Pom's Manzana", image: `${IMG}/poms.jpg` },
      { id: "7up-mojito", name: "7Up Mojito", image: `${IMG}/7up-mojito.jpg` },
      { id: "nestea-maracuya", name: "Nestea Té Verde Maracuyá", image: `${IMG}/nestea-maracuya.jpg` },
      { id: "selecto", name: "Selecto", image: `${IMG}/selecto.jpg` },
      { id: "hamoud-blanche", name: "Hamoud La Blanche", image: `${IMG}/hamoud-blanche.jpg` },
    ],
  },
  {
    // Red Bull va aquí, con su precio propio, en vez de en una familia
    // "Premium" de una sola lata que dejaba la fila coja.
    group: "Energéticas",
    price: 2.0,
    items: [
      { id: "street-tropical", name: "Street Tropical", image: `${IMG}/street-tropical.jpg` },
      { id: "street-cherry", name: "Street Cherry", image: `${IMG}/street-cherry.jpg` },
      { id: "street-orange", name: "Street Orange", image: `${IMG}/street-orange.jpg` },
      { id: "street-cola", name: "Street Cola", image: `${IMG}/street-cola.jpg` },
      { id: "red-bull", name: "Red Bull", image: `${IMG}/red-bull.jpg`, price: 2.5 },
    ],
  },
  {
    group: "Chill",
    price: 1.8,
    items: [
      { id: "chill-cosmopolitan", name: "Chill Cosmopolitan", image: `${IMG}/chill-cosmopolitan.jpg` },
      { id: "chill-mojito", name: "Chill Mojito", image: `${IMG}/chill-mojito.jpg` },
      { id: "chill-fresa-sandia", name: "Chill Fresa Sandía", image: `${IMG}/chill-fraise-pasteque.jpg` },
      { id: "chill-kiwi-limon", name: "Chill Kiwi Limón", image: `${IMG}/chill-kiwi-citron.jpg` },
      { id: "chill-limon-maracuya", name: "Chill Limón Maracuyá", image: `${IMG}/chill-citron-passion.jpg` },
      { id: "chill-mango-pera", name: "Chill Mango Pera", image: `${IMG}/chill-mangue-poire.jpg` },
      { id: "chill-melon-melocoton", name: "Chill Melón Melocotón", image: `${IMG}/chill-melon-peche.jpg` },
      { id: "chill-bleu-hawai", name: "Chill Blue Hawái", image: `${IMG}/chill-bleu-hawai.jpg` },
    ],
  },
  {
    group: "Agua, Zumos y Café",
    price: 1.5,
    items: [
      { id: "agua-cortes", name: "Agua Cortes 50 cl", image: `${IMG}/agua-cortes.jpg` },
      { id: "capri-sun-multivitamin", name: "Capri-Sun Multivitaminas", image: `${IMG}/capri-sun-multivitamin.jpg` },
      { id: "lavazza", name: "Café Lavazza", image: `${IMG}/lavazza.jpg`, price: 0 },
    ],
  },
];

/** Todas las referencias en una sola lista (útil para contadores y pantallas). */
export const allDrinks: Drink[] = drinkGroups.flatMap((g) => g.items);
