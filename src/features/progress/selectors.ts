import type { Difficulty, ProgressEntry } from '@/content/types';
import { getModule, getTrack } from '@/content/loader';

export interface ProgressStats {
  /** Questions with a status other than `unseen`. */
  reviewed: number;
  /** Total questions in scope. */
  total: number;
  /** Completion percentage, 0–100, rounded. */
  pct: number;
}

type Entries = Record<string, ProgressEntry>;

function isReviewed(entries: Entries, questionId: string): boolean {
  const e = entries[questionId];
  return !!e && e.status !== 'unseen';
}

function stats(reviewed: number, total: number): ProgressStats {
  return { reviewed, total, pct: total === 0 ? 0 : Math.round((reviewed / total) * 100) };
}

/** Reviewed / total for a single topic. */
export function topicProgress(
  trackId: string,
  moduleId: string,
  topicId: string,
  entries: Entries,
): ProgressStats {
  const topic = getModule(trackId, moduleId)?.topics.find((t) => t.id === topicId);
  if (!topic) return stats(0, 0);
  const total = topic.questions.length;
  const reviewed = topic.questions.filter((q) => isReviewed(entries, q.id)).length;
  return stats(reviewed, total);
}

/** Reviewed / total across every question in a module. */
export function moduleProgress(trackId: string, moduleId: string, entries: Entries): ProgressStats {
  const mod = getModule(trackId, moduleId);
  if (!mod) return stats(0, 0);
  let total = 0;
  let reviewed = 0;
  for (const topic of mod.topics) {
    for (const q of topic.questions) {
      total += 1;
      if (isReviewed(entries, q.id)) reviewed += 1;
    }
  }
  return stats(reviewed, total);
}

/** Number of questions marked `got-it`. */
export function gotItCount(entries: Entries): number {
  let n = 0;
  for (const e of Object.values(entries)) if (e.status === 'got-it') n += 1;
  return n;
}

export interface ResumeTarget {
  trackId: string;
  moduleId: string;
  moduleTitle: string;
  topicId: string;
  topicTitle: string;
  difficulty: Difficulty;
  /** Progress of the topic to resume. */
  stats: ProgressStats;
  /** Timestamp of the most recent activity in this topic. */
  updatedAt: number;
}

/**
 * The topic to surface in the "Resume studying" card: the topic containing the
 * most recently updated question. Returns `null` when there is no activity yet.
 *
 * NOTE: question ids are not globally unique, so we resolve the most-recent entry
 * to the first matching location — mirroring the store's id-keyed behavior.
 */
export function resumeTarget(trackId: string, entries: Entries): ResumeTarget | null {
  const track = getTrack(trackId);
  if (!track) return null;

  let best: { updatedAt: number; moduleId: string; moduleTitle: string; topicId: string; topicTitle: string; difficulty: Difficulty } | null =
    null;

  for (const mod of track.modules) {
    for (const topic of mod.topics) {
      for (const q of topic.questions) {
        const e = entries[q.id];
        if (!e || e.status === 'unseen') continue;
        if (!best || e.updatedAt > best.updatedAt) {
          best = {
            updatedAt: e.updatedAt,
            moduleId: mod.id,
            moduleTitle: mod.title,
            topicId: topic.id,
            topicTitle: topic.title,
            difficulty: topic.difficulty,
          };
        }
      }
    }
  }

  if (!best) return null;
  return {
    trackId,
    moduleId: best.moduleId,
    moduleTitle: best.moduleTitle,
    topicId: best.topicId,
    topicTitle: best.topicTitle,
    difficulty: best.difficulty,
    stats: topicProgress(trackId, best.moduleId, best.topicId, entries),
    updatedAt: best.updatedAt,
  };
}

/** Reviewed / total across every question in a track. */
export function trackProgress(trackId: string, entries: Entries): ProgressStats {
  const track = getTrack(trackId);
  if (!track) return stats(0, 0);
  let total = 0;
  let reviewed = 0;
  for (const mod of track.modules) {
    for (const topic of mod.topics) {
      for (const q of topic.questions) {
        total += 1;
        if (isReviewed(entries, q.id)) reviewed += 1;
      }
    }
  }
  return stats(reviewed, total);
}
