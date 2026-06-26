export default function Footer() {
  return (
    <footer className="bg-navy py-12 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Nabrix</span>
            <span className="text-xs text-slate-400">Beta</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="mailto:hello@nabrix.ai" className="hover:text-white transition">
              Contact
            </a>
          </div>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Nabrix. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
