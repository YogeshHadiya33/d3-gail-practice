export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface PracticeQuestion {
  id: string;
  sectionId: string;
  topicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  whyOthersWrong: string[];
  officialDoc?: string;
  difficulty: QuestionDifficulty;
}

export interface StudyTopicQA {
  question: string;
  answer: string;
  officialSource?: string;
}

export interface StudyTopic {
  id: string;
  title: string;
  subtitle?: string;
  estimatedMinutes?: number;
  overview?: string;
  keyTakeaways?: string[];
  examTips?: string[];
  trapAlerts?: string[];
  handwrittenNote?: string;
  studyQA?: StudyTopicQA[];
  referenceLinks?: { title: string; url: string }[];
}

export interface ExamSection {
  id: string;
  title: string;
  weight: number;
  description: string;
  officialObjective: string;
  topics: StudyTopic[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  examRelevance?: string;
}

export interface ExamAnswerRecord {
  questionId: string;
  selectedOption: number | null;
  isCorrect: boolean;
  timeSpentSeconds: number;
  flagged: boolean;
  eliminatedOptions?: number[];
}

export interface ExamResult {
  id: string;
  timestamp: string;
  mode: 'full' | 'domain' | 'weak';
  domainId?: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  passed: boolean;
  durationSeconds: number;
  domainScores: {
    sectionId: string;
    sectionTitle: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
  answers: ExamAnswerRecord[];
}

export interface UserProgress {
  bookmarkedQuestionIds: string[];
  masteredTopicIds: string[];
  notes: Record<string, string>; // topicId or questionId -> personal note
  examResults: ExamResult[];
  lastVisitedTab: string;
}

