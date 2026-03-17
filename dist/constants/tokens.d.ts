export declare const TOKEN_TYPES: {
    readonly REFRESH: "refresh";
};
export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES];
