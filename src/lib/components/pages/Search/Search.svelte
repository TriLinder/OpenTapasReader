<script lang="ts">
    import { _ } from "svelte-i18n";

    import debounce from "lodash.debounce";
    import { getSearchResults } from "$lib/utils/api/search";
    import { goBack } from "$lib/utils/page-history";
    import type { Series } from "$lib/types";

    import TopAppBar, { Row, Section, Title, AutoAdjust} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';
    import CircularProgress from '@smui/circular-progress';
    import SeriesCard from "$lib/components/ui/SeriesCard.svelte";

    let query = "";
    let searchResults: Record<string, Series[]> = {};
    let errorString = "";

    $: trimmedQuery = query.trim();

    async function fetchResults() {
        if (trimmedQuery.length >= 2) {
            console.log(`Searching for: ${query}`);

            try {
                searchResults[trimmedQuery] = await getSearchResults(trimmedQuery);
            } catch (error: any) {
                errorString = error;
                return;
            }
        }
    }

    const debouncedFetchResults = debounce(fetchResults, 800);
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

    .query-input {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .information {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
    }
</style>

<div class="app-bar">
    <TopAppBar variant="standard">
        <Row>
            <Section>
                <IconButton class="material-icons" on:click={goBack}>arrow_back</IconButton>
                <Title>{$_("search.title")}</Title>
            </Section>
        </Row>
    </TopAppBar>
</div>

<div class="content">
    <div class="query-input">
        <Textfield style="width: 80%" label={$_("search.searchQuery")} bind:value={query} on:input={debouncedFetchResults}/>
    </div>

    {#if searchResults[trimmedQuery]}
        {#each searchResults[trimmedQuery] as series (series.id)}
            <SeriesCard {series}/>
        {:else}
            <div class="information">
                <p>{$_("search.messages.noResults")}</p>
            </div>
        {/each}
    {:else}
        <div class="information">
            {#if errorString}
                <p style="color: red;">{errorString}</p>
            {/if}

            {#if trimmedQuery.length < 2}
                <p>{$_("search.messages.queryTooShort", {values: {minimumCharacterCount: 2}})}</p>
            {:else}
                <CircularProgress style="height: 42px; width: 42px;" indeterminate />
            {/if}
        </div>
    {/if}
</div>