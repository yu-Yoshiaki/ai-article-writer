import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { ThemeInput } from './components/ThemeInput';
import { ArticleEditor } from './components/ArticleEditor';
import { Preview } from './components/Preview';
import { PricingPlans } from './components/subscription/PricingPlans';
import { useArticle } from './hooks/useArticle';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-900">
          <Routes>
            <Route path="/pricing" element={<PricingPlans />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainApp />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
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