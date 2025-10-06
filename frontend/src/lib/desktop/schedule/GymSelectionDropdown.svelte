<script lang="ts">
    import { showGymSelectionDropdown } from '$stores/overlay-store';
    import { selected } from '$stores/selected-store';

    function onOutsideClick(event: MouseEvent) {
        event.stopPropagation()
        $showGymSelectionDropdown = false
    }
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onOutsideClick} class="fixed inset-0 bg-gray-400/30 z-40">
</div>

<div class="absolute flex bottom-full z-50 gap-x-2 p-1 mb-1 bg-white outline-1 outline-gray-400/90 rounded-full">
</div>