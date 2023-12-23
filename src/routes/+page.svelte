<script lang="ts">
    import Image from "$lib/components/media/Image.svelte";

    let showImage = false;
</script>

<h1>Hello, world!</h1>

<input type="checkbox" bind:checked={showImage}> <br>

{#if showImage}
    <Image src={"https://us-a.tapas.io/c/d0/f20e5adc-1dd7-4f36-b614-95fc45a6a4d0.png"} storeOffline/>
{/if}