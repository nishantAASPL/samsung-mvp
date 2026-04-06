import React, { useState, useEffect } from 'react';
import { 
  Search, CheckCircle2, AlertTriangle, XCircle, ChevronDown, 
  MapPin, Clock, Box, TrendingUp, TrendingDown, ArrowRight, 
  Info, BrainCircuit, PackageX, Factory, ServerCog, 
  Banknote, RefreshCw, Target, Database, CalendarDays, Users, 
  BarChart3, Repeat, Zap, Map, LineChart, ArrowLeftRight, 
  CheckSquare, ShieldCheck, Loader2, User, Wrench, Calculator, 
  Cpu, Network, Equal, X, Smartphone, SmartphoneNfc, BookOpen, 
  Activity, List, Phone
} from 'lucide-react';

// --- MOCK DATA (US CONTEXT) ---
const oemMetrics = {
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
      { id: 'S-045', name: 'Store #045 - New York', ftfr: 54 },
      { id: 'S-092', name: 'Store #092 - Los Angeles', ftfr: 48 },
      { id: 'S-142', name: 'Store #142 - Chicago', ftfr: 41 },
      { id: 'S-187', name: 'Store #187 - Naperville', ftfr: 59 },
      { id: 'S-210', name: 'Store #210 - Dallas', ftfr: 58 }
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
      { id: 'S-045', name: 'Store #045 - New York', ftfr: 82 },
      { id: 'S-092', name: 'Store #092 - Los Angeles', ftfr: 76 },
      { id: 'S-142', name: 'Store #142 - Chicago', ftfr: 88 },
      { id: 'S-187', name: 'Store #187 - Naperville', ftfr: 71 },
      { id: 'S-210', name: 'Store #210 - Dallas', ftfr: 75 }
    ]
  }
};

const oemRequests = {
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

const partners = [
  { id: 'S-045', name: 'Store #045 - New York', region: 'Northeast', tier: 'Gold', backlog: 42, score: '91%' },
  { id: 'S-092', name: 'Store #092 - Los Angeles', region: 'West', tier: 'Platinum', backlog: 45, score: '94%' },
  { id: 'S-142', name: 'Store #142 - Chicago', region: 'Midwest', tier: 'Platinum', backlog: 124, score: '88%' },
  { id: 'S-187', name: 'Store #187 - Naperville', region: 'Midwest', tier: 'Silver', backlog: 27, score: '82%' },
  { id: 'S-210', name: 'Store #210 - Dallas', region: 'South', tier: 'Gold', backlog: 56, score: '89%' }
];

const scopeDetails = {
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

const inventoryData = {
  AS_IS: {
    'S-045': [
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '12m', fleetSize: 850, stock: 180, cost: 25, threshold: '20', action: 'None', alert: 'Severe Dead Stock', alertType: 'warning', insight: 'Stock covers 1,300+ days of demand. Capital is trapped.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15, cost: 35, threshold: '15', action: 'None', alert: 'Normal', alertType: 'success', insight: 'Stock matches static rules. System sees no issues.' },
    ],
    'S-092': [
      { part: 'PT08 - Charging Port', model: 'Galaxy S24', mtbf: '18m', fleetAge: '20m', fleetSize: 920, stock: 3, cost: 45, threshold: '10', action: 'Emergency PO', alert: 'Chronic Shortage', alertType: 'danger', insight: 'Burning 7-12 units/mo. Always reacting after stockouts.' },
    ],
    'S-142': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 640, stock: 0, cost: 280, threshold: '15', action: 'Wait for PO', alert: 'Stockout Crisis', alertType: 'danger', insight: '14 open reservations. 0 parts in stock. Immediate SLA failure.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12, cost: 35, threshold: '15', action: 'Standard PO', alert: 'Approaching Stockout', alertType: 'warning', insight: 'Fleet is hitting 2nd failure cycle. Static PO will be insufficient.' },
    ],
    'S-187': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 310, stock: 4, cost: 280, threshold: '12', action: 'Wait for PO', alert: 'Low Stock', alertType: 'warning', insight: 'Silver SLA partner. System blindly holding parts here.' },
    ],
    'S-210': [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8, cost: 35, threshold: '15', action: 'Standard PO', alert: 'Approaching Stockout', alertType: 'warning', insight: 'Stock below threshold. 1120 devices are well past the 2nd failure cycle (28m).' },
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '31m', fleetSize: 960, stock: 0, cost: 25, threshold: '5', action: 'None', alert: 'Stockout', alertType: 'danger', insight: 'Zero stock. Local demand rising but hidden by static threshold.' }
    ]
  },
  TO_BE: {
    'S-045': [
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '12m', fleetSize: 850, stock: 180, cost: 25, threshold: '2 (Dyn)', action: 'Auto-Transfer to Dallas', alert: 'Rebalancing', alertType: 'success', insight: 'AI flagged idle capital. Auto-drafted transfer of 50 units to Dallas.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15, cost: 35, threshold: '12 (Dyn)', action: 'Optimized', alert: 'Healthy Buffer', alertType: 'success', insight: 'Fleet age is young. MTBF wave is 4 months away. Stock maintained.' },
    ],
    'S-092': [
      { part: 'PT08 - Charging Port', model: 'Galaxy S24', mtbf: '18m', fleetAge: '20m', fleetSize: 920, stock: 15, cost: 45, threshold: '22 (Dyn)', action: 'Proactive PO Triggered', alert: 'Matching Burn Rate', alertType: 'success', insight: 'Threshold adjusted to match actual consumption (12/mo). Shortages eliminated.' },
    ],
    'S-142': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 640, stock: 0, cost: 280, threshold: '35 (Dyn)', action: 'Priority Allocation', alert: 'Crisis Intercepted', alertType: 'success', insight: 'AI rerouted customer to Store #187 while triggering emergency inbound stock.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12, cost: 35, threshold: '42 (Dyn)', action: 'Wave Pre-order', alert: '2nd Cycle Wave Predicted', alertType: 'success', insight: '28m fleet age ÷ 14m MTBF = 2nd failure wave. Ordered 42 units pre-emptively.' },
    ],
    'S-187': [
      { part: 'PT01 - OLED Display', model: 'S24 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 310, stock: 4, cost: 280, threshold: '18 (Dyn)', action: 'Allocation Deferred', alert: 'Redirect Executed', alertType: 'success', insight: 'Store successfully fulfilled redirect from Chicago #142 to save SLA.' },
    ],
    'S-210': [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8, cost: 35, threshold: '38 (Dyn)', action: 'Partial Allocation', alert: 'Conflict Managed', alertType: 'success', insight: 'Shared limited warehouse stock with Chicago. Dallas received 9 units based on Gold SLA.' },
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '31m', fleetSize: 960, stock: 50, cost: 25, threshold: '15 (Dyn)', action: 'Inbound Transfer', alert: 'Rebalanced from NY', alertType: 'success', insight: 'AI intercepted dead stock from New York and rerouted 50 units here. Cost: $0 net new.' }
    ]
  }
};

const storeHealthData = (() => {
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

const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

export default function App() {
  const [model, setModel] = useState('TO_BE');
  const [view, setView] = useState('VIEW_QUEUE'); 
  const [selectedPartner, setSelectedPartner] = useState('S-142');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // States for specific views
  const [activeReqId, setActiveReqId] = useState(oemRequests['TO_BE'][0].id);
  const [reqFilter, setReqFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);
  const [simState, setSimState] = useState('IDLE');
  const [contextOpen, setContextOpen] = useState(false);

  const handleModelToggle = (newModel) => {
    if (newModel === model) return;
    setIsTransitioning(true);
    setSimState('IDLE'); 
    setTimeout(() => {
      setModel(newModel);
      setActiveReqId(oemRequests[newModel][0].id);
      setIsTransitioning(false);
    }, 400); 
  };

  const runSimulation = () => {
    setSimState('STEP_1');
    setTimeout(() => setSimState('STEP_2'), 1200);
    setTimeout(() => setSimState('STEP_3'), 2400);
    setTimeout(() => setSimState('DONE'), 3600);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentMetrics = oemMetrics[model];
  const currentInventory = inventoryData[model]?.[selectedPartner] || [];
  const partnerInfo = partners.find(p => p.id === selectedPartner) || partners[0];
  const currentReqs = oemRequests[model];
  const activeReq = currentReqs.find(r => r.id === activeReqId) || currentReqs[0];
  const qStats = currentMetrics.queueStats;

  // =========================================
  // VIEW RENDERERS
  // =========================================

  const renderViewScope = () => (
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
          <div className="flex items-center gap-2"><Users size={18} className="text-[#1428A0]"/><h4 className="font-bold text-sm">5 Network Partners</h4></div>
          <div className="space-y-1">
            {partners.map(p => (
              <div key={p.id} className="flex justify-between items-center text-xs p-1.5">
                <span className="font-semibold text-gray-700">{p.name.split('-')[1].trim()}</span>
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

  const renderViewEngine = () => (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-xs font-bold uppercase tracking-widest mb-2">
            <Cpu size={14} /> The Intelligence Layer
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">How the AI Forecasts Demand</h2>
          <p className="text-sm text-gray-600">The platform abandons static reorder points. Instead, it calculates expected demand by mapping a region's active device fleet against engineering failure curves.</p>
        </div>
      </div>

      <div className="bg-[#1428A0] p-8 rounded-lg shadow-sm text-white relative">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-blue-200 flex items-center gap-2 relative z-10"><Calculator size={16} /> The Visual Equation</h3>
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
              <span className="text-sm font-bold">Age: 28m</span><span className="text-lg text-blue-300">/</span><span className="text-sm font-bold">MTBF: 14m</span>
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

      <div className="pt-4">
        <h3 className="text-lg font-bold text-[#1F2937] flex items-center gap-2 mb-4"><Network className="text-[#1428A0]" size={20}/> The Analytics Pipeline</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-5 rounded-lg border border-[#E5E7EB] bg-white shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-[#EBF0FA] text-[#1428A0]"><Smartphone size={20}/></div>
            <h4 className="font-bold text-sm mb-1">1. Device Telemetry</h4>
            <p className="text-xs text-gray-500">Isolates active install base in territory (e.g., 1,120 devices).</p>
          </div>
          <div className="p-5 rounded-lg border border-[#E5E7EB] bg-white shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-[#EBF0FA] text-[#1428A0]"><Wrench size={20}/></div>
            <h4 className="font-bold text-sm mb-1">2. Component Specs</h4>
            <p className="text-xs text-gray-500">Retrieves engineering failure rate (MTBF) for component.</p>
          </div>
          <div className="p-5 rounded-lg border border-[#E5E7EB] bg-white shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-[#EBF0FA] text-[#1428A0]"><BrainCircuit size={20}/></div>
            <h4 className="font-bold text-sm mb-1">3. Weibull Calculation</h4>
            <p className="text-xs text-gray-500">Cross-references age against MTBF to locate fleet on curve.</p>
          </div>
          <div className="p-5 rounded-lg border border-[#1428A0] bg-[#EBF0FA] shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-[#1428A0] text-white"><Factory size={20}/></div>
            <h4 className="font-bold text-[#1428A0] mb-1">4. Pre-Emptive Action</h4>
            <p className="text-xs text-[#1E3A8A]">Replaces static threshold with dynamic quantity. Triggers PO 30d early.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewQueue = () => {
    const filteredReqs = currentReqs.filter(r => {
      if (reqFilter === 'Ready') return r.status === 'GREEN';
      if (reqFilter === 'Needs Action') return r.status !== 'GREEN';
      return true;
    });

    return (
      <div className="flex flex-col h-full overflow-hidden bg-[#F9FAFB] space-y-4 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
        <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-3 flex-shrink-0">
          <div><h2 className="text-2xl font-bold text-[#1F2937]">Reservation Queue</h2><p className="text-gray-500 text-xs">Real-time triage of incoming customer repair requests.</p></div>
        </div>

        {/* Stats Bar */}
        <div className="bg-[#EBF0FA] px-6 py-4 flex justify-between border border-blue-100 rounded-lg flex-shrink-0 shadow-sm transition-all duration-300">
          <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Today's Requests</span><span className="text-2xl font-black text-[#1F2937]">{qStats.total}</span></div>
          <div className="w-px bg-blue-200"></div>
          <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Approved</span><span className="text-2xl font-black text-[#059669]">{qStats.approved}</span></div>
          <div className="w-px bg-blue-200"></div>
          <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Redirected</span><span className="text-2xl font-black text-[#D97706]">{qStats.redirected}</span></div>
          <div className="w-px bg-blue-200"></div>
          <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Pending Restock</span><span className="text-2xl font-black text-[#DC2626]">{qStats.pending}</span></div>
          <div className="w-px bg-blue-200"></div>
          <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">First-Time Fix Rate</span><span className="text-2xl font-black text-[#1428A0]">{qStats.ftfr}</span></div>
        </div>

        <div className="flex gap-4 flex-1 overflow-hidden">
          
          {/* Left Panel: Request List */}
          <div className="w-2/5 bg-white border border-[#E5E7EB] rounded-lg shadow-sm flex flex-col overflow-hidden">
            <div className="p-3 border-b border-[#E5E7EB] flex gap-2 bg-gray-50 flex-shrink-0">
              {['All', 'Ready', 'Needs Action'].map(f => (
                <button key={f} onClick={() => setReqFilter(f)} className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider border ${reqFilter === f ? 'bg-[#1428A0] text-white border-[#1428A0]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                  {f} {f === 'All' ? `(${qStats.total})` : f === 'Ready' ? `(${qStats.approved})` : `(${qStats.total - qStats.approved})`}
                </button>
              ))}
            </div>
            <div className="overflow-y-auto flex-1 p-3 space-y-2">
              {filteredReqs.map(req => {
                const bColor = req.status === 'GREEN' ? '#059669' : req.status === 'AMBER' ? '#D97706' : '#DC2626';
                return (
                  <div 
                    key={req.id} 
                    onClick={() => setActiveReqId(req.id)}
                    className={`p-3 border rounded cursor-pointer transition-colors ${activeReqId === req.id ? 'bg-[#EBF0FA] border-blue-200' : 'bg-white border-[#E5E7EB] hover:bg-gray-50'}`}
                    style={{ borderLeftWidth: '4px', borderLeftColor: bColor }}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className={`font-bold text-xs ${activeReqId === req.id ? 'text-[#1428A0]' : 'text-gray-800'}`}>{req.id}</span>
                      <span className="text-[10px] font-bold text-gray-400">{req.time}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 truncate">{req.device} • {req.part}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} className="text-gray-400"/> {req.store}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Panel: Request Details */}
          <div className="w-3/5 bg-white border border-[#E5E7EB] rounded-lg shadow-sm flex flex-col overflow-y-auto p-6 transition-all duration-300">
            {!activeReq ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium">Select a request to view details</div>
            ) : (
              <div className="space-y-6">
                
                {/* Block 1: Info */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Request Details</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Request ID</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.id}</span></div>
                    <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Preferred Store</span><span className="text-sm font-semibold text-[#1F2937] flex items-center gap-1"><MapPin size={14} className="text-[#1428A0]"/> {activeReq.store}</span></div>
                    <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Customer ID</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.customer}</span></div>
                    <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Part Required</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.part}</span></div>
                    <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Device & Warranty</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.device} <span className="text-xs font-normal text-gray-500">({activeReq.warranty})</span></span></div>
                    <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Reservation Date</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.date}</span></div>
                    <div className="col-span-2 pt-2 border-t border-gray-200"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Issue Reported</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.issue}</span></div>
                  </div>
                </div>

                {/* Block 2: Inventory Check Hero */}
                {activeReq.status === 'GREEN' && (
                  <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-6 rounded-lg flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                    <CheckCircle2 size={32} className="text-[#059669] mb-3" />
                    <h2 className="text-lg font-bold text-[#059669] mb-1">Part Available at Preferred Store</h2>
                    <p className="text-xs text-green-800 font-medium mb-6">Current Stock: 12 units (Safety Threshold: 5)</p>
                    <button onClick={() => showToast("Reservation Approved")} className="bg-[#059669] hover:bg-green-700 text-white font-bold py-2.5 px-8 rounded shadow-sm transition-colors text-sm">Approve Reservation</button>
                    {model === 'TO_BE' && (
                      <p className="text-[10px] text-green-700 font-bold mt-4 flex items-center gap-1"><TrendingUp size={12}/> AI pre-emptively restocked this location to prevent failure wave.</p>
                    )}
                  </div>
                )}

                {activeReq.status === 'AMBER' && model === 'TO_BE' && (
                  <div className="bg-[#FFFBEB] border border-[#FDE68A] p-6 rounded-lg animate-in fade-in zoom-in-95">
                    <div className="flex flex-col items-center text-center mb-6">
                      <AlertTriangle size={32} className="text-[#D97706] mb-3" />
                      <h2 className="text-lg font-bold text-[#D97706] mb-1">Stock-Out at Preferred Store</h2>
                      <p className="text-xs text-amber-800 font-medium">Part is physically unavailable here, but available nearby.</p>
                    </div>
                    <div className="bg-white rounded border border-amber-200 overflow-hidden mb-6">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-amber-50 border-b border-amber-100">
                          <tr><th className="p-2.5 text-amber-900 font-bold">Alternative Store</th><th className="p-2.5 text-amber-900 font-bold">Distance</th><th className="p-2.5 text-amber-900 font-bold text-right">Stock</th></tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100"><td className="p-2.5 font-semibold text-gray-800">Store #187 (Naperville)</td><td className="p-2.5 text-gray-600">8.2 miles</td><td className="p-2.5 font-bold text-[#059669] text-right">4 units</td></tr>
                          <tr><td className="p-2.5 font-semibold text-gray-800">Store #210 (Schaumburg)</td><td className="p-2.5 text-gray-600">14.1 miles</td><td className="p-2.5 font-bold text-[#059669] text-right">11 units</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => showToast("Redirected to Store #187")} className="bg-[#D97706] hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Redirect to Store #187</button>
                      <button onClick={() => showToast("Rescheduled at Preferred")} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Reschedule Wait</button>
                    </div>
                  </div>
                )}

                {activeReq.status === 'AMBER' && model === 'AS_IS' && (
                  <div className="bg-[#FFFBEB] border border-[#FDE68A] p-6 rounded-lg flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                    <AlertTriangle size={32} className="text-[#D97706] mb-3" />
                    <h2 className="text-lg font-bold text-[#D97706] mb-1">Local Stock-Out Detected</h2>
                    <p className="text-xs text-amber-800 font-medium mb-6">Part is physically unavailable at preferred store. No network visibility.</p>
                    
                    <div className="bg-white w-full p-4 rounded border border-amber-200 mb-6 text-center text-sm text-gray-600 flex flex-col items-center">
                      <Phone size={24} className="text-gray-400 mb-2" />
                      Manager must manually call nearby stores to locate inventory before approving or redirecting.
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => showToast("Rescheduled to Wait")} className="bg-[#D97706] hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Reschedule to Apr 10</button>
                    </div>
                  </div>
                )}

                {activeReq.status === 'RED' && (
                  <div className="bg-[#FEF2F2] border border-[#FCA5A5] p-6 rounded-lg flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                    <XCircle size={32} className="text-[#DC2626] mb-3" />
                    <h2 className="text-lg font-bold text-[#DC2626] mb-1">Regional Stock-Out</h2>
                    <p className="text-xs text-red-800 font-medium mb-2">No viable alternatives within 25 miles.</p>
                    <p className="text-[10px] text-red-700 font-bold mb-6 bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider">Incoming supply expected: Apr 9 (5 days)</p>
                    <div className="flex gap-3">
                      <button onClick={() => showToast("Rescheduled to April 10")} className="bg-[#DC2626] hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Reschedule to Apr 10</button>
                      <button onClick={() => showToast("Escalated to Supply Chain")} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Escalate</button>
                    </div>
                  </div>
                )}

                {/* Block 3: Context */}
                <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                  <button onClick={() => setContextOpen(!contextOpen)} className="w-full p-4 font-bold text-[#1428A0] text-sm flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                    Device & Repair Context <ChevronDown size={16} className={`transition-transform ${contextOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {contextOpen && (
                    <div className="p-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-4 text-sm bg-white">
                      <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Device Age</span><span className="font-semibold text-gray-800">{activeReq.age}</span></div>
                      <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Component MTBF</span><span className="font-semibold text-gray-800">{activeReq.mtbf}</span></div>
                      <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Prior Repairs</span><span className="font-semibold text-gray-800">0</span></div>
                      <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Regional Install Base</span><span className="font-semibold text-gray-800">12,450 active units</span></div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderViewSim = () => (
    <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-3">
        <div><h2 className="text-2xl font-bold text-[#1F2937]">Live Intercept Simulation</h2><p className="text-gray-500 text-xs">Simulate a customer booking to see the routing logic in action.</p></div>
        {simState !== 'IDLE' && <button onClick={() => setSimState('IDLE')} className="text-xs font-bold text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-50"><RefreshCw size={12} /> Reset</button>}
      </div>

      <div className="flex gap-4 h-full min-h-[450px]">
        <div className="w-1/3 bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6"><User className="text-[#1428A0]" size={18} /><h3 className="font-bold text-[#1F2937]">Customer Portal</h3></div>
            <div className="space-y-4">
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Name</label><div className="p-2 bg-gray-50 border border-gray-200 rounded text-xs font-semibold">John Doe</div></div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Device</label><div className="p-2 bg-gray-50 border border-gray-200 rounded text-xs font-semibold flex items-center gap-1"><Smartphone size={14} className="text-gray-400"/> Galaxy S24 Ultra</div></div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Issue</label><div className="p-2 bg-gray-50 border border-gray-200 rounded text-xs font-semibold flex items-center gap-1"><Wrench size={14} className="text-gray-400"/> Screen Replacement</div></div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Location</label><div className="p-2 bg-[#EBF0FA] border border-blue-200 rounded text-xs font-bold text-[#1428A0] flex items-center gap-1"><MapPin size={14}/> Store #142 (Chicago)</div></div>
            </div>
          </div>
          <button onClick={runSimulation} disabled={simState !== 'IDLE'} className={`w-full py-3 rounded font-bold text-sm flex justify-center gap-2 shadow-sm ${simState==='IDLE'?'bg-[#1428A0] hover:bg-[#1E3A8A] text-white':'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {simState !== 'IDLE' ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} Submit Request
          </button>
        </div>

        <div className="w-2/3 bg-gray-900 rounded-lg shadow-sm p-8 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2 z-10">
            {model === 'AS_IS' ? <ServerCog size={16} className="text-[#D97706]"/> : <BrainCircuit size={16} className="text-blue-400"/>} {model === 'AS_IS' ? 'AS-IS Logic Engine' : 'TO-BE Logic Engine'}
          </h4>

          {simState === 'IDLE' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 z-10"><Search size={32} strokeWidth={1} className="mb-2 opacity-50" /><p className="text-sm">Waiting for incoming reservation...</p></div>
          ) : (
            <div className="space-y-4 z-10">
              <div className="flex gap-3 items-start animate-in fade-in slide-in-from-left-4"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><CheckCircle2 size={12}/></div><div><p className="font-bold text-white text-sm">Request Intercepted</p><p className="text-xs text-gray-400">Initiating stock validation...</p></div></div>
              
              {model === 'AS_IS' ? (
                <>
                  {(simState === 'STEP_2' || simState === 'STEP_3' || simState === 'DONE') && <div className="flex gap-3 items-start animate-in fade-in"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Database size={12}/></div><div><p className="font-bold text-white text-sm">Warehouse Check</p><p className="text-xs text-gray-400">14 units available in National DC.</p></div></div>}
                  {simState === 'DONE' && (
                    <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg animate-in slide-in-from-bottom-2">
                      <span className="bg-green-500/20 text-green-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mb-2 inline-block">Approved</span>
                      <h3 className="text-sm font-bold text-white mb-1">Confirmed for Store #142</h3>
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded flex gap-2"><AlertTriangle className="text-red-400 flex-shrink-0" size={16}/><div><p className="text-xs font-bold text-red-400 mb-0.5">Blind Spot</p><p className="text-[10px] text-red-300/80">Local stock is 0. SLA Failure guaranteed.</p></div></div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {(simState === 'STEP_2' || simState === 'STEP_3' || simState === 'DONE') && <div className="flex gap-3 items-start animate-in fade-in"><div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400"><XCircle size={12}/></div><div><p className="font-bold text-white text-sm">Local Gate Check</p><p className="text-xs text-gray-400">Store #142 has <strong className="text-red-400">0 units</strong>.</p></div></div>}
                  {(simState === 'STEP_3' || simState === 'DONE') && <div className="flex gap-3 items-start animate-in fade-in"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Map size={12}/></div><div><p className="font-bold text-white text-sm">Proximity Search</p><p className="text-xs text-gray-400">Store #187 (8mi) has 4 units.</p></div></div>}
                  {simState === 'DONE' && (
                    <div className="mt-4 p-4 bg-[#1428A0]/20 border border-[#1428A0]/50 rounded-lg animate-in slide-in-from-bottom-2 shadow-[0_0_15px_rgba(20,40,160,0.3)]">
                      <span className="bg-blue-500/20 text-blue-300 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mb-2 inline-flex items-center gap-1"><ArrowRight size={10}/> Redirected</span>
                      <h3 className="text-sm font-bold text-white mb-1">Rerouted to Store #187</h3>
                      <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded flex gap-2"><ShieldCheck className="text-green-400 flex-shrink-0" size={16}/><div><p className="text-xs font-bold text-green-400 mb-0.5">FTFR Saved</p><p className="text-[10px] text-green-300/80">Repair guaranteed on first visit.</p></div></div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderViewMap = () => (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Network Health Map</h2>
          <p className="text-gray-500 mt-1 text-sm">Identifying stockout risks across 800+ simulated US locations.</p>
        </div>
        <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#059669]"></div> Healthy</span>
          <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#D97706]"></div> Risk</span>
          <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></div> Stockout</span>
          {model === 'TO_BE' && <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#D97706]"></div> Dead Stock</span>}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-[#E5E7EB]">
            <tr>
              <th className="p-3 font-bold text-gray-600">Service Center</th>
              <th className="p-3 font-bold text-gray-600 text-center">S24U Displays</th>
              <th className="p-3 font-bold text-gray-600 text-center">A54 Batteries</th>
              <th className="p-3 font-bold text-gray-600 text-center">S24 Charging Ports</th>
              <th className="p-3 font-bold text-gray-600 text-center">M34 Back Panels</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {storeHealthData.slice(0,10).map((store, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 font-semibold text-gray-800">{store.id} - {store.location}</td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.screen.stock === 0 ? 'bg-[#DC2626]' : store.screen.stock < 5 ? (model === 'AS_IS' ? 'bg-[#D97706]' : 'bg-[#DC2626]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.screen.stock} units</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.battery.stock === 0 ? 'bg-[#DC2626]' : store.battery.stock < 5 ? (model === 'AS_IS' ? 'bg-[#D97706]' : 'bg-[#DC2626]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.battery.stock} units</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.logic.stock === 0 ? 'bg-[#DC2626]' : store.logic.stock < 5 ? (model === 'AS_IS' ? 'bg-[#D97706]' : 'bg-[#DC2626]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.logic.stock} units</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.logic.stock === 0 ? 'bg-[#DC2626]' : store.logic.stock > 10 ? (model === 'AS_IS' ? 'bg-[#059669]' : 'bg-[#D97706]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.logic.stock * 4} units</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {model === 'TO_BE' && (
        <div className="p-3 bg-[#EBF0FA] border border-blue-200 rounded-lg flex items-center gap-3 animate-in slide-in-from-bottom-2">
          <Info className="text-[#1428A0] flex-shrink-0" size={16}/>
          <p className="text-xs text-blue-900"><strong>AI Diagnostic:</strong> The TO-BE model correctly identifies the 180 M34 Panels at New York as severe dead stock (orange), whereas the AS-IS model marks it as healthy (green) because it exceeds the minimum threshold.</p>
        </div>
      )}
    </div>
  );

  const renderViewGap = () => (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Demand vs. Supply Gap</h2>
          <p className="text-gray-500 mt-1 text-sm">Visualizing the forecast variance for Chicago Region (A54 Batteries).</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
            <Database className="text-[#1428A0]" size={16}/> Demographic Drivers
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Active Install Base</p>
              <p className="text-2xl font-black text-gray-800">1,120 <span className="text-xs font-medium text-gray-500">devices</span></p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Average Fleet Age</p>
              <p className="text-2xl font-black text-[#1428A0]">28 <span className="text-xs font-medium text-blue-700">months</span></p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Battery MTBF</p>
              <p className="text-2xl font-black text-gray-800">14 <span className="text-xs font-medium text-gray-500">months</span></p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs font-bold text-gray-700">Conclusion:</p>
              <p className="text-[10px] text-gray-600 mt-1">Age (28) ÷ MTBF (14) = 2.0. The region is entering its second major failure wave.</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border shadow-sm transition-colors duration-500 ${model === 'AS_IS' ? 'bg-white border-[#E5E7EB]' : 'bg-[#1428A0] border-[#1E3A8A] text-white'}`}>
          <h3 className={`font-bold text-sm mb-6 flex items-center gap-2 ${model === 'AS_IS' ? 'text-gray-800' : 'text-white'}`}>
            <BarChart3 className={model === 'AS_IS' ? 'text-[#1428A0]' : 'text-blue-300'} size={16}/> Actionable Gap
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className={`text-xs font-bold ${model === 'AS_IS' ? 'text-gray-600' : 'text-blue-100'}`}>MTBF Forecasted Demand</span>
                <span className="font-black text-sm">42 Units</span>
              </div>
              <div className="w-full h-3 bg-gray-200/20 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${model === 'AS_IS' ? 'bg-gray-400' : 'bg-white'}`} style={{width: '100%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className={`text-xs font-bold ${model === 'AS_IS' ? 'text-gray-600' : 'text-blue-100'}`}>Current Local Stock</span>
                <span className="font-black text-sm">12 Units</span>
              </div>
              <div className="w-full h-3 bg-gray-200/20 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${model === 'AS_IS' ? 'bg-gray-400' : 'bg-white'}`} style={{width: '28%'}}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200/20">
              {model === 'AS_IS' ? (
                <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded">
                  <p className="font-bold text-[#DC2626] text-sm mb-1">Gap: 30 Units (Unaddressed)</p>
                  <p className="text-[10px] text-red-700 font-medium">Static threshold is 15. No further orders placed until stock drops below 15. Stockout guaranteed.</p>
                </div>
              ) : (
                <div className="p-3 bg-[#059669] border border-[#34D399] rounded text-white shadow-sm">
                  <p className="font-bold text-sm mb-1 flex items-center gap-1"><CheckCircle2 size={14}/> Gap Filled: AI Pre-Order</p>
                  <p className="text-[10px] font-medium mt-1 text-green-100">System preemptively ordered 30 units to match the MTBF curve, avoiding the stockout.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewDeepDive = () => (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Component Diagnostics</h2>
          <p className="text-gray-500 mt-1 text-sm">Deep-dive trajectory for selected component at {partnerInfo?.name}.</p>
        </div>
        <div className="px-3 py-1.5 bg-gray-900 text-white rounded text-[10px] font-bold tracking-widest uppercase">
          SKU: {selectedPartner === 'S-142' ? 'S24U-OLED-BLK' : 'GEN-PART-XYZ'}
        </div>
      </div>

      {!currentInventory || currentInventory.length === 0 ? (
         <div className="bg-white p-8 rounded-lg border border-[#E5E7EB] shadow-sm text-center text-gray-500 text-sm">
            No critical flagged components for this location in current view. Select Store #142 (Chicago) or Store #045 (New York) for demonstration.
         </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6">
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="col-span-2">
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Target Component</p>
              <p className="text-lg font-black text-gray-800 leading-tight">{currentInventory[0].part}</p>
              <p className="text-xs font-semibold text-gray-500">{currentInventory[0].model}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Current Stock</p>
              <p className="text-2xl font-black text-gray-800 flex items-end gap-1">{currentInventory[0].stock} <span className={`text-[10px] font-bold mb-1.5 ${currentInventory[0].stock < 5 ? 'text-[#DC2626]' : 'text-gray-400'}`}>({currentInventory[0].stock < 5 ? 'Low' : 'Actual'})</span></p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Safety Threshold</p>
              <p className="text-2xl font-black text-[#1428A0]">{currentInventory[0].threshold}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Incoming PO</p>
              <p className="text-2xl font-black text-gray-800">{model === 'AS_IS' ? '0' : '31'}</p>
            </div>
          </div>

          <div className="relative h-48 w-full flex items-end justify-between border-b border-gray-200 pb-2 px-4 mt-6">
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-gray-400 font-bold -ml-4 pb-2">
              <span>40</span><span>30</span><span>20</span><span>10</span>
            </div>

            <div className={`absolute left-0 w-full h-px border-b border-dashed z-0 transition-all duration-500 ${model === 'AS_IS' ? 'bottom-[37.5%] border-gray-400' : 'bottom-[87.5%] border-[#1428A0]'}`}>
              <span className={`absolute -top-4 right-0 text-[9px] font-bold ${model === 'AS_IS' ? 'text-gray-500' : 'text-[#1428A0]'}`}>
                {model === 'AS_IS' ? 'Static (15)' : 'Dynamic (35)'}
              </span>
            </div>

            {[12, 14, 15, 18, 22, 28, ...(model === 'AS_IS' ? [15, 15, 15, 15] : [35, 42, 28, 20])].map((val, i) => {
              const isForecast = i >= 6;
              const heightPercent = (val / 40) * 100;
              return (
                <div key={i} className="flex flex-col items-center gap-1 relative w-full px-1.5 z-10 group">
                  <div 
                    className={`w-full max-w-[30px] rounded-t-sm transition-all duration-700 flex items-end justify-center pb-1 ${
                      isForecast ? (model === 'AS_IS' ? 'bg-gray-200' : 'bg-blue-100 border-2 border-[#1428A0] border-b-0') : 'bg-gray-800'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <span className={`text-[8px] font-bold ${isForecast && model === 'TO_BE' ? 'text-[#1428A0]' : 'text-white/50 group-hover:text-white/100'}`}>{val}</span>
                  </div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase">{isForecast ? `F${i-5}` : `M${i+1}`}</span>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><div className="w-2.5 h-2.5 bg-gray-800 rounded-sm"></div> Historical</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><div className={`w-2.5 h-2.5 rounded-sm ${model === 'AS_IS' ? 'bg-gray-200' : 'bg-blue-100 border border-[#1428A0]'}`}></div> Forecasted</div>
            </div>
            {model === 'AS_IS' ? (
              <div className="text-[10px] font-bold text-[#DC2626] flex items-center gap-1.5 bg-[#FEF2F2] px-3 py-1.5 rounded"><AlertTriangle size={14}/> Forecast flatlined. Crisis incoming.</div>
            ) : (
              <div className="text-[10px] font-bold text-[#1428A0] flex items-center gap-1.5 bg-[#EBF0FA] px-3 py-1.5 rounded"><TrendingUp size={14}/> {currentInventory[0].insight}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderViewScorecard = () => (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 flex flex-col justify-center min-h-full pb-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF0FA] text-[#1428A0] rounded text-[10px] font-bold uppercase tracking-widest mx-auto">
          <Target size={12} /> ROI Summary
        </div>
        <h2 className="text-4xl font-bold text-[#1F2937] tracking-tight">The Impact Scorecard</h2>
        <p className="text-sm text-gray-500">Comparing current US operational reality against projected MTBF-engine performance.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">First-Time Fix Rate</p>
            <div className="text-4xl font-black text-gray-400 line-through decoration-[#DC2626] decoration-2">{oemMetrics.AS_IS.ftfr}%</div>
            <p className="text-[10px] text-gray-500 mt-1">Current Baseline</p>
          </div>
          <div className="px-4 text-gray-300"><ArrowRight size={32} strokeWidth={1} /></div>
          <div className="flex-1 text-right">
            <p className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1 invisible">Target</p>
            <div className="text-5xl font-black text-[#1428A0]">{oemMetrics.TO_BE.ftfr}%</div>
            <p className="text-[10px] font-bold text-[#059669] mt-1 bg-[#ECFDF5] inline-block px-1.5 py-0.5 rounded">+26% Lift Expected</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Annual Reschedules</p>
            <div className="text-4xl font-black text-gray-400 line-through decoration-[#DC2626] decoration-2">1,240</div>
            <p className="text-[10px] text-gray-500 mt-1">Current Baseline</p>
          </div>
          <div className="px-4 text-gray-300"><ArrowRight size={32} strokeWidth={1} /></div>
          <div className="flex-1 text-right">
            <p className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1 invisible">Target</p>
            <div className="text-5xl font-black text-[#1428A0]">0</div>
            <p className="text-[10px] font-bold text-[#059669] mt-1 bg-[#ECFDF5] inline-block px-1.5 py-0.5 rounded">Gate Intercepted</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dead Stock Capital</p>
            <div className="text-3xl font-black text-gray-400 line-through decoration-[#DC2626] decoration-2">$245K</div>
            <p className="text-[10px] text-gray-500 mt-1">Trapped Across Network</p>
          </div>
          <div className="px-4 text-gray-300"><ArrowRight size={32} strokeWidth={1} /></div>
          <div className="flex-1 text-right">
            <p className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1 invisible">Target</p>
            <div className="text-4xl font-black text-[#1428A0]">$42K</div>
            <p className="text-[10px] font-bold text-[#059669] mt-1 bg-[#ECFDF5] inline-block px-1.5 py-0.5 rounded">Rebalanced by AI</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Scarcity Conflicts</p>
            <div className="text-2xl font-black text-gray-400">Phone Calls</div>
            <p className="text-[10px] text-gray-500 mt-1">Subjective Manager Choice</p>
          </div>
          <div className="px-4 text-gray-300"><ArrowRight size={32} strokeWidth={1} /></div>
          <div className="flex-1 text-right">
            <p className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1 invisible">Target</p>
            <div className="text-2xl font-black text-[#1428A0]">Math & SLA</div>
            <p className="text-[10px] font-bold text-[#059669] mt-1 bg-[#ECFDF5] inline-block px-1.5 py-0.5 rounded">Automated Routing</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewOEM = () => (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Mother Warehouse Hub</h2>
          <p className="text-gray-500 mt-1 text-sm">Aggregated operational metrics across the 5 US regional partners.</p>
        </div>
        <div className={`px-4 py-1.5 rounded border flex items-center gap-2 ${currentMetrics.statusColor} shadow-sm`}>
          {model === 'AS_IS' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          <span className="text-xs font-bold uppercase tracking-widest">Logic: {currentMetrics.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded bg-[#EBF0FA] text-[#1428A0] flex items-center justify-center"><Activity size={20}/></div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${model === 'TO_BE' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FEF2F2] text-[#DC2626]'}`}>{model === 'TO_BE' ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}{currentMetrics.ftfrTrend}</span>
          </div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Network FTFR</p><div className="text-4xl font-black text-[#1F2937]">{currentMetrics.ftfr}%</div></div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded flex items-center justify-center border ${model === 'AS_IS' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]' : 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'}`}><PackageX size={20}/></div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Day-of Stockouts</p>
            <div className="text-4xl font-black text-[#1F2937]">{currentMetrics.stockouts}</div>
            {model === 'AS_IS' && <p className="text-[10px] text-[#DC2626] mt-1 font-bold">Customer trust damaged.</p>}
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded bg-gray-50 text-gray-600 flex items-center justify-center border border-gray-200"><Banknote size={20}/></div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${model === 'TO_BE' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FFFBEB] text-[#D97706]'}`}>{model === 'TO_BE' ? <TrendingDown size={10}/> : <TrendingUp size={10}/>}{currentMetrics.deadStockTrend}</span>
          </div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dead Stock Value</p><div className="text-3xl font-black text-[#1F2937] mt-1">{currentMetrics.deadStock}</div></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded flex items-center justify-center ${model === 'AS_IS' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#ECFDF5] text-[#059669]'}`}><Clock size={18} /></div>
            <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Avg Wait Time</p><p className="text-xl font-bold text-[#1F2937]">{currentMetrics.avgWaitTime}</p></div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded flex items-center justify-center ${model === 'AS_IS' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#ECFDF5] text-[#059669]'}`}><Repeat size={18} /></div>
            <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Annual Reschedules</p><p className="text-xl font-bold text-[#1F2937]">{currentMetrics.reschedules}</p></div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg border border-[#E5E7EB] shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2"><Zap className={model === 'AS_IS' ? 'text-[#D97706]' : 'text-[#1428A0]'} size={16}/> {model === 'AS_IS' ? 'Critical Network Alerts' : 'AI Action Center (Live)'}</h3>
          </div>
          <div className="p-2 space-y-1">
            {currentMetrics.alerts.map(a => (
              <div key={a.id} className={`p-2.5 rounded flex items-start gap-2 border ${a.type === 'danger' ? 'bg-[#FEF2F2] border-[#FCA5A5]' : a.type === 'warning' ? 'bg-[#FFFBEB] border-[#FDE68A]' : 'bg-[#EBF0FA] border-[#BFDBFE]'}`}>
                <div className="mt-0.5">{a.type === 'danger' ? <AlertTriangle size={14} className="text-[#DC2626]"/> : a.type === 'warning' ? <AlertTriangle size={14} className="text-[#D97706]"/> : <CheckCircle2 size={14} className="text-[#1428A0]"/>}</div>
                <div><p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${a.type === 'danger' ? 'text-[#991B1B]' : a.type === 'warning' ? 'text-[#92400E]' : 'text-[#1428A0]'}`}>{a.title}</p><p className="text-xs text-gray-700">{a.msg}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2"><BarChart3 className="text-[#1428A0]" size={16}/><h3 className="font-bold text-sm text-[#1F2937]">Partner FTFR Matrix</h3></div>
          <div className="flex-1 p-4 space-y-3">
            {currentMetrics.partnerFtfr.map(p => (
              <div key={p.id}>
                <div className="flex justify-between items-end mb-1"><span className="text-[10px] font-bold text-gray-700">{p.id}</span><span className={`text-[10px] font-black ${p.ftfr < 60 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>{p.ftfr}%</span></div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${p.ftfr < 60 ? 'bg-[#DC2626]' : 'bg-[#059669]'}`} style={{ width: `${p.ftfr}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2"><TrendingUp className="text-[#1428A0]" size={16}/> A54 Battery: Failure Wave Projection</h3>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Network</span>
          </div>
          <div className="relative h-32 w-full flex items-end justify-between border-b border-gray-200 pb-2 px-2 mt-4">
            {[...Array(12)].map((_, i) => {
              const isWave = i === 9;
              let hClass = 'h-6 bg-gray-100';
              if (isWave) hClass = model === 'TO_BE' ? 'h-24 bg-[#1428A0]' : 'h-24 bg-[#DC2626]';
              else if (i === 7 && model === 'TO_BE') hClass = 'h-16 bg-[#34D399] border border-[#059669] border-dashed opacity-60';
              return (
                <div key={i} className="flex flex-col items-center gap-1 w-full px-1">
                  <div className={`w-full max-w-[20px] rounded-t-sm transition-all duration-700 ${hClass}`}></div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase">M{i+1}</span>
                </div>
              )})}
            <div className="absolute top-[40%] left-0 w-full h-px bg-red-400/50 border-b border-dashed border-red-500 z-0"></div>
          </div>
          <div className="mt-4 flex items-center justify-center p-3 bg-gray-50 rounded border border-gray-100 text-center">
            {model === 'AS_IS' ? (
              <p className="text-gray-600 text-xs"><strong className="text-[#D97706]"><AlertTriangle className="inline pb-0.5" size={14}/> Blind to Future:</strong> Static thresholds ignore 14m MTBF, resulting in massive shortfall in M10.</p>
            ) : (
              <p className="text-gray-600 text-xs"><strong className="text-[#1428A0]"><CheckCircle2 className="inline pb-0.5" size={14}/> Proactive Mitigation:</strong> System maps fleet age, auto-triggering pre-order (M8) to absorb M10 spike.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPartnerDiag = () => (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-[#EBF0FA] flex items-center justify-center text-[#1428A0]"><Factory size={24} /></div>
          <div>
            <div className="flex items-center gap-2 mb-1"><h2 className="text-xl font-bold text-[#1F2937]">{partnerInfo.name}</h2><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${partnerInfo.tier === 'Platinum' ? 'bg-gray-800 text-white border-gray-900' : 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]'}`}>{partnerInfo.tier} Tier</span></div>
            <p className="text-gray-500 text-xs font-medium"><MapPin size={12} className="inline pb-0.5"/> {partnerInfo.region} Region • ID: {partnerInfo.id}</p>
          </div>
        </div>
        <div className="flex gap-6 border-l border-gray-200 pl-6">
          <div><p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Backlog</p><p className="text-2xl font-black text-[#1F2937]">{partnerInfo.backlog}</p></div>
          <div><p className="text-[10px] font-bold uppercase text-gray-400 mb-1">SLA Score</p><p className="text-2xl font-black text-[#1428A0]">{partnerInfo.score}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#E5E7EB] bg-gray-50"><h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2"><Smartphone size={16} className="text-[#1428A0]"/> Part-Level Readiness</h3></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-[10px] uppercase tracking-wider">
            <tr><th className="p-3">Component</th><th className="p-3 text-center">MTBF vs Age</th><th className="p-3 text-center">Cost</th><th className="p-3 text-center border-l border-gray-200">Stock</th><th className="p-3 text-center">Threshold</th><th className="p-3">Status & Action</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(currentInventory || []).map((item, idx) => (
              <React.Fragment key={idx}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-3"><p className="font-bold text-sm text-gray-800">{item.part}</p><p className="text-[10px] text-gray-500">{item.model} (Fleet: {item.fleetSize})</p></td>
                  <td className="p-3">
                    <div className="flex flex-col items-center gap-0.5"><span className="text-xs font-mono font-bold">{item.mtbf}</span><span className="text-[8px] text-gray-400">MTBF</span><div className="w-4 h-px bg-gray-300"></div><span className={`text-xs font-mono font-bold ${model==='TO_BE'?'text-[#1428A0]':''}`}>{item.fleetAge}</span><span className="text-[8px] text-gray-400">AGE</span></div>
                  </td>
                  <td className="p-3 text-center font-mono text-xs">{formatCurrency(item.cost)}</td>
                  <td className="p-3 text-center border-l border-gray-100"><span className={`inline-block px-2 py-1 rounded text-xs font-bold ${item.stock < 5 ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-gray-100 text-gray-700'}`}>{item.stock}</span></td>
                  <td className="p-3 text-center"><span className={`px-2 py-1 rounded border text-xs font-bold ${model==='TO_BE'?'bg-[#EBF0FA] border-blue-200 text-[#1428A0]':'bg-gray-50 border-gray-200'}`}>{item.threshold.split(' ')[0]}</span></td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold flex w-max gap-1 items-center ${item.alertType==='danger'?'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626]':item.alertType==='warning'?'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]':'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'}`}>{item.alert}</span>
                      <span className={`text-[10px] font-bold flex items-center gap-1 ${item.action!=='None'?'text-[#1428A0]':'text-gray-400'}`}>{item.action}</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50"><td colSpan="6" className="p-2.5 px-4"><div className="flex gap-2"><Info size={14} className={model==='TO_BE'?'text-[#1428A0]':'text-gray-400'}/><p className="text-xs text-gray-600"><span className="font-bold">Insight:</span> {item.insight}</p></div></td></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1F2937] flex flex-col">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#1F2937] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-4">
          <CheckCircle2 size={18} className="text-[#059669]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-[#E5E7EB] p-4 flex flex-col h-full overflow-y-auto z-10 flex-shrink-0 custom-scrollbar">
          <div className="mb-2">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Strategic Context</p>
            <button onClick={() => setView('SCOPE')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'SCOPE' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Target size={16} /> Scope & Setup</button>
            <button onClick={() => setView('ENGINE')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all ${view === 'ENGINE' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Calculator size={16} /> Engine Logic</button>
          </div>
          <div className="h-px w-full bg-gray-100 my-2"></div>
          <div className="mb-2">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Live Operations</p>
            <button onClick={() => {setView('VIEW_QUEUE'); setSimState('IDLE');}} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_QUEUE' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><List size={16} /> Reservation Queue</button>
            <button onClick={() => {setView('VIEW_SIM'); setSimState('IDLE');}} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_SIM' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Zap size={16} /> Live Intercept Sim</button>
            <button onClick={() => setView('VIEW_2')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_2' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Map size={16} /> Health Map</button>
            <button onClick={() => setView('VIEW_3')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_3' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><ArrowLeftRight size={16} /> Supply vs Demand</button>
            <button onClick={() => setView('VIEW_4')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_4' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><LineChart size={16} /> Part Deep-Dive</button>
          </div>
          <div className="h-px w-full bg-gray-100 my-2"></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Dashboards</p>
            <button onClick={() => setView('OEM')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'OEM' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Factory size={16} /> Network Hub</button>
            <button onClick={() => setView('PARTNER')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'PARTNER' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><MapPin size={16} /> Partner Detail</button>
            <button onClick={() => setView('VIEW_5')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all ${view === 'VIEW_5' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><BarChart3 size={16} /> Impact Scorecard</button>
          </div>
          {(view === 'VIEW_4' || view === 'PARTNER') && (
            <div className="space-y-1 pt-4 border-t border-gray-100 mt-2">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Store Selector</p>
              {partners.map(p => (
                <button key={p.id} onClick={() => setSelectedPartner(p.id)} className={`w-full flex flex-col items-start px-3 py-2 rounded transition-all border ${selectedPartner === p.id ? 'bg-[#EBF0FA] border-blue-200' : 'border-transparent hover:bg-gray-50'}`}>
                  <span className={`text-xs font-bold ${selectedPartner === p.id ? 'text-[#1428A0]' : 'text-gray-800'}`}>{p.id}</span>
                  <span className="text-[9px] text-gray-500">{p.name.split('-')[1].trim()}</span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <main className={`flex-1 overflow-y-auto relative bg-[#F9FAFB] flex flex-col`}>
          <div className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="bg-[#1428A0] text-white px-3 py-1 font-bold tracking-tighter text-xl rounded-sm shadow-inner">SAMSUNG</div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <h1 className="font-bold text-gray-800 text-sm leading-tight">Supply Chain Intelligence</h1>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]"></span>
                  </span>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">US Operations Live</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('GUIDE')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all border ${
                  view === 'GUIDE' 
                    ? 'bg-[#EBF0FA] text-[#1428A0] border-blue-200 shadow-sm' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 border-gray-200'
                }`}
                title="Presenter Guide"
              >
                <BookOpen size={16} />
                Pitch Guide
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              {/* THE CORE TOGGLE */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded border border-gray-200 shadow-inner relative">
                {isTransitioning && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded z-10 flex items-center justify-center">
                     <RefreshCw size={16} className="text-[#1428A0] animate-spin" />
                  </div>
                )}
                <button 
                  onClick={() => handleModelToggle('AS_IS')}
                  disabled={isTransitioning || ((view === 'VIEW_SIM' || view === 'VIEW_QUEUE') && simState !== 'IDLE')}
                  className={`px-4 py-1.5 rounded text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    model === 'AS_IS' 
                      ? 'bg-white text-gray-800 shadow-sm border border-gray-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  } ${((view === 'VIEW_SIM' || view === 'VIEW_QUEUE') && simState !== 'IDLE') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ServerCog size={14} />
                  AS-IS (Static System)
                </button>
                <button 
                  onClick={() => handleModelToggle('TO_BE')}
                  disabled={isTransitioning || ((view === 'VIEW_SIM' || view === 'VIEW_QUEUE') && simState !== 'IDLE')}
                  className={`px-4 py-1.5 rounded text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    model === 'TO_BE' 
                      ? 'bg-[#1428A0] text-white shadow-sm border border-[#1E3A8A]' 
                      : 'text-gray-400 hover:text-gray-600'
                  } ${((view === 'VIEW_SIM' || view === 'VIEW_QUEUE') && simState !== 'IDLE') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <BrainCircuit size={14} />
                  TO-BE (MTBF Engine)
                </button>
              </div>
            </div>
          </div>
          <div className={`p-8 flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
            {view === 'SCOPE' && renderViewScope()}
            {view === 'ENGINE' && renderViewEngine()}
            {view === 'VIEW_QUEUE' && renderViewQueue()}
            {view === 'VIEW_SIM' && renderViewSim()}
            {view === 'VIEW_2' && renderViewMap()}
            {view === 'VIEW_3' && renderViewGap()}
            {view === 'VIEW_4' && renderViewDeepDive()}
            {view === 'VIEW_5' && renderViewScorecard()}
            {view === 'OEM' && renderViewOEM()}
            {view === 'PARTNER' && renderPartnerDiag()}
            {view === 'GUIDE' && (
               <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5E7EB]">
                 <h2 className="text-2xl font-bold text-[#1428A0] mb-4">Pitch Guide</h2>
                 <p className="text-gray-600 text-sm mb-6">Use the sidebar to navigate. Start with <strong>Reservation Gate</strong> to show the problem. Use <strong>Health Map</strong> to show network visibility. Use <strong>Supply vs Demand</strong> to explain MTBF math. Conclude with the <strong>Impact Scorecard</strong>.</p>
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}