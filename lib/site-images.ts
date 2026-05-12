/** Remote image URLs only — copy lives in `messages/{locale}.json` (hero + gallery alts, titles, captions). */
export const heroImageSrc =
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=2400&q=85'

export type HouseMedia = {
  id: number
  src: string
  span: string
}

export const houseImageMedia: HouseMedia[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85',
    span: 'min-h-[19rem] md:col-span-2 md:row-span-2 md:min-h-[36rem]',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85',
    span: 'min-h-[14rem] md:min-h-[17.25rem]',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85',
    span: 'min-h-[14rem] md:min-h-[17.25rem]',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1600&q=85',
    span: 'min-h-[15rem] md:col-span-2 md:min-h-[15rem]',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85',
    span: 'min-h-[14rem] md:min-h-[17.25rem]',
  },
]

/** Alias for older imports / cached bundles — same array as `houseImageMedia`. */
export const houseImages = houseImageMedia

/** Legacy `{ src, alt }` shape for older hero imports. Prefer `heroImageSrc` + i18n `hero.imageAlt`. */
export const heroImage = {
  src: heroImageSrc,
  alt: 'Minimal training floor with racks and soft daylight',
} as const
