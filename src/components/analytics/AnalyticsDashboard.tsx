import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle2, 
  Smile, 
  Award,
  Zap,
  Radio
} from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import { MOCK_SENTIMENT_TRENDS, MOCK_CHANNEL_DISTRIBUTION } from '../../data/mockAnalytics';

export const AnalyticsDashboard: React.FC = () => {
  const { metrics } = useDeskStore();

  return (
    <div className="flex-1 h-full bg-[#080b14] overflow-y-auto p-8 space-y-8 select-none">
      <div>
        <h2 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          Executive Contact Center Intelligence & CSAT Radar
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Real-time metrics on autonomous deflection rate, customer satisfaction, and BPO labor cost savings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#0a0e1c] border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono font-bold">AI Deflection Rate</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.aiDeflectionRate}%</div>
          <span className="text-[10px] text-emerald-400 font-mono">+4.2% vs last month</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#0a0e1c] border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono font-bold">CSAT Score</span>
            <Smile className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-300 font-mono">{metrics.csatScore} / 5.0</div>
          <span className="text-[10px] text-emerald-400 font-mono">98.4% 5-star reviews</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#0a0e1c] border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono font-bold">BPO Cost Savings</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300 font-mono">${metrics.bpoCostSavingsUsd.toLocaleString()}</div>
          <span className="text-[10px] text-cyan-400 font-mono">Calculated at $24/hr agent cost</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#0a0e1c] border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono font-bold">Avg Resolution Time</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-300 font-mono">{metrics.avgResolutionMin} mins</div>
          <span className="text-[10px] text-purple-400 font-mono">First response in 1.4s</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#0a0e1c] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Customer Sentiment Trajectory (Hourly)
          </h3>
          <div className="space-y-3 pt-2">
            {MOCK_SENTIMENT_TRENDS.map(trend => (
              <div key={trend.timeLabel} className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>{trend.timeLabel} UTC</span>
                  <span className="text-emerald-400 font-bold">{trend.positive}% Positive</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full flex overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${trend.positive}%` }} />
                  <div className="bg-slate-600 h-full" style={{ width: `${trend.neutral}%` }} />
                  <div className="bg-rose-500 h-full" style={{ width: `${trend.frustrated + trend.churnRisk}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0a0e1c] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Channel Volume & CSAT Breakdown
          </h3>
          <div className="space-y-3 pt-2">
            {MOCK_CHANNEL_DISTRIBUTION.map(ch => (
              <div key={ch.channel} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-200">{ch.channel}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{ch.count.toLocaleString()} tickets ({ch.percentage}%)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 font-mono">{ch.avgCsat} ★</span>
                  <span className="text-[10px] text-slate-500 block font-mono">Avg CSAT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
