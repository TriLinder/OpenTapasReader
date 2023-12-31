<script lang="ts">
    import { _ } from "svelte-i18n";

    import TopAppBar, { Row, Section, Title as AppBarTitle, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Paper, { Title as PaperTitle, Content } from '@smui/paper';
    import PageDrawer from "$lib/components/ui/PageDrawer.svelte";

    import LanguageSelect from "./components/LanguageSelect.svelte";
    import ShowProfilePicturesSwitch from "./components/ShowProfilePicturesSwitch.svelte";
    import ResetReadEpisodesButton from "./components/ResetReadEpisodesButton.svelte";
    import DeleteOfflineMediaButton from "./components/DeleteOfflineMediaButton.svelte";

    let isDrawerOpen = false;
</script>

<style>
    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }

    .content {
        margin-top: 60px;
    }

    .settings {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>

<PageDrawer bind:isOpen={isDrawerOpen}/>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" aria-label="Open drawer" on:click={function() {isDrawerOpen = true;}}>menu</IconButton>
                <AppBarTitle>{$_("settings.title")}</AppBarTitle>
            </Section>
        </Row>
    </TopAppBar>
</div>

<div class="content">
    <Paper variant="unelevated">
        <PaperTitle>{$_("settings.title")}</PaperTitle>
        <Content>
            <div class="settings">
                <LanguageSelect/>
                <ShowProfilePicturesSwitch/>
                <ResetReadEpisodesButton/>
                <DeleteOfflineMediaButton/>
            </div>
        </Content>
    </Paper>
</div>