# Design Memory

How the skill learns a project's taste instead of asking the same things
twice. Every decision the user makes is a rule for next time.

## The file

All learned preferences live in **`.design/preferences.md`** at the repo
root. Create it the first time something is worth remembering. Format:

```markdown
# Design preferences

_Learned by nogeneric. Edit freely — this file wins over defaults._

## Locked direction
Editorial — Fraunces / Inter. Locked 2026-08-21.
Tokens live in `app/globals.css` under `.theme-editorial`.

## Decisions
- Icons: Remix Icon only. Never lucide-react. (2026-08-21)
- Hover never moves an element — no lift, no scale, no shadow growth.
  Called "a big big issue". (2026-08-21)
- Focus = soft ring (`--ring` border + 25% ring), never a hard outline.
- `--ring` always derives from `--accent`, never a generic blue.
- All controls share `--control-h`; a form row must be one straight bar.

## Rejected
- Ink-blue accent — too close to the generic-AI palette. (2026-08-21)
- Hover shadows on buttons — felt jumpy. (2026-08-21)

## Copy & tone
Plain, concrete, slightly dry. No marketing verbs ("empower",
"seamless"). Real numbers over adjectives.
```

## Components

Where the shared pieces live, so they get reused instead of rebuilt:

```markdown
## Components
- Button — `components/ui/button.tsx` (variants: primary, outline, soft, danger)
- Input — `components/ui/input.tsx` (handles label, error, required `*`)
- Card — `components/ui/card.tsx`
```

Record a component's path the moment you build or find one. Read this
section before creating anything — it is the fastest way to avoid a
second Button.

Sections are fixed: **Locked direction · Components · Decisions ·
Rejected · Copy & tone**. Add others only if the project genuinely
needs them.

## When to read it

**Always, before Phase 1.** If `.design/preferences.md` exists:

- Skip questions it already answers. A locked direction means Phase 2
  is skipped entirely — never re-show three directions for a project
  that already chose one.
- Apply every line under Decisions as a hard rule, at the same level as
  this skill's own rules.
- Never re-propose anything under Rejected. If it seems right anyway,
  say why in one line and ask — don't just do it.

## When to write to it

Capture a preference the moment it becomes one — silently, as part of
the work, then mention it in one line ("Saved: icons = Remix Icon").

Write it down when the user:

- **states a rule** — "always use X", "never do Y", "I don't like Z"
- **corrects you** — the correction is the rule, and the reason matters
  more than the fix. Record why: "hover lift — felt jumpy", not just
  "no hover lift".
- **picks between options** — the pick and the rejects both go in.
- **reacts strongly** — "this is very clean", "big big issue". Strong
  words mean a durable preference, not a one-off note.
- **locks a direction** — record the direction, the date, and where the
  tokens live.

Do **not** record: one-off content edits ("change this headline"), facts
already visible in the code, or anything specific to a single screen.

## How to write it

- One line per preference, in the user's own words where they were
  vivid. "A big big issue" is more useful than "user dislikes this".
- Always include the **why** — a rule without a reason gets misapplied
  in the next context.
- Date each entry so old choices can be revisited.
- Contradictions: the newest wins. Replace the old line, and move it to
  Rejected if it was explicitly overturned.
- Keep it short. If the file passes ~40 lines, merge related entries —
  it is a rule sheet, not a changelog.

## Scope

`.design/preferences.md` is per-project and belongs in git — the whole
team inherits the same rules. Preferences that hold across *every*
project (an icon set the user always wants, fonts they always reject)
belong in the user's global memory instead, not here.
