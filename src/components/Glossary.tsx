import React, { useState } from 'react';
import { GLOSSARY } from '../data/exam-data';
import { Search } from 'lucide-react';

export const Glossary: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(GLOSSARY.map((g) => g.category)))];

  const filteredTerms = GLOSSARY.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="space-y-6">
      {/* Top Card */}
      <div className="retro-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="pixel-badge pixel-badge-blue">DICTIONARY & INDEX</span>
              <span className="font-['Courier_Prime'] text-xs text-zinc-500">
                {GLOSSARY.length} Google Cloud GenAI Terms
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 mt-1 flex items-center gap-2">
              <span>📖</span> Google Cloud GenAI Glossary
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Essential enterprise AI concepts, foundation models, parameter definitions, and security frameworks defined in clear, concise language.
            </p>
          </div>
        </div>

        {/* Search and Category Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4 pt-4 border-t-2 border-zinc-200">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms (e.g. RAG, RLHF, SAIF, Gemma, PEFT)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border-2 border-zinc-900 bg-white text-xs font-['Courier_Prime'] text-zinc-900 focus:outline-none shadow-[2px_2px_0px_#18181B]"
            />
          </div>

          <div className="sm:col-span-6 flex flex-wrap gap-1.5 text-xs font-['Courier_Prime']">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md border-2 capitalize font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
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

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            className="retro-card-sm p-4 sm:p-5 space-y-2 hover:shadow-[4px_4px_0px_#18181B] transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="pixel-badge pixel-badge-blue text-[8px]">
                  {item.category}
                </span>
                <span className="font-['Silkscreen'] text-[9px] text-zinc-500">
                  REF-{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>

              <h3 className="font-sans font-bold text-base sm:text-lg text-zinc-900">
                {item.term}
              </h3>

              <p className="text-sm text-zinc-800 leading-relaxed font-sans">
                {item.definition}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
