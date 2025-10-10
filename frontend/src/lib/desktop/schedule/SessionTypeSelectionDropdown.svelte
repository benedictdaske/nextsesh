<script lang="ts">
	import { sessionTypeKeys } from '$lib/sessionTypes';
	import type { SessionType } from '$lib/types';
    import { showSessionTypeSelectionDropdown } from '$stores/overlay-store';
    import { selected } from '$stores/selected-store';

    let sessionType: SessionType = $state({
        set: false,
        types: Object.fromEntries(sessionTypeKeys.map(t => [t, false]))
    })
    $inspect(sessionType)

    function onOutsideClick(event: MouseEvent) {
        event.stopPropagation()
        $showSessionTypeSelectionDropdown = false
    }

    function onTypeSelect(event: MouseEvent, type: string) {
        event.stopPropagation()
        sessionType.types[type] = !sessionType.types[type]
        $showSessionTypeSelectionDropdown = false
    }
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onOutsideClick} class="fixed inset-0 bg-gray-400/30 z-40">
</div>

<div class="absolute flex flex-col top-0 right-0 w-fit max-h-50 overflow-y-auto z-50 gap-x-2 p-2 bg-white outline-1 gap-y-1 outline-gray-400/90 rounded-lg shadow-lg">
    {#each sessionTypeKeys as type}

        <button onclick={(e) => onTypeSelect(e, type)} type="button" class="w-full whitespace-nowrap text-sm text-black px-2 py-1 rounded-lg border border-gray-400/90 hover:bg-gray-200 focus:outline-none"
            class:bg-gray-300={sessionType.types[type]}>
            {type}
        </button>

    {/each}        

</div>