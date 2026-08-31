import React from 'react';
import { 
  Bot, 
  Inbox, 
  BookOpen, 
  Workflow, 
  BarChart3, 
  Settings, 
  Radio, 
  Clock, 
  Sparkles, 
  PhoneCall, 
  MessageSquarePlus,
  Search
} from 'lucide-react';
import { useDeskStore, ActiveTab } from '../../store/useDeskStore';
import confetti from 'canvas-confetti';

export const TopHeader: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    tickets, 
    metrics, 
    triggerSimulatedCustomerMessage, 
    setCustomerSimulatorOpen, 
    setVoiceModalOpen,
    setCommandPaletteOpen
  } = useDeskStore();

  const openTicketsCount = tickets.filter(t => t.status !== 'resolved').length;

  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; badge?: number | string }> = [
    { id: 'inbox', label: 'Omnichannel Inbox', icon: <Inbox className="w-4 h-4" />, badge: openTicketsCount },
    { id: 'knowledge', label: 'Knowledge Base', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'playbooks', label: 'Playbooks', icon: <Workflow className="w-4 h-4" />, badge: '3 Active' },
    { id: 'analytics', label: 'CSAT & Deflection', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: 'Integrations', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleSimulate = () => {
    triggerSimulatedCustomerMessage();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.2 } });
  };

  return (
    <header className="h-16 px-6 bg-[#080c18] border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none z-20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0d1326] rounded-[11px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-white tracking-tight">CogniDesk</span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">AI</span>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-[#0d1222] p-1 rounded-2xl border border-slate-800">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          title="Command Palette (Ctrl + K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-500">⌘K</kbd>
        </button>

        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <Radio className="w-3 h-3 animate-pulse" />
            {metrics.aiDeflectionRate}% Deflection
          </span>
          <span className="w-[1px] h-3 bg-slate-800" />
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400" />
            99.8% SLA
          </span>
        </div>

        <button
          onClick={handleSimulate}
          className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          title="Inject an incoming simulated customer event"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 text-indigo-400" />
          <span>Simulate Message</span>
        </button>

        <button
          onClick={() => setCustomerSimulatorOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          title="Open floating end-user chat simulator"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Customer View</span>
        </button>

        <button
          onClick={() => setVoiceModalOpen(true)}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-all"
          title="Voice Call Telephony Simulator"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono shadow-md">
            AR
          </div>
        </div>
      </div>
    </header>
  );
};
