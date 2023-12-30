<script lang="ts">
    import { isAppLoadingStore } from "../../../../stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    import { initI18n } from "$lib/i18n";

    function loaded() {
        // Loaded!
        $isAppLoadingStore = false;
    }

    onMount(async function() {
        if (browser) {
            await initI18n();
            loaded();
        }
    });
</script>

<style>
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

    .word-mark-container {
        width: 80vw;
        max-width: 500px;
        height: auto;
    }
</style>

<div class="center">
    <div class="word-mark-container">
        <img src={"/wordmark.svg"} alt="Loading screen wordmark"/>
    </div>
</div>