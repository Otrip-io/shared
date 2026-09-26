/**
 * A club's website + social links (Phase 4d). ONE implementation for the phone
 * (checks as the admin types, offline included, so a typo can never make the
 * whole club create fail on the server) and the server (the authority — it
 * re-runs this on every write).
 *
 * Input is what a person types: a username (`lahoreriders`, `@lahoreriders`)
 * or a pasted link. Output is the platform's canonical https URL. Parsed by
 * hand, not with `URL`, because React Native's URL is incomplete.
 */
export declare const CLUB_LINK_KEYS: readonly ["website", "instagram", "youtube", "facebook", "tiktok", "x"];
export type ClubLinkKey = (typeof CLUB_LINK_KEYS)[number];
export type ClubLinks = Partial<Record<ClubLinkKey, string>>;
export declare const CLUB_LINK_MAX_LENGTH = 200;
/**
 * - `invalid` — not a username or link we can read
 * - `not_https` — a website on plain http
 * - `shortener` — bit.ly and friends hide where they go
 * - `wrong_site` — an Instagram field holding a facebook.com link, …
 * - `too_long` — over CLUB_LINK_MAX_LENGTH once normalised
 */
export type ClubLinkProblem = 'invalid' | 'not_https' | 'shortener' | 'wrong_site' | 'too_long';
export type ClubLinkResult = {
    ok: true;
    url: string;
} | {
    ok: false;
    problem: ClubLinkProblem;
};
/** One field. An empty value is not an error — the caller treats it as "no link". */
export declare function normalizeClubLink(key: ClubLinkKey, input: string): ClubLinkResult;
/**
 * Every field at once. Blank fields are dropped (that is how a link is
 * removed); unknown keys are ignored. `errors` is empty when all is well.
 */
export declare function normalizeClubLinks(input: Partial<Record<string, unknown>>): {
    links: ClubLinks;
    errors: Partial<Record<ClubLinkKey, ClubLinkProblem>>;
};
/** What a chip or row shows for a stored link: `@lahoreriders`, `lahoreriders.com`. */
export declare function clubLinkLabel(key: ClubLinkKey, url: string): string;
