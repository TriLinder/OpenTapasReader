<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { getEpisodeComments, getCommentReplies } from '$lib/utils/api/comments';
    import { onMount } from 'svelte';
    import type { Comment } from '$lib/types';

    import Chip, { Set, Text } from '@smui/chips';
    import CircularProgress from '@smui/circular-progress';
    import Card from '@smui/card';
    import Button from '@smui/button';
    import CommentComponent from '$lib/components/ui/Comment.svelte';

    let comments: Comment[] = [];
    let sort: "best" | "newest" | "oldest" = "best";
    let page = 1;
    let hasNextPage = false;
    let loading = false;

    export let episodeId: number;
    export let parentCommentId: number | null = null;
    export let showSortingSelection = false;

    async function loadNextPage() {
        // Make sure we're not doing this twice at the same time
        if (loading) {
            return;
        }

        loading = true;
        
        try {
            // Either show comments on an episode, or replies to another comments
            const response = parentCommentId
                ? await getCommentReplies(episodeId, parentCommentId, page)
                : await getEpisodeComments(episodeId, page, sort);

            hasNextPage = response.hasNextPage;

            // Concatenate new comments to the existing ones
            comments = [...comments, ...response.comments];

            // Increment the page number
            page += 1;
            loading = false;
        } catch(error: any) {
            // Handle errors
            console.error(error);
            alert(error);
            loading = false;
            return;
        }
    }

    function onSortTypeChange() {
        // Reset everything
        if (!sort) {
            sort = "best";
        }

        comments = [];
        page = 1;
        hasNextPage = false;

        // Load the first page
        loadNextPage();
    }

    onMount(function() {
        loadNextPage();
    });
</script>

<style>
    .loading {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .sorting-selection {
        display: flex;
        justify-content: right;
    }

    .disabled {
        pointer-events: none;
        filter: opacity(0.5);
    }

    .comments {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>

<!-- Sorting selection UI -->
{#if showSortingSelection && (!parentCommentId)}
    <div class="sorting-selection" class:disabled={loading}>
        <Set chips={["best", "newest", "oldest"]} choice on:click={onSortTypeChange} let:chip bind:selected={sort}>
            <Chip {chip}>
                <Text>{$_(`comments.sortTypes.${chip}`)}</Text>
            </Chip>
        </Set>
    </div>
{/if}

<!-- Comments -->
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

<!-- Load next page button -->
{#if hasNextPage}
    <div class="load-next-page">
        <Card padded variant="outlined">
            <Button variant="raised" on:click={loadNextPage} bind:disabled={loading}>{$_("comments.loadNextPage")}</Button>
        </Card>
    </div>
{/if}