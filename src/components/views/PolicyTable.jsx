import React from 'react';
import { Table, ShieldAlert, CheckCircle2, Factory, Database } from 'lucide-react';

export default function PolicyTable({ model }) {
  // Use model to change calculated min/max and status dynamically
  const policyData = [
    { loc: 'Store #045 (NYC)', stock: 8, legacyMin: 15, legacyMax: 30, aiMin: 5, aiMax: 12, aiAction: 'Healthy', legacyAction: 'Critical Low' },
    { loc: 'Store #142 (CHI)', stock: 45, legacyMin: 10, legacyMax: 50, aiMin: 40, aiMax: 80, aiAction: 'Reorder Imminent', legacyAction: 'Healthy' },
    { loc: 'Store #082 (BKN)', stock: 2, legacyMin: 5, legacyMax: 15, aiMin: 8, aiMax: 20, aiAction: 'Critical Low', legacyAction: 'Critical Low' },
    { loc: 'Store #210 (SCH)', stock: 24, legacyMin: 20, legacyMax: 40, aiMin: 10, aiMax: 25, aiAction: 'Healthy', legacyAction: 'Healthy' },
    { loc: 'Partner Hub (East)', stock: 410, legacyMin: 300, legacyMax: 500, aiMin: 150, aiMax: 300, aiAction: 'Excess/Dead Stock', legacyAction: 'Healthy' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest mb-2">
            <Table size={12} /> Stock Parameters
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Dynamic Stocking Policy</h2>
          <p className="text-gray-500 mt-1 text-sm">Comparing localized threshold bounds: Static Legacy vs Active Install-Base Logic.</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded">
           {model === 'AS_IS' ? <Database size={16} className="text-[#D97706]"/> : <Factory size={16} className="text-[#1428A0]"/>}
           <span className="text-xs font-bold text-gray-700">Displaying: {model === 'AS_IS' ? 'Legacy Logic' : 'Install-Base Logic'}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-[#E5E7EB]">
                <tr>
                  <th className="p-4 font-bold text-gray-600 whitespace-nowrap">Location (Store / Hub)</th>
                  <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Current Stock</th>
                  <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap border-l border-gray-200">Calculated Min</th>
                  <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Calculated Max</th>
                  <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap border-l border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {policyData.map((row, i) => {
                   const min = model === 'AS_IS' ? row.legacyMin : row.aiMin;
                   const max = model === 'AS_IS' ? row.legacyMax : row.aiMax;
                   const action = model === 'AS_IS' ? row.legacyAction : row.aiAction;
                   
                   let statusClass = 'bg-gray-100 text-gray-600 border-gray-200';
                   let Icon = CheckCircle2;
                   
                   if (action.includes('Healthy') || action.includes('Optimal')) {
                      statusClass = 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
                      Icon = CheckCircle2;
                   } else if (action.includes('Low')) {
                      statusClass = 'bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]';
                      Icon = ShieldAlert;
                   } else {
                      statusClass = 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
                      Icon = ShieldAlert;
                   }

                   return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-semibold text-gray-800">{row.loc}</td>
                        <td className="p-4 text-center">
                           <span className="text-lg font-black text-gray-800">{row.stock}</span>
                        </td>
                        <td className="p-4 text-center border-l border-gray-100">
                           <span className={`text-base font-bold ${row.stock < min ? 'text-[#DC2626]' : 'text-gray-500'}`}>{min}</span>
                        </td>
                        <td className="p-4 text-center">
                           <span className={`text-base font-bold ${row.stock > max ? 'text-[#D97706]' : 'text-gray-500'}`}>{max}</span>
                        </td>
                        <td className="p-4 text-center border-l border-gray-100">
                           <div className={`px-3 py-1.5 rounded text-xs font-bold border inline-flex items-center gap-1.5 justify-center min-w-[140px] ${statusClass}`}>
                              <Icon size={14} className="flex-shrink-0"/> {action}
                           </div>
                        </td>
                      </tr>
                   );
                })}
              </tbody>
            </table>
         </div>
      </div>
      
      {model === 'AS_IS' ? (
         <div className="bg-[#FFFBEB] border border-[#FDE68A] p-4 rounded-lg flex items-start gap-3 shadow-sm animate-in slide-in-from-bottom-2">
            <ShieldAlert className="text-[#D97706] mt-0.5" size={16}/>
            <div>
               <p className="text-xs font-bold text-[#92400E]">False Positives & Blindspots Detected</p>
               <p className="text-[10px] text-[#92400E] mt-0.5">Legacy logic flags NYC as critical despite MTBF clearance, forcing unnecessary restocking. Meanwhile, Chicago is marked healthy despite incoming failure waves exceeding stock.</p>
            </div>
         </div>
      ) : (
         <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-lg flex items-start gap-3 shadow-sm animate-in slide-in-from-bottom-2">
            <CheckCircle2 className="text-[#059669] mt-0.5" size={16}/>
            <div>
               <p className="text-xs font-bold text-[#065F46]">Install-Base Truth Restored</p>
               <p className="text-[10px] text-[#065F46] mt-0.5">NYC bounds lowered to match true low MTBF wave. Chicago bounds correctly elevated to pre-empt incoming volume. Partner Hub excess correctly flagged for redistribution.</p>
            </div>
         </div>
      )}
    </div>
  );
}
