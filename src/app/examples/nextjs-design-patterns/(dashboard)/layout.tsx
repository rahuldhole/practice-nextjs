import { Home, Users, Settings, Activity } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] bg-slate-950 text-slate-200 font-sans flex border border-slate-800 rounded-2xl overflow-hidden mt-8 shadow-2xl">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-8">
        <div className="font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
          AppDash
        </div>
        <nav className="flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-amber-400 rounded-xl font-medium"><Home className="w-5 h-5" /> Overview</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-medium transition-colors"><Activity className="w-5 h-5" /> Analytics</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-medium transition-colors"><Users className="w-5 h-5" /> Team</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-medium transition-colors"><Settings className="w-5 h-5" /> Settings</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-slate-950">
        {children}
      </main>
    </div>
  );
}
