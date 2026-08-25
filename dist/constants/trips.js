"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_TRIP_MEMBERS = exports.TRIP_MEMBER_STATUS = exports.RIDE_ROLES = exports.TRIP_MEMBER_ROLES = exports.TRIP_STATUS = exports.TRIP_TYPE = exports.TRIP_CHAT_MODE = exports.TRIP_VISIBILITY = void 0;
exports.getTripStatus = getTripStatus;
exports.tripCountdown = tripCountdown;
exports.TRIP_VISIBILITY = {
    PUBLIC: 'public',
    PRIVATE: 'private',
};
/**
 * Who can send messages in the trip chat. `announcement` = only trip admins
 * post (WhatsApp announcement-group style) — members keep the "+" actions and
 * reactions. Backward-compat (Work Rule 10): defaults to `chat`; old clients
 * and existing trip documents (field absent) behave exactly as before.
 */
exports.TRIP_CHAT_MODE = {
    CHAT: 'chat',
    ANNOUNCEMENT: 'announcement',
};
/**
 * A trip's kind. Behind the scenes an expense group, a shared list, or a doc
 * is just a Trip with a single active module — one entity, one members model,
 * one offline-sync path. `trip` is the full multi-module travel trip (the only
 * kind that can be public/discoverable). New kinds are private-only utilities.
 *
 * Backward-compat (Work Rule 10): the field defaults to `trip`, so every
 * existing trip document and every old client (which never sends `type`) keeps
 * behaving exactly as before.
 */
exports.TRIP_TYPE = {
    TRIP: 'trip',
    EXPENSE: 'expense',
    LIST: 'list',
    DOCS: 'docs',
};
exports.TRIP_STATUS = {
    PLANNING: 'planning',
    ACTIVE: 'active',
    COMPLETED: 'completed',
};
exports.TRIP_MEMBER_ROLES = {
    ADMIN: 'admin',
    VIEWER: 'viewer',
};
/**
 * Convoy role for Ride Mode (group ride live location). Distinct from
 * TRIP_MEMBER_ROLES, which is the PERMISSION role — rideRole is what the
 * member does in the convoy and only affects how their pin renders on the
 * ride map. Absent/undefined = regular rider (primary/teal pin).
 */
exports.RIDE_ROLES = {
    LEAD: 'lead',
    MARSHAL: 'marshal',
    TAIL: 'tail',
    BACKUP: 'backup',
};
exports.TRIP_MEMBER_STATUS = {
    ACTIVE: 'active',
    REQUEST: 'request',
    INVITE: 'invite',
};
exports.MAX_TRIP_MEMBERS = 50;
/**
 * Trip dates are CALENDAR DAYS. A string input is either "YYYY-MM-DD" or the
 * serialized UTC-midnight instant "YYYY-MM-DDT00:00:00.000Z" — both encode a
 * day, so both are parsed as the viewer's LOCAL day. Passing them straight to
 * `new Date()` made a trip start (and its status flip) a day early for every
 * user west of UTC.
 */
function parseTripDay(value, endOfDay) {
    const day = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)
        ? value.slice(0, 10)
        : null;
    const d = day
        ? new Date(Number(day.slice(0, 4)), Number(day.slice(5, 7)) - 1, Number(day.slice(8, 10)))
        : new Date(value);
    if (endOfDay)
        d.setHours(23, 59, 59, 999);
    else
        d.setHours(0, 0, 0, 0);
    return d;
}
function getTripStatus(startDate, endDate) {
    if (!startDate || !endDate)
        return exports.TRIP_STATUS.PLANNING;
    const now = new Date();
    const start = parseTripDay(startDate, false);
    const end = parseTripDay(endDate, true);
    if (start > now)
        return exports.TRIP_STATUS.PLANNING;
    if (end >= now)
        return exports.TRIP_STATUS.ACTIVE;
    return exports.TRIP_STATUS.COMPLETED;
}
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 30.44;
const DAYS_PER_YEAR = 365.25;
/**
 * Human-scaled countdown from whole days ahead — the unit a person would say:
 * "in 3 days", "in 2 weeks", "in 8 months", "in 1 year". Used by every
 * trip-start countdown on web and mobile (the compact "249d" it replaces was
 * a code-only invention; the design language is "starts in 3 days").
 *
 * <7 → days · <30 → weeks · <365 → months (12 rounded months roll to 1 year) ·
 * else years. Pure: the caller localises via ICU plural keys, because
 * Intl.RelativeTimeFormat is not reliable on Hermes.
 */
function tripCountdown(days) {
    // NaN/∞ clamp too: Math.max(1, NaN) is NaN, which would render "In NaN years".
    const d = Number.isFinite(days) ? Math.max(1, Math.round(days)) : 1;
    if (d < DAYS_PER_WEEK)
        return { unit: 'day', count: d };
    if (d < 30)
        return { unit: 'week', count: Math.max(1, Math.round(d / DAYS_PER_WEEK)) };
    if (d < DAYS_PER_YEAR) {
        const months = Math.max(1, Math.round(d / DAYS_PER_MONTH));
        return months >= 12 ? { unit: 'year', count: 1 } : { unit: 'month', count: months };
    }
    return { unit: 'year', count: Math.max(1, Math.round(d / DAYS_PER_YEAR)) };
}
