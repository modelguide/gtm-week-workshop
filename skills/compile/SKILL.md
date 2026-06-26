---
name: compile
description: |
  Compile the items in brain/inbox/ into the brain. For each item: read it end to end, use the RESOLVER
  to pick its permanent home, read that folder's README and the SCHEMA for the rules, then file it —
  a meeting transcript becomes brain/meetings/[date]-[slug].md with analysis above the fold and the
  verbatim transcript inline below; a non-meeting raw import (email, article, deck) moves to
  brain/sources/[date]-[slug].md and stays immutable. Then fan the new knowledge out to the companies/
  and people/ pages it touches (timeline entry + cited claims, dedup before creating), refresh
  brain/index.md, append a brain/log.md entry, and add any open questions to brain/gaps.md. The inbox
  item is MOVED to its home, never deleted into nothing. Brain-internal only. Triggers: "compile the
  inbox", "compile the brain", "process the inbox", "compile [filename]".
allowed-tools: [Read, Write, Edit, Grep, Glob, Bash]
---

# Compile

> **Workshop TL;DR (for humans):** This skill is the engine. You drop raw stuff in `brain/inbox/`, say
> "compile the inbox," and it sorts each item into the right home and updates the pages it touches —
> following the rules in RESOLVER, the folder READMEs, and SCHEMA. It **moves** each item to a permanent
> home (a call's transcript stays inline in `meetings/`; an email goes to `sources/`); nothing is
> deleted into nothing. Everything below is the contract Claude follows.

This is the **ingest** operation. Brain-internal only — it never writes to a CRM or sends anything.

## The read-order (do this BEFORE writing anything)

The folder READMEs are operating rules, not decoration. Read in this exact order, or routing will be
wrong:

1. **Root `CLAUDE.md`** — the substrate and the hard rules.
2. **`brain/RESOLVER.md`** — the filing decision tree.
3. **`brain/index.md`** — what already exists (so you update instead of duplicating).
4. For each inbox item: **choose its destination folder** via RESOLVER §1.
5. **That destination folder's `README.md`** — the local rules + notability gate.
6. **`brain/SCHEMA.md`** — the page shape (frontmatter, the fold, citations, wikilinks).
7. **Only now** create or update pages.

## Step 0 — Orient

List **every file** in `brain/inbox/` (skip only `README.md`). Don't filter by extension. If the only
file is `README.md`, tell the user "the inbox is empty — brain is up to date" and stop.

## Step 1 — Plan (one item at a time)

For each item:
1. **Read it end to end**, frontmatter first.
2. **Classify it** with RESOLVER §1:
   - a meeting transcript → `brain/meetings/`
   - a non-meeting raw import (email, article, deck, web clipping) → `brain/sources/`
3. **Pick the date and a kebab-case slug.** For meetings, the date is the call date.
4. **Walk RESOLVER §1 for every person and company the item touches.** Sketch which existing pages get
   updated and which new pages get created. Our own team (`gtm-week.com`) does not get pages.
5. **Dedup before create** (SCHEMA §8): for every person/company, search existing pages by name +
   `aliases:` first. If it exists, plan an *update*, not a new page.

Show the plan: 2–4 bullets of takeaways per item + the list of files you'll touch. If filing is
genuinely ambiguous, ask one question. Otherwise proceed.

## Step 2 — Execute (per item)

### 2.1 — File the item in its permanent home

**If it's a meeting:** create `brain/meetings/<YYYY-MM-DD>-<slug>.md` per SCHEMA §4:
- frontmatter (`type: meeting`, `date`, `attendees` as `[[wikilinks]]`, `company`, `transcript_status`),
- above the `---` fold: TL;DR, Attendees, Key points/decisions (each cited `[Source: this transcript]`),
  Action items, Open threads,
- the `---` fold,
- `## Transcript` — the **verbatim transcript from the inbox file, pasted inline.** Never paraphrase.

**If it's a non-meeting raw import:** move `brain/inbox/<old>` → `brain/sources/<YYYY-MM-DD>-<slug>.md`
(use `git mv` if tracked, else `mv`). Set its frontmatter to `type: source`, `source_kind` (email /
article / deck / web), `date`; **keep** the useful original fields (from / to / subject) and the
**verbatim body**. **Do not add analysis to this file** — it's the immutable raw. The thinking lives on
the entity pages.

### 2.2 — The inbox item is now MOVED, not left behind

The inbox copy is gone because it now lives in its permanent home. (This is preservation, not deletion —
say so in the report.) Don't leave a duplicate in `brain/inbox/`.

### 2.3 — Fan out to the entity pages

For every person/company the item touches:
- **Append a one-line Timeline entry** below the fold (SCHEMA §3):
  `- YYYY-MM-DD — <one-line> [Source: [[<meeting-or-source-slug>]]]`.
- Add the slug to the page's `sources:` frontmatter; bump `updated`.
- **Rewrite the State block above the fold only if the thesis actually shifted.** If two sources
  disagree, don't pick silently — add a `> ⚠ Tension:` callout citing both, and add a line to `gaps.md`.
- **Backlink:** if the item mentions another entity that has a page, make sure that page links back.

### 2.4 — Create new entity pages (only where notability is earned)

For first-time people/companies that pass the folder README's notability gate, create the page per
SCHEMA §3 (frontmatter → TL;DR → State → Open Threads → Sources → Related → `---` → Timeline). Backlink
from related existing pages so it isn't orphaned at birth. **Dedup first** (SCHEMA §8).

### 2.5 — Append to gaps.md

For each open question or contradiction the item surfaced, append one line under today's `## YYYY-MM-DD`
heading: `- [<entity> | contradiction | research] <description> [Source: <slug>]`.

### 2.6 — Refresh index.md

Add a row for each new page (basename wikilink, ≤20-word summary, today's date) in the right section;
update the date on rows you modified.

### 2.7 — Append to log.md

One entry per compile *call* (a multi-item compile gets one entry):
```
## [YYYY-MM-DD] ingest | <subject>
- Compiled: <N> items
- Created: [[<slug>]], ...
- Updated: [[<slug>]], ...
- Gaps added: <count>
```

## Step 3 — Report

Give the user one summary: N items compiled (list them), files created vs updated, any `⚠ Tension`
surfaced, gaps added, and inbox status ("brain/inbox/ is now clear" or what was skipped). For each item,
say **where it landed** ("the call → meetings/, its transcript kept inline; the email → sources/"), so
the routing is visible. Stop there.

## Hard rules

- Read the **read-order** before writing. The folder READMEs are rules, not docs.
- **Never invent claims.** If a source doesn't say it, don't write it. Speculation goes in a
  `> 💭 Open question:` callout or `gaps.md`.
- **Sources are immutable.** Never edit a transcript below a meeting's fold, or a file in `sources/`,
  after it's written.
- **Dedup before create** for people/companies. One real-world entity = one page; new spellings go in
  `aliases:`.
- **Wikilinks are basename-only** (`[[clay]]`, never `[[brain/companies/clay]]`).
- **Never modify the schema files** (`CLAUDE.md`, `RESOLVER.md`, `SCHEMA.md`, folder READMEs) from inside
  this skill — changing the rules is the human's Extend exercise.
- **Don't create a new top-level `brain/` folder.** If something fits nowhere, leave it in `inbox/` and
  flag it.
- Brain-internal only — no CRM writes, no sending.
