import { objectStore } from 'svelte-capacitor-store';
import { writable } from 'svelte/store';

import type { UrlToHashStore, LibraryStore, EpisodeStore, PageStateStore, PageStateHistoryStore } from '$lib/types';

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

export const pageStateStore = objectStore<PageStateStore>({
    storeName: "tapasClientPageStateStore",
    initialValue: {
        currentPage: "library",
        seriesDetailPage: {
            series: null,
            reversed: false,
            episodeListVerticalScrollPosition: 0
        },
        episodeDetailPageEpsiode: null,
        episodeCommentsPageEpisode: null
    },
    persist: true
});

export const pageStateHistoryStore = objectStore<PageStateHistoryStore>({
    storeName: "tapasClientPageStateHistoryStore",
    initialValue: {
        dataTypeVersion: 0,
        currentIndex: -1,
        history: []
    },
    persist: true
});

export const isAppLoadingStore = writable<boolean>(true);