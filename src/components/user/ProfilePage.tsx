import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { User, Settings, FileText } from 'lucide-react';
import Image from 'next/image';

export function ProfilePage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            ログインが必要です
          </h1>
          <p className="text-gray-600">
            プロファイルページにアクセスするにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b p-6">
              <h1 className="text-2xl font-bold text-gray-900">プロファイル</h1>
            </div>

            <div className="p-6">
              <div className="mb-8 flex items-center space-x-6">
                <div className="flex size-20 items-center justify-center rounded-full bg-blue-100">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="size-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="size-10 text-blue-600" />
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user.displayName || 'ユーザー'}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    登録日: {user.metadata.creationTime ? 
                      new Date(user.metadata.creationTime).toLocaleDateString('ja-JP') : 
                      '不明'
                    }
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-6">
                  <div className="mb-4 flex items-center">
                    <FileText className="mr-3 size-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">ドキュメント統計</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">作成したドキュメント:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">総文字数:</span>
                      <span className="font-medium">1,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AIパッチ使用回数:</span>
                      <span className="font-medium">15</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-6">
                  <div className="mb-4 flex items-center">
                    <Settings className="mr-3 size-6 text-gray-600" />
                    <h3 className="text-lg font-semibold">設定</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">自動保存:</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">ダークモード:</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">通知:</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 