import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { PRACTICE_QUESTIONS, EXAM_SECTIONS } from '../data/exam-data';
import type { PracticeQuestion, ExamResult, UserProgress } from '../types';
import { recordExamResult, toggleBookmarkQuestion } from '../utils/storage';
import {
  Award,
  Clock,
  Flag,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ExternalLink,
  Strikethrough,
} from 'lucide-react';

interface MockExamProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const MockExam: React.FC<MockExamProps> = ({
  progress,
  onProgressUpdate,
}) => {
  // Exam phases: 'setup' | 'running' | 'results'
  const [phase, setPhase] = useState<'setup' | 'running' | 'results'>('setup');
  const [examMode, setExamMode] = useState<'full' | 'domain' | 'weak'>('full');
  const [selectedDomain, setSelectedDomain] = useState<string>('fundamentals');

  // Exam session state
  const [examQuestions, setExamQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string, number[]>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(90 * 60);
  const [startTime, setStartTime] = useState<number>(0);

  // Completed exam result
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const timerRef = useRef<any>(null);
  const finishExamRef = useRef<() => void>(() => {});

  // Timer countdown
  useEffect(() => {
    if (phase === 'running') {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishExamRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const startExam = (mode: 'full' | 'domain' | 'weak') => {
    let pool: PracticeQuestion[] = [];

    if (mode === 'full') {
      const d1 = PRACTICE_QUESTIONS.filter((q) => q.sectionId === 'fundamentals').sort(() => 0.5 - Math.random()).slice(0, 16);
      const d2 = PRACTICE_QUESTIONS.filter((q) => q.sectionId === 'google-cloud-offerings').sort(() => 0.5 - Math.random()).slice(0, 19);
      const d3 = PRACTICE_QUESTIONS.filter((q) => q.sectionId === 'improve-output').sort(() => 0.5 - Math.random()).slice(0, 11);
      const d4 = PRACTICE_QUESTIONS.filter((q) => q.sectionId === 'business-strategies').sort(() => 0.5 - Math.random()).slice(0, 9);
      pool = [...d1, ...d2, ...d3, ...d4].sort(() => 0.5 - Math.random());
      setSecondsRemaining(90 * 60);
    } else if (mode === 'domain') {
      pool = PRACTICE_QUESTIONS.filter((q) => q.sectionId === selectedDomain).sort(() => 0.5 - Math.random()).slice(0, 15);
      setSecondsRemaining(25 * 60);
    } else {
      const incorrectIds = new Set<string>();
      progress.examResults.forEach((r) => {
        r.answers.forEach((ans) => {
          if (!ans.isCorrect) incorrectIds.add(ans.questionId);
        });
      });

      const weakPool = PRACTICE_QUESTIONS.filter((q) => incorrectIds.has(q.id));
      if (weakPool.length === 0) {
        pool = PRACTICE_QUESTIONS.slice(0, 15);
      } else {
        pool = weakPool.sort(() => 0.5 - Math.random()).slice(0, 20);
      }
      setSecondsRemaining(Math.min(pool.length * 90, 60 * 60));
    }

    setExamQuestions(pool);
    setUserAnswers({});
    setFlaggedQuestions({});
    setEliminatedOptions({});
    setCurrentIndex(0);
    setExamMode(mode);
    setStartTime(Date.now());
    setPhase('running');
  };

  const selectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleEliminate = (questionId: string, optionIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEliminatedOptions((prev) => {
      const current = prev[questionId] || [];
      const exists = current.includes(optionIndex);
      const updated = exists ? current.filter((i) => i !== optionIndex) : [...current, optionIndex];
      return { ...prev, [questionId]: updated };
    });
  };

  const finishExam = () => {
    const duration = Math.round((Date.now() - startTime) / 1000);
    let correct = 0;

    const answerRecords = examQuestions.map((q) => {
      const selected = userAnswers[q.id] !== undefined ? userAnswers[q.id] : null;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correct += 1;
      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        timeSpentSeconds: Math.round(duration / Math.max(1, examQuestions.length)),
        flagged: !!flaggedQuestions[q.id],
        eliminatedOptions: eliminatedOptions[q.id] || [],
      };
    });

    const scorePercentage = Math.round((correct / examQuestions.length) * 100);
    const passed = scorePercentage >= 75;

    // Domain breakdown
    const domainMap: Record<string, { correct: number; total: number; title: string }> = {};
    EXAM_SECTIONS.forEach((s) => {
      domainMap[s.id] = { correct: 0, total: 0, title: s.title };
    });

    examQuestions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.correctIndex;
      if (!domainMap[q.sectionId]) {
        domainMap[q.sectionId] = { correct: 0, total: 0, title: q.sectionId };
      }
      domainMap[q.sectionId].total += 1;
      if (isCorrect) domainMap[q.sectionId].correct += 1;
    });

    const domainScores = Object.entries(domainMap)
      .filter(([, data]) => data.total > 0)
      .map(([sId, data]) => ({
        sectionId: sId,
        sectionTitle: data.title,
        correct: data.correct,
        total: data.total,
        percentage: Math.round((data.correct / data.total) * 100),
      }));

    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      timestamp: new Date().toISOString(),
      mode: examMode,
      totalQuestions: examQuestions.length,
      correctCount: correct,
      scorePercentage,
      passed,
      durationSeconds: duration,
      domainScores,
      answers: answerRecords,
    };

    recordExamResult(result);
    onProgressUpdate({
      ...progress,
      examResults: [result, ...progress.examResults],
    });

    setLatestResult(result);
    setPhase('results');
    setShowConfirmModal(false);

    if (passed) {
      triggerConfetti();
    }
  };

  useEffect(() => {
    finishExamRef.current = finishExam;
  });

  const handleBookmark = (qId: string) => {
    const nowSaved = toggleBookmarkQuestion(qId);
    const updatedIds = nowSaved
      ? [...progress.bookmarkedQuestionIds, qId]
      : progress.bookmarkedQuestionIds.filter((id) => id !== qId);
    onProgressUpdate({ ...progress, bookmarkedQuestionIds: updatedIds });
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIndex];

  // ==========================================
  // PHASE 1: SETUP SCREEN
  // ==========================================
  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        <div className="retro-card p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-zinc-900 text-white rounded-lg border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B]">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="pixel-badge pixel-badge-green">OFFICIAL SIMULATOR</span>
                <span className="font-['Courier_Prime'] text-xs text-zinc-500">D3 GAIL Preparation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1 flex items-center gap-2">
                <span>🎯</span> Mock Exam Simulator
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                Experience the authentic certification testing format. Questions are weighted strictly across all 4 domains with 90-minute timing and official 75% passing mark.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Full Simulation */}
          <div className="retro-card p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-zinc-900 text-white text-[9px] font-['Silkscreen'] px-3 py-1 rounded-bl-lg font-bold">
              OFFICIAL 90M
            </div>
            <div className="space-y-3">
              <span className="pixel-badge pixel-badge-blue">FULL LENGTH</span>
              <h3 className="font-sans font-bold text-lg text-zinc-900">
                Official 55-Question Exam
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Full 55-question simulated exam weighted across all 4 domains: Fundamentals (30%), Offerings (35%), Output (20%), Strategy (15%).
              </p>
              <div className="space-y-1 text-xs font-['Courier_Prime'] text-zinc-700 pt-2 border-t-2 border-zinc-200">
                <div>⏱️ Time Limit: 90 Minutes</div>
                <div>🎯 Passing Score: 75%</div>
                <div>🚩 Flag for Review & Strike-out</div>
              </div>
            </div>

            <button
              onClick={() => startExam('full')}
              className="retro-btn-dark mt-6 w-full py-2.5 text-xs font-bold font-['Silkscreen']"
            >
              START 55-Q EXAM (90M)
            </button>
          </div>

          {/* Card 2: Domain Sprint */}
          <div className="retro-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="pixel-badge pixel-badge-amber">TARGETED SPRINT</span>
              <h3 className="font-sans font-bold text-lg text-zinc-900">
                Domain Sprint (15 Qs)
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Quick 15-question focused quiz on a specific domain to sharpen your weak spots.
              </p>

              <div className="pt-2">
                <label className="block text-[10px] font-['Silkscreen'] uppercase font-bold text-zinc-600 mb-1">
                  Choose Domain:
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full p-2 rounded-lg border-2 border-zinc-900 bg-white text-xs font-['Courier_Prime'] text-zinc-900 focus:outline-none shadow-[2px_2px_0px_#18181B]"
                >
                  <option value="fundamentals">D1: Fundamentals (30%)</option>
                  <option value="google-cloud-offerings">D2: Google Cloud Stack (35%)</option>
                  <option value="improve-output">D3: Techniques & Tuning (20%)</option>
                  <option value="business-strategies">D4: Business & Security (15%)</option>
                </select>
              </div>

              <div className="text-xs font-['Courier_Prime'] text-zinc-500 pt-1">
                ⏱️ Time Limit: 25 Minutes
              </div>
            </div>

            <button
              onClick={() => startExam('domain')}
              className="retro-btn mt-6 w-full py-2.5 text-xs font-bold font-['Silkscreen']"
            >
              START DOMAIN SPRINT
            </button>
          </div>

          {/* Card 3: Weak Spot Re-test */}
          <div className="retro-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="pixel-badge pixel-badge-red">SMART RE-TEST</span>
              <h3 className="font-sans font-bold text-lg text-zinc-900">
                Weak Spot Drill
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Extracts and re-tests only the questions you have previously answered incorrectly in practice exams.
              </p>
              <div className="p-3 rounded-lg bg-amber-50 border-2 border-zinc-900 text-xs text-amber-950 font-medium shadow-[2px_2px_0px_#18181B]">
                "Reinforce areas where you previously stumbled!"
              </div>
            </div>

            <button
              onClick={() => startExam('weak')}
              className="retro-btn-red mt-6 w-full py-2.5 text-xs font-bold font-['Silkscreen']"
            >
              DRILL MISSED QUESTIONS
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PHASE 2: RUNNING EXAM (Retro Testing Console)
  // ==========================================
  if (phase === 'running' && currentQ) {
    const isFlagged = !!flaggedQuestions[currentQ.id];
    const eliminated = eliminatedOptions[currentQ.id] || [];

    return (
      <div className="space-y-5">
        {/* Top Header Bar */}
        <div className="retro-card px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="pixel-badge pixel-badge-blue text-[10px] sm:text-xs">
              {examMode} EXAM
            </span>
            <span className="font-['Silkscreen'] text-xs font-bold text-zinc-900 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-900">
              Q {currentIndex + 1} / {examQuestions.length}
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline font-['Courier_Prime']">
              ({Object.keys(userAnswers).length} answered)
            </span>
          </div>

          {/* Timer & Controls */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-zinc-900 font-['Silkscreen'] text-xs font-bold shadow-[2px_2px_0px_#18181B] ${
                secondsRemaining < 600
                  ? 'bg-rose-100 text-rose-900 animate-pulse'
                  : 'bg-zinc-100 text-zinc-900'
              }`}
            >
              <Clock className="w-4 h-4 text-zinc-700" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>

            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`retro-btn px-3 py-1.5 text-xs ${
                isFlagged ? 'bg-amber-100 text-amber-900 border-amber-600' : ''
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 text-amber-600' : ''}`} />
              <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="retro-btn-dark px-3.5 py-1.5 text-xs font-['Silkscreen']"
            >
              SUBMIT
            </button>
          </div>
        </div>

        {/* Question Area & Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Card (9 cols) */}
          <div className="lg:col-span-9 retro-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
              <span className="font-['Courier_Prime'] text-xs font-bold uppercase text-zinc-700">
                Domain: {currentQ.sectionId.replace(/-/g, ' ')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBookmark(currentQ.id)}
                  title="Bookmark question"
                  className="text-zinc-500 hover:text-amber-600 p-1 cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      progress.bookmarkedQuestionIds.includes(currentQ.id)
                        ? 'fill-amber-600 text-amber-600'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            <h3 className="font-sans text-base sm:text-xl font-bold text-zinc-900 leading-relaxed">
              {currentQ.question}
            </h3>

            <div className="text-xs font-['Courier_Prime'] text-zinc-500 italic flex items-center gap-1.5">
              <Strikethrough className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Tip: Click the cross-out button to eliminate options you know are incorrect.</span>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const isCrossed = eliminated.includes(optIdx);

                return (
                  <div
                    key={optIdx}
                    onClick={() => selectOption(currentQ.id, optIdx)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-[3px_3px_0px_#52525B]'
                        : isCrossed
                        ? 'bg-zinc-100 text-zinc-400 border-zinc-300 line-through opacity-60'
                        : 'bg-white text-zinc-900 border-zinc-900 shadow-[2px_2px_0px_#18181B] hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-md flex items-center justify-center font-['Silkscreen'] text-xs sm:text-sm font-bold shrink-0 border border-zinc-900 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-zinc-100 text-zinc-900'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm sm:text-base font-sans leading-relaxed pt-0.5">
                        {opt}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleEliminate(currentQ.id, optIdx, e)}
                      title={isCrossed ? 'Uncross option' : 'Cross out option'}
                      className={`px-2 py-1 rounded-md text-xs font-['Courier_Prime'] font-bold cursor-pointer transition-all border-2 shrink-0 flex items-center gap-1 ${
                        isCrossed
                          ? 'bg-rose-600 text-white border-rose-700 shadow-[1px_1px_0px_#9F1239]'
                          : isSelected
                          ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-300 hover:border-zinc-900 hover:bg-zinc-100 shadow-[1px_1px_0px_#18181B]'
                      }`}
                      aria-label={isCrossed ? 'Uncross option' : 'Cross out option'}
                    >
                      <Strikethrough className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isCrossed ? 'Crossed' : 'Cross out'}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-2 pt-4 border-t-2 border-zinc-200">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="retro-btn px-3 sm:px-4 py-2 disabled:opacity-40 text-xs font-bold shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="font-['Silkscreen'] text-xs font-bold text-zinc-900 px-2.5 py-1 rounded bg-zinc-100 border border-zinc-900 shrink-0 text-center">
                {currentIndex + 1} / {examQuestions.length}
              </span>

              <button
                disabled={currentIndex === examQuestions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                className="retro-btn-dark px-3 sm:px-4 py-2 disabled:opacity-40 text-xs font-bold shrink-0"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette Sidebar (3 cols) */}
          <div className="lg:col-span-3 retro-card p-4 space-y-3">
            <span className="font-['Silkscreen'] text-xs uppercase font-bold text-zinc-800 block">
              QUESTION PALETTE
            </span>

            <div className="grid grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
              {examQuestions.map((q, idx) => {
                const answered = userAnswers[q.id] !== undefined;
                const flagged = !!flaggedQuestions[q.id];
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-8 rounded font-['Silkscreen'] text-[10px] font-bold transition-all cursor-pointer relative border-2 ${
                      isCurrent
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-[2px_2px_0px_#52525B]'
                        : answered
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-600'
                        : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                    }`}
                  >
                    {idx + 1}
                    {flagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-zinc-900" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t-2 border-zinc-200 space-y-1 text-[10px] font-['Courier_Prime'] text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white border border-zinc-300" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500 border border-zinc-900" />
                <span>Flagged for Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="retro-card max-w-md w-full p-6 space-y-4">
              <h3 className="font-sans font-bold text-lg text-zinc-900">
                Confirm Exam Submission
              </h3>
              <div className="text-xs text-zinc-700 space-y-1.5 font-['Courier_Prime']">
                <p>• Total Questions: {examQuestions.length}</p>
                <p>• Answered: {Object.keys(userAnswers).length}</p>
                <p>
                  • Unanswered:{' '}
                  <strong className="text-rose-600">
                    {examQuestions.length - Object.keys(userAnswers).length}
                  </strong>
                </p>
                <p>
                  • Flagged for Review:{' '}
                  <strong className="text-amber-600">
                    {Object.values(flaggedQuestions).filter(Boolean).length}
                  </strong>
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t-2 border-zinc-200">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="retro-btn px-4 py-2 text-xs font-bold"
                >
                  Return to Test
                </button>
                <button
                  onClick={finishExam}
                  className="retro-btn-dark px-4 py-2 text-xs font-['Silkscreen']"
                >
                  CONFIRM & SUBMIT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // PHASE 3: RESULTS SCREEN
  // ==========================================
  if (phase === 'results' && latestResult) {
    const filteredAnswers = latestResult.answers.filter((ans) => {
      if (reviewFilter === 'incorrect') return !ans.isCorrect;
      if (reviewFilter === 'flagged') return ans.flagged;
      return true;
    });

    return (
      <div className="space-y-6">
        {/* Scorecard Hero */}
        <div className="retro-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="pixel-badge pixel-badge-blue">
                OFFICIAL REPORT DOCKET
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-zinc-900">
                Your Score & Performance
              </h2>
              <p className="text-xs text-zinc-500 font-['Courier_Prime']">
                Completed on {new Date(latestResult.timestamp).toLocaleDateString()} in{' '}
                {Math.round(latestResult.durationSeconds / 60)} minutes.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`retro-stamp text-xl px-5 py-2 ${
                  latestResult.passed ? 'stamp-green' : 'stamp-red'
                }`}
              >
                {latestResult.passed ? 'PASSED 🏆' : 'NEEDS REVISION ⚠️'}
              </div>
              <span className="text-[11px] font-['Silkscreen'] text-zinc-500 mt-1.5">
                PASS THRESHOLD: 75%
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-zinc-200">
            <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-center">
              <span className="font-['Silkscreen'] text-[9px] text-zinc-500 block">
                FINAL SCORE
              </span>
              <span className="text-2xl font-bold font-['Courier_Prime'] text-zinc-900">
                {latestResult.scorePercentage}%
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-center">
              <span className="font-['Silkscreen'] text-[9px] text-emerald-700 block">
                CORRECT
              </span>
              <span className="text-2xl font-bold font-['Courier_Prime'] text-emerald-700">
                {latestResult.correctCount} / {latestResult.totalQuestions}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-center">
              <span className="font-['Silkscreen'] text-[9px] text-rose-700 block">
                INCORRECT
              </span>
              <span className="text-2xl font-bold font-['Courier_Prime'] text-rose-700">
                {latestResult.totalQuestions - latestResult.correctCount}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-center">
              <span className="font-['Silkscreen'] text-[9px] text-blue-700 block">
                TIME
              </span>
              <span className="text-2xl font-bold font-['Courier_Prime'] text-blue-700">
                {Math.round(latestResult.durationSeconds / 60)}m
              </span>
            </div>
          </div>

          {/* Domain Breakdown Bars */}
          <div className="space-y-3 pt-4 border-t-2 border-zinc-200">
            <h4 className="font-sans font-bold text-sm text-zinc-900">
              Domain Breakdown:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {latestResult.domainScores.map((ds) => (
                <div
                  key={ds.sectionId}
                  className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-800 truncate">{ds.sectionTitle}</span>
                    <span className="font-['Courier_Prime'] font-bold text-zinc-900">
                      {ds.correct}/{ds.total} ({ds.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden border border-zinc-900">
                    <div
                      className={`h-full transition-all ${
                        ds.percentage >= 75 ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}
                      style={{ width: `${ds.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setPhase('setup')}
              className="retro-btn-dark px-4 py-2 text-xs font-['Silkscreen']"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              TAKE ANOTHER TEST
            </button>
          </div>
        </div>

        {/* Review list */}
        <div className="retro-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-900 pb-3">
            <h3 className="font-sans font-bold text-base sm:text-lg text-zinc-900">
              Detailed Question Review
            </h3>

            <div className="flex flex-wrap items-center gap-1.5 font-['Silkscreen'] text-[10px]">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded border-2 cursor-pointer ${
                  reviewFilter === 'all'
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-700 border-zinc-900'
                }`}
              >
                All ({latestResult.answers.length})
              </button>
              <button
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1 rounded border-2 cursor-pointer ${
                  reviewFilter === 'incorrect'
                    ? 'bg-rose-600 text-white border-zinc-900'
                    : 'bg-white text-zinc-700 border-zinc-900'
                }`}
              >
                Incorrect ({latestResult.totalQuestions - latestResult.correctCount})
              </button>
              <button
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1 rounded border-2 cursor-pointer ${
                  reviewFilter === 'flagged'
                    ? 'bg-amber-500 text-white border-zinc-900'
                    : 'bg-white text-zinc-700 border-zinc-900'
                }`}
              >
                Flagged
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAnswers.map((ans, idx) => {
              const q = PRACTICE_QUESTIONS.find((item) => item.id === ans.questionId);
              if (!q) return null;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border-2 space-y-3 ${
                    ans.isCorrect
                      ? 'bg-white border-emerald-600 shadow-[3px_3px_0px_#16A34A]'
                      : 'bg-white border-rose-600 shadow-[3px_3px_0px_#DC2626]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-['Silkscreen'] text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-900">
                        Q#{idx + 1}
                      </span>
                      {ans.isCorrect ? (
                        <span className="pixel-badge pixel-badge-green">CORRECT ✓</span>
                      ) : (
                        <span className="pixel-badge pixel-badge-red">INCORRECT ✕</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleBookmark(q.id)}
                      className="text-xs text-zinc-500 hover:text-amber-600 flex items-center gap-1 cursor-pointer font-['Courier_Prime']"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          progress.bookmarkedQuestionIds.includes(q.id) ? 'fill-amber-600 text-amber-600' : ''
                        }`}
                      />
                      <span>Save</span>
                    </button>
                  </div>

                  <h4 className="font-sans font-bold text-base sm:text-lg text-zinc-900 leading-relaxed">
                    {q.question}
                  </h4>

                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isCorrectAnswer = optIdx === q.correctIndex;
                      const wasUserPick = ans.selectedOption === optIdx;

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg text-sm sm:text-base font-sans border-2 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 ${
                            isCorrectAnswer
                              ? 'bg-emerald-50 text-emerald-950 font-bold border-emerald-600 shadow-[2px_2px_0px_#16A34A]'
                              : wasUserPick
                              ? 'bg-rose-50 text-rose-950 border-rose-600 shadow-[2px_2px_0px_#DC2626]'
                              : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <span className="font-['Silkscreen'] font-bold shrink-0 text-xs sm:text-sm">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span className="leading-relaxed break-words">{opt}</span>
                          </div>

                          {(isCorrectAnswer || wasUserPick) && (
                            <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0 pl-6 sm:pl-0">
                              {isCorrectAnswer && (
                                <span className="font-['Silkscreen'] text-[10px] uppercase text-emerald-800 bg-emerald-100 border border-emerald-600 px-2 py-0.5 rounded font-bold whitespace-nowrap">
                                  ✓ CORRECT ANSWER
                                </span>
                              )}
                              {!isCorrectAnswer && wasUserPick && (
                                <span className="font-['Silkscreen'] text-[10px] uppercase text-rose-800 bg-rose-100 border border-rose-600 px-2 py-0.5 rounded font-bold whitespace-nowrap">
                                  ✕ YOUR CHOICE
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-4 rounded-lg bg-zinc-50 border-2 border-zinc-900 space-y-1.5">
                    <span className="text-xs font-['Silkscreen'] uppercase text-emerald-700 font-bold block">
                      ✓ Solution Rationale:
                    </span>
                    <p className="text-sm sm:text-base text-zinc-900 leading-relaxed font-sans font-medium">
                      {q.explanation}
                    </p>
                  </div>

                  {q.whyOthersWrong && q.whyOthersWrong.length > 0 && (
                    <div className="p-4 rounded-lg bg-zinc-50 border-2 border-zinc-900 space-y-1.5">
                      <span className="text-xs font-['Silkscreen'] uppercase text-rose-700 font-bold block">
                        ⚠️ Distractor Breakdown:
                      </span>
                      <ul className="space-y-1.5 text-sm text-zinc-800 font-sans leading-relaxed">
                        {q.whyOthersWrong.map((why, wIdx) => (
                          <li key={wIdx} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{why}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {q.officialDoc && (
                    <div className="text-right pt-1">
                      <a
                        href={q.officialDoc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-700 hover:underline font-['Courier_Prime'] inline-flex items-center gap-1 font-bold"
                      >
                        <span>Official Google Cloud Documentation</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
