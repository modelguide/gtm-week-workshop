# SCHEMA — what a page looks like

Every entity page (person, company, deal) has two layers split by a `---` fold.

## Frontmatter (top of every page)
```yaml
---
title: <name>
type: person | company | meeting | deal | writing
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [<source-slug>, ...]
status: active
---
```
Add per type:
- **person:** `aliases: [...]`, `company: "[[<slug>]]"`, `role:`
- **company:** `aliases: [...]`, `attio_company_id:` (reference the live CRM, don't copy its fields)
- **meeting:** `date:`, `attendees: ["[[...]]"]`, `company: "[[...]]"`, `transcript_status:`

## Body shape (the two-layer page)
```
<one-paragraph TL;DR of the current best understanding>

## State
- current facts, each with an inline [Source: ...]

## Open Threads
- unresolved items

## Sources
- [[...]]

## Related
- [[...]]

---

## Timeline
- YYYY-MM-DD — one-line event [Source: [[...]]]
```

## The rules
- **Above the fold is rewritten** as understanding changes. **Below the fold is append-only** history.
  "What's true now?" reads the top; "what happened?" reads the bottom.
- **Every claim cites a source:** `[Source: <slug or note>]`. No source, no claim.
- **The filename is the entity ID.** Pick one canonical slug; every other name/spelling goes in
  `aliases:`.
- **Meetings keep their transcript inline** below the fold (a captured event). Live CRM state is queried
  by ID, never mirrored onto the page.
