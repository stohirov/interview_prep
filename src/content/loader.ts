import type { ComponentType } from 'react';
import type { Track, Module, Topic, Question, Source, SourceType } from './types';
import { javaBackendTrack } from './tracks/java-backend';

const topicModules = import.meta.glob('./tracks/**/topics/**/topic.mdx', {
  eager: true,
}) as Record<string, { default: ComponentType<Record<string, unknown>> }>;

const answerModules = import.meta.glob('./tracks/**/questions/**/*.mdx', {
  eager: true,
}) as Record<string, { default: ComponentType<Record<string, unknown>> }>;

function normalize(p: string): string {
  return p.replace(/^\.\//, '').replace(/^src\/content\//, '');
}

const topicByPath = new Map<string, ComponentType<Record<string, unknown>>>();
for (const [path, mod] of Object.entries(topicModules)) {
  topicByPath.set(normalize(path), mod.default);
}

const answerByPath = new Map<string, ComponentType<Record<string, unknown>>>();
for (const [path, mod] of Object.entries(answerModules)) {
  answerByPath.set(normalize(path), mod.default);
}

export function loadTopicComponent(contentPath: string): ComponentType<Record<string, unknown>> | undefined {
  return topicByPath.get(normalize(contentPath));
}

export function loadAnswerComponent(answerPath: string): ComponentType<Record<string, unknown>> | undefined {
  return answerByPath.get(normalize(answerPath));
}

export const tracks: Track[] = [javaBackendTrack];

export function getTrack(trackId: string): Track | undefined {
  return tracks.find((t) => t.id === trackId);
}

export function getModule(trackId: string, moduleId: string): Module | undefined {
  return getTrack(trackId)?.modules.find((m) => m.id === moduleId);
}

export function getTopic(trackId: string, moduleId: string, topicId: string): Topic | undefined {
  return getModule(trackId, moduleId)?.topics.find((t) => t.id === topicId);
}

export function getQuestion(
  trackId: string,
  moduleId: string,
  topicId: string,
  questionId: string,
): { question: Question; topic: Topic } | undefined {
  const topic = getTopic(trackId, moduleId, topicId);
  if (!topic) return undefined;
  const question = topic.questions.find((q) => q.id === questionId);
  if (!question) return undefined;
  return { question, topic };
}

export interface QuestionWithLocation {
  trackId: string;
  moduleId: string;
  topicId: string;
  topic: Topic;
  question: Question;
}

export function allQuestions(): QuestionWithLocation[] {
  const out: QuestionWithLocation[] = [];
  for (const track of tracks) {
    for (const mod of track.modules) {
      for (const topic of mod.topics) {
        for (const question of topic.questions) {
          out.push({
            trackId: track.id,
            moduleId: mod.id,
            topicId: topic.id,
            topic,
            question,
          });
        }
      }
    }
  }
  return out;
}

export interface TopicWithLocation {
  trackId: string;
  moduleId: string;
  topic: Topic;
}

export function allTopics(): TopicWithLocation[] {
  const out: TopicWithLocation[] = [];
  for (const track of tracks) {
    for (const mod of track.modules) {
      for (const topic of mod.topics) {
        out.push({ trackId: track.id, moduleId: mod.id, topic });
      }
    }
  }
  return out;
}

export interface SourceWithLocation {
  source: Source;
  trackId: string;
  moduleId: string;
  topicId: string;
  topicTitle: string;
}

export function allSources(): SourceWithLocation[] {
  const seen = new Set<string>();
  const out: SourceWithLocation[] = [];
  for (const track of tracks) {
    for (const mod of track.modules) {
      for (const topic of mod.topics) {
        for (const source of topic.sources) {
          const key = `${topic.id}::${source.url}`;
          if (seen.has(key)) continue;
          seen.add(key);
          out.push({
            source,
            trackId: track.id,
            moduleId: mod.id,
            topicId: topic.id,
            topicTitle: topic.title,
          });
        }
      }
    }
  }
  return out;
}

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  javadoc: 'Javadoc',
  spec: 'Spec',
  jep: 'JEP',
  tutorial: 'Tutorial',
  'official-docs': 'Official Docs',
  'book': 'Book',
  article: 'Article',
  video: 'Video',
};

export const SOURCE_TYPE_ORDER: SourceType[] = [
  'javadoc',
  'spec',
  'jep',
  'official-docs',
  'tutorial',
  'book',
  'article',
  'video',
];

export function groupSourcesByType(sources: Source[]): Array<{ type: SourceType; items: Source[] }> {
  const buckets = new Map<SourceType, Source[]>();
  for (const s of sources) {
    const list = buckets.get(s.type) ?? [];
    list.push(s);
    buckets.set(s.type, list);
  }
  for (const list of buckets.values()) {
    list.sort((a, b) => {
      const ao = a.recommendedReadingOrder ?? 999;
      const bo = b.recommendedReadingOrder ?? 999;
      return ao - bo;
    });
  }
  const groups: Array<{ type: SourceType; items: Source[] }> = [];
  for (const t of SOURCE_TYPE_ORDER) {
    const items = buckets.get(t);
    if (items?.length) groups.push({ type: t, items });
  }
  return groups;
}
