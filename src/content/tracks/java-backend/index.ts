import type { Track } from '../../types';
import { collectionsModule } from './collections';
import { oopModule } from './oop';
import { postgresqlModule } from './postgresql';
import { springModule } from './spring';

export const javaBackendTrack: Track = {
  id: 'java-backend',
  title: 'Java Backend Interview Prep',
  description:
    'Production-grade Java preparation: Collections, OOP, PostgreSQL, and Spring deep-dives, with Concurrency, JVM, System Design and DSA modules slotting into the same scaffold.',
  modules: [collectionsModule, oopModule, postgresqlModule, springModule],
};
