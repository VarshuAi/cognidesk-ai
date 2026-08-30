export type ResponseTone = 'empathetic' | 'professional' | 'concise' | 'technical';

export interface ReasoningStep {
  id: string;
  title: string;
  description: string;
  status: 'done' | 'running' | 'waiting';
  durationMs: number;
  toolCall?: {
    name: string;
    input: string;
    output: string;
  };
}

export interface RagCitation {
  id: string;
  articleId: string;
  title: string;
  snippet: string;
  similarityScore: number;
  category: string;
  sourceUrl?: string;
}

export interface SuggestedResponse {
  id: string;
  tone: ResponseTone;
  text: string;
  citations: string[];
  confidence: number;
}

export interface AiCopilotState {
  isReasoning: boolean;
  reasoningSteps: ReasoningStep[];
  citations: RagCitation[];
  confidenceScore: number;
  suggestedResponses: SuggestedResponse[];
  activeTone: ResponseTone;
  isAutoResponding: boolean;
}
