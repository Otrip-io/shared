/**
 * The personal document vault (designs 23f / 23h).
 *
 * A document belongs to a USER, not to a trip — `tripId` is an optional link
 * ("Attach to trip · optional"). That is why this lives beside TRIP_TYPE rather
 * than inside it: a passport is not a trip.
 */

export const DOCUMENT_TYPE = {
  PASSPORT: 'passport',
  VISA: 'visa',
  FLIGHT_TICKET: 'flight_ticket',
  HOTEL_BOOKING: 'hotel_booking',
  INSURANCE: 'insurance',
  VACCINATION: 'vaccination',
  ID_CARD: 'id_card',
  DRIVERS_LICENSE: 'drivers_license',
} as const;

export type DocumentType = (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];

/** The order the 8 type cards are drawn in on 23f, left→right, top→bottom. */
export const DOCUMENT_TYPES: readonly DocumentType[] = [
  DOCUMENT_TYPE.PASSPORT,
  DOCUMENT_TYPE.VISA,
  DOCUMENT_TYPE.FLIGHT_TICKET,
  DOCUMENT_TYPE.HOTEL_BOOKING,
  DOCUMENT_TYPE.INSURANCE,
  DOCUMENT_TYPE.VACCINATION,
  DOCUMENT_TYPE.ID_CARD,
  DOCUMENT_TYPE.DRIVERS_LICENSE,
];

export const DOCUMENT_CATEGORY = {
  IDENTITY: 'identity',
  BOOKINGS: 'bookings',
  INSURANCE: 'insurance',
  HEALTH: 'health',
} as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORY)[keyof typeof DOCUMENT_CATEGORY];

/**
 * Category is DERIVED from the type, never chosen — 23f promises "We file it in
 * the right place automatically". Shared so the server and every client agree
 * on the filing; a second copy of this map would eventually disagree.
 */
export const DOCUMENT_TYPE_CATEGORY: Readonly<Record<DocumentType, DocumentCategory>> = {
  [DOCUMENT_TYPE.PASSPORT]: DOCUMENT_CATEGORY.IDENTITY,
  [DOCUMENT_TYPE.VISA]: DOCUMENT_CATEGORY.IDENTITY,
  [DOCUMENT_TYPE.ID_CARD]: DOCUMENT_CATEGORY.IDENTITY,
  [DOCUMENT_TYPE.DRIVERS_LICENSE]: DOCUMENT_CATEGORY.IDENTITY,
  [DOCUMENT_TYPE.FLIGHT_TICKET]: DOCUMENT_CATEGORY.BOOKINGS,
  [DOCUMENT_TYPE.HOTEL_BOOKING]: DOCUMENT_CATEGORY.BOOKINGS,
  [DOCUMENT_TYPE.INSURANCE]: DOCUMENT_CATEGORY.INSURANCE,
  [DOCUMENT_TYPE.VACCINATION]: DOCUMENT_CATEGORY.HEALTH,
};

/** The filing rule, as a function. Unknown types file under Identity. */
export function documentCategoryOf(type: string): DocumentCategory {
  return DOCUMENT_TYPE_CATEGORY[type as DocumentType] ?? DOCUMENT_CATEGORY.IDENTITY;
}

/**
 * How close to expiry a document reads as "Expiring" (23h: an amber badge and a
 * red subtitle at 22 days out). Derived on read from `expiresAt` — never stored,
 * or every row would need a nightly job to stay honest.
 */
export const DOCUMENT_EXPIRING_DAYS = 30;
