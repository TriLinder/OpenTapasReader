<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { commitToHistory } from '$lib/utils/page-history';
    import { pageStateStore } from "../../../stores";
    import type { PageStateStore } from '$lib/types';

    import Drawer, { Content, Header, Title, Subtitle} from '@smui/drawer';
    import List, { Item, Text, Graphic } from '@smui/list';

    export let isOpen = true;

    function setPage(page: PageStateStore["currentPage"]) {
        $pageStateStore.currentPage = page;
        isOpen = false;
        commitToHistory();
    }

    type Page = {
        pageSlug: PageStateStore["currentPage"];
        icon: string;
    }

    const pages: Page[] = [
        {
            pageSlug: "library",
            icon: "view_agenda"
        },
        {
            pageSlug: "settings",
            icon: "settings"
        },
        {
            pageSlug: "about",
            icon: "info"
        }
    ];
</script>

<style>
    .drawer-container {
        position: absolute;
        top: 0;

        z-index: 6;
    }

    .scrim {
        position: absolute;
        left: 0;
        top: 0;

        width: 100%;
        height: 100%;
        
        z-index: 500;
        background-color: rgb(0, 0, 0, 0.25);

        z-index: 5;
    }
</style>

<div class="drawer-container">
    <Drawer variant="modal" open={isOpen} fixed={true}>
        <Header>
            <Title>{$_("general.appName")}</Title>
            <Subtitle>{$_("general.appMotto")}</Subtitle>
        </Header>

        <Content>
            <List>
                {#each pages as page (page.pageSlug)}
                    <Item on:click={function() {setPage(page.pageSlug);}} activated={$pageStateStore.currentPage == page.pageSlug}>
                        <Graphic class="material-icons" aria-hidden="true">{page.icon}</Graphic>
                        <Text>{$_(`${page.pageSlug}.title`)}</Text>
                    </Item>
                {/each}
            </List>
        </Content>
    </Drawer>
</div>

{#if isOpen}
    <div class="scrim" tabindex="-1" on:click={function() {isOpen = false;}} />
{/if}