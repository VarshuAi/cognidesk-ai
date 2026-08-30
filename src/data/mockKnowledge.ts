import { KnowledgeArticle, KnowledgeCategory, KnowledgeGap } from '../types/knowledge';

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  { id: 'billing', name: 'Billing & Invoicing', iconName: 'CreditCard', count: 14, color: 'text-indigo-400' },
  { id: 'api', name: 'API & Developer Webhooks', iconName: 'Code2', count: 28, color: 'text-cyan-400' },
  { id: 'security', name: 'Security, SSO & SAML', iconName: 'ShieldCheck', count: 19, color: 'text-emerald-400' },
  { id: 'subscriptions', name: 'Plans, Upgrades & Add-ons', iconName: 'Zap', count: 12, color: 'text-amber-400' },
  { id: 'compliance', name: 'SOC2, GDPR & Data Retention', iconName: 'FileCheck', count: 8, color: 'text-purple-400' }
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-1',
    title: 'Enterprise Refund & Pro-Rated Credit Policy (v3.4)',
    slug: 'enterprise-refund-policy',
    category: 'Billing & Invoicing',
    author: 'Finance & Compliance Team',
    lastUpdated: '2026-08-15',
    viewCount: 4820,
    helpfulScore: 98,
    vectorDimensions: 1536,
    tags: ['refund', 'billing', 'stripe', 'credit', 'invoice'],
    isDraft: false,
    content: `## 1. Eligibility for Pro-Rated Refunds
All Enterprise and Growth plan subscribers qualify for automatic pro-rated refunds within **30 days** of seat count adjustments or premature workspace downgrades.

### Automatic Processing Rules:
- Credit card refunds under **$250.00** are automatically issued via Stripe within **3-5 business days**.
- Amounts exceeding **$250.00** require automated manager approval or direct billing specialist review.
- Immediate workspace credits can be applied instantly with a **10% bonus value** for future renewals.`
  },
  {
    id: 'art-2',
    title: 'Configuring SAML 2.0 Single Sign-On with Okta & Azure AD',
    slug: 'saml-sso-okta-azure',
    category: 'Security, SSO & SAML',
    author: 'Identity Engineering',
    lastUpdated: '2026-08-20',
    viewCount: 3120,
    helpfulScore: 96,
    vectorDimensions: 1536,
    tags: ['sso', 'saml', 'okta', 'azure-ad', 'security', 'idp'],
    isDraft: false,
    content: `## SAML 2.0 Integration Guide
CogniDesk AI supports identity federation through any SAML 2.0 compliant Identity Provider (IdP) including Okta, Microsoft Entra ID (Azure AD), Google Workspace, and Ping Identity.

### Required ACS URL & Entity ID:
- **Assertion Consumer Service (ACS) URL**: \`https://auth.cognidesk.ai/saml/v2/callback\`
- **Audience URI (Entity ID)**: \`urn:auth:cognidesk:sp\`
- **NameID Format**: \`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress\`

### JIT (Just-In-Time) User Provisioning:
When enabled, new organization members are automatically provisioned upon their first successful SSO authentication.`
  },
  {
    id: 'art-3',
    title: 'Rate Limits, Webhook Signatures & HMAC Verification',
    slug: 'api-webhooks-hmac-verification',
    category: 'API & Developer Webhooks',
    author: 'Platform Core Team',
    lastUpdated: '2026-08-28',
    viewCount: 6540,
    helpfulScore: 99,
    vectorDimensions: 1536,
    tags: ['api', 'webhooks', 'hmac', 'security', 'rate-limit'],
    isDraft: false,
    content: `## Webhook Security & Signatures
Every outgoing webhook payload from CogniDesk includes a cryptographic signature in the \`X-CogniDesk-Signature-256\` header.

### Verifying Signatures in Node.js:
\`\`\`javascript
const crypto = require('crypto');

function verifyWebhook(rawBody, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}
\`\`\`

### API Rate Limits:
- **Enterprise Plan**: 10,000 requests / minute
- **Growth Plan**: 2,500 requests / minute
- **Pro Plan**: 600 requests / minute`
  },
  {
    id: 'art-4',
    title: 'Seat Allocation, True-Up Billing & Team Permissions',
    slug: 'seat-allocation-permissions',
    category: 'Plans, Upgrades & Add-ons',
    author: 'Operations Team',
    lastUpdated: '2026-08-10',
    viewCount: 1980,
    helpfulScore: 94,
    vectorDimensions: 1536,
    tags: ['seats', 'roles', 'permissions', 'true-up', 'team'],
    isDraft: false,
    content: `## Team Roles & Granular Permissions
CogniDesk AI provides 4 core role levels:
1. **Super Admin**: Complete billing, SSO configuration, and API key management.
2. **Team Lead / Supervisor**: Real-time queue supervision, whisper notes, and escalation reassignment.
3. **Support Specialist (Human Agent)**: Inbox handling, customer replies, and knowledge base drafting.
4. **Read-Only Auditor**: Analytics dashboards and compliance export access.`
  }
];

export const KNOWLEDGE_GAPS: KnowledgeGap[] = [
  {
    id: 'gap-1',
    unansweredQuery: 'How to migrate historical Zendesk ticket logs with custom attachments to CogniDesk?',
    occurrences: 47,
    impactScore: 9.4,
    suggestedCategory: 'API & Developer Webhooks',
    suggestedTitle: 'Zendesk & Intercom Historical Migration Guide',
    status: 'open'
  },
  {
    id: 'gap-2',
    unansweredQuery: 'Does CogniDesk AI support local EU data residency for HIPAA & GDPR compliance?',
    occurrences: 32,
    impactScore: 8.8,
    suggestedCategory: 'SOC2, GDPR & Data Retention',
    suggestedTitle: 'EU Sovereign Cloud & Data Isolation Specifications',
    status: 'open'
  },
  {
    id: 'gap-3',
    unansweredQuery: 'Can we configure custom AI voice accents (British / Australian) for voice phone deflection?',
    occurrences: 26,
    impactScore: 7.9,
    suggestedCategory: 'Plans, Upgrades & Add-ons',
    suggestedTitle: 'Voice Agent Customization & Multi-Locale Telephony',
    status: 'drafted'
  }
];
