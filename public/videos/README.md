# Vídeos pendientes

Ninguno de estos archivos existe todavía. Colócalos aquí con estos nombres exactos
y el hero los usará automáticamente (sin tocar código):

- `hero-monta-tu-taco.mp4`
- `hero-f1-tacos.mp4`
- `hero-crousty-spicy.mp4`

Formato: MP4 (H.264), 5–8s, loop-friendly, sin audio necesario (se reproducen muted).
Los prompts sugeridos para generarlos con Runway/Pika/Sora están en `data/videos.ts`
(campo `videoPrompt` de cada slide) y en el README principal del proyecto.

Mientras no exista el archivo, la web usa automáticamente la imagen de
`/public/images/hero/` correspondiente con efecto Ken Burns, y si tampoco existe
la imagen, muestra un bloque de marcador de posición. No rompe nada.
