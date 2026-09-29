/**
 * Clubs — a private group that meets again and again (a riders' club, a hiking
 * society). A club IS a trip document with `type: 'club'`, so it reuses trip
 * members, chat, sync and the phone's SQLite mirror; these are the limits that
 * make it a club.
 */

/** One chat for everyone, like a WhatsApp group (WhatsApp: 1,024). */
export const MAX_GROUP_MEMBERS = 1000;

/** How many people one invite batch may add; big groups invite in pages. */
export const MAX_INVITE_BATCH = 50;

/** A club's handle (`otrip.io/club/<handle>`) follows the username rules. */
export const CLUB_HANDLE_MIN = 5;
export const CLUB_HANDLE_MAX = 20;
/** A freed handle (renamed or deleted club) is held this long before anyone can take it. */
export const CLUB_HANDLE_HOLD_DAYS = 30;

export const MAX_CLUB_INTERESTS = 3;
export const MAX_CLUB_MODERATORS = 20;
export const MAX_CLUB_TREASURERS = 3;

/** Join questions — trips and clubs alike. */
export const MAX_JOIN_QUESTIONS = 3;
export const JOIN_QUESTION_MAX_LENGTH = 120;
export const JOIN_ANSWER_MAX_LENGTH = 200;

/** Clubs a person may run as admin, per plan (admin-overridable server side). */
export const CLUB_LIMIT_FREE = 1;
export const CLUB_LIMIT_PRO = 5;

/**
 * Client capabilities. A new app build sends `X-Client-Caps: clubs`; a build
 * without it (the live one) never receives club data and gets
 * `APP_UPDATE_REQUIRED` if it reaches a club by link.
 */
export const CLIENT_CAPS_HEADER = 'x-client-caps';
export const CLIENT_CAPS = {
  CLUBS: 'clubs',
} as const;

export type ClientCap = (typeof CLIENT_CAPS)[keyof typeof CLIENT_CAPS];

/** The error code a caps-less phone gets when it reaches a club. */
export const APP_UPDATE_REQUIRED = 'APP_UPDATE_REQUIRED';

/**
 * Member tags — labels only, never powers. Every club has the ready-made ones
 * (named in each reader's own language on the phone; the English here is for
 * the server's duplicate check); the admin adds up to MAX_CLUB_CUSTOM_TAGS of
 * the club's own. A member shows up to MAX_MEMBER_TAGS.
 */
export const CLUB_TAG_COLORS = ['teal', 'green', 'amber', 'blue', 'red', 'zinc'] as const;
export type ClubTagColor = (typeof CLUB_TAG_COLORS)[number];

export const CLUB_TAG_PRESETS = [
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
] as const satisfies readonly { key: string; name: string; color: ClubTagColor }[];

export type ClubTagPresetKey = (typeof CLUB_TAG_PRESETS)[number]['key'];

export const MAX_CLUB_CUSTOM_TAGS = 10;
export const MAX_MEMBER_TAGS = 2;
export const CLUB_TAG_NAME_MAX = 20;
