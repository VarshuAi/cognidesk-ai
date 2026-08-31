import React from 'react';
import { Database, Webhook, Shield, Key } from 'lucide-react';

const INTEGRATIONS = [
  { name: 'Stripe Billing API', desc: 'Process pro-rated refunds and verify invoice receipts', status: 'Connected', icon: <Database className="w-4 h-4 text-zinc-400" /> },
  { name: 'Slack Enterprise', desc: 'Broadcast high-priority VIP customer alarms to #vip-escalations', status: 'Connected', icon: <Webhook className="w-4 h-4 text-zinc-400" /> },
  { name: 'Okta / SAML 2.0', desc: 'Identity federation and role-based group assignment', status: 'Connected', icon: <Shield className="w-4 h-4 text-zinc-400" /> },
  { name: 'Jira Service Management', desc: 'Auto-dispatch bug reproduction logs to sprint backlog', status: 'Connected', icon: <Key className="w-4 h-4 text-zinc-400" /> },
];

export const IntegrationSettings: React.FC = () => {
  return (
    <div className="flex-1 h-full bg-[#09090b] overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-6 select-none">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-lg font-bold text-zinc-100">Integrations & API Settings</h2>
        <p className="text-xs text-zinc-400 mt-0.5">Manage connected billing providers, identity SSO, and notification webhooks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {INTEGRATIONS.map((int, i) => (
          <div key={i} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {int.icon}
                <h4 className="text-xs font-semibold text-zinc-200">{int.name}</h4>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-emerald-400">
                {int.status}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">{int.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
