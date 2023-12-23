<script lang="ts">
    import { pageStateStore } from "../stores";

    import Library from "$lib/components/pages/Library/Library.svelte";
</script>

<noscript>
    <h1>JavaScript required!</h1>
    <p>Please enable JavaScript and reload the page.</p>
</noscript>

{#if $pageStateStore.currentPage == "library"}
    <Library/>
{:else}
    <h1>Unknown page!</h1>
    <p>Something has gone wrong.</p>
{/if}