---
title: "ICP — GTM Tech Week London"
type: strategy
strategy_kind: icp
scope: GTM Tech Week London 2027 (gtm-week.com)
created: 2026-06-26
updated: 2026-06-26
sources: [icp_sponsor.md, icp_speaker.md, sponsorship-prospectus.md]
status: active
---

The ideal customer for gtm-week.com is a company that **sells to (or services/funds) go-to-market operators** — sales, RevOps, demand gen, marketing, CS — has a **field-marketing or events budget**, and has a live reason to be in front of a UK/EMEA GTM audience *right now* [Source: data/context_from_claude_workshop/icp_sponsor.md]. Sponsorship is the revenue ICP (we sell it); the **audience** (founders, GTM leaders, operators who own a number and decide what their team buys) is what makes the room worth buying; **speakers** are a recruited supply ICP, not a sale. The hard gate is "sells to GTM." The brand rule — *not more AI SDR spam*, operator-reviewed, no pitch decks on stage — is itself a qualifier: the best-fit sponsors co-create, they don't buy a logo wall [Source: content-library/sponsorship-prospectus.md].

## State

### Primary ICP — sponsors (the revenue buyer)
One-line: a company that sells to GTM operators (or services/funds them) with an events budget and a "why now" to be in front of a UK/EMEA GTM audience [Source: data/context_from_claude_workshop/icp_sponsor.md].

Three sub-segments, all real in the data [Source: data/context_from_claude_workshop/icp_sponsor.md]:
1. **RevTech / GTM SaaS** — sales intelligence, enrichment, engagement, conversation intelligence, enablement, RevOps, CRM, ABM, intent, AI SDRs. The core (Cognism, [[clay]], Apollo, Gong, Outreach, Pigment, 11x, Common Room).
2. **GTM service providers** — agencies/consultancies selling outbound, demand gen, RevOps, GTM-engineering to the same buyer (Operatix, Sopro, Huble, Transmission).
3. **Investors** — VCs backing B2B SaaS who want logo presence and founder access (Notion Capital, Seedcamp, Dawn, Atomico).

**Firmographic fit** [Source: data/context_from_claude_workshop/icp_sponsor.md]:
- **Sells to GTM:** yes (hard gate).
- **UK/London presence:** London-HQ weights highest > confirmed London office > actively expanding to EMEA.
- **Size:** 11–50 up to 1K–5K is the sweet spot (budget exists, decision is fast). 5K+ = longer enterprise cycle; 1–10 = Startup/Community tier only.
- **Stage/capital:** recently funded or profitable-and-growing → events budget exists.

### The audience (why the room is worth buying)
Founders, GTM leaders and operators — sales, marketing, RevOps, growth — across UK and EMEA, people who own a number and decide what their team buys. First London edition is deliberately small: quality of room over size of room [Source: content-library/sponsorship-prospectus.md].

### Secondary ICP — speakers (recruited, not sold)
A recognised GTM voice (founder, CRO, CMO, VP Sales/Marketing, RevOps/GTM-engineering leader, or a sales/marketing creator) who actively talks about GTM, demand gen, RevOps or AI-in-GTM, and is UK/London-based or has strong UK/EMEA draw [Source: data/context_from_claude_workshop/icp_speaker.md]. This edition is light on UK/London keynote names, so weight the search toward UK-based A/B speakers [Source: data/context_from_claude_workshop/icp_speaker.md].

### Scoring → tier → offer
`lookalike_features.csv` scores six dimensions into `icp_fit_score` (0–99) → tier → package [Source: data/context_from_claude_workshop/icp_sponsor.md]; packages and prices are fixed (no "starting at") [Source: content-library/sponsorship-prospectus.md]:
- **A (75+)** → **Headline £45k / Platinum £28k.** Anchor accounts; co-create, don't sell a booth (esp. [[clay]]).
- **B (55–74)** → **Gold £16k / Silver £9k.** The volume of the roster.
- **C (<55)** → **Silver £9k / Side-event £7.5k / Startup–Community £4.5k.** Fast close.

## Why-now triggers (the signals I care about)
What `signals_feed.csv` watches; these are the buying triggers that move a fit account to "approach this quarter" [Source: data/context_from_claude_workshop/icp_sponsor.md]:
- **Opened or is scaling a London / EMEA office** — the single strongest trigger (see [[clay]]).
- **Raised a round** in the last ~12 months.
- **Hired a Head of Demand Gen / Field Marketing / first EMEA marketer** (see [[clay]]'s Lucia Romano hire).
- **Already sponsors GTM events** (Sculpt, SaaStock, Pavilion, RevOps Festival).
- **Leadership posting on AI + GTM** — warm, brand-led, likely to say yes to a stage.

Person-level (speaker) triggers [Source: data/context_from_claude_workshop/icp_speaker.md]: posting actively on AI+GTM; just shipped a notable GTM result; launched a book/podcast/community; London/UK-based or runs a UK community.

## Anti-ICP (do not pitch)
- **Runs a competing event** (Pavilion, SaaStock, HubSpot INBOUND, Dreamforce) → partner or cross-promote, do not pitch sponsorship [Source: data/context_from_claude_workshop/icp_sponsor.md].
- Already committed budget elsewhere this cycle; flagged-negative accounts (see `do-not-approach.csv`).
- Purely promotional speaker pitches that would turn the stage into "AI SDR spam" — the one thing the brand is against [Source: data/context_from_claude_workshop/icp_speaker.md].

## Open Threads
- Verify each "why now" against the CRM spine before approaching — a hand-built list can disagree with `attio_deals.csv` [Source: data/context_from_claude_workshop/icp_sponsor.md].
- Edition bias: under-weighted on UK/London keynote names — actively source UK A/B speakers [Source: data/context_from_claude_workshop/icp_speaker.md].

## Sources
- [Source: data/context_from_claude_workshop/icp_sponsor.md]
- [Source: data/context_from_claude_workshop/icp_speaker.md]
- [Source: content-library/sponsorship-prospectus.md]

## Related
- [[offer-gtm-week]] — the packages/prices each ICP tier maps to.
- [[clay]] — anchor A-tier account; the co-create-don't-sell-a-booth archetype.
- [[salesloft]] — Headline-tier (£45k) sponsor in the RevTech sub-segment.

---

## Timeline
- 2026-06-26 — ICP page created (Extend exercise): synthesised the sponsor + speaker ICP fixtures and the sponsorship prospectus into one owned strategy page [Source: User, 2026-06-26].
