export declare const TRIP_VISIBILITY: {
    readonly PUBLIC: "public";
    readonly PRIVATE: "private";
};
export type TripVisibility = (typeof TRIP_VISIBILITY)[keyof typeof TRIP_VISIBILITY];
/**
 * Who can send messages in the trip chat. `announcement` = only trip admins
 * post (WhatsApp announcement-group style) — members keep the "+" actions and
 * reactions. Backward-compat (Work Rule 10): defaults to `chat`; old clients
 * and existing trip documents (field absent) behave exactly as before.
 */
export declare const TRIP_CHAT_MODE: {
    readonly CHAT: "chat";
    readonly ANNOUNCEMENT: "announcement";
};
export type TripChatMode = (typeof TRIP_CHAT_MODE)[keyof typeof TRIP_CHAT_MODE];
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
export declare const TRIP_TYPE: {
    readonly TRIP: "trip";
    readonly EXPENSE: "expense";
    readonly LIST: "list";
    readonly DOCS: "docs";
    /** A club — see `constants/clubs.ts`. Never public; hidden from builds without the clubs capability. */
    readonly CLUB: "club";
    /**
     * A group ride (2026-10-03): a private space whose whole screen is the live
     * members map. NOT hidden from older builds — one that does not know the
     * kind shows it as an ordinary trip (its row and screen fall back to the
     * trip ones), where the same ride mode works, so those members can still ride.
     */
    readonly RIDE: "ride";
    /**
     * A personal event (2026-10-03): a private space holding ONE event — the
     * people its host invites are its members, and it has a chat. Shown by a
     * build that does not know the kind as an ordinary trip with that chat
     * (the live 2.8.1 has no events at all).
     */
    readonly EVENT: "event";
};
export type TripType = (typeof TRIP_TYPE)[keyof typeof TRIP_TYPE];
export declare const TRIP_STATUS: {
    readonly PLANNING: "planning";
    readonly ACTIVE: "active";
    readonly COMPLETED: "completed";
};
export type TripStatus = (typeof TRIP_STATUS)[keyof typeof TRIP_STATUS];
export declare const TRIP_MEMBER_ROLES: {
    readonly ADMIN: "admin";
    /** Clubs only: helps the one admin run the club (requests, removals, events, pins, tags). */
    readonly MODERATOR: "moderator";
    readonly VIEWER: "viewer";
};
export type TripMemberRole = (typeof TRIP_MEMBER_ROLES)[keyof typeof TRIP_MEMBER_ROLES];
/**
 * Convoy role for Ride Mode (group ride live location). Distinct from
 * TRIP_MEMBER_ROLES, which is the PERMISSION role — rideRole is what the
 * member does in the convoy and only affects how their pin renders on the
 * ride map. Absent/undefined = regular rider (primary/teal pin).
 */
export declare const RIDE_ROLES: {
    readonly LEAD: "lead";
    readonly MARSHAL: "marshal";
    readonly TAIL: "tail";
    readonly BACKUP: "backup";
};
export type RideRole = (typeof RIDE_ROLES)[keyof typeof RIDE_ROLES];
export declare const TRIP_MEMBER_STATUS: {
    readonly ACTIVE: "active";
    readonly REQUEST: "request";
    readonly INVITE: "invite";
};
export type TripMemberStatus = (typeof TRIP_MEMBER_STATUS)[keyof typeof TRIP_MEMBER_STATUS];
/**
 * Members per trip — the same 1,000 as a club (user decision 2026-09-26: no
 * separate trip cap). Kept as its own name so every existing import stays valid.
 */
export declare const MAX_TRIP_MEMBERS = 1000;
export declare function getTripStatus(startDate: Date | string | null | undefined, endDate: Date | string | null | undefined): TripStatus;
export type CountdownUnit = 'day' | 'week' | 'month' | 'year';
export interface TripCountdown {
    unit: CountdownUnit;
    /** Always >= 1. */
    count: number;
}
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
export declare function tripCountdown(days: number): TripCountdown;
/**
 * Who sees a member's emergency info in one trip (plan G4): the trip's
 * admins, everyone in it, or nobody. A membership with no choice reads as
 * `all` — today's behaviour, so nothing changes silently. During the
 * member's own SOS (EMERGENCY_SOS_SHARE_HOURS) everyone sees it anyway.
 * Clubs never carry emergency info at all (plan S1).
 */
export declare const EMERGENCY_VISIBILITIES: readonly ["admins", "all", "off"];
export type EmergencyVisibility = (typeof EMERGENCY_VISIBILITIES)[number];
export declare const EMERGENCY_VISIBILITY_DEFAULT: EmergencyVisibility;
/** Trips made from a public event start members on `admins` (strangers meet there). */
export declare const EMERGENCY_VISIBILITY_EVENT_TRIP: EmergencyVisibility;
/** How long after sending an SOS a member's info is shown to the whole trip. */
export declare const EMERGENCY_SOS_SHARE_HOURS = 24;
export declare function isEmergencyVisibility(v: unknown): v is EmergencyVisibility;
