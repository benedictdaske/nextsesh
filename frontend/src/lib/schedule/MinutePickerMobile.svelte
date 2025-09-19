<script lang="ts">
    import { showMinutePicker } from '$stores/overlay-store';
    import { selected } from '$stores/selected-store';

    let { index, hour } = $props()

    function updateHours(hour: number, index: number) {
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

    function onclick(event: MouseEvent) {
        event.stopPropagation()
        updateHours(hour, index)
        $showMinutePicker = false
    }

</script>
<!-- TODO: 4 + 1 buttons -->
<div class="absolute bg-black z-10 p-2">
    <button type="button" onclick={onclick} class="relative bg-red-400 py-2 px-3 min-w-10 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-red-400 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
        lul
    </button>
</div>