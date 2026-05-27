import type { Difficulty } from '@/content/types';

const styles: Record<Difficulty, string> = {
  junior: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  middle: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  senior: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
};

const labels: Record<Difficulty, string> = {
  junior: 'Junior',
  middle: 'Mid',
  senior: 'Senior',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wide ${styles[difficulty]}`}>
      {labels[difficulty]}
    </span>
  );
}
