export declare const ACTIVITY_CATEGORIES: readonly ["attraction", "restaurant", "transport", "accommodation", "viewpoint", "shopping", "activity", "other"];
export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];
export declare const PACKAGE_TYPES: {
    readonly DAY_TRIP: "day-trip";
    readonly MULTI_DAY: "multi-day";
};
export type PackageType = (typeof PACKAGE_TYPES)[keyof typeof PACKAGE_TYPES];
export declare const DIFFICULTY_LEVELS: {
    readonly EASY: "easy";
    readonly MODERATE: "moderate";
    readonly CHALLENGING: "challenging";
    readonly EXTREME: "extreme";
};
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[keyof typeof DIFFICULTY_LEVELS];
export declare const PACKAGE_CATEGORIES: readonly ["tours", "activities", "attractions", "day-trips", "outdoor", "food-drink", "wellness", "culture", "adventure", "water-sports", "classes", "transport"];
export type PackageCategory = (typeof PACKAGE_CATEGORIES)[number];
export declare const PRICING_TYPES: {
    readonly PER_PERSON: "per-person";
    readonly PER_GROUP: "per-group";
};
export type PricingType = (typeof PRICING_TYPES)[keyof typeof PRICING_TYPES];
export declare const CANCELLATION_POLICIES: {
    readonly FLEXIBLE: "flexible";
    readonly MODERATE: "moderate";
    readonly STRICT: "strict";
};
export type CancellationPolicy = (typeof CANCELLATION_POLICIES)[keyof typeof CANCELLATION_POLICIES];
export declare const PACKAGE_SORT_OPTIONS: {
    readonly PRICE_ASC: "price_asc";
    readonly PRICE_DESC: "price_desc";
    readonly NEWEST: "newest";
    readonly RATING: "rating";
    readonly POPULAR: "popular";
    readonly BEST_MATCH: "best_match";
};
export type PackageSortOption = (typeof PACKAGE_SORT_OPTIONS)[keyof typeof PACKAGE_SORT_OPTIONS];
export declare const AVAILABLE_DAYS: readonly ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export type AvailableDay = (typeof AVAILABLE_DAYS)[number];
