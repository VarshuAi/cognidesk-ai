import React from 'react';
import { TopHeader } from './components/layout/TopHeader';
import { TicketList } from './components/inbox/TicketList';
import { ConversationView } from './components/inbox/ConversationView';
import { ContextInspectorPanel } from './components/inbox/ContextInspectorPanel';
import { KnowledgeBaseHub } from './components/knowledge/KnowledgeBaseHub';
import { PlaybookBuilder } from './components/playbooks/PlaybookBuilder';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { IntegrationSettings } from './components/settings/IntegrationSettings';
import { CustomerWidgetModal } from './components/simulation/CustomerWidgetModal';
import { VoiceCallModal } from './components/simulation/VoiceCallModal';
import { CommandPalette } from './components/layout/CommandPalette';
import { useDeskStore } from './store/useDeskStore';

export function App() {
  const { activeTab } = useDeskStore();

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-[#09090b] text-zinc-100 font-sans">
      <TopHeader />

      <main className="flex-1 flex h-[calc(100vh-52px)] overflow-hidden">
        {activeTab === 'inbox' && (
          <div className="flex-1 flex w-full h-full overflow-hidden">
            <TicketList />
            <ConversationView />
            <ContextInspectorPanel />
          </div>
        )}

        {activeTab === 'knowledge' && <KnowledgeBaseHub />}
        {activeTab === 'playbooks' && <PlaybookBuilder />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'settings' && <IntegrationSettings />}
      </main>

      <CustomerWidgetModal />
      <VoiceCallModal />
      <CommandPalette />
    </div>
  );
}

export default App;
