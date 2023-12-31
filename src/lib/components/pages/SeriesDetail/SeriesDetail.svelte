<script lang="ts">
    import { _ } from "svelte-i18n";

    import debounce from "lodash.debounce";
    import { goBack, updateCurrentState } from "$lib/utils/page-history";
    import { pageStateStore, libraryStore } from "../../../../stores";
    import { addSeriesToLibrary, removeSeriesFromLibrary } from "$lib/utils/library";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';

    import Episodes from "./tabs/Episodes.svelte";
    import Info from "./tabs/Info.svelte";

    let activeTab = "episodes";
    
    $: series = $pageStateStore.seriesDetailPage.series!;
    $: isSeriesInLibrary = series.id in $libraryStore.series;

    function onEpisodeListScroll(event: Event) {
        const position = (event.target as HTMLElement).scrollTop;
        $pageStateStore.seriesDetailPage.episodeListVerticalScrollPosition = position;

        updateCurrentState();
    }

    const debouncedOnEpisodeListScroll = debounce(onEpisodeListScroll, 500);
</script>

<style>
    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }

    .content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
    }

    .tab-bar {
        margin-top: 60px;
    }
</style>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" on:click={goBack}>arrow_back</IconButton>

                {#if series}
                    <Title>{series?.title}</Title>
                {/if}
            </Section>

            <Section align="end">
                {#if !isSeriesInLibrary}
                    <IconButton class="material-icons" on:click={function() {addSeriesToLibrary(series);}}>bookmark_border</IconButton>
                {:else}
                    <IconButton class="material-icons" on:click={function() {removeSeriesFromLibrary(series);}}>bookmark</IconButton>
                {/if}
            </Section>
        </Row>
    </TopAppBar>
</div>

{#key isSeriesInLibrary}
    <div class="content">
        <div class="tab-bar">
            <TabBar tabs={["episodes", "info"]} let:tab bind:active={activeTab}>
                <Tab {tab}>
                <Label>{$_(`seriesDetail.${tab}`)}</Label>
                </Tab>
            </TabBar>
        </div>

        {#if activeTab == "episodes"}
            <Episodes {series} beginningVerticalScrollPosition={$pageStateStore.seriesDetailPage.episodeListVerticalScrollPosition} on:scroll={debouncedOnEpisodeListScroll} bind:reversed={$pageStateStore.seriesDetailPage.reversed}/>
        {:else if activeTab == "info"}
            <Info {series}/>
        {/if}
    </div>
{/key}