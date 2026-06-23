# UC1 — ICP search & prospecting · run script (11:00–11:45)

**What we build:** the "London target board" — a scored, ranked sponsor list (deep) + a
speaker shortlist (light), filtered through the ICP and the do-not-approach guardrail.
**Mode:** file-only for everyone; live CRM writeback demoed on the presenter machine.

---

## What you need to know BEFORE (have these cold)
Run UC1 once yourself, file-only, before the day. The answers you should not be surprised by:
- **44 Tier-A** sponsor candidates; **22** are past Warsaw sponsors (the warm/renewal seed).
- **Top eligible cold targets:** Transmission 95 · Attio 90 · 6sense 90 · Cognism 88 ·
  Strategic IC 85 · Earnest 84 · Synthesia 83 · Gravity Global 82.
- **3 auto-excluded by `do-not-approach.csv`:** Clay, Gong, ZoomInfo (they run competing events).
- **Speakers:** 53 of 117 Apollo candidates are UK/London (Cognism bench, Userpilot, Brand24…).
  The keynote pick (Sam Jacobs / Pavilion) is a UC2 output — don't pre-empt it here.
- **The money beat:** Clay scores #1 on fit *and* is excluded. That's the lesson, not a bug.
- **Join keys:** company on `company_domain`, person on `person_linkedin_url`. Everything
  resolves file-only; writeback needs Attio connected.
- **Why-now lives in** `signals_feed.csv`; the filter lives in `brain/icp_sponsor.md`.

## How to run it — beat by beat

### 0 · Frame (≈2 min)
SAY: "We're filling the London sponsor roster and speaker lineup. We have a pile of prospects
and zero time. Let Claude rank them against who we actually want — and respect the landmines."

### 1 · Rank the sponsors (≈12 min)  — the core build
SAY: "First the filter, then the ranking. The ICP is the filter; the 'why now' is the rank."
PASTE:
```
Read brain/icp_sponsor.md — that's the filter. Score every company in
data/clay_table_sponsor-prospects.csv and data/lookalike_features.csv against it. Exclude
anything in data/do-not-approach.csv. For the top 20, give me: company, fit score, tier,
recommended package, and the strongest "why now" from data/signals_feed.csv. Show it as a
ranked table, best first.
```
EXPECT: the table above (Transmission 95 → …). NARRATE while it runs: "notice it's not
guessing — it's scoring against our written ICP and pulling a real trigger per company."

### 2 · The judgment beat (≈5 min) — do not skip
SAY: "Who's missing from the top?" → Clay. "Clay is our single best fit. Why isn't it #1?"
DO: open `do-not-approach.csv`, show the Clay row ("runs Sculpt + Clay Clubs — co-create, don't
pitch"). LAND: "AI ranked it; the rule overrode it. That's the whole game — the data has
judgment baked in. Clay becomes a co-create conversation, which we'll draft in UC3."
OPTIONAL PASTE:
```
Show me the top targets you excluded and why, and for Clay specifically, propose a co-create
angle instead of a sponsorship pitch.
```

### 3 · Rank the speakers (≈10 min) — lighter
PASTE:
```
Now the speakers. Read brain/icp_speaker.md. From data/apollo_people-export_speakers.csv, give
me the top 10 UK/London speaker targets: name, title, company, the topic they'd own, and any
"why now" from signals_feed.csv. Skip anyone whose company is in do-not-approach.csv.
```
EXPECT: Cognism leaders, Userpilot, Brand24, etc. NARRATE: same filter-then-rank move, people
instead of companies, joined on LinkedIn URL.

### 4 · Save the board (≈8 min)
DEFAULT (everyone, file-only):
```
Save the sponsor and speaker shortlists as target-board.csv with columns:
type, name, fit_score, tier_or_topic, why_now, status=To approach. Then show me the file.
```
DEMO (your machine, if Attio connected): "watch it write straight back to the CRM as a new
list" — run the same but "…create a list 'London 2027 — to approach' in Attio and add these."
SAY: "file or CRM — same motion. Connect-or-load, exactly like this morning."

### 5 · They touch it + close (≈8 min)
THEY DO: each person re-runs with one tweak of their own — change the ICP weighting, widen to
Tier B, or filter to a sub-segment (RevTech vs agencies vs VCs).
CLOSE → UC2: "We have a ranked list. Next: go deep on the best ones, find more like them, and
pick our keynote." (If time: "save this as a `find-sponsors` skill" — else flag for Build Time.)

## If it stalls (recovery)
- Claude over-includes / ignores the exclusion → "re-check every row against do-not-approach.csv
  and remove matches; show me what you removed." (This *is* the lesson — narrate it.)
- Numbers look off → it's reading the file; open `lookalike_features.csv` and show the
  `icp_fit_score` column. Don't debate the synthetic scores, debate the *method*.
- Running long → cut step 5 (they-touch-it) into Build Time; never cut the judgment beat (step 2).

## What "good" looks like
- A ranked, tiered sponsor table with a real "why now" per row.
- Clay visibly excluded — and at least one person reacts to *why*.
- A saved `target-board.csv` (or a CRM list on your machine) they could send outreach from tomorrow.
