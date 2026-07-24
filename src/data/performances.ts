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
 *
 * NOTE: the entries below are placeholder examples so you can see the
 * card layout in action. Replace the details with your real shows.
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
    id: 'perf-1',
    title: 'Sample Show — Replace Me',
    date: '2026-08-15',
    time: 'Doors 7:00 PM',
    venue: 'Venue Name',
    city: 'City, State',
    description:
      'Placeholder event description. Add a sentence or two about what to expect at this show.',
    ticketUrl: '#',
    poster: '/images/performances/performance-1.jpg',
  },
  {
    id: 'perf-2',
    title: 'Sample Show — Replace Me',
    date: '2026-09-05',
    time: 'Doors 8:00 PM',
    venue: 'Venue Name',
    city: 'City, State',
    description:
      'Placeholder event description. Add a sentence or two about what to expect at this show.',
    ticketUrl: '#',
    poster: '/images/performances/performance-2.jpg',
  },
  {
    id: 'perf-3',
    title: 'Sample Show — Replace Me',
    date: '2026-10-10',
    time: 'Doors 6:30 PM',
    venue: 'Venue Name',
    city: 'City, State',
    description:
      'Placeholder event description. Add a sentence or two about what to expect at this show.',
    ticketUrl: null,
    poster: '/images/performances/performance-3.jpg',
  },
  {
    id: 'perf-4',
    title: 'Sample Show — Replace Me',
    date: '2026-05-02',
    time: 'Doors 7:30 PM',
    venue: 'Venue Name',
    city: 'City, State',
    description: 'Placeholder description for a past show.',
    ticketUrl: null,
    poster: '/images/performances/performance-4.jpg',
  },
  {
    id: 'perf-5',
    title: 'Sample Show — Replace Me',
    date: '2026-03-14',
    time: 'Doors 8:00 PM',
    venue: 'Venue Name',
    city: 'City, State',
    description: 'Placeholder description for a past show.',
    ticketUrl: null,
    poster: '/images/performances/performance-5.jpg',
  },
]
