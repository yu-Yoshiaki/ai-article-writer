'use client';

import React from 'react';
import { useAuth } from './AuthProvider';
import { LoginButton } from './LoginButton';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="mystical-card p-8 text-center space-y-6">
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