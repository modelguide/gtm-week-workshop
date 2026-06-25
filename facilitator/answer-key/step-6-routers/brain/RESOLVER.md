# RESOLVER — where does a note go?

Walk top to bottom. First match wins. Every note has exactly **one** home.

1. A specific named person → `brain/people/<first-last>.md`
2. An organization → `brain/companies/<slug>.md`
3. A meeting at a specific time → `brain/meetings/<YYYY-MM-DD>-<slug>.md` (transcript inline below the fold)
4. A financial deal with terms → `brain/deals/<slug>.md`
5. A reusable answer/synthesis or a content draft → `brain/writing/<slug>.md`
6. A contradiction or open question → add a line to `brain/gaps.md`
7. An agent-produced report (audit, readiness, digest) → `brain/agent/<YYYY-MM-DD>-<slug>.md`
8. Don't know yet → `brain/inbox/` (and flag it — the schema may need to grow)

## Two rules that keep the brain from rotting

**Dedup before you create.** Before making a new person or company page:
1. Search existing pages in that folder by name.
2. Grep for name and domain variants across `brain/`.
3. If the same real-world entity already has a page → **update it** and add the new variant to its
   `aliases:` frontmatter. Do **not** create a second page.
Example: `Clay` (clay.com) and `Clay Labs` (clay.run) are one company → one `clay.md`, with
`aliases: ["Clay Labs", "clay.run"]`.

**Wikilinks use the filename only.** Write `[[clay]]`, never `[[brain/companies/clay]]` or
`[[../companies/clay]]`. The filename is the entity's ID and resolves on its own.
