<script lang="ts">
    import { libraryStore } from "../../../../stores";
    import SeriesCard from "$lib/components/ui/SeriesCard.svelte"; 
</script>

Welcome to the library page!

{#each $libraryStore.series as series}
    <SeriesCard {series}/>
{/each}