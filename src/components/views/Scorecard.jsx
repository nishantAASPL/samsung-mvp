import { ArrowRight, Target } from 'lucide-react';
import { oemMetrics } from '../../data/metrics';

export default function Scorecard() {
  const as = oemMetrics.AS_IS;
  const to = oemMetrics.TO_BE;

  const rows = [
    { label: 'First-Time Fix Rate',   from: `${as.ftfr}%`,     to: `${to.ftfr}%`,   badge: '+26% Lift Expected',        fromClass: 'text-4xl' },
    { label: 'Annual Reschedules',    from: '1,240',             to: '0',             badge: 'Gate Intercepted',          fromClass: 'text-4xl' },
    { label: 'Dead Stock Capital',    from: '$245K',             to: '$42K',          badge: 'Rebalanced by AI',          fromClass: 'text-3xl' },
    { label: 'Scarcity Conflict Res.',from: 'Phone Calls',       to: 'Math & SLA',    badge: 'Automated Routing',        fromClass: 'text-2xl' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 flex flex-col justify-center pb-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest">
          <Target size={12} /> ROI Summary
        </div>
        <h2 className="text-4xl font-bold text-[#1F2937] tracking-tight">The Impact Scorecard</h2>
        <p className="text-sm text-gray-500">Comparing current US operational reality against projected MTBF-engine performance.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {rows.map(({ label, from, to: toVal, badge, fromClass }) => (
          <div key={label} className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
              <div className={`${fromClass} font-black text-gray-400 line-through decoration-[#DC2626] decoration-2`}>{from}</div>
              <p className="text-[10px] text-gray-500 mt-1">Current Baseline</p>
            </div>
            <div className="px-4 text-gray-300"><ArrowRight size={28} strokeWidth={1} /></div>
            <div className="flex-1 text-right">
              <p className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1 invisible">Target</p>
              <div className="text-4xl font-black text-[#1428A0]">{toVal}</div>
              <p className="text-[10px] font-bold text-[#059669] mt-1 bg-[#ECFDF5] inline-block px-1.5 py-0.5 rounded">{badge}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
