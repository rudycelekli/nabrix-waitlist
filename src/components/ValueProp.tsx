import { FileText, Clock, Palette, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Generate in seconds",
    description:
      "Enter a ZIP code, choose your audience and tone, and get a polished report before your coffee gets cold.",
  },
  {
    icon: Palette,
    title: "Fully branded",
    description:
      "Every report carries your colors, logo, and voice. It looks like you hired a designer—because AI did.",
  },
  {
    icon: TrendingUp,
    title: "Data-rich insights",
    description:
      "Market trends, school ratings, walkability scores, and neighborhood narratives that sellers actually read.",
  },
  {
    icon: FileText,
    title: "Magazine-quality PDF",
    description:
      "Export print-ready PDFs with professional typography, charts, and layouts that stand out in any listing packet.",
  },
];

export default function ValueProp() {
  return (
    <section id="benefits" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-dark">Why agents love it</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Everything you need to wow sellers
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Nabrix replaces hours of manual research and design with one intelligent workflow.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-start">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                <b.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold leading-7 text-navy">{b.title}</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
