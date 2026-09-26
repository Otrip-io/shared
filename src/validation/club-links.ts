/**
 * A club's website + social links (Phase 4d). ONE implementation for the phone
 * (checks as the admin types, offline included, so a typo can never make the
 * whole club create fail on the server) and the server (the authority — it
 * re-runs this on every write).
 *
 * Input is what a person types: a username (`lahoreriders`, `@lahoreriders`)
 * or a pasted link. Output is the platform's canonical https URL. Parsed by
 * hand, not with `URL`, because React Native's URL is incomplete.
 */

export const CLUB_LINK_KEYS = ['website', 'instagram', 'youtube', 'facebook', 'tiktok', 'x'] as const
export type ClubLinkKey = (typeof CLUB_LINK_KEYS)[number]
export type ClubLinks = Partial<Record<ClubLinkKey, string>>

export const CLUB_LINK_MAX_LENGTH = 200

/**
 * - `invalid` — not a username or link we can read
 * - `not_https` — a website on plain http
 * - `shortener` — bit.ly and friends hide where they go
 * - `wrong_site` — an Instagram field holding a facebook.com link, …
 * - `too_long` — over CLUB_LINK_MAX_LENGTH once normalised
 */
export type ClubLinkProblem = 'invalid' | 'not_https' | 'shortener' | 'wrong_site' | 'too_long'
export type ClubLinkResult = { ok: true; url: string } | { ok: false; problem: ClubLinkProblem }

const SHORTENERS = new Set([
  'bit.ly', 'bitly.com', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'rebrand.ly', 'cutt.ly',
  'shorturl.at', 'tiny.cc', 'rb.gy', 's.id', 'lnkd.in', 'bl.ink', 'short.io', 'v.gd', 'tr.im', 'qr.ae', 't.ly',
  'shorte.st', 'adf.ly', 'linktr.ee', 'lnk.to', 'fb.me', 'youtu.be', 'vm.tiktok.com', 'vt.tiktok.com',
])

const SOCIAL_HOSTS: Record<Exclude<ClubLinkKey, 'website'>, readonly string[]> = {
  instagram: ['instagram.com', 'instagr.am'],
  youtube: ['youtube.com'],
  facebook: ['facebook.com', 'fb.com'],
  tiktok: ['tiktok.com'],
  x: ['x.com', 'twitter.com'],
}

const INSTAGRAM_USER = /^[A-Za-z0-9._]{1,30}$/
const X_USER = /^[A-Za-z0-9_]{1,15}$/
const TIKTOK_USER = /^[A-Za-z0-9._]{2,24}$/
const YOUTUBE_HANDLE = /^[A-Za-z0-9._-]{3,30}$/
const YOUTUBE_CHANNEL_ID = /^UC[A-Za-z0-9_-]{22}$/
const FACEBOOK_NAME = /^[A-Za-z0-9.-]{1,80}$/
const HOST = /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/
/** scheme? host path? query? fragment? — no whitespace anywhere. */
const LINK = /^(?:([a-z][a-z0-9+.-]*):\/\/)?([^/?#\s]+)(\/[^?#\s]*)?(\?[^#\s]*)?(#\S*)?$/i

interface ParsedLink {
  scheme: string | null
  host: string
  path: string
  query: string
}

function parseLink(raw: string): ParsedLink | null {
  const m = LINK.exec(raw)
  if (!m) return null
  const host = m[2].toLowerCase()
  // Userinfo or a port in the host is how a link pretends to be somewhere it
  // is not (`https://instagram.com@evil.example`).
  if (host.includes('@') || host.includes(':')) return null
  return { scheme: m[1] ? m[1].toLowerCase() : null, host, path: m[3] ?? '', query: m[4] ?? '' }
}

/** `www.`, `m.` and `mobile.` are the same site. */
function bareHost(host: string): string {
  return host.replace(/^(?:www|m|mobile)\./, '')
}

function segments(path: string): string[] {
  return path.split('/').filter(Boolean).map((s) => {
    try {
      return decodeURIComponent(s)
    } catch {
      return s
    }
  })
}

function done(url: string): ClubLinkResult {
  return url.length > CLUB_LINK_MAX_LENGTH ? { ok: false, problem: 'too_long' } : { ok: true, url }
}

function normalizeWebsite(raw: string): ClubLinkResult {
  const parsed = parseLink(raw)
  if (!parsed) return { ok: false, problem: 'invalid' }
  if (parsed.scheme === 'http') return { ok: false, problem: 'not_https' }
  // Anything but https (javascript:, data:, ftp:) is refused outright.
  if (parsed.scheme !== null && parsed.scheme !== 'https') return { ok: false, problem: 'invalid' }
  if (!HOST.test(parsed.host)) return { ok: false, problem: 'invalid' }
  if (SHORTENERS.has(parsed.host) || SHORTENERS.has(bareHost(parsed.host))) return { ok: false, problem: 'shortener' }
  const path = parsed.path === '/' ? '' : parsed.path
  return done(`https://${parsed.host}${path}${parsed.query}`)
}

/** The username part of a social field: `@name`, `name`, or the first path segment of a link. */
function socialTarget(key: Exclude<ClubLinkKey, 'website'>, raw: string): { segs: string[]; query: string } | ClubLinkResult {
  // One word is a username — dots included (`lahore.riders` is a valid
  // Instagram name), so only a slash or a scheme makes it a link.
  if (!raw.includes('/')) {
    const name = raw.replace(/^@/, '')
    return SOCIAL_HOSTS[key].includes(bareHost(name.toLowerCase())) ? { ok: false, problem: 'invalid' } : { segs: [name], query: '' }
  }
  const parsed = parseLink(raw)
  if (!parsed) return { ok: false, problem: 'invalid' }
  if (parsed.scheme !== null && parsed.scheme !== 'https' && parsed.scheme !== 'http') return { ok: false, problem: 'invalid' }
  const host = bareHost(parsed.host)
  if (SHORTENERS.has(parsed.host) || SHORTENERS.has(host)) return { ok: false, problem: 'shortener' }
  if (!SOCIAL_HOSTS[key].includes(host)) return { ok: false, problem: 'wrong_site' }
  return { segs: segments(parsed.path), query: parsed.query }
}

function normalizeSocial(key: Exclude<ClubLinkKey, 'website'>, raw: string): ClubLinkResult {
  const target = socialTarget(key, raw)
  if ('ok' in target) return target
  const [first, second, third] = target.segs
  if (!first) return { ok: false, problem: 'invalid' }
  const name = first.replace(/^@/, '')
  switch (key) {
    case 'instagram':
      return INSTAGRAM_USER.test(name) ? done(`https://www.instagram.com/${name}`) : { ok: false, problem: 'invalid' }
    case 'x':
      return X_USER.test(name) ? done(`https://x.com/${name}`) : { ok: false, problem: 'invalid' }
    case 'tiktok':
      return TIKTOK_USER.test(name) ? done(`https://www.tiktok.com/@${name}`) : { ok: false, problem: 'invalid' }
    case 'youtube': {
      if (first === 'channel') return second && YOUTUBE_CHANNEL_ID.test(second) ? done(`https://www.youtube.com/channel/${second}`) : { ok: false, problem: 'invalid' }
      if (first === 'c' || first === 'user') return second && YOUTUBE_HANDLE.test(second) ? done(`https://www.youtube.com/${first}/${second}`) : { ok: false, problem: 'invalid' }
      return YOUTUBE_HANDLE.test(name) ? done(`https://www.youtube.com/@${name}`) : { ok: false, problem: 'invalid' }
    }
    case 'facebook': {
      if (first === 'groups') return second && FACEBOOK_NAME.test(second) ? done(`https://www.facebook.com/groups/${second}`) : { ok: false, problem: 'invalid' }
      if (first === 'people') return second && third && /^\d{5,20}$/.test(third) && second.length <= 80 ? done(`https://www.facebook.com/people/${encodeURIComponent(second)}/${third}`) : { ok: false, problem: 'invalid' }
      if (first === 'profile.php') {
        const id = /(?:^\?|&)id=(\d{5,20})(?:&|$)/.exec(target.query)?.[1]
        return id ? done(`https://www.facebook.com/profile.php?id=${id}`) : { ok: false, problem: 'invalid' }
      }
      return FACEBOOK_NAME.test(name) ? done(`https://www.facebook.com/${name}`) : { ok: false, problem: 'invalid' }
    }
  }
}

/** One field. An empty value is not an error — the caller treats it as "no link". */
export function normalizeClubLink(key: ClubLinkKey, input: string): ClubLinkResult {
  const raw = input.trim()
  if (!raw) return { ok: false, problem: 'invalid' }
  if (raw.length > CLUB_LINK_MAX_LENGTH * 2) return { ok: false, problem: 'too_long' }
  return key === 'website' ? normalizeWebsite(raw) : normalizeSocial(key, raw)
}

/**
 * Every field at once. Blank fields are dropped (that is how a link is
 * removed); unknown keys are ignored. `errors` is empty when all is well.
 */
export function normalizeClubLinks(input: Partial<Record<string, unknown>>): {
  links: ClubLinks
  errors: Partial<Record<ClubLinkKey, ClubLinkProblem>>
} {
  const links: ClubLinks = {}
  const errors: Partial<Record<ClubLinkKey, ClubLinkProblem>> = {}
  for (const key of CLUB_LINK_KEYS) {
    const value = input[key]
    if (typeof value !== 'string' || !value.trim()) continue
    const result = normalizeClubLink(key, value)
    if (result.ok) links[key] = result.url
    else errors[key] = result.problem
  }
  return { links, errors }
}

/** What a chip or row shows for a stored link: `@lahoreriders`, `lahoreriders.com`. */
export function clubLinkLabel(key: ClubLinkKey, url: string): string {
  const parsed = parseLink(url)
  if (!parsed) return url
  const segs = segments(parsed.path)
  switch (key) {
    case 'website':
      return `${bareHost(parsed.host)}${parsed.path === '/' ? '' : parsed.path.replace(/\/$/, '')}`
    case 'instagram':
    case 'x':
      return segs[0] ? `@${segs[0]}` : url
    case 'tiktok':
    case 'youtube':
      if (segs[0]?.startsWith('@')) return segs[0]
      return segs[segs.length - 1] ?? url
    case 'facebook':
      if (segs[0] === 'people' && segs[1]) return segs[1]
      if (segs[0] === 'profile.php') return 'Facebook'
      return segs[segs.length - 1] ?? url
  }
}
