# Nabrix Waitlist Landing Page

High-converting waitlist landing page for Nabrix — AI-generated neighborhood reports for real estate agents.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Font:** Geist (Vercel)
- **Icons:** Lucide React
- **Form backend:** Next.js API Route → AGNTCS CRM

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `AGNTCS_API_KEY` | API key for writing waitlist signups to the native CRM |
| `AGNTCS_COMPANY_ID` | Nabrix company ID in AGNTCS |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the deployed site |

## Deployment

This project requires a platform that supports Next.js serverless functions (API routes).

**Recommended:** [Vercel](https://vercel.com)
1. Import the GitHub repository into Vercel.
2. Add the environment variables above in Project Settings.
3. Deploy.

**Alternatives:** Netlify, Railway, or Render also work.

## Build

```bash
pnpm build
```

Static pages are pre-rendered. The `/api/waitlist` endpoint runs as a serverless function.
