import React, { useState } from 'react';
import { COMPREHENSIVE_STUDY_MODULES } from '../data/curated-study-notes';
import { EXAM_SECTIONS } from '../data/exam-data';
import type { UserProgress } from '../types';
import { toggleMasterTopic, savePersonalNote } from '../utils/storage';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
  Save,
} from 'lucide-react';

interface NotebookStudyProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const NotebookStudy: React.FC<NotebookStudyProps> = ({
  progress,
  onProgressUpdate,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('course-1-foundations');
  const [viewMode, setViewMode] = useState<'notes' | 'officialQA'>('notes');
  const [editingNote, setEditingNote] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');

  const activeModule = COMPREHENSIVE_STUDY_MODULES.find((m) => m.id === selectedModuleId) || COMPREHENSIVE_STUDY_MODULES[0];
  const isMastered = progress.masteredTopicIds.includes(activeModule.id);

  // Map module to official section for Q&A view
  const sectionMapping: Record<string, string> = {
    'course-1-foundations': 'fundamentals',
    'course-2-landscape': 'google-cloud-offerings',
    'course-3-techniques': 'improve-output',
    'course-4-work': 'google-cloud-offerings',
    'course-5-organization': 'business-strategies',
  };
  const officialSection = EXAM_SECTIONS.find((s) => s.id === sectionMapping[activeModule.id]);

  const handleToggleMastered = () => {
    const nowMastered = toggleMasterTopic(activeModule.id);
    const updatedIds = nowMastered
      ? [...progress.masteredTopicIds, activeModule.id]
      : progress.masteredTopicIds.filter((id) => id !== activeModule.id);
    onProgressUpdate({ ...progress, masteredTopicIds: updatedIds });
  };

  const handleSaveNote = () => {
    savePersonalNote(activeModule.id, noteText);
    const updatedNotes = { ...progress.notes, [activeModule.id]: noteText };
    onProgressUpdate({ ...progress, notes: updatedNotes });
    setEditingNote(false);
  };

  const currentSavedNote = progress.notes[activeModule.id] || '';

  return (
    <div className="space-y-6">
      {/* Top Banner Card (Retro Machine Bezel) */}
      <div className="retro-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="pixel-badge pixel-badge-blue">
                STAGE STUDY MODE
              </span>
              <span className="font-['Courier_Prime'] text-xs text-zinc-500">
                Google Cloud Skills Boost Curriculum
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1 flex items-center gap-2">
              <span>🕹️</span> Field Study Modules & Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Detailed, point-wise study guides matching the 5 official courses. Switch to Official Q&A for verified exam solutions.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg border-2 border-zinc-900 bg-zinc-100 text-xs font-['Courier_Prime']">
            <button
              onClick={() => setViewMode('notes')}
              className={`px-3 py-1.5 rounded font-bold cursor-pointer transition-all ${
                viewMode === 'notes'
                  ? 'bg-zinc-900 text-white shadow-[1px_1px_0px_#18181B]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Detailed Notes
            </button>
            <button
              onClick={() => setViewMode('officialQA')}
              className={`px-3 py-1.5 rounded font-bold cursor-pointer transition-all ${
                viewMode === 'officialQA'
                  ? 'bg-blue-600 text-white shadow-[1px_1px_0px_#18181B]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Official Q&A
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Cartridge Sidebar + Notebook Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: 5 Courses Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="retro-card p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-2">
              <span className="font-['Silkscreen'] text-[10px] uppercase font-bold text-zinc-600">
                COURSE STAGES (1 - 5)
              </span>
              <span className="font-['Courier_Prime'] text-[10px] text-zinc-400">
                SELECT CARTRIDGE
              </span>
            </div>

            <div className="space-y-2">
              {COMPREHENSIVE_STUDY_MODULES.map((mod, idx) => {
                const isSelected = mod.id === selectedModuleId;
                const mastered = progress.masteredTopicIds.includes(mod.id);

                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setSelectedModuleId(mod.id);
                      setEditingNote(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-[3px_3px_0px_#52525B]'
                        : 'bg-white hover:bg-zinc-50 text-zinc-900 border-zinc-900 shadow-[2px_2px_0px_#18181B]'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-['Silkscreen'] text-[9px] uppercase font-bold tracking-wider ${
                            isSelected ? 'text-emerald-400' : 'text-zinc-600'
                          }`}
                        >
                          STAGE 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          {mastered && (
                            <span className="pixel-badge pixel-badge-green text-[8px] py-0">
                              ✓ PASS
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-['Courier_Prime'] flex items-center gap-1 ${
                              isSelected ? 'text-zinc-300' : 'text-zinc-500'
                            }`}
                          >
                            <Clock className="w-2.5 h-2.5" />
                            {mod.estimatedReadTime}
                          </span>
                        </div>
                      </div>

                      <h4
                        className={`font-sans text-xs sm:text-sm font-semibold mt-0.5 truncate ${
                          isSelected ? 'text-white' : 'text-zinc-900'
                        }`}
                      >
                        {mod.courseTitle.replace(/^Course \d:\s*/, '')}
                      </h4>

                      <span
                        className={`text-[10px] font-['Courier_Prime'] block mt-1 ${
                          isSelected ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {mod.domainMapping}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Retro Machine Strategy Box */}
          <div className="retro-card-sm p-3.5 bg-amber-50/80 border-2 border-zinc-900 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-950 font-bold font-['Silkscreen'] text-[9px] uppercase">
              <span>💡</span>
              <span>EXAM BLUEPRINT STRATEGY</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-sans">
              Focus on understanding <strong>trade-offs</strong> (e.g. RAG vs Fine-tuning, Gemini vs Gemma, Vertex AI Studio vs Google AI Studio). The questions are 100% scenario-based!
            </p>
          </div>
        </div>

        {/* Right Area: Module Details Sheet (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {viewMode === 'notes' && (
            <div className="retro-card p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-900 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="pixel-badge pixel-badge-blue">
                      {activeModule.domainMapping}
                    </span>
                    <span className="text-xs text-zinc-500 font-['Courier_Prime'] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeModule.estimatedReadTime} read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-2">
                    {activeModule.courseTitle}
                  </h2>
                </div>

                <button
                  onClick={handleToggleMastered}
                  className={`retro-btn px-3 py-1.5 text-xs font-['Courier_Prime'] font-bold border-2 transition-all cursor-pointer ${
                    isMastered
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-600'
                      : 'bg-white text-zinc-900 border-zinc-900'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
                </button>
              </div>

              {/* Module Overview with clean retro accent border */}
              <div className="p-4 rounded-lg bg-zinc-50 border-2 border-zinc-900 border-l-4 border-l-blue-600 text-sm sm:text-base text-zinc-800 leading-relaxed font-sans shadow-[2px_2px_0px_#18181B]">
                <strong className="text-zinc-950 font-bold">Executive Summary:</strong> {activeModule.moduleOverview}
              </div>

              {/* Point-wise Subtopics */}
              <div className="space-y-6">
                {activeModule.subtopics.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="font-sans font-bold text-base sm:text-lg text-zinc-900 pb-1 border-b-2 border-zinc-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-zinc-900"></span>
                      {sub.subtopicTitle}
                    </h3>

                    {/* Point-wise items */}
                    <div className="space-y-3 pl-2 sm:pl-3">
                      {sub.points.map((pt, pIdx) => (
                        <div key={pIdx} className="space-y-1">
                          <div className="text-sm sm:text-base text-zinc-900 font-sans leading-relaxed">
                            <strong className="text-zinc-950 font-bold">• {pt.term}:</strong>{' '}
                            {pt.explanation}
                          </div>

                          {pt.exampleOrDetail && (
                            <div className="ml-3 sm:ml-4 p-3 rounded-lg bg-zinc-50 border border-zinc-300 text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed">
                              {pt.exampleOrDetail}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {sub.practicalTakeaway && (
                      <div className="ml-2 sm:ml-3 p-3.5 rounded-lg bg-amber-50 border-2 border-zinc-900 text-xs sm:text-sm text-amber-950 shadow-[2px_2px_0px_#18181B]">
                        <span className="font-['Silkscreen'] text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-1">
                          💡 KEY EXAM TAKEAWAY:
                        </span>
                        <span className="font-sans text-xs sm:text-sm leading-relaxed text-amber-950 font-medium">
                          {sub.practicalTakeaway}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Exam Focus Points Checklist */}
              <div className="p-4 rounded-xl bg-blue-50/80 border-2 border-zinc-900 space-y-2 shadow-[2px_2px_0px_#18181B]">
                <span className="font-['Silkscreen'] text-[10px] font-bold uppercase text-blue-900 block">
                  🎯 MUST-KNOW EXAM FOCUS POINTS:
                </span>
                <ul className="space-y-1.5 text-sm text-blue-950 font-sans leading-relaxed">
                  {activeModule.examFocusPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Documentation Links */}
              {activeModule.officialDocLinks && activeModule.officialDocLinks.length > 0 && (
                <div className="pt-4 border-t-2 border-zinc-200">
                  <span className="text-xs font-['Courier_Prime'] font-bold uppercase text-zinc-600 block mb-2">
                    Official Google Cloud Reference Links:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModule.officialDocLinks.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="retro-btn px-3 py-1.5 text-xs text-blue-700 border-2 border-zinc-900 hover:bg-blue-50 font-['Courier_Prime']"
                      >
                        <span>{doc.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Student Notes Box */}
              <div className="pt-4 border-t-2 border-zinc-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['Courier_Prime'] text-xs font-bold uppercase text-zinc-700 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-zinc-600" />
                    My Personal Study Notes:
                  </span>
                  {!editingNote && (
                    <button
                      onClick={() => {
                        setNoteText(currentSavedNote);
                        setEditingNote(true);
                      }}
                      className="text-xs text-blue-700 hover:underline font-['Courier_Prime'] cursor-pointer font-bold"
                    >
                      {currentSavedNote ? 'Edit Notes' : '+ Add Note'}
                    </button>
                  )}
                </div>

                {editingNote ? (
                  <div className="space-y-2">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Jot down personal reminders or mnemonics..."
                      className="w-full p-3 rounded-lg border-2 border-zinc-900 bg-white font-sans text-sm sm:text-base text-zinc-900 focus:outline-none min-h-[90px] shadow-[2px_2px_0px_#18181B]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNote(false)}
                        className="retro-btn px-3 py-1 text-xs text-zinc-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNote}
                        className="retro-btn-dark px-3 py-1 text-xs font-bold"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Notes
                      </button>
                    </div>
                  </div>
                ) : currentSavedNote ? (
                  <div className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-900 font-sans text-sm sm:text-base text-zinc-900 shadow-[2px_2px_0px_#18181B] leading-relaxed">
                    "{currentSavedNote}"
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-zinc-50/50 border border-dashed border-zinc-300 text-xs sm:text-sm font-sans italic text-zinc-500">
                    No personal notes added yet. Click "+ Add Note" to save notes for this module.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 2: OFFICIAL BLUEPRINT Q&A (Filter empty categories)
              ======================================================== */}
          {viewMode === 'officialQA' && officialSection && (
            <div className="retro-card p-6 sm:p-8 space-y-6">
              <div className="border-b-2 border-zinc-900 pb-3">
                <span className="pixel-badge pixel-badge-blue mb-1">
                  OFFICIAL BLUEPRINT VERIFIED Q&A
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1">
                  {officialSection.title} — Official Review Q&A
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                  Core questions and verified answers matching Google Cloud's official certification blueprint.
                </p>
              </div>

              {/* Filter out any topic that has no studyQA so no empty headers appear */}
              <div className="space-y-6">
                {officialSection.topics
                  .filter((top) => top.studyQA && top.studyQA.length > 0)
                  .map((top) => (
                    <div key={top.id} className="space-y-3">
                      <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-1">
                        <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 flex items-center gap-1.5">
                          <span>📂</span> {top.title}
                        </h3>
                        <span className="font-['Silkscreen'] text-[10px] bg-zinc-100 border border-zinc-900 px-2 py-0.5 rounded shadow-[1px_1px_0px_#18181B]">
                          {top.studyQA?.length} QUESTIONS
                        </span>
                      </div>

                      <div className="space-y-3.5">
                        {top.studyQA?.map((qa, i) => (
                          <div
                            key={i}
                            className="p-4 sm:p-5 rounded-lg bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] space-y-2.5"
                          >
                            <div className="flex items-start gap-2">
                              <span className="pixel-badge pixel-badge-blue shrink-0">
                                Q{i + 1}
                              </span>
                              <h4 className="font-sans font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                                {qa.question}
                              </h4>
                            </div>

                            <div className="pl-3 border-l-3 border-emerald-600 bg-emerald-50/50 p-3 rounded border border-emerald-200">
                              <span className="font-['Silkscreen'] text-[9px] uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                                ✓ OFFICIAL SOLUTION:
                              </span>
                              <p className="text-sm sm:text-base text-emerald-950 leading-relaxed font-sans font-medium">
                                {qa.answer}
                              </p>
                            </div>

                            {qa.officialSource && (
                              <div className="pt-1 text-right">
                                <a
                                  href={qa.officialSource}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-700 hover:underline font-['Courier_Prime'] inline-flex items-center gap-1 font-bold"
                                >
                                  <span>Official Google Cloud Reference</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
