# nogeneric

A [Claude Code skill](https://docs.claude.com/en/docs/claude-code/skills) that stops AI from generating generic-looking UI.

Instead of jumping straight to code, Claude acts as a **design director**: it asks one question, shows 3 visually different directions, locks a design-token system, and only then builds — with every color, font, spacing, and radius enforced from those tokens.

## Why

AI-generated UI tends to converge on the same look: purple gradients, glassmorphism cards, `rounded-2xl`, Inter everywhere, three feature cards in a row. This skill bans that output and forces a deliberate direction instead.

## What it does

0. **Remember** — reads `.design/preferences.md` first. If the project already locked a direction or stated a rule, it skips the questions and obeys.
1. **One question** — infers everything possible, asks only the highest-value unknown (usually the vibe).
2. **3 directions** — genuinely different systems (e.g. dark terminal / warm editorial / loud brutalist), one line each.
3. **Lock tokens** — a full `:root` block (colors, 2 fonts, type scale, spacing scale, radii). Nothing outside it is allowed.
4. **Build** — real copy, token-only values, a banned-patterns list, and a self-check before finishing.
5. **Iterate** — vague feedback ("make it pop") gets translated into concrete token changes, and every correction is written back to `.design/preferences.md` so it is never needed twice.

## What's in the repo

```
SKILL.md                  the skill itself
references/
  directions.md           12 ready directions, contrast-verified palettes
  components.md           buttons, forms, cards, tables per direction family
  motion.md               animation tokens and rules
  critique.md             scoring rubric for reviewing existing UI
  tokens.md               semantic token architecture and type styles
  ux-details.md           states, cursors, keyboard, empty/loading/error
  memory.md               how the skill learns a project's preferences
scripts/check.mjs         zero-dep checker: raw hex, off-scale px, font count
examples/
  next/                   Next.js + Tailwind v4 app: the skill's landing page
                          plus three showcase demos, all built by the skill's
                          own rules (scoped .theme-* token blocks)
```

### Run the Next.js demos

```bash
cd examples/next
npm install
npm run dev
# / is the skill's landing page; showcases at /terminal, /editorial, /brutalist
```

### Verify any build mechanically

```bash
node scripts/check.mjs path/to/files...
# example output:
#   app/page.tsx:12  raw hex #7C3AED outside :root — use var(--...)
```

## Install

```bash
# personal (all projects)
mkdir -p ~/.claude/skills/nogeneric
cp SKILL.md ~/.claude/skills/nogeneric/SKILL.md

# or per-project
mkdir -p .claude/skills/nogeneric
cp SKILL.md .claude/skills/nogeneric/SKILL.md
```

Claude Code picks it up automatically whenever a task involves building or restyling UI.

## Example

> **You:** build me a landing page for my uptime-monitoring tool
>
> **Claude:** What's the vibe — technical, editorial, bold, or warm? (or say 'you choose')
>
> **You:** you choose
>
> **Claude:** Going technical — it's a devtool.
> 1. **Terminal** · JetBrains Mono / Geist · bg `#0C0C0C`, accent `#00FF88` · radius 2px · dense, sharp
> 2. **Editorial** · Fraunces / Inter · bg `#FBF9F6`, accent `#B4532A` · radius 12px · calm, airy
> 3. **Brutalist** · Space Grotesk / IBM Plex Mono · bg `#F5F5F0`, accent `#FF3B00` · radius 0px · thick borders
>
> Pick a number, or say 'go' for #2.

Then it locks the tokens and builds the page using only those values.

## License

[MIT](LICENSE)
