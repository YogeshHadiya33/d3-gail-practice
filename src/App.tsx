import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { NotebookStudy } from './components/NotebookStudy';
import { MockExam } from './components/MockExam';
import { QuestionBank } from './components/QuestionBank';
import { RevisionCheatSheet } from './components/RevisionCheatSheet';
import { ExamTraps } from './components/ExamTraps';
import { Glossary } from './components/Glossary';
import { Dashboard } from './components/Dashboard';
import type { UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { PRACTICE_QUESTIONS } from './data/exam-data';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top smoothly when route pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleProgressUpdate = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  // Derive current tab id from pathname
  const getCurrentTabId = (pathname: string): string => {
    if (pathname === '/notes' || pathname === '/notebook') return 'notebook';
    if (pathname === '/mock-exam' || pathname === '/exam') return 'mock-exam';
    if (pathname === '/practice' || pathname === '/questions') return 'practice';
    if (pathname === '/cheat-sheet') return 'cheat-sheet';
    if (pathname === '/traps') return 'traps';
    if (pathname === '/glossary') return 'glossary';
    if (pathname === '/dashboard' || pathname === '/progress') return 'dashboard';
    return 'notebook';
  };

  const currentTab = getCurrentTabId(location.pathname);

  // Sync lastVisitedTab in storage when route changes
  useEffect(() => {
    const tabId = getCurrentTabId(location.pathname);
    const current = loadUserProgress();
    if (current.lastVisitedTab !== tabId) {
      saveUserProgress({ ...current, lastVisitedTab: tabId });
    }
  }, [location.pathname]);

  const handleTabChange = (tabOrPath: string) => {
    let targetPath = tabOrPath;
    if (!targetPath.startsWith('/')) {
      if (targetPath === 'notebook' || targetPath === 'notes') {
        targetPath = '/notes';
      } else {
        targetPath = `/${targetPath}`;
      }
    }
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Retro Game Machine & Route Navigation Header */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        progress={progress}
        totalQuestions={PRACTICE_QUESTIONS.length}
      />

      {/* Main Route-Based Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Routes>
          <Route
            path="/notes"
            element={
              <NotebookStudy
                progress={progress}
                onProgressUpdate={handleProgressUpdate}
              />
            }
          />
          <Route path="/notebook" element={<Navigate to="/notes" replace />} />

          <Route
            path="/mock-exam"
            element={
              <MockExam
                progress={progress}
                onProgressUpdate={handleProgressUpdate}
              />
            }
          />
          <Route path="/exam" element={<Navigate to="/mock-exam" replace />} />

          <Route
            path="/practice"
            element={
              <QuestionBank
                progress={progress}
                onProgressUpdate={handleProgressUpdate}
              />
            }
          />
          <Route path="/questions" element={<Navigate to="/practice" replace />} />

          <Route path="/cheat-sheet" element={<RevisionCheatSheet />} />
          <Route path="/traps" element={<ExamTraps />} />
          <Route path="/glossary" element={<Glossary />} />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                progress={progress}
                onProgressUpdate={handleProgressUpdate}
              />
            }
          />
          <Route path="/progress" element={<Navigate to="/dashboard" replace />} />

          {/* Root redirect to /notes */}
          <Route path="/" element={<Navigate to="/notes" replace />} />

          {/* Fallback route redirect to /notes */}
          <Route path="*" element={<Navigate to="/notes" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
