import type { Source } from '../../../types';

// PostgreSQL doc URLs use /docs/current/ so they auto-track the latest major
// version (PostgreSQL 17 as of writing).
const D = 'https://www.postgresql.org/docs/current';

const PG_UP_AND_RUNNING = 'https://www.oreilly.com/library/view/postgresql-up-and/9781491963401/';
const ART_OF_POSTGRESQL = 'https://theartofpostgresql.com/';
const PG_INTERNALS = 'https://postgrespro.com/community/books/internals';
const DATABASE_INTERNALS = 'https://www.databass.dev/';
const DDIA = 'https://dataintensive.net/';

export const PG_SOURCES: Record<string, Source[]> = {
  'relational-model-sql-fundamentals': [
    { title: 'Tutorial: The SQL Language', url: `${D}/tutorial-sql.html`, type: 'official-docs', authoritative: true, description: 'Canonical narrative intro to relations, queries, and joins in PostgreSQL.', recommendedReadingOrder: 1 },
    { title: 'Queries', url: `${D}/queries.html`, type: 'official-docs', authoritative: true, description: 'FROM/WHERE/GROUP BY/HAVING/SELECT semantics and logical processing order.', recommendedReadingOrder: 2 },
    { title: 'Constraints', url: `${D}/ddl-constraints.html`, type: 'official-docs', authoritative: true, description: 'Primary keys, unique constraints, foreign keys, and ON DELETE actions.' },
    { title: 'Comparison Functions and Operators', url: `${D}/functions-comparison.html`, type: 'official-docs', authoritative: true, description: 'How NULL behaves in comparisons, IS DISTINCT FROM, and three-valued logic.' },
    { title: 'PostgreSQL: Up and Running (3rd ed.), Obe & Hsu', url: PG_UP_AND_RUNNING, type: 'book', authoritative: false, description: 'Practical PostgreSQL from the ground up; chapters on SQL basics.' },
  ],
  'normalization-schema-design': [
    { title: 'Data Definition', url: `${D}/ddl.html`, type: 'official-docs', authoritative: true, description: 'Tables, columns, constraints, and inheritance — the schema-design reference.', recommendedReadingOrder: 1 },
    { title: 'UUID Type', url: `${D}/datatype-uuid.html`, type: 'official-docs', authoritative: true, description: 'UUID storage; pair with gen_random_uuid() and v7 ordering discussion.' },
    { title: 'The Art of PostgreSQL, Dimitri Fontaine', url: ART_OF_POSTGRESQL, type: 'book', authoritative: false, description: 'Schema design and modeling chapters written by a Postgres committer.' },
    { title: 'Database Internals, Alex Petrov', url: DATABASE_INTERNALS, type: 'book', authoritative: false, description: 'B-tree storage internals that explain why monotonic keys matter.' },
  ],
  'data-types': [
    { title: 'Data Types', url: `${D}/datatype.html`, type: 'official-docs', authoritative: true, description: 'The full catalog of built-in types and their storage characteristics.', recommendedReadingOrder: 1 },
    { title: 'Date/Time Types', url: `${D}/datatype-datetime.html`, type: 'official-docs', authoritative: true, description: 'TIMESTAMP vs TIMESTAMPTZ, DATE, TIME, INTERVAL, and time-zone handling.', recommendedReadingOrder: 2 },
    { title: 'JSON Types', url: `${D}/datatype-json.html`, type: 'official-docs', authoritative: true, description: 'JSON vs JSONB storage and when to choose each.' },
    { title: 'Arrays', url: `${D}/arrays.html`, type: 'official-docs', authoritative: true, description: 'Array declaration, indexing, and containment operators.' },
  ],
  'indexing': [
    { title: 'Indexes', url: `${D}/indexes.html`, type: 'official-docs', authoritative: true, description: 'The umbrella chapter: when indexes help, their cost, and maintenance.', recommendedReadingOrder: 1 },
    { title: 'Index Types', url: `${D}/indexes-types.html`, type: 'official-docs', authoritative: true, description: 'B-tree, Hash, GiST, SP-GiST, GIN, and BRIN and what each is for.', recommendedReadingOrder: 2 },
    { title: 'Multicolumn Indexes', url: `${D}/indexes-multicolumn.html`, type: 'official-docs', authoritative: true, description: 'Composite indexes and the left-prefix rule.' },
    { title: 'Index-Only Scans and Covering Indexes', url: `${D}/indexes-index-only-scans.html`, type: 'official-docs', authoritative: true, description: 'INCLUDE columns and when an index-only scan is possible.' },
    { title: 'Partial Indexes', url: `${D}/indexes-partial.html`, type: 'official-docs', authoritative: true, description: 'Indexing a subset of rows for big wins on skewed predicates.' },
    { title: 'Indexes on Expressions', url: `${D}/indexes-expressional.html`, type: 'official-docs', authoritative: true, description: 'Functional indexes such as LOWER(email).' },
    { title: 'PostgreSQL 14 Internals, Egor Rogov', url: PG_INTERNALS, type: 'book', authoritative: true, description: 'Free, deeply authoritative coverage of access methods and index internals.' },
  ],
  'query-planning-explain': [
    { title: 'Using EXPLAIN', url: `${D}/using-explain.html`, type: 'official-docs', authoritative: true, description: 'Reading plan nodes, costs, rows, actual time, loops, and BUFFERS.', recommendedReadingOrder: 1 },
    { title: 'Planner Statistics', url: `${D}/planner-stats.html`, type: 'official-docs', authoritative: true, description: 'How ANALYZE feeds selectivity estimates the planner relies on.', recommendedReadingOrder: 2 },
    { title: 'pg_stat_statements', url: `${D}/pgstatstatements.html`, type: 'official-docs', authoritative: true, description: 'The extension for finding slow and frequent queries in production.' },
    { title: 'Query Planning Configuration', url: `${D}/runtime-config-query.html`, type: 'official-docs', authoritative: true, description: 'random_page_cost and the GUCs that steer planner choices.' },
    { title: 'PostgreSQL 14 Internals, Egor Rogov', url: PG_INTERNALS, type: 'book', authoritative: true, description: 'Chapters on the cost model and join algorithms.' },
  ],
  'transactions-acid-isolation': [
    { title: 'Tutorial: Transactions', url: `${D}/tutorial-transactions.html`, type: 'official-docs', authoritative: true, description: 'Narrative intro to BEGIN/COMMIT and atomicity.', recommendedReadingOrder: 1 },
    { title: 'Transaction Isolation', url: `${D}/transaction-iso.html`, type: 'official-docs', authoritative: true, description: 'The four isolation levels, the anomalies, and SSI Serializable.', recommendedReadingOrder: 2 },
    { title: 'Concurrency Control (MVCC)', url: `${D}/mvcc.html`, type: 'official-docs', authoritative: true, description: 'How MVCC removes read/write blocking; xmin/xmax row versions.' },
    { title: 'Explicit Locking', url: `${D}/explicit-locking.html`, type: 'official-docs', authoritative: true, description: 'Row-level lock modes and FOR UPDATE / FOR SHARE semantics.' },
    { title: 'Routine Vacuuming', url: `${D}/routine-vacuuming.html`, type: 'official-docs', authoritative: true, description: 'VACUUM, autovacuum, and transaction-ID wraparound prevention.' },
    { title: 'Designing Data-Intensive Applications, Kleppmann', url: DDIA, type: 'book', authoritative: false, description: 'Chapter 7 on transactions and isolation anomalies across systems.' },
  ],
  'locks-concurrency': [
    { title: 'Explicit Locking', url: `${D}/explicit-locking.html`, type: 'official-docs', authoritative: true, description: 'Table-level and row-level lock modes and which statements take which.', recommendedReadingOrder: 1 },
    { title: 'pg_locks View', url: `${D}/view-pg-locks.html`, type: 'official-docs', authoritative: true, description: 'The system view for investigating live lock contention.' },
    { title: 'Monitoring Statistics', url: `${D}/monitoring-stats.html`, type: 'official-docs', authoritative: true, description: 'pg_stat_activity and the cumulative statistics for diagnosing blocking.' },
  ],
  'window-functions-advanced-sql': [
    { title: 'Tutorial: Window Functions', url: `${D}/tutorial-window.html`, type: 'official-docs', authoritative: true, description: 'Gentle intro to PARTITION BY, frames, and ranking.', recommendedReadingOrder: 1 },
    { title: 'Window Functions', url: `${D}/functions-window.html`, type: 'official-docs', authoritative: true, description: 'Reference for ROW_NUMBER, RANK, LAG/LEAD, and frame clauses.', recommendedReadingOrder: 2 },
    { title: 'WITH Queries (CTEs)', url: `${D}/queries-with.html`, type: 'official-docs', authoritative: true, description: 'CTE materialization rules (the 12+ inlining change) and recursive CTEs.' },
    { title: 'LATERAL Subqueries', url: `${D}/queries-table-expressions.html#QUERIES-LATERAL`, type: 'official-docs', authoritative: true, description: 'How LATERAL lets a subquery reference earlier FROM items.' },
  ],
  'json-jsonb': [
    { title: 'JSON Types', url: `${D}/datatype-json.html`, type: 'official-docs', authoritative: true, description: 'JSON vs JSONB storage, equality, and JSONB containment.', recommendedReadingOrder: 1 },
    { title: 'JSON Functions and Operators', url: `${D}/functions-json.html`, type: 'official-docs', authoritative: true, description: 'The -> / ->> / #> operators, jsonb_set, and JSONPath.', recommendedReadingOrder: 2 },
    { title: 'GIN Indexes', url: `${D}/indexes-types.html#INDEXES-TYPES-GIN`, type: 'official-docs', authoritative: true, description: 'Indexing JSONB with GIN and jsonb_path_ops.' },
  ],
  'full-text-search': [
    { title: 'Full Text Search', url: `${D}/textsearch.html`, type: 'official-docs', authoritative: true, description: 'The umbrella chapter for tsvector/tsquery search.', recommendedReadingOrder: 1 },
    { title: 'Full Text Search: Introduction', url: `${D}/textsearch-intro.html`, type: 'official-docs', authoritative: true, description: 'Concepts: documents, lexemes, dictionaries, and the @@ match operator.', recommendedReadingOrder: 2 },
    { title: 'Controlling Text Search', url: `${D}/textsearch-controls.html`, type: 'official-docs', authoritative: true, description: 'Parsing, ranking with ts_rank/ts_rank_cd, and highlighting.' },
  ],
  'partitioning': [
    { title: 'Table Partitioning', url: `${D}/ddl-partitioning.html`, type: 'official-docs', authoritative: true, description: 'Range/List/Hash partitioning, pruning, and live attach/detach.', recommendedReadingOrder: 1 },
    { title: 'Declarative Partitioning', url: `${D}/ddl-partitioning.html#DDL-PARTITIONING-DECLARATIVE`, type: 'official-docs', authoritative: true, description: 'The native partitioning syntax introduced in PostgreSQL 10.', recommendedReadingOrder: 2 },
  ],
  'replication-high-availability': [
    { title: 'High Availability, Load Balancing, and Replication', url: `${D}/high-availability.html`, type: 'official-docs', authoritative: true, description: 'Physical vs logical, sync vs async, hot standby, and failover.', recommendedReadingOrder: 1 },
    { title: 'Write-Ahead Logging (WAL)', url: `${D}/wal-intro.html`, type: 'official-docs', authoritative: true, description: 'How the WAL underpins durability and replication.', recommendedReadingOrder: 2 },
    { title: 'Replication Configuration', url: `${D}/runtime-config-replication.html`, type: 'official-docs', authoritative: true, description: 'Streaming replication GUCs, synchronous_standby_names, and slots.' },
    { title: 'Logical Replication', url: `${D}/logical-replication.html`, type: 'official-docs', authoritative: true, description: 'Publications and subscriptions for row-level replication.' },
    { title: 'PgBouncer Usage', url: 'https://www.pgbouncer.org/usage.html', type: 'official-docs', authoritative: true, description: 'Session/transaction/statement pooling modes and their trade-offs.' },
    { title: 'Designing Data-Intensive Applications, Kleppmann', url: DDIA, type: 'book', authoritative: false, description: 'Chapter 5 on replication and consistency models.' },
  ],
  'backup-recovery-pitr': [
    { title: 'Backup and Restore', url: `${D}/backup.html`, type: 'official-docs', authoritative: true, description: 'Logical (pg_dump) vs physical (file-system/base) backup strategies.', recommendedReadingOrder: 1 },
    { title: 'Continuous Archiving and PITR', url: `${D}/continuous-archiving.html`, type: 'official-docs', authoritative: true, description: 'archive_command, restore_command, and point-in-time recovery.', recommendedReadingOrder: 2 },
    { title: 'pg_dump', url: `${D}/app-pgdump.html`, type: 'official-docs', authoritative: true, description: 'Reference for the logical-backup tool and its formats.' },
    { title: 'pg_basebackup', url: `${D}/app-pgbasebackup.html`, type: 'official-docs', authoritative: true, description: 'Reference for taking a physical base backup of a cluster.' },
  ],
  'performance-tuning-operations': [
    { title: 'Resource Consumption Configuration', url: `${D}/runtime-config-resource.html`, type: 'official-docs', authoritative: true, description: 'shared_buffers, work_mem, maintenance_work_mem, effective_cache_size.', recommendedReadingOrder: 1 },
    { title: 'Automatic Vacuuming Configuration', url: `${D}/runtime-config-autovacuum.html`, type: 'official-docs', authoritative: true, description: 'Tuning autovacuum so it keeps up with write-heavy tables.', recommendedReadingOrder: 2 },
    { title: 'Monitoring Statistics', url: `${D}/monitoring-stats.html`, type: 'official-docs', authoritative: true, description: 'pg_stat_user_indexes and friends for finding unused/bloated objects.' },
    { title: 'pg_stat_statements', url: `${D}/pgstatstatements.html`, type: 'official-docs', authoritative: true, description: 'Aggregated query statistics for finding the worst offenders.' },
    { title: 'auto_explain', url: `${D}/auto-explain.html`, type: 'official-docs', authoritative: true, description: 'Automatically logging execution plans of slow statements.' },
  ],
  'stored-procedures-functions-triggers': [
    { title: 'CREATE FUNCTION', url: `${D}/sql-createfunction.html`, type: 'official-docs', authoritative: true, description: 'Function definition, languages, volatility, and security context.', recommendedReadingOrder: 1 },
    { title: 'CREATE PROCEDURE', url: `${D}/sql-createprocedure.html`, type: 'official-docs', authoritative: true, description: 'Procedures and how they differ from functions (transaction control).', recommendedReadingOrder: 2 },
    { title: 'PL/pgSQL', url: `${D}/plpgsql.html`, type: 'official-docs', authoritative: true, description: 'The procedural language used for most stored logic and triggers.' },
    { title: 'Trigger Definition', url: `${D}/trigger-definition.html`, type: 'official-docs', authoritative: true, description: 'BEFORE/AFTER/INSTEAD OF and statement vs row-level triggers.' },
    { title: 'Function Volatility Categories', url: `${D}/xfunc-volatility.html`, type: 'official-docs', authoritative: true, description: 'IMMUTABLE vs STABLE vs VOLATILE and how the planner uses them.' },
  ],
};
