'use client';

import { useState, useEffect } from 'react';
import { signIn, signUp, useSession, signOut } from '@/lib/better-auth-client';
import Link from 'next/link';

export default function BetterAuthExamplePage() {
  const [mounted, setMounted] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  const loading = session.isPending;

  // Form State
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dashboard Sub-Tabs State
  const [activeAccountTab, setActiveAccountTab] = useState<'profile' | 'session' | 'protected'>('profile');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      if (isSignUp) {
        const res = await signUp.email({
          email,
          password,
          name: name || email.split('@')[0],
        });
        if (res.error) {
          throw new Error(res.error.message || 'Registration failed');
        }
        setSuccessMsg('Account registered successfully!');
      } else {
        const res = await signIn.email({
          email,
          password,
        });
        if (res.error) {
          throw new Error(res.error.message || 'Sign in failed');
        }
        setSuccessMsg('Signed in successfully!');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);
    try {
      const demoEmail = `better.user.${Date.now()}@example.com`;
      const demoPass = 'BetterAuthPass123!';
      const res = await signUp.email({
        email: demoEmail,
        password: demoPass,
        name: 'Better Auth Demo User',
      });
      if (res.error) {
        throw new Error(res.error.message || 'Demo login failed');
      }
      setSuccessMsg('Created and signed in as Better Auth Demo User!');
    } catch (err: any) {
      setErrorMsg(err.message || 'Demo login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <Link href="/examples" className="text-sm text-slate-400">Back to Examples</Link>
          <div className="h-6 w-32 bg-slate-800 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-purple-400 animate-spin mb-3" />
          <p className="text-xs font-mono">Initializing Better Auth...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <Link
          href="/examples"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Examples
        </Link>

        {/* Engine Status Pill */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-purple-900/60 bg-purple-950/40 shadow-inner text-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-purple-400" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
          </span>
          <span className="text-purple-200 font-medium">
            Authentication Engine: <strong className="text-purple-300">Better Auth (TypeScript Framework)</strong>
          </span>
        </div>
      </div>

      {/* Main Hero Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          Better Auth <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500">Authentication</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Comprehensive authentication management using <strong>Better Auth</strong> with Next.js Route Handlers and Prisma database adapter.
        </p>
      </div>

      {/* Main Grid Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl text-slate-400">
          <svg className="w-10 h-10 animate-spin text-purple-400 mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-sm font-medium font-mono">Verifying Better Auth Session...</p>
        </div>
      ) : user ? (
        /* ================= AUTHENTICATED DASHBOARD ================= */
        <div className="space-y-8">
          {/* Top User Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-pink-500 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{user.name || 'Better Auth User'}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-950 text-purple-300 border border-purple-800/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" /> Active Session
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{user.email}</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">User ID: {user.id}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleSignOut}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-sm bg-rose-600/15 text-rose-300 border border-rose-800/40 hover:bg-rose-600/30 hover:border-rose-700/60 transition-all flex items-center justify-center gap-2 shadow-lg group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out / Logout
              </button>
            </div>

            {/* Dashboard Sub-Tabs */}
            <div className="flex border-b border-slate-800 mt-8 gap-6 text-sm">
              <button
                onClick={() => setActiveAccountTab('profile')}
                className={`pb-3 font-semibold transition-all border-b-2 ${
                  activeAccountTab === 'profile'
                    ? 'border-purple-400 text-purple-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                User Profile
              </button>
              <button
                onClick={() => setActiveAccountTab('session')}
                className={`pb-3 font-semibold transition-all border-b-2 ${
                  activeAccountTab === 'session'
                    ? 'border-purple-400 text-purple-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Session Data Inspector
              </button>
              <button
                onClick={() => setActiveAccountTab('protected')}
                className={`pb-3 font-semibold transition-all border-b-2 ${
                  activeAccountTab === 'protected'
                    ? 'border-purple-400 text-purple-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Protected Member Gate
              </button>
            </div>
          </div>

          {/* Account Tab Content */}
          {activeAccountTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Account Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500 block">Full Name</span>
                      <span className="font-semibold text-white">{user.name || 'Not specified'}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Better Auth User</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500 block">Primary Email</span>
                      <span className="font-semibold text-white">{user.email}</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                      Active
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500 block">Auth Engine</span>
                      <span className="font-semibold text-purple-400">Better Auth (TypeScript Framework)</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">/api/auth/*</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white mb-2">Quick Security Action</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Click below to terminate your session via Better Auth client.
                  </p>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all"
                >
                  Logout Account
                </button>
              </div>
            </div>
          )}

          {activeAccountTab === 'session' && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Session Payload Inspector</h3>
              <p className="text-xs text-slate-400 mb-4">
                Raw session object returned from <code className="text-purple-400">useSession()</code> hook:
              </p>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed">
{JSON.stringify(session.data, null, 2)}
              </pre>
            </div>
          )}

          {activeAccountTab === 'protected' && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-800/40">
              <div className="flex items-center gap-3 mb-3 text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-lg font-bold text-white">Protected Secret Member Content</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Access granted! Better Auth session validated for <strong>{user.email}</strong>.
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-900/60 text-xs text-purple-300 font-mono">
                <code>MEMBER_SECRET = "Better Auth Session Authenticated Successfully!"</code>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= UNAUTHENTICATED SIGN IN / SIGN UP ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Form Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
                  !isSignUp ? 'border-purple-400 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
                  isSignUp ? 'border-purple-400 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign Up / Register
              </button>
            </div>

            {/* Quick Demo Login */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-purple-600/20 text-purple-300 border border-purple-800/50 hover:bg-purple-600/30 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                One-Click Register & Login as Demo User
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs mb-4">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-600/25 transition-all disabled:opacity-50 mt-2"
              >
                {submitting ? 'Authenticating...' : isSignUp ? 'Create Better Auth Account' : 'Sign In with Better Auth'}
              </button>
            </form>
          </div>

          {/* Right Column: Protected Gate Preview */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="font-bold text-white">Better Auth Protected Gate</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Sign in or register a new user to test Better Auth's session engine and route handlers (`/api/auth/*`).
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Current Status:</span>
                  <span className="text-rose-400 font-semibold">Logged Out</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Auth Engine:</span>
                  <span className="text-purple-400 font-mono">Better Auth</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Endpoint:</span>
                  <span className="text-slate-300 font-mono text-[11px]">/api/auth/[...all]</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 text-[11px] text-slate-500 flex justify-between">
              <span>Step 1: Pure Better Auth</span>
              <span>Practice Next.js</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
