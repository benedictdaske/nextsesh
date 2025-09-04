<script lang="ts">
    import SchedulingComponent from "$lib/schedule/SchedulingComponent.svelte"
	import SessionCalendar from "$lib/schedule/SessionCalendar.svelte"
    import { selected } from "$lib/shared.svelte"
	import { goto } from "$app/navigation";
	import { isAuthenticated } from "$stores/auth-store";

    export let data;
    
    if (data.defaultGym) {
        selected.gym = data.defaultGym;
    }

</script>


<div class="flex flex-col justify-evenly items-center min-h-screen">
    
    <div class="flex flex-col justify-center items-center">
        <button onclick={() => goto('/')} class="flex h-1/3 pt-10 justify-center items-center cursor-pointer">
            <h1 class="text-6xl font-bold"> nextsesh </h1>
        </button>

        {#if $isAuthenticated }
            <SchedulingComponent />
            <SessionCalendar />
        {:else}
            <div class="flex flex-1 h-1/3 mt-10 justify-center items-start">
                <p class="text-l"> Please log in to view and schedule sessions. </p>
            </div>
        {/if}
    </div>
        
</div>