"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONTH_DAY_REGEX = void 0;
exports.parseMonthDay = parseMonthDay;
exports.isMonthDay = isMonthDay;
exports.toMonthDay = toMonthDay;
exports.daysInMonth = daysInMonth;
exports.formatMonthDay = formatMonthDay;
exports.formatMonthDayRange = formatMonthDayRange;
exports.todayMonthDay = todayMonthDay;
exports.dateToMonthDay = dateToMonthDay;
exports.MONTH_DAY_REGEX = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
function parseMonthDay(v) {
    if (!v || typeof v !== 'string')
        return null;
    const m = exports.MONTH_DAY_REGEX.exec(v);
    if (!m)
        return null;
    const month = Number(m[1]);
    const day = Number(m[2]);
    const maxDay = new Date(Date.UTC(2000, month, 0)).getUTCDate();
    if (day > maxDay)
        return null;
    return { month, day };
}
function isMonthDay(v) {
    return typeof v === 'string' && parseMonthDay(v) !== null;
}
function toMonthDay(month, day) {
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const v = `${mm}-${dd}`;
    return isMonthDay(v) ? v : null;
}
function daysInMonth(month) {
    if (month < 1 || month > 12)
        return 0;
    return new Date(Date.UTC(2000, month, 0)).getUTCDate();
}
function formatMonthDay(v, locale = 'en', style = 'short') {
    const p = parseMonthDay(v);
    if (!p)
        return '';
    const d = new Date(Date.UTC(2000, p.month - 1, p.day));
    return new Intl.DateTimeFormat(locale, {
        month: style,
        day: 'numeric',
        timeZone: 'UTC',
    }).format(d);
}
function formatMonthDayRange(start, end, locale = 'en', style = 'short') {
    const s = formatMonthDay(start, locale, style);
    const e = formatMonthDay(end, locale, style);
    if (!s && !e)
        return '';
    if (s && !e)
        return s;
    if (!s && e)
        return e;
    return `${s} – ${e}`;
}
function todayMonthDay() {
    const d = new Date();
    return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function dateToMonthDay(d) {
    return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
