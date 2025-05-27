import React from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from './AuthProvider';

export function LoginButton() {
  const { signInWithGoogle } = useAuth();

  return (
    <button
      onClick={signInWithGoogle}
      className="mystical-button flex items-center space-x-2"
    >
      <LogIn className="size-5" />
      <span>Sign in with Google</span>
    </button>
  );
}