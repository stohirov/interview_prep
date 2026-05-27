export function ProgressRing({ value, size = 56, label }: { value: number; size?: number; label?: string }) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value));
  const offset = c * (1 - pct);
  return (
    <div className="inline-flex items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth={stroke} fill="none" className="text-slate-200 dark:text-slate-800" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className="text-brand-600 dark:text-brand-100"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-sm">
        <div className="font-semibold tabular-nums">{Math.round(pct * 100)}%</div>
        {label && <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>}
      </div>
    </div>
  );
}
