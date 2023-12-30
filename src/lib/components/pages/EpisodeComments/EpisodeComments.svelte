<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { goBack } from '$lib/utils/page-history';
    import { pageStateStore } from '../../../../stores';
    import { getEpisodeComments } from '$lib/utils/api/comments';
    import { onMount } from 'svelte';
    import type { Comment } from '$lib/types';

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import CircularProgress from '@smui/circular-progress';
    import Card from '@smui/card';
    import Button from '@smui/button';
    import CommentComponent from '$lib/components/ui/Comment.svelte';

    let comments: Comment[] = [];
    let sort: "best" | "newest" | "oldest" = "best";
    let page = 1;
    let onLastPage = false;

    let loading = false;

    $: episodeId = $pageStateStore.episodeCommentsPageEpisode!.episodeId;

    async function loadNextPage() {
        // Make sure we're not doing this twice at the same time
        if (loading) {
            return;
        }

        loading = true;
        
        try {
            const newComments = await getEpisodeComments(episodeId, page, sort);
            comments = comments.concat(newComments);
            
            if (newComments.length == 0) {
                onLastPage = true;
            }

            page += 1;
            loading = false;
        } catch(error: any) {
            console.error(error);
            alert(error);
            loading = false;
            return;
        }
    }

    onMount(function() {
        loadNextPage();
    });
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

    .loading {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" on:click={goBack}>arrow_back</IconButton>

                <Title>{$_("episodeComments.title")}</Title>
            </Section>

            <Section align="end"></Section>
        </Row>
    </TopAppBar>
</div>

<div class="content">
    <div class="comments">
        {#each comments as comment}
            <CommentComponent {comment}/>
        {/each}

        {#if loading}
            <div class="loading">
                <CircularProgress style="height: 42px; width: 42px;" indeterminate/>
            </div>
        {/if}
    </div>

    {#if !onLastPage}
        <div class="load-next-page">
            <Card padded variant="outlined">
                <Button variant="raised" on:click={loadNextPage} bind:disabled={loading}>{$_("episodeComments.loadNextPage")}</Button>
            </Card>
        </div>
    {/if}
</div>