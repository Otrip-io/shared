export declare const PACKAGE_MEDIA: {
    readonly image: {
        readonly maxBytes: 10485760;
        readonly minWidth: 1080;
        readonly minHeight: 720;
        readonly maxCount: 5;
        readonly accept: readonly ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    };
    readonly thumbnail: {
        readonly maxBytes: 10485760;
        readonly minWidth: 1280;
        readonly minHeight: 720;
        readonly minAspect: 1.6;
        readonly maxAspect: 1.9;
        readonly accept: readonly ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    };
    readonly reelThumbnail: {
        readonly maxBytes: 10485760;
        readonly minWidth: 720;
        readonly minHeight: 1280;
        readonly accept: readonly ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    };
    readonly reel: {
        readonly maxBytes: 209715200;
        readonly maxDurationSec: 60;
        readonly minWidth: 720;
        readonly minHeight: 1280;
        readonly accept: readonly ["video/mp4", "video/quicktime", "video/webm"];
    };
    readonly trailer: {
        readonly maxBytes: 524288000;
        readonly maxDurationSec: 300;
        readonly minWidth: 1280;
        readonly minHeight: 720;
        readonly accept: readonly ["video/mp4", "video/quicktime", "video/webm"];
    };
};
