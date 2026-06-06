import type { Module } from '../../../types';
import { HLD_SOURCES } from './sources';

const BASE = 'tracks/java-backend/high-level-design/topics';

export const highLevelDesignModule: Module = {
  id: 'high-level-design',
  title: 'High-Level Design (HLD / Distributed Systems)',
  description:
    'Distributed systems and large-scale architecture interview preparation. Fundamentals (CAP, consistency, replication), building blocks (caches, queues, databases), and full system designs across FAANG, EU, and regional interview styles.',
  estimatedHours: 60,
  topics: [
    {
      id: 'hld-framework',
      title: 'The HLD Interview Framework',
      summary:
        'The canonical 4-step approach (requirements → estimation → high-level design → deep dive), capacity-estimation method, time budgeting, and how FAANG / EU / regional styles differ.',
      difficulty: 'middle',
      prerequisites: [],
      contentPath: `${BASE}/01-hld-framework/topic.mdx`,
      sources: HLD_SOURCES['hld-framework'],
      questions: [
        { id: 'four-step-framework', prompt: 'The canonical 4-step HLD framework.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/01-hld-framework/questions/q01-four-step-framework.mdx` },
        { id: 'clarifying-questions', prompt: 'Questions to ALWAYS ask before designing (functional + non-functional + scale).', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/01-hld-framework/questions/q02-clarifying-questions.mdx` },
        { id: 'capacity-estimation', prompt: 'How to do capacity estimation: DAU → QPS, storage, bandwidth.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/01-hld-framework/questions/q03-capacity-estimation.mdx` },
        { id: 'time-budget', prompt: 'Time budgeting a 60-minute round.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/01-hld-framework/questions/q04-time-budget.mdx` },
        { id: 'interviewer-styles', prompt: 'How FAANG, EU/contracting, and regional (EPAM/Uzum) styles differ.', difficulty: 'middle', tags: ['system-design', 'behavioral'], answerPath: `${BASE}/01-hld-framework/questions/q05-interviewer-styles.mdx` },
      ],
    },
    {
      id: 'cap-pacelc-consistency',
      title: 'CAP Theorem, PACELC, Consistency Models',
      summary:
        'CAP stated correctly, the PACELC extension, the consistency spectrum (linearizable → eventual), ACID vs BASE, and quorum reads/writes.',
      difficulty: 'senior',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/02-cap-pacelc-consistency/topic.mdx`,
      sources: HLD_SOURCES['cap-pacelc-consistency'],
      questions: [
        { id: 'cap-correctly', prompt: 'State CAP correctly. What does Partition tolerance really mean?', difficulty: 'senior', tags: ['system-design', 'trick'], askedAt: ['Amazon', 'Google'], answerPath: `${BASE}/02-cap-pacelc-consistency/questions/q01-cap-correctly.mdx` },
        { id: 'pacelc', prompt: 'PACELC — what does it add to CAP?', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/02-cap-pacelc-consistency/questions/q02-pacelc.mdx` },
        { id: 'consistency-spectrum', prompt: 'Consistency models from strongest to weakest.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/02-cap-pacelc-consistency/questions/q03-consistency-spectrum.mdx` },
        { id: 'acid-vs-base', prompt: 'ACID vs BASE — when does each fit?', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/02-cap-pacelc-consistency/questions/q04-acid-vs-base.mdx` },
        { id: 'quorum', prompt: 'Quorum reads/writes: why does W + R > N matter?', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/02-cap-pacelc-consistency/questions/q05-quorum.mdx` },
      ],
    },
    {
      id: 'replication-partitioning',
      title: 'Replication & Partitioning (Sharding)',
      summary:
        'Single-leader / multi-leader / leaderless replication, sync vs async, replication lag, sharding strategies, consistent hashing, resharding, and hot partitions.',
      difficulty: 'senior',
      prerequisites: ['cap-pacelc-consistency'],
      contentPath: `${BASE}/03-replication-partitioning/topic.mdx`,
      sources: HLD_SOURCES['replication-partitioning'],
      questions: [
        { id: 'single-leader', prompt: 'Single-leader replication — why is it the default? Failure modes?', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/03-replication-partitioning/questions/q01-single-leader.mdx` },
        { id: 'multi-leader-leaderless', prompt: 'Multi-leader and leaderless (Dynamo-style) replication.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/03-replication-partitioning/questions/q02-multi-leader-leaderless.mdx` },
        { id: 'replication-lag', prompt: 'Replication lag — handling read-your-writes consistency.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/03-replication-partitioning/questions/q03-replication-lag.mdx` },
        { id: 'sharding-strategies', prompt: 'Range vs hash sharding — pros and cons.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/03-replication-partitioning/questions/q04-sharding-strategies.mdx` },
        { id: 'consistent-hashing', prompt: 'Consistent hashing — what problem does it solve? Virtual nodes.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Amazon', 'Google'], answerPath: `${BASE}/03-replication-partitioning/questions/q05-consistent-hashing.mdx` },
        { id: 'resharding-hot-partitions', prompt: 'Resharding without downtime, and detecting/mitigating hot partitions.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/03-replication-partitioning/questions/q06-resharding-hot-partitions.mdx` },
      ],
    },
    {
      id: 'caching-strategies',
      title: 'Caching Strategies',
      summary:
        'Cache layers, the four caching patterns, eviction policies, cache stampede mitigation, invalidation, Redis vs Memcached, and two-tier (L1/L2) caching.',
      difficulty: 'senior',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/04-caching-strategies/topic.mdx`,
      sources: HLD_SOURCES['caching-strategies'],
      questions: [
        { id: 'where-to-cache', prompt: 'Where to cache: client, edge, application, database — trade-offs.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/04-caching-strategies/questions/q01-where-to-cache.mdx` },
        { id: 'caching-patterns', prompt: 'Cache-aside vs read-through vs write-through vs write-behind.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/04-caching-strategies/questions/q02-caching-patterns.mdx` },
        { id: 'cache-stampede', prompt: 'Thundering herd / cache stampede — detection and mitigation.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Google'], answerPath: `${BASE}/04-caching-strategies/questions/q03-cache-stampede.mdx` },
        { id: 'invalidation', prompt: 'Cache invalidation strategies — TTL, event-based, manual.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/04-caching-strategies/questions/q04-invalidation.mdx` },
        { id: 'redis-vs-memcached', prompt: 'Redis vs Memcached, and local (Caffeine) vs distributed.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/04-caching-strategies/questions/q05-redis-vs-memcached.mdx` },
      ],
    },
    {
      id: 'message-queues-streaming',
      title: 'Message Queues & Event Streaming',
      summary:
        'Queue vs log, delivery guarantees, ordering, backpressure, dead-letter queues, the outbox pattern, and CDC. RabbitMQ vs Kafka.',
      difficulty: 'senior',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/05-message-queues-streaming/topic.mdx`,
      sources: HLD_SOURCES['message-queues-streaming'],
      questions: [
        { id: 'queue-vs-log', prompt: "Queue vs log — the conceptual difference (RabbitMQ vs Kafka).", difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/05-message-queues-streaming/questions/q01-queue-vs-log.mdx` },
        { id: 'delivery-guarantees', prompt: 'At-most-once, at-least-once, exactly-once — what each guarantees.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Google'], answerPath: `${BASE}/05-message-queues-streaming/questions/q02-delivery-guarantees.mdx` },
        { id: 'kafka-ordering', prompt: 'Kafka partitions and consumer groups — how is per-partition ordering guaranteed?', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/05-message-queues-streaming/questions/q03-kafka-ordering.mdx` },
        { id: 'backpressure-dlq', prompt: 'Backpressure and dead-letter queues — when and why.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/05-message-queues-streaming/questions/q04-backpressure-dlq.mdx` },
        { id: 'outbox-cdc', prompt: 'Outbox pattern and CDC — solving the dual-write problem.', difficulty: 'senior', tags: ['system-design', 'big-tech'], answerPath: `${BASE}/05-message-queues-streaming/questions/q05-outbox-cdc.mdx` },
      ],
    },
    {
      id: 'sql-vs-nosql',
      title: 'Database Choices — SQL vs NoSQL',
      summary:
        'When to choose relational, document, key-value, wide-column, graph, search, or time-series stores, and the cost of polyglot persistence.',
      difficulty: 'senior',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/06-sql-vs-nosql/topic.mdx`,
      sources: HLD_SOURCES['sql-vs-nosql'],
      questions: [
        { id: 'rdbms-strengths', prompt: 'RDBMS strengths and weaknesses — when are they the right answer?', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/06-sql-vs-nosql/questions/q01-rdbms-strengths.mdx` },
        { id: 'nosql-families', prompt: 'Document, key-value, wide-column, graph, search, time-series — when to choose each.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/06-sql-vs-nosql/questions/q02-nosql-families.mdx` },
        { id: 'polyglot-persistence', prompt: 'Polyglot persistence — pros, cons, operational cost.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/06-sql-vs-nosql/questions/q03-polyglot-persistence.mdx` },
        { id: 'outgrow-postgres', prompt: '"Postgres for everything until we can\'t" — when do you outgrow it?', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/06-sql-vs-nosql/questions/q04-outgrow-postgres.mdx` },
      ],
    },
    {
      id: 'api-design',
      title: 'API Design — REST, gRPC, GraphQL, WebSockets',
      summary:
        'REST principles and idempotency, REST vs gRPC vs GraphQL, real-time options (WebSockets/SSE/long polling), versioning, and pagination.',
      difficulty: 'middle',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/07-api-design/topic.mdx`,
      sources: HLD_SOURCES['api-design'],
      questions: [
        { id: 'rest-and-idempotency', prompt: 'REST principles and idempotency — which methods are idempotent and why it matters for retries.', difficulty: 'middle', tags: ['system-design'], askedAt: ['EPAM'], answerPath: `${BASE}/07-api-design/questions/q01-rest-and-idempotency.mdx` },
        { id: 'rest-grpc-graphql', prompt: 'REST vs gRPC vs GraphQL — when to use each.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/07-api-design/questions/q02-rest-grpc-graphql.mdx` },
        { id: 'realtime-transport', prompt: 'WebSockets vs SSE vs long polling for real-time.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/07-api-design/questions/q03-realtime-transport.mdx` },
        { id: 'versioning-pagination', prompt: 'API versioning and pagination (offset vs cursor).', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/07-api-design/questions/q04-versioning-pagination.mdx` },
      ],
    },
    {
      id: 'rate-limiting-distributed',
      title: 'Rate Limiting & Throttling (HLD perspective)',
      summary:
        'Distributed rate limiting with Redis, per-user/IP/key granularity, edge vs application limits, the API-gateway role, and 429 + Retry-After.',
      difficulty: 'senior',
      prerequisites: ['caching-strategies'],
      contentPath: `${BASE}/08-rate-limiting-distributed/topic.mdx`,
      sources: HLD_SOURCES['rate-limiting-distributed'],
      questions: [
        { id: 'why-distributed-hard', prompt: 'Why is distributed rate limiting hard? (Shared state.)', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/08-rate-limiting-distributed/questions/q01-why-distributed-hard.mdx` },
        { id: 'redis-limiter', prompt: 'Redis-based distributed limiter — INCR + EXPIRE.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/08-rate-limiting-distributed/questions/q02-redis-limiter.mdx` },
        { id: 'edge-vs-app-gateway', prompt: 'Edge vs application-level limiting and the API-gateway role.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/08-rate-limiting-distributed/questions/q03-edge-vs-app-gateway.mdx` },
      ],
    },
    {
      id: 'load-balancing',
      title: 'Load Balancing',
      summary:
        'L4 vs L7, balancing algorithms, consistent hashing for cache-aware routing, sticky sessions, health checks, and LB redundancy.',
      difficulty: 'middle',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/09-load-balancing/topic.mdx`,
      sources: HLD_SOURCES['load-balancing'],
      questions: [
        { id: 'l4-vs-l7', prompt: 'L4 vs L7 load balancing — what can L7 do that L4 cannot?', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/09-load-balancing/questions/q01-l4-vs-l7.mdx` },
        { id: 'lb-algorithms', prompt: 'Round-robin vs least-connection vs weighted vs consistent hashing.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/09-load-balancing/questions/q02-lb-algorithms.mdx` },
        { id: 'health-checks-redundancy', prompt: 'Health checks, sticky sessions, and what happens when the LB itself fails.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/09-load-balancing/questions/q03-health-checks-redundancy.mdx` },
      ],
    },
    {
      id: 'microservices-mesh-gateway',
      title: 'Microservices, Service Mesh, API Gateway',
      summary:
        'Monolith vs microservices vs modular monolith, service discovery, API gateway, service mesh, distributed tracing, and the Saga + outbox patterns.',
      difficulty: 'senior',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/10-microservices-mesh-gateway/topic.mdx`,
      sources: HLD_SOURCES['microservices-mesh-gateway'],
      questions: [
        { id: 'microservices-tradeoffs', prompt: 'What problems do microservices solve — and cause?', difficulty: 'senior', tags: ['system-design'], askedAt: ['EPAM'], answerPath: `${BASE}/10-microservices-mesh-gateway/questions/q01-microservices-tradeoffs.mdx` },
        { id: 'modular-monolith', prompt: 'Modular monolith vs microservices — when to choose each.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/10-microservices-mesh-gateway/questions/q02-modular-monolith.mdx` },
        { id: 'gateway-mesh-discovery', prompt: 'API gateway, service mesh, and service discovery responsibilities.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/10-microservices-mesh-gateway/questions/q03-gateway-mesh-discovery.mdx` },
        { id: 'saga-pattern', prompt: 'Saga pattern for distributed transactions — choreography vs orchestration.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Amazon'], answerPath: `${BASE}/10-microservices-mesh-gateway/questions/q04-saga-pattern.mdx` },
      ],
    },
    {
      id: 'storage-systems',
      title: 'Storage Systems — Disk, RAM, Object Storage',
      summary:
        'The storage hierarchy and latency numbers, B-trees vs LSM-trees, row vs columnar storage, object/block/file storage, and tiered hot/warm/cold data.',
      difficulty: 'senior',
      prerequisites: ['sql-vs-nosql'],
      contentPath: `${BASE}/11-storage-systems/topic.mdx`,
      sources: HLD_SOURCES['storage-systems'],
      questions: [
        { id: 'latency-numbers', prompt: 'Latency numbers every engineer should know.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/11-storage-systems/questions/q01-latency-numbers.mdx` },
        { id: 'btree-vs-lsm', prompt: 'B-tree vs LSM-tree — read vs write trade-offs, write amplification.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Google'], answerPath: `${BASE}/11-storage-systems/questions/q02-btree-vs-lsm.mdx` },
        { id: 'row-vs-columnar', prompt: 'Row vs columnar storage — OLTP vs OLAP.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/11-storage-systems/questions/q03-row-vs-columnar.mdx` },
        { id: 'object-storage', prompt: 'Object vs block vs file storage, and tiered hot/warm/cold data.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/11-storage-systems/questions/q04-object-storage.mdx` },
      ],
    },
    {
      id: 'cdn-edge',
      title: 'CDN & Edge',
      summary:
        'What a CDN does, edge cache invalidation, edge compute, anycast vs DNS geo-routing, HTTP/2-3, and TLS termination at the edge.',
      difficulty: 'middle',
      prerequisites: ['caching-strategies'],
      contentPath: `${BASE}/12-cdn-edge/topic.mdx`,
      sources: HLD_SOURCES['cdn-edge'],
      questions: [
        { id: 'what-cdn-does', prompt: 'What does a CDN actually do? When is it essential?', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/12-cdn-edge/questions/q01-what-cdn-does.mdx` },
        { id: 'edge-invalidation', prompt: 'Cache invalidation at the edge — TTL, purge, surrogate keys.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/12-cdn-edge/questions/q02-edge-invalidation.mdx` },
        { id: 'edge-compute-routing', prompt: 'Edge compute, anycast vs DNS geo-routing, and TLS termination.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/12-cdn-edge/questions/q03-edge-compute-routing.mdx` },
      ],
    },
    {
      id: 'observability',
      title: 'Observability — Logging, Metrics, Tracing',
      summary:
        'The three pillars, structured logging, metric types, distributed tracing with OpenTelemetry, and SLI/SLO/SLA with error budgets.',
      difficulty: 'senior',
      prerequisites: ['microservices-mesh-gateway'],
      contentPath: `${BASE}/13-observability/topic.mdx`,
      sources: HLD_SOURCES['observability'],
      questions: [
        { id: 'three-pillars', prompt: 'The three pillars: logs, metrics, traces — what each gives you.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/13-observability/questions/q01-three-pillars.mdx` },
        { id: 'metric-types', prompt: 'Metrics: counter, gauge, histogram, summary — when to use each.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/13-observability/questions/q02-metric-types.mdx` },
        { id: 'distributed-tracing', prompt: 'Distributed tracing — trace propagation, spans, sampling, OpenTelemetry.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/13-observability/questions/q03-distributed-tracing.mdx` },
        { id: 'sli-slo-sla', prompt: 'SLI vs SLO vs SLA, and the error budget.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/13-observability/questions/q04-sli-slo-sla.mdx` },
      ],
    },
    {
      id: 'url-shortener',
      title: 'Design a URL Shortener (TinyURL / bit.ly)',
      summary:
        'The most common HLD warm-up. ID-generation strategies, SQL vs NoSQL choice, caching, custom URLs, and analytics — with FAANG / EU / regional variants.',
      difficulty: 'middle',
      prerequisites: ['hld-framework', 'caching-strategies'],
      contentPath: `${BASE}/14-url-shortener/topic.mdx`,
      sources: HLD_SOURCES['url-shortener'],
      questions: [
        { id: 'solution', prompt: 'Design a URL shortener — full system-design solution.', difficulty: 'middle', tags: ['system-design'], askedAt: ['Amazon', 'EPAM'], answerPath: `${BASE}/14-url-shortener/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'twitter-feed',
      title: 'Design Twitter / Threads (Social Feed)',
      summary:
        'Timeline generation (pull / fan-out-on-write / hybrid), feed ranking, the celebrity (hot-user) problem, media storage, and caching layers.',
      difficulty: 'senior',
      prerequisites: ['replication-partitioning', 'caching-strategies'],
      contentPath: `${BASE}/15-twitter-feed/topic.mdx`,
      sources: HLD_SOURCES['twitter-feed'],
      questions: [
        { id: 'solution', prompt: 'Design Twitter / a social feed — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Meta', 'Amazon'], answerPath: `${BASE}/15-twitter-feed/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'chat-messaging',
      title: 'Design a Chat / Messaging System (WhatsApp / Telegram)',
      summary:
        '1:1 and group chat, online presence, delivery/read receipts, media, WebSocket vs polling, and sharding by chat ID.',
      difficulty: 'senior',
      prerequisites: ['message-queues-streaming', 'api-design'],
      contentPath: `${BASE}/16-chat-messaging/topic.mdx`,
      sources: HLD_SOURCES['chat-messaging'],
      questions: [
        { id: 'solution', prompt: 'Design a chat / messaging system — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Meta', 'Amazon'], answerPath: `${BASE}/16-chat-messaging/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'ride-sharing',
      title: 'Design a Ride-Sharing System (Uber / Lyft)',
      summary:
        'Geospatial indexing (geohash / S2 / H3), driver-rider matching, surge pricing, real-time location tracking, and payment integration.',
      difficulty: 'senior',
      prerequisites: ['replication-partitioning', 'message-queues-streaming'],
      contentPath: `${BASE}/17-ride-sharing/topic.mdx`,
      sources: HLD_SOURCES['ride-sharing'],
      questions: [
        { id: 'solution', prompt: 'Design a ride-sharing system — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Uber', 'Amazon'], answerPath: `${BASE}/17-ride-sharing/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'instagram',
      title: 'Design Instagram / Photo-Sharing',
      summary:
        'Feed generation, image storage and delivery (S3 + CDN), thumbnails, stories (24h TTL), likes/comments at scale, and hashtag search.',
      difficulty: 'senior',
      prerequisites: ['caching-strategies', 'cdn-edge'],
      contentPath: `${BASE}/18-instagram/topic.mdx`,
      sources: HLD_SOURCES['instagram'],
      questions: [
        { id: 'solution', prompt: 'Design Instagram — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Meta'], answerPath: `${BASE}/18-instagram/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'video-streaming',
      title: 'Design Netflix / YouTube (Video Streaming)',
      summary:
        'Video encoding pipeline, adaptive bitrate streaming (HLS/DASH), CDN delivery, recommendations, and view counting at scale.',
      difficulty: 'senior',
      prerequisites: ['cdn-edge', 'message-queues-streaming'],
      contentPath: `${BASE}/19-video-streaming/topic.mdx`,
      sources: HLD_SOURCES['video-streaming'],
      questions: [
        { id: 'solution', prompt: 'Design Netflix / YouTube — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Google', 'Netflix'], answerPath: `${BASE}/19-video-streaming/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'notification-service',
      title: 'Design a Notification Service (at scale)',
      summary:
        'Channel abstraction, template service, user preferences, a delivery queue with retries and DLQ, per-channel rate limiting, and provider failover.',
      difficulty: 'senior',
      prerequisites: ['message-queues-streaming'],
      contentPath: `${BASE}/20-notification-service/topic.mdx`,
      sources: HLD_SOURCES['notification-service'],
      questions: [
        { id: 'solution', prompt: 'Design a notification service at scale — full system-design solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/20-notification-service/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'web-crawler',
      title: 'Design a Web Crawler',
      summary:
        'URL frontier (priority + dedup), politeness (robots.txt, per-domain rate limit), DNS caching, content storage, duplicate detection, and distributed coordination.',
      difficulty: 'senior',
      prerequisites: ['message-queues-streaming'],
      contentPath: `${BASE}/21-web-crawler/topic.mdx`,
      sources: HLD_SOURCES['web-crawler'],
      questions: [
        { id: 'solution', prompt: 'Design a web crawler — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Google', 'Amazon'], answerPath: `${BASE}/21-web-crawler/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'autocomplete',
      title: 'Design a Search Autocomplete / Typeahead',
      summary:
        'Trie data structure, prefix caching, top-K suggestions, ranking by popularity/personalization, and the trend-update pipeline.',
      difficulty: 'senior',
      prerequisites: ['caching-strategies'],
      contentPath: `${BASE}/22-autocomplete/topic.mdx`,
      sources: HLD_SOURCES['autocomplete'],
      questions: [
        { id: 'solution', prompt: 'Design search autocomplete / typeahead — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Google', 'Amazon'], answerPath: `${BASE}/22-autocomplete/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'distributed-kv-store',
      title: 'Design a Distributed Key-Value Store (Dynamo-style)',
      summary:
        'Consistent hashing, virtual nodes, replication, vector clocks, read repair, Merkle trees, gossip, and sloppy quorum.',
      difficulty: 'senior',
      prerequisites: ['replication-partitioning', 'cap-pacelc-consistency'],
      contentPath: `${BASE}/23-distributed-kv-store/topic.mdx`,
      sources: HLD_SOURCES['distributed-kv-store'],
      questions: [
        { id: 'solution', prompt: 'Design a Dynamo-style distributed key-value store — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Amazon', 'Google'], answerPath: `${BASE}/23-distributed-kv-store/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'distributed-job-scheduler',
      title: 'Design a Distributed Job Scheduler (Cron at Scale)',
      summary:
        'Job queue, worker assignment, leader election (Zookeeper/etcd), missed-run handling, distributed locks, idempotency, and monitoring.',
      difficulty: 'senior',
      prerequisites: ['message-queues-streaming'],
      contentPath: `${BASE}/24-distributed-job-scheduler/topic.mdx`,
      sources: HLD_SOURCES['distributed-job-scheduler'],
      questions: [
        { id: 'solution', prompt: 'Design a distributed job scheduler — full system-design solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/24-distributed-job-scheduler/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'google-docs',
      title: 'Design Google Docs / Collaborative Editor',
      summary:
        'Operational Transformation vs CRDTs, real-time sync over WebSockets, presence, cursor sharing, version history, and offline editing.',
      difficulty: 'senior',
      prerequisites: ['api-design'],
      contentPath: `${BASE}/25-google-docs/topic.mdx`,
      sources: HLD_SOURCES['google-docs'],
      questions: [
        { id: 'solution', prompt: 'Design Google Docs / a collaborative editor — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Google'], answerPath: `${BASE}/25-google-docs/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'payment-system',
      title: 'Design a Payment System',
      summary:
        'Idempotency keys, distributed transactions via Saga, reconciliation, double-entry bookkeeping, fraud hooks, and processor integration (Stripe/Click/Payme model).',
      difficulty: 'senior',
      prerequisites: ['message-queues-streaming', 'microservices-mesh-gateway'],
      contentPath: `${BASE}/26-payment-system/topic.mdx`,
      sources: HLD_SOURCES['payment-system'],
      questions: [
        { id: 'solution', prompt: 'Design a payment system — full system-design solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Stripe', 'Amazon'], answerPath: `${BASE}/26-payment-system/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'exam-prep-platform',
      title: 'Design an Exam Prep Platform (PrepHub-style)',
      summary:
        'Exam session management, real-time scoring, leaderboards, payment integration, content delivery, and anti-cheat/proctoring — an end-to-end real-system case.',
      difficulty: 'senior',
      prerequisites: ['caching-strategies', 'message-queues-streaming'],
      contentPath: `${BASE}/27-exam-prep-platform/topic.mdx`,
      sources: HLD_SOURCES['exam-prep-platform'],
      questions: [
        { id: 'solution', prompt: 'Design an exam-prep platform — full system-design solution.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/27-exam-prep-platform/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'how-to-practice-hld',
      title: 'How to Practice HLD',
      summary:
        'How many problems to solve, the internalizable template, per-section time-boxing, handling "I don\'t know" gracefully, and how to signal senior.',
      difficulty: 'middle',
      prerequisites: ['hld-framework'],
      contentPath: `${BASE}/28-how-to-practice-hld/topic.mdx`,
      sources: HLD_SOURCES['how-to-practice-hld'],
      questions: [
        { id: 'practice-plan', prompt: 'How many problems, what template, and how to signal senior in an HLD round.', difficulty: 'middle', tags: ['behavioral', 'system-design'], answerPath: `${BASE}/28-how-to-practice-hld/questions/q01-practice-plan.mdx` },
      ],
    },
  ],
};
