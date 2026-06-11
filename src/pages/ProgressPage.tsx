import { Link } from 'react-router-dom';
import { getTrack } from '@/content/loader';
import { useProgressStore } from '@/features/progress/store';
import { gotItCount, moduleProgress, trackProgress } from '@/features/progress/selectors';
import { moduleMeta } from '@/features/ui/moduleMeta';
import { ConicRing } from '@/components/content/ConicRing';
import { Seo } from '@/components/seo/Seo';

const TRACK_ID = 'java-backend';

export function ProgressPage() {
  const entries = useProgressStore((s) => s.entries);
  const streak = useProgressStore((s) => s.streak);
  const reset = useProgressStore((s) => s.reset);

  const track = getTrack(TRACK_ID);
  if (!track) return null;

  const overall = trackProgress(TRACK_ID, entries);
  const gotIt = gotItCount(entries);
  const needReview = Object.values(entries).filter((e) => e.status === 'review').length;
  const weak = Object.values(entries).filter((e) => e.status === 'didnt-know').length;

  const weakSpots: Array<{ moduleId: string; topicId: string; questionId: string; prompt: string }> = [];
  for (const mod of track.modules) {
    for (const t of mod.topics) {
      for (const q of t.questions) {
        if (entries[q.id]?.status === 'didnt-know') {
          weakSpots.push({ moduleId: mod.id, topicId: t.id, questionId: q.id, prompt: q.prompt });
        }
      }
    }
  }

  const tiles = [
    { k: 'Daily streak', v: String(streak), unit: streak === 1 ? ' day' : ' days', pct: Math.min(100, streak * 20) },
    { k: 'Reviewed', v: String(overall.reviewed), unit: ` / ${overall.total}`, pct: overall.pct },
    {
      k: 'Got it',
      v: String(gotIt),
      unit: ` / ${overall.reviewed || 0}`,
      pct: overall.reviewed ? Math.round((gotIt / overall.reviewed) * 100) : 0,
    },
    { k: 'Need review', v: String(needReview + weak), unit: '', pct: Math.min(100, (needReview + weak) * 6) },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <Seo
        title="Your Progress — Cracked Java"
        description="Track your Java interview preparation progress."
        canonicalPath="/progress"
        robots="noindex,follow"
      />
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
        // Progress · {overall.pct}% complete
      </div>
      <h1 className="mt-2.5 font-display text-[34px] font-semibold leading-[1.08] -tracking-[0.02em]">
        Your progress
      </h1>
      <p className="mt-3 max-w-[640px] text-[15.5px] text-muted">
        Everything you have marked across the track, kept on this device.
      </p>

      <div className="mt-7 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {tiles.map((s) => (
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
        <h2 className="font-display text-[21px] font-semibold -tracking-[0.01em]">By module</h2>
        <span className="text-[12.5px] text-muted">{track.modules.length} modules</span>
      </div>

      <div className="flex flex-col gap-3">
        {track.modules.map((mod) => {
          const meta = moduleMeta(mod.id);
          const mp = moduleProgress(TRACK_ID, mod.id, entries);
          return (
            <Link
              key={mod.id}
              to={`/track/${TRACK_ID}/module/${mod.id}`}
              className="flex items-center gap-4 rounded-[13px] border border-border-default bg-panel px-5 py-[18px] transition-colors hover:border-accent"
            >
              <div
                className="grid h-10 w-10 flex-[0_0_auto] place-items-center rounded-[10px] font-mono text-[14px] font-semibold text-white"
                style={{ background: meta.gradient }}
              >
                {meta.glyph}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-[16px] font-semibold -tracking-[0.01em]">{mod.title}</h3>
                <div className="mt-1.5 h-[5px] overflow-hidden rounded-[3px] bg-border-strong">
                  <i
                    className="block h-full rounded-[3px]"
                    style={{ width: `${mp.pct}%`, background: meta.gradient }}
                  />
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-faint">
                  {mp.reviewed}/{mp.total} reviewed
                </div>
              </div>
              <ConicRing pct={mp.pct} size={48} inner={36}>
                <span className="text-[11px] text-text">{mp.pct}%</span>
              </ConicRing>
            </Link>
          );
        })}
      </div>

      {weakSpots.length > 0 && (
        <section className="mt-11">
          <div className="mb-[18px] flex items-baseline gap-3">
            <h2 className="font-display text-[21px] font-semibold -tracking-[0.01em]">Weak areas</h2>
            <span className="text-[12.5px] text-muted">marked “Didn’t know”</span>
          </div>
          <div className="flex flex-col gap-[9px]">
            {weakSpots.slice(0, 20).map((s) => (
              <Link
                key={s.questionId}
                to={`/track/${TRACK_ID}/module/${s.moduleId}/topic/${s.topicId}/question/${s.questionId}`}
                className="flex items-center gap-2.5 rounded-[10px] border border-border-default bg-panel px-3.5 py-3 text-[13.5px] text-text transition-colors hover:border-[color:var(--rose)]"
              >
                <span className="font-mono text-rose">✗</span>
                <span className="min-w-0 flex-1">{s.prompt}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <button
          type="button"
          onClick={() => {
            if (confirm('Reset all progress, bookmarks, and streak?')) reset();
          }}
          className="text-[13px] font-medium text-rose hover:underline"
        >
          Reset all progress
        </button>
      </section>
    </div>
  );
}
