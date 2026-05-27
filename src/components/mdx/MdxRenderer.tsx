import { MDXProvider } from '@mdx-js/react';
import { type ComponentType, type ReactNode } from 'react';
import { mdxComponents } from './components';

export function MdxRenderer({ Component }: { Component?: ComponentType<Record<string, unknown>> }) {
  if (!Component) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-4 text-sm text-slate-500 dark:text-slate-400 italic">
        Content not found.
      </div>
    );
  }
  return (
    <MDXProvider components={mdxComponents}>
      <div className="prose-content">
        <Component />
      </div>
    </MDXProvider>
  );
}

export function MdxProviderShell({ children }: { children: ReactNode }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
