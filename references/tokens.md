# Token Architecture

How to structure tokens like the cleanest design systems do. The locked
block in Phase 3 is the minimum; this file is the pattern to follow when
the product grows (apps, dashboards, dark mode).

## Semantic color layers

Name tokens by **role**, never by value (`--surface-hover`, not
`--gray-100`). Four layers cover almost everything:

1. **Text hierarchy — exactly three levels.**
   `--fg` (headings, key values) · `--fg-muted` (supporting copy) ·
   `--fg-subtle` (hints, timestamps, axis labels). All three must pass
   4.5:1 on `--bg`. If you want a fourth level, you actually want
   smaller type or less copy.
2. **Nested surfaces with interaction steps.**
   `--bg` (canvas) → `--surface` (cards) → `--surface-hover` →
   pressed/active one more step. Hover always moves **one step** in the
   same ramp — never introduces a new hue.
3. **Border steps.** `--border` (hairlines, dividers) and
   `--border-strong` (hover/active border, emphasized outlines).
4. **One focus ring, and it comes from the accent.** Define it as
   `--ring: var(--accent);` so focus always speaks in the product's own
   primary color — never a generic blue borrowed from another system, and
   never a different ring per component. Only override it when the accent
   itself fails contrast against the focused surface.

## Status colors come in pairs

A status is always **a tinted background + a readable text tone from the
same hue** (like `--accent-soft` + `--accent-soft-fg`). The text half must
pass 4.5:1 on the tint half. Define the pair as two tokens; never fake the
tint with opacity on the base color, and never put the base color's text
on its own tint without checking.

Badges, notifications, and status dots all reuse this recipe:
`--status-<name>-bg` + `--status-<name>-fg`.

## Chart ramp (if the product has charts)

- A neutral `--chart-track` (the bar/ring background) one step above
  `--surface`.
- Categorical series as numbered tokens `--chart-1 … --chart-n`, each
  with an `-active` partner exactly one tone darker for hover emphasis.
- Consume them as CSS variables in the chart code, never raw hex.

## Composite typography tokens

A text style is **one token that sets size + line-height + letter-spacing
+ weight together** — never assembled by hand from separate utilities.
Name by role, apply color separately:

```css
/* styles/typography.css */
.text-display  { font: 600 39px/1.1 var(--font-display); letter-spacing: -0.01em; }
.text-title    { font: 600 25px/1.2 var(--font-display); }
.text-headline { font: 500 16px/1.4 var(--font-body); }
.text-body     { font: 400 14px/1.45 var(--font-body); }
.text-caption  { font: 400 12px/1.35 var(--font-body); letter-spacing: 0.01em; }
```

Usage reads as `class="text-body text-fg-muted"` — one class for metrics,
one for color. Rules:

- Sizes come from the locked `--t-*` scale; roles just bundle them.
- 5–7 roles cover a whole product (display, title, subtitle, headline,
  body, caption). A marketing site may add one hero size above the scale
  — as a token, not an inline value.
- Weights allowed per role are part of the token. Don't bold a caption
  ad hoc; if a bold caption is needed, that's a defined variant.
- Line lengths: body 45–75ch, display ≤ 20ch.
