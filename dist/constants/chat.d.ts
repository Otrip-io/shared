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
};
/** WhatsApp's cap, and ours. Enforced in the DTO and the picker. */
export declare const MAX_MESSAGE_ATTACHMENTS = 30;
export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];
