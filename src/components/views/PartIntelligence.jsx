import React from 'react';
import { ChevronDown, LineChart as LineChartIcon, Target, Zap, TrendingUp, AlertTriangle, CheckCircle2, Battery, Info, ZoomIn } from 'lucide-react';
import { partIntelligenceData } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea } from 'recharts';

export default function PartIntelligence({ model, selectedPart, onPartChange }) {
  const partsList = Object.keys(partIntelligenceData).map(key => ({
    id: key,
    name: partIntelligenceData[key].title
  }));
  
  const activePartId = partsList.some(p => p.id === selectedPart) ? selectedPart : 'PT10';
  const intelligence = partIntelligenceData[activePartId];

  const chartData = model === 'AS_IS' ? intelligence.asIsData : intelligence.data;
  const forecastKey = 'forecast';
  const forecastColor = model === 'AS_IS' ? '#9CA3AF' : '#1428A0';

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Part Intelligence Engine</h2>
          <p className="text-gray-500 mt-1 text-sm">Network-wide telemetry and predictive modeling for critical components.</p>
        </div>
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-[#E5E7EB] rounded px-4 py-2 pr-10 text-sm font-bold text-[#1428A0] shadow-sm cursor-pointer outline-none focus:border-blue-500"
            value={activePartId}
            onChange={(e) => onPartChange && onPartChange(e.target.value)}
          >
            {partsList.map(p => <option key={p.id} value={p.id}>{p.id} - {p.name}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 flex-shrink-0">
         <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
            <div>
               <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Global Inventory</p>
               <p className="text-2xl font-black text-gray-800">{intelligence.globalInventory}</p>
            </div>
            <p className="text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1"><Battery size={12}/> Network Stock</p>
         </div>
         <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
            <div>
               <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">MTBF Cycle Basin</p>
               <p className="text-2xl font-black text-[#1428A0]">{intelligence.globalBase}</p>
            </div>
            <p className="text-[10px] text-[#1428A0] font-bold mt-2 bg-[#EBF0FA] px-2 py-1 rounded inline-block">Next wave: {intelligence.nextWave}</p>
         </div>
         <div className={`col-span-2 p-5 rounded-lg border shadow-sm flex items-center justify-between ${model === 'AS_IS' ? 'bg-[#FEF2F2] border-[#FCA5A5]' : 'bg-[#ECFDF5] border-[#A7F3D0]'}`}>
            <div className="flex-1 pr-6">
               <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${model === 'AS_IS' ? 'text-red-400' : 'text-green-600'}`}>{model === 'AS_IS' ? 'Static Blindspot Warning' : 'Active MTBF Optimization'}</p>
               <h3 className={`text-base font-bold mb-1 leading-tight ${model === 'AS_IS' ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
                  {intelligence.risk}
               </h3>
               <p className={`text-[11px] font-medium leading-relaxed ${model === 'AS_IS' ? 'text-red-800' : 'text-green-800'}`}>
                  {model === 'AS_IS' ? intelligence.insightAsIs : intelligence.insightToBe}
               </p>
            </div>
            {model === 'AS_IS' ? <AlertTriangle size={48} className="text-red-400 opacity-30 flex-shrink-0"/> : <Target size={48} className="text-green-500 opacity-30 flex-shrink-0"/>}
         </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6 flex-1 flex flex-col min-h-[400px]">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1F2937] flex items-center gap-2"><ZoomIn className="text-[#1428A0]" size={18}/> Demand vs Forecast Model</h3>
            <div className="flex gap-4 text-xs font-bold text-gray-600">
               <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#1F2937]"></div> Historical Actuals</span>
               <span className="flex items-center gap-1.5"><div className={`w-3 h-3 rounded-full border-2 ${model === 'AS_IS' ? 'border-gray-400 bg-gray-100' : 'border-[#1428A0] bg-blue-50'}`}></div> Forecast</span>
            </div>
         </div>

         <div className="flex-1 w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 'bold' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 'bold' }} dx={-10} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                   itemStyle={{ fontWeight: 'bold' }}
                 />
                 
                 <ReferenceArea x1="May" x2="Oct" fill={model === 'AS_IS' ? '#F9FAFB' : '#F0F5FF'} fillOpacity={0.5} />
                 
                 {/* Render dynamic outliers if they exist in the dataset */}
                 {model === 'TO_BE' && chartData.map((d) => 
                     d.outlier ? <ReferenceDot key={d.month} x={d.month} y={d.historical} r={14} fill="transparent" stroke="#DC2626" strokeWidth={2} strokeDasharray="3 3"/> : null
                 )}
                 
                 <Line type="monotone" dataKey="historical" stroke="#1F2937" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Historical Demand" />
                 <Line type="monotone" dataKey="forecast" stroke={forecastColor} strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} name={model === 'AS_IS' ? 'Static Linear Forecast' : 'AI-Adjusted Forecast'} />
               </LineChart>
            </ResponsiveContainer>

            {/* Overlays */}
            <div className={`absolute top-4 left-1/3 max-w-[220px] p-3 rounded-lg border shadow-sm backdrop-blur-sm z-10 ${model === 'TO_BE' ? 'bg-white/90 border-[#1428A0]' : 'bg-white/90 border-gray-200'}`}>
               {model === 'TO_BE' ? (
                  <>
                     <p className="text-[10px] font-bold text-[#1428A0] flex items-center gap-1 uppercase tracking-widest mb-1"><Info size={12}/> Intelligent Smoothing</p>
                     <p className="text-[10px] text-gray-700 font-semibold leading-tight">AI correctly identifies historical anomalies and smooths forecast models directly to the MTBF constraint line.</p>
                  </>
               ) : (
                  <>
                     <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1 uppercase tracking-widest mb-1"><Info size={12}/> Trajectory Blindspot</p>
                     <p className="text-[10px] text-gray-500 font-semibold leading-tight">Standard systems interpret past spikes or flatlines as permanent constraints, completely ignoring the engineering lifespan curve.</p>
                  </>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
