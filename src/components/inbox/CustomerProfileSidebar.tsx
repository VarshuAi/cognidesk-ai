import React from 'react';
import { 
  Building2, 
  Globe, 
  Calendar, 
  Activity
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';

export const CustomerProfileSidebar: React.FC = () => {
  const { tickets, selectedTicketId } = useDeskStore();
  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  if (!activeTicket) return null;

  const { customer } = activeTicket;

  return (
    <div className="w-72 h-full bg-[#0a0e1c] border-l border-slate-800/80 p-4 space-y-4 shrink-0 select-none overflow-y-auto text-xs font-sans">
      <div className="text-center space-y-2 pb-3 border-b border-slate-800">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mx-auto flex items-center justify-center text-lg font-bold font-mono text-indigo-300 shadow-md">
          {customer.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-100">{customer.name}</h3>
          <p className="text-[11px] text-slate-400">{customer.email}</p>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
            {customer.planTier} Tier
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
            {customer.stripeStatus}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Revenue & Account Value</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-mono block">Monthly MRR</span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono">${customer.mrr.toLocaleString()}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-mono block">Lifetime LTV</span>
            <span className="text-sm font-extrabold text-indigo-400 font-mono">${customer.ltv.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Account Metadata</label>
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 font-sans"><Building2 className="w-3.5 h-3.5 text-indigo-400" /> Company</span>
            <span className="text-slate-200">{customer.company}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 font-sans"><Globe className="w-3.5 h-3.5 text-cyan-400" /> Location</span>
            <span className="text-slate-200">{customer.country}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 font-sans"><Calendar className="w-3.5 h-3.5 text-amber-400" /> Member Since</span>
            <span className="text-slate-200">{customer.joinedDate}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 font-sans"><Activity className="w-3.5 h-3.5 text-purple-400" /> Total Tickets</span>
            <span className="text-slate-200">{customer.totalTickets} ({customer.resolvedByAiCount} by AI)</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Account Tags</label>
        <div className="flex flex-wrap gap-1">
          {customer.tags.map((tag, i) => (
            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
