export type Difficulty = 'junior' | 'middle' | 'senior';

export type QuestionTag =
  | 'theory'
  | 'coding'
  | 'system-design'
  | 'behavioral'
  | 'trick'
  | 'big-tech';

export type SourceType =
  | 'official-docs'
  | 'javadoc'
  | 'jep'
  | 'tutorial'
  | 'spec'
  | 'book'
  | 'article'
  | 'video';

export interface Source {
  title: string;
  url: string;
  type: SourceType;
  authoritative: boolean;
  description?: string;
  recommendedReadingOrder?: number;
}

export interface Question {
  id: string;
  prompt: string;
  difficulty: Difficulty;
  tags: QuestionTag[];
  askedAt?: string[];
  answerPath: string;
  followUps?: string[];
  sources?: Source[];
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  prerequisites: string[];
  contentPath: string;
  questions: Question[];
  sources: Source[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  topics: Topic[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export type ProgressStatus = 'unseen' | 'got-it' | 'review' | 'didnt-know';

export interface ProgressEntry {
  questionId: string;
  status: ProgressStatus;
  updatedAt: number;
}
