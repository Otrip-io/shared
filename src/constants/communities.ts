/**
 * Country communities (design approved 2026-10-04). One per country, no admins:
 * a word list checks every post, members vote and report, and helpers or the
 * Otrip team decide on reported posts. Values the phone and the server both
 * need; every moderation NUMBER lives in the server's CommunityConfig instead,
 * so the admin can change it without an app update.
 */

/** A post asks something or tells something. */
export const COMMUNITY_POST_KINDS = ['question', 'update'] as const;
export type CommunityPostKind = (typeof COMMUNITY_POST_KINDS)[number];

/** The composer's topic pills, in their order on screen. */
export const COMMUNITY_TOPICS = ['visa_borders', 'transport', 'roads_weather', 'safety', 'money', 'stay', 'food', 'events'] as const;
export type CommunityTopic = (typeof COMMUNITY_TOPICS)[number];

/** Report reasons, in their order on the Report sheet. `threat` skips helpers and goes straight to staff. */
export const COMMUNITY_REPORT_REASONS = ['hate', 'sexual', 'threat', 'spam', 'wrong_info', 'not_travel', 'other'] as const;
export type CommunityReportReason = (typeof COMMUNITY_REPORT_REASONS)[number];

/** Characters in one post or reply (the composer's 500/500 counter). */
export const COMMUNITY_TEXT_MAX = 500;

/** Bumped when the six rules change: everyone sees step 4 of the intro again and agrees again. */
export const COMMUNITY_RULES_VERSION = 1;

/** A vote is up (+1), down (−1) or taken back (0). Absolute, so a replay is a no-op. */
export const COMMUNITY_VOTE_VALUES = [1, -1, 0] as const;
export type CommunityVoteValue = (typeof COMMUNITY_VOTE_VALUES)[number];

export type CommunityLevel = 'new' | 'member' | 'helper';
