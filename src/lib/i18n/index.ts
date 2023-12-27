import { init, register, locale } from 'svelte-i18n';

export async function initI18n() {
    register("en", () => import("./locales/en.json"));

    await init({
        fallbackLocale: "en",
        initialLocale: "en",
    });

    // Set the locale
    locale.set("en");
}