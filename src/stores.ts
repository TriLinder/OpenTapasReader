import { objectStore } from 'svelte-capacitor-store';
import { writable } from 'svelte/store';

import type { UrlToHashStore, LibraryStore, EpisodeStore, PageStateStore } from '$lib/types';

export const urlToHashStore = objectStore<UrlToHashStore>({
    storeName: "tapasClientUrlToHashStore",
    initialValue: {
        dataTypeVersion: 0,
        urls: {}
    },
    persist: true
});

export const libraryStore = objectStore<LibraryStore>({
    storeName: "tapasClientLibraryStore",
    initialValue: {
        dataTypeVersion: 0,
        series: {}
    },
    persist: true
});

export const episodeStore = objectStore<EpisodeStore>({
    storeName: "tapasClientEpisodeStore",
    initialValue: {
        dataTypeVersion: 0,
        episodes: {}
    },
    persist: true
});

export const pageStateStore = writable<PageStateStore>({
    currentPage: "loading",
    seriesDetailPageSeries: null,
    episodeDetailPageEpsiode: null
});