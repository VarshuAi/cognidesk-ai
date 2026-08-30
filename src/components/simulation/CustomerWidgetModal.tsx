import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, User } from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';
import confetti from 'canvas-confetti';

export const CustomerWidgetModal: React.FC = () => {
  const { isCustomerSimulatorOpen, setCustomerSimulatorOpen, tickets, selectedTicketId, sendMessage } = useDeskStore();
  const [input, setInput] = useState('');

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  if (!isCustomerSimulatorOpen) return null;

  const handleSendAsCustomer = () => {
    if (!input.trim()) return;
    sendMessage(activeTicket.id, input, false);
    setInput('');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 glass-dropdown rounded-3xl shadow-2xl border border-indigo-500/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <div>
            <h3 className="text-xs font-bold">CogniDesk Help Assistant</h3>
            <span className="text-[10px] opacity-80 font-mono">Simulating as {activeTicket.customer.name}</span>
          </div>
        </div>
        <button onClick={() => setCustomerSimulatorOpen(false)} className="text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="h-80 p-4 overflow-y-auto space-y-3 bg-[#080b14] text-xs">
        {activeTicket.messages.filter(m => !m.isInternalWhisper).map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
              msg.sender === 'customer'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-200'
            }`}>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-[#0a0e1c] border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendAsCustomer()}
          placeholder="Ask a customer support question..."
          className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSendAsCustomer}
          className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
