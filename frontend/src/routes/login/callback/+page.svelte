<script lang="ts">
    import { onMount } from "svelte"
    import { goto } from "$app/navigation"
    import { auth } from "$lib/utils/auth-service"
    import { user } from "$stores/user-store"
    import { token } from "$stores/auth-store"
    import { get } from "svelte/store"

    onMount(async () => {
        await auth.init()

        // const idToken = await auth.getIdToken()

        const res = await fetch('http://localhost:8000/api/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${get(token)}`,
                // 'X-ID-Token': idToken ?? ''
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