<script lang="ts">
    import type { Series, Episode } from "$lib/types";

    import IconButton, { Icon } from "@smui/icon-button";
    import EpisodeCard from "$lib/components/ui/EpisodeCard.svelte";

    export let series: Series;

    let reversed = true;
    let episodes: Episode[] = [];

    $: if (!reversed) {
        episodes = series.episodes
    } else {
        episodes = series.episodes.toReversed();
    }
</script>

<style>
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

<div class="controls">
    <h2>{episodes.length} episodes</h2>
    <IconButton>
        <Icon class="material-icons" on:click={function() {reversed = !reversed;}}>swap_vert</Icon>
    </IconButton>
</div>

{#each episodes as episode (episode.id)}
    <EpisodeCard {episode}/>
{/each}