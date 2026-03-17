export const CREATOR_TYPES = {
  INDIVIDUAL: 'individual',
  GUIDE: 'guide',
  AGENCY: 'agency',
} as const;

export type CreatorType = (typeof CREATOR_TYPES)[keyof typeof CREATOR_TYPES];

export const VERIFICATION_STATUS = {
  NONE: 'none',
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

export type VerificationStatus = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];

export const USER_ACCOUNT_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;

export type UserAccountStatus = (typeof USER_ACCOUNT_STATUS)[keyof typeof USER_ACCOUNT_STATUS];

export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  APPLE: 'apple',
} as const;

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[keyof typeof SOCIAL_PROVIDERS];
