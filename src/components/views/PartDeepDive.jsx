import React from 'react';
import { AlertTriangle, TrendingUp, Info } from 'lucide-react';
import { partners, inventoryData } from '../../data/mockData';

export default function PartDeepDive({ model, selectedPartner }) {
  const currentInventory = inventoryData[model]?.[selectedPartner] || [];
  const partnerInfo = partners.find(p => p.id === selectedPartner) || partners[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Component Diagnostics</h2>
          <p className="text-gray-500 mt-1 text-sm">Deep-dive trajectory for selected component at {partnerInfo?.name}.</p>
        </div>
        <div className="px-3 py-1.5 bg-gray-900 text-white rounded text-[10px] font-bold tracking-widest uppercase">
          SKU: {selectedPartner === 'S-142' ? 'S24U-OLED-BLK' : 'GEN-PART-XYZ'}
        </div>
      </div>

      {!currentInventory || currentInventory.length === 0 ? (
         <div className="bg-white p-8 rounded-lg border border-[#E5E7EB] shadow-sm text-center text-gray-500 text-sm">
            No critical flagged components for this location in current view. Select Store #142 (Chicago) or Store #045 (New York) for demonstration.
         </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6">
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="col-span-2">
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Target Component</p>
              <p className="text-lg font-black text-gray-800 leading-tight">{currentInventory[0].part}</p>
              <p className="text-xs font-semibold text-gray-500">{currentInventory[0].model}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Current Stock</p>
              <p className="text-2xl font-black text-gray-800 flex items-end gap-1">{currentInventory[0].stock} <span className={`text-[10px] font-bold mb-1.5 ${currentInventory[0].stock < 5 ? 'text-[#DC2626]' : 'text-gray-400'}`}>({currentInventory[0].stock < 5 ? 'Low' : 'Actual'})</span></p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Safety Threshold</p>
              <p className="text-2xl font-black text-[#1428A0]">{currentInventory[0].threshold}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Incoming PO</p>
              <p className="text-2xl font-black text-gray-800">{model === 'AS_IS' ? '0' : '31'}</p>
            </div>
          </div>

          <div className="relative h-48 w-full flex items-end justify-between border-b border-gray-200 pb-2 px-4 mt-6">
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-gray-400 font-bold -ml-4 pb-2">
              <span>40</span><span>30</span><span>20</span><span>10</span>
            </div>

            <div className={`absolute left-0 w-full h-px border-b border-dashed z-0 transition-all duration-500 ${model === 'AS_IS' ? 'bottom-[37.5%] border-gray-400' : 'bottom-[87.5%] border-[#1428A0]'}`}>
              <span className={`absolute -top-4 right-0 text-[9px] font-bold ${model === 'AS_IS' ? 'text-gray-500' : 'text-[#1428A0]'}`}>
                {model === 'AS_IS' ? 'Static (15)' : 'Dynamic (35)'}
              </span>
            </div>

            {[12, 14, 15, 18, 22, 28, ...(model === 'AS_IS' ? [15, 15, 15, 15] : [35, 42, 28, 20])].map((val, i) => {
              const isForecast = i >= 6;
              const heightPercent = (val / 40) * 100;
              return (
                <div key={i} className="flex flex-col items-center gap-1 relative w-full px-1.5 z-10 group">
                  <div 
                    className={`w-full max-w-[30px] rounded-t-sm transition-all duration-700 flex items-end justify-center pb-1 ${
                      isForecast ? (model === 'AS_IS' ? 'bg-gray-200' : 'bg-blue-100 border-2 border-[#1428A0] border-b-0') : 'bg-gray-800'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <span className={`text-[8px] font-bold ${isForecast && model === 'TO_BE' ? 'text-[#1428A0]' : 'text-white/50 group-hover:text-white/100'}`}>{val}</span>
                  </div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase">{isForecast ? `F${i-5}` : `M${i+1}`}</span>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><div className="w-2.5 h-2.5 bg-gray-800 rounded-sm"></div> Historical</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><div className={`w-2.5 h-2.5 rounded-sm ${model === 'AS_IS' ? 'bg-gray-200' : 'bg-blue-100 border border-[#1428A0]'}`}></div> Forecasted</div>
            </div>
            {model === 'AS_IS' ? (
              <div className="text-[10px] font-bold text-[#DC2626] flex items-center gap-1.5 bg-[#FEF2F2] px-3 py-1.5 rounded"><AlertTriangle size={14}/> Forecast flatlined. Crisis incoming.</div>
            ) : (
              <div className="text-[10px] font-bold text-[#1428A0] flex items-center gap-1.5 bg-[#EBF0FA] px-3 py-1.5 rounded"><TrendingUp size={14}/> {currentInventory[0].insight}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
