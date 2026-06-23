# Paste-prompts — one-pager (print this)

The exact prompts to paste, in order, with what each produces. Copied from the morning runbook.

---

## Connectors — when to go live (and when files are fine)
**Rule of thumb:** connectors only *change the answer* at **enrichment + research (UC1, UC2)** —
that's the one place files can't conjure new real data. Everywhere else they're convenience; the
whole day runs file-only.

| Step | Live connector (optional) | Files OK? | Why you'd connect |
|---|---|---|---|
| P0 explainer · P1 instructions | — | ✅ | nothing to connect |
| P2 load spine | Attio / HubSpot (CRM) | ✅ default | only helps if your CRM holds *this event's* data — the kit's doesn't, so use files (that's why your live Attio didn't match) |
| P3 meeting-prep | Calendar · Granola/Fireflies · Gmail · Attio | ✅ | live calendar + live call notes = real prep; else the kit's transcripts |
| **UC1 prospecting** | **★ Clay / Apollo / Folk** (enrichment) | ✅ (to-verify) | **the prime moment** — enrich the company to find the *real* contact + LinkedIn; file-only marks them `to-verify` |
| **UC2 account intel** | **★ Exa / Clay** (+ SimilarWeb) | ✅ | live web research + fresh signals; else `lookalike_features` + `signals_feed` + the anchor deep-dive |
| UC3 offers/content | — (Canva optional) | ✅ | voice + templates ship in the kit |
| Dashboard (PM) | Luma · Supermetrics | ✅ | live tickets/spend; else the kit's CSVs |

★ = the only two steps where connecting genuinely upgrades the result. If a participant has
nothing connected, they still complete every step.

---

## P0 · Get the kit + repo-explainer artifact
*Produces: a single-file HTML map of the whole kit — instant visual win in the first 8 minutes.*
```
Read README.md and BUILD-REPORT.md in this folder. Build me a single-file HTML
artifact that maps this kit: every file, what real tool it mirrors, and which use
case it feeds. Group by data/ , brain/ , content-library/. Make it skimmable — I
should understand my whole file drawer in 30 seconds. Use the palette in
content-library/brand/kit.md.
```

## P1 · Make it a Project + write Custom Instructions
*Produces: project rules the participant pastes into the Project's Custom Instructions field.*
```
Read README.md, connectors.config.json and data/SCHEMA-SOURCES.md. Write practical
Custom Instructions for this Project. Include: the purpose (GTM for the London
edition of GTM Tech Week), the trusted files and the spine (attio_* is the CRM,
everything joins on company_domain / person_linkedin_url), the connect-or-load rule,
what NOT to edit (the data/ files are the source of truth), and a house style: short,
operator-voice, no fluff. Keep it under one page.
```

## P2 · Make the spine queryable
*Produces: confirmed counts + flagged data-quality issues. Earns trust ("Claude notices the mess").*
```
Using the connect-or-load rule in connectors.config.json: load the CRM spine
(data/attio_companies.csv, attio_people.csv, attio_deals.csv). Confirm what you can
see — how many companies, how many open sponsorship deals, total open pipeline in
GBP — and flag any data-quality issues you notice.
```

## P3 · Run the motion, then make it a skill
*Produces: a one-page prep per call, then a saved `call-prep` skill + one test run (the hero).*
```
I have two external calls tomorrow (see brain/calendar_next-24h.ics). For each, pull
what we know from the CRM spine, the Granola transcripts and email-threads in brain/,
and the signals_feed. Produce a one-page prep: where the relationship stands, the
"why now", 3 questions, likely objections, and the next step.
```
```
That was useful and I'll want it every morning. Turn it into a skill called
"call-prep". Write the SKILL.md: the steps you just took, which files/connectors to
read, and the exact output format above. Then show me the skill and do one test run.
```

---

## UC1 · ICP search & prospecting
*Produces: a ranked sponsor + speaker shortlist, each with the right contact to reach (enriched, or flagged to-verify), written back to `work/target-board.csv`.*
```
We're filling the sponsor roster and speaker lineup for the London edition. From the
Warsaw seed (Relationship = Past Sponsor / Past Speaker) and the prospects in
clay_table_sponsor-prospects.csv and apollo_people-export_speakers.csv: rank the top 20
London/UK sponsor targets and the top 10 speaker targets against icp_sponsor.md and
icp_speaker.md. Exclude anyone in do-not-approach.csv and give the "why now" per target
from signals_feed.csv. For the top sponsor targets, find the right person to reach —
current Head of Demand Gen / Field Marketing / CMO + LinkedIn — by enriching the COMPANY
(use a connected enrichment tool if present; otherwise mark the contact to-verify; do not
trust the thin attio_people rows). Write the enriched board back to work/target-board.csv
(never edit data/) — and to a CRM list too if Attio is connected.
```

## UC2 · Account intel & lookalikes
*Produces: lookalike scores + the Clay anchor deep-dive + a tier-1 keynote recommendation.*
```
Score our past Warsaw sponsors in lookalike_features.csv, then find the 20 London/UK
companies that look most like our best ones. Then deep-dive our anchor account (see
brain/account-deep-dive_ANCHOR.md — Clay): are they a fit to sponsor London, and who is
the single best tier-1 keynote target, with the "why now"? Show your scoring.
```

## UC3 · Offers & content
*Produces: a tailored sponsorship prospectus + a personalised speaker invite, in voice.*
```
Read content-library/brand/voice.md first. Draft (1) a one-page sponsorship prospectus
for our #1 sponsor target from UC1, tailored to their "why now", and (2) a personalised
speaker-invite email to our keynote target from UC2. Match the GTM Tech Week voice
exactly — if a line could appear in a generic conference brochure, cut it.
```
*(In the kit, UC3 maps to the `sponsor-outreach` skill — the build-together reference solution.)*
