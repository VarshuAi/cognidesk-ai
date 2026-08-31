import React from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Smartphone, 
  Clock, 
  Smile, 
  Frown, 
  Meh, 
  Flame, 
  Search
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { ChannelType, SentimentType } from '../../types/inbox';

const CHANNEL_ICONS: Record<ChannelType, React.ReactNode> = {
  chat: <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />,
  whatsapp: <Smartphone className="w-3.5 h-3.5 text-emerald-400" />,
  email: <Mail className="w-3.5 h-3.5 text-cyan-400" />,
  voice: <Phone className="w-3.5 h-3.5 text-amber-400" />,
  sms: <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
};

const SENTIMENT_ICONS: Record<SentimentType, React.ReactNode> = {
  positive: <Smile className="w-3.5 h-3.5 text-emerald-400" />,
  neutral: <Meh className="w-3.5 h-3.5 text-slate-400" />,
  frustrated: <Frown className="w-3.5 h-3.5 text-amber-400" />,
  churn_risk: <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
};

export const TicketList: React.FC = () => {
  const { 
    tickets, 
    selectedTicketId, 
    selectTicket, 
    channelFilter, 
    setChannelFilter, 
    statusFilter, 
    setStatusFilter, 
    searchQuery,
    setSearchQuery 
  } = useDeskStore();

  const filteredTickets = tickets.filter(t => {
    const matchesChannel = channelFilter === 'all' || t.channel === channelFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesStatus && matchesSearch;
  });

  const channels: Array<{ id: ChannelType | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'chat', label: 'Chat' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'email', label: 'Email' },
    { id: 'voice', label: 'Voice' },
  ];

  return (
    <div className="w-80 h-full bg-[#0a0e1c] border-r border-slate-800/80 flex flex-col shrink-0 select-none">
      <div className="p-3.5 border-b border-slate-800/80 space-y-2.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter queue..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto pb-0.5 text-[11px] font-medium">
          {channels.map(c => (
            <button
              key={c.id}
              onClick={() => setChannelFilter(c.id)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all ${
                channelFilter === c.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
          <span className="font-bold uppercase tracking-wider text-slate-400">Queue ({filteredTickets.length})</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="autonomous_ai">Autonomous AI</option>
            <option value="human_escalated">Human Escalated</option>
            <option value="waiting_customer">Waiting</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
        {filteredTickets.map(ticket => {
          const isSelected = ticket.id === selectedTicketId;
          const lastMsg = ticket.messages[ticket.messages.length - 1];

          return (
            <div
              key={ticket.id}
              onClick={() => selectTicket(ticket.id)}
              className={`p-3.5 cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'bg-indigo-950/30 border-l-2 border-indigo-500'
                  : 'hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {CHANNEL_ICONS[ticket.channel]}
                  <span className="text-[10px] font-mono font-bold text-slate-400">{ticket.ticketNumber}</span>
                  {ticket.status === 'autonomous_ai' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-mono">
                      AI Active
                    </span>
                  )}
                  {ticket.status === 'human_escalated' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800/60 font-mono">
                      Human Mode
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1" title={`Customer Sentiment: ${ticket.sentiment}`}>
                  {SENTIMENT_ICONS[ticket.sentiment]}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-indigo-300 transition-colors">
                  {ticket.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {lastMsg ? lastMsg.content : 'No messages yet'}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-0.5">
                <span className="truncate max-w-[120px] text-slate-400 font-sans font-medium">{ticket.customer.name}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Clock className="w-3 h-3" />
                  SLA 15m
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
