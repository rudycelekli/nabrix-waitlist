import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  brokerage: z.string().min(1, 'Brokerage is required'),
  zipCode: z.string().regex(/^$|^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code').optional(),
  website: z.string().optional(), // honeypot
})

type ResponseData = {
  success: boolean
  message?: string
  errors?: Record<string, string>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  // Honeypot check
  if (req.body.website) {
    return res.status(400).json({ success: false, message: 'Invalid submission' })
  }

  const parsed = waitlistSchema.safeParse(req.body)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    parsed.error.issues.forEach(issue => {
      const path = issue.path[0] as string
      errors[path] = issue.message
    })
    return res.status(422).json({ success: false, errors })
  }

  const { name, email, brokerage, zipCode } = parsed.data

  try {
    // If AGNTCS_API_KEY is configured, create a CRM Person record
    const apiKey = process.env.AGNTCS_API_KEY
    const companyId = process.env.AGNTCS_COMPANY_ID || '2cde89b4-d579-4301-a647-987503c73c10'

    if (apiKey) {
      const crmRes = await fetch(
        `https://www.regently.ai/api/companies/${companyId}/crm/people`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            company: brokerage,
            metadata: {
              source: 'landing_page',
              status: 'waitlist',
              zipCode: zipCode || null,
            },
          }),
        }
      )

      if (!crmRes.ok) {
        console.error('CRM creation failed:', await crmRes.text())
      }
    }

    // TODO: Optionally send notification email, add to mailing list, etc.

    return res.status(200).json({ success: true, message: 'Welcome to the waitlist!' })
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
}
