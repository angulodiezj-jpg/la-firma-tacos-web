"""Genera las 4 pantallas de sala de La Firma a partir de los datos reales
de la carta. Salida: HTML autónomo (funciona sin internet, desde pendrive)."""
import json, os, html

DATOS = json.load(open("/tmp/carta.json"))
SALIDA = "/Users/jad/la-firma-tacos-web/pantallas"
CATS = {c["slug"]: c for c in DATOS["categories"]}
MTT = DATOS["montaTuTaco"]


def img(ruta):
    base, ext = os.path.splitext(os.path.basename(ruta))
    # Los SVG se conservan vectoriales; el resto se sirvió como JPEG.
    return "assets/img/" + base + (".svg" if ext.lower() == ".svg" else ".jpg")


def eur(v):
    return f"{v:.2f}".replace(".", ",") + " €"


def e(t):
    return html.escape(str(t))


def plato(p, retardo, con_desc=True):
    foto = f'<img src="{img(p["image"])}" alt="">' if p.get("image") else ""
    codigo = f'{p["code"]} ' if p.get("code") else ""
    desc = ""
    if con_desc and p.get("description"):
        d = p["description"].split(". + Menú")[0]
        desc = f'<div class="des">{e(d)}</div>'
    etq = '<span class="etq">Popular</span>' if "popular" in (p.get("tags") or []) else ""
    dest = " destacado" if "popular" in (p.get("tags") or []) else ""
    return f"""<div class="plato{dest} anim" style="animation-delay:{retardo:.2f}s">
      {foto}
      <div class="txt"><div class="nom">{e(codigo)}{e(p["name"])}</div>{desc}{etq}</div>
      <div class="precio">{eur(p["price"])}</div>
    </div>"""


def ingrediente(i, retardo):
    foto = f'<img src="{img(i["image"])}" alt="">' if i.get("image") else ""
    return f"""<div class="ing anim" style="animation-delay:{retardo:.2f}s">{foto}<span>{e(i["name"])}</span></div>"""


SCRIPT = """
<script>
// Escala la pantalla de 1920x1080 a cualquier televisor sin deformarla.
function ajustar() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  document.body.style.transform = 'scale(' + s + ')';
  document.body.style.marginLeft = ((innerWidth - 1920 * s) / 2) + 'px';
  document.body.style.marginTop = ((innerHeight - 1080 * s) / 2) + 'px';
}
addEventListener('resize', ajustar); ajustar();

// Red de seguridad: si algún día se añaden productos y el contenido no cabe,
// se reduce lo justo para que entre entero, en vez de cortarse por abajo.
function encajar() {
  const l = document.querySelector('.lienzo');
  l.style.transform = '';
  const disponible = l.clientHeight;
  const real = l.scrollHeight;
  if (real > disponible) {
    l.style.transform = 'scale(' + (disponible / real).toFixed(4) + ')';
  }
}
addEventListener('load', encajar);
setTimeout(encajar, 400);

// Relanza las animaciones de entrada cada 30 s para que la pantalla no se
// quede "muerta" si el televisor lleva horas encendido.
setInterval(function () {
  document.querySelectorAll('.anim').forEach(function (el) {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
}, 30000);
</script>
"""


def envoltorio(titulo, eyebrow, cuerpo, marquesina):
    tiras = "".join(f"<span>{e(t)}</span>" for t in marquesina * 2)
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>{e(titulo)} — La Firma Tacos</title>
<link rel="stylesheet" href="assets/pantallas.css">
<style>:root {{ --patron: url("assets/img/firma-pattern.jpg"); }}</style>
</head>
<body>
<div class="fondo"></div>
<div class="halo" style="width:520px;height:520px;top:-140px;left:-120px"></div>
<div class="halo" style="width:420px;height:420px;bottom:-120px;right:-90px;animation-delay:3.5s"></div>

<header class="cabecera">
  <div class="marca">
    <img src="assets/img/logo-badge.jpg" alt="">
    <div class="nombre">
      <span class="script"><span class="ini">L</span>a <span class="ini">F</span>irma</span>
      <span class="sub">TACOS</span>
    </div>
  </div>
  <div class="rotulo">
    <div class="eyebrow">{e(eyebrow)}</div>
    <h1>{e(titulo)}</h1>
  </div>
</header>

<main class="lienzo">
{cuerpo}
</main>

<footer class="pie"><div class="marquesina">{tiras}</div></footer>
{SCRIPT}
</body>
</html>"""


# ---------------------------------------------------------------- pantalla 1
def pantalla1():
    tallas = ""
    reglas = {"M": "1 carne · 1 salsa", "L": "2 carnes · 2 salsas", "XL": "3 carnes · 3 salsas"}
    fotos = {"M": "/images/products/monta-tu-taco-m.jpg",
             "L": "/images/products/monta-tu-taco-l.jpg",
             "XL": "/images/products/monta-tu-taco-xl.jpg"}
    for n, t in enumerate(MTT["sizes"]):
        s = t["size"]
        tallas += f"""<div class="talla anim brillo" style="animation-delay:{n*0.14:.2f}s">
          <img src="{img(fotos[s])}" alt="">
          <div class="letra">{s}</div>
          <div class="precio">{eur(t["price"])}</div>
          <div class="regla">{reglas[s]}</div>
        </div>"""

    def tira(items, base):
        return "".join(ingrediente(i, base + k * 0.03) for k, i in enumerate(items))

    sup = MTT["supplements"]
    cuerpo = f"""
<div class="bloque">
  <div class="tallas">{tallas}</div>
</div>

<div class="rejilla c2" style="gap:34px">
  <div class="bloque">
    <h2>Elige tu carne</h2>
    <div class="ingredientes">{tira(MTT["meats"], .5)}</div>
  </div>
  <div class="bloque">
    <h2>Elige tus salsas</h2>
    <div class="ingredientes">{tira(MTT["sauces"], .6)}</div>
  </div>
</div>

<div class="rejilla c2" style="gap:34px">
  <div class="bloque">
    <h2>Suplementos · +{eur(sup["price"])}</h2>
    <div class="ingredientes">{tira(sup["items"], .8)}</div>
  </div>
  <div class="bloque">
    <h2>Gratinados</h2>
    <div class="ingredientes">{tira(MTT["gratins"], .9)}</div>
  </div>
</div>"""
    return envoltorio("Monta Tu Taco", "Tú lo eliges, tú lo haces único",
                      cuerpo,
                      ["Monta tu taco", f'Hazlo menú +{eur(MTT["menuSupplement"]["price"])}',
                       "Hecho al momento", "La Firma"])


# ---------------------------------------------------------------- pantalla 2
def pantalla2():
    tacos = CATS["tacos"]["products"]
    bocatas = CATS["bocatas"]["products"]
    entrantes = CATS["acompanantes"]["products"]
    cuerpo = f"""
<div class="bloque">
  <h2>Tacos La Firma</h2>
  <div class="rejilla c2">{"".join(plato(p, i*0.08) for i, p in enumerate(tacos))}</div>
</div>

<div class="bloque">
  <h2>Bocatas La Firma</h2>
  <div class="rejilla c3">{"".join(plato(p, .35+i*0.08) for i, p in enumerate(bocatas))}</div>
</div>

<div class="bloque">
  <h2>Entrantes · Para empezar con fuerza</h2>
  <div class="rejilla c4">{"".join(plato(p, .6+i*0.06, con_desc=False) for i, p in enumerate(entrantes))}</div>
</div>"""
    return envoltorio("Tacos · Bocatas · Entrantes", "El taco francés original",
                      cuerpo,
                      ["Original French Tacos", "Hecho al momento",
                       "Salsa de queso de la casa", "La Firma"])


# ---------------------------------------------------------------- pantalla 3
def pantalla3():
    burgers = CATS["burgers"]["products"]
    crousty = CATS["crousty"]["products"]
    extras = ["Mozza", "Cheddar", "Raclette"]
    cuerpo = f"""
<div class="bloque">
  <h2>Burgers La Firma</h2>
  <div class="rejilla c2">{"".join(plato(p, i*0.08) for i, p in enumerate(burgers))}</div>
</div>

<div class="bloque">
  <h2>Crousty La Firma</h2>
  <div class="rejilla c2">{"".join(plato(p, .45+i*0.08) for i, p in enumerate(crousty))}</div>
</div>

<div class="bloque anim" style="animation-delay:.75s">
  <h2>Gratinados para tu Crousty · +1,50 €</h2>
  <div class="ingredientes">
    {"".join(f'<div class="ing"><img src="{img("/images/ingredients/gratinado-" + x.lower() + ".jpg")}" alt=""><span>{e(x)}</span></div>' for x in extras)}
  </div>
</div>"""
    return envoltorio("Burgers & Crousty", "Crujiente por fuera, brutal por dentro",
                      cuerpo,
                      ["Burgers La Firma", "Crousty La Firma",
                       "Hecho al momento", "La Firma"])


# ---------------------------------------------------------------- pantalla 4
def pantalla4():
    bebidas = CATS["bebidas"]["products"]
    grupos = {}
    for b in bebidas:
        grupos.setdefault(b.get("group", "Otras"), []).append(b)

    marcas = "".join(
        f'<div class="marca-logo anim" style="animation-delay:{i*0.05:.2f}s"><img src="{img(m["logo"])}" alt="{e(m["name"])}"></div>'
        for i, m in enumerate(DATOS["drinkBrands"]))

    cols = ""
    for n, (g, items) in enumerate(grupos.items()):
        lis = "".join(f'<li><b>{e(b["name"])}</b><span>{eur(b["price"])}</span></li>' for b in items)
        cols += f"""<div class="bloque anim" style="animation-delay:{.4+n*0.1:.2f}s">
          <h2 style="font-size:24px">{e(g)}</h2>
          <ul class="lista-bebidas" style="columns:{2 if len(items) > 6 else 1}">{lis}</ul>
        </div>"""

    cuerpo = f"""
<div class="bloque">
  <h2>Nuestras marcas</h2>
  <div class="marcas">{marcas}</div>
</div>
<div class="rejilla c2" style="gap:30px;align-items:start">{cols}</div>"""
    return envoltorio("Bebidas", "Para acompañar", cuerpo,
                      ["Refrescos", "Energéticas", "Zumos", "La Firma"])


for nombre, fn in [("1-monta-tu-taco", pantalla1), ("2-tacos-bocatas-entrantes", pantalla2),
                   ("3-burgers-crousty", pantalla3), ("4-bebidas", pantalla4)]:
    ruta = f"{SALIDA}/{nombre}.html"
    open(ruta, "w").write(fn())
    print(f"{nombre}.html  {os.path.getsize(ruta)//1024} KB")
