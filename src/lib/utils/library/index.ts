import { libraryStore } from "../../../stores";
import { get } from "svelte/store";
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
}