import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import path from 'node:path';
import { writeFileSync } from 'node:fs';
import { enumerateRoutes } from './src/content/routes';
// Loads vite-react-ssg's `declare module 'vite'` augmentation so `ssgOptions`
// is a known UserConfig key (type-only: erased at runtime).
import type {} from 'vite-react-ssg';

const SITE_URL = 'https://crackedjava.com';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              themes: { light: 'github-light', dark: 'github-dark' },
              defaultColor: false,
            },
          ],
        ],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Consumed by `vite-react-ssg build` to prerender every route to static HTML.
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    dirStyle: 'nested',
    crittersOptions: false,
    concurrency: 12,
    includedRoutes() {
      const routes = enumerateRoutes().map((r) => r.path);
      // Fast compatibility smoke test: SSG_SMOKE=1 prerenders a handful of routes.
      if (process.env.SSG_SMOKE) return routes.slice(0, 6);
      return routes;
    },
    onFinished(dir: string) {
      const routes = enumerateRoutes();

      const urls = routes
        .filter((r) => r.indexable)
        .map(
          (r) =>
            `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <priority>${r.priority.toFixed(
              1,
            )}</priority>\n  </url>`,
        )
        .join('\n');
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);

      const robots = [
        'User-agent: *',
        'Allow: /',
        'Disallow: /progress',
        'Disallow: /bookmarks',
        '',
        `Sitemap: ${SITE_URL}/sitemap.xml`,
        '',
      ].join('\n');
      writeFileSync(path.join(dir, 'robots.txt'), robots);
    },
  },
});
