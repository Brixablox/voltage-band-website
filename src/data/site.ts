/**
 * Site-wide content: band name, tagline, and social links.
 * Edit the values below — everything here flows through to the nav,
 * hero, and footer automatically.
 */

export const site = {
  bandName: 'Voltage',

  // EDITABLE: short hero tagline. Keep it punchy — this is the first
  // line visitors read.
  tagline: 'High-voltage live sound. Turn it up.',

  // EDITABLE: one or two sentences for the homepage "About" preview card.
  aboutPreview:
    'Voltage is a band on a mission to bring raw, electric energy to every stage we play. Replace this paragraph with your real story — who you are, how you started, and what your live show feels like.',

  instagramUrl: 'https://www.instagram.com/napa.voltage/',
  instagramHandle: '@napa.voltage',

  youtubeUrl: 'https://www.youtube.com/@napavoltage',
} as const

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Performances', to: '/performances' },
  { label: 'Originals', to: '/originals' },
  { label: 'Gallery', to: '/gallery' },
] as const
