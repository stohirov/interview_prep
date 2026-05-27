import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getModule, getTopic, getTrack, loadTopicComponent } from '@/content/loader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { QuestionCard } from '@/components/content/QuestionCard';
import { SourceList } from '@/components/content/SourceList';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';

export function TopicPage() {
  const { trackId, moduleId, topicId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const track = getTrack(trackId!);
  const mod = getModule(trackId!, moduleId!);
  const topic = getTopic(trackId!, moduleId!, topicId!);

  if (!track || !mod || !topic) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold">Topic not found</h1>
        <Link to="/" className="mt-3 inline-block text-brand-600 dark:text-brand-100 underline">
          Go home
        </Link>
      </div>
    );
  }

  const TopicMdx = loadTopicComponent(topic.contentPath);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: track.title, to: `/track/${track.id}` },
          { label: mod.title, to: `/track/${track.id}/module/${mod.id}` },
          { label: topic.title },
        ]}
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <main>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DifficultyBadge difficulty={topic.difficulty} />
                {topic.prerequisites.length > 0 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Prereqs:{' '}
                    {topic.prerequisites.map((p, i) => (
                      <span key={p}>
                        <Link
                          to={`/track/${track.id}/module/${mod.id}/topic/${p}`}
                          className="text-brand-600 dark:text-brand-100 hover:underline"
                        >
                          {p}
                        </Link>
                        {i < topic.prerequisites.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{topic.title}</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{topic.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print shrink-0 text-xs px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🖨️ Print
            </button>
          </div>

          <article className="mt-6">
            <MdxRenderer Component={TopicMdx} />
          </article>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Questions</h2>
            <div className="space-y-3">
              {topic.questions.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={i + 1}
                  to={`/track/${track.id}/module/${mod.id}/topic/${topic.id}/question/${q.id}`}
                />
              ))}
            </div>
          </section>
        </main>

        <aside className="lg:sticky lg:top-20 lg:self-start no-print">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="w-full lg:hidden mb-3 text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium"
          >
            {sidebarOpen ? '▼' : '▶'} Sources ({topic.sources.length})
          </button>
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4`}>
            <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-50">Authoritative sources</h3>
            <SourceList sources={topic.sources} dense />
          </div>
        </aside>
      </div>
    </div>
  );
}
