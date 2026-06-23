# GTM Tech Week London — Project instructions

Read this first. It is the router for everything in this kit.

## Purpose
This is the GTM file drawer for launching the **London edition of GTM Tech Week** (tentative
date 2027-04-21, currency GBP). The work is real GTM work for that launch: find sponsors,
recruit speakers, sell tickets, pick the date. The companies and people are real (seeded from
the actual Warsaw 2026 roster, expanded to London/UK lookalikes); the pipeline, tickets, budget
and the stale tracker are synthetic.

## The spine and the join keys
The **CRM is the spine**: `data/attio_companies.csv` + `data/attio_people.csv` +
`data/attio_deals.csv`. Everything else joins back to it on two keys:
- **Company:** `company_domain` — Attio `Domains` = Clay `Domain` = Apollo `Website` =
  lookalike/signals `company_domain`.
- **Person:** `person_linkedin_url` — Attio People `LinkedIn` = Apollo `Person Linkedin Url` =
  signals `person_linkedin_url`.

When you load or query data, treat the `attio_*` files as authoritative and derive the rest.

## Finding contacts (enrichment)
`attio_people.csv` is deliberately thin on the sponsor side: ~109 rows are real people with a
verified LinkedIn (the speakers); the rest are placeholder `to-verify` sponsor contacts
(plausible name + `firstname@domain`, no LinkedIn) — do **not** present them as confirmed or
draft outreach to them. To reach a target company, **enrich the company to find the current
decision-maker** (Head of Demand Gen / Field Marketing / CMO) and their LinkedIn: live via a
connected enrichment tool (Clay / Apollo / Folk) if present, otherwise mark the contact
`to-verify`. The motion is **company → find the person** — never trust the thin rows.

## File-first, connect-optional
Read `connectors.config.json` — it is the switch. For each connector, **per-connector**:
- If its live MCP server is connected in this session, use it live and treat the file as the
  schema reference.
- If it is not connected, load the matching file(s). That is the normal case.

A participant with **no connectors does nothing special** — the CSVs and brain files are the
source of truth and the whole morning runs from them. **Never edit anything under `data/`.**
The data is generated deterministically; treat it as read-only. Write every output (enriched
lists, the target board, dashboards) to a **`work/`** folder (create it if needed) — never back
into `data/`. `data/` is the immutable source of truth; `work/` is where the participant's
results persist, so a data viewer can **reload** `data/` + `work/` and show the enriched state.

## Where things live
- `data/` — the connector files (CRM spine, Clay/Apollo prospects, lookalike scores, signals
  feed, competitor events, do-not-approach, Luma tickets, ad spend, the stale Excel tracker).
  `data/SCHEMA-SOURCES.md` documents every column's provenance.
- `brain/` — context the GTM lead already has: the two ICPs (`icp_sponsor.md`,
  `icp_speaker.md`), the anchor deep-dive (`account-deep-dive_ANCHOR.md` = Clay, fully real),
  three Granola transcripts (one is intentionally partial — handle gracefully), two email
  threads, and `calendar_next-24h.ics` (two external calls: a sponsor + a tier-1 speaker).
- `content-library/` — offers and content in the house voice: two past posts, the sponsorship
  prospectus, the speaker-invite email, the ticket-launch block, plus `brand/voice.md` and
  `brand/kit.md` (palette: off-white `#fefaef`, black, acid-green `#b8ff03`, magenta `#fc3dd5`).
- `skills/` — reusable workflows (see below).

## Skills
Two reference skills ship in `skills/`:
- **`skills/call-prep/SKILL.md`** — one-page brief per external call in the next 24h. The
  "install one" example for Part III.
- **`skills/sponsor-outreach/SKILL.md`** — drafts a tailored sponsorship prospectus and a
  personalised speaker invite, in voice. The "build together" reference solution for UC3.
- **`skills/workflow-audit/SKILL.md`** — an evidence-bound diagnostic of how you actually work;
  reads a project's history, finds the repeating motions, and names the one worth automating
  first. The "what should I build?" discovery for Build Time. Point it at a project with real
  history (your own work), not this kit.

To install a skill in Cowork: open the kit as a Project, then point the skill loader at the
`skills/` folder (or paste the SKILL.md into skill-creator and save). To run one, just ask in
plain language — the `triggers` in each SKILL.md tell Claude when to fire it.

## House voice (mandatory before anything public)
Before writing any sponsor copy, speaker invite, post, or landing block, **read
`content-library/brand/voice.md`** and obey it. Hard rules: no em-dashes, no exclamation points,
no emoji in body copy, real numbers with the symbol, problem-first not product-first. There is a
banned-words list (synergy, leverage, unlock, seamless, world-class, etc.). If a line could
appear in a generic conference brochure, cut it. The voice is the product.

## How we work
Short, operator voice, no fluff. Cite where facts come from. Leave blanks blank — never
fabricate a title, email, funding figure, or quote. Verify against the spine before you trust a
hand-built file (the `sponsorship-tracker_WIP.xlsx` disagrees with the CRM on purpose).
