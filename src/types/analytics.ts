export interface ContactCenterMetrics {
  totalConversations: number;
  aiDeflectionRate: number;
  humanEscalationRate: number;
  avgFirstResponseSec: number;
  avgResolutionMin: number;
  csatScore: number;
  bpoCostSavingsUsd: number;
  activeAgentsOnline: number;
}

export interface SentimentTrend {
  timeLabel: string;
  positive: number;
  neutral: number;
  frustrated: number;
  churnRisk: number;
}

export interface ChannelDistribution {
  channel: string;
  count: number;
  percentage: number;
  avgCsat: number;
}
