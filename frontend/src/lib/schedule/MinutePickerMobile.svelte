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
</script>

<div class="absolute flex flex-col flex-none gap-y-2 bg-gray-200/90 outline-1 outline-gray-400/90 rounded-full z-50 p-2">
    <button type="button" onclick={(e) => onMinute(e,0)} class="self-center bg-blue-400 py-2 px-3 min-w-11 min-h-11 rounded-t-[25px] rounded-b-sm inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
        00
    </button>
    <div class="flex flex-none gap-x-2">
        <button type="button" onclick={(e) => onMinute(e,45)} class="self-left bg-blue-400 py-2 px-3 min-w-11 min-h-11 rounded-l-full rounded-r-sm inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
            45
        </button>
        <button type="button" onclick={onRemove} class="bg-blue-400 py-2 px-3 min-w-11 min-h-11 rounded-sm inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
            -
        </button>
        <button type="button" onclick={(e) => onMinute(e,15)} class="bg-blue-400 py-2 px-3 min-w-11 min-h-11 rounded-r-full rounded-l-sm inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
            15
        </button>
    </div>
    <button type="button" onclick={(e) => onMinute(e,30)} class="self-center bg-blue-400 py-2 px-3 min-w-11 min-h-11 rounded-b-full rounded-t-sm inline-flex items-center justify-center gap-x-2 text-sm font-medium border border-transparent text-white hover:bg-blue-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
        30
    </button>
</div>