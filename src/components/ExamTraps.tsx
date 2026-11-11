import React, { useState } from 'react';
import { EXAM_TRAPS } from '../data/cheat-sheets';
import type { ExamTrap } from '../data/cheat-sheets';
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';

export const ExamTraps: React.FC = () => {
  const [trapFilter, setTrapFilter] = useState<string>('all');
  const [expandedTrapId, setExpandedTrapId] = useState<string | null>('trap-1');
  const [search, setSearch] = useState<string>('');

  const filteredTraps = EXAM_TRAPS.filter((trap) => {
    if (trapFilter !== 'all' && trap.category !== trapFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        trap.trapTitle.toLowerCase().includes(q) ||
        trap.scenario.toLowerCase().includes(q) ||
        trap.goldenRule.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="retro-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="pixel-badge pixel-badge-red">DISTRACTOR DEFENSE</span>
              <span className="font-['Courier_Prime'] text-xs text-zinc-500">D3 GAIL Preparation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1 flex items-center gap-2">
              <span>⚠️</span> Top 10 Exam Traps & Tricky Scenarios
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Google Cloud exam questions deliberately include tempting distractors. Master these 10 scenario patterns so you never fall for tricky answers.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4 pt-4 border-t-2 border-zinc-200">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scenarios (e.g. weights, HR policy, on-prem)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border-2 border-zinc-900 bg-white text-xs font-['Courier_Prime'] text-zinc-900 focus:outline-none shadow-[2px_2px_0px_#18181B]"
            />
          </div>

          <div className="sm:col-span-6 flex flex-wrap gap-1.5 text-xs font-['Courier_Prime']">
            {['all', 'models', 'techniques', 'offerings', 'business'].map((cat) => (
              <button
                key={cat}
                onClick={() => setTrapFilter(cat)}
                className={`px-3 py-1.5 rounded-md border-2 capitalize font-bold transition-all cursor-pointer ${
                  trapFilter === cat
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-[2px_2px_0px_#52525B]'
                    : 'bg-white text-zinc-700 border-zinc-900 shadow-[2px_2px_0px_#18181B] hover:bg-zinc-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Traps Accordion List */}
      <div className="space-y-3.5">
        {filteredTraps.map((trap: ExamTrap) => {
          const isExpanded = expandedTrapId === trap.id;

          return (
            <div
              key={trap.id}
              className="retro-card overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedTrapId(isExpanded ? null : trap.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="pixel-badge pixel-badge-red text-[9px] whitespace-nowrap">
                    TRAP #{trap.id.replace('trap-', '')}
                  </span>
                  <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 truncate">
                    {trap.trapTitle}
                  </h3>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-zinc-900 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t-2 border-zinc-900 space-y-4 bg-zinc-50">
                  <div>
                    <span className="text-[10px] font-['Silkscreen'] uppercase tracking-wider text-zinc-600 font-bold block">
                      THE EXAM SCENARIO:
                    </span>
                    <p className="text-sm sm:text-base text-zinc-900 font-medium mt-1 leading-relaxed bg-white p-4 rounded-lg border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B]">
                      "{trap.scenario}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Wrong Intuition */}
                    <div className="p-4 rounded-lg bg-rose-50 border-2 border-zinc-900 space-y-1.5 shadow-[2px_2px_0px_#18181B]">
                      <div className="flex items-center gap-1.5 text-rose-800 text-xs font-['Silkscreen'] uppercase font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                        Common Trap (Wrong):
                      </div>
                      <p className="text-sm text-rose-950 font-sans leading-relaxed">
                        {trap.wrongIntuition}
                      </p>
                    </div>

                    {/* Correct Google Solution */}
                    <div className="p-4 rounded-lg bg-emerald-50 border-2 border-zinc-900 space-y-1.5 shadow-[2px_2px_0px_#18181B]">
                      <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-['Silkscreen'] uppercase font-bold">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                        Google Solution (Correct):
                      </div>
                      <p className="text-sm text-emerald-950 font-sans leading-relaxed">
                        {trap.correctAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Golden Exam Rule */}
                  <div className="p-4 rounded-lg bg-blue-50 border-2 border-zinc-900 space-y-1.5 shadow-[2px_2px_0px_#18181B]">
                    <span className="text-xs font-['Silkscreen'] uppercase text-blue-900 font-bold block">
                      🏆 Golden Exam Rule to Memorize:
                    </span>
                    <p className="text-sm sm:text-base text-blue-950 font-sans font-semibold leading-relaxed">
                      {trap.goldenRule}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
