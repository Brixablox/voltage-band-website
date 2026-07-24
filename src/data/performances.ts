/**
 * Performance listings.
 *
 * Add, remove, or edit shows by editing this array — the Performances
 * page automatically sorts entries into "Upcoming" and "Past" based on
 * today's date, and renders a polished empty state if there are no
 * upcoming shows. No layout changes needed.
 *
 * `poster` should point at a file you add to `public/images/performances/`
 * (see public/images/README.md). `ticketUrl` is optional — omit it (or
 * leave as null) to hide the ticket button on that card.
 */

export type Performance = {
  id: string
  title: string
  date: string // ISO date, e.g. "2026-09-05"
  time: string // display string, e.g. "8:00 PM"
  venue: string
  city: string
  description: string
  ticketUrl?: string | null
  poster: string
}

export const performances: Performance[] = [
  {
    id: 'botb-2026',
    title: 'SoFi Battle of the Bands 2026',
    date: '2026-07-26',
    time: '12:00 PM (Noon)',
    venue: 'Palisades Stage',
    city: 'Downtown Napa, CA',
    description:
      "This is Voltage's 4th Battle of the Bands and our 2nd time competing right here in Napa. Last year we placed 2nd — this year we're aiming for 1st. Come vote for us on Second Street and help us bring the trophy home!",
    ticketUrl: 'https://napasofidistrict.com/event/sofi-battle-of-the-bands-2026/',
    poster: '/images/performances/botb-2026.jpg',
  },
]
