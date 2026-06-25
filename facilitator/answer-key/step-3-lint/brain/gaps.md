# Gaps — contradictions, open questions, research leads

## Contradictions

- [contradiction] **ChurnZero** deal stage: hand-built tracker says "Verbal yes 🤞 / said yes on the
  call" but the CRM says **Lost**. Trust the CRM. [Source: sponsorship-tracker_WIP.xlsx vs attio_deals.csv]
- [contradiction] **Cremarc** deal value: tracker says **£25,000**, CRM says **£16,000** (Gold tier).
  Trust the CRM. [Source: sponsorship-tracker_WIP.xlsx vs attio_deals.csv]
- [contradiction] **Salesloft** double-counted: the tracker lists it twice ("Salesloft" and a casing
  variant "SalesLoft", flagged "dupe? check w/ Artur"), double-counting one £45,000 Headline deal. The
  CRM has it once. [Source: sponsorship-tracker_WIP.xlsx vs attio_deals.csv]
- [contradiction] **Transmission** missing from tracker: the CRM has a **Won** Transmission deal
  (£28,000, Platinum) signed after the tracker's last update (2026-05-30). The tracker omits it, so it
  reads rosier-but-incomplete. Trust the CRM. [Source: attio_deals.csv vs sponsorship-tracker_WIP.xlsx]

Also expected (emergent, not planted — the tracker is an incomplete hand-built list, so other CRM deals
are simply absent from it). Claude is correct to surface these; don't mark a participant wrong for it:
- [contradiction] **LocalGlobe** present in CRM (Lost, £9,000) but missing from the tracker. [Source: attio_deals.csv vs sponsorship-tracker_WIP.xlsx]
- [contradiction] **Cognism** present in CRM (Lost, £45,000) but missing from the tracker. [Source: attio_deals.csv vs sponsorship-tracker_WIP.xlsx]

> Net: `sponsorship-tracker_WIP.xlsx` is stale (last updated 2026-05-30, "not synced to Attio"). The CRM
> (`data/attio_deals.csv`) is the system of record. Reconcile the tracker or retire it. The **four** rows
> at the top are the designed teaching beats (wrong stage, wrong amount, double-count, missing-Won); the
> rest are real but emergent. Grading: a participant who finds the top four has passed.
