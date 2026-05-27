import type { ProgressEntry, ProgressStatus } from '@/content/types';

export interface ProgressRepository {
  get(questionId: string): ProgressEntry | undefined;
  set(questionId: string, status: ProgressStatus): ProgressEntry;
  clear(questionId: string): void;
  all(): ProgressEntry[];
  reset(): void;
  isBookmarked(questionId: string): boolean;
  toggleBookmark(questionId: string): boolean;
  bookmarks(): string[];
  getStreak(): { current: number; lastActiveDate: string };
  recordActivity(): void;
}

const STORAGE_KEY = 'jip-progress-v1';
const BOOKMARKS_KEY = 'jip-bookmarks-v1';
const STREAK_KEY = 'jip-streak-v1';

interface ProgressState {
  entries: Record<string, ProgressEntry>;
}

interface StreakState {
  current: number;
  lastActiveDate: string;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00Z').getTime();
  const db = new Date(b + 'T00:00:00Z').getTime();
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

export class LocalStorageProgressRepository implements ProgressRepository {
  private storage: Storage;

  constructor(storage: Storage = typeof window !== 'undefined' ? window.localStorage : (undefined as unknown as Storage)) {
    this.storage = storage;
  }

  private readState(): ProgressState {
    if (!this.storage) return { entries: {} };
    const raw = this.storage.getItem(STORAGE_KEY);
    if (!raw) return { entries: {} };
    try {
      return JSON.parse(raw) as ProgressState;
    } catch {
      return { entries: {} };
    }
  }

  private writeState(state: ProgressState): void {
    if (!this.storage) return;
    this.storage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private readBookmarks(): Set<string> {
    if (!this.storage) return new Set();
    const raw = this.storage.getItem(BOOKMARKS_KEY);
    if (!raw) return new Set();
    try {
      const arr = JSON.parse(raw) as string[];
      return new Set(arr);
    } catch {
      return new Set();
    }
  }

  private writeBookmarks(set: Set<string>): void {
    if (!this.storage) return;
    this.storage.setItem(BOOKMARKS_KEY, JSON.stringify([...set]));
  }

  get(questionId: string): ProgressEntry | undefined {
    return this.readState().entries[questionId];
  }

  set(questionId: string, status: ProgressStatus): ProgressEntry {
    const state = this.readState();
    const entry: ProgressEntry = { questionId, status, updatedAt: Date.now() };
    state.entries[questionId] = entry;
    this.writeState(state);
    this.recordActivity();
    return entry;
  }

  clear(questionId: string): void {
    const state = this.readState();
    delete state.entries[questionId];
    this.writeState(state);
  }

  all(): ProgressEntry[] {
    return Object.values(this.readState().entries);
  }

  reset(): void {
    if (!this.storage) return;
    this.storage.removeItem(STORAGE_KEY);
    this.storage.removeItem(BOOKMARKS_KEY);
    this.storage.removeItem(STREAK_KEY);
  }

  isBookmarked(questionId: string): boolean {
    return this.readBookmarks().has(questionId);
  }

  toggleBookmark(questionId: string): boolean {
    const set = this.readBookmarks();
    if (set.has(questionId)) {
      set.delete(questionId);
      this.writeBookmarks(set);
      return false;
    }
    set.add(questionId);
    this.writeBookmarks(set);
    return true;
  }

  bookmarks(): string[] {
    return [...this.readBookmarks()];
  }

  getStreak(): StreakState {
    if (!this.storage) return { current: 0, lastActiveDate: '' };
    const raw = this.storage.getItem(STREAK_KEY);
    if (!raw) return { current: 0, lastActiveDate: '' };
    try {
      return JSON.parse(raw) as StreakState;
    } catch {
      return { current: 0, lastActiveDate: '' };
    }
  }

  recordActivity(): void {
    if (!this.storage) return;
    const today = todayIso();
    const state = this.getStreak();
    if (state.lastActiveDate === today) return;
    if (!state.lastActiveDate) {
      this.storage.setItem(STREAK_KEY, JSON.stringify({ current: 1, lastActiveDate: today }));
      return;
    }
    const diff = daysBetween(state.lastActiveDate, today);
    const next: StreakState =
      diff === 1
        ? { current: state.current + 1, lastActiveDate: today }
        : { current: 1, lastActiveDate: today };
    this.storage.setItem(STREAK_KEY, JSON.stringify(next));
  }
}

export const progressRepository: ProgressRepository = new LocalStorageProgressRepository();
