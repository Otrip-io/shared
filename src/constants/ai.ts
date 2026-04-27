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

export function getAiOutputLanguage(locale: string): string {
  return AI_LANG_MAP[locale.split('-')[0]] ?? 'English'
}
