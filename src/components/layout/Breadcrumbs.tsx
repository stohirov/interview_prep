import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print text-sm text-slate-500 dark:text-slate-400 mb-4">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {c.to ? (
              <Link to={c.to} className="hover:text-slate-700 dark:hover:text-slate-200 underline-offset-2 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="text-slate-800 dark:text-slate-200 font-medium">{c.label}</span>
            )}
            {i < items.length - 1 && <span className="text-slate-300 dark:text-slate-600">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
