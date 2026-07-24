import { InstagramIcon } from '../ui/InstagramIcon'
import { Button } from '../ui/Button'
import { site } from '../../data/site'

/** Shown in place of the upcoming-shows grid when `performances.ts` has no future dates. */
export function EmptyState() {
  return (
    <div className="bg-stage-glow relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center sm:py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-volt/40 text-volt" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className="font-display text-2xl sm:text-3xl">No Shows Booked — Yet</h3>
      <p className="max-w-md font-body text-sm text-paper-dim sm:text-base">
        Voltage is off stage for the moment, but new dates are always in the works. Follow along on
        Instagram to be first to know when tickets drop.
      </p>
      <Button href={site.instagramUrl} external icon={<InstagramIcon size={18} />}>
        Follow for Updates
      </Button>
    </div>
  )
}
