import type { Performance } from '../data/performances'

/** True if the performance's date is today or later. */
export function isUpcoming(performance: Performance, now = new Date()): boolean {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const [y, m, d] = performance.date.split('-').map(Number)
  const showDate = new Date(y, m - 1, d)
  return showDate >= today
}

export function splitPerformances(performances: Performance[], now = new Date()) {
  const upcoming = performances
    .filter((p) => isUpcoming(p, now))
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = performances
    .filter((p) => !isUpcoming(p, now))
    .sort((a, b) => b.date.localeCompare(a.date))
  return { upcoming, past }
}

export function formatDate(iso: string): { weekday: string; month: string; day: string; year: string } {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return {
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: String(date.getDate()),
    year: String(date.getFullYear()),
  }
}

/** Formats seconds as m:ss (or h:mm:ss for anything over an hour). */
export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '0:00'
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const pad = (n: number) => String(n).padStart(2, '0')
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`
}
