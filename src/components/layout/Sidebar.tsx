import React from 'react';
import { 
  Inbox, 
  BookOpen, 
  Workflow, 
  BarChart3, 
  Bot, 
  PhoneCall, 
  Settings, 
  Sparkles, 
  Radio
} from 'lucide-react';
import { useDeskStore, ActiveTab } from '../../store/useDeskStore';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, tickets, metrics, setCustomerSimulatorOpen, setVoiceModalOpen } = useDeskStore();

  const openTicketsCount = tickets.filter(t => t.status !== 'resolved').length;
  const autonomousCount = tickets.filter(t => t.status === 'autonomous_ai').length;

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; badge?: number | string; badgeColor?: string }> = [
    { id: 'inbox', label: 'Omnichannel Inbox', icon: <Inbox className="w-4 h-4" />, badge: openTicketsCount, badgeColor: 'bg-indigo-600 text-white' },
    { id: 'knowledge', label: 'Knowledge & Vectors', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'playbooks', label: 'Resolution Playbooks', icon: <Workflow className="w-4 h-4" />, badge: '2 Active', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800' },
    { id: 'analytics', label: 'CSAT & Deflection', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: 'Integrations & API', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0a0e1c] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none">
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0d1326] rounded-[15px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-slate-100 tracking-tight">CogniDesk</h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-mono font-bold">AI</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Autonomous Contact Center</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              AI Deflection Mesh
            </span>
            <span className="text-emerald-400 font-mono font-bold">{metrics.aiDeflectionRate}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style={{ width: `${metrics.aiDeflectionRate}%` }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>{autonomousCount} Autonomous Active</span>
            <span>FRT 1.4s</span>
          </div>
        </div>

        <nav className="space-y-1">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block mb-2">Workspace</span>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <div className="space-y-1.5">
          <button
            onClick={() => setCustomerSimulatorOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Launch End-User Chat</span>
          </button>

          <button
            onClick={() => setVoiceModalOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
            <span>Voice Call Simulator</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800/60">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">
            AR
          </div>
          <div className="truncate text-left">
            <p className="text-xs font-bold text-slate-200 truncate">Alex Rivera</p>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Staff Specialist (Online)
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
