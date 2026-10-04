/**
 * Real place names the English list would refuse only because a flagged word
 * sits INSIDE them ("anal" in Kodaikanal, "slut" in Slutsk). Generated from
 * the 172,935 GeoNames cities on 4 Oct 2026; a place whose whole name IS a
 * flagged word stays blocked. Multi-word names ("rio negro", "pok fu lam") are allowed as whole
 * phrases, so the bare word stays blocked. Content.ts allows these as whole terms.
 */
export declare const PLACE_ALLOW: readonly string[];
