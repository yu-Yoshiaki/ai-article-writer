import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import {
  Home,
  User,
  Settings,
  FileText,
  LogOut,
  CreditCard
} from 'lucide-react';

export function Sidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'ホーム' },
    { path: '/articles', icon: FileText, label: '記事一覧' },
    { path: '/profile', icon: User, label: 'プロフィール' },
    { path: '/pricing', icon: CreditCard, label: 'Plan' },
    { path: '/settings', icon: Settings, label: '設定' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-800 border-r border-slate-700/50">
      <div className="flex flex-col h-full">
        {/* ヘッダー */}
        <div className="p-4 border-b border-slate-700/50">
          <h1 className="text-xl font-bold text-purple-400">AI Article Writer</h1>
        </div>

        {/* ユーザー情報 */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/40'}
              alt={user?.displayName || 'User'}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                {user?.displayName}
              </p>
              <p className="text-xs text-slate-400 truncate">
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
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* フッター */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={signOut}
            className="flex items-center space-x-3 w-full px-4 py-2 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </div>
  );
} 