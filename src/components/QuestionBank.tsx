import React, { useState } from 'react';
import { PRACTICE_QUESTIONS } from '../data/exam-data';
import type { UserProgress } from '../types';
import { toggleBookmarkQuestion } from '../utils/storage';
import {
  Search,
  Bookmark,
  ExternalLink,
  RotateCcw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface QuestionBankProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({
  progress,
  onProgressUpdate,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unattempted' | 'correct' | 'incorrect'>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  // User selections in question bank: questionId -> selectedOptionIndex
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter questions
  const filteredQuestions = PRACTICE_QUESTIONS.filter((q) => {
    if (domainFilter !== 'all' && q.sectionId !== domainFilter) return false;
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    if (onlyBookmarked && !progress.bookmarkedQuestionIds.includes(q.id)) return false;

    // Status filter
    const userChoice = selectedAnswers[q.id];
    if (statusFilter === 'unattempted' && userChoice !== undefined) return false;
    if (statusFilter === 'correct' && (userChoice === undefined || userChoice !== q.correctIndex)) return false;
    if (statusFilter === 'incorrect' && (userChoice === undefined || userChoice === q.correctIndex)) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchExp = q.explanation.toLowerCase().includes(query);
      const matchOpts = q.options.some((o) => o.toLowerCase().includes(query));
      if (!matchQ && !matchExp && !matchOpts) return false;
    }
    return true;
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuestion = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleBookmark = (qId: string) => {
    const nowSaved = toggleBookmarkQuestion(qId);
    const updatedIds = nowSaved
      ? [...progress.bookmarkedQuestionIds, qId]
      : progress.bookmarkedQuestionIds.filter((id) => id !== qId);
    onProgressUpdate({ ...progress, bookmarkedQuestionIds: updatedIds });
  };

  const currentFlashcard = filteredQuestions[flashcardIndex];

  return (
    <div className="space-y-6">
      {/* Top Banner Card (Retro Machine Bezel) */}
      <div className="retro-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="pixel-badge pixel-badge-blue">
                QUESTION VAULT
              </span>
              <span className="font-['Courier_Prime'] text-xs text-zinc-500">
                108 Scenario-Based Exam Drills
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1 flex items-center gap-2">
              <span>🕹️</span> Practice Questions & Interactive Drills
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Click an option to test your understanding. Immediate feedback validates your answer and reveals the full explanation.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-lg border-2 border-zinc-900 text-xs font-['Courier_Prime']">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded font-bold cursor-pointer transition-all ${
                viewMode === 'list'
                  ? 'bg-zinc-900 text-white shadow-[1px_1px_0px_#18181B]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              List Mode ({filteredQuestions.length})
            </button>
            <button
              onClick={() => {
                setViewMode('flashcard');
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded font-bold cursor-pointer transition-all ${
                viewMode === 'flashcard'
                  ? 'bg-zinc-900 text-white shadow-[1px_1px_0px_#18181B]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Flashcards
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4 pt-4 border-t-2 border-zinc-200">
          {/* Search */}
          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter scenarios or terms..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border-2 border-zinc-900 bg-white text-xs font-['Courier_Prime'] text-zinc-900 focus:outline-none shadow-[2px_2px_0px_#18181B]"
            />
          </div>

          {/* Domain Filter */}
          <div className="sm:col-span-3">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 rounded-lg border-2 border-zinc-900 bg-white text-xs text-zinc-900 font-['Courier_Prime'] focus:outline-none shadow-[2px_2px_0px_#18181B]"
            >
              <option value="all">All Domains (1 - 4)</option>
              <option value="fundamentals">D1: Fundamentals (30%)</option>
              <option value="google-cloud-offerings">D2: Google Cloud Stack (35%)</option>
              <option value="improve-output">D3: Techniques & Tuning (20%)</option>
              <option value="business-strategies">D4: Business Strategy & Governance (15%)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="sm:col-span-2">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg border-2 border-zinc-900 bg-white text-xs text-zinc-900 font-['Courier_Prime'] focus:outline-none shadow-[2px_2px_0px_#18181B]"
            >
              <option value="all">All Levels</option>
              <option value="easy">Foundational</option>
              <option value="medium">Intermediate</option>
              <option value="hard">Advanced</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full py-1.5 px-2 rounded-lg border-2 border-zinc-900 bg-white text-xs text-zinc-900 font-['Courier_Prime'] focus:outline-none shadow-[2px_2px_0px_#18181B]"
            >
              <option value="all">All Status</option>
              <option value="unattempted">Unanswered</option>
              <option value="correct">Correct</option>
              <option value="incorrect">Incorrect</option>
            </select>
          </div>

          {/* Bookmarked toggle */}
          <div className="sm:col-span-1">
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              title="Filter saved questions"
              className={`w-full py-1.5 px-2 rounded-lg border-2 border-zinc-900 text-xs font-['Courier_Prime'] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 ${
                onlyBookmarked
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: PRACTICE LIST */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="retro-card p-10 text-center space-y-2">
              <span className="text-3xl">🔍</span>
              <h3 className="font-sans font-bold text-base text-zinc-900">
                No questions found matching your filter criteria
              </h3>
              <p className="text-xs text-zinc-500 font-['Courier_Prime']">
                Try resetting filters or clearing your search query.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const userPick = selectedAnswers[q.id];
              const isAnswered = userPick !== undefined;
              const isCorrect = isAnswered && userPick === q.correctIndex;
              const isSaved = progress.bookmarkedQuestionIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`retro-card p-5 sm:p-6 space-y-4 transition-all ${
                    !isAnswered
                      ? 'border-2 border-zinc-900'
                      : isCorrect
                      ? 'border-2 border-emerald-600 shadow-[4px_4px_0px_#16A34A]'
                      : 'border-2 border-rose-600 shadow-[4px_4px_0px_#DC2626]'
                  }`}
                >
                  {/* Top Question Info */}
                  <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-['Silkscreen'] text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-900">
                        Q#{idx + 1}
                      </span>
                      <span className="pixel-badge pixel-badge-blue">
                        {q.sectionId.replace(/-/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleBookmark(q.id)}
                        className={`retro-btn px-2.5 py-1 text-xs transition-all ${
                          isSaved ? 'bg-amber-100 text-amber-900' : ''
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>

                      {isAnswered && (
                        <button
                          onClick={() => handleResetQuestion(q.id)}
                          className="retro-btn px-2 py-1 text-xs text-zinc-600 hover:text-zinc-900"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question Scenario Prompt */}
                  <h3 className="font-sans font-bold text-base sm:text-xl text-zinc-900 leading-relaxed">
                    {q.question}
                  </h3>

                  {/* Interactive Options (Tactile Arcade Buttons) */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isOptionUserPick = userPick === optIdx;

                      let buttonStyle = 'bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-zinc-900 hover:bg-zinc-50 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer';

                      if (isAnswered) {
                        if (isOptionCorrect) {
                          buttonStyle = 'bg-emerald-50 border-2 border-emerald-600 shadow-[2px_2px_0px_#059669] text-emerald-950 font-bold';
                        } else if (isOptionUserPick && !isOptionCorrect) {
                          buttonStyle = 'bg-rose-50 border-2 border-rose-600 shadow-[2px_2px_0px_#E11D48] text-rose-950 font-bold';
                        } else {
                          buttonStyle = 'bg-zinc-50/60 border-2 border-zinc-300 text-zinc-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3.5 sm:p-4 rounded-lg text-left text-sm sm:text-base font-sans transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3.5 ${buttonStyle}`}
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <span
                              className={`w-7 h-7 rounded-md flex items-center justify-center font-['Silkscreen'] text-xs sm:text-sm font-bold shrink-0 border border-zinc-900 ${
                                isAnswered && isOptionCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isAnswered && isOptionUserPick
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-zinc-100 text-zinc-900'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>

                            <div className="flex-1 min-w-0 pt-0.5 leading-relaxed break-words">
                              <span>{opt}</span>
                            </div>
                          </div>

                          {isAnswered && isOptionCorrect && (
                            <div className="self-start sm:self-center shrink-0 pl-10 sm:pl-0">
                              <span className="font-['Silkscreen'] text-xs sm:text-sm text-emerald-800 bg-emerald-100 border border-emerald-600 px-2 py-0.5 rounded flex items-center gap-1 font-bold whitespace-nowrap">
                                <CheckCircle2 className="w-4 h-4" />
                                CORRECT
                              </span>
                            </div>
                          )}

                          {isAnswered && isOptionUserPick && !isOptionCorrect && (
                            <div className="self-start sm:self-center shrink-0 pl-10 sm:pl-0">
                              <span className="font-['Silkscreen'] text-xs sm:text-sm text-rose-800 bg-rose-100 border border-rose-600 px-2 py-0.5 rounded flex items-center gap-1 font-bold whitespace-nowrap">
                                <XCircle className="w-4 h-4" />
                                YOUR PICK
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Explanation Card (Reveals once answered) */}
                  {isAnswered && (
                    <div className="pt-3 border-t-2 border-zinc-200 space-y-3 bg-zinc-50 p-4 sm:p-5 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B]">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 font-['Silkscreen']">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            EXCELLENT! OFFICIAL SOLUTION BELOW:
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-700 font-['Silkscreen']">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            INCORRECT SELECTION. REVIEW RATIONALE:
                          </div>
                        )}
                      </div>

                      <div className="p-4 rounded-lg bg-white border-2 border-zinc-900 space-y-1.5">
                        <span className="text-xs font-['Silkscreen'] uppercase text-emerald-700 font-bold block">
                          ✓ Official Solution Rationale:
                        </span>
                        <p className="text-sm sm:text-base text-zinc-900 leading-relaxed font-sans font-medium">
                          {q.explanation}
                        </p>
                      </div>

                      {q.whyOthersWrong && q.whyOthersWrong.length > 0 && (
                        <div className="p-4 rounded-lg bg-white border-2 border-zinc-900 space-y-2">
                          <span className="text-xs font-['Silkscreen'] uppercase text-rose-700 font-bold block">
                            ⚠️ Distractor Breakdown (Why others are wrong):
                          </span>
                          <ul className="space-y-1.5 text-sm text-zinc-800 font-sans leading-relaxed">
                            {q.whyOthersWrong.map((why, wIdx) => (
                              <li key={wIdx} className="flex items-start gap-2">
                                <span className="text-rose-600 font-bold">•</span>
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
                            <span>Official Documentation Reference</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {!isAnswered && (
                    <div className="text-center py-1 text-xs text-zinc-500 font-['Silkscreen'] italic">
                      [ CLICK ANY OPTION ABOVE TO TEST YOUR CHOICE ]
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW 2: FLASHCARD DECK (Retro Handheld Screen) */}
      {viewMode === 'flashcard' && currentFlashcard && (
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="flex items-center justify-between font-['Courier_Prime'] text-xs text-zinc-600 px-2">
            <span>
              CARD {flashcardIndex + 1} OF {filteredQuestions.length}
            </span>
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex(Math.floor(Math.random() * filteredQuestions.length));
              }}
              className="retro-btn px-2.5 py-1 text-xs"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[320px] retro-card p-8 flex flex-col justify-between cursor-pointer hover:shadow-[6px_6px_0px_#18181B] transition-all select-none"
          >
            <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
              <span className="pixel-badge pixel-badge-blue">
                {currentFlashcard.sectionId.replace(/-/g, ' ')}
              </span>
              <span className="text-xs font-['Courier_Prime'] text-zinc-500">
                {isFlipped ? '[ REVERSE: ANSWER & RATIONALE ]' : '[ OBVERSE: TAP TO FLIP ]'}
              </span>
            </div>

            {!isFlipped ? (
              <div className="my-auto py-4 space-y-3">
                <span className="text-xs font-['Silkscreen'] uppercase tracking-wider text-zinc-600 font-bold block">
                  SCENARIO DRILL:
                </span>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-zinc-900 leading-relaxed">
                  {currentFlashcard.question}
                </h3>
              </div>
            ) : (
              <div className="my-auto py-4 space-y-3">
                <div>
                  <span className="text-xs font-['Silkscreen'] uppercase tracking-wider text-emerald-700 font-bold block">
                    ✓ CORRECT ANSWER:
                  </span>
                  <h4 className="font-sans font-bold text-lg sm:text-xl text-emerald-900 mt-1">
                    {currentFlashcard.options[currentFlashcard.correctIndex]}
                  </h4>
                </div>
                <div className="p-4 rounded-lg bg-zinc-50 border-2 border-zinc-900">
                  <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-sans font-medium">
                    {currentFlashcard.explanation}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-200 text-xs font-['Courier_Prime']">
              <span className="text-zinc-500">ID: {currentFlashcard.id}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmark(currentFlashcard.id);
                }}
                className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    progress.bookmarkedQuestionIds.includes(currentFlashcard.id)
                      ? 'fill-amber-600 text-amber-600'
                      : ''
                  }`}
                />
                <span>Save to Revision</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev === 0 ? filteredQuestions.length - 1 : prev - 1));
              }}
              className="retro-btn px-4 py-2 text-xs font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="retro-btn-dark px-5 py-2 text-xs font-bold"
            >
              {isFlipped ? 'Show Question' : 'Reveal Answer'}
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev + 1) % filteredQuestions.length);
              }}
              className="retro-btn px-4 py-2 text-xs font-bold"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
