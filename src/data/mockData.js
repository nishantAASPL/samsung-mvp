export const oemMetrics = {
  AS_IS: {
    ftfr: 52,
    stockouts: 482,
    deadStock: "$245,000",
    deadStockTrend: "+12%",
    status: "Reactive (Static Thresholds)",
    statusColor: "text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]",
    ftfrTrend: "-2.4% (QoQ)",
    avgWaitTime: "185 mins",
    reschedules: "1,240 / yr",
    queueStats: { total: 47, approved: 32, redirected: 0, pending: 15, ftfr: '52%' },
    alerts: [
      { id: 1, type: 'danger', title: 'Store #142 Crisis', msg: 'S24 Ultra Display stockout imminent. 14 reservations blocked.' },
      { id: 2, type: 'warning', title: 'Idle Capital', msg: 'Store #045 holding $18K in dead stock (M34 Panels). 1300+ days cover.' },
      { id: 3, type: 'danger', title: 'Chronic Shortage', msg: 'Store #092 repeatedly out of S24 Ports. Emergency PO required.' }
    ],
    partnerFtfr: [
      { id: 'P-045', name: 'Northeast Hub (NY)', ftfr: 54 },
      { id: 'P-092', name: 'West Coast Hub (LA)', ftfr: 48 },
      { id: 'P-142', name: 'Central Hub (CHI)', ftfr: 41 },
      { id: 'P-187', name: 'Suburban Hub (NAP)', ftfr: 59 },
      { id: 'P-210', name: 'South Hub (DAL)', ftfr: 58 },
      { id: 'P-301', name: 'Southeast Hub (MIA)', ftfr: 52 },
      { id: 'P-404', name: 'Northwest Hub (SEA)', ftfr: 55 }
    ]
  },
  TO_BE: {
    ftfr: 78,
    stockouts: 0,
    deadStock: "$42,000",
    deadStockTrend: "-71%",
    status: "Predictive (MTBF Driven)",
    statusColor: "text-[#059669] bg-[#ECFDF5] border-[#A7F3D0]",
    ftfrTrend: "+26.0% (Projected)",
    avgWaitTime: "12 mins",
    reschedules: "0 (Intercepted)",
    queueStats: { total: 47, approved: 43, redirected: 4, pending: 0, ftfr: '87%' },
    alerts: [
      { id: 1, type: 'success', title: 'Auto-Rebalance', msg: 'AI routed 50 M34 Panels from New York to Dallas. $0 net cost.' },
      { id: 2, type: 'success', title: 'SLA Allocation', msg: 'Chicago allocated 12 S24U Displays based on Platinum SLA vs Naperville Silver SLA.' },
      { id: 3, type: 'success', title: 'Wave Pre-Order', msg: 'Pre-ordered 42 A54 Batteries for Chicago to absorb incoming 2nd-cycle wave.' }
    ],
    partnerFtfr: [
      { id: 'P-045', name: 'Northeast Hub (NY)', ftfr: 82 },
      { id: 'P-092', name: 'West Coast Hub (LA)', ftfr: 76 },
      { id: 'P-142', name: 'Central Hub (CHI)', ftfr: 88 },
      { id: 'P-187', name: 'Suburban Hub (NAP)', ftfr: 71 },
      { id: 'P-210', name: 'South Hub (DAL)', ftfr: 75 },
      { id: 'P-301', name: 'Southeast Hub (MIA)', ftfr: 78 },
      { id: 'P-404', name: 'Northwest Hub (SEA)', ftfr: 85 }
    ]
  }
};

export const oemRequests = {
  AS_IS: [
    { id: 'REQ-20260403-01', device: 'Galaxy S24 Ultra', part: 'Screen Assembly', store: 'Store #142 (Chicago, IL)', status: 'RED', time: '10:14 AM', customer: 'C-88291', warranty: 'Out of Warranty', issue: 'Shattered display, no touch', date: 'Apr 4, 2026', mtbf: '28 mo', age: '24 mo' },
    { id: 'REQ-20260403-02', device: 'Galaxy A54', part: 'Battery Module', store: 'Store #045 (New York, NY)', status: 'GREEN', time: '10:12 AM', customer: 'C-10934', warranty: 'In Warranty', issue: 'Rapid drain, swelling', date: 'Apr 4, 2026', mtbf: '14 mo', age: '15 mo' },
    { id: 'REQ-20260403-03', device: 'Galaxy Z Flip5', part: 'Screen Assembly', store: 'Store #092 (Los Angeles, CA)', status: 'AMBER', time: '10:05 AM', customer: 'C-44920', warranty: 'In Warranty', issue: 'Crease cracking', date: 'Apr 4, 2026', mtbf: '18 mo', age: '11 mo' },
    { id: 'REQ-20260403-04', device: 'Galaxy S24', part: 'Logic Board', store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '09:58 AM', customer: 'C-33019', warranty: 'Out of Warranty', issue: 'Boot loop', date: 'Apr 5, 2026', mtbf: '48 mo', age: '14 mo' },
    { id: 'REQ-20260403-05', device: 'Galaxy S23 FE', part: 'Screen Assembly', store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '09:45 AM', customer: 'C-99211', warranty: 'Out of Warranty', issue: 'Dead pixels', date: 'Apr 4, 2026', mtbf: '24 mo', age: '18 mo' },
  ],
  TO_BE: [
    { id: 'REQ-20260403-01', device: 'Galaxy S24 Ultra', part: 'Screen Assembly', store: 'Store #142 (Chicago, IL)', status: 'AMBER', time: '10:14 AM', customer: 'C-88291', warranty: 'Out of Warranty', issue: 'Shattered display, no touch', date: 'Apr 4, 2026', mtbf: '28 mo', age: '24 mo' },
    { id: 'REQ-20260403-02', device: 'Galaxy A54', part: 'Battery Module', store: 'Store #045 (New York, NY)', status: 'GREEN', time: '10:12 AM', customer: 'C-10934', warranty: 'In Warranty', issue: 'Rapid drain, swelling', date: 'Apr 4, 2026', mtbf: '14 mo', age: '15 mo' },
    { id: 'REQ-20260403-03', device: 'Galaxy Z Flip5', part: 'Screen Assembly', store: 'Store #092 (Los Angeles, CA)', status: 'GREEN', time: '10:05 AM', customer: 'C-44920', warranty: 'In Warranty', issue: 'Crease cracking', date: 'Apr 4, 2026', mtbf: '18 mo', age: '11 mo' },
    { id: 'REQ-20260403-04', device: 'Galaxy S24', part: 'Logic Board', store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '09:58 AM', customer: 'C-33019', warranty: 'Out of Warranty', issue: 'Boot loop', date: 'Apr 5, 2026', mtbf: '48 mo', age: '14 mo' },
    { id: 'REQ-20260403-05', device: 'Galaxy S23 FE', part: 'Screen Assembly', store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '09:45 AM', customer: 'C-99211', warranty: 'Out of Warranty', issue: 'Dead pixels', date: 'Apr 4, 2026', mtbf: '24 mo', age: '18 mo' },
  ]
};

export const partners = [
  { id: 'P-045', name: 'Northeast Hub (NY)', region: 'Northeast', tier: 'Gold', backlog: 42, score: '91%' },
  { id: 'P-092', name: 'West Coast Hub (LA)', region: 'West', tier: 'Platinum', backlog: 45, score: '94%' },
  { id: 'P-142', name: 'Central Hub (CHI)', region: 'Midwest', tier: 'Platinum', backlog: 124, score: '88%' },
  { id: 'P-187', name: 'Suburban Hub (NAP)', region: 'Midwest', tier: 'Silver', backlog: 27, score: '82%' },
  { id: 'P-210', name: 'South Hub (DAL)', region: 'South', tier: 'Gold', backlog: 56, score: '89%' },
  { id: 'P-301', name: 'Southeast Hub (MIA)', region: 'South', tier: 'Silver', backlog: 34, score: '85%' },
  { id: 'P-404', name: 'Northwest Hub (SEA)', region: 'West', tier: 'Gold', backlog: 78, score: '90%' }
];

export const partnerPerformance = {
  'P-045': {
    slaHistory: [
      { month: 'Jan', asIs: 82, toBe: 91 },
      { month: 'Feb', asIs: 78, toBe: 92 },
      { month: 'Mar', asIs: 64, toBe: 94 },
      { month: 'Apr', asIs: 71, toBe: 95 },
      { month: 'May', asIs: 85, toBe: 98 },
      { month: 'Jun', asIs: 88, toBe: 99 }
    ],
    readiness: [
      { category: 'Displays', score: 85 },
      { category: 'Batteries', score: 92 },
      { category: 'Ports', score: 78 },
      { category: 'Panels', score: 65 },
      { category: 'Motherboards', score: 90 }
    ],
    financials: { lostSales: 42000, savings: 128000, mtbfExposure: 142 }
  },
  'P-092': {
    slaHistory: [
      { month: 'Jan', asIs: 85, toBe: 94 },
      { month: 'Feb', asIs: 82, toBe: 95 },
      { month: 'Mar', asIs: 74, toBe: 96 },
      { month: 'Apr', asIs: 79, toBe: 97 },
      { month: 'May', asIs: 88, toBe: 98 },
      { month: 'Jun', asIs: 91, toBe: 99 }
    ],
    readiness: [
      { category: 'Displays', score: 92 },
      { category: 'Batteries', score: 95 },
      { category: 'Ports', score: 88 },
      { category: 'Panels', score: 82 },
      { category: 'Motherboards', score: 95 }
    ],
    financials: { lostSales: 18000, savings: 245000, mtbfExposure: 88 }
  },
  'P-142': {
    slaHistory: [
      { month: 'Jan', asIs: 72, toBe: 88 },
      { month: 'Feb', asIs: 68, toBe: 89 },
      { month: 'Mar', asIs: 54, toBe: 92 },
      { month: 'Apr', asIs: 61, toBe: 94 },
      { month: 'May', asIs: 75, toBe: 96 },
      { month: 'Jun', asIs: 78, toBe: 98 }
    ],
    readiness: [
      { category: 'Displays', score: 65 },
      { category: 'Batteries', score: 72 },
      { category: 'Ports', score: 68 },
      { category: 'Panels', score: 75 },
      { category: 'Motherboards', score: 82 }
    ],
    financials: { lostSales: 78000, savings: 312000, mtbfExposure: 264 }
  },
  'P-187': {
    slaHistory: [
      { month: 'Jan', asIs: 75, toBe: 82 },
      { month: 'Feb', asIs: 72, toBe: 84 },
      { month: 'Mar', asIs: 64, toBe: 86 },
      { month: 'Apr', asIs: 69, toBe: 88 },
      { month: 'May', asIs: 78, toBe: 92 },
      { month: 'Jun', asIs: 81, toBe: 94 }
    ],
    readiness: [
      { category: 'Displays', score: 78 },
      { category: 'Batteries', score: 82 },
      { category: 'Ports', score: 85 },
      { category: 'Panels', score: 88 },
      { category: 'Motherboards', score: 90 }
    ],
    financials: { lostSales: 32000, savings: 94000, mtbfExposure: 56 }
  },
  'P-210': {
    slaHistory: [
      { month: 'Jan', asIs: 78, toBe: 89 },
      { month: 'Feb', asIs: 75, toBe: 91 },
      { month: 'Mar', asIs: 68, toBe: 92 },
      { month: 'Apr', asIs: 72, toBe: 94 },
      { month: 'May', asIs: 82, toBe: 96 },
      { month: 'Jun', asIs: 85, toBe: 98 }
    ],
    readiness: [
      { category: 'Displays', score: 82 },
      { category: 'Batteries', score: 88 },
      { category: 'Ports', score: 92 },
      { category: 'Panels', score: 95 },
      { category: 'Motherboards', score: 98 }
    ],
    financials: { lostSales: 48000, savings: 156000, mtbfExposure: 112 }
  },
  'P-301': {
    slaHistory: [
      { month: 'Jan', asIs: 70, toBe: 85 },
      { month: 'Feb', asIs: 68, toBe: 86 },
      { month: 'Mar', asIs: 62, toBe: 88 },
      { month: 'Apr', asIs: 65, toBe: 90 },
      { month: 'May', asIs: 72, toBe: 92 },
      { month: 'Jun', asIs: 75, toBe: 94 }
    ],
    readiness: [
      { category: 'Displays', score: 75 },
      { category: 'Batteries', score: 78 },
      { category: 'Ports', score: 82 },
      { category: 'Panels', score: 85 },
      { category: 'Motherboards', score: 88 }
    ],
    financials: { lostSales: 38000, savings: 85000, mtbfExposure: 74 }
  },
  'P-404': {
    slaHistory: [
      { month: 'Jan', asIs: 82, toBe: 90 },
      { month: 'Feb', asIs: 80, toBe: 91 },
      { month: 'Mar', asIs: 72, toBe: 94 },
      { month: 'Apr', asIs: 78, toBe: 96 },
      { month: 'May', asIs: 85, toBe: 98 },
      { month: 'Jun', asIs: 88, toBe: 99 }
    ],
    readiness: [
      { category: 'Displays', score: 88 },
      { category: 'Batteries', score: 92 },
      { category: 'Ports', score: 95 },
      { category: 'Panels', score: 98 },
      { category: 'Motherboards', score: 99 }
    ],
    financials: { lostSales: 45000, savings: 172000, mtbfExposure: 96 }
  }
};

export const networkStores = [
  { id: 'NY-101', partnerId: 'P-045', location: 'Manhattan', stock: 0, asIsStock: 12, threshold: 10 },
  { id: 'NY-102', partnerId: 'P-045', location: 'Brooklyn', stock: 45, asIsStock: 45, threshold: 10 },
  { id: 'NY-103', partnerId: 'P-045', location: 'Queens', stock: 18, asIsStock: 2, threshold: 10 },
  
  { id: 'LA-201', partnerId: 'P-092', location: 'Downtown LA', stock: 2, asIsStock: 0, threshold: 15 },
  { id: 'LA-202', partnerId: 'P-092', location: 'Santa Monica', stock: 35, asIsStock: 35, threshold: 15 },
  { id: 'LA-203', partnerId: 'P-092', location: 'Pasadena', stock: 15, asIsStock: 5, threshold: 15 },
  
  { id: 'CH-301', partnerId: 'P-142', location: 'Loop Store', stock: 0, asIsStock: 12, threshold: 25 },
  { id: 'CH-302', partnerId: 'P-142', location: 'Lincoln Park', stock: 65, asIsStock: 0, threshold: 25 },
  { id: 'CH-303', partnerId: 'P-142', location: 'Wicker Park', stock: 22, asIsStock: 40, threshold: 25 },


  { id: 'NA-401', partnerId: 'P-187', location: 'Naperville N', stock: 5, asIsStock: 5, threshold: 8 },
  { id: 'NA-402', partnerId: 'P-187', location: 'Aurora Store', stock: 48, asIsStock: 10, threshold: 8 },
  
  { id: 'DA-501', partnerId: 'P-210', location: 'Dallas Central', stock: 0, asIsStock: 0, threshold: 20 },
  { id: 'DA-502', partnerId: 'P-210', location: 'Plano Outlet', stock: 100, asIsStock: 100, threshold: 20 },
  { id: 'DA-503', partnerId: 'P-210', location: 'Fort Worth', stock: 10, asIsStock: 2, threshold: 20 },
  
  { id: 'MI-601', partnerId: 'P-301', location: 'Miami Beach', stock: 1, asIsStock: 15, threshold: 5 },
  { id: 'MI-602', partnerId: 'P-301', location: 'Coral Gables', stock: 75, asIsStock: 5, threshold: 5 },
  { id: 'MI-603', partnerId: 'P-301', location: 'F. Lauderdale', stock: 12, asIsStock: 12, threshold: 5 },
  
  { id: 'SE-701', partnerId: 'P-404', location: 'Seattle Core', stock: 0, asIsStock: 25, threshold: 12 },
  { id: 'SE-702', partnerId: 'P-404', location: 'Bellevue', stock: 15, asIsStock: 2, threshold: 12 },
  { id: 'SE-703', partnerId: 'P-404', location: 'Tacoma', stock: 65, asIsStock: 5, threshold: 12 }
];

export const partIntelligenceData = {
  'PT21': {
    title: 'S24 Ultra Camera Module', cost: 120, globalBase: '36 Months', type: 'Cameras', risk: 'Low Failure Rate',
    insightToBe: 'Predictive algorithm correctly applies 36 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '3,000', nextWave: 'Q1',
    data: [
      { month: 'Jan', historical: 17, forecast: null },
      { month: 'Feb', historical: 14, forecast: null },
      { month: 'Mar', historical: 42, forecast: null, outlier: true },
      { month: 'Apr', historical: 18, forecast: null },
      { month: 'May', historical: null, forecast: 14 },
      { month: 'Jun', historical: null, forecast: 16 },
      { month: 'Jul', historical: null, forecast: 15 },
      { month: 'Aug', historical: null, forecast: 16 },
      { month: 'Sep', historical: null, forecast: 14 },
      { month: 'Oct', historical: null, forecast: 16 }
    ],
    asIsData: [
      { month: 'Jan', historical: 17, forecast: null },
      { month: 'Feb', historical: 14, forecast: null },
      { month: 'Mar', historical: 42, forecast: null },
      { month: 'Apr', historical: 18, forecast: null },
      { month: 'May', historical: null, forecast: 42 },
      { month: 'Jun', historical: null, forecast: 42 },
      { month: 'Jul', historical: null, forecast: 42 },
      { month: 'Aug', historical: null, forecast: 42 },
      { month: 'Sep', historical: null, forecast: 42 },
      { month: 'Oct', historical: null, forecast: 42 }
    ]
  },
  'PT22': {
    title: 'S24 Ultra S-Pen', cost: 45, globalBase: '12 Months', type: 'Accessories', risk: 'High Loss Rate',
    insightToBe: 'Predictive algorithm correctly applies 12 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '2,000', nextWave: 'Q3',
    data: [
      { month: 'Jan', historical: 27, forecast: null },
      { month: 'Feb', historical: 26, forecast: null },
      { month: 'Mar', historical: 69, forecast: null, outlier: true },
      { month: 'Apr', historical: 26, forecast: null },
      { month: 'May', historical: null, forecast: 23 },
      { month: 'Jun', historical: null, forecast: 24 },
      { month: 'Jul', historical: null, forecast: 26 },
      { month: 'Aug', historical: null, forecast: 23 },
      { month: 'Sep', historical: null, forecast: 25 },
      { month: 'Oct', historical: null, forecast: 26 }
    ],
    asIsData: [
      { month: 'Jan', historical: 27, forecast: null },
      { month: 'Feb', historical: 26, forecast: null },
      { month: 'Mar', historical: 69, forecast: null },
      { month: 'Apr', historical: 26, forecast: null },
      { month: 'May', historical: null, forecast: 69 },
      { month: 'Jun', historical: null, forecast: 69 },
      { month: 'Jul', historical: null, forecast: 69 },
      { month: 'Aug', historical: null, forecast: 69 },
      { month: 'Sep', historical: null, forecast: 69 },
      { month: 'Oct', historical: null, forecast: 69 }
    ]
  },
  'PT23': {
    title: 'S23 Battery', cost: 35, globalBase: '18 Months', type: 'Batteries', risk: 'MTBF Wave Approaching',
    insightToBe: 'Predictive algorithm correctly applies 18 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '8,000', nextWave: 'Q4',
    data: [
      { month: 'Jan', historical: 29, forecast: null },
      { month: 'Feb', historical: 32, forecast: null },
      { month: 'Mar', historical: 84, forecast: null, outlier: true },
      { month: 'Apr', historical: 28, forecast: null },
      { month: 'May', historical: null, forecast: 32 },
      { month: 'Jun', historical: null, forecast: 28 },
      { month: 'Jul', historical: null, forecast: 31 },
      { month: 'Aug', historical: null, forecast: 31 },
      { month: 'Sep', historical: null, forecast: 30 },
      { month: 'Oct', historical: null, forecast: 29 }
    ],
    asIsData: [
      { month: 'Jan', historical: 29, forecast: null },
      { month: 'Feb', historical: 32, forecast: null },
      { month: 'Mar', historical: 84, forecast: null },
      { month: 'Apr', historical: 28, forecast: null },
      { month: 'May', historical: null, forecast: 84 },
      { month: 'Jun', historical: null, forecast: 84 },
      { month: 'Jul', historical: null, forecast: 84 },
      { month: 'Aug', historical: null, forecast: 84 },
      { month: 'Sep', historical: null, forecast: 84 },
      { month: 'Oct', historical: null, forecast: 84 }
    ]
  },
  'PT24': {
    title: 'S23 Screen Assembly', cost: 210, globalBase: '24 Months', type: 'Displays', risk: 'Accidental Damage Driven',
    insightToBe: 'Predictive algorithm correctly applies 24 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '5,000', nextWave: 'Q3',
    data: [
      { month: 'Jan', historical: 17, forecast: null },
      { month: 'Feb', historical: 18, forecast: null },
      { month: 'Mar', historical: 48, forecast: null, outlier: true },
      { month: 'Apr', historical: 16, forecast: null },
      { month: 'May', historical: null, forecast: 19 },
      { month: 'Jun', historical: null, forecast: 16 },
      { month: 'Jul', historical: null, forecast: 17 },
      { month: 'Aug', historical: null, forecast: 20 },
      { month: 'Sep', historical: null, forecast: 18 },
      { month: 'Oct', historical: null, forecast: 18 }
    ],
    asIsData: [
      { month: 'Jan', historical: 17, forecast: null },
      { month: 'Feb', historical: 18, forecast: null },
      { month: 'Mar', historical: 48, forecast: null },
      { month: 'Apr', historical: 16, forecast: null },
      { month: 'May', historical: null, forecast: 48 },
      { month: 'Jun', historical: null, forecast: 48 },
      { month: 'Jul', historical: null, forecast: 48 },
      { month: 'Aug', historical: null, forecast: 48 },
      { month: 'Sep', historical: null, forecast: 48 },
      { month: 'Oct', historical: null, forecast: 48 }
    ]
  },
  'PT25': {
    title: 'Z Fold 5 Inner Display', cost: 480, globalBase: '24 Months', type: 'Displays', risk: 'High Cost Critical Component',
    insightToBe: 'Predictive algorithm correctly applies 24 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '13,000', nextWave: 'Q2',
    data: [
      { month: 'Jan', historical: 21, forecast: null },
      { month: 'Feb', historical: 22, forecast: null },
      { month: 'Mar', historical: 54, forecast: null, outlier: true },
      { month: 'Apr', historical: 22, forecast: null },
      { month: 'May', historical: null, forecast: 19 },
      { month: 'Jun', historical: null, forecast: 18 },
      { month: 'Jul', historical: null, forecast: 20 },
      { month: 'Aug', historical: null, forecast: 22 },
      { month: 'Sep', historical: null, forecast: 22 },
      { month: 'Oct', historical: null, forecast: 21 }
    ],
    asIsData: [
      { month: 'Jan', historical: 21, forecast: null },
      { month: 'Feb', historical: 22, forecast: null },
      { month: 'Mar', historical: 54, forecast: null },
      { month: 'Apr', historical: 22, forecast: null },
      { month: 'May', historical: null, forecast: 54 },
      { month: 'Jun', historical: null, forecast: 54 },
      { month: 'Jul', historical: null, forecast: 54 },
      { month: 'Aug', historical: null, forecast: 54 },
      { month: 'Sep', historical: null, forecast: 54 },
      { month: 'Oct', historical: null, forecast: 54 }
    ]
  },
  'PT26': {
    title: 'Z Fold 5 Hinge Mechanism', cost: 85, globalBase: '30 Months', type: 'Mechanicals', risk: 'Wear and Tear Baseline',
    insightToBe: 'Predictive algorithm correctly applies 30 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '14,000', nextWave: 'Q4',
    data: [
      { month: 'Jan', historical: 26, forecast: null },
      { month: 'Feb', historical: 24, forecast: null },
      { month: 'Mar', historical: 72, forecast: null, outlier: true },
      { month: 'Apr', historical: 24, forecast: null },
      { month: 'May', historical: null, forecast: 24 },
      { month: 'Jun', historical: null, forecast: 27 },
      { month: 'Jul', historical: null, forecast: 26 },
      { month: 'Aug', historical: null, forecast: 25 },
      { month: 'Sep', historical: null, forecast: 27 },
      { month: 'Oct', historical: null, forecast: 26 }
    ],
    asIsData: [
      { month: 'Jan', historical: 26, forecast: null },
      { month: 'Feb', historical: 24, forecast: null },
      { month: 'Mar', historical: 72, forecast: null },
      { month: 'Apr', historical: 24, forecast: null },
      { month: 'May', historical: null, forecast: 72 },
      { month: 'Jun', historical: null, forecast: 72 },
      { month: 'Jul', historical: null, forecast: 72 },
      { month: 'Aug', historical: null, forecast: 72 },
      { month: 'Sep', historical: null, forecast: 72 },
      { month: 'Oct', historical: null, forecast: 72 }
    ]
  },
  'PT27': {
    title: 'Z Flip 5 Cover Screen', cost: 110, globalBase: '24 Months', type: 'Displays', risk: 'Accidental Damage Driven',
    insightToBe: 'Predictive algorithm correctly applies 24 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '11,000', nextWave: 'Q1',
    data: [
      { month: 'Jan', historical: 21, forecast: null },
      { month: 'Feb', historical: 21, forecast: null },
      { month: 'Mar', historical: 60, forecast: null, outlier: true },
      { month: 'Apr', historical: 20, forecast: null },
      { month: 'May', historical: null, forecast: 23 },
      { month: 'Jun', historical: null, forecast: 24 },
      { month: 'Jul', historical: null, forecast: 24 },
      { month: 'Aug', historical: null, forecast: 21 },
      { month: 'Sep', historical: null, forecast: 21 },
      { month: 'Oct', historical: null, forecast: 23 }
    ],
    asIsData: [
      { month: 'Jan', historical: 21, forecast: null },
      { month: 'Feb', historical: 21, forecast: null },
      { month: 'Mar', historical: 60, forecast: null },
      { month: 'Apr', historical: 20, forecast: null },
      { month: 'May', historical: null, forecast: 60 },
      { month: 'Jun', historical: null, forecast: 60 },
      { month: 'Jul', historical: null, forecast: 60 },
      { month: 'Aug', historical: null, forecast: 60 },
      { month: 'Sep', historical: null, forecast: 60 },
      { month: 'Oct', historical: null, forecast: 60 }
    ]
  },
  'PT28': {
    title: 'A34 Display', cost: 140, globalBase: '36 Months', type: 'Displays', risk: 'Budget Tier Volume',
    insightToBe: 'Predictive algorithm correctly applies 36 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '10,000', nextWave: 'Q3',
    data: [
      { month: 'Jan', historical: 20, forecast: null },
      { month: 'Feb', historical: 21, forecast: null },
      { month: 'Mar', historical: 51, forecast: null, outlier: true },
      { month: 'Apr', historical: 21, forecast: null },
      { month: 'May', historical: null, forecast: 17 },
      { month: 'Jun', historical: null, forecast: 18 },
      { month: 'Jul', historical: null, forecast: 18 },
      { month: 'Aug', historical: null, forecast: 20 },
      { month: 'Sep', historical: null, forecast: 20 },
      { month: 'Oct', historical: null, forecast: 21 }
    ],
    asIsData: [
      { month: 'Jan', historical: 20, forecast: null },
      { month: 'Feb', historical: 21, forecast: null },
      { month: 'Mar', historical: 51, forecast: null },
      { month: 'Apr', historical: 21, forecast: null },
      { month: 'May', historical: null, forecast: 51 },
      { month: 'Jun', historical: null, forecast: 51 },
      { month: 'Jul', historical: null, forecast: 51 },
      { month: 'Aug', historical: null, forecast: 51 },
      { month: 'Sep', historical: null, forecast: 51 },
      { month: 'Oct', historical: null, forecast: 51 }
    ]
  },
  'PT29': {
    title: 'A34 Battery', cost: 25, globalBase: '18 Months', type: 'Batteries', risk: 'High Turn, Low Cost',
    insightToBe: 'Predictive algorithm correctly applies 18 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '10,000', nextWave: 'Q4',
    data: [
      { month: 'Jan', historical: 30, forecast: null },
      { month: 'Feb', historical: 29, forecast: null },
      { month: 'Mar', historical: 78, forecast: null, outlier: true },
      { month: 'Apr', historical: 29, forecast: null },
      { month: 'May', historical: null, forecast: 29 },
      { month: 'Jun', historical: null, forecast: 29 },
      { month: 'Jul', historical: null, forecast: 26 },
      { month: 'Aug', historical: null, forecast: 29 },
      { month: 'Sep', historical: null, forecast: 29 },
      { month: 'Oct', historical: null, forecast: 30 }
    ],
    asIsData: [
      { month: 'Jan', historical: 30, forecast: null },
      { month: 'Feb', historical: 29, forecast: null },
      { month: 'Mar', historical: 78, forecast: null },
      { month: 'Apr', historical: 29, forecast: null },
      { month: 'May', historical: null, forecast: 78 },
      { month: 'Jun', historical: null, forecast: 78 },
      { month: 'Jul', historical: null, forecast: 78 },
      { month: 'Aug', historical: null, forecast: 78 },
      { month: 'Sep', historical: null, forecast: 78 },
      { month: 'Oct', historical: null, forecast: 78 }
    ]
  },
  'PT30': {
    title: 'S22 Ultra Battery', cost: 40, globalBase: '18 Months', type: 'Batteries', risk: 'Third MTBF Cycle',
    insightToBe: 'Predictive algorithm correctly applies 18 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '5,000', nextWave: 'Q2',
    data: [
      { month: 'Jan', historical: 24, forecast: null },
      { month: 'Feb', historical: 25, forecast: null },
      { month: 'Mar', historical: 72, forecast: null, outlier: true },
      { month: 'Apr', historical: 25, forecast: null },
      { month: 'May', historical: null, forecast: 27 },
      { month: 'Jun', historical: null, forecast: 25 },
      { month: 'Jul', historical: null, forecast: 25 },
      { month: 'Aug', historical: null, forecast: 25 },
      { month: 'Sep', historical: null, forecast: 28 },
      { month: 'Oct', historical: null, forecast: 27 }
    ],
    asIsData: [
      { month: 'Jan', historical: 24, forecast: null },
      { month: 'Feb', historical: 25, forecast: null },
      { month: 'Mar', historical: 72, forecast: null },
      { month: 'Apr', historical: 25, forecast: null },
      { month: 'May', historical: null, forecast: 72 },
      { month: 'Jun', historical: null, forecast: 72 },
      { month: 'Jul', historical: null, forecast: 72 },
      { month: 'Aug', historical: null, forecast: 72 },
      { month: 'Sep', historical: null, forecast: 72 },
      { month: 'Oct', historical: null, forecast: 72 }
    ]
  },
  'PT31': {
    title: 'S22 Motherboard (256GB)', cost: 320, globalBase: '48 Months', type: 'Logic Boards', risk: 'High Cost, Dead Stock Risk',
    insightToBe: 'Predictive algorithm correctly applies 48 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '7,000', nextWave: 'Q1',
    data: [
      { month: 'Jan', historical: 19, forecast: null },
      { month: 'Feb', historical: 16, forecast: null },
      { month: 'Mar', historical: 45, forecast: null, outlier: true },
      { month: 'Apr', historical: 19, forecast: null },
      { month: 'May', historical: null, forecast: 17 },
      { month: 'Jun', historical: null, forecast: 16 },
      { month: 'Jul', historical: null, forecast: 16 },
      { month: 'Aug', historical: null, forecast: 15 },
      { month: 'Sep', historical: null, forecast: 16 },
      { month: 'Oct', historical: null, forecast: 17 }
    ],
    asIsData: [
      { month: 'Jan', historical: 19, forecast: null },
      { month: 'Feb', historical: 16, forecast: null },
      { month: 'Mar', historical: 45, forecast: null },
      { month: 'Apr', historical: 19, forecast: null },
      { month: 'May', historical: null, forecast: 45 },
      { month: 'Jun', historical: null, forecast: 45 },
      { month: 'Jul', historical: null, forecast: 45 },
      { month: 'Aug', historical: null, forecast: 45 },
      { month: 'Sep', historical: null, forecast: 45 },
      { month: 'Oct', historical: null, forecast: 45 }
    ]
  },
  'PT32': {
    title: 'A54 Camera Module', cost: 65, globalBase: '36 Months', type: 'Cameras', risk: 'Low Volume Draw',
    insightToBe: 'Predictive algorithm correctly applies 36 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '16,000', nextWave: 'Q3',
    data: [
      { month: 'Jan', historical: 27, forecast: null },
      { month: 'Feb', historical: 30, forecast: null },
      { month: 'Mar', historical: 81, forecast: null, outlier: true },
      { month: 'Apr', historical: 31, forecast: null },
      { month: 'May', historical: null, forecast: 29 },
      { month: 'Jun', historical: null, forecast: 27 },
      { month: 'Jul', historical: null, forecast: 27 },
      { month: 'Aug', historical: null, forecast: 28 },
      { month: 'Sep', historical: null, forecast: 29 },
      { month: 'Oct', historical: null, forecast: 29 }
    ],
    asIsData: [
      { month: 'Jan', historical: 27, forecast: null },
      { month: 'Feb', historical: 30, forecast: null },
      { month: 'Mar', historical: 81, forecast: null },
      { month: 'Apr', historical: 31, forecast: null },
      { month: 'May', historical: null, forecast: 81 },
      { month: 'Jun', historical: null, forecast: 81 },
      { month: 'Jul', historical: null, forecast: 81 },
      { month: 'Aug', historical: null, forecast: 81 },
      { month: 'Sep', historical: null, forecast: 81 },
      { month: 'Oct', historical: null, forecast: 81 }
    ]
  },
  'PT33': {
    title: 'S23 FE Back Glass', cost: 30, globalBase: '48 Months', type: 'Back Panels', risk: 'Cosmetic Excess Inventory',
    insightToBe: 'Predictive algorithm correctly applies 48 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '2,000', nextWave: 'Q4',
    data: [
      { month: 'Jan', historical: 29, forecast: null },
      { month: 'Feb', historical: 31, forecast: null },
      { month: 'Mar', historical: 81, forecast: null, outlier: true },
      { month: 'Apr', historical: 29, forecast: null },
      { month: 'May', historical: null, forecast: 29 },
      { month: 'Jun', historical: null, forecast: 28 },
      { month: 'Jul', historical: null, forecast: 28 },
      { month: 'Aug', historical: null, forecast: 31 },
      { month: 'Sep', historical: null, forecast: 27 },
      { month: 'Oct', historical: null, forecast: 31 }
    ],
    asIsData: [
      { month: 'Jan', historical: 29, forecast: null },
      { month: 'Feb', historical: 31, forecast: null },
      { month: 'Mar', historical: 81, forecast: null },
      { month: 'Apr', historical: 29, forecast: null },
      { month: 'May', historical: null, forecast: 81 },
      { month: 'Jun', historical: null, forecast: 81 },
      { month: 'Jul', historical: null, forecast: 81 },
      { month: 'Aug', historical: null, forecast: 81 },
      { month: 'Sep', historical: null, forecast: 81 },
      { month: 'Oct', historical: null, forecast: 81 }
    ]
  },
  'PT34': {
    title: 'M34 AMOLED Display', cost: 95, globalBase: '36 Months', type: 'Displays', risk: 'Budget Tier Dead Stock',
    insightToBe: 'Predictive algorithm correctly applies 36 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '6,000', nextWave: 'Q2',
    data: [
      { month: 'Jan', historical: 14, forecast: null },
      { month: 'Feb', historical: 16, forecast: null },
      { month: 'Mar', historical: 36, forecast: null, outlier: true },
      { month: 'Apr', historical: 15, forecast: null },
      { month: 'May', historical: null, forecast: 15 },
      { month: 'Jun', historical: null, forecast: 15 },
      { month: 'Jul', historical: null, forecast: 14 },
      { month: 'Aug', historical: null, forecast: 14 },
      { month: 'Sep', historical: null, forecast: 15 },
      { month: 'Oct', historical: null, forecast: 12 }
    ],
    asIsData: [
      { month: 'Jan', historical: 14, forecast: null },
      { month: 'Feb', historical: 16, forecast: null },
      { month: 'Mar', historical: 36, forecast: null },
      { month: 'Apr', historical: 15, forecast: null },
      { month: 'May', historical: null, forecast: 36 },
      { month: 'Jun', historical: null, forecast: 36 },
      { month: 'Jul', historical: null, forecast: 36 },
      { month: 'Aug', historical: null, forecast: 36 },
      { month: 'Sep', historical: null, forecast: 36 },
      { month: 'Oct', historical: null, forecast: 36 }
    ]
  },
  'PT35': {
    title: 'Z Fold 4 Screen Protector', cost: 15, globalBase: '6 Months', type: 'Accessories', risk: 'Extreme High Turnover',
    insightToBe: 'Predictive algorithm correctly applies 6 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '6,000', nextWave: 'Q1',
    data: [
      { month: 'Jan', historical: 28, forecast: null },
      { month: 'Feb', historical: 24, forecast: null },
      { month: 'Mar', historical: 72, forecast: null, outlier: true },
      { month: 'Apr', historical: 27, forecast: null },
      { month: 'May', historical: null, forecast: 27 },
      { month: 'Jun', historical: null, forecast: 26 },
      { month: 'Jul', historical: null, forecast: 24 },
      { month: 'Aug', historical: null, forecast: 27 },
      { month: 'Sep', historical: null, forecast: 28 },
      { month: 'Oct', historical: null, forecast: 26 }
    ],
    asIsData: [
      { month: 'Jan', historical: 28, forecast: null },
      { month: 'Feb', historical: 24, forecast: null },
      { month: 'Mar', historical: 72, forecast: null },
      { month: 'Apr', historical: 27, forecast: null },
      { month: 'May', historical: null, forecast: 72 },
      { month: 'Jun', historical: null, forecast: 72 },
      { month: 'Jul', historical: null, forecast: 72 },
      { month: 'Aug', historical: null, forecast: 72 },
      { month: 'Sep', historical: null, forecast: 72 },
      { month: 'Oct', historical: null, forecast: 72 }
    ]
  },
  'PT36': {
    title: 'Galaxy Watch 6 Battery', cost: 20, globalBase: '24 Months', type: 'Batteries', risk: 'Steady MTBF Baseline',
    insightToBe: 'Predictive algorithm correctly applies 24 Months MTBF smoothing to incoming request waves.',
    insightAsIs: 'Standard algorithms interpret short term volume surges linearly, failing to map the engineering baseline.',
    globalInventory: '4,000', nextWave: 'Q4',
    data: [
      { month: 'Jan', historical: 18, forecast: null },
      { month: 'Feb', historical: 22, forecast: null },
      { month: 'Mar', historical: 54, forecast: null, outlier: true },
      { month: 'Apr', historical: 18, forecast: null },
      { month: 'May', historical: null, forecast: 18 },
      { month: 'Jun', historical: null, forecast: 22 },
      { month: 'Jul', historical: null, forecast: 19 },
      { month: 'Aug', historical: null, forecast: 19 },
      { month: 'Sep', historical: null, forecast: 20 },
      { month: 'Oct', historical: null, forecast: 19 }
    ],
    asIsData: [
      { month: 'Jan', historical: 18, forecast: null },
      { month: 'Feb', historical: 22, forecast: null },
      { month: 'Mar', historical: 54, forecast: null },
      { month: 'Apr', historical: 18, forecast: null },
      { month: 'May', historical: null, forecast: 54 },
      { month: 'Jun', historical: null, forecast: 54 },
      { month: 'Jul', historical: null, forecast: 54 },
      { month: 'Aug', historical: null, forecast: 54 },
      { month: 'Sep', historical: null, forecast: 54 },
      { month: 'Oct', historical: null, forecast: 54 }
    ]
  },

  'PT10': {
    title: 'A54 Battery', cost: 35, globalBase: '14 Months', type: 'Batteries', risk: 'MTBF Driven, High Turn',
    insightToBe: 'AI correctly identifies March anomaly as a corporate replacement drive, reverting baseline. Flags impending MTBF wave.',
    insightAsIs: 'Legacy moving averages interpret the March anomalous spike as permanent growth, risking massive dead stock.',
    globalInventory: '14,200', nextWave: 'Q3',
    data: [
      { month: 'Jan', historical: 40, forecast: null },
      { month: 'Feb', historical: 45, forecast: null },
      { month: 'Mar', historical: 120, forecast: null, outlier: true },
      { month: 'Apr', historical: 55, forecast: null },
      { month: 'May', historical: 60, forecast: 60 },
      { month: 'Jun', historical: null, forecast: 65 },
      { month: 'Jul', historical: null, forecast: 40 },
      { month: 'Aug', historical: null, forecast: 30 },
      { month: 'Sep', historical: null, forecast: 25 },
      { month: 'Oct', historical: null, forecast: 22 }
    ],
    asIsData: [
      { month: 'Jan', historical: 40, forecast: null },
      { month: 'Feb', historical: 45, forecast: null },
      { month: 'Mar', historical: 120, forecast: null }, 
      { month: 'Apr', historical: 55, forecast: null },
      { month: 'May', historical: 60, forecast: 60 },
      { month: 'Jun', historical: null, forecast: 90 },
      { month: 'Jul', historical: null, forecast: 85 }, 
      { month: 'Aug', historical: null, forecast: 85 },
      { month: 'Sep', historical: null, forecast: 85 },
      { month: 'Oct', historical: null, forecast: 85 }
    ]
  },
  'PT01': {
    title: 'S24U OLED Display', cost: 280, globalBase: '28 Months', type: 'Displays', risk: 'High Cost, Low Volume',
    insightToBe: 'Flagged upcoming high-stress failure period in August. Actively buffering Tier 1 nodes defensively against SLA loss.',
    insightAsIs: 'Constant flatline historical mapping. Fails entirely to understand the device aging curve resulting in massive Q3 stockouts.',
    globalInventory: '2,840', nextWave: 'Aug',
    data: [
      { month: 'Jan', historical: 8, forecast: null },
      { month: 'Feb', historical: 10, forecast: null },
      { month: 'Mar', historical: 12, forecast: null },
      { month: 'Apr', historical: 15, forecast: null },
      { month: 'May', historical: 14, forecast: 14 },
      { month: 'Jun', historical: null, forecast: 18 },
      { month: 'Jul', historical: null, forecast: 35 },
      { month: 'Aug', historical: null, forecast: 55 }, // High failure zone
      { month: 'Sep', historical: null, forecast: 25 },
      { month: 'Oct', historical: null, forecast: 15 }
    ],
    asIsData: [
      { month: 'Jan', historical: 8, forecast: null },
      { month: 'Feb', historical: 10, forecast: null },
      { month: 'Mar', historical: 12, forecast: null },
      { month: 'Apr', historical: 15, forecast: null },
      { month: 'May', historical: 14, forecast: 14 },
      { month: 'Jun', historical: null, forecast: 14 },
      { month: 'Jul', historical: null, forecast: 14 },
      { month: 'Aug', historical: null, forecast: 14 },
      { month: 'Sep', historical: null, forecast: 14 },
      { month: 'Oct', historical: null, forecast: 14 }
    ]
  },
  'PT08': {
    title: 'S24 Charging Port', cost: 45, globalBase: '18 Months', type: 'Charging Ports', risk: 'Chronic Shortage Risk',
    insightToBe: 'Identifying a seasonal anomaly matching summer humidity factors. Bypassing rigid logic to over-index coastal nodes.',
    insightAsIs: 'Standard algorithms fail to interpret seasonal or geographical data mapping, consistently under-ordering.',
    globalInventory: '8,400', nextWave: 'May',
    data: [
      { month: 'Jan', historical: 14, forecast: null },
      { month: 'Feb', historical: 15, forecast: null },
      { month: 'Mar', historical: 18, forecast: null },
      { month: 'Apr', historical: 25, forecast: null },
      { month: 'May', historical: 35, forecast: 35 }, // summer spike
      { month: 'Jun', historical: null, forecast: 40 },
      { month: 'Jul', historical: null, forecast: 42 },
      { month: 'Aug', historical: null, forecast: 20 },
      { month: 'Sep', historical: null, forecast: 15 },
      { month: 'Oct', historical: null, forecast: 15 }
    ],
    asIsData: [
      { month: 'Jan', historical: 14, forecast: null },
      { month: 'Feb', historical: 15, forecast: null },
      { month: 'Mar', historical: 18, forecast: null },
      { month: 'Apr', historical: 25, forecast: null },
      { month: 'May', historical: 35, forecast: 35 },
      { month: 'Jun', historical: null, forecast: 25 },
      { month: 'Jul', historical: null, forecast: 25 },
      { month: 'Aug', historical: null, forecast: 25 },
      { month: 'Sep', historical: null, forecast: 25 },
      { month: 'Oct', historical: null, forecast: 25 }
    ]
  },
  'PT19': {
    title: 'M34 Back Panel', cost: 25, globalBase: '48 Months', type: 'Back Panels', risk: 'Severe Dead Stock',
    insightToBe: 'Long life cycle recognized. Immediate PO halt applied while liquidating existing network oversupply.',
    insightAsIs: 'Continues compounding inventory due to false minimum requirement logic ignoring massive 48 month span.',
    globalInventory: '19,500', nextWave: '2028',
    data: [
      { month: 'Jan', historical: 60, forecast: null },
      { month: 'Feb', historical: 55, forecast: null },
      { month: 'Mar', historical: 40, forecast: null },
      { month: 'Apr', historical: 25, forecast: null },
      { month: 'May', historical: 10, forecast: 10 },
      { month: 'Jun', historical: null, forecast: 0 },
      { month: 'Jul', historical: null, forecast: 0 },
      { month: 'Aug', historical: null, forecast: 0 },
      { month: 'Sep', historical: null, forecast: 0 },
      { month: 'Oct', historical: null, forecast: 0 }
    ],
    asIsData: [
      { month: 'Jan', historical: 60, forecast: null },
      { month: 'Feb', historical: 55, forecast: null },
      { month: 'Mar', historical: 40, forecast: null },
      { month: 'Apr', historical: 25, forecast: null },
      { month: 'May', historical: 10, forecast: 10 },
      { month: 'Jun', historical: null, forecast: 30 },
      { month: 'Jul', historical: null, forecast: 30 },
      { month: 'Aug', historical: null, forecast: 30 },
      { month: 'Sep', historical: null, forecast: 30 },
      { month: 'Oct', historical: null, forecast: 30 }
    ]
  }
};

export const scopeDetails = {
  models: ['Galaxy S24 Ultra', 'Galaxy S24', 'Galaxy A54', 'Galaxy A34', 'Galaxy M34'],
  parts: [
    { type: 'Displays', examples: 'S24U OLED, A54 Screen', trait: 'High Cost, Low Volume' },
    { type: 'Batteries', examples: 'A54 Batt, M34 Batt', trait: 'MTBF Driven, High Turn' },
    { type: 'Charging Ports', examples: 'S24 Port', trait: 'Chronic Shortage Risk' },
    { type: 'Back Panels', examples: 'M34 Panel', trait: 'Dead Stock Risk' }
  ],
  dataPoints: [
    { label: 'Repair History', value: '18 Months', desc: 'Jan 2024 - Jun 2025 logs' },
    { label: 'Reservations', value: '6 Months', desc: 'Jan 2025 - Jun 2025 pipeline' },
    { label: 'Data Rows', value: '1,800+', desc: 'Deterministic failure patterns' }
  ]
};

export const inventoryData = {
  AS_IS: {
    'P-045': [
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '12m', fleetSize: 850, stock: 180, cost: 25, threshold: '20', action: 'None', alert: 'Severe Dead Stock', alertType: 'warning', insight: 'Stock covers 1,300+ days of demand. Capital is trapped.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15, cost: 35, threshold: '15', action: 'None', alert: 'Normal', alertType: 'success', insight: 'Stock matches static rules. System sees no issues.' },
    ],
    'P-092': [
      { part: 'PT08 - Charging Port', model: 'Galaxy S24', mtbf: '18m', fleetAge: '20m', fleetSize: 920, stock: 3, cost: 45, threshold: '10', action: 'Emergency PO', alert: 'Chronic Shortage', alertType: 'danger', insight: 'Burning 7-12 units/mo. Always reacting after stockouts.' },
    ],
    'P-142': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 640, stock: 0, cost: 280, threshold: '15', action: 'Wait for PO', alert: 'Stockout Crisis', alertType: 'danger', insight: '14 open reservations. 0 parts in stock. Immediate SLA failure.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12, cost: 35, threshold: '15', action: 'Standard PO', alert: 'Approaching Stockout', alertType: 'warning', insight: 'Fleet is hitting 2nd failure cycle. Static PO will be insufficient.' },
    ],
    'P-187': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 310, stock: 4, cost: 280, threshold: '12', action: 'Wait for PO', alert: 'Low Stock', alertType: 'warning', insight: 'Silver SLA partner. System blindly holding parts here.' },
    ],
    'P-210': [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8, cost: 35, threshold: '15', action: 'Standard PO', alert: 'Approaching Stockout', alertType: 'warning', insight: 'Stock below threshold. 1120 devices are well past the 2nd failure cycle (28m).' },
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '31m', fleetSize: 960, stock: 0, cost: 25, threshold: '5', action: 'None', alert: 'Stockout', alertType: 'danger', insight: 'Zero stock. Local demand rising but hidden by static threshold.' }
    ],
    'P-301': [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '22m', fleetSize: 840, stock: 12, cost: 35, threshold: '15', action: 'None', alert: 'Normal', alertType: 'success', insight: 'Stock matches static rules.' }
    ],
    'P-404': [
      { part: 'PT32 - Camera Module', model: 'Galaxy A54', mtbf: '36m', fleetAge: '34m', fleetSize: 620, stock: 5, cost: 65, threshold: '8', action: 'Emergency PO', alert: 'Low Stock', alertType: 'warning', insight: 'Standard rules only order when below 8 units.' }
    ]
  },
  TO_BE: {
    'P-045': [
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '12m', fleetSize: 850, stock: 180, cost: 25, threshold: '2 (Dyn)', action: 'Auto-Transfer to Dallas', alert: 'Rebalancing', alertType: 'success', insight: 'AI flagged idle capital. Auto-drafted transfer of 50 units to Dallas.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15, cost: 35, threshold: '12 (Dyn)', action: 'Optimized', alert: 'Healthy Buffer', alertType: 'success', insight: 'Fleet age is young. MTBF wave is 4 months away. Stock maintained.' },
    ],
    'P-092': [
      { part: 'PT08 - Charging Port', model: 'Galaxy S24', mtbf: '18m', fleetAge: '20m', fleetSize: 920, stock: 15, cost: 45, threshold: '22 (Dyn)', action: 'Proactive PO Triggered', alert: 'Matching Burn Rate', alertType: 'success', insight: 'Threshold adjusted to match actual consumption (12/mo). Shortages eliminated.' },
    ],
    'P-142': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 640, stock: 0, cost: 280, threshold: '35 (Dyn)', action: 'Priority Allocation', alert: 'Crisis Intercepted', alertType: 'success', insight: 'AI rerouted customer to Store #187 while triggering emergency inbound stock.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12, cost: 35, threshold: '42 (Dyn)', action: 'Wave Pre-order', alert: '2nd Cycle Wave Predicted', alertType: 'success', insight: '28m fleet age ÷ 14m MTBF = 2nd failure wave. Ordered 42 units pre-emptively.' },
    ],
    'P-187': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 310, stock: 4, cost: 280, threshold: '18 (Dyn)', action: 'Allocation Deferred', alert: 'Redirect Executed', alertType: 'success', insight: 'Store successfully fulfilled redirect from Chicago #142 to save SLA.' },
    ],
    'P-210': [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8, cost: 35, threshold: '38 (Dyn)', action: 'Partial Allocation', alert: 'Conflict Managed', alertType: 'success', insight: 'Shared limited warehouse stock with Chicago. Dallas received 9 units based on Gold SLA.' },
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '31m', fleetSize: 960, stock: 50, cost: 25, threshold: '15 (Dyn)', action: 'Inbound Transfer', alert: 'Rebalanced from NY', alertType: 'success', insight: 'AI intercepted dead stock from New York and rerouted 50 units here. Cost: $0 net new.' }
    ],
    'P-301': [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '22m', fleetSize: 840, stock: 12, cost: 35, threshold: '24 (Dyn)', action: 'Priority Order', alert: 'Healthy Buffer', alertType: 'success', insight: 'Install base aging rapidly toward 2nd MTBF cycle. Proactive buffering active.' }
    ],
    'P-404': [
      { part: 'PT32 - Camera Module', model: 'Galaxy A54', mtbf: '36m', fleetAge: '34m', fleetSize: 620, stock: 5, cost: 65, threshold: '18 (Dyn)', action: 'Wave PO', alert: 'Impending Failure Wave', alertType: 'success', insight: 'High turnover predicted. AI auto-indexed inventory ahead of regional demand spike.' }
    ]
  }
};

export const storeHealthData = (() => {
  const regions = ['Northeast', 'Midwest', 'South', 'West'];
  const pList = ['Partner A', 'Partner B', 'Samsung Branded'];
  const data = [];
  for(let i=1; i<=22; i++) {
    const sStock = Math.floor(Math.random() * 25);
    const sSafe = Math.floor(Math.random() * 10) + 5;
    const bStock = Math.floor(Math.random() * 40);
    const bSafe = Math.floor(Math.random() * 15) + 5;
    const lStock = Math.floor(Math.random() * 10);
    const lSafe = Math.floor(Math.random() * 4) + 2;
    
    let status = 'Healthy';
    if(sStock === 0 || bStock === 0 || lStock === 0 || sStock < sSafe*0.5 || bStock < bSafe*0.5) status = 'Critical';
    else if (sStock < sSafe || bStock < bSafe || lStock < lSafe) status = 'At Risk';

    data.push({
      id: `Store #${100 + i*7}`,
      partner: pList[i%3],
      location: `City ${i}, ${regions[i%4]}`,
      region: regions[i%4],
      screen: { stock: sStock, safe: sSafe },
      battery: { stock: bStock, safe: bSafe },
      logic: { stock: lStock, safe: lSafe },
      status
    });
  }
  data[0] = { ...data[0], id: 'Store #142', location: 'Chicago, IL', region: 'Midwest', screen: {stock: 0, safe: 5}, status: 'Critical' };
  data[1] = { ...data[1], id: 'Store #045', location: 'New York, NY', region: 'Northeast', screen: {stock: 2, safe: 8}, status: 'Critical' };
  data[2] = { ...data[2], id: 'Store #187', location: 'Naperville, IL', region: 'Midwest', screen: {stock: 14, safe: 4}, status: 'Healthy' };
  return data.sort((a,b) => (a.status === 'Critical' ? -1 : 1));
})();

export const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
