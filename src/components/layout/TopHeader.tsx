import React from 'react';
import { 
  Bot, 
  Inbox, 
  BookOpen, 
  Workflow, 
  BarChart3, 
  Settings, 
  Radio, 
  PanelRight, 
  Sparkles, 
  PhoneCall, 
  MessageSquarePlus, 
  Search
} from 'lucide-react';
import { useDeskStore, ActiveTab } from '../../store/useDeskStore';

export const TopHeader: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    tickets, 
    metrics, 
    isInspectorOpen, 
    toggleInspector,
    triggerSimulatedCustomerMessage, 
    setCustomerSimulatorOpen, 
    setVoiceModalOpen,
    setCommandPaletteOpen
  } = useDeskStore();

  const openTicketsCount = tickets.filter(t => t.status !== 'resolved').length;

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; badge?: number | string }> = [
    { id: 'inbox', label: 'Inbox', icon: <Inbox className="w-3.5 h-3.5" />, badge: openTicketsCount },
    { id: 'knowledge', label: 'Docs', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'playbooks', label: 'Workflows', icon: <Workflow className="w-3.5 h-3.5" /> },
    { id: 'analytics', label: 'Metrics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="h-13 px-4 bg-[#09090b] border-b border-zinc-800/80 flex items-center justify-between shrink-0 select-none z-20">
      {/* Left: Brand & Navigation */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-100">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-zinc-100 tracking-tight">CogniDesk</span>
            <span className="text-[10px] font-mono text-zinc-500">AI</span>
          </div>
        </div>

        {/* Calm Navigation Tabs */}
        <nav className="flex items-center gap-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'bg-zinc-800/80 text-zinc-100 font-medium'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/60' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Search, Actions, Telemetry */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors"
        >
          <Search className="w-3 h-3" />
          <span>Search</span>
          <kbd className="px-1 py-0.2 rounded bg-zinc-800 text-[10px] text-zinc-500">⌘K</kbd>
        </button>

        {/* Live Deflection Badge */}
        <div className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-300">{metrics.aiDeflectionRate}% AI Deflection</span>
        </div>

        {/* Simulator Button */}
        <button
          onClick={triggerSimulatedCustomerMessage}
          className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          title="Inject incoming simulated customer event"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 text-indigo-400" />
          <span>Simulate Event</span>
        </button>

        {/* Customer Simulator Widget */}
        <button
          onClick={() => setCustomerSimulatorOpen(true)}
          className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Widget</span>
        </button>

        {/* Voice SIP Simulator */}
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          title="Voice Call Telephony Simulator"
        >
          <PhoneCall className="w-3.5 h-3.5" />
        </button>

        {/* Inspector Toggle (⌘I) */}
        {activeTab === 'inbox' && (
          <button
            onClick={toggleInspector}
            className={`p-1.5 rounded-lg border transition-colors ${
              isInspectorOpen
                ? 'bg-indigo-950 text-indigo-300 border-indigo-800/60'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800'
            }`}
            title="Toggle Details & Copilot Inspector (⌘I)"
          >
            <PanelRight className="w-3.5 h-3.5" />
          </button>
        )}

        {/* User Pill */}
        <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700/60 text-zinc-200 flex items-center justify-center text-[10px] font-mono font-bold">
          AR
        </div>
      </div>
    </header>
  );
};
