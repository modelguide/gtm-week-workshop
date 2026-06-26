# SCHEMA.md — what a page looks like

> **Workshop TL;DR (for humans):** This is the "house style" for every page in your brain — the little
> info block at the top, the rule that the **top of a page is what's true now** and the **bottom is a
> dated history**, and the rule that **every fact names its source**. The compiler follows this so all
> your pages come out looking the same. Read it once; in the Extend exercise you'll change one rule here
> (say, add a "Risks" line to company pages) and watch new pages pick it up. Everything below this line
> is the actual contract.

---

For *where* a page goes, read [[RESOLVER]]. For local folder rules, read that folder's `README.md`. This
is a lean, workshop-sized version of the gbrain page conventions.

## 1. Filenames = the entity's ID

- Lowercase, hyphens: `clay.md`, `bruno-estrella.md`.
- **Meeting and source pages get a date prefix:** `2026-06-18-clay-sponsorship-intro.md`. The date is the
  source's own date.
- The filename is the entity ID. Every wikilink resolves to it by basename.

## 2. Frontmatter (the info block at the top)

Every page opens with a YAML block fenced by `---` lines:

```yaml
---
title: <Page Title>
type: person | company | meeting | source | agent | strategy
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [<slug>, ...]
status: active
---
```

Per type, add:
- **person:** `aliases: ["variant", "email@x.com"]`, `company: "[[<slug>]]"`, `role:`
- **company:** `aliases: [...]`, `attio_company_id:` (reference the live CRM record by ID — don't copy
  its changing fields onto the page)
- **meeting:** `date:` (the call date), `attendees: ["[[<slug>]]", ...]`, `company: "[[<slug>]]"`,
  `transcript_status: ok | partial | missing`
- **source:** `source_kind: email | article | research | deck | web`, `date:` (the source's own date)
- **agent:** `agent_kind: recommendation | report | audit | lint`
- **strategy:** `strategy_kind: icp | positioning | segment | plan`, `scope:` (what it governs)

**`aliases:` is load-bearing on people and companies.** It catches every spelling (nicknames, legal
names, domains). When you meet a new variant for a known entity, **add it to aliases — never make a new
page.**

## 3. The two-layer page (compiled-truth + timeline)

The core pattern for **person, company, strategy** pages: current truth on top, dated history below a fold.

```
---
[frontmatter]
---

<one-paragraph TL;DR of where things stand now>

## State
- current facts, each with [Source: ...]

## Open Threads
- unresolved items

## Sources
- [[<slug>]]

## Related
- [[<slug>]]

---

## Timeline
- 2026-06-18 — one-line event [Source: [[<slug>]]]
```

Rules:
- **Above the fold is rewritten** as understanding changes. **Below the fold (Timeline) is append-only.**
- "What's true now?" reads the top; "what happened?" reads the bottom.
- A new item usually **appends a Timeline line**, and rewrites the State only if the thesis actually
  shifted.
- When two sources disagree, don't pick silently — add a `> ⚠ Tension:` callout citing both, and append
  one line to `gaps.md`.

## 4. Meeting pages are different — transcript inline

A meeting page is your analysis **above** a `---` fold and the **full verbatim transcript below it**:

```
---
[meeting frontmatter]
---

<TL;DR>

## Attendees
- [[bruno-estrella]] (Head of Growth Marketing, [[clay]])

## Key points / decisions
- ... [Source: this transcript]

## Action items
- ...

## Open threads
- ...

---

## Transcript
<the full verbatim transcript, pasted in, never paraphrased>
```

There is **no separate transcript file** — the meeting page *is* the permanent home of that transcript.
It's immutable below the fold (don't edit the transcript after compile).

## 5. Every fact cites its source

Every substantive claim carries an inline `[Source: ...]`. No source, no claim. Forms:
- Meeting: `[Source: [[2026-06-18-clay-sponsorship-intro]]]`
- Email/source: `[Source: [[2026-06-20-clay-followup-email]]]`
- The user told you: `[Source: User, 2026-06-26]`

## 6. Wikilinks use the filename only

Write `[[clay]]`, never `[[brain/companies/clay]]` or `[[../companies/clay]]`. The basename resolves on
its own because slugs are unique. Link the **first** mention on a page; don't carpet-bomb.

## 7. Sources are immutable

Once a meeting transcript is inline below the fold, or a non-meeting raw lands in `sources/`, **never
edit it.** New understanding goes on the entity pages (State + Timeline), not back into the raw.

## 8. Dedup before you create (people + companies)

Before making a new person/company page: search existing pages, grep name + domain variants, and if the
same entity already exists, **update it and add the variant to `aliases:`** — don't make a duplicate.
One real-world entity = one page.
