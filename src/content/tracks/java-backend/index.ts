import type { Track } from '../../types';
import { collectionsModule } from './collections';
import { oopModule } from './oop';

export const javaBackendTrack: Track = {
  id: 'java-backend',
  title: 'Java Backend Interview Prep',
  description:
    'Production-grade Java preparation: Collections and OOP deep-dives today, with Concurrency, JVM, Spring, System Design and DSA modules slotting into the same scaffold.',
  modules: [collectionsModule, oopModule],
};
