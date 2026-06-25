---
title: gbrain readiness — what we built and where the engine begins
type: agent
created: 2026-06-25
status: active
---

A one-page line in the sand: the markdown brain is complete; the gbrain engine is deliberately not
adopted yet.

## What we built (markdown gbrain)
- The three layers: raw sources (`data/` + the raw `brain/` files), the LLM-owned wiki (entity pages,
  index, log), and the schema (`CLAUDE.md`, `brain/RESOLVER.md`, `brain/SCHEMA.md`).
- The three operations: ingest, query, lint.
- The gbrain discipline: compiled-truth + timeline pages, the connector posture, RESOLVER + SCHEMA,
  dedup-before-create, and one skill wired to write the brain back.

## What the gbrain ENGINE would add (and markdown can't)
- **Search at scale** — vector / hybrid search once grep + `index.md` stop being enough.
- **The dream cycle** — an autonomous maintenance pass (lint → backlinks → sync → synthesize → extract
  → patterns → embed → orphans) that runs without a human.
- **Autopilot writes** and **cron loops** — email monitors, daily briefings, weekly lint that grow the
  brain even when nobody is talking to the agent.

## The adoption trigger
Adopt the engine when page count, citation-graph density, or query latency starts hurting markdown-only
operation — rule of thumb ~200–300 pages, or a specific friction markdown can't solve. Until then,
installing it is premature optimization.

## Why we're not crossing it yet
This kit is well under that line. And adopting later is **non-destructive**: markdown stays canonical;
the database is a derived index you can rebuild. So the right move now is to keep compounding the
markdown brain, and revisit the engine when scale (not curiosity) forces it.

**This is the finish line of the lab.**
