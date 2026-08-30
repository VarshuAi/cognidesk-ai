import { ContactCenterMetrics, SentimentTrend, ChannelDistribution } from '../types/analytics';

export const MOCK_METRICS: ContactCenterMetrics = {
  totalConversations: 12480,
  aiDeflectionRate: 84.3,
  humanEscalationRate: 15.7,
  avgFirstResponseSec: 1.4,
  avgResolutionMin: 3.8,
  csatScore: 4.92,
  bpoCostSavingsUsd: 142600,
  activeAgentsOnline: 18
};

export const MOCK_SENTIMENT_TRENDS: SentimentTrend[] = [
  { timeLabel: '06:00', positive: 82, neutral: 14, frustrated: 3, churnRisk: 1 },
  { timeLabel: '08:00', positive: 85, neutral: 11, frustrated: 3, churnRisk: 1 },
  { timeLabel: '10:00', positive: 79, neutral: 14, frustrated: 5, churnRisk: 2 },
  { timeLabel: '12:00', positive: 84, neutral: 12, frustrated: 3, churnRisk: 1 },
  { timeLabel: '14:00', positive: 88, neutral: 9, frustrated: 2, churnRisk: 1 },
  { timeLabel: '16:00', positive: 86, neutral: 11, frustrated: 2, churnRisk: 1 },
  { timeLabel: '18:00', positive: 91, neutral: 7, frustrated: 1, churnRisk: 1 }
];

export const MOCK_CHANNEL_DISTRIBUTION: ChannelDistribution[] = [
  { channel: 'Live Chat', count: 6840, percentage: 54.8, avgCsat: 4.95 },
  { channel: 'WhatsApp Business', count: 2890, percentage: 23.2, avgCsat: 4.88 },
  { channel: 'Email Tickets', count: 1840, percentage: 14.7, avgCsat: 4.91 },
  { channel: 'Voice Phone', count: 910, percentage: 7.3, avgCsat: 4.94 }
];
