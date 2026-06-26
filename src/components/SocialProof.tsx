import { Star, Award, Users, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Brokerages interested", value: "10+", icon: Users },
  { label: "Charlotte market focus", value: "NC/SC", icon: Award },
  { label: "Early access slots", value: "Limited", icon: ShieldCheck },
];

export default function SocialProof() {
  return (
    <section className="bg-navy py-24 sm:py-32 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal">Built by industry veterans</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by agents who move fast
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3 lg:max-w-none">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <s.icon className="h-8 w-8 text-teal" aria-hidden="true" />
              <div className="mt-4 text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-sm text-slate-300">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-teal text-teal" />
            ))}
          </div>
          <blockquote className="mt-4 text-lg font-medium leading-8 text-white">
            &ldquo;If I can hand a seller a beautiful neighborhood report at the listing
            appointment, I win the listing. Nabrix lets me do that in under a minute.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold text-lg">
              MQ
            </div>
            <div>
              <div className="text-base font-semibold">Morgan Quinn</div>
              <div className="text-sm text-slate-400">Founder & CTO, Nabrix</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
