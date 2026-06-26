# agent/ — things Claude wrote for you

> **Workshop TL;DR (for humans):** When you ask the brain a question and save the answer, or Claude
> writes you a recommendation or a report, it lands here. This is the one folder for *Claude's own
> output* — as opposed to raw stuff that came from outside (`sources/`) or calls (`meetings/`).

---

## What goes here
Material **Claude produced for you to read**: a saved recommendation (e.g. "should we pitch Clay a
standard package?"), an audit, a lint report, a digest.

## What does NOT go here
- Raw imports that came from outside → `sources/`.
- Call transcripts → `meetings/`.
- (In the full `modelguide-os`, publishable drafts go to a `writing/` folder; this lean workshop brain
  doesn't ship one, so a saved recommendation is an `agent/` deliverable, not `writing/`.)

## Page shape
A normal page with frontmatter (`type: agent`, `agent_kind: recommendation | report | audit | lint`).
Every claim cites its source `[Source: ...]` — a recommendation is only as good as what it's built on.

## Filename
`<slug>.md` (`clay-pitch-recommendation.md`).
