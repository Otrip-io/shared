/**
 * Club fund (Pro — the club ADMIN's plan unlocks it for the whole club). A
 * record of the club's money, never a payment processor: members say "I paid",
 * the treasurer confirms who holds it, spending and hand-overs are recorded,
 * and nothing is ever edited — a mistake gets a correcting entry.
 * Amounts travel in MINOR units (paisa, cents) as integers.
 */
/** The five types every club has; shown in each person's language, never removable. */
export declare const FUND_BUILTIN_TYPES: readonly ["dues", "joining", "event", "donation", "other"];
export type FundBuiltinType = (typeof FUND_BUILTIN_TYPES)[number];
export declare const MAX_FUND_CUSTOM_TYPES = 10;
export declare const FUND_TYPE_TITLE_MAX = 20;
/** How a payment was made. */
export declare const FUND_METHODS: readonly ["cash", "bank", "wallet", "card", "other"];
export type FundMethod = (typeof FUND_METHODS)[number];
/** Spending categories — the trip expense ones the Add spending board shows. */
export declare const FUND_SPEND_CATEGORIES: readonly ["food", "transport", "accommodation", "activities", "shopping", "health", "fees", "other"];
/** Dues. `once` = a single amount, no periods. */
export declare const FUND_CADENCES: readonly ["once", "monthly", "quarterly", "yearly"];
export type FundCadence = (typeof FUND_CADENCES)[number];
/** Due day 1–28 (every month has it) or the month's last day. */
export declare const FUND_DUE_DAY_LAST = "last";
export declare const FUND_DUE_DAY_MAX = 28;
/** Reminder offsets in days from the due day (negative = before). */
export declare const FUND_REMINDER_OFFSETS: readonly [-7, -3, -1, 0, 1, 7];
/** Club accounts (where members send money). */
export declare const FUND_ACCOUNT_KINDS: readonly ["bank", "wallet", "other"];
export declare const MAX_FUND_ACCOUNTS = 10;
export declare const FUND_ACCOUNT_NAME_MAX = 40;
export declare const FUND_ACCOUNT_DETAILS_MAX = 300;
/** A changed account stays flagged "Changed recently" for this long. */
export declare const FUND_ACCOUNT_CHANGED_DAYS = 14;
/** Who sees who paid what (the admin and the treasurers always do). */
export declare const FUND_PAYMENTS_VISIBLE_TO: readonly ["admin", "moderators", "all"];
export type FundPaymentsVisibleTo = (typeof FUND_PAYMENTS_VISIBLE_TO)[number];
export declare const FUND_REJECT_REASONS: readonly ["not_received", "wrong_amount", "already_paid", "other"];
export declare const FUND_NOTE_MAX = 200;
export declare const FUND_TITLE_MAX = 80;
/** One entry's ceiling in minor units (a typo guard, not a limit anyone meets). */
export declare const FUND_AMOUNT_MAX_MINOR = 100000000000;
export declare function currencyMinorUnits(currency: string): number;
