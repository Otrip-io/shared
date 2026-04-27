"use strict";
/**
 * AI plan generation — shared constants used by web itinerary-editor and mobile ai-plan-sheet.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_QUICK_LANGUAGES = exports.AI_LANG_MAP = void 0;
exports.getAiOutputLanguage = getAiOutputLanguage;
/** Locale code → English language name for AI prompts. English names are required by the model. */
exports.AI_LANG_MAP = {
    en: 'English',
    ar: 'Arabic',
    fr: 'French',
    es: 'Spanish',
    tr: 'Turkish',
};
/** English language names shown as quick-pick chips in the AI plan form. */
exports.AI_QUICK_LANGUAGES = ['English', 'Arabic', 'French', 'Spanish', 'Turkish'];
function getAiOutputLanguage(locale) {
    return exports.AI_LANG_MAP[locale.split('-')[0]] ?? 'English';
}
