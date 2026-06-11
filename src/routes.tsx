import type { RouteRecord } from 'vite-react-ssg';
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
import { NotFound } from '@/pages/NotFound';

/**
 * Route table as data-router records so `vite-react-ssg` can prerender each path
 * to static HTML at build time. The nested layout (`AppShell` renders <Outlet/>)
 * maps 1:1 to the previous <Routes>/<Route> tree in App.tsx.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'track/:trackId', element: <TrackPage /> },
      { path: 'track/:trackId/module/:moduleId', element: <ModulePage /> },
      { path: 'track/:trackId/module/:moduleId/topic/:topicId', element: <TopicPage /> },
      {
        path: 'track/:trackId/module/:moduleId/topic/:topicId/question/:questionId',
        element: <QuestionPage />,
      },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'sources', element: <SourcesPage /> },
      { path: 'bookmarks', element: <BookmarksPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
