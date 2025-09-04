import type { Gym } from '$lib/types'

export const selected = $state<{
    gym: Gym | null
    date: Date | null
    startButtonIndex: number | null
    endButtonIndex: number | null
}>({
    gym: null,
    date: null,
    startButtonIndex: null,
    endButtonIndex: null
})