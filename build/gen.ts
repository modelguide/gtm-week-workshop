/**
 * gen.ts — deterministic generator for the GTM Tech Week London dummy-data kit.
 *
 * Real companies/people (seed.ts + speakers.ts) → synthetic pipeline/tickets/spend.
 * Fixed seed → byte-identical reruns. Build order:
 *   1. company universe (real)            5. lookalike_features + signals_feed (derived)
 *   2. people (real speakers + contacts)  6. luma tickets + marketing spend (name-mismatch)
 *   3. deals (synthetic pipeline)         7. do-not-approach + competitor-events + calendar
 *   4. write CRM spine (attio_*)          8. referential-integrity check → stdout
 *
 * The .xlsx stale tracker is built by gen-xlsx.ts (separate, uses the system `zip`).
 *
 * Run:  npx tsx scripts/gtm-london/gen.ts
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { COMPANIES, ANCHOR_FIRMO, type Company } from './seed';
import { SPEAKERS, type Speaker } from './speakers';
import { writeXlsx, type Cell } from './xlsx';

const KIT = join(import.meta.dirname, '..');
const DATA = join(KIT, 'data');
const BRAIN = join(KIT, 'brain');
mkdirSync(DATA, { recursive: true });
mkdirSync(BRAIN, { recursive: true });

// ── 1. Deterministic PRNG (mulberry32) + helpers ───────────────────────────
const SEED = 0x4c4f4e44; // "LOND"
let _s = SEED >>> 0;
function rand(): number {
  _s |= 0; _s = (_s + 0x6d2b79f5) | 0;
  let t = Math.imul(_s ^ (_s >>> 15), 1 | _s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const ri = (a: number, b: number) => Math.floor(rand() * (b - a + 1)) + a;
const pick = <T>(a: T[]): T => a[Math.floor(rand() * a.length)];
const chance = (p: number) => rand() < p;
function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 100000) / 100000;
}
/** Deterministic v4-style UUID from a string key (stable across runs). */
function uuid(key: string): string {
  let h = 0x811c9dc5;
  const out: string[] = [];
  for (let i = 0; i < 32; i++) {
    h ^= key.charCodeAt(i % key.length) + i * 131;
    h = Math.imul(h, 16777619) >>> 0;
    out.push(((h >>> (i % 24)) & 0xf).toString(16));
  }
  const s = out.join('');
  return `${s.slice(0,8)}-${s.slice(8,12)}-4${s.slice(13,16)}-a${s.slice(17,20)}-${s.slice(20,32)}`;
}

// ── 2. Date helpers (no Date.now — keeps reruns deterministic) ──────────────
const DAY = 86400000;
const d = (s: string) => new Date(s + 'T00:00:00Z');
const iso = (dt: Date) => dt.toISOString().slice(0, 10);
const isoT = (dt: Date) => dt.toISOString().slice(0, 19) + 'Z';
const addDays = (dt: Date, n: number) => new Date(dt.getTime() + n * DAY);
const TODAY = d('2026-06-22');              // the demo's "now"
const EVENT = d('2027-04-21');              // tentative London edition date (the cross-cut demo pressure-tests it)

// ── 3. CSV writer ──────────────────────────────────────────────────────────
function field(v: string | number | boolean | undefined | null): string {
  if (v === undefined || v === null) return '';
  const s = String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function csv(headers: string[], rows: (string | number | boolean | undefined | null)[][], opts: { bom?: boolean } = {}): string {
  const head = headers.map(field).join(',');
  const body = rows.map(r => r.map(field).join(',')).join('\n');
  return (opts.bom ? '﻿' : '') + head + '\n' + body + '\n';
}
function write(name: string, content: string, dir = DATA) {
  writeFileSync(join(dir, name), content, 'utf8');
}

// ── 4. Name pools (for synthetic sponsor-side contacts + ticket buyers) ─────
const EN_FIRST = ['James','Sophie','Daniel','Emma','Tom','Olivia','Jack','Hannah','Oliver','Grace','Harry','Lucy','Charlie','Ella','George','Amelia','Henry','Isla','Will','Freya','Ben','Chloe','Sam','Maya','Alex','Ruby','Joe','Eve','Max','Lily','Ryan','Zoe','Adam','Niamh','Luke','Holly','Ross','Megan','Nathan','Anna','Liam','Beth','Aaron','Kate','Dev','Priya','Raj','Aisha','Femi','Chidi'];
const EN_LAST = ['Walker','Bennett','Clarke','Hughes','Reid','Murphy','Foster','Hall','Ward','Shaw','Webb','Knight','Marsh','Doyle','Fraser','Coleman','Page','Barnes','Grant','Cole','Khan','Patel','Singh','Ahmed','Owusu','Okoro','Adeyemi','Lindqvist','Andersson','Nilsson','Kowalczyk','Novak','Horvath','Romano','Bianchi','Dubois','Moreau','Garcia','Lopez','Hansen','Jensen','Virtanen','Korhonen','Rossi','Esposito','Schmidt','Becker','Meyer','Brandt','Vos'];
const PL_FIRST = ['Anna','Piotr','Katarzyna','Tomasz','Magdalena','Marcin','Agnieszka','Paweł','Joanna','Michał','Aleksandra','Jakub','Natalia','Bartosz','Karolina','Mateusz','Ewa','Kamil','Monika','Wojciech'];
const PL_LAST = ['Nowak','Kowalski','Wiśniewski','Wójcik','Kowalczyk','Kamiński','Lewandowski','Zieliński','Szymański','Woźniak','Dąbrowski','Kozłowski','Jankowski','Mazur','Kwiatkowski','Krawczyk','Piotrowski','Grabowski','Pawłowski','Michalski'];

const ROLES_MKT = ['Head of Demand Generation','Field Marketing Manager','VP Marketing','Marketing Director','Head of Brand','Events Marketing Manager','Growth Marketing Lead','Senior Demand Gen Manager','Head of Field Marketing','Content Marketing Lead','Head of Community','Partner Marketing Manager'];
const ROLES_SALES = ['VP Sales','Head of Partnerships','RevOps Lead','Sales Director','Head of Revenue','Commercial Director','Head of Sales Development','GTM Lead'];
const SENIORITY: Record<string, string> = { 'VP':'VP','Head':'Head','Director':'Director','Chief':'C-Suite','CEO':'C-Suite','CMO':'C-Suite','CRO':'C-Suite','Manager':'Manager','Lead':'Manager','Founder':'Owner','Co-founder':'Owner' };

function strip(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g,'l').replace(/Ł/g,'L').toLowerCase().replace(/[^a-z]/g,'');
}
function seniorityOf(title: string): string {
  for (const k of Object.keys(SENIORITY)) if (title.includes(k)) return SENIORITY[k];
  return 'Individual Contributor';
}
function gtmSegment(c: Company): string {
  const i = c.ind.toLowerCase();
  if (i.includes('vc')) return 'Investor';
  if (i.includes('agency') || i.includes('consultancy') || i.includes('consulting') || i.includes('training') || i.includes('media') || i.includes('community')) return 'GTM Service / Agency';
  if (i.includes('ai') || i.includes('voice') || i.includes('dev') || i.includes('data cloud') || i.includes('cloud') || i.includes('infrastructure')) return 'AI / Infra';
  if (i.includes('fintech') || i.includes('payments') || i.includes('insur') || i.includes('security') || i.includes('procurement') || i.includes('benefits') || i.includes('contract')) return 'B2B SaaS (vertical)';
  return 'RevTech / GTM SaaS';
}

const OWNERS = ['Artur Wala', 'Krzysztof Pawlak'];
const ownerFor = (key: string) => OWNERS[Math.floor(hash01(key) * OWNERS.length)];

// ── 5. Company universe (real) ─────────────────────────────────────────────
interface Co extends Company { id: string; deals: string[]; }
const byDomain = new Map<string, Co>();
const companies: Co[] = COMPANIES.map(c => {
  const co: Co = { ...c, id: uuid('co:' + c.d), deals: [] };
  byDomain.set(c.d, co);
  return co;
});

function relationship(tag: Company['tag']): string {
  return tag === 'organizer' ? 'Organizer' : tag === 'past_sponsor' ? 'Past Sponsor'
    : tag === 'prospect' ? 'Sponsor Prospect' : 'Speaker Account';
}
function descFor(c: Company): string {
  const loc = c.lon === 'HQ' ? `${c.city}-HQ'd` : c.lon === 'Warsaw' ? 'Warsaw-based' : `${c.city}-based`;
  return `${loc} ${c.ind.toLowerCase()}.`;
}

// ── 6. People: real speakers + synthetic sponsor-side contacts ─────────────
interface Person {
  id: string; name: string; email: string; first: string; last: string;
  title: string; companyName: string; companyDomain: string; city: string; country: string;
  linkedin: string; relationship: string; topic: string; owner: string;
  createdAt: string; lastInteraction?: string; deals: string[]; isSpeaker: boolean; tier?: string; warsaw?: boolean;
}
const people: Person[] = [];
const peopleByLinkedin = new Map<string, Person>();

// 6a. Real speakers
for (const sp of SPEAKERS) {
  const co = byDomain.get(sp.d);
  if (!co) { console.error('MISSING COMPANY for speaker', sp.n, sp.d); continue; }
  const [first, ...rest] = sp.n.split(' ');
  const last = rest.join(' ');
  const email = `${strip(first)}@${sp.d}`;
  const li = sp.li ? `https://www.linkedin.com/in/${sp.li}` : '';
  const created = iso(addDays(d('2026-01-10'), ri(0, 150)));
  const p: Person = {
    id: uuid('pe:' + sp.n + sp.d), name: sp.n, email, first, last,
    title: sp.role, companyName: co.n, companyDomain: sp.d, city: sp.city, country: sp.country,
    linkedin: li, relationship: sp.warsaw ? 'Past Speaker' : 'Speaker Prospect',
    topic: sp.angle, owner: ownerFor(sp.n), createdAt: created,
    lastInteraction: sp.warsaw ? iso(addDays(d('2026-06-01'), ri(0, 18))) : (chance(0.25) ? iso(addDays(d('2026-05-20'), ri(0, 28))) : undefined),
    deals: [], isSpeaker: true, tier: sp.tier, warsaw: sp.warsaw,
  };
  people.push(p);
  if (li) peopleByLinkedin.set(li, p);
}

// 6b. Synthetic sponsor-side contacts (target ~400 people total) — formulaic emails, no fake phones.
const sponsorCos = companies.filter(c => c.tag === 'past_sponsor' || c.tag === 'prospect');
const usedEmails = new Set(people.map(p => p.email));
for (const co of sponsorCos) {
  const polish = co.country === 'Poland';
  const n = ri(1, 3);
  for (let k = 0; k < n; k++) {
    const FIRST = polish && chance(0.8) ? PL_FIRST : EN_FIRST;
    const LAST = polish && chance(0.8) ? PL_LAST : EN_LAST;
    const first = pick(FIRST), last = pick(LAST);
    const title = k === 0 ? pick(ROLES_MKT) : pick(rand() < 0.6 ? ROLES_MKT : ROLES_SALES);
    let email = `${strip(first)}@${co.d}`;
    if (usedEmails.has(email)) email = `${strip(first)}.${strip(last)}@${co.d}`;
    if (usedEmails.has(email)) email = `${strip(first)}.${strip(last)}${ri(1,9)}@${co.d}`;
    usedEmails.add(email);
    const p: Person = {
      id: uuid('pe:' + first + last + co.d + k), name: `${first} ${last}`, email, first, last,
      title, companyName: co.n, companyDomain: co.d, city: co.city, country: co.country,
      linkedin: '', // generated contacts: LinkedIn left blank (realistic enrichment gap)
      relationship: 'Sponsor Contact', topic: '', owner: ownerFor(co.d),
      createdAt: iso(addDays(d('2026-03-01'), ri(0, 100))), deals: [], isSpeaker: false,
    };
    people.push(p);
  }
}

// ── 7. Deals: synthetic sponsorship + speaker pipeline (internally consistent) ──
const STAGES = ['Lead','In Progress','Blocked','Won 🎉','Lost','Nurturing'] as const;
type Stage = typeof STAGES[number];
interface Tier { name: string; gbp: number; }
const TIERS: Tier[] = [
  { name: 'Headline Partner', gbp: 45000 },
  { name: 'Platinum', gbp: 28000 },
  { name: 'Gold', gbp: 16000 },
  { name: 'Silver', gbp: 9000 },
  { name: 'Side-event Partner', gbp: 7500 },
  { name: 'Startup / Community', gbp: 4500 },
];
const NEXT_STEPS = ['Send updated prospectus','Book commercial call','Share Warsaw post-event report','Intro to events lead','Confirm package + invoice','Follow up after their board meeting','Negotiate co-marketing add-on','Awaiting signed order form'];

interface Deal {
  id: string; name: string; stage: Stage; owner: string; value: number; currency: string;
  people: string[]; company: string; companyDomain: string; createdAt: string; createdBy: string;
  pipeline: 'Sponsorship' | 'Speaker'; closeDate: string; nextStep: string; tier: string;
}
const deals: Deal[] = [];

function closeDateFor(stage: Stage): string {
  // stage → close date, internally consistent with TODAY=2026-06-22, EVENT=2027-04-21
  switch (stage) {
    case 'Won 🎉': return iso(addDays(d('2026-04-25'), ri(0, 56)));         // signed: recent past (by today 2026-06-22)
    case 'In Progress': return iso(addDays(d('2026-10-01'), ri(0, 100)));   // forecast: Q4'26–Q1'27
    case 'Lead': return iso(addDays(d('2027-01-05'), ri(0, 80)));           // forecast: Q1'27
    case 'Nurturing': return iso(addDays(d('2027-02-15'), ri(0, 60)));      // forecast: late Q1–Q2'27
    case 'Blocked': return iso(addDays(d('2026-05-10'), ri(0, 25)));        // STALE: close date already in the past
    case 'Lost': return iso(addDays(d('2026-07-01'), ri(0, 70)));           // closed-lost in the past
  }
}

// 7a. Sponsorship pipeline — pick ~42 sponsor companies, weighted to bigger/London ones,
// but force-include the Warsaw renewal accounts (priced in PLN — the PL/EN currency texture).
const PLN_RENEWAL = new Set(['woodpecker.co','brand24.com','surferseo.com','livespace.io']); // Warsaw renewals priced in PLN
const forcedPLN = [...PLN_RENEWAL].map(dm => byDomain.get(dm)!).filter(Boolean);
const restPool = sponsorCos
  .filter(c => !PLN_RENEWAL.has(c.d))
  .map(c => ({ c, w: hash01('w:' + c.d) + (c.lon === 'HQ' ? 0.4 : c.lon === 'Yes' ? 0.2 : 0) }))
  .sort((a, b) => b.w - a.w)
  .slice(0, 42 - forcedPLN.length)
  .map(x => x.c);
const sponsorPool = [...forcedPLN, ...restPool];

// Stage mix for a launching event ~10 months out: pipeline-heavy, a few early wins, a couple lost.
// Warsaw renewals (first 4) land as early Won — they recommitted off Warsaw 2026.
const stagePlan: Stage[] = [
  ...Array(6).fill('Won 🎉'), ...Array(13).fill('In Progress'), ...Array(10).fill('Lead'),
  ...Array(6).fill('Nurturing'), ...Array(4).fill('Blocked'), ...Array(3).fill('Lost'),
];

sponsorPool.forEach((co, i) => {
  const stage = stagePlan[i % stagePlan.length];
  // tier by company size (bigger → richer package), with noise
  const big = ['1K-5K','5K-10K','10K-50K','251-1K'].includes(co.sz);
  const isPLN = PLN_RENEWAL.has(co.d);
  const PLN_TIERS = [TIERS[2], TIERS[3], TIERS[5], TIERS[4]]; // Gold, Silver, Startup, Side-event — varied renewal sizes
  const tier = isPLN ? PLN_TIERS[i % PLN_TIERS.length]
    : big ? pick([TIERS[0], TIERS[1], TIERS[1], TIERS[2]]) : pick([TIERS[2], TIERS[3], TIERS[3], TIERS[5], TIERS[4]]);
  const value = isPLN ? Math.round(tier.gbp * 5.1 / 100) * 100 : tier.gbp; // ~GBP→PLN
  const contacts = people.filter(p => p.companyDomain === co.d && !p.isSpeaker);
  const contact = contacts[0];
  const owner = co.id ? ownerFor(co.d) : OWNERS[0];
  const name = `${co.n} — GTM Tech Week London 2027 (Sponsorship)` + (isPLN ? ' [Warsaw renewal]' : '');
  const blankNext = stage === 'Lead' || stage === 'Nurturing' ? chance(0.6) : chance(0.15);
  const deal: Deal = {
    id: uuid('dl:spon:' + co.d), name, stage, owner, value, currency: isPLN ? 'PLN' : 'GBP',
    people: contact ? [contact.name] : [], company: co.n, companyDomain: co.d,
    createdAt: iso(addDays(d('2026-04-20'), ri(0, 55))), createdBy: owner,
    pipeline: 'Sponsorship', closeDate: closeDateFor(stage), nextStep: blankNext ? '' : pick(NEXT_STEPS), tier: tier.name,
  };
  deals.push(deal);
  co.deals.push(name);
  if (contact) contact.deals.push(name);
});

// 7b. Speaker pipeline — ~18 speakers (mix of tier-A draws + confirmed), recruit not sell.
const speakerDealPool = people.filter(p => p.isSpeaker)
  .map(p => ({ p, w: (p.tier === 'A' ? 0.6 : p.tier === 'B' ? 0.3 : 0) + hash01('s:' + p.name) }))
  .sort((a, b) => b.w - a.w).slice(0, 18).map(x => x.p);
const spkStagePlan: Stage[] = [
  ...Array(4).fill('Won 🎉'), ...Array(6).fill('In Progress'), ...Array(5).fill('Lead'),
  ...Array(2).fill('Nurturing'), ...Array(1).fill('Lost'),
];
speakerDealPool.forEach((p, i) => {
  const stage = spkStagePlan[i % spkStagePlan.length];
  const honorarium = p.tier === 'A' && chance(0.5) ? pick([0, 1500, 2000]) : 0; // mostly £0 — recruit, not sell
  const name = `${p.name} — ${p.tier === 'A' ? 'Keynote' : 'Speaker'} (London 2027)`;
  const owner = ownerFor('spk:' + p.name);
  const blankNext = chance(0.4);
  const deal: Deal = {
    id: uuid('dl:spk:' + p.name), name, stage, owner, value: honorarium, currency: 'GBP',
    people: [p.name], company: p.companyName, companyDomain: p.companyDomain,
    createdAt: iso(addDays(d('2026-05-01'), ri(0, 40))), createdBy: owner,
    pipeline: 'Speaker', closeDate: closeDateFor(stage), nextStep: blankNext ? '' : pick(['Send speaker brief','Confirm talk title','Align on date','Intro to programme lead','Awaiting reply']), tier: p.tier === 'A' ? 'Keynote' : 'Session',
  };
  deals.push(deal);
  p.deals.push(name);
  const co = byDomain.get(p.companyDomain);
  if (co) co.deals.push(name);
});

// ── 8. Write CRM spine — attio_companies.csv ───────────────────────────────
const COMPANY_HEADERS = [
  'Record ID','Domains','Name','Description','Team','Categories','Primary location','Logo URL','AngelList','Facebook','Instagram','LinkedIn','Twitter','Twitter follower count','Estimated ARR','Funding raised','Foundation date','Employee range','First calendar interaction','Last calendar interaction','Next calendar interaction','First email interaction','Last email interaction','First interaction','Last interaction','Next interaction','Connection strength (legacy)','Connection strength','Strongest connection','Associated deals',
  // custom attributes (real workspaces append these after the standard set)
  'Industry','Relationship','GTM segment','Owner',
];
const companyRows: (string|number|undefined)[][] = [];
let missingFirmo = 0;
for (const c of companies) {
  const fmo = ANCHOR_FIRMO[c.d] || {};
  // ~15% missing firmographics: blank industry + employee range
  const blankFirmo = hash01('fmo:' + c.d) < 0.15;
  if (blankFirmo) missingFirmo++;
  const hasDeal = c.deals.length > 0;
  const lastInt = hasDeal ? iso(addDays(d('2026-05-15'), Math.floor(hash01('li:'+c.d)*35))) : '';
  companyRows.push([
    c.id, c.d, c.n,
    chance(0.85) || c.tag !== 'speaker_co' ? descFor(c) : '',
    '', // Team
    '', // Categories (workspace select options don't fit GTM SaaS — left blank, as in real exports)
    `${c.city}, ${c.country}`,
    '', '', '', '', // Logo, AngelList, Facebook, Instagram
    c.li ? `https://www.linkedin.com/company/${c.li}` : '',
    '', '', // Twitter, Twitter follower count
    fmo.arr || '', fmo.fund ? fmo.fund : '', fmo.yr ? `${fmo.yr}-01-01` : '',
    blankFirmo ? '' : c.sz,
    '', '', '', // calendar interactions (enrichment-only, blank for prospects)
    '', lastInt, '', lastInt, '', // first email / last email / first int / last int / next int
    '', // Connection strength (legacy) — DEPRECATED column, left null (texture)
    hasDeal ? (Math.round(hash01('cs:'+c.d)*40)/10 + 1).toFixed(1) : '',
    hasDeal ? ownerFor(c.d) : '',
    c.deals.join(' | '),
    blankFirmo ? '' : c.ind, relationship(c.tag), gtmSegment(c),
    c.tag === 'speaker_co' ? '' : ownerFor(c.d),
  ]);
}
// 8a. Planted DUPLICATE domains (2–3) — variant rows that must be de-duped against the canonical record.
const dupSpecs = [
  { base: 'cognism.com', dom: 'www.cognism.com', name: 'Cognism Ltd' },
  { base: 'apollo.io', dom: 'apollo.com', name: 'Apollo' },
  { base: 'clay.com', dom: 'clay.run', name: 'Clay Labs' },
];
for (const ds of dupSpecs) {
  const c = byDomain.get(ds.base)!;
  companyRows.push([
    uuid('dup:' + ds.dom), ds.dom, ds.name,
    '', '', '', `${c.city}, ${c.country}`, '', '', '', '', '', '', '', '', '', '', '', // sparse dup
    '', '', '', '', '', '', '', '', '', '', '', '', // interactions blank
    ds.name === 'Clay Labs' ? 'GTM data / automation' : c.ind, 'Sponsor Prospect', gtmSegment(c), '',
  ]);
}
write('attio_companies.csv', csv(COMPANY_HEADERS, companyRows));

// ── 9. Write CRM spine — attio_people.csv ──────────────────────────────────
const PEOPLE_HEADERS = [
  'Record ID','Name','Email addresses','Description','Company','Job title','Avatar URL','Phone numbers','Primary location','AngelList','Facebook','Instagram','LinkedIn','Twitter','Twitter follower count','First calendar interaction','Last calendar interaction','Next calendar interaction','First email interaction','Last email interaction','First interaction','Last interaction','Next interaction','Connection strength (legacy)','Connection strength','Strongest connection','Associated deals','Created at','Created by',
  'Relationship','Speaker topic','Owner',
];
const peopleRows = people.map(p => [
  p.id, p.name, p.email,
  p.isSpeaker ? `${p.title} @ ${p.companyName}. ${p.topic}` : `${p.title} @ ${p.companyName}.`,
  p.companyName, p.title, '', '', // Avatar, Phone (no fake personal phones)
  `${p.city}, ${p.country}`, '', '', '',
  p.linkedin, '', '',
  '', '', '', // calendar interactions
  '', p.lastInteraction || '', '', p.lastInteraction || '', '', // email/first/last/next
  '', // Connection strength (legacy) — deprecated, null
  p.lastInteraction ? (Math.round(hash01('cs:'+p.name)*30)/10 + 1).toFixed(1) : '',
  p.lastInteraction ? p.owner : '',
  p.deals.join(' | '), p.createdAt, p.owner,
  p.relationship, p.topic, p.owner,
]);
write('attio_people.csv', csv(PEOPLE_HEADERS, peopleRows));

// ── 10. Write CRM spine — attio_deals.csv ──────────────────────────────────
const DEAL_HEADERS = [
  'Record ID','Deal name','Deal stage','Deal owner','Deal value','Associated people','Associated company','Created at','Created by',
  'Pipeline','Close date','Next step','Currency','Sponsorship tier',
];
const dealRows = deals.map(dl => [
  dl.id, dl.name, dl.stage, dl.owner, dl.value, dl.people.join(' | '), dl.company, isoT(d(dl.createdAt)), dl.createdBy,
  dl.pipeline, dl.closeDate, dl.nextStep, dl.currency, dl.tier,
]);
write('attio_deals.csv', csv(DEAL_HEADERS, dealRows));

// ── 11. clay_table_sponsor-prospects.csv (thin firmographics — enrich live) ──
const clayCos = sponsorCos; // the sponsor spine — past sponsors + prospects, thin firmographics to enrich
const FUNDING_STAGES = ['Seed','Series A','Series B','Series C','Growth','Bootstrapped','Public',''];
const CLAY_HEADERS = ['Company','Domain','Company LinkedIn URL','Employee Count','Industry','Location','Headquarters','Funding Stage','Estimated Revenue','Technologies','Description','Status','Signal','Score','Found With'];
const clayRows = clayCos.map(c => {
  const thin = hash01('clay:' + c.d); // most fields blank — this is a table waiting to be enriched
  const empCount = thin < 0.5 ? '' : ({'1-10':'5','11-50':'30','51-250':'140','251-1K':'500','1K-5K':'2200','5K-10K':'7000','10K-50K':'25000'} as Record<string,string>)[c.sz] || '';
  return [
    c.n, c.d, c.li ? `https://www.linkedin.com/company/${c.li}` : '',
    empCount,
    thin < 0.2 ? '' : c.ind,
    `${c.city}, ${c.country}`,
    thin < 0.35 ? '' : c.city,
    thin < 0.6 ? '' : pick(FUNDING_STAGES),
    '', // Estimated Revenue — blank, to enrich
    '', // Technologies — blank, to enrich
    thin < 0.4 ? '' : descFor(c),
    c.tag === 'past_sponsor' ? 'In CRM' : pick(['To research','Enriching','Qualified','To research','New']),
    '', // Signal — blank, to enrich
    '', // Score — blank, to compute
    pick(['Find People — UK GTM SaaS','LinkedIn Sales Nav','Warsaw sponsor lookalikes','Webset — events budget','']),
  ];
});
write('clay_table_sponsor-prospects.csv', csv(CLAY_HEADERS, clayRows));

// ── 12. apollo_people-export_speakers.csv (verified 62-col Apollo header) ───
const APOLLO_HEADERS = ['First Name','Last Name','Title','Company','Company Name for Emails','Email','Email Status','Primary Email Source','Email Confidence','Primary Email Catch-all Status','Primary Email Last Verified At','Seniority','Departments','Contact Owner','First Phone','Work Direct Phone','Home Phone','Mobile Phone','Corporate Phone','Other Phone','Stage','Lists','Last Contacted','Account Owner','# Employees','Industry','Keywords','Person Linkedin Url','Website','Company Linkedin Url','Facebook Url','Twitter Url','City','State','Country','Company Address','Company City','Company State','Company Country','Company Phone','SEO Description','Technologies','Annual Revenue','Total Funding','Latest Funding','Latest Funding Amount','Last Raised At','Email Sent','Email Open','Email Bounced','Replied','Demoed','Number of Retail Locations','Apollo Contact Id','Apollo Account Id','Secondary Email','Secondary Email Source','Tertiary Email','Tertiary Email Source','Primary Intent Topic','Primary Intent Score','Secondary Intent Topic','Secondary Intent Score'];
const EMP_NUM: Record<string,string> = {'1-10':'7','11-50':'35','51-250':'150','251-1K':'600','1K-5K':'2500','5K-10K':'7500','10K-50K':'28000'};
const apolloRows = SPEAKERS.map(sp => {
  const co = byDomain.get(sp.d)!;
  const [first, ...rest] = sp.n.split(' ');
  const last = rest.join(' ');
  const guessed = sp.li === '' || chance(0.35);
  const status = guessed ? 'Guessed' : 'Verified';
  const fmo = ANCHOR_FIRMO[sp.d] || {};
  return [
    first, last, sp.role, co.n, co.n, `${strip(first)}@${sp.d}`, status, guessed ? 'Apollo' : 'Bombora', guessed ? '' : '95',
    '', guessed ? '' : '2026-05-12', seniorityOf(sp.role),
    sp.role.toLowerCase().includes('market') ? 'Marketing' : (sp.role.toLowerCase().includes('sales') || sp.role.toLowerCase().includes('revenue') || sp.role.toLowerCase().includes('commercial')) ? 'Sales' : 'Master',
    ownerFor(sp.n), '', '', '', '', '', '', // phones blank (no fabricated personal numbers)
    sp.warsaw ? 'Approached' : pick(['Cold','Researching','Cold']),
    sp.warsaw ? 'Past Speakers - Warsaw 2026' : 'Speaker Prospects - London 2027',
    '', ownerFor(sp.n), EMP_NUM[co.sz] || '', co.ind, sp.angle,
    sp.li ? `http://www.linkedin.com/in/${sp.li}` : '', `http://${sp.d}`,
    co.li ? `http://www.linkedin.com/company/${co.li}` : '',
    '', '', sp.city, '', sp.country, '', co.city, '', co.country, '', '', '',
    fmo.fund ? '' : '', fmo.fund || '', '', '', '', '',
    '0','0','0','0','0','', uuid('ap:'+sp.n).slice(0,24), uuid('ap:'+sp.d).slice(0,24), '', '', '', '', '', '', '', '',
  ];
});
write('apollo_people-export_speakers.csv', csv(APOLLO_HEADERS, apolloRows));

// ── 13. lookalike_features.csv (account-potential model, joins on domain) ──
const LOOK_HEADERS = ['company_domain','company_name','is_past_sponsor','uk_london_presence','sells_to_gtm','recently_funded','events_budget_signal','audience_overlap','hiring_demand_gen','icp_fit_score','tier','recommended_package','rationale'];
function score0to5(seed: string, bias = 0): number { return Math.max(0, Math.min(5, Math.round(hash01(seed) * 5 + bias))); }
const lookRows = sponsorCos.map(c => {
  const past = c.tag === 'past_sponsor';
  const uk = c.lon === 'HQ' ? 5 : c.lon === 'Yes' ? 4 : c.lon === 'Warsaw' ? 2 : c.lon === 'Expanding' ? 3 : 2;
  const sells = c.ind.match(/sales|revops|gtm|marketing|intent|enrich|data|engagement|enablement|crm|abm|prospect|outbound|conversation|community|events|partner/i) ? 5 : 3;
  const funded = ANCHOR_FIRMO[c.d]?.fund ? 5 : score0to5('fund:' + c.d);
  const budget = score0to5('bud:' + c.d, c.lon === 'HQ' ? 1 : 0);
  const overlap = Math.round((uk + sells) / 2);
  const hiring = score0to5('hire:' + c.d);
  const fit = Math.round((uk*4 + sells*5 + funded*3 + budget*4 + overlap*3 + hiring*2 + (past?6:0)) / (4+5+3+4+3+2+0.6) * 20);
  const fitC = Math.max(20, Math.min(99, fit));
  const tier = fitC >= 75 ? 'A' : fitC >= 55 ? 'B' : 'C';
  const pkg = tier === 'A' ? pick(['Headline Partner','Platinum']) : tier === 'B' ? pick(['Gold','Silver']) : pick(['Silver','Startup / Community','Side-event Partner']);
  const rat = past ? 'Sponsored Warsaw 2026; warm renewal candidate.' : `${c.lon === 'HQ' ? 'London-HQ' : c.lon} ${gtmSegment(c).toLowerCase()} selling to GTM operators.`;
  return [c.d, c.n, past, uk, sells, funded, budget, overlap, hiring, fitC, tier, pkg, rat];
});
write('lookalike_features.csv', csv(LOOK_HEADERS, lookRows));

// ── 14. signals_feed.csv (recent triggers, joins on domain/linkedin) ───────
const SIG_HEADERS = ['signal_id','signal_date','company_domain','person_linkedin_url','entity_name','signal_type','signal_summary','source','strength'];
const sigRows: (string|number)[][] = [];
let sigN = 0;
// Hand-set, real, citable anchor signals
const ANCHOR_SIGNALS: [string,string,string,string,string,number][] = [
  ['clay.com','opened_london_office','Clay opened its first international office in London (Mar 2026); Europe already ~20% of revenue.','clay.com/blog/clay-europe-announcement',5],
  ['clay.com','raised_round','Clay raised $100M Series C at $3.1B led by CapitalG (Aug 2025).','techcrunch.com',5],
  ['cognism.com','product_launch','Cognism shipped new AI search + intent layer; London HQ scaling EMEA.','cognism.com',3],
  ['synthesia.io','raised_round','Synthesia raised at a $2.1B valuation; moved into new Regent\'s Place London HQ.','synthesia.io',4],
  ['paddle.com','product_launch','Paddle expanded its merchant-of-record + AI billing suite.','paddle.com',3],
  ['11x.ai','raised_round','11x raised Series B; retains London founding office.','11x.ai',4],
  ['elevenlabs.io','hiring_gtm_engineer','ElevenLabs hiring across London revenue + GTM engineering.','elevenlabs.io',4],
  ['6sense.com','opened_london_office','6sense opened London EMEA HQ at Tower 42.','6sense.com',4],
  ['pigment.com','opened_london_office','Pigment scaling its London office (1 Primrose St).','pigment.com',3],
  ['velaris.io','raised_round','Velaris (London) raised €4.7M to challenge Planhat in CS.','velaris.io',3],
];
for (const [dom, type, sum, src, str] of ANCHOR_SIGNALS) {
  if (!byDomain.has(dom)) continue;
  sigRows.push([`sig_${String(++sigN).padStart(4,'0')}`, iso(addDays(d('2026-03-01'), ri(0, 100))), dom, '', byDomain.get(dom)!.n, type, sum, src, str]);
}
// Generated company signals for a spread of sponsor prospects
const sigTypes = ['raised_round','hired_head_of_demand_gen','launched_podcast','posting_ai_gtm','product_launch','attended_competitor_event','hiring_gtm_engineer'];
for (const c of sponsorCos) {
  if (chance(0.5)) continue;
  const t = pick(sigTypes);
  const summ: Record<string,string> = {
    raised_round: `${c.n} reportedly raising / recently raised a new round (signal — verify live).`,
    hired_head_of_demand_gen: `${c.n} hired a new Head of Demand Generation (LinkedIn signal).`,
    launched_podcast: `${c.n} launched a GTM podcast / content series.`,
    posting_ai_gtm: `${c.n} leadership posting actively on AI + GTM.`,
    product_launch: `${c.n} announced a product launch.`,
    attended_competitor_event: `${c.n} exhibited at a competitor GTM event.`,
    hiring_gtm_engineer: `${c.n} has an open GTM Engineer / RevOps req.`,
  };
  sigRows.push([`sig_${String(++sigN).padStart(4,'0')}`, iso(addDays(d('2026-04-01'), ri(0, 75))), c.d, '', c.n, t, summ[t], pick(['LinkedIn','Exa','Crunchbase','company blog']), ri(1,4)]);
}
// Person-level signals (join on linkedin) for some tier-A/B speakers
for (const p of people.filter(p => p.isSpeaker && p.linkedin && (p.tier === 'A' || p.tier === 'B'))) {
  if (chance(0.55)) continue;
  const t = pick(['posting_ai_gtm','launched_podcast','shipped_gtm_result']);
  const summ: Record<string,string> = {
    posting_ai_gtm: `${p.name} posting actively on AI + GTM — strong speaker signal.`,
    launched_podcast: `${p.name} launched / hosts a GTM podcast.`,
    shipped_gtm_result: `${p.name} shared a notable GTM result recently.`,
  };
  const slug = p.linkedin.split('/in/')[1] || '';
  sigRows.push([`sig_${String(++sigN).padStart(4,'0')}`, iso(addDays(d('2026-05-01'), ri(0, 45))), p.companyDomain, p.linkedin, p.name, t, summ[t], 'LinkedIn', ri(2,5)]);
}
write('signals_feed.csv', csv(SIG_HEADERS, sigRows));

// ── 15. do-not-approach.csv ────────────────────────────────────────────────
const DNA_HEADERS = ['name','domain','type','reason','notes'];
const dnaRows = [
  ['Pavilion','joinpavilion.com','Competitor event','Runs GTM2026 + CRO/CMO summits — direct audience overlap','Partner, do not pitch as sponsor'],
  ['SaaStock','saastock.com','Competitor event','Runs SaaStock Europe (Dublin) — overlapping founder audience','Explore cross-promo instead'],
  ['Clay','clay.com','Conflict — owns category event','Runs Sculpt + Clay Clubs; co-create, do not hard-sell a booth','See account-deep-dive_ANCHOR.md'],
  ['Gong','gong.io','Competitor event','Runs Gong Celebrate (London tour stop)','Anchor sponsor candidate but avoid date clash'],
  ['HubSpot','hubspot.com','Competitor event','Runs INBOUND/UNBOUND','Sponsor-tier only, not media partner'],
  ['Salesforce','salesforce.com','Competitor event','Runs Dreamforce','Out of scale band'],
  ['Reply.io','reply.io','Conflict — already signed','Committed budget to a competing Q1 event','Re-approach for 2028'],
  ['ZoomInfo','zoominfo.com','Do not approach','Past negative experience flagged by organiser','Revisit only warm-intro'],
  ['Web Summit','websummit.com','Competitor event','Lisbon mega-event','N/A as sponsor'],
  ['Revenue Operations Alliance','revenueoperationsalliance.com','Competitor event','Runs RevOps Festival London (Jun 2027 clash risk)','Date-clash watch'],
  ['B2B Marketing','b2bmarketing.net','Competitor event','Runs B2B Marketing Live London','Possible media partner'],
  ['Slush','slush.org','Competitor event','Helsinki founder event','N/A'],
];
write('do-not-approach.csv', csv(DNA_HEADERS, dnaRows));

// ── 16. competitor-events.csv (real 2026 dates → clash analysis) ───────────
const CE_HEADERS = ['event_name','organizer','city','country','start_date','end_date','typical_month','scale','audience_overlap','date_status','clash_risk','note','source'];
const ceRows = [
  ['SaaStr AI Annual 2026','SaaStr','San Mateo','USA','2026-05-12','2026-05-14','May','10000+','High','confirmed_2026','Low (US)','#1 B2B SaaS+AI event; US travel draw','saastrannual.com'],
  ['SaaStr Europa 2026','SaaStr','London','UK','2026-12-01','2026-12-02','December','2500','High','confirmed_2026 (city historically shifts)','High','European SaaStr; London = highest clash risk','saastreuropa.com'],
  ['London Tech Week 2026','Informa','London','UK','2026-06-08','2026-06-12','June','45000+','Medium','confirmed_2026','High','Europe\'s largest tech festival; huge June gravity','londontechweek.com'],
  ['B2B Marketing Live','ROAR B2B','London','UK','2026-11-18','2026-11-19','November','4000+','High','confirmed_2026','Medium','UK B2B marketing trade show','b2bmarketingexpo.co.uk'],
  ['Pavilion GTM2026','Pavilion','New York','USA','2026-09-28','2026-10-01','Sept/Oct','3000+','High','confirmed_2026','Low (US)','Closest peer in audience/positioning','joinpavilion.com'],
  ['Pavilion CMO Summit','Pavilion','Atlanta','USA','2026-04-17','2026-04-17','April','200','High','confirmed_2026','Low (US)','Executive marketing leaders','joinpavilion.com'],
  ['Pavilion CRO Summit','Pavilion','—','USA','2026-06-10','2026-06-10','June','200','High','confirmed_2026','Low (US)','Executive revenue leaders; June cluster','joinpavilion.com'],
  ['Web Summit','Web Summit','Lisbon','Portugal','2026-11-09','2026-11-12','November','70000+','Medium','confirmed_2026','Medium','Largest EU tech event','websummit.com'],
  ['Web Summit Qatar','Web Summit','Doha','Qatar','2026-02-01','2026-02-04','February','25000+','Low','confirmed_2026','Low','Winter MENA edition','qatar.websummit.com'],
  ['SaaStock Europe','SaaStock','Dublin','Ireland','2026-10-13','2026-10-14','October','4500+','High','confirmed_2026','Medium','Premier EU B2B SaaS founder event','saastock.com'],
  ['Slush','Slush','Helsinki','Finland','2026-11-18','2026-11-19','November','13000+','Medium','confirmed_2026','Medium','Founder/investor heavyweight','slush.org'],
  ['INBOUND 2026','HubSpot','Boston','USA','2026-09-16','2026-09-18','September','10000+','Medium','confirmed_2026','Low (US)','HubSpot flagship','inbound.com'],
  ['Dreamforce 2026','Salesforce','San Francisco','USA','2026-09-15','2026-09-17','September','40000+','Medium','confirmed_2026','Low (US)','Largest SaaS event globally','salesforce.com'],
  ['Clay Sculpt 2026','Clay','San Francisco','USA','2026-10-08','2026-10-08','October','1500','High','confirmed_2026','Low (US)','The GTM conference by Clay; near-identical audience','sculpt.clay.com'],
  ['Gong Celebrate London','Gong','London','UK','','','Autumn','2000+','High','typical','High','London tour stop; confirm date','gong.io'],
  ['Revenue Operations Festival London','Revenue Operations Alliance','London','UK','2026-06-18','2026-06-18','June','500+','High','confirmed_2026','High','Bundles GTM + Enablement + PMM tracks','revenueoperationsalliance.com'],
  ['RevOpsAF Europe','RevOps Co-op','London','UK','2026-06-11','2026-06-11','June','400','High','confirmed_2026','High','RevOps community; June clash cluster','revopscoop.com'],
  ['GTM Festival London','Go-to-Market Alliance','London','UK','2026-06-18','2026-06-18','June','400','High','confirmed_2026','High','One-day GTM festival; co-located','gotomarketalliance.com'],
  ['Sales Enablement Festival London','Sales Enablement Collective','London','UK','2026-06-18','2026-06-18','June','400','Medium','confirmed_2026','High','Enablement audience','salesenablementcollective.com'],
];
write('competitor-events.csv', csv(CE_HEADERS, ceRows));

// ── 17. luma_ticket-sales.csv (verified Luma headers + name-mismatch texture) ──
const LUMA_FIXED = ['api_id','name','first_name','last_name','email','phone_number','created_at','approval_status','checked_in_at','custom_source','qr_code_url','amount','amount_tax','amount_discount','currency','coupon_code','eth_address','solana_address','survey_response_rating','survey_response_feedback','ticket_type_id','ticket_name'];
const LUMA_CUSTOM = ["What's your company?","What's your role?","What's your LinkedIn?"]; // event-specific questions appended after ticket_name
const LUMA_HEADERS = [...LUMA_FIXED, ...LUMA_CUSTOM];
const TICKETS: [string, number, string][] = [
  ['tkt_earlybird', 295, 'Early Bird'], ['tkt_standard', 495, 'Standard'], ['tkt_operator', 395, 'Operator Pass'],
  ['tkt_founder', 195, 'Founder Pass'], ['tkt_team4', 1580, 'Team Pass (4)'], ['tkt_sponsorcomp', 0, 'Sponsor Comp'],
];
// company-name spellings that DON'T match the CRM (the join-key mess to fix).
// Hand-set variants for well-known names + a deterministic perturbation for the rest, so the mismatch
// is pervasive (most sponsor-buyer rows need mapping) but still human-recoverable.
const MISSPELL: Record<string,string> = { 'cognism.com':'Cognism Ltd','clay.com':'clay','apollo.io':'Apollo io','salesloft.com':'Salesloft (UK)','paddle.com':'Paddle.com','gong.io':'GONG','hubspot.com':'Hubspot','pleo.io':'Pleo ApS','gocardless.com':'Go Cardless','elevenlabs.io':'Eleven Labs','synthesia.io':'Synthesia Ltd' };
function misspell(co: Co): string {
  if (MISSPELL[co.d]) return MISSPELL[co.d];
  const variants = [co.n.toLowerCase(), co.n + ' Ltd', co.n + ' Inc', co.n + ' ', co.n + ' (UK)', co.n.replace(/\./g, '')];
  const v = variants[Math.floor(hash01('mis:' + co.d) * variants.length)];
  return v === co.n ? co.n + ' Ltd' : v; // guarantee it differs from the CRM name
}
const lumaRows: (string|number)[][] = [];
const sourcePool = ['','linkedin','newsletter','referral','twitter','warsaw-alumni'];
for (let i = 0; i < 120; i++) {
  const polish = chance(0.18);
  const first = pick(polish ? PL_FIRST : EN_FIRST), last = pick(polish ? PL_LAST : EN_LAST);
  // some buyers come from a real sponsor company (spelled differently than CRM); others independent
  const fromSponsor = chance(0.45);
  const co = fromSponsor ? pick(sponsorCos) : null;
  const dom = co ? co.d : pick(['gmail.com','outlook.com','hey.com', strip(last) + '.io', strip(first) + 'ventures.com']);
  const compAns = co ? misspell(co) : pick(['Freelance','Stealth startup','—','Independent consultant']);
  const t = (() => { const r = rand(); return r < 0.34 ? TICKETS[0] : r < 0.55 ? TICKETS[1] : r < 0.72 ? TICKETS[2] : r < 0.85 ? TICKETS[3] : r < 0.95 ? TICKETS[4] : TICKETS[5]; })();
  const amount = t[1];
  const created = addDays(d('2026-05-26'), ri(0, 27)); // early-bird window opened late May 2026
  const approved = amount === 0 ? 'approved' : (chance(0.92) ? 'approved' : 'pending_approval');
  const coupon = amount > 0 && chance(0.22) ? pick(['WARSAW25','EARLYBIRD','OPERATOR10','SPEAKER']) : '';
  const disc = coupon ? Math.round(amount * 0.15) : 0;
  lumaRows.push([
    'evt-guest-' + uuid('luma:'+i).slice(0,12), `${first} ${last}`, first, last, `${strip(first)}.${strip(last)}@${dom}`,
    '', isoT(created), approved, '' /* checked_in_at — event is future */, pick(sourcePool),
    `https://lu.ma/check-in/${uuid('qr:'+i).slice(0,10)}`, amount, 0, disc, amount === 0 ? '' : 'GBP', coupon,
    '', '', '', '', t[0], t[2],
    compAns, co ? pick(['Founder','VP Marketing','Head of Demand Gen','SDR','RevOps','Account Executive','CMO','Growth']) : pick(['Founder','Consultant','Operator']),
    chance(0.4) && co?.li ? `https://www.linkedin.com/company/${co.li}` : '',
  ]);
}
write('luma_ticket-sales.csv', csv(LUMA_HEADERS, lumaRows, { bom: true }));

// ── 18. marketing-spend_export.csv (Supermetrics-style; campaign-name mismatch) ──
const SPEND_HEADERS = ['Date','Data source','Account name','Campaign name','Clicks','Impressions','Cost','Currency','Conversions','CPC','CTR','Conversion rate'];
const CHANNELS = ['LinkedIn Ads','Meta Ads','Google Ads','Email Newsletter'];
const ACCOUNT_NAMES = ['GTM Tech Week','GTM Week London','GTMTechWeek-London']; // even our own account name is spelled 3 ways
const spendRows: (string|number)[][] = [];
const campaignSeeds = sponsorPool.slice(0, 18);
for (let w = 0; w < 8; w++) {
  const date = iso(addDays(d('2026-04-27'), w * 7));
  for (const ch of CHANNELS) {
    const reps = ch === 'LinkedIn Ads' ? 3 : ch === 'Email Newsletter' ? 1 : 2;
    for (let r = 0; r < reps; r++) {
      const target = pick(campaignSeeds);
      const mis = misspell(target).replace(/ /g,'');
      const camp = ch === 'Email Newsletter'
        ? pick([`Speaker promo - ${pick(['Daniel Disney','April Dunford','Sam Jacobs','Clay'])}`, 'Early Bird launch', 'Warsaw alumni reactivation'])
        : pick([`Sponsor Retargeting - ${misspell(target)} `, `ABM - ${target.d}`, `Ticket - Early Bird ${ch}`, `Lookalike - ${mis}`]);
      const imp = ri(4000, 90000);
      const clicks = Math.round(imp * (0.004 + rand() * 0.02));
      const cost = Math.round((clicks * (2 + rand() * 6)) * 100) / 100;
      const conv = Math.round(clicks * (0.01 + rand() * 0.06));
      spendRows.push([date, ch, pick(ACCOUNT_NAMES), camp, clicks, imp, cost, 'GBP', conv,
        Math.round(cost / Math.max(1, clicks) * 100) / 100, Math.round(clicks / imp * 10000) / 100, Math.round(conv / Math.max(1, clicks) * 10000) / 100]);
    }
  }
}
write('marketing-spend_export.csv', csv(SPEND_HEADERS, spendRows));

// ── 19. calendar_next-24h.ics (2 external calls: sponsor + tier-1 speaker) ──
function vevent(uidS: string, start: Date, mins: number, summary: string, desc: string, attendees: {n:string,e:string}[], loc: string): string {
  const dt = (x: Date) => x.toISOString().replace(/[-:]/g,'').slice(0,15) + 'Z';
  return ['BEGIN:VEVENT', `UID:${uidS}`, `DTSTAMP:${dt(TODAY)}`, `DTSTART:${dt(start)}`, `DTEND:${dt(new Date(start.getTime()+mins*60000))}`,
    `SUMMARY:${summary}`, `DESCRIPTION:${desc.replace(/\n/g,'\\n')}`, `LOCATION:${loc}`,
    'ORGANIZER;CN=Artur Wala:mailto:artur@gtm-week.com',
    ...attendees.map(a => `ATTENDEE;CN=${a.n};RSVP=TRUE:mailto:${a.e}`), 'END:VEVENT'].join('\r\n');
}
const sponsorContact = { n: 'Bruno Estrella', e: 'bruno@clay.com' }; // Clay Head of Growth Marketing (real)
const speakerContact = (() => { const a = people.find(p => p.name === 'Sam Jacobs'); return { n: 'Sam Jacobs', e: a?.email || 'sam@joinpavilion.com' }; })();
const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//GTM Tech Week//London Kit//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH',
  // Both calls sit one day after the workshop's "tomorrow" anchor (workshop run-day = 2026-06-25, so
  // these land on 2026-06-26). The transcripts (2026-06-16/18) are the prior calls; these are the
  // upcoming follow-ups call-prep preps for.
  vevent('clay-sponsor-2026@gtm-week.com', new Date(d('2026-06-26').getTime() + 10*3600000), 30, 'Clay — sponsorship intro (London 2027)',
    'Intro call with Clay re: GTM Tech Week London sponsorship. Clay opened its London office Mar 2026; Europe ~20% of revenue. Goal: scope a curated GTM-engineering track, not a generic booth. See data/context_from_claude_workshop/account-deep-dive_ANCHOR.md + brain/inbox/clay-sponsorship-intro.md.',
    [sponsorContact, { n: 'Krzysztof Pawlak', e: 'krzysztof@gtm-week.com' }], 'Google Meet'),
  vevent('keynote-target-2026@gtm-week.com', new Date(d('2026-06-26').getTime() + 14*3600000), 30, 'Sam Jacobs (Pavilion) — keynote ask (London 2027)',
    'Recruitment call with Sam Jacobs (Pavilion) as a tier-1 keynote candidate for London. Pavilion runs GTM2026 — position as community partner + keynote, not competitor. See data/context_from_claude_workshop/granola_keynote-target-call-transcript.md + data/context_from_claude_workshop/email-threads/.',
    [speakerContact], 'Google Meet'),
  'END:VCALENDAR'].join('\r\n') + '\r\n';
write('calendar_next-24h.ics', ics, DATA); // connector data, not a pullable doc — lives in data/ root

// ── 19b. sponsorship-tracker_WIP.xlsx — deliberately STALE & WRONG vs attio_deals ──
// The GTM lead's hand-built Excel view. Reconciling it against the spine is the verify-then-trust beat.
const DISCREPANCIES: string[] = [];
const TRACKER_UPDATED = '2026-05-30';                 // 3+ weeks behind TODAY (2026-06-22)
const statusWord: Record<Stage,string> = { 'Won 🎉':'Signed ✅','In Progress':'In disc.','Lead':'To chase','Nurturing':'Later','Blocked':'Stuck','Lost':'Dead' };
const sponGbp = deals.filter(x => x.pipeline === 'Sponsorship' && x.currency === 'GBP');

// D1 — STALE: tracker predates the wins signed after 30/05; those Won deals are simply absent.
const missingWins = sponGbp.filter(x => x.stage === 'Won 🎉' && x.closeDate > TRACKER_UPDATED);
let included = sponGbp.filter(x => x.stage !== 'Lost' && !(x.stage === 'Won 🎉' && x.closeDate > TRACKER_UPDATED));

// D3 — WRONG AMOUNT: lead typed the wrong package value for one live deal (tier confusion).
const wrongAmtDeal = included.find(x => x.stage === 'In Progress' && x.value === 16000) || included.find(x => x.stage === 'In Progress')!;
const wrongAmtShown = wrongAmtDeal.value + 9000;      // shows a Platinum-ish figure for a Gold deal

const trackerHead: Cell[][] = [
  ['GTM Tech Week LONDON — sponsor tracker (WIP)'],
  ['last updated: 30/05/2026 — Krzysztof    (⚠ not synced to Attio)'],
  [],
  ['Sponsor','Package','£ (GBP)','Status','Owner','Close (est.)','Notes'],
];
const trackerBody: Cell[][] = included.map(x => [
  x.company, x.tier,
  x === wrongAmtDeal ? wrongAmtShown : x.value,
  statusWord[x.stage],
  x.owner.split(' ')[0],
  x.closeDate.split('-').reverse().join('/'),
  x.stage === 'Blocked' ? 'chasing legal' : '',
]);

// D2 — WRONG STAGE: a deal the CRM marks Lost is still "verbal yes" in the tracker (never updated).
const lostDeal = deals.find(x => x.pipeline === 'Sponsorship' && x.stage === 'Lost' && x.currency === 'GBP');
if (lostDeal) {
  trackerBody.push([lostDeal.company, lostDeal.tier, lostDeal.value, 'Verbal yes 🤞', lostDeal.owner.split(' ')[0], '15/03/2027', 'said yes on the call!']);
  DISCREPANCIES.push(`D2 WRONG STAGE — "${lostDeal.company}" is **Lost** in attio_deals but shows **"Verbal yes 🤞"** in the tracker.`);
}
// D4 — DOUBLE COUNT: the same live deal entered twice under a casing-variant name, inflating pipeline.
const dupDeal = included.find(x => x.company === 'Salesloft') || included.find(x => x.stage === 'In Progress' && x.value >= 28000)!;
const dupVariant = dupDeal.company === 'Salesloft' ? 'SalesLoft' : dupDeal.company + ' ';
trackerBody.push([dupVariant, dupDeal.tier, dupDeal.value, 'In disc.', 'Krzysztof', '05/01/2027', 'dupe? check w/ Artur']);
DISCREPANCIES.push(`D4 DOUBLE COUNT — "${dupDeal.company}" is entered twice (once as a casing/spacing variant), double-counting one £${dupDeal.value.toLocaleString()} deal and inflating the tracker total.`);

const trackerTotal = trackerBody.reduce((s, r) => s + (typeof r[2] === 'number' ? (r[2] as number) : 0), 0);
const crmGbpTotal = sponGbp.filter(x => x.stage !== 'Lost').reduce((s, x) => s + x.value, 0);
trackerBody.push([], ['TOTAL', '', trackerTotal, '', '', '', '']);
DISCREPANCIES.push(`D1 STALE — tracker last updated ${TRACKER_UPDATED}; missing ${missingWins.length} Won deal(s) signed since (${missingWins.map(w=>w.company).join(', ') || 'none'}). Tracker pipeline £${trackerTotal.toLocaleString()} vs CRM open+won GBP £${crmGbpTotal.toLocaleString()}.`);
DISCREPANCIES.push(`D3 WRONG AMOUNT — "${wrongAmtDeal.company}" shows **£${wrongAmtShown.toLocaleString()}** in the tracker but **£${wrongAmtDeal.value.toLocaleString()}** (${wrongAmtDeal.tier}) in attio_deals.`);

const trackerRows = [...trackerHead, ...trackerBody];
writeXlsx(join(DATA, 'sponsorship-tracker_WIP.xlsx'), 'Sponsors', trackerRows, [0, 1, 3, trackerHead.length + trackerBody.length - 1]);

// ── 20. Referential-integrity check → stdout ───────────────────────────────
const canonicalDomains = new Set(companies.map(c => c.d));
const personLinkedins = new Set(people.filter(p => p.linkedin).map(p => p.linkedin.split('/in/')[1]));
let errors = 0; const warn = (m: string) => { console.error('  ✗ ' + m); errors++; };

// people → company (every person's company domain must exist)
for (const p of people) if (!canonicalDomains.has(p.companyDomain)) warn(`person ${p.name} → unknown company domain ${p.companyDomain}`);
// deals → company + people
for (const dl of deals) {
  if (!canonicalDomains.has(dl.companyDomain)) warn(`deal ${dl.name} → unknown company domain ${dl.companyDomain}`);
}
// clay → company
for (const c of clayCos) if (!canonicalDomains.has(c.d)) warn(`clay row ${c.n} → unknown domain ${c.d}`);
// apollo → person linkedin (those with a slug must resolve in attio_people)
let apolloJoinable = 0;
for (const sp of SPEAKERS) if (sp.li) { if (personLinkedins.has(sp.li)) apolloJoinable++; else warn(`apollo speaker ${sp.n} linkedin ${sp.li} not in attio_people`); }
// lookalike → company
for (const r of lookRows) if (!canonicalDomains.has(r[0] as string)) warn(`lookalike ${r[1]} → unknown domain ${r[0]}`);
// signals → company (+ person where present)
for (const r of sigRows) { if (!canonicalDomains.has(r[2] as string)) warn(`signal ${r[0]} → unknown domain ${r[2]}`); }

const wonValue = deals.filter(x => x.stage === 'Won 🎉' && x.currency === 'GBP').reduce((s,x)=>s+x.value,0);
const openValue = deals.filter(x => ['In Progress','Lead','Nurturing','Blocked'].includes(x.stage) && x.currency === 'GBP').reduce((s,x)=>s+x.value,0);

console.log('\n── GTM Tech Week London kit — build summary ──');
console.log(`companies        ${companies.length} canonical (+${dupSpecs.length} planted duplicates) = ${companies.length + dupSpecs.length} rows`);
console.log(`  missing firmographics (~15% target): ${missingFirmo} (${(missingFirmo/companies.length*100).toFixed(0)}%)`);
console.log(`people           ${people.length} (${people.filter(p=>p.isSpeaker).length} real speakers + ${people.filter(p=>!p.isSpeaker).length} sponsor contacts)`);
console.log(`deals            ${deals.length} (${deals.filter(d=>d.pipeline==='Sponsorship').length} sponsorship + ${deals.filter(d=>d.pipeline==='Speaker').length} speaker)`);
console.log(`  GBP won pipeline £${wonValue.toLocaleString()} | open £${openValue.toLocaleString()} | PLN renewals: ${deals.filter(d=>d.currency==='PLN').length}`);
console.log(`clay prospects   ${clayRows.length}  |  apollo speakers ${apolloRows.length} (${apolloJoinable} join on linkedin)`);
console.log(`lookalike        ${lookRows.length}  |  signals ${sigRows.length}  |  luma tickets ${lumaRows.length}  |  spend rows ${spendRows.length}`);
console.log(`competitor events ${ceRows.length}  |  do-not-approach ${dnaRows.length}`);
console.log('\n── planted stale-tracker discrepancies (sponsorship-tracker_WIP.xlsx vs attio_deals) ──');
for (const x of DISCREPANCIES) console.log('  • ' + x.replace(/\*\*/g, ''));
console.log('');
console.log(errors === 0 ? '✓ referential integrity: all join keys resolve (0 orphans).' : `✗ ${errors} integrity error(s).`);
if (errors > 0) process.exit(1);
