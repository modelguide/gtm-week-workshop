/**
 * speakers.ts — REAL, verified GTM leaders seeded as speaker rows.
 *
 * Every person is real (web-verified 2026-06-22). `co`/`d` must match a COMPANIES entry in
 * seed.ts so people→company joins resolve. `warsaw: true` = real Warsaw 2026 speaker (tagged
 * past_speaker); otherwise a London/EMEA speaker prospect. `tier`: A = marquee keynote draw,
 * B = strong session speaker, C = niche/practitioner. LinkedIn slug left '' where it could not
 * be confirmed (never guessed) — that absence is realistic CRM texture.
 */

export interface Speaker {
  n: string;          // full name
  role: string;
  co: string;         // company name — must match a COMPANIES.n
  d: string;          // company domain — must match a COMPANIES.d
  li: string;         // LinkedIn slug (in/<slug>), or '' if unconfirmed
  city: string;
  country: string;
  angle: string;      // speaker topic
  warsaw: boolean;    // past Warsaw 2026 speaker
  tier: 'A' | 'B' | 'C';
}

export const SPEAKERS: Speaker[] = [
  // ── Warsaw 2026 speakers (past_speaker) ──────────────────────────────────
  { n: 'Margaret Sikora', role: 'CEO', co: 'Woodpecker', d: 'woodpecker.co', li: 'margaretsikora', city: 'Wrocław', country: 'Poland', angle: 'Cold email deliverability at scale', warsaw: true, tier: 'B' },
  { n: 'George Gavrila', role: 'CMO', co: 'Woodpecker', d: 'woodpecker.co', li: 'georgegavrila', city: 'Wrocław', country: 'Poland', angle: 'Outbound marketing for sales tools', warsaw: true, tier: 'B' },
  { n: 'Frank Sondors', role: 'CEO', co: 'Salesforge', d: 'salesforge.ai', li: 'franksondors', city: 'Vilnius', country: 'Lithuania', angle: 'Scaling AI sales agents (Agent Frank)', warsaw: true, tier: 'A' },
  { n: 'Emilia Korczyńska', role: 'VP Marketing', co: 'Userpilot', d: 'userpilot.com', li: 'emiliakorczynska', city: 'London', country: 'UK', angle: 'Product-led content engine', warsaw: true, tier: 'B' },
  { n: 'Justyna Dzikowska', role: 'Head of Marketing', co: 'Brand24', d: 'brand24.com', li: 'justyna-dzikowska', city: 'Wrocław', country: 'Poland', angle: 'Brand-led demand and social listening', warsaw: true, tier: 'B' },
  { n: 'Mick Griffin', role: 'CGO', co: 'TRAFFIT', d: 'traffit.com', li: 'mickgriffin', city: 'Wrocław', country: 'Poland', angle: 'Building GTM in CEE markets', warsaw: true, tier: 'B' },
  { n: 'Krzysztof Szyszkiewicz', role: 'Co-founder', co: 'Valueships', d: 'valueships.com', li: 'krzysztof-szyszkiewicz', city: 'Wrocław', country: 'Poland', angle: 'SaaS pricing and monetization', warsaw: true, tier: 'B' },
  { n: 'Piotr Zaniewicz', role: 'CEO', co: 'Meaningful Sales', d: 'meaningfulsales.com', li: 'pzaniewicz', city: 'Wrocław', country: 'Poland', angle: 'AI outbound that does not feel like spam', warsaw: true, tier: 'C' },
  { n: 'Cezar Reszel', role: 'CEO', co: 'ZYNT', d: 'getzynt.com', li: 'cezar-reszel', city: 'Warsaw', country: 'Poland', angle: 'Buying-signal intelligence', warsaw: true, tier: 'C' },
  { n: 'Vasilije Markovic', role: 'Founder', co: 'Cognee', d: 'cognee.ai', li: 'vasilije-markovic-13302471', city: 'Berlin', country: 'Germany', angle: 'AI memory for GTM agents', warsaw: true, tier: 'B' },
  { n: 'Michał Skurowski', role: 'CEO', co: 'Livespace', d: 'livespace.io', li: '', city: 'Warsaw', country: 'Poland', angle: 'Sales process as a system', warsaw: true, tier: 'C' },
  { n: 'Marcin Stańczak', role: 'CRO', co: 'Livespace', d: 'livespace.io', li: '', city: 'Warsaw', country: 'Poland', angle: 'Revenue operations for CRM', warsaw: true, tier: 'C' },
  { n: 'Gosia Boryń', role: 'Partner', co: 'TechTree', d: 'techtree.dev', li: '', city: 'Warsaw', country: 'Poland', angle: 'From ML eng to GTM (ex-neptune.ai → OpenAI)', warsaw: true, tier: 'B' },
  { n: 'Łukasz Jakubowski', role: 'Founder', co: 'proclaim.studio', d: 'proclaim.studio', li: 'woocashh', city: 'Warsaw', country: 'Poland', angle: 'Generative media for GTM (ex-Palantir FDE)', warsaw: true, tier: 'B' },
  { n: 'Tomasz Dentko', role: 'Automations Engineer', co: 'ElevenLabs', d: 'elevenlabs.io', li: 'tomasz-dentko', city: 'Warsaw', country: 'Poland', angle: 'GTM automation in practice', warsaw: true, tier: 'B' },
  { n: 'Paweł Manowiecki', role: 'Sr Solution Engineer', co: 'Snowflake', d: 'snowflake.com', li: 'manowiecki', city: 'Warsaw', country: 'Poland', angle: 'Data foundations for GTM', warsaw: true, tier: 'C' },
  { n: 'Michał Kramarz', role: 'Head of Incubation CEE', co: 'Google Cloud', d: 'cloud.google.com', li: 'mkramarz', city: 'Warsaw', country: 'Poland', angle: 'AI for startups', warsaw: true, tier: 'B' },

  // ── London / UK GTM execs (speaker prospects) ────────────────────────────
  { n: 'James Isilay', role: 'Co-founder & CEO', co: 'Cognism', d: 'cognism.com', li: 'james-isilay', city: 'London', country: 'UK', angle: 'Building a $50M+ ARR EMEA sales-intelligence company', warsaw: false, tier: 'A' },
  { n: 'Alice de Courcy', role: 'CMO', co: 'Cognism', d: 'cognism.com', li: 'alice-de-courcy-5205516a', city: 'London', country: 'UK', angle: 'Diary of a first-time CMO; brand-led pipeline', warsaw: false, tier: 'A' },
  { n: 'Liam Bartholomew', role: 'Global Head of Demand Gen', co: 'Cognism', d: 'cognism.com', li: 'liam-bartholomew-90004b83', city: 'London', country: 'UK', angle: 'Demand gen vs lead gen', warsaw: false, tier: 'B' },
  { n: 'Jonathon Ilett', role: 'VP of Global Sales', co: 'Cognism', d: 'cognism.com', li: 'jonathonilett', city: 'London', country: 'UK', angle: 'Scaling outbound from early-stage to $80M+ ARR', warsaw: false, tier: 'B' },
  { n: 'Dominic Allon', role: 'CEO', co: 'Cognism', d: 'cognism.com', li: 'dominicallon', city: 'London', country: 'UK', angle: 'B2B data + AI (ex-Pipedrive/Google)', warsaw: false, tier: 'B' },
  { n: 'Stjepan Buljat', role: 'Chief Innovation Officer & Co-founder', co: 'Cognism', d: 'cognism.com', li: 'stjepanbuljat', city: 'London', country: 'UK', angle: 'Scaling sales-intelligence data engineering', warsaw: false, tier: 'C' },
  { n: 'Chris Evans', role: 'Chief Revenue Officer', co: 'Cognism', d: 'cognism.com', li: '', city: 'London', country: 'UK', angle: 'Rebuilding a sales-intelligence GTM org', warsaw: false, tier: 'C' },
  { n: 'Tom Glason', role: 'Co-founder & CEO', co: 'ScaleWise', d: 'scalewise.co', li: 'tomglason', city: 'London', country: 'UK', angle: 'Fractional revenue leadership; Pavilion London', warsaw: false, tier: 'B' },
  { n: 'Hannah Ajikawo', role: 'Founder & CEO', co: 'Revenue Funnel', d: 'revenuefunnel.co.uk', li: 'hannah-ajikawo', city: 'London', country: 'UK', angle: 'RevOps / GTM systems; LinkedIn Top Voice', warsaw: false, tier: 'B' },
  { n: 'Daniel Disney', role: 'Founder', co: 'The Daily Sales', d: 'danieldisney.online', li: 'danieldisney', city: 'London', country: 'UK', angle: 'Social selling on LinkedIn; #1 UK sales influencer', warsaw: false, tier: 'A' },
  { n: 'Tim Hughes', role: 'Co-founder & CEO', co: 'DLA Ignite', d: 'dlaignite.com', li: 'timothyhughessocialselling', city: 'London', country: 'UK', angle: 'Social selling; digital-first transformation', warsaw: false, tier: 'B' },
  { n: 'Tom Boston', role: 'Brand Awareness Manager', co: 'MySalesCoach', d: 'mysalescoach.com', li: 'tom-boston', city: 'Birmingham', country: 'UK', angle: 'Sales creator content; SDR community', warsaw: false, tier: 'B' },
  { n: 'Justin Rowe', role: 'Founder & CMO', co: 'Impactable', d: 'impactable.com', li: 'justin-rowe-4043339b', city: 'London', country: 'UK', angle: 'LinkedIn advertising and B2B lead gen', warsaw: false, tier: 'C' },
  { n: 'Arun Mani', role: 'Chief Revenue Officer', co: 'Pleo', d: 'pleo.io', li: '', city: 'London', country: 'UK', angle: 'Scaling multi-market GTM toward $100M ARR', warsaw: false, tier: 'B' },
  { n: 'James Keating', role: 'Chief Marketing Officer', co: 'Pleo', d: 'pleo.io', li: 'james-keating-902405', city: 'London', country: 'UK', angle: 'Fintech category leadership', warsaw: false, tier: 'B' },
  { n: 'Pat Phelan', role: 'MD UK&I / Chief Customer Officer', co: 'GoCardless', d: 'gocardless.com', li: 'patphelan1', city: 'London', country: 'UK', angle: 'Commercial + customer leadership at scale', warsaw: false, tier: 'B' },
  { n: 'Duncan Barrigan', role: 'Chief Product & Growth Officer', co: 'GoCardless', d: 'gocardless.com', li: 'duncanbarrigan', city: 'London', country: 'UK', angle: 'Product-led growth at scale', warsaw: false, tier: 'B' },
  { n: 'Rich Mason', role: 'CRO, International', co: 'Paddle', d: 'paddle.com', li: 'rich-mason-59875b14', city: 'London', country: 'UK', angle: 'Scaling international enterprise revenue', warsaw: false, tier: 'B' },
  { n: 'Ben Aronsten', role: 'Chief Marketing Officer', co: 'Paddle', d: 'paddle.com', li: 'benaronsten', city: 'London', country: 'UK', angle: 'Category marketing for SaaS GTM', warsaw: false, tier: 'B' },
  { n: 'Andrew Davies', role: 'Chief Innovation Officer', co: 'Paddle', d: 'paddle.com', li: 'andjdavies', city: 'London', country: 'UK', angle: 'First-principles B2B marketing', warsaw: false, tier: 'B' },
  { n: "Donn D'Arcy", role: 'Chief Revenue Officer', co: 'Multiverse', d: 'multiverse.io', li: 'donnd', city: 'London', country: 'UK', angle: 'AI-upskilling GTM (ex-MongoDB EMEA)', warsaw: false, tier: 'B' },
  { n: 'Gad Elkin', role: 'VP Sales, EMEA', co: 'Snyk', d: 'snyk.io', li: 'gadelkin', city: 'London', country: 'UK', angle: 'Scaling developer-security enterprise sales', warsaw: false, tier: 'C' },
  { n: 'Abid Mumtaz', role: 'Global Head, Wise Platform', co: 'Wise', d: 'wise.com', li: 'abid-mumtaz', city: 'London', country: 'UK', angle: 'Embedded-payments platform GTM', warsaw: false, tier: 'C' },
  { n: 'Giacomo Mariotti', role: 'General Manager, EMEA', co: 'Tractable', d: 'tractable.ai', li: 'giacomo-mariotti', city: 'London', country: 'UK', angle: 'Scaling applied-AI commercial partnerships', warsaw: false, tier: 'C' },
  { n: 'Juan de Castro', role: 'Chief Commercial & Operating Officer', co: 'Cytora', d: 'cytora.com', li: 'jdcastro', city: 'London', country: 'UK', angle: 'Selling AI into commercial insurance', warsaw: false, tier: 'C' },
  { n: 'Robert Blackler', role: 'Chief Revenue Officer', co: 'Beauhurst', d: 'beauhurst.com', li: 'robertblackler', city: 'London', country: 'UK', angle: 'Scaling revenue at a bootstrapped data SaaS', warsaw: false, tier: 'C' },
  { n: 'Christopher Colley', role: 'VP, Global Sales', co: 'Attest', d: 'askattest.com', li: 'chriscol', city: 'London', country: 'UK', angle: 'CX/insights-led selling', warsaw: false, tier: 'C' },
  { n: 'Abhirukt Sapru', role: 'Chief Commercial Officer', co: 'Omnea', d: 'omnea.co', li: 'abhirukt', city: 'London', country: 'UK', angle: 'Scaling an AI-procurement Series B (ex-Tessian CRO)', warsaw: false, tier: 'B' },
  { n: 'Neil Ryland', role: 'Chief Revenue Officer', co: 'Benefex', d: 'benefex.com', li: 'nryland', city: 'Southampton', country: 'UK', angle: 'Built Peakon revenue org to Workday acquisition', warsaw: false, tier: 'C' },
  { n: 'Lauren Berkemeyer', role: 'Chief Marketing Officer', co: 'YuLife', d: 'yulife.com', li: 'laurenberkemeyer', city: 'London', country: 'UK', angle: 'Brand-led category creation in insurtech', warsaw: false, tier: 'C' },
  { n: 'Phoebe Wallis', role: 'Chief Revenue Officer', co: 'Griffin', d: 'griffin.com', li: 'phoebe-wallis-6758a0a4', city: 'London', country: 'UK', angle: 'Building a BaaS revenue function', warsaw: false, tier: 'C' },
  { n: 'Neil Hopcroft', role: 'VP Sales — Strategic Brands & Fintech', co: 'Form3', d: 'form3.tech', li: 'neilhopcroft', city: 'London', country: 'UK', angle: 'Migrating Tier-1 banks to cloud payments', warsaw: false, tier: 'C' },
  { n: 'Matt Hooper', role: 'Chief Marketing Officer', co: 'Quantexa', d: 'quantexa.com', li: 'matthooper1', city: 'London', country: 'UK', angle: 'Enterprise marketing for decision intelligence', warsaw: false, tier: 'C' },
  { n: 'Charles Senabulya', role: 'Chief Commercial Officer', co: 'Quantexa', d: 'quantexa.com', li: 'charlessenabulya', city: 'London', country: 'UK', angle: 'Global commercial motion at a data-analytics scale-up', warsaw: false, tier: 'C' },
  { n: 'Carles Reina', role: 'VP Revenue', co: 'ElevenLabs', d: 'elevenlabs.io', li: 'carlesreina', city: 'London', country: 'UK', angle: 'Built an AI-native revenue org to ~$330M ARR', warsaw: false, tier: 'A' },
  { n: 'Lesley Ronaldson', role: 'VP / GM EMEA', co: 'Gong', d: 'gong.io', li: 'lesleyronaldson', city: 'London', country: 'UK', angle: 'Leading EMEA revenue (ex-Dell, LinkedIn, Asana)', warsaw: false, tier: 'B' },
  { n: 'Stefano Iacono', role: 'Global Marketing Director', co: '6sense', d: '6sense.com', li: 'stefano-iacono', city: 'London', country: 'UK', angle: 'Built 6sense EMEA pipeline engine', warsaw: false, tier: 'C' },
  { n: 'Ollie Bryden', role: 'VP Marketing', co: 'Spendesk', d: 'spendesk.com', li: 'ollie-bryden-207', city: 'London', country: 'UK', angle: 'Scaling a fintech brand and AI-for-finance GTM', warsaw: false, tier: 'C' },
  { n: 'Helena Wood', role: 'VP Marketing', co: 'Juro', d: 'juro.com', li: 'helena-wood-uk', city: 'Edinburgh', country: 'UK', angle: 'Full-funnel GTM at an AI contract platform', warsaw: false, tier: 'C' },

  // ── UK/EMEA sales & marketing voices, authors, community ─────────────────
  { n: 'Benjamin Dennehy', role: 'Founder ("UK\'s Most Hated Sales Trainer")', co: 'Sales Matrix', d: 'salesmatrixcourses.com', li: 'benjamindennehy', city: 'London', country: 'UK', angle: 'Provocative prospecting/discovery/closing', warsaw: false, tier: 'B' },
  { n: 'Mark Ackers', role: 'Co-founder & Head of Sales', co: 'MySalesCoach', d: 'mysalescoach.com', li: 'markackers', city: 'Newcastle', country: 'UK', angle: 'Coaching-driven prospecting (author, Problem Prospecting?!)', warsaw: false, tier: 'C' },
  { n: 'Richard Smith', role: 'Head of Growth', co: 'MySalesCoach', d: 'mysalescoach.com', li: 'richard-smith-mysalescoach', city: 'Newcastle', country: 'UK', angle: 'Cold calling and sales-conversation coaching', warsaw: false, tier: 'C' },
  { n: 'Jonny Adams', role: 'Managing Consultant', co: 'SBR Consulting', d: 'sbrconsulting.com', li: 'jonnyadams', city: 'London', country: 'UK', angle: 'Sales transformation and enablement', warsaw: false, tier: 'C' },
  { n: 'Gerry Hill', role: 'RVP EMEA, Strategy & Alliances', co: 'ConnectAndSell', d: 'connectandsell.com', li: 'beaccurate', city: 'London', country: 'UK', angle: 'Outbound efficiency and conversation rates', warsaw: false, tier: 'C' },
  { n: 'Pete Crosby', role: 'CEO & Co-founder (4x SaaS CRO)', co: 'Revelesco', d: 'revelesco.com', li: 'peterdcrosby', city: 'London', country: 'UK', angle: 'Scale-up revenue leadership; Pavilion London CRO', warsaw: false, tier: 'B' },
  { n: 'Dougie Loan', role: 'GTM Leader', co: 'SourceWhale', d: 'sourcewhale.com', li: 'dougieloan', city: 'London', country: 'UK', angle: 'RevOps/GTM tooling and community', warsaw: false, tier: 'C' },
  { n: 'Jason Bradwell', role: 'Founder & Host (B2B Better)', co: 'B2B Better', d: 'b2b-better.com', li: 'jason-bradwell-40b45751', city: 'London', country: 'UK', angle: 'B2B content and podcasting for complex industries', warsaw: false, tier: 'C' },
  { n: 'Sophie Miller', role: 'Founder', co: 'Pretty Little Marketer', d: 'prettylittlemarketer.com', li: 'sophiealicemiller', city: 'London', country: 'UK', angle: 'Accessible social/LinkedIn marketing (550k+ community)', warsaw: false, tier: 'B' },
  { n: 'Fred Copestake', role: 'Founder', co: 'Brindis', d: 'brindis.co.uk', li: 'fredcopestake', city: 'Nottingham', country: 'UK', angle: 'Collaborative/consultative selling', warsaw: false, tier: 'C' },
  { n: 'Ollie Whitfield', role: 'Demand Gen / Creator', co: 'VanillaSoft', d: 'vanillasoft.com', li: 'olliewhitfield', city: 'London', country: 'UK', angle: 'Creative demand gen, video, cold calling', warsaw: false, tier: 'C' },
  { n: 'Alex Theuma', role: 'Founder & CEO', co: 'SaaStock', d: 'saastock.com', li: 'alextheuma', city: 'Dublin', country: 'Ireland', angle: 'Building Europe\'s SaaS community; AI in GTM', warsaw: false, tier: 'B' },
  { n: 'Louis Grenier', role: 'Founder & Host', co: 'STFO', d: 'stfo.io', li: 'louisgrenier', city: 'Dublin', country: 'Ireland', angle: 'No-BS positioning and GTM', warsaw: false, tier: 'C' },
  { n: 'Stephen Allott', role: 'Venture Partner (Sales)', co: 'Seedcamp', d: 'seedcamp.com', li: '', city: 'London', country: 'UK', angle: 'Open-source startup-sales playbook', warsaw: false, tier: 'C' },
  { n: 'Maja Voje', role: 'Founder & GTM Advisor', co: 'GTM Strategist', d: 'gtmstrategist.com', li: 'majavoje', city: 'Ljubljana', country: 'Slovenia', angle: 'GTM Strategist author; advised 750+ startups', warsaw: false, tier: 'B' },

  // ── GTM engineering / RevOps / Clay crowd (UK/EU) ────────────────────────
  { n: 'Mark Colgan', role: 'Co-Founder / Fractional Outbound', co: 'Outbound Sales Tech', d: 'speakonpodcasts.com', li: 'outboundsalestech', city: 'London', country: 'UK', angle: 'Signal-based outbound + Clay practitioner', warsaw: false, tier: 'C' },
  { n: 'Mohan Muthoo', role: 'Founder', co: 'Spring Drive', d: 'springdrive.co', li: 'mohankm1', city: 'London', country: 'UK', angle: '4th-ever UK Clay expert; positioning-led GTM eng', warsaw: false, tier: 'C' },
  { n: 'Penn Frank', role: 'Co-Founder', co: 'StackOptimise', d: 'stackoptimise.com', li: 'penn-frank', city: 'London', country: 'UK', angle: 'GTM engineer; 500k+ msgs/mo Clay+Smartlead agency', warsaw: false, tier: 'C' },
  { n: 'Felix Frank', role: 'Co-Founder', co: 'StackOptimise', d: 'stackoptimise.com', li: 'felix-frank-stack', city: 'London', country: 'UK', angle: 'GTM engineer; certified Clay expert', warsaw: false, tier: 'C' },
  { n: 'Harry Sims', role: 'GTM / Outbound', co: 'Common Room', d: 'commonroom.io', li: 'outbound-works', city: 'Portsmouth', country: 'UK', angle: 'Outbound playbooks', warsaw: false, tier: 'C' },
  { n: 'Bill Stathopoulos', role: 'Co-founder & CEO', co: 'SalesCaptain', d: 'salescaptain.io', li: 'billstath', city: 'London', country: 'UK', angle: 'Top Clay Enterprise partner; hosts Clay Club London', warsaw: false, tier: 'C' },
  { n: 'Dan Keegan', role: 'Founder', co: 'GTM Quest', d: 'gtm.quest', li: '', city: 'London', country: 'UK', angle: 'Clay-powered ABM / GTM engineering', warsaw: false, tier: 'C' },
  { n: 'Max Mitcham', role: 'Founder & CEO', co: 'Trigify', d: 'trigify.io', li: 'max-mitcham', city: 'Cardiff', country: 'UK', angle: 'Turning LinkedIn activity into buying intent', warsaw: false, tier: 'C' },
  { n: 'Erdem Gelal', role: 'Co-founder & CEO', co: 'Flowla', d: 'flowla.com', li: 'erdemgelal', city: 'London', country: 'UK', angle: 'AI deal rooms; closing the CRM execution gap', warsaw: false, tier: 'C' },
  { n: 'Adam Holmgren', role: 'Head of Demand Gen / Founder', co: 'Fibbler', d: 'fibbler.com', li: 'adam-holmgren', city: 'Stockholm', country: 'Sweden', angle: 'European B2B demand-gen + GTM systems community', warsaw: false, tier: 'C' },
  { n: 'Toni Hohlbein', role: 'Creator & Host (ex-CRO, 2x exit)', co: 'The Revenue Formula', d: 'revenueformula.substack.com', li: 'tonihohlbein', city: 'Copenhagen', country: 'Denmark', angle: 'Data-driven zero-waste GTM', warsaw: false, tier: 'B' },
  { n: 'Thibaut Souyris', role: 'Founder & CEO', co: 'SalesLabs', d: 'saleslabs.io', li: 'thibautsouyris', city: 'Berlin', country: 'Germany', angle: 'Cold-message systems and outbound', warsaw: false, tier: 'C' },
  { n: 'Pierre Herubel', role: 'Founder / Content Educator', co: 'Pierre Herubel', d: 'pierreherubel.com', li: 'pierre-herubel-540b3949', city: 'Paris', country: 'France', angle: 'B2B demand-gen-through-content', warsaw: false, tier: 'B' },
  { n: 'Frans Riemersma', role: 'Founder / Martech Analyst', co: 'MartechTribe', d: 'martechtribe.com', li: 'fransriemersma', city: 'Amsterdam', country: 'Netherlands', angle: 'Maps the martech/GTM-tooling landscape', warsaw: false, tier: 'C' },

  // ── GTM/RevTech tool founders (EU) + globally famous draws ───────────────
  { n: 'Brice Maurin', role: 'CEO & Co-founder', co: 'La Growth Machine', d: 'lagrowthmachine.com', li: 'cebri', city: 'Bordeaux', country: 'France', angle: 'Multichannel prospecting that gets replies', warsaw: false, tier: 'C' },
  { n: 'Aurelien Aubert', role: 'Co-founder & CEO', co: 'Cargo', d: 'getcargo.io', li: 'auree', city: 'Paris', country: 'France', angle: 'The rise of the GTM engineer', warsaw: false, tier: 'B' },
  { n: 'Thibault Brioland', role: 'CEO & Co-founder', co: 'Humanlinker', d: 'humanlinker.com', li: 'tbrioland', city: 'Montpellier', country: 'France', angle: 'AI sales copilot; hyper-personalization', warsaw: false, tier: 'C' },
  { n: 'David Chevalier', role: 'Co-founder & CEO', co: 'Surfe', d: 'surfe.com', li: 'david-maurice-chevalier', city: 'Paris', country: 'France', angle: 'CRM + LinkedIn in one revenue workspace', warsaw: false, tier: 'C' },
  { n: 'Bastian Karweg', role: 'CEO & Co-founder', co: 'Dealfront', d: 'dealfront.com', li: 'bastiankarweg', city: 'Karlsruhe', country: 'Germany', angle: 'European GTM on compliant EU data', warsaw: false, tier: 'B' },
  { n: 'Benjamin Douablin', role: 'CEO & Co-founder', co: 'FullEnrich', d: 'fullenrich.com', li: 'benjamin-douablin', city: 'Paris', country: 'France', angle: 'Waterfall data enrichment', warsaw: false, tier: 'C' },
  { n: 'Paul Berloty', role: 'Co-founder & CEO', co: 'Modjo', d: 'modjo.ai', li: 'paul-berloty', city: 'Paris', country: 'France', angle: 'Generative AI reshaping sales coaching', warsaw: false, tier: 'C' },
  { n: 'Jean-Baptiste Jézéquel', role: 'Co-founder', co: 'Evaboot', d: 'evaboot.com', li: 'jb-jezequel', city: 'Paris', country: 'France', angle: 'Bootstrapped a Sales Nav scraper to $2M ARR', warsaw: false, tier: 'C' },

  // ── Global GTM voices (strong international + UK following) ───────────────
  { n: 'Sam Jacobs', role: 'Founder & CEO', co: 'Pavilion', d: 'joinpavilion.com', li: 'samfjacobs', city: 'New York', country: 'USA', angle: 'GTM leadership community; Topline podcast', warsaw: false, tier: 'A' },
  { n: 'Chris Walker', role: 'Founder & Exec Chairman', co: 'Refine Labs', d: 'refinelabs.com', li: 'chriswalker171', city: 'Boston', country: 'USA', angle: 'Demand gen; attribution skepticism; GTM efficiency', warsaw: false, tier: 'A' },
  { n: 'Dave Gerhardt', role: 'Founder', co: 'Exit Five', d: 'exitfive.com', li: 'davegerhardt', city: 'Burlington', country: 'USA', angle: 'B2B brand building; content-led GTM', warsaw: false, tier: 'A' },
  { n: 'Daniel Murray', role: 'Founder', co: 'The Marketing Millennials', d: 'themarketingmillennials.com', li: 'daniel-murray-marketing', city: 'Austin', country: 'USA', angle: 'B2B content; LinkedIn authority', warsaw: false, tier: 'B' },
  { n: 'Kyle Coleman', role: 'CMO', co: 'Copy.ai', d: 'copy.ai', li: 'kyletcoleman', city: 'San Francisco', country: 'USA', angle: 'AI-native GTM; revenue alignment', warsaw: false, tier: 'A' },
  { n: 'Sam McKenna', role: 'Founder', co: '#samsales Consulting', d: 'samsalesconsulting.com', li: 'samsalesli', city: 'New York', country: 'USA', angle: 'Buyer-first selling; show me you know me', warsaw: false, tier: 'B' },
  { n: 'Sangram Vajre', role: 'Co-founder & CEO', co: 'GTM Partners', d: 'gtmpartners.com', li: 'sangramvajre', city: 'Atlanta', country: 'USA', angle: 'ABM; GTM strategy/maturity model', warsaw: false, tier: 'A' },
  { n: 'Peep Laja', role: 'Founder', co: 'Wynter', d: 'wynter.com', li: 'peeplaja', city: 'Austin', country: 'USA', angle: 'Messaging/positioning; conversion', warsaw: false, tier: 'B' },
  { n: 'Scott Leese', role: 'Founder', co: 'Scott Leese Consulting', d: 'scottleese.com', li: 'scottleese', city: 'Austin', country: 'USA', angle: 'Startup sales playbooks; scaling 0→1', warsaw: false, tier: 'B' },
  { n: 'Liza Adams', role: 'AI & GTM Advisor', co: 'GrowthPath Partners', d: 'growthpathpartners.com', li: 'lizaadams', city: 'San Francisco', country: 'USA', angle: 'AI-driven GTM; fractional CMO', warsaw: false, tier: 'B' },
  { n: 'Matt Heinz', role: 'President', co: 'Heinz Marketing', d: 'heinzmarketing.com', li: 'mattheinz', city: 'Seattle', country: 'USA', angle: 'Demand gen strategy; pipeline accountability', warsaw: false, tier: 'C' },
  { n: 'Devin Reed', role: 'Founder', co: 'The Reeder', d: 'thereeder.co', li: 'devinreed', city: 'Austin', country: 'USA', angle: 'Content-led pipeline; sales storytelling', warsaw: false, tier: 'C' },
  { n: 'April Dunford', role: 'Founder', co: 'Ambient Strategy', d: 'aprildunford.com', li: 'aprildunford', city: 'Toronto', country: 'Canada', angle: 'B2B positioning (Obviously Awesome)', warsaw: false, tier: 'A' },
  { n: 'Josh Braun', role: 'Founder', co: 'Braun Training', d: 'joshbraun.com', li: 'josh-braun', city: 'New York', country: 'USA', angle: 'Cold email/objection handling; non-pushy outbound', warsaw: false, tier: 'B' },
  { n: 'Adam Robinson', role: 'Founder & CEO', co: 'RB2B', d: 'rb2b.com', li: 'retentionadam', city: 'Austin', country: 'USA', angle: 'Signal-based selling; founder-led GTM', warsaw: false, tier: 'A' },
  { n: 'Eric Nowoslawski', role: 'Founder', co: 'Growth Engine X', d: 'growthenginex.com', li: 'outboundphd', city: 'New York', country: 'USA', angle: 'Outbound automation; Clay enrichment workflows', warsaw: false, tier: 'B' },
  { n: 'Michel Lieben', role: 'Founder & CEO', co: 'ColdIQ', d: 'coldiq.com', li: 'michel-lieben', city: 'Tallinn', country: 'Estonia', angle: 'AI prospecting; cold-outbound tooling', warsaw: false, tier: 'B' },
  { n: 'Alex Choi', role: 'Head of Sales Dev & GTM Engineering', co: 'HockeyStack', d: 'hockeystack.com', li: 'alexsmchoi', city: 'San Francisco', country: 'USA', angle: 'Pipeline scaling; GTM eng in-house', warsaw: false, tier: 'B' },
  { n: 'Marcus Sheridan', role: 'Keynote Speaker / Author', co: 'IMPACT', d: 'marcussheridan.com', li: 'marcussheridan', city: 'Hartford', country: 'USA', angle: 'They Ask, You Answer; AI\'s impact on buyers', warsaw: false, tier: 'A' },
  { n: 'Adam Wall', role: 'GTM Infrastructure Pod Lead', co: 'Anthropic', d: 'anthropic.com', li: 'adamwall', city: 'San Francisco', country: 'USA', angle: 'Enterprise AI GTM infrastructure', warsaw: false, tier: 'B' },
  { n: 'Evan Peters', role: 'RevOps & Strategy Lead', co: 'Notion', d: 'notion.so', li: 'evanjpeters', city: 'San Francisco', country: 'USA', angle: 'PLG, RevOps, GTM automation at scale', warsaw: false, tier: 'B' },
  { n: 'Roman Ugarte', role: 'GTM Engineer', co: 'Cursor', d: 'cursor.com', li: 'romanugarte', city: 'San Francisco', country: 'USA', angle: 'GTM engineering at a fast-scaling AI dev-tools company', warsaw: false, tier: 'B' },
  { n: 'Robert Jones', role: 'GTM AI Team Lead', co: 'Canva', d: 'canva.com', li: '', city: 'Sydney', country: 'Australia', angle: 'AI integration into enterprise GTM', warsaw: false, tier: 'C' },
  { n: 'Noah Adelstein', role: 'Growth Team Lead', co: 'Rippling', d: 'rippling.com', li: 'noah-adelstein-311896b9', city: 'San Francisco', country: 'USA', angle: 'Growth/enterprise GTM scaling', warsaw: false, tier: 'C' },
];
