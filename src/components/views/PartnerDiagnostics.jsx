import React from 'react';
import { Factory, MapPin, Smartphone, Info } from 'lucide-react';
import { partners, inventoryData, formatCurrency } from '../../data/mockData';

export default function PartnerDiagnostics({ model, selectedPartner }) {
  const partnerInfo = partners.find(p => p.id === selectedPartner) || partners[0];
  const currentInventory = inventoryData[model]?.[selectedPartner] || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-[#EBF0FA] flex items-center justify-center text-[#1428A0]"><Factory size={24} /></div>
          <div>
            <div className="flex items-center gap-2 mb-1"><h2 className="text-xl font-bold text-[#1F2937]">{partnerInfo.name}</h2><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${partnerInfo.tier === 'Platinum' ? 'bg-gray-800 text-white border-gray-900' : 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]'}`}>{partnerInfo.tier} Tier</span></div>
            <p className="text-gray-500 text-xs font-medium"><MapPin size={12} className="inline pb-0.5"/> {partnerInfo.region} Region • ID: {partnerInfo.id}</p>
          </div>
        </div>
        <div className="flex gap-6 border-l border-gray-200 pl-6">
          <div><p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Backlog</p><p className="text-2xl font-black text-[#1F2937]">{partnerInfo.backlog}</p></div>
          <div><p className="text-[10px] font-bold uppercase text-gray-400 mb-1">SLA Score</p><p className="text-2xl font-black text-[#1428A0]">{partnerInfo.score}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#E5E7EB] bg-gray-50"><h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2"><Smartphone size={16} className="text-[#1428A0]"/> Part-Level Readiness</h3></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-[10px] uppercase tracking-wider">
            <tr><th className="p-3">Component</th><th className="p-3 text-center">MTBF vs Age</th><th className="p-3 text-center">Cost</th><th className="p-3 text-center border-l border-gray-200">Stock</th><th className="p-3 text-center">Threshold</th><th className="p-3">Status & Action</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentInventory.map((item, idx) => (
              <React.Fragment key={idx}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-3"><p className="font-bold text-sm text-gray-800">{item.part}</p><p className="text-[10px] text-gray-500">{item.model} (Fleet: {item.fleetSize})</p></td>
                  <td className="p-3">
                    <div className="flex flex-col items-center gap-0.5"><span className="text-xs font-mono font-bold">{item.mtbf}</span><span className="text-[8px] text-gray-400">MTBF</span><div className="w-4 h-px bg-gray-300"></div><span className={`text-xs font-mono font-bold ${model==='TO_BE'?'text-[#1428A0]':''}`}>{item.fleetAge}</span><span className="text-[8px] text-gray-400">AGE</span></div>
                  </td>
                  <td className="p-3 text-center font-mono text-xs">{formatCurrency(item.cost)}</td>
                  <td className="p-3 text-center border-l border-gray-100"><span className={`inline-block px-2 py-1 rounded text-xs font-bold ${item.stock < 5 ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-gray-100 text-gray-700'}`}>{item.stock}</span></td>
                  <td className="p-3 text-center"><span className={`px-2 py-1 rounded border text-xs font-bold ${model==='TO_BE'?'bg-[#EBF0FA] border-blue-200 text-[#1428A0]':'bg-gray-50 border-gray-200'}`}>{item.threshold.split(' ')[0]}</span></td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold flex w-max gap-1 items-center ${item.alertType==='danger'?'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626]':item.alertType==='warning'?'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]':'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'}`}>{item.alert}</span>
                      <span className={`text-[10px] font-bold flex items-center gap-1 ${item.action!=='None'?'text-[#1428A0]':'text-gray-400'}`}>{item.action}</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50"><td colSpan="6" className="p-2.5 px-4"><div className="flex gap-2"><Info size={14} className={model==='TO_BE'?'text-[#1428A0]':'text-gray-400'}/><p className="text-xs text-gray-600"><span className="font-bold">Insight:</span> {item.insight}</p></div></td></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
