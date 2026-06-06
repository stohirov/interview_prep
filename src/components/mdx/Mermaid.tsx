import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';

// Client-side Mermaid renderer for MDX. We avoid build-time rendering
// (rehype-mermaid) because it needs a headless browser; rendering in the
// browser keeps the build fast and lets the diagram re-theme on dark-mode
// toggles. The diagram source is passed as the component's text children.
function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

function isDark(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

export function Mermaid({ caption, children }: { caption?: string; children: ReactNode }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const source = extractText(children).trim();

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark() ? 'dark' : 'neutral',
          securityLevel: 'strict',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        });
        const { svg } = await mermaid.render(`mermaid-${id}`, source);
        if (!cancelled) {
          setSvg(svg);
          setError('');
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    }

    void render();

    // Re-render when the dark-mode class toggles on <html>.
    const observer = new MutationObserver(() => void render());
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [id, source]);

  return (
    <figure className="my-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 overflow-x-auto">
      {error ? (
        <pre className="text-xs text-rose-600 dark:text-rose-400 whitespace-pre-wrap">
          Mermaid error: {error}
          {'\n\n'}
          {source}
        </pre>
      ) : (
        <div ref={ref} className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 italic">{caption}</figcaption>
      )}
    </figure>
  );
}
