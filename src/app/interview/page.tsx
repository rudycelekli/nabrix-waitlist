"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Loader2, Calendar, MessageSquare, Gift } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  brokerage: string;
  phone: string;
  market: string;
  experience: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  brokerage?: string;
  phone?: string;
}

export default function InterviewSignup() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", brokerage: "", phone: "", market: "", experience: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
    const allTouched = { name: true, email: true, brokerage: true, phone: true };
    setTouched(allTouched);
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/interview", {
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
      <main className="flex-1 bg-sand py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-teal" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-navy">Thank you</h1>
          <p className="mt-4 text-lg text-slate-600">
            We have received your interest in the Nabrix research interview. Our team will reach out within 24 hours to schedule your 30-minute session.
          </p>
          <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-light">
            Back to Nabrix
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Shape the future of neighborhood reports
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            We are building Nabrix — AI-powered neighborhood intelligence for real estate agents — and we want to learn from the best.
          </p>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="grid gap-8 sm:grid-cols-3 mb-12">
              <div className="text-center">
                <Calendar className="mx-auto h-8 w-8 text-teal" />
                <h3 className="mt-3 font-semibold text-navy">30 minutes</h3>
                <p className="mt-1 text-sm text-slate-600">Video call at a time that works for you</p>
              </div>
              <div className="text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-teal" />
                <h3 className="mt-3 font-semibold text-navy">Your voice matters</h3>
                <p className="mt-1 text-sm text-slate-600">Help us build what you actually need</p>
              </div>
              <div className="text-center">
                <Gift className="mx-auto h-8 w-8 text-teal" />
                <h3 className="mt-3 font-semibold text-navy">Early access</h3>
                <p className="mt-1 text-sm text-slate-600">Free lifetime access when we launch</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-6">Request your interview slot</h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy">Full name <span className="text-red-500">*</span></label>
                <input id="name" type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} onBlur={() => handleBlur("name")}
                  className={}
                  placeholder="Jane Doe" autoComplete="name" />
                {errors.name && touched.name && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><AlertCircle className="h-4 w-4" />{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy">Email <span className="text-red-500">*</span></label>
                <input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")}
                  className={}
                  placeholder="jane@brokerage.com" autoComplete="email" />
                {errors.email && touched.email && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><AlertCircle className="h-4 w-4" />{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="brokerage" className="block text-sm font-medium text-navy">Brokerage <span className="text-red-500">*</span></label>
                <input id="brokerage" type="text" value={form.brokerage} onChange={(e) => handleChange("brokerage", e.target.value)} onBlur={() => handleBlur("brokerage")}
                  className={}
                  placeholder="Keller Williams Realty" autoComplete="organization" />
                {errors.brokerage && touched.brokerage && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><AlertCircle className="h-4 w-4" />{errors.brokerage}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-navy">Phone <span className="text-slate-400">(optional)</span></label>
                <input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-navy shadow-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="(704) 555-1234" autoComplete="tel" />
              </div>

              <div>
                <label htmlFor="market" className="block text-sm font-medium text-navy">Primary market <span className="text-slate-400">(optional)</span></label>
                <input id="market" type="text" value={form.market} onChange={(e) => handleChange("market", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-navy shadow-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Charlotte, NC" />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-navy">Years in real estate <span className="text-slate-400">(optional)</span></label>
                <select id="experience" value={form.experience} onChange={(e) => handleChange("experience", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-navy shadow-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal">
                  <option value="">Select...</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              {submitError && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{submitError}</div>}

              <button type="submit" disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? <><Loader2 className="h-5 w-5 animate-spin" />Submitting...</> : <>Request interview slot<ArrowRight className="h-4 w-4" /></>}
              </button>

              <p className="text-center text-xs text-slate-500">Your information is confidential and will only be used to schedule the research interview.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
