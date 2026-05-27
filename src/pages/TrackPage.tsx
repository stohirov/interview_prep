import { Link, useParams } from 'react-router-dom';
import { getTrack } from '@/content/loader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export function TrackPage() {
  const { trackId } = useParams();
  const track = getTrack(trackId!);
  if (!track) return <NotFound />;

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: track.title }]} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{track.title}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{track.description}</p>

      <section className="mt-8 space-y-4">
        {track.modules.map((m) => (
          <Link
            key={m.id}
            to={`/track/${track.id}/module/${m.id}`}
            className="block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-brand-500/60 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{m.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{m.description}</p>
              </div>
              <span className="shrink-0 text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                ~{m.estimatedHours}h
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>{m.topics.length} topics</span>
              <span>•</span>
              <span>{m.topics.reduce((a, t) => a + t.questions.length, 0)} questions</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold">Track not found</h1>
      <Link to="/" className="mt-3 inline-block text-brand-600 dark:text-brand-100 underline">
        Go home
      </Link>
    </div>
  );
}
