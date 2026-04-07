import React, { useState } from 'react';
import { ChevronDown, LineChart as LineChartIcon, Target, Zap, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Battery, Info, ZoomIn, ArrowRightLeft, ArrowRight, ShieldCheck, MapPin, Box, DollarSign, BarChart2 } from 'lucide-react';
import { partIntelligenceData } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea, Area, AreaChart, ComposedChart, Legend } from 'recharts';

export default function PartIntelligence({ model, selectedPart, onPartChange }) {
  const [forecastView, setForecastView] = useState('6M'); // Add state for Graph toggle

  const partsList = Object.keys(partIntelligenceData).map(key => ({
    id: key,
    name: partIntelligenceData[key].title
  }));
  
  const activePartId = partsList.some(p => p.id === selectedPart) ? selectedPart : 'PT10';
  const intelligence = partIntelligenceData[activePartId];

  const chartData = model === 'AS_IS' ? intelligence.asIsData : intelligence.data;
  const isToBe = model === 'TO_BE';

  // Dynamic Deterministic KPI Generation based on Part ID & Stats
  const ptCharValue = activePartId.charCodeAt(activePartId.length - 1) || 1; 
  const inventoryVol = intelligence.globalInventory || 1000;
  const unitprice = intelligence.cost || 10;
  
  const baseSl = Math.min(96, 75 + (ptCharValue % 15));
  const baseOtif = Math.min(98, baseSl + ((ptCharValue % 5) + 2));
  const baseStockouts = Math.max(5, 55 - (ptCharValue % 40));
  const baseCost = (inventoryVol * unitprice) / 1000000; // in Millions
  const baseExcess = Math.floor((inventoryVol * 0.18 * unitprice) / 1000); // in Thousands
  const baseFtfr = Math.min(95, 62 + (ptCharValue % 20));

  const kpis = {
      sl: +(isToBe ? baseSl + 6.2 : baseSl).toFixed(1),
      otif: +(isToBe ? baseOtif + 4.1 : baseOtif).toFixed(1),
      stockouts: isToBe ? Math.max(0, baseStockouts - Math.floor(baseStockouts * 0.6)) : baseStockouts,
      cost: +(isToBe ? baseCost * 0.82 : baseCost).toFixed(2),
      excess: isToBe ? Math.max(0, baseExcess - Math.floor(baseExcess * 0.4)) : baseExcess,
      ftfr: +(isToBe ? baseFtfr + 14.3 : baseFtfr).toFixed(1)
  };

  const partCost = intelligence.cost ? `$${intelligence.cost.toFixed(2)}` : "--";
  const upcomingDemand = chartData.filter(d => d.forecast).reduce((acc, curr) => acc + curr.forecast, 0);
  const forecastCount = chartData.filter(d => d.forecast).length;
  const avgMonthlyDemand = forecastCount > 0 ? Math.round(upcomingDemand / forecastCount) : 0;

  const KpiCard = ({ title, value, unit, delta, isGood }) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-3 flex flex-col justify-between shadow-sm min-w-[130px] flex-1 hover:border-indigo-200 transition-all`}>
        <h4 className="text-[9px] font-black tracking-widest text-gray-500 uppercase mb-1">{title}</h4>
        <div className="flex items-baseline gap-1">
            <span className={`text-xl font-black text-gray-900`}>{value}</span>
            <span className="text-xs font-bold text-gray-500">{unit}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
            <div className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${isGood ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {isGood ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {delta}
            </div>
        </div>
    </div>
  );

  // Patch data to connect lines (give the last historical point the forecast starting values)
  const patchGraphData = (data) => {
    let lastHistIdx = -1;
    for(let i=0; i<data.length; i++) {
      if(data[i].historical !== undefined && data[i].historical !== null) {
        lastHistIdx = i;
      }
    }
    return data.map((d, i) => {
      if(i === lastHistIdx) {
        return {
           ...d,
           installBaseForecast: d.installBaseForecast || d.historical,
           staticForecast: d.staticForecast || d.historical,
           forecast: d.forecast || d.historical
        }
      }
      return d;
    });
  };

  const displayedChartData = patchGraphData(forecastView === '6M' ? chartData.slice(0, 6) : chartData);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500 h-full flex flex-col pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4 flex-shrink-0 pt-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">Part Intelligence</h2>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isToBe ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
              {isToBe ? 'AI Predictive Mode' : 'Legacy Static Mode'}
            </div>
          </div>
          <p className="text-gray-500 mt-1 text-sm font-medium">Deep-dive telemetry, lifecycle trends, and predictive network allocation</p>
        </div>
        <div className="relative">
          <select 
            className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-5 py-2.5 pr-12 text-sm font-bold text-gray-900 shadow-sm cursor-pointer outline-none focus:border-indigo-600 transition-all hover:bg-gray-50 max-w-[300px]"
            value={activePartId}
            onChange={(e) => onPartChange && onPartChange(e.target.value)}
          >
            {partsList.map(p => <option key={p.id} value={p.id}>{p.id} - {p.name}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
      </div>

      {/* EXECUTIVE KPI STRIP */}
      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          <KpiCard title="Service Level" value={kpis.sl} unit="%" delta={isToBe ? '+5.7pp' : '-6.1pp'} isGood={isToBe} />
          <KpiCard title="Fill Rate (OTIF)" value={kpis.otif} unit="%" delta={isToBe ? '+6.4pp' : '-2.9pp'} isGood={isToBe} />
          <KpiCard title="Stockouts" value={kpis.stockouts} unit="" delta={isToBe ? '-29 evt' : '+12 evt'} isGood={isToBe} />
          <KpiCard title="Carrying Cost" value={`$${kpis.cost}`} unit="M" delta={isToBe ? '-$190K' : '+$82K'} isGood={isToBe} />
          <KpiCard title="Excess Inv" value={`$${kpis.excess}`} unit="K" delta={isToBe ? '-$178K' : '+$44K'} isGood={isToBe} />
          <KpiCard title="Network FTFR" value={kpis.ftfr} unit="%" delta={isToBe ? '+12.5pp' : '-21.3pp'} isGood={isToBe} />
      </div>

      {/* TOP METRICS KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 flex-shrink-0">
         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Box size={64}/>
            </div>
            <div>
               <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1">Global Inventory · <span className="text-emerald-600">{partCost} ea</span></p>
               <p className="text-3xl font-black text-gray-900">{intelligence.globalInventory}</p>
            </div>
            <div className="flex mt-3 items-center justify-between">
              <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><Battery size={14} className={isToBe ? "text-green-500" : "text-gray-400"}/> Active Network Stock</p>
              <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                <TrendingUp size={10}/> +2.4% MoM
              </div>
            </div>
         </div>
         
         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <LineChartIcon size={64}/>
            </div>
            <div>
               <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1">MTBF Lifecycle Basin</p>
               <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">{intelligence.globalBase}</p>
            </div>
            <div className="flex mt-3 items-center justify-between">
              <p className="text-[11px] text-indigo-700 font-bold bg-indigo-50 px-2 py-1.5 rounded-lg inline-flex items-center gap-1.5 w-max">
                <Zap size={12}/> Next wave: {intelligence.nextWave}
              </p>
              <p className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                IB Dem: ~{avgMonthlyDemand}/mo
              </p>
            </div>
         </div>
         
         <div className={`col-span-1 md:col-span-2 p-6 rounded-2xl border shadow-sm flex items-center justify-between relative overflow-hidden group transition-all ${isToBe ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:shadow-emerald-100' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-red-100'}`}>
            <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-opacity scale-150">
              {isToBe ? <ShieldCheck size={120} className="text-emerald-500"/> : <AlertTriangle size={120} className="text-red-500"/>}
            </div>
            <div className="flex-1 pr-6 z-10 relative">
               <div className="flex items-center gap-2 mb-2">
                 {isToBe ? <Target size={16} className="text-emerald-600"/> : <AlertTriangle size={16} className="text-red-500"/>}
                 <p className={`text-[11px] uppercase font-bold tracking-widest ${isToBe ? 'text-emerald-700' : 'text-red-600'}`}>
                   {isToBe ? 'Active Insight & MTBF Optimization' : 'Static Blindspot Warning'}
                 </p>
               </div>
               <h3 className={`text-xl font-bold mb-2 leading-tight ${isToBe ? 'text-emerald-900' : 'text-red-900'}`}>
                  {intelligence.risk}
               </h3>
               <p className={`text-xs font-semibold leading-relaxed ${isToBe ? 'text-emerald-800/80' : 'text-red-800/80'} max-w-xl`}>
                  {isToBe ? intelligence.insightToBe : intelligence.insightAsIs}
               </p>
            </div>
         </div>
      </div>

      {/* MIDDLE SECTION - GRAPH & PARTNER AVAILABILITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-h-[450px]">
        
        {/* CHART WIDGET */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col hover:border-indigo-200 transition-colors relative">
           <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  Single Part View — <span className="text-gray-900 font-black">Demand × Forecast</span>
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                 <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Timeline Base</span>
                 <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                    <button 
                       onClick={() => setForecastView('6M')}
                       className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${forecastView === '6M' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                       6M
                    </button>
                    <button 
                       onClick={() => setForecastView('12M')}
                       className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${forecastView === '12M' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                       12M
                    </button>
                 </div>
              </div>
           </div>

           <div className="flex-1 w-full relative -ml-4 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={displayedChartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                   <defs>
                     <linearGradient id="colorInstallBase" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                       <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                     </linearGradient>
                     <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                       <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                     </linearGradient>
                   </defs>
                   
                   {/* Clean Grid */}
                   <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#E5E7EB" opacity={0.6} />
                   
                   <XAxis 
                       dataKey="month" 
                       axisLine={{ stroke: '#F3F4F6', strokeWidth: 2 }} 
                       tickLine={false} 
                       tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} 
                       dy={15} 
                   />
                   <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 600 }} 
                       dx={-10} 
                       width={60}
                   />
                   
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                     itemStyle={{ fontWeight: 'bold' }}
                     cursor={{ stroke: '#E5E7EB', strokeWidth: 2, strokeDasharray: '4 4' }}
                   />
                   
                   <ReferenceArea x1="May" x2="Oct" fill="#F8FAFC" fillOpacity={1} />
                   
                   {/* Install Base Prediction (Green Dashed) */}
                   {isToBe && <Area type="monotone" connectNulls={true} dataKey="installBaseForecast" stroke="none" fillOpacity={1} fill="url(#colorInstallBase)" />}
                   {isToBe && <Line type="monotone" connectNulls={true} dataKey="installBaseForecast" stroke="#10B981" strokeWidth={3} strokeDasharray="6 6" dot={{ r: 5, strokeWidth: 2, stroke: '#fff', fill: '#10B981' }} activeDot={{ r: 7 }} name="IB-Driven Forecast" />}
                   
                   {/* Legacy Static Forecast (Purple Dotted) */}
                   <Line type="monotone" connectNulls={true} dataKey={isToBe ? "staticForecast" : "forecast"} stroke="#8B5CF6" strokeWidth={3} strokeDasharray="3 4" dot={{ r: 4, fill: '#fff', stroke: '#8B5CF6', strokeWidth: 2 }} activeDot={{ r: 6 }} name="Statistical Forecast" />
                   
                   {/* Historical (Blue Solid with custom outlier rendering) */}
                   <Area type="monotone" connectNulls={true} dataKey="historical" stroke="none" fill="url(#colorHist)" />
                   <Line 
                       type="monotone" 
                       connectNulls={true} 
                       dataKey="historical" 
                       stroke="#3B82F6" 
                       strokeWidth={3} 
                       dot={(props) => {
                           const { cx, cy, payload } = props;
                           if (!cx || !cy) return null;
                           if (payload.outlier) {
                               // Triangle pointed up for outliers
                               return <polygon key={`dot-${cx}`} points={`${cx},${cy-8} ${cx-7},${cy+4} ${cx+7},${cy+4}`} fill="#EF4444" />;
                           }
                           // Standard circle for historical points
                           return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={5} fill="#3B82F6" stroke="#fff" strokeWidth={2} />;
                       }}
                       activeDot={{ r: 7, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }} 
                       name="Historical Demand" 
                   />

                   {/* Custom Legend to match screenshot */}
                   <Legend 
                     verticalAlign="bottom" 
                     height={40} 
                     content={(props) => {
                       return (
                         <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold text-gray-500 mt-6">
                           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></div> Historical Demand</div>
                           {isToBe && <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div> IB-Driven Forecast</div>}
                           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></div> Statistical Forecast</div>
                           <div className="flex items-center gap-2">
                             <svg width="10" height="10" viewBox="0 0 14 14"><polygon points="7,1 1,12 13,12" fill="#EF4444" /></svg>
                             Outlier — Spike
                           </div>
                         </div>
                       );
                     }}
                   />
                 </ComposedChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* PARTNER AVAILABILITY */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">Network Availability</h3>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Real-time hub inventory</p>
            </div>
            <MapPin size={18} className="text-gray-400"/>
          </div>
          <div className="p-2 overflow-y-auto max-h-[380px] custom-scrollbar">
            {intelligence.partnerAvailability && intelligence.partnerAvailability.length > 0 ? (
              <div className="flex flex-col gap-1">
                {intelligence.partnerAvailability.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors shrink-0">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.status === 'Healthy' ? 'bg-green-100 text-green-700' : p.status === 'Warning' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                          {p.status}
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold">Min: {p.threshold}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-black ${p.stock < p.threshold ? 'text-red-600' : 'text-gray-800'}`}>{p.stock}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Units</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
                <Box size={32} className="mb-2 opacity-50"/>
                <p className="text-sm font-semibold">No distinct partner data mapped for this part.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION - REBALANCING SCENARIOS MAP / CARDS */}
      {isToBe && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <div className="flex justify-between items-end mb-5 pl-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                <ArrowRightLeft className="text-indigo-600" size={18}/> Active Rebalancing Scenarios
              </h3>
              <p className="text-xs font-medium text-gray-500">AI-generated lateral transfers to solve imminent SLA breaches using excess stock.</p>
            </div>
            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
              Execute All Recommended
            </button>
          </div>

          {intelligence.rebalancingScenarios && intelligence.rebalancingScenarios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pl-2">
              {intelligence.rebalancingScenarios.map((scenario) => {
                // Find names and statuses
                const source = intelligence.partnerAvailability?.find(p => p.partnerId === scenario.source);
                const dest = intelligence.partnerAvailability?.find(p => p.partnerId === scenario.dest);
                
                return (
                  <div key={scenario.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/30 hover:border-indigo-300 hover:shadow-sm transition-all group">
                    <div className="flex items-center justify-between mb-4 gap-2">
                      <div className="flex-1 bg-white border border-gray-200 shadow-sm p-2 rounded-lg text-center min-w-0">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Source</p>
                        <p className="text-[11px] font-bold text-gray-800 truncate" title={source?.name || scenario.source}>{source?.name || scenario.source}</p>
                      </div>
                      
                      <div className="flex flex-col items-center shrink-0 group-hover:scale-110 transition-transform">
                         <div className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-0.5 whitespace-nowrap">
                           {scenario.quantity} units
                         </div>
                         <ArrowRight className="text-indigo-400" size={14}/>
                      </div>

                      <div className="flex-1 bg-white border border-indigo-200 shadow-sm p-2 rounded-lg text-center min-w-0 ring-2 ring-transparent group-hover:ring-indigo-100 transition-all">
                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Dest</p>
                        <p className="text-[11px] font-bold text-gray-800 truncate" title={dest?.name || scenario.dest}>{dest?.name || scenario.dest}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Cost Impact</p>
                        <p className="text-sm font-black text-emerald-600">${scenario.costSavings.toLocaleString()} saved</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">SLA Rescue</p>
                        <p className="text-sm font-black text-indigo-600">{scenario.slaImpact} uptime</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-sm font-bold text-gray-400 p-6 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              No lateral transfers recommended for this part at current volume levels.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
