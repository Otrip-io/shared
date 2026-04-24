export type MonthDay = string;
export declare const MONTH_DAY_REGEX: RegExp;
export declare function parseMonthDay(v: string | null | undefined): {
    month: number;
    day: number;
} | null;
export declare function isMonthDay(v: unknown): v is MonthDay;
export declare function toMonthDay(month: number, day: number): MonthDay | null;
export declare function daysInMonth(month: number): number;
export declare function formatMonthDay(v: string | null | undefined, locale?: string, style?: 'short' | 'long'): string;
export declare function formatMonthDayRange(start: string | null | undefined, end: string | null | undefined, locale?: string, style?: 'short' | 'long'): string;
export declare function todayMonthDay(): MonthDay;
export declare function dateToMonthDay(d: Date): MonthDay;
