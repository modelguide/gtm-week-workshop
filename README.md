# GTM Tech Week London — dummy-data kit

> ### 👉 Doing the workshop? Start with **[WORKSHOP.md](WORKSHOP.md)**.
> A step-by-step lab (no coding, ~60 min) that walks you through building a self-updating "brain" from
> this kit, one paste-and-check step at a time. Everything below is reference for what's in the box.

A realistic "file drawer" for a GTM team launching the **London edition of GTM Tech Week**. You clone
it, then **connect or load**: if you have a connector (Attio, Clay, Apollo, Granola, …) you use live
data; if you do not, you load the matching file. Every connector here has a file that mirrors its real
export, so the two paths converge.

The companies and people are **real** (seeded from the actual Warsaw 2026 sponsors and speakers, then
expanded to London/UK lookalikes), so enrichment lights up live. The **pipeline, tickets, budget and
the stale tracker are synthetic** — nothing confidential is exposed.

## Get the kit
```bash
git clone https://github.com/modelguide/gtm-week-workshop
cd gtm-week-workshop
```
Or download the ZIP from the repo's green **Code** button → **Download ZIP**. No build step needed to
use it — the data is already generated under `data/`, `brain/` and `content-library/`.

## Connect or load
Open `connectors.config.json`. For each connector: **if its live MCP is connected in your session,
use it** (the file is then just the schema reference); **if not, load the file(s)**. It is per-connector,
not all-or-nothing — you might pull Attio live but load the Luma CSV.

- **Company join key:** `company_domain` (Attio `Domains` = Clay `Domain` = Apollo `Website` = lookalike/signals `company_domain`)
- **Person join key:** `person_linkedin_url` (Attio People `LinkedIn` = Apollo `Person Linkedin Url`)
- **The spine is the CRM** (`attio_*`). Everything else joins back to it on those two keys.

## What's in the box

### `data/` — the connector files
| File | Mirrors | One line |
|---|---|---|
| `attio_companies.csv` | Attio Companies export | The account spine: ~227 real orgs (Warsaw sponsors + London/UK prospects) + 3 planted duplicates. |
| `attio_people.csv` | Attio People export | 400 contacts: real speakers (`Past/Prospect Speaker`) + sponsor-side contacts. |
| `attio_deals.csv` | Attio Deals export | 60 deals across the sponsorship + speaker pipelines, with stages, GBP/PLN values, close dates. |
| `clay_table_sponsor-prospects.csv` | Clay table export | 144 sponsor prospects, thin firmographics to enrich live. |
| `apollo_people-export_speakers.csv` | Apollo People CSV (62 cols) | 117 real UK/EMEA GTM leaders as speaker candidates. |
| `lookalike_features.csv` | derived scoring model | Account-potential scores per sponsor company → tier + recommended package. |
| `signals_feed.csv` | derived signal feed | Recent "why now" triggers per company/person (raised, hired, opened London office…). |
| `do-not-approach.csv` | operator list | Competing events, conflicts, do-not-pitch accounts. |
| `competitor-events.csv` | operator research | 19 real B2B/GTM events with 2026 dates → the date-clash analysis. |
| `luma_ticket-sales.csv` | Luma guest CSV (real headers) | 120 ticket orders. Company spellings differ from CRM on purpose. |
| `marketing-spend_export.csv` | Supermetrics-style ad export | Channel spend; campaign names mismatch the CRM on purpose. |
| `sponsorship-tracker_WIP.xlsx` | hand-built Excel | **Deliberately stale & wrong** vs `attio_deals.csv`. The verify-then-trust beat. |
| `SCHEMA-SOURCES.md` | — | Where every column header came from, with sources + confidence. |

### `brain/` — context the GTM lead already has
ICPs (`icp_sponsor.md`, `icp_speaker.md`), the **anchor account deep-dive** (`account-deep-dive_ANCHOR.md`
— Clay, fully real), three Granola transcripts (one intentionally partial), two email threads, and
`calendar_next-24h.ics` (two external calls: a sponsor + a tier-1 speaker).

### `content-library/` — offers + content in the GTM Tech Week voice
Two past posts, the sponsorship prospectus, a speaker-invite email, a ticket-launch landing block, and
`brand/voice.md` + `brand/kit.md` (the voice rules and the off-white/acid-green palette).

## The four demos this supports
1. **UC1 — prospecting.** Rank a London **sponsor list** + **speaker shortlist**, write back to CRM.
2. **UC2 — account intel.** "Find 20 companies like our Warsaw sponsors," deep-dive the anchor (Clay),
   recommend a tier-1 keynote with the "why now."
3. **UC3 — offers + content.** A sponsorship prospectus and a personalised speaker invite, in voice.
4. **Cross-cut — decide.** Pick the **best London date** (clash analysis vs `competitor-events.csv`)
   and the **#1 keynote target**. Then build the **"London readiness" dashboard** from the three messy
   afternoon files. Each demo ends with "save it as a skill, then schedule it."

## Rebuild it
The data is generated deterministically (fixed seed → byte-identical reruns):
```bash
cd build && npm install && npm run gen     # or: npx tsx gen.ts
```
Real seed lives in `build/seed.ts` (companies) and `build/speakers.ts` (people). Synthetic pipeline,
tickets, spend and the stale tracker are generated in `build/gen.ts`. See `BUILD-REPORT.md` for the
full file list, counts, and the planted texture.
