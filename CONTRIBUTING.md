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
- **Module id**: `collections`, `oop`, `postgresql`, `spring`, `dsa`, `low-level-design`,
  `high-level-design`, and (planned) `concurrency`, `jvm`.
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
- **Code blocks**: triple-backtick fences with a language. Use `java` for Java code, `sql`
  for SQL, `yaml`/`properties` for config, `text` for plain output. Shiki highlights at build time.
- **Length**: topic explainers 200–400 words; question answers 200–500 words.
- **Put a flow component's closing tag on its own line.** When a component like `<Callout>`
  opens on its own line, its `</Callout>` must also be on its own line — gluing it to the end
  of the body text (`…intent.</Callout>`) makes the MDX compiler read the remaining text as an
  unclosed tag and the build fails. Either keep the whole thing on one line
  (`<ProbeNote>…</ProbeNote>`) or give the closing tag its own line.
- **Never escape quotes inside a component attribute.** `title="Why GiST is \"lossy\""` breaks
  attribute parsing. Use single quotes inside (`title="Why GiST is 'lossy'"`) instead.
- **Raw `<`, `>` and `{` are JSX in prose.** Wrap things like `List<String>`, `a < b`, or the
  `<@` / `->` operators in backticks so MDX treats them as code, not markup.

### Available custom MDX components

All available globally inside any `.mdx` under `src/content/` — no imports needed:

| Component         | Purpose                                                              |
|-------------------|----------------------------------------------------------------------|
| `<Callout>`       | Info / warn / tip / danger sidebars. `kind="info\|warn\|tip\|danger"` |
| `<ProbeNote>`     | Required at the end of every question; explains what's really being tested |
| `<ComplexityTable>` | Renders a Big-O table from `rows={[{op, best, average, worst, note}]}` |
| `<Diagram>`       | Wraps ASCII diagrams with optional caption                           |
| `<Mermaid>`       | Client-side-rendered diagrams (LLD class diagrams, HLD architecture graphs) |

`<Mermaid>` and `<Diagram>` take their body as a template literal inside braces:
`` <Mermaid caption="…">{`graph LR\n  A --> B`}</Mermaid> ``. The Mermaid source must be
valid (use `graph LR`/`graph TD`/`classDiagram`/`sequenceDiagram`, node ids with no spaces,
labels in `[...]` or `[(...)]` for datastores). Avoid unquoted parentheses inside node labels.
Mermaid renders in the browser (the `mermaid@11` bundle is code-split and lazy-loaded), so it
does **not** break the build on a malformed graph — sanity-check diagrams in the dev server.
Use `<Mermaid>` for LLD class diagrams and HLD architecture graphs; keep `<Diagram>` for
small ASCII sketches.

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

## Module-specific answer structures

The theory modules (Collections, OOP, PostgreSQL, Spring) follow the free-form
"answer → why → ProbeNote" shape above. The three interview-design modules each follow a
fixed section structure so every solution is comparable and complete. Match the reference
exemplars when authoring:

### DSA — coding-question structure

`dsa/topics/<NN-slug>/questions/qNN-*.mdx`. Exemplar: `dsa/topics/05-hash-tables/questions/q06-two-sum.mdx`.
Each coding answer flows:

1. **Problem restatement** — the problem in one or two sentences, plus constraints.
2. **Brute force + Big-O** — the naive approach and its time/space complexity (use a
   `<ComplexityTable>` where it helps).
3. **Optimal approach + reasoning** — the key insight, *why* it works, and its complexity.
4. **Full Java solution** — a complete, runnable `java` code block (Java 21+ idioms).
5. **`<ProbeNote>`** — what the interviewer is really testing (the pattern, not the puzzle).

### LLD — 9-section design solution

`low-level-design/topics/<NN-slug>/questions/q01-solution.mdx`. Exemplar:
`low-level-design/topics/04-parking-lot/{topic.mdx,questions/q01-solution.mdx}`. The nine
sections: **1** Requirements (functional + non-functional) · **2** Core entities / class
model · **3** Class diagram (`<Mermaid>` `classDiagram`) · **4** Design patterns applied ·
**5** Key interfaces / API · **6** Walkthrough of the main flow · **7** Concurrency /
edge cases · **8** Trade-offs and alternatives · **9** What interviewers are really probing
(`<ProbeNote>`).

### HLD — 11-section design solution

`high-level-design/topics/<NN-slug>/questions/q01-solution.mdx`. Exemplar:
`high-level-design/topics/14-url-shortener/{topic.mdx,questions/q01-solution.mdx}`. The
eleven numbered sections (`## 1. …` … `## 11. …`): **1** Functional requirements ·
**2** Non-functional requirements (scale numbers) · **3** Capacity estimation (worked
QPS / storage / bandwidth math) · **4** High-level architecture (`<Mermaid>` graph) ·
**5** API design · **6** Data model · **7** Detailed component design · **8** Scaling
considerations · **9** Trade-offs and alternatives · **10** Common follow-up questions ·
**11** What interviewers are really probing (`<ProbeNote>` covering the FAANG /
EU-contracting / regional-EPAM angles and the classic failure mode).

For LLD and HLD, the sibling `topic.mdx` (300–500 words) frames the problem and contrasts
the FAANG / EU-contracting / regional-EPAM interview styles before the worked solution.

### The `<ComplexityTable>` is not a generic table

`<ComplexityTable>` is fixed to Operation / Best / Average / Worst / Note columns. Do **not**
repurpose it for generic comparison tables (e.g. "SQL vs NoSQL") — use a plain markdown table
for those.

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

### Non-Java modules (PostgreSQL, Spring, …)

The priority order above is Java-specific. For other modules, the same rules apply with
module-appropriate authoritative sources:

- **PostgreSQL**: official docs are `type: 'official-docs'` and must use
  `https://www.postgresql.org/docs/current/…` so the link auto-tracks the latest major version.
  Books (`PostgreSQL: Up and Running`, `The Art of PostgreSQL`, `PostgreSQL Internals`) are `type: 'book'`.
- **Spring**: official docs are `type: 'official-docs'` under `docs.spring.io/...` (Framework 6.x /
  Boot 3.x reference paths). Spring Guides are `type: 'tutorial'`; GitHub source is `official-docs`.
- The loader test enforces that any source typed `official-docs`, `tutorial`, `spec`, `jep`, or
  `javadoc` has `authoritative: true`. The Java-25 Javadoc URL rule only applies to `javadoc`-typed
  sources (and `official-docs` whose URL contains `/docs/api/`), so it does not constrain the
  PostgreSQL/Spring doc URLs.

### Where sources live

Each module owns its sources file, exporting a named `Record<topicId, Source[]>`:

- `tracks/java-backend/sources.ts` → `SOURCES` (collections)
- `tracks/java-backend/oop/sources.ts` → `OOP_SOURCES`
- `tracks/java-backend/postgresql/sources.ts` → `PG_SOURCES`
- `tracks/java-backend/spring/sources.ts` → `SPRING_SOURCES`
- `tracks/java-backend/dsa/sources.ts` → `DSA_SOURCES`
- `tracks/java-backend/low-level-design/sources.ts` → `LLD_SOURCES`
- `tracks/java-backend/high-level-design/sources.ts` → `HLD_SOURCES`

The module's `index.ts` pulls them in per topic (e.g. `PG_SOURCES['indexing']`). Keep sources out
of the topic MDX so they're easy to audit and share between topics. When you add a new module,
register its source record in `scripts/check-sources.ts` (the `MODULE_SOURCES` array) so the URL
checker covers it.

### Checking sources

```bash
npm run check:sources
```

HEAD-requests every URL across all modules and fails on 404 (it retries with a ranged GET when a
host rejects HEAD with 403/404/405, so HEAD-hostile docs sites still validate). Vendors
occasionally move doc paths between releases — this script catches that.

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
