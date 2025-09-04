<script lang="ts">
	import { selected } from "$lib/shared.svelte"
	import { addDaysToDate } from "$lib/utils/datetime"


    const today = new Date()
    selected.date = today

    function handleClick(days: number) {
        selected.date = addDaysToDate(today, days)
        // console.log('Selected date:', selected.date.toLocaleString('de-DE', { day: '2-digit', month: '2-digit' }))
    }

    function isSelected(days: number) {
        if (selected.date?.toLocaleDateString() === addDaysToDate(today, days).toLocaleDateString()) {
            return true
        }
        return false
    }

</script>

<div class="relative flex flex-row my-10 justify-between">
    
    {#each {length: 8} as _, i}

        {#if isSelected(i)}
            <button type="button" class="py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
                {addDaysToDate(today, i).toLocaleString('de-DE', { day: '2-digit', month: '2-digit' })}
            </button>
        {:else}
            <button onclick={() => handleClick(i)} type="button" class="py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-400 text-white hover:bg-blue-500 focus:outline-hidden focus:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                {addDaysToDate(today, i).toLocaleString('de-DE', { day: '2-digit', month: '2-digit' })}
            </button>
        {/if}

    {/each}

</div>