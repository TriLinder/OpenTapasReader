import { CapacitorHttp } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import hash from 'object-hash';

import { urlToHashStore } from "../../../stores";
import { get } from "svelte/store";

type MediaFile = {
    savedTimestamp: string,
    dataUrl: string
}

async function loadMediaFromStorage(hash: string): Promise<string> {
    const loadedFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: `/media/${hash}`,
        encoding: Encoding.ASCII
    });

    const mediaFile: MediaFile = JSON.parse(loadedFile.data as string);

    return mediaFile.dataUrl;
}

async function saveMediaToStorage(hash: string, dataUrl: string) {
    const mediaFile: MediaFile = {
        savedTimestamp: new Date().toString(),
        dataUrl: dataUrl
    }
    await Filesystem.writeFile({
        directory: Directory.Data,
        path: `/media/${hash}`,
        data: JSON.stringify(mediaFile),
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

export async function deleteMediaFromStroage(url: string) {
    // Let's check if we even have a hash stored for this URL
    if (url in get(urlToHashStore).urls) {
        const mediaHash = get(urlToHashStore).urls[url];

        // Cool, we do! Now let's try to delete the media file
        try {
            await Filesystem.deleteFile({
                directory: Directory.Data,
                path: `/media/${mediaHash}`
            });
        } catch {
            // Fail silently
        }

        // And now finally, remove the media's URL from the urlToHash store
        const urlToHashStoreValue = get(urlToHashStore);
        delete urlToHashStoreValue.urls[url];
        urlToHashStore.set(urlToHashStoreValue);
    }
}

export async function deleteAllMediaFromStorage() {
    for (const url of Object.keys(get(urlToHashStore))) {
        await deleteMediaFromStroage(url);
    }
}