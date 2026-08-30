import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { TicketList } from './components/inbox/TicketList';
import { ConversationView } from './components/inbox/ConversationView';
import { AiCopilotPanel } from './components/inbox/AiCopilotPanel';
import { CustomerProfileSidebar } from './components/inbox/CustomerProfileSidebar';
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
    <div className="flex w-screen h-screen overflow-hidden bg-[#080b14] text-slate-100 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopHeader />

        <main className="flex-1 flex h-full overflow-hidden">
          {activeTab === 'inbox' && (
            <>
              <TicketList />
              <ConversationView />
              <AiCopilotPanel />
              <CustomerProfileSidebar />
            </>
          )}

          {activeTab === 'knowledge' && <KnowledgeBaseHub />}
          {activeTab === 'playbooks' && <PlaybookBuilder />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'settings' && <IntegrationSettings />}
        </main>
      </div>

      <CustomerWidgetModal />
      <VoiceCallModal />
      <CommandPalette />
    </div>
  );
}

export default App;
