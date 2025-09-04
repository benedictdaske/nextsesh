import { writable } from "svelte/store"
import type { Gym } from "$lib/types"


export const GymStore = writable<Gym[]>([])