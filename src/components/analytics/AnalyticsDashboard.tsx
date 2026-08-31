import React from 'react';
import { useDeskStore } from '../../store/useDeskStore';
import { MOCK_SENTIMENT_TRENDS, MOCK_CHANNEL_DISTRIBUTION } from '../../data/mockAnalytics';

export const AnalyticsDashboard: React.FC = () => {
  const { metrics } = useDeskStore();

  return (
    <div className="flex-1 h-full bg-[#09090b] overflow-y-auto p-8 max-w-5xl mx-auto w-full space-y-6 select-none">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-lg font-bold text-zinc-100">Performance & Deflection Metrics</h2>
        <p className="text-xs text-zinc-400 mt-0.5">Real-time contact center volume, AI resolution rate, and cost efficiency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-mono text-zinc-500">AI Deflection Rate</span>
          <div className="text-xl font-bold font-mono text-zinc-100">{metrics.aiDeflectionRate}%</div>
          <span className="text-[10px] text-emerald-400 font-mono">+4.2% this month</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-mono text-zinc-500">CSAT Rating</span>
          <div className="text-xl font-bold font-mono text-zinc-100">{metrics.csatScore} / 5.0</div>
          <span className="text-[10px] text-zinc-400 font-mono">98.4% positive</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-mono text-zinc-500">BPO Cost Savings</span>
          <div className="text-xl font-bold font-mono text-zinc-100">${metrics.bpoCostSavingsUsd.toLocaleString()}</div>
          <span className="text-[10px] text-zinc-400 font-mono">At $24/hr agent cost</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-mono text-zinc-500">Avg Resolution Time</span>
          <div className="text-xl font-bold font-mono text-zinc-100">{metrics.avgResolutionMin}m</div>
          <span className="text-[10px] text-zinc-400 font-mono">FRT 1.4s</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <h3 className="text-xs font-semibold text-zinc-200">Customer Sentiment (Hourly)</h3>
          <div className="space-y-2.5 pt-1">
            {MOCK_SENTIMENT_TRENDS.map(t => (
              <div key={t.timeLabel} className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>{t.timeLabel} UTC</span>
                  <span className="text-zinc-200">{t.positive}% Positive</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full flex overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${t.positive}%` }} />
                  <div className="bg-zinc-600 h-full" style={{ width: `${t.neutral}%` }} />
                  <div className="bg-rose-500 h-full" style={{ width: `${t.frustrated + t.churnRisk}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <h3 className="text-xs font-semibold text-zinc-200">Volume by Channel</h3>
          <div className="space-y-2 pt-1">
            {MOCK_CHANNEL_DISTRIBUTION.map(ch => (
              <div key={ch.channel} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-zinc-200">{ch.channel}</span>
                  <span className="text-[10px] text-zinc-500 font-mono block">{ch.count.toLocaleString()} tickets ({ch.percentage}%)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-medium text-zinc-200">{ch.avgCsat} ★</span>
                  <span className="text-[10px] text-zinc-500 block font-mono">CSAT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
