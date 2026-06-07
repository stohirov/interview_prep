import type { Difficulty } from '@/content/types';

const styles: Record<Difficulty, string> = {
  junior: 'bg-green-soft text-green',
  middle: 'bg-amber-soft text-amber',
  senior: 'bg-rose-soft text-rose',
};

const labels: Record<Difficulty, string> = {
  junior: 'Junior',
  middle: 'Mid',
  senior: 'Senior',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-[5px] px-[7px] py-[3px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] ${styles[difficulty]}`}
    >
      {labels[difficulty]}
    </span>
  );
}
