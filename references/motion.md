# Motion Tokens

Motion follows the same rule as color and spacing: locked tokens, nothing
arbitrary. Add this block to `:root` in Phase 3 when the build has any
interaction or animation:

```css
:root {
  --dur-1: 120ms;   /* hovers, toggles, color/opacity */
  --dur-2: 200ms;   /* dropdowns, tooltips, small moves */
  --dur-3: 320ms;   /* modals, drawers, page-level */

  --ease-out: cubic-bezier(0.2, 0, 0, 1);      /* default: things entering/moving */
  --ease-in:  cubic-bezier(0.3, 0, 0.7, 0.2);  /* only for things leaving */
  --ease-spring: cubic-bezier(0.34, 1.3, 0.64, 1); /* playful directions only */
}
```

## Rules

- Never `transition: all`. Name the properties:
  `transition: opacity var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out);`
- Animate only `opacity` and `transform` for movement (compositor-friendly).
  Color/background transitions are fine at `--dur-1`.
- Enter slower than exit: modal in `--dur-3`, out `--dur-2`.
- Movement needs direction: dropdowns grow down (`transform-origin: top`),
  toasts slide from their edge. Nothing just "fades in place" except overlays.
- One coordinated motion per interaction. No cascading stagger on every list.
- **Hover never moves an element.** No lift, no scale, no shadow growth.
  Motion belongs to things entering, leaving, or changing state — not to
  the cursor passing over something that is already sitting still. A card
  that jumps under the pointer shifts the click target and reflows its
  neighbours.

## Per family

- **Dark-dense** (Terminal, Midnight Data): minimal motion. `--dur-1`
  everywhere, opacity + tiny translate (2–4px). No springs. Instant feels right.
- **Light-airy** (Editorial, Clinical, Studio): calm. `--dur-2`/`--dur-3`,
  `--ease-out`, gentle 8px translates on *entrance*. Hover stays a color
  step — no shadow growth, no lift.
- **Bordered-loud** (Brutalist, Neo-Retro, Swiss): snappy. `--dur-1`, hard
  moves — offset shadows pop in, elements shift whole steps (`--sp-1`).
  Neo-Retro and Playful may use `--ease-spring`. The offset-shadow button
  press is the one place a hover may move an element.

## Counting numbers up

Key figures — stat tiles, KPIs, dashboard counters, badges — count up
from 0 to their value on first render. It draws the eye to the number
that matters and makes a dashboard feel live rather than printed.

- Duration `--dur-3` to ~900ms. Long enough to read as motion, short
  enough that nobody waits for the real value.
- Ease out (`easeOutCubic`), never a spring: the number must settle on
  its value, never overshoot past it and come back.
- Always `tabular-nums`, and keep the unit/suffix rendered from the
  first frame ("0m" → "17m"), so the tile never changes width mid-count.
- Animate only the figures worth looking at. Every number on the screen
  counting at once is noise; table cells and timestamps stay still.
- Non-numeric values ("—", "n/a") render as-is, never animated.
- Under `prefers-reduced-motion`, render the final value immediately.

## Reduced motion (required)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
}
```

Opacity fades may stay; anything that moves or scales must effectively stop.
