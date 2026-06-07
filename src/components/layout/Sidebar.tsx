import { Link, NavLink } from 'react-router-dom';
import type { ComponentType, SVGProps } from 'react';
import { useThemeStore } from '@/features/theme/store';
import { useProgressStore } from '@/features/progress/store';
import { useUiStore } from '@/features/ui/store';
import { trackProgress } from '@/features/progress/selectors';
import { allSources } from '@/content/loader';
import { SidebarTree } from './SidebarTree';
import {
  BarsIcon,
  BookIcon,
  BookmarkIcon,
  HomeIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from './icons';

const TRACK_ID = 'java-backend';

interface NavEntry {
  to: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  count?: number;
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium ${
    isActive ? 'bg-accent-soft text-text [&_svg]:text-accent [&_svg]:opacity-100' : 'text-muted hover:bg-panel-2 hover:text-text'
  }`;

/** Persistent left navigation — brand, ⌘K trigger, primary nav, module tree, footer. */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const streak = useProgressStore((s) => s.streak);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const entries = useProgressStore((s) => s.entries);
  const openPalette = useUiStore((s) => s.openPalette);

  const reviewed = trackProgress(TRACK_ID, entries).reviewed;
  const sourceCount = allSources().length;

  const items: NavEntry[] = [
    { to: '/', label: 'Overview', icon: HomeIcon },
    { to: '/progress', label: 'Progress', icon: BarsIcon, count: reviewed || undefined },
    { to: '/bookmarks', label: 'Bookmarks', icon: BookmarkIcon, count: bookmarks.size || undefined },
    { to: '/sources', label: 'Sources', icon: BookIcon, count: sourceCount },
  ];

  return (
    <aside className="flex h-screen w-sidebar flex-[0_0_theme(width.sidebar)] flex-col border-r border-border-default bg-panel">
      {/* brand */}
      <Link to="/" onClick={onNavigate} className="flex items-center gap-[11px] px-[22px] pb-4 pt-[22px]">
        <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-gradient-to-br from-accent to-accent-2 font-mono text-[15px] font-semibold text-white shadow-[0_4px_14px_-4px_var(--accent)]">
          J<span className="opacity-60">/</span>
        </span>
        <span className="font-display text-[15.5px] font-semibold leading-[1.1] -tracking-[0.01em]">
          Cracked Java
          <small className="mt-0.5 block font-mono text-[10px] font-normal tracking-[0.08em] text-faint">
            CONSOLE
          </small>
        </span>
      </Link>

      {/* ⌘K trigger */}
      <button
        type="button"
        onClick={openPalette}
        className="mx-4 mb-4 mt-1 flex w-[calc(100%-32px)] items-center gap-[9px] rounded-[9px] border border-border-default bg-panel-2 px-3 py-[9px] text-[13px] text-muted hover:border-border-strong hover:text-text-2"
      >
        <SearchIcon className="h-[15px] w-[15px] opacity-80" />
        Search everything…
        <span className="ml-auto rounded-[5px] border border-border-default px-1.5 py-0.5 font-mono text-[10.5px] text-faint">
          ⌘K
        </span>
      </button>

      {/* nav + tree */}
      <nav className="flex flex-1 flex-col gap-px overflow-y-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:w-0">
        {items.map(({ to, label, icon: IconCmp, count }) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={onNavigate} className={navClass}>
            <IconCmp className="h-4 w-4 flex-[0_0_16px] opacity-85" />
            {label}
            {count != null && <span className="ml-auto font-mono text-[10.5px] text-faint">{count}</span>}
          </NavLink>
        ))}

        <div className="px-2.5 pb-[7px] pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
          Java Backend · 764 Q
        </div>
        <SidebarTree onNavigate={onNavigate} />
      </nav>

      {/* footer: streak + theme toggle */}
      <div className="flex items-center gap-2.5 border-t border-border-default px-4 py-[13px]">
        <span className="flex items-center gap-[7px] text-[12.5px] font-medium text-muted">
          <span className="grid h-[22px] w-[22px] place-items-center rounded-md bg-gradient-to-b from-[#ff8a3d] to-[#ff5a5f] text-[11px]">
            🔥
          </span>
          {streak > 0 ? `${streak}-day streak` : 'No streak yet'}
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="ml-auto grid h-[34px] w-[34px] place-items-center rounded-lg border border-border-default bg-panel-2 text-muted hover:border-accent hover:text-text"
        >
          {theme === 'dark' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
