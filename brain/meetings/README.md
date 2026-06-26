# meetings/ — calls, with the transcript kept inside

> **Workshop TL;DR (for humans):** One page per call. Your short analysis sits on top; the **full
> transcript is pasted in below the line** on the same page. That page *is* the permanent record of the
> call — there's no separate transcript file to lose.

---

## What goes here
A specific call that happened at a specific time, where something was decided or your understanding
shifted (a sponsorship call, a keynote ask).

## What does NOT go here
- A non-meeting raw import (an email, an article, a deck) → `sources/`.
- A recommendation Claude wrote → `agent/`.

## Page shape (see [[SCHEMA]] §4)
- Frontmatter: `type: meeting`, `date`, `attendees` (as `[[wikilinks]]`), `company`, `transcript_status`.
- Above the `---` fold: TL;DR, Attendees, Key points/decisions (each cited `[Source: this transcript]`),
  Action items, Open threads.
- Below the `---` fold: `## Transcript` — the **full verbatim transcript, pasted in, never paraphrased**.

## Filename
`<YYYY-MM-DD>-<slug>.md`, where the date is the call date and the slug names the central entity —
`2026-06-18-clay-sponsorship-intro.md`.

## Immutable below the fold
Once the transcript is inline, don't edit it. New understanding goes on the `companies/`/`people/` pages,
not back into the transcript.
