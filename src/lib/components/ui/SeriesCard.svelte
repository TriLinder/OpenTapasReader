<script lang="ts">
    import { _, date } from 'svelte-i18n';

    import Ripple from '@smui/ripple';
    import IconButton from "@smui/icon-button";
    import Image from "../media/Image.svelte";

    import { commitToHistory } from '$lib/utils/page-history';
    import { pageStateStore } from '../../../stores';
    import type { Series } from "$lib/types";

    export let series: Series;
    export let storeThumbmnailOffline = false;

    $: latestEpisodeDate = new Date(Array.from(series.episodes).pop()?.creationDate!);

    function onClick() {
        $pageStateStore.currentPage = "seriesDetail";
        $pageStateStore.seriesDetailPage.series = series;
        commitToHistory();
    }
</script>

<style>
    .series-card {
        display: flex;
        height: 75px;
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

    .latest-episode-text {
        font-size: 0.75em;
        color: gray;
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
</style>

<div class="series-card" use:Ripple={{ surface: true }} on:click={onClick} on:keypress tabindex="0" role="button">
    <div class="left-side">
        <div class="thumbnail">
            <Image src={series.thumbnailUrl} storeOffline={storeThumbmnailOffline}/>
        </div>

        <div class="text">
            <h2>{series.title}</h2>
            <span class="latest-episode-text">{$_("seriesCard.latestEpisodeDate", {values: {date: $date(latestEpisodeDate, {format: "long"})}})}</span>
        </div>
    </div>

    <div class="right-side">
        <div class="buttons">
            <IconButton class="material-icons" size="normal">read_more</IconButton>
        </div>
    </div>
</div>
