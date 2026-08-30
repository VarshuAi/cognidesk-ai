import { Ticket } from '../types/inbox';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'ticket-101',
    ticketNumber: 'CD-8492',
    title: 'Duplicate seat charge on monthly invoice #INV-9281',
    channel: 'chat',
    status: 'autonomous_ai',
    priority: 'urgent',
    category: 'Billing & Invoicing',
    assignedAgent: 'CogniBot Autonomous Agent',
    createdAt: '2026-08-30T10:45:00Z',
    updatedAt: '2026-08-30T10:48:30Z',
    slaExpiresAt: '2026-08-30T11:15:00Z',
    aiConfidenceScore: 98,
    sentiment: 'frustrated',
    customer: {
      id: 'cust-1',
      name: 'Elena Rostova',
      email: 'elena.rostova@cloudscale.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      company: 'CloudScale Technologies',
      planTier: 'Enterprise',
      mrr: 4850,
      ltv: 58200,
      country: 'United States',
      countryCode: 'US',
      joinedDate: '2024-03-12',
      stripeStatus: 'Active',
      totalTickets: 8,
      resolvedByAiCount: 7,
      tags: ['VIP Account', 'Enterprise ARR > $50k', 'Early Adopter'],
      timezone: 'America/San_Francisco (PST)',
      sentimentHistory: [
        { timestamp: '10:45:00', sentiment: 'frustrated', score: 28 },
        { timestamp: '10:46:30', sentiment: 'neutral', score: 62 },
        { timestamp: '10:48:30', sentiment: 'positive', score: 94 }
      ]
    },
    messages: [
      {
        id: 'msg-1',
        ticketId: 'ticket-101',
        sender: 'customer',
        senderName: 'Elena Rostova',
        content: 'Hi, we just noticed our August invoice #INV-9281 charged us for 45 seats instead of our contracted 35 seats ($150.00 difference). We downgraded those 10 trial seats last Friday. Can you issue a refund to our corporate Amex ending in 4092?',
        timestamp: '10:45:10 AM',
        channel: 'chat',
        sentiment: 'frustrated'
      },
      {
        id: 'msg-2',
        ticketId: 'ticket-101',
        sender: 'ai_agent',
        senderName: 'CogniDesk AI (Autonomous Copilot)',
        content: 'Hello Elena! I apologize for the unexpected charge. I looked up your account under CloudScale Technologies and verified invoice #INV-9281. I have automatically processed a pro-rated refund of $150.00 to your American Express ending in 4092 via Stripe. It will reflect on your statement within 3-5 business days. Your seat count is now locked at 35 seats.',
        timestamp: '10:46:15 AM',
        channel: 'chat',
        ragCitations: ['Enterprise Refund & Pro-Rated Credit Policy (v3.4)', 'Seat Allocation, True-Up Billing']
      },
      {
        id: 'msg-3',
        ticketId: 'ticket-101',
        sender: 'customer',
        senderName: 'Elena Rostova',
        content: 'Wow, that was unbelievably fast! Thank you so much for resolving that within 60 seconds.',
        timestamp: '10:48:20 AM',
        channel: 'chat',
        sentiment: 'positive'
      }
    ]
  },
  {
    id: 'ticket-102',
    ticketNumber: 'CD-8493',
    title: 'Webhook delivery failing with HMAC signature mismatch (401)',
    channel: 'whatsapp',
    status: 'human_escalated',
    priority: 'high',
    category: 'API & Developer Webhooks',
    assignedAgent: 'Alex Rivera (Staff Tech Lead)',
    createdAt: '2026-08-30T10:12:00Z',
    updatedAt: '2026-08-30T10:35:00Z',
    slaExpiresAt: '2026-08-30T11:00:00Z',
    aiConfidenceScore: 72,
    sentiment: 'frustrated',
    customer: {
      id: 'cust-2',
      name: 'Marcus Sterling',
      email: 'm.sterling@fintech-apex.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      company: 'Apex FinTech Global',
      planTier: 'Enterprise',
      mrr: 7200,
      ltv: 86400,
      country: 'United Kingdom',
      countryCode: 'GB',
      joinedDate: '2023-11-04',
      stripeStatus: 'Active',
      totalTickets: 14,
      resolvedByAiCount: 9,
      tags: ['FinTech Regulated', 'Dedicated Slack Channel', 'SLA 15min'],
      timezone: 'Europe/London (GMT)',
      sentimentHistory: [
        { timestamp: '10:12:00', sentiment: 'frustrated', score: 35 },
        { timestamp: '10:25:00', sentiment: 'neutral', score: 55 }
      ]
    },
    messages: [
      {
        id: 'msg-201',
        ticketId: 'ticket-102',
        sender: 'customer',
        senderName: 'Marcus Sterling',
        content: 'Urgent: Our production ingestion cluster is rejecting webhook events from CogniDesk with HMAC sha256 mismatch. Did you update the payload serialization format in the latest v2.4 deployment?',
        timestamp: '10:12:30 AM',
        channel: 'whatsapp',
        sentiment: 'frustrated'
      },
      {
        id: 'msg-202',
        ticketId: 'ticket-102',
        sender: 'ai_agent',
        senderName: 'CogniDesk AI (Autonomous Copilot)',
        content: 'Hello Marcus, checking our developer changelog: In v2.4, unicode characters in custom ticket fields are now normalized to UTF-8 NFKC before calculating the HMAC-SHA256 signature. Please ensure your endpoint computes the hash against the exact raw byte stream prior to JSON parsing.',
        timestamp: '10:13:00 AM',
        channel: 'whatsapp',
        ragCitations: ['Rate Limits, Webhook Signatures & HMAC Verification']
      },
      {
        id: 'msg-203',
        ticketId: 'ticket-102',
        sender: 'human_agent',
        senderName: 'Alex Rivera (Staff Tech Lead)',
        content: 'I verified the raw webhook payloads Marcus sent in logs. He was doing `JSON.stringify(req.body)` which reordered object keys. I will reply with the raw body snippet.',
        timestamp: '10:20:00 AM',
        channel: 'whatsapp',
        isInternalWhisper: true
      }
    ]
  },
  {
    id: 'ticket-103',
    ticketNumber: 'CD-8494',
    title: 'Voice Call: Inquiring about SOC2 Type II report and HIPAA BAA signing',
    channel: 'voice',
    status: 'autonomous_ai',
    priority: 'medium',
    category: 'Security, SSO & SAML',
    assignedAgent: 'CogniVoice Real-time Agent',
    createdAt: '2026-08-30T09:30:00Z',
    updatedAt: '2026-08-30T09:34:00Z',
    slaExpiresAt: '2026-08-30T12:00:00Z',
    aiConfidenceScore: 96,
    sentiment: 'neutral',
    audioDuration: '3m 42s',
    customer: {
      id: 'cust-3',
      name: 'Dr. Priya Sharma',
      email: 'psharma@healthpulse-ai.org',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      company: 'HealthPulse AI Labs',
      planTier: 'Growth',
      mrr: 2400,
      ltv: 28800,
      country: 'Canada',
      countryCode: 'CA',
      joinedDate: '2024-09-18',
      stripeStatus: 'Active',
      totalTickets: 3,
      resolvedByAiCount: 3,
      tags: ['Healthcare', 'HIPAA In Progress'],
      timezone: 'America/Toronto (EST)',
      sentimentHistory: [
        { timestamp: '09:30:00', sentiment: 'neutral', score: 65 },
        { timestamp: '09:34:00', sentiment: 'positive', score: 92 }
      ]
    },
    messages: [
      {
        id: 'msg-301',
        ticketId: 'ticket-103',
        sender: 'customer',
        senderName: 'Dr. Priya Sharma',
        content: '[Voice Transcript]: Hello, our compliance team is preparing for our annual HIPAA audit. Can you send over your latest SOC2 Type II report and the standard Business Associate Agreement (BAA) document for electronic signature?',
        timestamp: '09:30:15 AM',
        channel: 'voice',
        sentiment: 'neutral'
      },
      {
        id: 'msg-302',
        ticketId: 'ticket-103',
        sender: 'ai_agent',
        senderName: 'CogniVoice Real-time Agent',
        content: '[Voice Synthesis]: Certainly, Dr. Sharma. I have dispatched our 2026 SOC2 Type II compliance audit packet along with the pre-filled HIPAA BAA to psharma@healthpulse-ai.org via DocuSign. Once you sign, our legal officer will counter-sign within 24 hours.',
        timestamp: '09:32:00 AM',
        channel: 'voice',
        ragCitations: ['SOC2, GDPR & Data Retention']
      }
    ]
  },
  {
    id: 'ticket-104',
    ticketNumber: 'CD-8495',
    title: 'Email: Contract renewal inquiry with custom SAML SSO requirement',
    channel: 'email',
    status: 'waiting_customer',
    priority: 'low',
    category: 'Security, SSO & SAML',
    assignedAgent: 'Sarah Jenkins (Enterprise AE)',
    createdAt: '2026-08-30T08:15:00Z',
    updatedAt: '2026-08-30T09:00:00Z',
    slaExpiresAt: '2026-08-30T16:00:00Z',
    aiConfidenceScore: 92,
    sentiment: 'positive',
    customer: {
      id: 'cust-4',
      name: 'Christian Bauer',
      email: 'christian.bauer@berlin-mobility.de',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      company: 'Berlin Mobility Group',
      planTier: 'Enterprise',
      mrr: 5600,
      ltv: 67200,
      country: 'Germany',
      countryCode: 'DE',
      joinedDate: '2024-01-22',
      stripeStatus: 'Active',
      totalTickets: 5,
      resolvedByAiCount: 4,
      tags: ['DACH Region', 'Multi-Year Contract'],
      timezone: 'Europe/Berlin (CET)',
      sentimentHistory: [
        { timestamp: '08:15:00', sentiment: 'positive', score: 85 }
      ]
    },
    messages: [
      {
        id: 'msg-401',
        ticketId: 'ticket-104',
        sender: 'customer',
        senderName: 'Christian Bauer',
        content: 'Guten Tag team, we are preparing our Q4 renewal for 120 seats. We need to verify if custom SAML group attribute mapping (Okta to CogniDesk roles) is supported without custom middleware.',
        timestamp: '08:15:00 AM',
        channel: 'email',
        sentiment: 'positive'
      },
      {
        id: 'msg-402',
        ticketId: 'ticket-104',
        sender: 'ai_agent',
        senderName: 'CogniDesk AI (Autonomous Copilot)',
        content: 'Hallo Christian! Yes, CogniDesk Enterprise natively supports Okta SAML Group Attribute Mapping. You can map your Okta security groups (e.g. `cognidesk_admins`, `cognidesk_supervisors`) directly in Settings -> SSO Configuration. I have attached our step-by-step Okta integration PDF.',
        timestamp: '08:16:30 AM',
        channel: 'email',
        ragCitations: ['Configuring SAML 2.0 Single Sign-On with Okta & Azure AD']
      }
    ]
  }
];
