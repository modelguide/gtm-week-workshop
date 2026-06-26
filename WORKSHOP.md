# Workshop — build a working brain

### Hands-on. No coding. ~60 minutes. You operate it; you don't read manuals.

By the end you'll have a small **brain** — a set of linked notes an AI keeps current — that you can run,
ask, check, and lightly extend. You'll do it by pasting prompts and looking at the files that appear.

---

## Why you're doing this

Right now your GTM memory is **scattered** — and it quietly disagrees with itself:

```
   the call (Granola)     the CRM            an email thread     the tracker
   "what did Bruno         "what stage        "did we ever        "...is this even
    actually say?"          is Clay at?"        agree on dates?"     up to date?"
   ─────────────────      ─────────────      ───────────────     ──────────────────
   in a transcript        live & changing    buried in Gmail     stale, drifting
```

So every real question starts with **archaeology** — opening four places and hoping they line up. *Is Clay a booth or a co-created track? Which file do we trust? Did the tracker drift from the CRM?*

By the end of this hour you'll have a **brain**: one connected memory that answers those in seconds, **with receipts.**

```
  raw context ──pull──▶ inbox ──compile──▶  ┌──────────── YOUR BRAIN ─────────────┐
  (calls, emails,                           │ meetings  — what happened (+ the     │
   docs)                                     │            transcript, preserved)    │
                                            │ sources   — raw docs, kept as-is     │
                                            │ companies — current truth + history  │
                                            │ people    — current truth + history  │
                                            │ agent     — answers you saved        │
                                            │ gaps      — contradictions & to-dos  │
                                            │ index/log — the map and the diary    │
                                            └─────────────────┬───────────────────┘
                                                              │ ask
                                       "Co-create a track, not a booth — and here's
                                        the exact call that came from."
```

**The shift:** you stop re-deriving the answer from scattered files every time. You **compile once**, and from then on every question starts from the brain — and every claim points back to the call, email, or doc it came from.

### What the brain actually is
A small, structured wiki Claude keeps current for you:
- **Raw material is preserved** — a call's transcript is *kept*, not summarized away.
- **Current understanding is compiled on top** — the "what's true now" you read first.
- **Every claim cites its source** — no fact without a receipt.
- **Every new source updates the same memory** — it compounds instead of scattering.

### What you'll actually do
You are **not** here to hand-build the filing system. The plumbing is already installed. You're here to **run it, look under the hood, and change one rule** — an operator learning a machine, not a plumber installing one.

## What's already set up for you

| Already installed | What it does |
|---|---|
| `brain/RESOLVER.md` | decides **where** each thing goes |
| each folder's `README.md` | the **local rule** for that folder |
| `brain/SCHEMA.md` | the **shape** every page takes |
| `skills/compile/` | runs the **ingest loop** (raw → filed pages) |
| `skills/pull/` | a mock connector **pull** (brings raw into the inbox) |
| `brain/inbox/` | raw items **waiting to be compiled** |

Your hour: run the loop, see what it makes, understand *why* it routed that way, then change one rule and watch the brain obey.

---

## How this works

**Where you run it.** Claude Code, inside the Claude app, with this kit folder open.

**The two layers (so you don't get lost):**
- **This file is your operating script** — what to paste, what to look for, what you just learned.
- **The brain's rule docs** (`CLAUDE.md`, `brain/RESOLVER.md`, `brain/SCHEMA.md`, the folder
  `README.md`s, the `compile` skill) are there **so Claude behaves correctly.** You don't read them
  cover to cover. In Step 1 you'll have Claude *explain* them, then you verify everything by looking at
  files.

**Every step looks the same:**
> **What you're doing** · **Paste this** · **You should see** · **Check before moving on** · **If it
> looks off** · **What you just learned**

**Ground rules:** never edit `data/` (it's the source of truth). The brain lives in `brain/`. Every fact
on a page names its source.

### Setup (once)
1. Open the Claude app, turn on **Claude Code**.
2. Open this kit folder in it.
3. Open the folder in a file browser too (Finder/Explorer), so you can watch `brain/` fill up.
4. Confirm Claude can see the kit — paste: `Read README.md and tell me the name of this kit in one sentence.`
   ✅ If it answers "GTM Tech Week London," you're ready.

---
---

# Beat 1 — Meet the brain

## Step 1 — Meet the brain

**What you're doing:** before adding anything, you'll ask Claude to explain the rulebook it's going to
follow — so the "magic" is just rules.

**Paste this:**
```
Read CLAUDE.md, brain/RESOLVER.md, brain/SCHEMA.md, and the README files in brain/inbox/,
brain/meetings/, brain/sources/, brain/companies/, brain/people/, and brain/agent/.

Explain in plain English:
1. What inbox/ is for.
2. Where meeting transcripts go after compile.
3. Where non-meeting raw files go.
4. Where company and person knowledge goes.
5. Where your own analysis/report goes.
6. What order you must read the rules before writing files.

Keep it under 12 bullets.
```

**You should see:** Claude explain the chain — `CLAUDE.md → RESOLVER.md → folder README → SCHEMA.md →
compile skill` — and the loop in plain words.

**Check before moving on:**
- [ ] It says `inbox/` is **temporary**.
- [ ] It says meeting transcripts are **preserved inline** in `meetings/`.
- [ ] It says non-meeting raw files are preserved in `sources/`.
- [ ] It says claims need **sources**.

**If it looks off:** paste `Re-read brain/RESOLVER.md and the folder READMEs and correct anything you got
wrong, especially where each kind of item is filed.`

**What you just learned:** The brain isn't magic — it's a folder system plus rules Claude follows.

---
---

# Beat 2 — Run compile

## Step 2 — Compile your first inbox item

**What you're doing:** turning one raw call transcript into a connected set of brain pages.

**Paste this:**
```
Use the compile skill (skills/compile/SKILL.md) to compile just the Clay sponsorship call:
brain/inbox/clay-sponsorship-intro.md. Follow the skill's read-order. Don't compile the other inbox
items yet.
```

**You should see:**
- `brain/inbox/` no longer contains the Clay **transcript** (the email + deal note are still there).
- `brain/meetings/2026-06-18-clay-sponsorship-intro.md` exists.
- `brain/companies/clay.md` exists.
- `brain/people/bruno-estrella.md` exists.
- `brain/index.md` and `brain/log.md` changed.

**Check before moving on:**
- [ ] The meeting page has the **full transcript below a `---`** line.
- [ ] `clay.md` **cites the meeting** (`[Source: [[2026-06-18-clay-sponsorship-intro]]]`).
- [ ] No page was made for our own team (Artur Wala, Krzysztof Pawlak).

**If it looks off:** paste `The transcript must be preserved inline below a --- fold on the meeting page,
and Clay/Bruno must each have a page that cites the meeting. Fix anything missing. Don't make pages for
gtm-week.com people.`

**What you just learned:** Inbox is temporary. Compile preserves the raw material in the right permanent
home and updates the connected pages.

---

## Step 2b — Confirm nothing was lost

**What you're doing:** proving "the inbox emptied" means *filed*, not *deleted*.

**Paste this:**
```
Show me where the Clay call transcript is now, and confirm the original wording is preserved word for
word on the meeting page.
```

**You should see:** Claude point to `brain/meetings/2026-06-18-clay-sponsorship-intro.md` and confirm the
verbatim transcript sits below the fold.

**Check before moving on:**
- [ ] The transcript text is intact on the meeting page.

**What you just learned:** Compile *moves* raw material into its permanent home — it never deletes it
into nothing.

---
---

# Beat 3 — Ask · check · compound

## Step 3 — Ask a sourced question, and keep the answer

**What you're doing:** asking your brain a real question, getting a cited answer, and saving it so you
never redo the work.

**Paste this:**
```
Using only my brain (read brain/index.md first, then follow the links), answer:
"Should we offer Clay a standard sponsorship package, and who should I contact first?"
Put a [Source: ...] after every point; don't say anything you can't back up. Then save your answer to
brain/agent/clay-pitch-recommendation.md, add it to brain/index.md, and add a line to brain/log.md.
```

**You should see:** a short answer — **no standard booth; co-create a GTM-engineering track + Clay Club
London; first contact Bruno Estrella** — every point cited, saved to `brain/agent/`.

**Check before moving on:**
- [ ] The answer says co-create (not a standard package) and names Bruno.
- [ ] Every point has a `[Source: ...]`.
- [ ] It was saved to `brain/agent/clay-pitch-recommendation.md` (not `sources/` — that's for raw; this
      is Claude's own analysis).

**If it looks off:** paste `Answer only from the brain pages and what they cite. Add a source to every
point, then save it to brain/agent/clay-pitch-recommendation.md.`

**What you just learned:** A good answer becomes a page. Your thinking compounds, just like ingested
sources.

---

## Step 4 — Run a check (catch stale data)

**What you're doing:** letting the brain catch a mistake a human would miss — your tracker spreadsheet
disagrees with the CRM.

**Paste this:**
```
Compare my hand-built tracker (data/sponsorship-tracker_WIP.xlsx) with the real CRM
(data/attio_deals.csv). Find every deal they disagree on — stage, amount, or whether it exists. Trust
the CRM. Write each disagreement to brain/gaps.md and add a line to brain/log.md.
```

**You should see:** the brain flag (at least) ChurnZero (Lost vs "verbal yes"), Cremarc (£16k vs £25k),
Salesloft (double-counted), Transmission (missing, Won) — written to `brain/gaps.md`.

**Check before moving on:**
- [ ] It found at least ChurnZero and Cremarc.
- [ ] `brain/gaps.md` lists them and says trust the **CRM**.

**If it looks off:** paste `The tracker is an .xlsx (a zipped spreadsheet). If your read came back with
blank text columns, the labels are stored as inline-string cells — unzip the file and read
xl/worksheets/sheet1.xml directly to get the sponsor names and statuses. Then report only disagreements
you can show with both values side by side, and trust the CRM.`

**What you just learned:** A brain you only ever add to goes stale quietly. Checking it is what keeps it
honest.

---

## Step 5 — Compile a second item (watch it compound)

**What you're doing:** feeding in the follow-up email and watching the brain **update** Clay instead of
making a second Clay page.

**Paste this:**
```
Now compile the Clay follow-up email: brain/inbox/clay-followup-email.md.
```

**You should see:**
- the email moved to `brain/sources/2026-06-20-clay-followup-email.md` (not `meetings/` — it's not a
  call),
- a **new dated line on the existing `clay.md` Timeline** (no second Clay page),
- `clay.md`'s `sources:` now lists **two** items.

**Check before moving on:**
- [ ] There is still **one** `clay.md` (the email updated it; it did not create `clay-labs.md` or a
      duplicate).
- [ ] The email is in `sources/`, kept as-is.

**If it looks off:** paste `That email is about Clay, which already has a page. Update the existing
clay.md (new timeline line + add the source) instead of creating a second Clay page. The email belongs
in sources/.`

**What you just learned:** New information about something you already track **updates** its page. One
real-world thing = one page.

---

## Step 5b — Pull more context (optional)

**What you're doing:** seeing where raw material comes from *before* it hits the inbox. Your kit has a
**source pool** (`data/context_from_claude_workshop/`) standing in for your connectors (Granola, Gmail,
Calendar). You'll "pull" an old call into the inbox, then compile it — so you feel the difference
between **pull** and **compile**.

**Paste this (the pull):**
```
Use the pull skill (skills/pull/SKILL.md) to simulate a Granola pull: copy
data/context_from_claude_workshop/granola_keynote-target-call-transcript.md into brain/inbox/ with a
clean filename. Stage it only — don't analyze or compile it. Then tell me what's in the inbox and what
to run next.
```

**You should see:** a new file in `brain/inbox/` (the Sam Jacobs keynote call) and **nothing else
changed** — no new brain pages yet.

**Then paste this (the compile):**
```
Compile the Sam Jacobs keynote item you just pulled into the inbox (just that one).
```

**You should see:** now it's filed — a `meetings/` page (transcript inline), a `companies/` page for
Pavilion, a `people/` page for Sam Jacobs, and `index.md`/`log.md` updated.

**Check before moving on:**
- [ ] After the **pull**, only the inbox changed (a file appeared) — no brain pages were written.
- [ ] After the **compile**, the call became a meeting page and entity pages appeared.

**What you just learned:** **Pull ≠ compile.** Pull brings raw material into the inbox; compile reads it,
routes it, preserves it, and updates the pages. Real connectors (Granola/Gmail) are just the live
version of that pull.

---
---

# Beat 4 — Extend (change a rule, watch the brain obey)

## Step 6 — Add a routing rule

**What you're doing:** the payoff. You'll add one rule to the filing system and watch the brain route a
new item by the rule **you** wrote. Your inbox still has a deal note that has no clean home yet.

**One thing that matters:** the rulebook is read **top to bottom, first match wins.** A deal is *also*
about a company — so if you put the deals rule below the company rule, the deal would get filed as a
company instead. The rule has to go **above** the company rule. The prompt below says exactly that.

**Paste this:**
```
I want deals to have their own home. In brain/RESOLVER.md, add a new rule to the decision tree:
"a financial deal with terms and a decision → brain/deals/<slug>.md". Put it ABOVE the company rule,
because the tree is first-match-wins and a deal is also about a company. Also create a short
brain/deals/README.md saying what belongs there. Then compile brain/inbox/salesloft-deal-note.md and
file it using the new rule.
```

**You should see:**
- `brain/RESOLVER.md` now has a `deals/` rule **above** the company rule, and `brain/deals/README.md`
  exists,
- `brain/deals/salesloft.md` appears — a deal page that **routed there because of the rule you added,
  placed where you put it**,
- the £45k Headline terms and Aaron Lindqvist captured on it.

**Check before moving on:**
- [ ] `brain/deals/salesloft.md` exists (in `deals/`, **not** `companies/`), with the £45k Headline terms.
- [ ] The deal note left the inbox.

**If it looks off:**
- *It landed in `companies/` instead* → paste `The deals rule must sit ABOVE the company rule in
  RESOLVER.md (first match wins). Move it up, then re-compile the deal note so it lands in brain/deals/.`

**What you just learned:** You control the rules — and **order matters.** The brain reads top to bottom,
so where you put a rule changes what it does. Change one, and the brain obeys it.

> **Going further (optional):** ask Claude to add a "Risks" line to the company page shape in
> `brain/SCHEMA.md`, then re-touch `clay.md` — and watch the new shape take hold while the timeline and
> sources stay intact.

---
---

## What you built — and can now do

You started with an empty brain and a box of raw notes. Now you can:
1. **Explain the loop** — inbox → compile → meetings/sources/companies/people → index/log/gaps.
2. **Run compile** and see pages created.
3. **Prove** raw material was preserved, not deleted.
4. **Ask a sourced question** and keep the answer.
5. **Check** the brain against stale data.
6. **Change a rule** and watch the brain obey.

Point at any of these and you'll find the rule behind it: **`RESOLVER.md`** (where things go), a folder
**`README.md`** (local rule), **`SCHEMA.md`** (page shape), the **`compile` skill** (how the loop runs),
and the **one rule you changed**.

### Where the engine would take over (and why you stop here)
This brain is plain markdown files. The powered-up version (a database, overnight clean-ups, robots that
ingest your email on a schedule) only earns its keep once you're past a few hundred pages or hit
something files can't do. You're nowhere near that — and switching later loses nothing, because the
files stay the source of truth. So you stop here, with a brain you understand and can extend.

---
*Facilitators: the goal + acceptance checks are in `facilitator/workshop-goal.md`; known-good output is
in `facilitator/answer-key/`.*
