"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABLE_DAYS = exports.PACKAGE_SORT_OPTIONS = exports.CANCELLATION_POLICIES = exports.PRICING_TYPES = exports.PACKAGE_CATEGORIES = exports.DIFFICULTY_LEVELS = exports.PACKAGE_TYPES = exports.ACTIVITY_CATEGORIES = void 0;
exports.ACTIVITY_CATEGORIES = [
    'attraction',
    'restaurant',
    'transport',
    'accommodation',
    'viewpoint',
    'shopping',
    'activity',
    'other',
];
exports.PACKAGE_TYPES = {
    DAY_TRIP: 'day-trip',
    MULTI_DAY: 'multi-day',
};
exports.DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MODERATE: 'moderate',
    CHALLENGING: 'challenging',
    EXTREME: 'extreme',
};
exports.PACKAGE_CATEGORIES = [
    'tours', 'activities', 'attractions', 'day-trips', 'outdoor',
    'food-drink', 'wellness', 'culture', 'adventure', 'water-sports',
    'classes', 'transport',
];
exports.PRICING_TYPES = {
    PER_PERSON: 'per-person',
    PER_GROUP: 'per-group',
};
exports.CANCELLATION_POLICIES = {
    FLEXIBLE: 'flexible',
    MODERATE: 'moderate',
    STRICT: 'strict',
};
exports.PACKAGE_SORT_OPTIONS = {
    PRICE_ASC: 'price_asc',
    PRICE_DESC: 'price_desc',
    NEWEST: 'newest',
    RATING: 'rating',
    POPULAR: 'popular',
    BEST_MATCH: 'best_match',
};
exports.AVAILABLE_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
