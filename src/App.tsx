import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { ThemeInput } from './components/ThemeInput';
import { ArticleEditor } from './components/ArticleEditor';
import { Preview } from './components/Preview';
import { PricingPlans } from './components/subscription/PricingPlans';
import { ProfilePage } from './components/user/ProfilePage';
import { Layout } from './components/layout/Layout';
import { useArticle } from './hooks/useArticle';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/pricing" element={<PricingPlans />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/" element={<MainApp />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function MainApp() {
  const {
    article,
    isLoading,
    handleThemeSubmit,
    handleMoveSection,
    handleUpdateSectionTitle,
    handleSelectVariation,
    handleRegenerateVariations,
    handleAddSection,
    handleToneChange
  } = useArticle();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {!article ? (
        <ThemeInput onSubmit={handleThemeSubmit} isLoading={isLoading} />
      ) : (
        <ArticleEditor
          article={article}
          onShowPreview={() => setShowPreview(true)}
          onMoveSection={handleMoveSection}
          onUpdateSectionTitle={handleUpdateSectionTitle}
          onSelectVariation={handleSelectVariation}
          onRegenerateVariations={handleRegenerateVariations}
          onAddSection={handleAddSection}
          onToneChange={handleToneChange}
        />
      )}

      {showPreview && article && (
        <Preview article={article} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}

export default App;