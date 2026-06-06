import type { Source } from '../../../types';

// Shared authoritative references reused across HLD topics.
const DDIA: Source = {
  title: 'Designing Data-Intensive Applications — Martin Kleppmann',
  url: 'https://dataintensive.net/',
  type: 'book',
  authoritative: true,
  description: 'THE distributed-systems book; cited across nearly every HLD topic.',
};
const XU1: Source = {
  title: 'System Design Interview Vol. 1 — Alex Xu',
  url: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF',
  type: 'book',
  authoritative: false,
  description: 'Worked walkthroughs of the classic system-design problems.',
};
const XU2: Source = {
  title: 'System Design Interview Vol. 2 — Alex Xu & Sahn Lam',
  url: 'https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119',
  type: 'book',
  authoritative: false,
  description: 'Second volume: Twitter, notifications, payments, and more.',
};
const NEWMAN: Source = {
  title: 'Building Microservices (2nd ed.) — Sam Newman',
  url: 'https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/',
  type: 'book',
  authoritative: false,
  description: 'Practical guide to designing, building, and operating microservices.',
};
const SRE_BOOK: Source = {
  title: 'Site Reliability Engineering (Google)',
  url: 'https://sre.google/sre-book/table-of-contents/',
  type: 'book',
  authoritative: true,
  description: 'Free online; SLI/SLO/SLA and operational practice.',
};
const SDP: Source = {
  title: 'The System Design Primer (donnemartin)',
  url: 'https://github.com/donnemartin/system-design-primer',
  type: 'article',
  authoritative: false,
  description: 'Popular open-source primer organizing core system-design concepts and interview prep.',
};
const KARAN: Source = {
  title: 'System Design (Karan Pratap Singh)',
  url: 'https://github.com/karanpratapsingh/system-design',
  type: 'article',
  authoritative: false,
  description: 'Concise open-source course covering system-design fundamentals and patterns.',
};
const HELLO_INTERVIEW: Source = {
  title: 'Hello Interview',
  url: 'https://www.hellointerview.com/',
  type: 'article',
  authoritative: false,
  description: 'Interview-prep platform with structured system-design walkthroughs and practice.',
};
const DYNAMO_PAPER: Source = {
  title: 'Amazon Dynamo paper (2007)',
  url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
  type: 'article',
  authoritative: true,
  description: 'The foundational leaderless-replication / consistent-hashing paper.',
};

export const HLD_SOURCES: Record<string, Source[]> = {
  'hld-framework': [XU1, SDP, KARAN],
  'cap-pacelc-consistency': [
    DDIA,
    { title: 'CAP Twelve Years Later (Eric Brewer)', url: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/', type: 'article', authoritative: true, description: 'Brewer revisits the CAP theorem and clarifies common misconceptions about its tradeoffs.' },
    { title: 'Jepsen — Consistency Models', url: 'https://jepsen.io/consistency', type: 'article', authoritative: true, description: 'Reference map of distributed-systems consistency models and their relationships.' },
  ],
  'replication-partitioning': [
    DDIA,
    DYNAMO_PAPER,
    { title: 'Consistent Hashing (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Consistent_hashing', type: 'article', authoritative: false, description: 'Overview of consistent hashing for distributing keys across a changing set of nodes.' },
  ],
  'caching-strategies': [
    XU1,
    { title: 'Redis — Patterns', url: 'https://redis.io/docs/latest/develop/use/patterns/', type: 'official-docs', authoritative: true, description: 'Official Redis docs covering common usage patterns like rate limiting and distributed locks.' },
    { title: 'AWS — Caching Overview', url: 'https://aws.amazon.com/caching/', type: 'official-docs', authoritative: true, description: 'AWS overview of caching concepts, strategies, and managed caching services.' },
  ],
  'message-queues-streaming': [
    DDIA,
    { title: 'Apache Kafka Documentation', url: 'https://kafka.apache.org/documentation/', type: 'official-docs', authoritative: true, description: 'Official Kafka docs covering its distributed log architecture, producers, consumers, and streams.' },
    { title: 'RabbitMQ Documentation', url: 'https://www.rabbitmq.com/docs', type: 'official-docs', authoritative: true, description: 'Official RabbitMQ docs covering message brokering, exchanges, queues, and routing.' },
    { title: 'Confluent — Exactly-Once Semantics', url: 'https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/', type: 'article', authoritative: true, description: 'Explains how Kafka achieves exactly-once delivery via idempotent producers and transactions.' },
  ],
  'sql-vs-nosql': [
    DDIA,
    { title: 'MongoDB — NoSQL Explained', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained', type: 'article', authoritative: false, description: 'Vendor explainer introducing NoSQL database types and when to use them over relational stores.' },
    { title: 'AWS — NoSQL', url: 'https://aws.amazon.com/nosql/', type: 'article', authoritative: false, description: 'Vendor explainer of NoSQL database categories and their use cases.' },
  ],
  'api-design': [
    { title: 'REST API Tutorial', url: 'https://restfulapi.net/', type: 'article', authoritative: false, description: 'Tutorial site explaining REST principles, resources, and best practices for HTTP APIs.' },
    { title: 'gRPC Documentation', url: 'https://grpc.io/docs/', type: 'official-docs', authoritative: true, description: 'Official gRPC docs covering its RPC framework, protobuf, and streaming over HTTP/2.' },
    { title: 'GraphQL — Learn', url: 'https://graphql.org/learn/', type: 'official-docs', authoritative: true, description: 'Official GraphQL learning guide covering schemas, queries, mutations, and resolvers.' },
  ],
  'rate-limiting-distributed': [
    XU1,
    { title: 'Cloudflare — Counting Things', url: 'https://blog.cloudflare.com/counting-things-a-lot-of-different-things/', type: 'article', authoritative: true, description: 'Cloudflare engineering post on counting at scale, underpinning distributed rate limiting.' },
  ],
  'load-balancing': [
    { title: 'NGINX — What Is Load Balancing?', url: 'https://www.f5.com/glossary/load-balancing', type: 'official-docs', authoritative: true, description: 'Glossary entry explaining load balancing concepts and common distribution algorithms.' },
    { title: 'Envoy — Load Balancing', url: 'https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancing', type: 'official-docs', authoritative: true, description: 'Official Envoy docs detailing its load-balancing policies and health-checking model.' },
  ],
  'microservices-mesh-gateway': [
    { title: 'microservices.io', url: 'https://microservices.io/', type: 'article', authoritative: true, description: 'Chris Richardson’s catalog of microservices patterns and their tradeoffs.' },
    { title: 'Martin Fowler — Microservices', url: 'https://martinfowler.com/articles/microservices.html', type: 'article', authoritative: true, description: 'Foundational article defining the microservices architectural style and its characteristics.' },
    NEWMAN,
  ],
  'storage-systems': [
    DDIA,
    { title: 'ScyllaDB — LSM-tree glossary', url: 'https://www.scylladb.com/glossary/log-structured-merge-tree/', type: 'article', authoritative: false, description: 'Glossary entry explaining log-structured merge-trees used by write-optimized storage engines.' },
    { title: 'Latency Numbers Every Programmer Should Know', url: 'https://gist.github.com/jboner/2841832', type: 'article', authoritative: false, description: 'Reference list of typical latencies for memory, disk, and network operations.' },
  ],
  'cdn-edge': [
    { title: 'Cloudflare — What is a CDN?', url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/', type: 'article', authoritative: true, description: 'Explains how content delivery networks cache and serve content from edge locations.' },
  ],
  'observability': [
    { title: 'OpenTelemetry Documentation', url: 'https://opentelemetry.io/docs/', type: 'official-docs', authoritative: true, description: 'Official docs for the OpenTelemetry standard for traces, metrics, and logs instrumentation.' },
    SRE_BOOK,
  ],
  'url-shortener': [XU1, SDP],
  'twitter-feed': [XU2, { title: 'X (Twitter) Engineering Blog', url: 'https://blog.x.com/engineering/en_us', type: 'article', authoritative: true, description: 'X engineering blog with posts on timeline, feed, and large-scale infrastructure.' }],
  'chat-messaging': [XU1, DDIA],
  'ride-sharing': [
    XU1,
    { title: 'Uber Engineering Blog', url: 'https://www.uber.com/blog/engineering/', type: 'article', authoritative: true, description: 'Uber engineering blog with posts on dispatch, geospatial, and large-scale systems.' },
    { title: 'H3 — Uber Geospatial Index', url: 'https://h3geo.org/', type: 'official-docs', authoritative: true, description: 'Official docs for H3, Uber’s hexagonal hierarchical geospatial indexing system.' },
  ],
  'instagram': [XU1, SDP],
  'video-streaming': [XU1, { title: 'Netflix Tech Blog', url: 'https://netflixtechblog.com/', type: 'article', authoritative: true, description: 'Netflix engineering blog covering streaming, encoding, and large-scale distributed systems.' }],
  'notification-service': [XU2, SDP],
  'web-crawler': [XU1, SDP],
  'autocomplete': [XU1, SDP],
  'distributed-kv-store': [DYNAMO_PAPER, XU1, DDIA],
  'distributed-job-scheduler': [
    { title: 'Airbnb — Airflow', url: 'https://medium.com/airbnb-engineering/airflow-a-workflow-management-platform-46318b977fd8', type: 'article', authoritative: false, description: 'Airbnb’s introduction to Airflow as a platform for authoring and scheduling workflows.' },
    DDIA,
  ],
  'google-docs': [
    { title: 'Operational Transformation (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Operational_transformation', type: 'article', authoritative: false, description: 'Overview of operational transformation for real-time collaborative editing.' },
    { title: 'CRDT.tech', url: 'https://crdt.tech/', type: 'article', authoritative: true, description: 'Curated resource hub on conflict-free replicated data types for collaborative and distributed apps.' },
  ],
  'payment-system': [
    { title: 'Stripe — Designing robust and predictable APIs with idempotency', url: 'https://stripe.com/blog/idempotency', type: 'article', authoritative: true, description: 'Stripe’s guide to using idempotency keys for safe retries of payment API requests.' },
    { title: 'Uber — Payments Platform', url: 'https://www.uber.com/blog/payments-platform/', type: 'article', authoritative: true, description: 'Uber engineering post on the architecture of its large-scale payments platform.' },
    DDIA,
  ],
  'exam-prep-platform': [XU1, SDP],
  'how-to-practice-hld': [SDP, KARAN, HELLO_INTERVIEW],
};
