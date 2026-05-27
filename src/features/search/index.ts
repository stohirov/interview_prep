import Fuse from 'fuse.js';
import { allQuestions, allTopics } from '@/content/loader';
import type { Question, Topic } from '@/content/types';

export interface SearchResult {
  kind: 'question' | 'topic';
  trackId: string;
  moduleId: string;
  topicId: string;
  topic: Topic;
  question?: Question;
  score: number;
}

interface QuestionIndexRow {
  trackId: string;
  moduleId: string;
  topicId: string;
  topic: Topic;
  question: Question;
  prompt: string;
  tags: string;
  askedAt: string;
}

interface TopicIndexRow {
  trackId: string;
  moduleId: string;
  topicId: string;
  topic: Topic;
  title: string;
  summary: string;
}

const questionRows: QuestionIndexRow[] = allQuestions().map((q) => ({
  trackId: q.trackId,
  moduleId: q.moduleId,
  topicId: q.topicId,
  topic: q.topic,
  question: q.question,
  prompt: q.question.prompt,
  tags: q.question.tags.join(' '),
  askedAt: (q.question.askedAt ?? []).join(' '),
}));

const topicRows: TopicIndexRow[] = allTopics().map((t) => ({
  trackId: t.trackId,
  moduleId: t.moduleId,
  topicId: t.topic.id,
  topic: t.topic,
  title: t.topic.title,
  summary: t.topic.summary,
}));

const questionFuse = new Fuse<QuestionIndexRow>(questionRows, {
  keys: [
    { name: 'prompt', weight: 0.7 },
    { name: 'tags', weight: 0.15 },
    { name: 'askedAt', weight: 0.15 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
});

const topicFuse = new Fuse<TopicIndexRow>(topicRows, {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'summary', weight: 0.4 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
});

export function search(query: string, limit = 40): SearchResult[] {
  if (!query.trim()) return [];
  const out: SearchResult[] = [];
  for (const r of topicFuse.search(query, { limit: 10 })) {
    out.push({
      kind: 'topic',
      trackId: r.item.trackId,
      moduleId: r.item.moduleId,
      topicId: r.item.topicId,
      topic: r.item.topic,
      score: r.score ?? 1,
    });
  }
  for (const r of questionFuse.search(query, { limit })) {
    out.push({
      kind: 'question',
      trackId: r.item.trackId,
      moduleId: r.item.moduleId,
      topicId: r.item.topicId,
      topic: r.item.topic,
      question: r.item.question,
      score: r.score ?? 1,
    });
  }
  return out.sort((a, b) => a.score - b.score).slice(0, limit);
}
