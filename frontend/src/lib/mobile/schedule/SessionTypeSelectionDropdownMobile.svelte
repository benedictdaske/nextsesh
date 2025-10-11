<script lang="ts">
	import { sessionTypeKeys } from '$lib/sessionTypes';
	import { humanize } from '$lib/utils/strings';
    import { showSessionTypeSelectionDropdown } from '$stores/overlay-store';
    import { selected } from '$stores/selected-store';

    function onOutsideClick(event: MouseEvent) {
        event.stopPropagation()
        $showSessionTypeSelectionDropdown = false
    }

    function onTypeSelect(event: MouseEvent, type: string) {
        event.stopPropagation()
        $selected.sessionType.types[type] = !$selected.sessionType.types[type]
        $selected.sessionType.set += $selected.sessionType.types[type] ? 1 : -1
    }

    function onUnselectAll(event: MouseEvent) {
        event.stopPropagation()
        sessionTypeKeys.forEach(type => {
            $selected.sessionType.types[type] = false
        })
        $selected.sessionType.set = 0
    }
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onOutsideClick} class="fixed inset-0 bg-gray-400/30 z-40">
</div>

<div class="absolute flex flex-col top-0 right-0 w-fit max-h-50 overflow-y-auto z-50 gap-x-2 p-2 bg-white outline-1 gap-y-1 outline-gray-400/90 rounded-lg shadow-lg">
    <button onclick={(e) => onUnselectAll(e)} type="button" class="w-full text-sm px-2 py-1 rounded-lg bg-red-200 text-gray-700 hover:bg-red-300 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
        Unselect All
    </button>

    {#each sessionTypeKeys as type}

        <button onclick={(e) => onTypeSelect(e, type)} type="button" class="{$selected.sessionType.types[type] ? 'bg-gray-300 hover:bg-gray-300' : 'hover:bg-gray-200'} w-full whitespace-nowrap text-sm text-black px-2 py-1 rounded-lg border border-gray-400/90 focus:outline-none">
            {humanize(type)}
        </button>

    {/each}        

</div>