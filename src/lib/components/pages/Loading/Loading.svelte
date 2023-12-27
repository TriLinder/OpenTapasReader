<script lang="ts">
    import { commitToHistory } from "$lib/utils/page-history";
    import { pageStateStore } from "../../../../stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    import { initI18n } from "$lib/i18n";

    function loaded() {
        // Loaded! Switch to the starting page.
        $pageStateStore.currentPage = "library";
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