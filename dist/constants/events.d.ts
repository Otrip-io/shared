/**
 * Events (Phase 4). An event is its own module keyed by a container — a club
 * (`containerType: 'club'`, run by its admin and moderators), or a personal
 * event's own space (`'event'`, a trip document of type `event` whose one
 * admin is the host; added 2026-10-03). Everything the phone checks as the
 * host types and the server enforces on every write lives here, so the two
 * can never drift.
 */
export declare const EVENT_CONTAINER_TYPES: readonly ["club", "event"];
export type EventContainerType = (typeof EVENT_CONTAINER_TYPES)[number];
export declare const EVENT_KINDS: readonly ["physical", "online"];
export type EventKind = (typeof EVENT_KINDS)[number];
/** `club` = members only (the default on every new event); `public` = anyone opens it and may go as a guest. */
export declare const EVENT_VISIBILITIES: readonly ["club", "public"];
export type EventVisibility = (typeof EVENT_VISIBILITIES)[number];
export declare const EVENT_STATUSES: readonly ["scheduled", "cancelled"];
export type EventStatus = (typeof EVENT_STATUSES)[number];
export declare const RSVP_ANSWERS: readonly ["going", "maybe", "cant"];
export type RsvpAnswer = (typeof RSVP_ANSWERS)[number];
export declare const EVENT_TITLE_MAX = 80;
export declare const EVENT_DESCRIPTION_MAX = 2000;
export declare const EVENT_PLACE_NAME_MAX = 200;
export declare const EVENT_PLACE_ADDRESS_MAX = 300;
export declare const EVENT_ONLINE_URL_MAX = 500;
/** A sanity bound only; the club decides the real number (Spots). */
export declare const EVENT_CAPACITY_MAX = 100000;
/** From the start to the end (all-day: the first to the last day, inclusive). */
export declare const EVENT_MAX_DAYS = 30;
/** Anti-spam: scheduled events of one club that have not ended yet. */
export declare const MAX_UPCOMING_EVENTS_PER_CLUB = 50;
/** Anti-spam: scheduled personal events one person hosts that have not ended yet. */
export declare const MAX_UPCOMING_EVENTS_PER_HOST = 10;
export declare const MAX_EVENT_PHOTOS = 30;
/** The attendee list an event carries (Going first, then Maybe, then Can't). The counts are always complete. */
export declare const EVENT_ATTENDEES_MAX = 200;
/** Anti-spam: new guest RSVPs one person may make in 24 hours. */
export declare const GUEST_RSVPS_PER_DAY = 10;
/** "New event" pushes per club per day — the Alerts rows are always written. */
export declare const EVENT_CREATED_PUSHES_PER_DAY = 3;
/** The public page's photo strip. */
export declare const EVENT_ALBUM_PREVIEW = 9;
/** How far an op's queued time may sit behind the server clock (S12). */
export declare const QUEUED_AT_MAX_SKEW_MS: number;
/**
 * Settings → Events and the per-event Reminders sheet: minutes before the
 * start (0 = at the start). Up to two per kind — keeps iOS's 64 pending local
 * notifications in reach.
 */
export declare const EVENT_REMINDER_MINUTES: readonly [0, 15, 30, 60, 120, 1440, 2880, 10080];
export declare const MAX_EVENT_REMINDERS = 2;
/** All-day events ring at this local hour ("1 day" = 09:00 the day before). */
export declare const ALL_DAY_REMINDER_HOUR = 9;
export interface EventPrefs {
    /** Physical events. */
    inPerson: number[];
    /** Online events. */
    online: number[];
    /** Also remind me for events I answered Maybe to. Going is always reminded. */
    maybe: boolean;
}
/** What a person gets before they ever open Settings → Events. */
export declare const DEFAULT_EVENT_PREFS: Readonly<EventPrefs>;
/**
 * Paid events (design paid-events, approved 2026-10-18). Otrip never moves
 * money: a price per spot, the host's "how to pay" and refund policy, a
 * receipt photo with each Going, and the admin or a treasurer (a personal
 * event: the host) confirming it. Amounts are integers of the currency's
 * smallest unit (`currencyMinorUnits`, fund.ts).
 */
export declare const EVENT_HOW_TO_PAY_MAX = 500;
export declare const EVENT_REFUND_POLICY_MAX = 500;
/** A typo guard on the price, in minor units. */
export declare const EVENT_PRICE_MAX_MINOR = 100000000;
/** A Going on a paid event: `waiting` holds a spot until someone checks the receipt. */
export declare const EVENT_PAYMENT_STATES: readonly ["waiting", "confirmed", "rejected"];
export type EventPaymentState = (typeof EVENT_PAYMENT_STATES)[number];
/** What a checker picks to reject (the club fund's own reasons). */
export declare const EVENT_REJECT_REASONS: readonly ["not_received", "wrong_amount", "already_paid", "other"];
/** Set by the server when a waiting receipt can no longer be checked. */
export declare const EVENT_AUTO_REJECT_REASONS: readonly ["cancelled", "removed"];
export type EventRejectReason = (typeof EVENT_REJECT_REASONS)[number] | (typeof EVENT_AUTO_REJECT_REASONS)[number];
export declare const EVENT_REJECT_NOTE_MAX = 200;
/** Someone who paid and lost their spot is owed money until it is marked. */
export declare const EVENT_REFUND_STATES: readonly ["due", "refunded"];
export type EventRefundState = (typeof EVENT_REFUND_STATES)[number];
export declare const EVENT_REFUND_REASONS: readonly ["gave_up", "removed", "left_club", "cancelled"];
export type EventRefundReason = (typeof EVENT_REFUND_REASONS)[number];
export declare const EVENT_REFUND_NOTE_MAX = 200;
/** Whoever confirmed may take it back this long; the person's alert and the fund entry wait for it. */
export declare const EVENT_CONFIRM_UNDO_MS: number;
/** A receipt nobody has checked this long nudges the checkers once. */
export declare const EVENT_RECEIPT_NUDGE_MS: number;
/** Receipts are deleted this long after the event ends (or after its last refund is marked, if later). */
export declare const EVENT_RECEIPT_KEEP_DAYS = 90;
/** An event's cover may be a photo or a video up to this long (user, 2026-10-18). */
export declare const EVENT_COVER_VIDEO_MAX_SECONDS = 60;
