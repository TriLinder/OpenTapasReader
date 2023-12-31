<script lang="ts">
    import { _ } from "svelte-i18n";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import PageDrawer from "$lib/components/ui/PageDrawer.svelte";
    import OpenDependencyAcknowledgmentsButton from "./components/OpenDependencyAcknowledgmentsButton.svelte";

    let isDrawerOpen = false;

    const isPrideMonth = (new Date().getMonth() + 1) == 6; // June, the sixth month, is pride month
</script>

<style>
    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 100vh;
        
        position: absolute;
        left: 0;
        top: 0;
    }

    .content {
        display: flex;
        flex-direction: column;
        
        gap: 12px;
        
        width: 90vw;
        max-width: 500px;

        align-items: center;
    }

    .pride-wordmark {
        background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20777%20480%22%3E %20%20%3Cpath%20fill%3D%22%23770088%22%20d%3D%22M0%200h777v480H0z%22%2F%3E %20%20%3Cpath%20fill%3D%22%23004CFF%22%20d%3D%22M0%200h777v400H0z%22%2F%3E %20%20%3Cpath%20fill%3D%22%23028121%22%20d%3D%22M0%200h777v320H0z%22%2F%3E %20%20%3Cpath%20fill%3D%22%23FFEE00%22%20d%3D%22M0%200h777v240H0z%22%2F%3E %20%20%3Cpath%20fill%3D%22%23FF8D00%22%20d%3D%22M0%200h777v160H0z%22%2F%3E %20%20%3Cpath%20fill%3D%22%23E50000%22%20d%3D%22M0%200h777v80H0z%22%2F%3E %3C%2Fsvg%3E");
        background-repeat: repeat-x;
        background-position: right;
        background-size: 100px 100px;
        padding: 15px;
    }

    hr {
        width: 100%;
    }
</style>

<PageDrawer bind:isOpen={isDrawerOpen}/>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" aria-label="Open drawer" on:click={function() {isDrawerOpen = true;}}>menu</IconButton>
                <Title>{$_("about.title")}</Title>
            </Section>
        </Row>
    </TopAppBar>
</div>

<div class="center">
    <div class="content">
        <img class="wordmark" class:pride-wordmark={isPrideMonth} src={"/wordmark.svg"} alt="App wordmark">

        <hr>

        <a href="http://tapas.io/app" target="_blank" rel="noopener noreferrer">{$_("about.downloadOfficalApp")}</a>
        <a href="https://github.com/TriLinder/OpenTapasReader" target="_blank" rel="noopener noreferrer">{$_("about.sourceCode")}</a>

        <OpenDependencyAcknowledgmentsButton/>
    </div>
</div>