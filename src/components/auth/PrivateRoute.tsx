'use client';

import React from 'react';
import { useAuth } from './AuthProvider';
import { LoginButton } from './LoginButton';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-purple-400 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mystical-card space-y-6 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100">
            Sign in to Continue
          </h2>
          <p className="text-slate-300">
            Please sign in to access the AI Article Writer
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}