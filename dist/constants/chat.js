"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_MESSAGE_ATTACHMENTS = exports.MESSAGE_TYPES = exports.CONVERSATION_TYPES = void 0;
exports.CONVERSATION_TYPES = {
    DIRECT: 'DIRECT',
    GROUP: 'GROUP',
};
exports.MESSAGE_TYPES = {
    TEXT: 'text',
    SYSTEM: 'system',
    /**
     * A photo/video message. Carries 1..N attachments and renders as ONE card —
     * the album is a server-side fact, identical on every device, not a
     * client-side guess about which posts belong together.
     */
    MEDIA: 'media',
    /**
     * A poll. Like MEDIA, one message row carrying a structured payload that
     * renders as a single card — the poll's question, options and raw votes.
     *
     * The durable copy lives in `trip_polls` server-side, NOT in the messages
     * collection: messages carry a 730-day TTL (see MessageSchema) and a poll
     * result must outlive it. On the client the poll IS a message row, which is
     * what lets it reuse the chat engine's outbox, seq ordering and live updates.
     */
    POLL: 'poll',
    /**
     * An SOS from a member: a location snapshot + optional note, rendered as a
     * red card. One immutable message row (no votes, no edits) riding the same
     * relay/outbox as text; `content` always carries readable text so builds
     * that don't know the type still show a plain bubble. Server-side it
     * bypasses trip mute + push cooldown for admins.
     */
    EMERGENCY: 'emergency',
    /**
     * A trip idea — a proposed destination or activity the group votes Yes/No
     * on. Like POLL, one message row carrying a structured payload (`idea`
     * subdoc: kind, place details, raw voter-id lists, status) rendered as one
     * card. When ≥70% of active members vote yes the server creates the plan
     * item (locked) and the card resolves to "Added to plan"; when 70% becomes
     * unreachable it resolves to "Not added". `content` carries the title so
     * builds that don't know the type still show a plain bubble. Trip
     * conversations only.
     */
    IDEA: 'idea',
};
/** WhatsApp's cap, and ours. Enforced in the DTO and the picker. */
exports.MAX_MESSAGE_ATTACHMENTS = 30;
