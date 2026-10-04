/**
 * Blocked words — Hindi (Devanagari). Sources: profanity.csv (4troDev), MIT. See CREDITS.md.
 * Entries that block everyday sentences were removed (mild insults, words with an ordinary meaning, news words, identity words). Measured against everyday Tatoeba sentences, 4 Oct 2026.
 * Syntax: a plain entry is a whole word ("x*" starts a word, "*x" ends one, "*x*" is inside one); a space makes a phrase.
 */
export declare const HI_WORDS: readonly string[];
