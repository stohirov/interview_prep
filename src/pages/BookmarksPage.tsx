import { Link } from 'react-router-dom';
import { useProgressStore } from '@/features/progress/store';
import { allQuestions } from '@/content/loader';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';
import { TagPill } from '@/components/content/TagPill';
import { StatusBadge } from '@/components/content/StatusBadge';
import { Seo } from '@/components/seo/Seo';

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.8l6.5-.9z" />
    </svg>
  );
}

export function BookmarksPage() {
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const entries = useProgressStore((s) => s.entries);
  const toggle = useProgressStore((s) => s.toggleBookmark);
  const items = allQuestions().filter((q) => bookmarks.has(q.question.id));

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <Seo
        title="Bookmarks — Cracked Java"
        description="Your starred Java interview questions."
        canonicalPath="/bookmarks"
        robots="noindex,follow"
      />
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
        // Bookmarks · {items.length} starred
      </div>
      <h1 className="mt-2.5 font-display text-[34px] font-semibold leading-[1.08] -tracking-[0.02em]">
        Bookmarks
      </h1>
      <p className="mt-3 max-w-[640px] text-[15.5px] text-muted">
        Starred questions you want to revisit.
      </p>

      {items.length === 0 ? (
        <div className="mt-9 rounded-[13px] border border-dashed border-border-default px-5 py-12 text-center">
          <div className="font-display text-[17px] font-semibold">No bookmarks yet</div>
          <p className="mt-1.5 text-[14px] text-muted">
            Star a question with{' '}
            <span className="inline-flex items-center align-middle text-amber">
              <StarIcon />
            </span>{' '}
            to keep it here.
          </p>
        </div>
      ) : (
        <div className="mt-7 flex flex-col gap-[11px]">
          {items.map(({ trackId, moduleId, topicId, topic, question }) => (
            <div
              key={question.id}
              className="flex items-center gap-3.5 rounded-xl border border-border-default bg-panel px-[18px] py-4 transition-colors hover:border-accent"
            >
              <Link
                to={`/track/${trackId}/module/${moduleId}/topic/${topicId}/question/${question.id}`}
                className="min-w-0 flex-1"
              >
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  <DifficultyBadge difficulty={question.difficulty} />
                  {question.tags.map((t) => (
                    <TagPill key={t} tag={t} />
                  ))}
                  <StatusBadge status={entries[question.id]?.status} />
                  <span className="font-mono text-[11px] text-faint">{topic.title}</span>
                </div>
                <div className="text-[14.5px] font-medium text-text">{question.prompt}</div>
              </Link>
              <button
                type="button"
                aria-label="Remove bookmark"
                onClick={() => toggle(question.id)}
                className="shrink-0 text-amber transition-colors hover:text-rose"
              >
                <StarIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
