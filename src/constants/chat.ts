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
  /**
   * A sticker. One immutable message row carrying `{ packId, stickerId }` —
   * two short ids and never a url, because the artwork is bundled in the app.
   * That is what lets a sticker render instantly, cost no storage and send
   * offline.
   *
   * `content` always carries the sticker's stand-in emoji, so a build that
   * predates this type shows that emoji rather than an empty bubble, and the
   * chat-list preview and push notification keep working there too.
   */
  STICKER: 'sticker',
  /**
   * A club event's card in the club chat, posted by the server when a manager
   * creates an event. Carries `event: { eventId }` and nothing else — the
   * phone draws the card from its own events table. Club chats only, so a
   * build without the clubs capability never receives one.
   */
  EVENT: 'event',
} as const;

/** WhatsApp's cap, and ours. Enforced in the DTO and the picker. */
export const MAX_MESSAGE_ATTACHMENTS = 30;

export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

/**
 * Pinned messages (trip chats, club chats, DMs). A pin is conversation state,
 * never a message: at most this many at once, each kept for one of the
 * durations below and hidden everywhere once it runs out.
 */
export const MAX_CHAT_PINS = 3;

/** How long a pin stays, in milliseconds — the three choices in the Pin sheet. */
export const CHAT_PIN_DURATIONS = {
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
} as const;

export type ChatPinDuration = keyof typeof CHAT_PIN_DURATIONS;

export const DEFAULT_CHAT_PIN_DURATION: ChatPinDuration = '7d';
