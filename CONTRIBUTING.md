# Contributing

This document covers the content-authoring workflow. For tech-stack and architecture, see
[README.md](./README.md).

## Folder structure for content

```
src/content/tracks/<track-id>/<module-id>/topics/<NN-slug>/
  topic.mdx
  questions/
    qNN-slug.mdx
```

- **Track id**: `java-backend`, `kotlin-backend`, etc.
- **Module id**: `collections`, `concurrency`, `jvm`, `spring`, `system-design`, `dsa`.
- **Topic folder name**: `NN-slug` where `NN` is a two-digit ordinal that controls display order
  on the module page (e.g. `04-hashmap`).
- **Question file name**: `qNN-slug.mdx` where `NN` is two digits.

## Wiring a new topic

1. Create the topic folder and `topic.mdx`.
2. Write each question MDX in `questions/`.
3. Open the module's `index.ts` (e.g. `src/content/tracks/java-backend/collections/index.ts`)
   and append a `Topic` entry:

   ```ts
   {
     id: 'kebab-case-id',                 // URL slug
     title: 'Human-readable title',
     summary: 'One- or two-sentence overview shown on the module card.',
     difficulty: 'middle',                 // 'junior' | 'middle' | 'senior'
     prerequisites: ['other-topic-id'],
     contentPath: 'tracks/java-backend/collections/topics/NN-slug/topic.mdx',
     sources: SOURCES['your-topic-key'],   // see Sources policy
     questions: [
       {
         id: 'kebab-id',
         prompt: 'The exact question text.',
         difficulty: 'middle',
         tags: ['theory'],                 // 'theory' | 'coding' | 'system-design' | 'behavioral' | 'trick' | 'big-tech'
         askedAt: ['Google', 'EPAM'],      // optional
         answerPath: 'tracks/java-backend/collections/topics/NN-slug/questions/qNN-slug.mdx',
       },
     ],
   },
   ```

4. Vite picks the new MDX files up on next reload — no other registration needed.

## MDX file conventions

- **No frontmatter.** Title, difficulty, tags, etc. live in the `index.ts`. The MDX file
  is just the body of the page.
- **No top-level `# h1` heading.** The page already renders a heading from the data; start
  at `## h2` for section subheads.
- **Code blocks**: triple-backtick fences with a language. Use `java` for Java code, `text`
  for plain output. Shiki highlights at build time.
- **Length**: topic explainers 200–400 words; question answers 200–500 words.

### Available custom MDX components

All available globally inside any `.mdx` under `src/content/` — no imports needed:

| Component         | Purpose                                                              |
|-------------------|----------------------------------------------------------------------|
| `<Callout>`       | Info / warn / tip / danger sidebars. `kind="info\|warn\|tip\|danger"` |
| `<ProbeNote>`     | Required at the end of every question; explains what's really being tested |
| `<ComplexityTable>` | Renders a Big-O table from `rows={[{op, best, average, worst, note}]}` |
| `<Diagram>`       | Wraps ASCII diagrams with optional caption                           |

Example question MDX:

```mdx
Direct one- or two-sentence answer goes first.

## Why

Explanation with **bold** for emphasis and inline `code` for identifiers.

```java
public final class Cache<K, V> {
    private final Map<K, V> store = new ConcurrentHashMap<>();
    // …
}
```

<ProbeNote>
The interviewer is testing whether you understand X and Y. They are not testing whether you can recite Z.
</ProbeNote>
```

## Sources policy

The Sources sidebar is a first-class learning surface. We're strict about what goes in it.

### Priority order (top to bottom)

1. **Javadoc** (Java SE 25) — the contract is the source of truth.
2. **JLS / JVM Spec** — for language-level guarantees.
3. **JEPs** — for design rationale of newer features.
4. **Oracle Tutorial trail** — for narrative explanations.
5. **OpenJDK source code** — link to the actual class file on GitHub `master`.
6. **Books** — Effective Java (Bloch), Java Concurrency in Practice (Goetz), etc.
7. **High-quality articles** — only if they fill a gap official docs don't cover.

### Rules

- **Authoritative URLs only.** Items 1-5 set `authoritative: true`. No random Medium posts.
- **Java 25 Javadoc URLs.** Use `/javase/25/` consistently — never mix with `/javase/8/`,
  `/javase/17/`, `/javase/21/`.
- **OpenJDK source links** point to the `master` branch on `github.com/openjdk/jdk`.
- **Tutorial trail** at `docs.oracle.com/javase/tutorial/` is Java 8-era; link it for
  conceptual context, never as the contract source.
- **Every source has a `description`** — one line explaining *why* a learner would click it.
  ("Read the class-level docs for treeification rationale.")
- **`recommendedReadingOrder`** (optional, lower = read first) lets you sort the most important
  link to the top of its type group.

### Where sources live

Sources are defined in `src/content/tracks/<track>/sources.ts`, keyed by a stable string id,
and pulled into the module's `index.ts` via `SOURCES['your-key']`. Keep them out of the topic
file so they're easy to audit and share between topics.

### Checking sources

```bash
npm run check:sources
```

HEAD-requests every URL across the tree and fails on 404. Oracle occasionally moves Javadoc
paths between releases — this script catches that.

## Quality bar for answers

- **Be technically correct.** If you're not sure about a specific implementation detail,
  write `<Callout kind="warn" title="Verify">TODO: confirm against JDK 25 source</Callout>`
  and link to the OpenJDK source in the sidebar — don't guess.
- **Show the reasoning.** Don't just state the answer; show *why* — e.g. for "why
  capacity must be a power of two", explain that the index calculation is `(n - 1) & hash`
  and why that's the same as modulo only when `n` is a power of two.
- **Code examples** should be runnable Java that targets Java 21+. Use `var`, records, switch
  expressions, pattern matching where natural.
- **End every question with a `<ProbeNote>`.** Senior interviewers care more about whether
  you can reason about trade-offs than whether you can recite the answer. Tell the reader what
  the interviewer is actually testing.

## Naming conventions

| Thing                | Convention                                      | Example                                     |
|----------------------|-------------------------------------------------|---------------------------------------------|
| Track id             | kebab-case                                      | `java-backend`                              |
| Module id            | kebab-case                                      | `collections`                               |
| Topic id (data)      | kebab-case, short, semantic                     | `map-hashmap-internals`                     |
| Topic folder         | `NN-slug` (two-digit ordinal)                   | `04-hashmap`                                |
| Question id          | kebab-case, short                                | `put-walkthrough`                           |
| Question file        | `qNN-slug.mdx`                                   | `q01-put-walkthrough.mdx`                   |
| Source key           | kebab-case matching the topic id (or aliased)   | `map-hashmap-internals`                     |

## Pull-request checklist

- [ ] `npm run build` succeeds (type-check passes)
- [ ] `npm test` succeeds
- [ ] `npm run check:sources` shows zero broken URLs for any source you added
- [ ] Every new question has a `<ProbeNote>` block
- [ ] Every new source has a `description`
- [ ] No Java 8 / 17 / 21 Javadoc URLs (only Java 25)
- [ ] Topic and question entries are wired up in the module's `index.ts`
