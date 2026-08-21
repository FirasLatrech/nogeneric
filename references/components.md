# Component Recipes

How to build core components inside the locked token system. Recipes are
grouped by direction *family* — find your direction's family, then apply.

Families:
- **Dark-dense** — Terminal, Midnight Data, Luxury Dark
- **Light-airy** — Editorial, Clinical, Playful, Studio
- **Bordered-loud** — Brutalist, Neo-Retro, Swiss, Newsprint, Industrial

All recipes use only tokens. Sizes reference the spacing scale (`--sp-N`),
type scale (`--t-*`), and radii (`--r-*`).

---

## Reuse before you build (check this first)

Every recipe below describes what a component should be — **not a licence
to create a new one.** Before building any of them, search the project:

```
components/  ui/  common/  packages/*/src/
```

and grep for the element (`<button`, `<input`, `Dialog`, `Badge`).

- Found it → import it. Do not write a second one.
- Found it but it lacks what you need → add a **variant or prop** to the
  existing component (`variant="soft"`, `size="sm"`), never a parallel
  component with a new name.
- Found it but it is wrong → fix it once, in place. Every usage improves.
- Not found → build it once in the shared folder, then import it
  everywhere, including the first place you needed it.

Copy-pasting markup between files is the warning sign: extract instead.
Duplicate components drift apart, double every future change, and are
the main reason a UI stops feeling like one product.

## Controls share one height (the most-broken rule)

Buttons, inputs, selects, dropdown triggers, and search fields all use
`--control-h` (40px default, 36px for dense directions) and the same
horizontal padding (`--sp-4`, or `--sp-3` dense). Set
`height: var(--control-h)` on all of them — don't rely on padding to
"come out even", because borders and line-heights differ per element.
A filter bar with a search input, a select, and a button must read as
one straight bar. Icons inside controls: one size (16px or 20px),
`currentColor`, centered.

## Icons

One set per project: **Solar Icons**, **Hugeicons**, or **Remix Icon**.
Never lucide-react, heroicons, font-awesome, or emoji.

Defaults by surface — use them unless the client asks otherwise:

- **App shells** (dashboards, sidebars, toolbars) — Solar at 20–22px in
  the **BoldDuotone** weight, colored with `--accent`. The two-tone fill
  carries better at small sizes than a flat outline, which looks thin
  next to real data. Any other weight is fine if the client prefers it;
  Hugeicons and Remix are equally acceptable sets.
- **Marketing pages** — a lighter set at 16px in `currentColor`, so
  icons inherit whatever text token they sit in.

Weight discipline:

- One weight for the whole set. The **only** allowed exception is a
  selected/active item stepping up one weight (duotone → solid bold),
  which reinforces the active state instead of inventing a new signal.
- Each set has its own API — check it before writing markup:
  **Solar** exports one component per weight (`WidgetBoldDuotoneIcon`,
  `WidgetBoldIcon`); there is no `weight` prop and the bare `WidgetIcon`
  form does not exist. **Hugeicons** exports icon *objects* rendered
  through one component — `<HugeiconsIcon icon={InboxIcon} size={22}
  strokeWidth={1.8} />` — so weight is a prop and an active item simply
  strokes heavier. Verify every export name exists before using it.
- Icon-only buttons always get an `aria-label`.

## Buttons

Exactly four variants, no more. All share `--control-h`, the same
horizontal padding (`--sp-4`/`--sp-5`), the theme's radius, and a
medium/bold label — the variant changes only the fill:

1. **Primary** — solid `--accent`, contrast text. One per view.
2. **Secondary** — `--bg`/`--surface` fill, 1px `--border`, `--fg` text.
   This is where trailing icons live (e.g. →).
3. **Soft** — quiet tinted fill for low-stakes actions. Needs its own
   token pair: `--accent-soft` (bg) + `--accent-soft-fg` (text, must
   pass 4.5:1 on the soft bg). Never fake it with opacity on `--accent`.
4. **Danger** — solid `--danger`, contrast text. Only for destructive acts.

Hover changes **one color step, and nothing else**:

- Solid buttons dim slightly (`filter: brightness(.9)`).
- Outline buttons step to `--surface-hover` + `--border-strong`.
- Soft buttons dim their tint.

Never on hover: a shadow that appears or grows, a `translate`, a `scale`,
a border that changes *width*, or a font-weight change. Every one of them
moves the element or its neighbours while the cursor is on it — the page
twitches, the click target shifts, and rows reflow. This is the single
most common polish mistake; if hover moves anything, it is wrong.

The one exception: bordered-loud buttons whose offset shadow collapses as
the button shifts into it. That press *is* the direction's identity, it is
declared in the tokens, and it never applies to cards or list rows.

Cards and list rows get the same treatment — hover means
`--surface-hover` (or a border step to `--border-strong`), never a lift.

**Primary details:** `--accent` background, contrast text (check it:
light text on dark accent, dark text on bright accent like `#00FF88`
or `#F5B700`). Font `--t-sm` or `--t-base`.

- Dark-dense: no shadow. Hover = slightly brighter accent via
  `filter: brightness(1.1)`, never a new hex.
- Light-airy: radius `--r-md`. Hover = `brightness(.9)` on solid fills, or
  `--surface-hover` + `--border-strong` on outline buttons. No shadow
  change, no lift.
- Bordered-loud: 2px `--border` outline, radius `--r-sm` (often 0). Hover =
  the static offset shadow collapsing as the button shifts (its identity),
  or a background/foreground swap.

**Secondary:** transparent background, 1px `--border`, `--fg` text.
**Ghost:** text only, `--fg-muted`, becomes `--fg` on hover.
Never three filled buttons side by side.

**Cursor and pointer feedback (never skip this):**

- Anything that performs an action gets `cursor: pointer` — buttons,
  links, cards that navigate, tabs, menu items, sortable table headers,
  the whole clickable row. A `<div onClick>` with a default arrow cursor
  is a bug, not a style choice.
- `cursor: not-allowed` on disabled controls, `cursor: text` on inputs,
  `cursor: grab`/`grabbing` while dragging, `cursor: wait` never (show a
  spinner in the button instead).
- Disabled buttons: reduced opacity or the disabled token pair, no hover
  effect at all, and `disabled` on the element — not just a gray color.
- Loading buttons keep their exact width (swap the label for a spinner,
  or keep the label and add one) so the layout never jumps.

## Inputs & forms

- Background `--surface`, 1px `--border`, radius `--r-sm`, padding `--sp-2 --sp-3`.
- Focus: soft ring, not a hard outline — the border becomes `--ring` and a
  2px ring of `--ring` at ~25% opacity sits outside it. Smooth, quiet,
  and the same on every control in the product.
- Dark-dense: input bg may equal `--bg` with border doing the work.
- Bordered-loud: 2px borders, zero radius, labels uppercase `--t-xs`.

**Every input needs a real label.**

- A visible `<label htmlFor>` above the field: `--t-sm`, `--fg`. Placeholder
  text is a hint, never the label — it disappears the moment someone types,
  and screen readers skip it.
- If the design truly can't show a label (a compact search bar), use
  `aria-label` and keep the placeholder as an *example* of the value
  ("you@example.com"), not an instruction ("Enter your email").
- Required fields get a `*` right after the label text, in `--danger`,
  with `aria-hidden="true"` on the asterisk and `required` +
  `aria-required` on the input (so screen readers hear "required", not
  "star"). Add one line above the form: "* Required field".
- The asterisk marks required; it never replaces the label, and color is
  never the only signal — the `required` attribute carries the meaning.
- If *most* fields are required, flip it: mark the few optional ones
  "(optional)" in `--fg-muted` instead of starring almost every field.
- Help text sits under the field in `--t-xs` `--fg-muted`, and is written
  before the user makes a mistake ("At least 8 characters").

**Validation errors must be clean and specific.**

- Validate on blur, not on every keystroke — never show an error for a
  field someone is still typing into. Once a field is in the error state,
  re-validate as they type so the error clears the instant it's fixed.
- The error state changes three things together: border → `--danger`,
  a message below the field in `--danger` at `--t-xs`, and an inline
  16px alert icon before the message. Never color alone.
- The message says what is wrong and how to fix it, in plain language:
  "Enter a valid email, like name@company.com" — not "Invalid input",
  not "Error 422", not a red border with no text at all.
- Reserve the message's vertical space (or animate the height) so the
  form doesn't jump when errors appear.
- Wire it up for assistive tech: `aria-invalid="true"`,
  `aria-describedby` pointing at the message, and `role="alert"` on the
  message so it is announced.
- On submit failure, move focus to the first invalid field and summarize
  at the top if more than two failed. Never scroll the user to hunt.
- Success is feedback too: a form that submits silently feels broken —
  show a confirmation, an inline check, or navigate somewhere obvious.

## Cards

- Background `--surface`, padding `--sp-4` or `--sp-5`, radius `--r-md`.
- Dark-dense: 1px `--border`, no shadow. Separation comes from the border.
- Light-airy: `--sh-1`, border optional. Never both a heavy border and a shadow.
- Bordered-loud: 2px `--border`, hard offset shadow, no blur.
- A card grid must not be three identical cards in a row — vary one card's
  size or content weight, or use a 2-column asymmetric layout.

## Tables & data

- Font for numbers: the mono font if the direction has one, with
  `font-variant-numeric: tabular-nums`.
- Row separators: 1px `--border` bottom only. No zebra stripes and borders together.
- Header row: `--t-xs` or `--t-sm`, `--fg-muted`, uppercase in dense/loud families.
- Numeric columns right-aligned. Row hover: `--surface` (dark-dense may use
  a subtle accent-tinted overlay — but via a pre-defined token, not inline rgba).

## Navigation

- One nav level visible at a time. Active item: `--fg` + accent marker
  (2px underline or left bar in `--accent`), inactive: `--fg-muted`.
- Dark-dense: compact, `--t-sm`, mono labels welcome.
- Light-airy: roomy padding `--sp-3 --sp-4`, no boxes around items.
- Bordered-loud: items can be boxed with borders; active = fg/bg inversion.

## App sidebars

Our defaults for a dashboard shell. **If the client asks for something
different, follow them. If they say nothing, build the default — do not
stop to ask.**

Defaults:

- **Floating card, no dividing border.** The sidebar is a `--surface`
  card on the page background: rounded corners, inset from the window
  edge by `--sp-4`. The shell reads as panels on a canvas rather than
  regions chopped by hairlines, and the header becomes its own card by
  the same logic.
  *Exception by family:* dark-dense shells (Terminal, Midnight Data)
  keep a `border-r` — hairline separation is that family's identity,
  the same way the offset-shadow press belongs to bordered-loud.
- **Nav items sit close together** — `gap-1` at most, each row one
  control height. Widely spaced items read as unrelated links rather
  than one navigation group.
- **Item text is body size**, never `--t-xs`. Small nav labels are the
  most common "unfinished" tell in an AI-built dashboard.
- **Active item is a filled block**, not a thin marker: the soft token
  pair (`--accent-soft` + `--accent-soft-fg`), semibold label, icon
  stepped up one weight.
- **Collapsible.** Full ~256px, collapsed rail ~72px showing icons only.
  Animate `width` alone, hide labels, keep every row's height identical,
  give collapsed items a `title`, and wire the toggle with
  `aria-expanded` plus a real `aria-label`.
- **Footer** holds settings and the user identity, with the same row
  heights and collapse behaviour as the nav above it.

Two shell layouts, both good — pick one per app and keep it:

- **Floating** — sidebar and header are separate rounded cards inset
  from the window edge, page background visible between them. Feels
  lighter; suits content-forward dashboards.
- **Joined (panel-in-shell)** — the strongest of the three, worth
  defaulting to for a real desktop-app feel:
  - The **sidebar is transparent** and sits directly on the page
    background — it is not a card, just navigation floating on the
    canvas.
  - The **content area is one card panel**, rounded on its left corner
    only (top-left and bottom-left; right corners stay square against
    the viewport edge) — it reads as a surface sliding out from under
    the sidebar, not a boxed region.
  - Separate the two with a **hairline ring, not a border**:
    `ring-[0.5px] ring-line` renders sub-pixel on retina and looks like
    a crisp seam rather than a drawn line. A `border` at any width reads
    heavier than this.
  - The **header sits flush inside the panel** — same rounding as the
    panel, no border or corner of its own, height ~56px (`h-14`).
  - The active nav item is one shared element animated between rows
    (Motion's `layoutId`) rather than each row drawing a static
    highlight, so switching sections slides the indicator.
  - Fine detail worth copying: give the active pill's own tiny card a
    heavier bottom border than its other three sides
    (`border-b-[1.5px]` vs `border-[0.5px]`) — it reads as a subtle
    inner shadow/lip without needing an actual shadow.
- **Flush** — sidebar and header both sit square to the window, no
  rounding anywhere on the shell, structure from surface color alone.
  Simpler than panel-in-shell; use when the product wants zero visual
  flourish. Content regions inside (board, table, stat tiles) still get
  their own `--r-lg` rounded cards floating on `--surface-2`.
  Do not round a shell element that has no padding around it — a corner
  radius on something flush to the viewport edge has nothing to reveal
  and silently renders invisible.

Other alternatives when the client wants them: an icon-only rail with no
expand, a top nav bar instead of a sidebar, or a fixed sidebar that never
collapses. Any of these is fine — apply it consistently and record the
choice in `.design/preferences.md`.

## Empty states

Never a lonely gray icon + "No data". Instead: one sentence in `--fg`
explaining what will appear here, one line in `--fg-muted` on how to get it,
and one primary action. Keep it aligned with the direction's tone
(Terminal: "0 monitors configured. Add one to start watching.").

## Badges / status

- Padding `--sp-1 --sp-2`, `--t-xs`, radius `--r-sm`.
- Status colors come from tokens only: `--accent` = good/active,
  `--danger` = failing, `--fg-muted` = neutral/off. Do not invent an
  orange "warning" hex — if the product needs one, ask to add a token.
