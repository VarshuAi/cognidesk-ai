import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Lock, 
  CheckCircle2, 
  UserCheck, 
  FileText
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import confetti from 'canvas-confetti';

export const ConversationView: React.FC = () => {
  const { 
    tickets, 
    selectedTicketId, 
    sendMessage, 
    toggleHumanTakeover, 
    resolveTicket 
  } = useDeskStore();

  const [inputContent, setInputContent] = useState('');
  const [isWhisperMode, setIsWhisperMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTicket?.messages]);

  if (!activeTicket) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#080b14] text-slate-500 text-xs">
        Select a conversation from the queue to view details.
      </div>
    );
  }

  const handleSend = () => {
    if (!inputContent.trim()) return;
    sendMessage(activeTicket.id, inputContent, isWhisperMode);
    setInputContent('');
    if (isWhisperMode) setIsWhisperMode(false);
  };

  const handleResolve = () => {
    resolveTicket(activeTicket.id);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="flex-1 h-full bg-[#080b14] flex flex-col justify-between overflow-hidden">
      <div className="h-16 px-6 bg-[#0a0e1c]/60 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100">{activeTicket.title}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {activeTicket.ticketNumber}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Customer: <span className="font-semibold text-slate-200">{activeTicket.customer.name}</span> ({activeTicket.customer.company})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleHumanTakeover(activeTicket.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTicket.status === 'human_escalated'
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30'
            }`}
          >
            {activeTicket.status === 'human_escalated' ? (
              <><UserCheck className="w-3.5 h-3.5 text-amber-400" /> Human Mode Active</>
            ) : (
              <><Bot className="w-3.5 h-3.5 text-indigo-400" /> Autonomous AI Answering</>
            )}
          </button>

          <button
            onClick={handleResolve}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resolve Ticket</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {activeTicket.messages.map((msg) => {
          const isCustomer = msg.sender === 'customer';
          const isAi = msg.sender === 'ai_agent';
          const isWhisper = msg.isInternalWhisper;

          if (isWhisper) {
            return (
              <div key={msg.id} className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  Internal Specialist Whisper (Hidden from customer) • {msg.timestamp}
                </div>
                <p className="font-sans leading-relaxed">{msg.content}</p>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isCustomer ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                isCustomer 
                  ? 'bg-slate-800 text-slate-200' 
                  : isAi 
                  ? 'bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20' 
                  : 'bg-indigo-600 text-white'
              }`}>
                {isCustomer ? <User className="w-4 h-4" /> : isAi ? <Bot className="w-4 h-4" /> : 'AR'}
              </div>

              <div className="space-y-1.5">
                <div className={`flex items-center gap-2 text-[10px] text-slate-500 font-mono ${isCustomer ? '' : 'justify-end'}`}>
                  <span className="font-bold text-slate-300 font-sans">{msg.senderName}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  isCustomer
                    ? 'bg-slate-900 border border-slate-800 text-slate-100'
                    : isAi
                    ? 'bg-[#10172e] border border-indigo-500/30 text-indigo-50'
                    : 'bg-indigo-600 text-white'
                }`}>
                  <p>{msg.content}</p>

                  {msg.ragCitations && msg.ragCitations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-indigo-500/20 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Grounded Citations:
                      </span>
                      {msg.ragCitations.map((cite, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-cyan-300 border border-cyan-800/40">
                          {cite}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-[#0a0e1c]/80 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWhisperMode(!isWhisperMode)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                isWhisperMode
                  ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Whisper Note</span>
            </button>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Press Enter to send</span>
        </div>

        <div className="flex items-center gap-2">
          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isWhisperMode ? "Write an internal team note (hidden from customer)..." : "Reply to customer directly..."}
            className={`flex-1 h-12 p-3 rounded-xl bg-slate-900 border text-xs focus:outline-none resize-none transition-colors ${
              isWhisperMode 
                ? 'border-amber-500/50 text-amber-100 placeholder-amber-500/50' 
                : 'border-slate-800 text-slate-100 placeholder-slate-500 focus:border-indigo-500'
            }`}
          />
          <button
            onClick={handleSend}
            disabled={!inputContent.trim()}
            className="h-12 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
