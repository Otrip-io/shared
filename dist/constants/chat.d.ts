export declare const CONVERSATION_TYPES: {
    readonly DIRECT: "DIRECT";
    readonly GROUP: "GROUP";
};
export type ConversationType = (typeof CONVERSATION_TYPES)[keyof typeof CONVERSATION_TYPES];
export declare const MESSAGE_TYPES: {
    readonly TEXT: "text";
    readonly SYSTEM: "system";
};
export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];
