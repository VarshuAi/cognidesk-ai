import React from 'react';
import { 
  Search, 
  Clock, 
  MessageSquarePlus, 
  Command
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import confetti from 'canvas-confetti';

export const TopHeader: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    triggerSimulatedCustomerMessage, 
    setCommandPaletteOpen 
  } = useDeskStore();

  const handleSimulate = () => {
    triggerSimulatedCustomerMessage();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.2 } });
  };

  return (
    <header className="h-16 px-6 bg-[#0a0e1c]/80 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets, customers, or knowledge base..."
            className="w-full pl-9 pr-14 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono flex items-center gap-0.5"
          >
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSimulate}
          className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          title="Simulate a new incoming customer message in real-time"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 text-indigo-400" />
          <span>Simulate Customer Event</span>
        </button>

        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">SLA Met:</span>
          <span className="text-emerald-400 font-bold">99.8%</span>
        </div>

        <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold font-mono border border-[#0a0e1c]" title="AI Autonomous Engine">
            AI
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-[10px] font-bold font-mono border border-[#0a0e1c]" title="Alex Rivera (You)">
            AR
          </div>
        </div>
      </div>
    </header>
  );
};
