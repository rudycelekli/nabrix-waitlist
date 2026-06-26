import { NextRequest, NextResponse } from "next/server";

interface InterviewBody {
  name: string;
  email: string;
  brokerage: string;
  phone?: string;
  market?: string;
  experience?: string;
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function validateBody(body: unknown): { valid: false; error: string } | { valid: true; data: InterviewBody } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body" };
  }
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const brokerage = typeof b.brokerage === "string" ? b.brokerage.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const market = typeof b.market === "string" ? b.market.trim() : "";
  const experience = typeof b.experience === "string" ? b.experience.trim() : "";

  if (!name) return { valid: false, error: "Name is required" };
  if (!email) return { valid: false, error: "Email is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { valid: false, error: "Invalid email format" };
  if (!brokerage) return { valid: false, error: "Brokerage is required" };

  return { valid: true, data: { name, email, brokerage, phone: phone || undefined, market: market || undefined, experience: experience || undefined } };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateBody(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 422 });
    }

    const { data } = validation;

    const apiKey = process.env.AGNTCS_API_KEY;
    const companyId = process.env.AGNTCS_COMPANY_ID || "2cde89b4-d579-4301-a647-987503c73c10";

    if (!apiKey) {
      console.error("AGNTCS_API_KEY is not configured");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const crmRes = await fetch(
      ,
      {
        method: "POST",
        headers: {
          Authorization: ,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.name,
          email: data.email,
          phone: data.phone,
          title: "Real Estate Agent",
          location: data.market || undefined,
          source: "interview_signup",
          lifecycleStage: "lead",
          metadata: {
            brokerage: data.brokerage,
            market: data.market,
            experience: data.experience,
            source: "interview_signup",
            landingPageUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nabrix-waitlist.vercel.app/interview",
            issueIdentifier: "NAB-43",
          },
        }),
      }
    );

    if (!crmRes.ok) {
      const errText = await crmRes.text().catch(() => "Unknown CRM error");
      console.error("CRM error:", crmRes.status, errText);
      return NextResponse.json({ error: "We could not save your submission. Please try again later." }, { status: 502 });
    }

    const crmData = await crmRes.json().catch(() => ({}));

    return NextResponse.json(
      { success: true, message: "Interview request received.", personId: crmData.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Interview submission error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
