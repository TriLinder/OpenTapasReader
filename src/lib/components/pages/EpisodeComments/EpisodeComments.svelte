<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { goBack } from '$lib/utils/page-history';
    import { pageStateStore } from '../../../../stores';
    import { getEpisodeComments } from '$lib/utils/api/comments';

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    $: episodeId = $pageStateStore.episodeCommentsPageEpisode!.episodeId;

    async function load() {
        const comments = await getEpisodeComments(episodeId, 1, "best");

        console.log(comments);
    }
</script>

<style>
    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
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

<br><br><br><br><br><br><br><br>
<button on:click={load}>LOAD</button>