'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { PenTool, User, LogOut, Home } from 'lucide-react';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <PenTool className="size-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">PatchWrite</span>
              </Link>

              <nav className="hidden space-x-6 md:flex">
                <Link
                  href="/"
                  className={`flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Home className="size-4" />
                  <span>ホーム</span>
                </Link>

                <Link
                  href="/editor"
                  className={`flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/editor') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <PenTool className="size-4" />
                  <span>エディター</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/profile') 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        width={24}
                        height={24}
                        className="size-6 rounded-full object-cover"
                      />
                    ) : (
                      <User className="size-4" />
                    )}
                    <span className="hidden md:inline">
                      {user.displayName || 'プロファイル'}
                    </span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    <LogOut className="size-4" />
                    <span className="hidden md:inline">ログアウト</span>
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  ログインしてください
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 PatchWrite. All rights reserved.</p>
            <p className="mt-1">AI と協調しながら記事を部分的に生成・リライトできる Web ライティングツール</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 