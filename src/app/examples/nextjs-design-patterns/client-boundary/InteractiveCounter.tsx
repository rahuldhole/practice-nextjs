'use client';

import { useState } from 'react';

export function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4 p-2 bg-slate-900 border border-fuchsia-500/30 rounded-lg relative group">
      <div className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="px-2 py-0.5 bg-fuchsia-500 text-white text-[10px] font-bold rounded shadow-lg">CLIENT LEAF</span>
      </div>
      <button 
        onClick={() => setCount(c => Math.max(0, c - 1))}
        className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
      >-</button>
      <span className="w-4 text-center text-slate-200 font-medium">{count}</span>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
      >+</button>
    </div>
  );
}
