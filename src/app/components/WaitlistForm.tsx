"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  brokerage: string;
  zip: string;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  brokerage?: string;
  zip?: string;
}

export default function WaitlistForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    brokerage: "",
    zip: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = "Name is required";
    if (!data.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email";
    }
    if (!data.brokerage.trim()) next.brokerage = "Brokerage is required";
    if (data.zip && !/^\d{5}(-\d{4})?$/.test(data.zip)) {
      next.zip = "Please enter a valid ZIP code";
    }
    return next;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          brokerage: form.brokerage,
          zip: form.zip,
          website: form.website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrorMessage(data.message || "Something went wrong. Please try again.");
        }
        return;
      }

      // GA4 conversion event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "waitlist_signup", {
          event_category: "engagement",
          event_label: "waitlist",
          value: 1,
        });
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-white/10 p-8 backdrop-blur">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 mb-4">
          <svg
            className="h-6 w-6 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">
          You are on the list!
        </h3>
        <p className="mt-2 text-white/80">
          We will reach out when early access is available.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white/10 p-8 backdrop-blur text-left"
      noValidate
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => handleChange("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-300">
              {errors.name}
            </p>
          )}
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-300">
              {errors.email}
            </p>
          )}
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="brokerage" className="sr-only">
            Brokerage
          </label>
          <input
            id="brokerage"
            name="brokerage"
            type="text"
            autoComplete="organization"
            placeholder="Brokerage"
            value={form.brokerage}
            onChange={(e) => handleChange("brokerage", e.target.value)}
            aria-invalid={errors.brokerage ? "true" : "false"}
            aria-describedby={
              errors.brokerage ? "brokerage-error" : undefined
            }
            className={}
          />
          {errors.brokerage && (
            <p id="brokerage-error" className="mt-1 text-sm text-red-300">
              {errors.brokerage}
            </p>
          )}
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="zip" className="sr-only">
            ZIP code
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            autoComplete="postal-code"
            placeholder="ZIP code (optional)"
            value={form.zip}
            onChange={(e) => handleChange("zip", e.target.value)}
            aria-invalid={errors.zip ? "true" : "false"}
            aria-describedby={errors.zip ? "zip-error" : undefined}
            className={}
          />
          {errors.zip && (
            <p id="zip-error" className="mt-1 text-sm text-red-300">
              {errors.zip}
            </p>
          )}
        </div>
      </div>

      {errorMessage && (
        <p className="mt-4 text-sm text-red-300 text-center">
          {errorMessage}
        </p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Join the waitlist"}
        </button>
      </div>
    </form>
  );
}
