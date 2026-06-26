# Facilitator answer-key

Known-good output for the workshop, captured from a **real compile run** (not hand-written), so it
matches exactly what the `compile` skill produces. Use it to unblock a stuck participant or to grade a
finished brain.

These are **reference copies** — they are NOT shipped in the live `brain/` (which starts empty in the
entity folders so participants build it themselves). Paths mirror where each file lands in `brain/`.

## `after-compile/` — the gold state after Beats 2–3

After the participant compiles the two Clay inbox items (the call transcript + the follow-up email), the
brain should match `after-compile/brain/`:

| File | What to check |
|---|---|
| `meetings/2026-06-18-clay-sponsorship-intro.md` | analysis above `---`, **full transcript inline below** |
| `sources/2026-06-20-clay-followup-email.md` | the email, moved here, `type: source`, immutable |
| `companies/clay.md` | compiled-truth + timeline; **two** timeline lines (06-18 + 06-20), every claim cited; **one** Clay page (the email updated it, didn't duplicate) |
| `people/bruno-estrella.md` | `company: [[clay]]`, cited, timeline |
| `index.md` / `log.md` / `gaps.md` | Clay/Bruno/meeting/source rows; one ingest log entry; Lucia Romano held as a gap (not a page) |

**Key teaching checks:**
- The transcript is **preserved inline** in `meetings/`, not deleted — "inbox emptied" = filed.
- **No page for Artur Wala or Krzysztof Pawlak** (our own team).
- **No page for Lucia Romano** — she's named once and not yet engaged, so she's an Open Thread + a
  `gaps.md` line (notability tie-breaker in `people/README.md`).
- The follow-up email **updated the existing Clay page** — one Clay page, two sources.

## Beat 3 — Ask / Check

- **Ask (→ `agent/`):** the saved recommendation lands in `brain/agent/clay-pitch-recommendation.md`
  (this brain has no `writing/`; a recommendation is an `agent/` deliverable). It should say **co-create,
  not a standard booth**, name **Bruno**, and cite every claim.
- **Check (lint):** comparing `data/sponsorship-tracker_WIP.xlsx` to `data/attio_deals.csv` surfaces the
  stale-tracker contradictions (ChurnZero Lost vs "verbal yes", Cremarc £16k vs £25k, Salesloft
  double-count, Transmission missing). They land in `gaps.md`. Trust the CRM.

## Beat 4 — Extend

After the participant adds a `deals/` rule to `RESOLVER.md` **above the company rule** (first-match-wins —
a deal is also about a company) and compiles `inbox/salesloft-deal-note.md`:
- a **`brain/deals/salesloft.md`** page appears in **`deals/`, not `companies/`** (the placement is the
  teaching point),
- it carries the £45k Headline terms and holds Aaron Lindqvist as a contact/thread (no premature person
  page),
- the brain obeyed a rule the participant wrote, *where they wrote it*. That's the learning-outcome
  climax — and the lesson is **order matters**.

> **Grading note:** if the deal page lands in `companies/salesloft.md`, the participant put the rule
> below the company rule. A page still appeared, so it can *look* right — check the folder. The fix is
> to move the deals rule above the company rule and re-compile.
