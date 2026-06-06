import type { Track } from '../../types';
import { collectionsModule } from './collections';
import { oopModule } from './oop';
import { postgresqlModule } from './postgresql';
import { springModule } from './spring';
import { dsaModule } from './dsa';
import { lowLevelDesignModule } from './low-level-design';
import { highLevelDesignModule } from './high-level-design';

export const javaBackendTrack: Track = {
  id: 'java-backend',
  title: 'Java Backend Interview Prep',
  description:
    'Production-grade Java preparation: Collections, OOP, PostgreSQL, and Spring deep-dives, plus Data Structures & Algorithms, Low-Level Design, and High-Level Design — with Concurrency and JVM modules slotting into the same scaffold.',
  modules: [
    collectionsModule,
    oopModule,
    postgresqlModule,
    springModule,
    dsaModule,
    lowLevelDesignModule,
    highLevelDesignModule,
  ],
};
