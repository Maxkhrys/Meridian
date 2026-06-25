# Meridian

Premium business website for **Meridian** — a web design & digital services
company based in Wicklow, Ireland. Built as a single-page, dark-themed,
animation-rich showcase and lead-generation site.

## Tech Stack

- **Vite + React** (TypeScript)
- **Tailwind CSS** for styling
- **GSAP** (`@gsap/react` + `ScrollTrigger`) for animations
- **Lenis** for smooth scrolling
- **EmailJS** for the contact / quote form (no backend required)
- Deploy target: **Vercel**

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (see EmailJS below)
cp .env.example .env

# 3. Run the dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview
```

## Configuring EmailJS

The contact form sends enquiries to **popupmax@gmail.com** via
[EmailJS](https://www.emailjs.com) — no backend needed.

1. Create a free account at <https://www.emailjs.com>.
2. **Add an Email Service** (e.g. Gmail) — copy the **Service ID**.
3. **Create an Email Template**. Use these variables in the template body so
   the enquiry details come through:
   - `{{name}}`, `{{business_name}}`, `{{email}}`, `{{phone}}`
   - `{{business_type}}`, `{{has_website}}`, `{{looking_for}}`, `{{message}}`
   - Set the template's **To Email** to `popupmax@gmail.com` (or use
     `{{to_email}}`, which the form also sends).
   - Copy the **Template ID**.
4. From **Account → General**, copy your **Public Key**.
5. Add the three values to `.env`:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

Until these are set, the form renders and validates but shows a notice that
sending is disabled.

## Project Structure

```
src/
  components/      # Navbar, Hero, Services, Pricing, Portfolio, About,
                   # Testimonials, Contact, Footer, SectionHeading
  hooks/
    useLenis.ts    # Lenis smooth scroll + GSAP ticker integration
    useGSAP.ts     # GSAP/ScrollTrigger setup, scrollToId helper
  lib/
    emailjs.ts     # EmailJS send wrapper
  App.tsx
  main.tsx
  index.css        # Tailwind layers + design tokens
```

## Swapping Portfolio Images

Portfolio cards use a generated dark mockup frame by default. To use a real
screenshot, drop the image in `public/` and set the `image` field on the
project in `src/components/Portfolio.tsx`:

```ts
{
  name: 'The Boat Yard Sauna',
  image: '/boatyard.png', // add this line
  ...
}
```

## Design Tokens

Colours, fonts, shadows and the emerald glow are defined in
`tailwind.config.js` and `src/index.css`. The palette is intentionally dark
with emerald (`#10b981`) used sparingly for accents.

## Deploying to Vercel

This repo is Vercel-ready (`vercel.json` included). Import the repo into
Vercel, add the three `VITE_EMAILJS_*` environment variables in the project
settings, and deploy. Framework preset: **Vite**.

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Type-check and build for prod     |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |
| `npm run format`  | Format with Prettier             |
