import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { UserProgress } from '../types';
import { COMPREHENSIVE_STUDY_MODULES } from '../data/curated-study-notes';
import { clearAllProgress } from '../utils/storage';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onProgressUpdate,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const totalModules = COMPREHENSIVE_STUDY_MODULES.length; // 5
  const masteredModules = progress.masteredTopicIds.length;
  const modulePercentage = Math.round((masteredModules / totalModules) * 100);

  const totalExamsTaken = progress.examResults.length;
  const passedExams = progress.examResults.filter((r) => r.passed).length;
  const bestExamScore = totalExamsTaken > 0
    ? Math.max(...progress.examResults.map((r) => r.scorePercentage))
    : 0;

  // Composite Readiness Score (0 to 100):
  const readinessIndex = Math.min(
    100,
    Math.round(modulePercentage * 0.4 + (bestExamScore > 0 ? bestExamScore * 0.6 : 0))
  );

  const getReadinessLevel = () => {
    if (readinessIndex >= 80) return { label: 'CERT READY 🏆', badgeClass: 'pixel-badge-green' };
    if (readinessIndex >= 60) return { label: 'ALMOST THERE ⚡', badgeClass: 'pixel-badge-amber' };
    return { label: 'TRAINING IN PROGRESS 📖', badgeClass: 'pixel-badge-blue' };
  };

  const readiness = getReadinessLevel();

  const handleReset = () => {
    clearAllProgress();
    onProgressUpdate({
      bookmarkedQuestionIds: [],
      masteredTopicIds: [],
      notes: {},
      examResults: [],
      lastVisitedTab: 'notebook',
    });
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="retro-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="pixel-badge pixel-badge-blue">PLAYER STATUS HUD</span>
              <span className="font-['Courier_Prime'] text-xs text-zinc-500">Local Browser Memory</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1 flex items-center gap-2">
              <span>📊</span> Readiness & Study Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Track course module completion, practice test history, and exam readiness telemetry.
            </p>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="retro-btn px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 border-rose-600 font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>

      {/* Hero Readiness Card (Retro Handheld Console HUD) */}
      <div className="retro-card p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Meter (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-zinc-50 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] text-center">
            <span className="font-['Silkscreen'] text-[10px] uppercase tracking-wider text-zinc-600 font-bold">
              ESTIMATED READINESS HP
            </span>

            <div className="my-3 text-5xl sm:text-6xl font-bold font-['Silkscreen'] text-zinc-900">
              {readinessIndex}%
            </div>

            <div className={`pixel-badge ${readiness.badgeClass} text-xs px-3 py-1`}>
              {readiness.label}
            </div>

            <p className="text-[11px] text-zinc-600 mt-3 max-w-xs font-sans">
              Weighted composite of completed course modules (40%) and highest mock exam score (60%).
            </p>
          </div>

          {/* Key Metrics (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B]">
                <span className="font-['Silkscreen'] text-[9px] text-zinc-500 block">
                  STAGES DONE
                </span>
                <span className="text-2xl font-bold font-['Courier_Prime'] text-zinc-900">
                  {masteredModules} / {totalModules}
                </span>
                <div className="w-full h-2 bg-zinc-200 rounded-full mt-2 overflow-hidden border border-zinc-900">
                  <div
                    className="h-full bg-emerald-600 transition-all"
                    style={{ width: `${modulePercentage}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B]">
                <span className="font-['Silkscreen'] text-[9px] text-amber-700 block">
                  SAVED QS
                </span>
                <span className="text-2xl font-bold font-['Courier_Prime'] text-amber-700">
                  {progress.bookmarkedQuestionIds.length}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1 font-['Courier_Prime']">
                  In Revision Deck
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] col-span-2 sm:col-span-1">
                <span className="font-['Silkscreen'] text-[9px] text-blue-700 block">
                  EXAMS COMPLETED
                </span>
                <span className="text-2xl font-bold font-['Courier_Prime'] text-blue-700">
                  {totalExamsTaken}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1 font-['Courier_Prime']">
                  {passedExams} Passed (≥75%)
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-['Courier_Prime']">
              <Link
                to="/notes"
                className="retro-btn px-3.5 py-2 text-xs font-bold font-['Silkscreen'] inline-flex items-center"
              >
                📖 STUDY STAGES
              </Link>
              <Link
                to="/mock-exam"
                className="retro-btn-dark px-3.5 py-2 text-xs font-bold font-['Silkscreen'] inline-flex items-center"
              >
                🎯 TAKE 55-Q EXAM
              </Link>
              <Link
                to="/cheat-sheet"
                className="retro-btn px-3.5 py-2 text-xs font-bold font-['Silkscreen'] inline-flex items-center"
              >
                ⚡ RAPID RECAP
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Module Completion Checklist */}
      <div className="retro-card p-6 space-y-4">
        <h3 className="font-sans font-bold text-lg text-zinc-900 flex items-center gap-2">
          <span>🎮</span> Course Learning Path Completion
        </h3>

        <div className="space-y-2">
          {COMPREHENSIVE_STUDY_MODULES.map((mod, idx) => {
            const isDone = progress.masteredTopicIds.includes(mod.id);

            return (
              <div
                key={mod.id}
                className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 flex items-center justify-between gap-3 text-sm shadow-[2px_2px_0px_#18181B]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-md border-2 border-zinc-900 shrink-0 bg-white" />
                  )}
                  <span className="font-['Silkscreen'] text-[10px] text-zinc-600 font-bold shrink-0">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="font-semibold text-zinc-900 truncate text-sm sm:text-base">
                    {mod.courseTitle}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-['Courier_Prime'] text-zinc-500 hidden sm:inline">
                    {mod.domainMapping}
                  </span>
                  <Link
                    to="/notes"
                    className="retro-btn px-3 py-1 text-xs font-bold inline-flex items-center"
                  >
                    Open
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exam Attempt History Table */}
      <div className="retro-card p-6 space-y-4">
        <h3 className="font-sans font-bold text-lg text-zinc-900 flex items-center gap-2">
          <span>📜</span> Practice Exam History Log
        </h3>

        {progress.examResults.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 font-['Courier_Prime'] text-xs border-2 border-dashed border-zinc-300 rounded-lg">
            No mock exams completed yet. Start a test to record your score telemetry!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-['Courier_Prime'] border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-900 text-zinc-700">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Questions</th>
                  <th className="py-2 px-3">Score</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {progress.examResults.map((res) => (
                  <tr key={res.id} className="hover:bg-zinc-50">
                    <td className="py-2.5 px-3 text-zinc-900">
                      {new Date(res.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3 text-zinc-700">
                      {res.correctCount} / {res.totalQuestions}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-zinc-900">
                      {res.scorePercentage}%
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`pixel-badge text-[9px] ${
                          res.passed ? 'pixel-badge-green' : 'pixel-badge-red'
                        }`}
                      >
                        {res.passed ? 'PASS 🏆' : 'FAIL ✕'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-zinc-500">
                      {Math.round(res.durationSeconds / 60)} min
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="retro-card max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h4 className="font-sans font-bold text-base text-zinc-900">Reset All Progress?</h4>
            </div>
            <p className="text-xs text-zinc-700 font-sans">
              This will permanently delete all mastered topic checkmarks, personal notes, and mock exam test history from your local browser storage.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t-2 border-zinc-200">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="retro-btn px-3 py-1.5 text-xs text-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="retro-btn-red px-3 py-1.5 text-xs font-bold"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
