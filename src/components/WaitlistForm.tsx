"use client";

import { useState, useRef, FormEvent } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  brokerage: string;
  zip: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  brokerage?: string;
}

export default function WaitlistForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", brokerage: "", zip: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!data.brokerage.trim()) errs.brokerage = "Brokerage is required";
    return errs;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Honeypot check
    if (honeypotRef.current?.value) {
      return;
    }

    const allTouched = { name: true, email: true, brokerage: true };
    setTouched(allTouched);
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="waitlist" className="bg-sand py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-teal" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy">You are on the list</h2>
          <p className="mt-4 text-lg text-slate-600">
            We will reach out as soon as early access opens. Welcome to the future of
            neighborhood intelligence.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", brokerage: "", zip: "" });
              setErrors({});
              setTouched({});
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Sign up another colleague
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-dark">Get early access</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Join the Nabrix waitlist
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Be the first to generate AI-powered neighborhood reports for your listings.
            Early access is free for a limited number of agents.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Honeypot */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className={`mt-1 block w-full rounded-lg border px-4 py-3 text-navy shadow-sm focus:outline-none focus:ring-2 focus:ring-teal ${
                  errors.name && touched.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-300 focus:border-teal"
                }`}
                placeholder="Jane Doe"
                autoComplete="name"
              />
              {errors.name && touched.name && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`mt-1 block w-full rounded-lg border px-4 py-3 text-navy shadow-sm focus:outline-none focus:ring-2 focus:ring-teal ${
                  errors.email && touched.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-300 focus:border-teal"
                }`}
                placeholder="jane@brokerage.com"
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="brokerage" className="block text-sm font-medium text-navy">
                Brokerage <span className="text-red-500">*</span>
              </label>
              <input
                id="brokerage"
                type="text"
                value={form.brokerage}
                onChange={(e) => handleChange("brokerage", e.target.value)}
                onBlur={() => handleBlur("brokerage")}
                className={`mt-1 block w-full rounded-lg border px-4 py-3 text-navy shadow-sm focus:outline-none focus:ring-2 focus:ring-teal ${
                  errors.brokerage && touched.brokerage
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-300 focus:border-teal"
                }`}
                placeholder="Keller Williams Realty"
                autoComplete="organization"
              />
              {errors.brokerage && touched.brokerage && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.brokerage}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-navy">
                ZIP code of interest <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="zip"
                type="text"
                value={form.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-navy shadow-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal"
                placeholder="28203"
                autoComplete="postal-code"
              />
            </div>

            {submitError && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-500">
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
