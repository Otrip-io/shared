"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_ERRORS = void 0;
exports.OTP_ERRORS = {
    OTP_EXPIRED: { code: 'OTP_EXPIRED', message: 'This verification code has expired. Please request a new one' },
    OTP_INVALID: { code: 'OTP_INVALID', message: 'Incorrect verification code' },
    OTP_MAX_ATTEMPTS: { code: 'OTP_MAX_ATTEMPTS', message: 'Too many incorrect attempts. Please request a new verification code' },
    OTP_NOT_FOUND: { code: 'OTP_NOT_FOUND', message: 'No verification code was sent to this email. Please request a new one' },
    OTP_RATE_LIMITED: { code: 'OTP_RATE_LIMITED', message: 'Please wait before requesting another code' },
    OTP_DAILY_LIMIT: { code: 'OTP_DAILY_LIMIT', message: "You've reached the daily limit for verification codes. Please try again tomorrow" },
    OTP_BLOCKED: { code: 'OTP_BLOCKED', message: 'Too many attempts. Please try again later' },
};
