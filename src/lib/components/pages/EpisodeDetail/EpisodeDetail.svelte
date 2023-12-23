<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { loadEpisode } from "$lib/utils/api/episode";
    import type { Episode } from "$lib/types";

    import Image from "$lib/components/media/Image.svelte";

    let episode: Episode | null = null;

    onMount(async function() {
        if (browser) {
            episode = await loadEpisode(35242, 780721);
        }
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