<script lang="ts">
	import type { Gym } from '$lib/types';
	import { GymStore } from '$stores/gym-store';
    import { showGymSelectionDropdown } from '$stores/overlay-store';
    import { selected } from '$stores/selected-store';

    function onOutsideClick(event: MouseEvent) {
        event.stopPropagation()
        $showGymSelectionDropdown = false
    }

    function onGymSelect(event: MouseEvent, gym: Gym) {
        event.stopPropagation()
        $selected.gym = gym
        $showGymSelectionDropdown = false
    }
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onOutsideClick} class="fixed inset-0 bg-gray-400/30 z-40">
</div>

<div class="absolute flex flex-col top-0 left-0 w-fit max-h-50 overflow-y-auto z-50 gap-x-2 p-2 bg-white outline-1 gap-y-1 outline-gray-400/90 rounded-lg shadow-lg">
    {#each $GymStore as gym}

        <button onclick={(e) => onGymSelect(e, gym)} type="button" class="w-full whitespace-nowrap text-sm text-black px-2 py-1 rounded-lg border border-gray-400/90 hover:bg-gray-200 focus:outline-none">
            {gym.name}
        </button>

    {/each}        

</div>