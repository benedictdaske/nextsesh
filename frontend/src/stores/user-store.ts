import type { User } from "$lib/types"
import { writable } from "svelte/store"

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null

export const user = writable<User | null>(stored ? JSON.parse(stored) : null)

user.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
        if (value) {
            localStorage.setItem('user', JSON.stringify(value))
        } else {
            localStorage.removeItem('user')
        }
    }
})
