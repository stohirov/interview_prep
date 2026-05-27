import { useMemo, useState } from 'react';
import { allSources, SOURCE_TYPE_LABELS } from '@/content/loader';
import type { SourceType } from '@/content/types';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SourceItem } from '@/components/content/SourceList';

export function SourcesPage() {
  const sources = useMemo(() => allSources(), []);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<SourceType | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');

  const topicOptions = useMemo(() => {
    const set = new Map<string, string>();
    for (const s of sources) set.set(s.topicId, s.topicTitle);
    return [...set.entries()].map(([id, title]) => ({ id, title }));
  }, [sources]);

  const filtered = sources.filter((s) => {
    if (typeFilter !== 'all' && s.source.type !== typeFilter) return false;
    if (topicFilter !== 'all' && s.topicId !== topicFilter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      if (!s.source.title.toLowerCase().includes(q) && !s.source.url.toLowerCase().includes(q) && !(s.source.description ?? '').toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Sources' }]} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Authoritative sources</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Every source used across all topics. Filter by type, topic, or text. Anything with the shield icon is canonical
        (Javadoc / JLS / JEP / OpenJDK source).
      </p>

      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter sources..."
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as SourceType | 'all')}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        >
          <option value="all">All types</option>
          {(Object.keys(SOURCE_TYPE_LABELS) as SourceType[]).map((t) => (
            <option key={t} value={t}>
              {SOURCE_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        >
          <option value="all">All topics</option>
          {topicOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Showing {filtered.length} of {sources.length}
      </p>

      <div className="mt-3 grid md:grid-cols-2 gap-3">
        {filtered.map((s) => (
          <SourceItem key={`${s.topicId}::${s.source.url}`} source={s.source} />
        ))}
      </div>
    </div>
  );
}
