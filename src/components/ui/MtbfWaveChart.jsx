import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function MtbfWaveChart({ model, waveMonth = 9, preOrderMonth = 7, barCount = 12 }) {
  return (
    <>
      <div className="relative h-32 w-full flex items-end justify-between border-b border-gray-200 pb-2 px-2 mt-4">
        {Array.from({ length: barCount }).map((_, i) => {
          const isWave = i === waveMonth;
          const isPreOrder = i === preOrderMonth && model === 'TO_BE';
          let hClass = 'h-6 bg-gray-100';
          if (isWave)
            hClass = model === 'TO_BE'
              ? 'h-24 bg-[#1428A0] shadow shadow-blue-400/30'
              : 'h-24 bg-[#DC2626] shadow shadow-red-400/30';
          else if (isPreOrder)
            hClass = 'h-16 bg-[#34D399] border border-[#059669] border-dashed opacity-70';

          return (
            <div key={i} className="flex flex-col items-center gap-1 w-full px-1 relative">
              {isPreOrder && (
                <div className="absolute -top-6 whitespace-nowrap text-[9px] font-bold text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">
                  AI Pre-Order
                </div>
              )}
              <div className={`w-full max-w-[20px] rounded-t-sm transition-all duration-700 ${hClass}`} />
              <span className="text-[8px] text-gray-400 font-bold uppercase">M{i + 1}</span>
            </div>
          );
        })}
        <div className="absolute top-[40%] left-0 w-full h-px border-b border-dashed border-red-400/60 z-0" />
      </div>

      <div className="mt-4 flex items-center justify-center p-3 bg-gray-50 rounded border border-gray-100 text-center">
        {model === 'AS_IS' ? (
          <p className="text-gray-600 text-xs">
            <strong className="text-[#D97706]">
              <AlertTriangle className="inline pb-0.5" size={14} /> Blind to Future:
            </strong>{' '}
            Static thresholds ignore 14m MTBF, resulting in massive shortfall at M{waveMonth + 1}.
          </p>
        ) : (
          <p className="text-gray-600 text-xs">
            <strong className="text-[#1428A0]">
              <CheckCircle2 className="inline pb-0.5" size={14} /> Proactive Mitigation:
            </strong>{' '}
            System maps fleet age vs MTBF, auto-triggering pre-order at M{preOrderMonth + 1} to absorb the M{waveMonth + 1} spike.
          </p>
        )}
      </div>
    </>
  );
}
