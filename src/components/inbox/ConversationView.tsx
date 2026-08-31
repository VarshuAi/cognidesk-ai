import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Lock, 
  CheckCircle2, 
  UserCheck, 
  FileText,
  PanelRight
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';

export const ConversationView: React.FC = () => {
  const { 
    tickets, 
    selectedTicketId, 
    sendMessage, 
    toggleHumanTakeover, 
    resolveTicket,
    isInspectorOpen,
    toggleInspector
  } = useDeskStore();

  const [inputContent, setInputContent] = useState('');
  const [composerMode, setComposerMode] = useState<'customer' | 'whisper'>('customer');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTicket?.messages]);

  if (!activeTicket) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#09090b] text-zinc-500 text-xs">
        Select a conversation from the queue to view details.
      </div>
    );
  }

  const handleSend = () => {
    if (!inputContent.trim()) return;
    sendMessage(activeTicket.id, inputContent, composerMode === 'whisper');
    setInputContent('');
  };

  const handleResolve = () => {
    resolveTicket(activeTicket.id);
  };

  return (
    <div className="flex-1 h-full bg-[#09090b] flex flex-col justify-between overflow-hidden border-r border-zinc-800/80">
      {/* Clean Top Bar */}
      <div className="h-13 px-6 bg-[#0c0c0e] border-b border-zinc-800/80 flex items-center justify-between shrink-0 gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold text-zinc-100 truncate">{activeTicket.title}</h2>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0">
              {activeTicket.ticketNumber}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-sans truncate mt-0.5">
            {activeTicket.customer.name} • {activeTicket.customer.company} ({activeTicket.customer.planTier})
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleHumanTakeover(activeTicket.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
              activeTicket.status === 'human_escalated'
                ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            {activeTicket.status === 'human_escalated' ? (
              <><UserCheck className="w-3.5 h-3.5 text-amber-400" /> Human Mode</>
            ) : (
              <><Bot className="w-3.5 h-3.5 text-indigo-400" /> Autonomous AI</>
            )}
          </button>

          <button
            onClick={handleResolve}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resolve</span>
          </button>

          {!isInspectorOpen && (
            <button
              onClick={toggleInspector}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Open Inspector"
            >
              <PanelRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Message Canvas */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 max-w-4xl mx-auto w-full">
        {activeTicket.messages.map((msg) => {
          const isCustomer = msg.sender === 'customer';
          const isAi = msg.sender === 'ai_agent';
          const isWhisper = msg.isInternalWhisper;

          if (isWhisper) {
            return (
              <div key={msg.id} className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  Internal Note (Team only) • {msg.timestamp}
                </div>
                <p className="font-sans leading-relaxed text-amber-100">{msg.content}</p>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isCustomer ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                isCustomer 
                  ? 'bg-zinc-800 text-zinc-300' 
                  : isAi 
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/60' 
                  : 'bg-zinc-800 text-white'
              }`}>
                {isCustomer ? <User className="w-3.5 h-3.5" /> : isAi ? <Bot className="w-3.5 h-3.5" /> : 'AR'}
              </div>

              <div className="space-y-1">
                <div className={`flex items-center gap-2 text-[10px] text-zinc-500 font-mono ${isCustomer ? '' : 'justify-end'}`}>
                  <span className="font-semibold text-zinc-400 font-sans">{msg.senderName}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                  isCustomer
                    ? 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                    : isAi
                    ? 'bg-[#12131c] border border-indigo-500/20 text-zinc-100'
                    : 'bg-indigo-600 text-white'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {msg.ragCitations && msg.ragCitations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-800 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-zinc-400 font-medium flex items-center gap-1">
                        <FileText className="w-3 h-3 text-indigo-400" /> Citations:
                      </span>
                      {msg.ragCitations.map((cite, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
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

      {/* Composer Bar */}
      <div className="p-4 bg-[#0c0c0e] border-t border-zinc-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setComposerMode('customer')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                composerMode === 'customer'
                  ? 'bg-zinc-800 text-zinc-100 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Reply
            </button>
            <button
              onClick={() => setComposerMode('whisper')}
              className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                composerMode === 'whisper'
                  ? 'bg-amber-950 text-amber-300 font-medium border border-amber-800/60'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Internal Note</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-zinc-500">⌘ + Enter to send</span>
        </div>

        <div className="flex items-center gap-2">
          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={composerMode === 'whisper' ? "Write internal note for team..." : "Type your message..."}
            className={`flex-1 h-12 p-3 rounded-lg bg-zinc-900 border text-xs focus:outline-none resize-none leading-relaxed ${
              composerMode === 'whisper'
                ? 'border-amber-800/40 text-amber-100 placeholder-amber-500/40'
                : 'border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-zinc-700'
            }`}
          />
          <button
            onClick={handleSend}
            disabled={!inputContent.trim()}
            className="h-12 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-100 text-xs font-medium flex items-center justify-center transition-colors border border-zinc-700/60"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
