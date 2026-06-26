export const metadata = {
  title: 'Nabrix - AI Neighborhood Reports for Real Estate Agents',
  description: 'Generate branded, magazine-quality neighborhood reports in seconds. Join the waitlist for early access.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
