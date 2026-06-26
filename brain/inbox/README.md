# inbox/ — the drop zone

> **Workshop TL;DR (for humans):** This is the temporary in-tray. New raw stuff lands here (a call
> transcript, an email). You run **compile** and the inbox empties — but **"empties" means each item was
> *preserved* in its permanent home, not deleted.** A transcript moves to `meetings/` (kept inline), an
> email moves to `sources/`. Nothing is lost; it's filed.

---

## What goes here
Anything you want the brain to learn from, in whatever shape it arrived: meeting transcripts, emails,
articles, research docs, web clippings, deck text.

## What happens to it
Run **"compile the inbox"** (or `compile <filename>`). For each item, compile:
1. reads it end to end,
2. uses [[RESOLVER]] to pick its permanent home,
3. reads that folder's README and [[SCHEMA]] for the rules,
4. **moves it out of inbox into that home** (a meeting → `meetings/` with the transcript inline; a
   non-meeting raw → `sources/`), and
5. fans the new knowledge out to the `companies/` and `people/` pages it touches.

After compile, this folder is empty (except items you explicitly skipped). **Empty = processed and
preserved, never deleted.**

## What this folder is NOT
- Not a permanent home. Nothing's knowledge lives here for long.
- Not where answers or reports go — those are `agent/`.

## Naming
No rules. Drop files with whatever name they came with; compile renames them to
`<YYYY-MM-DD>-<slug>` as part of the move.
