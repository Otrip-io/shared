export const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income',
  TRANSFER: 'transfer',
} as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const EXPENSE_MODES = {
  PERSONAL: 'personal',
  GROUP: 'group',
} as const;

export type ExpenseMode = (typeof EXPENSE_MODES)[keyof typeof EXPENSE_MODES];

export const EXPENSE_CATEGORIES = {
  FOOD: 'food',
  /** Added 2026-07-25 with the new category picker. */
  GROCERIES: 'groceries',
  TRANSPORT: 'transport',
  ACCOMMODATION: 'accommodation',
  ACTIVITIES: 'activities',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  /**
   * Retired from the picker, KEPT in the enum: transactions already carry it, and
   * dropping the value would make every one of those rows fail validation on the
   * next edit (Work Rule 10). It still renders its own label and icon everywhere.
   */
  COMMUNICATION: 'communication',
  FEES: 'fees',
  OTHER: 'other',
} as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[keyof typeof EXPENSE_CATEGORIES];
