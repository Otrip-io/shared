import { findEnglishBlockedSpans } from './content';
import { USERNAME_REGEX } from './patterns';
import { UR_LATN_WORDS } from './wordlists/ur-latn';
import { UR_WORDS } from './wordlists/ur';
import { AR_WORDS } from './wordlists/ar';
import { CS_WORDS } from './wordlists/cs';
import { DA_WORDS } from './wordlists/da';
import { DE_WORDS } from './wordlists/de';
import { EL_WORDS } from './wordlists/el';
import { ES_WORDS } from './wordlists/es';
import { FI_WORDS } from './wordlists/fi';
import { FIL_WORDS } from './wordlists/fil';
import { FR_WORDS } from './wordlists/fr';
import { HI_WORDS } from './wordlists/hi';
import { HU_WORDS } from './wordlists/hu';
import { ID_WORDS } from './wordlists/id';
import { IT_WORDS } from './wordlists/it';
import { JA_WORDS } from './wordlists/ja';
import { KO_WORDS } from './wordlists/ko';
import { NL_WORDS } from './wordlists/nl';
import { NO_WORDS } from './wordlists/no';
import { PL_WORDS } from './wordlists/pl';
import { PT_WORDS } from './wordlists/pt';
import { RU_WORDS } from './wordlists/ru';
import { SV_WORDS } from './wordlists/sv';
import { TH_WORDS } from './wordlists/th';
import { TR_WORDS } from './wordlists/tr';
import { UK_WORDS } from './wordlists/uk';
import { ZH_WORDS } from './wordlists/zh';

/**
 * Community posts and replies (design 2026-10-04): the only check before a
 * post goes live is a word list, run on the phone as you type and again on the
 * server — no AI service. English uses `obscenity` (content.ts); other
 * languages use free published lists (wordlists/CREDITS.md), matched as WHOLE
 * words unless an entry says otherwise. Measured on our 173,185 place names:
 * matching inside words blocked 240 places — "Pakistan" itself included —
 * whole words blocked 4. Each list was then measured on everyday sentences
 * (Tatoeba, 3.3 million across 25 lists) and cut until it blocks swearing
 * only: at most 0.17% of sentences, every one of them a real swear.
 */
export type CommunityWordLang =
  | 'en' | 'ur' | 'ur-Latn' | 'ar' | 'cs' | 'da' | 'de' | 'el' | 'es' | 'fi' | 'fil' | 'fr' | 'hi' | 'hu'
  | 'id' | 'it' | 'ja' | 'ko' | 'ms' | 'nl' | 'no' | 'pl' | 'pt' | 'ru' | 'sv' | 'th' | 'tr' | 'uk' | 'zh';

/**
 * Where each list applies: the languages people there write in. English is
 * checked everywhere. No free list yet for Hebrew, Romanian or Vietnamese —
 * those communities get English plus the Otrip team's own words.
 */
const LANG_COUNTRIES: ReadonlyArray<readonly [Exclude<CommunityWordLang, 'en'>, string]> = [
  ['ur-Latn', 'PK IN'],
  ['ur', 'PK'],
  ['hi', 'IN'],
  ['ar', 'AE BH DZ EG IQ JO KW LB LY MA MR OM PK PS QA SA SD SY TN YE'],
  ['zh', 'CN HK MO SG TW'],
  ['cs', 'CZ'],
  ['da', 'DK'],
  ['de', 'AT CH DE LI LU'],
  ['el', 'CY GR'],
  ['es', 'AR BO CL CO CR CU DO EC ES GQ GT HN MX NI PA PE PR PY SV UY VE'],
  ['fi', 'FI'],
  ['fil', 'PH'],
  ['fr', 'BE BF BI BJ CA CD CF CG CH CI CM DJ DZ FR GA GN HT KM LU MA MC MG ML NC NE PF RW SC SN TD TG TN'],
  ['hu', 'HU'],
  ['id', 'ID'],
  ['it', 'CH IT SM VA'],
  ['ja', 'JP'],
  ['ko', 'KR'],
  ['ms', 'BN MY SG'],
  ['nl', 'BE NL SR'],
  ['no', 'NO'],
  ['pl', 'PL'],
  ['pt', 'AO BR CV GW MZ PT ST TL'],
  ['ru', 'BY KG KZ RU UA'],
  ['sv', 'FI SE'],
  ['th', 'TH'],
  ['tr', 'CY TR'],
  ['uk', 'UA'],
];

const COUNTRY_WORD_LANGS = new Map<string, CommunityWordLang[]>();
for (const [lang, countries] of LANG_COUNTRIES) {
  for (const cc of countries.split(' ')) COUNTRY_WORD_LANGS.set(cc, [...(COUNTRY_WORD_LANGS.get(cc) ?? ['en']), lang]);
}

/** The word lists a country's community checks. English always. */
export function communityWordLangs(countryCode: string | null | undefined): readonly CommunityWordLang[] {
  return COUNTRY_WORD_LANGS.get((countryCode ?? '').toUpperCase()) ?? ['en'];
}

/** Letters Urdu and Arabic keyboards type differently for the same sound — one form each. */
const SCRIPT_VARIANTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/[يى]/g, 'ی'],
  [/ك/g, 'ک'],
  [/[ةۃہھ]/g, 'ه'],
  [/[أإآٱ]/g, 'ا'],
  [/ؤ/g, 'و'],
  [/ئ/g, 'ی'],
];
const LEET: Readonly<Record<string, string>> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', $: 's' };

/** Code point ranges, not \p{Script=…}, so the phone's JS engine reads the same regex the server does. */
const GREEK = /[\u0370-\u03FF\u1F00-\u1FFF]/;
/** Scripts written without spaces between words: an entry in them is matched inside the text. */
const NO_SPACES = /[\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF66-\uFF9F\u0E00-\u0E7F\u{20000}-\u{2FA1F}]/u;

/** One word in the form both the lists and the text are compared in. */
export function normalizeCommunityWord(word: string): string {
  // Zero-width marks, the Arabic tatweel and short vowels, and U+0307 (the dot Turkish İ leaves when lower-cased).
  let w = word.normalize('NFKC').toLowerCase().replace(/[\u200B-\u200F\u2060\uFEFF\u0640\u064B-\u065F\u0670\u0307]/g, '');
  // Greek is typed with or without accents, and the lists are written without.
  if (GREEK.test(w)) w = w.normalize('NFD').replace(/[\u0300-\u036F]/g, '').normalize('NFC').replace(/ς/g, 'σ');
  for (const [re, to] of SCRIPT_VARIANTS) w = w.replace(re, to);
  if (/[a-z]/.test(w)) w = w.replace(/[0134578@$]/g, (c) => LEET[c] ?? c);
  return w.replace(/(.)\1{2,}/gu, '$1$1');
}

interface WordList {
  /** Whole words. */
  single: Set<string>;
  phrases: string[][];
  /** "x*": a word starting with x. */
  starts: string[];
  /** "*x": a word ending with x. */
  ends: string[];
  /** "*x*", or any entry in a script written without spaces: x anywhere. */
  inside: string[];
}

function buildList(words: readonly string[]): WordList {
  const list: WordList = { single: new Set(), phrases: [], starts: [], ends: [], inside: [] };
  for (const raw of words) {
    const lead = raw.startsWith('*');
    const trail = raw.endsWith('*');
    const parts = raw.replace(/^\*|\*$/g, '').split(/\s+/).map(normalizeCommunityWord).filter(Boolean);
    if (parts.length > 1) list.phrases.push(parts);
    else if (!parts.length) continue;
    else if ((lead && trail) || NO_SPACES.test(parts[0])) list.inside.push(parts[0]);
    else if (lead) list.ends.push(parts[0]);
    else if (trail) list.starts.push(parts[0]);
    else list.single.add(parts[0]);
  }
  return list;
}

const SOURCES: Record<Exclude<CommunityWordLang, 'en'>, readonly string[]> = {
  'ur-Latn': UR_LATN_WORDS,
  ur: UR_WORDS,
  ar: AR_WORDS,
  cs: CS_WORDS,
  da: DA_WORDS,
  de: DE_WORDS,
  el: EL_WORDS,
  es: ES_WORDS,
  fi: FI_WORDS,
  fil: FIL_WORDS,
  fr: FR_WORDS,
  hi: HI_WORDS,
  hu: HU_WORDS,
  id: ID_WORDS,
  it: IT_WORDS,
  ja: JA_WORDS,
  ko: KO_WORDS,
  // Malay and Indonesian share their swear words; the list was checked on Malay sentences too.
  ms: ID_WORDS,
  nl: NL_WORDS,
  no: NO_WORDS,
  pl: PL_WORDS,
  pt: PT_WORDS,
  ru: RU_WORDS,
  sv: SV_WORDS,
  th: TH_WORDS,
  tr: TR_WORDS,
  uk: UK_WORDS,
  zh: ZH_WORDS,
};
const built = new Map<string, WordList>();
function listFor(lang: Exclude<CommunityWordLang, 'en'>): WordList {
  let list = built.get(lang);
  if (!list) {
    list = buildList(SOURCES[lang]);
    built.set(lang, list);
  }
  return list;
}

interface Token {
  start: number;
  end: number;
  norm: string;
}

const TOKEN_RE = /[\p{L}\p{M}0-9@$]+/gu;
const ARABIC_SCRIPT = /[؀-ۿ]/;
const ARABIC_PREFIXES = ['وال', 'بال', 'فال', 'كال', 'لل', 'ال', 'و', 'ف', 'ب', 'ل', 'ک'];

function tokenize(text: string): Token[] {
  const out: Token[] = [];
  for (const m of text.matchAll(TOKEN_RE)) {
    const start = m.index ?? 0;
    out.push({ start, end: start + m[0].length, norm: normalizeCommunityWord(m[0]) });
  }
  return out;
}

/** The token, plus the token without a joined-on Arabic prefix ("and", "the", "with"…). */
function forms(token: string): string[] {
  if (!ARABIC_SCRIPT.test(token)) return [token];
  const out = [token];
  for (const p of ARABIC_PREFIXES) {
    const prefix = normalizeCommunityWord(p);
    if (token.startsWith(prefix) && token.length - prefix.length >= 2) out.push(token.slice(prefix.length));
  }
  return out;
}

export interface BlockedSpan {
  start: number;
  end: number;
  text: string;
}

const WORD_CHAR = /[\p{L}\p{M}0-9@$*]/u;

/** The English list matches a root ("fuck" in "fucking"); the composer underlines the whole word to take out. */
function wholeWord(text: string, start: number, end: number): BlockedSpan {
  let s = start;
  let e = end;
  while (s > 0 && WORD_CHAR.test(text[s - 1])) s--;
  while (e < text.length && WORD_CHAR.test(text[e])) e++;
  return { start: s, end: e, text: text.slice(s, e) };
}

/** Staff additions from Admin → Community settings, synced to phones. */
export interface CommunityWordExtras {
  words?: readonly string[];
  allow?: readonly string[];
}

/**
 * Every blocked word in `text` for these languages, as offsets into the text
 * as typed, so the composer can underline exactly what to take out.
 */
export function findCommunityBlockedSpans(
  text: string | null | undefined,
  langs: readonly CommunityWordLang[],
  extras?: CommunityWordExtras,
): BlockedSpan[] {
  if (!text) return [];
  const allow = new Set((extras?.allow ?? []).map(normalizeCommunityWord));
  const spans: BlockedSpan[] = [];
  if (langs.includes('en')) {
    for (const s of findEnglishBlockedSpans(text)) {
      const whole = wholeWord(text, s.start, s.end);
      if (!allow.has(normalizeCommunityWord(whole.text))) spans.push(whole);
    }
  }
  const lists: WordList[] = langs.filter((l): l is Exclude<CommunityWordLang, 'en'> => l !== 'en').map(listFor);
  if (extras?.words?.length) lists.push(buildList(extras.words));
  if (lists.length) {
    const tokens = tokenize(text);
    const whole = (tok: Token) => spans.push({ start: tok.start, end: tok.end, text: text.slice(tok.start, tok.end) });
    tokens.forEach((tok, i) => {
      if (allow.has(tok.norm)) return;
      for (const list of lists) {
        const w = tok.norm;
        if (forms(w).some((f) => list.single.has(f)) || list.starts.some((s) => w.startsWith(s)) || list.ends.some((s) => w.endsWith(s))) {
          whole(tok);
          return;
        }
        const inside = list.inside.filter((s) => w.includes(s));
        if (inside.length) {
          // Chinese, Japanese, Thai: a "word" here is a whole run of text, so underline just the swear while offsets still line up.
          if (w.length !== tok.end - tok.start || !inside.every((s) => NO_SPACES.test(s))) whole(tok);
          else for (const s of inside) for (let at = w.indexOf(s); at >= 0; at = w.indexOf(s, at + s.length)) spans.push({ start: tok.start + at, end: tok.start + at + s.length, text: text.slice(tok.start + at, tok.start + at + s.length) });
          return;
        }
        for (const phrase of list.phrases) {
          if (phrase.every((part, k) => tokens[i + k]?.norm === part)) {
            const last = tokens[i + phrase.length - 1];
            spans.push({ start: tok.start, end: last.end, text: text.slice(tok.start, last.end) });
            return;
          }
        }
      }
    });
  }
  spans.sort((a, b) => a.start - b.start);
  return spans.filter((s, i) => i === 0 || s.start >= spans[i - 1].end);
}

export function hasCommunityBlockedWords(
  text: string | null | undefined,
  langs: readonly CommunityWordLang[],
  extras?: CommunityWordExtras,
): boolean {
  return findCommunityBlockedSpans(text, langs, extras).length > 0;
}

// ── Links ────────────────────────────────────────────────────────────────

/**
 * Posts and replies carry no links to other sites. A reply may carry a link
 * to an Otrip page (design 2026-10-04: "any valid otrip.io/* link"), which
 * the server resolves to a real club, event, trip, profile, footprint or
 * public page before accepting it. Emergency (/e/), invite (/join/) and
 * referral (/ref/) links are not shareable here.
 */
export type OtripLinkKind = 'club' | 'event' | 'trip' | 'profile' | 'footprint' | 'page';

export interface OtripLink {
  kind: OtripLinkKind;
  /** Club handle, username, 24-hex id, or the page path. */
  id: string;
  /** Canonical form, the one stored and shown. */
  url: string;
}

export interface FoundLink {
  start: number;
  end: number;
  raw: string;
  /** null = not an Otrip page (refused). */
  otrip: OtripLink | null;
}

export const OTRIP_LINK_HOSTS: readonly string[] = ['otrip.io', 'www.otrip.io'];
export const OTRIP_LINK_PAGES: readonly string[] = ['', 'about', 'contact', 'get', 'legal/privacy', 'legal/terms', 'legal/community'];

const TLDS =
  'com|net|org|io|co|pk|in|uk|ae|sa|qa|me|app|info|biz|xyz|ly|gl|gg|tv|to|link|site|online|shop|store|top|club|live|news|blog|tk|ml|ga|cf|ru|cn|de|fr|it|es|nl|tr|jp|kr|id|my|th|vn|ph|bd|lk|np|af|ir|iq|eg|ma|ng|ke|za|au|nz|ca|us|br|mx|ar|ch|se|no|dk|fi|pl|pt|gr|ie|be|at|cz|hu|ro|ua|il|sg|hk|tw|travel|tours|page|dev|ai|cc|ws|su';
const LINK_RE = new RegExp(
  `(?:https?:\\/\\/|www\\.)[^\\s<>"'()]+|\\b[a-z0-9][a-z0-9-]*(?:\\.[a-z0-9-]+)*\\.(?:${TLDS})\\b(?:\\/[^\\s<>"'()]*)?`,
  'gi',
);
const OBJECT_ID = /^[a-f0-9]{24}$/i;
const ID_KINDS: Readonly<Record<string, OtripLinkKind>> = { event: 'event', trip: 'trip', footprint: 'footprint' };

/** An Otrip page link, or null for anything else (other sites, unknown or private paths). */
export function parseOtripLink(raw: string): OtripLink | null {
  const m = /^(?:https?:\/\/)?([^/?#\s]+)([^?#\s]*)/i.exec(raw.trim());
  if (!m) return null;
  const host = m[1].toLowerCase().replace(/:\d+$/, '');
  if (!OTRIP_LINK_HOSTS.includes(host)) return null;
  const path = m[2].replace(/^\/+|\/+$/g, '');
  const [section, value, ...rest] = path.split('/');
  if (value && rest.length === 0) {
    const kind = ID_KINDS[section.toLowerCase()];
    if (kind && OBJECT_ID.test(value)) return { kind, id: value.toLowerCase(), url: `https://otrip.io/${kind}/${value.toLowerCase()}` };
    const handle = value.toLowerCase();
    if ((section.toLowerCase() === 'club' || section.toLowerCase() === 'profile') && USERNAME_REGEX.test(handle)) {
      const k = section.toLowerCase() as 'club' | 'profile';
      return { kind: k, id: handle, url: `https://otrip.io/${k}/${handle}` };
    }
  }
  const page = path.toLowerCase();
  if (OTRIP_LINK_PAGES.includes(page)) return { kind: 'page', id: page, url: page ? `https://otrip.io/${page}` : 'https://otrip.io' };
  return null;
}

/** Every link-looking piece of text, with its Otrip page when it is one. */
export function findLinks(text: string | null | undefined): FoundLink[] {
  if (!text) return [];
  const out: FoundLink[] = [];
  for (const m of text.matchAll(LINK_RE)) {
    const raw = m[0].replace(/[.,!?;:'")\]]+$/, '');
    const start = m.index ?? 0;
    out.push({ start, end: start + raw.length, raw, otrip: parseOtripLink(raw) });
  }
  return out;
}
