<script lang="ts">
    import type { Gym } from '$lib/types'

	import { GymStore } from '$stores/gym-store'
	import { selected } from '$stores/selected-store';
	import DatePickerMobile from './DatePickerMobile.svelte';
	import ScheduleButtonMobile from './ScheduleButtonMobile.svelte';

    let openingHour = $derived($selected.gym?.opening_time.getHours() || 0)
    let closingHour = $derived($selected.gym?.closing_time.getHours() || 0)

    function handleClick(index: number) {
        const hour = index + openingHour

        if (hour === $selected.startHour) { // button is same as start button -> unselect
            $selected.startHour = null
            if ($selected.endHour) { // end moves to start
                $selected.startHour = $selected.endHour
                $selected.endHour = null
            }
        } else if (hour === $selected.endHour) { // button is same as end button -> unselect
            $selected.endHour = null
        } else if ($selected.startHour === null && $selected.endHour === null) { // both not set -> set start
            $selected.startHour = hour
        } else if ($selected.startHour !== null && $selected.endHour === null) { // start set, end not set -> set end
            if (hour > $selected.startHour) { // button after start -> set button as end
                $selected.endHour = hour
            } else { // button before start -> move start to end, set button as start
                $selected.endHour = $selected.startHour
                $selected.startHour = hour
            }
        }
    }
    
    function onclear() {
        selected.update(sel => ({
            ...sel,
            startHour: null,
            endHour: null
        }))
    }
    
    function isHighlighted(index: number) {
        const hour = index + openingHour
        // is start or end
        if ($selected.startHour === hour || $selected.endHour === hour) {
            return true
        }
        // between selected
        if ($selected.startHour !== null && $selected.endHour !== null) {
            return (hour >= $selected.startHour && hour <= $selected.endHour)
        }   
        return false
    }
        
</script>


<div class="flex flex-col w-full justify-center items-center gap-y-8">
        
    <DatePickerMobile />

    <div class="w-full bg-gray-200 p-4 rounded-lg shadow-lg">
        <div class="grid grid-cols-5 gap-y-4 justify-items-center">
            
            {#if $selected.gym === null}
                <p class="text-l"> Please select a gym to view available time slots. </p>
            {:else}
                {#each {length: closingHour - openingHour + 1} as _, i}

                    {#if isHighlighted(i)}
                        <button onclick={() => handleClick(i)} type="button" class="bg-blue-400 py-2 px-3 min-w-10 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-blue-400 focus:outline-hidden focus:bg-blue-400 disabled:opacity-50 disabled:pointer-events-none">
                            {i + openingHour}
                        </button>        
                        {:else}
                        <button onclick={() => handleClick(i)} type="button" class="bg-blue-600 py-2 px-3 min-w-10 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-blue-600 focus:outline-hidden focus:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none">
                            {i + openingHour}
                        </button>
                    {/if}
                
                {/each}
            {/if}
            
        </div>
    </div>
    
    <div class="flex w-full justify-between">
        
        <button onclick={onclear} type="button" class="py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-400 text-white hover:bg-blue-500 focus:outline-hidden focus:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none">
            Clear Selection
        </button>
        
        <ScheduleButtonMobile
            {onclear}
        />
        
    </div>

</div>