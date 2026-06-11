import { Seo } from '@/components/seo/Seo';

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <Seo
        title="Page Not Found — Cracked Java"
        description="The page you’re looking for doesn’t exist."
        canonicalPath="/"
        robots="noindex,follow"
      />
      <h1 className="text-5xl font-bold text-text">404</h1>
      <p className="mt-4 text-muted">That route doesn’t exist.</p>
    </div>
  );
}
