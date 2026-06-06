import type { Module } from '../../../types';
import { LLD_SOURCES } from './sources';

const BASE = 'tracks/java-backend/low-level-design/topics';

export const lowLevelDesignModule: Module = {
  id: 'low-level-design',
  title: 'Low-Level Design (LLD / OOD)',
  description:
    'Object-oriented system design at the class level. Machine-coding round preparation: classic problems with full solutions, class diagrams, design-pattern application, and trade-off discussion.',
  estimatedHours: 40,
  topics: [
    {
      id: 'lld-framework',
      title: 'The LLD Interview Framework',
      summary:
        'How to approach a 45-minute LLD round: the 6-step framework, scoping questions, when to code vs diagram, anti-patterns, and how interviewers evaluate.',
      difficulty: 'middle',
      prerequisites: [],
      contentPath: `${BASE}/01-lld-framework/topic.mdx`,
      sources: LLD_SOURCES['lld-framework'],
      questions: [
        { id: 'six-step-framework', prompt: 'The 6-step LLD framework: clarify → entities → relationships → class design → patterns → trade-offs.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/01-lld-framework/questions/q01-six-step-framework.mdx` },
        { id: 'clarifying-questions', prompt: 'What questions should you ALWAYS ask before designing?', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/01-lld-framework/questions/q02-clarifying-questions.mdx` },
        { id: 'scope-in-five-minutes', prompt: 'How do you scope a vague prompt in 5 minutes?', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/01-lld-framework/questions/q03-scope-in-five-minutes.mdx` },
        { id: 'code-vs-diagram', prompt: 'When should you write code vs draw diagrams? (Time budget.)', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/01-lld-framework/questions/q04-code-vs-diagram.mdx` },
        { id: 'anti-patterns', prompt: 'Common LLD anti-patterns: God class, premature patterns, ignoring concurrency.', difficulty: 'senior', tags: ['system-design', 'trick'], answerPath: `${BASE}/01-lld-framework/questions/q05-anti-patterns.mdx` },
        { id: 'evaluation-criteria', prompt: 'How do interviewers evaluate an LLD round?', difficulty: 'middle', tags: ['system-design', 'behavioral'], answerPath: `${BASE}/01-lld-framework/questions/q06-evaluation-criteria.mdx` },
      ],
    },
    {
      id: 'design-pattern-reference',
      title: 'Design Pattern Quick Reference (Applied)',
      summary:
        'The GoF patterns re-grouped by the LLD trigger that should make you reach for each one — Strategy, Factory, Builder, Observer, State, and the rest.',
      difficulty: 'middle',
      prerequisites: ['lld-framework'],
      contentPath: `${BASE}/02-design-pattern-reference/topic.mdx`,
      sources: LLD_SOURCES['design-pattern-reference'],
      questions: [
        { id: 'creational-triggers', prompt: 'Creational triggers: when to reach for Factory, Abstract Factory, Builder, Singleton.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/02-design-pattern-reference/questions/q01-creational-triggers.mdx` },
        { id: 'structural-triggers', prompt: 'Structural triggers: Decorator, Adapter, Proxy, Facade, Composite.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/02-design-pattern-reference/questions/q02-structural-triggers.mdx` },
        { id: 'behavioral-triggers', prompt: 'Behavioral triggers: Strategy, Observer, Template Method, Command, State, Chain of Responsibility.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/02-design-pattern-reference/questions/q03-behavioral-triggers.mdx` },
      ],
    },
    {
      id: 'concurrency-in-lld',
      title: 'Concurrency Considerations in LLD',
      summary:
        'When the LLD round expects thread-safe code, and the toolkit: synchronized, ReentrantLock, ReadWriteLock, ConcurrentHashMap, atomics, BlockingQueue, and immutability.',
      difficulty: 'senior',
      prerequisites: ['lld-framework'],
      contentPath: `${BASE}/03-concurrency-in-lld/topic.mdx`,
      sources: LLD_SOURCES['concurrency-in-lld'],
      questions: [
        { id: 'when-thread-safe', prompt: 'When does the interviewer expect thread-safety?', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/03-concurrency-in-lld/questions/q01-when-thread-safe.mdx` },
        { id: 'coarse-vs-fine-locking', prompt: 'Coarse-grained synchronized vs fine-grained locking — when to choose each?', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/03-concurrency-in-lld/questions/q02-coarse-vs-fine-locking.mdx` },
        { id: 'concurrent-collections', prompt: 'ConcurrentHashMap vs Collections.synchronizedMap, and the atomics/RW-lock toolkit.', difficulty: 'senior', tags: ['system-design'], answerPath: `${BASE}/03-concurrency-in-lld/questions/q03-concurrent-collections.mdx` },
        { id: 'thread-safe-singleton', prompt: 'How to design thread-safe Singletons (the four common ways) and double-checked locking.', difficulty: 'senior', tags: ['system-design', 'trick'], answerPath: `${BASE}/03-concurrency-in-lld/questions/q04-thread-safe-singleton.mdx` },
      ],
    },
    {
      id: 'parking-lot',
      title: 'Design a Parking Lot',
      summary:
        'The most common LLD problem worldwide. Multi-floor lot, typed spots and vehicles, ticketing, pricing strategy, and availability notifications.',
      difficulty: 'middle',
      prerequisites: ['lld-framework', 'design-pattern-reference'],
      contentPath: `${BASE}/04-parking-lot/topic.mdx`,
      sources: LLD_SOURCES['parking-lot'],
      questions: [
        { id: 'solution', prompt: 'Design a parking lot — full class-level solution.', difficulty: 'middle', tags: ['system-design'], askedAt: ['Amazon', 'EPAM', 'Uber'], answerPath: `${BASE}/04-parking-lot/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'elevator-system',
      title: 'Design an Elevator System',
      summary:
        'Scheduling strategies (FCFS, SCAN, LOOK, nearest-car), elevator state machine, button commands, and multi-car controllers.',
      difficulty: 'senior',
      prerequisites: ['parking-lot'],
      contentPath: `${BASE}/05-elevator-system/topic.mdx`,
      sources: LLD_SOURCES['elevator-system'],
      questions: [
        { id: 'solution', prompt: 'Design an elevator system — full class-level solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon', 'Uber'], answerPath: `${BASE}/05-elevator-system/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'library-management',
      title: 'Design a Library Management System',
      summary:
        'Books vs book-items (copies), members, loans and reservations, fine calculation, and overdue notifications.',
      difficulty: 'middle',
      prerequisites: ['parking-lot'],
      contentPath: `${BASE}/06-library-management/topic.mdx`,
      sources: LLD_SOURCES['library-management'],
      questions: [
        { id: 'solution', prompt: 'Design a library management system — full class-level solution.', difficulty: 'middle', tags: ['system-design'], askedAt: ['EPAM'], answerPath: `${BASE}/06-library-management/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'vending-machine',
      title: 'Design a Vending Machine',
      summary:
        'The classic State-pattern problem: Idle / HasMoney / Dispensing / OutOfStock states, payment strategy, and inventory.',
      difficulty: 'middle',
      prerequisites: ['design-pattern-reference'],
      contentPath: `${BASE}/07-vending-machine/topic.mdx`,
      sources: LLD_SOURCES['vending-machine'],
      questions: [
        { id: 'solution', prompt: 'Design a vending machine — full class-level solution (State pattern).', difficulty: 'middle', tags: ['system-design'], askedAt: ['Amazon', 'EPAM'], answerPath: `${BASE}/07-vending-machine/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'tic-tac-toe-chess',
      title: 'Design a Tic-Tac-Toe / Chess Game',
      summary:
        'Polymorphic piece movement, board modeling, move validation per piece, undo via Command, and the game state machine.',
      difficulty: 'senior',
      prerequisites: ['design-pattern-reference'],
      contentPath: `${BASE}/08-tic-tac-toe-chess/topic.mdx`,
      sources: LLD_SOURCES['tic-tac-toe-chess'],
      questions: [
        { id: 'solution', prompt: 'Design a tic-tac-toe / chess game — full class-level solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon', 'Google'], answerPath: `${BASE}/08-tic-tac-toe-chess/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'snake-and-ladder',
      title: 'Design a Snake & Ladder Game',
      summary:
        'Board, snakes/ladders, dice strategy, players, and the turn loop — a compact warm-up problem.',
      difficulty: 'middle',
      prerequisites: ['design-pattern-reference'],
      contentPath: `${BASE}/09-snake-and-ladder/topic.mdx`,
      sources: LLD_SOURCES['snake-and-ladder'],
      questions: [
        { id: 'solution', prompt: 'Design a snake & ladder game — full class-level solution.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/09-snake-and-ladder/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'atm',
      title: 'Design an ATM',
      summary:
        'ATM state machine, transactions as commands for logging/replay, denomination dispensing via Chain of Responsibility, and bank integration.',
      difficulty: 'senior',
      prerequisites: ['vending-machine'],
      contentPath: `${BASE}/10-atm/topic.mdx`,
      sources: LLD_SOURCES['atm'],
      questions: [
        { id: 'solution', prompt: 'Design an ATM — full class-level solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon', 'EPAM'], answerPath: `${BASE}/10-atm/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'movie-ticket-booking',
      title: 'Design a Movie Ticket Booking System (BookMyShow)',
      summary:
        'Cinemas, shows, seats, and the central concurrency challenge: two users booking the same seat. Optimistic vs pessimistic locking and seat-hold TTL.',
      difficulty: 'senior',
      prerequisites: ['concurrency-in-lld'],
      contentPath: `${BASE}/11-movie-ticket-booking/topic.mdx`,
      sources: LLD_SOURCES['movie-ticket-booking'],
      questions: [
        { id: 'solution', prompt: 'Design a movie ticket booking system — full class-level solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Amazon', 'Google'], answerPath: `${BASE}/11-movie-ticket-booking/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'ride-sharing',
      title: 'Design a Ride-Sharing System (Uber / Ola)',
      summary:
        'Rider/driver model, ride state machine, surge-pricing and matching strategies — the LLD slice of a hybrid LLD/HLD problem.',
      difficulty: 'senior',
      prerequisites: ['concurrency-in-lld'],
      contentPath: `${BASE}/12-ride-sharing/topic.mdx`,
      sources: LLD_SOURCES['ride-sharing'],
      questions: [
        { id: 'solution', prompt: 'Design a ride-sharing system (class level) — full solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Uber'], answerPath: `${BASE}/12-ride-sharing/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'logger-library',
      title: 'Design a Logger Library (like Log4j / SLF4J)',
      summary:
        'The pattern-composition showcase: Chain of Responsibility, Strategy, Singleton, Observer, and Decorator combined into one logging framework.',
      difficulty: 'senior',
      prerequisites: ['design-pattern-reference', 'concurrency-in-lld'],
      contentPath: `${BASE}/13-logger-library/topic.mdx`,
      sources: LLD_SOURCES['logger-library'],
      questions: [
        { id: 'solution', prompt: 'Design a logger library — full class-level solution (5+ patterns).', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/13-logger-library/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'rate-limiter',
      title: 'Design a Rate Limiter',
      summary:
        'Token Bucket, Leaky Bucket, Fixed Window, Sliding Window Log/Counter — the algorithms in depth, behind a Strategy interface. The highest-leverage senior problem.',
      difficulty: 'senior',
      prerequisites: ['concurrency-in-lld'],
      contentPath: `${BASE}/14-rate-limiter/topic.mdx`,
      sources: LLD_SOURCES['rate-limiter'],
      questions: [
        { id: 'solution', prompt: 'Design a rate limiter — full class-level solution with the four algorithms.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Amazon', 'Stripe'], answerPath: `${BASE}/14-rate-limiter/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'lru-lfu-cache',
      title: 'Design an LRU / LFU Cache',
      summary:
        'O(1) LRU via HashMap + doubly-linked list, and the harder O(1) LFU via frequency lists plus a minFreq pointer. Eviction as a Strategy.',
      difficulty: 'senior',
      prerequisites: ['concurrency-in-lld'],
      contentPath: `${BASE}/15-lru-lfu-cache/topic.mdx`,
      sources: LLD_SOURCES['lru-lfu-cache'],
      questions: [
        { id: 'solution', prompt: 'Design an LRU and LFU cache — full class-level solution.', difficulty: 'senior', tags: ['system-design', 'big-tech'], askedAt: ['Amazon', 'Google', 'Meta'], answerPath: `${BASE}/15-lru-lfu-cache/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'pub-sub',
      title: 'Design a Pub/Sub System (in-memory)',
      summary:
        'Broker, topics, publishers/subscribers, concurrent delivery, delivery semantics, and backpressure — the in-memory precursor to Kafka.',
      difficulty: 'senior',
      prerequisites: ['concurrency-in-lld'],
      contentPath: `${BASE}/16-pub-sub/topic.mdx`,
      sources: LLD_SOURCES['pub-sub'],
      questions: [
        { id: 'solution', prompt: 'Design an in-memory pub/sub system — full class-level solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/16-pub-sub/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'url-shortener',
      title: 'Design a URL Shortener (LLD slice)',
      summary:
        'Encoding strategies (base62 vs hash vs counter), the class model, and collision handling. Scaling is deferred to the HLD module.',
      difficulty: 'middle',
      prerequisites: ['design-pattern-reference'],
      contentPath: `${BASE}/17-url-shortener/topic.mdx`,
      sources: LLD_SOURCES['url-shortener'],
      questions: [
        { id: 'solution', prompt: 'Design a URL shortener (class level) — full solution.', difficulty: 'middle', tags: ['system-design'], askedAt: ['EPAM'], answerPath: `${BASE}/17-url-shortener/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'notification-system',
      title: 'Design a Notification System',
      summary:
        'Channel abstraction (Email/SMS/Push/InApp), templates, retry policy, and channel fallback via Chain of Responsibility.',
      difficulty: 'senior',
      prerequisites: ['design-pattern-reference'],
      contentPath: `${BASE}/18-notification-system/topic.mdx`,
      sources: LLD_SOURCES['notification-system'],
      questions: [
        { id: 'solution', prompt: 'Design a notification system — full class-level solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Amazon'], answerPath: `${BASE}/18-notification-system/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'file-system',
      title: 'Design a File System (in-memory)',
      summary:
        'The Composite-pattern problem: directories contain files and directories. mkdir/touch/ls/cd/rm/mv/cp over an in-memory tree.',
      difficulty: 'senior',
      prerequisites: ['design-pattern-reference'],
      contentPath: `${BASE}/19-file-system/topic.mdx`,
      sources: LLD_SOURCES['file-system'],
      questions: [
        { id: 'solution', prompt: 'Design an in-memory file system — full class-level solution.', difficulty: 'senior', tags: ['system-design'], askedAt: ['Google', 'Amazon'], answerPath: `${BASE}/19-file-system/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'scheduler',
      title: 'Design a Stopwatch / Task Scheduler',
      summary:
        'Clocks, timers, scheduled tasks, and scheduling strategies (FIFO, priority, cron) with tasks modeled as commands.',
      difficulty: 'middle',
      prerequisites: ['design-pattern-reference'],
      contentPath: `${BASE}/20-scheduler/topic.mdx`,
      sources: LLD_SOURCES['scheduler'],
      questions: [
        { id: 'solution', prompt: 'Design a task scheduler / stopwatch — full class-level solution.', difficulty: 'middle', tags: ['system-design'], answerPath: `${BASE}/20-scheduler/questions/q01-solution.mdx` },
      ],
    },
    {
      id: 'how-to-practice-lld',
      title: 'How to Practice LLD',
      summary:
        'How many problems to solve, the internalizable template, 45-minute time-boxing, common mistakes, and how to signal senior.',
      difficulty: 'middle',
      prerequisites: ['lld-framework'],
      contentPath: `${BASE}/21-how-to-practice-lld/topic.mdx`,
      sources: LLD_SOURCES['how-to-practice-lld'],
      questions: [
        { id: 'practice-plan', prompt: 'How many problems, what template, and what practice schedule gets you ready?', difficulty: 'middle', tags: ['behavioral', 'system-design'], answerPath: `${BASE}/21-how-to-practice-lld/questions/q01-practice-plan.mdx` },
        { id: 'time-boxing-and-signals', prompt: 'How to time-box 45 minutes and signal senior-level depth.', difficulty: 'senior', tags: ['behavioral', 'system-design'], answerPath: `${BASE}/21-how-to-practice-lld/questions/q02-time-boxing-and-signals.mdx` },
      ],
    },
  ],
};
