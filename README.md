# Nabrix Waitlist Landing Page

A high-converting waitlist landing page for Nabrix — AI-powered neighborhood reports for real estate agents.

## Features

- **Responsive Design**: Mobile-first, works beautifully on all devices
- **Sections**: Hero, value proposition, report preview, social proof, waitlist form, footer
- **Form Validation**: Real-time frontend validation with helpful error messages
- **CRM Integration**: API route creates Person records in Regentics CRM on submission
- **Spam Protection**: Honeypot field to catch bots

## Tech Stack

- Next.js 14 (App Router)
- React + TypeScript
- CSS Modules (plain CSS)
- Zod for validation

## Local Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Deployment

### Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add environment variables:
   - `AGNTCS_API_KEY` — Your Regentics server API key (for CRM sync)
   - `AGNTCS_COMPANY_ID` — Your company ID (default already set)
4. Deploy — Vercel handles the rest

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AGNTCS_API_KEY` | Yes* | Server API key for CRM integration |
| `AGNTCS_COMPANY_ID` | No | Defaults to Nabrix company ID |

*Without `AGNTCS_API_KEY`, the form will still submit but won't create CRM records.

## Project Structure

```
├── pages/
│   ├── index.tsx       # Landing page
│   └── api/
│       └── waitlist.ts   # Form submission API
├── styles/
│   └── globals.css     # Global styles
├── package.json
├── tsconfig.json
└── next.config.js
```

## Form Fields

- **Name** (required)
- **Email** (required, validated)
- **Brokerage** (required)
- **ZIP Code** (optional, validated)

On successful submission, a Person record is created in the native Regentics CRM with:
- `source`: `landing_page`
- `status`: `waitlist`

## License

Private — Nabrix internal use only.
