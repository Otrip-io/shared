export declare const AUTH_ERRORS: {
    readonly EMAIL_EXISTS: {
        readonly code: "EMAIL_EXISTS";
        readonly message: "An account with this email already exists";
    };
    readonly INVALID_CREDENTIALS: {
        readonly code: "INVALID_CREDENTIALS";
        readonly message: "The email/username or password you entered is incorrect";
    };
    readonly ACCOUNT_SUSPENDED: {
        readonly code: "ACCOUNT_SUSPENDED";
        readonly message: "Account is suspended";
    };
    readonly ACCOUNT_DELETED: {
        readonly code: "ACCOUNT_DELETED";
        readonly message: "This account has been deleted";
    };
    readonly ACCOUNT_NOT_FOUND: {
        readonly code: "ACCOUNT_NOT_FOUND";
        readonly message: "No account found with this email or username";
    };
    readonly EMAIL_NOT_VERIFIED: {
        readonly code: "EMAIL_NOT_VERIFIED";
        readonly message: "Your email is not verified yet. We've sent a verification code to your email";
    };
    readonly EMAIL_ALREADY_VERIFIED: {
        readonly code: "EMAIL_ALREADY_VERIFIED";
        readonly message: "Your email is already verified";
    };
    readonly EMAIL_REQUIRED: {
        readonly code: "EMAIL_REQUIRED";
        readonly message: "Please provide your email address";
    };
    readonly SOCIAL_LOGIN_ONLY: {
        readonly code: "SOCIAL_LOGIN_ONLY";
        readonly message: "You signed up with social login. Please use your social account to sign in";
    };
    readonly SOCIAL_EMAIL_EXISTS: {
        readonly code: "SOCIAL_EMAIL_EXISTS";
        readonly message: "An account with this email already exists. Please sign in with your password";
    };
    readonly NOT_AUTHORIZED: {
        readonly code: "NOT_AUTHORIZED";
        readonly message: "You do not have permission to access this resource";
    };
    readonly EMAIL_SAME: {
        readonly code: "EMAIL_SAME";
        readonly message: "New email must be different from your current email";
    };
    readonly EMAIL_IN_USE: {
        readonly code: "EMAIL_IN_USE";
        readonly message: "This email is already in use by another account";
    };
    readonly EMAIL_SOCIAL_CHANGE: {
        readonly code: "EMAIL_SOCIAL_CHANGE";
        readonly message: "Email cannot be changed for social login accounts";
    };
    readonly EMAIL_CHANGE_COOLDOWN: {
        readonly code: "EMAIL_CHANGE_COOLDOWN";
        readonly message: "You can only change your email once every 15 days";
    };
    readonly USERNAME_SAME: {
        readonly code: "USERNAME_SAME";
        readonly message: "New username must be different from your current username";
    };
    readonly USERNAME_CHANGE_COOLDOWN: {
        readonly code: "USERNAME_CHANGE_COOLDOWN";
        readonly message: "You can only change your username once every 15 days";
    };
    readonly USERNAME_TAKEN: {
        readonly code: "USERNAME_TAKEN";
        readonly message: "This username is already taken";
    };
    readonly USERNAME_INVALID: {
        readonly code: "USERNAME_INVALID";
        readonly message: "Invalid username format";
    };
    readonly RESET_TOKEN_INVALID: {
        readonly code: "RESET_TOKEN_INVALID";
        readonly message: "This password reset link is invalid or has expired";
    };
    readonly RESET_TOKEN_EXPIRED: {
        readonly code: "RESET_TOKEN_EXPIRED";
        readonly message: "This password reset link has expired. Please request a new one";
    };
    readonly NO_PASSWORD_SET: {
        readonly code: "NO_PASSWORD_SET";
        readonly message: "Please set a password first";
    };
    readonly PASSWORD_ALREADY_SET: {
        readonly code: "PASSWORD_ALREADY_SET";
        readonly message: "Password is already set. Use change password instead";
    };
    readonly ACCOUNT_DEACTIVATED: {
        readonly code: "ACCOUNT_DEACTIVATED";
        readonly message: "Your account has been deactivated. A reactivation link has been sent to your email";
    };
    readonly REACTIVATION_TOKEN_INVALID: {
        readonly code: "REACTIVATION_TOKEN_INVALID";
        readonly message: "This reactivation link is invalid or has expired";
    };
    readonly SESSION_EXPIRED: {
        readonly code: "SESSION_EXPIRED";
        readonly message: "Your session has expired. Please sign in again";
    };
    readonly TOKEN_REUSE: {
        readonly code: "TOKEN_REUSE";
        readonly message: "Security alert: Suspicious activity detected. All devices have been signed out";
    };
};
