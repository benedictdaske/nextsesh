<script lang="ts">

    import { SessionStore } from "$stores/session-store"
    import { GymStore } from "$stores/gym-store"
	import { printFormatTime } from "$lib/utils/datetime"
	import { get } from "svelte/store";
	import { user } from "$stores/user-store";
	import { callApi } from "$lib/utils/api";
	import { humanize } from "$lib/utils/strings";
    
    function handleDelete(id: number) {
        const apiPath = `/sessions/${id}/`

        // call api & update store
        callApi(apiPath, {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 204) {
                SessionStore.update(prev => prev.filter(session => session.id !== id))
            }
        })
    }

</script>



<div class="flex flex-col max-w-80 mb-8 p-4 gap-y-2 justify-items-center bg-gray-200 rounded-lg shadow-lg">

    {#if $SessionStore.length === 0}
        <div class="font-semibold text-md">
            No sessions scheduled.
        </div>
    {:else}
    
        {#each $SessionStore as session}

            <div class="flex flex-col gap-y-0.5">
                <div class="flex flex-row flex-wrap gap-x-2 items-center justify-center text-xs">
                    <div class="font-semibold"> {session.user.username}</div>
                    <div class="font-semibold">@ {($GymStore.find(gym => gym.id == session.gym)?.name || 'Unknown Gym')} </div>
                    
                    {#if session.user.auth0_sub === get(user)?.auth0_sub}
                    <button onclick={() => handleDelete(session.id)} type="button" class="p-1 inline-flex items-center justify-center text-xs font-medium rounded-lg border border-transparent bg-red-300 text-white hover:bg-red-500 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
                        DELETE
                    </button>
                    {/if}
                </div>
                
                <div class="flex flex-row flex-wrap gap-x-2 items-center justify-center text-xs">                    
                    <div> {session.start.toLocaleString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' })} </div>
                    <div> {printFormatTime(session.start)} - {printFormatTime(session.end)} </div>
                </div>

                {#if session.type && session.type.types}
                    <div class="text-xs text-gray-500 text-center">
                        {Object.entries(session.type.types).filter(([_, v]) => v).map(([k, _]) => humanize(k)).join(', ')}
                    </div>
                {/if}
            </div>

        {/each}

    {/if}
                        
</div>