import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/**
 * App shell: nav + routed page content + footer, plus scroll-to-top on
 * navigation — or, if the destination URL carries a #hash (e.g. the news
 * ticker linking straight to a specific show), scroll that element into
 * view instead. The element may not be in the DOM yet on the same tick
 * the route changes, so a single rAF retry covers that case.
 */
export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const target = document.getElementById(hash.slice(1))
        if (!target) return false
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
        return true
      }
      if (!scrollToHash()) requestAnimationFrame(scrollToHash)
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return (
    <>
      <div className="grain-overlay" />
      <Navbar />
      {/* pb-16 reserves room for the fixed mobile player bar so it never covers footer content. */}
      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
