<script lang="ts">
    import { onMount } from "svelte";
    import { loadEpisode } from "$lib/utils/api/episode";
    import { pageStateStore } from "../../../../stores";
    import type { Episode } from "$lib/types";

    import Image from "$lib/components/media/Image.svelte";

    let episode: Episode | null = null;

    onMount(async function() {
        episode = await loadEpisode($pageStateStore.episodeDetailPageEpsiode!.seriesId, $pageStateStore.episodeDetailPageEpsiode!.id);
    });
</script>

<style>
    .content {
        display: flex;
        width: 100%;
        flex-direction: column;
    }
</style>

{#if episode}
    <div class="content">
        {#each episode.contentImageUrls as imgSrc}
            <Image src={imgSrc} storeOffline/>
        {/each}
    </div>
{/if}