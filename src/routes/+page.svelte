<script lang="ts">
    import { CapacitorHttp } from '@capacitor/core';

    let data = "";

    async function testCapacitorHttp() {
        const response = await CapacitorHttp.get({url: "https://jsonplaceholder.typicode.com/posts/1"});

        data = JSON.stringify(response.data);
    }
</script>

<h1>Hello, world!</h1>
<button on:click={testCapacitorHttp}>CapacitorHTTP</button> <br>
<code>{data}</code>