/**
 * Real places a community list would refuse in their own country — every
 * GeoNames city of 1,000+ people (171,137) checked with its country's lists,
 * 5 Oct 2026. A name allowed here passes as a whole name (all its words, in
 * order), so the word on its own stays blocked: "Coon Rapids" passes, "coon"
 * does not. Still refused, because the whole name IS the word: Nigg (GB),
 * Clit (RO), Reet (BE), Gouine (CI), Suar (IN), Bastardo (IT) — the Otrip
 * team can allow one in Community settings if it comes up.
 */
export declare const COMMUNITY_PLACES: readonly string[];
