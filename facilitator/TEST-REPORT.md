# TEST-REPORT — GTM Tech Week London kit (file-only trace)

Traced each morning prompt against the real files on 2026-06-23. Numbers computed directly from
the CSVs and the `.xlsx` (python/openpyxl). No data was edited — this is additive verification.

## Verdict: can the full morning run with ZERO connectors?
**YES.** Every prompt P0–P3 and UC1–UC3 is achievable file-only. All join keys resolve, every
file a prompt needs exists with the needed columns, and the stated outputs are derivable from
the files alone. No blockers found. Two design tensions the facilitator should know cold are
documented below (Clay on the do-not-approach list; the tracker discrepancies) — these are
intended texture, not bugs.

---

## PASS/FAIL per prompt

| Prompt | Result | Notes |
|---|---|---|
| **P0** repo-explainer artifact | **PASS** | `README.md`, `BUILD-REPORT.md`, `content-library/brand/kit.md` all present. Pure read → HTML build. |
| **P1** Custom Instructions | **PASS** | `README.md`, `connectors.config.json`, `data/SCHEMA-SOURCES.md` present. A ready-made `CLAUDE.md` now also ships at kit root. |
| **P2** load the spine | **PASS** | All three `attio_*` CSVs present with required columns. Known answers below. |
| **P3** call-prep + make skill | **PASS** | Calendar has 2 external calls; both have matching transcripts, email threads, CRM rows, and signals. Partial transcript handled by the skill. `skills/call-prep/SKILL.md` now ships. |
| **UC1** rank sponsors + speakers | **PASS** | `clay_table_sponsor-prospects.csv` (144), `apollo_people-export_speakers.csv` (117), both ICPs, `do-not-approach.csv` (12), `signals_feed.csv` (104) all present. See tension #1. |
| **UC2** lookalikes + anchor + keynote | **PASS** | `lookalike_features.csv` (144, scored, tiered), `account-deep-dive_ANCHOR.md` (Clay, real, cited), person-level signals present for the keynote pick. |
| **UC3** prospectus + speaker invite | **PASS** | `voice.md`, `sponsorship-prospectus.md`, `speaker-invite-email.md` present. `skills/sponsor-outreach/SKILL.md` now ships as the reference solution. |

---

## Known answers (precomputed — so you have them cold)

### P2 — the spine
- **Companies:** **230** rows (227 canonical + 3 planted duplicate variants).
- **Open sponsorship deals:** **33** (stages In Progress 13, Lead 10, Nurturing 6, Blocked 4),
  all GBP.
- **Total open sponsorship pipeline:** **£607,500** (GBP, open stages only).
- **Won sponsorship:** 6 deals — **£56,000 GBP** (CMS £28k, Transmission £28k) + **188,800 PLN**
  (the 4 Warsaw renewals: Woodpecker 81,600 · Brand24 45,900 · Surfer 23,000 · Livespace 38,300).
- **Open + Won GBP = £663,500** (this is the figure the stale tracker disagrees with).
- **Pipelines:** Sponsorship 42 deals · Speaker 18 deals (= 60 total).

**Data-quality issues Claude should flag (the planted texture):**
- **36 / 230 companies** missing Industry or Employee range (~15%).
- **3 duplicate companies** (domain variants): Cognism, Apollo, Clay.
- **4 PLN deals** mixed into an otherwise-GBP book (Warsaw renewals).
- **40 PL-located people** (Polish names, Warsaw orgs).
- Blank `Next step` on many Lead/Nurturing deals; `Blocked` deals have past close dates.

### P3 — tomorrow's two external calls (file-only resolves both)
1. **Clay — sponsorship intro** (Bruno Estrella, bruno@clay.com). Anchor account; 3 signals on
   `clay.com` (opened London office, raised round, hired Head of Demand Gen). Objection from the
   transcript: "generic booth isn't us" → answer: co-created GTM-engineering track + Clay Club
   London. Next step: send the one-page co-creation proposal, two dates at the top.
2. **Sam Jacobs (Pavilion) — keynote ask.** Tentative yes; keynote/community ONLY (Pavilion is
   on `do-not-approach.csv`). Angle: "the GTM operating model is being rewritten by AI." Next
   step: speaker brief + 2 dates + audience breakdown.
- **Partial transcript:** `granola_warsaw-debrief-transcript.md` (`transcript_status: partial`,
  real `[recording dropped]`/`[inaudible]` gaps). It is the internal Warsaw debrief, **not** one
  of tomorrow's calls, so call-prep won't depend on it — but if a participant pulls it, the skill
  flags figures near gaps as unconfirmed and does not infer through them.

### UC1 — ranking
- Source pools: **144** Clay sponsor prospects, **117** Apollo speakers (**109** join to
  `attio_people` on LinkedIn; 8 have no confirmed slug — realistic gap).
- **44 Tier-A** sponsor targets in `lookalike_features.csv`; **22** past Warsaw sponsors.
- **3 Tier-A companies are on `do-not-approach.csv`** and get excluded: **Clay, Gong, ZoomInfo.**
- **Top eligible sponsor targets after exclusion:** Transmission (95), Attio (90), 6sense (90),
  Cognism (88), Salesforge (87).

### UC2 — anchor + keynote
- **Clay** is the anchor; `account-deep-dive_ANCHOR.md` is fully real and cited ($3.1B, London
  office Mar 2026, Europe ~20% of revenue). Exactly **3** company signals on `clay.com`.
- **23 person-level signals** support the keynote "why now."
- Defensible keynote pick = **Sam Jacobs** (tentative-yes in transcript + thread; thesis match).

### UC3 — voice
- `voice.md` bans em-dashes, exclamation points, emoji, and 23 fluff words. Templates present.
- See tension #1 for who "#1 sponsor target" resolves to.

### Cross-cut — the date decision
- `competitor-events.csv` (19 events). **London June = 5+ High-clash events** (London Tech Week
  08 Jun, RevOpsAF Europe 11 Jun, Revenue Ops Festival / GTM Festival / Sales Enablement Festival
  all 18 Jun). **April = 0 London clashes.** → tentative **2027-04-21** is defensible. This also
  matches Bruno's "spring, not near Sculpt (8 Oct)" steer in the Clay transcript.

### The stale tracker — `sponsorship-tracker_WIP.xlsx`
Readable (openpyxl; valid OOXML; 1 sheet "Sponsors", 42 rows). Header banner says
*"last updated: 30/05/2026 — Krzysztof (⚠ not synced to Attio)."* The 4 planted discrepancies vs
`attio_deals.csv`, all confirmed:

1. **D1 STALE / MISSING WON** — Tracker last touched 30/05/2026. **Transmission** is **Won
   (£28k Platinum)** in the CRM but **absent from the tracker entirely** (verified: no
   Transmission row). Tracker reads rosier-but-incomplete vs the CRM's £663,500 open+won GBP.
2. **D2 WRONG STAGE** — **ChurnZero**: CRM = **Lost** (£28k Platinum). Tracker = **"Verbal yes
   🤞"** with note "said yes on the call!" and an optimistic close of 15/03/2027.
3. **D3 WRONG AMOUNT** — **Cremarc**: CRM = **£16,000 (Gold, In Progress)**. Tracker = **£25,000
   (Gold)**. £9k overstatement.
4. **D4 DOUBLE COUNT** — **Salesloft** appears **twice**: once "Salesloft" (Artur) and once
   "SalesLoft" (Krzysztof, note "dupe? check w/ Artur"), each £45,000 Headline. Double-counts one
   deal = £45k phantom pipeline.

The verify-then-trust beat: the tracker looks healthier and more advanced than the CRM, but it
is stale (missing the real Won), wrong on a stage (ChurnZero), wrong on an amount (Cremarc), and
double-counts (Salesloft). Trust the spine, not the hand-built file.

---

## Two design tensions the facilitator must know (intended, not bugs)

**Tension #1 — Clay is the #1 sponsor target AND on the do-not-approach list.**
- `lookalike_features.csv` scores Clay Tier A (top of the anchor set), and UC2/UC3 + the calendar
  all treat Clay as the hero sponsor conversation.
- BUT `do-not-approach.csv` lists Clay as *"Conflict — owns category event."* So if a participant
  runs UC1 literally ("exclude anyone in do-not-approach.csv"), **Clay drops out** and the #1
  *eligible* cold target becomes **Transmission**.
- This is the right teaching moment, not a contradiction: Clay is not a cold-pitch target, it is
  a **co-creation** target (the deep-dive and the Granola intro both say "co-create a track, not
  sell a booth"). The do-not-approach flag means *do not send the generic prospectus* — pitch
  partnership instead. Both the `sponsor-outreach` skill and `call-prep` skill surface this.
- **Facilitator call:** when UC3 says "draft a prospectus for our #1 sponsor target," decide
  up front whether to (a) use **Clay** and show the co-creation framing (richest, matches the
  whole narrative), or (b) use **Transmission** as the #1 *eligible cold* target. Recommended:
  use Clay and let Claude explain why the ask is co-creation, not a booth — that is the lesson.

**Tension #2 — Pavilion (Sam Jacobs's employer) is also on do-not-approach.**
- Pavilion is a competing-event organiser. The keynote ask is legitimate **as a keynote/community
  ask only**, never a sponsorship pitch. The transcript, thread, and both skills already enforce
  this. Make sure the room doesn't draft Pavilion a *sponsorship* — only a *speaker* invite.

---

## Fixes / additions made (all additive; nothing under `data/` touched)
- Created the two skills (`skills/call-prep/`, `skills/sponsor-outreach/`), the root `CLAUDE.md`
  and `QUICKSTART.md`, and the three `facilitator/` assets (this report, the pre-work email, the
  prompts one-pager). These were the only gaps; the data and brain/content layers were complete
  and internally consistent.
- No data corrections were needed. The `attio_deals.csv` ↔ tracker discrepancies and the
  Clay/Pavilion do-not-approach entries are deliberate texture and were left exactly as built.

## How these numbers were derived
Computed in the workspace from the mounted files: `attio_deals.csv` (stage/currency/value sums),
`attio_companies.csv` (counts, missing-firmographic %, Relationship tally), `lookalike_features.csv`
(tiers + exclusion against `do-not-approach.csv`), `signals_feed.csv` (Clay = 3 company signals,
23 person signals), `competitor-events.csv` (April vs June London clash), and
`sponsorship-tracker_WIP.xlsx` via openpyxl (the 4 discrepancies). Re-runnable; data is read-only.
