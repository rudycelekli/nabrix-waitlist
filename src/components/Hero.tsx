"use client";

import { ArrowRight } from "lucide-react";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-teal ring-1 ring-white/20 backdrop-blur">
            Early access waitlist now open
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Neighborhood reports that
            <span className="text-teal"> win listings</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
            Nabrix uses AI to generate branded, magazine-quality neighborhood intelligence
            reports in seconds. Impress sellers. Close faster. Work less.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onCtaClick}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-dark hover:shadow-teal/25 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-navy"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#preview"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white ring-1 ring-white/30 transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
            >
              See a preview
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Free for early-access agents. No credit card required.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
    </section>
  );
}
