"use strict";
/**
 * Clubs — a private group that meets again and again (a riders' club, a hiking
 * society). A club IS a trip document with `type: 'club'`, so it reuses trip
 * members, chat, sync and the phone's SQLite mirror; these are the limits that
 * make it a club.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLUB_TAG_NAME_MAX = exports.MAX_MEMBER_TAGS = exports.MAX_CLUB_CUSTOM_TAGS = exports.CLUB_TAG_PRESETS = exports.CLUB_TAG_COLORS = exports.APP_UPDATE_REQUIRED = exports.CLIENT_CAPS = exports.CLIENT_CAPS_HEADER = exports.CLUB_LIMIT_PRO = exports.CLUB_LIMIT_FREE = exports.JOIN_ANSWER_MAX_LENGTH = exports.JOIN_QUESTION_MAX_LENGTH = exports.MAX_JOIN_QUESTIONS = exports.MAX_CLUB_TREASURERS = exports.MAX_CLUB_MODERATORS = exports.MAX_CLUB_INTERESTS = exports.CLUB_HANDLE_HOLD_DAYS = exports.CLUB_HANDLE_MAX = exports.CLUB_HANDLE_MIN = exports.MAX_INVITE_BATCH = exports.MAX_GROUP_MEMBERS = void 0;
/** One chat for everyone, like a WhatsApp group (WhatsApp: 1,024). */
exports.MAX_GROUP_MEMBERS = 1000;
/** How many people one invite batch may add; big groups invite in pages. */
exports.MAX_INVITE_BATCH = 50;
/** A club's handle (`otrip.io/club/<handle>`) follows the username rules. */
exports.CLUB_HANDLE_MIN = 5;
exports.CLUB_HANDLE_MAX = 20;
/** A freed handle (renamed or deleted club) is held this long before anyone can take it. */
exports.CLUB_HANDLE_HOLD_DAYS = 30;
exports.MAX_CLUB_INTERESTS = 3;
exports.MAX_CLUB_MODERATORS = 20;
exports.MAX_CLUB_TREASURERS = 3;
/** Join questions — trips and clubs alike. */
exports.MAX_JOIN_QUESTIONS = 3;
exports.JOIN_QUESTION_MAX_LENGTH = 120;
exports.JOIN_ANSWER_MAX_LENGTH = 200;
/** Clubs a person may run as admin, per plan (admin-overridable server side). */
exports.CLUB_LIMIT_FREE = 1;
exports.CLUB_LIMIT_PRO = 5;
/**
 * Client capabilities. A new app build sends `X-Client-Caps: clubs`; a build
 * without it (the live one) never receives club data and gets
 * `APP_UPDATE_REQUIRED` if it reaches a club by link.
 */
exports.CLIENT_CAPS_HEADER = 'x-client-caps';
exports.CLIENT_CAPS = {
    CLUBS: 'clubs',
    /** Country communities: a phone without it never gets community data or alerts. */
    COMMUNITIES: 'communities',
};
/** The error code a caps-less phone gets when it reaches a club. */
exports.APP_UPDATE_REQUIRED = 'APP_UPDATE_REQUIRED';
/**
 * Member tags — labels only, never powers. Every club has the ready-made ones
 * (named in each reader's own language on the phone; the English here is for
 * the server's duplicate check); the admin adds up to MAX_CLUB_CUSTOM_TAGS of
 * the club's own. A member shows up to MAX_MEMBER_TAGS.
 */
exports.CLUB_TAG_COLORS = ['teal', 'green', 'amber', 'blue', 'red', 'zinc'];
exports.CLUB_TAG_PRESETS = [
    { key: 'founding', name: 'Founding member', color: 'amber' },
    { key: 'life', name: 'Life member', color: 'amber' },
    { key: 'organizer', name: 'Organizer', color: 'teal' },
    { key: 'road_captain', name: 'Road captain', color: 'green' },
    { key: 'navigator', name: 'Navigator', color: 'blue' },
    { key: 'first_aid', name: 'First aid', color: 'red' },
    { key: 'mechanic', name: 'Mechanic', color: 'zinc' },
    { key: 'photographer', name: 'Photographer', color: 'blue' },
    { key: 'supporter', name: 'Supporter', color: 'teal' },
    { key: 'senior', name: 'Senior member', color: 'zinc' },
];
exports.MAX_CLUB_CUSTOM_TAGS = 10;
exports.MAX_MEMBER_TAGS = 2;
exports.CLUB_TAG_NAME_MAX = 20;
