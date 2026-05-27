import { Link, useParams } from 'react-router-dom';
import { getModule, getTrack } from '@/content/loader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TopicCard } from '@/components/content/TopicCard';

export function ModulePage() {
  const { trackId, moduleId } = useParams();
  const track = getTrack(trackId!);
  const mod = getModule(trackId!, moduleId!);
  if (!track || !mod) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold">Module not found</h1>
        <Link to="/" className="mt-3 inline-block text-brand-600 dark:text-brand-100 underline">
          Go home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: track.title, to: `/track/${track.id}` },
          { label: mod.title },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{mod.title}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{mod.description}</p>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {mod.topics.map((t, i) => (
          <TopicCard
            key={t.id}
            topic={t}
            index={i + 1}
            to={`/track/${track.id}/module/${mod.id}/topic/${t.id}`}
          />
        ))}
      </div>
    </div>
  );
}
