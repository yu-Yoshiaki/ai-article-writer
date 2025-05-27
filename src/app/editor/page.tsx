import { Layout } from '@/components/layout/Layout';
import { EditorPage } from '@/components/pages/EditorPage';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

export default function Editor() {
  return (
    <Layout>
      <PrivateRoute>
        <EditorPage />
      </PrivateRoute>
    </Layout>
  );
} 