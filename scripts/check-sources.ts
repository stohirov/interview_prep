#!/usr/bin/env tsx
// Walks the content tree, HEAD-checks every source URL, reports 404s and redirects.
// Run: npm run check:sources

import type { Source } from '../src/content/types';
import { SOURCES } from '../src/content/tracks/java-backend/sources';
import { OOP_SOURCES } from '../src/content/tracks/java-backend/oop/sources';
import { PG_SOURCES } from '../src/content/tracks/java-backend/postgresql/sources';
import { SPRING_SOURCES } from '../src/content/tracks/java-backend/spring/sources';
import { DSA_SOURCES } from '../src/content/tracks/java-backend/dsa/sources';
import { LLD_SOURCES } from '../src/content/tracks/java-backend/low-level-design/sources';
import { HLD_SOURCES } from '../src/content/tracks/java-backend/high-level-design/sources';

// Every module keeps its sources in a Record<topicId, Source[]>; check them all.
// Prefix topic ids with the module so the report is unambiguous and so identically
// named topics across modules don't collide.
const MODULE_SOURCES: Array<[string, Record<string, Source[]>]> = [
  ['collections', SOURCES],
  ['oop', OOP_SOURCES],
  ['postgresql', PG_SOURCES],
  ['spring', SPRING_SOURCES],
  ['dsa', DSA_SOURCES],
  ['low-level-design', LLD_SOURCES],
  ['high-level-design', HLD_SOURCES],
];

const REQUEST_TIMEOUT_MS = 15_000;
const CONCURRENCY = 8;

interface Row {
  topicId: string;
  title: string;
  url: string;
  status: number;
  location?: string;
  error?: string;
}

async function head(url: string): Promise<Pick<Row, 'status' | 'location' | 'error'>> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: ctrl.signal,
      headers: { 'User-Agent': 'jip-source-check/1.0' },
    });
    // Some hosts reject HEAD (405/403) or even return 404 for it (e.g. projectreactor.io);
    // confirm with a ranged GET before trusting the failure.
    if (res.status === 405 || res.status === 403 || res.status === 404) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'manual',
        signal: ctrl.signal,
        headers: { 'User-Agent': 'jip-source-check/1.0', Range: 'bytes=0-0' },
      });
    }
    return { status: res.status, location: res.headers.get('location') ?? undefined };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { status: 0, error: msg };
  } finally {
    clearTimeout(t);
  }
}

function emoji(status: number): string {
  if (status >= 200 && status < 300) return '\x1b[32m✓\x1b[0m';
  if (status >= 300 && status < 400) return '\x1b[33m→\x1b[0m';
  return '\x1b[31m✗\x1b[0m';
}

async function withConcurrency<T, R>(items: T[], n: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await fn(items[idx]);
      }
    }),
  );
  return results;
}

async function main(): Promise<void> {
  const rows: Omit<Row, 'status' | 'location' | 'error'>[] = [];
  const seen = new Set<string>();
  for (const [moduleId, record] of MODULE_SOURCES) {
    for (const [topicId, list] of Object.entries(record)) {
      for (const s of list) {
        // Dedupe identical URLs that legitimately recur across topics/modules.
        if (seen.has(s.url)) continue;
        seen.add(s.url);
        rows.push({ topicId: `${moduleId}/${topicId}`, title: s.title, url: s.url });
      }
    }
  }

  console.log(`Checking ${rows.length} sources (concurrency ${CONCURRENCY})...\n`);
  const results: Row[] = await withConcurrency(rows, CONCURRENCY, async (r) => {
    const h = await head(r.url);
    return { ...r, ...h };
  });

  for (const r of results) {
    const status = r.status === 0 ? 'ERR' : String(r.status);
    console.log(`${emoji(r.status)} [${status.padStart(3)}] ${r.topicId.padEnd(38)} ${r.url}`);
    if (r.location) console.log(`        → ${r.location}`);
    if (r.error) console.log(`        ${r.error}`);
  }

  const ok = results.filter((r) => r.status >= 200 && r.status < 300).length;
  const redirects = results.filter((r) => r.status >= 300 && r.status < 400).length;
  const broken = results.filter((r) => r.status === 0 || r.status >= 400).length;

  console.log(`\nSummary: ${ok} ok, ${redirects} redirects, ${broken} broken (of ${results.length})`);
  if (broken > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
