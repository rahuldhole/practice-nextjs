export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="px-6 py-4 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-amber-600">MarketingSite</div>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-amber-600">Features</a>
            <a href="#" className="hover:text-amber-600">Pricing</a>
            <a href="#" className="hover:text-amber-600">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
