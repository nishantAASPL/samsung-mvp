import React from 'react';
import { Network, Server, Factory, Store, ShieldCheck, AlertTriangle, ArrowRight, Zap } from 'lucide-react';

export default function NetworkTree({ model }) {
  const stockConfig = {
    oem: { stock: 1450, cap: 2000 },
    partner: { stock: 320, cap: 500 },
    store1: { stock: model === 'AS_IS' ? 0 : 45, cap: 50, location: 'Store #045 (Manhattan)' },
    store2: { stock: model === 'AS_IS' ? 12 : 25, cap: 50, location: 'Store #082 (Brooklyn)' }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest mb-2">
            <Network size={12} /> Topography
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Interactive Network Map</h2>
          <p className="text-gray-500 mt-1 text-sm">Real-time inventory dispersal and node health: Chicago ➔ NYC.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
         
         <div className="flex flex-col items-center z-10 w-full max-w-3xl translate-y-[-2rem]">
            {/* L1: OEM Node */}
            <div className="bg-white p-4 w-72 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-2 border-[#1428A0] flex items-center justify-between z-10 relative">
               <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1428A0] text-white flex items-center justify-center border-4 border-white shadow-sm"><Server size={10}/></div>
               <div className="pl-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">OEM Hub</h3>
                  <p className="font-bold text-gray-800">Chicago National</p>
               </div>
               <div className="text-right">
                  <p className="text-xl font-black text-[#1428A0]">{stockConfig.oem.stock}</p>
                  <p className="text-[9px] font-bold text-gray-400">UNITS AVAIL</p>
               </div>
            </div>

            {/* Path L1 -> L2 */}
            <div className="h-12 w-1 bg-[#1428A0]/20 rounded-full my-1 relative">
               {model === 'TO_BE' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 text-blue-800 text-[8px] font-bold px-2 py-0.5 rounded-full border border-blue-200 whitespace-nowrap flex items-center gap-1">
                     <Zap size={8}/> Dispatching 50 units
                  </div>
               )}
            </div>

            {/* L2: Partner Node */}
            <div className={`p-4 w-72 rounded-xl shadow-lg border-2 flex items-center justify-between z-10 relative bg-white ${model === 'AS_IS' ? 'border-gray-300' : 'border-[#059669]'}`}>
               <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-white flex items-center justify-center border-4 border-white shadow-sm ${model === 'AS_IS' ? 'bg-gray-400' : 'bg-[#059669]'}`}><Factory size={10}/></div>
               <div className="pl-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Partner Node</h3>
                  <p className="font-bold text-gray-800">NYC Regional</p>
               </div>
               <div className="text-right">
                  <p className={`text-xl font-black ${model === 'AS_IS' ? 'text-gray-800' : 'text-[#059669]'}`}>{stockConfig.partner.stock}</p>
                  <p className="text-[9px] font-bold text-gray-400">UNITS AVAIL</p>
               </div>
            </div>

            {/* Path L2 -> L3 Branching */}
            <div className="h-8 w-1 bg-gray-200 rounded-full my-0"></div>
            <div className="w-[26rem] h-1 bg-gray-200 relative rounded-full">
               <div className="absolute top-0 left-0 w-1 h-8 bg-gray-200 rounded-t-full"></div>
               <div className="absolute top-0 right-0 w-1 h-8 bg-gray-200 rounded-t-full"></div>
            </div>
            <div className="h-8 w-full flex justify-between px-[calc(50%-13rem)] -mt-1 opacity-0 pointer-events-none"><div></div><div></div></div> {/* Spacer */}

            {/* L3: Store Nodes */}
            <div className="flex justify-between w-full max-w-[38rem] mt-6 z-10 gap-8">
               {/* Store 1 */}
               <div className={`flex-1 p-4 rounded-xl shadow-lg border-2 relative bg-white flex flex-col ${stockConfig.store1.stock === 0 ? 'border-[#DC2626]' : 'border-[#1428A0]'}`}>
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-white flex items-center justify-center border-4 border-white shadow-sm ${stockConfig.store1.stock === 0 ? 'bg-[#DC2626]' : 'bg-[#1428A0]'}`}><Store size={10}/></div>
                  <div className="text-center pt-2 mb-4">
                     <p className="font-bold text-gray-800 text-sm">{stockConfig.store1.location}</p>
                     <p className="text-[10px] uppercase font-bold text-gray-500">Local Service Center</p>
                  </div>
                  <div className="bg-gray-50 rounded p-3 flex justify-between items-center border border-gray-100">
                     <span className="text-xs font-bold text-gray-400">LIVE STOCK</span>
                     <span className={`text-xl font-black ${stockConfig.store1.stock === 0 ? 'text-[#DC2626]' : 'text-[#1428A0]'}`}>{stockConfig.store1.stock}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 h-16 flex items-center justify-center">
                     {stockConfig.store1.stock === 0 ? (
                        <div className="bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1 text-center leading-tight">
                           <AlertTriangle size={12} className="flex-shrink-0"/> CRITICAL STOCKOUT<br/>SLA Failures Imminent
                        </div>
                     ) : (
                        <div className="bg-[#ECFDF5] text-[#059669] text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1 text-center">
                           <ShieldCheck size={12} className="flex-shrink-0"/> MTBF INVENTORY<br/>Positioned for Wave
                        </div>
                     )}
                  </div>
               </div>

               {/* Store 2 */}
               <div className={`flex-1 p-4 rounded-xl shadow-lg border-2 relative bg-white flex flex-col ${stockConfig.store2.stock < 15 ? 'border-[#D97706]' : 'border-gray-300'}`}>
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-white flex items-center justify-center border-4 border-white shadow-sm ${stockConfig.store2.stock < 15 ? 'bg-[#D97706]' : 'bg-gray-400'}`}><Store size={10}/></div>
                  <div className="text-center pt-2 mb-4">
                     <p className="font-bold text-gray-800 text-sm">{stockConfig.store2.location}</p>
                     <p className="text-[10px] uppercase font-bold text-gray-500">Local Service Center</p>
                  </div>
                  <div className="bg-gray-50 rounded p-3 flex justify-between items-center border border-gray-100">
                     <span className="text-xs font-bold text-gray-400">LIVE STOCK</span>
                     <span className={`text-xl font-black ${stockConfig.store2.stock < 15 ? 'text-[#D97706]' : 'text-gray-800'}`}>{stockConfig.store2.stock}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 h-16 flex items-center justify-center">
                     {model === 'AS_IS' ? (
                        <div className="text-gray-500 text-[10px] font-bold flex flex-col items-center leading-tight">
                           <span>Blind to S1 Crisis</span>
                           <span className="text-gray-400 font-normal">No lateral sharing setup</span>
                        </div>
                     ) : (
                        <div className="text-[#1428A0] text-[10px] font-bold flex flex-col items-center leading-tight">
                           <span>Steady State</span>
                           <span className="text-gray-500 font-normal">Handling local volume</span>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
