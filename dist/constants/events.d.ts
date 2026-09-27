/**
 * Club events (Phase 4). An event is its own module keyed by a container —
 * v1 knows one container, a club (`containerType: 'club'`). Everything the
 * phone checks as the admin types and the server enforces on every write
 * lives here, so the two can never drift.
 */
export declare const EVENT_CONTAINER_TYPES: readonly ["club"];
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
export declare const MAX_EVENT_PHOTOS = 30;
/** The attendee list an event carries (Going first, then Maybe). The counts are always complete. */
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
