/**
 * AI plan generation — shared constants used by web itinerary-editor and mobile ai-plan-sheet.
 */
/** Locale code → English language name for AI prompts. English names are required by the model. */
export declare const AI_LANG_MAP: Record<string, string>;
/** English language names shown as quick-pick chips in the AI plan form. */
export declare const AI_QUICK_LANGUAGES: readonly string[];
export declare function getAiOutputLanguage(locale: string): string;
