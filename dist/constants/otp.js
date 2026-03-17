"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_DAILY_LIMITS = exports.CHANGE_COOLDOWN_DAYS = exports.OTP_MAX_COOLDOWN_SECONDS = exports.OTP_BASE_COOLDOWN_SECONDS = exports.MAX_OTP_ATTEMPTS = exports.RESET_TOKEN_TTL_MINUTES = exports.OTP_TTL_MINUTES = exports.OTP_CONTEXTS = void 0;
exports.OTP_CONTEXTS = {
    REGISTER: 'register',
    LOGIN: 'login',
    FORGOT_PASSWORD: 'forgot_password',
    CHANGE_EMAIL: 'change_email',
    CHANGE_USERNAME: 'change_username',
    DELETE_ACCOUNT: 'delete_account',
};
exports.OTP_TTL_MINUTES = 5;
exports.RESET_TOKEN_TTL_MINUTES = 30;
exports.MAX_OTP_ATTEMPTS = 5;
exports.OTP_BASE_COOLDOWN_SECONDS = 60;
exports.OTP_MAX_COOLDOWN_SECONDS = 86400; // 24 hours
exports.CHANGE_COOLDOWN_DAYS = 15;
exports.OTP_DAILY_LIMITS = {
    register: 5,
    login: 10,
    forgot_password: 5,
    change_email: 3,
    change_username: 3,
    delete_account: 3,
};
