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
export type CommunityWordLang = 'en' | 'ur' | 'ur-Latn' | 'ar' | 'cs' | 'da' | 'de' | 'el' | 'es' | 'fi' | 'fil' | 'fr' | 'hi' | 'hu' | 'id' | 'it' | 'ja' | 'ko' | 'ms' | 'nl' | 'no' | 'pl' | 'pt' | 'ru' | 'sv' | 'th' | 'tr' | 'uk' | 'zh';
/** The word lists a country's community checks. English always. */
export declare function communityWordLangs(countryCode: string | null | undefined): readonly CommunityWordLang[];
/** One word in the form both the lists and the text are compared in. */
export declare function normalizeCommunityWord(word: string): string;
export interface BlockedSpan {
    start: number;
    end: number;
    text: string;
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
export declare function findCommunityBlockedSpans(text: string | null | undefined, langs: readonly CommunityWordLang[], extras?: CommunityWordExtras): BlockedSpan[];
export declare function hasCommunityBlockedWords(text: string | null | undefined, langs: readonly CommunityWordLang[], extras?: CommunityWordExtras): boolean;
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
export declare const OTRIP_LINK_HOSTS: readonly string[];
export declare const OTRIP_LINK_PAGES: readonly string[];
/** An Otrip page link, or null for anything else (other sites, unknown or private paths). */
export declare function parseOtripLink(raw: string): OtripLink | null;
/** Every link-looking piece of text, with its Otrip page when it is one. */
export declare function findLinks(text: string | null | undefined): FoundLink[];
