import React from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Smartphone, 
  Clock, 
  Search
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { ChannelType } from '../../types/inbox';

const CHANNEL_ICONS: Record<ChannelType, React.ReactNode> = {
  chat: <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />,
  whatsapp: <Smartphone className="w-3.5 h-3.5 text-emerald-400" />,
  email: <Mail className="w-3.5 h-3.5 text-blue-400" />,
  voice: <Phone className="w-3.5 h-3.5 text-amber-400" />,
  sms: <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
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
    <div className="w-80 h-full bg-[#0d0d10] border-r border-zinc-800/80 flex flex-col shrink-0 select-none">
      {/* Search & Channel Tabs */}
      <div className="p-3 border-b border-zinc-800/80 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Channel Pills */}
        <div className="flex gap-1 overflow-x-auto pb-0.5 text-xs">
          {channels.map(c => (
            <button
              key={c.id}
              onClick={() => setChannelFilter(c.id)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                channelFilter === c.id
                  ? 'bg-zinc-800 text-zinc-100 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-0.5">
          <span>{filteredTickets.length} tickets</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-zinc-300 focus:outline-none cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="autonomous_ai">Autonomous AI</option>
            <option value="human_escalated">Human Escalated</option>
            <option value="waiting_customer">Waiting</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Ticket List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/40">
        {filteredTickets.map(ticket => {
          const isSelected = ticket.id === selectedTicketId;
          const lastMsg = ticket.messages[ticket.messages.length - 1];

          return (
            <div
              key={ticket.id}
              onClick={() => selectTicket(ticket.id)}
              className={`p-3 cursor-pointer transition-colors space-y-1.5 ${
                isSelected
                  ? 'bg-zinc-800/60 border-l-2 border-indigo-500'
                  : 'hover:bg-zinc-900/50'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  {CHANNEL_ICONS[ticket.channel]}
                  <span className="font-mono text-zinc-400 text-[10px]">{ticket.ticketNumber}</span>
                  {ticket.status === 'autonomous_ai' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-mono">
                      AI
                    </span>
                  )}
                  {ticket.status === 'human_escalated' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-mono">
                      Human
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">10m ago</span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-200 line-clamp-1">
                  {ticket.title}
                </h4>
                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                  {lastMsg ? lastMsg.content : 'No messages'}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-0.5">
                <span className="truncate max-w-[120px] text-zinc-400 font-sans">{ticket.customer.name}</span>
                <span className="flex items-center gap-1 text-zinc-400">
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
