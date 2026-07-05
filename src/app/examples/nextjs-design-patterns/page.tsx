import Link from 'next/link';
import { Cpu, SplitSquareHorizontal, ShieldCheck, Layers, Network, ArrowRight } from 'lucide-react';

export default function PracticalDesignPatternsApp() {
  return (
    <div className="max-w-6xl mx-auto mt-8 flex flex-col items-center">
      <div className="text-center mb-16 w-full max-w-3xl">
        <div className="inline-flex items-center justify-center p-3 bg-fuchsia-500/10 rounded-2xl mb-4">
          <Layers className="w-8 h-8 text-fuchsia-400" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400">
          Practical Next.js Patterns
        </h1>
        <p className="text-slate-400 text-lg">
          Click into each functional example below to see how these advanced architectural patterns behave in real, working code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        <Link href="/examples/nextjs-design-patterns/client-boundary" className="group flex flex-col p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-fuchsia-500/50 transition-all hover:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-fuchsia-500/10 rounded-xl">
              <Cpu className="w-6 h-6 text-fuchsia-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-fuchsia-400 transition-colors" />
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">1. Client-Boundary Push</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Watch a slow Server Component stream in, while a deeply nested interactive Client Component handles state without making the whole page "use client".
          </p>
        </Link>

        <Link href="/examples/nextjs-design-patterns/suspense" className="group flex flex-col p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all hover:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <SplitSquareHorizontal className="w-6 h-6 text-blue-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">2. Static Shell + Suspense</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Experience an instant page load with a skeleton placeholder while a heavy, dynamic data-fetching component streams in independently via Suspense.
          </p>
        </Link>

        <Link href="/examples/nextjs-design-patterns/server-actions" className="group flex flex-col p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all hover:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">3. Server Actions + Optimistic UI</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Submit a form that triggers a simulated 2-second server mutation, but watch the UI update instantly using React's useOptimistic hook.
          </p>
        </Link>

        <Link href="/examples/nextjs-design-patterns/parallel-fetching" className="group flex flex-col p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all hover:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Network className="w-6 h-6 text-indigo-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">4. Parallel Data Fetching</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            See a live performance test comparing a Waterfall fetch (4 seconds) against a Parallel Promise.all fetch (2 seconds).
          </p>
        </Link>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 border-dashed">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-slate-200">5. Route Groups</h2>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm mb-4">
              Explore two totally isolated layouts sharing the same URL hierarchy using (parentheses) folder names.
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Link href="/examples/nextjs-design-patterns/marketing" className="flex items-center justify-between px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors group">
              <span className="text-slate-200 font-medium">(marketing) Route</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/examples/nextjs-design-patterns/dashboard" className="flex items-center justify-between px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors group">
              <span className="text-slate-200 font-medium">(dashboard) Route</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
