<script lang="ts">
    import { _ } from "svelte-i18n";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import PageDrawer from "$lib/components/ui/PageDrawer.svelte";

    let isDrawerOpen = false;
</script>

<style>
    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }
</style>

<PageDrawer bind:isOpen={isDrawerOpen}/>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" aria-label="Open drawer" on:click={function() {isDrawerOpen = true;}}>menu</IconButton>
                <Title>{$_("settings.title")}</Title>
            </Section>
        </Row>
    </TopAppBar>
</div>