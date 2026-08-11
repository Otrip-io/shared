/**
 * The personal document vault (designs 23f / 23h).
 *
 * A document belongs to a USER, not to a trip — `tripId` is an optional link
 * ("Attach to trip · optional"). That is why this lives beside TRIP_TYPE rather
 * than inside it: a passport is not a trip.
 */
export declare const DOCUMENT_TYPE: {
    readonly PASSPORT: "passport";
    readonly VISA: "visa";
    readonly FLIGHT_TICKET: "flight_ticket";
    readonly HOTEL_BOOKING: "hotel_booking";
    readonly INSURANCE: "insurance";
    readonly VACCINATION: "vaccination";
    readonly ID_CARD: "id_card";
    readonly DRIVERS_LICENSE: "drivers_license";
};
export type DocumentType = (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
/** The order the 8 type cards are drawn in on 23f, left→right, top→bottom. */
export declare const DOCUMENT_TYPES: readonly DocumentType[];
export declare const DOCUMENT_CATEGORY: {
    readonly IDENTITY: "identity";
    readonly BOOKINGS: "bookings";
    readonly INSURANCE: "insurance";
    readonly HEALTH: "health";
};
export type DocumentCategory = (typeof DOCUMENT_CATEGORY)[keyof typeof DOCUMENT_CATEGORY];
/**
 * Category is DERIVED from the type, never chosen — 23f promises "We file it in
 * the right place automatically". Shared so the server and every client agree
 * on the filing; a second copy of this map would eventually disagree.
 */
export declare const DOCUMENT_TYPE_CATEGORY: Readonly<Record<DocumentType, DocumentCategory>>;
/** The filing rule, as a function. Unknown types file under Identity. */
export declare function documentCategoryOf(type: string): DocumentCategory;
/**
 * How close to expiry a document reads as "Expiring" (23h: an amber badge and a
 * red subtitle at 22 days out). Derived on read from `expiresAt` — never stored,
 * or every row would need a nightly job to stay honest.
 */
export declare const DOCUMENT_EXPIRING_DAYS = 30;
