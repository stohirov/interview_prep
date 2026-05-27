import { type ReactNode } from 'react';

type CalloutKind = 'info' | 'warn' | 'tip' | 'danger';

const calloutStyles: Record<CalloutKind, string> = {
  info: 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/40',
  warn: 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/40',
  tip: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/40',
  danger: 'border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/40',
};

const calloutIcons: Record<CalloutKind, string> = {
  info: 'ℹ️',
  warn: '⚠️',
  tip: '💡',
  danger: '🛑',
};

export function Callout({ kind = 'info', title, children }: { kind?: CalloutKind; title?: string; children: ReactNode }) {
  return (
    <aside className={`my-4 rounded-lg border p-4 ${calloutStyles[kind]}`}>
      <div className="flex gap-3">
        <span aria-hidden className="text-lg leading-none mt-0.5">{calloutIcons[kind]}</span>
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold mb-1 text-slate-900 dark:text-slate-100">{title}</p>}
          <div className="text-sm text-slate-700 dark:text-slate-200 [&_p]:my-1">{children}</div>
        </div>
      </div>
    </aside>
  );
}

export function ProbeNote({ children }: { children: ReactNode }) {
  return (
    <Callout kind="tip" title="What the interviewer is really probing">
      {children}
    </Callout>
  );
}

export interface ComplexityRow {
  op: string;
  best?: string;
  average?: string;
  worst?: string;
  note?: string;
}

export function ComplexityTable({ rows }: { rows: ComplexityRow[] }) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full text-sm border border-slate-200 dark:border-slate-800 rounded">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="text-left px-3 py-2 font-semibold">Operation</th>
            <th className="text-left px-3 py-2 font-semibold">Best</th>
            <th className="text-left px-3 py-2 font-semibold">Average</th>
            <th className="text-left px-3 py-2 font-semibold">Worst</th>
            <th className="text-left px-3 py-2 font-semibold">Note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.op} className="border-t border-slate-200 dark:border-slate-800">
              <td className="px-3 py-2 font-mono text-xs">{r.op}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.best ?? '—'}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.average ?? '—'}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.worst ?? '—'}</td>
              <td className="px-3 py-2 text-xs text-slate-600 dark:text-slate-400">{r.note ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Diagram({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="my-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
      <pre className="font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">{children}</pre>
      {caption && (
        <figcaption className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic">{caption}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  Callout,
  ProbeNote,
  ComplexityTable,
  Diagram,
};
