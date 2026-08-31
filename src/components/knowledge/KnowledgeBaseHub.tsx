import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { ArticleEditorModal } from './ArticleEditorModal';

export const KnowledgeBaseHub: React.FC = () => {
  const { 
    knowledgeArticles, 
    selectedKnowledgeArticleId, 
    setSelectedKnowledgeArticleId,
    setArticleModalOpen 
  } = useDeskStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = knowledgeArticles.filter(a => {
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const selectedArticle = knowledgeArticles.find(a => a.id === selectedKnowledgeArticleId) || knowledgeArticles[0];
  const categories = ['all', 'Billing & Invoicing', 'API & Developer Webhooks', 'Security, SSO & SAML', 'Plans, Upgrades & Add-ons'];

  return (
    <div className="flex-1 h-full bg-[#09090b] flex overflow-hidden select-none">
      <div className="w-80 h-full bg-[#0d0d10] border-r border-zinc-800/80 flex flex-col shrink-0">
        <div className="p-3.5 border-b border-zinc-800/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-zinc-100">Knowledge Base</h3>
            <button
              onClick={() => setArticleModalOpen(true)}
              className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-medium flex items-center gap-1 transition-colors border border-zinc-700/60"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Doc</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search docs..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto pb-0.5 text-xs">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {c === 'all' ? 'All' : c.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/40">
          {filteredArticles.map(art => {
            const isSelected = art.id === selectedArticle?.id;
            return (
              <div
                key={art.id}
                onClick={() => setSelectedKnowledgeArticleId(art.id)}
                className={`p-3.5 cursor-pointer transition-colors space-y-1 ${
                  isSelected
                    ? 'bg-zinc-800/60 border-l-2 border-indigo-500'
                    : 'hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>{art.category}</span>
                  <span>{art.helpfulScore}% helpful</span>
                </div>
                <h4 className="text-xs font-medium text-zinc-200 line-clamp-1">{art.title}</h4>
                <p className="text-[11px] text-zinc-400 line-clamp-1">{art.content.replace(/##|\`\`\`|###/g, '')}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 h-full overflow-y-auto p-8 max-w-3xl mx-auto w-full">
        {selectedArticle ? (
          <div className="space-y-6">
            <div className="space-y-2 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>Updated {selectedArticle.lastUpdated}</span>
                <span>•</span>
                <span>{selectedArticle.vectorDimensions}-dim vector</span>
              </div>
              <h1 className="text-xl font-bold text-zinc-100">{selectedArticle.title}</h1>
              <div className="flex items-center gap-1.5 pt-1">
                {selectedArticle.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4 text-zinc-300">
              <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                {selectedArticle.content}
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
            Select an article from the left sidebar to view contents.
          </div>
        )}
      </div>

      <ArticleEditorModal />
    </div>
  );
};
