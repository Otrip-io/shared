"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasBlockedWords = hasBlockedWords;
exports.findEnglishBlockedSpans = findEnglishBlockedSpans;
const obscenity_1 = require("obscenity");
const places_allow_1 = require("./wordlists/places-allow");
/**
 * Words a public name may not carry (store rules on user content): club names,
 * handles and descriptions, event titles and descriptions. English only — the
 * `obscenity` dataset, which also catches swapped letters (sh1t, f*ck).
 *
 * Tuned by measurement, not by eye (2026-09-29): "dick" is dropped because it
 * is a first name ("Dick Smith Riders"), and real words and PLACES that
 * contain a flagged word are allowed — a travel app must never refuse
 * Fukuoka or Penistone. Add to ALLOWED when a real name is refused. The server and the phone share
 * this, so a form refuses exactly what the server would.
 */
const ALLOWED = [
    'cockpit', 'cocktail', 'cockatoo', 'cockroach', 'peacock', 'hancock', 'hitchcock', 'woodcock', 'shuttlecock', 'babcock', 'weathercock',
    'shiitake', 'pussycat', 'penistone', 'fukuoka', 'fukushima', 'fukui', 'fukuyama',
];
const built = obscenity_1.englishDataset.removePhrasesIf((phrase) => phrase.metadata?.originalWord === 'dick').build();
const matcher = new obscenity_1.RegExpMatcher({
    ...built,
    ...obscenity_1.englishRecommendedTransformers,
    // Adds to the dataset's own allow-list; replacing it would refuse Arsenal, Cumberland, Assembly…
    // PLACE_ALLOW: 418 real place names with a flagged word inside them (Kodaikanal, Slutsk), measured 2026-10-04.
    whitelistedTerms: [...(built.whitelistedTerms ?? []), ...ALLOWED, ...places_allow_1.PLACE_ALLOW],
});
function hasBlockedWords(text) {
    return !!text && matcher.hasMatch(text);
}
/** Where the English list matched, as offsets into the text as typed (end exclusive) — for highlighting. */
function findEnglishBlockedSpans(text) {
    if (!text)
        return [];
    return matcher.getAllMatches(text, true).map((m) => ({
        start: m.startIndex,
        end: m.endIndex + 1,
        text: text.slice(m.startIndex, m.endIndex + 1),
    }));
}
