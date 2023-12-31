<script lang="ts">
    import { isAppLoadingStore, pageStateStore } from "../stores";

    import "@fontsource/roboto/100.css";
    import "@fontsource/roboto/300.css";
    import "@fontsource/roboto/400.css";
    import "@fontsource/roboto/500.css";
    import "@fontsource/roboto/700.css";
    import "@fontsource/roboto/900.css";
    import "material-icons/iconfont/material-icons.css";

    import Loading from "$lib/components/pages/Loading/Loading.svelte";
    import Library from "$lib/components/pages/Library/Library.svelte";
    import Settings from "$lib/components/pages/Settings/Settings.svelte";
    import About from "$lib/components/pages/About/About.svelte";
    import Search from "$lib/components/pages/Search/Search.svelte";
    import SeriesDetail from "$lib/components/pages/SeriesDetail/SeriesDetail.svelte";
    import EpisodeDetail from "$lib/components/pages/EpisodeDetail/EpisodeDetail.svelte";
    import EpisodeComments from "$lib/components/pages/EpisodeComments/EpisodeComments.svelte";
</script>

<style>
    :global(*) {
        font-family: Roboto;
        user-select: none;
    }
</style>

<noscript>
    <h1>JavaScript required!</h1>
    <p>Please enable JavaScript and reload the page.</p>
</noscript>

{#if $isAppLoadingStore}
    <Loading/>
{:else if $pageStateStore.currentPage == "library"}
    <Library/>
{:else if $pageStateStore.currentPage == "settings"}
    <Settings/>
{:else if $pageStateStore.currentPage == "about"}
    <About/>
{:else if $pageStateStore.currentPage == "search"}
    <Search/>
{:else if $pageStateStore.currentPage == "seriesDetail"}
    <SeriesDetail/>
{:else if $pageStateStore.currentPage == "episodeDetail"}
    <EpisodeDetail/>
{:else if $pageStateStore.currentPage == "episodeComments"}
    <EpisodeComments/>    
{:else}
    <h1>Unknown page!</h1>
    <p>Something has gone wrong.</p>
{/if}