import { NavLink, useParams } from 'react-router-dom';
import { getTrack } from '@/content/loader';
import { useProgressStore } from '@/features/progress/store';
import { moduleProgress } from '@/features/progress/selectors';

const TRACK_ID = 'java-backend';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Module tree, data-driven from the content loader + progress store.
 * The active module expands to its topic subtree.
 */
export function SidebarTree({ onNavigate }: { onNavigate?: () => void }) {
  const { moduleId: activeModuleId, topicId: activeTopicId } = useParams();
  const entries = useProgressStore((s) => s.entries);
  const track = getTrack(TRACK_ID);
  if (!track) return null;

  return (
    <div className="flex flex-col gap-px">
      {track.modules.map((mod) => {
        const on = mod.id === activeModuleId;
        const { pct } = moduleProgress(TRACK_ID, mod.id, entries);
        return (
          <div key={mod.id}>
            <NavLink
              to={`/track/${TRACK_ID}/module/${mod.id}`}
              onClick={onNavigate}
              className={`flex items-center gap-2.5 rounded-[7px] px-3 py-[7px] pl-3 text-[13px] ${
                on
                  ? 'bg-accent-soft text-text'
                  : 'text-muted hover:bg-panel-2 hover:text-text'
              }`}
            >
              <span
                className="h-[7px] w-[7px] flex-[0_0_7px] rounded-full"
                style={
                  pct > 0
                    ? {
                        background: `conic-gradient(var(--accent) ${pct * 3.6}deg, var(--border-2) 0)`,
                      }
                    : { background: 'var(--border-2)' }
                }
              />
              <span className="truncate">{mod.title}</span>
              <span className="ml-auto font-mono text-[10px] text-faint">{pct}%</span>
            </NavLink>

            {on && (
              <div className="my-1 ml-[18px] flex flex-col border-l border-border-default pl-0.5">
                {mod.topics.map((topic, i) => {
                  const topicOn = topic.id === activeTopicId;
                  return (
                    <NavLink
                      key={topic.id}
                      to={`/track/${TRACK_ID}/module/${mod.id}/topic/${topic.id}`}
                      onClick={onNavigate}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px] ${
                        topicOn
                          ? 'bg-accent-soft font-medium text-accent'
                          : 'text-muted hover:bg-panel-2 hover:text-text'
                      }`}
                    >
                      <span className="w-[18px] flex-[0_0_18px] font-mono text-[10.5px] text-faint">
                        {pad(i + 1)}
                      </span>
                      <span className="truncate">{topic.title}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
