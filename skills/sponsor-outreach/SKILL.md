---
name: sponsor-outreach
description: |
  Draft sponsorship and speaker outreach in the GTM Tech Week voice. Produces (1) a tailored
  one-page sponsorship prospectus for a named sponsor target and (2) a personalised
  speaker-invite email for a named keynote target. Reads the brand voice rules first and obeys
  the banned-words/anti-fluff list, pulls each target's "why now" from the signals feed and
  lookalike scores, and uses the content-library templates as structure. File-only by default.
allowed-tools: [Read, Write, Edit, Grep, Glob]
triggers:
  - draft a sponsorship prospectus
  - write a sponsor outreach
  - draft a speaker invite
  - sponsor outreach for
  - keynote invite for
---

## IMPORTANT — read the voice file first, every time
Before writing a single public-facing line, read `content-library/brand/voice.md` and obey it.
This is the anti-slop guard:
- **No em-dashes.** Use a period or a comma. (This is the one mechanical tell.)
- **No exclamation points. No emoji in body copy.**
- **Banned words:** synergy, leverage, unlock, empower, thought leadership, cutting-edge,
  world-class, revolutionary, game-changing, next-gen, supercharge, seamless, holistic,
  ecosystem of solutions, journey, "experience" (as a noun for the event), transform your
  business, reimagine, elevate, AI-powered (as hype), best-in-class, turnkey, frictionless.
- **Problem first, not product first. Short declaratives. Real numbers with the symbol.**
- If a line could appear in a generic conference brochure, cut it.
Run a final pass against the banned list before you hand anything over.

## Connect-or-load (connectors.config.json)
File-only by default. Use live connectors if present:
- **Signals / why-now:** Exa live if connected, else `data/signals_feed.csv`.
- **Scoring / tier:** `data/lookalike_features.csv` (derived; no live equivalent).
- **CRM context:** Attio live if connected, else `data/attio_companies.csv` + `attio_deals.csv`.
- **Templates + brand:** always `content-library/` (voice.md, sponsorship-prospectus.md,
  speaker-invite-email.md, kit.md). Do NOT edit `data/`.

## Workflow

### A) Sponsorship prospectus (one named sponsor target)
1. Read `content-library/brand/voice.md`, then `content-library/sponsorship-prospectus.md`
   (the structural template: room → why-us → packages → how-we-work → ask).
2. Look up the target in `lookalike_features.csv` (tier + `recommended_package` + rationale)
   and `attio_companies.csv` (firmographics, relationship). Check `do-not-approach.csv`:
   if the target is listed (e.g. a competing-event organiser or a category-owner like Clay),
   adjust the ask — **co-create, do not sell a generic booth** — and say so.
3. Pull the target's "why now" from `signals_feed.csv` (filter on `company_domain`).
4. Fill the prospectus: keep the standard packages table, but tailor the opening line and the
   "how we work with the best sponsors" section to this target's why-now and recommended tier.
   Name the real mechanism (curated track, Club tie-in), not a benefit adjective.

### B) Speaker-invite email (one named keynote target)
1. Read `content-library/speaker-invite-email.md` (template: trigger → angle → it's-an-invite →
   room → one ask, under ~140 words).
2. Pull the person's why-now from `signals_feed.csv` (filter on `person_linkedin_url`) and any
   role context from `attio_people.csv` / `apollo_people-export_speakers.csv`.
3. Fill `{{first}}, {{trigger}}, {{angle}}`. One real trigger, one angle, one small ask.
   If the person's employer is on `do-not-approach.csv` as a competing-event organiser
   (e.g. Pavilion), this is a **keynote/community ask only**, never a sponsorship pitch. Say so.
4. Keep it under ~140 words. No fabricated quotes, no invented results.

## Never fabricate
Real people and companies only. Do not invent email addresses, phone numbers, LinkedIn URLs,
funding figures, or quotes. If a why-now is thin, write fewer, truer lines — do not pad.

## Worked targets in this kit (file-only)
- **#1 sponsor target = Clay** (anchor; lookalike tier A; why-now = opened London office +
  raised round + hired Head of Demand Gen). Pitch **co-creation** (GTM-engineering track +
  Clay Club London), not a booth — Clay is on `do-not-approach.csv` as a category-owner, and
  the Granola intro confirms "the generic booth thing isn't us." Headline/Platinum framing.
- **Keynote target = Sam Jacobs (Pavilion).** Tentative yes from the transcript. Angle: "the
  GTM operating model is being rewritten by AI." Keynote/community ask ONLY (Pavilion is a
  competing-event organiser on `do-not-approach.csv`).

## Self-check
- [ ] voice.md read first; output passes the banned-words sweep; zero em-dashes/exclamations.
- [ ] why-now pulled from signals_feed (not invented).
- [ ] do-not-approach checked; ask adjusted (Clay = co-create; Pavilion = keynote-only).
- [ ] prospectus ≤ one page; speaker email ≤ ~140 words.
- [ ] no fabricated contact details, quotes, or numbers.
