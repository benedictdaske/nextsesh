<script lang="ts">
    import { showMinutePicker } from '$stores/overlay-store';
    import { selected } from '$stores/selected-store';

    let { index, hour } = $props()

    function setNewHour(index: number, hour: number) {
        if ($selected.startHour === null && $selected.endHour === null) { // both not set -> set start
            $selected.startHour = hour
            $selected.startIndex = index
        } else if ($selected.startHour !== null && $selected.endHour === null) { // start set, end not set -> set end
            if (hour > $selected.startHour) { // button after start -> set button as end
                $selected.endHour = hour
                $selected.endIndex = index
            } else { // button before start -> move start to end, set button as start
                $selected.endHour = $selected.startHour
                $selected.endIndex = $selected.startIndex
                $selected.startHour = hour
                $selected.startIndex = index
            }
        }
    }

    function removeHour(hour: number) {
        if (hour === $selected.startHour) { // button is same as start button -> unselect
            $selected.startIndex = null
            $selected.startHour = null
            $selected.startMinute = null
            if ($selected.endHour) { // end moves to start
                $selected.startIndex = $selected.endIndex
                $selected.startHour = $selected.endHour
                $selected.startMinute = $selected.endMinute
                $selected.endIndex = null
                $selected.endHour = null
                $selected.endMinute = null
            }
        } else if (hour === $selected.endHour) { // button is same as end button -> unselect
            $selected.endIndex = null
            $selected.endHour = null
            $selected.endMinute = null
        }
    }

    function setMinute(minute: number) {
        if ($selected.endHour === hour)
            $selected.endMinute = minute
        else if ($selected.startHour === hour)
            $selected.startMinute = minute
    }

    function onRemove(event: MouseEvent) {
        event.stopPropagation()

        if ($selected.startHour === hour && $selected.endHour === hour) {
            $selected.startIndex = null
            $selected.startHour = null
            $selected.startMinute = null
            $selected.endIndex = null
            $selected.endHour = null
            $selected.endMinute = null
        } else {
            removeHour(hour)
        }

        $showMinutePicker = false
    }

    function onMinute(event: MouseEvent, minute: number) {
        event.stopPropagation()
        
        setNewHour(index, hour)
        setMinute(minute)

        $showMinutePicker = false
    }

    function onOutsideClick(event: MouseEvent) {
        event.stopPropagation()
        $showMinutePicker = false
    }
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onOutsideClick} class="fixed inset-0 bg-gray-400/30 z-40">
</div>

<button type="button" onclick={onRemove} class="absolute w-10 h-10 z-50 bg-gray-100 outline-1 outline-gray-400 rounded-lg inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-gray-600 hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
    -
</button>


<div class="absolute flex bottom-full z-50 gap-x-2 p-1 mb-1 bg-white outline-1 outline-gray-400/90 rounded-full">
    <button type="button" onclick={(e) => onMinute(e,0)}
        class={0 === $selected.startMinute && $selected.startHour === hour || 0 === $selected.endMinute && $selected.endHour === hour
            ? "p-2 h-9 w-9 bg-blue-400 outline-1 outline-gray-400/70 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
            : "p-2 h-9 w-9 outline-1 outline-gray-400/30 text-gray-600 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
        }> 
        00
    </button>
    <button type="button" onclick={(e) => onMinute(e,15)} 
        class={15 === $selected.startMinute && $selected.startHour === hour || 15 === $selected.endMinute && $selected.endHour === hour
            ? "p-2 h-9 w-9 bg-blue-400 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
            : "p-2 h-9 w-9 outline-1 outline-gray-400/30 text-gray-600 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
        }> 
        15
    </button>
    <button type="button" onclick={(e) => onMinute(e,30)} 
        class={30 === $selected.startMinute && $selected.startHour === hour || 30 === $selected.endMinute && $selected.endHour === hour
            ? "p-2 h-9 w-9 bg-blue-400 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
            : "p-2 h-9 w-9 outline-1 outline-gray-400/30 text-gray-600 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
        }> 
        30
    </button>
    <button type="button" onclick={(e) => onMinute(e,45)} 
        class={45 === $selected.startMinute && $selected.startHour === hour || 45 === $selected.endMinute && $selected.endHour === hour
            ? "p-2 h-9 w-9 bg-blue-400 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
            : "p-2 h-9 w-9 outline-1 outline-gray-400/30 text-gray-600 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
        }> 
        45
    </button>
</div>