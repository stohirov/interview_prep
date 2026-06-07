import type { ProgressStatus } from '@/content/types';

const config: Record<Exclude<ProgressStatus, 'unseen'>, { label: string; cls: string }> = {
  'got-it': { label: '✓ Got it', cls: 'bg-green-soft text-green' },
  review: { label: '↻ Review', cls: 'bg-amber-soft text-amber' },
  'didnt-know': { label: "✗ Didn't know", cls: 'bg-rose-soft text-rose' },
};

/** Question progress badge in Console style; renders nothing for `unseen`/undefined. */
export function StatusBadge({ status }: { status?: ProgressStatus }) {
  if (!status || status === 'unseen') return null;
  const { label, cls } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-[5px] px-[7px] py-[3px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] ${cls}`}
    >
      {label}
    </span>
  );
}
