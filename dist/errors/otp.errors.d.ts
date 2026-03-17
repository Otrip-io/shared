export declare const OTP_ERRORS: {
    readonly OTP_EXPIRED: {
        readonly code: "OTP_EXPIRED";
        readonly message: "This verification code has expired. Please request a new one";
    };
    readonly OTP_INVALID: {
        readonly code: "OTP_INVALID";
        readonly message: "Incorrect verification code";
    };
    readonly OTP_MAX_ATTEMPTS: {
        readonly code: "OTP_MAX_ATTEMPTS";
        readonly message: "Too many incorrect attempts. Please request a new verification code";
    };
    readonly OTP_NOT_FOUND: {
        readonly code: "OTP_NOT_FOUND";
        readonly message: "No verification code was sent to this email. Please request a new one";
    };
    readonly OTP_RATE_LIMITED: {
        readonly code: "OTP_RATE_LIMITED";
        readonly message: "Please wait before requesting another code";
    };
    readonly OTP_DAILY_LIMIT: {
        readonly code: "OTP_DAILY_LIMIT";
        readonly message: "You've reached the daily limit for verification codes. Please try again tomorrow";
    };
    readonly OTP_BLOCKED: {
        readonly code: "OTP_BLOCKED";
        readonly message: "Too many attempts. Please try again later";
    };
};
