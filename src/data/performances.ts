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
 * leave as null) to hide the ticket button on that card. `time` is
 * optional too — leave it unset if a specific set time isn't known
 * (e.g. an older show where only the date was recorded). Use `\n\n`
 * inside `description` for a paragraph break; leave `description` as
 * `''` for shows with no write-up yet.
 */

export type Performance = {
  id: string
  title: string
  date: string // ISO date, e.g. "2026-09-05"
  time?: string // display string, e.g. "8:00 PM"
  venue: string
  city: string
  description: string
  ticketUrl?: string | null
  poster: string
}

export const performances: Performance[] = [
  {
    id: 'punked-out-pretty-2026',
    title: 'Night at the Phoenix Stage',
    date: '2026-09-12',
    time: '7:00 PM – 10:00 PM (Doors 6:00 PM)',
    venue: 'The Phoenix Theater',
    city: 'Petaluma, CA',
    description:
      "All ages show at the Phoenix Theater in Petaluma! Punked Out Pretty invited us out for a night of live music with Polaris, Red 40, Sacramental, and Voltage on the bill.\n\nDoors open at 6:00 PM, music runs 7-10 PM. Tickets are $12 at the door.",
    ticketUrl: null,
    poster: '/images/performances/punked-out-pretty-2026.jpg',
  },
  {
    id: 'botb-2026',
    title: 'SoFi Battle of the Bands 2026',
    date: '2026-07-26',
    time: '12:00 PM (Noon)',
    venue: 'Palisades Stage',
    city: 'Downtown Napa, CA',
    description:
      "Voltage is back for their second year competing right here in their hometown of Napa, California! After taking second place last year, they’re ready to rock the stage and take the top spot—with your vote!\n\nCatch Voltage as the first act of the day at 12:00 noon on the Palisades Stage on Second Street. Come out, cheer them on, and help bring home the win!",
    ticketUrl: 'https://napasofidistrict.com/event/sofi-battle-of-the-bands-2026/',
    poster: '/images/performances/botb-2026.jpg',
  },
  {
    id: 'napa-botb-2025',
    title: 'SoFi Battle of the Bands Napa',
    date: '2025-07-27',
    time: '12:00 PM (Noon)',
    venue: 'Palisades Stage',
    city: 'Downtown Napa, CA',
    description: '',
    ticketUrl: null,
    poster: '/images/performances/napa-botb-2025.jpg',
  },
  {
    id: 'sonoma-botb-2026',
    title: 'Music Nomad Battle of the Bands Sonoma',
    date: '2026-05-16',
    venue: 'Grinstead Amphitheater',
    city: 'Sonoma Plaza, Sonoma, CA',
    description: '',
    ticketUrl: null,
    poster: '/images/performances/sonoma-botb-2026.jpg',
  },
  {
    id: 'sonoma-botb-2025',
    title: 'Music Nomad Battle of the Bands Sonoma',
    date: '2025-05-17',
    venue: 'Grinstead Amphitheater',
    city: 'Sonoma Plaza, Sonoma, CA',
    description: '',
    ticketUrl: null,
    poster: '/images/performances/sonoma-botb-2025.jpg',
  },
]
