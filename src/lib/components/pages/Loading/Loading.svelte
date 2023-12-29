<script lang="ts">
    import { commitToHistory } from "$lib/utils/page-history";
    import { isAppLoadingStore } from "../../../../stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    import { initI18n } from "$lib/i18n";

    function loaded() {
        // Loaded!
        $isAppLoadingStore = false;
        commitToHistory();
    }

    onMount(async function() {
        if (browser) {
            await initI18n();
            loaded();
        }
    });
</script>

<h1>LOADING..</h1>