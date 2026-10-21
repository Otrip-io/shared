/**
 * Event checks shared by the phone (as the admin types, offline included) and
 * the server (the authority — it re-runs them on every write). Parsed by
 * hand, not with `URL`, because React Native's URL is incomplete.
 */
import { type EventPrefs } from '../constants/events';
/**
 * - `invalid` — not a full https:// link we can read
 * - `shortener` — bit.ly and friends hide where they go
 * - `too_long` — over EVENT_ONLINE_URL_MAX
 */
export type MeetingLinkProblem = 'invalid' | 'shortener' | 'too_long';
export type MeetingLinkResult = {
    ok: true;
    url: string | null;
} | {
    ok: false;
    problem: MeetingLinkProblem;
};
/**
 * An online event's meeting link: https only, any platform, no link
 * shorteners. The host goes through the club-link check, so the shortener
 * list and host rules are the ones a club's website uses. Empty = no link
 * yet ("Link coming soon") → `{ ok: true, url: null }`.
 */
export declare function normalizeMeetingLink(value: string | null | undefined): MeetingLinkResult;
/**
 * A reminder list as a person may set it: whole minutes from the allowed
 * set, no repeats, at most two. Returns null when the value is not one.
 */
export declare function parseReminderMinutes(value: unknown): number[] | null;
/** Stored prefs with every missing or malformed key filled from the defaults (missing = "never set"). */
export declare function resolveEventPrefs(stored: Partial<EventPrefs> | null | undefined): EventPrefs;
/**
 * A text's length for the event join limits (EVENT_JOIN_QUESTION_MAX,
 * EVENT_JOIN_ANSWER_MAX): a wide character counts as two, anything else as
 * one per code point.
 */
export declare function textWeight(text: string): number;
/** The longest start of `text` that fits `max` by `textWeight` — what a field keeps as someone types past the limit. */
export declare function clampToWeight(text: string, max: number): string;
