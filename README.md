# Nabrix Waitlist Landing Page

A high-converting waitlist landing page for Nabrix, built with Next.js and Tailwind CSS.

## Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Package Manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Static files are output to the `dist/` directory.

## Deployment

This project is configured for automatic deployment to **GitHub Pages** via GitHub Actions. On every push to `main`, the site builds and deploys automatically.

To enable:
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to "GitHub Actions"

Alternatively, deploy to Vercel, Netlify, or Cloudflare Pages by connecting the repository.

## Project Structure

- `src/app/page.tsx` — Landing page with all sections
- `src/app/components/WaitlistForm.tsx` — Client-side waitlist form with validation
- `src/app/layout.tsx` — Root layout and metadata
- `src/app/globals.css` — Global styles and Tailwind theme
- `next.config.ts` — Next.js config with static export

## Sections

1. **Hero** — Headline, subheadline, CTAs
2. **Value Proposition** — 3 key benefits
3. **Visual Preview** — Report mockup placeholder
4. **Social Proof** — Founder story and testimonial
5. **Waitlist Form** — Name, email, brokerage, ZIP capture
6. **Footer** — Links and copyright

## Form Backend

The waitlist form currently submits to a mock endpoint. Wire it to the Nabrix API or a form service (e.g., Typeform, native CRM endpoint) by updating the `handleSubmit` function in `WaitlistForm.tsx`.

## CRM Integration

Per NAB-40, every signup should create a Person record in the native Regentics CRM with:
- `source`: "landing_page"
- `status`: "waitlist"
