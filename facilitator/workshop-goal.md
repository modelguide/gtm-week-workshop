# Workshop goal + acceptance checklist

The bar the workshop must clear. **The dry-run passing is necessary but not sufficient** — the scaffold
working ≠ the workshop achieving its goal. Both must pass.

## The goal

> By the end of the workshop, a **non-technical participant has a basic working brain that they
> understand enough to operate and lightly extend.**

They can:
1. **Explain the loop:** inbox → compile → meetings/sources/entities → index/log/gaps.
2. **Run compile** on a raw inbox item and see pages created.
3. **Verify** raw material was preserved, not deleted.
4. **Ask a sourced question** and save Claude's answer.
5. **Run one check/lint** against stale data.
6. **Add or modify one routing rule** and see the brain obey.

## Check 1 — Mechanical dry-run (does the scaffold work?)

Fresh scratch copy → run compile → assert:
- [x] expected files exist (`meetings/<date>-clay…`, `sources/<date>-clay-followup…`, `companies/clay.md`, `people/bruno-estrella.md`)
- [x] inbox processed (only `README.md` remains)
- [x] transcript preserved **inline** below the `---` fold on the meeting page
- [x] non-meeting raw preserved in `sources/` (immutable)
- [x] citations present on every claim (`[Source: ...]`)
- [x] `index.md` + `log.md` updated; `gaps.md` gets open questions
- [x] 2nd item **updates** Clay (no duplicate page) — dedup-on-update
- [x] no page for our own team (Artur / Krzysztof)

*Status: PASS (validated 2026-06-26 via scratch compile).*

## Check 2 — Agenda fit (is the lab runnable by a non-technical person in ~60 min?)

Walk the lab as a participant and confirm:
- [x] no hidden terminal assumptions — Step 4's `.xlsx` repair prompt now carries the inline-string
      parse hint so Claude recovers from a blank-column read
- [x] every step produces a visible artifact — *except* Steps 1 (Meet) and 2b (Confirm), which are
      intentional understand/verify beats (chat output, then you look at files); all build steps create
      files
- [x] no exercise depends on unstated context — Step 6 now states the **rule-ordering** requirement
      explicitly (deals rule above the company rule; first-match-wins), so the climax can't silently
      misfile
- [x] each step follows the pattern: What you're doing → Paste this → You should see → Check → If it
      looks off → What you learned
- [x] total steps fit ~60 minutes (6 steps + 2 short verify beats)
- [x] the human script (`WORKSHOP.md`) and the agent docs (brain scaffold) stay **separate layers**

*Status: PASS after fixes (validated 2026-06-26 by running the full lab on a fresh scratch copy).*

## Check 3 — Learning outcome (did they learn to operate + extend?)

At the end, the participant can point to:
- [ ] **`RESOLVER.md`** — where things go
- [ ] a **folder `README.md`** — a local rule
- [ ] **`SCHEMA.md`** — the page shape
- [ ] the **`compile` skill** — how the loop runs
- [ ] **one rule they modified** that changed the brain's behavior

And can explain the loop (capability #1) in their own words.

## The two layers (don't mix them)

- **`WORKSHOP.md` = the human operating script:** short, operational, pasteable, file-visible, repairable.
  Lives at the kit root, outside `brain/`.
- **Brain docs (`CLAUDE.md`, `RESOLVER.md`, `SCHEMA.md`, folder READMEs, `compile`) = the agent OS:**
  precise, rule-heavy, notability-aware, citation-aware, dedup-aware. Participants don't read these
  cover-to-cover; they ask Claude to explain them, then verify behavior by looking at files.
