/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      width: {
        sidebar: '272px',
      },
      boxShadow: {
        panel: 'var(--shadow)',
      },
      colors: {
        // Console semantic aliases → CSS vars (light in :root, dark in .dark)
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        'panel-3': 'var(--panel-3)',
        'border-default': 'var(--border)',
        'border-strong': 'var(--border-2)',
        text: 'var(--text)',
        'text-2': 'var(--text-2)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'accent-soft': 'var(--accent-soft)',
        green: 'var(--green)',
        'green-soft': 'var(--green-soft)',
        amber: 'var(--amber)',
        'amber-soft': 'var(--amber-soft)',
        rose: 'var(--rose)',
        'rose-soft': 'var(--rose-soft)',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      }),
    },
  },
  plugins: [],
};
