<script lang="ts">
    import { goBack } from "$lib/utils/page-history";
    import { pageStateStore } from "../../../../stores";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Episodes from "./Episodes.svelte";

    let activeTab = "episodes";
    $: series = $pageStateStore.seriesDetailPageSeries!;
</script>

<style>
    h1 {
        text-align: center;
    }

    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }

    .content {
        margin-top: 70px;
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
                <IconButton class="material-icons">bookmark</IconButton>
            </Section>
        </Row>
    </TopAppBar>
</div>

<div class="content">
    <TabBar tabs={["episodes", "detail"]} let:tab bind:active={activeTab}>
        <Tab {tab}>
        <Label>{tab}</Label>
        </Tab>
    </TabBar>

    {#if activeTab == "episodes"}
        <Episodes {series}/>
    {:else if activeTab == "detail"}
        detail
    {/if}
</div>