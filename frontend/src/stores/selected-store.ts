import type { Gym } from '$lib/types'
import { writable } from 'svelte/store'

export const selected = writable({
    gym: null as Gym | null,
    date: null as Date | null,
    startButtonIndex: null as number | null,
    endButtonIndex: null as number | null,
    startHour: null as number | null,
    startMinute: null as number | null,
    endHour: null as number | null,
    endMinute: null as number | null
})
