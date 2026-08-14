// Datos reales de la carta de La Firma Tacos, verificados contra Loyverse (TPV del local).
// Los precios de Uber Eats/Glovo llevan un pequeño incremento por delivery — estos son los de local.
// Para editar productos o precios, modifica los objetos de abajo. No hace falta tocar ningún componente.

export type ProductTag = "popular" | "menu" | "no-disponible" | "proximamente";

export type Product = {
  id: string;
  code?: string;
  name: string;
  price: number; // euros
  description?: string;
  tags?: ProductTag[];
  image?: string; // ruta en /public/images/products/
  group?: string; // subgrupo dentro de la categoría (ej. "Chill", "Premium" en Bebidas)
};

export type Category = {
  slug: string;
  title: string;
  eyebrow: string;
  products: Product[];
};

type IngredientItem = { name: string; icon: string; image?: string; tag?: ProductTag };
// spice: 0 = no picante, 1-3 = número de guindillas (según el cartel oficial de marca)
type SauceItem = { name: string; icon: string; image?: string; spice: 0 | 1 | 2 | 3 };

export const montaTuTaco = {
  sizes: [
    { size: "M", price: 7.5 },
    { size: "L", price: 9.5 },
    { size: "XL", price: 11.5 },
  ],
  menuSupplement: { label: "Hazlo Menú — patatas + bebida", price: 2.5 },
  meats: [
    { name: "Carne Picada", icon: "🥩", image: "/images/ingredients/carne-carne-picada.jpg" },
    { name: "Pollo Escalope", icon: "🍗", image: "/images/ingredients/carne-pollo-escalope.jpg" },
    { name: "Cordon Bleu", icon: "🧀", image: "/images/ingredients/carne-cordon-bleu.jpg" },
    { name: "Tenders", icon: "🍢", image: "/images/ingredients/carne-tenders.jpg" },
    { name: "Nuggets", icon: "🍤", image: "/images/ingredients/carne-nuggets.jpg" },
    { name: "Falafel", icon: "🧆", image: "/images/ingredients/carne-falafel.jpg", tag: "proximamente" },
  ] as IngredientItem[],
  sauces: [
    { name: "Algerina", icon: "🌶️", image: "/images/ingredients/salsa-algerina.jpg", spice: 1 },
    { name: "Samurai", icon: "🔥", image: "/images/ingredients/salsa-samurai.jpg", spice: 1 },
    { name: "Mayonesa", icon: "🥚", image: "/images/ingredients/salsa-mayonesa.jpg", spice: 0 },
    { name: "Blanca", icon: "🥛", image: "/images/ingredients/salsa-blanca.jpg", spice: 0 },
    { name: "Harissa", icon: "🌶️", image: "/images/ingredients/salsa-harissa.jpg", spice: 3 },
    { name: "Biggy", icon: "🍯", image: "/images/ingredients/salsa-biggy.jpg", spice: 0 },
    { name: "Barbacoa", icon: "🍖", image: "/images/ingredients/salsa-barbacoa.jpg", spice: 0 },
    { name: "Ketchup", icon: "🍅", image: "/images/ingredients/salsa-ketchup.jpg", spice: 0 },
    { name: "Brasil", icon: "🇧🇷", image: "/images/ingredients/salsa-brasil.jpg", spice: 0 },
    { name: "Andaluza", icon: "🧡", image: "/images/ingredients/salsa-andaluza.jpg", spice: 0 },
    { name: "Miel", icon: "🍯", image: "/images/ingredients/salsa-miel.jpg", spice: 0 },
  ] as SauceItem[],
  supplements: {
    price: 1.0,
    items: [
      { name: "Cheddar", icon: "🧀", image: "/images/ingredients/suplemento-cheddar.jpg" },
      { name: "Bacon", icon: "🥓", image: "/images/ingredients/suplemento-bacon.jpg", halal: true },
      { name: "Mozzarella", icon: "🧀", image: "/images/ingredients/suplemento-mozzarella.jpg" },
      { name: "Cabra", icon: "🐐", image: "/images/ingredients/suplemento-cabra.jpg" },
      { name: "Emmental", icon: "🧀", image: "/images/ingredients/suplemento-emmental.jpg" },
      { name: "Miel", icon: "🍯", image: "/images/ingredients/suplemento-miel.jpg" },
      { name: "Boursin", icon: "🧈", image: "/images/ingredients/suplemento-boursin.jpg" },
      { name: "Huevo", icon: "🍳", image: "/images/ingredients/suplemento-huevo.jpg" },
      { name: "Pimientos", icon: "🫑", image: "/images/ingredients/suplemento-pimientos.jpg" },
    ] as (IngredientItem & { halal?: boolean })[],
  },
  gratins: [
    { name: "Mozza", icon: "🧀", image: "/images/ingredients/gratinado-mozza.jpg", price: 1.0 },
    { name: "Cheddar", icon: "🧀", image: "/images/ingredients/gratinado-cheddar.jpg", price: 1.0 },
    { name: "Raclette", icon: "🫕", image: "/images/ingredients/gratinado-raclette.jpg", price: 1.0 },
    { name: "Cabra y Miel", icon: "🍯", image: "/images/ingredients/gratinado-cabra-miel.jpg", price: 1.9 },
    { name: "Bacon Crispy", icon: "🥓", image: "/images/ingredients/gratinado-bacon-crispy.jpg", price: 1.9 },
    { name: "Tomate Pimientos", icon: "🍅", image: "/images/ingredients/gratinado-tomate-pimientos.jpg", price: 1.9 },
  ] as (IngredientItem & { price: number })[],
};

export const categories: Category[] = [
  {
    slug: "tacos",
    title: "Tacos La Firma",
    eyebrow: "El Taco Francés Original",
    products: [
      {
        id: "f1-tacos-la-firma",
        code: "F1",
        name: "Tacos La Firma",
        price: 8.5,
        description: "Nuestro taco insignia con la receta original de la casa.",
        tags: ["popular"],
        image: "/images/products/f1-tacos-la-firma.jpg",
      },
      {
        id: "monta-tu-taco-m",
        name: "Monta tu Taco — Talla M",
        price: 7.5,
        description: "Elige tu carne y tu salsa, sin coste extra.",
        image: "/images/products/monta-tu-taco-plano.jpg",
      },
      {
        id: "monta-tu-taco-l",
        name: "Monta tu Taco — Talla L",
        price: 9.5,
        description: "Elige tu carne y tu salsa, sin coste extra.",
        tags: ["popular"],
        image: "/images/products/monta-tu-taco-plano.jpg",
      },
      {
        id: "monta-tu-taco-xl",
        name: "Monta tu Taco — Talla XL",
        price: 11.5,
        description: "Elige tu carne y tu salsa, sin coste extra.",
        image: "/images/products/monta-tu-taco-plano.jpg",
      },
    ],
  },
  {
    slug: "acompanantes",
    title: "Acompañantes La Firma",
    eyebrow: "Para Empezar con Fuerza",
    products: [
      {
        id: "f01-mozza-sticks",
        code: "F01",
        name: "Mozza Sticks x6",
        price: 4.5,
        image: "/images/products/f01-mozza-sticks.jpg",
      },
      {
        id: "f02-tenders-pollo",
        code: "F02",
        name: "Tenders de Pollo x4",
        price: 4.5,
        image: "/images/products/f02-tenders-pollo.jpg",
      },
      {
        id: "f03-tequenos",
        code: "F03",
        name: "Tequeños x4",
        price: 4.5,
        tags: ["popular"],
        image: "/images/products/f03-tequenos.jpg",
      },
      {
        id: "f04-patatas-la-firma",
        code: "F04",
        name: "Patatas La Firma",
        price: 4.5,
        description: "Con bacon y queso cheddar.",
        image: "/images/products/f04-patatas-la-firma.jpg",
      },
      {
        id: "patatas-classique",
        name: "Patatas Classique",
        price: 1.5,
        description: "Patatas fritas clásicas.",
        image: "/images/products/patatas-classique.jpg",
      },
      {
        id: "f05-nuggets",
        code: "F05",
        name: "Nuggets x6",
        price: 4.5,
        image: "/images/products/f05-nuggets.jpg",
      },
      {
        id: "f06-camembert-bites",
        code: "F06",
        name: "Camembert Bites x6",
        price: 4.5,
        image: "/images/products/f06-camembert-bites.jpg",
      },
    ],
  },
  {
    slug: "burgers",
    title: "Burgers La Firma",
    eyebrow: "Crousty Burgers",
    products: [
      {
        id: "f21-tasty-chicken",
        code: "F21",
        name: "Tasty Chicken",
        price: 7.9,
        description: "Pollo crujiente, queso cheddar, lechuga fresca, tomate natural y salsa La Firma.",
        tags: ["menu"],
        image: "/images/products/f21-tasty-chicken.jpg",
      },
      {
        id: "f23-big-firma",
        code: "F23",
        name: "Big Firma",
        price: 7.5,
        description: "Doble carne smash, queso cheddar, lechuga fresca, pepinillos, cebolla y salsa La Firma.",
        tags: ["popular", "menu"],
        image: "/images/products/f23-big-firma.jpg",
      },
      {
        id: "f24-cheese-firma",
        code: "F24",
        name: "Cheese Firma",
        price: 2.9,
        description: "Carne smash, queso cheddar, pepinillos y salsa La Firma.",
        image: "/images/products/f24-cheese-firma.jpg",
      },
      {
        id: "f24-menu-cheese-firma",
        code: "F24",
        name: "Menú Cheese Firma",
        price: 4.9,
        description: "Carne smash, queso cheddar, pepinillos y salsa La Firma. Incluye patatas + bebida.",
        image: "/images/products/f24-cheese-firma.jpg",
        tags: ["menu"],
      },
      {
        id: "kids-firma",
        name: "Kids Firma",
        price: 4.9,
        description:
          "Elige: Cheese Firma o 3 Nuggets + zumo infantil (naranja, frutas rojas o Milderman multifrutas).",
        tags: ["menu"],
        image: "/images/products/kids-firma.jpg",
      },
    ],
  },
  {
    slug: "bocatas",
    title: "Bocatas La Firma",
    eyebrow: "Nuestros Bocadillos",
    products: [
      {
        id: "f30-bocatandoo",
        code: "F30",
        name: "BocaTandoo",
        price: 6.5,
        description: "Pollo tandoori. + Menú patatas y bebida 2,50 €",
        tags: ["popular"],
        image: "/images/products/f30-bocatandoo.jpg",
      },
      {
        id: "f31-bocacurry",
        code: "F31",
        name: "Bocacurry",
        price: 6.5,
        description: "Curry. + Menú patatas y bebida 2,50 €",
        image: "/images/products/f31-bocacurry.jpg",
      },
      {
        id: "f32-bocamixto",
        code: "F32",
        name: "Bocamixto",
        price: 6.5,
        description: "Mezcla de carne picada y pollo. + Menú patatas y bebida 2,50 €",
        image: "/images/products/f32-bocamixto.jpg",
      },
    ],
  },
  {
    slug: "crousty",
    title: "Crousty La Firma",
    eyebrow: "Crousty",
    products: [
      {
        id: "f40-crousty-sweet",
        code: "F40",
        name: "Crousty Sweet",
        price: 9.0,
        description: "Tenders de pollo crujientes, salsa dulce, salsa casera de arroz, arroz y cebolla frita.",
        tags: ["popular"],
        image: "/images/products/f40-crousty-sweet.jpg",
      },
      {
        id: "f41-crousty-spicy",
        code: "F41",
        name: "Crousty Spicy",
        price: 9.0,
        description: "Tenders de pollo crujientes, salsa picante, salsa casera de arroz, arroz y cebolla frita.",
        tags: ["popular"],
        image: "/images/products/f41-crousty-spicy.jpg",
      },
    ],
  },
  {
    // Actualizado con el póster oficial de la marca (Mycan Tiramisú + Tartas).
    slug: "postres",
    title: "Postres La Firma",
    eyebrow: "Para Terminar por Todo lo Alto",
    products: [
      {
        id: "mycan-pistachiose",
        name: "Mycan Pistachiose",
        price: 3.5,
        group: "Tiramisús Kreamy's",
        image: "/images/products/mycan-pistachiose.jpg",
      },
      {
        id: "mycan-choco-bomb",
        name: "Mycan Choco Bomb",
        price: 3.5,
        group: "Tiramisús Kreamy's",
        image: "/images/products/mycan-choco-bomb.jpg",
      },
      {
        id: "mycan-tropical-island",
        name: "Mycan Tropical Island",
        price: 3.5,
        group: "Tiramisús Kreamy's",
        image: "/images/products/mycan-tropical-island.jpg",
      },
      {
        id: "mycan-magic-red",
        name: "Mycan Magic Red",
        price: 3.5,
        group: "Tiramisús Kreamy's",
        image: "/images/products/mycan-magic-red.jpg",
      },
      {
        id: "mycan-paris-brest",
        name: "Mycan Paris-Brest",
        price: 3.5,
        group: "Tiramisús Kreamy's",
        image: "/images/products/mycan-paris-brest.jpg",
      },
      {
        id: "tarta-daims",
        name: "Tarta Daims",
        price: 3.0,
        group: "Tartas",
        image: "/images/products/tarta-daims.jpg",
      },
      {
        id: "tarta-milka",
        name: "Tarta Milka",
        price: 3.0,
        group: "Tartas",
        image: "/images/products/tarta-milka.jpg",
      },
    ],
  },
  {
    // Actualizado con el póster oficial de la marca — reemplaza la lista anterior basada en Loyverse.
    slug: "bebidas",
    title: "Bebidas",
    eyebrow: "Para Acompañar",
    products: [
      // Refrescos — 2,00 €
      { id: "coca-cola", name: "Coca-Cola", price: 2.0, group: "Refrescos" },
      { id: "coca-cola-zero", name: "Coca-Cola Zero", price: 2.0, group: "Refrescos" },
      { id: "coca-cherry", name: "Coca Cherry", price: 2.0, group: "Refrescos" },
      { id: "fanta-naranja", name: "Fanta Naranja", price: 2.0, group: "Refrescos" },
      { id: "fanta-limon", name: "Fanta Limón", price: 2.0, group: "Refrescos" },
      { id: "fanta-exotica", name: "Fanta Exótica", price: 2.0, group: "Refrescos" },
      { id: "fanta-fruta-dragon", name: "Fanta Fruta del Dragón", price: 2.0, group: "Refrescos" },
      { id: "oasis-tropical", name: "Oasis Tropical", price: 2.0, group: "Refrescos" },
      { id: "oasis-manzana-cassis", name: "Oasis Manzana Cassis", price: 2.0, group: "Refrescos" },
      { id: "nestea-maracuya", name: "Nestea Maracuyá", price: 2.0, group: "Refrescos" },
      { id: "aquarius-limon", name: "Aquarius Limón", price: 2.0, group: "Refrescos" },
      { id: "aquarius-naranja", name: "Aquarius Naranja", price: 2.0, group: "Refrescos" },
      { id: "7up", name: "7Up", price: 2.0, group: "Refrescos" },
      { id: "selecto", name: "Selecto", price: 2.0, group: "Refrescos" },
      { id: "hamoud", name: "Hamoud", price: 2.0, group: "Refrescos" },
      { id: "hamoud-limon", name: "Hamoud Limón", price: 2.0, group: "Refrescos" },
      { id: "schweppes-citron", name: "Schweppes Citrón", price: 2.0, group: "Refrescos" },
      { id: "schweppes-agrum", name: "Schweppes Agrum", price: 2.0, group: "Refrescos" },
      // Energéticas — 2,00 €
      { id: "street-tropical", name: "Street Tropical", price: 2.0, group: "Energéticas" },
      { id: "street-cherry", name: "Street Cherry", price: 2.0, group: "Energéticas" },
      { id: "street-orange", name: "Street Orange", price: 2.0, group: "Energéticas" },
      { id: "street-mojito", name: "Street Mojito", price: 2.0, group: "Energéticas" },
      { id: "izem-classic", name: "Izem Classic", price: 2.0, group: "Energéticas" },
      { id: "izem-tropical", name: "Izem Tropical", price: 2.0, group: "Energéticas" },
      { id: "izem-mojito", name: "Izem Mojito", price: 2.0, group: "Energéticas" },
      { id: "izem-frutos-rojos", name: "Izem Frutos Rojos", price: 2.0, group: "Energéticas" },
      // Premium
      { id: "redbull", name: "Red Bull", price: 2.5, group: "Premium" },
      { id: "redbull-red-edition", name: "Red Bull Red Edition", price: 3.0, group: "Premium" },
      // Chill — 1,80 €
      { id: "chill-cosmopolitan", name: "Chill Cosmopolitan", price: 1.8, group: "Chill" },
      { id: "chill-fresa-sandia", name: "Chill Fresa Sandía", price: 1.8, group: "Chill" },
      { id: "chill-tropical", name: "Chill Tropical", price: 1.8, group: "Chill" },
      { id: "chill-mango-pera", name: "Chill Mango Pera", price: 1.8, group: "Chill" },
      { id: "chill-mojito", name: "Chill Mojito", price: 1.8, group: "Chill" },
      // Agua — 1,50 €
      { id: "agua-cortes", name: "Agua Cortes", price: 1.5, group: "Agua" },
      // Zumos Niños — 1,50 €
      // Nota: se han retirado los zumos "Hello Kitty" y "Spiderman" — son
      // personajes con licencia registrada y usarlos sin acuerdo comercial
      // con el titular de la marca es un riesgo legal real para el negocio.
      { id: "capri-sun-naranja", name: "Capri Sun Naranja", price: 1.5, group: "Zumos Niños" },
      { id: "capri-sun-multifrutas", name: "Capri Sun Multifrutas", price: 1.5, group: "Zumos Niños" },
    ],
  },
];

export function formatPrice(price: number): string {
  return price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

// Selección de bestsellers para la home (home cards + hero).
// Se busca por id en vez de por índice para que reordenar categorías no rompa nada.
function findProduct(id: string): Product {
  for (const category of categories) {
    const found = category.products.find((p) => p.id === id);
    if (found) return found;
  }
  throw new Error(`Producto no encontrado: ${id}`);
}

export const bestsellers = [
  findProduct("f1-tacos-la-firma"),
  findProduct("monta-tu-taco-l"),
  findProduct("f41-crousty-spicy"),
];
