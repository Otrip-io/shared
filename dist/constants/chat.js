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
};
/** WhatsApp's cap, and ours. Enforced in the DTO and the picker. */
exports.MAX_MESSAGE_ATTACHMENTS = 30;
