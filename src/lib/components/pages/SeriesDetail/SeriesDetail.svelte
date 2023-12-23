<script lang="ts">
    import { pageStateStore } from "../../../../stores";
    import { onMount } from "svelte";

    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Episodes from "./Episodes.svelte";

    let activeTab = "episodes";
    $: series = $pageStateStore.seriesDetailPageSeries!;
    $: isBookmarked = false;

    onMount(function() {
        
    });
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
    <Episodes {series}/>
{:else if activeTab == "detail"}
    detail
{/if}