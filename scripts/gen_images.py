#!/usr/bin/env python3
"""
Genera imágenes fotorrealistas y diversas para hieloencasa.com vía la Edge Function hieloencasa-images
(Supabase charlielingan → OpenAI ChatGPT Image API con quality="medium") y las comprime en WebP
ligeros (<= 68 KB, estrictamente < 100 KB) en public/img/.

Uso:
  python3 scripts/gen_images.py home        # genera las 58 imágenes diversas de Home/silos/escenas + 20 artículos top
  python3 scripts/gen_images.py articles    # genera imágenes individuales por artículo
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/hieloencasa-images"
TOKEN = "hieloencasa-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

# 58 escenas fotográficas diversas (diferentes máquinas cubitos/nugget/cristalino, ángulos, cocinas, cafés, fiestas e iluminación para evitar similitud visual)
HOME_PROMPTS = {
    "home-hero-hielo": "Three-quarter editorial studio photograph of a modern white Calacatta quartz kitchen island featuring a brushed stainless steel countertop nugget ice maker with a clear side water tank beside a ribbed glass of iced coffee filled with crunchy chewable ice, soft morning window light",
    "og-default": "Sunlit American kitchen countertop showcasing three distinct countertop ice makers (a premium nugget ice maker, a compact black bullet ice maker, and a clear square cube maker) next to chilled drinks and an ice scoop",
    "home-uso-diario-cafe": "Warm morning home coffee bar lifestyle photo showing fresh espresso pouring over airy chewable nugget ice in a tall glass beside a compact countertop ice maker and a 40oz insulated tumbler",
    "home-reuniones-fiesta": "Lively weekend home entertaining island with a high-capacity 40-pound countertop clear ice cube maker, stainless double-wall ice bucket, tongs, citrus cocktails and sparkling sodas",
    "home-nugget-macro": "Macro gastronomic close-up (85mm f/2.8) of porous crunchy chewable nugget ice being scooped with a perforated stainless steel scoop from a frosty ice basket",
    "home-cubitos-bala": "Detailed three-quarter view of an ultra-compact matte black portable bullet countertop ice maker with carry handle and open transparent lid revealing fresh bullet-shaped ice cubes",
    "home-cubo-cristalino": "Moody warm home bar close-up of crystal-clear bubble-free square gourmet ice cubes in a cut-crystal rocks glass in front of a sleek stainless clear ice machine",
    "home-bajo-gabinete": "Side-profile architectural kitchen shot demonstrating a 16-inch countertop ice maker fitting comfortably underneath standard 18-inch American upper wooden cabinets with side ventilation space",
    "home-silencio-oficina": "Peaceful open-concept apartment kitchen and home workspace where an ultra-quiet compact ice maker sits beside a pitcher of lemon water and a stoneware mug",
    "home-autolimpieza-agua": "Crisp bright kitchen sink scene where a clear water filter pitcher pours pure water into a spotless countertop ice maker during a self-cleaning cycle",
    # 12 Categorías Pilares
    "cat-resenas-maquinas-de-hielo": "Editorial appliance testing counter displaying stainless steel nugget, matte black bullet and white square countertop ice makers with bowls of fresh ice under natural daylight",
    "cat-comparativas-maquinas-de-hielo": "Balanced split-composition studio comparison on walnut wood featuring a chewable nugget ice maker on the left and a compact bullet cube ice maker on the right",
    "cat-mejores-maquinas-hielo-nugget": "Close-up lifestyle view of a stainless steel countertop nugget ice maker with pull-out drawer overflowing with soft sonic pebble ice next to iced matcha and iced latte",
    "cat-mejores-maquinas-cubitos-de-hielo": "Clean modern countertop showing a fast 6-minute bullet ice maker beside a crystal square cube maker and tall glasses of sparkling citrus water",
    "cat-maquinas-por-uso-presupuesto-y-espacio": "Bright apartment kitchenette counter comparing an affordable compact portable ice maker with handle and a family-size stainless steel ice maker",
    "cat-cubitos-vs-hielo-nugget-y-tipos": "Overhead macro comparison on dark slate showing three neat piles of ice: airy chewable nugget ice, hollow bullet ice cubes, and solid crystal-clear square cubes",
    "cat-capacidad-tamano-y-ubicacion-cocina": "Modern white shaker kitchen showing neat placement of a compact countertop ice maker beneath upper cabinets with generous side airflow clearance",
    "cat-ruido-consumo-electrico-y-funcionamiento": "Quiet minimalist Scandinavian kitchen evening scene with a sleek low-decibel countertop ice maker resting on a grey silicone anti-vibration mat",
    "cat-limpieza-descalcificacion-y-agua": "Spotless marble countertop featuring a gleaming open countertop ice maker, filtered water carafe, fresh lemon halves and microfiber cloth",
    "cat-solucion-de-problemas-y-reparacion": "Detailed close-up of a modern countertop ice maker touch LED indicator ring and clean internal water reservoir in bright studio lighting",
    "cat-uso-diario-bebidas-y-reuniones-en-casa": "Sunlit patio door buffet counter with a portable countertop ice maker, Mason jars of sweet iced tea, lemon slices and party tumblers",
    "cat-conservacion-hielo-y-accesorios": "Open organized freezer drawer and counter showing BPA-free airtight ice storage bins full of loose ice cubes, magnetic stainless scoop and silicone drip mat",
    # 36 Variantes Temáticas Anti-Similitud (3 extra por cada uno de los 12 silos)
    "scene-resenas-2": "Front-angle studio shot of a white minimalist smart countertop nugget ice maker on a light oak counter with a glass of berry sparkling water",
    "scene-resenas-3": "Oblique view of a retro mint-green portable countertop bullet ice maker on a butcher-block counter next to cold sodas",
    "scene-resenas-4": "Close-up of a self-dispensing countertop nugget ice maker filling a tall tumbler via front lever without a scoop",
    "scene-comparativas-2": "Side-by-side macro of two cocktail glasses: one filled with crunchy pebble nugget ice and the other with two large crystal-clear square cubes",
    "scene-comparativas-3": "Profile comparison of an ultra-low 11.6-inch compact ice maker beside a taller 16.5-inch high-capacity ice maker on quartz",
    "scene-comparativas-4": "Comparison on a kitchen counter between a countertop ice maker with a transparent side water tank and a slim standalone unit",
    "scene-nugget-2": "Hands pouring cold milk and espresso over a glass packed to the brim with soft chewable sonic nugget ice",
    "scene-nugget-3": "Compact black countertop pebble ice maker tucked neatly into a cozy wooden coffee nook beside coffee beans and syrups",
    "scene-nugget-4": "Close-up of an illuminated LED viewing window showing fresh chewable nugget ice tumbling into the insulated basket",
    "scene-cubitos-2": "Overhead view of nine fresh bullet-shaped ice cubes dropping from metal evaporator fingers into an ice basket",
    "scene-cubitos-3": "Stainless steel 40-pound countertop clear ice maker revealing a crystal-clear grid slab of 24 square ice cubes",
    "scene-cubitos-4": "Portable silver countertop ice maker with raised carry handle on a wooden camper RV dinette table",
    "scene-uso-2": "Family kitchen island with two 40oz pastel insulated tumblers being filled with fresh countertop ice in the morning",
    "scene-uso-3": "Backyard covered patio BBQ counter with an ice maker, chilled bottles in an ice bucket and grilled summer drinks",
    "scene-uso-4": "Compact studio apartment corner featuring a narrow 8.7-inch wide ice maker next to a single-serve coffee brewer",
    "scene-tipos-2": "Extreme macro photography of airy white laminated nugget ice cylinders next to translucent bullet cubes with water droplets",
    "scene-tipos-3": "Highball glass of sparkling soda with slow-melting clear square ice cubes preserving fizzy carbonation bubbles",
    "scene-tipos-4": "Blender jar filled with fresh strawberries and soft nugget ice on a kitchen counter ready for morning smoothies",
    "scene-tamano-2": "Countertop ice maker sitting on a smooth bamboo sliding tray pulled forward slightly from beneath a kitchen cabinet",
    "scene-tamano-3": "Corner kitchen counter layout showing 5 inches of clean breathing space around the side louver vents of an ice maker",
    "scene-tamano-4": "Compact countertop ice maker stored neatly inside a tidy pantry shelf when not in use",
    "scene-ruido-2": "Close-up of the side cooling louver vent and whisper-quiet fan grille on a brushed stainless countertop ice maker",
    "scene-ruido-3": "Countertop ice maker plugged cleanly into a modern kitchen GFCI wall outlet above a tidy silicone mat",
    "scene-ruido-4": "Open-plan living room and kitchen island showing a quiet ice maker operating peacefully during evening relaxation",
    "scene-limpieza-2": "Hands removing and rinsing the small bottom water mesh filter inside a clean countertop ice maker reservoir",
    "scene-limpieza-3": "Rear drain hose of a countertop ice maker draining clear rinse water neatly into a stainless kitchen sink",
    "scene-limpieza-4": "Glass bowl of food-grade citric acid powder, wooden spoon and filtered water pitcher beside a gleaming ice maker",
    "scene-fallas-2": "Interior view of a clean countertop ice maker basket highlighting the optical infrared ice-full sensor lens on the wall",
    "scene-fallas-3": "Detachable clear side water tank valve resting flush on a level marble kitchen countertop",
    "scene-fallas-4": "Well-ventilated countertop ice maker placed away from sunlight on a cool shaded kitchen counter",
    "scene-bebidas-2": "Home cocktail station with mint mojitos over pebble ice and old-fashioned glasses with clear square ice",
    "scene-bebidas-3": "Pitcher of homemade golden iced tea with lemon wheels beside a basket of fresh countertop bullet ice",
    "scene-bebidas-4": "Pre-party preparation scene filling reusable drawstring ice bags from a countertop ice maker next to a freezer",
    "scene-accesorios-2": "Stainless steel ice scoop hanging neatly on a magnetic side hook attached to a countertop ice maker",
    "scene-accesorios-3": "Double-walled brushed steel insulated ice bucket with lid and serrated tongs on a dining room sideboard",
    "scene-accesorios-4": "Digital water TDS meter testing a glass of pure filtered water beside a countertop ice maker",
}

TOP_ARTICLE_SLUGS = [
    "ge-profile-opal-2-0-side-tank-resena-opiniones-amazon",
    "frigidaire-gallery-nugget-44lb-resena-opiniones-amazon",
    "euhomy-nugget-ice-maker-34lb-resena-opiniones-amazon",
    "silonn-slim01-bullet-26lb-resena-opiniones-amazon",
    "euhomy-clear-square-40lb-resena-opiniones-amazon",
    "silonn-nugget-ice-maker-33lb-resena-opiniones-amazon",
    "luma-comfort-im200ss-clear-resena-opiniones-amazon",
    "ge-profile-opal-2-0-side-tank-vs-frigidaire-gallery-nugget-44lb",
    "silonn-slim01-bullet-26lb-vs-euhomy-bullet-26lb-handle",
    "maquina-hielo-nugget-vs-cubitos-bala-cual-comprar-amazon",
    "mejores-maquinas-de-hielo-nugget-sobremesa-amazon",
    "mejores-maquinas-hielo-nugget-economicas-menos-de-250-dolares",
    "mejores-maquinas-de-cubitos-de-hielo-sobremesa-amazon",
    "mejores-maquinas-cubitos-de-hielo-menos-de-100-dolares",
    "mejores-maquinas-cubos-cuadrados-cristalinos-transparentes",
    "mejores-maquinas-de-hielo-para-uso-diario-en-casa",
    "mejores-maquinas-de-hielo-para-reuniones-y-fiestas-en-casa",
    "maquinas-de-hielo-bajo-gabinete-estandar-18-pulgadas-usa",
    "como-descalcificar-con-acido-citrico-alimentario-guia-rapida-paso-a-paso",
    "como-evitar-que-el-hielo-se-pegue-en-el-congelador-para-uso-diario-practico",
]


def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={
            "Content-Type": "application/json",
            "x-hieloencasa-token": TOKEN,
        },
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    # Límite estricto: <= 68 KB para la imagen 1200x675 (garantizando siempre < 100 KB como pidió el usuario)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out = {}
    for suf, width in sizes.items():
        cur_w = width
        q = 78
        while True:
            r = im.resize((cur_w, round(cur_w * 9 / 16)), Image.LANCZOS)
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf]:
                break
            if q > 26:
                q -= 5
            elif cur_w > 640:
                cur_w = int(cur_w * 0.88)
            else:
                break
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out


def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists() and final.stat().st_size <= 68_000:
        return slug, f"skip ({final.stat().st_size // 1024}KB)"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB"


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
        art_dir = ROOT / "src/content/articles"
        for slug in TOP_ARTICLE_SLUGS:
            f = art_dir / f"{slug}.json"
            if f.exists():
                a = json.loads(f.read_text())
                tasks.append(
                    (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
                )
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append(
                (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
            )
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=10) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)


if __name__ == "__main__":
    main()
