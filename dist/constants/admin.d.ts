export declare const ADMIN_FEATURES: {
    readonly USERS: "users";
    readonly CONTENT: "content";
    readonly OPERATIONS: "operations";
    readonly SYSTEM: "system";
    readonly SOCIAL_MEDIA: "social_media";
};
export type AdminFeature = (typeof ADMIN_FEATURES)[keyof typeof ADMIN_FEATURES];
export declare const ADMIN_FEATURE_VALUES: ("system" | "users" | "content" | "operations" | "social_media")[];
