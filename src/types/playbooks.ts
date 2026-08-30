export type NodeType = 'trigger' | 'ai_classifier' | 'condition' | 'action_refund' | 'action_slack' | 'action_jira' | 'action_email';

export interface PlaybookNode {
  id: string;
  type: NodeType;
  label: string;
  description: string;
  iconName: string;
  config: Record<string, any>;
  x: number;
  y: number;
}

export interface PlaybookEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface ResolutionPlaybook {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  category: string;
  triggerType: string;
  nodes: PlaybookNode[];
  edges: PlaybookEdge[];
  executionCount: number;
  successRate: number;
}
