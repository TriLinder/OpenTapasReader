<script lang="ts">
    import { loadMedia } from "$lib/utils/media";

    let src = "";

    async function loadImage() {
        src = await loadMedia("https://us-a.tapas.io/c/d0/f20e5adc-1dd7-4f36-b614-95fc45a6a4d0.png", true);
    }
</script>

<h1>Hello, world!</h1>

<button on:click={loadImage}>Load image</button>
<img src={src}>