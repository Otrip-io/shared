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
/**
 * Resolve a locale (e.g. 'de', 'zh-CN') to an English language name for the AI prompt.
 * Curated quick-pick names win first so their chip highlights exactly; otherwise the name
 * is resolved via Intl.DisplayNames (same pattern used for currency/region names across the
 * apps), and finally falls back to 'English'.
 */
function getAiOutputLanguage(locale) {
    const base = locale.split('-')[0];
    if (exports.AI_LANG_MAP[base])
        return exports.AI_LANG_MAP[base];
    try {
        const name = new Intl.DisplayNames(['en'], { type: 'language' }).of(locale);
        if (name && name !== locale)
            return name;
    }
    catch {
        /* Intl unavailable — fall through to default */
    }
    return 'English';
}
