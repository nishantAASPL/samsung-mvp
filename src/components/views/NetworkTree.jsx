import React, { useState } from 'react';
import { Network, Server, Factory, Store, ShieldCheck, AlertTriangle, Zap, ChevronDown } from 'lucide-react';
import { partners, networkStores } from '../../data/mockData';

export default function NetworkTree({ model }) {
  const [activePartnerId, setActivePartnerId] = useState(partners[0].id);
  const activePartner = partners.find(p => p.id === activePartnerId);
  const partnerStores = networkStores.filter(s => s.partnerId === activePartnerId);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest mb-2">
            <Network size={12} /> Live Topography
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Interactive Network Map</h2>
          <p className="text-gray-500 mt-1 text-sm">Real-time inventory dispersal and node health down to the local tier.</p>
        </div>
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-[#E5E7EB] rounded px-4 py-2 pr-10 text-sm font-bold text-[#1428A0] shadow-sm cursor-pointer outline-none focus:border-blue-500"
            value={activePartnerId}
            onChange={(e) => setActivePartnerId(e.target.value)}
          >
            {partners.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
         
         <div className="flex flex-col items-center z-10 w-full max-w-5xl translate-y-[-2rem]">
            {/* L1: OEM Node */}
            <div className="bg-white p-4 w-72 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-2 border-[#1428A0] flex items-center justify-between z-10 relative">
               <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1428A0] text-white flex items-center justify-center border-4 border-white shadow-sm"><Server size={10}/></div>
               <div className="pl-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">OEM Central</h3>
                  <p className="font-bold text-gray-800">Chicago Depot</p>
               </div>
               <div className="text-right">
                  <p className="text-xl font-black text-[#1428A0]">14,200</p>
                  <p className="text-[9px] font-bold text-gray-400">UNITS AVAIL</p>
               </div>
            </div>

            {/* Path L1 -> L2 */}
            <div className="h-12 w-1 bg-[#1428A0]/20 rounded-full my-1 relative">
               {model === 'TO_BE' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 text-blue-800 text-[8px] font-bold px-2 py-0.5 rounded-full border border-blue-200 whitespace-nowrap flex items-center gap-1">
                     <Zap size={8}/> Intelligent Dispersal Active
                  </div>
               )}
            </div>

            {/* L2: Partner Node */}
            <div className={`p-4 w-72 rounded-xl shadow-lg border-2 flex items-center justify-between z-10 relative bg-white ${model === 'AS_IS' ? 'border-gray-300' : 'border-[#059669]'}`}>
               <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-white flex items-center justify-center border-4 border-white shadow-sm ${model === 'AS_IS' ? 'bg-gray-400' : 'bg-[#059669]'}`}><Factory size={10}/></div>
               <div className="pl-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{activePartner.region} Partner</h3>
                  <p className="font-bold text-gray-800">{activePartner.name}</p>
               </div>
               <div className="text-right">
                  <p className={`text-xl font-black ${model === 'AS_IS' ? 'text-gray-800' : 'text-[#059669]'}`}>310</p>
                  <p className="text-[9px] font-bold text-gray-400">UNITS HOLDING</p>
               </div>
            </div>

            {/* Path L2 -> L3 Branching */}
            <div className="h-8 w-1 bg-gray-200 rounded-full my-0"></div>
            
            {partnerStores.length > 1 && (
              <div className="w-full max-w-3xl h-1 bg-gray-200 relative rounded-full">
                 <div className="absolute top-0 left-0 w-1 h-8 bg-gray-200 rounded-t-full"></div>
                 {partnerStores.length > 2 && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-200 rounded-t-full"></div>}
                 <div className="absolute top-0 right-0 w-1 h-8 bg-gray-200 rounded-t-full"></div>
              </div>
            )}
            
            {/* L3: Store Nodes dynamically mapped */}
            <div className={`flex justify-between w-full max-w-4xl mt-6 z-10 gap-6 ${partnerStores.length === 1 ? 'justify-center' : ''}`}>
               {partnerStores.map((store, i) => {
                  const liveStock = model === 'AS_IS' ? store.asIsStock : store.stock;
                  const isCritical = liveStock < store.threshold;
                  const isSurplus = liveStock > store.threshold * 2;
                  
                  let borderClass = 'border-gray-300';
                  let iconBg = 'bg-gray-400';
                  let statusBg = 'bg-gray-50 text-gray-500';
                  let statusIcon = <Store size={12}/>;
                  let statusText = 'Normal';

                  if (isCritical) {
                     borderClass = 'border-[#DC2626]';
                     iconBg = 'bg-[#DC2626]';
                     statusBg = 'bg-[#FEF2F2] text-[#DC2626]';
                     statusIcon = <AlertTriangle size={12} className="flex-shrink-0"/>;
                     statusText = 'CRITICAL STOCK';
                  } else if (model === 'TO_BE' && isSurplus) {
                     borderClass = 'border-[#1428A0]';
                     iconBg = 'bg-[#1428A0]';
                     statusBg = 'bg-[#EBF0FA] text-[#1428A0]';
                     statusIcon = <ShieldCheck size={12} className="flex-shrink-0"/>;
                     statusText = 'SURPLUS IDENTIFIED';
                  } else if (model === 'TO_BE') {
                     borderClass = 'border-[#059669]';
                     iconBg = 'bg-[#059669]';
                     statusBg = 'bg-[#ECFDF5] text-[#059669]';
                     statusIcon = <ShieldCheck size={12} className="flex-shrink-0"/>;
                     statusText = 'HEALTHY BUFFER';
                  }

                  return (
                     <div key={store.id} className={`flex-1 min-w-[200px] p-4 rounded-xl shadow-lg border-2 relative bg-white flex flex-col ${borderClass}`}>
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-white flex items-center justify-center border-4 border-white shadow-sm ${iconBg}`}><Store size={10}/></div>
                        <div className="text-center pt-2 mb-4">
                           <p className="font-bold text-gray-800 text-sm truncate">{store.location}</p>
                           <p className="text-[10px] uppercase font-bold text-gray-500">{store.id}</p>
                        </div>
                        <div className="bg-gray-50 rounded p-3 flex justify-between items-center border border-gray-100">
                           <span className="text-xs font-bold text-gray-400">LIVE STOCK</span>
                           <span className={`text-2xl font-black ${isCritical ? 'text-[#DC2626]' : 'text-gray-800'}`}>{liveStock}</span>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center">
                           <div className={`text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1 text-center ${statusBg}`}>
                              {statusIcon} {statusText}
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
    </div>
  );
}
