# people/ — one page per person

> **Workshop TL;DR (for humans):** One page per human you deal with (a contact at a sponsor). Same shape
> as companies: what's true now on top, dated history below. Compile checks for an existing page first,
> so the same person from a call and from an email stays **one** page.

---

## What goes here
A specific person you have a working relationship with or who's central to a call/thread — a sponsor
contact, a keynote target.

## What does NOT go here
- Your own team. People at `gtm-week.com` are *us*; they don't get pages.
- The organization they work for → `companies/`. The person page links to it via `company:`.

## Page shape (see [[SCHEMA]] §3)
Compiled-truth above the fold (State, Open Threads, Sources, Related), `---`, append-only Timeline below.
Frontmatter includes `company: "[[<slug>]]"` and `role:`.

## Dedup before you create
Search existing pages by name + `aliases:` before creating. "Bruno", "Bruno Estrella",
"bruno@clay.com" are one person — if a page exists, add the new variant to `aliases:`, don't duplicate.

## Filename
`<first-last>.md`, lowercase, hyphens (`bruno-estrella.md`). If two people collide, disambiguate with
their org (`david-liu-clay.md`).

## Notability
A real contact (a 1:1, a named decision-maker, someone in 2+ sources). A name dropped once in passing
stays plain text until it earns a page.

**Tie-breaker (read this):** a named person we have **not engaged yet**, appearing in **only one
source** (e.g. someone CC'd, or "starting next week"), does **not** earn a page yet. Hold them as an
**Open Thread** on the relevant company/person page plus a one-line `gaps.md` entry, and create the page
on first real contact. (A name alone is not a relationship.)
