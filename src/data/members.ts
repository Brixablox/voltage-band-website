/**
 * Band member profiles.
 *
 * Names and roles are fixed — do not change them without checking with
 * the band. `quote` and `socialUrl` are optional and simply won't render
 * if left empty. Leave `bio` as `''` to show no biography for a member —
 * the card still reserves the same amount of space either way. `photo`
 * should point at a file you add to `public/images/members/` (see
 * public/images/README.md).
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
    bio: 'I like to sing, write music, draw, and play volleyball. My goal for Voltage is to be professional and sound clean and tight so we can succeed in the future.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/violet.jpg',
  },
  {
    id: 'graeden',
    name: 'Graeden',
    role: 'Drums',
    bio: 'In my free time, I enjoy playing the drums and mountain biking. These hobbies help me stay active, creative, and focused.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/graeden.jpg',
  },
  {
    id: 'aiden',
    name: 'Aiden',
    role: 'Bass',
    bio: 'Aiden is a longtime member whose musical experience brings a steady foundation to every performance. His genuine enjoyment of playing bass comes through each time he takes the stage.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/aiden.jpg',
  },
  {
    id: 'gavin',
    name: 'Gavin',
    role: 'Guitar',
    bio: "Hey, I'm Gavin! I'm a guitarist who brings creative energy to every detail of what we do. My love of music, technology, and building new ideas shapes both my playing and what I contribute behind the scenes.",
    quote: '',
    socialUrl: '',
    photo: '/images/members/gavin.jpg',
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Guitar',
    bio: 'Leo is a skilled guitarist known for his complex solos and strong technical ability. His precision and creativity bring an exciting edge to every performance.',
    quote: '',
    socialUrl: '',
    photo: '/images/members/leo.jpg',
  },
  {
    id: 'tyler',
    name: 'Tyler',
    role: 'Guitar',
    bio: "What's up, I'm Tyler, and I play rhythm guitar. I'm into basketball, graphic design, and hanging with my friends.",
    quote: '',
    socialUrl: '',
    photo: '/images/members/tyler.jpg',
  },
]
