<script lang="ts">
    import { _ } from "svelte-i18n";
    
    import { commitToHistory } from "$lib/utils/page-history";
    import { pageStateStore } from "../../../../../stores";
    import type { Episode } from "$lib/types";

    import Button, { Label } from '@smui/button';
    import Image from "$lib/components/media/Image.svelte";

    export let episode: Episode | null;

    function onClick() {
        if (episode) {
            $pageStateStore.currentPage = "episodeDetail";
            $pageStateStore.episodeDetailPageEpsiode = {seriesId: episode.seriesId, episodeId: episode.id};
            commitToHistory();
        }
    }
</script>

<style>
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-right: 15px;

        border-top-style: solid;
        border-top-color: black;
        border-top-width: 2px;

        box-shadow: 1px -1px 50px 1px rgba(0,0,0,0.59);
    }

    .episode-information {
        display: flex;
        gap: 5px;
        align-items: center;
    }

    .title {
        font-weight: bold;
    }

    .thumbnail {
        display: flex;
        width: 50px;
        height: 50px;
    }
</style>

{#if episode}
    <div class="content">
        <div class="episode-information">
            <div class="thumbnail">
                {#key episode.thumbnailUrl}
                    <Image src={episode.thumbnailUrl}/>
                {/key}
            </div>

            <span class="title">{episode.title}</span>
        </div>

        <Button variant="raised" on:click={onClick}>
            <Label>{$_("seriesDetail.continue")}</Label>
        </Button>
    </div>
{/if}