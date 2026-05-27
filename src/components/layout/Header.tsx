import { Link, NavLink } from 'react-router-dom';
import { useThemeStore } from '@/features/theme/store';
import { useProgressStore } from '@/features/progress/store';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-md text-sm transition-colors ${
    isActive
      ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-100'
      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
  }`;

export function Header() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const streak = useProgressStore((s) => s.streak);

  return (
    <header className="no-print sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-14 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex w-7 h-7 items-center justify-center rounded bg-brand-600 text-white font-bold text-sm">J</span>
          <span className="hidden sm:inline">Java Interview Prep</span>
        </Link>
        <nav className="flex-1 flex items-center gap-1">
          <NavLink to="/track/java-backend" className={navClass}>Tracks</NavLink>
          <NavLink to="/progress" className={navClass}>Progress</NavLink>
          <NavLink to="/bookmarks" className={navClass}>Bookmarks</NavLink>
          <NavLink to="/sources" className={navClass}>Sources</NavLink>
          <NavLink to="/search" className={navClass}>Search</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <span
              title="Daily streak"
              className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 font-medium"
            >
              🔥 {streak}d
            </span>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
