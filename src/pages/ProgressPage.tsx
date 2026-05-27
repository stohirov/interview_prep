import { Link } from 'react-router-dom';
import { tracks } from '@/content/loader';
import { useProgressStore } from '@/features/progress/store';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProgressRing } from '@/components/content/ProgressRing';

export function ProgressPage() {
  const entries = useProgressStore((s) => s.entries);
  const streak = useProgressStore((s) => s.streak);
  const reset = useProgressStore((s) => s.reset);

  const weakSpots: Array<{ trackId: string; moduleId: string; topicId: string; questionId: string; prompt: string }> = [];

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Progress' }]} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Your progress</h1>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <Stat label="Daily streak" value={`${streak} day${streak === 1 ? '' : 's'}`} />
        <Stat label="Questions reviewed" value={String(Object.keys(entries).length)} />
        <Stat
          label="Got it / total"
          value={`${Object.values(entries).filter((e) => e.status === 'got-it').length} / ${Object.keys(entries).length || 0}`}
        />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">By module</h2>
        <div className="space-y-3">
          {tracks.flatMap((track) =>
            track.modules.map((mod) => {
              let total = 0;
              let got = 0;
              for (const t of mod.topics) {
                for (const q of t.questions) {
                  total++;
                  const status = entries[q.id]?.status;
                  if (status === 'got-it' || status === 'review') got++;
                  if (status === 'didnt-know') {
                    weakSpots.push({
                      trackId: track.id,
                      moduleId: mod.id,
                      topicId: t.id,
                      questionId: q.id,
                      prompt: q.prompt,
                    });
                  }
                }
              }
              const ratio = total === 0 ? 0 : got / total;
              return (
                <Link
                  key={mod.id}
                  to={`/track/${track.id}/module/${mod.id}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500/60"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">{mod.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {got} / {total} questions reviewed
                    </p>
                  </div>
                  <ProgressRing value={ratio} />
                </Link>
              );
            }),
          )}
        </div>
      </section>

      {weakSpots.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Weak areas — mark as “Didn’t know”</h2>
          <ul className="space-y-2">
            {weakSpots.slice(0, 20).map((s) => (
              <li key={s.questionId}>
                <Link
                  to={`/track/${s.trackId}/module/${s.moduleId}/topic/${s.topicId}/question/${s.questionId}`}
                  className="text-rose-700 dark:text-rose-300 hover:underline"
                >
                  → {s.prompt}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <button
          type="button"
          onClick={() => {
            if (confirm('Reset all progress, bookmarks, and streak?')) reset();
          }}
          className="text-sm text-rose-600 hover:underline"
        >
          Reset all progress
        </button>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
