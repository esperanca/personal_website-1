#!/usr/bin/env python3
"""Gera os cards OG 1200x630 do danielsouza.com a partir da ilustração intro-image.png.

Uso:   python3 scripts/make-social-card.py
Saída: src/images/social-share.jpg            (fallback global — retrato + nome/tagline)
       src/images/social-share-1200x630-a.jpg  (retrato centralizado, cards por post)

Requer Pillow. Fontes variáveis do Google Fonts (OFL) em /tmp/ogfonts —
mesmas famílias que o site já usa (Playfair Display + Noto Sans).
A ilustração entra em tamanho nativo ou menor (nunca ampliada), então o
line art continua nítido.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC_PORTRAIT = ROOT / "src/images/intro-image.png"
OUT_DIR = ROOT / "src/images"
FONT_DIR = Path("/tmp/ogfonts")

W, H = 1200, 630
MARGIN = 56
INK = (0, 0, 54)        # #000036
ACCENT = (9, 121, 250)  # #0979fa
GRAY = (123, 122, 125)  # #7b7a7d
WHITE = (255, 255, 255)

PLAYFAIR = FONT_DIR / "PlayfairDisplay.ttf"
NOTO = FONT_DIR / "NotoSans.ttf"


def font(path, size, weight=None):
    f = ImageFont.truetype(str(path), size)
    if weight:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
    return f


def fit_font(path, text, max_w, start, weight=None, min_size=20):
    """Maior tamanho em que `text` ainda cabe em max_w."""
    size = start
    while size > min_size:
        f = font(path, size, weight)
        if f.getlength(text) <= max_w:
            return f, size
        size -= 2
    return font(path, min_size, weight), min_size


def load_portrait():
    """O fundo da ilustração é 254,254,254: reescala para 255 puro para não
    aparecer emenda entre a imagem e o canvas branco."""
    im = Image.open(SRC_PORTRAIT).convert("RGB")
    return im.point(lambda v: min(255, round(v * 255 / 254)))


def variant_a(port):
    """Retrato centralizado, respiro generoso, zero texto."""
    canvas = Image.new("RGB", (W, H), WHITE)
    ph = H - 60
    p = port.resize((ph, ph), Image.LANCZOS)
    canvas.paste(p, ((W - ph) // 2, 30))
    return canvas


def variant_b(port):
    """Retrato à esquerda, nome + tagline à direita."""
    canvas = Image.new("RGB", (W, H), WHITE)
    ph = H - 2 * MARGIN
    p = port.resize((ph, ph), Image.LANCZOS)
    canvas.paste(p, (MARGIN, MARGIN))

    draw = ImageDraw.Draw(canvas)
    x = MARGIN + ph + MARGIN          # coluna de texto começa aqui
    col_w = W - MARGIN - x

    title = "Daniel Souza"
    sub = ["Arquiteto de Informação", "e Pesquisador de UX"]
    site = "danielsouza.com"

    f_title, ts = fit_font(PLAYFAIR, title, col_w, 78, weight=700)
    f_sub, ss = font(NOTO, 27), 27
    f_site, fs = font(NOTO, 23), 23

    gap_after_title, rule_h, gap_after_rule = 22, 4, 26
    gap_sub, gap_before_site = 10, 32

    total = (
        ts + gap_after_title + rule_h + gap_after_rule
        + len(sub) * ss + (len(sub) - 1) * gap_sub
        + gap_before_site + fs
    )
    y = (H - total) // 2

    draw.text((x, y), title, font=f_title, fill=INK)
    y += ts + gap_after_title

    draw.rectangle([x, y, x + 52, y + rule_h], fill=ACCENT)
    y += rule_h + gap_after_rule

    for line in sub:
        draw.text((x, y), line, font=f_sub, fill=GRAY)
        y += ss + gap_sub

    draw.text((x, y + gap_before_site - gap_sub), site, font=f_site, fill=ACCENT)
    return canvas


def main():
    port = load_portrait()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, im in (
        ("social-share.jpg", variant_b(port)),            # fallback global
        ("social-share-1200x630-a.jpg", variant_a(port)),  # cards por post
    ):
        out = OUT_DIR / name
        im.save(out, "JPEG", quality=92, optimize=True, progressive=True)
        print(f"{out}  {out.stat().st_size / 1024:.0f} KB  {im.size[0]}x{im.size[1]}")


if __name__ == "__main__":
    main()
