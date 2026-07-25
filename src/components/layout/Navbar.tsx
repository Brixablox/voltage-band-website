import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks, site } from '../../data/site'
import { InstagramIcon } from '../ui/InstagramIcon'
import { YouTubeIcon } from '../ui/YouTubeIcon'
import { MobileMenu } from './MobileMenu'
import logo from '../../assets/logo/voltage-logo.png'

/** Fixed top navigation. Solidifies its background on scroll for contrast over hero content. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'border-b border-white/10 bg-ink/90 backdrop-blur-lg' : 'bg-gradient-to-b from-ink/70 to-transparent'
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="container-voltage flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" aria-label="Voltage — home">
          <img src={logo} alt="Voltage" className="h-8 w-auto sm:h-9" />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `group relative rounded-full px-4 py-2 font-body text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? 'text-volt' : 'text-paper/80 hover:text-paper'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-[2px] scale-x-0 bg-volt transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voltage on Instagram (opens in a new tab): ${site.instagramHandle}`}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-all duration-300 hover:border-volt hover:text-volt hover:shadow-[0_0_20px_-4px_rgba(255,212,0,0.6)] md:flex"
          >
            <InstagramIcon />
          </a>
          <a
            href={site.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voltage on YouTube (opens in a new tab)"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-all duration-300 hover:border-volt hover:text-volt hover:shadow-[0_0_20px_-4px_rgba(255,212,0,0.6)] md:flex"
          >
            <YouTubeIcon />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 md:hidden"
          >
            <span
              className={`h-[2px] w-5 bg-paper transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span className={`h-[2px] w-5 bg-paper transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`h-[2px] w-5 bg-paper transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
