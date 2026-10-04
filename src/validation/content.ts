import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import { PLACE_ALLOW } from './wordlists/places-allow';

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

const built = englishDataset.removePhrasesIf((phrase) => phrase.metadata?.originalWord === 'dick').build();
const matcher = new RegExpMatcher({
  ...built,
  ...englishRecommendedTransformers,
  // Adds to the dataset's own allow-list; replacing it would refuse Arsenal, Cumberland, Assembly…
  // PLACE_ALLOW: 418 real place names with a flagged word inside them (Kodaikanal, Slutsk), measured 2026-10-04.
  whitelistedTerms: [...(built.whitelistedTerms ?? []), ...ALLOWED, ...PLACE_ALLOW],
});

export function hasBlockedWords(text: string | null | undefined): boolean {
  return !!text && matcher.hasMatch(text);
}

/** Where the English list matched, as offsets into the text as typed (end exclusive) — for highlighting. */
export function findEnglishBlockedSpans(text: string | null | undefined): { start: number; end: number; text: string }[] {
  if (!text) return [];
  return matcher.getAllMatches(text, true).map((m) => ({
    start: m.startIndex,
    end: m.endIndex + 1,
    text: text.slice(m.startIndex, m.endIndex + 1),
  }));
}
