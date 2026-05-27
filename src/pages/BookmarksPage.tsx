import { Link } from 'react-router-dom';
import { useProgressStore } from '@/features/progress/store';
import { allQuestions } from '@/content/loader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';

export function BookmarksPage() {
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const toggle = useProgressStore((s) => s.toggleBookmark);
  const items = allQuestions().filter((q) => bookmarks.has(q.question.id));

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Bookmarks' }]} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Bookmarks</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Starred questions you want to revisit.</p>

      {items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500 italic">No bookmarks yet. Star a question with ☆ to add it.</p>
      ) : (
        <div className="mt-6 space-y-2">
          {items.map(({ trackId, moduleId, topicId, topic, question }) => (
            <div
              key={question.id}
              className="flex items-start gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
            >
              <button
                type="button"
                aria-label="Remove bookmark"
                onClick={() => toggle(question.id)}
                className="text-xl"
              >
                ★
              </button>
              <Link
                to={`/track/${trackId}/module/${moduleId}/topic/${topicId}/question/${question.id}`}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <DifficultyBadge difficulty={question.difficulty} />
                  <span className="text-xs text-slate-500 dark:text-slate-400">{topic.title}</span>
                </div>
                <p className="text-slate-900 dark:text-slate-100">{question.prompt}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
