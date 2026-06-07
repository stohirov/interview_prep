import { Link } from 'react-router-dom';
import type { Question } from '@/content/types';
import { DifficultyBadge } from './DifficultyBadge';
import { TagPill, AskedAtPill } from './TagPill';
import { StatusBadge } from './StatusBadge';
import { useProgressStore } from '@/features/progress/store';

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.8l6.5-.9z" />
    </svg>
  );
}

export function QuestionCard({ question, to, index }: { question: Question; to: string; index: number }) {
  const entry = useProgressStore((s) => s.entries[question.id]);
  const bookmarked = useProgressStore((s) => s.bookmarks.has(question.id));
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);

  return (
    <Link
      to={to}
      className="flex items-center gap-3.5 rounded-xl border border-border-default bg-panel px-[18px] py-4 transition-colors hover:border-accent"
    >
      <span className="font-mono text-[12px] font-semibold text-faint">
        {String(index).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={question.difficulty} />
          {question.tags.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
          {question.askedAt?.map((c) => (
            <AskedAtPill key={c} company={c} />
          ))}
          <StatusBadge status={entry?.status} />
        </div>
        <div className="text-[14.5px] font-medium text-text">{question.prompt}</div>
      </div>
      <button
        type="button"
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBookmark(question.id);
        }}
        className={`shrink-0 transition-colors ${bookmarked ? 'text-amber' : 'text-faint hover:text-amber'}`}
      >
        <StarIcon filled={bookmarked} />
      </button>
    </Link>
  );
}
