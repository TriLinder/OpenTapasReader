<script lang="ts">
    import { _ } from "svelte-i18n";

    import { onMount } from "svelte";
    import { libraryStore, readEpisodesStore } from "../../../../../stores";
    import type { Series, Episode } from "$lib/types";

    import IconButton, { Icon } from "@smui/icon-button";
    import EpisodeCard from "$lib/components/ui/EpisodeCard.svelte";
    import ContinueReadingPrompt from "$lib/components/pages/SeriesDetail/components/ContinueReadingPrompt.svelte";

    export let series: Series;
    export let reversed = true;
    export let beginningVerticalScrollPosition = 0;
    
    let episodesDivElement: HTMLDivElement;
    let episodes: Episode[] = [];

    $: if (!reversed) {
        episodes = series.episodes
    } else {
        episodes = series.episodes.toReversed();
    }

    $: isSeriesInLibrary = series.id in $libraryStore.series;

    onMount(function() {
        episodesDivElement.scrollTo({top: beginningVerticalScrollPosition});
    });
</script>

<style>
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .episodes {
        overflow-y: scroll;
        flex-grow: 1;
        margin: 0;
    }
</style>

<div class="controls">
    <h2>{$_("seriesDetail.episodeCount", {values: {count: episodes.length}})}</h2>
    <IconButton>
        <Icon class="material-icons" on:click={function() {reversed = !reversed;}}>swap_vert</Icon>
    </IconButton>
</div>

<div class="episodes" bind:this={episodesDivElement} on:scroll>
    {#each episodes as episode (episode.id)}
        <EpisodeCard {episode} storeThumbmnailOffline={isSeriesInLibrary}/>
    {/each}
</div>

<div class="continue-reading">
    <ContinueReadingPrompt episode={$readEpisodesStore.series[series.id]?.lastReadEpisode}/>
</div>