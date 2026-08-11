"use strict";
/**
 * The personal document vault (designs 23f / 23h).
 *
 * A document belongs to a USER, not to a trip — `tripId` is an optional link
 * ("Attach to trip · optional"). That is why this lives beside TRIP_TYPE rather
 * than inside it: a passport is not a trip.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCUMENT_EXPIRING_DAYS = exports.DOCUMENT_TYPE_CATEGORY = exports.DOCUMENT_CATEGORY = exports.DOCUMENT_TYPES = exports.DOCUMENT_TYPE = void 0;
exports.documentCategoryOf = documentCategoryOf;
exports.DOCUMENT_TYPE = {
    PASSPORT: 'passport',
    VISA: 'visa',
    FLIGHT_TICKET: 'flight_ticket',
    HOTEL_BOOKING: 'hotel_booking',
    INSURANCE: 'insurance',
    VACCINATION: 'vaccination',
    ID_CARD: 'id_card',
    DRIVERS_LICENSE: 'drivers_license',
};
/** The order the 8 type cards are drawn in on 23f, left→right, top→bottom. */
exports.DOCUMENT_TYPES = [
    exports.DOCUMENT_TYPE.PASSPORT,
    exports.DOCUMENT_TYPE.VISA,
    exports.DOCUMENT_TYPE.FLIGHT_TICKET,
    exports.DOCUMENT_TYPE.HOTEL_BOOKING,
    exports.DOCUMENT_TYPE.INSURANCE,
    exports.DOCUMENT_TYPE.VACCINATION,
    exports.DOCUMENT_TYPE.ID_CARD,
    exports.DOCUMENT_TYPE.DRIVERS_LICENSE,
];
exports.DOCUMENT_CATEGORY = {
    IDENTITY: 'identity',
    BOOKINGS: 'bookings',
    INSURANCE: 'insurance',
    HEALTH: 'health',
};
/**
 * Category is DERIVED from the type, never chosen — 23f promises "We file it in
 * the right place automatically". Shared so the server and every client agree
 * on the filing; a second copy of this map would eventually disagree.
 */
exports.DOCUMENT_TYPE_CATEGORY = {
    [exports.DOCUMENT_TYPE.PASSPORT]: exports.DOCUMENT_CATEGORY.IDENTITY,
    [exports.DOCUMENT_TYPE.VISA]: exports.DOCUMENT_CATEGORY.IDENTITY,
    [exports.DOCUMENT_TYPE.ID_CARD]: exports.DOCUMENT_CATEGORY.IDENTITY,
    [exports.DOCUMENT_TYPE.DRIVERS_LICENSE]: exports.DOCUMENT_CATEGORY.IDENTITY,
    [exports.DOCUMENT_TYPE.FLIGHT_TICKET]: exports.DOCUMENT_CATEGORY.BOOKINGS,
    [exports.DOCUMENT_TYPE.HOTEL_BOOKING]: exports.DOCUMENT_CATEGORY.BOOKINGS,
    [exports.DOCUMENT_TYPE.INSURANCE]: exports.DOCUMENT_CATEGORY.INSURANCE,
    [exports.DOCUMENT_TYPE.VACCINATION]: exports.DOCUMENT_CATEGORY.HEALTH,
};
/** The filing rule, as a function. Unknown types file under Identity. */
function documentCategoryOf(type) {
    return exports.DOCUMENT_TYPE_CATEGORY[type] ?? exports.DOCUMENT_CATEGORY.IDENTITY;
}
/**
 * How close to expiry a document reads as "Expiring" (23h: an amber badge and a
 * red subtitle at 22 days out). Derived on read from `expiresAt` — never stored,
 * or every row would need a nightly job to stay honest.
 */
exports.DOCUMENT_EXPIRING_DAYS = 30;
