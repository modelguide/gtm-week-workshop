# RESOLVER.md — where does a note go?

> **Workshop TL;DR (for humans):** This is your brain's filing rulebook. When a new item comes in,
> the compiler walks this list top to bottom and the **first match wins** — that's how it knows a call
> goes to `meetings/` and a company goes to `companies/`. You don't memorise it; you read it once so the
> routing stops looking like magic. In the Extend exercise you'll add one rule here and watch the brain
> obey it. Everything below this line is the actual contract the compiler follows.

---

Read this **before creating any page**. It guarantees one home per note (no duplicates, no orphans).
After you pick a folder, **read that folder's `README.md`** for its local rules. For page *shape*
(frontmatter, the fold, citations) read [[SCHEMA]]. For how the whole thing works, read root `CLAUDE.md`.

This is a lean, workshop-sized version of the gbrain filing tree. The real `modelguide-os` has more
folders (deals, projects, ideas, concepts, strategy, writing, decisions, tools, brand); we ship only the
ones the GTM Tech Week scenario needs. Adding one is the **Extend** exercise.

## 1. The decision tree

Walk top to bottom. **First match wins.** What is the primary subject of this note?

1. **A specific named person** (a human) → `people/<first-last>.md`
2. **A durable strategy artifact** (an ICP, positioning/messaging thesis, segment definition, account-tier
   model, or GTM plan — a bet that stays true across many calls, not a record of one event) →
   `strategy/<slug>.md`. **This sits above the company rule on purpose:** an ICP or segment is *also*
   about companies, and the tree is first-match-wins, so a strategy artifact placed below `companies/`
   would mis-file as a company.
3. **A specific organization** (company, sponsor, partner, competitor) → `companies/<slug>.md`
4. **A meeting that happened at a specific time** (your analysis on top, the **full transcript inline**
   below the fold) → `meetings/<YYYY-MM-DD>-<slug>.md`
5. **A non-meeting raw import** (an email, article, research doc, deck, web clipping — read but never
   rewritten) → `sources/<YYYY-MM-DD>-<slug>.md`
6. **An agent-produced deliverable** (a saved answer, recommendation, audit, lint report — something
   *Claude* wrote for you to read) → `agent/<slug>.md`
7. **An open question, contradiction, or research lead** → append **one line** to `gaps.md` (no new file)
8. **You don't know yet** → leave it in `inbox/` and say so. "Nothing fits" is a signal the rules need a
   new rule — raise it; don't invent a folder on your own.

> **Do not create a new top-level `brain/` folder** unless you're doing the **Extend** exercise (where
> adding `deals/` is the whole point). Until then, anything that doesn't fit lands in `inbox/` and gets
> flagged.

## 2. When two folders both seem to fit

- **Person vs. Company.** About the human (their role, what they want, the relationship)? → `people/`.
  About the organization (what it does, its stage, its deals)? → `companies/`. Both pages link to each
  other.
- **Strategy vs. Company.** A definition of *a kind of customer* (an ICP, a segment, a tier model) →
  `strategy/`. A specific named organization → `companies/`. The ICP lists example companies and the
  company pages cite the ICP; they are not the same page.
- **Meeting vs. Source.** A *meeting* is your analysis of a call **plus its transcript inline**. A
  *source* is any other raw import (an email, an article, a deck). A sponsorship call → `meetings/`. A
  follow-up email → `sources/`.
- **Source vs. Agent.** `sources/` is raw material that came from *outside* (you read it, never change
  it). `agent/` is material *Claude produced* (a recommendation, a report). A pitch recommendation Claude
  writes for you → `agent/`, not `sources/` and not `writing/` (this brain has no `writing/`; that folder
  is for publishable prose in the full system).

## 3. Before creating any people/ or companies/ page — dedup first

The first real failure mode is the same company or person becoming two half-pages ("Clay" and "Clay
Labs"). Before creating:

1. Search existing pages in that folder by name.
2. Grep for name and domain variants (`grep -ril "clay" brain/companies/`).
3. If the same real-world entity already has a page → **update it** and add the new spelling to its
   `aliases:` frontmatter. **Do not create a second page.**
4. Only if there's genuinely no match → create.

The **filename is the entity's ID**; every wikilink uses it (`[[clay]]`). See [[SCHEMA]] §dedup.

## 4. Chain of authority

When in doubt about anything beyond filing:
- *Where does this go?* → this file (RESOLVER).
- *What's allowed in this folder specifically?* → that folder's `README.md`.
- *What should the page look like?* → [[SCHEMA]].
- *How does the whole brain work / what must I never do?* → root `CLAUDE.md`.

If two disagree, **root `CLAUDE.md` wins** — flag the disagreement so we fix it.
