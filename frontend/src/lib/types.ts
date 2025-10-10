export type TimePoint = {
    hour: number
    minute: number
}

export type Gym = {
    id: number
    name: string
    opening_time: Date
    closing_time: Date
    address: string | null
    postcode: string | null
    city: string | null
    website: string | null
}

export type SessionType = {
    set: boolean
    types: Record<string, boolean>
}

export type Session = {
    id: number
    user: {
        auth0_sub: string
        username: string
    }
    gym: number | null
    type: SessionType | null
    start: Date
    end: Date
    description: string | null
}

export type User = {
    id: number
    auth0_sub: string
    username: string
    email: string
    picture: string | null
}