# IMPLEMENTATION_PLAN.md

**Proyecto:** La Firma Tacos — Website V2
**Fase:** B — Plan de implementación
**Fecha:** 02/09/2026
**Estado:** pendiente de aprobación. No se ha modificado código.

Este plan desarrolla los hallazgos de la Fase A. La secuencia es
SEO → indexabilidad → performance → arquitectura → conversión → diseño.
Nada de P2 ni P3 se implementa todavía.

---

## Decisiones de negocio confirmadas

| Dato | Valor confirmado | Consecuencia |
|---|---|---|
| Dominio oficial | `https://www.lafirma-tacos.es` | Fuente única de todas las URL absolutas. El `.com` deja de aparecer en cualquier sitio. |
| Horario Castellana | L–V 13:30–16:30 y 19:30–00:30 · S, D y festivos 13:30–01:30 | Sustituye al horario actual del código. Es una tercera versión: no coincide ni con la web ni con Google. |
| Orden de carta | Tacos → Monta Tu Taco → Croustys → Burgers → Bocatas → Entrantes → Postres → Bebidas | El orden web se desacopla del TPV. |
| Google Business | No tocar todavía | Se sincroniza después de que web y schema tengan fuente única. |

### Acciones externas pendientes (fuera del repositorio)

Estas no las puedo hacer yo y bloquean parte del beneficio de P0.1:

1. **Ficha de Google Business:** el sitio web apunta a `la-firma-tacos-web.vercel.app`, que devuelve 404. Debe pasar a `https://www.lafirma-tacos.es`.
2. **Teléfono en Google Business:** la ficha no tiene ninguno. La web sí (614 28 09 50).
3. **Horario en Google Business:** hoy publica L, M, J, V, S 20:00–00:30 · X 17:00–01:00 · D 14:30–00:30. No coincide con el horario que has confirmado. Mientras no se corrija, hay clientes yendo a la puerta cerrada.
4. **Search Console:** dar de alta `www.lafirma-tacos.es` y enviar el sitemap una vez desplegado P0.1.

---

## P0 — Infraestructura crítica

### P0.1 · Dominio y superficie SEO

| Campo | Detalle |
|---|---|
| **ID** | P0.1 |
| **Prioridad** | P0 — máxima |
| **Problema** | `SITE_URL` vale `https://lafirma-tacos.com`. De esa constante salen el canonical, el `og:url`, el `og:image`, el `metadataBase`, las URL del sitemap, el puntero del robots y el `url`/`image`/`hasMenu` del JSON-LD. Ese dominio **no es de La Firma Tacos España**: sirve otro sitio con su propio canonical hacia `lafirmatacos.com`. En la práctica se le está indicando a Google que el contenido original vive en un dominio de un tercero, y la imagen de compartición se pide a ese dominio ajeno. |
| **Solución** | Cambiar `SITE_URL` a `https://www.lafirma-tacos.es`. Auditar después que ninguna URL absoluta se construya fuera de esa constante. Añadir `alternates.canonical` explícito en el layout raíz, que hoy no existe (solo lo tiene `/valencia`). |
| **Archivos afectados** | `data/siteConfig.ts:1` (la constante) · `app/layout.tsx` (`metadataBase`, OG, canonical raíz) · `app/sitemap.ts` · `app/robots.ts` · `app/valencia/page.tsx` · `components/RestaurantSchema.tsx` (`url`, `image`, `hasMenu`) |
| **Dependencias** | Ninguna. Es la primera tarea y no depende de nada. |
| **Riesgo** | **Bajo.** Un solo valor, sin lógica. El único riesgo real es dejar alguna URL absoluta escrita a mano fuera de la constante, que se descarta con un `grep` de verificación. |
| **Método** | 1. Cambiar la constante. 2. `grep -rn "lafirma-tacos\.com\|https://lafirma" app components data` hasta que no quede ninguna coincidencia. 3. Añadir `alternates: { canonical: "/" }` en el layout raíz. 4. Confirmar que `metadataBase` deriva de `SITE_URL`. |
| **QA** | Sobre el build de producción local: `curl -s localhost:3111/robots.txt` → sitemap en `.es`. `curl -s localhost:3111/sitemap.xml` → todas las `<loc>` en `.es`. `curl -s localhost:3111/ \| grep -oE 'og:url[^>]*\|canonical[^>]*'` → `.es`. Validar el JSON-LD en el Rich Results Test. Tras desplegar, repetir contra el dominio real. |
| **Resultado esperado** | Google deja de atribuir el contenido a un dominio ajeno. Las imágenes al compartir en WhatsApp e Instagram vuelven a cargar. Es el cambio con mejor relación impacto/esfuerzo de todo el plan. |

### P0.2 · SSR de Monta Tu Taco

| Campo | Detalle |
|---|---|
| **ID** | P0.2 |
| **Prioridad** | P0 |
| **Problema** | El HTML servido de `/monta-tu-taco` no contiene nada: 0 `<h1>`, 0 `<h2>`, 0 `<h3>`, ni carnes, ni salsas, ni precios, ni tamaños (30.079 bytes, casi todos scripts). La causa **no es que el componente sea de cliente** — Next sí renderiza componentes cliente en el HTML inicial. La causa concreta es que `MontaTuTacoBuilder` llama a `useSearchParams()`: en una ruta estática ese hook fuerza a Next a abandonar el prerender de todo el subárbol bajo el `<Suspense>` y a mandar un hueco vacío. Como el `<Suspense>` no tiene `fallback`, el hueco es literalmente nada. |
| **Solución** | Sacar `useSearchParams()` del árbol que debe prerenderizarse. El componente sigue siendo de cliente y conserva todo su estado e interactividad; simplemente lee el parámetro `talla` **después** de hidratar, en un `useEffect`, desde `window.location.search`. Con eso Next vuelve a prerenderizar el componente completo y el HTML pasa a contener toda la carta del configurador. El `<Suspense>` deja de tener sentido y se elimina. **No es un fallback de carga:** el contenido real, con sus precios e ingredientes, queda en el HTML estático. |
| **Archivos afectados** | `components/MontaTuTacoBuilder.tsx:3,23,26,34-37` (quitar el import y el hook, mover la lectura a `useEffect`) · `app/monta-tu-taco/page.tsx` (quitar `Suspense`, añadir H1 semántico en servidor) |
| **Dependencias** | Ninguna técnica. Conviene hacerla antes que P1.3 y P1.4 para no tocar dos veces la misma jerarquía de encabezados. |
| **Riesgo** | **Medio-bajo.** El comportamiento que cambia es el enlace profundo `?talla=L`: hoy la talla correcta se pinta ya en el primer render; después se pintará M durante un instante y saltará a L al hidratar, junto con el scroll. Es un parpadeo de una fracción de segundo en un enlace que solo se usa desde las tarjetas de la carta. Alternativa si resulta molesto: convertir la talla en segmento de ruta (`/monta-tu-taco/l`), que da SSR completo y sin parpadeo, pero es un cambio de arquitectura de URL que prefiero no meter en P0. |
| **Método** | 1. Eliminar `import { useSearchParams }` y la llamada. 2. En un `useEffect` de montaje, leer `new URLSearchParams(window.location.search).get("talla")`, validarla contra `SIZE_LIMITS` y, si es válida, aplicar `handleSizeSelect` y el scroll. 3. Quitar el `<Suspense>` de la página. 4. Subir el `<h1>` a la página (componente servidor) para que exista aunque el builder no hidrate. |
| **QA** | `curl -s localhost:3111/monta-tu-taco` debe contener: al menos un `<h1>`, las cadenas `Carne Picada`, `Cordon Bleu`, `Salchicha`, las tres tallas con sus precios, las 11 salsas, los suplementos y los gratinados. Comprobar que el HTML pasa de ~30 KB a más de 100 KB. Con JavaScript desactivado, la página debe leerse entera. Con JavaScript activo, verificar que la selección, los límites por talla y `?talla=L` siguen funcionando. |
| **Resultado esperado** | La página más estratégica de la marca pasa de invisible a completamente indexable, con todo su vocabulario de producto disponible para búsquedas de cola larga. |

### P0.3 · Peso y LCP de la home

| Campo | Detalle |
|---|---|
| **ID** | P0.3 |
| **Prioridad** | P0 |
| **Problema** | La home descarga 7.385 KB, idénticos en móvil y en escritorio: 4.697 KB de vídeo, 2.595 KB de imagen, 92 KB de fuentes. `HeroSlider` monta las tres diapositivas a la vez y cada `MediaBackground` lleva un `<video autoPlay preload="auto">`, así que los tres vídeos se descargan enteros antes de que el usuario haga nada. Medido con 4G lenta y CPU ×4, el **LCP es de 9.016 ms**. En localhost sale 524 ms, por eso el problema es invisible sin limitar la red. |
| **Solución** | Conservar el impacto visual y cambiar solo *cuándo* se descarga cada cosa. Cuatro medidas, de mayor a menor efecto: **(a)** montar el `<video>` únicamente de la diapositiva activa; las demás quedan como `<img>` póster hasta que les toca. **(b)** `preload="none"` en el vídeo y póster siempre presente, de modo que el LCP sea la imagen, no el vídeo. **(c)** El póster de la primera diapositiva se marca como prioritario (precarga + `fetchpriority=high`) y no lleva `loading="lazy"`. **(d)** En móvil y en redes lentas no se carga vídeo en absoluto: se queda el póster con el zoom lento que ya existe en CSS (`.kenburns-img`), que da sensación de movimiento a coste cero. La detección se hace con `matchMedia("(min-width: 768px)")` más `navigator.connection` (`saveData`, `effectiveType`) y `prefers-reduced-motion`, con degradación segura si la API no existe. |
| **Archivos afectados** | `components/HeroSlider.tsx` (montar vídeo solo en el índice activo) · `components/MediaBackground.tsx:48-53` (política de `preload`, póster, condiciones de red y motion) · `app/globals.css` (reutilizar `.kenburns-img` como alternativa al vídeo) · `data/videos.ts` (sin cambios de datos; se confirma que cada diapositiva ya tiene `fallbackImage`) |
| **Dependencias** | Se beneficia mucho de P1.1 (`next/image`), que reduce los 2.595 KB de imagen. Puede hacerse antes, pero el LCP no bajará del todo hasta que el póster se sirva en WebP/AVIF y a tamaño adecuado. |
| **Riesgo** | **Medio.** Es el cambio con más superficie visual de todo P0. Riesgos concretos: que al cambiar de diapositiva el vídeo tarde en aparecer y se vea un salto desde el póster (se mitiga precargando el vídeo de la diapositiva siguiente cuando el navegador está ocioso); y que Safari en iOS trate distinto el autoplay (ya hay una red de seguridad con `play()` en `MediaBackground`, que hay que conservar). |
| **Método** | 1. Añadir a `MediaBackground` una prop `active` y una `shouldLoadVideo`. 2. Renderizar el `<video>` solo si ambas son ciertas; si no, `<img>` con el póster. 3. Calcular `shouldLoadVideo` una sola vez en el cliente (ancho ≥ 768, sin `saveData`, `effectiveType` distinto de `2g`/`3g`, sin `prefers-reduced-motion`). 4. En `HeroSlider`, pasar `active={i === activeIndex}` y precargar el siguiente con `requestIdleCallback`. 5. Marcar el póster de la primera diapositiva como prioritario. |
| **QA** | Medir antes y después con Playwright y CDP, con `Network.emulateNetworkConditions` a 1,6 Mbps / 150 ms y `Emulation.setCPUThrottlingRate: 4`, registrando LCP, CLS y bytes por tipo de recurso. Objetivo del primer viewport en móvil: **por debajo de 800 KB** y **LCP por debajo de 2.500 ms**. Verificar visualmente en 375, 390, 430, 768, 1280 y 1920 px que el hero no parpadea ni cambia de encuadre. Verificar que con `prefers-reduced-motion` no se reproduce vídeo. |
| **Resultado esperado** | De 7,4 MB a menos de 1 MB en el primer viewport, y de 9 s a menos de 2,5 s de LCP en móvil, sin renunciar al vídeo en escritorio. |

### P0.4 · Horario real de Castellana

| Campo | Detalle |
|---|---|
| **ID** | P0.4 |
| **Prioridad** | P0 |
| **Problema** | El horario del código (L–V 13:00–15:30 y 19:00–00:00 · S, D y festivos 13:30–01:30) no es el correcto. El confirmado es L–V **13:30–16:30 y 19:30–00:30** · S, D y festivos **13:30–01:30**. Ese dato alimenta el bloque de horarios de la web, el indicador de abierto/cerrado y el `openingHoursSpecification` del JSON-LD, así que hoy los tres están mal a la vez. |
| **Solución** | Corregir `schedule` y `scheduleGroups` con el horario confirmado. Es cambio de datos puro: ningún componente se toca, porque todos leen ya de esta fuente. **Se hace ahora, sin esperar a P1.5**, porque es un error de cara al cliente y la corrección es independiente del refactor multi-local. |
| **Archivos afectados** | `data/siteConfig.ts` (`location.hours`, `location.schedule`, `location.scheduleGroups`) |
| **Dependencias** | Ninguna. P1.5 después trasladará esta misma estructura dentro de `locations[]` sin volver a tocar los valores. |
| **Riesgo** | **Muy bajo.** Datos, sin lógica. La única cautela es respetar el formato de turnos que ya consume `OpeningHours` y `RestaurantSchema` (cierre menor que apertura ⇒ pasa de medianoche). |
| **Método** | Reescribir los tres campos manteniendo exactamente la forma actual del tipo. |
| **QA** | Comprobar en `/#visitanos` que se muestran los tres grupos correctos. Comprobar el `openingHoursSpecification` del JSON-LD en el Rich Results Test. Verificar el estado abierto/cerrado a distintas horas simulando la hora del sistema. |
| **Resultado esperado** | Web y datos estructurados dicen el horario real. Queda pendiente sincronizar Google Business, que hoy publica otro distinto. |

---

## P1 — Fundamentos para V2

### P1.1 · Migración a `next/image`

| Campo | Detalle |
|---|---|
| **ID** | P1.1 |
| **Prioridad** | P1 |
| **Problema** | Cero usos de `next/image`; los 11 `<img>` del proyecto son etiquetas crudas. El móvil descarga la misma foto de 960×1200 que el escritorio, no se sirve WebP ni AVIF (25–35 % de ahorro típico) y las 61 imágenes de `/carta` no declaran `width` ni `height`. |
| **Solución** | Migrar a `next/image` los componentes que sirven fotografía de producto y de marca. En los contenedores que ya fijan proporción (`aspect-[4/5]` en `ProductCard`, `aspect-3/4` en `DrinksGrid`, el círculo del builder) se usa `fill` + `sizes` + `object-cover`, que **conserva el encuadre exacto** que tienen hoy. Se declara `priority` solo en el póster del hero. |
| **Archivos afectados** | `components/ProductCard.tsx` · `components/DrinksGrid.tsx` · `components/MediaBackground.tsx` · `components/MontaTuTacoBuilder.tsx` · `components/IngredientChip.tsx` · `components/CategoryShowcase.tsx` · `components/ValenciaLaunch.tsx` · `next.config.mjs` (formatos y `deviceSizes`) |
| **Dependencias** | Debe ir después de P0.3 para poder medir su efecto por separado. |
| **Riesgo** | **Medio.** Dos riesgos reales: **(1)** que cambie el encuadre de alguna foto, que es precisamente lo que llevamos días corrigiendo — por eso la migración se hace contenedor a contenedor comparando capturas antes/después, no en bloque. **(2)** Coste: la optimización de imágenes de Vercel se factura por transformación; conviene revisar el plan contratado antes de activar todos los `deviceSizes`. Lo señalo como decisión de negocio. |
| **Método** | Migrar un componente por commit, empezando por `ProductCard` (el de mayor volumen: 61 imágenes en `/carta`). Mantener el `onError` que ya existe como respaldo. Definir `sizes` reales según los anchos de la rejilla, no `100vw`. |
| **QA** | Captura antes/después de cada rejilla a 390 y 1440 px, comparadas píxel a píxel para confirmar que el encuadre no se mueve. Medir bytes de imagen en `/carta` y en `/`. Verificar que se sirve AVIF o WebP inspeccionando `content-type` en las respuestas. CLS debe seguir por debajo de 0,01. |
| **Resultado esperado** | Entre un 40 % y un 60 % menos de bytes de imagen en móvil, sin ningún cambio visible de encuadre. |

### P1.2 · Migración a `next/font`

| Campo | Detalle |
|---|---|
| **ID** | P1.2 |
| **Prioridad** | P1 |
| **Problema** | Las tres tipografías se piden con `@import` dentro de `app/globals.css:12`. Eso encadena tres pasos antes de que aparezca el primer texto: descargar el CSS, interpretarlo y solo entonces pedir las fuentes a `fonts.googleapis.com`, que además es un tercer origen con su propia negociación TLS. Es el peor patrón de carga de fuentes que existe. |
| **Solución** | Cargar Oswald, Mulish y Dancing Script con `next/font/google`, que las descarga en build, las auto-hospeda en el propio dominio y elimina la cadena y el origen externo. La migración es inusualmente limpia porque `globals.css` ya consume las fuentes a través de variables CSS (`--font-display`, `--font-heading`, `--font-body`): basta con que `next/font` alimente esas mismas variables. |
| **Archivos afectados** | `app/layout.tsx` (declaración de las fuentes y clases de variable en `<html>`) · `app/globals.css:12,18-22` (quitar el `@import`, quitar las definiciones manuales de las variables) |
| **Dependencias** | Ninguna. Puede ir en paralelo a P1.1. |
| **Riesgo** | **Bajo.** El riesgo es un cambio sutil de renderizado si no se declaran los mismos pesos que hoy: Dancing Script 600 y 700, Oswald 400/500/600/700, Mulish 400/500/700. Se declara exactamente ese conjunto y se compara. |
| **Método** | Declarar las tres con `subsets: ["latin"]`, `display: "swap"` y `variable` apuntando a los nombres de variable actuales. Aplicar las clases al `<html>`. Borrar el `@import` y el bloque `:root` de fuentes. |
| **QA** | Comprobar en la pestaña de red que no hay ninguna petición a `fonts.googleapis.com` ni a `fonts.gstatic.com`. Captura comparada de la home y de `/carta` antes/después para confirmar que la tipografía es idéntica. Medir el tiempo hasta el primer texto pintado. |
| **Resultado esperado** | Se elimina un origen externo y una cadena de tres saltos del camino crítico. Identidad tipográfica intacta. |

### P1.3 · Datos estructurados de la carta

| Campo | Detalle |
|---|---|
| **ID** | P1.3 |
| **Prioridad** | P1 |
| **Problema** | `/carta` no tiene ningún JSON-LD. Es justo la página donde el tipo `Menu` de schema.org más valor aporta, porque permite que platos y precios aparezcan en los resultados de búsqueda. La home y `/valencia` sí lo tienen. |
| **Solución** | Generar `Menu` → `MenuSection` (una por categoría) → `MenuItem` (nombre, descripción, `offers.price`, `priceCurrency: "EUR"`, `image` absoluta), derivándolo **enteramente** de `data/products.ts`. Sin literales: si un plato cambia de precio, el schema cambia solo. Enlazar con el `Restaurant` existente a través de `hasMenu`. |
| **Archivos afectados** | Nuevo `components/MenuSchema.tsx` · `app/carta/page.tsx` (montarlo) · `components/RestaurantSchema.tsx` (`hasMenu` apuntando a la URL correcta) |
| **Dependencias** | **Requiere P0.1 hecho**, porque las URL de imagen del schema deben ser absolutas y sobre el dominio correcto. |
| **Riesgo** | **Bajo.** Solo añade una etiqueta `<script>`. El riesgo es declarar precios que no coincidan con los de la web, que se descarta al derivarlos de la misma fuente. Cuidado con el café Lavazza, que tiene `price: 0` como marcador de «Consultar»: debe **omitirse** del schema, no publicarse como gratis. |
| **Método** | Función pura que recorre `categories` y emite el árbol. Excluir explícitamente los productos con `price === 0`. Precios como número con dos decimales, no como cadena con símbolo. |
| **QA** | Validar en el Rich Results Test y en el Schema Markup Validator, sin errores ni avisos. Comprobar que el número de `MenuItem` coincide con el número de productos con precio. Verificar que Lavazza no aparece. |
| **Resultado esperado** | La carta pasa a ser legible por Google como carta, no como texto suelto. |

### P1.4 · Un solo H1 en la home

| Campo | Detalle |
|---|---|
| **ID** | P1.4 |
| **Prioridad** | P1 |
| **Problema** | El hero monta un `<h1>` por diapositiva: «Monta Tu Taco», «F1 Tacos La Firma» y «Crousty Spicy». Tres H1 en la misma página diluyen la señal semántica y ninguno de los tres dice qué es la marca. |
| **Solución** | Un único `<h1>` con el posicionamiento —**LA FIRMA · ORIGINAL FRENCH TACOS**— y los títulos de diapositiva degradados a `<h2>`. En esta fase el cambio es **semántico, no visual**: el H1 puede quedar visualmente integrado o accesible solo para lectores de pantalla, y el rediseño del hero se aborda en P3.1. Así se corrige el SEO sin adelantar la evolución de marca. |
| **Archivos afectados** | `components/HeroSlider.tsx:76` (título de diapositiva a `<h2>`) · `app/page.tsx` o `components/HeroSlider.tsx` (nuevo `<h1>` único) |
| **Dependencias** | Conviene después de P0.2, para revisar la jerarquía de encabezados de todo el sitio de una vez. |
| **Riesgo** | **Bajo**, con una cautela de accesibilidad: si el H1 se oculta visualmente debe hacerse con una clase de solo-lectores correcta (posicionamiento fuera de pantalla), nunca con `display:none`, que lo elimina también del árbol de accesibilidad. |
| **Método** | Insertar el H1 al principio de la sección del hero. Cambiar la etiqueta del título de diapositiva conservando exactamente las mismas clases, para que no cambie ni un píxel. |
| **QA** | `curl -s localhost:3111/ \| grep -c "<h1"` → exactamente 1. Recorrer la jerarquía de encabezados de las cinco rutas y comprobar que no hay saltos de nivel. Revisar con un lector de pantalla que el H1 se anuncia. |
| **Resultado esperado** | Una sola declaración semántica de qué es La Firma, que además prepara el terreno del hero de P3.1. |

### P1.5 · Modelo de datos multi-local

| Campo | Detalle |
|---|---|
| **ID** | P1.5 |
| **Prioridad** | P1 |
| **Problema** | `siteConfig.location` es un objeto único. Con Paterna en camino no hay dónde poner su teléfono, su horario ni sus enlaces de reparto sin duplicar estructura. El riesgo concreto es enseñar los datos de Madrid en la ficha de Paterna. |
| **Solución** | Introducir `locations: Location[]` con un tipo explícito: `slug`, `name`, `status` (`"abierto" \| "proximamente"`), `address`, `coordinates`, `phone`, `email`, `openingHours`, `delivery`, `maps`, `images`, `services`, `seo`. Los campos que hoy no existen —coordenadas de Castellana, teléfono y horario de Paterna— se tipan como opcionales y quedan `null`; **no se inventa ninguno**, y los componentes deben saber no pintar lo que falta. Se mantiene un `defaultLocation` que apunta a Castellana para que nada se rompa mientras se migran los consumidores uno a uno. |
| **Archivos afectados** | Nuevo `data/locations.ts` · `data/siteConfig.ts` (deja de contener `location`, lo reexporta) · `data/valenciaLaunch.ts` (Paterna pasa a ser una entrada de `locations`) · `components/RestaurantSchema.tsx` (schema por local, y quitar la dirección escrita a mano de la línea 48) · `components/PromoSection.tsx` · `components/Footer.tsx` · `components/OpeningHours.tsx` · `components/StickyMobileCTA.tsx` · `components/MobileMenu.tsx` |
| **Dependencias** | **Requiere P0.4** (para trasladar el horario ya corregido, no el antiguo). Es prerrequisito de las rutas `/restaurantes` de P3.5. |
| **Riesgo** | **Alto** — es el cambio de mayor superficie del plan: toca nueve componentes. Riesgos: romper el JSON-LD del restaurante; que el pie o el CTA fijo pierdan datos; y sobre todo mostrar datos de Madrid en Paterna, que es exactamente lo que el refactor pretende evitar. Se mitiga migrando componente a componente contra `defaultLocation`, sin cambiar comportamiento en el mismo commit en que se cambia la estructura. |
| **Método** | 1. Crear el tipo y `locations.ts` con Castellana completa y Paterna con lo confirmado. 2. Reexportar `siteConfig.location = locations[0]` para no romper nada. 3. Migrar consumidores de uno en uno, verificando cada uno. 4. Al final, eliminar la reexportación y la dirección hardcodeada del schema. |
| **QA** | Tras cada componente migrado, captura comparada de la sección afectada. Validar el JSON-LD de cada local por separado. Comprobar expresamente que en la página de Paterna **no** aparece ningún dato de Castellana: ni teléfono, ni horario, ni enlaces de reparto. `tsc --noEmit` limpio en cada paso. |
| **Resultado esperado** | Añadir un restaurante pasa a ser una entrada en un array. Queda listo el terreno de `/restaurantes`. |

### P1.6 · Orden comercial de la carta

| Campo | Detalle |
|---|---|
| **ID** | P1.6 |
| **Prioridad** | P1 |
| **Problema** | El orden actual es tacos → acompañantes → burgers → bocatas → crousty → postres → bebidas. El orden comercial aprobado es tacos → Monta Tu Taco → croustys → burgers → bocatas → entrantes → postres → bebidas. Hoy los croustys quedan sextos, por detrás de categorías más convencionales. |
| **Solución** | Reordenar el array `categories`. Como la navegación de categorías, el pie y las pantallas del local se generan de ese mismo array, todo se reordena solo. |
| **Archivos afectados** | `data/products.ts` (orden del array) · `data/navigation.ts` (`footerProductLinks`, para que siga el mismo orden) |
| **Dependencias** | Ninguna. |
| **Riesgo** | **Bajo**, con dos preguntas abiertas que necesito que confirmes: **(1)** ¿«Entrantes» debe sustituir al nombre actual «Acompañantes La Firma», o son cosas distintas? **(2)** «Monta Tu Taco» aparece en tu orden como categoría propia, pero hoy las tres tallas viven dentro de la categoría «Tacos». ¿Se saca a sección propia en la carta, o basta con el bloque destacado que ya enlaza al configurador? |
| **Método** | Mover los objetos dentro del array, sin tocar su contenido. Ajustar `footerProductLinks` al mismo orden. |
| **QA** | Comprobar el orden en `/carta`, en la barra fija de categorías, en el pie y en las cuatro pantallas del local. Verificar que ningún ancla (`/carta#crousty`, etc.) se rompe. |
| **Resultado esperado** | La jerarquía visual de la carta refleja la prioridad comercial. |

---

## P2 — UX y conversión *(planificado, no se implementa)*

| ID | Tarea | Nota de planificación |
|---|---|---|
| P2.1 | Resumen del configurador con cálculo de precio | Sumar talla + suplementos + gratinados + menú desde `data/products.ts`. Hoy el usuario termina sin saber cuánto cuesta lo que ha montado. |
| P2.2 | Resumen fijo en escritorio / CTA fijo en móvil | Columna lateral pegajosa a partir de 1024 px; barra inferior en móvil, coordinada con el `StickyMobileCTA` que ya existe para no duplicar barras. |
| P2.3 | CTA de cierre del configurador | Debe llevar a las plataformas reales. **No se simula un checkout propio**, que no existe. |
| P2.4 | «Hazlo Menú» dentro del configurador | El suplemento de 2,50 € ya está en datos; falta exponerlo como decisión dentro del flujo. |
| P2.5 | Selector de reparto | Al pulsar «Pedir», elegir entre Uber Eats y Glovo en vez de mandar a una arbitrariamente. |
| P2.6 | Navegación de carta | Evaluar si la barra fija actual necesita indicador de sección activa. |
| P2.7 | Analítica | 14 eventos definidos en el brief. **Bloquea la medición de todo P2**: sin esto no se puede saber si los cambios de conversión funcionan. Recomiendo implementarlo primero dentro de este bloque, y elegir herramienta antes (ninguna instalada hoy). |
| P2.8 | Foco del menú móvil | De la Fase A: cerrar con `Esc`, atrapar el foco, bloquear el scroll del fondo. |

## P3 — Evolución de marca *(planificado, no se implementa)*

| ID | Tarea | Nota de planificación |
|---|---|---|
| P3.1 | Nuevo hero | LA FIRMA / ORIGINAL FRENCH TACOS como tesis. Se apoya en el H1 de P1.4 y en la política de carga de P0.3. |
| P3.2 | F1 como producto insignia | Hay material real: foto propia y vídeo de hero. No requiere sesión nueva. |
| P3.3 | Salsa La Firma | **Bloqueado por material.** No existe ninguna foto de la salsa de queso; las 11 de salsas son otras. Requiere sesión de fotos. |
| P3.4 | Storytelling Lyon → Madrid → Valencia → España | Convertir el texto corrido actual en progresión visual. Sin inventar fechas. |
| P3.5 | `/restaurantes` y fichas por local | **Depende de P1.5.** Con redirects para no romper URL actuales. |
| P3.6 | `/franquicias` | Sin cifras de inversión, royalties ni rentabilidad: no existen datos verificados. Solo CTA de contacto. |
| P3.7 | Design system y microinteracciones | Formalizar lo que ya existe (`Button`, `ProductCard`, `Reveal`) como sistema documentado. |

---

## Secuencia recomendada

```
P0.1 dominio ─┐
P0.4 horario ─┼─→ se pueden hacer y desplegar el mismo día
              │
P0.2 SSR ─────┘

P0.3 performance hero
      ↓
P1.2 next/font  (independiente, en paralelo)
      ↓
P1.1 next/image  →  volver a medir LCP
      ↓
P1.4 H1  +  P1.6 orden de carta   (bajo riesgo, rápidos)
      ↓
P1.3 schema de carta   (requiere P0.1)
      ↓
P1.5 multi-local   (el más arriesgado, al final del bloque)
```

**P0.1, P0.4 y P0.2 son los tres primeros y no dependen de nada.** Juntos suman poco código y arreglan el problema de atribución de dominio, el horario erróneo y la invisibilidad del configurador.

---

## Nota sobre despliegue

Nada de lo trabajado esta semana está en producción. La web pública sirve todavía
las imágenes y los datos anteriores: la Fish Firma retirada, la Tasty Chicken y la
Doble Crunch nuevas, las 29 bebidas, el recuento de reseñas y el arreglo del banner
no se ven online. Conviene decidir si se despliega lo ya hecho antes de empezar P0
o si se acumula todo en un despliegue único al cerrar el bloque.

## Pendiente de material

Las dos fotografías de las tallas L y XL enviadas hoy **no han llegado al disco**,
así que no he podido incorporarlas. Al reenviarlas se resuelve el defecto de fondo
reflejado que introduje al convertir esas dos imágenes a 4:5. Además, en las
miniaturas la foto marcada como L muestra el taco ocupando más encuadre que la
marcada como XL; conviene confirmar que no están intercambiadas, ya que el sentido
de las tres fotos es transmitir la diferencia de tamaño.
