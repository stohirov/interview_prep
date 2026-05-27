import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { search } from '@/features/search';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => search(query), [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Search</h1>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        placeholder="e.g. HashMap resize, treeify, fail-fast, virtual threads..."
        className="mt-4 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />

      <div className="mt-6 space-y-2">
        {query.trim() && results.length === 0 && (
          <p className="text-sm text-slate-500 italic">No matches.</p>
        )}
        {results.map((r) => {
          const base = `/track/${r.trackId}/module/${r.moduleId}/topic/${r.topicId}`;
          const url = r.question ? `${base}/question/${r.question.id}` : base;
          return (
            <Link
              key={`${r.kind}-${r.question?.id ?? r.topicId}`}
              to={url}
              className="block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500/60"
            >
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {r.kind}
                </span>
                {r.question && <DifficultyBadge difficulty={r.question.difficulty} />}
                <span className="text-xs text-slate-500 dark:text-slate-400">{r.topic.title}</span>
              </div>
              <p className="text-slate-900 dark:text-slate-100">{r.question?.prompt ?? r.topic.title}</p>
              {!r.question && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{r.topic.summary}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
