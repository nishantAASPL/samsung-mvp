/**
 * SVG line + area chart for Part Intelligence demand trend.
 * historicalData: array of monthly demand values (actual)
 * forecastData:   array of forecasted values (appended after historicals)
 * staticThreshold, dynamicThreshold: horizontal reference lines
 */
export default function PartDemandLineChart({
  historicalData = [],
  forecastData = [],
  staticThreshold,
  dynamicThreshold,
  model = 'TO_BE',
  partName = '',
}) {
  const allPoints = [...historicalData, ...forecastData];
  const maxVal    = Math.max(...allPoints, staticThreshold ?? 0, dynamicThreshold ?? 0) * 1.2;
  const W = 600, H = 180, PAD = { top: 20, right: 24, bottom: 28, left: 36 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const totalPoints = allPoints.length;
  const xStep = innerW / (totalPoints - 1);

  const toX = (i) => PAD.left + i * xStep;
  const toY = (v) => PAD.top + innerH - (v / maxVal) * innerH;

  // Build SVG path strings
  const histPath = historicalData
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`)
    .join(' ');

  const forecastStartIdx = historicalData.length - 1;
  const forecastPath = [historicalData[forecastStartIdx], ...forecastData]
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(forecastStartIdx + i)} ${toY(v)}`)
    .join(' ');

  // Area fill for historical
  const histArea =
    histPath +
    ` L ${toX(historicalData.length - 1)} ${PAD.top + innerH}` +
    ` L ${toX(0)} ${PAD.top + innerH} Z`;

  const threshY_static  = staticThreshold  != null ? toY(staticThreshold)  : null;
  const threshY_dynamic = dynamicThreshold != null ? toY(dynamicThreshold) : null;

  // Y-axis labels (4 ticks)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxVal * f));

  const histMonths   = historicalData.length;
  const forecastMons = forecastData.length;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 200 }}
        aria-label={`${partName} demand trend`}
      >
        <defs>
          <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1428A0" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1428A0" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={model === 'TO_BE' ? '#059669' : '#9CA3AF'} stopOpacity="0.14" />
            <stop offset="100%" stopColor={model === 'TO_BE' ? '#059669' : '#9CA3AF'} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Y gridlines */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={PAD.left} y1={toY(tick)}
              x2={PAD.left + innerW} y2={toY(tick)}
              stroke="#E5E7EB" strokeWidth="1"
            />
            <text x={PAD.left - 6} y={toY(tick) + 4} textAnchor="end" fontSize="9" fill="#9CA3AF" fontFamily="monospace">
              {tick}
            </text>
          </g>
        ))}

        {/* Forecast separator */}
        <line
          x1={toX(forecastStartIdx)} y1={PAD.top}
          x2={toX(forecastStartIdx)} y2={PAD.top + innerH}
          stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3"
        />
        <text x={toX(forecastStartIdx) + 4} y={PAD.top + 10} fontSize="8" fill="#9CA3AF" fontWeight="bold">
          FORECAST →
        </text>

        {/* Static threshold line */}
        {threshY_static != null && (
          <g>
            <line x1={PAD.left} y1={threshY_static} x2={PAD.left + innerW} y2={threshY_static}
              stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x={PAD.left + innerW + 2} y={threshY_static + 4} fontSize="8" fill="#9CA3AF" fontWeight="bold">
              Static ({staticThreshold})
            </text>
          </g>
        )}

        {/* Dynamic threshold line */}
        {threshY_dynamic != null && model === 'TO_BE' && (
          <g>
            <line x1={PAD.left} y1={threshY_dynamic} x2={PAD.left + innerW} y2={threshY_dynamic}
              stroke="#1428A0" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x={PAD.left + innerW + 2} y={threshY_dynamic + 4} fontSize="8" fill="#1428A0" fontWeight="bold">
              Dynamic ({dynamicThreshold})
            </text>
          </g>
        )}

        {/* Historical area fill */}
        <path d={histArea} fill="url(#histGrad)" />

        {/* Historical line */}
        <path d={histPath} fill="none" stroke="#1428A0" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {/* Forecast area */}
        {forecastData.length > 0 && (() => {
          const fArea =
            forecastPath +
            ` L ${toX(forecastStartIdx + forecastData.length)} ${PAD.top + innerH}` +
            ` L ${toX(forecastStartIdx)} ${PAD.top + innerH} Z`;
          return <path d={fArea} fill="url(#forecastGrad)" />;
        })()}

        {/* Forecast line */}
        {forecastData.length > 0 && (
          <path
            d={forecastPath}
            fill="none"
            stroke={model === 'TO_BE' ? '#059669' : '#9CA3AF'}
            strokeWidth="2"
            strokeDasharray="5 4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* Data point dots — historical */}
        {historicalData.map((v, i) => (
          <circle key={i} cx={toX(i)} cy={toY(v)} r="3" fill="#1428A0" />
        ))}

        {/* Data point dots — forecast */}
        {forecastData.map((v, i) => (
          <circle
            key={i}
            cx={toX(forecastStartIdx + 1 + i)}
            cy={toY(v)}
            r="3"
            fill={model === 'TO_BE' ? '#059669' : '#9CA3AF'}
            strokeDasharray="none"
          />
        ))}

        {/* X-axis labels */}
        {allPoints.map((_, i) => {
          const isForecast = i >= histMonths;
          const label = isForecast ? `F${i - histMonths + 1}` : `M${i + 1}`;
          return (
            <text
              key={i}
              x={toX(i)}
              y={PAD.top + innerH + 16}
              textAnchor="middle"
              fontSize="8"
              fill={isForecast ? (model === 'TO_BE' ? '#059669' : '#9CA3AF') : '#6B7280'}
              fontWeight={isForecast ? 'bold' : 'normal'}
              fontFamily="monospace"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-1 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-[#1428A0] rounded" />
          <span className="text-[10px] text-gray-500 font-medium">Actual Demand</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-0.5 rounded border-t-2 border-dashed ${model === 'TO_BE' ? 'border-[#059669]' : 'border-gray-400'}`} />
          <span className="text-[10px] text-gray-500 font-medium">Forecast</span>
        </div>
        {staticThreshold != null && (
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 rounded border-t-2 border-dashed border-gray-400" />
            <span className="text-[10px] text-gray-500 font-medium">Static Threshold</span>
          </div>
        )}
        {dynamicThreshold != null && model === 'TO_BE' && (
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 rounded border-t-2 border-dashed border-[#1428A0]" />
            <span className="text-[10px] text-[#1428A0] font-bold">Dynamic Threshold</span>
          </div>
        )}
      </div>
    </div>
  );
}
