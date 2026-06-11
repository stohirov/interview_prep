import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { search } from '@/features/search';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';
import { Seo } from '@/components/seo/Seo';

const SUGGESTIONS = [
  'HashMap resize',
  'virtual threads',
  'fail-fast',
  'transaction isolation',
  'index B-tree',
  'volatile',
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px] text-faint">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function SearchPage() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => search(query), [query]);

  const topics = results.filter((r) => r.kind === 'topic');
  const questions = results.filter((r) => r.kind === 'question');
  const groups = [
    { label: 'Topics', items: topics },
    { label: 'Questions', items: questions },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <Seo
        title="Search Java Interview Questions — Cracked Java"
        description="Search hundreds of Java backend interview questions and answers across Collections, OOP, Spring, PostgreSQL, algorithms, and system design."
        canonicalPath="/search"
      />
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">// Search</div>
      <h1 className="mt-2.5 font-display text-[34px] font-semibold leading-[1.08] -tracking-[0.02em]">
        Search everything
      </h1>

      <div className="relative mt-6 max-w-[680px]">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="Topics, questions, tags…"
          className="h-[52px] w-full rounded-[12px] border border-border-default bg-panel pl-12 pr-4 text-[15.5px] text-text placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-line)]"
        />
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="rounded-full border border-border-default bg-panel px-3.5 py-1.5 font-mono text-[12px] text-muted transition-colors hover:border-accent hover:text-text"
          >
            {s}
          </button>
        ))}
      </div>

      {query.trim() && results.length === 0 && (
        <p className="mt-9 rounded-[13px] border border-dashed border-border-default px-5 py-10 text-center text-[14px] text-muted">
          No matches for “{query}”.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-8">
        {groups.map((group) => (
          <section key={group.label}>
            <div className="mb-3 flex items-baseline gap-2.5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{group.label}</h2>
              <span className="font-mono text-[11px] text-muted">{group.items.length}</span>
            </div>
            <div className="flex flex-col gap-[9px]">
              {group.items.map((r) => {
                const base = `/track/${r.trackId}/module/${r.moduleId}/topic/${r.topicId}`;
                const url = r.question ? `${base}/question/${r.question.id}` : base;
                return (
                  <Link
                    key={`${r.kind}-${r.question?.id ?? r.topicId}`}
                    to={url}
                    className="block rounded-xl border border-border-default bg-panel px-[18px] py-4 transition-colors hover:border-accent"
                  >
                    <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                      {r.question && <DifficultyBadge difficulty={r.question.difficulty} />}
                      <span className="font-mono text-[11px] text-faint">{r.topic.title}</span>
                    </div>
                    <p className="text-[14.5px] font-medium text-text">{r.question?.prompt ?? r.topic.title}</p>
                    {!r.question && <p className="mt-1 text-[13px] leading-[1.45] text-muted">{r.topic.summary}</p>}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
