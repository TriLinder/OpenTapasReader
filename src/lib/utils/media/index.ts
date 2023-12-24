import { CapacitorHttp } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import hash from 'object-hash';

import { urlToHashStore } from "../../../stores";
import { get } from "svelte/store";

async function loadMediaFromStorage(hash: string): Promise<string> {
    const loadedFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: `/media/${hash}`
    });

    const dataUrl = JSON.parse(loadedFile.data as string).dataUrl;

    return dataUrl;
}

async function saveMediaToStorage(hash: string, dataUrl: string) {
    await Filesystem.writeFile({
        directory: Directory.Data,
        path: `/media/${hash}`,
        data: JSON.stringify({"dataUrl": dataUrl}),
        encoding: Encoding.ASCII,
        recursive: true
    });
}

// Loads a media file (for example an image) from a URL and returns its data url
export async function loadMedia(url: string, storeOffline=false): Promise<string> {
    // First, let's check if the media is already stored offline
    if (url in get(urlToHashStore).urls) {
        // Great! We already do have a hash stored for this url. That probably means
        // we'll have the media stored too. Let's try to load it!
        const mediaHash = get(urlToHashStore).urls[url];

        try {
            return await loadMediaFromStorage(mediaHash);
        } catch {
            console.warn("Failed to load media from storage.");
        }
    }

    // Alright, it's not stored locally.
    // Let's fetch it from the internet.
    const response = await CapacitorHttp.get({url: url, responseType: "blob"});
    
    if (response.status != 200) {
        throw Error(`Failed to fetch media: status ${response.status}`);
    }

    const base64DataUrl = `data:media;base64,${response.data}`;
    
    // We now have the data url. Check if we want to store it for offline use.
    if (storeOffline) {
        // Alright, we first need to generate a SHA1 hash from the data url
        const mediaHash = hash.sha1(base64DataUrl);
        
        // Now let's save to the URL -> hash store
        const urlToHashStoreValue = get(urlToHashStore);
        urlToHashStoreValue.urls[url] = mediaHash;
        urlToHashStore.set(urlToHashStoreValue);

        // And we can finally save it to storage
        await saveMediaToStorage(mediaHash, base64DataUrl);
    }

    return base64DataUrl;
}