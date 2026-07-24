import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/** App shell: nav + routed page content + footer, plus scroll-to-top on navigation. */
export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

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
