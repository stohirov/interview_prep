import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { LandingPage } from '@/pages/LandingPage';
import { TrackPage } from '@/pages/TrackPage';
import { ModulePage } from '@/pages/ModulePage';
import { TopicPage } from '@/pages/TopicPage';
import { QuestionPage } from '@/pages/QuestionPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { SearchPage } from '@/pages/SearchPage';
import { SourcesPage } from '@/pages/SourcesPage';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { useProgressStore } from '@/features/progress/store';
import { useThemeStore } from '@/features/theme/store';

export default function App() {
  const hydrateProgress = useProgressStore((s) => s.hydrate);
  const hydrateTheme = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    hydrateProgress();
    hydrateTheme();
  }, [hydrateProgress, hydrateTheme]);

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/track/:trackId" element={<TrackPage />} />
        <Route path="/track/:trackId/module/:moduleId" element={<ModulePage />} />
        <Route path="/track/:trackId/module/:moduleId/topic/:topicId" element={<TopicPage />} />
        <Route
          path="/track/:trackId/module/:moduleId/topic/:topicId/question/:questionId"
          element={<QuestionPage />}
        />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-5xl font-bold text-text">404</h1>
      <p className="mt-4 text-muted">That route doesn’t exist.</p>
    </div>
  );
}
