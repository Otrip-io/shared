export declare const TRANSACTION_TYPES: {
    readonly EXPENSE: "expense";
    readonly INCOME: "income";
    readonly TRANSFER: "transfer";
};
export type TransactionType = (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
export declare const EXPENSE_MODES: {
    readonly PERSONAL: "personal";
    readonly GROUP: "group";
};
export type ExpenseMode = (typeof EXPENSE_MODES)[keyof typeof EXPENSE_MODES];
export declare const EXPENSE_CATEGORIES: {
    readonly FOOD: "food";
    /** Added 2026-07-25 with the new category picker. */
    readonly GROCERIES: "groceries";
    readonly TRANSPORT: "transport";
    readonly ACCOMMODATION: "accommodation";
    readonly ACTIVITIES: "activities";
    readonly SHOPPING: "shopping";
    readonly HEALTH: "health";
    /**
     * Retired from the picker, KEPT in the enum: transactions already carry it, and
     * dropping the value would make every one of those rows fail validation on the
     * next edit (Work Rule 10). It still renders its own label and icon everywhere.
     */
    readonly COMMUNICATION: "communication";
    readonly FEES: "fees";
    readonly OTHER: "other";
};
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[keyof typeof EXPENSE_CATEGORIES];
