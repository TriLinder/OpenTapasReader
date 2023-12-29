import { libraryStore } from "../../../stores";
import { get } from "svelte/store";
import { deleteMediaFromStroage } from "../media";
import type { Series } from "$lib/types";

export function addSeriesToLibrary(series: Series) {
    const libraryStoreValue = get(libraryStore);
    libraryStoreValue.series[series.id] = series;
    libraryStore.set(libraryStoreValue);
}

export function removeSeriesFromLibrary(series: Series) {
    const libraryStoreValue = get(libraryStore);
    delete libraryStoreValue.series[series.id];
    libraryStore.set(libraryStoreValue);

    // Now delete the series' media assets
    deleteMediaFromStroage(series.coverImageUrl);
    deleteMediaFromStroage(series.thumbnailUrl);
    
    for (const creator of series.creators) {
        deleteMediaFromStroage(creator.profilePictureUrl);
    }

    for (const episode of series.episodes) {
        deleteMediaFromStroage(episode.thumbnailUrl);
    }
}