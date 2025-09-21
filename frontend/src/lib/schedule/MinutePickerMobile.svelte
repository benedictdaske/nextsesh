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
            $selected.startHour = null
            $selected.startIndex = null
            if ($selected.endHour) { // end moves to start
                $selected.startHour = $selected.endHour
                $selected.startIndex = $selected.endIndex
                $selected.endHour = null
                $selected.endIndex = null
            }
        } else if (hour === $selected.endHour) { // button is same as end button -> unselect
            $selected.endHour = null
            $selected.endIndex = null
        }
    }

    function setMinute(minute: number) {
        if ($selected.startHour === hour)
            $selected.startMinute = minute
        else if ($selected.endHour === hour)
            $selected.endMinute = minute
    }

    function onRemove(event: MouseEvent) {
        event.stopPropagation()
        removeHour(hour)
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
<div onclick={onOutsideClick} class="fixed inset-0 bg-black/20 z-40">
</div>


<div class="absolute z-50">
    <button type="button" onclick={onRemove} class="absolute inset-0 w-12 bg-blue-400 py-2 px-3 min-w-11 min-h-11 rounded-sm inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
        -
    </button>

    <div class="flex -translate-y-10 gap-x-2 bg-gray-200/90 outline-1 outline-gray-400/90 rounded-full z-50 p-1">
        <button type="button" onclick={(e) => onMinute(e,0)}
            class={0 === $selected.startMinute && $selected.startHour === hour || 0 === $selected.endMinute && $selected.endHour === hour
                ? "p-2 h-9 w-9 bg-blue-400 rounded-full inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
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
</div>
    