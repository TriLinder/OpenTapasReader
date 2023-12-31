<script lang="ts">
    import { _ } from "svelte-i18n";

    import { goBack } from "$lib/utils/page-history";
    import { onMount } from "svelte";

    import TopAppBar, { Row, Section, Title as AppBarTitle, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Paper, { Title as PaperTitle, Subtitle, Content } from '@smui/paper';
    import Ripple from '@smui/ripple';

    type Dependency = {
        name: string;
        author: string | null;
        description: string | null;
        version: string;
        license: string;
        url: string;
    }

    let dependencies: Dependency[] = [];

    async function load() {
        const response = await fetch("/dependencies.json");
        dependencies = await response.json();
    }

    function openUrl(url: string) {
        window.open(url, "_blank");
    }

    onMount(load);
</script>

<style>
    .app-bar {
        position: absolute;
        left: 0;
        top: 0;
    }

    .dependencies {
        margin-top: 70px;
    }

    .dependency {
        margin-top: 18px !important;
    }
</style>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" on:click={goBack}>arrow_back</IconButton>
                <AppBarTitle>{$_("dependencyAcknowledgments.title")}</AppBarTitle>
            </Section>
        </Row>
    </TopAppBar>
</div>

<div class="dependencies">
    {#each dependencies as dependency}
        <div class="dependency" use:Ripple={{ surface: true }} on:click={function() {openUrl(dependency.url);}} on:keypress tabindex="0" role="button">
            <Paper variant="outlined">
                <PaperTitle>{dependency.name}</PaperTitle>
                <Subtitle>{@html $_("dependencyAcknowledgments.author", {values: {author: dependency.author}})}</Subtitle>
                <Subtitle>{@html $_("dependencyAcknowledgments.license", {values: {license: dependency.license}})}</Subtitle>
                <Subtitle>{@html $_("dependencyAcknowledgments.version", {values: {version: dependency.version}})}</Subtitle>

                <Content>
                    {dependency.description}
                </Content>
            </Paper>
        </div>
    {/each}
</div>