import React, { useState, useEffect } from 'react';
import { User, Smartphone, Wrench, MapPin, CheckCircle2, Loader2, ServerCog, BrainCircuit, Search, Database, AlertTriangle, XCircle, Map, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

export default function InterceptSim({ model }) {
  const [simState, setSimState] = useState('IDLE');

  useEffect(() => {
    setSimState('IDLE');
  }, [model]);

  const runSimulation = () => {
    setSimState('STEP_1');
    setTimeout(() => setSimState('STEP_2'), 1200);
    setTimeout(() => setSimState('STEP_3'), 2400);
    setTimeout(() => setSimState('DONE'), 3600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-3">
        <div><h2 className="text-2xl font-bold text-[#1F2937]">Live Intercept Simulation</h2><p className="text-gray-500 text-xs">Simulate a customer booking to see the routing logic in action.</p></div>
        {simState !== 'IDLE' && <button onClick={() => setSimState('IDLE')} className="text-xs font-bold text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-50"><RefreshCw size={12} /> Reset</button>}
      </div>

      <div className="flex gap-4 h-full min-h-[450px]">
        <div className="w-1/3 bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6"><User className="text-[#1428A0]" size={18} /><h3 className="font-bold text-[#1F2937]">Customer Portal</h3></div>
            <div className="space-y-4">
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Name</label><div className="p-2 bg-gray-50 border border-gray-200 rounded text-xs font-semibold">John Doe</div></div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Device</label><div className="p-2 bg-gray-50 border border-gray-200 rounded text-xs font-semibold flex items-center gap-1"><Smartphone size={14} className="text-gray-400"/> Galaxy S24 Ultra</div></div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Issue</label><div className="p-2 bg-gray-50 border border-gray-200 rounded text-xs font-semibold flex items-center gap-1"><Wrench size={14} className="text-gray-400"/> Screen Replacement</div></div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Location</label><div className="p-2 bg-[#EBF0FA] border border-blue-200 rounded text-xs font-bold text-[#1428A0] flex items-center gap-1"><MapPin size={14}/> Store #142 (Chicago)</div></div>
            </div>
          </div>
          <button onClick={runSimulation} disabled={simState !== 'IDLE'} className={`w-full py-3 rounded font-bold text-sm flex justify-center gap-2 shadow-sm ${simState==='IDLE'?'bg-[#1428A0] hover:bg-[#1E3A8A] text-white':'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {simState !== 'IDLE' ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} Submit Request
          </button>
        </div>

        <div className="w-2/3 bg-gray-900 rounded-lg shadow-sm p-8 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2 z-10">
            {model === 'AS_IS' ? <ServerCog size={16} className="text-[#D97706]"/> : <BrainCircuit size={16} className="text-blue-400"/>} {model === 'AS_IS' ? 'AS-IS Logic Engine' : 'TO-BE Logic Engine'}
          </h4>

          {simState === 'IDLE' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 z-10"><Search size={32} strokeWidth={1} className="mb-2 opacity-50" /><p className="text-sm">Waiting for incoming reservation...</p></div>
          ) : (
            <div className="space-y-4 z-10">
              <div className="flex gap-3 items-start animate-in fade-in slide-in-from-left-4"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><CheckCircle2 size={12}/></div><div><p className="font-bold text-white text-sm">Request Intercepted</p><p className="text-xs text-gray-400">Initiating stock validation...</p></div></div>
              
              {model === 'AS_IS' ? (
                <>
                  {(simState === 'STEP_2' || simState === 'STEP_3' || simState === 'DONE') && <div className="flex gap-3 items-start animate-in fade-in"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Database size={12}/></div><div><p className="font-bold text-white text-sm">Warehouse Check</p><p className="text-xs text-gray-400">14 units available in National DC.</p></div></div>}
                  {simState === 'DONE' && (
                    <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg animate-in slide-in-from-bottom-2">
                      <span className="bg-green-500/20 text-green-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mb-2 inline-block">Approved</span>
                      <h3 className="text-sm font-bold text-white mb-1">Confirmed for Store #142</h3>
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded flex gap-2"><AlertTriangle className="text-red-400 flex-shrink-0" size={16}/><div><p className="text-xs font-bold text-red-400 mb-0.5">Blind Spot</p><p className="text-[10px] text-red-300/80">Local stock is 0. SLA Failure guaranteed.</p></div></div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {(simState === 'STEP_2' || simState === 'STEP_3' || simState === 'DONE') && <div className="flex gap-3 items-start animate-in fade-in"><div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400"><XCircle size={12}/></div><div><p className="font-bold text-white text-sm">Local Gate Check</p><p className="text-xs text-gray-400">Store #142 has <strong className="text-red-400">0 units</strong>.</p></div></div>}
                  {(simState === 'STEP_3' || simState === 'DONE') && <div className="flex gap-3 items-start animate-in fade-in"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Map size={12}/></div><div><p className="font-bold text-white text-sm">Proximity Search</p><p className="text-xs text-gray-400">Store #187 (8mi) has 4 units.</p></div></div>}
                  {simState === 'DONE' && (
                    <div className="mt-4 p-4 bg-[#1428A0]/20 border border-[#1428A0]/50 rounded-lg animate-in slide-in-from-bottom-2 shadow-[0_0_15px_rgba(20,40,160,0.3)]">
                      <span className="bg-blue-500/20 text-blue-300 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mb-2 inline-flex items-center gap-1"><ArrowRight size={10}/> Redirected</span>
                      <h3 className="text-sm font-bold text-white mb-1">Rerouted to Store #187</h3>
                      <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded flex gap-2"><ShieldCheck className="text-green-400 flex-shrink-0" size={16}/><div><p className="text-xs font-bold text-green-400 mb-0.5">FTFR Saved</p><p className="text-[10px] text-green-300/80">Repair guaranteed on first visit.</p></div></div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
