export const ADMIN_FEATURES = {
  USERS: 'users',
  CONTENT: 'content',
  OPERATIONS: 'operations',
  SYSTEM: 'system',
} as const;

export type AdminFeature = (typeof ADMIN_FEATURES)[keyof typeof ADMIN_FEATURES];

export const ADMIN_FEATURE_VALUES = Object.values(ADMIN_FEATURES);
