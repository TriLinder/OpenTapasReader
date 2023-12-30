<script lang="ts">
    import { _, date, time } from "svelte-i18n";

    import { libraryStore } from "../../../../stores";
    import { commitToHistory } from "$lib/utils/page-history";
    import { pageStateStore } from "../../../../stores";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import Fab, { Icon } from "@smui/fab";
    import IconButton from '@smui/icon-button';
    import UpdateLibraryButton from "$lib/components/ui/UpdateLibraryButton.svelte";
    import PageDrawer from "$lib/components/ui/PageDrawer.svelte";

    import SeriesCard from "$lib/components/ui/SeriesCard.svelte"; 

    let isDrawerOpen = false;

    function searchButtonClick() {
        $pageStateStore.currentPage = "search";
        commitToHistory();
    }
</script>

<style>
    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }

    .content {
        margin-top: 70px;
    }

    .floating-search-button {
        position: fixed;
        right: 15px;
        bottom: 15px;
    }
</style>

<PageDrawer bind:isOpen={isDrawerOpen}/>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" aria-label="Open drawer" on:click={function() {isDrawerOpen = true;}}>menu</IconButton>
                <Title>{$_("library.title")}</Title>
            </Section>

            <Section align="end">
                <UpdateLibraryButton/>
            </Section>
        </Row>
    </TopAppBar>
</div>

<div class="content">
    <p>{$_("library.lastUpdated", {values: {date: $date(new Date($libraryStore.lastUpdate), {format: "long"}), time: $time(new Date($libraryStore.lastUpdate))}})}</p>

    <div class="series">
        {#each Object.values($libraryStore.series) as series}
            <SeriesCard {series} storeThumbmnailOffline/>
        {/each}
    </div>
</div>

<div class="floating-search-button">
    <Fab color="primary" on:click={searchButtonClick}>
        <Icon class="material-icons">search</Icon>
    </Fab>
</div>