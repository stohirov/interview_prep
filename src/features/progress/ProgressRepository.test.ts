import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageProgressRepository } from './ProgressRepository';

class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  get length(): number {
    return this.data.size;
  }
  clear(): void {
    this.data.clear();
  }
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  key(i: number): string | null {
    return [...this.data.keys()][i] ?? null;
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

describe('LocalStorageProgressRepository', () => {
  let storage: MemoryStorage;
  let repo: LocalStorageProgressRepository;

  beforeEach(() => {
    storage = new MemoryStorage();
    repo = new LocalStorageProgressRepository(storage);
  });

  it('returns undefined for unknown question', () => {
    expect(repo.get('nope')).toBeUndefined();
  });

  it('persists status updates', () => {
    const entry = repo.set('q1', 'got-it');
    expect(entry.status).toBe('got-it');
    expect(repo.get('q1')?.status).toBe('got-it');
  });

  it('overwrites status on update', () => {
    repo.set('q1', 'got-it');
    repo.set('q1', 'didnt-know');
    expect(repo.get('q1')?.status).toBe('didnt-know');
  });

  it('clear removes entry', () => {
    repo.set('q1', 'got-it');
    repo.clear('q1');
    expect(repo.get('q1')).toBeUndefined();
  });

  it('all returns every entry', () => {
    repo.set('q1', 'got-it');
    repo.set('q2', 'review');
    expect(repo.all()).toHaveLength(2);
  });

  it('reset clears all data', () => {
    repo.set('q1', 'got-it');
    repo.toggleBookmark('q1');
    repo.reset();
    expect(repo.all()).toHaveLength(0);
    expect(repo.bookmarks()).toHaveLength(0);
  });

  describe('bookmarks', () => {
    it('toggles bookmark on and off', () => {
      expect(repo.isBookmarked('q1')).toBe(false);
      expect(repo.toggleBookmark('q1')).toBe(true);
      expect(repo.isBookmarked('q1')).toBe(true);
      expect(repo.toggleBookmark('q1')).toBe(false);
      expect(repo.isBookmarked('q1')).toBe(false);
    });

    it('lists all bookmarks', () => {
      repo.toggleBookmark('q1');
      repo.toggleBookmark('q2');
      expect(repo.bookmarks().sort()).toEqual(['q1', 'q2']);
    });
  });

  describe('streak', () => {
    it('starts at zero', () => {
      expect(repo.getStreak().current).toBe(0);
    });

    it('records activity once per day', () => {
      repo.recordActivity();
      expect(repo.getStreak().current).toBe(1);
      repo.recordActivity();
      expect(repo.getStreak().current).toBe(1);
    });

    it('setStatus auto-records activity', () => {
      repo.set('q1', 'got-it');
      expect(repo.getStreak().current).toBeGreaterThanOrEqual(1);
    });
  });

  describe('persistence', () => {
    it('survives a new repository instance with same storage', () => {
      repo.set('q1', 'got-it');
      repo.toggleBookmark('q2');
      const repo2 = new LocalStorageProgressRepository(storage);
      expect(repo2.get('q1')?.status).toBe('got-it');
      expect(repo2.isBookmarked('q2')).toBe(true);
    });

    it('handles corrupted JSON gracefully', () => {
      storage.setItem('jip-progress-v1', '{not valid json');
      expect(repo.all()).toEqual([]);
    });
  });
});
