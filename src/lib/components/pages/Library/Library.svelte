<script lang="ts">
    import { getSeries } from "$lib/utils/api/series";

    async function click() {
        console.log(await getSeries(35242));
    }
</script>

Welcome to the library page!
<button on:click={click}>button</button>