<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { configurationStore } from '../../../../../stores';
    import Select, { Option } from '@smui/select';

    type Language = {
        slug: string,
        label: string
    }

    const languages: Language[] = [
        {
            slug: "en",
            label: "English"
        },
        {
            slug: "cs",
            label: "Čeština"
        }
    ]
</script>

<Select bind:value={$configurationStore.language} label={$_("settings.language")}>
    {#each languages as language}
        <Option value={language.slug}>{language.label}</Option>
    {/each}
</Select>