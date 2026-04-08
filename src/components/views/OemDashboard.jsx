import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  PackageX, 
  Banknote, 
  Clock, 
  Repeat, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Target, 
  Cpu, 
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart, 
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { oemMetrics } from '../../data/mockData';

export default function OemDashboard({ model }) {
  const currentMetrics = oemMetrics[model];
  const isToBe = model === 'TO_BE';

  // Projection Data for the Failure Wave Chart
  const projectionData = [
    { month: 'M1', val: 12, preOrder: 0 },
    { month: 'M2', val: 15, preOrder: 0 },
    { month: 'M3', val: 18, preOrder: 0 },
    { month: 'M4', val: 14, preOrder: 0 },
    { month: 'M5', val: 16, preOrder: 0 },
    { month: 'M6', val: 20, preOrder: 0 },
    { month: 'M7', val: 25, preOrder: 0 },
    { month: 'M8', val: 45, preOrder: isToBe ? 85 : 0 },
    { month: 'M9', val: 95, preOrder: isToBe ? 110 : 0 },
    { month: 'M10', val: 140, preOrder: isToBe ? 130 : 0 },
    { month: 'M11', val: 80, preOrder: 50 },
    { month: 'M12', val: 40, preOrder: 30 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-5 pb-12">

      {/* HEADER SECTION */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-600 rounded text-white">
               <Globe size={18}/>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">OEM Control Hub</h2>
          </div>
          <p className="text-xs font-medium text-gray-600 max-w-2xl">
            Global monitoring hub for the Samsung Supply Chain. Aggregating telemetry across 5 regional partners and 250+ storage nodes.
          </p>
        </div>

        <div className={`flex items-center gap-2 px-3 py-2 rounded border text-sm font-bold uppercase tracking-wide ${isToBe ? 'bg-white border-gray-300 text-indigo-700' : 'bg-white border-gray-300 text-gray-700'}`}>
          {isToBe ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-semibold text-gray-500 tracking-widest">Logic</span>
            <span className="text-xs font-black">{isToBe ? 'MTBF Engine' : 'Legacy'}</span>
          </div>
        </div>
      </div>

      {/* EXECUTIVE TELEMETRY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Network FTFR', val: `${currentMetrics.ftfr}%`, trend: currentMetrics.ftfrTrend, icon: Activity, up: isToBe },
           { label: 'Day-of Stockouts', val: currentMetrics.stockouts, trend: model === 'AS_IS' ? 'High Risk' : '-78% Drop', icon: PackageX, danger: model === 'AS_IS' },
           { label: 'Dead Stock Value', val: currentMetrics.deadStock, trend: currentMetrics.deadStockTrend, icon: Banknote, up: !isToBe },
           { label: 'Wait-Time Avg', val: currentMetrics.avgWaitTime, trend: '-2.4 Days', icon: Clock, up: false }
         ].map((m, i) => (
           <div key={i} className="bg-white p-4 rounded border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                 <div className="p-2 rounded bg-gray-100 text-gray-600">
                    <m.icon size={16}/>
                 </div>
                 <div className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded ${m.danger ? 'bg-gray-100 text-red-700' : m.up ? 'bg-gray-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                   {m.up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>} {m.trend}
                 </div>
              </div>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">{m.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{m.val}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ACTION TERMINAL */}
        <div className="lg:col-span-1 bg-white rounded border border-gray-200 flex flex-col overflow-hidden h-full">
           <div className="p-3 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                 <h3 className="text-[10px] font-bold text-white uppercase tracking-wide">
                   Live Alerts
                 </h3>
              </div>
              <span className="text-[8px] font-bold text-gray-500 font-mono">NW-882</span>
           </div>

           <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[500px]">
              {currentMetrics.alerts.map(a => (
                <div key={a.id} className={`p-3 rounded border flex flex-col gap-2 cursor-pointer ${
                  a.type === 'danger' ? 'bg-white border-red-300' :
                  a.type === 'warning' ? 'bg-white border-gray-300' :
                  'bg-white border-gray-300'
                }`}>
                   <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded ${a.type === 'danger' ? 'bg-red-100 text-red-700' : a.type === 'warning' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700'}`}>
                         {a.type === 'danger' ? <AlertTriangle size={14}/> : a.type === 'warning' ? <AlertTriangle size={14}/> : <ShieldCheck size={14}/>}
                      </div>
                      <div className="flex-1">
                         <p className={`text-[9px] font-bold uppercase tracking-wide mb-0.5 ${a.type === 'danger' ? 'text-red-700' : 'text-gray-700'}`}>{a.title}</p>
                         <p className="text-[10px] text-gray-700 font-medium leading-tight">{a.msg}</p>
                      </div>
                   </div>

                   {isToBe && (
                      <button className="mt-2 py-1.5 px-2 rounded text-[9px] font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 self-end bg-indigo-600 text-white hover:bg-indigo-700">
                         <Zap size={11}/> Resolve
                      </button>
                   ) || (
                      <div className="mt-1 flex items-center gap-1 text-[8px] font-medium text-gray-500">
                         <Info size={10}/> Pending review
                      </div>
                   )}
                </div>
              ))}
           </div>
           
           <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400">Total Active Nodes: 247</span>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:underline">
                 View All Alerts <ArrowUpRight size={12}/>
              </button>
           </div>
        </div>

        {/* PREDICTIVE WAVE PROJECTION */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-full hover:border-indigo-200 transition-colors group">
           <div className="flex justify-between items-start mb-10 pb-4 border-b border-gray-100">
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Network Pulse —</h3>
                    <span className="text-gray-900 font-black text-lg tracking-tight">Failure Wave Projection</span>
                 </div>
                 <p className="text-xs font-semibold text-gray-500">Mapping the A54 Display Unit lifecycle lifecycle across 11M devices</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-md bg-red-500"></div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Failure Volume</span>
                 </div>
                 {isToBe && (
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-md bg-indigo-600"></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pre-Order Logic</span>
                   </div>
                 )}
              </div>
           </div>

           <div className="flex-1 w-full relative min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={isToBe ? "#6366F1" : "#EF4444"} stopOpacity={0.2}/>
                       <stop offset="95%" stopColor={isToBe ? "#6366F1" : "#EF4444"} stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#D1D5DB', fontWeight: 'bold'}} dx={-10} />
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                     cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                   />
                   
                   {/* Danger Zone Reference */}
                   <ReferenceLine y={100} stroke="#FCA5A5" strokeDasharray="6 6" label={{ position: 'right', value: 'SLA BREACH ZONE', fill: '#EF4444', fontSize: 9, fontWeight: 900 }} />
                   <ReferenceArea x1="M8" x2="M11" fill="#FEF2F2" fillOpacity={isToBe ? 0 : 1} />

                   <Area 
                     type="monotone" 
                     dataKey="val" 
                     stroke={isToBe ? "#6366F1" : "#EF4444"} 
                     strokeWidth={4} 
                     fillOpacity={1} 
                     fill="url(#colorWave)" 
                     dot={{ r: isToBe ? 2 : 4, fill: '#fff', strokeWidth: 2, stroke: model === 'AS_IS' ? '#EF4444' : '#6366F1' }}
                     name="Projected Failures"
                   />

                   {isToBe && (
                     <Line 
                       type="monotone" 
                       dataKey="preOrder" 
                       stroke="#10B981" 
                       strokeWidth={4} 
                       strokeDasharray="6 6" 
                       dot={{ r: 5, fill: '#fff', strokeWidth: 2, stroke: '#10B981' }}
                       name="Network Pre-Order"
                     />
                   )}
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           
           <div className={`mt-6 p-5 rounded-2xl border transition-all flex items-center gap-5 ${
              isToBe ? 'bg-indigo-50/50 border-indigo-100 shadow-sm' : 'bg-red-50/50 border-red-100'
           }`}>
              <div className={`p-3 rounded-full flex-shrink-0 ${isToBe ? 'bg-indigo-600 text-white' : 'bg-red-600 text-white'}`}>
                 {isToBe ? <ShieldCheck size={24}/> : <AlertTriangle size={24}/>}
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                   {isToBe ? 'Smart Inventory Optimization' : 'Blind Inventory Thresholds'}
                   <span className="px-1.5 py-0.5 rounded bg-white border border-indigo-100 text-[9px] font-black text-indigo-600">STATUS: ACTIVE</span>
                </h4>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                   {isToBe ? (
                      "The MTBF Engine has detected an upcoming failure wave in M10. Supply chain has automatically pre-ordered 85k units in M8/M9 to ensure continuous service availability and avoid the predicted $2.4M profit loss."
                   ) : (
                      "Static stocking levels (min/max) are blind to the upcoming failure wave. Failures will spike across regional hubs in M10, causing a 12% drop in service levels and immediate product stockouts."
                   )}
                </p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
         {/* Hub Performance Grid */}
         {[
           { id: 'NE-HUB', name: 'Northeast Region', ftfr: 94, status: 'Healthy' },
           { id: 'SE-HUB', name: 'Southeast Region', ftfr: model === 'AS_IS' ? 72 : 91, status: model === 'AS_IS' ? 'Warning' : 'Healthy' },
           { id: 'MW-HUB', name: 'Midwest Region', ftfr: 96, status: 'Healthy' },
           { id: 'WC-HUB', name: 'West Coast', ftfr: model === 'AS_IS' ? 58 : 88, status: model === 'AS_IS' ? 'Critical' : 'Healthy' },
         ].map((p) => (
           <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col group hover:border-indigo-200 transition-all">
              <div className="flex justify-between items-start mb-3">
                 <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{p.id}</p>
                    <h4 className="text-xs font-bold text-gray-800">{p.name}</h4>
                 </div>
                 <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight border ${
                    p.status === 'Healthy' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                    p.status === 'Warning' ? 'bg-orange-50 border-orange-100 text-orange-600' :
                    'bg-red-50 border-red-100 text-red-600'
                 }`}>
                    {p.status}
                 </div>
              </div>
              <div className="flex items-end justify-between">
                 <div className="text-xl font-black text-gray-900">{p.ftfr}% <span className="text-[10px] text-gray-400">FTFR</span></div>
                 <div className="w-16 h-8 text-indigo-200 group-hover:text-indigo-600 transition-colors opacity-30 group-hover:opacity-100">
                    <BarChart3 size={24} className="ml-auto" />
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
