import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Difficulty } from '@/content/types';
import { getModule, getTrack } from '@/content/loader';
import { useProgressStore } from '@/features/progress/store';
import { moduleProgress } from '@/features/progress/selectors';
import { TopicCard } from '@/components/content/TopicCard';
import { Seo } from '@/components/seo/Seo';
import { breadcrumbList, topicItemList } from '@/components/seo/jsonld';

type LevelFilter = 'all' | Difficulty;
type StatusFilter = 'all' | 'prog' | 'new';

const LEVELS: { key: LevelFilter; label: string }[] = [
  { key: 'all', label: 'All levels' },
  { key: 'junior', label: 'Junior' },
  { key: 'middle', label: 'Mid' },
  { key: 'senior', label: 'Senior' },
];

const STATUSES: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All status' },
  { key: 'prog', label: 'In progress' },
  { key: 'new', label: 'Not started' },
];

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-[9px] border border-border-default bg-panel p-[3px]">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onChange(o.key)}
          className={`rounded-md px-[13px] py-1.5 text-[12.5px] font-medium ${
            value === o.key ? 'bg-accent-soft text-text' : 'text-muted hover:text-text'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ModulePage() {
  const { trackId, moduleId } = useParams();
  const [level, setLevel] = useState<LevelFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const entries = useProgressStore((s) => s.entries);

  const track = getTrack(trackId!);
  const mod = getModule(trackId!, moduleId!);
  if (!track || !mod) {
    return (
      <div className="mx-auto max-w-3xl px-7 py-16">
        <h1 className="font-display text-2xl font-semibold">Module not found</h1>
        <Link to="/" className="mt-3 inline-block text-accent underline">
          Go home
        </Link>
      </div>
    );
  }

  const reviewedIn = (topicQuestions: { id: string }[]) =>
    topicQuestions.filter((q) => {
      const s = entries[q.id]?.status;
      return s && s !== 'unseen';
    }).length;

  const topicStats = mod.topics.map((t) => {
    const total = t.questions.length;
    const reviewed = reviewedIn(t.questions);
    return { topic: t, total, reviewed, done: total > 0 && reviewed === total, started: reviewed > 0 };
  });

  const overall = moduleProgress(trackId!, moduleId!, entries);
  const topicsDone = topicStats.filter((t) => t.done).length;
  const hoursLeft = Math.round(mod.estimatedHours * (1 - overall.pct / 100));
  const nextUp = topicStats.find((t) => !t.done)?.topic;
  const totalQuestions = topicStats.reduce((a, t) => a + t.total, 0);

  const filtered = topicStats.filter((t) => {
    if (level !== 'all' && t.topic.difficulty !== level) return false;
    if (status === 'prog' && !t.started) return false;
    if (status === 'new' && t.started) return false;
    return true;
  });

  const canonicalPath = `/track/${track.id}/module/${mod.id}`;

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <Seo
        title={`${mod.title} Interview Questions & Answers — Cracked Java`}
        description={`${mod.description} ${totalQuestions} interview questions with detailed answers across ${mod.topics.length} topics.`}
        canonicalPath={canonicalPath}
        jsonLd={[
          breadcrumbList([
            { name: 'Cracked Java', path: '/' },
            { name: track.title, path: `/track/${track.id}` },
            { name: mod.title, path: canonicalPath },
          ]),
          topicItemList(track.id, mod.id, mod.topics),
        ]}
      />
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
        // Module · {mod.topics.length} topics · {totalQuestions} questions
      </div>
      <h1 className="mt-2.5 font-display text-[34px] font-semibold leading-[1.08] -tracking-[0.02em]">
        {mod.title}
      </h1>
      <p className="mt-3 max-w-[720px] text-[15.5px] text-muted">{mod.description}</p>

      {/* module progress strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-[26px] gap-y-4 rounded-[13px] border border-border-default bg-panel px-[22px] py-[18px]">
        <ConicRingStat pct={overall.pct} />
        <Stat k="Reviewed" v={`${overall.reviewed} / ${overall.total}`} />
        <Divider />
        <Stat k="Topics done" v={`${topicsDone} / ${mod.topics.length}`} />
        <Divider />
        <Stat k="Est. time left" v={`~${hoursLeft}h`} />
        <Divider />
        <Stat k="Next up" v={nextUp ? nextUp.title : 'All done'} accent />
      </div>

      {/* filters */}
      <div className="my-[18px] mt-[30px] flex flex-wrap items-center gap-3">
        <Segmented options={LEVELS} value={level} onChange={setLevel} />
        <Segmented options={STATUSES} value={status} onChange={setStatus} />
        <span className="ml-auto font-mono text-[12px] text-faint">
          {filtered.length} {filtered.length === 1 ? 'topic' : 'topics'}
        </span>
      </div>

      {/* topic grid */}
      {filtered.length === 0 ? (
        <p className="rounded-[13px] border border-dashed border-border-default px-5 py-10 text-center text-[14px] text-muted">
          No topics match these filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 min-[920px]:grid-cols-2">
          {filtered.map(({ topic }) => {
            const index = mod.topics.indexOf(topic) + 1;
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                index={index}
                to={`/track/${track.id}/module/${mod.id}/topic/${topic.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function ConicRingStat({ pct }: { pct: number }) {
  return (
    <span
      className="grid h-[62px] w-[62px] flex-[0_0_auto] place-items-center rounded-full"
      style={{ background: `conic-gradient(var(--accent) ${pct * 3.6}deg, var(--border-2) 0)` }}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-panel font-display text-[15px] font-semibold text-text">
        {pct}%
      </span>
    </span>
  );
}

function Stat({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-faint">{k}</div>
      <div className={`mt-1 font-display text-[19px] font-semibold ${accent ? 'text-accent' : ''}`}>{v}</div>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-10 w-px self-stretch bg-border-default sm:block" />;
}
