# SCHEMA-SOURCES — where every column header came from

The headers in this kit are the **real export column names** from each connector, not invented
labels. That is the point: when you connect the live tool, the file you loaded and the data the
tool returns line up. This file records the source for each schema and any caveats.

Confidence: **HIGH** = pulled from a live workspace or confirmed against real committed exports ·
**MED** = documented but exact strings/order vary by account · **LOW/convention** = the tool has no
fixed export schema, so we mirror the common convention.

---

## Attio — `attio_companies.csv`, `attio_people.csv`, `attio_deals.csv` · HIGH

Standard columns are the **attribute titles pulled live** from a connected Attio workspace via the
Attio MCP `list-attribute-definitions` (companies, people, deals objects). In an Attio CSV export the
attribute title is the column header verbatim; relationship attributes (`Company`, `Associated
company`, `Associated people`) export as the linked record's **name**; multi-select attributes
(`Domains`, `Email addresses`) export comma-joined in one cell.

- **Companies** standard set (in object order): `Record ID, Domains, Name, Description, Team, Categories, Primary location, Logo URL, AngelList, Facebook, Instagram, LinkedIn, Twitter, Twitter follower count, Estimated ARR, Funding raised, Foundation date, Employee range, First calendar interaction, Last calendar interaction, Next calendar interaction, First email interaction, Last email interaction, First interaction, Last interaction, Next interaction, Connection strength (legacy), Connection strength, Strongest connection, Associated deals`
- **People** standard set: `Record ID, Name, Email addresses, Description, Company, Job title, Avatar URL, Phone numbers, Primary location, AngelList, Facebook, Instagram, LinkedIn, Twitter, Twitter follower count, First calendar interaction, Last calendar interaction, Next calendar interaction, First email interaction, Last email interaction, First interaction, Last interaction, Next interaction, Connection strength (legacy), Connection strength, Strongest connection, Associated deals, Created at, Created by`
- **Deals** standard set: `Record ID, Deal name, Deal stage, Deal owner, Deal value, Associated people, Associated company, Created at, Created by`. Real deal-stage options in this workspace: `Nurturing, Lead, In Progress, Blocked, Won 🎉, Lost` (used verbatim). `Deal value` is currency-typed.
- **Custom attributes** are appended **after** the standard set — exactly as a real workspace export does. We added: companies → `Industry, Relationship, GTM segment, Owner`; people → `Relationship, Speaker topic, Owner`; deals → `Pipeline, Close date, Next step, Currency, Sponsorship tier`. (`Close date` / `Next step` are not Attio defaults — most teams add them as custom attributes, which is why they sit in the custom block.)
- Source: live Attio workspace (MCP `list-attribute-definitions`); reference: <https://docs.attio.com/>, <https://attio.com/help>.
- Texture note: the `…interaction` and `Connection strength (legacy)` columns are enrichment-only / deprecated and are mostly blank — that is how real exports look for prospect records.

## HubSpot — (schema parity reference) · MED-HIGH

We ship Attio as the CRM spine, but the kit's `connect-or-load` switch lets a HubSpot user map across.
HubSpot exports use **property display names** in **sentence case**, `Record ID` always first, then
alphabetical when "all properties" is chosen. Canonical display names: Contacts → `Record ID, First name, Last name, Email, Phone number, Job title, Company name, City, Country/Region, LinkedIn URL, Industry, Number of employees, Contact owner, Lifecycle stage, Lead status, Create date`; Companies → `Record ID, Company name, Company Domain Name, Industry, Number of employees, Annual revenue, City, Country/Region, Company owner, Lifecycle stage`; Deals → `Record ID, Deal name, Deal stage, Pipeline, Amount, Close date, Deal owner, Create date`.
- Note the casing gotchas confirmed in docs: `Company Domain Name`, `Country/Region`, `State/Region`.
- Source: <https://knowledge.hubspot.com/import-and-export/export-records>, <https://knowledge.hubspot.com/contacts/hubspots-default-contact-properties>.

## Apollo.io — `apollo_people-export_speakers.csv` · HIGH

The 62-column header is **confirmed against 3 real Apollo people-exports committed to public GitHub**
(identical core ordering). Gotchas confirmed verbatim: `Person Linkedin Url` / `Company Linkedin Url`
/ `Facebook Url` / `Twitter Url` (title-case-each-word — *not* "LinkedIn URL"); `# Employees` (leading
hash + space); `Company Name for Emails`; `Email Status`; `Work Direct Phone`; `Seniority`;
`Departments`. Phone columns are left blank here (no fabricated personal numbers); `Email Status` is
`Guessed` for rows where we have no confirmed direct email (Apollo's real behaviour) and `Verified`
otherwise; `Lists` / `Stage` carry the speaker-segment tags.
- Real exports used: `devpatelio/pyr/files/apollo-contacts-export.csv`, `Getting-Automated/sales-team-ai-agents/.../apollo-contacts-export-outline.csv`, `Elmehdi-Erraji/test-deploymen/apollo_template...csv` (GitHub).
- Apollo KB (canonical, bot-walled to automated fetch): <https://knowledge.apollo.io/hc/en-us/articles/4409237712141-Export-Contacts-to-a-CSV>.

## Clay — `clay_table_sponsor-prospects.csv` · LOW (convention, by design)

Clay has **no fixed export schema** — a table exports whatever columns the builder added, with
user-typed names. We mirror the common prospecting-table convention: `Company, Domain, Company
LinkedIn URL, Employee Count, Industry, Location, Headquarters, Funding Stage, Estimated Revenue,
Technologies, Description, Status, Signal, Score, Found With`. Most enrichment columns are left **thin
/ blank on purpose** — this is a table waiting to be enriched live (the UC1 demo).
- Source: <https://www.clay.com/university>, Clay community CSV guidance.

## Luma (lu.ma) — `luma_ticket-sales.csv` · HIGH

The 22 fixed columns are **confirmed against 4 real Luma guest-list exports on GitHub**. The file is
**BOM-prefixed**, starts with `api_id`, is **snake_case / lowercase** (not Title Case), uses
`created_at` (not "registered_at") and `ticket_type_id` + `ticket_name` (not "ticket_type"). Custom
registration questions are appended **after `ticket_name`** using the question text as the header — we
add `What's your company?`, `What's your role?`, `What's your LinkedIn?`. `checked_in_at` is blank
(the event is in the future). Crypto fields `eth_address` / `solana_address` always appear blank.
- Fixed header: `api_id,name,first_name,last_name,email,phone_number,created_at,approval_status,checked_in_at,custom_source,qr_code_url,amount,amount_tax,amount_discount,currency,coupon_code,eth_address,solana_address,survey_response_rating,survey_response_feedback,ticket_type_id,ticket_name`
- Real exports used: `opencolin/hackathon-screener/luma.csv`, `m0nq/cloud-city/.../CLOUD CITY - Guests - ...csv`, +2 more (GitHub). Doc: <https://help.luma.com/p/download-guest-csv>.
- **Deliberate texture:** the `What's your company?` answers are spelled **differently** than the CRM (`Cognism Ltd`, `clay`, `Apollo io`, `Salesloft (UK)`, `Eleven Labs`) — the join-key mess the UC-dashboard demo fixes.

## Supermetrics / ad-spend — `marketing-spend_export.csv` · MED

Mirrors a Supermetrics-style ad-spend pull: `Date, Data source, Account name, Campaign name, Clicks,
Impressions, Cost, Currency, Conversions, CPC, CTR, Conversion rate`. **Deliberate texture:** campaign
names reference sponsor companies with **different spellings** than the CRM, and even our own
`Account name` is spelled three ways (`GTM Tech Week`, `GTM Week London`, `GTMTechWeek-London`).
- Source: Supermetrics field reference / common Ads-export shape.

## Granola — `brain/granola_*-transcript.md` · HIGH (structure)

Granola has **no CSV export** — it produces markdown (AI notes + diarized transcript). There is no
official file schema; community exporters (granary, granola-cli) converge on: a title + date/attendee
metadata, an AI-notes section, a `---` fold, then a `## Transcript` of `**Speaker:** text` lines. We
mirror that, with optional YAML frontmatter (`type, date, attendees, transcript_status`). One
transcript is intentionally **partial/garbled** (`transcript_status: partial`) — the graceful-handling
demo.
- Source: <https://docs.granola.ai/>, `wassimk/granary`, `magarcia/granola-cli` (GitHub).

---

### Two things worth a fresh real export before a high-stakes run
1. **Apollo** column *order* can shift between accounts — strings are verbatim, order is the common documented one.
2. **Luma** beyond the confirmed fixed set, custom-question columns vary per event.
