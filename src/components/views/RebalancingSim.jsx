import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Store, AlertTriangle, ShieldCheck, Play, CheckCircle2, TrendingUp, DollarSign, ChevronDown } from 'lucide-react';
import { partners, networkStores } from '../../data/mockData';

export default function RebalancingSim({ model }) {
  const [activePartnerId, setActivePartnerId] = useState(partners[0].id);
  const [simState, setSimState] = useState('IDLE'); // IDLE, RUNNING, DONE
  
  useEffect(() => {
    setSimState('IDLE');
  }, [model, activePartnerId]);

  // Identify nodes dynamically based on partner
  const pStores = networkStores.filter(s => s.partnerId === activePartnerId);
  
  // Predict critical vs excess locally
  const sortedByStock = [...pStores].sort((a,b) => a.stock - b.stock);
  const criticalStoreNode = sortedByStock[0] || { id: 'ERR', location: 'Unknown', stock: 0, asIsStock: 0 };
  const excessStoreNode = sortedByStock[sortedByStock.length - 1] || { id: 'ERR', location: 'Unknown', stock: 0, asIsStock: 0 };

  const store1 = { 
    id: criticalStoreNode.id, 
    name: criticalStoreNode.location, 
    initialStock: model === 'AS_IS' ? criticalStoreNode.asIsStock : criticalStoreNode.stock, 
    postStock: criticalStoreNode.stock + 15, 
    status: (model === 'AS_IS' ? criticalStoreNode.asIsStock : criticalStoreNode.stock) < 5 ? 'Critical' : 'Low', 
    postStatus: 'Healthy' 
  };
  
  const store2 = { 
    id: excessStoreNode.id, 
    name: excessStoreNode.location, 
    initialStock: model === 'AS_IS' ? excessStoreNode.asIsStock : excessStoreNode.stock, 
    postStock: Math.max(0, excessStoreNode.stock - 15), 
    status: (model === 'AS_IS' ? excessStoreNode.asIsStock : excessStoreNode.stock) > 20 ? 'Excess' : 'Stable', 
    postStatus: 'Optimal' 
  };
  
  const runSimulation = () => {
    setSimState('RUNNING');
    setTimeout(() => {
      setSimState('DONE');
    }, 1500);
  };
  
  const unitCost = 450; // SLA Failure Cost
  const savedUnits = 15;
  const savings = savedUnits * unitCost;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest mb-2">
            <ArrowLeftRight size={12} /> Lateral Motion
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Partner Scoped Rebalancing Simulation</h2>
          <p className="text-gray-500 mt-1 text-sm">Demonstrating localized child-node peer-to-peer transferring without Central OEM request.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <select 
              className="h-full appearance-none bg-white border border-[#E5E7EB] rounded px-4 py-2 pr-10 text-sm font-bold text-[#1428A0] shadow-sm cursor-pointer outline-none focus:border-blue-500"
              value={activePartnerId}
              onChange={(e) => setActivePartnerId(e.target.value)}
            >
              {partners.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
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
            {model === 'AS_IS' ? 'Disabled in AS-IS' : simState === 'IDLE' ? 'Run Partner Rebalance' : simState === 'RUNNING' ? 'Allocating Nodes...' : 'Simulation Complete'}
          </button>
        </div>
      </div>

      {model === 'AS_IS' && (
         <div className="bg-[#FEF2F2] border border-[#FCA5A5] p-4 rounded-lg flex items-start gap-3 shadow-sm mb-4 animate-in slide-in-from-top-2">
            <AlertTriangle className="text-[#DC2626] mt-0.5" size={20}/>
            <div>
               <h3 className="font-bold text-[#991B1B]">Legacy Logic Active</h3>
               <p className="text-sm text-[#B91C1C] mt-1">Inter-store visibility is blocked by siloed datasets. Store managers within this partner cannot see lateral stock. Automated localized rebalancing disabled.</p>
            </div>
         </div>
      )}

      {store1.id === store2.id ? (
         <div className="bg-gray-100 p-8 text-center text-gray-500 rounded font-bold border border-gray-200 flex-1 flex items-center justify-center">
            Logistical failure identifying distinct child nodes for Partner {activePartnerId}. Requires &gt; 1 store.
         </div>
      ) : (
         <div className="flex gap-8 items-center justify-center p-8 bg-white border border-[#E5E7EB] rounded-lg shadow-sm relative overflow-hidden flex-1">
            {/* Network Background lines */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50">
               <div className={`w-full h-1 border-t-[3px] border-dashed transition-all duration-1000 ${simState === 'DONE' ? 'border-[#1428A0]' : 'border-gray-200'}`}></div>
            </div>

            {/* Critical Store (Receiver) */}
            <div className={`z-10 w-80 p-6 rounded-xl border-2 transition-all duration-700 bg-white flex flex-col shadow-lg ${simState === 'DONE' ? 'border-[#059669]' : 'border-[#DC2626]'}`}>
               <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner ${simState === 'DONE' ? 'bg-[#059669]' : 'bg-[#DC2626]'}`}><Store size={24}/></div>
                  <div>
                     <h3 className="font-bold text-gray-800 text-lg">{store1.name}</h3>
                     <p className="text-xs text-gray-500">{store1.id}</p>
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
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PT10 (Battery) Stock</p>
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
                        <CheckCircle2 size={16}/> 15 Units Shifted
                     </div>
                  ) : (
                     <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 animate-pulse">
                        <ArrowLeftRight size={16}/> Securing Logistics...
                     </div>
                  )}
               </div>
               <ArrowLeftRight size={48} className={`mt-4 transition-all duration-1000 ${simState === 'DONE' ? 'text-[#1428A0] -scale-x-100' : 'text-gray-200'}`} strokeWidth={1.5}/>
            </div>

            {/* Excess Store (Sender) */}
            <div className={`z-10 w-80 p-6 rounded-xl border-2 transition-all duration-700 bg-white flex flex-col shadow-lg ${simState === 'DONE' ? 'border-[#1428A0]' : 'border-gray-300'}`}>
               <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner ${simState === 'DONE' ? 'bg-[#1428A0]' : 'bg-gray-400'}`}><Store size={24}/></div>
                  <div>
                     <h3 className="font-bold text-gray-800 text-lg">{store2.name}</h3>
                     <p className="text-xs text-gray-500">{store2.id}</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                     <p className={`text-sm font-bold flex items-center gap-1.5 ${simState === 'DONE' ? 'text-[#1428A0]' : 'text-gray-600'}`}>
                        {simState === 'DONE' ? <TrendingUp size={16}/> : <AlertTriangle size={16}/>} 
                        {simState === 'DONE' ? store2.postStatus : store2.status}
                     </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PT10 (Battery) Stock</p>
                     <div className="flex items-end gap-2">
                        <p className="text-4xl font-black text-gray-800">{simState === 'DONE' ? store2.postStock : store2.initialStock}</p>
                        <p className="text-xs font-bold text-gray-400 pb-1 w-20">Units</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {simState === 'DONE' && (
         <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-6 rounded-lg flex items-center justify-between shadow-sm animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded bg-[#059669] text-white flex items-center justify-center"><DollarSign size={24}/></div>
               <div>
                  <h3 className="font-bold text-green-900 text-lg">Partner SLA Value Blocked</h3>
                  <p className="text-green-800 text-xs font-medium mt-1">15 units diverted dynamically inside the {activePartnerId} network, preventing catastrophic delay costs.</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">Penalties Avoided Local</p>
               <p className="text-3xl font-black text-[#059669]">${savings.toLocaleString()}</p>
            </div>
         </div>
      )}
    </div>
  );
}
