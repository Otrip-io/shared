/**
 * Clubs — a private group that meets again and again (a riders' club, a hiking
 * society). A club IS a trip document with `type: 'club'`, so it reuses trip
 * members, chat, sync and the phone's SQLite mirror; these are the limits that
 * make it a club.
 */
/** One chat for everyone, like a WhatsApp group (WhatsApp: 1,024). */
export declare const MAX_GROUP_MEMBERS = 1000;
/** How many people one invite batch may add; big groups invite in pages. */
export declare const MAX_INVITE_BATCH = 50;
/** A club's handle (`otrip.io/club/<handle>`) follows the username rules. */
export declare const CLUB_HANDLE_MIN = 5;
export declare const CLUB_HANDLE_MAX = 20;
/** A freed handle (renamed or deleted club) is held this long before anyone can take it. */
export declare const CLUB_HANDLE_HOLD_DAYS = 30;
export declare const MAX_CLUB_INTERESTS = 3;
export declare const MAX_CLUB_MODERATORS = 20;
export declare const MAX_CLUB_TREASURERS = 3;
/** Join questions — trips and clubs alike. */
export declare const MAX_JOIN_QUESTIONS = 3;
export declare const JOIN_QUESTION_MAX_LENGTH = 120;
export declare const JOIN_ANSWER_MAX_LENGTH = 200;
/** Clubs a person may run as admin, per plan (admin-overridable server side). */
export declare const CLUB_LIMIT_FREE = 1;
export declare const CLUB_LIMIT_PRO = 5;
/**
 * Client capabilities. A new app build sends `X-Client-Caps: clubs`; a build
 * without it (the live one) never receives club data and gets
 * `APP_UPDATE_REQUIRED` if it reaches a club by link.
 */
export declare const CLIENT_CAPS_HEADER = "x-client-caps";
export declare const CLIENT_CAPS: {
    readonly CLUBS: "clubs";
};
export type ClientCap = (typeof CLIENT_CAPS)[keyof typeof CLIENT_CAPS];
/** The error code a caps-less phone gets when it reaches a club. */
export declare const APP_UPDATE_REQUIRED = "APP_UPDATE_REQUIRED";
/**
 * Member tags — labels only, never powers. Every club has the ready-made ones
 * (named in each reader's own language on the phone; the English here is for
 * the server's duplicate check); the admin adds up to MAX_CLUB_CUSTOM_TAGS of
 * the club's own. A member shows up to MAX_MEMBER_TAGS.
 */
export declare const CLUB_TAG_COLORS: readonly ["teal", "green", "amber", "blue", "red", "zinc"];
export type ClubTagColor = (typeof CLUB_TAG_COLORS)[number];
export declare const CLUB_TAG_PRESETS: readonly [{
    readonly key: "founding";
    readonly name: "Founding member";
    readonly color: "amber";
}, {
    readonly key: "life";
    readonly name: "Life member";
    readonly color: "amber";
}, {
    readonly key: "organizer";
    readonly name: "Organizer";
    readonly color: "teal";
}, {
    readonly key: "road_captain";
    readonly name: "Road captain";
    readonly color: "green";
}, {
    readonly key: "navigator";
    readonly name: "Navigator";
    readonly color: "blue";
}, {
    readonly key: "first_aid";
    readonly name: "First aid";
    readonly color: "red";
}, {
    readonly key: "mechanic";
    readonly name: "Mechanic";
    readonly color: "zinc";
}, {
    readonly key: "photographer";
    readonly name: "Photographer";
    readonly color: "blue";
}, {
    readonly key: "supporter";
    readonly name: "Supporter";
    readonly color: "teal";
}, {
    readonly key: "veteran";
    readonly name: "Veteran";
    readonly color: "zinc";
}];
export type ClubTagPresetKey = (typeof CLUB_TAG_PRESETS)[number]['key'];
export declare const MAX_CLUB_CUSTOM_TAGS = 10;
export declare const MAX_MEMBER_TAGS = 2;
export declare const CLUB_TAG_NAME_MAX = 20;
