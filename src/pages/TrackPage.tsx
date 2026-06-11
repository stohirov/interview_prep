import { Link, useParams } from 'react-router-dom';
import { getTrack } from '@/content/loader';
import { useProgressStore } from '@/features/progress/store';
import { moduleProgress, trackProgress } from '@/features/progress/selectors';
import { moduleMeta } from '@/features/ui/moduleMeta';
import { Seo } from '@/components/seo/Seo';
import { breadcrumbList, course } from '@/components/seo/jsonld';

export function TrackPage() {
  const { trackId } = useParams();
  const entries = useProgressStore((s) => s.entries);
  const track = getTrack(trackId!);
  if (!track) return <NotFound />;

  const overall = trackProgress(track.id, entries);
  const totalHours = track.modules.reduce((a, m) => a + m.estimatedHours, 0);
  const canonicalPath = `/track/${track.id}`;

  return (
    <div className="mx-auto w-full max-w-[1120px] px-7 pb-[72px] pt-[38px] lg:px-12">
      <Seo
        title={`${track.title} — Cracked Java`}
        description={track.description}
        canonicalPath={canonicalPath}
        jsonLd={[
          breadcrumbList([
            { name: 'Cracked Java', path: '/' },
            { name: track.title, path: canonicalPath },
          ]),
          course(track),
        ]}
      />
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
        // Track · {overall.total} questions · {track.modules.length} modules · ~{totalHours}h
      </div>
      <h1 className="mt-2.5 font-display text-[34px] font-semibold leading-[1.08] -tracking-[0.02em]">
        {track.title}
      </h1>
      <p className="mt-3 max-w-[680px] text-[15.5px] text-muted">{track.description}</p>

      <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {track.modules.map((mod) => {
          const meta = moduleMeta(mod.id);
          const mp = moduleProgress(track.id, mod.id, entries);
          const questions = mod.topics.reduce((a, t) => a + t.questions.length, 0);
          return (
            <Link
              key={mod.id}
              to={`/track/${track.id}/module/${mod.id}`}
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
                  <h3 className="truncate font-display text-[16px] font-semibold -tracking-[0.01em]">{mod.title}</h3>
                  <div className="mt-px font-mono text-[12px] text-faint">
                    {mod.topics.length} topics · {questions} Q · ~{mod.estimatedHours}h
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

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-7 py-16">
      <h1 className="font-display text-2xl font-semibold">Track not found</h1>
      <Link to="/" className="mt-3 inline-block text-accent underline">
        Go home
      </Link>
    </div>
  );
}
