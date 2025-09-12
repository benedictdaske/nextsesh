import { token } from "$stores/auth-store"
import { get } from "svelte/store"

const env = import.meta.env
const API_ENDPOINT = env.VITE_API_ENDPOINT

export async function callApi(api_path: string, options: RequestInit) {
    const accessToken = get(token)
    
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${accessToken}`
    }

    const endpoint = API_ENDPOINT + api_path

    return fetch(endpoint, {...options, headers})
}