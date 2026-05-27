import { describe, it, expect } from 'vitest';
import {
  tracks,
  getTrack,
  getModule,
  getTopic,
  getQuestion,
  allQuestions,
  allTopics,
  allSources,
  groupSourcesByType,
} from './loader';

describe('content loader', () => {
  it('exposes at least the java-backend track', () => {
    expect(tracks.length).toBeGreaterThan(0);
    expect(getTrack('java-backend')?.id).toBe('java-backend');
  });

  it('exposes the collections module', () => {
    const mod = getModule('java-backend', 'collections');
    expect(mod).toBeDefined();
    expect(mod?.topics.length).toBe(15);
  });

  it('every topic has a contentPath, sources, and at least one question', () => {
    const mod = getModule('java-backend', 'collections')!;
    for (const topic of mod.topics) {
      expect(topic.contentPath, `topic ${topic.id} contentPath`).toBeTruthy();
      expect(topic.sources.length, `topic ${topic.id} sources`).toBeGreaterThan(0);
      expect(topic.questions.length, `topic ${topic.id} questions`).toBeGreaterThan(0);
    }
  });

  it('every question has an answerPath', () => {
    for (const { question } of allQuestions()) {
      expect(question.answerPath).toBeTruthy();
      expect(question.answerPath).toMatch(/\.mdx$/);
    }
  });

  it('question IDs are unique within their topic', () => {
    for (const { topic } of allTopics()) {
      const ids = topic.questions.map((q) => q.id);
      expect(new Set(ids).size, `topic ${topic.id}`).toBe(ids.length);
    }
  });

  it('getTopic returns the right topic', () => {
    const topic = getTopic('java-backend', 'collections', 'map-hashmap-internals');
    expect(topic?.title).toMatch(/HashMap/);
  });

  it('getQuestion returns question + topic', () => {
    const result = getQuestion('java-backend', 'collections', 'map-hashmap-internals', 'put-walkthrough');
    expect(result?.question.prompt).toMatch(/put/i);
    expect(result?.topic.id).toBe('map-hashmap-internals');
  });

  it('returns undefined for unknown IDs', () => {
    expect(getTrack('nope')).toBeUndefined();
    expect(getModule('java-backend', 'nope')).toBeUndefined();
    expect(getTopic('java-backend', 'collections', 'nope')).toBeUndefined();
    expect(getQuestion('java-backend', 'collections', 'map-hashmap-internals', 'nope')).toBeUndefined();
  });

  it('every source has authoritative type marked correctly', () => {
    for (const { source } of allSources()) {
      if (['javadoc', 'spec', 'jep', 'official-docs', 'tutorial'].includes(source.type)) {
        expect(source.authoritative, `${source.url} should be authoritative`).toBe(true);
      }
    }
  });

  it('every source has a description', () => {
    const missing = allSources().filter(({ source }) => !source.description?.trim());
    expect(missing.map((s) => s.source.url)).toEqual([]);
  });

  it('groupSourcesByType groups and orders sources', () => {
    const topic = getTopic('java-backend', 'collections', 'map-hashmap-internals')!;
    const groups = groupSourcesByType(topic.sources);
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0].items.length).toBeGreaterThan(0);
  });

  it('uses Java 25 Javadoc URLs consistently', () => {
    for (const { source } of allSources()) {
      if (source.type === 'javadoc' || (source.type === 'official-docs' && source.url.includes('/docs/api/'))) {
        expect(source.url, source.title).toMatch(/\/javase\/25\//);
      }
    }
  });
});
