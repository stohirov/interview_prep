import { useMemo, useState } from 'react';
import { allSources, SOURCE_TYPE_LABELS } from '@/content/loader';
import type { SourceType } from '@/content/types';
import { SourceItem } from '@/components/content/SourceList';
import { Seo } from '@/components/seo/Seo';

const selectClass =
  'h-9 rounded-[9px] border border-border-default bg-panel px-3 text-[13px] text-text focus:border-accent focus:outline-none';

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
      if (
        !s.source.title.toLowerCase().includes(q) &&
        !s.source.url.toLowerCase().includes(q) &&
        !(s.source.description ?? '').toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <Seo
        title="Authoritative Java Sources — Cracked Java"
        description="A curated index of authoritative Java sources — JDK Javadoc, the Java Language Specification, JEPs, Spring and PostgreSQL docs — backing every interview answer."
        canonicalPath="/sources"
      />
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
        // Sources · {sources.length} references
      </div>
      <h1 className="mt-2.5 font-display text-[34px] font-semibold leading-[1.08] -tracking-[0.02em]">
        Authoritative sources
      </h1>
      <p className="mt-3 max-w-[680px] text-[15.5px] text-muted">
        Every source used across all topics. Filter by type, topic, or text — anything with the green dot is canonical
        (Javadoc / JLS / JEP / OpenJDK).
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter sources…"
          className="h-9 min-w-[200px] flex-1 rounded-[9px] border border-border-default bg-panel px-3.5 text-[13px] text-text placeholder:text-faint focus:border-accent focus:outline-none"
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as SourceType | 'all')} className={selectClass}>
          <option value="all">All types</option>
          {(Object.keys(SOURCE_TYPE_LABELS) as SourceType[]).map((t) => (
            <option key={t} value={t}>
              {SOURCE_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} className={selectClass}>
          <option value="all">All topics</option>
          {topicOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 font-mono text-[12px] text-faint">
        Showing {filtered.length} of {sources.length}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-3 rounded-[13px] border border-dashed border-border-default px-5 py-10 text-center text-[14px] text-muted">
          No sources match these filters.
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((s) => (
            <SourceItem key={`${s.topicId}::${s.source.url}`} source={s.source} />
          ))}
        </div>
      )}
    </div>
  );
}
