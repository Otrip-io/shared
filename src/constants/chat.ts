export const CONVERSATION_TYPES = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
} as const;

export type ConversationType = (typeof CONVERSATION_TYPES)[keyof typeof CONVERSATION_TYPES];

export const MESSAGE_TYPES = {
  TEXT: 'text',
  SYSTEM: 'system',
  /**
   * A photo/video message. Carries 1..N attachments and renders as ONE card —
   * the album is a server-side fact, identical on every device, not a
   * client-side guess about which posts belong together.
   */
  MEDIA: 'media',
} as const;

/** WhatsApp's cap, and ours. Enforced in the DTO and the picker. */
export const MAX_MESSAGE_ATTACHMENTS = 30;

export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];
