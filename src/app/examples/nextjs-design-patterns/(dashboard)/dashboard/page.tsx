import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <Link href="/examples/nextjs-design-patterns" className="px-4 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium rounded-lg transition-colors flex items-center text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Exit Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="text-slate-500 text-sm mb-2">Total MRR</div>
          <div className="text-3xl font-black text-slate-200">$12,450</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="text-slate-500 text-sm mb-2">Active Users</div>
          <div className="text-3xl font-black text-slate-200">1,204</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="text-slate-500 text-sm mb-2">Churn Rate</div>
          <div className="text-3xl font-black text-slate-200">1.2%</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
        <p className="text-slate-400 leading-relaxed max-w-3xl">
          This dashboard page lives inside the <code>(dashboard)</code> route group. It uses a heavy layout with a sidebar and dark theme. By organizing routes into groups, Next.js can isolate these layouts so they don't affect or bloat the lightweight marketing pages.
        </p>
      </div>
    </div>
  );
}
