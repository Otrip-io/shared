"use strict";
/**
 * Events (Phase 4). An event is its own module keyed by a container — a club
 * (`containerType: 'club'`, run by its admin and moderators), or a personal
 * event's own space (`'event'`, a trip document of type `event` whose one
 * admin is the host; added 2026-10-03). Everything the phone checks as the
 * host types and the server enforces on every write lives here, so the two
 * can never drift.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EVENT_PREFS = exports.ALL_DAY_REMINDER_HOUR = exports.MAX_EVENT_REMINDERS = exports.EVENT_REMINDER_MINUTES = exports.QUEUED_AT_MAX_SKEW_MS = exports.EVENT_ALBUM_PREVIEW = exports.EVENT_CREATED_PUSHES_PER_DAY = exports.GUEST_RSVPS_PER_DAY = exports.EVENT_ATTENDEES_MAX = exports.MAX_EVENT_PHOTOS = exports.MAX_UPCOMING_EVENTS_PER_HOST = exports.MAX_UPCOMING_EVENTS_PER_CLUB = exports.EVENT_MAX_DAYS = exports.EVENT_CAPACITY_MAX = exports.EVENT_ONLINE_URL_MAX = exports.EVENT_PLACE_ADDRESS_MAX = exports.EVENT_PLACE_NAME_MAX = exports.EVENT_DESCRIPTION_MAX = exports.EVENT_TITLE_MAX = exports.RSVP_ANSWERS = exports.EVENT_STATUSES = exports.EVENT_VISIBILITIES = exports.EVENT_KINDS = exports.EVENT_CONTAINER_TYPES = void 0;
exports.EVENT_CONTAINER_TYPES = ['club', 'event'];
exports.EVENT_KINDS = ['physical', 'online'];
/** `club` = members only (the default on every new event); `public` = anyone opens it and may go as a guest. */
exports.EVENT_VISIBILITIES = ['club', 'public'];
exports.EVENT_STATUSES = ['scheduled', 'cancelled'];
exports.RSVP_ANSWERS = ['going', 'maybe', 'cant'];
exports.EVENT_TITLE_MAX = 80;
exports.EVENT_DESCRIPTION_MAX = 2000;
exports.EVENT_PLACE_NAME_MAX = 200;
exports.EVENT_PLACE_ADDRESS_MAX = 300;
exports.EVENT_ONLINE_URL_MAX = 500;
/** A sanity bound only; the club decides the real number (Spots). */
exports.EVENT_CAPACITY_MAX = 100_000;
/** From the start to the end (all-day: the first to the last day, inclusive). */
exports.EVENT_MAX_DAYS = 30;
/** Anti-spam: scheduled events of one club that have not ended yet. */
exports.MAX_UPCOMING_EVENTS_PER_CLUB = 50;
/** Anti-spam: scheduled personal events one person hosts that have not ended yet. */
exports.MAX_UPCOMING_EVENTS_PER_HOST = 10;
exports.MAX_EVENT_PHOTOS = 30;
/** The attendee list an event carries (Going first, then Maybe, then Can't). The counts are always complete. */
exports.EVENT_ATTENDEES_MAX = 200;
/** Anti-spam: new guest RSVPs one person may make in 24 hours. */
exports.GUEST_RSVPS_PER_DAY = 10;
/** "New event" pushes per club per day — the Alerts rows are always written. */
exports.EVENT_CREATED_PUSHES_PER_DAY = 3;
/** The public page's photo strip. */
exports.EVENT_ALBUM_PREVIEW = 9;
/** How far an op's queued time may sit behind the server clock (S12). */
exports.QUEUED_AT_MAX_SKEW_MS = 24 * 60 * 60 * 1000;
/**
 * Settings → Events and the per-event Reminders sheet: minutes before the
 * start (0 = at the start). Up to two per kind — keeps iOS's 64 pending local
 * notifications in reach.
 */
exports.EVENT_REMINDER_MINUTES = [0, 15, 30, 60, 120, 1440, 2880, 10080];
exports.MAX_EVENT_REMINDERS = 2;
/** All-day events ring at this local hour ("1 day" = 09:00 the day before). */
exports.ALL_DAY_REMINDER_HOUR = 9;
/** What a person gets before they ever open Settings → Events. */
exports.DEFAULT_EVENT_PREFS = Object.freeze({
    inPerson: [1440, 120],
    online: [15],
    maybe: true,
});
