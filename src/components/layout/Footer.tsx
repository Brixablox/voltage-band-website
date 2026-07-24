import { Link } from 'react-router-dom'
import { navLinks, site } from '../../data/site'
import { InstagramIcon } from '../ui/InstagramIcon'
import logo from '../../assets/logo/voltage-logo.png'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-raised">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, #FFD400, transparent)' }}
        aria-hidden="true"
      />

      <div className="container-voltage relative grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        <div className="flex flex-col gap-4">
          <Link to="/" aria-label="Voltage — home" className="w-fit">
            <img src={logo} alt="Voltage" className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs font-body text-sm leading-relaxed text-paper-dim">{site.tagline}</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voltage on Instagram (opens in a new tab): ${site.instagramHandle}`}
            className="glow-volt mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition-colors hover:border-volt hover:text-volt"
          >
            <InstagramIcon size={18} />
            {site.instagramHandle}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h3 className="mb-1 font-body text-xs font-bold uppercase tracking-[0.2em] text-paper-dim">Navigate</h3>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="w-fit font-body text-sm text-paper/85 transition-colors hover:text-volt">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="mb-1 font-body text-xs font-bold uppercase tracking-[0.2em] text-paper-dim">Contact</h3>
          {/* EDITABLE: replace with a real booking/contact email */}
          <a href={`mailto:${site.contactEmail}`} className="w-fit break-all font-body text-sm text-paper/85 transition-colors hover:text-volt">
            {site.contactEmail}
          </a>
        </div>
      </div>

      {/*
        Extra bottom clearance on md+ so the fixed-position music player
        (bottom-right floating panel) never overlaps the copyright row.
        Mobile's player is a short full-width bar handled by <Layout>.
      */}
      <div className="container-voltage relative flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-paper-dim sm:flex-row md:pb-56">
        <p>© {new Date().getFullYear()} {site.bandName}. All rights reserved.</p>
        <p>Built for the stage.</p>
      </div>
    </footer>
  )
}
