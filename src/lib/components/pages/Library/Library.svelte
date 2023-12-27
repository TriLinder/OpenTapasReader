<script lang="ts">
    import { libraryStore } from "../../../../stores";
    import { commitToHistory } from "$lib/utils/page-history";
    import { pageStateStore } from "../../../../stores";

    import Fab, { Icon } from "@smui/fab";
    import SeriesCard from "$lib/components/ui/SeriesCard.svelte"; 

    function searchButtonClick() {
        $pageStateStore.currentPage = "search";
        commitToHistory();
    }
</script>

<style>
    .floating-search-button {
        position: fixed;
        right: 15px;
        bottom: 15px;
    }
</style>

Welcome to the library page!

{#each $libraryStore.series as series}
    <SeriesCard {series}/>
{/each}

<div class="floating-search-button">
    <Fab color="primary" on:click={searchButtonClick}>
        <Icon class="material-icons">search</Icon>
    </Fab>
</div>