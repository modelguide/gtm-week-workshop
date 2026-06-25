# Facilitator answer-key

Known-good output for every step of `WORKSHOP.md`. Use it two ways:
- **Unblock a stuck participant** — show them the target file, or have them reset to the checkpoint and
  re-run the step's prompt.
- **Grade a finished brain** — diff the participant's `brain/` against these.

These files are **reference copies**. They are NOT shipped in `brain/` — the kit ships Phase-0 (empty
wiki) so participants build it themselves. Paths below mirror where the file should land in `brain/`.

## Checkpoint states (what `brain/` should contain after each step)

| After step | New in `brain/` | The teaching beat |
|---|---|---|
| 1 Ingest | `meetings/2026-06-18-clay-sponsorship-intro.md`, `companies/clay.md`, `people/bruno-estrella.md`, `index.md`, `log.md` | one source → five linked pages |
| 2 Query | `writing/clay-pitch-recommendation.md` (+ index/log) | answer = a page, every claim cited; **co-create, not a booth; Bruno first** |
| 3 Lint | `gaps.md` (+ log) | the tracker is stale: **ChurnZero, Cremarc, Salesloft, Transmission** |
| 4 Page shape | `clay.md` + `bruno-estrella.md` reshaped to fold; transcript inline on meeting page | compiled-truth above, timeline below |
| 5 Connector posture | `clay.md` gains `attio_company_id`, drops mirrored CRM state | mirror nothing live; preserve cited events |
| 6 Routers + dedup | `RESOLVER.md`, `SCHEMA.md`, `cognism.md`; `clay.md` aliases | **one Clay page, one Cognism page** (no `clay-labs.md`) |
| 7 Skill write-back | `work/call-prep_next-24h.md` + new Timeline lines on touched pages | every run writes the brain back |
| 8 Engine line | `agent/<date>-gbrain-readiness.md` | names the adoption trigger; stops before Postgres |

## Folder map
```
step-1-ingest/        the five Karpathy-light pages (the "before" shape)
step-2-query/         the filed-back recommendation
step-3-lint/          gaps.md with the four contradictions
step-4-pageshape/     bruno-estrella.md + meeting page in the gbrain fold
step-5-connector/     the clay.md frontmatter delta (note)
step-6-routers/       RESOLVER.md, SCHEMA.md, the mature clay.md, cognism.md
step-7-skill/         the write-back note + example Timeline lines
step-8-engine/        gbrain-readiness.md
```

## Two facts every contradiction/dedup check hinges on (verified against the data)
- **Step 3 (tracker vs CRM, `data/sponsorship-tracker_WIP.xlsx` vs `data/attio_deals.csv`):**
  ChurnZero = "Verbal yes 🤞" in tracker but **Lost** in CRM · Cremarc = **£25,000** tracker vs
  **£16,000** CRM · **SalesLoft** entered twice (casing variant) double-counting one £45,000 deal ·
  **Transmission** (£28,000, Won) is in the CRM but missing from the tracker. Trust the CRM.
- **Step 6 (dedup, `data/attio_companies.csv`):** `Clay`/clay.com = `Clay Labs`/clay.run (Clay's Record
  ID `208c93a7-381b-4965-ac04-2ea3584bff04`) · `Cognism`/cognism.com = `Cognism Ltd`/www.cognism.com.
  One page each; the variant goes in `aliases:`.
