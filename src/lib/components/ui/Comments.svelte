<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { getEpisodeComments } from '$lib/utils/api/comments';
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
    let onLastPage = false;
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

    function onSortTypeChange() {
        // Reset everything
        if (!sort) {
            sort = "best";
        }

        comments = [];
        page = 1;
        onLastPage = false;

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
</style>

{#if showSortingSelection}
    <div class="sorting-selection" class:disabled={loading}>
        <Set chips={["best", "newest", "oldest"]} choice on:click={onSortTypeChange} let:chip bind:selected={sort}>
            <Chip {chip}>
                <Text>{chip}</Text>
            </Chip>
        </Set>
    </div>
{/if}

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