<script lang="ts">
    import { loadEpisode, deleteEpisodeFromStorage } from '$lib/utils/api/episode';
    import type { Episode } from '$lib/types';
    import { episodeStore } from '../../../stores';
    import IconButton from '@smui/icon-button';

    export let episode: Episode;    
    export let disabled = false;

    let loading = false;

    async function downloadEpisode() {
        // Download the episode by loading it and
        // saving it for offline use.

        // Make sure we're not doing this twice at the same time.
        if (loading) {
            return;
        }
        
        loading = true;

        // Download the episode
        try {
            await loadEpisode(episode.seriesId, episode.id, true);
        } catch (error: any) {
            console.error(error);
            alert(error);
            loading = false;
            return;
        }

        // Done! :)
        loading = false;
    }

    async function deleteEpisode() {
        // Delete the episode.
        
        // Make sure we're not doing this twice at the same time.
        if (loading) {
            return;
        }

        try {
            await deleteEpisodeFromStorage(episode.id);
        } catch (error: any) {
            console.error(error);
            alert(error);
            loading = false;
            return;
        }

        // Done! :)
        loading = false;
    }

    $: downloaded = episode.id in $episodeStore.episodes;
</script>

{#if !loading}
    {#if !downloaded}
        <IconButton class="material-icons" {disabled} on:click={downloadEpisode}>download</IconButton>
    {:else}
        <IconButton class="material-icons" {disabled} on:click={deleteEpisode}>download_done</IconButton>
    {/if}
{:else}
    <IconButton class="material-icons" disabled>hourglass_bottom</IconButton>
{/if}