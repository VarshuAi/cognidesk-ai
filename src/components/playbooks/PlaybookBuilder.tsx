import React, { useState } from 'react';
import { 
  Workflow, 
  Play, 
  CheckCircle2, 
  Cpu, 
  CreditCard, 
  Send, 
  GitBranch, 
  MessageSquare, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import confetti from 'canvas-confetti';

export const PlaybookBuilder: React.FC = () => {
  const { playbooks, togglePlaybookActive } = useDeskStore();
  const [selectedPlaybookId, setSelectedPlaybookId] = useState(playbooks[0].id);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null);

  const activePlaybook = playbooks.find(p => p.id === selectedPlaybookId) || playbooks[0];

  const handleTestRun = () => {
    setIsRunningTest(true);
    setActiveStepIdx(0);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step < activePlaybook.nodes.length) {
        setActiveStepIdx(step);
      } else {
        clearInterval(timer);
        setIsRunningTest(false);
        setActiveStepIdx(null);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    }, 600);
  };

  return (
    <div className="flex-1 h-full bg-[#080b14] overflow-y-auto p-8 space-y-6 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2.5">
            <Workflow className="w-5 h-5 text-indigo-400" />
            Automated Resolution Playbooks
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visual trigger-condition-action workflow engine for autonomous refunds, VIP alerts, and Jira escalations.
          </p>
        </div>

        <button
          onClick={handleTestRun}
          disabled={isRunningTest}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunningTest ? 'Executing Nodes...' : 'Test Run Workflow'}</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {playbooks.map(pb => (
          <button
            key={pb.id}
            onClick={() => setSelectedPlaybookId(pb.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedPlaybookId === pb.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{pb.name}</span>
            <span className="text-[10px] font-mono opacity-80">({pb.successRate}%)</span>
          </button>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-[#0a0e1c] border border-slate-800/80 min-h-[380px] flex items-center justify-center relative overflow-hidden">
        <div className="flex items-center gap-8 z-10 overflow-x-auto py-4">
          {activePlaybook.nodes.map((node, idx) => {
            const isCurrent = activeStepIdx === idx;
            const isPast = activeStepIdx !== null && activeStepIdx > idx;

            return (
              <React.Fragment key={node.id}>
                <div
                  className={`w-64 p-4 rounded-2xl transition-all space-y-2 border ${
                    isCurrent
                      ? 'bg-emerald-950/40 border-emerald-400 shadow-xl shadow-emerald-500/20 scale-105'
                      : isPast
                      ? 'bg-indigo-950/30 border-indigo-500/50'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">{node.type}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      Step {idx + 1}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{node.label}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{node.description}</p>
                </div>

                {idx < activePlaybook.nodes.length - 1 && (
                  <div className="w-8 h-[2px] bg-slate-700 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
