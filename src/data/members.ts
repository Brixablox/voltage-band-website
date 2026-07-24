/**
 * Band member profiles.
 *
 * Names and roles are fixed — do not change them without checking with
 * the band. `bio`, `quote`, and `socialUrl` are placeholders for you to
 * fill in later; `quote` and `socialUrl` are optional and simply won't
 * render if left empty. `photo` should point at a file you add to
 * `public/images/members/` (see public/images/README.md).
 */

export type Member = {
  id: string
  name: string
  role: string
  bio: string
  quote?: string
  socialUrl?: string
  photo: string
}

export const members: Member[] = [
  {
    id: 'violet',
    name: 'Violet',
    role: 'Lead Singer',
    bio: 'Biography placeholder — add a short bio for Violet here.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/violet.jpg',
  },
  {
    id: 'graeden',
    name: 'Graeden',
    role: 'Drums',
    bio: 'Biography placeholder — add a short bio for Graeden here.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/graeden.jpg',
  },
  {
    id: 'aiden',
    name: 'Aiden',
    role: 'Bass',
    bio: 'Biography placeholder — add a short bio for Aiden here.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/aiden.jpg',
  },
  {
    id: 'gavin',
    name: 'Gavin',
    role: 'Guitar',
    bio: 'Biography placeholder — add a short bio for Gavin here.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/gavin.jpg',
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Guitar',
    bio: 'Biography placeholder — add a short bio for Leo here.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/leo.jpg',
  },
  {
    id: 'tyler',
    name: 'Tyler',
    role: 'Guitar',
    bio: 'Biography placeholder — add a short bio for Tyler here.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/tyler.jpg',
  },
]
