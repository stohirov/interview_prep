import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrack } from '@/content/loader';
import { search } from '@/features/search';
import { useUiStore } from '@/features/ui/store';
import {
  BarsIcon,
  BookIcon,
  BookmarkIcon,
  DocIcon,
  HomeIcon,
  LayersIcon,
  SearchIcon,
} from './icons';

const TRACK_ID = 'java-backend';
type Group = 'Pages' | 'Modules' | 'Topics' | 'Questions';

interface PaletteItem {
  group: Group;
  title: string;
  subtitle?: string;
  meta?: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const PAGES: PaletteItem[] = [
  { group: 'Pages', title: 'Overview', subtitle: 'Home & continue studying', to: '/', icon: HomeIcon },
  { group: 'Pages', title: 'Progress', subtitle: 'Your stats by module', to: '/progress', icon: BarsIcon },
  { group: 'Pages', title: 'Bookmarks', subtitle: 'Starred questions', to: '/bookmarks', icon: BookmarkIcon },
  { group: 'Pages', title: 'Sources', subtitle: 'Authoritative sources', to: '/sources', icon: BookIcon },
  { group: 'Pages', title: 'Search', subtitle: 'Full-text search', to: '/search', icon: SearchIcon },
];

const MODULES: PaletteItem[] = (getTrack(TRACK_ID)?.modules ?? []).map((m) => ({
  group: 'Modules',
  title: m.title,
  subtitle: `${m.topics.length} topics · ${m.topics.reduce((n, t) => n + t.questions.length, 0)} Q`,
  to: `/track/${TRACK_ID}/module/${m.id}`,
  icon: LayersIcon,
}));

function matches(item: PaletteItem, q: string): boolean {
  return `${item.title} ${item.subtitle ?? ''}`.toLowerCase().includes(q);
}

function buildItems(query: string): PaletteItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [...PAGES, ...MODULES];

  const pages = PAGES.filter((p) => matches(p, q));
  const modules = MODULES.filter((m) => matches(m, q));

  const topics: PaletteItem[] = [];
  const questions: PaletteItem[] = [];
  for (const r of search(query)) {
    const base = `/track/${r.trackId}/module/${r.moduleId}/topic/${r.topicId}`;
    if (r.kind === 'topic') {
      topics.push({
        group: 'Topics',
        title: r.topic.title,
        subtitle: r.topic.summary,
        to: base,
        icon: DocIcon,
      });
    } else if (r.question) {
      questions.push({
        group: 'Questions',
        title: r.question.prompt,
        subtitle: r.topic.title,
        meta: r.question.difficulty,
        to: `${base}/question/${r.question.id}`,
        icon: SearchIcon,
      });
    }
  }
  return [...pages, ...modules, ...topics, ...questions];
}

/** ⌘K command palette — fuzzy search over pages, modules, topics & questions. */
export function CommandPalette() {
  const open = useUiStore((s) => s.paletteOpen);
  const togglePalette = useUiStore((s) => s.togglePalette);
  const closePalette = useUiStore((s) => s.closePalette);

  // Global ⌘K / Ctrl-K toggle, registered once.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePalette]);

  // Mounted only while open → fresh query/selection each time it opens.
  if (!open) return null;
  return <PaletteBody onClose={closePalette} />;
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => buildItems(query), [query]);
  // Clamp during render rather than in an effect (items shrink as the query narrows).
  const activeIndex = items.length === 0 ? -1 : Math.min(sel, items.length - 1);

  useEffect(() => {
    listRef.current?.querySelector('[data-sel="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const go = useCallback(
    (item: PaletteItem | undefined) => {
      if (!item) return;
      onClose();
      navigate(item.to);
    },
    [onClose, navigate],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel(Math.min(activeIndex + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel(Math.max(activeIndex - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(items[activeIndex]);
    }
  };

  let lastGroup: Group | null = null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[13vh] backdrop-blur-[3px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-[600px] max-w-[92vw] overflow-hidden rounded-[15px] border border-border-strong bg-panel shadow-panel"
      >
        <div className="flex items-center gap-3 border-b border-border-default px-[19px] py-[17px]">
          <SearchIcon className="h-[19px] w-[19px] text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search topics, questions, sources…"
            autoComplete="off"
            className="flex-1 bg-transparent text-base text-text outline-none placeholder:text-faint"
          />
          <span className="rounded-[5px] border border-border-default px-[7px] py-[3px] font-mono text-[10.5px] text-faint">
            ESC
          </span>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {items.length === 0 ? (
            <div className="p-[30px] text-center text-sm text-faint">
              No matches for “{query.trim()}”
            </div>
          ) : (
            items.map((item, i) => {
              const showGroup = item.group !== lastGroup;
              lastGroup = item.group;
              const Icon = item.icon;
              const selected = i === activeIndex;
              return (
                <div key={`${item.group}-${item.to}-${i}`}>
                  {showGroup && (
                    <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                      {item.group}
                    </div>
                  )}
                  <button
                    type="button"
                    data-sel={selected}
                    onMouseMove={() => setSel(i)}
                    onClick={() => go(item)}
                    className={`flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left ${
                      selected ? 'bg-accent-soft' : ''
                    }`}
                  >
                    <span className="grid h-[30px] w-[30px] flex-[0_0_30px] place-items-center rounded-lg bg-panel-2 text-muted">
                      <Icon className="h-[15px] w-[15px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-text">{item.title}</span>
                      {item.subtitle && (
                        <span className="block truncate text-xs text-faint">{item.subtitle}</span>
                      )}
                    </span>
                    {item.meta && (
                      <span className="ml-auto font-mono text-[10px] uppercase text-faint">{item.meta}</span>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
