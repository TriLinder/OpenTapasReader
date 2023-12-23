<script lang="ts">
    import Ripple from '@smui/ripple';
    import IconButton from "@smui/icon-button";
    import Image from "../media/Image.svelte";

    import { pageStateStore } from '../../../stores';
    import type { Series } from "$lib/types";

    export let series: Series;
    $: creatorNames = series.creators.map(user => user.displayName).join(', ');

    function onClick() {
        $pageStateStore.currentPage = "seriesDetail";
        $pageStateStore.seriesDetailPageSeries = series;
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
            <Image src={series.thumbnailUrl} storeOffline/>
        </div>

        <div class="text">
            <h2>{series.title}</h2>
            <span>{creatorNames}</span>
        </div>
    </div>

    <div class="right-side">
        <div class="buttons">
            <IconButton class="material-icons" size="normal">read_more</IconButton>
        </div>
    </div>
</div>
