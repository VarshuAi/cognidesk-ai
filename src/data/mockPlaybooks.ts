import { ResolutionPlaybook } from '../types/playbooks';

export const MOCK_PLAYBOOKS: ResolutionPlaybook[] = [
  {
    id: 'pb-1',
    name: 'Autonomous Stripe Pro-Rated Refund Dispenser',
    category: 'Billing Automation',
    description: 'Detects duplicate seat charges or premature downgrades, validates against Stripe API, and auto-refunds under $250 with 0 human intervention.',
    isActive: true,
    triggerType: 'Customer message contains ("refund", "duplicate charge", "wrong invoice")',
    executionCount: 1420,
    successRate: 99.4,
    nodes: [
      {
        id: 'n-1',
        type: 'trigger',
        label: 'Inbound Ticket Trigger',
        description: 'New chat or email matching billing intent',
        iconName: 'MessageSquare',
        config: { channels: ['chat', 'email'], keywords: ['refund', 'invoice', 'overcharge'] },
        x: 60,
        y: 120
      },
      {
        id: 'n-2',
        type: 'ai_classifier',
        label: 'AI Intent & Amount Extraction',
        description: 'Extracts invoice ID, seat count delta, and requested refund sum',
        iconName: 'Cpu',
        config: { model: 'gemini-2.0-flash', confidenceThreshold: 0.92 },
        x: 300,
        y: 120
      },
      {
        id: 'n-3',
        type: 'condition',
        label: 'Amount Threshold <= $250.00',
        description: 'Verifies if refund sum is within autonomous safety policy',
        iconName: 'GitBranch',
        config: { maxLimit: 250 },
        x: 540,
        y: 120
      },
      {
        id: 'n-4',
        type: 'action_refund',
        label: 'Stripe API Refund Dispatcher',
        description: 'Executes POST /v1/refunds with idempotency key',
        iconName: 'CreditCard',
        config: { gateway: 'Stripe', notifyCustomer: true },
        x: 780,
        y: 120
      }
    ],
    edges: [
      { id: 'e-1', from: 'n-1', to: 'n-2' },
      { id: 'e-2', from: 'n-2', to: 'n-3', label: 'Intent: Valid Refund' },
      { id: 'e-3', from: 'n-3', to: 'n-4', label: 'True (<= $250)' }
    ]
  },
  {
    id: 'pb-2',
    name: 'VIP Enterprise Churn Deflector & Slack Alarm',
    category: 'Retention & VIP Escalation',
    description: 'Detects high churn risk sentiment on Enterprise accounts (ARR > $50k), posts high-priority alert to #vip-retention Slack, and assigns dedicated lead.',
    isActive: true,
    triggerType: 'Customer sentiment = Churn Risk & Plan = Enterprise',
    executionCount: 284,
    successRate: 96.8,
    nodes: [
      {
        id: 'n-21',
        type: 'trigger',
        label: 'Real-time Sentiment Drop',
        description: 'Customer sentiment drops below 30 or churn keywords detected',
        iconName: 'AlertTriangle',
        config: { threshold: 30 },
        x: 60,
        y: 120
      },
      {
        id: 'n-22',
        type: 'condition',
        label: 'Tier == Enterprise (MRR > $3,000)',
        description: 'Checks customer 360 profile tier and ARR value',
        iconName: 'Shield',
        config: { minMrr: 3000 },
        x: 300,
        y: 120
      },
      {
        id: 'n-23',
        type: 'action_slack',
        label: 'Broadcast to #vip-escalations',
        description: 'Posts customer profile snapshot, chat snippet, and one-click takeover link',
        iconName: 'Send',
        config: { channel: '#vip-escalations-core' },
        x: 540,
        y: 120
      }
    ],
    edges: [
      { id: 'e-21', from: 'n-21', to: 'n-22' },
      { id: 'e-22', from: 'n-22', to: 'n-23', label: 'High Value Account' }
    ]
  }
];
