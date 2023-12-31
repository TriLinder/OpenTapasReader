<script lang="ts">
    import { _, date, time } from "svelte-i18n";

    import { onMount, onDestroy } from "svelte";
    import { loadEpisode } from "$lib/utils/api/episode";
    import { goBack, commitToHistory, updateCurrentState } from "$lib/utils/page-history";
    import { pageStateStore, readEpisodesStore } from "../../../../stores";
    import type { Episode } from "$lib/types";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import EpisodeDownloadButton from "$lib/components/ui/EpisodeDownloadButton.svelte";
    import Card from '@smui/card';
    import Button from '@smui/button';
    import Image from "$lib/components/media/Image.svelte";

    let episode: Episode | null = null;
    $: isEpisodeAvailable = episode && episode.isFree && (!episode.scheduledDate || new Date().getTime() > new Date(episode.scheduledDate).getTime());

    function markEpisodeAsRead() {
        if (!episode) {return};

        if (!(episode.seriesId in $readEpisodesStore.series)) {
            $readEpisodesStore.series[episode.seriesId] = {lastReadEpisode: null, readEpisodes: []};
        }

        $readEpisodesStore.series[episode.seriesId].lastReadEpisode = episode;
        
        if (!($readEpisodesStore.series[episode.seriesId].readEpisodes.includes(episode.id))) {
            $readEpisodesStore.series[episode.seriesId].readEpisodes.push(episode.id);
        }
    }

    async function load() {
        try {
            episode = await loadEpisode($pageStateStore.episodeDetailPageEpsiode!.seriesId, $pageStateStore.episodeDetailPageEpsiode!.episodeId);
            markEpisodeAsRead();
        } catch(error: any) {
            console.error(error);
            alert(error);
            return;
        }
    }

    function previousEpisode() {
        if (episode?.previousEpisodeId) {
            $pageStateStore.episodeDetailPageEpsiode!.episodeId = episode.previousEpisodeId;
            episode = null;
            
            updateCurrentState();
        }
    }

    function nextEpisode() {
        if (episode?.nextEpisodeId) {
            $pageStateStore.episodeDetailPageEpsiode!.episodeId = episode.nextEpisodeId;
            episode = null;

            updateCurrentState();
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

    onMount(load);
    onDestroy(unsubsrcibe);
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
        text-transform: capitalize;
    }

    .episode-not-available {
        margin-top: 40px;
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
                {#if episode && isEpisodeAvailable}
                    <EpisodeDownloadButton {episode}/>
                    <IconButton class="material-icons" on:click={openComments}>comments</IconButton>
                {/if}
                <IconButton class="material-icons" on:click={previousEpisode} disabled={!episode?.previousEpisodeId}>navigate_before</IconButton>
                <IconButton class="material-icons" on:click={nextEpisode} disabled={!episode?.nextEpisodeId}>navigate_next</IconButton>
            </Section>
        </Row>
    </TopAppBar>
</div>

{#if episode}
    <div class="content">
        {#if isEpisodeAvailable}
            <!-- Episode's images -->
            {#key (episode.id)}
                {#each episode.contentImageUrls as imgSrc}
                    <Image src={imgSrc}/>
                {/each}
            {/key}

            <!-- The description -->
            <div class="description">
                <h2>{$_("episodeDetail.description")}</h2>
                <p>{episode.description}</p>
            </div>

            <!-- Show a button to continue to the next episode (if it exists) -->
            {#if episode.nextEpisodeId}
                <div class="continue-next-episode">
                    <Card padded variant="outlined">
                        <p>{$_("episodeDetail.continueToNextEpisodeText")}</p>
                        <Button variant="raised" on:click={nextEpisode}>{$_("episodeDetail.continueToNextEpisodeButton")}</Button>
                    </Card>
                </div>
            {/if}

        {:else}
            <!-- Episode not available yet -->
            <div class="episode-not-available">
                <Card padded variant="outlined">
                    <p>{$_("episodeDetail.notAvailableYet")}</p>

                    {#if episode.scheduledDate}
                        <span>{@html $_("episodeDetail.releaseDate", {values: {date: $date(new Date(episode.scheduledDate), {format: "long"}), time: $time(new Date(episode.scheduledDate))}})}</span>
                    {/if}
                </Card>
            </div>
        {/if}
    </div>
{/if}