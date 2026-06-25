# Step 5 — connector posture (the clay.md delta)

This step doesn't create a new file; it changes `brain/companies/clay.md`. Two things should happen:

**1. Frontmatter gains the Attio ID** (so the live CRM record is referenced, not copied):
```yaml
attio_company_id: 208c93a7-381b-4965-ac04-2ea3584bff04   # Clay's clay.com Record ID
```
(Verify against `data/attio_companies.csv` — the `clay.com` row's Record ID.)

**2. Mirrored live state is removed from the body.** If the participant copied a deal stage or deal
amount onto the page, it should be gone. Where the page needs current deal status it should say
something like "query Attio by `attio_company_id`" rather than hardcoding "In Progress / £45,000".

**What must NOT change:** the meeting transcript stays inline on the meeting page. Transcripts are
captured events (preserved); only live CRM state is queried, not stored.

The mature `clay.md` that reflects this (plus the Step 6 aliases) lives in `../step-6-routers/brain/companies/clay.md`.

The rule, in one line: **never mirror connector state; always preserve the event snapshots the brain cites.**
