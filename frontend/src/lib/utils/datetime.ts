import type { Gym, TimePoint } from '$lib/types'


export function constructTimePoints(gym: Gym | null): TimePoint[] {
    let timePoints: TimePoint[] = []

    if (gym === null) {
        return timePoints
    }

    for (let i = gym.opening_time.getHours(); i < gym.closing_time.getHours(); i++) {
        for (let j = 0; j < 60; j += 15) {
            timePoints.push({
                hour: i,
                minute: j
            })
        }
    }

    timePoints.push({
        hour: gym.closing_time.getHours(),
        minute: 0
    })

    return timePoints
}

export function parseTimeField(time: string): Date {
    const [hour, minute, second] = time.split(":").map(Number)
    const now = new Date()
    now.setHours(hour, minute, second ?? 0, 0)
    return now
}

export function printFormatTime(date: Date): string {
    let hour = date.getHours()
    let minute = date.getMinutes().toString().padEnd(2, "0")
    return `${hour}:${minute}`
}

export function addDaysToDate(date: Date, days: number): Date {
    const copy = new Date()
    copy.setDate(date.getDate() + days)
    return copy
}

export function dateTimeToISOString(date: Date | null, hour: number, minute: number): string {
    if (date === null) {
        console.error("Invalid date")
        return new Date().toISOString()
    }

    const isoDate = new Date(date)
    isoDate.setHours(hour, minute, 0, 0)
    return isoDate.toISOString()
}