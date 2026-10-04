"use strict";
/**
 * Country communities (design approved 2026-10-04). One per country, no admins:
 * a word list checks every post, members vote and report, and helpers or the
 * Otrip team decide on reported posts. Values the phone and the server both
 * need; every moderation NUMBER lives in the server's CommunityConfig instead,
 * so the admin can change it without an app update.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNITY_VOTE_VALUES = exports.COMMUNITY_RULES_VERSION = exports.COMMUNITY_TEXT_MAX = exports.COMMUNITY_REPORT_REASONS = exports.COMMUNITY_TOPICS = exports.COMMUNITY_POST_KINDS = void 0;
/** A post asks something or tells something. */
exports.COMMUNITY_POST_KINDS = ['question', 'update'];
/** The composer's topic pills, in their order on screen. */
exports.COMMUNITY_TOPICS = ['visa_borders', 'transport', 'roads_weather', 'safety', 'money', 'stay', 'food', 'events'];
/** Report reasons, in their order on the Report sheet. `threat` skips helpers and goes straight to staff. */
exports.COMMUNITY_REPORT_REASONS = ['hate', 'sexual', 'threat', 'spam', 'wrong_info', 'not_travel', 'other'];
/** Characters in one post or reply (the composer's 500/500 counter). */
exports.COMMUNITY_TEXT_MAX = 500;
/** Bumped when the six rules change: everyone sees step 4 of the intro again and agrees again. */
exports.COMMUNITY_RULES_VERSION = 1;
/** A vote is up (+1), down (−1) or taken back (0). Absolute, so a replay is a no-op. */
exports.COMMUNITY_VOTE_VALUES = [1, -1, 0];
