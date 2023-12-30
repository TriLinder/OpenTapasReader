<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { goBack } from '$lib/utils/page-history';
    import { pageStateStore } from '../../../../stores';

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Comments from '$lib/components/ui/Comments.svelte';

    $: episodeId = $pageStateStore.episodeCommentsPageEpisode!.episodeId;
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
    <Comments {episodeId} showSortingSelection/>
</div>