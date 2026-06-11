import { Link } from 'react-router-dom';
import { getTrack } from '@/content/loader';
import { useProgressStore } from '@/features/progress/store';
import {
  gotItCount,
  moduleProgress,
  resumeTarget,
  trackProgress,
} from '@/features/progress/selectors';
import { moduleMeta } from '@/features/ui/moduleMeta';
import { Seo } from '@/components/seo/Seo';
import { moduleItemList, webSite } from '@/components/seo/jsonld';

const TRACK_ID = 'java-backend';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const hour = 3_600_000;
  const day = 24 * hour;
  if (diff < hour) return 'just now';
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  const days = Math.floor(diff / day);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function LandingPage() {
  const entries = useProgressStore((s) => s.entries);
  const streak = useProgressStore((s) => s.streak);
  const bookmarks = useProgressStore((s) => s.bookmarks);

  const track = getTrack(TRACK_ID);
  if (!track) return null;

  const overall = trackProgress(TRACK_ID, entries);
  const gotIt = gotItCount(entries);
  const resume = resumeTarget(TRACK_ID, entries);

  const totalHours = track.modules.reduce((a, m) => a + m.estimatedHours, 0);
  const firstTopic = track.modules[0]?.topics[0];
  const startHref = resume
    ? `/track/${TRACK_ID}/module/${resume.moduleId}/topic/${resume.topicId}`
    : firstTopic
      ? `/track/${TRACK_ID}/module/${track.modules[0].id}/topic/${firstTopic.id}`
      : `/track/${TRACK_ID}`;

  const stats = [
    {
      k: 'Daily streak',
      v: String(streak),
      unit: streak === 1 ? ' day' : ' days',
      pct: Math.min(100, streak * 20),
    },
    {
      k: 'Reviewed',
      v: String(overall.reviewed),
      unit: ` / ${overall.total}`,
      pct: overall.pct,
    },
    {
      k: 'Got it',
      v: String(gotIt),
      unit: ` / ${overall.reviewed || 0}`,
      pct: overall.reviewed ? Math.round((gotIt / overall.reviewed) * 100) : 0,
    },
    {
      k: 'Bookmarked',
      v: String(bookmarks.size),
      unit: '',
      pct: Math.min(100, bookmarks.size * 8),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <Seo
        title="Cracked Java — Java Backend Interview Questions & Answers"
        description={`Free Java backend interview prep: ${overall.total}+ questions with detailed answers across ${track.modules.length} modules — Collections, OOP, PostgreSQL, Spring, data structures & algorithms, and system design.`}
        canonicalPath="/"
        jsonLd={[webSite(), moduleItemList(TRACK_ID, track.modules)]}
      />
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
        // {overall.total} questions · {track.modules.length} modules · ~{totalHours}h
      </div>

      <h1 className="mt-3.5 font-display text-[40px] font-semibold leading-[1.04] -tracking-[0.025em] sm:text-[46px]">
        Pass the Java
        <br />
        backend interview.
      </h1>
      <p className="mt-4 max-w-[560px] text-[17px] text-muted">
        Free, structured Java backend interview questions and answers — covering Collections, OOP,
        PostgreSQL, Spring, data structures &amp; algorithms, and system design. Every claim grounded
        in the JDK 25 Javadoc, the JLS and JEPs.
      </p>

      <div className="mt-[26px] flex flex-wrap gap-3">
        <Link
          to={startHref}
          className="inline-flex h-11 items-center gap-2.5 rounded-[10px] bg-gradient-to-br from-accent to-[#8b7af7] px-5 text-[14.5px] font-semibold text-white shadow-[0_6px_20px_-8px_var(--accent)] hover:brightness-[1.06] [&_svg]:h-4 [&_svg]:w-4"
        >
          {resume ? 'Resume studying' : 'Start studying'}
          <ArrowIcon />
        </Link>
        <Link
          to="/sources"
          className="inline-flex h-11 items-center gap-2.5 rounded-[10px] border border-border-default bg-panel px-5 text-[14.5px] font-semibold text-text hover:border-accent"
        >
          Browse sources
        </Link>
      </div>

      {resume && (
        <Link
          to={startHref}
          className="relative mt-10 flex items-center gap-5 overflow-hidden rounded-[14px] border border-border-default bg-gradient-to-r from-panel to-panel-2 px-[22px] py-5 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-gradient-to-b before:from-accent before:to-accent-2 before:content-['']"
        >
          <div
            className="grid h-[54px] w-[54px] flex-[0_0_54px] place-items-center rounded-full"
            style={{
              background: `conic-gradient(var(--accent) ${resume.stats.pct * 3.6}deg, var(--border-2) 0)`,
            }}
          >
            <i className="grid h-[42px] w-[42px] place-items-center rounded-full bg-panel font-mono text-[11px] font-semibold not-italic text-text">
              {resume.stats.pct}%
            </i>
          </div>
          <div className="flex min-w-0 flex-col gap-[3px]">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-faint">
              Continue · {resume.moduleTitle} · {resume.difficulty}
            </div>
            <h3 className="max-w-full truncate font-display text-[18px] font-semibold leading-[1.15] -tracking-[0.01em]">
              {resume.topicTitle}
            </h3>
            <p className="text-[13px] text-muted">
              {resume.stats.reviewed} of {resume.stats.total} questions reviewed · last opened{' '}
              {relativeTime(resume.updatedAt)}
            </p>
          </div>
          <span className="ml-auto inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[9px] bg-accent px-[18px] text-[13.5px] font-semibold text-white [&_svg]:h-[15px] [&_svg]:w-[15px]">
            Pick up
            <ArrowIcon />
          </span>
        </Link>
      )}

      <div className="mt-[30px] grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-xl border border-border-default bg-panel px-[17px] py-4">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">{s.k}</div>
            <div className="mt-[9px] font-display text-[27px] font-semibold -tracking-[0.02em]">
              {s.v}
              {s.unit && <small className="text-[14px] font-medium text-muted">{s.unit}</small>}
            </div>
            <div className="mt-[11px] h-1 overflow-hidden rounded-[3px] bg-border-strong">
              <i
                className="block h-full rounded-[3px] bg-gradient-to-r from-accent to-accent-2"
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-[18px] mt-11 flex items-baseline gap-3">
        <h2 className="font-display text-[21px] font-semibold -tracking-[0.01em]">Modules</h2>
        <span className="text-[12.5px] text-muted">{track.title}</span>
        <Link to={`/track/${TRACK_ID}`} className="ml-auto text-[12.5px] font-medium text-accent">
          View track →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {track.modules.map((mod) => {
          const meta = moduleMeta(mod.id);
          const mp = moduleProgress(TRACK_ID, mod.id, entries);
          const topicCount = mod.topics.length;
          return (
            <Link
              key={mod.id}
              to={`/track/${TRACK_ID}/module/${mod.id}`}
              className="rounded-[13px] border border-border-default bg-panel px-[19px] py-[18px] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-accent"
            >
              <div className="mb-[13px] flex items-center gap-[11px]">
                <div
                  className="grid h-9 w-9 place-items-center rounded-[9px] font-mono text-[13px] font-semibold text-white"
                  style={{ background: meta.gradient }}
                >
                  {meta.glyph}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-[16px] font-semibold -tracking-[0.01em]">
                    {mod.title}
                  </h3>
                  <div className="mt-px font-mono text-[12px] text-faint">
                    {topicCount} topics · {mp.total} Q · ~{mod.estimatedHours}h
                  </div>
                </div>
                <span className="ml-auto font-mono text-[12px] font-semibold text-muted">{mp.pct}%</span>
              </div>
              <p className="min-h-[36px] text-[13px] leading-[1.45] text-muted">{mod.description}</p>
              <div className="mt-3.5 h-[5px] overflow-hidden rounded-[3px] bg-border-strong">
                <i
                  className="block h-full rounded-[3px]"
                  style={{ width: `${mp.pct}%`, background: meta.gradient }}
                />
              </div>
              <div className="mt-3 flex items-center gap-3.5 font-mono text-[11px] text-faint">
                <span>{meta.level}</span>
                <span>
                  {mp.reviewed}/{mp.total} reviewed
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
