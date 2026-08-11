"use strict";
/**
 * The personal document vault (designs 23f / 23h).
 *
 * A document belongs to a USER, not to a trip — `tripId` is an optional link
 * ("Attach to trip · optional"). That is why this lives beside TRIP_TYPE rather
 * than inside it: a passport is not a trip.
 *
 * The list is deliberately SHORT. A passport, an ID card and a driving licence
 * are one thing to the person carrying them — `identity` — and every document
 * that doesn't fit a named type belongs in `other` rather than being forced
 * into the nearest wrong one, which is what makes the categories mean anything.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCUMENT_EXPIRING_DAYS = exports.DOCUMENT_TYPE_CATEGORY = exports.DOCUMENT_CATEGORY = exports.DOCUMENT_TYPES = exports.DOCUMENT_TYPE = void 0;
exports.documentCategoryOf = documentCategoryOf;
exports.DOCUMENT_TYPE = {
    /** Passport, national ID card, driving licence — "my ID". */
    IDENTITY: 'identity',
    VISA: 'visa',
    FLIGHT_TICKET: 'flight_ticket',
    HOTEL_BOOKING: 'hotel_booking',
    INSURANCE: 'insurance',
    /** The catch-all: train tickets, car rental, tours, medical letters, … */
    OTHER: 'other',
};
/** The order the type cards are drawn in on 23f, left→right, top→bottom. */
exports.DOCUMENT_TYPES = [
    exports.DOCUMENT_TYPE.IDENTITY,
    exports.DOCUMENT_TYPE.VISA,
    exports.DOCUMENT_TYPE.FLIGHT_TICKET,
    exports.DOCUMENT_TYPE.HOTEL_BOOKING,
    exports.DOCUMENT_TYPE.INSURANCE,
    exports.DOCUMENT_TYPE.OTHER,
];
exports.DOCUMENT_CATEGORY = {
    IDENTITY: 'identity',
    BOOKINGS: 'bookings',
    INSURANCE: 'insurance',
    OTHER: 'other',
};
/**
 * Category is DERIVED from the type, never chosen — 23f promises "We file it in
 * the right place automatically". Shared so the server and every client agree
 * on the filing; a second copy of this map would eventually disagree.
 */
exports.DOCUMENT_TYPE_CATEGORY = {
    [exports.DOCUMENT_TYPE.IDENTITY]: exports.DOCUMENT_CATEGORY.IDENTITY,
    [exports.DOCUMENT_TYPE.VISA]: exports.DOCUMENT_CATEGORY.IDENTITY,
    [exports.DOCUMENT_TYPE.FLIGHT_TICKET]: exports.DOCUMENT_CATEGORY.BOOKINGS,
    [exports.DOCUMENT_TYPE.HOTEL_BOOKING]: exports.DOCUMENT_CATEGORY.BOOKINGS,
    [exports.DOCUMENT_TYPE.INSURANCE]: exports.DOCUMENT_CATEGORY.INSURANCE,
    [exports.DOCUMENT_TYPE.OTHER]: exports.DOCUMENT_CATEGORY.OTHER,
};
/**
 * The filing rule, as a function.
 *
 * An unrecognised type files under OTHER, not IDENTITY: a value this build has
 * never heard of is by definition unclassified, and quietly filing it with
 * passports is the worse guess. This is the path an older app build takes when
 * the list grows.
 */
function documentCategoryOf(type) {
    return exports.DOCUMENT_TYPE_CATEGORY[type] ?? exports.DOCUMENT_CATEGORY.OTHER;
}
/**
 * How close to expiry a document reads as "Expiring" (23h: an amber badge and a
 * red subtitle at 22 days out). Derived on read from `expiresAt` — never stored,
 * or every row would need a nightly job to stay honest.
 */
exports.DOCUMENT_EXPIRING_DAYS = 30;
