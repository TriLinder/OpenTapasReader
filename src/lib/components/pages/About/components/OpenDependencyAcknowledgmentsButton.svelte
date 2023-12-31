<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { commitToHistory } from '$lib/utils/page-history';
    import { pageStateStore } from '../../../../../stores';
    
    import Button, { Label } from '@smui/button';

    function onClick() {
        $pageStateStore.currentPage = "dependencyAcknowledgments";
        commitToHistory();
    }
</script>

<Button on:click={onClick} variant="unelevated">
    <Label>{$_("about.dependencyAcknowledgments")}</Label>
</Button>