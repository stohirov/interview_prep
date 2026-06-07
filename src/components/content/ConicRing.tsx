import type { ReactNode } from 'react';

/**
 * Conic-gradient progress ring (Console style): a colored arc on a track,
 * with an inner panel disc holding the label. Ported from `console.css .ring`.
 */
export function ConicRing({
  pct,
  size = 56,
  inner = 42,
  color = 'var(--accent)',
  children,
  className = '',
}: {
  /** 0–100. */
  pct: number;
  /** Outer diameter in px. */
  size?: number;
  /** Inner disc diameter in px. */
  inner?: number;
  /** Arc color (CSS var or value). */
  color?: string;
  children?: ReactNode;
  className?: string;
}) {
  const deg = Math.max(0, Math.min(100, pct)) * 3.6;
  return (
    <span
      className={`grid flex-[0_0_auto] place-items-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${deg}deg, var(--border-2) 0)`,
      }}
    >
      <span
        className="grid place-items-center rounded-full bg-panel font-mono font-semibold not-italic"
        style={{ width: inner, height: inner }}
      >
        {children}
      </span>
    </span>
  );
}
