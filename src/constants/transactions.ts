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
  TRANSPORT: 'transport',
  ACCOMMODATION: 'accommodation',
  ACTIVITIES: 'activities',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  COMMUNICATION: 'communication',
  FEES: 'fees',
  OTHER: 'other',
} as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[keyof typeof EXPENSE_CATEGORIES];
