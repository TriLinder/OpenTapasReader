<script lang="ts">
    import debounce from "lodash.debounce";
    import { getSearchResults } from "$lib/utils/api/search";
    import type { Series } from "$lib/types";

    import SeriesCard from "$lib/components/ui/SeriesCard.svelte";

    let query = "";
    let searchResults: Record<string, Series[]> = {};

    $: trimmedQuery = query.trim();

    async function fetchResults() {
        if (trimmedQuery.length >= 2) {
            console.log(`Searching for ${query}`);

            searchResults[trimmedQuery] = await getSearchResults(trimmedQuery);
        }
    }

    const debouncedFetchResults = debounce(fetchResults, 300);
</script>

<input type="text" bind:value={query} on:input={debouncedFetchResults}>

{#if searchResults[query]}
    {#each searchResults[query] as series (series.id)}
        <SeriesCard {series}/>
    {:else}
        <p>No search results found.</p>
    {/each}
{:else}
    {#if trimmedQuery.length < 2}
        <p>Please enter at least 2 characters.</p>
    {:else}
        <p>Loading..</p>
    {/if}
{/if}