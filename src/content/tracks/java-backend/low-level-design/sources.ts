import type { Source } from '../../../types';

const J = 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base';
const ALLD = 'https://github.com/ashishps1/awesome-low-level-design';
const ALLD_SOL = `${ALLD}/blob/main/solutions/java/src`;

// Shared authoritative / reference sources reused across LLD topics.
const REFACTORING_GURU: Source = {
  title: 'Refactoring.Guru — Design Patterns',
  url: 'https://refactoring.guru/design-patterns',
  type: 'article',
  authoritative: true,
  description: 'The clearest catalog of GoF patterns with diagrams and Java examples.',
};
const REFACTORING_GURU_CATALOG: Source = {
  title: 'Refactoring.Guru — Pattern Catalog',
  url: 'https://refactoring.guru/design-patterns/catalog',
  type: 'article',
  authoritative: true,
  description: 'Index of all 23 GoF patterns grouped by intent.',
};
const GOF: Source = {
  title: 'Design Patterns: Elements of Reusable OO Software — Gang of Four',
  url: 'https://www.oreilly.com/library/view/design-patterns-elements/0201633612/',
  type: 'book',
  authoritative: true,
  description: 'The original 1994 pattern catalog.',
};
const HEAD_FIRST: Source = {
  title: 'Head First Design Patterns (2nd ed.) — Freeman & Robson',
  url: 'https://www.oreilly.com/library/view/head-first-design/9781492077992/',
  type: 'book',
  authoritative: false,
  description: 'Approachable, example-driven pattern walkthroughs.',
};
const EFFECTIVE_JAVA: Source = {
  title: 'Effective Java (3rd ed.) — Joshua Bloch',
  url: 'https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/',
  type: 'book',
  authoritative: true,
  description: 'Items on Singletons, builders, and instance control.',
};
const JCIP: Source = {
  title: 'Java Concurrency in Practice — Brian Goetz',
  url: 'https://jcip.net/',
  type: 'book',
  authoritative: true,
  description: 'The definitive reference for thread-safe Java design.',
};
const ILUWATAR: Source = {
  title: 'iluwatar/java-design-patterns',
  url: 'https://github.com/iluwatar/java-design-patterns',
  type: 'article',
  authoritative: false,
  description: 'Runnable Java examples of every GoF pattern.',
};
const AWESOME_LLD: Source = {
  title: 'awesome-low-level-design (ashishps1)',
  url: ALLD,
  type: 'article',
  authoritative: false,
  description: 'Curated LLD problem set with worked Java solutions.',
};
const PRIMER: Source = {
  title: 'low-level-design-primer (prasadgujar)',
  url: 'https://github.com/prasadgujar/low-level-design-primer',
  type: 'article',
  authoritative: false,
  description: 'LLD problem write-ups and approach guides.',
};
const ALEX_XU_1: Source = {
  title: 'System Design Interview Vol. 1 — Alex Xu',
  url: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF',
  type: 'book',
  authoritative: false,
  description: 'Chapters on rate limiting, URL shortener, and more.',
};
const DDIA: Source = {
  title: 'Designing Data-Intensive Applications — Martin Kleppmann',
  url: 'https://dataintensive.net/',
  type: 'book',
  authoritative: true,
  description: 'Reference for messaging, delivery guarantees, and storage.',
};

export const LLD_SOURCES: Record<string, Source[]> = {
  'lld-framework': [AWESOME_LLD, REFACTORING_GURU, { title: 'workat.tech — Machine Coding', url: 'https://workat.tech/machine-coding', type: 'article', authoritative: false, description: 'Practice platform and rubric for machine-coding rounds.' }],
  'design-pattern-reference': [REFACTORING_GURU, REFACTORING_GURU_CATALOG, HEAD_FIRST, ILUWATAR, GOF],
  'concurrency-in-lld': [
    { title: 'java.util.concurrent (Javadoc)', url: `${J}/java/util/concurrent/package-summary.html`, type: 'javadoc', authoritative: true, description: 'Locks, atomics, concurrent collections, and executors.', recommendedReadingOrder: 1 },
    JCIP,
  ],
  'parking-lot': [{ title: 'Parking Lot — awesome-low-level-design', url: `${ALLD_SOL}/parkinglot/README.md`, type: 'article', authoritative: false, description: 'Worked Java reference solution for the parking-lot problem.' }, PRIMER, REFACTORING_GURU],
  'elevator-system': [{ title: 'Elevator System — awesome-low-level-design', url: `${ALLD_SOL}/elevatorsystem/README.md`, type: 'article', authoritative: false, description: 'Worked Java reference solution for the elevator-system problem.' }, REFACTORING_GURU],
  'library-management': [{ title: 'Library Management — awesome-low-level-design', url: `${ALLD_SOL}/librarymanagementsystem/README.md`, type: 'article', authoritative: false, description: 'Worked Java reference solution for the library-management problem.' }, REFACTORING_GURU],
  'vending-machine': [{ title: 'State Pattern — Refactoring.Guru', url: 'https://refactoring.guru/design-patterns/state', type: 'article', authoritative: true, description: 'The State pattern, the backbone of the vending-machine design.' }, { title: 'Vending Machine — awesome-low-level-design', url: `${ALLD_SOL}/vendingmachine/README.md`, type: 'article', authoritative: false, description: 'Worked Java reference solution for the vending-machine problem.' }],
  'tic-tac-toe-chess': [PRIMER, REFACTORING_GURU],
  'snake-and-ladder': [AWESOME_LLD, REFACTORING_GURU],
  'atm': [{ title: 'ATM — awesome-low-level-design', url: `${ALLD_SOL}/atm/README.md`, type: 'article', authoritative: false, description: 'Worked Java reference solution for the ATM problem.' }, REFACTORING_GURU],
  'movie-ticket-booking': [{ title: 'Movie Booking — awesome-low-level-design', url: `${ALLD_SOL}/movieticketbookingsystem/README.md`, type: 'article', authoritative: false, description: 'Worked Java reference solution for the movie-ticket-booking-system problem.' }, REFACTORING_GURU],
  'ride-sharing': [{ title: 'Ride Sharing — awesome-low-level-design', url: `${ALLD_SOL}/ridesharingservice/README.md`, type: 'article', authoritative: false, description: 'Worked Java reference solution for the ride-sharing-service problem.' }, REFACTORING_GURU],
  'logger-library': [{ title: 'Effective Java — Joshua Bloch (instance control / Singleton)', url: EFFECTIVE_JAVA.url, type: 'book', authoritative: true, description: 'Items on instance control and the enum-Singleton idiom.' }, { title: 'Apache Log4j 2 Architecture', url: 'https://logging.apache.org/log4j/2.x/', type: 'official-docs', authoritative: true, description: 'Log4j 2 architecture: loggers, appenders, layouts, filters.' }, REFACTORING_GURU],
  'rate-limiter': [{ title: 'Token bucket (rate-limiting algorithm)', url: 'https://en.wikipedia.org/wiki/Token_bucket', type: 'article', authoritative: false, description: 'The token-bucket algorithm that underpins most rate-limiter implementations.' }, ALEX_XU_1],
  'lru-lfu-cache': [{ title: 'LRU Cache (LeetCode)', url: 'https://leetcode.com/problems/lru-cache/', type: 'article', authoritative: false, description: 'The canonical O(1) cache-design problem.' }, { title: 'LFU Cache (LeetCode)', url: 'https://leetcode.com/problems/lfu-cache/', type: 'article', authoritative: false, description: 'The canonical O(1) cache-design problem.' }, REFACTORING_GURU],
  'pub-sub': [DDIA, REFACTORING_GURU],
  'url-shortener': [ALEX_XU_1, REFACTORING_GURU],
  'notification-system': [{ title: 'Publish–subscribe pattern', url: 'https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern', type: 'article', authoritative: false, description: 'The pub/sub model behind multi-channel notification fan-out.' }, REFACTORING_GURU],
  'file-system': [{ title: 'Design In-Memory File System (LeetCode)', url: 'https://leetcode.com/problems/design-in-memory-file-system/', type: 'article', authoritative: false, description: 'In-memory file-system design problem.' }, REFACTORING_GURU],
  'scheduler': [{ title: 'ScheduledExecutorService (Javadoc)', url: `${J}/java/util/concurrent/ScheduledExecutorService.html`, type: 'javadoc', authoritative: true, description: 'JDK scheduled task execution.' }, REFACTORING_GURU],
  'how-to-practice-lld': [AWESOME_LLD, { title: 'workat.tech — Machine Coding', url: 'https://workat.tech/machine-coding', type: 'article', authoritative: false, description: 'Practice platform and rubric for machine-coding rounds.' }, { title: 'Grokking the OO Design Interview (Design Gurus)', url: 'https://www.designgurus.io/course/grokking-the-object-oriented-design-interview', type: 'article', authoritative: false, description: 'Popular OO-design interview course.' }],
};
