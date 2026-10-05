"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTRIP_LINK_PAGES = exports.OTRIP_LINK_HOSTS = void 0;
exports.communityWordLangs = communityWordLangs;
exports.normalizeCommunityWord = normalizeCommunityWord;
exports.findCommunityBlockedSpans = findCommunityBlockedSpans;
exports.hasCommunityBlockedWords = hasCommunityBlockedWords;
exports.parseOtripLink = parseOtripLink;
exports.findLinks = findLinks;
const patterns_1 = require("./patterns");
const ur_latn_1 = require("./wordlists/ur-latn");
const ur_1 = require("./wordlists/ur");
const ar_1 = require("./wordlists/ar");
const en_1 = require("./wordlists/en");
const community_places_1 = require("./wordlists/community-places");
const cs_1 = require("./wordlists/cs");
const da_1 = require("./wordlists/da");
const de_1 = require("./wordlists/de");
const el_1 = require("./wordlists/el");
const es_1 = require("./wordlists/es");
const fi_1 = require("./wordlists/fi");
const fil_1 = require("./wordlists/fil");
const fr_1 = require("./wordlists/fr");
const hi_1 = require("./wordlists/hi");
const hu_1 = require("./wordlists/hu");
const id_1 = require("./wordlists/id");
const it_1 = require("./wordlists/it");
const ja_1 = require("./wordlists/ja");
const ko_1 = require("./wordlists/ko");
const nl_1 = require("./wordlists/nl");
const no_1 = require("./wordlists/no");
const pl_1 = require("./wordlists/pl");
const pt_1 = require("./wordlists/pt");
const ru_1 = require("./wordlists/ru");
const sv_1 = require("./wordlists/sv");
const th_1 = require("./wordlists/th");
const tr_1 = require("./wordlists/tr");
const uk_1 = require("./wordlists/uk");
const zh_1 = require("./wordlists/zh");
/**
 * Where each list applies: the languages people there write in. English is
 * checked everywhere. No free list yet for Hebrew, Romanian or Vietnamese —
 * those communities get English plus the Otrip team's own words (Romanian is
 * listed only for its allowances below).
 */
const LANG_COUNTRIES = [
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
    ['ro', 'MD RO'],
    ['ru', 'BY KG KZ RU UA'],
    ['sv', 'FI SE'],
    ['th', 'TH'],
    ['tr', 'CY TR'],
    ['uk', 'UA'],
];
const COUNTRY_WORD_LANGS = new Map();
for (const [lang, countries] of LANG_COUNTRIES) {
    for (const cc of countries.split(' '))
        COUNTRY_WORD_LANGS.set(cc, [...(COUNTRY_WORD_LANGS.get(cc) ?? ['en']), lang]);
}
/**
 * Everyday words of a language that another list in the same community would
 * refuse — measured on everyday sentences: Swedish "mutta"/"olla" are the
 * Finnish "but"/"to be", French "bitte" is German "please", the English
 * list's "slut" is Swedish and Danish for "end", "cum" Romanian for "how",
 * "paki" Tagalog for "please", "fag" Norwegian and Danish for a school
 * subject, the Arabic list's "کس" Urdu for "which".
 * They pass wherever that language is spoken.
 */
const LANG_ALLOW = {
    da: ['slut', 'fag'],
    de: ['bitte'],
    fi: ['mutta', 'olla'],
    fil: ['paki'],
    no: ['fag'],
    ro: ['cum', 'făget', 'faget'],
    sv: ['slut'],
    ur: ['کس'],
};
/** The word lists a country's community checks. English always. */
function communityWordLangs(countryCode) {
    return COUNTRY_WORD_LANGS.get((countryCode ?? '').toUpperCase()) ?? ['en'];
}
/** Letters Urdu and Arabic keyboards type differently for the same sound — one form each. */
const SCRIPT_VARIANTS = [
    [/[يى]/g, 'ی'],
    [/ك/g, 'ک'],
    [/[ةۃہھ]/g, 'ه'],
    [/[أإآٱ]/g, 'ا'],
    [/ؤ/g, 'و'],
    [/ئ/g, 'ی'],
];
const LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', $: 's' };
/** Code point ranges, not \p{Script=…}, so the phone's JS engine reads the same regex the server does. */
const GREEK = /[\u0370-\u03FF\u1F00-\u1FFF]/;
/** Scripts written without spaces between words: an entry in them is matched inside the text. */
const NO_SPACES = /[\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF66-\uFF9F\u0E00-\u0E7F\u{20000}-\u{2FA1F}]/u;
/** One word in the form both the lists and the text are compared in. */
function normalizeCommunityWord(word) {
    // Zero-width marks, the Arabic tatweel and short vowels, and U+0307 (the dot Turkish İ leaves when lower-cased).
    let w = word.normalize('NFKC').toLowerCase().replace(/[\u200B-\u200F\u2060\uFEFF\u0640\u064B-\u065F\u0670\u0307]/g, '');
    // Greek is typed with or without accents, and the lists are written without.
    if (GREEK.test(w))
        w = w.normalize('NFD').replace(/[\u0300-\u036F]/g, '').normalize('NFC').replace(/ς/g, 'σ');
    for (const [re, to] of SCRIPT_VARIANTS)
        w = w.replace(re, to);
    if (/[a-z]/.test(w))
        w = w.replace(/[0134578@$]/g, (c) => LEET[c] ?? c);
    return w.replace(/(.)\1{2,}/gu, '$1$1');
}
function buildList(words) {
    const list = { single: new Set(), phrases: [], starts: [], ends: [], inside: [] };
    for (const raw of words) {
        const lead = raw.startsWith('*');
        const trail = raw.endsWith('*');
        const parts = raw.replace(/^\*|\*$/g, '').split(/\s+/).map(normalizeCommunityWord).filter(Boolean);
        if (parts.length > 1)
            list.phrases.push(parts);
        else if (!parts.length)
            continue;
        else if ((lead && trail) || NO_SPACES.test(parts[0]))
            list.inside.push(parts[0]);
        else if (lead)
            list.ends.push(parts[0]);
        else if (trail)
            list.starts.push(parts[0]);
        else
            list.single.add(parts[0]);
    }
    return list;
}
const SOURCES = {
    en: en_1.EN_WORDS,
    'ur-Latn': ur_latn_1.UR_LATN_WORDS,
    ur: ur_1.UR_WORDS,
    ar: ar_1.AR_WORDS,
    cs: cs_1.CS_WORDS,
    da: da_1.DA_WORDS,
    de: de_1.DE_WORDS,
    el: el_1.EL_WORDS,
    es: es_1.ES_WORDS,
    fi: fi_1.FI_WORDS,
    fil: fil_1.FIL_WORDS,
    fr: fr_1.FR_WORDS,
    hi: hi_1.HI_WORDS,
    hu: hu_1.HU_WORDS,
    id: id_1.ID_WORDS,
    it: it_1.IT_WORDS,
    ja: ja_1.JA_WORDS,
    ko: ko_1.KO_WORDS,
    // Malay and Indonesian share their swear words; the list was checked on Malay sentences too.
    ms: id_1.ID_WORDS,
    nl: nl_1.NL_WORDS,
    no: no_1.NO_WORDS,
    pl: pl_1.PL_WORDS,
    pt: pt_1.PT_WORDS,
    ro: [],
    ru: ru_1.RU_WORDS,
    sv: sv_1.SV_WORDS,
    th: th_1.TH_WORDS,
    tr: tr_1.TR_WORDS,
    uk: uk_1.UK_WORDS,
    zh: zh_1.ZH_WORDS,
};
const built = new Map();
function listFor(lang) {
    let list = built.get(lang);
    if (!list) {
        list = buildList(SOURCES[lang]);
        built.set(lang, list);
    }
    return list;
}
const TOKEN_RE = /[\p{L}\p{M}0-9@$]+/gu;
const ARABIC_SCRIPT = /[؀-ۿ]/;
const ARABIC_PREFIXES = ['وال', 'بال', 'فال', 'كال', 'لل', 'ال', 'و', 'ف', 'ب', 'ل', 'ک'];
function tokenize(text) {
    const out = [];
    for (const m of text.matchAll(TOKEN_RE)) {
        const start = m.index ?? 0;
        out.push({ start, end: start + m[0].length, norm: normalizeCommunityWord(m[0]) });
    }
    return out;
}
/** The token, plus the token without a joined-on Arabic prefix ("and", "the", "with"…). */
function forms(token) {
    if (!ARABIC_SCRIPT.test(token))
        return [token];
    const out = [token];
    for (const p of ARABIC_PREFIXES) {
        const prefix = normalizeCommunityWord(p);
        if (token.startsWith(prefix) && token.length - prefix.length >= 2)
            out.push(token.slice(prefix.length));
    }
    return out;
}
let places = null;
/** Indexes of the tokens that spell out a real place's whole name (wordlists/community-places.ts). */
function placeTokens(tokens) {
    places ??= community_places_1.COMMUNITY_PLACES.map((p) => tokenize(p).map((t) => t.norm));
    const out = new Set();
    tokens.forEach((_, i) => {
        for (const place of places ?? []) {
            if (place.every((part, k) => tokens[i + k]?.norm === part))
                place.forEach((_p, k) => out.add(i + k));
        }
    });
    return out;
}
/**
 * Every blocked word in `text` for these languages, as offsets into the text
 * as typed, so the composer can underline exactly what to take out.
 */
function findCommunityBlockedSpans(text, langs, extras) {
    if (!text)
        return [];
    const allow = new Set([...(extras?.allow ?? []), ...langs.flatMap((l) => LANG_ALLOW[l] ?? [])].map(normalizeCommunityWord));
    const spans = [];
    const lists = langs.map(listFor);
    if (extras?.words?.length)
        lists.push(buildList(extras.words));
    if (lists.length) {
        const tokens = tokenize(text);
        const inPlace = placeTokens(tokens);
        const whole = (tok) => spans.push({ start: tok.start, end: tok.end, text: text.slice(tok.start, tok.end) });
        tokens.forEach((tok, i) => {
            if (allow.has(tok.norm) || inPlace.has(i))
                return;
            for (const list of lists) {
                const w = tok.norm;
                if (forms(w).some((f) => list.single.has(f)) || list.starts.some((s) => w.startsWith(s)) || list.ends.some((s) => w.endsWith(s))) {
                    whole(tok);
                    return;
                }
                const inside = list.inside.filter((s) => w.includes(s));
                if (inside.length) {
                    // Chinese, Japanese, Thai: a "word" here is a whole run of text, so underline just the swear while offsets still line up.
                    if (w.length !== tok.end - tok.start || !inside.every((s) => NO_SPACES.test(s)))
                        whole(tok);
                    else
                        for (const s of inside)
                            for (let at = w.indexOf(s); at >= 0; at = w.indexOf(s, at + s.length))
                                spans.push({ start: tok.start + at, end: tok.start + at + s.length, text: text.slice(tok.start + at, tok.start + at + s.length) });
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
function hasCommunityBlockedWords(text, langs, extras) {
    return findCommunityBlockedSpans(text, langs, extras).length > 0;
}
exports.OTRIP_LINK_HOSTS = ['otrip.io', 'www.otrip.io'];
exports.OTRIP_LINK_PAGES = ['', 'about', 'contact', 'get', 'legal/privacy', 'legal/terms', 'legal/community'];
const TLDS = 'com|net|org|io|co|pk|in|uk|ae|sa|qa|me|app|info|biz|xyz|ly|gl|gg|tv|to|link|site|online|shop|store|top|club|live|news|blog|tk|ml|ga|cf|ru|cn|de|fr|it|es|nl|tr|jp|kr|id|my|th|vn|ph|bd|lk|np|af|ir|iq|eg|ma|ng|ke|za|au|nz|ca|us|br|mx|ar|ch|se|no|dk|fi|pl|pt|gr|ie|be|at|cz|hu|ro|ua|il|sg|hk|tw|travel|tours|page|dev|ai|cc|ws|su';
const LINK_RE = new RegExp(`(?:https?:\\/\\/|www\\.)[^\\s<>"'()]+|\\b[a-z0-9][a-z0-9-]*(?:\\.[a-z0-9-]+)*\\.(?:${TLDS})\\b(?:\\/[^\\s<>"'()]*)?`, 'gi');
const OBJECT_ID = /^[a-f0-9]{24}$/i;
const ID_KINDS = { event: 'event', trip: 'trip', footprint: 'footprint' };
/** An Otrip page link, or null for anything else (other sites, unknown or private paths). */
function parseOtripLink(raw) {
    const m = /^(?:https?:\/\/)?([^/?#\s]+)([^?#\s]*)/i.exec(raw.trim());
    if (!m)
        return null;
    const host = m[1].toLowerCase().replace(/:\d+$/, '');
    if (!exports.OTRIP_LINK_HOSTS.includes(host))
        return null;
    const path = m[2].replace(/^\/+|\/+$/g, '');
    const [section, value, ...rest] = path.split('/');
    if (value && rest.length === 0) {
        const kind = ID_KINDS[section.toLowerCase()];
        if (kind && OBJECT_ID.test(value))
            return { kind, id: value.toLowerCase(), url: `https://otrip.io/${kind}/${value.toLowerCase()}` };
        const handle = value.toLowerCase();
        if ((section.toLowerCase() === 'club' || section.toLowerCase() === 'profile') && patterns_1.USERNAME_REGEX.test(handle)) {
            const k = section.toLowerCase();
            return { kind: k, id: handle, url: `https://otrip.io/${k}/${handle}` };
        }
    }
    const page = path.toLowerCase();
    if (exports.OTRIP_LINK_PAGES.includes(page))
        return { kind: 'page', id: page, url: page ? `https://otrip.io/${page}` : 'https://otrip.io' };
    return null;
}
/** Every link-looking piece of text, with its Otrip page when it is one. */
function findLinks(text) {
    if (!text)
        return [];
    const out = [];
    for (const m of text.matchAll(LINK_RE)) {
        const raw = m[0].replace(/[.,!?;:'")\]]+$/, '');
        const start = m.index ?? 0;
        out.push({ start, end: start + raw.length, raw, otrip: parseOtripLink(raw) });
    }
    return out;
}
