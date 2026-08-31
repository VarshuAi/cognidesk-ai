import { create } from 'zustand';
import { Ticket, ChannelType, TicketStatus, ChatMessage, PriorityLevel } from '../types/inbox';
import { KnowledgeArticle, KnowledgeGap } from '../types/knowledge';
import { ResolutionPlaybook } from '../types/playbooks';
import { ContactCenterMetrics } from '../types/analytics';
import { ResponseTone } from '../types/ai';
import { MOCK_TICKETS } from '../data/mockTickets';
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_GAPS } from '../data/mockKnowledge';
import { MOCK_PLAYBOOKS } from '../data/mockPlaybooks';
import { MOCK_METRICS } from '../data/mockAnalytics';

export type ActiveTab = 'inbox' | 'knowledge' | 'playbooks' | 'analytics' | 'settings';

interface DeskState {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  tickets: Ticket[];
  selectedTicketId: string;
  channelFilter: ChannelType | 'all';
  statusFilter: TicketStatus | 'all';
  searchQuery: string;

  setChannelFilter: (channel: ChannelType | 'all') => void;
  setStatusFilter: (status: TicketStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  selectTicket: (ticketId: string) => void;

  isInspectorOpen: boolean;
  toggleInspector: () => void;
  setInspectorOpen: (open: boolean) => void;

  activeTone: ResponseTone;
  setActiveTone: (tone: ResponseTone) => void;

  sendMessage: (ticketId: string, content: string, isWhisper?: boolean) => void;
  toggleHumanTakeover: (ticketId: string) => void;
  applyAiResponse: (ticketId: string, text: string) => void;
  updateTicketPriority: (ticketId: string, priority: PriorityLevel) => void;
  resolveTicket: (ticketId: string) => void;

  knowledgeArticles: KnowledgeArticle[];
  selectedKnowledgeArticleId: string;
  setSelectedKnowledgeArticleId: (id: string) => void;
  knowledgeGaps: KnowledgeGap[];
  playbooks: ResolutionPlaybook[];
  metrics: ContactCenterMetrics;

  isCustomerSimulatorOpen: boolean;
  setCustomerSimulatorOpen: (open: boolean) => void;
  isVoiceModalOpen: boolean;
  setVoiceModalOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isArticleModalOpen: boolean;
  setArticleModalOpen: (open: boolean) => void;

  addNewArticle: (article: Partial<KnowledgeArticle>) => void;
  resolveGap: (gapId: string) => void;
  togglePlaybookActive: (playbookId: string) => void;
  triggerSimulatedCustomerMessage: () => void;
}

export const useDeskStore = create<DeskState>((set, get) => ({
  activeTab: 'inbox',
  setActiveTab: (tab) => set({ activeTab: tab }),

  tickets: MOCK_TICKETS,
  selectedTicketId: MOCK_TICKETS[0].id,
  channelFilter: 'all',
  statusFilter: 'all',
  searchQuery: '',

  setChannelFilter: (channel) => set({ channelFilter: channel }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectTicket: (ticketId) => set({ selectedTicketId: ticketId }),

  isInspectorOpen: true,
  toggleInspector: () => set((state) => ({ isInspectorOpen: !state.isInspectorOpen })),
  setInspectorOpen: (open) => set({ isInspectorOpen: open }),

  activeTone: 'empathetic',
  setActiveTone: (tone) => set({ activeTone: tone }),

  sendMessage: (ticketId, content, isWhisper = false) => {
    if (!content.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      ticketId,
      sender: 'human_agent',
      senderName: isWhisper ? 'Alex Rivera (Staff Specialist)' : 'Alex Rivera',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: 'chat',
      isInternalWhisper: isWhisper
    };

    set((state) => ({
      tickets: state.tickets.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          messages: [...t.messages, newMessage],
          updatedAt: new Date().toISOString()
        };
      })
    }));
  },

  toggleHumanTakeover: (ticketId) => {
    set((state) => ({
      tickets: state.tickets.map((t) => {
        if (t.id !== ticketId) return t;
        const newStatus: TicketStatus = t.status === 'autonomous_ai' ? 'human_escalated' : 'autonomous_ai';
        const newAgent = newStatus === 'autonomous_ai' ? 'CogniDesk AI' : 'Alex Rivera';
        return {
          ...t,
          status: newStatus,
          assignedAgent: newAgent
        };
      })
    }));
  },

  applyAiResponse: (ticketId, text) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      ticketId,
      sender: 'ai_agent',
      senderName: 'CogniDesk AI',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: 'chat',
      ragCitations: ['Enterprise Refund & Pro-Rated Credit Policy (v3.4)']
    };

    set((state) => ({
      tickets: state.tickets.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          messages: [...t.messages, newMessage],
          status: 'waiting_customer',
          updatedAt: new Date().toISOString()
        };
      })
    }));
  },

  updateTicketPriority: (ticketId, priority) => {
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === ticketId ? { ...t, priority } : t))
    }));
  },

  resolveTicket: (ticketId) => {
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === ticketId ? { ...t, status: 'resolved' } : t))
    }));
  },

  knowledgeArticles: KNOWLEDGE_ARTICLES,
  selectedKnowledgeArticleId: KNOWLEDGE_ARTICLES[0].id,
  setSelectedKnowledgeArticleId: (id) => set({ selectedKnowledgeArticleId: id }),
  knowledgeGaps: KNOWLEDGE_GAPS,
  playbooks: MOCK_PLAYBOOKS,
  metrics: MOCK_METRICS,

  isCustomerSimulatorOpen: false,
  setCustomerSimulatorOpen: (open) => set({ isCustomerSimulatorOpen: open }),
  isVoiceModalOpen: false,
  setVoiceModalOpen: (open) => set({ isVoiceModalOpen: open }),
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  isArticleModalOpen: false,
  setArticleModalOpen: (open) => set({ isArticleModalOpen: open }),

  addNewArticle: (article) => {
    const newArt: KnowledgeArticle = {
      id: `art-${Date.now()}`,
      title: article.title || 'New Article',
      slug: (article.title || 'new-article').toLowerCase().replace(/[^a-z0-9]/g, '-'),
      content: article.content || 'Article contents...',
      category: article.category || 'General',
      author: 'Support Team',
      lastUpdated: new Date().toISOString().split('T')[0],
      viewCount: 1,
      helpfulScore: 100,
      vectorDimensions: 1536,
      tags: article.tags || ['guide'],
      isDraft: false
    };
    set((state) => ({ 
      knowledgeArticles: [newArt, ...state.knowledgeArticles],
      selectedKnowledgeArticleId: newArt.id
    }));
  },

  resolveGap: (gapId) => {
    set((state) => ({
      knowledgeGaps: state.knowledgeGaps.map((g) => (g.id === gapId ? { ...g, status: 'resolved' } : g))
    }));
  },

  togglePlaybookActive: (playbookId) => {
    set((state) => ({
      playbooks: state.playbooks.map((p) => (p.id === playbookId ? { ...p, isActive: !p.isActive } : p))
    }));
  },

  triggerSimulatedCustomerMessage: () => {
    const { tickets, selectedTicketId } = get();
    const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

    const randomReplies = [
      "Could you also clarify how this refund shows up on our next quarterly CSV export?",
      "That is great, thanks! Will our API key rate limit remain at 10,000 req/min?",
      "Thanks! Also, can we add our accounting team to the automated invoice billing notification list?",
      "Thank you for the quick resolution."
    ];
    const picked = randomReplies[Math.floor(Math.random() * randomReplies.length)];

    const incoming: ChatMessage = {
      id: `msg-${Date.now()}`,
      ticketId: activeTicket.id,
      sender: 'customer',
      senderName: activeTicket.customer.name,
      content: picked,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: activeTicket.channel,
      sentiment: 'positive'
    };

    set((state) => ({
      tickets: state.tickets.map((t) => {
        if (t.id !== activeTicket.id) return t;
        return {
          ...t,
          messages: [...t.messages, incoming],
          status: 'autonomous_ai',
          updatedAt: new Date().toISOString()
        };
      })
    }));
  }
}));
