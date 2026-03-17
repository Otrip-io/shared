"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERNAME_MESSAGE = exports.USERNAME_REGEX = exports.PASSWORD_MESSAGE = exports.PASSWORD_REGEX = void 0;
exports.PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[\S]{8,64}$/;
exports.PASSWORD_MESSAGE = 'Password must contain uppercase, lowercase, number and special character';
exports.USERNAME_REGEX = /^(?=[a-z0-9._]{3,20}$)(?!.*[._]{2})[a-z0-9][a-z0-9._]*[a-z0-9_]$/;
exports.USERNAME_MESSAGE = 'Username must be 3-20 characters: lowercase letters, numbers, dots, underscores. No consecutive dots/underscores';
