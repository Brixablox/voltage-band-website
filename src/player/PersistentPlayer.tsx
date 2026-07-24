import { AutoplayPrompt } from './AutoplayPrompt'
import { DesktopPlayer } from './DesktopPlayer'
import { MobilePlayer } from './MobilePlayer'

/**
 * Root player UI, mounted once at the app level (outside the routed page
 * tree) so it never unmounts on navigation. Renders the autoplay prompt
 * plus both the desktop floating panel and mobile bottom bar — each
 * hides itself via CSS at the other's breakpoint.
 */
export function PersistentPlayer() {
  return (
    <>
      <AutoplayPrompt />
      <DesktopPlayer />
      <MobilePlayer />
    </>
  )
}
