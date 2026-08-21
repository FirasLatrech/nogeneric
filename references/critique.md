# Critique Mode

Use when the user shows existing UI (screenshot, URL, or code) and asks
"why does this look bad", "review my UI", "make this look better", or
"does this look AI-generated". Score first, then fix.

## Step 1 — Score (0–10 each, one line of evidence per score)

1. **Hierarchy** — cover the copy: can you still tell what matters most?
   Is there exactly one loudest element per screen?
2. **Contrast & accessibility** — body text ≥ 4.5:1, muted text still ≥ 4.5:1,
   visible focus states, real hover feedback.
3. **Spacing consistency** — do gaps come from one scale, or is it 13px here
   and 18px there? Is related content closer than unrelated content?
4. **Typography** — ≤ 2 families, a real scale (not 15/16/17px), line-height
   ~1.5 body / ~1.1 display, line length 45–75 characters.
5. **Color discipline** — one accent doing one job, or five colors fighting?
   Are grays warm/cool on purpose or default `#6B7280` everywhere?
6. **AI-look score** (10 = unmistakably custom, 0 = pure template). Deduct
   for each marker below.

## AI-look markers (each costs points)

- Purple/blue gradient anywhere
- Glassmorphism / backdrop-blur cards
- `rounded-2xl` + soft shadow on every box
- Centered hero, two buttons side by side, three feature cards below
- Inter/system font only, no display font
- Emoji as icons
- Lorem ipsum or placeholder-sounding copy ("Empower your workflow")
- Every element the same visual weight

## Step 2 — Report format

```
Hierarchy      6/10 — headline and card titles are the same size
Contrast       4/10 — muted gray #9CA3AF on white is 2.5:1, fails AA
Spacing        7/10 — mostly 8px scale, but hero uses 13px/18px one-offs
Typography     5/10 — Inter only; no display font, scale steps too close
Color          5/10 — 3 accent colors competing; none clearly primary
AI-look        3/10 — gradient hero + 3 identical cards + emoji icons

Top 3 fixes (biggest impact first):
1. ...
2. ...
3. ...
```

## Step 3 — Fix

- Any score ≤ 4 in contrast is fix #1, always (it's a defect, not taste).
- Top fixes must be token-level ("replace 5 grays with --fg/--fg-muted"),
  not cosmetic ("add more padding somewhere").
- If overall the design has no direction at all, say so and offer Phase 2
  (3 directions) instead of patching — restyling a directionless UI wastes
  the user's time.
- If the user only asked for a review, stop after the report. Build only
  when they ask.
