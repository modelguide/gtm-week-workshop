# Live build — the meeting-prep skill (Part III hero)

The 15 minutes everything else builds toward. You build a real skill *on stage*, end to end,
with the room following along. Target behaviour = the pre-built `skills/call-prep/SKILL.md`
(your pocket solution if the live build stalls).

**Where it sits:** Part III, ~10:45–11:00. Sequence: install an official skill (contrast) →
**build this one live** (hero) → leave `sponsor-outreach` for Build Time.

**The arc in one line:** run the task once by hand → say "make this a skill" → answer its
questions → test it → tweak one thing → "you just built an automation; after lunch it runs
itself."

---

## 0 · Contrast first (≈3 min) — install one, feel the gap
SAY: "Before we build, let's install one someone else made — so you see what a skill even is."
DO: install/run the official `sales:call-prep` (or `sales:account-research`) skill on a kit
company, e.g. Clay.
EXPECT: a decent, *generic* brief — no knowledge of our pipeline, our Granola calls, our
"why now."
LAND: "Useful. But it doesn't know *our* deals. Let's build one that does."

## 1 · Run the motion once, by hand (≈3 min)
SAY: "The most common GTM task: walking into a call prepared. Watch me do it once, manually."
PASTE:
```
I have two external calls tomorrow (brain/calendar_next-24h.ics). For each, pull what we
know from the CRM spine (data/attio_*), the Granola transcripts and email threads in brain/,
and data/signals_feed.csv (the "why now"). Give me a one-page prep per call: where the
relationship stands, the why-now, 3 questions, likely objections, and the next step.
```
EXPECT: two briefs — **Clay** (warm, anchor account, London office, co-create not booth) and
**Sam Jacobs / Pavilion** (keynote-only — Pavilion is on do-not-approach). Point at the
Granola pull and the do-not-approach flag out loud: "it read my call notes and caught a
landmine."

## 2 · Turn it into a skill (≈4 min) — the moment
SAY: "I don't want to retype that every morning. Watch — I just *ask* for a skill."
PASTE:
```
That was exactly right and I'll want it every morning. Turn it into a skill called
"meeting-prep". Write the SKILL.md: the steps you just took, which files (and live
connectors, if present) to read, and the one-page output format you just used. Then show
me the skill and offer a test run.
```
EXPECT: skill-creator drafts `SKILL.md` and asks 2–3 clarifying questions. Answer them live,
out loud, so they see authoring is a conversation:
- *Which calendar?* → "Google Calendar if connected, else the .ics file." (this is the
  connect-or-load lesson — say it)
- *Output length?* → "one page, max."
- *Handle missing data?* → "leave blanks blank, never invent; flag partial transcripts."

## 3 · Test it (≈2 min)
SAY: "Now run the skill itself — not my prompt."
DO: trigger it ("prep me for tomorrow's calls" / `/meeting-prep`).
EXPECT: same quality, zero re-explaining. Hold up the before (manual prompt) vs after (one
word). "That's the whole point — say it once, keep it forever."

## 4 · Tweak one thing (≈2 min) — skills are editable
SAY: "It's just a markdown file. I can sharpen it." 
PASTE:
```
Update the skill: always surface a ⚠ line if the company is in do-not-approach.csv, and
always cite the Granola transcript date so I can trust it. Re-run on tomorrow's calls.
```
EXPECT: the edit lands; re-run shows the new behaviour. "You just edited an automation in
plain English."

## 5 · Land the Part IV hook (≈1 min)
SAY: "After lunch we tell this skill to run itself every morning at 7 and drop the briefs in
Slack. That's the difference between a tool you open and one that works while you sleep."
→ transition to UC1.

---

## If the live build stalls (recovery)
- Skill-creator hangs or writes something off → "here's one I built earlier," open
  `skills/call-prep/SKILL.md`, walk it, run it. Same lesson, no dead air.
- Connectors not connected in the room → that's fine, it's the *point*: it runs file-only on
  the kit's `brain/granola_*` transcripts. Say so.
- Running long → skip step 4 (the tweak); keep steps 1–3 and the Part IV hook. Never cut the
  "make this a skill" moment — that's the whole segment.

## What "good" looks like (so you know it worked)
- The skill exists as a file the participant can see and re-run by name.
- It pulled a real Granola transcript and a real signal, and caught the Pavilion do-not-approach flag.
- One participant says some version of "wait, that's it?" — that's the segment landing.
