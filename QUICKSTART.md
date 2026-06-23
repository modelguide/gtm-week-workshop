# Quickstart (at your seat, no connectors required)

1. **Get the kit.** `git clone https://github.com/modelguide/gtm-week-workshop` (or download the
   ZIP: Code → Download ZIP) and unzip it.
2. **Open the folder as a Cowork Project** (open the `gtm-week-workshop` folder in Cowork).
3. **Paste the Custom Instructions.** Run the **P1** prompt (see `facilitator/prompts-one-pager.md`)
   to generate the project rules, then paste the output into the Project's Custom Instructions
   field. (`CLAUDE.md` already ships as a ready-made version if you want to skip this.)
4. **Load the spine.** Ask: *"Load the CRM spine — attio_companies.csv, attio_people.csv,
   attio_deals.csv. Tell me how many companies, how many open sponsorship deals, and total open
   pipeline in GBP."* No connectors needed; Claude reads the CSVs.
5. **Install the call-prep skill.** Point the skill loader at `skills/call-prep/SKILL.md` (or
   paste it into skill-creator and save).
6. **Run it.** Ask: *"Prep me for tomorrow's external calls."* You get a one-page brief per call
   from `brain/calendar_next-24h.ics` + the CRM + transcripts + signals — entirely from files.

You're now in the loop: Project → context → skill → run. Everything else (UC1–3, the dashboard)
builds on these same files. If you have a connector (Attio, Clay, Granola, …) you can flip it on
later per `connectors.config.json`, but nothing here requires it.

## Find what to automate (optional kickoff)
Want to know what's actually worth building today? Run the **workflow-audit** skill
(`skills/workflow-audit/SKILL.md`) against a project of *your own* real work — not this kit. It
reads your session history, finds the motions that repeat, quantifies their cost, and ends with
the single highest-cost thing to automate first. That's your Build-Time target.
