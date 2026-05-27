import { Link } from 'react-router-dom';
import type { Topic } from '@/content/types';
import { DifficultyBadge } from './DifficultyBadge';
import { ProgressRing } from './ProgressRing';
import { useProgressStore } from '@/features/progress/store';

export function TopicCard({
  topic,
  to,
  index,
}: {
  topic: Topic;
  to: string;
  index: number;
}) {
  const entries = useProgressStore((s) => s.entries);
  const completed = topic.questions.filter((q) => {
    const status = entries[q.id]?.status;
    return status === 'got-it' || status === 'review';
  }).length;
  const ratio = topic.questions.length === 0 ? 0 : completed / topic.questions.length;

  return (
    <Link
      to={to}
      className="group block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500/60 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tabular-nums">
              {String(index).padStart(2, '0')}
            </span>
            <DifficultyBadge difficulty={topic.difficulty} />
            <span className="text-xs text-slate-500 dark:text-slate-400">{topic.questions.length} questions</span>
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-100">
            {topic.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{topic.summary}</p>
        </div>
        <ProgressRing value={ratio} />
      </div>
    </Link>
  );
}
