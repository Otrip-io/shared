"use strict";
/**
 * Clubs — a private group that meets again and again (a riders' club, a hiking
 * society). A club IS a trip document with `type: 'club'`, so it reuses trip
 * members, chat, sync and the phone's SQLite mirror; these are the limits that
 * make it a club.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_UPDATE_REQUIRED = exports.CLIENT_CAPS = exports.CLIENT_CAPS_HEADER = exports.CLUB_LIMIT_PRO = exports.CLUB_LIMIT_FREE = exports.JOIN_ANSWER_MAX_LENGTH = exports.JOIN_QUESTION_MAX_LENGTH = exports.MAX_JOIN_QUESTIONS = exports.MAX_CLUB_TREASURERS = exports.MAX_CLUB_MODERATORS = exports.MAX_CLUB_INTERESTS = exports.CLUB_HANDLE_HOLD_DAYS = exports.CLUB_HANDLE_MAX = exports.CLUB_HANDLE_MIN = exports.MAX_INVITE_BATCH = exports.MAX_GROUP_MEMBERS = void 0;
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
};
/** The error code a caps-less phone gets when it reaches a club. */
exports.APP_UPDATE_REQUIRED = 'APP_UPDATE_REQUIRED';
