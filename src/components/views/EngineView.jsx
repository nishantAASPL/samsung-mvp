import { Cpu, Calculator, Smartphone, Wrench, BrainCircuit, Factory, Network, Users, TrendingUp, Box, Equal, X } from 'lucide-react';

export default function EngineView() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-xs font-bold uppercase tracking-widest mb-2">
            <Cpu size={14} /> The Intelligence Layer
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">How the AI Forecasts Demand</h2>
          <p className="text-sm text-gray-600">
            The platform abandons static reorder points. Instead, it calculates expected demand by mapping
            a region's active device fleet against engineering failure curves (Weibull-inspired MTBF model).
          </p>
        </div>
      </div>

      {/* Visual Equation */}
      <div className="bg-[#1428A0] p-8 rounded-lg shadow-sm text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -z-0" />
        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-blue-200 flex items-center gap-2 relative z-10">
          <Calculator size={16} /> The Visual Equation
        </h3>
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="bg-white/10 border border-white/20 p-5 rounded-lg flex-1 text-center">
            <Users className="mx-auto mb-2 text-blue-300" size={24} />
            <p className="text-[9px] uppercase font-bold text-blue-200 tracking-wider mb-1">Active Devices</p>
            <p className="text-3xl font-black">1,120</p>
            <p className="text-[10px] text-blue-200 mt-1">Galaxy A54s (Chicago)</p>
          </div>
          <X className="text-blue-300 w-8 h-8 flex-shrink-0" />
          <div className="bg-white/10 border border-white/20 p-5 rounded-lg flex-1 text-center">
            <TrendingUp className="mx-auto mb-2 text-blue-300" size={24} />
            <p className="text-[9px] uppercase font-bold text-blue-200 tracking-wider mb-1">Probability Curve</p>
            <div className="flex justify-center items-center gap-1">
              <span className="text-sm font-bold">Age: 28m</span>
              <span className="text-lg text-blue-300">/</span>
              <span className="text-sm font-bold">MTBF: 14m</span>
            </div>
            <p className="text-[10px] font-bold text-white mt-1 bg-blue-500/50 inline-block px-2 py-0.5 rounded">2nd Failure Cycle</p>
          </div>
          <Equal className="text-blue-300 w-8 h-8 flex-shrink-0" />
          <div className="bg-white p-5 rounded-lg flex-1 text-center shadow-sm border border-[#1428A0]">
            <Box className="mx-auto mb-2 text-[#1428A0]" size={24} />
            <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider mb-1">Stock Requirement</p>
            <p className="text-4xl font-black text-[#1428A0]">42</p>
            <p className="text-[10px] font-bold text-[#059669] mt-1 bg-[#ECFDF5] border border-[#A7F3D0] inline-block px-2 py-0.5 rounded">Auto-Ordered</p>
          </div>
        </div>
      </div>

      {/* MTBF Formula Callout */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 font-mono text-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Core Formula</p>
        <p className="text-gray-700">
          <span className="text-[#1428A0] font-bold">cycle_pos</span> = (fleet_age_months % mtbf_months) / mtbf_months
        </p>
        <p className="text-gray-700 mt-1">
          <span className="text-[#1428A0] font-bold">intensity</span> = 0.05 + 0.95 × (cycle_pos ^ 1.5) × (1 + cycles_done × 0.15)
        </p>
        <p className="text-gray-700 mt-1">
          <span className="text-[#1428A0] font-bold">monthly_demand</span> = (fleet_size / mtbf_months) × intensity
        </p>
        <p className="text-gray-700 mt-1">
          <span className="text-[#1428A0] font-bold">threshold</span> = max(2, round(monthly_demand × coverage_months × sla_multiplier))
        </p>
      </div>

      {/* 4-Step Pipeline */}
      <div>
        <h3 className="text-lg font-bold text-[#1F2937] flex items-center gap-2 mb-4">
          <Network className="text-[#1428A0]" size={20} /> The Four-Step Analytics Pipeline
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Smartphone,  n: 1, title: '1. Device Telemetry',   body: 'Isolates the active install base in a service center territory (e.g., 1,120 devices).', color: 'bg-[#EBF0FA] text-[#1428A0]' },
            { icon: Wrench,      n: 2, title: '2. Component Specs',    body: 'Retrieves the engineering failure rate (MTBF) for the specific component being analyzed.', color: 'bg-[#EBF0FA] text-[#1428A0]' },
            { icon: BrainCircuit,n: 3, title: '3. Weibull Calculation',body: 'Cross-references average device age against MTBF to locate exactly where the fleet sits on the failure curve.', color: 'bg-[#EBF0FA] text-[#1428A0]' },
            { icon: Factory,     n: 4, title: '4. Pre-Emptive Action', body: 'Replaces static threshold with a dynamic quantity and triggers POs 30 days before the failure wave hits.', color: 'bg-[#1428A0] text-white', highlight: true },
          ].map(({ icon: Icon, title, body, color, highlight }) => (
            <div key={title} className={`p-5 rounded-lg border flex flex-col items-center text-center shadow-sm ${highlight ? 'border-[#1428A0] bg-[#EBF0FA]' : 'border-[#E5E7EB] bg-white'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}><Icon size={20} /></div>
              <h4 className={`font-bold text-sm mb-1 ${highlight ? 'text-[#1428A0]' : ''}`}>{title}</h4>
              <p className={`text-xs ${highlight ? 'text-[#1E3A8A]' : 'text-gray-500'}`}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
