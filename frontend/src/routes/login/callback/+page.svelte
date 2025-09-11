<script lang="ts">
    import { onMount } from "svelte"
    import { goto } from "$app/navigation"
    import { auth } from "$lib/utils/auth-service"
    import { user } from "$stores/user-store"
	import { callApi } from "$lib/utils/api";

    onMount(async () => {
        await auth.init()

        // const idToken = await auth.getIdToken()

        const res = await callApi('/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (res.ok) {
            const userData = await res.json()
            user.set(userData)
        } else {
            console.error('Failed to fetch user data')
        }

        await goto('/schedule', { replaceState: true });
    })

</script>