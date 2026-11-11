import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Award,
  HelpCircle,
  FileText,
  AlertTriangle,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Bookmark,
  Menu,
  X,
  Type,
} from 'lucide-react';
import type { UserProgress } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  progress: UserProgress;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  progress,
  totalQuestions,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [fontTheme, setFontTheme] = useState<string>(() => {
    return localStorage.getItem('gail_font_theme') || 'neo-brutalist';
  });

  useEffect(() => {
    const fontClasses = [
      'font-theme-neo-brutalist',
      'font-theme-ibm-terminal',
      'font-theme-clean-tech',
      'font-theme-clean-swiss',
      'font-theme-typewriter',
    ];
    document.body.classList.remove(...fontClasses);
    document.documentElement.classList.remove(...fontClasses);
    document.body.classList.add(`font-theme-${fontTheme}`);
    document.documentElement.classList.add(`font-theme-${fontTheme}`);
    localStorage.setItem('gail_font_theme', fontTheme);
  }, [fontTheme]);

  const masteredCount = progress.masteredTopicIds.length;
  const bookmarkCount = progress.bookmarkedQuestionIds.length;
  const examCount = progress.examResults.length;
  const bestScore = examCount > 0
    ? Math.max(...progress.examResults.map((r) => r.scorePercentage))
    : 0;

  // Readiness composite calculation
  const readinessIndex = Math.min(
    100,
    Math.round((masteredCount / 5) * 40 + (bestScore > 0 ? bestScore * 0.6 : 0))
  );

  const location = useLocation();

  const tabs = [
    { id: 'notebook', path: '/notes', label: 'Course Notes', icon: BookOpen, badge: `${masteredCount}/5`, stage: 'STG 01' },
    { id: 'mock-exam', path: '/mock-exam', label: 'Mock Exam', icon: Award, badge: examCount > 0 ? `${bestScore}%` : '55 Qs', stage: 'SIM 90M' },
    { id: 'practice', path: '/practice', label: 'Question Bank', icon: HelpCircle, badge: `${totalQuestions}`, stage: 'DRILL' },
    { id: 'cheat-sheet', path: '/cheat-sheet', label: 'Revision Cheat Sheet', icon: FileText, badge: 'High Yield', stage: 'RECAP' },
    { id: 'traps', path: '/traps', label: 'Exam Traps', icon: AlertTriangle, badge: '10 Traps', stage: 'TRAPS' },
    { id: 'glossary', path: '/glossary', label: 'Glossary', icon: Sparkles, badge: '40+', stage: 'INDEX' },
    { id: 'dashboard', path: '/dashboard', label: 'Progress Log', icon: BarChart3, badge: `${readinessIndex}%`, stage: 'STATUS' },
  ];

  const isTabActive = (tab: { id: string; path: string }) => {
    if (location.pathname === tab.path) return true;
    if (tab.path === '/notes' && (location.pathname === '/' || location.pathname === '/notebook')) return true;
    if (tab.path === '/mock-exam' && location.pathname === '/exam') return true;
    if (tab.path === '/practice' && location.pathname === '/questions') return true;
    if (tab.path === '/dashboard' && location.pathname === '/progress') return true;
    return currentTab === tab.id;
  };

  return (
    <header className="bg-white border-b-2 border-zinc-900 sticky top-0 z-40 shadow-[0_2px_0px_#18181B]">
      {/* ========================================================
          MAIN BRANDING & CONTROLS HEADER
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left Title: D3 Badge + GAIL Preparation */}
          <Link to="/notes" className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-zinc-900 text-emerald-400 flex items-center justify-center font-['Silkscreen'] text-sm sm:text-base font-bold border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] shrink-0 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform tracking-wider">
              D3
            </div>

            <div>
              <h1 className="text-lg sm:text-2xl font-bold font-sans tracking-tight text-zinc-900 group-hover:text-zinc-700 leading-tight">
                GAIL Preparation
              </h1>
            </div>
          </Link>

          {/* Desktop Right Quick Stats & Font Profile Switcher */}
          <div className="hidden md:flex items-center gap-2 font-['Courier_Prime'] text-xs sm:text-sm">
            {/* Live Retro Font Switcher */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_#18181B]">
              <Type className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
              <select
                value={fontTheme}
                onChange={(e) => setFontTheme(e.target.value)}
                className="bg-transparent text-xs font-['Courier_Prime'] font-bold text-zinc-900 focus:outline-none cursor-pointer"
                title="Switch portal font profile"
              >
                <option value="neo-brutalist">Font: Space Grotesk (Brutalist)</option>
                <option value="ibm-terminal">Font: IBM Plex (Terminal 80s)</option>
                <option value="clean-tech">Font: Jakarta Sans (Clean Tech)</option>
                <option value="clean-swiss">Font: DM Sans (Swiss Bauhaus)</option>
                <option value="typewriter">Font: Courier (Typewriter)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_#18181B]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mastered: <strong className="text-emerald-700">{masteredCount}</strong>/5</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_#18181B]">
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>Saved: <strong className="text-amber-700">{bookmarkCount}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_#18181B]">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Best: <strong className="text-blue-700">{bestScore > 0 ? `${bestScore}%` : 'None'}</strong></span>
            </div>
          </div>

          {/* Mobile Menu Button (Tactile Retro Machine Button) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="retro-btn px-3.5 py-2 text-xs sm:text-sm flex items-center gap-1.5 font-['Silkscreen'] text-zinc-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-rose-600" />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-zinc-900" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================
            DESKTOP TAB NAVIGATION (Game Cartridges & Notebook Tabs)
            ======================================================== */}
        <nav className="hidden md:flex items-center gap-2 pt-2.5 border-t border-zinc-200 mt-2.5 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isTabActive(tab);

            return (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer border-2 ${
                  active
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-[2px_2px_0px_#52525B]'
                    : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900 hover:bg-zinc-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-['Silkscreen'] ${
                      active
                        ? 'bg-zinc-800 text-emerald-400 border border-zinc-700'
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ========================================================
          MOBILE MENU MODAL / DRAWER (Scrollable for Mobile)
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-zinc-900 bg-white px-4 py-4 space-y-4 shadow-xl max-h-[calc(100vh-68px)] overflow-y-auto overscroll-contain">
          {/* Header of Mobile Menu */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <span className="font-['Silkscreen'] text-[10px] uppercase font-bold text-zinc-700 flex items-center gap-1.5">
              <span>🕹️</span> SELECT STAGE / MODE
            </span>
            <span className="font-['Courier_Prime'] text-[10px] text-zinc-500">
              HP: {readinessIndex}% READY
            </span>
          </div>

          {/* Quick Stats Grid in Mobile Menu */}
          <div className="grid grid-cols-3 gap-2 text-center font-['Courier_Prime'] text-xs">
            <div className="p-2 bg-zinc-50 border border-zinc-300 rounded">
              <span className="text-[10px] text-zinc-500 block">Mastered</span>
              <strong className="text-emerald-700 font-bold">{masteredCount}/5</strong>
            </div>
            <div className="p-2 bg-zinc-50 border border-zinc-300 rounded">
              <span className="text-[10px] text-zinc-500 block">Saved Qs</span>
              <strong className="text-amber-700 font-bold">{bookmarkCount}</strong>
            </div>
            <div className="p-2 bg-zinc-50 border border-zinc-300 rounded">
              <span className="text-[10px] text-zinc-500 block">Best Score</span>
              <strong className="text-blue-700 font-bold">{bestScore > 0 ? `${bestScore}%` : 'N/A'}</strong>
            </div>
          </div>

          {/* Mobile Font Profile Selector */}
          <div className="flex items-center justify-between gap-2 p-2.5 bg-zinc-50 border-2 border-zinc-900 rounded shadow-[2px_2px_0px_#18181B]">
            <span className="font-['Silkscreen'] text-[10px] text-zinc-800 flex items-center gap-1.5 font-bold">
              <Type className="w-3.5 h-3.5 text-zinc-900" />
              FONT PROFILE:
            </span>
            <select
              value={fontTheme}
              onChange={(e) => setFontTheme(e.target.value)}
              className="bg-white border-2 border-zinc-900 text-xs font-['Courier_Prime'] font-bold text-zinc-900 px-2 py-1 rounded focus:outline-none"
            >
              <option value="neo-brutalist">Space Grotesk</option>
              <option value="ibm-terminal">IBM Plex Terminal</option>
              <option value="clean-tech">Jakarta Sans</option>
              <option value="clean-swiss">DM Sans</option>
              <option value="typewriter">Courier Prime</option>
            </select>
          </div>

          {/* Vertical Menu Buttons */}
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isTabActive(tab);

              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg border-2 flex items-center justify-between text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-[3px_3px_0px_#52525B]'
                      : 'bg-white text-zinc-800 border-zinc-900 shadow-[2px_2px_0px_#18181B] hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded flex items-center justify-center border ${
                        active
                          ? 'bg-zinc-800 border-zinc-700 text-emerald-400'
                          : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <span className="font-sans font-bold text-sm block">
                        {tab.label}
                      </span>
                      <span
                        className={`font-['Silkscreen'] text-[9px] ${
                          active ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {tab.stage}
                      </span>
                    </div>
                  </div>

                  {tab.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-['Silkscreen'] font-bold ${
                        active
                          ? 'bg-emerald-500 text-black'
                          : 'bg-zinc-100 text-zinc-700 border border-zinc-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-['Courier_Prime'] text-zinc-500 hover:text-zinc-900 underline"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
