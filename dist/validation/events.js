"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeMeetingLink = normalizeMeetingLink;
exports.parseReminderMinutes = parseReminderMinutes;
exports.resolveEventPrefs = resolveEventPrefs;
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
