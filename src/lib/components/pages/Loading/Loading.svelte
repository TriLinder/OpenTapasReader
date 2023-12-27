<script lang="ts">
    import { commitToHistory } from "$lib/utils/page-history";
    import { pageStateStore } from "../../../../stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    function loaded() {
        // Loaded! Switch to the starting page.
        $pageStateStore.currentPage = "library";
        commitToHistory();
    }

    onMount(function() {
        if (browser) {
            loaded();
        }
    });
</script>

<h1>LOADING..</h1>