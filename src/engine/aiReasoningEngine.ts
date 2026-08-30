import { ReasoningStep, RagCitation, SuggestedResponse, ResponseTone } from '../types/ai';
import { KNOWLEDGE_ARTICLES } from '../data/mockKnowledge';

export function generateReasoningSteps(query: string, customerName: string): ReasoningStep[] {
  return [
    {
      id: 'step-1',
      title: 'Intent Classification & Entity Parsing',
      description: `Parsed intent from ${customerName}: Identified billing dispute, pro-rated seat credit request, and invoice query.`,
      status: 'done',
      durationMs: 42,
      toolCall: {
        name: 'intent_extractor_v2',
        input: `{ query: "${query.slice(0, 40)}...", context: "SaaS_Billing" }`,
        output: '{ intent: "BILLING_REFUND_REQUEST", confidence: 0.98 }'
      }
    },
    {
      id: 'step-2',
      title: 'Semantic RAG Vector Retrieval (1536-dim)',
      description: 'Retrieved top-2 grounded documentation chunks from Help Center knowledge store.',
      status: 'done',
      durationMs: 78,
      toolCall: {
        name: 'vector_search_hybrid',
        input: '{ query: "pro-rated refund policy seat adjustment", topK: 2 }',
        output: '{ matched: ["art-1 (98% sim)", "art-4 (92% sim)"] }'
      }
    },
    {
      id: 'step-3',
      title: 'Stripe API & Customer 360 Account Verification',
      description: 'Verified active Enterprise plan, invoice #INV-9281, and recent seat reduction on Friday.',
      status: 'done',
      durationMs: 110,
      toolCall: {
        name: 'stripe_customer_ledger',
        input: `{ customer: "${customerName}", action: "VERIFY_CHARGE" }`,
        output: '{ valid_dispute: true, max_refundable_usd: 150.00 }'
      }
    },
    {
      id: 'step-4',
      title: 'Autonomous Safety Policy Gate Check',
      description: 'Refund amount $150.00 <= $250.00 safety threshold. Triggering autonomous resolution.',
      status: 'done',
      durationMs: 35
    },
    {
      id: 'step-5',
      title: 'Multi-Tone Response Synthesis',
      description: 'Synthesized empathetic, professional, and concise answers with zero hallucination guarantee.',
      status: 'done',
      durationMs: 95
    }
  ];
}

export function getRagCitationsForQuery(query: string): RagCitation[] {
  return [
    {
      id: 'cite-1',
      articleId: 'art-1',
      title: 'Enterprise Refund & Pro-Rated Credit Policy (v3.4)',
      snippet: 'Amounts under $250.00 qualify for instant automated refund processing to original payment method.',
      similarityScore: 0.98,
      category: 'Billing & Invoicing'
    },
    {
      id: 'cite-2',
      articleId: 'art-4',
      title: 'Seat Allocation, True-Up Billing & Team Permissions',
      snippet: 'Seat count adjustments take effect immediately with pro-rated daily credit calculations.',
      similarityScore: 0.91,
      category: 'Plans & Upgrades'
    }
  ];
}

export function generateSuggestedResponses(query: string, customerName: string): SuggestedResponse[] {
  return [
    {
      id: 'resp-empathetic',
      tone: 'empathetic',
      confidence: 98,
      citations: ['Enterprise Refund Policy (v3.4)'],
      text: `Hello ${customerName}! I completely understand how frustrating unexpected charges can be. I looked into invoice #INV-9281 right away and confirmed the 10 seat adjustment from last Friday. I have already initiated a $150.00 refund back to your corporate card via Stripe (reflecting in 3-5 business days). Please let me know if you need anything else!`
    },
    {
      id: 'resp-professional',
      tone: 'professional',
      confidence: 96,
      citations: ['Enterprise Refund Policy (v3.4)'],
      text: `Dear ${customerName}, thank you for reaching out. We have verified your account seat downgrade and processed a pro-rated credit of $150.00 for invoice #INV-9281. The transaction will clear through Stripe to your payment method ending in 4092 within 3 to 5 business days.`
    },
    {
      id: 'resp-concise',
      tone: 'concise',
      confidence: 95,
      citations: ['Enterprise Refund Policy (v3.4)'],
      text: `Hi ${customerName}, I have issued the $150.00 pro-rated refund for invoice #INV-9281. It will post to your Amex ending in 4092 in 3-5 business days.`
    },
    {
      id: 'resp-technical',
      tone: 'technical',
      confidence: 92,
      citations: ['Enterprise Refund Policy (v3.4)', 'Stripe API'],
      text: `[Stripe Event: refund.created] Processed $150.00 pro-rated reversal against invoice #INV-9281. Organization seat limit is updated to 35. Audit log #AUD-99182 has been recorded.`
    }
  ];
}
