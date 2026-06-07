import { Link, useParams } from 'react-router-dom';
import { getModule, getTopic, getTrack, loadTopicComponent } from '@/content/loader';
import { QuestionCard } from '@/components/content/QuestionCard';
import { SourceList } from '@/components/content/SourceList';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';

export function TopicPage() {
  const { trackId, moduleId, topicId } = useParams();
  const track = getTrack(trackId!);
  const mod = getModule(trackId!, moduleId!);
  const topic = getTopic(trackId!, moduleId!, topicId!);

  if (!track || !mod || !topic) {
    return (
      <div className="mx-auto max-w-3xl px-7 py-16">
        <h1 className="font-display text-2xl font-semibold">Topic not found</h1>
        <Link to="/" className="mt-3 inline-block text-accent underline">
          Go home
        </Link>
      </div>
    );
  }

  const TopicMdx = loadTopicComponent(topic.contentPath);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_332px]">
        <div className="min-w-0">
          {/* lesson header */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <DifficultyBadge difficulty={topic.difficulty} />
              <h1 className="mt-3.5 font-display text-[34px] font-semibold leading-[1.08] -tracking-[0.02em] sm:text-[38px]">
                {topic.title}
              </h1>
              <p className="mt-3 max-w-[720px] text-[15.5px] text-muted">{topic.summary}</p>
              {topic.prerequisites.length > 0 && (
                <p className="mt-3 text-[13px] text-faint">
                  Prereqs:{' '}
                  {topic.prerequisites.map((p, i) => (
                    <span key={p}>
                      <Link
                        to={`/track/${track.id}/module/${mod.id}/topic/${p}`}
                        className="text-accent hover:underline"
                      >
                        {p}
                      </Link>
                      {i < topic.prerequisites.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-border-default bg-panel px-[13px] text-[12.5px] font-medium text-muted hover:border-accent hover:text-text"
            >
              🖨 Print
            </button>
          </div>

          {/* lesson prose */}
          <article className="mt-6">
            <MdxRenderer Component={TopicMdx} />
          </article>

          {/* questions */}
          <div className="mb-[18px] mt-11 flex items-baseline gap-3">
            <h2 className="font-display text-[21px] font-semibold -tracking-[0.01em]">Questions</h2>
            <span className="text-[12.5px] text-muted">{topic.questions.length} in this topic</span>
          </div>
          <div className="flex flex-col gap-[11px]">
            {topic.questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={i + 1}
                to={`/track/${track.id}/module/${mod.id}/topic/${topic.id}/question/${q.id}`}
              />
            ))}
          </div>
        </div>

        {/* sticky sources panel */}
        <aside className="no-print rounded-[14px] border border-border-default bg-panel-2 p-5 lg:sticky lg:top-[80px]">
          <h3 className="mb-1 font-display text-[16px] font-semibold">Authoritative sources</h3>
          <SourceList sources={topic.sources} />
        </aside>
      </div>
    </div>
  );
}
