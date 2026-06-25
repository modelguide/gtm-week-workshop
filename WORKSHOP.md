# Build your GTM brain

### A hands-on lab. No coding. About 60 minutes. You build it yourself.

---

## Why you're doing this

Right now everything you know about your sponsors, speakers, and deals is **scattered**:

```
   Granola calls        the CRM          old emails        a spreadsheet
   ────────────         ────────         ──────────        ───────────
   "what did Bruno      "what stage      "did we ever      "...this is
    say again?"          is Clay?"         agree dates?"     out of date"
```

So before every call you go digging. Your tracker spreadsheet is wrong the moment you close it. A new
teammate means re-explaining everything from scratch.

**By the end of this lab you'll have built a "brain":**

```
                          ┌─────────────────────┐
   you ask in plain  ───▶ │      YOUR BRAIN     │ ───▶  a cited answer,
   English               │  one connected place │       in seconds
                          │  that knows every    │
                          │  company, person,    │
                          │  deal — and updates  │
                          │  itself as you work  │
                          └─────────────────────┘
```

One place that knows everything, that you talk to in plain English, that **catches mistakes in your
spreadsheet**, and that **gets smarter every time you use it**. You'll build it from a folder of files,
yourself, in eight short steps.

> The big idea behind this is called the **"LLM wiki"** (from Andrej Karpathy) and the grown-up version
> is called **gbrain**. You don't need to remember those names. You just need to follow the steps.

---

## What you need (setup — do this once)

1. **The Claude app**, with **Claude Code** turned on. (Claude Code is the mode that can read and write
   files for you.)
2. **This kit folder open in it.** When you open the folder, Claude can see all the files in it.
3. **A file browser or editor open next to it** (even just Finder/Explorer) pointed at the `brain/`
   folder, so you can watch new pages appear as you go.

That's it. No terminal, no setup commands.

### The loop you'll repeat 8 times

```
   1. PASTE a message          2. Claude builds        3. YOU look at the
      (we give you the    ─▶      the files       ─▶      result and tick
       exact words)               for you                 the checkbox
```

You never write a file yourself. You paste the message we give you, Claude does the work, and you check
it looks right before moving on.

### Three rules that never change

1. **Don't touch the `data/` folder.** That's your source of truth (the CRM exports, the spreadsheet).
   The brain reads from it; it never changes it.
2. **Your brain lives in the `brain/` folder.** That's where the new pages appear.
3. **No made-up facts.** Every page says where its information came from. If a call didn't say it, it
   doesn't go on the page.

---

## The journey (8 steps)

```
  PART 1 — the basics                      PART 2 — make it solid
  ───────────────────                      ──────────────────────
  ①  Teach it your first call              ④  Give every page one simple shape
  ②  Ask it a question                     ⑤  Decide what to save vs look up
  ③  Let it catch a mistake                ⑥  Add filing rules (no duplicates)
                                           ⑦  Make it update itself as you work
                                           ⑧  Know when you'd need more (and stop)

  Progress:  ①──②──③──④──⑤──⑥──⑦──⑧
```

Each step takes 5–10 minutes. Do them in order. If anything looks off, every step has a
**"If it looks off"** fix, and there's a known-good copy of every result in `facilitator/answer-key/`.

---
---

# PART 1 — the basics

## Step ① — Teach it your first call

```
[Step 1 of 8]  ◉───○───○───○───○───○───○───○
```

**What you'll do:** take a real sales call (the Clay sponsorship intro) and turn it into pages your brain
can use. We start with Clay because it's your most important target, so its page becomes the centre of
everything.

**What "good" looks like:** five new pages appear, all linked together.

**Paste this to Claude:**

```
Read the file brain/granola_clay-sponsor-intro-transcript.md. It's a recording of a real call — don't
change it.

Turn it into pages in my brain. Please do all of this:

1. Make a meeting page at brain/meetings/2026-06-18-clay-sponsorship-intro.md. Write a few bullet points
   in your own words: what happened, what we agreed, and the open question. Whenever you mention a person
   or company, link to them like this: [[clay]] and [[bruno-estrella]].

2. Make one page for each outside person or company in the call:
   - brain/companies/clay.md
   - brain/people/bruno-estrella.md
   On each, write what we now know about them from the call. At the bottom add a "Sources" line that
   links back to the meeting: [[2026-06-18-clay-sponsorship-intro]].
   (Artur Wala and Krzysztof Pawlak are us, our own team — they don't get pages.)

3. Make a contents page at brain/index.md that lists the new pages grouped under Companies, People, and
   Meetings, each with a one-line summary.

4. Make a diary file at brain/log.md with one line in it:
   ## [2026-06-18] ingest | Clay sponsorship intro

Don't change anything in the data/ folder or the original call file. When you're done, list what you made.
```

**You should see** five new files:

```
brain/
├── meetings/2026-06-18-clay-sponsorship-intro.md
├── companies/clay.md
├── people/bruno-estrella.md
├── index.md   ← your table of contents
└── log.md     ← your diary
```

**Your brain now looks like this:**

```
              ┌──────────────────────┐
              │  Clay intro meeting  │
              │     2026-06-18       │
              └─────────┬────────────┘
                links to│and to
            ┌───────────┴───────────┐
        ┌───┴────┐              ┌────┴─────┐
        │  Clay  │              │  Bruno   │
        │company │              │ Estrella │
        └────────┘              └──────────┘
```

**✅ Check before moving on:**
- [ ] The five files exist, and the original call file is unchanged.
- [ ] Open `brain/companies/clay.md` — it mentions wanting a **co-created track, not a booth**, and the
      **London office**. (Both were in the call.)
- [ ] There's **no** page for Artur or Krzysztof (they're us).

**If it looks off:**
- *It changed the call file* → paste: "Please put brain/granola_clay-sponsor-intro-transcript.md back the
  way it was, and only create new files in brain/."
- *It made a page for Artur or Krzysztof* → paste: "Please delete those two — they're our own team, not
  outside contacts."

> You just did the most important move there is: turning a messy call into clean, linked pages. The pros
> call this **"ingesting"** a source. One call became five connected pages.

---

## Step ② — Ask it a question

```
[Step 2 of 8]  ◉───◉───○───○───○───○───○───○
```

**What you'll do:** ask your brain a real question and get an answer that **shows its sources** — then
save that answer so you never have to figure it out again.

**Paste this to Claude:**

```
Using only my brain (start by reading brain/index.md, then follow the links), answer this:

"Should we offer Clay a standard sponsorship package, and who should I contact first?"

Rules:
- Read brain/companies/clay.md and brain/people/bruno-estrella.md. You can also read the background file
  they point to: brain/account-deep-dive_ANCHOR.md.
- After every point you make, show where it came from, like [Source: 2026-06-18-clay-sponsorship-intro].
  Don't say anything you can't back up.
- Then save your answer as a page at brain/writing/clay-pitch-recommendation.md, add it to
  brain/index.md under a new "Writing" heading, and add this line to brain/log.md:
  ## [today's date] query | Clay pitch recommendation
```

**You should see** an answer that says, in short: **no standard package** — Clay runs its own events and
wasn't keen on a generic booth. Pitch a **co-created track plus a Clay Club London** evening instead. And
your first contact is **Bruno Estrella**. Every point has a source. A new page appears at
`brain/writing/clay-pitch-recommendation.md`.

**✅ Check before moving on:**
- [ ] The answer says co-create (not a standard booth) and names Bruno Estrella.
- [ ] Every point has a `[Source: ...]` next to it.
- [ ] The answer was **saved as a page**, not just shown in chat.

**If it looks off:**
- *No sources shown* → paste: "Add a source after every point, and remove anything you can't source."
- *It only answered in chat* → paste: "Now save that as brain/writing/clay-pitch-recommendation.md and
  update index.md and log.md."

> Notice what happened: you asked once, and the answer became a **permanent page**. Next time, the work is
> already done. That's the difference between a brain and a search box.

---

## Step ③ — Let it catch a mistake

```
[Step 3 of 8]  ◉───◉───◉───○───○───○───○───○
```

**What you'll do:** point your brain at your messy tracker spreadsheet and your CRM, and let it find
where they disagree. This is the moment the brain saves you from a bad number in a meeting.

**Paste this to Claude:**

```
Compare my hand-built tracker (data/sponsorship-tracker_WIP.xlsx) against the real CRM
(data/attio_deals.csv). The tracker is my manual spreadsheet and I think it's gone stale.

Find every place they disagree about a deal — its stage, its amount, or whether it's even there. For
each one, tell me: the deal, what the tracker says, what the CRM says, and which one to trust (the CRM
is the source of truth).

Then write them into a new file brain/gaps.md, one line each under a "## Contradictions" heading, and
add this to brain/log.md:
## [today's date] lint | tracker vs CRM
Don't change anything in data/.
```

**You should see** the brain catch (at least) these four problems:

```
  Deal           Your spreadsheet says   The CRM says        →  Trust
  ──────────     ─────────────────────   ───────────────        ─────
  ChurnZero      "Verbal yes 🤞"          Lost                   CRM
  Cremarc        £25,000                 £16,000                CRM
  Salesloft      listed twice (£45k x2)  one £45,000 deal       CRM
  Transmission   (missing!)              £28,000, Won           CRM
```

A new file `brain/gaps.md` lists these. It's also fine — and correct — if Claude flags a few **extra**
deals that are in the CRM but missing from your hand-built tracker (for example LocalGlobe, both Lost).
Your tracker is an incomplete list, so finding more gaps than four means it's working, not that you did
anything wrong.

**✅ Check before moving on:**
- [ ] It found at least the ChurnZero and Cremarc problems (the clearest two).
- [ ] `brain/gaps.md` exists and points to both the tracker and the CRM.
- [ ] It says to trust the **CRM**, not the spreadsheet.

**If it looks off:**
- *It says it can't open the spreadsheet* → paste: "It's a normal Excel file — please open it as a
  spreadsheet and read the deal rows."
- *It trusted the spreadsheet* → paste: "The CRM (attio_deals.csv) is the source of truth. Mark the
  spreadsheet as stale where they disagree."

> The pros call this a **"lint"** — a health check. A brain you only ever add to goes stale quietly.
> This is what keeps it honest. **You've now done all three basics: teach it, ask it, check it.**

```
   ✓ PART 1 COMPLETE — you have a working brain.
   Now let's make it solid enough to grow.
```

---
---

# PART 2 — make it solid

So far you have a brain that works. Part 2 adds the handful of habits that stop it from getting messy as
it grows from 5 pages to 500. Same files, just tidier and smarter.

## Step ④ — Give every page one simple shape

```
[Step 4 of 8]  ◉───◉───◉───◉───○───○───○───○
```

**What you'll do:** put every page into the same two-part shape, so you always know where to look.

```
   ┌─ Clay ─────────────────────────────────┐
   │  TOP = what's true right now            │ ← you rewrite this as things change
   │   • opened a London office              │
   │   • wants a co-created track, not booth │
   │ ────────────────────────────────────    │ ← the dividing line
   │  BOTTOM = what happened, with dates     │ ← you only ever ADD lines here
   │   • 2026-06-18  intro call              │
   └─────────────────────────────────────────┘
```

The top is "the situation now." The bottom is "the history." They never contradict each other because
you change the top but only add to the bottom.

**Paste this to Claude:**

```
Reshape brain/companies/clay.md and brain/people/bruno-estrella.md into this two-part layout:

- At the very top, a small info block (between --- lines) with: title, type (company or person),
  created date, updated date, sources, and status: active. For the person page also include their
  company as company: [[clay]] and their role.
- Then one short paragraph summarising where things stand right now.
- Then a "## State" section: the current facts, each with its [Source: ...].
- Then "## Open Threads": things still up in the air (dates, the new EMEA marketer starting in July).
- Then "## Sources" and "## Related" (links).
- Then a line with just --- (this is the divider).
- Below the divider, a "## Timeline" section: newest first, one dated line per event, e.g.
  2026-06-18 — Clay intro call; wants co-create not booth [Source: [[2026-06-18-clay-sponsorship-intro]]]

The rule: the top gets rewritten as things change; the timeline at the bottom only ever gets new lines
added. Also update the meeting page brain/meetings/2026-06-18-clay-sponsorship-intro.md so the full call
text sits at the bottom under a --- divider, with your bullet summary on top.
```

**✅ Check before moving on:**
- [ ] Each page has one `---` divider, with "now" on top and a dated "Timeline" below.
- [ ] Every line in the top section has a `[Source: ...]`.
- [ ] Bruno's info block shows `company: [[clay]]`.

**If it looks off:**
- *It added new facts to the top instead of the timeline* → paste: "New events go as dated lines in the
  Timeline at the bottom. The top is only for the current situation."

> One shape for every page means anyone (including you in six months) knows exactly where to look.

---

## Step ⑤ — Decide what to save vs what to look up

```
[Step 5 of 8]  ◉───◉───◉───◉───◉───○───○───○
```

**What you'll do:** stop your brain from copying things that live in the CRM — because copies go stale.

Simple rule:

```
   Things that CHANGE often          Things that happened ONCE
   (deal stage, deal amount)         (a call, an email)
   ───────────────────────           ─────────────────────
   → DON'T copy them in.             → DO save them in the brain.
     Look them up in the CRM            They never change, and your
     when you need them.                pages point to them as proof.
```

**Paste this to Claude:**

```
Update brain/companies/clay.md so it doesn't copy Clay's live CRM details (its deal stage, deal amount,
owner) — those change, and a copy would go stale. Instead:

- In the info block at the top, add a line linking to the live record:
  attio_company_id: 208c93a7-381b-4965-ac04-2ea3584bff04
  (that's Clay's ID — you can confirm it in data/attio_companies.csv, the clay.com row.)
- Remove any hard-coded deal stage or amount from the page body. Where the page needs current deal
  status, just say to look it up in the CRM by that ID.

Leave the call transcript where it is (that's a one-time event, we keep it). Add to brain/log.md:
## [today's date] refactor | connector posture applied to clay
```

**✅ Check before moving on:**
- [ ] `clay.md`'s info block has the `attio_company_id` line.
- [ ] No hard-coded deal stage or amount is left on the page.
- [ ] The call transcript is still there.

**If it looks off:**
- *It deleted the transcript* → paste: "Put the transcript back — we always keep call records. Only the
  changing CRM details should be looked up instead of copied."

> Save what happened. Look up what changes. That one habit is why your brain won't drift out of date.

---

## Step ⑥ — Add filing rules (so nothing gets duplicated)

```
[Step 6 of 8]  ◉───◉───◉───◉───◉───◉───○───○
```

**What you'll do:** write down two short rules so every new note has one obvious home — and so you never
end up with the **same company on two different pages**. (Your CRM has a few sneaky duplicates; you'll
catch them.)

**Paste this first message:**

```
Create two short rule files for my brain:

1. brain/RESOLVER.md — a simple "where does this go?" list. Top to bottom, first match wins, one home
   per note:
   - a person → brain/people/<first-last>.md
   - a company → brain/companies/<name>.md
   - a meeting → brain/meetings/<date>-<name>.md (call text at the bottom)
   - a deal → brain/deals/<name>.md
   - a saved answer or a draft → brain/writing/<name>.md
   - a contradiction or open question → add a line to brain/gaps.md
   - not sure yet → brain/inbox/
   Include the "check before you create" rule and the "links use just the filename" rule.

2. brain/SCHEMA.md — a one-page description of the page layout from the last few steps (the info block,
   the "now on top / dated history on bottom" shape, sources after every fact, and the idea that the
   filename is the company's ID with other spellings listed as aliases).
```

**Then paste this second message** (the duplicate-catcher):

```
Before making any new company page, check data/attio_companies.csv for the same company under a
different name or web address. If it already has a page, update that page and list the other name in an
"aliases" line — don't make a second page.

Do this for:
- "Clay" (clay.com) and "Clay Labs" (clay.run) — the SAME company. We already have brain/companies/clay.md,
  so don't make clay-labs.md. Just add aliases: ["Clay Labs", "clay.run"] to the Clay page.
- "Cognism" (cognism.com) and "Cognism Ltd" (www.cognism.com) — also the SAME company. Make ONE page
  brain/companies/cognism.md with aliases: ["Cognism Ltd", "www.cognism.com"].

Add to brain/log.md:
## [today's date] lint | removed duplicate companies (Clay/Clay Labs, Cognism/Cognism Ltd)
```

**You should see:**

```
   BEFORE (in the CRM)              AFTER (in your brain)
   ──────────────────              ─────────────────────
   Clay        (clay.com)    ─┐
   Clay Labs   (clay.run)    ─┴──▶  one page: clay.md
                                    aliases: Clay Labs, clay.run

   Cognism     (cognism.com) ─┐
   Cognism Ltd (www.cognism…)─┴──▶  one page: cognism.md
                                    aliases: Cognism Ltd, www.cognism.com
```

**✅ Check before moving on:**
- [ ] `brain/RESOLVER.md` and `brain/SCHEMA.md` exist.
- [ ] There's **one** Clay page and **one** Cognism page — no `clay-labs.md`, no second Cognism file.
- [ ] Each one lists the other name under `aliases`.

**If it looks off:**
- *It made clay-labs.md anyway* → paste: "Merge clay-labs.md into clay.md (add 'Clay Labs' and 'clay.run'
  to the aliases), then delete clay-labs.md. One company, one page."

> Two half-pages for one company is how a brain quietly turns to mush. The "check before you create"
> habit is the cheap insurance against it.

---

## Step ⑦ — Make it update itself as you work

```
[Step 7 of 8]  ◉───◉───◉───◉───◉───◉───◉───○
```

**What you'll do:** run a ready-made helper ("prep me for tomorrow's calls"), then make sure that doing
real work **automatically updates the brain** — so it gets richer just from you using it.

A helper like this is called a **skill** — it's just a saved set of instructions in the `skills/` folder
that Claude can run when you ask.

**Paste this first message (do the work):**

```
Use the instructions in skills/call-prep/SKILL.md to prep me for tomorrow's outside calls, using the
kit's files (brain/calendar_next-24h.ics and the CRM). Save the briefs to work/call-prep_next-24h.md.
```

**Then paste this second message (make it update the brain):**

```
That prep was about Clay and Bruno Estrella, but it only saved to the work/ folder. From now on, whenever
we do work that turns up something about a person or company, also add a dated line to their brain page's
Timeline.

So add a line to the bottom of brain/companies/clay.md and brain/people/bruno-estrella.md noting that we
prepped for the call and the co-creation proposal is still owed, with [Source: work/call-prep_next-24h.md].
Then add to brain/log.md:
## [today's date] enrich | call-prep updated Clay and Bruno Estrella
```

**You should see** a call-prep brief in `work/`, AND a new dated line on Clay's and Bruno's pages. The
brain is richer than it was five minutes ago — just from doing normal work.

**✅ Check before moving on:**
- [ ] The brief exists in `work/call-prep_next-24h.md`.
- [ ] Clay's page (and Bruno's) has a **new Timeline line** pointing to that brief.

**If it looks off:**
- *Nothing changed in the brain* → paste: "Now add a dated Timeline line to each person/company the prep
  covered, pointing to the brief. The brain should update whenever we do work."

> This is the whole magic in one habit: **every time you work, the brain learns.** You don't have to
> remember to update it — the work updates it.

---

## Step ⑧ — Know when you'd need more (and stop here)

```
[Step 8 of 8]  ◉───◉───◉───◉───◉───◉───◉───◉
```

**What you'll do:** write one short page that says what you built, what the "heavy machinery" version
would add, and why you don't need it yet. Then you're done.

There's a powered-up version of all this (a real database, automatic overnight clean-ups, robots that
read your email and update the brain while you sleep). It's real, and you can switch to it later **without
losing anything**. But you only need it once your brain gets big — roughly a few hundred pages, or when
plain files start feeling slow. You're nowhere near that, so you stop here, on purpose.

**Paste this to Claude:**

```
Write a short one-page file at brain/agent/[today's date]-gbrain-readiness.md that says, in plain English:
1. What we built: a brain made of simple linked files — we can teach it, ask it, and check it; every
   page has the same shape; it knows what to save vs look up; it has filing rules; and it updates itself
   when we work.
2. What the powered-up "engine" version would add that files can't: fast search when there are tons of
   pages, automatic overnight clean-up, and robots that update the brain on their own (from email, on a
   schedule).
3. When to switch to it: when there are too many pages or it starts feeling slow (roughly 200–300 pages).
4. Why we're not switching yet — and that switching later loses nothing, because the files stay the
   real source.
Keep it to one page.
```

**✅ Check — and you're finished:**
- [ ] The page names roughly when you'd upgrade (a few hundred pages, or when it feels slow).
- [ ] It says upgrading later loses nothing.

```
   🏁 DONE.
   ◉───◉───◉───◉───◉───◉───◉───◉   8 of 8
```

---
---

## What you just built

```
   STARTED WITH                          ENDED WITH
   ────────────                          ──────────
   a folder of scattered files     ─▶    a brain that:
   you had to dig through                • answers in plain English, with sources
                                         • caught the mistakes in your spreadsheet
                                         • won't duplicate or go stale
                                         • gets smarter every time you use it
```

From here, the brain powers your real work — ranking sponsors, recruiting speakers, picking the date —
except now **every job you do leaves it a little smarter.** That's the whole point. A drawer holds what
you put in it. A brain compounds.

---

### Stuck on any step?

There's a finished, correct copy of every step's result in **`facilitator/answer-key/`**. Compare yours
to it, or just re-paste the step's message. You can always catch up; you can't get permanently stuck.

### For the curious (the real names)

You used a pattern called the **LLM wiki** (Andrej Karpathy) and its fuller form **gbrain** (Garry Tan).
The three basics in Part 1 are called *ingest, query, lint*. The Part 2 habits are the *page shape
(compiled-truth + timeline)*, the *connector posture*, the *filing resolver*, and the *enrichment wiring
rule*. You don't need the words. You've already done the things.
