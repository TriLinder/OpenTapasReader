<script lang="ts">
    import { date } from 'svelte-i18n';

    import Ripple from '@smui/ripple';
    import IconButton from "@smui/icon-button";
    import EpisodeDownloadButton from './EpisodeDownloadButton.svelte';
    import Image from "../media/Image.svelte";
    import Lazy from "svelte-lazy";

    import { commitToHistory } from '$lib/utils/page-history';
    import { pageStateStore, readEpisodesStore } from '../../../stores';
    import type { Episode } from "$lib/types";

    export let episode: Episode;
    export let storeThumbmnailOffline = false;

    $: hasBeenRead = $readEpisodesStore.series[episode.seriesId]?.readEpisodes.includes(episode.id);

    function onClick() {
        $pageStateStore.currentPage = "episodeDetail";
        $pageStateStore.episodeDetailPageEpsiode = {seriesId: episode.seriesId, episodeId: episode.id};
        commitToHistory();
    }
</script>

<style>
    .series-card {
        height: 75px;
    }

    .content {
        display: flex;
        justify-content: space-between;
    }

    .left-side {
        display: flex;
        height: 75px;
    }

    .thumbnail {
        display: flex;
        width: 75px;
        height: 75px;
    }

    .text {
        display: flex;
        margin-left: 5px;
        flex-direction: column;
        justify-content: center;
    }

    h2 {
        margin: 0;
    }

    .right-side {
        display: flex;
        align-items: center;
    }

    .buttons {
        display: flex;
        flex-direction: row;
    }

    .read {
        filter: brightness(0.5);
        background-color: white;
    }
</style>

<div class="series-card">
    <Lazy>
        <div class="content" class:read={hasBeenRead} use:Ripple={{ surface: true }} on:click={onClick} on:keypress tabindex="0" role="button">
            <div class="left-side">
                <div class="thumbnail">
                    <Image src={episode.thumbnailUrl} storeOffline={storeThumbmnailOffline}/>
                </div>

                <div class="text">
                    <h2>{episode.title}</h2>
                    <span>{$date(new Date(episode.creationDate), {format: "long"})}</span>
                </div>
            </div>

            <div class="right-side">
                <div class="buttons" on:click={function(event) {event.stopPropagation();}}>
                    <EpisodeDownloadButton {episode}/>
                </div>
            </div>
        </div>
    </Lazy>
</div>