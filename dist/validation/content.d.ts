export declare function hasBlockedWords(text: string | null | undefined): boolean;
/** Where the English list matched, as offsets into the text as typed (end exclusive) — for highlighting. */
export declare function findEnglishBlockedSpans(text: string | null | undefined): {
    start: number;
    end: number;
    text: string;
}[];
