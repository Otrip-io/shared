export declare const CREATOR_TYPES: {
    readonly INDIVIDUAL: "individual";
    readonly GUIDE: "guide";
    readonly AGENCY: "agency";
};
export type CreatorType = (typeof CREATOR_TYPES)[keyof typeof CREATOR_TYPES];
export declare const VERIFICATION_STATUS: {
    readonly NONE: "none";
    readonly PENDING: "pending";
    readonly VERIFIED: "verified";
    readonly REJECTED: "rejected";
};
export type VerificationStatus = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];
export declare const USER_ACCOUNT_STATUS: {
    readonly ACTIVE: "active";
    readonly SUSPENDED: "suspended";
    readonly DELETED: "deleted";
};
export type UserAccountStatus = (typeof USER_ACCOUNT_STATUS)[keyof typeof USER_ACCOUNT_STATUS];
export declare const SOCIAL_PROVIDERS: {
    readonly GOOGLE: "google";
    readonly APPLE: "apple";
};
export type SocialProvider = (typeof SOCIAL_PROVIDERS)[keyof typeof SOCIAL_PROVIDERS];
