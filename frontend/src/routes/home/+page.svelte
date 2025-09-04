<script lang="ts">
	import { goto } from "$app/navigation"
    import { auth } from "$lib/utils/auth-service"
	import { isAuthenticated, user } from "$stores/auth-store";

    const onschedule = () => {
        goto('/schedule')
    }
    const onlogin = () => {
        auth.loginWithRedirect()
    }
    const onlogout = () => {
        auth.logout()
    }
</script>


<div class="flex flex-col min-h-screen">

    <div class="flex flex-1 h-1/3 justify-center items-end">
        <h1 class="text-6xl font-bold"> nextsesh </h1>
    </div>
    
    <div class="flex flex-1 h-1/3 mt-10 justify-center items-start">
        <button onclick={onschedule} type="button" class="py-3 px-4 inline-flex items-center text-sm font-medium rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Schedule
        </button>
    </div>
    
    {#if $isAuthenticated}
        <button onclick={onlogout} type="button" class="absolute top-4 right-4 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-red-400 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Logout
        </button>
    {:else}
        <button onclick={onlogin} type="button" class="absolute top-4 right-4 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Login
        </button>
    {/if}
    
</div>

