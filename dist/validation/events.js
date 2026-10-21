"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeMeetingLink = normalizeMeetingLink;
exports.parseReminderMinutes = parseReminderMinutes;
exports.resolveEventPrefs = resolveEventPrefs;
exports.textWeight = textWeight;
exports.clampToWeight = clampToWeight;
/**
 * Event checks shared by the phone (as the admin types, offline included) and
 * the server (the authority — it re-runs them on every write). Parsed by
 * hand, not with `URL`, because React Native's URL is incomplete.
 */
const events_1 = require("../constants/events");
const club_links_1 = require("./club-links");
/**
 * An online event's meeting link: https only, any platform, no link
 * shorteners. The host goes through the club-link check, so the shortener
 * list and host rules are the ones a club's website uses. Empty = no link
 * yet ("Link coming soon") → `{ ok: true, url: null }`.
 */
function normalizeMeetingLink(value) {
    const raw = (value ?? '').trim();
    if (!raw)
        return { ok: true, url: null };
    if (raw.length > events_1.EVENT_ONLINE_URL_MAX)
        return { ok: false, problem: 'too_long' };
    const m = /^https:\/\/([^/?#\s]+)([/?#]\S*)?$/i.exec(raw);
    if (!m)
        return { ok: false, problem: 'invalid' };
    const host = m[1].toLowerCase();
    const probe = (0, club_links_1.normalizeClubLink)('website', `https://${host}`);
    if (!probe.ok)
        return { ok: false, problem: probe.problem === 'shortener' ? 'shortener' : 'invalid' };
    return { ok: true, url: `https://${host}${m[2] ?? ''}` };
}
const ALLOWED_REMINDERS = new Set(events_1.EVENT_REMINDER_MINUTES);
/**
 * A reminder list as a person may set it: whole minutes from the allowed
 * set, no repeats, at most two. Returns null when the value is not one.
 */
function parseReminderMinutes(value) {
    if (!Array.isArray(value) || value.length > events_1.MAX_EVENT_REMINDERS)
        return null;
    const out = [];
    for (const v of value) {
        if (typeof v !== 'number' || !ALLOWED_REMINDERS.has(v) || out.includes(v))
            return null;
        out.push(v);
    }
    return out;
}
/** Stored prefs with every missing or malformed key filled from the defaults (missing = "never set"). */
function resolveEventPrefs(stored) {
    const inPerson = parseReminderMinutes(stored?.inPerson);
    const online = parseReminderMinutes(stored?.online);
    return {
        inPerson: inPerson ?? [...events_1.DEFAULT_EVENT_PREFS.inPerson],
        online: online ?? [...events_1.DEFAULT_EVENT_PREFS.online],
        maybe: typeof stored?.maybe === 'boolean' ? stored.maybe : events_1.DEFAULT_EVENT_PREFS.maybe,
    };
}
/** Wide characters — hangul, CJK ideographs, kana, fullwidth forms — print about twice as wide as a Latin letter. */
const WIDE = /[\u1100-\u115F\u2E80-\u303E\u3041-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uA960-\uA97F\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/;
/**
 * A text's length for the event join limits (EVENT_JOIN_QUESTION_MAX,
 * EVENT_JOIN_ANSWER_MAX): a wide character counts as two, anything else as
 * one per code point.
 */
function textWeight(text) {
    let n = 0;
    for (const ch of text)
        n += WIDE.test(ch) ? 2 : 1;
    return n;
}
/** The longest start of `text` that fits `max` by `textWeight` — what a field keeps as someone types past the limit. */
function clampToWeight(text, max) {
    let n = 0;
    let out = '';
    for (const ch of text) {
        n += WIDE.test(ch) ? 2 : 1;
        if (n > max)
            break;
        out += ch;
    }
    return out;
}
