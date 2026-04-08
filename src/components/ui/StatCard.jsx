import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * variant="primary"  — large KPI card (OEM dashboard)
 * variant="compact"  — icon + stacked value (partner diagnostics row)
 * variant="inline"   — horizontal icon + value (Part Intelligence summary)
 * CRM styling: minimal borders, no shadows, compact spacing, gray palette
 */
export default function StatCard({
  icon,
  label,
  value,
  sub,
  trend,
  trendPositive,
  iconBg = 'bg-gray-100 text-gray-700',
  variant = 'compact',
}) {
  if (variant === 'primary') {
    return (
      <div className="bg-white p-4 rounded border border-gray-200 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-3">
          <div className={`w-9 h-9 rounded flex items-center justify-center ${iconBg}`}>{icon}</div>
          {trend && (
            <span className={`text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1 bg-gray-100 ${trendPositive ? 'text-indigo-700' : 'text-red-700'}`}>
              {trendPositive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
              {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
          <div className="text-3xl font-black text-gray-900">{value}</div>
          {sub && <p className="text-[9px] text-red-700 mt-1 font-bold">{sub}</p>}
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-white rounded border border-gray-200 p-3 flex items-center gap-2">
        <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wide text-gray-500 mb-0.5">{label}</p>
          <p className="text-lg font-black text-gray-900 leading-none">{value}</p>
          {sub && <p className="text-[9px] text-gray-500 mt-0.5">{sub}</p>}
        </div>
      </div>
    );
  }

  // compact (default)
  return (
    <div className="bg-white rounded border border-gray-200 p-3 flex flex-col gap-2">
      <div className={`w-8 h-8 rounded flex items-center justify-center ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wide text-gray-500 mb-0.5">{label}</p>
        <p className="text-xl font-black text-gray-900 leading-none">
          {value}
          {sub && <span className="text-xs font-medium text-gray-500 ml-1">{sub}</span>}
        </p>
      </div>
    </div>
  );
}
