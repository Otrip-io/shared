/**
 * AI plan generation — shared constants used by web itinerary-editor and mobile ai-plan-sheet.
 */

/** Locale code → English language name for AI prompts. English names are required by the model. */
export const AI_LANG_MAP: Record<string, string> = {
  en: 'English',
  ar: 'Arabic',
  fr: 'French',
  es: 'Spanish',
  tr: 'Turkish',
}

/** English language names shown as quick-pick chips in the AI plan form. */
export const AI_QUICK_LANGUAGES: readonly string[] = ['English', 'Arabic', 'French', 'Spanish', 'Turkish']

/**
 * Resolve a locale (e.g. 'de', 'zh-CN') to an English language name for the AI prompt.
 * Curated quick-pick names win first so their chip highlights exactly; otherwise the name
 * is resolved via Intl.DisplayNames (same pattern used for currency/region names across the
 * apps), and finally falls back to 'English'.
 */
export function getAiOutputLanguage(locale: string): string {
  const base = locale.split('-')[0]
  if (AI_LANG_MAP[base]) return AI_LANG_MAP[base]
  try {
    const name = new Intl.DisplayNames(['en'], { type: 'language' }).of(locale)
    if (name && name !== locale) return name
  } catch {
    /* Intl unavailable — fall through to default */
  }
  return 'English'
}
