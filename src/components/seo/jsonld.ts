import type { Module, Question, Topic, Track } from '@/content/types';
import { SITE_NAME, SITE_URL } from './Seo';

/** schema.org JSON-LD builders. All URLs are absolute against SITE_URL. */

const abs = (path: string) => `${SITE_URL}${path}`;

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function webSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Free Java backend interview preparation: structured topics and answers across Collections, OOP, PostgreSQL, Spring, algorithms, and system design.',
  };
}

/** ItemList of modules for the landing / track pages. */
export function moduleItemList(trackId: string, modules: Module[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: modules.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.title,
      url: abs(`/track/${trackId}/module/${m.id}`),
    })),
  };
}

export function course(track: Track) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: track.title,
    description: track.description,
    url: abs(`/track/${track.id}`),
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    hasCourseInstance: track.modules.map((m) => ({
      '@type': 'CourseInstance',
      name: m.title,
      description: m.description,
      courseMode: 'online',
      url: abs(`/track/${track.id}/module/${m.id}`),
    })),
  };
}

/** ItemList of a module's topics. */
export function topicItemList(trackId: string, moduleId: string, topics: Topic[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: topics.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: abs(`/track/${trackId}/module/${moduleId}/topic/${t.id}`),
    })),
  };
}

/**
 * Q&A page for an interview question. The accepted-answer text is the question's
 * topic summary (the raw answer is an MDX component, not plain text at this layer);
 * this is an honest, non-fabricated summary suitable for the answer snippet.
 */
export function qaPage(question: Question, topic: Topic, canonicalPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question.prompt,
      text: question.prompt,
      url: abs(canonicalPath),
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: topic.summary,
        url: abs(canonicalPath),
      },
    },
  };
}
