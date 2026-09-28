import { EXPENSE_CATEGORIES } from './transactions';

/**
 * Club fund (Pro — the club ADMIN's plan unlocks it for the whole club). A
 * record of the club's money, never a payment processor: members say "I paid",
 * the treasurer confirms who holds it, spending and hand-overs are recorded,
 * and nothing is ever edited — a mistake gets a correcting entry.
 * Amounts travel in MINOR units (paisa, cents) as integers.
 */

/** The five types every club has; shown in each person's language, never removable. */
export const FUND_BUILTIN_TYPES = ['dues', 'joining', 'event', 'donation', 'other'] as const;
export type FundBuiltinType = (typeof FUND_BUILTIN_TYPES)[number];
export const MAX_FUND_CUSTOM_TYPES = 10;
export const FUND_TYPE_TITLE_MAX = 20;

/** How a payment was made. */
export const FUND_METHODS = ['cash', 'bank', 'wallet', 'card', 'other'] as const;
export type FundMethod = (typeof FUND_METHODS)[number];

/** Spending categories — the trip expense ones the Add spending board shows. */
export const FUND_SPEND_CATEGORIES = [
  EXPENSE_CATEGORIES.FOOD,
  EXPENSE_CATEGORIES.TRANSPORT,
  EXPENSE_CATEGORIES.ACCOMMODATION,
  EXPENSE_CATEGORIES.ACTIVITIES,
  EXPENSE_CATEGORIES.SHOPPING,
  EXPENSE_CATEGORIES.HEALTH,
  EXPENSE_CATEGORIES.FEES,
  EXPENSE_CATEGORIES.OTHER,
] as const;

/** Dues. `once` = a single amount, no periods. */
export const FUND_CADENCES = ['once', 'monthly', 'quarterly', 'yearly'] as const;
export type FundCadence = (typeof FUND_CADENCES)[number];
/** Due day 1–28 (every month has it) or the month's last day. */
export const FUND_DUE_DAY_LAST = 'last';
export const FUND_DUE_DAY_MAX = 28;
/** Reminder offsets in days from the due day (negative = before). */
export const FUND_REMINDER_OFFSETS = [-7, -3, -1, 0, 1, 7] as const;

/** Club accounts (where members send money). */
export const FUND_ACCOUNT_KINDS = ['bank', 'wallet', 'other'] as const;
export const MAX_FUND_ACCOUNTS = 10;
export const FUND_ACCOUNT_NAME_MAX = 40;
export const FUND_ACCOUNT_DETAILS_MAX = 300;
/** A changed account stays flagged "Changed recently" for this long. */
export const FUND_ACCOUNT_CHANGED_DAYS = 14;

/** Who sees who paid what (the admin and the treasurers always do). */
export const FUND_PAYMENTS_VISIBLE_TO = ['admin', 'moderators', 'all'] as const;
export type FundPaymentsVisibleTo = (typeof FUND_PAYMENTS_VISIBLE_TO)[number];

export const FUND_REJECT_REASONS = ['not_received', 'wrong_amount', 'already_paid', 'other'] as const;
export const FUND_NOTE_MAX = 200;
export const FUND_TITLE_MAX = 80;
/** One entry's ceiling in minor units (a typo guard, not a limit anyone meets). */
export const FUND_AMOUNT_MAX_MINOR = 1_000_000_000_00;

/**
 * Digits after the decimal point, ISO 4217. Two unless listed. Amounts are
 * stored as integers of the smallest unit, so this decides both entry and display.
 */
const MINOR_UNIT_EXCEPTIONS: Record<string, number> = {
  BHD: 3, IQD: 3, JOD: 3, KWD: 3, LYD: 3, OMR: 3, TND: 3,
  BIF: 0, CLP: 0, DJF: 0, GNF: 0, ISK: 0, JPY: 0, KMF: 0, KRW: 0, PYG: 0, RWF: 0,
  UGX: 0, UYI: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0,
};

export function currencyMinorUnits(currency: string): number {
  return MINOR_UNIT_EXCEPTIONS[currency.toUpperCase()] ?? 2;
}
