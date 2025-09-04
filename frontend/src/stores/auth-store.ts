import type { User } from "@auth0/auth0-spa-js"
import { writable } from "svelte/store"


export const isAuthenticated = writable<boolean>(false)
export const user = writable<User|null>(null)
export const token = writable<string|null>(null)