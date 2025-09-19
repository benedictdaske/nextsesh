<script lang="ts">
    import type { Gym, TimePoint } from '$lib/types'
    import { constructTimePoints } from '$lib/utils/datetime'

	import { GymStore } from '$stores/gym-store'
	import { selected } from '$stores/selected-store';
	import DatePickerMobile from './DatePickerMobile.svelte';
	import ScheduleButtonMobile from './ScheduleButtonMobile.svelte';


    let gymTimePoints: TimePoint[] = $derived(constructTimePoints($selected.gym))
    let openingHour = $derived($selected.gym?.opening_time.getHours() || 0)
    let closingHour = $derived($selected.gym?.closing_time.getHours() || 0)

    function handleClick(event: Event, index: number) {
        const button = event.currentTarget as HTMLButtonElement

        if (index === $selected.startButtonIndex) { // button is same as start button -> unselect
            $selected.startButtonIndex = null
            if ($selected.endButtonIndex) { // end moves to start
                $selected.startButtonIndex = $selected.endButtonIndex
                $selected.endButtonIndex = null
            }
        } else if (index === $selected.endButtonIndex) { // button is same as end button -> unselect
            $selected.endButtonIndex = null
        } else if ($selected.startButtonIndex === null && $selected.endButtonIndex === null) { // both not set -> set start
            $selected.startButtonIndex = Number(button.dataset.index)
        } else if ($selected.startButtonIndex !== null && $selected.endButtonIndex === null) { // start set, end not set -> set end
            if ($selected.startButtonIndex !== null && index > $selected.startButtonIndex) { // button after start -> set button as end
                $selected.endButtonIndex = Number(button.dataset.index)
            } else { // button before start -> move start to end, set button as start
                $selected.endButtonIndex = $selected.startButtonIndex
                $selected.startButtonIndex = Number(button.dataset.index)
            }
        }
    }
    
    function onclear() {
        selected.update(sel => ({
            ...sel,
            startButtonIndex: null,
            endButtonIndex: null
        }))
    }
    
    function isHighlighted(index: number) {
        // is start or end
        if ($selected.startButtonIndex === index || $selected.endButtonIndex === index) {
            return true
        }
        // between slected
        if ($selected.startButtonIndex !== null && $selected.endButtonIndex !== null) {
            return index >= Number($selected.startButtonIndex) && index <= Number($selected.endButtonIndex)
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
                        <button onclick={(e) => handleClick(e, i)} type="button" class="bg-blue-400 py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-blue-400 focus:outline-hidden focus:bg-blue-400 disabled:opacity-50 disabled:pointer-events-none">
                            {i + openingHour}
                        </button>                        
                        {:else}
                        <button onclick={(e) => handleClick(e, i)} type="button" class="bg-blue-600 py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-blue-600 focus:outline-hidden focus:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none">
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
            {gymTimePoints}
            {onclear}
        />
        
    </div>

</div>