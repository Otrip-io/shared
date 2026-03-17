export declare const ROLES: {
    readonly ADMIN: "admin";
    readonly USER: "user";
    readonly MODERATOR: "moderator";
};
export type Role = (typeof ROLES)[keyof typeof ROLES];
