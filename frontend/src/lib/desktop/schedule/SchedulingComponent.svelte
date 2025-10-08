<script lang="ts">
    import type { Gym, TimePoint } from '$lib/types'
    import { constructTimePoints } from '$lib/utils/datetime'

    import ScheduleButton from '$lib/desktop/schedule/ScheduleButton.svelte'
    import DatePicker from '$lib/desktop/schedule/DatePicker.svelte'
	import { GymStore } from '$stores/gym-store'
	import { selected } from '$stores/selected-store';
	import { on } from 'svelte/events';
	import { showGymSelectionDropdown } from '$stores/overlay-store';
	import GymSelectionDropdown from '$lib/desktop/schedule/GymSelectionDropdown.svelte';


    let gymTimePoints: TimePoint[] = $derived(constructTimePoints($selected.gym))


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
        // console.log($selected.startButtonIndex, '-', $selected.endButtonIndex)
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

    function onSelectGym() {
        // open gym selection dropdown
        $showGymSelectionDropdown = true
    }
        
</script>


<div class="w-full">
    <div class="flex flex-col justify-center items-center gap-10">
        <div class="w-fit">
            
            <DatePicker />

            <div class="container w-fit bg-gray-200 p-6 rounded-lg shadow-lg">
                <div class="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
                    
                    {#each gymTimePoints as timePoint, i}
                    
                        {#if isHighlighted(i)}
                            <button data-index={i} onclick={(e) => handleClick(e, i)} type="button" class="bg-blue-400 py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-blue-400 focus:outline-hidden focus:bg-blue-400 disabled:opacity-50 disabled:pointer-events-none">
                                {timePoint.hour}:{timePoint.minute === 0 ? "00" : timePoint.minute}
                            </button>                        
                        {:else}
                            <button data-index={i} onclick={(e) => handleClick(e, i)} type="button" class="bg-blue-600 py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-blue-600 focus:outline-hidden focus:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none">
                                {timePoint.hour}:{timePoint.minute === 0 ? "00" : timePoint.minute}
                            </button>
                        {/if}
                    
                    {/each}
                    
                </div>
            </div>

            <div class="relative flex flex-row my-10">
                <button onclick={onSelectGym} type="button" class="py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-400 text-white hover:bg-blue-500 focus:outline-hidden focus:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                    {$selected.gym ? 'Session at: ' + $selected.gym.name : 'Select Gym'}

                    {#if $showGymSelectionDropdown }
                        <GymSelectionDropdown />
                    {/if}

                </button>
            </div>
            
            <div class="relative flex flex-row my-10 justify-between">
                
                <button onclick={onclear} type="button" class="py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-400 text-white hover:bg-blue-500 focus:outline-hidden focus:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                    Clear Selection
                </button>
                
                <ScheduleButton
                    {gymTimePoints}
                    {onclear}
                />
                
            </div>

        </div>
    </div> 
</div>
    