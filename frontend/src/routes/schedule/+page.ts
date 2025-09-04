import type { Gym, Session } from '$lib/types';
import { parseTimeField } from '$lib/utils/datetime';
import { GymStore } from '$stores/gym-store';
import { SessionStore } from '$stores/session-store';
import { get } from 'svelte/store';
import { token } from '$stores/auth-store';
import { auth } from '$lib/utils/auth-service.js';


export async function load({ fetch }) {
    const oldGyms = get(GymStore)
    let gyms: Gym[] = []
    let defaultGym: Gym | null = null

    if (!get(token)) {
        await auth.init()
    }

    if (!oldGyms.length) {
        const endpoint = 'http://localhost:8000/api/gyms/'
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${get(token)}`
            }
        })
        const data = await response.json()
        
        if (!response.ok) {
            console.error(`Failed to fetch gyms. Status ${response.status}: ` + response.statusText)
            return { gyms: [], defaultGym: null, sessions: [] }
        }

        gyms = data.map((gym: any) => ({
            ...gym,
            opening_time: parseTimeField(gym.opening_time),
            closing_time: parseTimeField(gym.closing_time),
        }))
        
        GymStore.set(gyms)
        
        defaultGym = gyms.find(gym => gym.default === true) ?? null
    }
    
    const endpoint = 'http://localhost:8000/api/sessions/'
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${get(token)}`
        }
    })
    const data = await response.json()
    
    if (!response.ok) {
        console.error(`Failed to fetch sessions. Status ${response.status}: ` + response.statusText)
        return { gyms, defaultGym, sessions: [] }
    }

    const sessions: Session[] = data.map((session: any) => ({
        ...session,
        start: new Date(session.start),
        end: new Date(session.end)
    }))

    SessionStore.set(sessions)


    return { gyms, defaultGym, sessions }
}