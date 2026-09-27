/**
 * Event checks shared by the phone (as the admin types, offline included) and
 * the server (the authority — it re-runs them on every write). Parsed by
 * hand, not with `URL`, because React Native's URL is incomplete.
 */
import {
  DEFAULT_EVENT_PREFS,
  EVENT_ONLINE_URL_MAX,
  EVENT_REMINDER_MINUTES,
  MAX_EVENT_REMINDERS,
  type EventPrefs,
} from '../constants/events'
import { normalizeClubLink } from './club-links'

/**
 * - `invalid` — not a full https:// link we can read
 * - `shortener` — bit.ly and friends hide where they go
 * - `too_long` — over EVENT_ONLINE_URL_MAX
 */
export type MeetingLinkProblem = 'invalid' | 'shortener' | 'too_long'
export type MeetingLinkResult = { ok: true; url: string | null } | { ok: false; problem: MeetingLinkProblem }

/**
 * An online event's meeting link: https only, any platform, no link
 * shorteners. The host goes through the club-link check, so the shortener
 * list and host rules are the ones a club's website uses. Empty = no link
 * yet ("Link coming soon") → `{ ok: true, url: null }`.
 */
export function normalizeMeetingLink(value: string | null | undefined): MeetingLinkResult {
  const raw = (value ?? '').trim()
  if (!raw) return { ok: true, url: null }
  if (raw.length > EVENT_ONLINE_URL_MAX) return { ok: false, problem: 'too_long' }
  const m = /^https:\/\/([^/?#\s]+)([/?#]\S*)?$/i.exec(raw)
  if (!m) return { ok: false, problem: 'invalid' }
  const host = m[1].toLowerCase()
  const probe = normalizeClubLink('website', `https://${host}`)
  if (!probe.ok) return { ok: false, problem: probe.problem === 'shortener' ? 'shortener' : 'invalid' }
  return { ok: true, url: `https://${host}${m[2] ?? ''}` }
}

const ALLOWED_REMINDERS = new Set<number>(EVENT_REMINDER_MINUTES)

/**
 * A reminder list as a person may set it: whole minutes from the allowed
 * set, no repeats, at most two. Returns null when the value is not one.
 */
export function parseReminderMinutes(value: unknown): number[] | null {
  if (!Array.isArray(value) || value.length > MAX_EVENT_REMINDERS) return null
  const out: number[] = []
  for (const v of value) {
    if (typeof v !== 'number' || !ALLOWED_REMINDERS.has(v) || out.includes(v)) return null
    out.push(v)
  }
  return out
}

/** Stored prefs with every missing or malformed key filled from the defaults (missing = "never set"). */
export function resolveEventPrefs(stored: Partial<EventPrefs> | null | undefined): EventPrefs {
  const inPerson = parseReminderMinutes(stored?.inPerson)
  const online = parseReminderMinutes(stored?.online)
  return {
    inPerson: inPerson ?? [...DEFAULT_EVENT_PREFS.inPerson],
    online: online ?? [...DEFAULT_EVENT_PREFS.online],
    maybe: typeof stored?.maybe === 'boolean' ? stored.maybe : DEFAULT_EVENT_PREFS.maybe,
  }
}
