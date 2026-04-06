import { Database, BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DemandGap({ model }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Demand vs. Supply Gap</h2>
          <p className="text-gray-500 mt-1 text-sm">Visualizing the forecast variance for Chicago Region (A54 Batteries).</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Demographics */}
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
            <Database className="text-[#1428A0]" size={16} /> Demographic Drivers
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Active Install Base', value: '1,120', unit: 'devices' },
              { label: 'Average Fleet Age',   value: '28',    unit: 'months', blue: true },
              { label: 'Battery MTBF',        value: '14',    unit: 'months' },
            ].map(({ label, value, unit, blue }) => (
              <div key={label}>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{label}</p>
                <p className={`text-2xl font-black ${blue ? 'text-[#1428A0]' : 'text-gray-800'}`}>
                  {value} <span className="text-xs font-medium text-gray-500">{unit}</span>
                </p>
              </div>
            ))}
            <div className="p-3 bg-gray-50 rounded border border-gray-200 pt-3 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-700">Conclusion:</p>
              <p className="text-[10px] text-gray-600 mt-1">Age (28) ÷ MTBF (14) = 2.0 — entering second major failure wave.</p>
            </div>
          </div>
        </div>

        {/* Gap Card */}
        <div className={`p-6 rounded-lg border shadow-sm transition-colors duration-500 ${model === 'AS_IS' ? 'bg-white border-[#E5E7EB]' : 'bg-[#1428A0] border-[#1E3A8A] text-white'}`}>
          <h3 className={`font-bold text-sm mb-6 flex items-center gap-2 ${model === 'AS_IS' ? 'text-gray-800' : 'text-white'}`}>
            <BarChart3 className={model === 'AS_IS' ? 'text-[#1428A0]' : 'text-blue-300'} size={16} /> Actionable Gap
          </h3>
          <div className="space-y-6">
            {[
              { label: 'MTBF Forecasted Demand', val: '42 Units', pct: 100 },
              { label: 'Current Local Stock',     val: '12 Units', pct: 28  },
            ].map(({ label, val, pct }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className={`text-xs font-bold ${model === 'AS_IS' ? 'text-gray-600' : 'text-blue-100'}`}>{label}</span>
                  <span className="font-black text-sm">{val}</span>
                </div>
                <div className="w-full h-3 bg-gray-200/20 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${model === 'AS_IS' ? 'bg-gray-400' : 'bg-white'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200/20">
              {model === 'AS_IS' ? (
                <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded">
                  <p className="font-bold text-[#DC2626] text-sm mb-1 flex items-center gap-1"><AlertTriangle size={14}/> Gap: 30 Units (Unaddressed)</p>
                  <p className="text-[10px] text-red-700 font-medium">Static threshold is 15. No order until stock drops below 15. Stockout guaranteed.</p>
                </div>
              ) : (
                <div className="p-3 bg-[#059669] border border-[#34D399] rounded text-white shadow-sm">
                  <p className="font-bold text-sm mb-1 flex items-center gap-1"><CheckCircle2 size={14}/> Gap Filled: AI Pre-Order</p>
                  <p className="text-[10px] font-medium mt-1 text-green-100">System pre-ordered 30 units to match the MTBF curve, avoiding the stockout entirely.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
