export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  lastUpdated: string;
  author: string;
  viewCount: number;
  helpfulScore: number;
  vectorDimensions: number;
  tags: string[];
  isDraft: boolean;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  iconName: string;
  count: number;
  color: string;
}

export interface KnowledgeGap {
  id: string;
  unansweredQuery: string;
  occurrences: number;
  impactScore: number;
  suggestedCategory: string;
  suggestedTitle: string;
  status: 'open' | 'drafted' | 'resolved';
}
