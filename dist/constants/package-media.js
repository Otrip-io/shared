"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGE_MEDIA = void 0;
exports.PACKAGE_MEDIA = {
    image: {
        maxBytes: 10_485_760, // 10 MB
        minWidth: 1080,
        minHeight: 720,
        maxCount: 5,
        accept: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    },
    thumbnail: {
        maxBytes: 10_485_760, // 10 MB — cover / trailer poster (landscape)
        minWidth: 1280,
        minHeight: 720,
        minAspect: 1.6, // ~16:9
        maxAspect: 1.9,
        accept: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    },
    reelThumbnail: {
        maxBytes: 10_485_760, // 10 MB — reel poster (portrait)
        minWidth: 720,
        minHeight: 1280,
        accept: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    },
    reel: {
        maxBytes: 209_715_200, // 200 MB
        maxDurationSec: 60,
        minWidth: 720,
        minHeight: 1280, // portrait 9:16
        accept: ['video/mp4', 'video/quicktime', 'video/webm'],
    },
    trailer: {
        maxBytes: 524_288_000, // 500 MB
        maxDurationSec: 300, // 5 min
        minWidth: 1280,
        minHeight: 720, // landscape 16:9
        accept: ['video/mp4', 'video/quicktime', 'video/webm'],
    },
};
