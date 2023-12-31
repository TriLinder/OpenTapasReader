<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { configurationStore } from '../../../../../stores';

    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
</script>

<FormField>
    <Switch bind:checked={$configurationStore.showProfilePictures}/>
    <span slot="label">{$_("settings.showProfilePictures")}</span>
</FormField>