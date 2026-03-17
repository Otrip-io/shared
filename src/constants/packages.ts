export const ACTIVITY_CATEGORIES = [
  'attraction',
  'restaurant',
  'transport',
  'accommodation',
  'viewpoint',
  'shopping',
  'activity',
  'other',
] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];

export const PACKAGE_TYPES = {
  DAY_TRIP: 'day-trip',
  MULTI_DAY: 'multi-day',
} as const;

export type PackageType = (typeof PACKAGE_TYPES)[keyof typeof PACKAGE_TYPES];

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MODERATE: 'moderate',
  CHALLENGING: 'challenging',
  EXTREME: 'extreme',
} as const;

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[keyof typeof DIFFICULTY_LEVELS];

export const PACKAGE_CATEGORIES = [
  'tours', 'activities', 'attractions', 'day-trips', 'outdoor',
  'food-drink', 'wellness', 'culture', 'adventure', 'water-sports',
  'classes', 'transport',
] as const;

export type PackageCategory = (typeof PACKAGE_CATEGORIES)[number];

export const PRICING_TYPES = {
  PER_PERSON: 'per-person',
  PER_GROUP: 'per-group',
} as const;

export type PricingType = (typeof PRICING_TYPES)[keyof typeof PRICING_TYPES];

export const CANCELLATION_POLICIES = {
  FLEXIBLE: 'flexible',
  MODERATE: 'moderate',
  STRICT: 'strict',
} as const;

export type CancellationPolicy = (typeof CANCELLATION_POLICIES)[keyof typeof CANCELLATION_POLICIES];

export const PACKAGE_SORT_OPTIONS = {
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NEWEST: 'newest',
  RATING: 'rating',
  POPULAR: 'popular',
  BEST_MATCH: 'best_match',
} as const;

export type PackageSortOption = (typeof PACKAGE_SORT_OPTIONS)[keyof typeof PACKAGE_SORT_OPTIONS];

export const AVAILABLE_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export type AvailableDay = (typeof AVAILABLE_DAYS)[number];
