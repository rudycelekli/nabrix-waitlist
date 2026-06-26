import { MapPin, BarChart3, Home, School } from "lucide-react";

export default function VisualPreview() {
  return (
    <section id="preview" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-dark">See it in action</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            A report that sells the neighborhood
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Here is a preview of what Nabrix generates—rich narratives, data visualizations,
            and local insights formatted for print and digital sharing.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
            {/* Mock browser chrome */}
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 border-b border-slate-100">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200">
                nabrix.ai/report/28203
              </div>
            </div>

            {/* Mock report content */}
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-2 text-sm font-medium text-teal-dark">
                <MapPin className="h-4 w-4" />
                ZIP 28203 — Dilworth, Charlotte, NC
              </div>
              <h3 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
                Dilworth Neighborhood Market Report
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Dilworth remains one of Charlotte’s most desirable in-town neighborhoods.
                Tree-lined streets, historic bungalows, and walkable access to parks and
                restaurants continue to drive strong buyer demand.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-sand p-5">
                  <BarChart3 className="h-6 w-6 text-teal-dark" />
                  <div className="mt-2 text-2xl font-bold text-navy">+8.4%</div>
                  <div className="text-sm text-slate-500">YoY price growth</div>
                </div>
                <div className="rounded-xl bg-sand p-5">
                  <Home className="h-6 w-6 text-teal-dark" />
                  <div className="mt-2 text-2xl font-bold text-navy">12 days</div>
                  <div className="text-sm text-slate-500">Avg. time on market</div>
                </div>
                <div className="rounded-xl bg-sand p-5">
                  <School className="h-6 w-6 text-teal-dark" />
                  <div className="mt-2 text-2xl font-bold text-navy">9.2/10</div>
                  <div className="text-sm text-slate-500">School district rating</div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-navy p-6 text-white">
                <p className="text-sm font-medium text-teal">Agent Insight</p>
                <p className="mt-2 italic text-slate-300 leading-relaxed">
                  &ldquo;Sellers in Dilworth who present a professional neighborhood report at
                  the listing appointment close 23% faster than those who don&rsquo;t.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
