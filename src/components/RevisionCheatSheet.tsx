import React, { useState } from 'react';
import { REVISION_CHEAT_SHEET } from '../data/revision-cheat-sheet';
import { Search, Lightbulb, Printer } from 'lucide-react';

export const RevisionCheatSheet: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSections = REVISION_CHEAT_SHEET.filter((sec) => {
    if (selectedDomain !== 'all' && sec.domainId !== selectedDomain) return false;
    return true;
  }).map((sec) => {
    if (!searchQuery.trim()) return sec;
    const q = searchQuery.toLowerCase();

    // Filter categories that match search
    const matchedCategories = sec.categories.map((cat) => {
      const matchedBullets = cat.bulletPoints.filter(
        (b) =>
          b.boldTerm.toLowerCase().includes(q) ||
          b.quickFact.toLowerCase().includes(q) ||
          (b.examTip && b.examTip.toLowerCase().includes(q))
      );
      return { ...cat, bulletPoints: matchedBullets };
    }).filter((cat) => cat.bulletPoints.length > 0);

    return { ...sec, categories: matchedCategories };
  }).filter((sec) => sec.categories.length > 0);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="retro-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="pixel-badge pixel-badge-amber">RAPID REVISION</span>
              <span className="font-['Courier_Prime'] text-xs text-zinc-500">D3 GAIL Preparation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1 flex items-center gap-2">
              <span>⚡</span> Exam Revision Cheat Sheet (Course Summary)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              High-yield, bulleted summary covering all 5 courses and 4 exam domains. Perfect for last-minute review before testing.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="retro-btn px-3 py-1.5 text-xs font-bold"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-700" />
            <span>Print Cheat Sheet</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4 pt-4 border-t-2 border-zinc-200">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g. Gemini, RAG, SAIF, TPUs)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border-2 border-zinc-900 bg-white text-xs font-['Courier_Prime'] text-zinc-900 focus:outline-none shadow-[2px_2px_0px_#18181B]"
            />
          </div>

          <div className="sm:col-span-7 flex flex-wrap gap-1.5 text-xs font-['Courier_Prime']">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'fundamentals', label: 'D1: Fundamentals' },
              { id: 'google-cloud-offerings', label: 'D2: Offerings' },
              { id: 'improve-output', label: 'D3: Output' },
              { id: 'business-strategies', label: 'D4: Strategy' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className={`px-2.5 py-1.5 rounded-md border-2 font-bold transition-all cursor-pointer ${
                  selectedDomain === d.id
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-[2px_2px_0px_#52525B]'
                    : 'bg-white text-zinc-700 border-zinc-900 shadow-[2px_2px_0px_#18181B] hover:bg-zinc-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cheat Sheet Bullet Point Sections */}
      <div className="space-y-6">
        {filteredSections.map((sec) => (
          <div
            key={sec.domainId}
            className="retro-card p-6 shadow-[4px_4px_0px_#18181B] space-y-6"
          >
            {/* Domain Section Title */}
            <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
              <div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-zinc-900">
                  {sec.domainTitle}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">{sec.summary}</p>
              </div>
              <span className="pixel-badge pixel-badge-blue">
                {sec.weight}
              </span>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {sec.categories.map((cat, catIdx) => (
                <div
                  key={catIdx}
                  className="bg-zinc-50 border-2 border-zinc-900 rounded-lg p-5 space-y-3.5 shadow-[2px_2px_0px_#18181B]"
                >
                  <h4 className="font-sans font-bold text-base sm:text-lg text-zinc-900 border-b-2 border-zinc-300 pb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-zinc-900"></span>
                      {cat.categoryTitle}
                    </span>
                    <span className="font-['Silkscreen'] text-[9px] text-zinc-500 font-bold">
                      {cat.bulletPoints.length} PTS
                    </span>
                  </h4>

                  <ul className="space-y-3 text-sm sm:text-base text-zinc-900 font-sans">
                    {cat.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx} className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <span className="text-zinc-900 font-bold shrink-0">•</span>
                          <span className="leading-relaxed">
                            <strong className="text-zinc-950 font-bold">{b.boldTerm}:</strong>{' '}
                            {b.quickFact}
                          </span>
                        </div>

                        {b.examTip && (
                          <div className="ml-3 sm:ml-4 p-2.5 rounded bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-2 font-sans leading-relaxed">
                            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              <strong className="font-semibold text-amber-900">Exam Rule:</strong> {b.examTip}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
