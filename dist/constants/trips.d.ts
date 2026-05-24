export declare const TRIP_VISIBILITY: {
    readonly PUBLIC: "public";
    readonly PRIVATE: "private";
};
export type TripVisibility = (typeof TRIP_VISIBILITY)[keyof typeof TRIP_VISIBILITY];
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
export declare const TRIP_MEMBER_STATUS: {
    readonly ACTIVE: "active";
    readonly REQUEST: "request";
    readonly INVITE: "invite";
};
export type TripMemberStatus = (typeof TRIP_MEMBER_STATUS)[keyof typeof TRIP_MEMBER_STATUS];
export declare const MAX_TRIP_MEMBERS = 50;
export declare function getTripStatus(startDate: Date | string | null | undefined, endDate: Date | string | null | undefined): TripStatus;
