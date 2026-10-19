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
exports.EVENT_COVER_VIDEO_MAX_SECONDS = exports.EVENT_RECEIPT_KEEP_DAYS = exports.EVENT_RECEIPT_NUDGE_MS = exports.EVENT_CONFIRM_UNDO_MS = exports.EVENT_REFUND_NOTE_MAX = exports.EVENT_REFUND_REASONS = exports.EVENT_REFUND_STATES = exports.EVENT_REJECT_NOTE_MAX = exports.EVENT_AUTO_REJECT_REASONS = exports.EVENT_REJECT_REASONS = exports.EVENT_PAYMENT_STATES = exports.EVENT_PRICE_MAX_MINOR = exports.EVENT_REFUND_POLICY_MAX = exports.EVENT_HOW_TO_PAY_MAX = exports.DEFAULT_EVENT_PREFS = exports.ALL_DAY_REMINDER_HOUR = exports.MAX_EVENT_REMINDERS = exports.EVENT_REMINDER_MINUTES = exports.QUEUED_AT_MAX_SKEW_MS = exports.EVENT_ALBUM_PREVIEW = exports.EVENT_CREATED_PUSHES_PER_DAY = exports.GUEST_RSVPS_PER_DAY = exports.EVENT_ATTENDEES_MAX = exports.MAX_EVENT_PHOTOS = exports.MAX_UPCOMING_EVENTS_PER_HOST = exports.MAX_UPCOMING_EVENTS_PER_CLUB = exports.EVENT_MAX_DAYS = exports.EVENT_CAPACITY_MAX = exports.EVENT_ONLINE_URL_MAX = exports.EVENT_PLACE_ADDRESS_MAX = exports.EVENT_PLACE_NAME_MAX = exports.EVENT_DESCRIPTION_MAX = exports.EVENT_TITLE_MAX = exports.RSVP_ANSWERS = exports.EVENT_STATUSES = exports.EVENT_VISIBILITIES = exports.EVENT_KINDS = exports.EVENT_CONTAINER_TYPES = void 0;
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
/** An event album's size, photos and videos together (user, 2026-10-19: was 30). */
exports.MAX_EVENT_PHOTOS = 20;
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
/**
 * Paid events (design paid-events, approved 2026-10-18). Otrip never moves
 * money: a price per spot, the host's "how to pay" and refund policy, a
 * receipt photo with each Going, and the admin or a treasurer (a personal
 * event: the host) confirming it. Amounts are integers of the currency's
 * smallest unit (`currencyMinorUnits`, fund.ts).
 */
exports.EVENT_HOW_TO_PAY_MAX = 500;
exports.EVENT_REFUND_POLICY_MAX = 500;
/** A typo guard on the price, in minor units. */
exports.EVENT_PRICE_MAX_MINOR = 100_000_000;
/** A Going on a paid event: `waiting` holds a spot until someone checks the receipt. */
exports.EVENT_PAYMENT_STATES = ['waiting', 'confirmed', 'rejected'];
/** What a checker picks to reject (the club fund's own reasons). */
exports.EVENT_REJECT_REASONS = ['not_received', 'wrong_amount', 'already_paid', 'other'];
/** Set by the server when a waiting receipt can no longer be checked. */
exports.EVENT_AUTO_REJECT_REASONS = ['cancelled', 'removed'];
exports.EVENT_REJECT_NOTE_MAX = 200;
/** Someone who paid and lost their spot is owed money until it is marked. */
exports.EVENT_REFUND_STATES = ['due', 'refunded'];
exports.EVENT_REFUND_REASONS = ['gave_up', 'removed', 'left_club', 'cancelled'];
exports.EVENT_REFUND_NOTE_MAX = 200;
/** Whoever confirmed may take it back this long; the person's alert and the fund entry wait for it. */
exports.EVENT_CONFIRM_UNDO_MS = 10 * 60 * 1000;
/** A receipt nobody has checked this long nudges the checkers once. */
exports.EVENT_RECEIPT_NUDGE_MS = 2 * 24 * 60 * 60 * 1000;
/** Receipts are deleted this long after the event ends (or after its last refund is marked, if later). */
exports.EVENT_RECEIPT_KEEP_DAYS = 90;
/** An event's cover may be a photo or a video up to this long (user, 2026-10-18). */
exports.EVENT_COVER_VIDEO_MAX_SECONDS = 60;
