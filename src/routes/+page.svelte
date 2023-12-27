<script lang="ts">
    import { pageStateStore } from "../stores";

    import Loading from "$lib/components/pages/Loading/Loading.svelte";
    import Library from "$lib/components/pages/Library/Library.svelte";
    import Search from "$lib/components/pages/Search/Search.svelte";
    import SeriesDetail from "$lib/components/pages/SeriesDetail/SeriesDetail.svelte";
    import EpisodeDetail from "$lib/components/pages/EpisodeDetail/EpisodeDetail.svelte";
</script>

<style>
    :global(*) {
        font-family: Roboto;
    }
</style>

<noscript>
    <h1>JavaScript required!</h1>
    <p>Please enable JavaScript and reload the page.</p>
</noscript>

{#if $pageStateStore.currentPage == "loading"}
    <Loading/>
{:else if $pageStateStore.currentPage == "library"}
    <Library/>
{:else if $pageStateStore.currentPage == "search"}
    <Search/>
{:else if $pageStateStore.currentPage == "seriesDetail"}
    <SeriesDetail/>
{:else if $pageStateStore.currentPage == "episodeDetail"}
    <EpisodeDetail/>
{:else}
    <h1>Unknown page!</h1>
    <p>Something has gone wrong.</p>
{/if}