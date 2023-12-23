import hash from 'object-hash';

import { mediaStore, urlToHashStore } from "../../../stores";
import { get } from "svelte/store";

// Loads a media file (for example an image) from a URL and returns its data url
export async function loadMedia(url: string, storeOffline=false): Promise<string> {
    // First, let's check if the media is already stored offline
    if (url in get(urlToHashStore).urls) {
        // Great! We already do have a hash stored for this url. That probably means
        // we'll have the media stored too. Let's check.
        const hash = get(urlToHashStore).urls[url];

        if (hash in get(mediaStore).media) {
            // We have the media stored locally! Let's return it from the
            // media store.
            return get(mediaStore).media[hash];
        }
    }

    // Alright, it's not stored locally.
    // Let's fetch it from the internet.
    const response = await fetch(url);

    if (!response.ok) {
        throw Error(`Failed to fetch media: ${response.statusText}`);
    }

    // Convert the response to a blob and read it as a data URL
    const blob = await response.blob();
    const reader = new FileReader();
    
    const base64Promise: Promise<string> = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
    });

    reader.readAsDataURL(blob);
    const base64DataUrl = await base64Promise;
    
    // We now have the data url. Check if we want to store it for offline use.
    if (storeOffline) {
        // Alright, we first need to generate a SHA1 hash from the data url
        const mediaHash = hash.sha1(base64DataUrl);

        // Now let's save to the URL -> hash store
        const urlToHashStoreValue = get(urlToHashStore);
        urlToHashStoreValue.urls[url] = mediaHash;
        urlToHashStore.set(urlToHashStoreValue);

        // And now let's finally save the data url to the mediaStore
        const mediaStoreValue = get(mediaStore);
        mediaStoreValue.media[mediaHash] = base64DataUrl;
        mediaStore.set(mediaStoreValue);
    }

    return base64DataUrl;
}