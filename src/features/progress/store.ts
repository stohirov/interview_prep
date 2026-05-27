import { create } from 'zustand';
import type { ProgressEntry, ProgressStatus } from '@/content/types';
import { progressRepository } from './ProgressRepository';

interface ProgressStore {
  entries: Record<string, ProgressEntry>;
  bookmarks: Set<string>;
  streak: number;
  hydrate: () => void;
  setStatus: (questionId: string, status: ProgressStatus) => void;
  clearStatus: (questionId: string) => void;
  toggleBookmark: (questionId: string) => void;
  reset: () => void;
}

function snapshot() {
  const entries: Record<string, ProgressEntry> = {};
  for (const e of progressRepository.all()) entries[e.questionId] = e;
  return {
    entries,
    bookmarks: new Set(progressRepository.bookmarks()),
    streak: progressRepository.getStreak().current,
  };
}

export const useProgressStore = create<ProgressStore>((set) => ({
  entries: {},
  bookmarks: new Set(),
  streak: 0,
  hydrate: () => set(snapshot()),
  setStatus: (questionId, status) => {
    progressRepository.set(questionId, status);
    set(snapshot());
  },
  clearStatus: (questionId) => {
    progressRepository.clear(questionId);
    set(snapshot());
  },
  toggleBookmark: (questionId) => {
    progressRepository.toggleBookmark(questionId);
    set(snapshot());
  },
  reset: () => {
    progressRepository.reset();
    set(snapshot());
  },
}));
