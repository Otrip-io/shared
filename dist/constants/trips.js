"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_TRIP_MEMBERS = exports.TRIP_MEMBER_STATUS = exports.RIDE_ROLES = exports.TRIP_MEMBER_ROLES = exports.TRIP_STATUS = exports.TRIP_TYPE = exports.TRIP_VISIBILITY = void 0;
exports.getTripStatus = getTripStatus;
exports.TRIP_VISIBILITY = {
    PUBLIC: 'public',
    PRIVATE: 'private',
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
function getTripStatus(startDate, endDate) {
    if (!startDate || !endDate)
        return exports.TRIP_STATUS.PLANNING;
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    if (start > now)
        return exports.TRIP_STATUS.PLANNING;
    if (end >= now)
        return exports.TRIP_STATUS.ACTIVE;
    return exports.TRIP_STATUS.COMPLETED;
}
