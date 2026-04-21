export declare const TRIP_ERRORS: {
    readonly REGENERATE_AI_PLAN_LOCKED: {
        readonly code: "REGENERATE_AI_PLAN_LOCKED";
        readonly message: "Upgrade to Pro to regenerate an AI plan for this trip.";
    };
    readonly TRIP_DATE_UPDATE_WOULD_ORPHAN_DAYS: {
        readonly code: "TRIP_DATE_UPDATE_WOULD_ORPHAN_DAYS";
        readonly message: "Trip dates cannot be narrowed — the following day(s) would fall outside the range. Delete them first.";
    };
    readonly ADD_DAY_ALL_DATES_FILLED: {
        readonly code: "ADD_DAY_ALL_DATES_FILLED";
        readonly message: "All trip dates already have a day.";
    };
    readonly ADD_DAY_DATE_OUT_OF_RANGE: {
        readonly code: "ADD_DAY_DATE_OUT_OF_RANGE";
        readonly message: "The selected date is outside the trip's date range.";
    };
    readonly ADD_DAY_DATE_TAKEN: {
        readonly code: "ADD_DAY_DATE_TAKEN";
        readonly message: "A day already exists for this date.";
    };
};
