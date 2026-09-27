/**
 * Club events (Phase 4). An event is its own module keyed by a container —
 * v1 knows one container, a club (`containerType: 'club'`). Everything the
 * phone checks as the admin types and the server enforces on every write
 * lives here, so the two can never drift.
 */

export const EVENT_CONTAINER_TYPES = ['club'] as const;
export type EventContainerType = (typeof EVENT_CONTAINER_TYPES)[number];

export const EVENT_KINDS = ['physical', 'online'] as const;
export type EventKind = (typeof EVENT_KINDS)[number];

/** `club` = members only (the default on every new event); `public` = anyone opens it and may go as a guest. */
export const EVENT_VISIBILITIES = ['club', 'public'] as const;
export type EventVisibility = (typeof EVENT_VISIBILITIES)[number];

export const EVENT_STATUSES = ['scheduled', 'cancelled'] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

export const RSVP_ANSWERS = ['going', 'maybe', 'cant'] as const;
export type RsvpAnswer = (typeof RSVP_ANSWERS)[number];

export const EVENT_TITLE_MAX = 80;
export const EVENT_DESCRIPTION_MAX = 2000;
export const EVENT_PLACE_NAME_MAX = 200;
export const EVENT_PLACE_ADDRESS_MAX = 300;
export const EVENT_ONLINE_URL_MAX = 500;
/** A sanity bound only; the club decides the real number (Spots). */
export const EVENT_CAPACITY_MAX = 100_000;
/** From the start to the end (all-day: the first to the last day, inclusive). */
export const EVENT_MAX_DAYS = 30;
/** Anti-spam: scheduled events of one club that have not ended yet. */
export const MAX_UPCOMING_EVENTS_PER_CLUB = 50;
export const MAX_EVENT_PHOTOS = 30;
/** The attendee list an event carries (Going first, then Maybe). The counts are always complete. */
export const EVENT_ATTENDEES_MAX = 200;
/** Anti-spam: new guest RSVPs one person may make in 24 hours. */
export const GUEST_RSVPS_PER_DAY = 10;
/** "New event" pushes per club per day — the Alerts rows are always written. */
export const EVENT_CREATED_PUSHES_PER_DAY = 3;
/** The public page's photo strip. */
export const EVENT_ALBUM_PREVIEW = 9;
/** How far an op's queued time may sit behind the server clock (S12). */
export const QUEUED_AT_MAX_SKEW_MS = 24 * 60 * 60 * 1000;

/**
 * Settings → Events and the per-event Reminders sheet: minutes before the
 * start (0 = at the start). Up to two per kind — keeps iOS's 64 pending local
 * notifications in reach.
 */
export const EVENT_REMINDER_MINUTES = [0, 15, 30, 60, 120, 1440, 2880, 10080] as const;
export const MAX_EVENT_REMINDERS = 2;
/** All-day events ring at this local hour ("1 day" = 09:00 the day before). */
export const ALL_DAY_REMINDER_HOUR = 9;

export interface EventPrefs {
  /** Physical events. */
  inPerson: number[];
  /** Online events. */
  online: number[];
  /** Also remind me for events I answered Maybe to. Going is always reminded. */
  maybe: boolean;
}

/** What a person gets before they ever open Settings → Events. */
export const DEFAULT_EVENT_PREFS: Readonly<EventPrefs> = Object.freeze({
  inPerson: [1440, 120],
  online: [15],
  maybe: true,
});
