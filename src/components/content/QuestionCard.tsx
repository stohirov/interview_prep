import { Link } from 'react-router-dom';
import type { Question } from '@/content/types';
import { DifficultyBadge } from './DifficultyBadge';
import { TagPill, AskedAtPill } from './TagPill';
import { useProgressStore } from '@/features/progress/store';

const statusBadge: Record<string, { label: string; cls: string }> = {
  'got-it': { label: '✓ Got it', cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  review: { label: '↻ Review', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  'didnt-know': { label: '✗ Didn’t know', cls: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
};

export function QuestionCard({
  question,
  to,
  index,
}: {
  question: Question;
  to: string;
  index: number;
}) {
  const entry = useProgressStore((s) => s.entries[question.id]);
  const bookmarked = useProgressStore((s) => s.bookmarks.has(question.id));
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const status = entry?.status;

  return (
    <Link
      to={to}
      className="group block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500/60 hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-3">
        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tabular-nums w-8 shrink-0 pt-1">
          {String(index).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <DifficultyBadge difficulty={question.difficulty} />
            {question.tags.map((t) => (
              <TagPill key={t} tag={t} />
            ))}
            {question.askedAt?.map((c) => <AskedAtPill key={c} company={c} />)}
            {status && (
              <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${statusBadge[status].cls}`}>
                {statusBadge[status].label}
              </span>
            )}
          </div>
          <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-100">
            {question.prompt}
          </h3>
        </div>
        <button
          type="button"
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(question.id);
          }}
          className="p-1.5 text-lg shrink-0 hover:scale-110 transition-transform"
        >
          {bookmarked ? '★' : '☆'}
        </button>
      </div>
    </Link>
  );
}
