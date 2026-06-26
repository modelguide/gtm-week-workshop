---
name: call-prep
description: |
  Prepare a one-page brief for each of tomorrow's external calls. Reads the next-24h calendar,
  then for every external attendee/company pulls context from the CRM spine, the Granola
  transcripts and email threads, and the signals feed (the "why now"). Outputs one page per
  call: where the relationship stands, the why-now, 3 questions, likely objections, next step.
  Works FILE-ONLY by default; uses live connectors if present per connectors.config.json.
allowed-tools: [Read, Write, Edit, Grep, Glob]
triggers:
  - prep me for tomorrow's calls
  - call prep
  - get me ready for my calls
  - what should I know before my meetings
  - prep my external calls
---

## What this does
Builds a max one-page brief per external call in the next 24 hours. The brief is for the
operator before they walk into the room. No fabrication: if a field is unknown, say so.

## Connect-or-load (read connectors.config.json first)
Per-connector, not all-or-nothing:
- **Calendar:** Google Calendar live if connected, else read `data/calendar_next-24h.ics`.
- **CRM:** Attio (or HubSpot) live if connected, else read the spine files
  (`data/attio_companies.csv`, `data/attio_people.csv`, `data/attio_deals.csv`).
- **Transcripts:** Granola live if connected, else read `data/context_from_claude_workshop/granola_*-transcript.md` (and any meeting pages already compiled into `brain/meetings/`).
- **Email:** Gmail live if connected, else read `data/context_from_claude_workshop/email-threads/*.md`.
- **Signals:** Exa live if connected, else read `data/signals_feed.csv`.

The default in this kit is FILE-ONLY. A participant with no connectors does nothing special —
the files are the source of truth. Do NOT edit anything under `data/`.

## Workflow
1. **Get the calls.** Read the calendar source. Keep only **external** events (an attendee
   whose email domain is not `gtm-week.com`). Skip internal-only meetings.
2. **For each external call, identify the people and the company.** Map each external attendee
   to `attio_people.csv` (match on name or email), and the company to `attio_companies.csv`.
   Join keys: company on `company_domain` (Attio `Domains`), person on `person_linkedin_url`
   (Attio People `LinkedIn`).
3. **Pull the relationship state.** From `attio_deals.csv`, find any deal for that company or
   person (match on `Associated company` / `Associated people`): stage, value, currency,
   pipeline (Sponsorship vs Speaker), next step, close date.
4. **Pull the history.** Find the matching Granola transcript and email thread by account/domain
   in the frontmatter. Read the AI-notes block and the recap. Quote the concrete commitments
   (what was promised, by whom, by when).
5. **Pull the "why now."** From `signals_feed.csv`, filter to that `company_domain` and/or
   `person_linkedin_url`. List the signals (type + summary + date), strongest first.
6. **Write the one-pager** (format below).

## Handling a partial / garbled transcript
`data/context_from_claude_workshop/granola_warsaw-debrief-transcript.md` has `transcript_status: partial` and real
`[recording dropped]` / `[inaudible]` gaps. If a transcript is partial:
- Use only what is legible. Do **not** infer through a `[gap]`.
- Mark any figure or claim that sits next to a gap as **unconfirmed**.
- Add a line: "Source transcript is partial; treat figures as unconfirmed and reconfirm live."
Never invent the missing content to make the brief look complete.

## Output format (one page per call)
```
# Call prep — {Company / Person} ({date}, {time})
**Attendees:** {external names + roles}  ·  **Owner (us):** {from calendar/CRM}

**Where the relationship stands**
- {deal stage, value+currency, pipeline} · last touch {date} · {one line of state}

**Why now (signals)**
- {strongest signal} ({date}, {source})
- {next signal} …

**3 questions to ask**
1. …  2. …  3. …

**Likely objections + the answer**
- "{objection}" → {one-line response grounded in our context}

**Next step**
- {the single concrete next action and who owns it}
```

## Worked example (file-only, from this kit's data)
Tomorrow has two external calls in `calendar_next-24h.ics`:
- **Clay — sponsorship intro** (Bruno Estrella, bruno@clay.com). Relationship: warm; Clay is
  the anchor account (`data/context_from_claude_workshop/account-deep-dive_ANCHOR.md`), opened London office Mar 2026. Why now:
  3 signals on `clay.com` (opened London office, raised round, hired Head of Demand Gen).
  Known objection from the transcript: "generic booth isn't us" → pitch a co-created
  GTM-engineering track + Clay Club London tie-in. Next step: send the one-page co-creation
  proposal with two date options at the top.
- **Sam Jacobs (Pavilion) — keynote ask.** Relationship: tentative yes, keynote-only.
  ⚠ Pavilion is on `do-not-approach.csv` as a competing-event organiser — this is a
  keynote/community ask, never a sponsorship pitch. Next step: send speaker brief + 2 dates +
  audience breakdown.

## Self-check
- [ ] only external calls included (no internal-only meetings).
- [ ] every claim traces to a file/connector; blanks left blank.
- [ ] partial transcript handled (figures flagged unconfirmed, no inference through gaps).
- [ ] do-not-approach flags surfaced (e.g. Pavilion = keynote-only).
- [ ] one page max per call.
