import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Layers, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { ArticleEditorModal } from './ArticleEditorModal';
import confetti from 'canvas-confetti';

export const KnowledgeBaseHub: React.FC = () => {
  const { 
    knowledgeArticles, 
    knowledgeGaps, 
    resolveGap, 
    setArticleModalOpen 
  } = useDeskStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = knowledgeArticles.filter(a => {
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const categories = ['all', 'Billing & Invoicing', 'API & Developer Webhooks', 'Security, SSO & SAML', 'Plans, Upgrades & Add-ons'];

  const handleDraftFromGap = (gapId: string, title: string) => {
    resolveGap(gapId);
    setArticleModalOpen(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="flex-1 h-full bg-[#080b14] overflow-y-auto p-8 space-y-8 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Knowledge Base & RAG Vector Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Grounded enterprise documentation index with real-time vector embeddings and missing knowledge discovery.
          </p>
        </div>

        <button
          onClick={() => setArticleModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="p-5 rounded-3xl bg-[#0c1020] border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-amber-200">AI-Discovered Knowledge Gaps</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
              {knowledgeGaps.filter(g => g.status === 'open').length} High-Impact Gaps
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Discovered from ungrounded customer queries</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {knowledgeGaps.map(gap => (
            <div key={gap.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="text-amber-400 font-bold">{gap.occurrences} customer requests</span>
                  <span>Impact: {gap.impactScore}/10</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 line-clamp-2 leading-snug">{gap.unansweredQuery}</h4>
              </div>

              <button
                onClick={() => handleDraftFromGap(gap.id, gap.suggestedTitle)}
                className="w-full py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Draft Article</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === c
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {c === 'all' ? 'All Collections' : c}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter articles & tags..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              className="p-5 rounded-2xl bg-[#0a0e1c] border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                  {art.category}
                </span>
                <span className="text-emerald-400">{art.helpfulScore}% Helpful</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {art.content.replace(/##|\`\`\`|###/g, '')}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-1">
                  {art.tags.map(t => (
                    <span key={t} className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-400">#{t}</span>
                  ))}
                </div>
                <span>1536-dim Vector Embed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ArticleEditorModal />
    </div>
  );
};
