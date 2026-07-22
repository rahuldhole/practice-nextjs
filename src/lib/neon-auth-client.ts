'use client';

import { useState, useEffect, useCallback } from 'react';

import { NEON_AUTH_URL } from './neon-auth';

export type NeonUserProfile = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role?: string;
  createdAt?: string;
};

export function useNeonAuthSession() {
  const [user, setUser] = useState<NeonUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [neonAuthUrl, setNeonAuthUrl] = useState<string | null>(NEON_AUTH_URL);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${NEON_AUTH_URL}/get-session`, {
        cache: 'no-store',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user || data.session?.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const signIn = async (email: string, password?: string) => {
    const res = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || data.message || 'Neon Auth Sign in failed');
    }

    await refreshSession();
    return data;
  };

  const signUp = async (email: string, name?: string, password?: string) => {
    const res = await fetch(`${NEON_AUTH_URL}/sign-up/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: name || email.split('@')[0] }),
      credentials: 'include',
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || data.message || 'Neon Auth Sign up failed');
    }

    await refreshSession();
    return data;
  };

  const signOut = async () => {
    await fetch(`${NEON_AUTH_URL}/sign-out`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    setUser(null);
    await refreshSession();
  };

  const signInSocial = async (provider: string) => {
    const res = await fetch(`${NEON_AUTH_URL}/sign-in/social`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        callbackURL: typeof window !== 'undefined' ? window.location.href : '',
      }),
      credentials: 'include',
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || data.message || 'Neon Auth Social Sign in failed');
    }

    if (data.url) {
      window.location.href = data.url;
    } else if (data.redirect) {
      window.location.href = data.redirect;
    }
  };

  return {
    user,
    loading,
    neonAuthUrl,
    signIn,
    signInSocial,
    signUp,
    signOut,
    refreshSession,
  };
}
