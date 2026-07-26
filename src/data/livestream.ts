/**
 * Homepage livestream banner — TEMPORARY, remove when the stream ends.
 *
 * Set `enabled: false` (or delete the <LivestreamSection /> usage in
 * src/pages/Home.tsx) to take it down cleanly, with no leftover empty
 * space. `videoId` is the YouTube video ID only (not a full URL) — it's
 * used to build the embed src. `youtubeUrl` is the "Watch on YouTube"
 * link and should point at the watch/live page, not the embed URL.
 */
export const livestream = {
  enabled: true,
  heading: 'We Are Live Now!',
  videoId: 'yeIvdpQ6Vh4',
  youtubeUrl: 'https://www.youtube.com/live/yeIvdpQ6Vh4',
} as const
