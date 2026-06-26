# strategy/ — the durable bets, not the day-to-day

> **Workshop TL;DR (for humans):** One page per *durable strategy artifact* — an ICP, a positioning
> statement, a segment thesis, a GTM plan. These are the things that stay true across many calls and
> emails, and that the meeting/company/people pages point *up* to. Added in the Extend exercise: a new
> top-level folder plus the RESOLVER rule that routes to it.

---

## What goes here
A durable, owned strategy artifact that governs how we go to market:
- an **ICP** (who we sell to / recruit) — e.g. `icp-gtm-week.md`,
- a **positioning** or messaging thesis,
- a **segment** definition or account-tier model,
- a **GTM plan** for a motion or edition.

These are rewritten as the strategy sharpens; they are not a record of a single event.

## What does NOT go here
- A specific call → `meetings/`. A specific email/deck/article → `sources/`.
- A specific company or person → `companies/` / `people/` (they *cite* the strategy page).
- Something Claude generated for you to read (a recommendation, an audit) → `agent/`.

## Page shape (see [[SCHEMA]] §3)
Compiled-truth above the fold (State / the actual definition, Open Threads, Sources, Related), `---`,
append-only Timeline below. Frontmatter adds `strategy_kind:` and `scope:`.

## Filename
`<slug>.md`, lowercase, hyphens, **no date prefix** (it's a living doc, not a dated source):
`icp-gtm-week.md`, `positioning.md`.

## Notability
A real, owned strategy we actually steer by. A passing strategic aside in a call stays on that
meeting/company page until it earns its own durable page.
