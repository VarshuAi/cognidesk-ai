import React, { useState } from 'react';
import { X, Sparkles, FileText, Check } from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import confetti from 'canvas-confetti';

export const ArticleEditorModal: React.FC = () => {
  const { isArticleModalOpen, setArticleModalOpen, addNewArticle } = useDeskStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Billing & Invoicing');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('billing, refund, enterprise');

  if (!isArticleModalOpen) return null;

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    addNewArticle({
      title,
      category,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    setArticleModalOpen(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl glass-dropdown p-6 rounded-3xl shadow-2xl border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Author Knowledge Base Article</h3>
          </div>
          <button onClick={() => setArticleModalOpen(false)} className="text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs font-sans">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. EU Sovereign Cloud & Data Isolation Specifications"
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="Billing & Invoicing">Billing & Invoicing</option>
                <option value="API & Developer Webhooks">API & Developer Webhooks</option>
                <option value="Security, SSO & SAML">Security, SSO & SAML</option>
                <option value="Plans, Upgrades & Add-ons">Plans, Upgrades & Add-ons</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Markdown Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the article content in Markdown format..."
              rows={8}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setArticleModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Publish & Embed to Vector Store</span>
          </button>
        </div>
      </div>
    </div>
  );
};
