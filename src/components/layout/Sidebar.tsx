import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../auth/AuthProvider';
import {
  Home,
  User,
  Settings,
  FileText,
  LogOut,
  CreditCard
} from 'lucide-react';
import Image from 'next/image';

export function Sidebar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { path: '/', icon: Home, label: 'ホーム' },
    { path: '/articles', icon: FileText, label: '記事一覧' },
    { path: '/profile', icon: User, label: 'プロフィール' },
    { path: '/pricing', icon: CreditCard, label: 'Plan' },
    { path: '/settings', icon: Settings, label: '設定' },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r border-slate-700/50 bg-slate-800">
      <div className="flex h-full flex-col">
        {/* ヘッダー */}
        <div className="border-b border-slate-700/50 p-4">
          <h1 className="text-xl font-bold text-purple-400">AI Article Writer</h1>
        </div>

        {/* ユーザー情報 */}
        <div className="border-b border-slate-700/50 p-4">
          <div className="flex items-center space-x-3">
            <Image
              src={user?.photoURL || 'https://via.placeholder.com/40'}
              alt={user?.displayName || 'User'}
              width={40}
              height={40}
              className="size-10 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-200">
                {user?.displayName}
              </p>
              <p className="truncate text-xs text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* メニュー */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 rounded-lg px-4 py-2 transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <item.icon className="size-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* フッター */}
        <div className="border-t border-slate-700/50 p-4">
          <button
            onClick={signOut}
            className="flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700/50"
          >
            <LogOut className="size-5" />
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </div>
  );
} 