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
  Search,
  X
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { generateReasoningSteps, getRagCitationsForQuery, generateSuggestedResponses } from '../../engine/aiReasoningEngine';
import { ResponseTone } from '../../types/ai';

export const ContextInspectorPanel: React.FC = () => {
  const { 
    tickets, 
    selectedTicketId, 
    activeTone, 
    setActiveTone, 
    applyAiResponse, 
    knowledgeArticles, 
    sendMessage,
    isInspectorOpen,
    toggleInspector
  } = useDeskStore();

  const [activeInspectorTab, setActiveInspectorTab] = useState<'copilot' | 'customer' | 'knowledge' | 'playbooks'>('copilot');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isStepsExpanded, setIsStepsExpanded] = useState(true);
  const [knowledgeSearch, setKnowledgeSearch] = useState('');

  if (!isInspectorOpen) return null;

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
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInsertSnippet = (snippet: string) => {
    sendMessage(activeTicket.id, snippet, false);
  };

  const tones: Array<{ id: ResponseTone; label: string }> = [
    { id: 'empathetic', label: 'Empathetic' },
    { id: 'professional', label: 'Professional' },
    { id: 'concise', label: 'Concise' },
    { id: 'technical', label: 'Technical' },
  ];

  return (
    <div className="w-80 h-full bg-[#0d0d10] flex flex-col justify-between shrink-0 select-none overflow-hidden text-xs font-sans border-l border-zinc-800/80">
      {/* Clean Tab Header */}
      <div className="h-13 px-3 bg-[#0c0c0e] border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveInspectorTab('copilot')}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              activeInspectorTab === 'copilot'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Copilot
          </button>
          <button
            onClick={() => setActiveInspectorTab('customer')}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              activeInspectorTab === 'customer'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setActiveInspectorTab('knowledge')}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              activeInspectorTab === 'knowledge'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Docs
          </button>
          <button
            onClick={() => setActiveInspectorTab('playbooks')}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              activeInspectorTab === 'playbooks'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Actions
          </button>
        </div>

        <button
          onClick={toggleInspector}
          className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
          title="Close Inspector (⌘I)"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* Tab 1: AI Copilot */}
        {activeInspectorTab === 'copilot' && (
          <div className="space-y-3.5">
            {/* Confidence */}
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                AI Confidence
              </span>
              <span className="font-mono font-medium text-emerald-400">{selectedResponse.confidence}%</span>
            </div>

            {/* CoT Reasoning Trace */}
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <button
                onClick={() => setIsStepsExpanded(!isStepsExpanded)}
                className="w-full flex items-center justify-between text-xs font-mono text-zinc-300 font-medium"
              >
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                  Reasoning Trace ({reasoningSteps.length})
                </span>
                {isStepsExpanded ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />}
              </button>

              {isStepsExpanded && (
                <div className="space-y-1.5 pt-1">
                  {reasoningSteps.map((step) => (
                    <div key={step.id} className="p-2 rounded bg-zinc-950 border border-zinc-800/80 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-300 font-medium">{step.title}</span>
                        <span className="text-zinc-500">{step.durationMs}ms</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">{step.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RAG Citations */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Grounded Citations</span>
              {citations.map((cite) => (
                <div key={cite.id} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-zinc-200 truncate">{cite.title}</span>
                    <span className="text-[9px] font-mono text-zinc-400">{Math.round(cite.similarityScore * 100)}%</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-snug">{cite.snippet}</p>
                </div>
              ))}
            </div>

            {/* Tone Selector & Suggested Response */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Adaptive Response</span>
              <div className="grid grid-cols-4 gap-1 text-[10px] font-mono">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTone(t.id)}
                    className={`py-1 rounded text-center border transition-colors ${
                      activeTone === t.id
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-100 font-medium'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2.5">
                <p className="text-xs text-zinc-200 leading-relaxed">{selectedResponse.text}</p>
                <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => handleCopy(selectedResponse.text, selectedResponse.id)}
                    className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 transition-colors"
                  >
                    {copiedId === selectedResponse.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === selectedResponse.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleApply}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-[11px] font-medium flex items-center gap-1 transition-colors border border-zinc-700"
                  >
                    <Send className="w-3 h-3" />
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Customer 360 */}
        {activeInspectorTab === 'customer' && (
          <div className="space-y-3.5">
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center font-mono font-bold text-xs">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-100 text-xs">{customer.name}</h4>
                  <p className="text-[11px] text-zinc-400">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                  {customer.planTier}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300">
                  {customer.stripeStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-mono block">Monthly MRR</span>
                <span className="text-xs font-mono font-bold text-zinc-100">${customer.mrr.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-mono block">Lifetime Value</span>
                <span className="text-xs font-mono font-bold text-zinc-100">${customer.ltv.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Company</span>
                <span className="text-zinc-200">{customer.company}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Location</span>
                <span className="text-zinc-200">{customer.country}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Member Since</span>
                <span className="text-zinc-200">{customer.joinedDate}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Tickets</span>
                <span className="text-zinc-200">{customer.totalTickets}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tags</span>
              <div className="flex flex-wrap gap-1">
                {customer.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Knowledge Search */}
        {activeInspectorTab === 'knowledge' && (
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={knowledgeSearch}
                onChange={(e) => setKnowledgeSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              {knowledgeArticles
                .filter(a => a.title.toLowerCase().includes(knowledgeSearch.toLowerCase()))
                .map(art => (
                  <div key={art.id} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1.5">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 px-1 py-0.2 rounded bg-zinc-800">
                        {art.category}
                      </span>
                      <h4 className="text-xs font-semibold text-zinc-200 mt-1">{art.title}</h4>
                    </div>
                    <button
                      onClick={() => handleInsertSnippet(art.content.slice(0, 160) + '...')}
                      className="w-full py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>Insert Snippet</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tab 4: Actions */}
        {activeInspectorTab === 'playbooks' && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Quick Actions</span>
            <button
              onClick={() => sendMessage(activeTicket.id, "I have processed an automatic Stripe refund of $150.00 for invoice #INV-9281.", false)}
              className="w-full p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left space-y-0.5 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
                <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-indigo-400" /> Execute $150 Refund</span>
              </div>
              <p className="text-[10px] text-zinc-500">Stripe POST /v1/refunds</p>
            </button>

            <button
              onClick={() => sendMessage(activeTicket.id, "Alerted #vip-escalations in Slack.", true)}
              className="w-full p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left space-y-0.5 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Escalate to VIP Slack</span>
              </div>
              <p className="text-[10px] text-zinc-500">Alerts AE and on-call lead</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
