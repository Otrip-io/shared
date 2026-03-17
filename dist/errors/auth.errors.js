"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ERRORS = void 0;
exports.AUTH_ERRORS = {
    EMAIL_EXISTS: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists' },
    INVALID_CREDENTIALS: { code: 'INVALID_CREDENTIALS', message: 'The email/username or password you entered is incorrect' },
    ACCOUNT_SUSPENDED: { code: 'ACCOUNT_SUSPENDED', message: 'Account is suspended' },
    ACCOUNT_DELETED: { code: 'ACCOUNT_DELETED', message: 'This account has been deleted' },
    ACCOUNT_NOT_FOUND: { code: 'ACCOUNT_NOT_FOUND', message: 'No account found with this email or username' },
    EMAIL_NOT_VERIFIED: { code: 'EMAIL_NOT_VERIFIED', message: "Your email is not verified yet. We've sent a verification code to your email" },
    EMAIL_ALREADY_VERIFIED: { code: 'EMAIL_ALREADY_VERIFIED', message: 'Your email is already verified' },
    EMAIL_REQUIRED: { code: 'EMAIL_REQUIRED', message: 'Please provide your email address' },
    SOCIAL_LOGIN_ONLY: { code: 'SOCIAL_LOGIN_ONLY', message: 'You signed up with social login. Please use your social account to sign in' },
    SOCIAL_EMAIL_EXISTS: { code: 'SOCIAL_EMAIL_EXISTS', message: 'An account with this email already exists. Please sign in with your password' },
    NOT_AUTHORIZED: { code: 'NOT_AUTHORIZED', message: 'You do not have permission to access this resource' },
    // Email/Username change
    EMAIL_SAME: { code: 'EMAIL_SAME', message: 'New email must be different from your current email' },
    EMAIL_IN_USE: { code: 'EMAIL_IN_USE', message: 'This email is already in use by another account' },
    EMAIL_SOCIAL_CHANGE: { code: 'EMAIL_SOCIAL_CHANGE', message: 'Email cannot be changed for social login accounts' },
    EMAIL_CHANGE_COOLDOWN: { code: 'EMAIL_CHANGE_COOLDOWN', message: 'You can only change your email once every 15 days' },
    USERNAME_SAME: { code: 'USERNAME_SAME', message: 'New username must be different from your current username' },
    USERNAME_CHANGE_COOLDOWN: { code: 'USERNAME_CHANGE_COOLDOWN', message: 'You can only change your username once every 15 days' },
    USERNAME_TAKEN: { code: 'USERNAME_TAKEN', message: 'This username is already taken' },
    USERNAME_INVALID: { code: 'USERNAME_INVALID', message: 'Invalid username format' },
    // Password
    RESET_TOKEN_INVALID: { code: 'RESET_TOKEN_INVALID', message: 'This password reset link is invalid or has expired' },
    RESET_TOKEN_EXPIRED: { code: 'RESET_TOKEN_EXPIRED', message: 'This password reset link has expired. Please request a new one' },
    NO_PASSWORD_SET: { code: 'NO_PASSWORD_SET', message: 'Please set a password first' },
    PASSWORD_ALREADY_SET: { code: 'PASSWORD_ALREADY_SET', message: 'Password is already set. Use change password instead' },
    // Account reactivation
    ACCOUNT_DEACTIVATED: { code: 'ACCOUNT_DEACTIVATED', message: 'Your account has been deactivated. A reactivation link has been sent to your email' },
    REACTIVATION_TOKEN_INVALID: { code: 'REACTIVATION_TOKEN_INVALID', message: 'This reactivation link is invalid or has expired' },
    // Token/Session
    SESSION_EXPIRED: { code: 'SESSION_EXPIRED', message: 'Your session has expired. Please sign in again' },
    TOKEN_REUSE: { code: 'TOKEN_REUSE', message: 'Security alert: Suspicious activity detected. All devices have been signed out' },
};
