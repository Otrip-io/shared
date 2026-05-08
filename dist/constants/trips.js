"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_TRIP_MEMBERS = exports.TRIP_MEMBER_ROLES = exports.TRIP_STATUS = exports.TRIP_VISIBILITY = void 0;
exports.getTripStatus = getTripStatus;
exports.TRIP_VISIBILITY = {
    PUBLIC: 'public',
    PRIVATE: 'private',
};
exports.TRIP_STATUS = {
    PLANNING: 'planning',
    ACTIVE: 'active',
    COMPLETED: 'completed',
};
exports.TRIP_MEMBER_ROLES = {
    ADMIN: 'admin',
    VIEWER: 'viewer',
};
exports.MAX_TRIP_MEMBERS = 50;
function getTripStatus(startDate, endDate) {
    if (!startDate || !endDate)
        return exports.TRIP_STATUS.PLANNING;
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    if (start > now)
        return exports.TRIP_STATUS.PLANNING;
    if (end >= now)
        return exports.TRIP_STATUS.ACTIVE;
    return exports.TRIP_STATUS.COMPLETED;
}
