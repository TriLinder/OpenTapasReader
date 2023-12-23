<script lang="ts">
    import { pageStateStore } from "../../../../stores";

    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';

    let activeTab = "episodes";
    $: series = $pageStateStore.seriesDetailPageSeries!;
</script>

<style>
    h1 {
        text-align: center;
    }

    .overview-information {
        display: flex;
        justify-content: center;
    }
</style>

<div class="overview-information">
    <h1>{series.title}</h1>
</div>

<TabBar tabs={["episodes", "detail"]} let:tab bind:active={activeTab}>
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
</TabBar>

{#if activeTab == "episodes"}
    episodes
{:else if activeTab == "detail"}
    detail
{/if}