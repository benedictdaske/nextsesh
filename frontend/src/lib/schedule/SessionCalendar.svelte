<script lang="ts">

    import { SessionStore } from "$stores/session-store"
    import { GymStore } from "$stores/gym-store"
	import { printFormatTime } from "$lib/utils/datetime"
	import { token } from "$stores/auth-store";
	import { get } from "svelte/store";
	import { user } from "$stores/user-store";

    function handleDelete(id: number) {
        const endpoint = `http://localhost:8000/api/sessions/${id}/`
        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${get(token)}`
            }
        }).then(response => {
            if (response.status === 204) {
                SessionStore.update(prev => prev.filter(session => session.id !== id))
            }
        })
    }

</script>


<div class="w-full">
    <div class="flex flex-col justify-center items-center gap-10">
      
        <div class="w-fit">
            
            <div class="container w-fit bg-gray-200 p-6 rounded-lg shadow-lg">
                <div class="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
                    
                    {#each $SessionStore as session}

                        <div class="flex flex-col items-center gap-2">
                            <p class="text-lg font-bold"> {session.user.username} </p>
                            <p class="text-sm"> {session.start.toLocaleString('de-DE', { day: '2-digit', month: '2-digit' })} </p>
                            <p class="text-sm"> {printFormatTime(session.start)} - {printFormatTime(session.end)} </p>
                            <p class="text-sm"> {($GymStore.find(gym => gym.id == session.gym)?.name || 'Unknown Gym')} </p>

                            {#if session.user.auth0_sub === get(user)?.auth0_sub}

                                <button onclick={() => handleDelete(session.id)} type="button" class="py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-300 text-white hover:bg-red-500 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
                                    DELETE
                                </button>
                            {/if}

                        </div>

                    {/each}
                                        
                </div>
            </div>

        </div>
        
    </div>
</div>