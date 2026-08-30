import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  Cpu, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { generateReasoningSteps, getRagCitationsForQuery, generateSuggestedResponses } from '../../engine/aiReasoningEngine';
import { ResponseTone } from '../../types/ai';

export const AiCopilotPanel: React.FC = () => {
  const { 
    tickets, 
    selectedTicketId, 
    activeTone, 
    setActiveTone, 
    applyAiResponse 
  } = useDeskStore();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isStepsExpanded, setIsStepsExpanded] = useState(true);

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  if (!activeTicket) return null;

  const lastCustomerMessage = [...activeTicket.messages].reverse().find(m => m.sender === 'customer')?.content || activeTicket.title;

  const reasoningSteps = generateReasoningSteps(lastCustomerMessage, activeTicket.customer.name);
  const citations = getRagCitationsForQuery(lastCustomerMessage);
  const suggestedResponses = generateSuggestedResponses(lastCustomerMessage, activeTicket.customer.name);

  const selectedResponse = suggestedResponses.find(r => r.tone === activeTone) || suggestedResponses[0];

  const handleApply = () => {
    applyAiResponse(activeTicket.id, selectedResponse.text);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tones: Array<{ id: ResponseTone; label: string }> = [
    { id: 'empathetic', label: 'Empathetic' },
    { id: 'professional', label: 'Professional' },
    { id: 'concise', label: 'Concise' },
    { id: 'technical', label: 'Technical' },
  ];

  return (
    <div className="w-96 h-full bg-[#0a0e1c] border-l border-slate-800/80 flex flex-col justify-between shrink-0 select-none overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-100">Autonomous Reasoning Copilot</h3>
              <p className="text-[10px] text-slate-500 font-mono">Real-Time RAG & Safety Matrix</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
            {selectedResponse.confidence}% Confidence
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <button
            onClick={() => setIsStepsExpanded(!isStepsExpanded)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-300 font-mono"
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Multi-Step Reasoning Trace ({reasoningSteps.length} steps)
            </span>
            {isStepsExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {isStepsExpanded && (
            <div className="space-y-2 pt-1">
              {reasoningSteps.map((step) => (
                <div key={step.id} className="p-2 rounded-xl bg-[#0d1222] border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-slate-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {step.title}
                    </span>
                    <span className="text-slate-500">{step.durationMs}ms</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-relaxed">{step.description}</p>
                  {step.toolCall && (
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-cyan-300 truncate">
                      <span className="text-slate-500">Tool: {step.toolCall.name} &rarr;</span> {step.toolCall.output}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Grounded Knowledge Citations</label>
          <div className="space-y-1.5">
            {citations.map((cite) => (
              <div key={cite.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-indigo-300 font-sans truncate">{cite.title}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {Math.round(cite.similarityScore * 100)}% Match
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans leading-snug">{cite.snippet}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Adaptive Tone Switcher</label>
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
    </div>
  );
};
