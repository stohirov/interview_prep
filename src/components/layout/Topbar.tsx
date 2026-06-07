import type { ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getModule, getQuestion, getTopic, getTrack } from '@/content/loader';
import { useUiStore } from '@/features/ui/store';
import { MenuIcon } from './icons';

interface Crumb {
  label: string;
  to?: string;
}

const STATIC_LABELS: Record<string, string> = {
  '/': 'Overview',
  '/progress': 'Progress',
  '/bookmarks': 'Bookmarks',
  '/sources': 'Sources',
  '/search': 'Search',
};

/** Build breadcrumbs from the current route using loader data. */
function useCrumbs(): Crumb[] {
  const { pathname } = useLocation();
  const { trackId, moduleId, topicId, questionId } = useParams();

  const staticLabel = STATIC_LABELS[pathname];
  if (staticLabel) return [{ label: staticLabel }];

  if (!trackId) return [{ label: 'Overview' }];

  const track = getTrack(trackId);
  const crumbs: Crumb[] = [{ label: 'Overview', to: '/' }];
  if (!track) return crumbs;

  crumbs.push({
    label: track.title,
    to: moduleId ? `/track/${trackId}` : undefined,
  });

  if (moduleId) {
    const mod = getModule(trackId, moduleId);
    if (mod) crumbs.push({ label: mod.title, to: topicId ? `/track/${trackId}/module/${moduleId}` : undefined });
  }
  if (moduleId && topicId) {
    const topic = getTopic(trackId, moduleId, topicId);
    if (topic) {
      crumbs.push({
        label: topic.title,
        to: questionId ? `/track/${trackId}/module/${moduleId}/topic/${topicId}` : undefined,
      });
    }
  }
  if (moduleId && topicId && questionId) {
    const found = getQuestion(trackId, moduleId, topicId, questionId);
    if (found) crumbs.push({ label: found.question.prompt });
  }
  return crumbs;
}

/** Sticky topbar: mobile menu + breadcrumbs (left), actions slot (right). */
export function Topbar({ children }: { children?: ReactNode }) {
  const crumbs = useCrumbs();
  const openSidebar = useUiStore((s) => s.openSidebar);

  return (
    <div className="no-print sticky top-0 z-[4] flex h-14 items-center gap-2 border-b border-border-default bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] px-4 backdrop-blur-[10px] lg:px-8">
      <button
        type="button"
        onClick={openSidebar}
        aria-label="Open navigation"
        className="-ml-1 grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-panel-2 hover:text-text lg:hidden"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center text-[13px] text-muted">
        {crumbs.map((c, i) => (
          <span key={i} className="flex min-w-0 items-center">
            {c.to ? (
              <Link to={c.to} className="truncate hover:text-text">
                {c.label}
              </Link>
            ) : (
              <b className="truncate font-semibold text-text">{c.label}</b>
            )}
            {i < crumbs.length - 1 && <span className="mx-2 text-faint">/</span>}
          </span>
        ))}
      </nav>

      {children && <div className="ml-auto flex items-center gap-2">{children}</div>}
    </div>
  );
}
