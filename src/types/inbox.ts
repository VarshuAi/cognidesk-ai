export type ChannelType = 'chat' | 'whatsapp' | 'email' | 'voice' | 'sms';

export type TicketStatus = 'autonomous_ai' | 'human_escalated' | 'resolved' | 'waiting_customer';

export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low';

export type SentimentType = 'positive' | 'neutral' | 'frustrated' | 'churn_risk';

export type MessageSender = 'customer' | 'ai_agent' | 'human_agent' | 'system';

export interface MessageAttachment {
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  ticketId: string;
  sender: MessageSender;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  channel: ChannelType;
  isInternalWhisper?: boolean;
  sentiment?: SentimentType;
  ragCitations?: string[];
  attachments?: MessageAttachment[];
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  planTier: 'Enterprise' | 'Growth' | 'Pro' | 'Free Tier';
  mrr: number;
  ltv: number;
  country: string;
  countryCode: string;
  joinedDate: string;
  sentimentHistory: Array<{ timestamp: string; sentiment: SentimentType; score: number }>;
  totalTickets: number;
  resolvedByAiCount: number;
  stripeStatus: 'Active' | 'Past Due' | 'Trial';
  tags: string[];
  timezone: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  channel: ChannelType;
  status: TicketStatus;
  priority: PriorityLevel;
  customer: CustomerProfile;
  messages: ChatMessage[];
  assignedAgent: string;
  createdAt: string;
  updatedAt: string;
  slaExpiresAt: string;
  aiConfidenceScore: number;
  sentiment: SentimentType;
  category: string;
  unreadCount?: number;
  audioDuration?: string;
}
