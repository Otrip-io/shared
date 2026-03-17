export declare const GENDERS: {
    readonly MALE: "male";
    readonly FEMALE: "female";
    readonly OTHER: "other";
};
export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
