# context_from_claude_workshop — the source pool

> **Workshop TL;DR (for humans):** These are **preserved source documents** — old transcripts, an
> email thread, the Clay deep-dive, and the ICPs that the GTM lead already had. They are **not compiled
> brain pages yet.** Think of this folder as a stand-in for Granola/Gmail: the raw *documents* before
> they enter the brain. In the workshop you'll "pull" one of these into `brain/inbox/` and compile it —
> so you learn that **pull ≠ compile**.

---

## What's in here (all pullable into the inbox)
- `granola_keynote-target-call-transcript.md` — Sam Jacobs (Pavilion) keynote ask (a meeting transcript)
- `granola_warsaw-debrief-transcript.md` — a deliberately **partial** transcript (a real-world edge case)
- `email-threads/` — a Gmail thread (Sam Jacobs keynote)
- `account-deep-dive_ANCHOR.md` — a research doc on Clay (the anchor account)
- `icp_sponsor.md`, `icp_speaker.md` — the two ICPs (ideal-customer profiles)

> The calendar (`data/calendar_next-24h.ics`) is **not** here — it's connector/live-state data, not a
> document you ingest. You don't pull a calendar into the brain; you query it. It lives in `data/` with
> the other connector files.

## How it's used
- **The mock-pull exercise** (`skills/pull/SKILL.md`): copies one of these into `brain/inbox/`, staged
  but not compiled — simulating a connector pull. Then you `compile` it.
- **The GTM demo skills** (`call-prep`, `sponsor-outreach`): read these as the file-fallback when a live
  connector isn't connected.

## The model
```
  data/context_from_claude_workshop/   ← preserved source pool (raw, uncompiled)
            │  pull
            ▼
  brain/inbox/                         ← active staging area
            │  compile
            ▼
  brain/ (meetings, sources, companies, people, …)   ← the compiled wiki
```

Nothing here is a brain page. It becomes one only after you pull it into the inbox and compile it.
