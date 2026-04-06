import React from 'react';
import { Factory, MapPin, Smartphone, Info, TrendingUp, AlertTriangle, CheckCircle, Banknote, ShieldCheck } from 'lucide-react';
import { 
  partners, 
  inventoryData, 
  formatCurrency, 
  partnerPerformance 
} from '../../data/mockData';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';

export default function PartnerDiagnostics({ model, selectedPartner }) {
  const partnerInfo = partners.find(p => p.id === selectedPartner) || partners[0];
  const perfData = partnerPerformance[selectedPartner] || partnerPerformance['P-142'];
  const currentInventory = inventoryData[model]?.[selectedPartner] || [];

  const metrics = [
    { 
      label: 'Lost Sales Prevented', 
      value: model === 'TO_BE' ? formatCurrency(perfData.financials.savings) : '$0', 
      trend: model === 'TO_BE' ? '+84%' : '0%', 
      icon: Banknote, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
    { 
      label: 'Regional Readiness', 
      value: `${partnerInfo.score}`, 
      trend: model === 'TO_BE' ? '+12%' : '-4%', 
      icon: ShieldCheck, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'MTBF Exposure', 
      value: perfData.financials.mtbfExposure, 
      trend: 'Next 30d', 
      icon: AlertTriangle, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    },
    { 
      label: 'Active Backlog', 
      value: partnerInfo.backlog, 
      trend: model === 'TO_BE' ? '-42%' : '+8%', 
      icon: TrendingUp, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50' 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-12">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1428A0] to-[#2b44d1] flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Factory size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">{partnerInfo.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${partnerInfo.tier === 'Platinum' ? 'bg-slate-900 text-white border-slate-900' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                {partnerInfo.tier} Tier
              </span>
            </div>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <MapPin size={16} className="text-slate-400"/> {partnerInfo.region} Logistics Hub • Node ID: <span className="font-mono text-[#1428A0] bg-slate-50 px-1.5 py-0.5 rounded">{partnerInfo.id}</span>
            </p>
          </div>
        </div>
        <div className="hidden lg:flex gap-12 items-center">
            <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Operational SLA</p>
                <p className="text-4xl font-black text-[#1428A0] tabular-nums">{partnerInfo.score}</p>
            </div>
            <div className="h-12 w-px bg-slate-100"></div>
            <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Status</p>
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${model === 'TO_BE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${model === 'TO_BE' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    {model === 'TO_BE' ? 'Predictive Optimization Active' : 'Legacy Static Rules'}
                </div>
            </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${m.bg} ${m.color}`}>
                <m.icon size={24} />
              </div>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-lg ${m.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : m.trend.startsWith('-') ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                {m.trend}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{m.label}</p>
            <p className="text-3xl font-black text-slate-900">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLA Trend Graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-[#1428A0]"/> SLA Performance Analysis
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Historical fulfillment vs. Predictive AI projection</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={perfData.slaHistory}>
                <defs>
                  <linearGradient id="colorAsIs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorToBe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1428A0" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1428A0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend verticalAlign="top" height={36}/>
                <Area 
                  type="monotone" 
                  name="AS-IS (Static)" 
                  dataKey="asIs" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorAsIs)" 
                  hide={model === 'TO_BE'}
                />
                <Area 
                  type="monotone" 
                  name="TO-BE (Adaptive)" 
                  dataKey="toBe" 
                  stroke="#1428A0" 
                  strokeWidth={model === 'TO_BE' ? 3 : 1}
                  strokeDasharray={model === 'AS_IS' ? "5 5" : "0"}
                  fillOpacity={1} 
                  fill="url(#colorToBe)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Readiness Radar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#1428A0]"/> Category Readiness
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Availability Index by Component Type</p>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={perfData.readiness}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="category" tick={{fill: '#64748b', fontSize: 10}} />
                <Radar
                  name="Readiness Score"
                  dataKey="score"
                  stroke="#1428A0"
                  fill="#1428A0"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Part Level Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Smartphone size={18} className="text-[#1428A0]"/> Part-Level Readiness Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time health of critical SKUs in regional install base</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Healthy</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> At Risk</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Critical</div>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Component</th>
                        <th className="px-6 py-4 text-center">MTBF vs Age</th>
                        <th className="px-6 py-4 text-center">Value</th>
                        <th className="px-6 py-4 text-center">Current Stock</th>
                        <th className="px-6 py-4 text-center">Threshold</th>
                        <th className="px-6 py-4">Status & Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {currentInventory.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-10 rounded-full ${item.alertType === 'danger' ? 'bg-rose-500' : item.alertType === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                <div>
                                    <p className="font-bold text-slate-900">{item.part}</p>
                                    <p className="text-[11px] text-slate-500 font-medium">{item.model} • Fleet: {item.fleetSize}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex flex-col items-center">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs font-bold text-slate-800">{item.mtbf}</span>
                                    <span className="text-[9px] text-slate-400 tracking-tighter">MTBF</span>
                                </div>
                                <div className="w-8 h-[2px] bg-slate-100 my-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#1428A0]" style={{width: `${(parseInt(item.fleetAge)/parseInt(item.mtbf))*100}%`}}></div>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-xs font-bold ${model==='TO_BE' ? 'text-[#1428A0]' : 'text-slate-600'}`}>{item.fleetAge}</span>
                                    <span className="text-[9px] text-slate-400 tracking-tighter">AGE</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-center font-mono text-xs text-slate-600 font-bold">{formatCurrency(item.cost)}</td>
                        <td className="px-6 py-5 text-center">
                            <div className="inline-flex flex-col items-center">
                                <span className={`text-lg font-black ${item.stock < 5 ? 'text-rose-600' : 'text-slate-800'}`}>{item.stock}</span>
                                <div className="flex gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-2.5 h-1 rounded-full ${i < (item.stock/10) ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                            <span className={`px-2 py-1 rounded text-[10px] font-black border ${model==='TO_BE' ? 'bg-blue-50 border-blue-200 text-[#1428A0]' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                {item.threshold}
                            </span>
                        </td>
                        <td className="px-6 py-5">
                            <div className="space-y-1.5 focus-within:ring-0">
                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    item.alertType==='danger' ? 'bg-rose-50 border-rose-200 text-rose-700' : 
                                    item.alertType==='warning' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                                    'bg-emerald-50 border-emerald-200 text-emerald-700'
                                }`}>
                                    {item.alertType==='danger' ? <AlertTriangle size={10}/> : item.alertType==='warning' ? <AlertTriangle size={10}/> : <ShieldCheck size={10}/>}
                                    {item.alert}
                                </div>
                                <div className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                                    {item.action !== 'None' ? <div className="w-1.5 h-1.5 rounded-full bg-[#1428A0] animate-pulse"></div> : null}
                                    <span className={`text-[10px] font-bold ${item.action!=='None' ? 'text-[#1428A0]' : 'text-slate-400 italic'}`}>
                                        {item.action}
                                    </span>
                                </div>
                            </div>
                        </td>
                        </tr>
                        <tr className="bg-slate-50/30 border-b border-slate-100 italic">
                            <td colSpan="6" className="px-8 py-3">
                                <div className="flex items-start gap-2 max-w-4xl">
                                    <Info size={14} className={`mt-0.5 flex-shrink-0 ${model==='TO_BE' ? 'text-blue-500' : 'text-slate-400'}`}/>
                                    <p className="text-[11px] leading-relaxed text-slate-600">
                                        <span className="font-extrabold text-slate-700 not-italic uppercase tracking-wider mr-1">AI Insight:</span> {item.insight}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
