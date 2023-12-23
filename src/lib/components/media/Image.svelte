<script lang="ts">
    import { onMount } from "svelte";
    import { loadMedia } from "$lib/utils/media";

    export let src: string;
    export let storeOffline = false;

    let dataUrl = "";

    onMount(async function() {
        dataUrl = await loadMedia(src, storeOffline);
    });
</script>

{#if dataUrl}
    <img src={dataUrl}>
{:else}
    <span>Loading..</span>
{/if}