export interface ShowcaseProject {
  /** Display name. */
  name: string;
  /** Short category line. */
  kind: string;
  /** Texture shown on the block's screen (served from /public). */
  image: string;
  /** Live URL — only present for real, shipped work. */
  url?: string;
  /** Whether this is a real client project or a design concept. */
  concept?: boolean;
  /** Capability tags. */
  tags: string[];
  /** One-line blurb shown in the overlay. */
  blurb: string;
}

/**
 * The blocks strung along the chain. Block 0 is real, shipped work; the rest
 * are clearly-labelled design concepts so the chain reads full and varied
 * without misrepresenting client work. Swap concepts for real builds as they
 * ship.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    name: 'The Boat Yard Sauna',
    kind: 'Wellness · Wicklow & Arklow',
    image: '/images/boatyard.png',
    url: 'https://theboatyardsauna.io',
    tags: ['Web Design', 'Booking', 'CMS', 'Animation'],
    blurb:
      'A premium wellness brand with two coastal locations — Astro, Sanity CMS and a live booking system.',
  },
  {
    name: 'Lumière',
    kind: 'Restaurant · Concept',
    image: '/images/concepts/restaurant.svg',
    concept: true,
    tags: ['Web Design', 'Reservations', 'Menu CMS'],
    blurb:
      'A fine-dining concept built around the reservation flow and a nightly-changing seasonal menu.',
  },
  {
    name: 'Fade & Co',
    kind: 'Barbershop · Concept',
    image: '/images/concepts/salon.svg',
    concept: true,
    tags: ['Web Design', 'Online Booking', 'Brand'],
    blurb:
      'A barbershop concept where booking a chair takes under thirty seconds, on any device.',
  },
  {
    name: 'Pulse',
    kind: 'Fitness Studio · Concept',
    image: '/images/concepts/fitness.svg',
    concept: true,
    tags: ['Web Design', 'Class Schedule', 'Memberships'],
    blurb:
      'A strength-and-conditioning studio concept with class schedules and membership plans front and centre.',
  },
  {
    name: 'Marigold',
    kind: 'Café & Bakery · Concept',
    image: '/images/concepts/cafe.svg',
    concept: true,
    tags: ['Web Design', 'Menu', 'Local SEO'],
    blurb:
      'A neighbourhood café concept focused on menu, opening hours and getting found locally.',
  },
  {
    name: 'Atelier',
    kind: 'Boutique Retail · Concept',
    image: '/images/concepts/retail.svg',
    concept: true,
    tags: ['Web Design', 'Storefront', 'Editorial'],
    blurb:
      'A design-led concept store with a clean storefront and an editorial journal to drive discovery.',
  },
];
