# Design preferences

_Learned by nogeneric. Edit freely — this file wins over defaults._

## Locked direction

Three locked themes, all token-scoped in `app/globals.css`:

- `.theme-landing` — Studio: Instrument Serif / Geist, white, red-brown accent
- `.theme-terminal` — JetBrains Mono / Geist, near-black, green accent
- `.theme-editorial` — Fraunces / Inter, white + neutral ramp, red-600 accent
- `.theme-brutalist` — Space Grotesk / IBM Plex Mono, bone, orange-red accent
- `.theme-clinic` — Clinical: Archivo / Source Sans 3, cool blue-gray,
  teal accent. Used by the doctor dashboard (`/clinic`).

Locked 2026-08-21. Every page picks one theme class; no page invents values.

A task-management dashboard (`/tasks`, blue `#3876F5`, chela-inspired
shell) was built and then removed at Firas's request (2026-08-21) — not
liked. Don't rebuild it unless asked again.

## Components

- Button — `components/ui/button.tsx` (variants: primary, outline, soft,
  danger, press; sizes: sm, md, **lg default**). The project's **only**
  button. Need a new look? Add a variant/size here — never write a
  second button component.
- Clinic dashboard — `app/clinic/page.tsx` (app shell: sidebar nav,
  header with search + notifications, stat tiles, schedule table,
  right aside with a designed empty state)
- Sidebar — `components/clinic/sidebar.tsx` (collapsible app sidebar:
  floating rounded card, no border, green Solar icons, w-64 ↔ w-18)
- CountUp — `components/ui/count-up.tsx` (animates a figure from 0 to
  its value; handles prefixes, suffixes, decimals, and reduced-motion)
- SignupForm — `app/editorial/signup-form.tsx` (label, required `*`,
  blur validation, error message, loading and success states)

## Decisions

- **Reuse before building.** Check `components/` for an existing piece
  before creating anything; extend it with a variant or prop instead of
  making a parallel component. Copy-pasted markup between files is the
  signal to extract a shared component. (2026-08-21)
- **Reverted: buttons are back to the original flat `--control-h`
  default** (the `md` size — `h-(--control-h) px-5`), not `lg`. Tried
  making `lg` the app-wide default per an earlier ask; Firas asked to
  revert both height and padding back to how it was. The Button
  component keeps `sm`/`md`/`lg` as opt-in sizes for when a specific row
  wants something else, but `md` is the default again. Do not default
  to `lg` again without being asked. (2026-08-21)
- App shells (dashboards) use **Solar Icons** (`@solar-icons/react`) at
  20–22px, colored with `--accent`, in the **BoldDuotone** weight — the
  two-tone fill reads richer than flat linear. Solar exports one
  component per weight (`WidgetBoldDuotoneIcon`, `WidgetBoldIcon`);
  there is no `weight` prop. The active nav item steps up to solid Bold
  so it still reads as selected. (2026-08-21)
- Sidebars (floating variant): **no right border**. Float as a rounded
  card inset from the window edge, page background visible around it.
  Must collapse and expand (icon-only rail at `w-18`, full at `w-64`).
  Nav items are h-11 with `gap-0.5` between them — tight, not spread
  out. (2026-08-21)
- Panels inside a white shell use a **`--surface-2`** step (a real
  recessed tone, ~1.13 against white), not `--bg` — the page tint is too
  close to white to read as inset. Re-check `--fg-subtle` against the new
  surface: it must pass 4.5:1 on both. (2026-08-21)
- Dashboard stat figures and count badges **count up from 0** on first
  render (ease-out, ~900ms, tabular numerals). (2026-08-21)
- Dashboard body text is `text-base` (16px), labels `text-sm`. Do not
  drop UI text to `text-xs`; it reads as unfinished. (2026-08-21)
- Marketing pages use **Remix Icon** (`@remixicon/react`), 16px,
  `currentColor`. Never lucide-react. Solar is the app-shell icon set.
  (2026-08-21)
- **Hover never moves or resizes an element** — no lift, no scale, no
  shadow appearing or growing. Called "a big big issue": it makes the
  page twitch under the cursor and shifts the click target. Hover is one
  color step. Only exception: the brutalist offset-shadow press.
  (2026-08-21)
- Focus is a **soft ring** — border becomes `--ring` plus a 25% ring —
  never a hard 2px outline. (2026-08-21)
- `--ring` always derives from `--accent`, so focus speaks in the
  product's own color. Never a borrowed generic blue. (2026-08-21)
- Anything clickable gets `cursor: pointer`; disabled gets
  `not-allowed`. (2026-08-21)
- Every input needs a visible `<label>`; placeholders are hints only.
  Required fields get a `*` in `--danger` after the label. (2026-08-21)
- Validation errors: red border + alert icon + a plain-language message
  saying how to fix it. Never a bare red border, never "Invalid input".
  (2026-08-21)
- Fonts must stay clean and legible — Geist, Inter, IBM Plex. Arabic
  (often with French) needs IBM Plex Sans Arabic, never a browser
  fallback. (2026-08-21)

## Rejected

- Task-management dashboard (kanban board, `/tasks`) — built with
  a joined shell inspired by `~/Desktop/chela`, then explicitly removed:
  "I don't like it." Don't propose rebuilding it without being asked.
  (2026-08-21)
- General Sans for the clinic theme — not on Google Fonts, so `next/font`
  cannot load it. Verify a font exists in `next/font/google` before
  locking it. Used Archivo instead. (2026-08-21)
- Ink-blue accent (`#1d4ed8`) for the landing theme — too close to the
  generic-AI palette this skill exists to avoid. (2026-08-21)
- Pure black as the landing accent — made the soft button variant render
  as dull gray, so the button demo contradicted its own rule.
  (2026-08-21)
- Hover shadows on buttons and cards — felt jumpy. (2026-08-21)
- Three equal cards in a row for the showcases — it is on our own banned
  list. Now a featured card plus two stacked. (2026-08-21)

## Copy & tone

Plain, concrete, slightly dry. Real numbers and specifics over
adjectives. No marketing verbs ("empower", "seamless", "unlock"). Every
demo uses real product copy, never lorem ipsum.
