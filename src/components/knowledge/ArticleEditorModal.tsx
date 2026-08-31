import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';

export const ArticleEditorModal: React.FC = () => {
  const { isArticleModalOpen, setArticleModalOpen, addNewArticle } = useDeskStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Billing & Invoicing');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('billing, refund, guide');

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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-400" />
            <h3 className="text-xs font-semibold text-zinc-100">Create Documentation Article</h3>
          </div>
          <button onClick={() => setArticleModalOpen(false)} className="text-zinc-500 hover:text-zinc-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-400">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. EU Data Residency & Sovereignty Policy"
              className="w-full p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-700 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="Billing & Invoicing">Billing & Invoicing</option>
                <option value="API & Developer Webhooks">API & Developer Webhooks</option>
                <option value="Security, SSO & SAML">Security, SSO & SAML</option>
                <option value="Plans, Upgrades & Add-ons">Plans, Upgrades & Add-ons</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-400">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-700 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-400">Markdown Body</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Article markdown content..."
              rows={6}
              className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none focus:border-zinc-700 resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
          <button
            onClick={() => setArticleModalOpen(false)}
            className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="px-4 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold disabled:opacity-40 transition-colors"
          >
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};
