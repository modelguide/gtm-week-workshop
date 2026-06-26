# companies/ — one page per organization

> **Workshop TL;DR (for humans):** One page per company you care about (a sponsor, a partner). The top
> says what's true about them now; the bottom is a dated history. Compile creates or **updates** these as
> it processes the inbox — and it checks for an existing page first, so "Clay" and "Clay Labs" become
> **one** page, not two.

---

## What goes here
A specific organization you have or expect a working interest in: a sponsor target, a partner, a
competitor you track.

## What does NOT go here
- A *person* who works there → `people/<first-last>.md`, with `company: [[<this-company>]]` in their
  frontmatter. The company page lists them by wikilink; their details live on the person page.
- The raw call or email about them → `meetings/` or `sources/`. The company page *cites* those.

## Page shape (see [[SCHEMA]] §3)
Compiled-truth above the fold (State, Open Threads, Sources, Related), `---`, append-only Timeline below.

## Dedup before you create (the important one)
Before making a new company page, check for an existing one under any name or domain variant
(`grep -ril "clay" brain/companies/`). If it exists, **update it and add the variant to `aliases:`** —
do not create a second page. One real-world company = one page.

## Filename + frontmatter
`<name>.md`, lowercase, hyphens, drop legal suffixes (`clay.md`, not `clay-labs.md`). Frontmatter:
`type: company`, `aliases: [...]`, `attio_company_id:` (reference the CRM record; don't copy its changing
fields onto the page).

## Notability
A real sponsor/partner/competitor you actually track. A company named once in passing stays as plain
text until it earns a page.
