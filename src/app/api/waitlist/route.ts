import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  brokerage: z.string().min(1, 'Brokerage is required'),
  zip: z.string().regex(/^$|^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code').optional(),
  website: z.string().optional(), // honeypot
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot check
    if (body.website) {
      return NextResponse.json(
        { success: false, message: 'Invalid submission' },
        { status: 400 }
      )
    }

    const parsed = waitlistSchema.safeParse(body)
    if (!parsed.success) {
      const errors: Record<string, string> = {}
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as string
        errors[path] = issue.message
      })
      return NextResponse.json(
        { success: false, errors },
        { status: 422 }
      )
    }

    const { name, email, brokerage, zip } = parsed.data

    // Create CRM Person record in native Regentics CRM
    const apiKey = process.env.AGNTCS_API_KEY
    const companyId = process.env.AGNTCS_COMPANY_ID || '2cde89b4-d579-4301-a647-987503c73c10'

    if (apiKey) {
      const crmRes = await fetch(
        ,
        {
          method: 'POST',
          headers: {
            Authorization: ,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            company: brokerage,
            metadata: {
              source: 'landing_page',
              status: 'waitlist',
              zipCode: zip || null,
            },
          }),
        }
      )

      if (!crmRes.ok) {
        const errText = await crmRes.text()
        console.error('CRM creation failed:', errText)
        // Still return success to user; log error for debugging
      }
    } else {
      console.warn('AGNTCS_API_KEY not configured; skipping CRM write')
    }

    return NextResponse.json(
      { success: true, message: 'Welcome to the waitlist!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
