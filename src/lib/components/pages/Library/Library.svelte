<script lang="ts">
    import { getSeries } from "$lib/utils/api/series";
    import type { Series } from "$lib/types";
    import SeriesCard from "$lib/components/ui/SeriesCard.svelte";

    let series: null | Series = null;

    async function click() {
        series = await getSeries(35242);
    }
</script>

Welcome to the library page!
<button on:click={click}>Load series</button> <br>

{#if series}
    <SeriesCard {series}/>
{/if}