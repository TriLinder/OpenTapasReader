<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { loadEpisode } from "$lib/utils/api/episode";
    import { goBack, commitToHistory } from "$lib/utils/page-history";
    import { pageStateStore } from "../../../../stores";
    import type { Episode } from "$lib/types";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import EpisodeDownloadButton from "$lib/components/ui/EpisodeDownloadButton.svelte";
    import Card from '@smui/card';
    import Button from '@smui/button';
    import Image from "$lib/components/media/Image.svelte";

    let episode: Episode | null = null;

    async function load() {
        episode = await loadEpisode($pageStateStore.episodeDetailPageEpsiode!.seriesId, $pageStateStore.episodeDetailPageEpsiode!.episodeId);
    }

    function previousEpisode() {
        if (episode?.previousEpisodeId) {
            $pageStateStore.episodeDetailPageEpsiode!.episodeId = episode.previousEpisodeId;
            episode = null;
        }
    }

    function nextEpisode() {
        if (episode?.nextEpisodeId) {
            $pageStateStore.episodeDetailPageEpsiode!.episodeId = episode.nextEpisodeId;
            episode = null;
        }
    }

    function openComments() {
        $pageStateStore.episodeCommentsPageEpisode = $pageStateStore.episodeDetailPageEpsiode;
        $pageStateStore.currentPage = "episodeComments";
        commitToHistory();
    }

    const unsubsrcibe = pageStateStore.subscribe(function() {
        if ($pageStateStore.currentPage == "episodeDetail") {
            load();
        }
    });

    onMount(async function() {
        load();
    });

    onDestroy(function() {
        unsubsrcibe();
    });
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;

        position: absolute;
        top: 56px;
        left: 0;
        width: 100%;

        overflow-x: hidden;
    }

    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }

    .continue-next-episode {
        text-align: center;
        margin-top: 25px;
    }

    .description {
        margin-left: 15px;
        margin-right: 15px;
    }

    h2 {
        text-align: center;
    }
</style>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" on:click={goBack}>arrow_back</IconButton>

                {#if episode}
                    <Title>{episode?.title}</Title>
                {/if}
            </Section>

            <Section align="end">
                {#if episode}
                    <EpisodeDownloadButton {episode}/>
                    <IconButton class="material-icons" on:click={openComments} disabled={!episode}>comments</IconButton>
                {/if}
                <IconButton class="material-icons" on:click={previousEpisode} disabled={!episode?.previousEpisodeId}>navigate_before</IconButton>
                <IconButton class="material-icons" on:click={nextEpisode} disabled={!episode?.nextEpisodeId}>navigate_next</IconButton>
            </Section>
        </Row>
    </TopAppBar>
</div>

{#if episode}
    <div class="content">
        {#key (episode.id)}
            {#each episode.contentImageUrls as imgSrc}
                <Image src={imgSrc}/>
            {/each}
        {/key}

        <div class="description">
            <h2>Description:</h2>
            <p>{episode.description}</p>
        </div>

        {#if episode.nextEpisodeId}
            <div class="continue-next-episode">
                <Card padded variant="outlined">
                    <p>Continue to the next episode!</p>
                    <Button variant="raised" on:click={nextEpisode}>Next episode</Button>
                </Card>
            </div>
        {/if}
    </div>
{/if}