import type { Source, SourceType } from '@/content/types';
import { groupSourcesByType, SOURCE_TYPE_LABELS } from '@/content/loader';

const typeStyles: Record<SourceType, string> = {
  javadoc: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  spec: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  jep: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  tutorial: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  'official-docs': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200',
  book: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  article: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  video: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200',
};

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block opacity-60">
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v7H3V3h7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="inline-block text-emerald-600 dark:text-emerald-400" aria-label="authoritative source">
      <path d="M12 1l9 4v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4z" />
    </svg>
  );
}

export function SourceItem({ source }: { source: Source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-slate-200 dark:border-slate-800 p-3 hover:border-brand-500/60 dark:hover:border-brand-400/60 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${typeStyles[source.type]}`}>
              {SOURCE_TYPE_LABELS[source.type]}
            </span>
            {source.authoritative && <ShieldIcon />}
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{hostOf(source.url)}</span>
          </div>
          <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-100 flex items-center gap-1.5">
            <span className="break-words">{source.title}</span>
            <ExternalIcon />
          </div>
          {source.description && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{source.description}</p>
          )}
        </div>
      </div>
    </a>
  );
}

export function SourceList({ sources, dense }: { sources: Source[]; dense?: boolean }) {
  if (!sources.length) {
    return <p className="text-sm text-slate-500 dark:text-slate-400 italic">No sources yet.</p>;
  }
  const groups = groupSourcesByType(sources);
  return (
    <div className={dense ? 'space-y-4' : 'space-y-6'}>
      {groups.map((g) => (
        <div key={g.type}>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {SOURCE_TYPE_LABELS[g.type]}
          </h4>
          <div className="space-y-2">
            {g.items.map((s) => (
              <SourceItem key={s.url} source={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
