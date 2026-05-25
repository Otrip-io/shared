export declare const OTP_CONTEXTS: {
    readonly REGISTER: "register";
    readonly FORGOT_PASSWORD: "forgot_password";
    readonly CHANGE_EMAIL: "change_email";
    readonly CHANGE_USERNAME: "change_username";
    readonly DELETE_ACCOUNT: "delete_account";
    readonly RECOVERY_EMAIL: "recovery_email";
};
export type OtpContext = (typeof OTP_CONTEXTS)[keyof typeof OTP_CONTEXTS];
export declare const OTP_TTL_MINUTES = 5;
export declare const RESET_TOKEN_TTL_MINUTES = 30;
export declare const MAX_OTP_ATTEMPTS = 5;
export declare const OTP_BASE_COOLDOWN_SECONDS = 60;
export declare const OTP_MAX_COOLDOWN_SECONDS = 86400;
export declare const CHANGE_COOLDOWN_DAYS = 15;
export declare const OTP_DAILY_LIMITS: Record<string, number>;
