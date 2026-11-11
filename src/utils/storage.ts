import type { UserProgress, ExamResult } from '../types';

const STORAGE_KEY = 'd3_gail_study_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  bookmarkedQuestionIds: [],
  masteredTopicIds: [],
  notes: {},
  examResults: [],
  lastVisitedTab: 'notebook',
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
    };
  } catch (e) {
    console.error('Failed to load user progress from localStorage', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress to localStorage', e);
  }
}

export function toggleBookmarkQuestion(questionId: string): boolean {
  const current = loadUserProgress();
  const exists = current.bookmarkedQuestionIds.includes(questionId);
  const updatedBookmarks = exists
    ? current.bookmarkedQuestionIds.filter((id) => id !== questionId)
    : [...current.bookmarkedQuestionIds, questionId];
  saveUserProgress({ ...current, bookmarkedQuestionIds: updatedBookmarks });
  return !exists;
}

export function toggleMasterTopic(topicId: string): boolean {
  const current = loadUserProgress();
  const exists = current.masteredTopicIds.includes(topicId);
  const updated = exists
    ? current.masteredTopicIds.filter((id) => id !== topicId)
    : [...current.masteredTopicIds, topicId];
  saveUserProgress({ ...current, masteredTopicIds: updated });
  return !exists;
}

export function savePersonalNote(targetId: string, noteText: string): void {
  const current = loadUserProgress();
  const updatedNotes = { ...current.notes, [targetId]: noteText };
  saveUserProgress({ ...current, notes: updatedNotes });
}

export function recordExamResult(result: ExamResult): void {
  const current = loadUserProgress();
  const updatedResults = [result, ...current.examResults];
  saveUserProgress({ ...current, examResults: updatedResults });
}

export function clearAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
}
