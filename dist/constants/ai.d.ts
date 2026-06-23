/**
 * AI plan generation — shared constants used by web itinerary-editor and mobile ai-plan-sheet.
 */
/** Locale code → English language name for AI prompts. English names are required by the model. */
export declare const AI_LANG_MAP: Record<string, string>;
/** English language names shown as quick-pick chips in the AI plan form. */
export declare const AI_QUICK_LANGUAGES: readonly string[];
/**
 * Resolve a locale (e.g. 'de', 'zh-CN') to an English language name for the AI prompt.
 * Curated quick-pick names win first so their chip highlights exactly; otherwise the name
 * is resolved via Intl.DisplayNames (same pattern used for currency/region names across the
 * apps), and finally falls back to 'English'.
 */
export declare function getAiOutputLanguage(locale: string): string;
