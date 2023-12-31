<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { readEpisodesStore } from '../../../../../stores';
    import Button, { Label } from '@smui/button';

    function onClick() {
        $readEpisodesStore.series = {};
    }
</script>

<Button variant="unelevated" disabled={Object.values($readEpisodesStore.series).length == 0} on:click={onClick}>
    <Label>{$_("settings.resetReadEpisodes")}</Label>
</Button>