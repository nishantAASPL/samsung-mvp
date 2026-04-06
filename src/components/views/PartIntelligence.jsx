import React from 'react';
import { ChevronDown, LineChart, Target, Zap, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { scopeDetails } from '../../data/mockData';

export default function PartIntelligence({ model, selectedPart, onPartChange }) {
  const partsList = [
    { id: 'PT01', name: 'S24U OLED Display', type: 'Displays' },
    { id: 'PT10', name: 'A54 Battery', type: 'Batteries' },
    { id: 'PT08', name: 'S24 Charging Port', type: 'Charging Ports' },
    { id: 'PT19', name: 'M34 Back Panel', type: 'Back Panels' }
  ];

  const activePart = partsList.find(p => p.id === selectedPart) || partsList[1];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Part Intelligence</h2>
          <p className="text-gray-500 mt-1 text-sm">Network-wide telemetry and MTBF forecasting for specific components.</p>
        </div>
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-[#E5E7EB] rounded px-4 py-2 pr-10 text-sm font-bold text-[#1428A0] shadow-sm cursor-pointer outline-none focus:border-blue-500"
            value={selectedPart}
            onChange={(e) => onPartChange && onPartChange(e.target.value)}
          >
            {partsList.map(p => <option key={p.id} value={p.id}>{p.id} - {p.name}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm">
            <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2 mb-4"><Target size={16} className="text-[#1428A0]"/> Component DNA</h3>
            <div className="space-y-3">
              <div><p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Classification</p><p className="font-bold text-gray-800 text-sm">{activePart.type}</p></div>
              <div><p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Risk Trait</p><p className="font-bold text-gray-800 text-sm">{activePart.id === 'PT10' ? 'MTBF Driven, High Turn' : activePart.id === 'PT01' ? 'High Cost, Low Volume' : 'Chronic Risk'}</p></div>
              <div className="pt-3 border-t border-gray-100"><p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Global MTBF Baseline</p><p className="text-xl font-black text-[#1428A0]">{activePart.id === 'PT10' ? '14 Months' : activePart.id === 'PT01' ? '28 Months' : '18 Months'}</p></div>
            </div>
          </div>
          
          <div className="bg-[#1428A0] text-white p-5 rounded-lg shadow-sm">
             <h3 className="font-bold text-sm flex items-center gap-2 mb-4 text-blue-200"><Zap size={16}/> AI Rebalancing Engine</h3>
             {model === 'AS_IS' ? (
                <div className="p-3 bg-white/10 rounded border border-white/20">
                  <p className="text-xs font-bold text-red-300 flex items-center gap-1 mb-1"><AlertTriangle size={14}/> Engine Offline</p>
                  <p className="text-[10px] text-blue-100">Using static regional thresholds. Network redistribution is disabled.</p>
                </div>
             ) : (
                <div className="p-3 bg-white rounded shadow-sm text-gray-800">
                  <p className="text-xs font-bold text-[#059669] flex items-center gap-1 mb-1"><CheckCircle2 size={14}/> Auto-Rebalance Active</p>
                  <p className="text-[10px] text-gray-600">Identified 50 idle units in Northeast. Rerouting to South region based on incoming MTBF wave.</p>
                </div>
             )}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
             <div>
                <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2 mb-1"><LineChart size={16} className="text-[#1428A0]"/> Network Demand Curve</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Aggregated US Install Base</p>
             </div>
             <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><div className="w-2.5 h-2.5 bg-gray-800 rounded-sm"></div> Historical</div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><div className={`w-2.5 h-2.5 rounded-sm ${model === 'AS_IS' ? 'bg-gray-200' : 'bg-[#1428A0]'}`}></div> Proj Demand</div>
             </div>
          </div>

          {/* SVG Modern Curve - Simulating a line chart */}
          <div className="w-full flex-1 relative min-h-[220px]">
             {/* Y-Axis lines */}
             <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between z-0">
                {[100, 75, 50, 25, 0].map(val => (
                   <div key={val} className="w-full h-px border-b border-gray-100 flex items-center">
                     <span className="text-[9px] font-bold text-gray-300 -ml-6 w-5 text-right bg-white pr-1">{val}</span>
                   </div>
                ))}
             </div>
             
             {/* Simulated SVG Graph */}
             <svg className="absolute inset-0 w-full h-full z-10 overflow-visible" preserveAspectRatio="none">
               <defs>
                  <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#1F2937" stopOpacity="0.2"/>
                     <stop offset="100%" stopColor="#1F2937" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#1428A0" stopOpacity="0.3"/>
                     <stop offset="100%" stopColor="#1428A0" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="asIsGrad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.1"/>
                     <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0"/>
                  </linearGradient>
               </defs>

               {/* Historical Area */}
               <path d="M 0 180 Q 50 150, 100 160 T 250 140 L 250 220 L 0 220 Z" fill="url(#histGrad)" />
               <path d="M 0 180 Q 50 150, 100 160 T 250 140" fill="none" stroke="#1F2937" strokeWidth="3" />

               {/* Forecast Area */}
               {model === 'TO_BE' ? (
                  <>
                     <path d="M 250 140 Q 350 40, 450 60 T 650 30 L 650 220 L 250 220 Z" fill="url(#foreGrad)" />
                     <path d="M 250 140 Q 350 40, 450 60 T 650 30" fill="none" stroke="#1428A0" strokeWidth="4" />
                     {/* Data Point */}
                     <circle cx="450" cy="60" r="4" fill="white" stroke="#1428A0" strokeWidth="3" />
                  </>
               ) : (
                  <>
                     <path d="M 250 140 Q 350 140, 450 145 T 650 150 L 650 220 L 250 220 Z" fill="url(#asIsGrad)" />
                     <path d="M 250 140 Q 350 140, 450 145 T 650 150" fill="none" stroke="#9CA3AF" strokeWidth="3" strokeDasharray="6 4" />
                  </>
               )}
               {/* Separator Line */}
               <line x1="250" y1="0" x2="250" y2="220" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"/>
             </svg>

             {/* Overlays */}
             <div className="absolute top-0 right-0 p-3 max-w-[200px] z-20">
                {model === 'TO_BE' ? (
                  <div className="bg-white/90 backdrop-blur-sm border border-blue-200 p-2 rounded shadow-sm">
                    <p className="text-[10px] font-bold text-[#1428A0] flex items-center gap-1"><TrendingUp size={12}/> Demand Spike Detected</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">MTBF convergence predicted in Q3.</p>
                  </div>
                ) : (
                  <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-2 rounded shadow-sm">
                    <p className="text-[10px] font-bold text-gray-500">Static Projection</p>
                    <p className="text-[9px] text-red-500 mt-0.5">Warning: Fails to map MTBF data.</p>
                  </div>
                )}
             </div>

             {/* X-Axis labels */}
             <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[9px] font-bold text-gray-400 uppercase">
               <span>Q3 2025</span>
               <span>Q4 2025</span>
               <span className="text-gray-800 bg-gray-100 px-1 rounded">Today</span>
               <span>Q2 2026</span>
               <span>Q3 2026</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
