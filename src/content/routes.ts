import { javaBackendTrack } from './tracks/java-backend';
import type { Track } from './types';

/**
 * Glob-free enumeration of every prerenderable route, derived from the static
 * content tree. Safe to import from vite.config.ts (does NOT touch loader.ts's
 * import.meta.glob). Consumed by `includedRoutes` (SSG) and sitemap generation.
 */

export interface RouteInfo {
  path: string;
  /** Indexable routes go in the sitemap; user-state shells are noindex. */
  indexable: boolean;
  priority: number;
}

const TRACKS: Track[] = [javaBackendTrack];

export function enumerateRoutes(): RouteInfo[] {
  const out: RouteInfo[] = [{ path: '/', indexable: true, priority: 1.0 }];

  for (const track of TRACKS) {
    out.push({ path: `/track/${track.id}`, indexable: true, priority: 0.9 });
    for (const mod of track.modules) {
      const modPath = `/track/${track.id}/module/${mod.id}`;
      out.push({ path: modPath, indexable: true, priority: 0.8 });
      for (const topic of mod.topics) {
        const topicPath = `${modPath}/topic/${topic.id}`;
        out.push({ path: topicPath, indexable: true, priority: 0.7 });
        for (const question of topic.questions) {
          out.push({
            path: `${topicPath}/question/${question.id}`,
            indexable: true,
            priority: 0.6,
          });
        }
      }
    }
  }

  // Static content pages — indexable shells.
  out.push({ path: '/sources', indexable: true, priority: 0.5 });
  out.push({ path: '/search', indexable: true, priority: 0.4 });
  // User-state pages — prerendered so deep links resolve, but kept out of the index.
  out.push({ path: '/progress', indexable: false, priority: 0 });
  out.push({ path: '/bookmarks', indexable: false, priority: 0 });

  return out;
}

export function allRoutePaths(): string[] {
  return enumerateRoutes().map((r) => r.path);
}
