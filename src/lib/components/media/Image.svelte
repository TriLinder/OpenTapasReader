<script lang="ts">
    import { onMount } from "svelte";
    import { loadMedia } from "$lib/utils/media";

    export let src: string;
    export let storeOffline = false;

    let dataUrl = "";
    let failed = false;

    onMount(async function() {
        try {
            dataUrl = await loadMedia(src, storeOffline);
        } catch (error: any) {
            console.error(error);
            failed = true;
            return;
        }
    });
</script>

{#if dataUrl}
    <img src={dataUrl}>
{:else}
    {#if !failed}
        <img src="/image-component/loading.png">
    {:else}
        <img src="/image-component/error.png">
    {/if}
{/if}