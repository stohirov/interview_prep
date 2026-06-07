import { describe, it, expect } from 'vitest';
import type { ProgressEntry, ProgressStatus } from '@/content/types';
import { getTrack } from '@/content/loader';
import { gotItCount, moduleProgress, resumeTarget, topicProgress, trackProgress } from './selectors';

const TRACK = 'java-backend';

function entry(questionId: string, status: ProgressStatus, updatedAt = 0): ProgressEntry {
  return { questionId, status, updatedAt };
}

function entriesFrom(...es: ProgressEntry[]): Record<string, ProgressEntry> {
  const out: Record<string, ProgressEntry> = {};
  for (const e of es) out[e.questionId] = e;
  return out;
}

describe('progress selectors', () => {
  const track = getTrack(TRACK)!;
  const mod = track.modules[0];
  const topic = mod.topics[0];

  it('reports zero progress with no entries', () => {
    const m = moduleProgress(TRACK, mod.id, {});
    expect(m.reviewed).toBe(0);
    expect(m.pct).toBe(0);
    expect(m.total).toBeGreaterThan(0);
  });

  it('counts only entries with a non-unseen status as reviewed', () => {
    const entries = entriesFrom(
      entry(topic.questions[0].id, 'got-it'),
      entry(topic.questions[1].id, 'unseen'),
    );
    const t = topicProgress(TRACK, mod.id, topic.id, entries);
    expect(t.reviewed).toBe(1);
    expect(t.total).toBe(topic.questions.length);
  });

  it('reaches 100% when every question id in the module is reviewed', () => {
    const all = mod.topics.flatMap((tp) => tp.questions);
    // Keyed by id — duplicate ids across topics collapse, mirroring the progress store.
    const entries = entriesFrom(...all.map((q) => entry(q.id, 'got-it')));
    const m = moduleProgress(TRACK, mod.id, entries);
    expect(m.total).toBe(all.length);
    expect(m.reviewed).toBe(all.length);
    expect(m.pct).toBe(100);
  });

  it('rounds module pct from reviewed / total', () => {
    // Mark exactly the first topic's questions; every occurrence sharing those ids counts.
    const markedIds = new Set(topic.questions.map((q) => q.id));
    const entries = entriesFrom(...topic.questions.map((q) => entry(q.id, 'got-it')));
    const m = moduleProgress(TRACK, mod.id, entries);
    const expectedReviewed = mod.topics
      .flatMap((tp) => tp.questions)
      .filter((q) => markedIds.has(q.id)).length;
    expect(m.reviewed).toBe(expectedReviewed);
    expect(m.pct).toBe(Math.round((expectedReviewed / m.total) * 100));
  });

  it('aggregates every module into the track total', () => {
    const expectedTotal = track.modules
      .flatMap((m) => m.topics)
      .flatMap((t) => t.questions).length;
    const tp = trackProgress(TRACK, {});
    expect(tp.total).toBe(expectedTotal);
    expect(tp.reviewed).toBe(0);
  });

  it('returns empty stats for unknown ids', () => {
    expect(moduleProgress(TRACK, 'nope', {})).toEqual({ reviewed: 0, total: 0, pct: 0 });
    expect(trackProgress('nope', {})).toEqual({ reviewed: 0, total: 0, pct: 0 });
  });

  it('counts only got-it entries', () => {
    const entries = entriesFrom(
      entry(topic.questions[0].id, 'got-it'),
      entry(topic.questions[1].id, 'review'),
      entry(mod.topics[1].questions[0].id, 'got-it'),
    );
    expect(gotItCount(entries)).toBe(2);
    expect(gotItCount({})).toBe(0);
  });

  it('resumes the topic of the most recently updated question', () => {
    const older = topic.questions[0];
    const newer = mod.topics[1].questions[0];
    const entries = entriesFrom(
      entry(older.id, 'got-it', 100),
      entry(newer.id, 'review', 200),
    );
    const t = resumeTarget(TRACK, entries);
    expect(t?.topicId).toBe(mod.topics[1].id);
    expect(t?.moduleId).toBe(mod.id);
    expect(t?.updatedAt).toBe(200);
    expect(t?.stats.reviewed).toBeGreaterThanOrEqual(1);
  });

  it('returns null resume target with no activity', () => {
    expect(resumeTarget(TRACK, {})).toBeNull();
    expect(resumeTarget(TRACK, entriesFrom(entry(topic.questions[0].id, 'unseen')))).toBeNull();
  });
});
