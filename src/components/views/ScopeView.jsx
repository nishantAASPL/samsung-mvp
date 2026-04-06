import React from 'react';
import { Target, AlertTriangle, CheckCircle2, Activity, ArrowRight, XCircle, BrainCircuit, Factory, CalendarDays, Users, SmartphoneNfc } from 'lucide-react';
import { scopeDetails, partners } from '../../data/mockData';

export default function ScopeView({ model }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-xs font-bold uppercase tracking-widest mb-2">
            <Target size={14} /> Problem Definition
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">
            Ending the <span className={model === 'AS_IS' ? 'text-[#DC2626]' : 'text-[#1428A0]'}>"Blind Approval"</span> Cycle
          </h2>
          <p className="text-sm text-gray-600">
            {model === 'AS_IS' 
              ? "OEM systems currently approve repair reservations without accounting for actual partner inventory. This creates a broken loop causing missed SLAs." 
              : "The architecture resolves this disconnected loop by leveraging MTBF data to predict failure waves and allocating partner inventory before demand occurs."}
          </p>
        </div>
      </div>

      <div className={`p-6 rounded-lg border transition-all duration-500 shadow-sm relative overflow-hidden ${model === 'AS_IS' ? 'bg-white border-[#E5E7EB]' : 'bg-[#1428A0] border-[#1E3A8A] text-white'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 relative z-10 flex items-center gap-2 ${model === 'AS_IS' ? 'text-[#DC2626]' : 'text-blue-200'}`}>
          {model === 'AS_IS' ? <AlertTriangle size={16}/> : <CheckCircle2 size={16}/>}
          {model === 'AS_IS' ? 'Current Reality (As-Is)' : 'Platform Architecture (To-Be)'}
        </h3>

        <div className="flex items-center justify-between gap-4 z-10 relative">
          <div className={`flex flex-col items-center flex-1 p-5 rounded-lg border ${model === 'AS_IS' ? 'bg-gray-50 border-[#E5E7EB]' : 'bg-white/10 border-white/20'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${model === 'AS_IS' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'bg-blue-400 text-white'}`}><Activity size={20}/></div>
            <h4 className="font-bold text-sm mb-1 text-center">OEM Portal</h4>
            <p className={`text-[10px] text-center ${model === 'AS_IS' ? 'text-gray-500' : 'text-blue-100'}`}>Customer books repair.</p>
          </div>

          <ArrowRight size={24} className={model === 'AS_IS' ? 'text-gray-300' : 'text-blue-300'} />

          <div className={`flex flex-col items-center flex-1 p-5 rounded-lg border-2 transform transition-all duration-500 ${model === 'AS_IS' ? 'bg-[#FEF2F2] border-[#FCA5A5] border-dashed' : 'bg-[#059669] border-[#34D399] text-white shadow-sm'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${model === 'AS_IS' ? 'bg-red-100 text-[#DC2626]' : 'bg-green-100 text-[#059669]'}`}>
              {model === 'AS_IS' ? <XCircle size={20}/> : <BrainCircuit size={20}/>}
            </div>
            <h4 className="font-bold text-sm mb-1 text-center">{model === 'AS_IS' ? 'No Inventory Check' : 'Predictive MTBF'}</h4>
            <p className={`text-[10px] text-center font-medium ${model === 'AS_IS' ? 'text-[#DC2626]' : 'text-green-100'}`}>
              {model === 'AS_IS' ? 'Approves without partner stock data.' : 'Forecasts failure waves & auto-orders.'}
            </p>
          </div>

          <ArrowRight size={24} className={model === 'AS_IS' ? 'text-red-300' : 'text-blue-300'} />

          <div className={`flex flex-col items-center flex-1 p-5 rounded-lg border ${model === 'AS_IS' ? 'bg-gray-50 border-[#E5E7EB]' : 'bg-white/10 border-white/20'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${model === 'AS_IS' ? 'bg-gray-200 text-gray-500' : 'bg-blue-400 text-white'}`}><Factory size={20}/></div>
            <h4 className="font-bold text-sm mb-1 text-center">Service Center</h4>
            <p className={`text-[10px] text-center ${model === 'AS_IS' ? 'text-gray-500' : 'text-blue-100'}`}>
              {model === 'AS_IS' ? 'Has ZERO parts physically in store.' : 'Fully stocked ahead of demand.'}
            </p>
          </div>

          <ArrowRight size={24} className={model === 'AS_IS' ? 'text-gray-300' : 'text-blue-300'} />

          <div className={`flex flex-col items-center flex-1 p-5 rounded-lg border ${model === 'AS_IS' ? 'bg-[#FEF2F2] border-[#FCA5A5]' : 'bg-green-400/20 border-green-300/30'}`}>
            <div className={`text-3xl font-black mb-1 ${model === 'AS_IS' ? 'text-[#DC2626]' : 'text-[#34D399]'}`}>
              {model === 'AS_IS' ? '52%' : '77%'}
            </div>
            <h4 className="font-bold text-sm mb-1 text-center">First-Time Fix</h4>
            <p className={`text-[9px] text-center font-bold uppercase ${model === 'AS_IS' ? 'text-red-400' : 'text-green-200'}`}>
              {model === 'AS_IS' ? 'Rescheduled' : 'Success'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm space-y-4">
          <div className="flex items-center gap-2"><CalendarDays size={18} className="text-[#1428A0]"/><h4 className="font-bold text-sm">Timeline & Volume</h4></div>
          <div className="space-y-2">
            {scopeDetails.dataPoints.map((dp, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                <div><p className="text-xs font-bold text-gray-800">{dp.label}</p><p className="text-[10px] text-gray-500">{dp.desc}</p></div>
                <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{dp.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm space-y-4">
          <div className="flex items-center gap-2"><Users size={18} className="text-[#1428A0]"/><h4 className="font-bold text-sm">7 Regional Partners</h4></div>
          <div className="space-y-1">
            {partners.map(p => (
              <div key={p.id} className="flex justify-between items-center text-xs p-1.5">
                <span className="font-semibold text-gray-700">{p.name}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${p.tier === 'Platinum' ? 'bg-gray-800 text-white' : p.tier === 'Gold' ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>{p.tier}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm space-y-4">
          <div className="flex items-center gap-2"><SmartphoneNfc size={18} className="text-[#1428A0]"/><h4 className="font-bold text-sm">25 Device/Part Combos</h4></div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1 mb-1">
              {scopeDetails.models.slice(0,3).map(m => <span key={m} className="text-[9px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">{m}</span>)}
              <span className="text-[9px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">+2 more</span>
            </div>
            <div className="space-y-2 pt-2 border-t border-gray-100">
              {scopeDetails.parts.slice(0,2).map((pt, i) => (
                <div key={i} className="flex flex-col"><div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-800">{pt.type}</span><span className="text-[9px] font-semibold text-gray-500">{pt.trait}</span></div><span className="text-[9px] text-gray-400">{pt.examples}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
