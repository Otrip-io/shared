"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRIP_ERRORS = void 0;
exports.TRIP_ERRORS = {
    REGENERATE_AI_PLAN_LOCKED: {
        code: 'REGENERATE_AI_PLAN_LOCKED',
        message: 'Upgrade to Pro to regenerate an AI plan for this trip.',
    },
    TRIP_DATE_UPDATE_WOULD_ORPHAN_DAYS: {
        code: 'TRIP_DATE_UPDATE_WOULD_ORPHAN_DAYS',
        message: 'Trip dates cannot be narrowed — the following day(s) would fall outside the range. Delete them first.',
    },
    ADD_DAY_ALL_DATES_FILLED: {
        code: 'ADD_DAY_ALL_DATES_FILLED',
        message: 'All trip dates already have a day.',
    },
    ADD_DAY_DATE_OUT_OF_RANGE: {
        code: 'ADD_DAY_DATE_OUT_OF_RANGE',
        message: "The selected date is outside the trip's date range.",
    },
    ADD_DAY_DATE_TAKEN: {
        code: 'ADD_DAY_DATE_TAKEN',
        message: 'A day already exists for this date.',
    },
};
