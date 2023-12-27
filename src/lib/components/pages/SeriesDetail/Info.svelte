<script lang="ts">
    import { libraryStore } from "../../../../stores";
    import type { Series } from "$lib/types";

    import Image from "$lib/components/media/Image.svelte";

    export let series: Series;
    $: isSeriesInLibrary = series.id in $libraryStore.series;
</script>

<style>
    .content {
        display: flex;
        width: 100%;
        height: 100%;

        margin-top: 15px;

        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .cover-image {
        display: flex;
        width: 55%;
    }

    p {
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 5px;
    }

    h2 {
        text-align: center;
        margin: 0;
        margin-top: 15px;
    }

    .creators {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .creator {
        display: flex;
        align-items: center;
        font-weight: bold;
        gap: 8px;

        padding: 5px;
        border-style: solid;
        border-color: lightgray;
        border-radius: 10px;
    }

    .profile-picture {
        height: 50px;
    }

    .tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .tag {
        background-color: lightgray;
        padding: 5px;
        border-radius: 10px;
        margin: 3px;
    }
</style>

<div class="content">
    <div class="cover-image">
        <Image src={series.coverImageUrl} storeOffline={isSeriesInLibrary}/>
    </div>

    <h2>Description</h2>
    <p class="description">{series.description}</p>

    <h2>Creators</h2>
    <div class="creators">
        {#each series.creators as creator}
            <div class="creator">
                <div class="profile-picture">
                    <Image src={creator.profilePictureUrl} storeOffline={isSeriesInLibrary}/>
                </div>
                
                <span>{creator.displayName}</span>
            </div>
        {/each}
    </div>

    <h2>Tags</h2>
    <div class="tags">
        {#each series.tags as tag}
            <code class="tag">#{tag}</code>
        {/each}
    </div>
</div>