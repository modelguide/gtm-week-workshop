---
name: pull
description: |
  Simulate a connector pull (Granola / Gmail / Calendar). Copy ONE preserved source fixture from
  data/context_from_claude_workshop/ into brain/inbox/ with a clean filename, staged but NOT compiled.
  This is the mock-pull half of the loop: pull brings raw material into the inbox; compile (a separate
  skill) reads it, routes it, and files it. Triggers: "pull a transcript", "simulate a Granola pull",
  "pull <filename> into the inbox", "mock pull".
allowed-tools: [Read, Write, Bash, Glob]
---

# Pull (mock connector)

> **Workshop TL;DR (for humans):** This stands in for connecting Granola/Gmail/Calendar. It takes one
> raw file from your source pool (`data/context_from_claude_workshop/`) and drops it into
> `brain/inbox/` — that's it. It does **not** read, route, or file anything; that's what `compile` does.
> The whole point is to feel the difference: **pull = bring raw material in; compile = turn it into
> brain pages.**

## What this does
1. Take the named fixture from `data/context_from_claude_workshop/` (or pick the obvious one if the user
   names a kind, e.g. "the keynote transcript").
2. **Copy** it into `brain/inbox/` with a clean kebab-case filename. Keep the original content; add a
   light frontmatter line noting where it came from (e.g. `source: granola` / `source: gmail`) if it
   doesn't already have one.
3. **Do NOT analyze, summarize, route, or compile it.** Staging only.
4. Report: what file now sits in `brain/inbox/`, and tell the user to run **`compile`** next.

## Hard rules
- **Pull only stages.** It never writes a brain page, never touches `meetings/` / `sources/` /
  `companies/` / `people/`, never updates `index.md` / `log.md`. If knowledge needs to land in the
  brain, that's `compile`'s job — say so.
- **Copy, don't move.** The source pool (`data/context_from_claude_workshop/`) is preserved; the fixture
  stays there. Only a copy enters the inbox.
- Pull one item at a time unless asked otherwise.
