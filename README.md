# La Firma Tacos — Web

Web de La Firma Tacos (Madrid), inspirada en la estructura, animaciones y UX de
[o-tacos.com/fr](https://o-tacos.com/fr), pero **100% con contenido propio**: solo
los productos, categorías, precios, marca y ubicación reales de La Firma Tacos.
Todo lo que no aplicaba a este negocio (franquicia, programa de fidelidad, "box
para compartir", pedido online propio, empleo...) se eliminó por completo — no
hay huecos ni placeholders de O'Tacos en ninguna pantalla.

## Vídeos del hero — bug real encontrado y corregido ✅

Diagnostiqué el "bug" de los vídeos del hero con ffprobe/ffmpeg (instalado vía
`imageio-ffmpeg` en este entorno):

1. **Los 3 MP4 no tenían "faststart"** (el átomo `moov` con los metadatos
   estaba al final del archivo, no al principio). Eso obliga al navegador a
   descargar el archivo casi entero antes de poder reproducirlo — se veía
   como una pantalla en negro/atascada, sobre todo en conexiones no
   instantáneas. Los re-codifiqué con `ffmpeg -movflags +faststart`, quité el
   audio (siempre van en `muted`) y bajé el bitrate (~3.2-3.5MB → ~1.4-1.9MB
   por vídeo, misma calidad visual) — reproducción instantánea ahora.
2. Añadido `poster={fallbackImage}` en `components/MediaBackground.tsx`: la
   imagen de marca se ve al instante mientras el vídeo carga sus primeros
   bytes, nunca un fotograma negro.
3. **Bug de layout real en el hero** (esto sí eran las "franjas
   negras"/solape que veías): la sección usaba `h-screen` (100vh), pero el
   header (`sticky top-0`, ~96px) ya ocupa espacio antes — el hero sobraba
   ~96px por debajo del viewport visible en móvil, y su botón "Descúbrelo"
   quedaba tapado por la barra fija inferior. Corregido en
   `components/HeroSlider.tsx`: `h-[calc(100vh-96px)]` en móvil (el hero ya
   no se sale del viewport, el botón se ve completo). En desktop no
   afectaba (usa `80vh`, con margen de sobra).

## Node.js — ya instalado ✅

Instalé Node.js v24 LTS mediante nvm (Node Version Manager), ya que este Mac no
lo tenía. Queda registrado en `~/.zshrc`. Si abres una terminal nueva y `node -v`
no funciona, ejecuta primero:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Arrancar el proyecto — verificado ✅

Ya ejecuté `npm install` y `npm run build` (compilación de producción) con
éxito: las 9 rutas compilan sin errores. También arranqué `npm run dev` y
comprobé varias páginas en el navegador (home con vídeo real reproduciéndose,
carta con subgrupos, monta-tu-taco, páginas legales) — todo renderiza
correctamente.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Seguridad de dependencias

Al instalar detecté y corregí dos vulnerabilidades reales:
- **Next.js 14.2.5 → 14.2.35**: la versión inicial tenía 2 CVEs críticos
- **Swiper 11 → 14**: la v11 tenía una vulnerabilidad crítica de contaminación
  de prototipos

Quedan 5 vulnerabilidades "high/moderate" en `npm audit`, todas ligadas a
saltar a Next.js 16 (breaking change). Revisé el código: no usamos
`next/image` ni `middleware.ts`, que es donde se concentran esas advisories,
así que el riesgo real es bajo. Si más adelante migráis a Next 16, ejecutad
`npm audit fix --force` y volved a probar todas las páginas.

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tailwind CSS** (paleta y animaciones custom en `tailwind.config.ts`)
- **Swiper.js** — efecto fade en el hero (no slide horizontal), autoplay, barra de progreso
- Fuentes vía Google Fonts: **Oswald** (equivalente a Puffin Display Black de la
  referencia, licencia propietaria) para títulos, **Mulish** (equivalente a
  Switzer) para cuerpo de texto, **Dancing Script** para el logotipo cursivo

## Estructura

```
app/
  layout.tsx          → metadata + SplashLoader + SiteChrome + Footer
  page.tsx             → home
  carta/page.tsx        → carta completa
  monta-tu-taco/page.tsx → constructor de taco animado
  legal/*               → páginas legales (placeholder, ver abajo)
components/            → Header, MobileMenu, HeroSlider, ProductCard, etc.
data/
  products.ts           → TODA la carta y precios — edítalo aquí
  siteConfig.ts          → marca, dirección, teléfono, redes, enlaces de pedido
  navigation.ts          → enlaces del menú y footer
  videos.ts              → slides del hero + prompts de vídeo + galería "Vibe"
public/
  videos/                → MP4 del hero (no existen todavía, ver más abajo)
  images/                 → fotos de producto/local (no existen todavía)
```

## Cómo editar la carta

Todo el menú vive en `data/products.ts`. Para cambiar un precio o añadir un
producto, edita el array `categories` — no hace falta tocar ningún componente:

```ts
{ id: "f1-tacos-la-firma", code: "F1", name: "Tacos La Firma", price: 8.5, tags: ["popular"] }
```

El sistema "Monta Tu Taco" (tallas, carnes, salsas, suplementos, gratinados) está
en el objeto `montaTuTaco` del mismo archivo.

## Pedido online

**No hay carrito ni pedido propio.** Todos los botones "Pedir" enlazan a
plataformas externas (Uber Eats / Glovo), configuradas en `data/siteConfig.ts`:

- ✅ Uber Eats: enlace real configurado
- ✅ Glovo: enlace real configurado

## Assets pendientes

### Vídeos del hero — ya colocados ✅

Generados con un agente de vídeo IA (imagen real de producto como primer
fotograma, sin reinterpretación) y verificados: H.264, 720×1280 (9:16),
8 segundos, audio AAC (solo efectos ambiente, sin música).

- `public/videos/hero-monta-tu-taco.mp4`
- `public/videos/hero-f1-tacos.mp4`
- `public/videos/hero-crousty-spicy.mp4`

**Fallback**: si algún día algún archivo falla al cargar, cada slide cae
automáticamente a la imagen equivalente en `public/images/hero/` con efecto
Ken Burns — no rompe nada.

### Logo real — ya colocado ✅

`public/images/brand/logo-badge.jpg` (recortado del logo oficial). Se usa en
Header, MobileMenu, Footer y SplashLoader vía el componente `components/Logo.tsx`.

### Suplementos, salsas e insignia Halal — fotos reales ✅

- **Suplementos con foto real**: los 9 suplementos (Cheddar, Bacon,
  Mozzarella, Cabra, Emmental, Miel, Boursin, Huevo, Pimientos) ya no usan
  ilustraciones — están recortados directamente del póster oficial de
  "Monta Tu Taco" (`public/images/ingredients/suplemento-*.jpg`). Se borró
  `components/SupplementIcons.tsx` en su parte de iconos planos
- **Insignia "Halal"** junto a "Bacon": es el símbolo real recortado de
  vuestro propio logotipo (`public/images/brand/halal-symbol.jpg`, el
  circulito con caligrafía árabe bajo "TACOS"), sin texto añadido — no es
  el logo de ninguna entidad certificadora externa
- **Salsas encuadradas con su recipiente**: las 10 salsas
  (`public/images/ingredients/salsa-*.jpg`) se recortaron de nuevo para que
  se vea el bol de cristal completo con la salsa dentro, no solo un zoom al
  remolino de salsa
- **Carnes y Gratinados re-recortados**: quité restos de los vecinos y texto
  de leyenda cortado que aparecían en la primera pasada — ahora cada imagen
  muestra solo el ingrediente correspondiente

### Fototeca profesional "La Firma HERO" — integrada ✅

Nos pasaste una carpeta completa con ~22 fotos de producto profesionales,
todas con el mismo fondo de marca (papel estampado "FIRMA" repetido). Sustituí
las fotos antiguas (que tenían papel "GOOD FOOD" de un proveedor genérico, no
vuestra marca) por estas en:

- F1 Tacos La Firma, Monta Tu Taco (gratinado), Tasty Chicken, Giant Firma,
  Big Firma, Cheese Firma, Crousty Sweet, Crousty Spicy, Patatas La Firma,
  Patatas Classique
- Añadí `public/images/brand/firma-pattern.jpg`: el patrón de marca sin
  comida, como recurso reutilizable — ya lo apliqué como textura de fondo en
  el banner de ubicación (home) y en el CTA "Ver la Carta Completa"
- Las 3 cards grandes de categorías en home (Tacos / Crousty / Monta Tu Taco)
  ahora tienen foto real en vez de placeholder

**Fotos combo de sobra sin usar** (burger+patatas+bebida con Oasis/Fanta/Fuze
Tea) siguen en `Escritorio/La Firma HERO/` por si quieres que las use en el
hero, una sección de "combos" o redes sociales — dímelo cuando quieras.

### Contenido eliminado por riesgo legal

Quité los zumos "Hello Kitty" y "Spiderman" de Bebidas — son personajes con
licencia registrada y usarlos sin acuerdo comercial con el titular es un
riesgo real de infracción de marca para el negocio. Quedan los Capri-Sun
(marca genérica, sin problema).

### Bebidas — apartado básico con logos reales ✅

Rediseñado como el de o-tacos.com/fr: en vez de una ficha con foto por cada
sabor (~30 productos), `/carta#bebidas` ahora muestra una rejilla simple con
el logo/foto real de cada marca (`data/drinks.ts`,
`components/DrinksGrid.tsx`): Coca-Cola, Fanta, Oasis, Chill, Lipton,
Schweppes, Agua Cortes, Hawai, Aquarius, Nestea, Selecto, Hamoud Boualem,
Orangina, Pom's, Capri Sun y Seven Up.

Los logos se descargaron de fuentes públicas (Wikimedia Commons y las webs
oficiales de cada marca/distribuidor: hamoud-boualem.com, aguadecortes.com,
stokhall.com, jaimaalkauzar.es, nainawa.fr) y se guardan en
`public/images/drinks/`. El listado detallado por sabor con precios se
mantiene intacto en `data/products.ts` (se sigue usando en la página de
alérgenos), solo cambió cómo se muestra en la carta.

### Tartas Daims y Milka — fotos reales ✅

Añadidas las fotos reales que nos pasaste para `Tarta Daims` y `Tarta Milka`
(`public/images/products/tarta-daims.jpg`, `tarta-milka.jpg`, enlazadas en
`data/products.ts`). La foto de Milka venía en vertical (con la punta hacia
arriba) — la rotamos para que quede con la misma orientación que la de Daims
(punta arriba-izquierda, base ancha abajo-derecha).

### Encuadre de fotos de producto — profesional, sin huecos ✅

Primer intento: `object-contain` con fondo crema de relleno — evitaba el
recorte pero se veía poco profesional (foto pequeña flotando con márgenes
vacíos). Descartado.

Solución final: en `components/ProductCard.tsx` cambié la caja de altura
fija (`h-48`, muy ancha y baja) por `aspect-[4/5]` — la misma proporción
vertical que ya tienen casi todas las fotos de producto (~0.8) — y mantuve
`object-cover`. Al coincidir la proporción de la caja con la de la foto, la
imagen llena el marco de borde a borde (igual que las 3 cards grandes de
categoría en home, que ya usaban este mismo truco) sin recortar el
alimento ni dejar huecos. `IngredientChip.tsx` y los círculos de tamaño en
`app/monta-tu-taco/page.tsx` volvieron a `object-cover` tal cual estaban.

### Auditoría de encuadre en toda la carta ✅

Con el nuevo `aspect-[4/5]` ya arreglado, revisé cada foto de producto una
por una (recorte simulado) para ver cuáles quedaban mal encuadradas de
verdad, no solo por la caja:

- **`f30-bocatandoo.jpg` — corregida**: no era una foto de producto, era
  una captura de pantalla completa del móvil (con barra de estado, botón
  "atrás" y título "Boca Tandoo") con la comida ocupando solo un tercio
  inferior. La recorté para dejar solo el bocata.
- **`kids-firma.jpg` — corregida**: era un banner promocional panorámico
  (texto a la izquierda + caja a la derecha) que al forzarlo a vertical
  cortaba el texto de forma fea. La recuadré sobre la caja + mascota
  sandía, que es el elemento visual reconocible; el texto no hacía falta
  porque el título "Kids Firma" ya va debajo en la ficha.
- **`f23-big-firma.jpg` — reemplazada**: con la foto real que nos
  pasaste (hamburguesa con pepinillos, fondo FIRMA) — coincide con su
  descripción ("...pepinillos, cebolla...").
- **`f22-giant-firma.jpg` — pendiente**: nos falta esa foto. Solo llegó
  una de las dos que mandaste (la de Big Firma); la de doble carne con
  pan de sésamo no se guardó — vuelve a intentar pasarla al Escritorio.

Nada más necesitaba cambio: el resto de fichas (tacos, acompañantes,
crousty, postres, bebidas) ya encuadraban bien de forma automática al
coincidir su proporción original con la de la caja.

No toqué el hero a pantalla completa (`components/MediaBackground.tsx`) ni
las 3 cards grandes de categoría en home (`components/FeatureCard.tsx`):
son fondos de escena a sangre completa (diseño intencional tipo
o-tacos.com/fr), no fichas de producto, y su recorte ya es mínimo porque la
proporción de esas fotos casi coincide con la de su caja.

### Organización de grids — sin filas descuadradas ✅

Varias secciones tenían un número de elementos que no encajaba limpio en la
rejilla (ej. 7 acompañantes en 2 columnas, 10 salsas en 4, 9 suplementos en
4, 7 fotos de ambiente en 3) — la última fila quedaba con un hueco vacío y
el último ítem pegado a la izquierda, descuadrado del resto.

Cambié esas rejillas de `grid` a `flex flex-wrap justify-center` (cada
ítem con un ancho fijo equivalente a su columna) en:
`app/carta/page.tsx` (fichas de producto), `app/monta-tu-taco/page.tsx` +
`components/IngredientChip.tsx` (carnes/salsas/suplementos/gratinados) y
`components/VibeSection.tsx` (galería "La Firma Vibe"). Ahora, cuando la
última fila no se llena, el o los ítems sobrantes quedan centrados en vez
de dejar un hueco — se ve intencional y en sintonía con el resto de la
web en cualquier cantidad de productos.

### Fotos — ya colocadas ✅

- **Local** (`public/images/vibe/`): fachada, sala de paneles, mostrador,
  comedor con mural del Real Madrid, neón "La Firma Tacos", sala de butacas,
  y una foto de grupo en mesa (`mesa-grupo.jpg`, pesa ~3MB — conviene
  comprimirla/redimensionarla antes de producción)
- **Producto** (`public/images/products/`): F1 Tacos, Monta Tu Taco, Tasty
  Chicken, Giant Firma, Big Firma, Cheese Firma, Crousty Sweet, Crousty Spicy,
  Mozza Sticks, Tenders de Pollo, Tequeños, Patatas La Firma, Camembert Bites,
  Nuggets, BocaTandoo, Bocacurry, y los 5 Tiramisús Mycan (Pistachiose, Choco
  Bomb, Tropical Island, Magic Red, Paris-Brest) con foto real de cada lata
- **Fallback del hero** (`public/images/hero/`): las mismas fotos de F1 Tacos,
  Monta Tu Taco y Crousty Spicy, reutilizadas como imagen de respaldo
- **Ingredientes de Monta Tu Taco** (`public/images/ingredients/`): las 6
  carnes, las 10 salsas y los 6 gratinados, todos recortados a mano del
  póster oficial de marca (`public/images/source/monta-tu-taco-poster.jpg`),
  cada salsa con su nivel de picante real (Algerina 🌶️, Samurai 🌶️, Harissa
  🌶️🌶️🌶️, resto sin picante) — Suplementos se quedan con emoji (no se
  pidieron explícitamente)

### Fotos que aún faltan

- Fotos de la carta de Uber Eats: **no pude extraerlas** — la web de Uber Eats
  sigue bloqueando el acceso automatizado con una comprobación de seguridad
  (bot detection), y no debo intentar saltármela. Alternativa: capturas de
  pantalla tuyas, o exportar desde el propio panel de Uber Eats Manager.

### Contenido pendiente (no técnico)

- **Carta de Bebidas y Postres actualizada** con el póster oficial de marca
  que enviaste (reemplaza la lista anterior basada en Loyverse) — ahora
  organizada por subgrupos reales: Refrescos, Energéticas, Premium, Chill,
  Agua, Zumos Niños / Tiramisús Kreamy's, Tartas
- **Tiramisús Mycan**: por petición tuya, ahora solo muestran el nombre del
  producto (Mycan Pistachiose, Choco Bomb, Tropical Island, Magic Red,
  Paris-Brest), sin descripción de sabor inventada
- Descripciones/ingredientes de Acompañantes sueltos — Tacos, Burgers, Crousty
  y Bocatas ya están completos con ingredientes reales

### Textos legales — redactados ✅ (con huecos puntuales)

Escribí contenido real (no placeholder genérico) en las 3 páginas:

- **`app/legal/privacidad`**: modelo RGPD/LOPDGDD completo con vuestra
  dirección, email y teléfono reales. Solo faltan **razón social y NIF/CIF**
  del titular (marcados `[PENDIENTE]`) — recomiendo que lo revise un
  gestor/abogado antes de publicar, sobre todo si en el futuro recogéis más
  datos de los actuales
- **`app/legal/cookies`**: completa — la web solo usa cookies técnicas, así
  que no hace falta banner de consentimiento (si algún día añadís Google
  Analytics u otro tracker, hay que actualizar esta página)
- **`app/legal/alergenos`**: aquí **no rellené los alérgenos por plato a
  propósito** — es información de seguridad alimentaria (Reglamento UE
  1169/2011) y adivinar un ingrediente mal podría hacer daño real a alguien
  con alergia. La página lista los 14 alérgenos oficiales y vuestra carta
  real, pero el marcado por plato debe hacerlo el local con las fichas
  técnicas de sus proveedores

## Qué se eliminó respecto a la referencia (o-tacos.com/fr)

Franquicia, Boss Club (fidelidad), "Box para compartir", O'Boss, FrerO', O'Fresh,
O'Brunch, O'Mini, sección de empleo, selector de país, promociones (no hay
ninguna activa), Click & Collect propio (no tenéis pedido online propio, solo
Uber Eats/Glovo). El layout se reajustó en cada caso para no dejar huecos
(ver comentarios en `components/CategoryShowcase.tsx`, `components/PromoSection.tsx`
y `data/navigation.ts`).

## Checklist

- [x] Estructura fiel a o-tacos.com/fr (analizada en 1920 / 768 / 375px)
- [x] Solo contenido de La Firma Tacos, cero residuos de O'Tacos
- [x] Secciones sin equivalente → eliminadas y layout reajustado
- [x] Hero fade slider (Swiper) + barra de progreso + autoplay + play/pause
- [x] Fallback Ken Burns cuando no hay vídeo
- [x] Animaciones: reveal on scroll, hover cards, marquee, splash loader, menú móvil
- [x] Responsive 375 / 768 / 1280 / 1920
- [ ] `npm install && npm run dev` — **no lo he podido ejecutar yo mismo** (este Mac
      no tenía Node.js instalado); recomiendo probarlo en Cursor tras instalar Node
- [x] README completo
- [x] Enlaces de pedido (Uber Eats + Glovo) y email de contacto reales
- [x] Fotos del local (7) colocadas en `public/images/vibe/`
- [x] Fotos de 7 productos colocadas en `public/images/products/` + fallback del hero
- [x] Ingredientes reales en Tacos, Burgers, Crousty y Bocatas
- [x] Los 3 vídeos del hero generados y colocados en `public/videos/`
- [x] Node.js instalado, `npm install` + `npm run build` verificados sin errores
- [x] Vulnerabilidades críticas de dependencias corregidas (Next.js, Swiper)
- [x] Verificado visualmente en navegador (home, carta, monta-tu-taco, legales)
- [x] Textos legales reales redactados (privacidad, cookies); alérgenos con
      estructura correcta pero sin datos por plato (a propósito, ver arriba)
- [ ] Fotos de Bocatas, Acompañantes, Kids, Postres, Bebidas — pendientes
- [ ] Razón social/NIF/CIF para completar la política de privacidad — pendiente
- [ ] Alérgenos por plato — pendiente, debe rellenarlo el local
