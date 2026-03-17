"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_TRIP_MEMBERS = exports.TRIP_MEMBER_ROLES = exports.TRIP_STATUS = exports.TRIP_VISIBILITY = void 0;
exports.TRIP_VISIBILITY = {
    PUBLIC: 'public',
    PRIVATE: 'private',
};
exports.TRIP_STATUS = {
    PLANNING: 'planning',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};
exports.TRIP_MEMBER_ROLES = {
    ADMIN: 'admin',
    VIEWER: 'viewer',
};
exports.MAX_TRIP_MEMBERS = 50;
