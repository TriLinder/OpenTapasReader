import { App as CapacitorApp } from "@capacitor/app";
import { pageStateStore } from "../../../stores";
import { get } from "svelte/store";
import { browser } from "$app/environment";

export function commitToHistory() {
    if (browser) {
        document.location.hash = encodeURIComponent(JSON.stringify(get(pageStateStore)));
    }
}

export function goBack() {
    window.history.back();

    if (window.location.hash = "#") {
        window.history.forward();
    }
}

export function goForward() {
    window.history.forward();
}

if (browser) {
    window.addEventListener("hashchange", function() {
        const hash = window.location.hash.slice(1);

        if (hash != encodeURIComponent(JSON.stringify(get(pageStateStore)))) {
            pageStateStore.set(JSON.parse(decodeURIComponent(hash)));

            // Quit the appliaction if the user navigates back to these pages
            if (get(pageStateStore).currentPage == "loading") {
                CapacitorApp.exitApp();
                console.log("Quitting!");
                return;
            }
        }
    });

    CapacitorApp.addListener("backButton", goBack);
}