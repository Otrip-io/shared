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
    readonly TRANSPORT: "transport";
    readonly ACCOMMODATION: "accommodation";
    readonly ACTIVITIES: "activities";
    readonly SHOPPING: "shopping";
    readonly HEALTH: "health";
    readonly COMMUNICATION: "communication";
    readonly FEES: "fees";
    readonly OTHER: "other";
};
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[keyof typeof EXPENSE_CATEGORIES];
