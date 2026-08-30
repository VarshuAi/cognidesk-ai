import React from 'react';
import { Settings, Check, Key, Shield, Webhook, Database, Sparkles } from 'lucide-react';

const INTEGRATIONS = [
  { name: 'Stripe Billing API', desc: 'Auto-process pro-rated refunds and true-up seat adjustments', status: 'Connected', icon: <Database className="w-4 h-4 text-indigo-400" /> },
  { name: 'Slack Enterprise Grid', desc: 'Post high-priority VIP churn alarms to #vip-escalations', status: 'Connected', icon: <Webhook className="w-4 h-4 text-emerald-400" /> },
  { name: 'Okta / Microsoft Entra ID', desc: 'SAML 2.0 Identity provider & Just-In-Time role mapping', status: 'Connected', icon: <Shield className="w-4 h-4 text-cyan-400" /> },
  { name: 'Jira Service Management', desc: 'Auto-dispatch bug reproduction logs to engineering sprints', status: 'Connected', icon: <Key className="w-4 h-4 text-amber-400" /> },
];

export const IntegrationSettings: React.FC = () => {
  return (
    <div className="flex-1 h-full bg-[#080b14] overflow-y-auto p-8 space-y-6 select-none">
      <div>
        <h2 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2.5">
          <Settings className="w-5 h-5 text-indigo-400" />
          Enterprise Integrations & API Security
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure third-party billing, SSO, and ticketing webhooks with automated cryptographic verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INTEGRATIONS.map((int, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#0a0e1c] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {int.icon}
                <h3 className="text-sm font-bold text-slate-100">{int.name}</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                {int.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">{int.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
