"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUND_AMOUNT_MAX_MINOR = exports.FUND_TITLE_MAX = exports.FUND_NOTE_MAX = exports.FUND_REJECT_REASONS = exports.FUND_PAYMENTS_VISIBLE_TO = exports.FUND_ACCOUNT_CHANGED_DAYS = exports.FUND_ACCOUNT_DETAILS_MAX = exports.FUND_ACCOUNT_NAME_MAX = exports.MAX_FUND_ACCOUNTS = exports.FUND_ACCOUNT_KINDS = exports.FUND_REMINDER_OFFSETS = exports.FUND_DUE_DAY_MAX = exports.FUND_DUE_DAY_LAST = exports.FUND_CADENCES = exports.FUND_SPEND_CATEGORIES = exports.FUND_METHODS = exports.FUND_TYPE_TITLE_MAX = exports.MAX_FUND_CUSTOM_TYPES = exports.FUND_BUILTIN_TYPES = void 0;
exports.currencyMinorUnits = currencyMinorUnits;
const transactions_1 = require("./transactions");
/**
 * Club fund (Pro — the club ADMIN's plan unlocks it for the whole club). A
 * record of the club's money, never a payment processor: members say "I paid",
 * the treasurer confirms who holds it, spending and hand-overs are recorded,
 * and nothing is ever edited — a mistake gets a correcting entry.
 * Amounts travel in MINOR units (paisa, cents) as integers.
 */
/** The five types every club has; shown in each person's language, never removable. */
exports.FUND_BUILTIN_TYPES = ['dues', 'joining', 'event', 'donation', 'other'];
exports.MAX_FUND_CUSTOM_TYPES = 10;
exports.FUND_TYPE_TITLE_MAX = 20;
/** How a payment was made. */
exports.FUND_METHODS = ['cash', 'bank', 'wallet', 'card', 'other'];
/** Spending categories — the trip expense ones the Add spending board shows. */
exports.FUND_SPEND_CATEGORIES = [
    transactions_1.EXPENSE_CATEGORIES.FOOD,
    transactions_1.EXPENSE_CATEGORIES.TRANSPORT,
    transactions_1.EXPENSE_CATEGORIES.ACCOMMODATION,
    transactions_1.EXPENSE_CATEGORIES.ACTIVITIES,
    transactions_1.EXPENSE_CATEGORIES.SHOPPING,
    transactions_1.EXPENSE_CATEGORIES.HEALTH,
    transactions_1.EXPENSE_CATEGORIES.FEES,
    transactions_1.EXPENSE_CATEGORIES.OTHER,
];
/** Dues. `once` = a single amount, no periods. */
exports.FUND_CADENCES = ['once', 'monthly', 'quarterly', 'yearly'];
/** Due day 1–28 (every month has it) or the month's last day. */
exports.FUND_DUE_DAY_LAST = 'last';
exports.FUND_DUE_DAY_MAX = 28;
/** Reminder offsets in days from the due day (negative = before). */
exports.FUND_REMINDER_OFFSETS = [-7, -3, -1, 0, 1, 7];
/** Club accounts (where members send money). */
exports.FUND_ACCOUNT_KINDS = ['bank', 'wallet', 'other'];
exports.MAX_FUND_ACCOUNTS = 10;
exports.FUND_ACCOUNT_NAME_MAX = 40;
exports.FUND_ACCOUNT_DETAILS_MAX = 300;
/** A changed account stays flagged "Changed recently" for this long. */
exports.FUND_ACCOUNT_CHANGED_DAYS = 14;
/** Who sees who paid what (the admin and the treasurers always do). */
exports.FUND_PAYMENTS_VISIBLE_TO = ['admin', 'moderators', 'all'];
exports.FUND_REJECT_REASONS = ['not_received', 'wrong_amount', 'already_paid', 'other'];
exports.FUND_NOTE_MAX = 200;
exports.FUND_TITLE_MAX = 80;
/** One entry's ceiling in minor units (a typo guard, not a limit anyone meets). */
exports.FUND_AMOUNT_MAX_MINOR = 1_000_000_000_00;
/**
 * Digits after the decimal point, ISO 4217. Two unless listed. Amounts are
 * stored as integers of the smallest unit, so this decides both entry and display.
 */
const MINOR_UNIT_EXCEPTIONS = {
    BHD: 3, IQD: 3, JOD: 3, KWD: 3, LYD: 3, OMR: 3, TND: 3,
    BIF: 0, CLP: 0, DJF: 0, GNF: 0, ISK: 0, JPY: 0, KMF: 0, KRW: 0, PYG: 0, RWF: 0,
    UGX: 0, UYI: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0,
};
function currencyMinorUnits(currency) {
    return MINOR_UNIT_EXCEPTIONS[currency.toUpperCase()] ?? 2;
}
