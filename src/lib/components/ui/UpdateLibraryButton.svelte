<script lang="ts">
    import { updateSeriesInLibrary } from '$lib/utils/library';
    import IconButton from '@smui/icon-button';

    export let disabled = false;

    let loading = false;

    async function updateLibrary() {
        // Make sure we're not doing this twice at the same time
        if (loading) {
            return;
        }

        loading = true;

        try {
            await updateSeriesInLibrary();
            loading = false;
        } catch(error: any) {
            console.error(error);
            alert(error);
            loading = false;
            return;
        }
    }
</script>

{#if !loading}
    <IconButton class="material-icons" {disabled} on:click={updateLibrary}>refresh</IconButton>
{:else}
    <IconButton class="material-icons" disabled>hourglass_bottom</IconButton>
{/if}