<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { episodeStore } from '../../../../../stores';
    import { deleteAllMediaFromStorage } from '$lib/utils/media';

    import Button, { Label } from '@smui/button';

    let deleting = false;

    async function onClick() {
        // Make sure we're not doing this twice at the same time
        if (deleting) {
            return;
        }

        deleting = true;

        // First, let's confirm the user actually wants to do this
        if (!confirm($_("settings.deleteOfflineMedia.confirmation"))) {
            return;
        }

        // Alright, let's delete all downloaded episodes
        $episodeStore.episodes = {};

        // Now delete all media
        await deleteAllMediaFromStorage();

        // Done!
        deleting = false;
    }
</script>

<Button on:click={onClick} bind:disabled={deleting} variant="unelevated">
    <Label>{$_("settings.deleteOfflineMedia.buttonLabel")}</Label>
</Button>