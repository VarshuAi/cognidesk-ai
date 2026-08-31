import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';

export const PlaybookBuilder: React.FC = () => {
  const { playbooks } = useDeskStore();
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
      }
    }, 500);
  };

  return (
    <div className="flex-1 h-full bg-[#09090b] flex overflow-hidden select-none">
      <div className="w-80 h-full bg-[#0d0d10] border-r border-zinc-800/80 flex flex-col shrink-0">
        <div className="p-3.5 border-b border-zinc-800/80 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-zinc-100">Workflows</h3>
          <span className="text-[10px] font-mono text-zinc-500">{playbooks.length} active</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/40">
          {playbooks.map(pb => {
            const isSelected = pb.id === selectedPlaybookId;
            return (
              <div
                key={pb.id}
                onClick={() => setSelectedPlaybookId(pb.id)}
                className={`p-3.5 cursor-pointer transition-colors space-y-1.5 ${
                  isSelected
                    ? 'bg-zinc-800/60 border-l-2 border-indigo-500'
                    : 'hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>{pb.category}</span>
                  <span className="text-emerald-400">{pb.successRate}% success</span>
                </div>
                <h4 className="text-xs font-medium text-zinc-200">{pb.name}</h4>
                <p className="text-[11px] text-zinc-400 line-clamp-2">{pb.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 h-full overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{activePlaybook.category}</span>
            <h2 className="text-lg font-bold text-zinc-100 mt-0.5">{activePlaybook.name}</h2>
            <p className="text-xs text-zinc-400 mt-1">{activePlaybook.description}</p>
          </div>

          <button
            onClick={handleTestRun}
            disabled={isRunningTest}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700/60 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunningTest ? 'Running...' : 'Test Run'}</span>
          </button>
        </div>

        <div className="space-y-3">
          {activePlaybook.nodes.map((node, idx) => {
            const isCurrent = activeStepIdx === idx;
            const isPast = activeStepIdx !== null && activeStepIdx > idx;

            return (
              <div key={node.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                    isCurrent
                      ? 'bg-indigo-600 text-white'
                      : isPast
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {idx + 1}
                  </div>
                  {idx < activePlaybook.nodes.length - 1 && (
                    <div className="w-[1px] h-10 bg-zinc-800 mt-1" />
                  )}
                </div>

                <div className={`flex-1 p-3.5 rounded-xl border transition-colors ${
                  isCurrent
                    ? 'bg-zinc-900 border-indigo-500'
                    : 'bg-zinc-900/60 border-zinc-800'
                }`}>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="uppercase">{node.type}</span>
                    {isCurrent && <span className="text-indigo-400">Executing...</span>}
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-200 mt-0.5">{node.label}</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{node.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
