export type MonthDay = string;

export const MONTH_DAY_REGEX = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function parseMonthDay(v: string | null | undefined): { month: number; day: number } | null {
  if (!v || typeof v !== 'string') return null;
  const m = MONTH_DAY_REGEX.exec(v);
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const maxDay = new Date(Date.UTC(2000, month, 0)).getUTCDate();
  if (day > maxDay) return null;
  return { month, day };
}

export function isMonthDay(v: unknown): v is MonthDay {
  return typeof v === 'string' && parseMonthDay(v) !== null;
}

export function toMonthDay(month: number, day: number): MonthDay | null {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const v = `${mm}-${dd}`;
  return isMonthDay(v) ? v : null;
}

export function daysInMonth(month: number): number {
  if (month < 1 || month > 12) return 0;
  return new Date(Date.UTC(2000, month, 0)).getUTCDate();
}

export function formatMonthDay(
  v: string | null | undefined,
  locale = 'en',
  style: 'short' | 'long' = 'short',
): string {
  const p = parseMonthDay(v);
  if (!p) return '';
  const d = new Date(Date.UTC(2000, p.month - 1, p.day));
  return new Intl.DateTimeFormat(locale, {
    month: style,
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export function formatMonthDayRange(
  start: string | null | undefined,
  end: string | null | undefined,
  locale = 'en',
  style: 'short' | 'long' = 'short',
): string {
  const s = formatMonthDay(start, locale, style);
  const e = formatMonthDay(end, locale, style);
  if (!s && !e) return '';
  if (s && !e) return s;
  if (!s && e) return e;
  return `${s} – ${e}`;
}

export function todayMonthDay(): MonthDay {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function dateToMonthDay(d: Date): MonthDay {
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
