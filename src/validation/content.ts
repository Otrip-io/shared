import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';

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
  whitelistedTerms: [...(built.whitelistedTerms ?? []), ...ALLOWED],
});

export function hasBlockedWords(text: string | null | undefined): boolean {
  return !!text && matcher.hasMatch(text);
}
