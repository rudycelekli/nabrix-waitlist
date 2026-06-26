import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, brokerage, zip, website } = body

    // Honeypot spam protection
    if (website && website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!brokerage || typeof brokerage !== 'string' || brokerage.trim().length < 2) {
      return NextResponse.json({ error: 'Brokerage is required' }, { status: 400 })
    }

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    const apiKey = process.env.AGNTCS_API_KEY
    if (!apiKey) {
      console.error('AGNTCS_API_KEY not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const crmPayload = {
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      company: brokerage.trim(),
      status: 'waitlist',
      source: 'landing_page',
      tags: ['waitlist', 'landing_page'],
      notes: zip ? `ZIP code of interest: ${zip}` : 'Waitlist signup from landing page',
    }

    const crmRes = await fetch(
      'https://www.regently.ai/api/companies/2cde89b4-d579-4301-a647-987503c73c10/crm/people',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crmPayload),
      }
    )

    if (!crmRes.ok) {
      const errText = await crmRes.text().catch(() => 'Unknown CRM error')
      console.error('CRM error:', crmRes.status, errText)
      return NextResponse.json({ error: 'Failed to save signup. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    console.error('Waitlist API error:', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
