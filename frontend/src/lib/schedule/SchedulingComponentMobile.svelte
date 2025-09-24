<script lang="ts">
    import type { Gym } from '$lib/types'

	import { GymStore } from '$stores/gym-store'
	import { selected } from '$stores/selected-store';
    import { showMinutePicker } from '$stores/overlay-store';
	import DatePickerMobile from '$lib/schedule/DatePickerMobile.svelte';
	import ScheduleButtonMobile from '$lib/schedule/ScheduleButtonMobile.svelte';
	import MinutePickerMobile from '$lib/schedule/MinutePickerMobile.svelte';

    let openingHour = $derived($selected.gym?.opening_time.getHours() || 0)
    let closingHour = $derived($selected.gym?.closing_time.getHours() || 0)

    let selectedIndex: number | null = $state(null)

    function handleClick(index: number) {
        // button is not start or end but both are already selected
        if ($selected.startIndex !== null && $selected.endIndex !== null && $selected.startIndex !== index && $selected.endIndex !== index) {
            return
        }
        selectedIndex = index
        showMinutePicker.set(true)
    }
    
    function onclear() {
        selected.update(sel => ({
            ...sel,
            startIndex: null,
            startHour: null,
            startMinute: null,
            endIndex: null,
            endHour: null,
            endMinute: null
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
                    <button onclick={() => handleClick(i)} type="button"
                        class:border-t-2={i === $selected.startIndex && $selected.startMinute === 0 || i === $selected.endIndex && $selected.endMinute === 0}
                        class:border-r-2={i === $selected.startIndex && $selected.startMinute === 15 || i === $selected.endIndex && $selected.endMinute === 15}
                        class:border-b-2={i === $selected.startIndex && $selected.startMinute === 30 || i === $selected.endIndex && $selected.endMinute === 30}
                        class:border-l-2={i === $selected.startIndex && $selected.startMinute === 45 || i === $selected.endIndex && $selected.endMinute === 45}
                        class={isHighlighted(i)
                            ? "relative bg-blue-400 py-2 px-3 border-gray-600 w-10 h-10 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
                            : "relative bg-blue-600 py-2 px-3 w-10 h-10 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
                    }>
                        {i + openingHour}

                        {#if $showMinutePicker && selectedIndex === i}
                            <MinutePickerMobile index={i} hour={i + openingHour} />
                        {/if}

                    </button>        
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