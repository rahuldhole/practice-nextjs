'use client';

import { useState } from 'react';
import { setKvValue, getKvValue, removeKvValue } from './actions';
import Link from 'next/link';

export default function UnstorageExample() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleSet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setKvValue(key, value);
      setMessage(`Successfully set "${key}"!`);
      setResult(null);
    } catch (err) {
      setMessage(`Error setting value.`);
    }
  };

  const handleGet = async () => {
    try {
      const val = await getKvValue(key);
      setResult(val !== null ? val : 'Not found');
      setMessage(`Successfully retrieved "${key}"`);
    } catch (err) {
      setMessage(`Error getting value.`);
    }
  };

  const handleRemove = async () => {
    try {
      await removeKvValue(key);
      setMessage(`Successfully removed "${key}"`);
      setResult(null);
    } catch (err) {
      setMessage(`Error removing value.`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      <div className="mb-8">
        <Link href="/examples" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mb-6 transition-colors">
          &larr; Back to Examples
        </Link>
        <h1 className="text-3xl font-bold mb-2">Unstorage KV Example</h1>
        <p className="text-slate-400">Test your universal Key-Value storage implementation</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSet} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Key</label>
            <input 
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. user:123:name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Value</label>
            <input 
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div className="flex gap-4 mt-4">
            <button 
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Set Key
            </button>
            <button 
              type="button"
              onClick={handleGet}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Get Key
            </button>
            <button 
              type="button"
              onClick={handleRemove}
              className="flex-1 bg-rose-900/50 hover:bg-rose-900 border border-rose-800 text-rose-200 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Remove
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-slate-300">{message}</p>
            {result !== null && (
              <div className="mt-2 font-mono bg-slate-900 p-3 rounded border border-slate-800 text-emerald-400 overflow-x-auto">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
