import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getModule, getQuestion, getTrack, loadAnswerComponent } from '@/content/loader';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';
import { TagPill, AskedAtPill } from '@/components/content/TagPill';
import { StatusBadge } from '@/components/content/StatusBadge';
import { SourceList } from '@/components/content/SourceList';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { useProgressStore } from '@/features/progress/store';
import type { ProgressStatus } from '@/content/types';

type StatusKey = Exclude<ProgressStatus, 'unseen'>;

const STATUS_BUTTONS: Array<{ status: StatusKey; label: string; active: string; idle: string }> = [
  {
    status: 'got-it',
    label: '✓ Got it',
    active: 'bg-green-soft text-green border-[color:var(--green)]',
    idle: 'text-muted hover:border-[color:var(--green)] hover:text-green',
  },
  {
    status: 'review',
    label: '↻ Need review',
    active: 'bg-amber-soft text-amber border-[color:var(--amber)]',
    idle: 'text-muted hover:border-[color:var(--amber)] hover:text-amber',
  },
  {
    status: 'didnt-know',
    label: "✗ Didn't know",
    active: 'bg-rose-soft text-rose border-[color:var(--rose)]',
    idle: 'text-muted hover:border-[color:var(--rose)] hover:text-rose',
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      className="h-[19px] w-[19px]"
      aria-hidden
    >
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.8l6.5-.9z" />
    </svg>
  );
}

export function QuestionPage() {
  const { trackId, moduleId, topicId, questionId } = useParams();
  const [revealed, setRevealed] = useState(false);

  const track = getTrack(trackId!);
  const mod = getModule(trackId!, moduleId!);
  const found = getQuestion(trackId!, moduleId!, topicId!, questionId!);

  const entry = useProgressStore((s) => (questionId ? s.entries[questionId] : undefined));
  const setStatus = useProgressStore((s) => s.setStatus);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const bookmarked = useProgressStore((s) => (questionId ? s.bookmarks.has(questionId) : false));

  if (!track || !mod || !found) {
    return (
      <div className="mx-auto max-w-3xl px-7 py-16">
        <h1 className="font-display text-2xl font-semibold">Question not found</h1>
        <Link to="/" className="mt-3 inline-block text-accent underline">
          Go home
        </Link>
      </div>
    );
  }

  const { question, topic } = found;
  const Answer = loadAnswerComponent(question.answerPath);
  const sources = question.sources?.length ? question.sources : topic.sources;
  const topicHref = `/track/${track.id}/module/${mod.id}/topic/${topic.id}`;

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_332px]">
        <div className="min-w-0">
          {/* meta row */}
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            // {mod.title} ·{' '}
            <Link to={topicHref} className="hover:underline">
              {topic.title}
            </Link>
          </div>

          <div className="mb-3.5 mt-3 flex flex-wrap items-center gap-1.5">
            <DifficultyBadge difficulty={question.difficulty} />
            {question.tags.map((t) => (
              <TagPill key={t} tag={t} />
            ))}
            {question.askedAt?.map((c) => (
              <AskedAtPill key={c} company={c} />
            ))}
            <StatusBadge status={entry?.status} />
          </div>

          {/* prompt + bookmark */}
          <div className="flex items-start gap-3">
            <h1 className="flex-1 font-display text-[28px] font-semibold leading-[1.12] -tracking-[0.02em] sm:text-[34px]">
              {question.prompt}
            </h1>
            <button
              type="button"
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
              onClick={() => toggleBookmark(question.id)}
              className={`no-print mt-1 shrink-0 transition-colors ${
                bookmarked ? 'text-amber' : 'text-faint hover:text-amber'
              }`}
            >
              <StarIcon filled={bookmarked} />
            </button>
          </div>

          {/* reveal answer */}
          <section className="mt-7">
            {!revealed ? (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="no-print inline-flex h-11 items-center gap-2.5 rounded-[10px] bg-gradient-to-br from-accent to-[#8b7af7] px-5 text-[14.5px] font-semibold text-white shadow-[0_6px_20px_-8px_var(--accent)] transition-[filter] hover:brightness-[1.06]"
              >
                Reveal answer ↓
              </button>
            ) : (
              <article className="rounded-[14px] border border-border-default bg-panel p-6 sm:p-7">
                <MdxRenderer Component={Answer} />
              </article>
            )}
          </section>

          {/* status buttons */}
          <section className="no-print mt-7">
            <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
              Mark your status
            </h3>
            <div className="flex flex-wrap gap-2">
              {STATUS_BUTTONS.map((b) => {
                const isActive = entry?.status === b.status;
                return (
                  <button
                    key={b.status}
                    type="button"
                    onClick={() => setStatus(question.id, b.status)}
                    aria-pressed={isActive}
                    className={`inline-flex h-9 items-center rounded-[9px] border bg-panel px-[15px] text-[13px] font-semibold transition-colors ${
                      isActive ? b.active : `border-border-default ${b.idle}`
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* follow-ups */}
          {question.followUps && question.followUps.length > 0 && (
            <section className="mt-9">
              <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                Follow-ups
              </h3>
              <div className="flex flex-col gap-[9px]">
                {question.followUps.map((id) => {
                  const next = topic.questions.find((q) => q.id === id);
                  if (!next) return null;
                  return (
                    <Link
                      key={id}
                      to={`${topicHref}/question/${id}`}
                      className="flex items-center gap-2.5 rounded-[10px] border border-border-default bg-panel px-3.5 py-3 text-[13.5px] text-text transition-colors hover:border-accent"
                    >
                      <span className="font-mono text-accent">→</span>
                      <span className="min-w-0 flex-1">{next.prompt}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* sticky sources panel */}
        <aside className="no-print rounded-[14px] border border-border-default bg-panel-2 p-5 lg:sticky lg:top-[80px]">
          <h3 className="mb-1 font-display text-[16px] font-semibold">Authoritative sources</h3>
          <SourceList sources={sources} />
        </aside>
      </div>
    </div>
  );
}
