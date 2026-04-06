export const oemMetrics = {
  AS_IS: {
    ftfr: 52,
    stockouts: 482,
    deadStock: '$245,000',
    deadStockTrend: '+12%',
    status: 'Reactive (Static Thresholds)',
    statusColor: 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]',
    ftfrTrend: '-2.4% (QoQ)',
    avgWaitTime: '185 mins',
    reschedules: '1,240 / yr',
    queueStats: { total: 47, approved: 32, redirected: 0, pending: 15, ftfr: '52%' },
    alerts: [
      { id: 1, type: 'danger', title: 'Store #142 Crisis',   msg: 'S24 Ultra Display stockout imminent. 14 reservations blocked.' },
      { id: 2, type: 'warning', title: 'Idle Capital',        msg: 'Store #045 holding $18K in dead stock (M34 Panels). 1300+ days cover.' },
      { id: 3, type: 'danger', title: 'Chronic Shortage',    msg: 'Store #092 repeatedly out of S24 Ports. Emergency PO required.' },
    ],
    partnerFtfr: [
      { id: 'S-045', name: 'Store #045 — New York',     ftfr: 54 },
      { id: 'S-092', name: 'Store #092 — Los Angeles',  ftfr: 48 },
      { id: 'S-142', name: 'Store #142 — Chicago',      ftfr: 41 },
      { id: 'S-187', name: 'Store #187 — Naperville',   ftfr: 59 },
      { id: 'S-210', name: 'Store #210 — Dallas',       ftfr: 58 },
    ],
  },
  TO_BE: {
    ftfr: 78,
    stockouts: 0,
    deadStock: '$42,000',
    deadStockTrend: '-71%',
    status: 'Predictive (MTBF Driven)',
    statusColor: 'text-[#059669] bg-[#ECFDF5] border-[#A7F3D0]',
    ftfrTrend: '+26.0% (Projected)',
    avgWaitTime: '12 mins',
    reschedules: '0 (Intercepted)',
    queueStats: { total: 47, approved: 43, redirected: 4, pending: 0, ftfr: '87%' },
    alerts: [
      { id: 1, type: 'success', title: 'Auto-Rebalance',  msg: 'AI routed 50 M34 Panels from New York to Dallas. $0 net cost.' },
      { id: 2, type: 'success', title: 'SLA Allocation',  msg: 'Chicago allocated 12 S24U Displays based on Platinum SLA vs Naperville Silver SLA.' },
      { id: 3, type: 'success', title: 'Wave Pre-Order',  msg: 'Pre-ordered 42 A54 Batteries for Chicago to absorb incoming 2nd-cycle wave.' },
    ],
    partnerFtfr: [
      { id: 'S-045', name: 'Store #045 — New York',     ftfr: 82 },
      { id: 'S-092', name: 'Store #092 — Los Angeles',  ftfr: 76 },
      { id: 'S-142', name: 'Store #142 — Chicago',      ftfr: 88 },
      { id: 'S-187', name: 'Store #187 — Naperville',   ftfr: 71 },
      { id: 'S-210', name: 'Store #210 — Dallas',       ftfr: 75 },
    ],
  },
};

export const scopeDetails = {
  models: ['Galaxy S24 Ultra', 'Galaxy S24', 'Galaxy A54', 'Galaxy A34', 'Galaxy M34', 'Galaxy Z Flip5'],
  parts: [
    { type: 'Displays',       examples: 'S24U OLED, A54 Screen, Z Flip5 Screen', trait: 'High Cost, Low Volume' },
    { type: 'Batteries',      examples: 'A54 Batt, M34 Batt',                    trait: 'MTBF Driven, High Turn' },
    { type: 'Charging Ports', examples: 'S24 Port, M34 USB-C',                   trait: 'Chronic Shortage Risk' },
    { type: 'Back Panels',    examples: 'M34 Panel, A34 Panel',                  trait: 'Dead Stock Risk' },
    { type: 'Camera Modules', examples: 'S24U Camera, A54 Camera',               trait: 'High Value, Low MTBF' },
    { type: 'Logic Boards',   examples: 'S24 Board',                              trait: 'Rare, Long Lead Time' },
  ],
  dataPoints: [
    { label: 'Repair History',  value: '18 Months', desc: 'Jan 2024 – Jun 2025 logs' },
    { label: 'Reservations',    value: '6 Months',  desc: 'Jan 2025 – Jun 2025 pipeline' },
    { label: 'Data Rows',       value: '2,400+',    desc: 'Deterministic failure patterns' },
  ],
};
