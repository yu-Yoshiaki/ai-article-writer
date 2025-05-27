import { Layout } from '@/components/layout/Layout';
import { ProfilePage } from '@/components/user/ProfilePage';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

export default function Profile() {
  return (
    <Layout>
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    </Layout>
  );
} 