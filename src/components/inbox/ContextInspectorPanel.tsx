import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  Send, 
  Copy, 
  Check, 
  Building2, 
  Globe, 
  Calendar, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Search
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { generateReasoningSteps, getRagCitationsForQuery, generateSuggestedResponses } from '../../engine/aiReasoningEngine';
import { ResponseTone } from '../../types/ai';
import confetti from 'canvas-confetti';

export const ContextInspectorPanel: React.FC = () => {
  const { 
    tickets, 
    selectedTicketId, 
    activeTone, 
    setActiveTone, 
    applyAiResponse, 
    knowledgeArticles, 
    sendMessage 
  } = useDeskStore();

  const [activeInspectorTab, setActiveInspectorTab] = useState<'copilot' | 'customer' | 'knowledge' | 'playbooks'>('copilot');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isStepsExpanded, setIsStepsExpanded] = useState(true);
  const [knowledgeSearch, setKnowledgeSearch] = useState('');

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  if (!activeTicket) return null;

  const { customer } = activeTicket;
  const lastCustomerMessage = [...activeTicket.messages].reverse().find(m => m.sender === 'customer')?.content || activeTicket.title;

  const reasoningSteps = generateReasoningSteps(lastCustomerMessage, customer.name);
  const citations = getRagCitationsForQuery(lastCustomerMessage);
  const suggestedResponses = generateSuggestedResponses(lastCustomerMessage, customer.name);
  const selectedResponse = suggestedResponses.find(r => r.tone === activeTone) || suggestedResponses[0];

  const handleApply = () => {
    applyAiResponse(activeTicket.id, selectedResponse.text);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInsertSnippet = (snippet: string) => {
    sendMessage(activeTicket.id, snippet, false);
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 } });
  };

  const tones: Array<{ id: ResponseTone; label: string }> = [
    { id: 'empathetic', label: 'Empathetic' },
    { id: 'professional', label: 'Professional' },
    { id: 'concise', label: 'Concise' },
    { id: 'technical', label: 'Technical' },
  ];

  return (
    <div className="w-96 h-full bg-[#0a0e1c] flex flex-col justify-between shrink-0 select-none overflow-hidden text-xs font-sans">
      <div className="p-3 bg-[#0d1222] border-b border-slate-800/80 flex items-center justify-between gap-1">
        <button
          onClick={() => setActiveInspectorTab('copilot')}
          className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeInspectorTab === 'copilot'
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Autonomous AI Reasoning & RAG Grounding"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Copilot</span>
        </button>

        <button
          onClick={() => setActiveInspectorTab('customer')}
          className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeInspectorTab === 'customer'
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Customer 360 & Revenue Profile"
        >
          <User className="w-3.5 h-3.5" />
          <span>Customer</span>
        </button>

        <button
          onClick={() => setActiveInspectorTab('knowledge')}
          className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeInspectorTab === 'knowledge'
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Knowledge Search"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Docs</span>
        </button>

        <button
          onClick={() => setActiveInspectorTab('playbooks')}
          className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeInspectorTab === 'playbooks'
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Resolution Actions"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Actions</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeInspectorTab === 'copilot' && (
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-slate-200">Grounded AI Confidence</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400">
                {selectedResponse.confidence}% Match
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <button
                onClick={() => setIsStepsExpanded(!isStepsExpanded)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-300 font-mono"
              >
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  Reasoning Trace ({reasoningSteps.length} steps)
                </span>
                {isStepsExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
              </button>

              {isStepsExpanded && (
                <div className="space-y-2 pt-1">
                  {reasoningSteps.map((step) => (
                    <div key={step.id} className="p-2 rounded-xl bg-[#0d1222] border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="font-bold text-slate-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {step.title}
                        </span>
                        <span className="text-slate-500">{step.durationMs}ms</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">RAG Citations</label>
              <div className="space-y-1.5">
                {citations.map((cite) => (
                  <div key={cite.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-indigo-300 font-sans truncate">{cite.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {Math.round(cite.similarityScore * 100)}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans leading-snug">{cite.snippet}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Suggested Adaptive Reply</label>
              <div className="grid grid-cols-4 gap-1 text-[10px] font-mono">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTone(t.id)}
                    className={`py-1 rounded-lg capitalize border transition-all ${
                      activeTone === t.id
                        ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2.5">
                <p className="text-xs text-slate-200 font-sans leading-relaxed">{selectedResponse.text}</p>
                <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-indigo-500/20">
                  <button
                    onClick={() => handleCopy(selectedResponse.text, selectedResponse.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono flex items-center gap-1"
                  >
                    {copiedId === selectedResponse.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === selectedResponse.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleApply}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-[11px] font-bold flex items-center gap-1 shadow-md shadow-indigo-600/20 transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span>Apply to Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeInspectorTab === 'customer' && (
          <div className="space-y-4">
            <div className="text-center space-y-2 pb-3 border-b border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mx-auto flex items-center justify-center text-base font-bold font-mono text-indigo-300">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">{customer.name}</h3>
                <p className="text-[11px] text-slate-400">{customer.email}</p>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                  {customer.planTier}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {customer.stripeStatus}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Revenue & Value</label>
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
                  <span className="flex items-center gap-1.5 font-sans"><Globe className="w-3.5 h-3.5 text-cyan-400" /> Country</span>
                  <span className="text-slate-200">{customer.country}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5 font-sans"><Calendar className="w-3.5 h-3.5 text-amber-400" /> Joined</span>
                  <span className="text-slate-200">{customer.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5 font-sans"><Activity className="w-3.5 h-3.5 text-purple-400" /> Total Tickets</span>
                  <span className="text-slate-200">{customer.totalTickets}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Tags</label>
              <div className="flex flex-wrap gap-1">
                {customer.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeInspectorTab === 'knowledge' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={knowledgeSearch}
                onChange={(e) => setKnowledgeSearch(e.target.value)}
                placeholder="Search articles & docs..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              {knowledgeArticles
                .filter(a => a.title.toLowerCase().includes(knowledgeSearch.toLowerCase()))
                .map(art => (
                  <div key={art.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div>
                      <span className="text-[9px] font-mono text-indigo-300 px-1.5 py-0.2 rounded bg-indigo-950 border border-indigo-900">
                        {art.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200 mt-1">{art.title}</h4>
                    </div>
                    <button
                      onClick={() => handleInsertSnippet(art.content.slice(0, 180) + '...')}
                      className="w-full py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>Insert Snippet into Chat</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeInspectorTab === 'playbooks' && (
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">1-Click Resolution Playbooks</label>
            <button
              onClick={() => {
                sendMessage(activeTicket.id, "I have executed an automatic Stripe pro-rated refund of $150.00 for invoice #INV-9281.", false);
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
              }}
              className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left space-y-1 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Execute Stripe $150 Refund</span>
                <span className="text-[10px] font-mono">Auto</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">Dispatches POST /v1/refunds and notifies billing ledger.</p>
            </button>

            <button
              onClick={() => {
                sendMessage(activeTicket.id, "I have broadcasted an urgent priority alert to #vip-escalations Slack channel.", true);
                confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
              }}
              className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left space-y-1 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Escalate to #vip-retention</span>
                <span className="text-[10px] font-mono">Slack</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">Alerts Account Executive and On-Call Lead in Slack.</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
