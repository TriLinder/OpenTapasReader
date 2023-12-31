import { init, register, locale } from 'svelte-i18n';
import { configurationStore } from '../../stores';
import { get } from 'svelte/store';

export async function initI18n() {
    register("en", () => import("./locales/en.json"));
    register("cs", () => import("./locales/cs.json"));

    await init({
        fallbackLocale: "en",
        initialLocale: "en",
    });

    // Set the locale
    locale.set(get(configurationStore).language);

    // Update the locale
    configurationStore.subscribe(function(value) {
        locale.set(value.language);
    });
}