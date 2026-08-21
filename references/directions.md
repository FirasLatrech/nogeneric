# Direction Library

Twelve ready-to-use directions. Pick 3 that fit the product and show them
in Phase 2 — always adapt names, accents, and copy tone to the user's
context. Every `--fg-muted` here passes WCAG AA (4.5:1) on its `--bg`.

Format: name · vibe · fonts (display / body) · palette · radius · texture.

---

## 1. Terminal
- **Vibe:** technical, dense, hacker
- **Fonts:** JetBrains Mono / Geist
- **Palette:** bg `#0C0C0C` · surface `#161616` · fg `#F2F2F2` · muted `#9A9A9A` · border `#2A2A2A` · accent `#00FF88` · danger `#FF5555`
- **Radius:** 2px / 2px / 4px
- **Texture:** 1px borders everywhere, uppercase mono labels, tabular numbers, no shadows

## 2. Editorial
- **Vibe:** warm, calm, literary
- **Fonts:** Fraunces / Inter
- **Palette:** bg `#FBF9F6` · surface `#FFFFFF` · fg `#1F1B16` · muted `#6B635A` · border `#E7E1D8` · accent `#B4532A` · danger `#B3261E`
- **Radius:** 8px / 12px / 16px
- **Texture:** big serif headlines, generous line-height, thin rules between sections

## 3. Brutalist
- **Vibe:** loud, raw, confident
- **Fonts:** Space Grotesk / IBM Plex Mono
- **Palette:** bg `#F5F5F0` · surface `#FFFFFF` · fg `#111111` · muted `#5A5A5A` · border `#111111` · accent `#FF3B00` · danger `#D00000`
- **Radius:** 0px / 0px / 0px
- **Texture:** 2–3px solid black borders, hard offset shadows (no blur), huge type

## 4. Swiss
- **Vibe:** precise, gridded, neutral
- **Fonts:** Archivo / Inter
- **Palette:** bg `#FFFFFF` · surface `#F4F4F4` · fg `#0A0A0A` · muted `#666666` · border `#DDDDDD` · accent `#E30613` · danger `#C21807`
- **Radius:** 0px / 2px / 2px
- **Texture:** visible grid, asymmetric layout, one red accent per screen, lots of white

## 5. Luxury Dark
- **Vibe:** premium, quiet, expensive
- **Fonts:** Playfair Display / Public Sans
- **Palette:** bg `#101012` · surface `#1A1A1E` · fg `#EDEAE4` · muted `#A39E93` · border `#2C2C31` · accent `#C9A96A` · danger `#E06C5C`
- **Radius:** 4px / 6px / 8px
- **Texture:** thin gold hairlines, wide letter-spacing on small caps, slow generous spacing

## 6. Neo-Retro
- **Vibe:** friendly, chunky, 70s-warm
- **Fonts:** Bricolage Grotesque / Inter
- **Palette:** bg `#FFF7E8` · surface `#FFFFFF` · fg `#2B1D0E` · muted `#6E5B44` · border `#2B1D0E` · accent `#E3742A` · danger `#C4321F`
- **Radius:** 12px / 16px / 24px
- **Texture:** 2px dark borders with solid offset shadows, rounded chunky buttons

## 7. Clinical
- **Vibe:** trustworthy, cool, medical/fintech
- **Fonts:** Archivo / Source Sans 3 (General Sans is Fontshare-only)
- **Palette:** bg `#F7F9FB` · surface `#FFFFFF` · fg `#101828` · muted `#5C6B7A` · border `#DDE3EA` · accent `#0B6E63` · danger `#B42318`
- **Radius:** 6px / 8px / 12px
- **Texture:** surface cards floating on a tinted canvas — no dividing
  borders between shell regions; clear labels, restrained color

## 8. Playful
- **Vibe:** warm, human, consumer app
- **Fonts:** Figtree / Inter (Satoshi is Fontshare-only)
- **Palette:** bg `#FFF4EF` · surface `#FFFFFF` · fg `#27150E` · muted `#7A5E51` · border `#F0DCD2` · accent `#F04E23` · danger `#C4321F`
- **Radius:** 10px / 14px / 20px
- **Texture:** rounded but not blobby, one big friendly headline, warm neutrals not gray

## 9. Midnight Data
- **Vibe:** dashboard, focused, nocturnal
- **Fonts:** Space Grotesk / Geist
- **Palette:** bg `#0B1220` · surface `#121B2E` · fg `#E8EDF7` · muted `#93A1B8` · border `#1F2A40` · accent `#4FD1C5` · danger `#F87171`
- **Radius:** 6px / 8px / 10px
- **Texture:** tabular numbers, thin dividers, accent reserved for live data only

## 10. Newsprint
- **Vibe:** journalistic, dense, serious
- **Fonts:** Newsreader / Source Sans 3
- **Palette:** bg `#FAFAF7` · surface `#FFFFFF` · fg `#141414` · muted `#595959` · border `#C9C9C4` · accent `#B00020` · danger `#B00020`
- **Radius:** 0px / 2px / 2px
- **Texture:** multi-column layout, hairline rules, small caps kickers, tight leading

## 11. Studio
- **Vibe:** gallery, minimal, portfolio
- **Fonts:** Instrument Serif / Geist
- **Palette:** bg `#FFFFFF` · surface `#F6F6F6` · fg `#0F0F0F` · muted `#6B6B6B` · border `#E4E4E4` · accent `#0F0F0F` · danger `#C0392B`
- **Radius:** 0px / 0px / 2px
- **Texture:** almost no color — hierarchy from size and space alone; accent = black used big

## 12. Industrial
- **Vibe:** utilitarian, tough, ops/logistics
- **Fonts:** Archivo / IBM Plex Mono
- **Palette:** bg `#E8E8E6` · surface `#F5F5F3` · fg `#161616` · muted `#5F5F5C` · border `#B5B5B0` · accent `#F5B700` · danger `#C62828`
- **Radius:** 2px / 2px / 4px
- **Texture:** stencil-style uppercase labels, hazard-yellow accents on dark chips, mono data

---

## These are starting points

Each entry is one worked example of its vibe, not a template to copy
literally. Change the palette, swap a font, or invent a direction the
list doesn't cover when the product calls for it — the point is a
deliberate, coherent system, not this particular twelve.

## How to pick 3 for Phase 2

- Match at least one direction to the product's obvious genre
  (devtool → Terminal or Midnight Data; content site → Editorial or Newsprint).
- Make the other two a real stretch — different lightness, different
  display font class, different density.
- Never show two directions from the same "family"
  (e.g. Terminal + Midnight Data together = two dark technical looks).
