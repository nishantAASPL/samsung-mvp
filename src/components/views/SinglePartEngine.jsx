import React from 'react';
import { Target, TrendingUp, AlertTriangle, Battery, ZoomIn, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot, ReferenceArea } from 'recharts';

export default function SinglePartEngine({ model }) {
  // Generate scale consistent figures to demonstrate the line chart dynamics
  const data = [
    { month: 'Jan', historical: 40, forecast: null },
    { month: 'Feb', historical: 45, forecast: null },
    { month: 'Mar', historical: 120, forecast: null, outlier: true }, // Outlier correction
    { month: 'Apr', historical: 55, forecast: null },
    { month: 'May', historical: 60, forecast: 60 },
    { month: 'Jun', historical: null, forecast: 65 },
    { month: 'Jul', historical: null, forecast: 40 }, // drop due to MTBF curve dropping
    { month: 'Aug', historical: null, forecast: 30 },
    { month: 'Sep', historical: null, forecast: 25 },
    { month: 'Oct', historical: null, forecast: 22 },
  ];

  const asIsData = [
    { month: 'Jan', historical: 40, asIsForecast: null },
    { month: 'Feb', historical: 45, asIsForecast: null },
    { month: 'Mar', historical: 120, asIsForecast: null }, 
    { month: 'Apr', historical: 55, asIsForecast: null },
    { month: 'May', historical: 60, asIsForecast: 60 },
    { month: 'Jun', historical: null, asIsForecast: 90 }, // In AS_IS, the outlier heavily skewed the moving average forecast upwards
    { month: 'Jul', historical: null, asIsForecast: 85 }, 
    { month: 'Aug', historical: null, asIsForecast: 85 },
    { month: 'Sep', historical: null, asIsForecast: 85 },
    { month: 'Oct', historical: null, asIsForecast: 85 },
  ];

  const chartData = model === 'AS_IS' ? asIsData : data;
  const forecastKey = model === 'AS_IS' ? 'asIsForecast' : 'forecast';
  const forecastColor = model === 'AS_IS' ? '#9CA3AF' : '#1428A0';

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest mb-2">
            <ZoomIn size={12} /> Drill-Down Engine
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Single Part Dashboard</h2>
          <p className="text-gray-500 mt-1 text-sm">Target Isolation: <strong className="text-gray-700">SM-G991B-BAT (Battery)</strong></p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-500">
           <span className="flex items-center gap-1"><Battery size={16} className="text-[#1428A0]"/> Critical Component</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 flex-shrink-0">
         <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Global Inventory</p>
            <p className="text-2xl font-black text-gray-800">14,200</p>
         </div>
         <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">MTBF Cycle</p>
            <p className="text-2xl font-black text-[#1428A0]">18 Mo</p>
            <p className="text-[10px] text-gray-500 font-semibold mt-1">Next wave: Q3</p>
         </div>
         <div className={`col-span-2 p-5 rounded-lg border shadow-sm flex items-center justify-between ${model === 'AS_IS' ? 'bg-[#FEF2F2] border-[#FCA5A5]' : 'bg-[#ECFDF5] border-[#A7F3D0]'}`}>
            <div>
               <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${model === 'AS_IS' ? 'text-red-400' : 'text-green-600'}`}>{model === 'AS_IS' ? 'Risk Alert' : 'System Healthy'}</p>
               <h3 className={`text-lg font-bold ${model === 'AS_IS' ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
                  {model === 'AS_IS' ? 'Severe Overstocking Projected' : 'Outlier Smoothed & Balanced'}
               </h3>
               <p className={`text-xs mt-1 font-medium ${model === 'AS_IS' ? 'text-red-800' : 'text-green-800'}`}>
                  {model === 'AS_IS' ? 'Legacy moving averages interpret the March anomalous spike as permanent growth, risking massive dead stock.' : 'AI correctly identifies March anomaly as a one-off fleet-wide replacement initiative and reverts to MTBF curve.'}
               </p>
            </div>
            {model === 'AS_IS' ? <AlertTriangle size={48} className="text-red-400 opacity-50"/> : <Target size={48} className="text-green-500 opacity-50"/>}
         </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6 flex-1 flex flex-col min-h-[400px]">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1F2937] flex items-center gap-2"><TrendingUp className="text-[#1428A0]" size={18}/> Demand vs Forecast Projections</h3>
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
                 
                 {/* Forecast Area Background indicator */}
                 <ReferenceArea x1="May" x2="Oct" fill={model === 'AS_IS' ? '#F9FAFB' : '#F0F5FF'} fillOpacity={0.5} />
                 
                 {/* Outlier Marker */}
                 {model === 'TO_BE' && <ReferenceDot x="Mar" y={120} r={14} fill="transparent" stroke="#DC2626" strokeWidth={2} strokeDasharray="3 3"/>}
                 
                 <Line type="monotone" dataKey="historical" stroke="#1F2937" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Historical Demand" />
                 <Line type="monotone" dataKey={forecastKey} stroke={forecastColor} strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} name={model === 'AS_IS' ? 'Static Linear Forecast' : 'AI-Adjusted Forecast'} />
               </LineChart>
            </ResponsiveContainer>

            {/* Overlays */}
            <div className={`absolute top-4 left-1/3 max-w-[200px] p-3 rounded-lg border shadow-sm backdrop-blur-sm z-10 ${model === 'TO_BE' ? 'bg-white/90 border-[#DC2626]' : 'bg-white/90 border-gray-200'}`}>
               {model === 'TO_BE' ? (
                  <>
                     <p className="text-[10px] font-bold text-[#DC2626] flex items-center gap-1 uppercase tracking-widest mb-1"><Info size={12}/> Outlier Detected</p>
                     <p className="text-[10px] text-gray-700 font-semibold leading-tight">One-time corporate battery replacement drive. AI removes this from baseline velocity constraints.</p>
                  </>
               ) : (
                  <>
                     <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1 uppercase tracking-widest mb-1"><Info size={12}/> Historical Spike</p>
                     <p className="text-[10px] text-gray-500 font-semibold leading-tight">Standard systems interpret as permanent surge in localized component failures.</p>
                  </>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
