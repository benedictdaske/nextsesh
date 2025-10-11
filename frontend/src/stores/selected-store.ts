import { sessionTypeKeys } from '$lib/sessionTypes'
import type { Gym, SessionType } from '$lib/types'
import { writable } from 'svelte/store'

export const selected = writable({
    gym: null as Gym | null,
    date: null as Date | null,
    sessionType: {
        set: 0,
        types: Object.fromEntries(sessionTypeKeys.map(t => [t, false])) as Record<string, boolean>
    } as SessionType, 
    startButtonIndex: null as number | null,
    endButtonIndex: null as number | null,
    startIndex: null as number | null,
    startHour: null as number | null,
    startMinute: null as number | null,
    endIndex: null as number | null,
    endHour: null as number | null,
    endMinute: null as number | null
})

