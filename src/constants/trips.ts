export const TRIP_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;

export type TripVisibility = (typeof TRIP_VISIBILITY)[keyof typeof TRIP_VISIBILITY];

/**
 * Who can send messages in the trip chat. `announcement` = only trip admins
 * post (WhatsApp announcement-group style) — members keep the "+" actions and
 * reactions. Backward-compat (Work Rule 10): defaults to `chat`; old clients
 * and existing trip documents (field absent) behave exactly as before.
 */
export const TRIP_CHAT_MODE = {
  CHAT: 'chat',
  ANNOUNCEMENT: 'announcement',
} as const;

export type TripChatMode = (typeof TRIP_CHAT_MODE)[keyof typeof TRIP_CHAT_MODE];

/**
 * A trip's kind. Behind the scenes an expense group, a shared list, or a doc
 * is just a Trip with a single active module — one entity, one members model,
 * one offline-sync path. `trip` is the full multi-module travel trip (the only
 * kind that can be public/discoverable). New kinds are private-only utilities.
 *
 * Backward-compat (Work Rule 10): the field defaults to `trip`, so every
 * existing trip document and every old client (which never sends `type`) keeps
 * behaving exactly as before.
 */
export const TRIP_TYPE = {
  TRIP: 'trip',
  EXPENSE: 'expense',
  LIST: 'list',
  DOCS: 'docs',
} as const;

export type TripType = (typeof TRIP_TYPE)[keyof typeof TRIP_TYPE];

export const TRIP_STATUS = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type TripStatus = (typeof TRIP_STATUS)[keyof typeof TRIP_STATUS];

export const TRIP_MEMBER_ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
} as const;

export type TripMemberRole = (typeof TRIP_MEMBER_ROLES)[keyof typeof TRIP_MEMBER_ROLES];

/**
 * Convoy role for Ride Mode (group ride live location). Distinct from
 * TRIP_MEMBER_ROLES, which is the PERMISSION role — rideRole is what the
 * member does in the convoy and only affects how their pin renders on the
 * ride map. Absent/undefined = regular rider (primary/teal pin).
 */
export const RIDE_ROLES = {
  LEAD: 'lead',
  MARSHAL: 'marshal',
  TAIL: 'tail',
  BACKUP: 'backup',
} as const;

export type RideRole = (typeof RIDE_ROLES)[keyof typeof RIDE_ROLES];

export const TRIP_MEMBER_STATUS = {
  ACTIVE: 'active',
  REQUEST: 'request',
  INVITE: 'invite',
} as const;

export type TripMemberStatus = (typeof TRIP_MEMBER_STATUS)[keyof typeof TRIP_MEMBER_STATUS];

export const MAX_TRIP_MEMBERS = 50;

export function getTripStatus(
  startDate: Date | string | null | undefined,
  endDate: Date | string | null | undefined,
): TripStatus {
  if (!startDate || !endDate) return TRIP_STATUS.PLANNING;
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  if (start > now) return TRIP_STATUS.PLANNING;
  if (end >= now) return TRIP_STATUS.ACTIVE;
  return TRIP_STATUS.COMPLETED;
}
