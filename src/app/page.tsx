import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6 py-24 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-indigo-300 font-medium mb-8 hover:bg-slate-800 transition-colors cursor-default">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next.js App Router Practice</span>
          </div>

          <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
            Mastering <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Modern React
            </span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-12 leading-relaxed">
            A comprehensive playground for testing new Next.js features, state management patterns, and building premium UI components with Tailwind CSS.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-24">
            <Link 
              href="/examples"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
            >
              View Example Apps
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a 
              href="https://nextjs.org/docs" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 transition-all duration-200 bg-slate-900 border border-slate-800 rounded-full hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
            >
              Read Documentation
            </a>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full text-left">
            <Link href="/examples/todo-rsc" className="group flex flex-col items-start p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-900 transition-colors cursor-pointer">
              <div className="p-3 bg-indigo-500/10 rounded-xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-indigo-400 transition-colors">RSC Todo App</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A Server Components-based Todo app integrated with SQLite and Drizzle ORM.</p>
            </Link>

            <Link href="/examples/todo-rsc-mvc" className="group flex flex-col items-start p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-900 transition-colors cursor-pointer">
              <div className="p-3 bg-blue-500/10 rounded-xl mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-blue-400 transition-colors">Enterprise MVC Todo</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A scalable pattern separating Data Access (Service), Server Actions (Controller), and UI (View).</p>
            </Link>

            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-900 transition-colors">
              <div className="p-3 bg-teal-500/10 rounded-xl mb-4 text-teal-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">Premium UI</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Carefully crafted interfaces with micro-animations and Tailwind CSS utility classes.</p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-900 transition-colors">
              <div className="p-3 bg-amber-500/10 rounded-xl mb-4 text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">State Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Examples showcasing different ways to handle complex state in React.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
