export declare const CONVERSATION_TYPES: {
    readonly DIRECT: "DIRECT";
    readonly GROUP: "GROUP";
};
export type ConversationType = (typeof CONVERSATION_TYPES)[keyof typeof CONVERSATION_TYPES];
export declare const MESSAGE_TYPES: {
    readonly TEXT: "text";
    readonly SYSTEM: "system";
    /**
     * A photo/video message. Carries 1..N attachments and renders as ONE card —
     * the album is a server-side fact, identical on every device, not a
     * client-side guess about which posts belong together.
     */
    readonly MEDIA: "media";
    /**
     * A poll. Like MEDIA, one message row carrying a structured payload that
     * renders as a single card — the poll's question, options and raw votes.
     *
     * The durable copy lives in `trip_polls` server-side, NOT in the messages
     * collection: messages carry a 730-day TTL (see MessageSchema) and a poll
     * result must outlive it. On the client the poll IS a message row, which is
     * what lets it reuse the chat engine's outbox, seq ordering and live updates.
     */
    readonly POLL: "poll";
};
/** WhatsApp's cap, and ours. Enforced in the DTO and the picker. */
export declare const MAX_MESSAGE_ATTACHMENTS = 30;
export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];
