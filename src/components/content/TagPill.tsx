import type { QuestionTag } from '@/content/types';

const styles: Record<QuestionTag, string> = {
  theory: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  coding: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
  'system-design': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  behavioral: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200',
  trick: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  'big-tech': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200',
};

export function TagPill({ tag }: { tag: QuestionTag }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${styles[tag]}`}>
      {tag}
    </span>
  );
}

export function AskedAtPill({ company }: { company: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
      {company}
    </span>
  );
}
