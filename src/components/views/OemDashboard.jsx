import React from 'react';
import { AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Activity, PackageX, Banknote, Clock, Repeat, Zap, BarChart3 } from 'lucide-react';
import { oemMetrics } from '../../data/mockData';

export default function OemDashboard({ model }) {
  const currentMetrics = oemMetrics[model];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Mother Warehouse Hub</h2>
          <p className="text-gray-500 mt-1 text-sm">Aggregated operational metrics across the 5 US regional partners.</p>
        </div>
        <div className={`px-4 py-1.5 rounded border flex items-center gap-2 ${currentMetrics.statusColor} shadow-sm`}>
          {model === 'AS_IS' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          <span className="text-xs font-bold uppercase tracking-widest">Logic: {currentMetrics.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded bg-[#EBF0FA] text-[#1428A0] flex items-center justify-center"><Activity size={20}/></div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${model === 'TO_BE' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FEF2F2] text-[#DC2626]'}`}>{model === 'TO_BE' ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}{currentMetrics.ftfrTrend}</span>
          </div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Network FTFR</p><div className="text-4xl font-black text-[#1F2937]">{currentMetrics.ftfr}%</div></div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded flex items-center justify-center border ${model === 'AS_IS' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]' : 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'}`}><PackageX size={20}/></div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Day-of Stockouts</p>
            <div className="text-4xl font-black text-[#1F2937]">{currentMetrics.stockouts}</div>
            {model === 'AS_IS' && <p className="text-[10px] text-[#DC2626] mt-1 font-bold">Customer trust damaged.</p>}
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded bg-gray-50 text-gray-600 flex items-center justify-center border border-gray-200"><Banknote size={20}/></div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${model === 'TO_BE' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FFFBEB] text-[#D97706]'}`}>{model === 'TO_BE' ? <TrendingDown size={10}/> : <TrendingUp size={10}/>}{currentMetrics.deadStockTrend}</span>
          </div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dead Stock Value</p><div className="text-3xl font-black text-[#1F2937] mt-1">{currentMetrics.deadStock}</div></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded flex items-center justify-center ${model === 'AS_IS' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#ECFDF5] text-[#059669]'}`}><Clock size={18} /></div>
            <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Avg Wait Time</p><p className="text-xl font-bold text-[#1F2937]">{currentMetrics.avgWaitTime}</p></div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded flex items-center justify-center ${model === 'AS_IS' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#ECFDF5] text-[#059669]'}`}><Repeat size={18} /></div>
            <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Annual Reschedules</p><p className="text-xl font-bold text-[#1F2937]">{currentMetrics.reschedules}</p></div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2"><Zap className={model === 'AS_IS' ? 'text-[#D97706]' : 'text-[#1428A0]'} size={16}/> {model === 'AS_IS' ? 'Critical Network Alerts' : 'AI Action Center (Live)'}</h3>
          </div>
          <div className="p-2 space-y-1">
            {currentMetrics.alerts.map(a => (
              <div key={a.id} className={`p-2.5 rounded flex items-start gap-2 border ${a.type === 'danger' ? 'bg-[#FEF2F2] border-[#FCA5A5]' : a.type === 'warning' ? 'bg-[#FFFBEB] border-[#FDE68A]' : 'bg-[#EBF0FA] border-[#BFDBFE]'}`}>
                <div className="mt-0.5">{a.type === 'danger' ? <AlertTriangle size={14} className="text-[#DC2626]"/> : a.type === 'warning' ? <AlertTriangle size={14} className="text-[#D97706]"/> : <CheckCircle2 size={14} className="text-[#1428A0]"/>}</div>
                <div><p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${a.type === 'danger' ? 'text-[#991B1B]' : a.type === 'warning' ? 'text-[#92400E]' : 'text-[#1428A0]'}`}>{a.title}</p><p className="text-xs text-gray-700">{a.msg}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2"><BarChart3 className="text-[#1428A0]" size={16}/><h3 className="font-bold text-sm text-[#1F2937]">Partner FTFR Matrix</h3></div>
          <div className="flex-1 p-4 space-y-3">
            {currentMetrics.partnerFtfr.map(p => (
              <div key={p.id}>
                <div className="flex justify-between items-end mb-1"><span className="text-[10px] font-bold text-gray-700">{p.id}</span><span className={`text-[10px] font-black ${p.ftfr < 60 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>{p.ftfr}%</span></div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${p.ftfr < 60 ? 'bg-[#DC2626]' : 'bg-[#059669]'}`} style={{ width: `${p.ftfr}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2"><TrendingUp className="text-[#1428A0]" size={16}/> A54 Battery: Failure Wave Projection</h3>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Network</span>
          </div>
          <div className="relative h-32 w-full flex items-end justify-between border-b border-gray-200 pb-2 px-2 mt-4">
            {[...Array(12)].map((_, i) => {
              const isWave = i === 9;
              let hClass = 'h-6 bg-gray-100';
              if (isWave) hClass = model === 'TO_BE' ? 'h-24 bg-[#1428A0]' : 'h-24 bg-[#DC2626]';
              else if (i === 7 && model === 'TO_BE') hClass = 'h-16 bg-[#34D399] border border-[#059669] border-dashed opacity-60';
              return (
                <div key={i} className="flex flex-col items-center gap-1 w-full px-1">
                  <div className={`w-full max-w-[20px] rounded-t-sm transition-all duration-700 ${hClass}`}></div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase">M{i+1}</span>
                </div>
              )})}
            <div className="absolute top-[40%] left-0 w-full h-px bg-red-400/50 border-b border-dashed border-red-500 z-0"></div>
          </div>
          <div className="mt-4 flex items-center justify-center p-3 bg-gray-50 rounded border border-gray-100 text-center">
            {model === 'AS_IS' ? (
              <p className="text-gray-600 text-xs"><strong className="text-[#D97706]"><AlertTriangle className="inline pb-0.5" size={14}/> Blind to Future:</strong> Static thresholds ignore 14m MTBF, resulting in massive shortfall in M10.</p>
            ) : (
              <p className="text-gray-600 text-xs"><strong className="text-[#1428A0]"><CheckCircle2 className="inline pb-0.5" size={14}/> Proactive Mitigation:</strong> System maps fleet age, auto-triggering pre-order (M8) to absorb M10 spike.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
