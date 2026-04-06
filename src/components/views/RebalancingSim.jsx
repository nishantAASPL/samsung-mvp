import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Store, AlertTriangle, ShieldCheck, Play, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

export default function RebalancingSim({ model }) {
  const [simState, setSimState] = useState('IDLE'); // IDLE, RUNNING, DONE
  
  useEffect(() => {
    setSimState('IDLE');
  }, [model]);

  const runSimulation = () => {
    setSimState('RUNNING');
    setTimeout(() => {
      setSimState('DONE');
    }, 1500);
  };

  const store1 = { id: 142, name: 'Chicago North', initialStock: 0, postStock: 15, status: 'Critical', postStatus: 'Healthy' };
  const store2 = { id: 187, name: 'Naperville', initialStock: 42, postStock: 27, status: 'Excess', postStatus: 'Optimal' };
  
  const unitCost = 450; // SLA Failure Cost ~ $450
  const savedUnits = 15;
  const savings = savedUnits * unitCost;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest mb-2">
            <ArrowLeftRight size={12} /> Lateral Motion
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Inter-Store Rebalancing Simulation</h2>
          <p className="text-gray-500 mt-1 text-sm">Demonstrating peer-to-peer inventory transfer logic to prevent local SLA failures.</p>
        </div>
        <button 
          onClick={runSimulation} 
          disabled={simState !== 'IDLE' || model === 'AS_IS'}
          className={`px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 transition-all shadow-sm ${
             model === 'AS_IS' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
             simState === 'IDLE' ? 'bg-[#1428A0] hover:bg-[#1E3A8A] text-white' : 
             simState === 'RUNNING' ? 'bg-blue-400 text-white cursor-wait' : 'bg-[#059669] text-white cursor-default'
          }`}
        >
          {model === 'AS_IS' ? <AlertTriangle size={16}/> : simState === 'IDLE' ? <Play size={16} /> : simState === 'RUNNING' ? <Play size={16} className="animate-pulse"/> : <CheckCircle2 size={16} />}
          {model === 'AS_IS' ? 'Disabled in AS-IS' : simState === 'IDLE' ? 'Run Rebalancing Simulation' : simState === 'RUNNING' ? 'Analyzing Nodes...' : 'Simulation Complete'}
        </button>
      </div>

      {model === 'AS_IS' && (
         <div className="bg-[#FEF2F2] border border-[#FCA5A5] p-4 rounded-lg flex items-start gap-3 shadow-sm mb-4 animate-in slide-in-from-top-2">
            <AlertTriangle className="text-[#DC2626] mt-0.5" size={20}/>
            <div>
               <h3 className="font-bold text-[#991B1B]">Legacy Logic Active</h3>
               <p className="text-sm text-[#B91C1C] mt-1">Inter-store visibility is blocked. Store managers must manually call peers to locate physical stock. Automated rebalancing is disabled.</p>
            </div>
         </div>
      )}

      <div className="flex gap-8 items-center justify-center p-8 bg-white border border-[#E5E7EB] rounded-lg shadow-sm relative overflow-hidden flex-1">
         {/* Network Background lines */}
         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50">
            <div className={`w-full h-1 border-t-[3px] border-dashed transition-all duration-1000 ${simState === 'DONE' ? 'border-[#1428A0]' : 'border-gray-200'}`}></div>
         </div>

         {/* Store 1 */}
         <div className={`z-10 w-80 p-6 rounded-xl border-2 transition-all duration-700 bg-white flex flex-col shadow-lg ${simState === 'DONE' ? 'border-[#059669]' : 'border-[#DC2626]'}`}>
            <div className="flex items-center gap-3 mb-6">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner ${simState === 'DONE' ? 'bg-[#059669]' : 'bg-[#DC2626]'}`}><Store size={24}/></div>
               <div>
                  <h3 className="font-bold text-gray-800 text-lg">Store #{store1.id}</h3>
                  <p className="text-xs text-gray-500">{store1.name}</p>
               </div>
            </div>
            
            <div className="space-y-4">
               <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <p className={`text-sm font-bold flex items-center gap-1.5 ${simState === 'DONE' ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                     {simState === 'DONE' ? <ShieldCheck size={16}/> : <AlertTriangle size={16}/>} 
                     {simState === 'DONE' ? store1.postStatus : store1.status}
                  </p>
               </div>
               <div className="pt-4 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Stock (PT10)</p>
                  <div className="flex items-end gap-2">
                     <p className="text-4xl font-black text-gray-800">{simState === 'DONE' ? store1.postStock : store1.initialStock}</p>
                     <p className="text-xs font-bold text-gray-400 pb-1 w-20">Units</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Arrow / Transfer Module */}
         <div className="z-10 w-48 flex flex-col items-center justify-center -mt-8">
            <div className={`transition-all duration-700 w-full flex justify-center ${simState === 'RUNNING' ? 'opacity-100 scale-110' : simState === 'DONE' ? 'opacity-100' : 'opacity-0'}`}>
               {simState === 'DONE' ? (
                  <div className="bg-[#EBF0FA] border border-blue-200 text-[#1428A0] px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 animate-in zoom-in">
                     <CheckCircle2 size={16}/> 15 Units Transferred
                  </div>
               ) : (
                  <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 animate-pulse">
                     <ArrowLeftRight size={16}/> Securing Logistics...
                  </div>
               )}
            </div>
            <ArrowLeftRight size={48} className={`mt-4 transition-all duration-1000 ${simState === 'DONE' ? 'text-[#1428A0] -scale-x-100' : 'text-gray-200'}`} strokeWidth={1.5}/>
         </div>

         {/* Store 2 */}
         <div className={`z-10 w-80 p-6 rounded-xl border-2 transition-all duration-700 bg-white flex flex-col shadow-lg ${simState === 'DONE' ? 'border-[#1428A0]' : 'border-[#D97706]'}`}>
            <div className="flex items-center gap-3 mb-6">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner ${simState === 'DONE' ? 'bg-[#1428A0]' : 'bg-[#D97706]'}`}><Store size={24}/></div>
               <div>
                  <h3 className="font-bold text-gray-800 text-lg">Store #{store2.id}</h3>
                  <p className="text-xs text-gray-500">{store2.name}</p>
               </div>
            </div>
            
            <div className="space-y-4">
               <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <p className={`text-sm font-bold flex items-center gap-1.5 ${simState === 'DONE' ? 'text-[#1428A0]' : 'text-[#D97706]'}`}>
                     {simState === 'DONE' ? <TrendingUp size={16}/> : <AlertTriangle size={16}/>} 
                     {simState === 'DONE' ? store2.postStatus : store2.status}
                  </p>
               </div>
               <div className="pt-4 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Stock (PT10)</p>
                  <div className="flex items-end gap-2">
                     <p className="text-4xl font-black text-gray-800">{simState === 'DONE' ? store2.postStock : store2.initialStock}</p>
                     <p className="text-xs font-bold text-gray-400 pb-1 w-20">Units</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {simState === 'DONE' && (
         <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-6 rounded-lg flex items-center justify-between shadow-sm animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded bg-[#059669] text-white flex items-center justify-center"><DollarSign size={24}/></div>
               <div>
                  <h3 className="font-bold text-green-900 text-lg">Rebalancing ROI Captured</h3>
                  <p className="text-green-800 text-xs font-medium mt-1">15 units diverted from excess to critical scarcity, bypassing standard OEM resupply lead times.</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">SLA Penalties Avoided</p>
               <p className="text-3xl font-black text-[#059669]">${savings.toLocaleString()}</p>
            </div>
         </div>
      )}
    </div>
  );
}
