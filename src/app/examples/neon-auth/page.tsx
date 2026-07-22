'use client';

import { useState, useEffect } from 'react';
import { useNeonAuthSession } from '@/lib/neon-auth-client';
import Link from 'next/link';

export default function NeonAuthExamplePage() {
  const [mounted, setMounted] = useState(false);
  const { user, loading, neonAuthUrl, signIn, signInSocial, signUp, signOut } = useNeonAuthSession();

  // Auth Form State
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
        await signUp(email, name, password);
        setSuccessMsg('Registered & logged in successfully on Neon Auth Cloud!');
      } else {
        await signIn(email, password);
        setSuccessMsg('Signed in successfully on Neon Auth Cloud!');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Neon Auth operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);
    try {
      const demoEmail = `neon.user.${Date.now()}@example.com`;
      const demoPass = 'NeonAuthPass123!';
      await signUp(demoEmail, 'Neon Cloud User', demoPass);
      setSuccessMsg('Registered and authenticated on Neon Auth Cloud!');
    } catch (err: any) {
      setErrorMsg(err.message || 'Demo login failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <Link href="/examples" className="text-sm text-slate-400">Back to Examples</Link>
          <div className="h-6 w-32 bg-slate-800 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-cyan-400 animate-spin mb-3" />
          <p className="text-xs font-mono">Connecting to Neon Auth...</p>
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
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-900/60 bg-cyan-950/40 shadow-inner text-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-cyan-400" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="text-cyan-200 font-medium">
            Authentication Engine: <strong className="text-cyan-300">Neon Auth (Cloud API)</strong>
          </span>
        </div>
      </div>

      {/* Main Hero Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          Neon Auth <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Cloud Authentication</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Standalone integration connecting directly to <strong>Neon Auth Cloud Service</strong> at <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded text-xs">{neonAuthUrl}</code>.
        </p>
      </div>

      {/* Main Grid Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl text-slate-400">
          <svg className="w-10 h-10 animate-spin text-cyan-400 mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-sm font-medium font-mono">Verifying Neon Auth Cloud Session...</p>
        </div>
      ) : user ? (
        /* ================= AUTHENTICATED DASHBOARD ================= */
        <div className="space-y-8">
          {/* Top User Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-500 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{user.name || 'Neon Auth User'}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Neon Cloud Verified
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{user.email}</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">User ID: {user.id}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={signOut}
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
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                User Profile
              </button>
              <button
                onClick={() => setActiveAccountTab('session')}
                className={`pb-3 font-semibold transition-all border-b-2 ${
                  activeAccountTab === 'session'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Session Data Inspector
              </button>
              <button
                onClick={() => setActiveAccountTab('protected')}
                className={`pb-3 font-semibold transition-all border-b-2 ${
                  activeAccountTab === 'protected'
                    ? 'border-cyan-400 text-cyan-400'
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
                    <span className="text-xs text-slate-500 font-mono">Neon Account</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500 block">Primary Email</span>
                      <span className="font-semibold text-white">{user.email}</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                      Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500 block">Auth Service</span>
                      <span className="font-semibold text-cyan-400">Neon Auth (Cloud Engine)</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Cloud API</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white mb-2">Quick Security Action</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Click below to terminate your session via Neon Auth API.
                  </p>
                </div>

                <button
                  onClick={signOut}
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
                Raw user record returned from <code className="text-cyan-400">{neonAuthUrl}/get-session</code>:
              </p>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}

          {activeAccountTab === 'protected' && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/40">
              <div className="flex items-center gap-3 mb-3 text-cyan-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-lg font-bold text-white">Protected Secret Member Content</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Access granted! Neon Auth session validated for <strong>{user.email}</strong>.
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/60 text-xs text-cyan-300 font-mono">
                <code>NEON_CLOUD_SECRET = "Neon Auth Cloud Session Authenticated Successfully!"</code>
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
                  !isSignUp ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
                  isSignUp ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
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
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-cyan-600/20 text-cyan-300 border border-cyan-800/50 hover:bg-cyan-600/30 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                One-Click Register & Login on Neon Auth Cloud
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors pr-10"
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
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 mt-2"
              >
                {submitting ? 'Authenticating on Neon Auth...' : isSignUp ? 'Create Neon Auth Account' : 'Sign In with Neon Auth'}
              </button>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">Or continue with</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <button
                type="button"
                onClick={() => signInSocial('google')}
                disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-sm bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </form>
          </div>

          {/* Right Column: Protected Gate Preview */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="font-bold text-white">Neon Auth Protected Gate</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Sign in or register a new user to make live API calls to Neon Auth Cloud service.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Current Status:</span>
                  <span className="text-rose-400 font-semibold">Logged Out</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Auth Engine:</span>
                  <span className="text-cyan-400 font-mono">Neon Auth Cloud</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Endpoint:</span>
                  <span className="text-slate-300 font-mono text-[11px]">{neonAuthUrl}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 text-[11px] text-slate-500 flex justify-between">
              <span>Step 2: Pure Neon Auth</span>
              <span>Practice Next.js</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
