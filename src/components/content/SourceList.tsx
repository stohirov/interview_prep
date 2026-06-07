import type { Source, SourceType } from '@/content/types';
import { groupSourcesByType, SOURCE_TYPE_LABELS } from '@/content/loader';

const typeBadge: Record<SourceType, string> = {
  javadoc: 'bg-accent-soft text-accent',
  spec: 'bg-accent-soft text-accent',
  jep: 'bg-rose-soft text-rose',
  tutorial: 'bg-green-soft text-green',
  'official-docs': 'bg-panel-3 text-muted',
  book: 'bg-amber-soft text-amber',
  article: 'bg-panel-3 text-muted',
  video: 'bg-rose-soft text-rose',
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 text-faint">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function SourceItem({ source }: { source: Source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-[10px] border border-border-default bg-panel px-3.5 py-[13px] transition-colors hover:border-[color:var(--accent-line)]"
    >
      <div className="mb-[7px] flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-[5px] px-[7px] py-[3px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] ${typeBadge[source.type]}`}
        >
          {SOURCE_TYPE_LABELS[source.type]}
        </span>
        <span className="ml-auto flex items-center gap-[5px] text-[11px] text-muted">
          {source.authoritative && <span className="h-[7px] w-[7px] rounded-full bg-green" />}
          {hostOf(source.url)}
        </span>
      </div>
      <h4 className="flex items-center gap-1.5 text-[13.5px] font-semibold text-text">
        <span className="break-words">{source.title}</span>
        <ExternalIcon />
      </h4>
      {source.description && <p className="mt-1 text-[12px] leading-[1.4] text-muted">{source.description}</p>}
    </a>
  );
}

export function SourceList({ sources }: { sources: Source[]; dense?: boolean }) {
  if (!sources.length) {
    return <p className="text-[13px] italic text-muted">No sources yet.</p>;
  }
  const groups = groupSourcesByType(sources);
  return (
    <div>
      {groups.map((g) => (
        <div key={g.type}>
          <div className="mb-2 mt-[18px] font-mono text-[10px] uppercase tracking-[0.1em] text-faint first:mt-0">
            {SOURCE_TYPE_LABELS[g.type]}
          </div>
          <div className="flex flex-col gap-[9px]">
            {g.items.map((s) => (
              <SourceItem key={s.url} source={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
