<script lang="ts">
    import { variableStore } from 'svelte-capacitor-store';
    
    const count = variableStore<number>({
        storeName: "counter",
        persist: true,
        initialValue: 0
    });

    function countUp() {
        $count += 1;
    }
</script>

<h1>Hello, world!</h1>

<button on:click={countUp}>Pressed {$count} times</button>