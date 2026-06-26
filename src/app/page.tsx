import WaitlistForm from "@/app/components/WaitlistForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-light px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-accent/10 px-3 py-1 text-sm font-medium text-brand-accent mb-8">
            Coming soon — Join the waitlist
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Neighborhood reports that
            <span className="text-brand-accent"> sell homes</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted max-w-2xl mx-auto">
            Nabrix uses AI to generate stunning, branded neighborhood reports
            in seconds. Impress buyers, win listings, and reclaim hours of
            research time.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#waitlist"
              className="rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-colors"
            >
              Join the waitlist
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold leading-6 text-foreground hover:text-brand-accent transition-colors"
            >
              See how it works <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section
        id="how-it-works"
        className="bg-white px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-accent">
              Why agents love Nabrix
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to stand out
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: "AI-Generated Reports",
                  description:
                    "Enter a ZIP code and audience. Nabrix researches demographics, schools, market trends, and lifestyle data to build a comprehensive report automatically.",
                },
                {
                  title: "Your Brand, Front & Center",
                  description:
                    "Every report is customized with your headshot, brokerage logo, colors, and contact information. It looks like you spent hours on it.",
                },
                {
                  title: "PDF-Ready in Seconds",
                  description:
                    "Download a beautifully formatted PDF perfect for open houses, listing presentations, email campaigns, and social media sharing.",
                },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <svg
                      className="h-5 w-5 flex-none text-brand-accent"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Visual Preview */}
      <section className="bg-brand-light px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Reports that look like you hired a designer
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Clean layouts, premium typography, and data-rich sections tailored
              to your market.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
            <div className="bg-brand px-6 py-4 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-white/80 font-medium">
                Nabrix Report Preview
              </span>
            </div>
            <div className="p-8 sm:p-12 grid gap-8">
              <div className="border-b pb-6">
                <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
                <div className="h-8 w-3/4 bg-gray-100 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-brand-light p-4">
                  <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
                  <div className="h-6 w-24 bg-gray-300 rounded" />
                </div>
                <div className="rounded-lg bg-brand-light p-4">
                  <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
                  <div className="h-6 w-24 bg-gray-300 rounded" />
                </div>
                <div className="rounded-lg bg-brand-light p-4">
                  <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
                  <div className="h-6 w-24 bg-gray-300 rounded" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-5/6 bg-gray-100 rounded" />
                <div className="h-3 w-4/6 bg-gray-100 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-24 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-muted">
                  Neighborhood Map
                </div>
                <div className="h-24 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-muted">
                  School Ratings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built by agents, for agents
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Nabrix was founded by a real estate professional who understood
              that neighborhood research was the most time-consuming part of
              every listing presentation.
            </p>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="max-w-sm rounded-2xl bg-brand-light p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-brand/10 flex items-center justify-center text-xl font-bold text-brand">
                R
              </div>
              <p className="mt-6 text-base leading-7 text-muted italic">
                "I was spending 3–4 hours on every neighborhood report. Nabrix
                does it in under a minute, and my clients are blown away by the
                quality."
              </p>
              <div className="mt-6">
                <p className="font-semibold text-foreground">Rudy C.</p>
                <p className="text-sm text-muted">Founder, Nabrix</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section
        id="waitlist"
        className="bg-brand px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get early access
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Join the waitlist to be among the first agents to use Nabrix. No
            credit card required.
          </p>
          <div className="mt-10">
            <WaitlistForm />
          </div>
          <p className="mt-4 text-sm text-white/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-light px-6 py-12 lg:px-8 border-t border-gray-200">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">Nabrix</span>
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Nabrix. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a
              href="mailto:hello@nabrix.com"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
