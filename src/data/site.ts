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
    'Voltage is a high-energy rock band from Napa, California, combining powerful performances, technical musicianship, and a genuine love of music. Built on friendship and dedication, we bring our own style and personality to every stage.',

  instagramUrl: 'https://www.instagram.com/napa.voltage/',
  instagramHandle: '@napa.voltage',

  youtubeUrl: 'https://www.youtube.com/@napavoltage',

  contactEmail: 'napavoltage@gmail.com',
} as const

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Performances', to: '/performances' },
  { label: 'Originals', to: '/originals' },
  { label: 'Gallery', to: '/gallery' },
] as const
