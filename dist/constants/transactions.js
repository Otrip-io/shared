"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPENSE_CATEGORIES = exports.EXPENSE_MODES = exports.TRANSACTION_TYPES = void 0;
exports.TRANSACTION_TYPES = {
    EXPENSE: 'expense',
    INCOME: 'income',
    TRANSFER: 'transfer',
};
exports.EXPENSE_MODES = {
    PERSONAL: 'personal',
    GROUP: 'group',
};
exports.EXPENSE_CATEGORIES = {
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
};
