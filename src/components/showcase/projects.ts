export interface ShowcaseProject {
  /** Display name. */
  name: string;
  /** Short category line. */
  kind: string;
  /** Texture / screenshot shown for the site (served from /public). */
  image: string;
  /** Live URL, when available. */
  url?: string;
  /** Capability tags. */
  tags: string[];
  /** One-line blurb shown in the overlay. */
  blurb: string;
}

/**
 * Real, shipped client work. These are strung along the 3D chain in the
 * showcase and shown in the portfolio grid.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    name: 'The Boat Yard Sauna',
    kind: 'Wellness · Wicklow & Arklow',
    image: '/images/boatyardsauna.png',
    url: 'https://theboatyardsauna.io',
    tags: ['Web Design', 'Booking', 'CMS', 'Animation'],
    blurb:
      'A premium wellness brand with two coastal locations — custom build, Sanity CMS and a live booking system.',
  },
  {
    name: 'Archive63',
    kind: 'Streetwear · Kilcoole',
    image: '/images/archive63.png',
    tags: ['E-commerce', 'Storefront', 'Brand'],
    blurb:
      'Curated designer and vintage streetwear — a bold storefront built around drops and a full online shop.',
  },
  {
    name: 'Pinky',
    kind: 'Fashion Boutique · Dublin',
    image: '/images/pinkystore.png',
    tags: ['E-commerce', 'Web Design', 'Brand'],
    blurb:
      'A statement fashion label with attitude — editorial hero, bold type and a shoppable collection.',
  },
  {
    name: 'Sergio Furlan',
    kind: 'Tattoo Artist · Dublin',
    image: '/images/sergiotattoo.png',
    tags: ['Web Design', 'Gallery', 'Booking'],
    blurb:
      'A tattoo artist portfolio — black & grey and colour realism, with gallery, healed work and consultation booking.',
  },
  {
    name: 'Belle Kilkenny',
    kind: 'Boutique Footwear · Kilkenny',
    image: '/images/bellekilkenny.png',
    tags: ['E-commerce', 'Storefront', 'Editorial'],
    blurb:
      'A boutique footwear shop — warm, editorial design with a handpicked heels, boots and flats collection.',
  },
  {
    name: 'Bluntforce Ink',
    kind: 'Tattoo Studio · Dublin 8',
    image: '/images/bluntforceink.png',
    tags: ['Web Design', 'Gallery', 'Booking'],
    blurb:
      'Gothic fine-line black & grey tattooing — a dark, cinematic portfolio for Keith Burke in Dublin 8.',
  },
  {
    name: 'Exotic Cuts',
    kind: 'Barber Studio · Greystones',
    image: '/images/exoticcuts.png',
    tags: ['Web Design', 'Booking', 'Brand'],
    blurb:
      'Precision fades and premium grooming in Greystones — sleek barber studio site with online booking.',
  },
];
