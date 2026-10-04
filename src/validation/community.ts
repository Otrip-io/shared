import { findEnglishBlockedSpans } from './content';
import { USERNAME_REGEX } from './patterns';
import { UR_LATN_WORDS } from './wordlists/ur-latn';
import { UR_WORDS } from './wordlists/ur';
import { AR_WORDS } from './wordlists/ar';

/**
 * Community posts and replies (design 2026-10-04): the only check before a
 * post goes live is a word list, run on the phone as you type and again on the
 * server — no AI service. English uses `obscenity` (content.ts); other
 * languages use free published lists (wordlists/CREDITS.md), matched as WHOLE
 * words only. Measured on our 173,185 place names: matching inside words
 * blocked 240 places — "Pakistan" itself included — whole words blocked 4.
 * Each community checks only its own languages, so a city like Lund stays
 * fine in Sweden.
 */
export type CommunityWordLang = 'en' | 'ur' | 'ur-Latn' | 'ar';

const COUNTRY_WORD_LANGS: Record<string, readonly CommunityWordLang[]> = {
  PK: ['en', 'ur-Latn', 'ur', 'ar'],
};

/** The word lists a country's community checks. English always. */
export function communityWordLangs(countryCode: string | null | undefined): readonly CommunityWordLang[] {
  return COUNTRY_WORD_LANGS[(countryCode ?? '').toUpperCase()] ?? ['en'];
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

/** One word in the form both the lists and the text are compared in. */
export function normalizeCommunityWord(word: string): string {
  let w = word.normalize('NFKC').toLowerCase().replace(/[​-‏⁠﻿ـً-ٰٟ]/g, '');
  for (const [re, to] of SCRIPT_VARIANTS) w = w.replace(re, to);
  if (/[a-z]/.test(w)) w = w.replace(/[0134578@$]/g, (c) => LEET[c] ?? c);
  return w.replace(/(.)\1{2,}/gu, '$1$1');
}

interface WordList {
  single: Set<string>;
  phrases: string[][];
}

function buildList(words: readonly string[]): WordList {
  const single = new Set<string>();
  const phrases: string[][] = [];
  for (const raw of words) {
    const parts = raw.split(/\s+/).map(normalizeCommunityWord).filter(Boolean);
    if (parts.length === 1) single.add(parts[0]);
    else if (parts.length > 1) phrases.push(parts);
  }
  return { single, phrases };
}

const SOURCES: Record<Exclude<CommunityWordLang, 'en'>, readonly string[]> = {
  'ur-Latn': UR_LATN_WORDS,
  ur: UR_WORDS,
  ar: AR_WORDS,
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
    tokens.forEach((tok, i) => {
      if (allow.has(tok.norm)) return;
      for (const list of lists) {
        if (forms(tok.norm).some((f) => list.single.has(f))) {
          spans.push({ start: tok.start, end: tok.end, text: text.slice(tok.start, tok.end) });
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
