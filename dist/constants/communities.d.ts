/**
 * Country communities (design approved 2026-10-04). One per country, no admins:
 * a word list checks every post, members vote and report, and helpers or the
 * Otrip team decide on reported posts. Values the phone and the server both
 * need; every moderation NUMBER lives in the server's CommunityConfig instead,
 * so the admin can change it without an app update.
 */
/** A post asks something or tells something. */
export declare const COMMUNITY_POST_KINDS: readonly ["question", "update"];
export type CommunityPostKind = (typeof COMMUNITY_POST_KINDS)[number];
/** The composer's topic pills, in their order on screen. */
export declare const COMMUNITY_TOPICS: readonly ["visa_borders", "transport", "roads_weather", "safety", "money", "stay", "food", "events"];
export type CommunityTopic = (typeof COMMUNITY_TOPICS)[number];
/** Report reasons, in their order on the Report sheet. `threat` skips helpers and goes straight to staff. */
export declare const COMMUNITY_REPORT_REASONS: readonly ["hate", "sexual", "threat", "spam", "wrong_info", "not_travel", "other"];
export type CommunityReportReason = (typeof COMMUNITY_REPORT_REASONS)[number];
/** Characters in one post or reply (the composer's 500/500 counter). */
export declare const COMMUNITY_TEXT_MAX = 500;
/** Bumped when the six rules change: everyone sees step 4 of the intro again and agrees again. */
export declare const COMMUNITY_RULES_VERSION = 1;
/** A vote is up (+1), down (−1) or taken back (0). Absolute, so a replay is a no-op. */
export declare const COMMUNITY_VOTE_VALUES: readonly [1, -1, 0];
export type CommunityVoteValue = (typeof COMMUNITY_VOTE_VALUES)[number];
export type CommunityLevel = 'new' | 'member' | 'helper';
