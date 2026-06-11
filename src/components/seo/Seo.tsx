/**
 * Per-page document metadata. Uses React 19's native metadata hoisting: <title>,
 * <meta> and <link> rendered anywhere in the tree are lifted into <head> — both
 * during server-side prerender (renderToString) and on the client. No head-manager
 * library is needed. The JSON-LD <script> is rendered inline (crawlers read it there).
 */

export const SITE_URL = 'https://crackedjava.com';
export const SITE_NAME = 'Cracked Java';

export interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with "/", combined with SITE_URL for canonical + og:url. */
  canonicalPath: string;
  /** e.g. "noindex,follow" for user-state pages. Omit for indexable pages. */
  robots?: string;
  ogType?: 'website' | 'article';
  /** One or more schema.org objects emitted as application/ld+json. */
  jsonLd?: object | object[];
}

export function Seo({
  title,
  description,
  canonicalPath,
  robots,
  ogType = 'website',
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${canonicalPath}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {robots && <meta name="robots" content={robots} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {blocks.map((block, i) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
