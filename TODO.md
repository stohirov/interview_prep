# TODO — DSA / LLD / HLD module build-out

Tracking the remaining work to finish adding the **Data Structures & Algorithms**,
**Low-Level Design**, and **High-Level Design** modules to the `java-backend` track.

## Status snapshot (as of this writing)

| Area | State |
| --- | --- |
| Mermaid MDX support (`src/components/mdx/Mermaid.tsx`, registered in `components.tsx`) | ✅ Done |
| Module scaffolds — `index.ts` + `sources.ts` for all 3 modules, registered in `tracks/java-backend/index.ts`, wired into `scripts/check-sources.ts` | ✅ Done |
| `npm run build` (tsc + vite) | ✅ Green |
| `npm run test` (25 tests) | ✅ Green |
| **DSA** — all 20 topics, `topic.mdx` + every question MDX | ✅ Done (239 MDX files) |
| **LLD** — all 21 topics, `topic.mdx` + solutions/questions | ✅ Done (53 MDX files) |
| **HLD** — all 28 topics (foundations 01–13 + 14 design problems 14–27 + meta 28) | ✅ Done (98 MDX files) |

Conventions established (every author must follow):
- MDX files have **no frontmatter** — start directly with content.
- In-scope components (no imports needed): `<Callout kind="info|warn|tip|danger" title="…">`,
  `<ProbeNote>`, `<ComplexityTable rows={[{op,best,average,worst,note}]} />`,
  `<Diagram caption="…">{`ascii`}</Diagram>`, `<Mermaid caption="…">{`mermaid source`}</Mermaid>`.
- ⚠️ `<ComplexityTable>` is fixed to Operation/Best/Average/Worst/Note columns — do **not**
  repurpose it for generic comparison tables; use plain markdown tables instead.
- Every `Source` object needs a non-empty `description`; any `javadoc`/`spec`/`jep`/
  `official-docs`/`tutorial` source must be `authoritative: true` (a test enforces both).
- Reference exemplars to match:
  - DSA: `dsa/topics/05-hash-tables/{topic.mdx,questions/q06-two-sum.mdx}`
  - LLD: `low-level-design/topics/04-parking-lot/{topic.mdx,questions/q01-solution.mdx}`
  - HLD: `high-level-design/topics/14-url-shortener/{topic.mdx,questions/q01-solution.mdx}`

---

## Phase 1 — Finish HLD design problems (14 topics remaining)

Each needs `topic.mdx` (300–500 words: problem framing + the FAANG / EU-contracting /
regional-EPAM style angles) **and** `questions/q01-solution.mdx` with the **11-section**
structure: 1 Functional requirements · 2 Non-functional requirements (scale numbers) ·
3 Capacity estimation (worked QPS/storage/bandwidth) · 4 High-level architecture
(`<Mermaid>` graph) · 5 API design · 6 Data model · 7 Detailed component design ·
8 Scaling considerations · 9 Trade-offs and alternatives · 10 Common follow-up questions ·
11 What interviewers are really probing (`<ProbeNote>` with FAANG/EU/regional notes).

Paths come from `src/content/tracks/java-backend/high-level-design/index.ts`.

- [x] `15-twitter-feed` — timeline (pull vs fan-out-on-write vs hybrid), ranking, celebrity/hot-user problem, media, caching. (500M users / 200M DAU, read-heavy)
- [x] `16-chat-messaging` — 1:1 + group (10K), presence, delivery/read receipts, media, E2E (mention), WebSocket vs polling, shard by chat ID. (2B users / 100B msg/day)
- [x] `17-ride-sharing` — geospatial indexing (geohash/S2/H3), matching, surge pricing, real-time location, payments. (100M riders / 5M drivers) — note as a strong topic to make concrete with real elec-taxi/dispatch experience.
- [x] `18-instagram` — feed generation, image storage/delivery (S3 + CDN), thumbnails, stories (24h TTL), likes/comments at scale, hashtag search. (500M DAU)
- [x] `19-video-streaming` — encoding pipeline, adaptive bitrate (HLS/DASH), CDN delivery, recommendations, view counting. (Netflix/YouTube, 1B users) — *topic dir not yet created*
- [x] `20-notification-service` — channel abstraction, templates, preferences, delivery queue + retries, DLQ, per-channel rate limiting, provider failover. Cross-link LLD `18-notification-system`. (10B/day) — *topic dir not yet created*
- [x] `21-web-crawler` — URL frontier (priority + dedup), politeness (robots.txt, per-domain limit), DNS caching, content storage, dup detection, distributed coordination. (1B pages)
- [x] `22-autocomplete` — trie (cross-link DSA `tries`), prefix caching, top-K, ranking (popularity/personalization), update pipeline. (100K QPS, <100ms)
- [x] `23-distributed-kv-store` — consistent hashing, vnodes, replication, vector clocks, read repair, Merkle trees, gossip, sloppy quorum. Cross-link `02-cap` + `03-replication`. (Dynamo-style, petabytes)
- [x] `24-distributed-job-scheduler` — job queue, worker assignment, leader election (Zookeeper/etcd), missed-run handling, distributed locks, idempotency, monitoring.
- [x] `25-google-docs` — OT vs CRDT (compare), real-time sync (WebSockets), presence, cursor sharing, version history, offline. (1M concurrent editors)
- [x] `26-payment-system` — idempotency keys, Saga, reconciliation, double-entry bookkeeping, fraud hooks, processor integration (Stripe model; Click.uz/Payme as regional examples). (100K TPS peak) — note as a strong topic to make concrete with real Stripe Connect / Click / Payme experience; do not fabricate a company architecture.
- [x] `27-exam-prep-platform` — exam session mgmt, real-time scoring, leaderboard, payments, content delivery, anti-cheat/proctoring. (1M students / 100K concurrent peak) — invite personalization with a real exam-prep system; do not fabricate specifics. — *topic dir not yet created*
- [x] `28-how-to-practice-hld` — **META topic** (not a design problem): `topic.mdx` + `questions/q01-practice-plan.mdx`. How many problems, the "design X" template, 60-min time-boxing, handling "I don't know", signaling senior, mock practice (Pramp/interviewing.io/hellointerview), diagram portfolio. — *topic dir not yet created*

---

## Phase 2 — Validate

- [x] `npm run build` → green (validates all MDX + Mermaid compile).
- [x] `npm run test` → green (25 tests; enforces source description + authoritative invariants).
- [x] `npm run check:sources` → review output. Some sources currently report non-200
      (engineering-blog URLs that 403/406 to bots, e.g. Uber/Netflix/X blogs). Triage:
      replace any genuinely dead URLs; for bot-blocked-but-live pages, either swap to a
      stable canonical URL or accept the redirect/forbidden as a known false positive and
      note it. Goal per the prompts: **zero real 404s**.

---

## Phase 3 — Docs

- [x] **README.md** — add the three new modules to the "Modules" table (DSA 20 topics /
      LLD 21 topics / HLD 28 topics) and update the intro blurb (which currently says
      these "slot into the same scaffold"). Note Mermaid is now part of the MDX stack.
- [x] **CONTRIBUTING.md** — document the new conventions that emerged:
      - The `<Mermaid>` component (client-side render) and when to use it (LLD class
        diagrams, HLD architecture graphs).
      - The LLD 9-section design-solution structure and the HLD 11-section structure.
      - The DSA coding-question structure (problem → brute-force + Big-O → optimal +
        reasoning → full Java → `<ProbeNote>`).

---

## Notes / follow-ups discovered during the build

- A pre-existing MDX bug was fixed in `dsa/.../10-graphs-bfs-dfs/questions/q12-word-ladder.mdx`
  (a `<Callout>` whose line began with `...`, parsed as a JSX spread).
- `mermaid@11` was added as a dependency; diagrams are code-split and lazy-loaded.
- An MDX `<digit` pitfall was fixed in `27-exam-prep-platform/questions/q01-solution.mdx`
  (`<1%` parsed as a JSX tag → reworded to "under 1%").
- **`check:sources` final state: zero real 404s.** Three genuinely dead LLD GitHub URLs were
  replaced in `low-level-design/sources.ts`:
  - `movie-ticket-booking` → correct repo path `movieticketbookingsystem/README.md`.
  - `rate-limiter` → the `ratelimiter` solution dir doesn't exist in that repo; swapped to the
    canonical Token-bucket reference (Wikipedia). Book source (Alex Xu) retained.
  - `notification-system` → the `notificationsystem` solution dir doesn't exist; swapped to the
    Publish–subscribe pattern reference (Wikipedia). Refactoring.guru source retained.
  - Remaining 4 non-200s are **known false positives** — engineering blogs (X 403, Uber 406×2,
    Netflix blocked) that gate bots behind a JS challenge but are live in a browser and are the
    canonical sources; left as-is per the triage policy.
- Nothing has been committed yet — commit when the user asks.
