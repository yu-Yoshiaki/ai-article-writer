import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { userService } from '../../services/userService';
import type { UserProfile } from '../../types/user';
import { Settings, User, Mail, Globe, Bell } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      let userProfile = await userService.getProfile(user.uid);
      if (!userProfile) {
        userProfile = await userService.createProfile(user.uid);
      }
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = async (key: keyof UserProfile['preferences'], value: any) => {
    if (!user || !profile) return;
    
    setIsSaving(true);
    try {
      await userService.updatePreferences(user.uid, {
        ...profile.preferences,
        [key]: value
      });
      setProfile(prev => prev ? {
        ...prev,
        preferences: {
          ...prev.preferences,
          [key]: value
        }
      } : null);
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mystical-card p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <img
              src={profile?.photoURL || 'https://via.placeholder.com/100'}
              alt={profile?.displayName || 'User'}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{profile?.displayName}</h1>
            <p className="text-slate-400">{profile?.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-slate-700/50 pb-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              設定
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">メール通知</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile?.preferences.emailNotifications}
                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">言語</span>
                </div>
                <select
                  value={profile?.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="mystical-input bg-slate-800 text-slate-300 py-2 px-3 rounded-lg"
                >
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">テーマ</span>
                </div>
                <select
                  value={profile?.preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value as 'light' | 'dark')}
                  className="mystical-input bg-slate-800 text-slate-300 py-2 px-3 rounded-lg"
                >
                  <option value="light">ライト</option>
                  <option value="dark">ダーク</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {isSaving && (
          <div className="mt-4 text-sm text-purple-400">
            設定を保存中...
          </div>
        )}
      </div>
    </div>
  );
} 