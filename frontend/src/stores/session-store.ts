import type { Session } from "$lib/types"
import { writable, type Writable } from "svelte/store"

function SessionComparator(a: Session, b: Session) {
    return a.start.getTime() - b.start.getTime()
}

function SortedSessionStore(): Writable<Session[]> {
    const { subscribe, set, update } = writable<Session[]>([])

    return {
        subscribe,
        set: (sessions: Session[]) => set([...sessions].sort(SessionComparator)),
        update: (fn: (sessions: Session[]) => Session[]) =>
            update((sessions) => fn([...sessions]).sort(SessionComparator)),
    }
}

export const SessionStore = SortedSessionStore()