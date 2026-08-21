# UX Details

The small things that separate a designed product from a styled one.
Read this in Phase 4, before declaring a build finished.

## Every interactive element has five states

Design all five, every time: **default · hover · focus · active/pressed ·
disabled**. Plus **loading** and **empty** for anything that fetches data.
A build with only a default state isn't finished — it's a mockup.

- Hover is for mice only. Touch devices skip it, so hover must never be
  the *only* way to discover an action (no menus that appear on hover
  with no other affordance).
- Focus must be visible for keyboard users — the soft `--ring`, on every
  control, never `outline: none` without a replacement.
- Active/pressed gives instant confirmation the tap registered, before
  any network call returns.

## Cursor tells the truth

`pointer` on anything that acts (buttons, links, clickable cards, tabs,
sortable headers). `not-allowed` on disabled. `text` on inputs.
`grab`/`grabbing` while dragging. If the cursor doesn't change, users
don't know it's clickable.

## Hit targets

Minimum 44×44px of *tappable* area, even when the visible icon is 16px —
pad the button, don't grow the icon. Adjacent destructive and safe actions
need real space between them (`--sp-3` minimum); "Delete" must never sit
flush against "Save".

## Keyboard works, or it doesn't ship

- Tab order follows visual order. No focus traps except in modals, where
  focus *must* be trapped and returned to the trigger on close.
- Escape closes overlays. Enter submits forms. Arrow keys move within
  menus, tabs, and lists.
- A modal opens with focus on its first meaningful element, not the page
  behind it.

## Nothing happens silently

- Every action gets feedback within 100ms — pressed state, spinner,
  optimistic update, toast. Silence reads as "broken".
- Actions taking >1s show progress in place (button spinner, skeleton),
  not a full-page blocker.
- Destructive actions confirm first, and the confirm button names the
  act ("Delete 3 monitors"), never "OK". Better still: do it immediately
  with an "Undo" toast for 5–10 seconds.
- Errors from the server surface as human sentences near the thing that
  failed, with a retry affordance.

## Empty, loading, and error states are designed, not default

- **Empty:** one line explaining what appears here, one line on how to
  get it, one primary action. Never a lone gray icon and "No data".
- **Loading:** skeletons matching the real layout's shape beat spinners;
  never shift the layout when content arrives.
- **Error:** what failed, why if known, and what to do next.
- First-run empty and filtered-to-zero are *different* states with
  different copy ("No monitors yet" vs "No monitors match 'api'").

## Content that can break the layout

Test every component with: a very long string with no spaces, an empty
value, a huge number, and text 40% longer (translations). Names, titles,
and labels get `min-width: 0` + `truncate` or wrap — they never push a
row sideways.

## Numbers and dates

Tabular numerals for anything in a column. Right-align numeric columns.
Relative time for recent events ("7s ago") with the absolute timestamp on
hover via `title`. Always state units.

## Motion serves comprehension

Movement explains where something came from or went. If an animation
doesn't clarify a relationship, cut it. Respect
`prefers-reduced-motion` (see `references/motion.md`).

## Accessibility floor

Contrast 4.5:1 for text and 3:1 for UI boundaries. Color never carries
meaning alone — pair it with an icon, label, or shape. Every icon-only
button gets an `aria-label`. Images get alt text; decorative ones get
`alt=""`.
