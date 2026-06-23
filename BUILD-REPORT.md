# BUILD-REPORT — GTM Tech Week London dummy-data kit

Built 2026-06-22 from `brain/projects/Claude_Workshop_GTM/gtm-tech-week-london-dummy-data-brief.md`.
Deterministic generator (`build/gen.ts`, fixed seed `0x4c4f4e44`) → byte-identical reruns. Real
companies/people seed; synthetic pipeline/tickets/spend. Schema provenance in `data/SCHEMA-SOURCES.md`.

## 1. File list + row counts

### `data/` (the connector files)
| File | Rows | Mirrors | Headers verified |
|---|--:|---|---|
| `attio_companies.csv` | 230 | Attio Companies export | live workspace (MCP) |
| `attio_people.csv` | 400 | Attio People export | live workspace (MCP) |
| `attio_deals.csv` | 60 | Attio Deals export | live workspace (MCP) |
| `clay_table_sponsor-prospects.csv` | 144 | Clay table export | convention (Clay has no fixed schema) |
| `apollo_people-export_speakers.csv` | 117 | Apollo People CSV (62 cols) | 3 real GitHub exports |
| `lookalike_features.csv` | 144 | derived account-potential model | n/a |
| `signals_feed.csv` | 104 | derived signal feed | n/a |
| `do-not-approach.csv` | 12 | operator list | n/a |
| `competitor-events.csv` | 19 | operator research (real 2026 dates) | n/a |
| `luma_ticket-sales.csv` | 120 | Luma guest CSV | 4 real GitHub exports (BOM, snake_case) |
| `marketing-spend_export.csv` | 64 | Supermetrics-style ad export | convention |
| `sponsorship-tracker_WIP.xlsx` | 42 (incl. headers) | hand-built Excel | real OOXML (valid in Excel/Sheets/Numbers) |
| `SCHEMA-SOURCES.md` | — | schema provenance | — |

### `brain/`
`icp_sponsor.md`, `icp_speaker.md`, `account-deep-dive_ANCHOR.md` (Clay — fully real, cited),
`granola_clay-sponsor-intro-transcript.md`, `granola_keynote-target-call-transcript.md`,
`granola_warsaw-debrief-transcript.md` (partial), `email-threads/clay-sponsorship-thread.md`,
`email-threads/keynote-sam-jacobs-thread.md`, `calendar_next-24h.ics`.

### `content-library/`
`post_1_gtm-is-engineering.md`, `post_2_not-more-ai-sdr-spam.md`, `sponsorship-prospectus.md`,
`speaker-invite-email.md`, `ticket-launch-landing-block.md`, `brand/voice.md`, `brand/kit.md`.

### root
`README.md`, `connectors.config.json` (the connect-or-load switch), `BUILD-REPORT.md`, `build/`
(self-reproducing generator: `seed.ts`, `speakers.ts`, `gen.ts`, `xlsx.ts`, `package.json`).

## 2. Synthetic / real split
- **Real (web-verified 2026-06-22):** every company (domain) and every named speaker (LinkedIn slug
  where confirmable). Seed = the actual Warsaw 2026 roster + London/UK/EMEA lookalikes. Competitor
  events + their 2026 dates are real. The Clay deep-dive is real and cited.
- **Synthetic:** all pipeline (deals, stages, amounts, close dates), tickets, marketing spend, the
  stale tracker, and the sponsor-side contacts (formulaic `firstname@domain` emails, no phones, no
  fabricated LinkedIn — realistic enrichment-guess rows, exactly what an Apollo/Clay import looks like).

## 3. The spine + join verification (every key resolves; 0 orphans)
Spine = `attio_*`. Join keys: **`company_domain`** and **`person_linkedin_url`**.
```
clay → companies (domain):        0 orphans
lookalike → companies (domain):   0 orphans
signals → companies (domain):     0 orphans
deals → companies (name):         0 orphans
apollo → people (linkedin):       109 / 117 join  (8 speakers have no confirmed slug → intentionally
                                                   don't join; realistic CRM gap, not an orphan)
luma → CRM:                       intentional name-mismatch (see §5) — the only non-resolving join, by design
```

## 4. Use-case spot-checks (one query each — all pass)
- **UC1 sponsor list:** 44 tier-A sponsor targets in `lookalike_features.csv`, all resolve to `attio_companies`.
- **UC1 speaker shortlist:** 100 "Speaker Prospects - London 2027" in Apollo, 95 join to `attio_people` on LinkedIn.
- **UC2 lookalikes:** 22 `is_past_sponsor=true` seed rows + 111 prospect lookalikes scored tier A/B.
- **UC2 anchor + keynote:** `clay.com` present with 3 real signals; 23 person-level "why now" signals (all join to people).
- **Cross-cut date:** London **June** has 5 high-clash events (London Tech Week, RevOps/GTM/Enablement festivals, RevOpsAF); **April has 0** → tentative **2027-04-21** is defensible.
- **Dashboard "shitty data":** 56/56 Luma sponsor-company answers need mapping to the CRM (100%, human-recoverable); tracker disagrees with the spine (§6).

## 5. Planted texture (the deliberate messes — §9 of the brief)
| Texture | Where | Measured |
|---|---|---|
| ~15% missing firmographics | `attio_companies.csv` (blank Industry + Employee range) | 33 / 227 = **14.5%** |
| 2–3 duplicate companies (domain variants) | `attio_companies.csv` | **3**: `Cognism Ltd`/www.cognism.com, `Apollo`/apollo.com, `Clay Labs`/clay.run |
| PL/EN mixed rows | people + companies | **40** PL-located people (Polish names), all Polish Warsaw orgs |
| Deprecated/empty columns left null | `attio_*` interaction + `Connection strength (legacy)` cols | mostly blank (as real exports) |
| PLN/GBP currency mix | `attio_deals.csv` | **4** PLN Warsaw-renewal deals; rest GBP |
| Luma/spend name spellings ≠ CRM | `luma_ticket-sales.csv`, `marketing-spend_export.csv` | **100%** of sponsor-buyer Luma rows; account name spelled 3 ways |
| Blank next steps + stale close dates | `attio_deals.csv` | blank `Next step` on many Lead/Nurturing; `Blocked` deals have close dates already in the past |
| Partial/garbled transcript | `brain/granola_warsaw-debrief-transcript.md` | `transcript_status: partial`, real `[recording dropped]` gaps |

## 6. The stale tracker — 4 planted discrepancies (verify-then-trust beat)
`sponsorship-tracker_WIP.xlsx` is the GTM lead's hand-built Excel, deliberately stale & wrong vs
`attio_deals.csv`. It reads **rosier than reality** (a realistic failure mode):

1. **D1 STALE** — last updated 2026-05-30 (3+ weeks behind). Missing the Won deal(s) signed since (e.g. **Transmission**). Tracker pipeline ~£717,500 vs CRM open+won GBP ~£663,500.
2. **D2 WRONG STAGE** — **ChurnZero** is `Lost` in the CRM but shows **"Verbal yes 🤞"** in the tracker.
3. **D3 WRONG AMOUNT** — **Cremarc** shows **£25,000** in the tracker but **£16,000 (Gold)** in the CRM.
4. **D4 DOUBLE COUNT** — **Salesloft** entered twice (once as a casing variant "SalesLoft"), double-counting one £45,000 deal.

(Exact names are deterministic; rerun `build/gen.ts` to reprint them. The Cognism domain-duplicate lives separately in `attio_companies.csv` as the dedup lesson there.)

## 7. Pipeline economics (synthetic, internally consistent)
- **Currency:** GBP (London). Deal stages → amounts → close dates are consistent: `Won` close dates are in the recent past; `In Progress`/`Lead`/`Nurturing` are future (Q4'26–Q2'27); `Blocked` are stale (past); `Lost` are closed-past.
- **Tiers:** Headline £45k · Platinum £28k · Gold £16k · Silver £9k · Side-event £7.5k · Startup £4.5k. Bigger companies → richer packages.
- **Stage mix:** Won 10 · In Progress 19 · Lead 15 · Nurturing 8 · Blocked 4 · Lost 4 (pipeline-heavy, as expected ~10 months out).
- **Speaker pipeline:** recruit-not-sell — values mostly £0 (a few tier-A honoraria).

## 8. §10 open questions — resolved
1. **Schemas** — verified (live Attio MCP; Apollo + Luma against real GitHub exports; HubSpot/Clay/Granola from docs/convention). See `SCHEMA-SOURCES.md`.
2. **Currency = GBP** for London (default applied); **4 PLN** Warsaw-renewal deals provide the PLN/GBP texture.
3. **Anchor account = Clay** (default applied; Woodpecker fallback not needed). Fully-real deep-dive at `brain/account-deep-dive_ANCHOR.md`.
4. **Layout** — flat `data/` + `brain/` + `content-library/`, reusing the Marshall-kit pattern; self-reproducing `build/`.
5. **Connection layer** — `connectors.config.json`: per-connector connect-or-load (not all-or-nothing).

## 9. Deviations from the brief (flagged, with reasons)
1. **Company count 227 canonical (+3 dup) vs "~180".** The brief's ~180 refers to sponsor-side orgs; that set (organizers + past sponsors + prospects) is **144**. The extra **83** are real speakers' employers, included so every `attio_people → Company` reference resolves (the no-orphans spine rule). Net: 144 sponsor-side + 83 speaker-employer = 227.
2. **Currency representation.** The live Attio Deals object is USD-typed; we represent currency via a custom **`Currency`** column (GBP/PLN) so the London scenario + PLN renewals read correctly. Flagged as a deliberate, realistic choice.
3. **Custom Attio columns appended after the standard set** (companies: `Industry, Relationship, GTM segment, Owner`; people: `Relationship, Speaker topic, Owner`; deals: `Pipeline, Close date, Next step, Currency, Sponsorship tier`). Standard columns are verbatim-first; customs follow — exactly how real workspace exports look. `Close date`/`Next step` are not Attio defaults, hence custom. `Relationship` carries the `Past Sponsor`/`Past Speaker` tags the brief asks for.
4. **Apollo = 117 (vs ~120)**, of which 109 join on LinkedIn; the 8 non-joining rows are speakers whose slug couldn't be confirmed (left blank, never guessed) — realistic enrichment gap.
5. **`competitor-events.csv` lives in `data/`** (it is a CSV) though the brief lists it under UC3; it powers the cross-cut date-clash analysis.
6. **`.xlsx` written by a custom minimal OOXML writer** (`build/xlsx.ts`, zipped via the system `zip`) — no npm dependency. Validated: opens in Excel/Numbers/Google Sheets (`file` → "Microsoft Excel 2007+"; zip+XML parse clean).
7. **Event date 2027-04-21 is tentative**, surfaced as the cross-cut decision (April = 0 London clashes). The kit is pre-decision by design.

## 10. Reproduce
```bash
cd build && npm install && npm run gen      # or: npx tsx gen.ts
```
Fixed seed → byte-identical output (verified: CSV checksum identical across reruns). Edit real seed in
`build/seed.ts` / `build/speakers.ts`; synthetic logic in `build/gen.ts`.
