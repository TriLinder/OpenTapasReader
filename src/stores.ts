import { objectStore } from 'svelte-capacitor-store';

import type { MediaStore, UrlToHashStore } from '$lib/types';

// Store for offline-accessible media (like images).
// A record with the media's SHA1 hash as the key and its base64 data url as the value
export const mediaStore = objectStore<MediaStore>({
    storeName: "tapasClientMediaStore",
    initialValue: {
        dataTypeVersion: 0,
        media: {}
    },
    persist: true
});

export const urlToHashStore = objectStore<UrlToHashStore>({
    storeName: "tapasClientUrlToHashStore",
    initialValue: {
        dataTypeVersion: 0,
        urls: {}
    },
    persist: true
});