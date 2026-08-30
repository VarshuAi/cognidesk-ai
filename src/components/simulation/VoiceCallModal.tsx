import React, { useState } from 'react';
import { X, Phone, Mic, MicOff, Volume2, Radio } from 'lucide-react';
import { useDeskStore } from '../../store/useDeskStore';

export const VoiceCallModal: React.FC = () => {
  const { isVoiceModalOpen, setVoiceModalOpen } = useDeskStore();
  const [isMuted, setIsMuted] = useState(false);

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md glass-dropdown p-6 rounded-3xl shadow-2xl border border-cyan-500/30 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            Live Voice Telephony SIP
          </span>
          <button onClick={() => setVoiceModalOpen(false)} className="text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-600 to-indigo-600 mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20">
            <Phone className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Dr. Priya Sharma</h3>
          <p className="text-xs text-slate-400 font-mono">HealthPulse AI Labs • +1 (416) 555-0192</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-center gap-1.5 h-12">
            {[40, 70, 90, 60, 30, 80, 100, 75, 45, 60, 85, 40].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full animate-pulse"
                style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          <p className="text-[11px] text-slate-300 font-mono italic">
            "We need to verify if custom SAML group attribute mapping is supported..."
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-2xl border transition-all ${
              isMuted ? 'bg-rose-950 border-rose-800 text-rose-400' : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setVoiceModalOpen(false)}
            className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 rotate-135" />
            <span>End Simulated Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
