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
export declare const MAX_TRIP_MEMBERS = 50;
export declare function getTripStatus(startDate: Date | string | null | undefined, endDate: Date | string | null | undefined): TripStatus;
