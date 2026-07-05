import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-black mb-6 text-slate-900">Welcome to the Product</h1>
      <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        This marketing page uses a completely different layout than the dashboard. By wrapping it in a <code>(marketing)</code> folder, it inherits the light-themed, minimalist layout without loading any of the dashboard's heavy sidebar or context providers.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-colors shadow-lg">
          Get Started For Free
        </button>
        <Link href="/examples/nextjs-design-patterns" className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-full transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Patterns
        </Link>
      </div>
    </div>
  );
}
