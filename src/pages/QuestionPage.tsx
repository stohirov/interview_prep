import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getModule, getQuestion, getTrack, loadAnswerComponent } from '@/content/loader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DifficultyBadge } from '@/components/content/DifficultyBadge';
import { TagPill, AskedAtPill } from '@/components/content/TagPill';
import { SourceList } from '@/components/content/SourceList';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { useProgressStore } from '@/features/progress/store';
import type { ProgressStatus } from '@/content/types';

const statusButtons: Array<{ status: ProgressStatus; label: string; cls: string }> = [
  { status: 'got-it', label: '✓ Got it', cls: 'bg-emerald-600 hover:bg-emerald-700' },
  { status: 'review', label: '↻ Need review', cls: 'bg-amber-600 hover:bg-amber-700' },
  { status: 'didnt-know', label: '✗ Didn’t know', cls: 'bg-rose-600 hover:bg-rose-700' },
];

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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold">Question not found</h1>
        <Link to="/" className="mt-3 inline-block text-brand-600 dark:text-brand-100 underline">
          Go home
        </Link>
      </div>
    );
  }

  const { question, topic } = found;
  const Answer = loadAnswerComponent(question.answerPath);
  const sources = question.sources?.length ? question.sources : topic.sources;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: track.title, to: `/track/${track.id}` },
          { label: mod.title, to: `/track/${track.id}/module/${mod.id}` },
          { label: topic.title, to: `/track/${track.id}/module/${mod.id}/topic/${topic.id}` },
          { label: 'Question' },
        ]}
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <main>
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <DifficultyBadge difficulty={question.difficulty} />
            {question.tags.map((t) => <TagPill key={t} tag={t} />)}
            {question.askedAt?.map((c) => <AskedAtPill key={c} company={c} />)}
          </div>

          <div className="flex items-start gap-3">
            <h1 className="flex-1 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {question.prompt}
            </h1>
            <button
              type="button"
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
              onClick={() => toggleBookmark(question.id)}
              className="p-2 text-2xl shrink-0"
            >
              {bookmarked ? '★' : '☆'}
            </button>
          </div>

          <section className="mt-6">
            {!revealed ? (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="inline-flex items-center px-5 py-2.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
              >
                Reveal answer ↓
              </button>
            ) : (
              <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <MdxRenderer Component={Answer} />
              </article>
            )}
          </section>

          <section className="mt-6 no-print">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
              Mark your status
            </h3>
            <div className="flex flex-wrap gap-2">
              {statusButtons.map((b) => (
                <button
                  key={b.status}
                  type="button"
                  onClick={() => setStatus(question.id, b.status)}
                  className={`px-4 py-2 rounded-md text-white text-sm font-medium ${b.cls} ${
                    entry?.status === b.status ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-slate-100 dark:ring-offset-slate-950' : ''
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </section>

          {question.followUps && question.followUps.length > 0 && (
            <section className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Follow-ups
              </h3>
              <ul className="space-y-1 text-sm">
                {question.followUps.map((id) => {
                  const next = topic.questions.find((q) => q.id === id);
                  if (!next) return null;
                  return (
                    <li key={id}>
                      <Link
                        to={`/track/${track.id}/module/${mod.id}/topic/${topic.id}/question/${id}`}
                        className="text-brand-600 dark:text-brand-100 hover:underline"
                      >
                        → {next.prompt}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </main>

        <aside className="lg:sticky lg:top-20 lg:self-start no-print">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-50">Sources</h3>
            <SourceList sources={sources} dense />
          </div>
        </aside>
      </div>
    </div>
  );
}
