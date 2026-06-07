# Cracked Java

A web app for senior Java backend interview preparation. Structured topics with answers
written for FAANG- and EPAM-style questions, every claim linked back to the JDK 25
Javadoc, the JLS, or a JEP.

Seven modules ship seeded — **Collections**, **OOP**, **PostgreSQL**, **Spring
Framework & Spring Boot**, **Data Structures & Algorithms**, **Low-Level Design**, and
**High-Level Design** — and further modules (Concurrency, JVM) slot into the same scaffold
without any structural changes.

## Modules

| Module | Topics | Focus |
| --- | --- | --- |
| **Java Collections Framework** | 15 | Lists, Sets, Maps, Queues, the equals/hashCode contract, concurrent collections, Sequenced Collections |
| **Object-Oriented Programming** | 16 | Four pillars, equals/hashCode, immutability, SOLID, GoF patterns, modern Java records/sealed/pattern matching |
| **PostgreSQL** | 15 | Relational model, data types, indexing, query planning & EXPLAIN, transactions/MVCC, locks, partitioning, replication, backup/PITR, tuning |
| **Spring Framework & Spring Boot** | 16 | IoC/DI, bean lifecycle, auto-configuration, MVC/REST, Spring Data JPA, transactions, security, AOP, caching, async/virtual threads, WebFlux, Actuator, testing, Boot 3 stack — layered middle → senior |
| **Data Structures & Algorithms** | 20 | Arrays, strings, linked lists, stacks/queues, hash tables, trees, tries, heaps, graphs (BFS/DFS), sorting, binary search, two-pointers, sliding window, recursion/backtracking, dynamic programming, greedy — each with the coding-question structure (problem → brute force + Big-O → optimal + reasoning → full Java) |
| **Low-Level Design** | 21 | OO/machine-coding interviews: parking lot, elevator, library, vending machine, ATM, movie booking, ride-sharing, logger, rate limiter, LRU/LFU cache, pub/sub, notification system, scheduler and more — each a 9-section design solution with GoF patterns and `<Mermaid>` class diagrams |
| **High-Level Design** | 28 | Distributed-systems interviews: fundamentals (CAP/PACELC, replication, partitioning), building blocks (caching, queues, SQL vs NoSQL, rate limiting, load balancing, CDN, observability), and full system designs (URL shortener, Twitter feed, chat, ride-sharing, Instagram, video streaming, notifications, web crawler, autocomplete, distributed KV store, job scheduler, Google Docs, payments, exam-prep) — each an 11-section solution with capacity math and `<Mermaid>` architecture graphs, across FAANG / EU-contracting / regional styles |

PostgreSQL doc links use `/docs/current/` so they auto-track the latest major version;
Spring links use the Framework 6.x / Boot 3.x reference paths under `docs.spring.io`. The
DSA / LLD / HLD modules add **Mermaid** (client-side-rendered) diagrams to the MDX stack.

## Run it

```bash
npm install
npm run dev        # Vite dev server on http://localhost:5173
npm run build      # type-check + production build
npm run test       # vitest (unit tests)
npm run check:sources   # HEAD-check every source URL, fail on 404
```

## Tech stack

- **Vite + React 18 + TypeScript** for the app
- **React Router v6** for routing
- **Tailwind CSS** (with `darkMode: 'class'`) for styling
- **MDX** via `@mdx-js/rollup` for content authoring
- **Mermaid** (`mermaid@11`) for diagrams — code-split and lazy-loaded, rendered client-side via the `<Mermaid>` MDX component
- **Shiki** (via `@shikijs/rehype`) for build-time syntax highlighting (dual light/dark themes)
- **Zustand** for client state (progress, theme, bookmarks)
- **LocalStorage** for persistence — abstracted behind `ProgressRepository` so a backend can swap in
- **Fuse.js** for client-side full-text search
- **Vitest** for tests

## Architecture

The content model is a **tree**, not a flat list:

```
Track  →  Module  →  Topic  →  Question
                       │
                       └─ Source[]   (Javadoc / JEP / Tutorial / OpenJDK / Book / …)
```

Types live in `src/content/types.ts`. The tree is assembled at compile time by
`src/content/loader.ts`, which uses `import.meta.glob('./tracks/**/topic.mdx', { eager: true })`
to discover every MDX file under `src/content/tracks/`.

Component code is **deliberately agnostic** to topic identity — there's no
`if (topic === 'hashmap')` anywhere. The same `TopicPage` and `QuestionPage` render every
topic by looking up the MDX module by `contentPath` / `answerPath`.

### Folder layout

```
src/
  components/
    layout/           Header, Footer, Breadcrumbs
    content/          TopicCard, QuestionCard, SourceList, DifficultyBadge, ProgressRing, TagPill
    mdx/              custom MDX components (Callout, ProbeNote, ComplexityTable, Diagram, Mermaid)
  content/
    types.ts          Track / Module / Topic / Question / Source
    loader.ts         compile-time tree assembly + lookup helpers
    tracks/
      java-backend/
        index.ts        Track definition (registers all four modules)
        sources.ts      Collections sources, keyed by topic id
        collections/
          index.ts      Module definition (every topic and question listed)
          topics/
            01-framework-overview/
              topic.mdx
              questions/
                q01-…  .mdx
            02-list-arraylist-linkedlist/
              …
            (15 topics)
        oop/
          index.ts
          sources.ts    Module-local sources (OOP_SOURCES)
          topics/        (16 topics)
        postgresql/
          index.ts
          sources.ts    Module-local sources (PG_SOURCES)
          topics/        (15 topics)
        spring/
          index.ts
          sources.ts    Module-local sources (SPRING_SOURCES)
          topics/        (16 topics)
  features/
    progress/         ProgressRepository interface + LocalStorage impl + Zustand store
    search/           Fuse.js index
    theme/            dark-mode Zustand store
  pages/              route components (Landing / Track / Module / Topic / Question / Progress / Search / Sources / Bookmarks)
  App.tsx
  main.tsx
scripts/
  check-sources.ts    HEAD-check every source URL
```

### Routing

- `/` — landing page with track cards
- `/track/:trackId` — list of modules in a track
- `/track/:trackId/module/:moduleId` — list of topics in a module
- `/track/:trackId/module/:moduleId/topic/:topicId` — topic explainer + question list + sources sidebar
- `/track/:trackId/module/:moduleId/topic/:topicId/question/:questionId` — question detail with "Reveal answer"
- `/progress` — per-module progress dashboard, weak-areas list, streak
- `/search` — client-side Fuse.js search across questions and topics
- `/sources` — global authoritative-sources page (filter by type/topic)
- `/bookmarks` — starred questions

### Progress persistence

`features/progress/ProgressRepository.ts` exposes a `ProgressRepository` interface and a
`LocalStorageProgressRepository` implementation. The Zustand store in `store.ts` wraps it
for the UI. To plug in a backend later, write a new implementation of the interface and
swap the instance exported from `ProgressRepository.ts`.

The repo also tracks bookmarks and a daily-activity streak.

### Sources

Every source has a type (`javadoc`, `jep`, `spec`, `tutorial`, `official-docs`, `book`,
`article`, `video`), an `authoritative` flag (true for items 1-5), an optional `description`
(one-line "why click this") and an optional `recommendedReadingOrder` (1 = read this first).

Type-priority order, top to bottom: Javadoc → JLS/JVM Spec → JEP → Oracle Tutorial → OpenJDK
source → Books → Articles.

The `/sources` page is filterable. The sticky sidebar on every topic page (and inherited on
every question page) groups sources by type. `npm run check:sources` HEAD-checks every URL
and fails on any 404.

## Adding a module / topic / question

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full authoring workflow.

The short version:

1. Add a topic folder under `src/content/tracks/<track>/<module>/topics/NN-slug/`
   with `topic.mdx` and `questions/qNN-slug.mdx` files.
2. Append a `Topic` entry to the module's `index.ts` that points at those paths.
3. (Optional) Add sources to `sources.ts` under the topic's key.
4. That's it — the loader picks them up at the next dev reload.

## License

Educational / personal use. JDK Javadoc and JEP content are © Oracle / OpenJDK.
