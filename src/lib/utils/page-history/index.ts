import { App as CapacitorApp } from "@capacitor/app";
import { pageStateStore, pageStateHistoryStore } from "../../../stores";
import { get } from "svelte/store";
import { browser } from "$app/environment";

export function commitToHistory() {
    const historyStoreValue = get(pageStateHistoryStore);
    
    historyStoreValue.currentIndex += 1;

    historyStoreValue.history[historyStoreValue.currentIndex] = JSON.stringify(get(pageStateStore));
    historyStoreValue.history.splice(historyStoreValue.currentIndex + 1);

    pageStateHistoryStore.set(historyStoreValue);
}

export function updateCurrentState() {
    const historyStoreValue = get(pageStateHistoryStore);
    historyStoreValue.history[historyStoreValue.currentIndex] = JSON.stringify(get(pageStateStore));
    pageStateHistoryStore.set(historyStoreValue);
}

export function goBack() {
    const historyStoreValue = get(pageStateHistoryStore);

    if (historyStoreValue.currentIndex > 0) {
        historyStoreValue.currentIndex -= 1;
        pageStateHistoryStore.set(historyStoreValue);
    
        const previousPageState = historyStoreValue.history[historyStoreValue.currentIndex];
    
        if (previousPageState) {
            pageStateStore.set(JSON.parse(previousPageState));
        }
    } else {
        console.warn("No page to return back to in history.");
    }
}

if (browser) {
    CapacitorApp.addListener("backButton", goBack);

    // Make sure there's at least one page committed to history
    pageStateHistoryStore.subscribe(function(newValue) {
        if (newValue.history.length == 0) {
            commitToHistory();
        }
    });
}