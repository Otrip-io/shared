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
export declare const DOCUMENT_TYPE: {
    /** Passport, national ID card, driving licence — "my ID". */
    readonly IDENTITY: "identity";
    readonly VISA: "visa";
    readonly TRANSPORT: "transport";
    readonly STAYS: "stays";
    readonly INSURANCE: "insurance";
    /** The catch-all: tours, medical letters, misc reservations, … */
    readonly OTHER: "other";
};
export type DocumentType = (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
/** The order the type cards are drawn in on 23f, left→right, top→bottom. */
export declare const DOCUMENT_TYPES: readonly DocumentType[];
export declare const DOCUMENT_CATEGORY: {
    readonly IDENTITY: "identity";
    readonly TRANSPORT: "transport";
    readonly STAYS: "stays";
    readonly INSURANCE: "insurance";
    readonly OTHER: "other";
};
export type DocumentCategory = (typeof DOCUMENT_CATEGORY)[keyof typeof DOCUMENT_CATEGORY];
/**
 * Category is DERIVED from the type, never chosen — 23f promises "We file it in
 * the right place automatically". Shared so the server and every client agree
 * on the filing; a second copy of this map would eventually disagree.
 */
export declare const DOCUMENT_TYPE_CATEGORY: Readonly<Record<DocumentType, DocumentCategory>>;
/**
 * The filing rule, as a function.
 *
 * An unrecognised type files under OTHER, not IDENTITY: a value this build has
 * never heard of is by definition unclassified, and quietly filing it with
 * passports is the worse guess. This is the path an older app build takes when
 * the list grows.
 */
export declare function documentCategoryOf(type: string): DocumentCategory;
/**
 * How close to expiry a document reads as "Expiring" (23h: an amber badge and a
 * red subtitle at 22 days out). Derived on read from `expiresAt` — never stored,
 * or every row would need a nightly job to stay honest.
 */
export declare const DOCUMENT_EXPIRING_DAYS = 30;
