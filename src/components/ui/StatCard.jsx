import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * variant="primary"  — large KPI card with background decoration (OEM dashboard)
 * variant="compact"  — icon + stacked value (partner diagnostics row)
 * variant="inline"   — horizontal icon + value (Part Intelligence summary)
 */
export default function StatCard({
  icon,
  label,
  value,
  sub,
  trend,
  trendPositive,
  iconBg = 'bg-[#EBF0FA] text-[#1428A0]',
  variant = 'compact',
}) {
  if (variant === 'primary') {
    return (
      <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-10 h-10 rounded flex items-center justify-center ${iconBg}`}>{icon}</div>
          {trend && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${trendPositive ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FEF2F2] text-[#DC2626]'}`}>
              {trendPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
          <div className="text-4xl font-black text-[#1F2937]">{value}</div>
          {sub && <p className="text-[10px] text-[#DC2626] mt-1 font-bold">{sub}</p>}
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
          <p className="text-xl font-black text-[#1F2937] leading-none">{value}</p>
          {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
        </div>
      </div>
    );
  }

  // compact (default)
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-4 flex flex-col gap-2">
      <div className={`w-9 h-9 rounded flex items-center justify-center ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
        <p className="text-2xl font-black text-[#1F2937] leading-none">
          {value}
          {sub && <span className="text-sm font-medium text-gray-400 ml-1">{sub}</span>}
        </p>
      </div>
    </div>
  );
}
