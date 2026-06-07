import { Link } from 'react-router-dom';
import type { Topic } from '@/content/types';
import { DifficultyBadge } from './DifficultyBadge';
import { ConicRing } from './ConicRing';
import { useProgressStore } from '@/features/progress/store';

type TopicState = 'done' | 'prog' | 'new';

function stateOf(pct: number): TopicState {
  if (pct >= 100) return 'done';
  if (pct > 0) return 'prog';
  return 'new';
}

const STATE = {
  done: { ring: 'var(--green)', text: 'text-green', label: 'Completed', go: 'Review →' },
  prog: { ring: 'var(--amber)', text: 'text-amber', label: 'In progress', go: 'Continue →' },
  new: { ring: 'var(--border-2)', text: 'text-faint', label: 'Not started', go: 'Start →' },
} as const;

export function TopicCard({ topic, to, index }: { topic: Topic; to: string; index: number }) {
  const entries = useProgressStore((s) => s.entries);
  const total = topic.questions.length;
  const reviewed = topic.questions.filter((q) => {
    const status = entries[q.id]?.status;
    return status && status !== 'unseen';
  }).length;
  const pct = total === 0 ? 0 : Math.round((reviewed / total) * 100);
  const state = stateOf(pct);
  const s = STATE[state];

  return (
    <Link
      to={to}
      className="flex flex-col rounded-[13px] border border-border-default bg-panel px-5 py-[18px] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-accent"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="font-mono text-[12px] font-semibold text-faint">
          {String(index).padStart(2, '0')}
        </span>
        <DifficultyBadge difficulty={topic.difficulty} />
        <span className="font-mono text-[11.5px] text-muted">{total} Q</span>
        <ConicRing pct={pct} size={38} inner={28} color={s.ring} className="ml-auto">
          <span className={`text-[9.5px] ${state === 'new' ? 'text-muted' : s.text}`}>{pct}</span>
        </ConicRing>
      </div>
      <h3 className="mb-[7px] font-display text-[17px] font-semibold -tracking-[0.01em]">{topic.title}</h3>
      <p className="flex-1 text-[13px] leading-[1.45] text-muted">{topic.summary}</p>
      <div className="mt-3.5 flex items-center gap-2 border-t border-border-default pt-[13px]">
        <span className={`inline-flex items-center gap-1.5 text-[11.5px] font-semibold ${s.text}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {s.label}
        </span>
        <span className="ml-auto font-mono text-[11px] font-medium text-accent">{s.go}</span>
      </div>
    </Link>
  );
}
