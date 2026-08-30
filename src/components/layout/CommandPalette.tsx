import React, { useState, useEffect } from 'react';
import { Search, X, Inbox, BookOpen, Workflow, BarChart3, Bot } from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setCommandPaletteOpen, 
    setActiveTab, 
    tickets, 
    selectTicket,
    knowledgeArticles 
  } = useDeskStore();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isCommandPaletteOpen) return null;

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.customer.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = knowledgeArticles.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl glass-dropdown p-4 rounded-3xl shadow-2xl border border-slate-700/80 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search anything..."
            autoFocus
            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-3 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono px-2">Navigation</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => { setActiveTab('inbox'); setCommandPaletteOpen(false); }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center gap-2 text-slate-300"
              >
                <Inbox className="w-3.5 h-3.5 text-indigo-400" />
                <span>Go to Omnichannel Inbox</span>
              </button>
              <button
                onClick={() => { setActiveTab('knowledge'); setCommandPaletteOpen(false); }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center gap-2 text-slate-300"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Go to Knowledge Base</span>
              </button>
              <button
                onClick={() => { setActiveTab('playbooks'); setCommandPaletteOpen(false); }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center gap-2 text-slate-300"
              >
                <Workflow className="w-3.5 h-3.5 text-emerald-400" />
                <span>Go to Playbooks</span>
              </button>
              <button
                onClick={() => { setActiveTab('analytics'); setCommandPaletteOpen(false); }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center gap-2 text-slate-300"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Go to Analytics</span>
              </button>
            </div>
          </div>

          {filteredTickets.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono px-2">Live Tickets</span>
              {filteredTickets.slice(0, 3).map(t => (
                <div
                  key={t.id}
                  onClick={() => { selectTicket(t.id); setActiveTab('inbox'); setCommandPaletteOpen(false); }}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 cursor-pointer flex items-center justify-between text-slate-200"
                >
                  <span className="truncate">{t.title}</span>
                  <span className="text-[10px] font-mono text-slate-500">{t.ticketNumber}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
