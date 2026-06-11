import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useUiStore } from '@/features/ui/store';
import { useProgressStore } from '@/features/progress/store';
import { useThemeStore } from '@/features/theme/store';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';

/** Console app shell: persistent sidebar (desktop) + off-canvas drawer (mobile) + main. */
export function AppShell() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const closeSidebar = useUiStore((s) => s.closeSidebar);
  const hydrateProgress = useProgressStore((s) => s.hydrate);
  const hydrateTheme = useThemeStore((s) => s.hydrate);

  // Client-only: localStorage-backed stores hydrate after mount, never during
  // server-side prerender (renderToString does not run effects).
  useEffect(() => {
    hydrateProgress();
    hydrateTheme();
  }, [hydrateProgress, hydrateTheme]);

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <div className="sticky top-0 hidden h-screen shrink-0 lg:block">
        <Sidebar />
      </div>

      {/* mobile drawer */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black/50"
          />
          <div className="fixed inset-y-0 left-0 z-50 shadow-panel">
            <Sidebar onNavigate={closeSidebar} />
          </div>
        </div>
      )}

      <main className="flex min-w-0 flex-1 flex-col bg-[radial-gradient(var(--grid)_1px,transparent_1px)] [background-size:22px_22px]">
        <Topbar />
        <Outlet />
      </main>

      <CommandPalette />
    </div>
  );
}
