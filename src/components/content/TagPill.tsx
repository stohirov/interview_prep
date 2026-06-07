import type { QuestionTag } from '@/content/types';

const labels: Record<QuestionTag, string> = {
  theory: 'Theory',
  coding: 'Coding',
  'system-design': 'System Design',
  behavioral: 'Behavioral',
  trick: 'Trick',
  'big-tech': 'Big Tech',
};

const badgeClass =
  'inline-flex items-center gap-[5px] rounded-[5px] bg-panel-3 px-[7px] py-[3px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted';

export function TagPill({ tag }: { tag: QuestionTag }) {
  return <span className={badgeClass}>{labels[tag]}</span>;
}

export function AskedAtPill({ company }: { company: string }) {
  return <span className={badgeClass}>{company}</span>;
}
