import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
  hydrate: () => void;
}

const KEY = 'jip-theme';

function readInitial(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  hydrate: () => {
    const t = readInitial();
    apply(t);
    set({ theme: t });
  },
  toggle: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem(KEY, next);
    apply(next);
    set({ theme: next });
  },
  set: (t) => {
    window.localStorage.setItem(KEY, t);
    apply(t);
    set({ theme: t });
  },
}));
