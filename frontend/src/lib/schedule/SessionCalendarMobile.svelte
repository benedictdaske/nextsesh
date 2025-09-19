<script lang="ts">

    import { SessionStore } from "$stores/session-store"
    import { GymStore } from "$stores/gym-store"
	import { printFormatTime } from "$lib/utils/datetime"
	import { get } from "svelte/store";
	import { user } from "$stores/user-store";
	import { callApi } from "$lib/utils/api";
    
    function handleDelete(id: number) {
        const apiPath = `/sessions/${id}/`

        callApi(apiPath, {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 204) {
                SessionStore.update(prev => prev.filter(session => session.id !== id))
            }
        })
    }

</script>



<div class="flex flex-col max-w-80 p-4 gap-y-1 justify-items-center bg-gray-200 rounded-lg shadow-lg">
    
    {#each $SessionStore as session}

        <div class="flex gap-x-2 justify-evenly items-center">
            <p class="text-xs font-semibold"> {session.user.username} </p>
            <p class="text-xs"> {session.start.toLocaleString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' })} </p>
            <p class="text-xs"> {printFormatTime(session.start)} - {printFormatTime(session.end)} </p>
            <p class="text-xs"> {($GymStore.find(gym => gym.id == session.gym)?.name || 'Unknown Gym')} </p>

            {#if session.user.auth0_sub === get(user)?.auth0_sub}
                <button onclick={() => handleDelete(session.id)} type="button" class="p-1 inline-flex items-center justify-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-red-300 text-white hover:bg-red-500 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
                    DELETE
                </button>
            {/if}

        </div>

    {/each}
                        
</div>