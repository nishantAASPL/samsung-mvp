import React, { useState } from 'react';
import { 
  Activity, BrainCircuit, Box, AlertTriangle, 
  CheckCircle2, TrendingUp, MapPin, Smartphone, 
  PackageX, Factory, ServerCog, BookOpen, 
  ShieldCheck, Layers, Banknote, Clock, Info,
  TrendingDown, FileText, ArrowRight, RefreshCw,
  Target, Database, CalendarDays, Wrench, Users,
  XCircle, SmartphoneNfc, BarChart3, Repeat, Zap,
  Calculator, Cpu, Network, Plus, Equal, X,
  ArrowLeftRight, Building2, Star, Package, Hash
} from 'lucide-react';

// --- MOCK DATA BASED ON PDF CONTEXT ---
const oemMetrics = {
  AS_IS: {
    ftfr: 52,
    stockouts: 482,
    deadStock: "₹ 14.5L",
    deadStockTrend: "+12%",
    status: "Reactive (Static Thresholds)",
    statusColor: "text-orange-700 bg-orange-50 border-orange-200",
    ftfrTrend: "-2.4% (QoQ)",
    avgWaitTime: "185 mins",
    reschedules: "1,240 / yr",
    alerts: [
      { id: 1, type: 'danger', title: 'P3 Crisis', msg: 'S23 Ultra Display stockout imminent. 14 reservations blocked.' },
      { id: 2, type: 'warning', title: 'Idle Capital', msg: 'P1 holding ₹1.2L in dead stock (M34 Panels). 1300+ days cover.' },
      { id: 3, type: 'danger', title: 'Chronic Shortage', msg: 'P2 repeatedly out of S23 Ports. Emergency PO required.' }
    ],
    partnerFtfr: [
      { id: 'P1', name: 'SwiftFix Delhi', ftfr: 54 },
      { id: 'P2', name: 'TechMend Mumbai', ftfr: 48 },
      { id: 'P3', name: 'ReliRepair Bangalore', ftfr: 41 },
      { id: 'P4', name: 'QuickCare Chennai', ftfr: 59 },
      { id: 'P5', name: 'DigiServ Hyderabad', ftfr: 58 }
    ]
  },
  TO_BE: {
    ftfr: 78,
    stockouts: 0,
    deadStock: "₹ 4.2L",
    deadStockTrend: "-71%",
    status: "Predictive (MTBF Driven)",
    statusColor: "text-green-700 bg-green-50 border-green-200",
    ftfrTrend: "+26.0% (Projected)",
    avgWaitTime: "12 mins",
    reschedules: "0 (Intercepted)",
    alerts: [
      { id: 1, type: 'success', title: 'Auto-Rebalance', msg: 'AI routed 50 M34 Panels from P1 (Delhi) to P5 (Hyderabad). ₹0 net cost.' },
      { id: 2, type: 'success', title: 'SLA Allocation', msg: 'P3 allocated 12 S23U Displays based on Platinum SLA vs P4 Silver SLA.' },
      { id: 3, type: 'success', title: 'Wave Pre-Order', msg: 'Pre-ordered 42 A54 Batteries for P3 to absorb incoming 2nd-cycle wave.' }
    ],
    partnerFtfr: [
      { id: 'P1', name: 'SwiftFix Delhi', ftfr: 82 },
      { id: 'P2', name: 'TechMend Mumbai', ftfr: 76 },
      { id: 'P3', name: 'ReliRepair Bangalore', ftfr: 88 },
      { id: 'P4', name: 'QuickCare Chennai', ftfr: 71 },
      { id: 'P5', name: 'DigiServ Hyderabad', ftfr: 75 }
    ]
  }
};

const partners = [
  { id: 'P1', name: 'SwiftFix Delhi', region: 'North', tier: 'Gold', backlog: 42, score: '91%' },
  { id: 'P2', name: 'TechMend Mumbai', region: 'West', tier: 'Platinum', backlog: 45, score: '94%' },
  { id: 'P3', name: 'ReliRepair Bangalore', region: 'South', tier: 'Platinum', backlog: 124, score: '88%' },
  { id: 'P4', name: 'QuickCare Chennai', region: 'South', tier: 'Silver', backlog: 27, score: '82%' },
  { id: 'P5', name: 'DigiServ Hyderabad', region: 'South', tier: 'Gold', backlog: 56, score: '89%' }
];

const scopeDetails = {
  models: ['Galaxy S23 Ultra', 'Galaxy S23', 'Galaxy A54', 'Galaxy A34', 'Galaxy M34'],
  parts: [
    { type: 'Displays', examples: 'S23U OLED, A54 Screen', trait: 'High Cost, Low Volume' },
    { type: 'Batteries', examples: 'A54 Batt, M34 Batt', trait: 'MTBF Driven, High Turn' },
    { type: 'Charging Ports', examples: 'S23 Port', trait: 'Chronic Shortage Risk' },
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
    P1: [
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '12m', fleetSize: 850, stock: 180, cost: 700, threshold: '20', action: 'None', alert: 'Severe Dead Stock', alertType: 'warning', insight: 'Stock covers 1,300+ days of demand. Capital is trapped.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15, cost: 1400, threshold: '15', action: 'None', alert: 'Normal', alertType: 'success', insight: 'Stock matches static rules. System sees no issues.' },
    ],
    P2: [
      { part: 'PT08 - Charging Port', model: 'Galaxy S23', mtbf: '18m', fleetAge: '20m', fleetSize: 920, stock: 3, cost: 1600, threshold: '10', action: 'Emergency PO', alert: 'Chronic Shortage', alertType: 'danger', insight: 'Burning 7-12 units/mo. Always reacting after stockouts.' },
    ],
    P3: [
      { part: 'PT01 - OLED Display', model: 'S23 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 640, stock: 4, cost: 12000, threshold: '15', action: 'Wait for PO', alert: 'Blind to Crisis', alertType: 'danger', insight: '14 open reservations. 4 parts in stock. 10 failures imminent.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12, cost: 1400, threshold: '15', action: 'Standard PO', alert: 'Approaching Stockout', alertType: 'warning', insight: 'Fleet is hitting 2nd failure cycle. Static PO will be insufficient.' },
    ],
    P4: [
      { part: 'PT01 - OLED Display', model: 'S23 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 310, stock: 6, cost: 12000, threshold: '12', action: 'Wait for PO', alert: 'Low Stock', alertType: 'warning', insight: 'Silver SLA partner. Manual coordination with warehouse required for scarce parts.' },
    ],
    P5: [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8, cost: 1400, threshold: '15', action: 'Standard PO', alert: 'Approaching Stockout', alertType: 'warning', insight: 'Stock below threshold. 1120 devices are well past the 2nd failure cycle (28m).' },
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '31m', fleetSize: 960, stock: 0, cost: 700, threshold: '5', action: 'None', alert: 'Stockout', alertType: 'danger', insight: 'Zero stock. Local demand rising but hidden by static threshold.' }
    ]
  },
  TO_BE: {
    P1: [
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '12m', fleetSize: 850, stock: 180, cost: 700, threshold: '2 (Dyn)', action: 'Auto-Transfer to P5', alert: 'Rebalancing', alertType: 'success', insight: 'AI flagged idle capital. Auto-drafted transfer of 50 units to Hyderabad.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15, cost: 1400, threshold: '12 (Dyn)', action: 'Optimized', alert: 'Healthy Buffer', alertType: 'success', insight: 'Fleet age is young. MTBF wave is 4 months away. Stock maintained.' },
    ],
    P2: [
      { part: 'PT08 - Charging Port', model: 'Galaxy S23', mtbf: '18m', fleetAge: '20m', fleetSize: 920, stock: 15, cost: 1600, threshold: '22 (Dyn)', action: 'Proactive PO Triggered', alert: 'Matching Burn Rate', alertType: 'success', insight: 'Threshold adjusted to match actual consumption (12/mo). Shortages eliminated.' },
    ],
    P3: [
      { part: 'PT01 - OLED Display', model: 'S23 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 640, stock: 4, cost: 12000, threshold: '35 (Dyn)', action: 'Priority Allocation', alert: 'Crisis Intercepted', alertType: 'success', insight: 'AI detected 21 repairs/mo surge. Won allocation vs P4 due to Platinum SLA.' },
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12, cost: 1400, threshold: '42 (Dyn)', action: 'Wave Pre-order', alert: '2nd Cycle Wave Predicted', alertType: 'success', insight: '28m fleet age ÷ 14m MTBF = 2nd failure wave. Ordered 42 units pre-emptively.' },
    ],
    P4: [
      { part: 'PT01 - OLED Display', model: 'S23 Ultra', mtbf: '28m', fleetAge: '24m', fleetSize: 310, stock: 6, cost: 12000, threshold: '18 (Dyn)', action: 'Allocation Deferred', alert: 'Priority Overruled', alertType: 'warning', insight: 'Warehouse shortfall (14 units). P4 lost allocation to P3/P2 due to Silver SLA tier and lower backlog.' },
    ],
    P5: [
      { part: 'PT10 - Battery', model: 'Galaxy A54', mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8, cost: 1400, threshold: '38 (Dyn)', action: 'Partial Allocation', alert: 'Conflict Managed', alertType: 'success', insight: 'Shared limited warehouse stock with P3. P5 received 9 units based on Gold SLA.' },
      { part: 'PT19 - Back Panel', model: 'Galaxy M34', mtbf: '48m', fleetAge: '31m', fleetSize: 960, stock: 50, cost: 700, threshold: '15 (Dyn)', action: 'Inbound Transfer', alert: 'Rebalanced from P1', alertType: 'success', insight: 'AI intercepted dead stock from P1 (Delhi) and rerouted 50 units here. Cost: ₹0 net new.' }
    ]
  }
};

// ── Per-partner rich performance data ─────────────────────────────────────────
const partnerDetails = {
  P1: {
    scenario: 'Dead Stock Trap',
    monthlyRepairs: { AS_IS: 312, TO_BE: 356 },
    techCount: 8,
    utilization: { AS_IS: 74, TO_BE: 86 },
    avgTurnaroundHrs: { AS_IS: 4.2, TO_BE: 1.8 },
    customerRating: { AS_IS: 3.8, TO_BE: 4.6 },
    openEscalations: { AS_IS: 12, TO_BE: 2 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Back Panel (M34)', ftfr: 88, note: 'Overstocked — no shortage, but ₹1.26L capital frozen' },
        { part: 'Battery (A54)', ftfr: 51, note: 'Demand growing; static threshold barely covers' },
      ],
      TO_BE: [
        { part: 'Back Panel (M34)', ftfr: 95, note: '50 units auto-transferred to P5; dead stock released' },
        { part: 'Battery (A54)', ftfr: 89, note: 'MTBF threshold right-sized for young fleet age (10m)' },
      ]
    },
    highlight: 'Delhi hub has the lowest demand density but inherited bulk Back Panel stock from an earlier PO. Capital is frozen in low-risk parts while other partners starve.'
  },
  P2: {
    scenario: 'Chronic Shortage',
    monthlyRepairs: { AS_IS: 445, TO_BE: 501 },
    techCount: 11,
    utilization: { AS_IS: 68, TO_BE: 91 },
    avgTurnaroundHrs: { AS_IS: 5.8, TO_BE: 2.1 },
    customerRating: { AS_IS: 3.4, TO_BE: 4.7 },
    openEscalations: { AS_IS: 23, TO_BE: 1 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Charging Port (S23)', ftfr: 28, note: 'Only 3 units vs 12/mo demand — perpetual stockout cycle' },
      ],
      TO_BE: [
        { part: 'Charging Port (S23)', ftfr: 92, note: 'Threshold raised to 22; proactive PO already triggered' },
      ]
    },
    highlight: 'Mumbai handles the highest repair volume in the network. One poorly calibrated threshold is responsible for 23 monthly escalations and a 28% FTFR on the S23.'
  },
  P3: {
    scenario: 'Display Crisis + Battery Wave',
    monthlyRepairs: { AS_IS: 589, TO_BE: 672 },
    techCount: 14,
    utilization: { AS_IS: 91, TO_BE: 94 },
    avgTurnaroundHrs: { AS_IS: 7.2, TO_BE: 1.4 },
    customerRating: { AS_IS: 2.9, TO_BE: 4.9 },
    openEscalations: { AS_IS: 41, TO_BE: 0 },
    ftfrByPart: {
      AS_IS: [
        { part: 'OLED Display (S23U)', ftfr: 22, note: '4 units vs 14 open reservations — crisis imminent' },
        { part: 'Battery (A54)', ftfr: 44, note: '2nd MTBF cycle active; static PO is insufficient' },
      ],
      TO_BE: [
        { part: 'OLED Display (S23U)', ftfr: 94, note: 'Priority allocation won vs P4 (Platinum SLA > Silver)' },
        { part: 'Battery (A54)', ftfr: 88, note: '42-unit wave pre-order fully absorbed the surge' },
      ]
    },
    highlight: 'Most distressed partner in AS-IS. Platinum SLA with highest backlog (124 jobs), yet critically short on two independent parts simultaneously — a dual-crisis scenario.'
  },
  P4: {
    scenario: 'Allocation Deferred',
    monthlyRepairs: { AS_IS: 198, TO_BE: 231 },
    techCount: 5,
    utilization: { AS_IS: 55, TO_BE: 72 },
    avgTurnaroundHrs: { AS_IS: 3.1, TO_BE: 2.6 },
    customerRating: { AS_IS: 4.0, TO_BE: 4.3 },
    openEscalations: { AS_IS: 6, TO_BE: 4 },
    ftfrByPart: {
      AS_IS: [
        { part: 'OLED Display (S23U)', ftfr: 60, note: 'Marginal cover — manual escalation needed each cycle' },
      ],
      TO_BE: [
        { part: 'OLED Display (S23U)', ftfr: 71, note: 'Allocation deferred to P3; Silver SLA is lower priority' },
      ]
    },
    highlight: 'Chennai is smallest by repair volume. Silver tier means allocation comes after P2 and P3 in warehouse shortfall scenarios — a deliberate SLA-based decision, not an error.'
  },
  P5: {
    scenario: 'Rebalancing Beneficiary',
    monthlyRepairs: { AS_IS: 278, TO_BE: 334 },
    techCount: 7,
    utilization: { AS_IS: 62, TO_BE: 84 },
    avgTurnaroundHrs: { AS_IS: 6.5, TO_BE: 2.0 },
    customerRating: { AS_IS: 3.5, TO_BE: 4.5 },
    openEscalations: { AS_IS: 18, TO_BE: 1 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Battery (A54)', ftfr: 38, note: 'Fleet at 30m — deep into 2nd failure cycle, severe shortage' },
        { part: 'Back Panel (M34)', ftfr: 0, note: 'Zero stock — complete blockout, all jobs rescheduled' },
      ],
      TO_BE: [
        { part: 'Battery (A54)', ftfr: 78, note: 'Partial allocation of 9 units from central (Gold SLA)' },
        { part: 'Back Panel (M34)', ftfr: 91, note: '50-unit inbound transfer from P1 dead stock rebalance' },
      ]
    },
    highlight: 'Hyderabad was the silent victim in AS-IS — two simultaneous stockouts hidden by static rules. TO-BE resolves both via lateral rebalancing and central allocation for ₹0 new cost.'
  }
};

// ── Part-level network view data ───────────────────────────────────────────────
const partNetworkData = {
  PT01: {
    code: 'PT01', name: 'OLED Display', category: 'Display',
    compatibleModel: 'Galaxy S23 Ultra', mtbf: '28m', cost: 12000,
    networkTotalStock: 10,
    partners: [
      { id:'P1', name:'SwiftFix Delhi',      tier:'Gold',     stock:0,  threshold_asis:null, threshold_tobe:null, demand_mo:0,  hasFleet:false },
      { id:'P2', name:'TechMend Mumbai',     tier:'Platinum', stock:0,  threshold_asis:null, threshold_tobe:null, demand_mo:0,  hasFleet:false },
      { id:'P3', name:'ReliRepair Bangalore',tier:'Platinum', stock:4,  threshold_asis:15,   threshold_tobe:35,   demand_mo:21, hasFleet:true,
        status_asis:'critical', status_tobe:'deficit', action_asis:'Wait for PO', action_tobe:'Priority Allocation (Central)' },
      { id:'P4', name:'QuickCare Chennai',   tier:'Silver',   stock:6,  threshold_asis:12,   threshold_tobe:18,   demand_mo:5,  hasFleet:true,
        status_asis:'low',      status_tobe:'deficit', action_asis:'Wait for PO', action_tobe:'Deferred — Silver SLA' },
      { id:'P5', name:'DigiServ Hyderabad',  tier:'Gold',     stock:0,  threshold_asis:null, threshold_tobe:null, demand_mo:0,  hasFleet:false },
    ],
    centralWarehouse: { available: 14, onOrder: 30, pendingAlloc: 12 },
    networkInsight: {
      AS_IS: 'Network holds only 10 units total. P3 has 14 open reservations and will stockout within days. No lateral visibility or prioritization mechanism exists.',
      TO_BE: 'AI resolved the conflict: 12 units routed to P3 (Platinum SLA), 2 units held as buffer at central. P4 deferred to next replenishment cycle based on Silver SLA tier.'
    }
  },
  PT08: {
    code: 'PT08', name: 'Charging Port', category: 'Connector',
    compatibleModel: 'Galaxy S23', mtbf: '18m', cost: 1600,
    networkTotalStock: 3,
    partners: [
      { id:'P1', name:'SwiftFix Delhi',      tier:'Gold',     stock:0, threshold_asis:null, threshold_tobe:null, demand_mo:0,  hasFleet:false },
      { id:'P2', name:'TechMend Mumbai',     tier:'Platinum', stock:3, threshold_asis:10,   threshold_tobe:22,   demand_mo:12, hasFleet:true,
        status_asis:'critical', status_tobe:'buffer', action_asis:'Emergency PO', action_tobe:'Proactive PO Triggered' },
      { id:'P3', name:'ReliRepair Bangalore',tier:'Platinum', stock:0, threshold_asis:null, threshold_tobe:8,    demand_mo:3,  hasFleet:false,
        status_asis:null,       status_tobe:'reserved', action_asis:'None', action_tobe:'Central Stock Reserved' },
      { id:'P4', name:'QuickCare Chennai',   tier:'Silver',   stock:0, threshold_asis:null, threshold_tobe:null, demand_mo:0,  hasFleet:false },
      { id:'P5', name:'DigiServ Hyderabad',  tier:'Gold',     stock:0, threshold_asis:null, threshold_tobe:null, demand_mo:0,  hasFleet:false },
    ],
    centralWarehouse: { available: 22, onOrder: 40, pendingAlloc: 15 },
    networkInsight: {
      AS_IS: 'P2 burning 12 units/month with only 3 in stock. Reactive PO cycle creates 2–3 week stockout windows every month. Customer trust steadily eroding.',
      TO_BE: 'Threshold revised to 22 (was 10). Fleet age at 20m > 18m MTBF means active failure cycle. Proactive PO triggered. Chronic shortage loop broken.'
    }
  },
  PT10: {
    code: 'PT10', name: 'Battery', category: 'Power',
    compatibleModel: 'Galaxy A54', mtbf: '14m', cost: 1400,
    networkTotalStock: 35,
    partners: [
      { id:'P1', name:'SwiftFix Delhi',      tier:'Gold',     stock:15, threshold_asis:15, threshold_tobe:12, demand_mo:4,  hasFleet:true,
        status_asis:'normal',  status_tobe:'healthy', action_asis:'None', action_tobe:'Threshold Optimized' },
      { id:'P2', name:'TechMend Mumbai',     tier:'Platinum', stock:0,  threshold_asis:null, threshold_tobe:null, demand_mo:0, hasFleet:false },
      { id:'P3', name:'ReliRepair Bangalore',tier:'Platinum', stock:12, threshold_asis:15, threshold_tobe:42, demand_mo:18, hasFleet:true,
        status_asis:'warning', status_tobe:'deficit', action_asis:'Standard PO', action_tobe:'Wave Pre-Order (42 units)' },
      { id:'P4', name:'QuickCare Chennai',   tier:'Silver',   stock:0,  threshold_asis:null, threshold_tobe:null, demand_mo:0, hasFleet:false },
      { id:'P5', name:'DigiServ Hyderabad',  tier:'Gold',     stock:8,  threshold_asis:15, threshold_tobe:38, demand_mo:15, hasFleet:true,
        status_asis:'warning', status_tobe:'deficit', action_asis:'Standard PO', action_tobe:'Partial Allocation (9 units)' },
    ],
    centralWarehouse: { available: 28, onOrder: 50, pendingAlloc: 21 },
    networkInsight: {
      AS_IS: 'P3 at 28m fleet age = 2× MTBF cycles. P5 at 30m. Both approaching a synchronized failure wave. Static thresholds (15 units each) will cause a network-wide stockout.',
      TO_BE: 'Dynamic thresholds: P3→42 (Platinum, 2nd wave), P5→38 (Gold, partial). Wave pre-orders triggered. Network defended before the synchronized failure spike hits.'
    }
  },
  PT19: {
    code: 'PT19', name: 'Back Panel', category: 'Chassis',
    compatibleModel: 'Galaxy M34', mtbf: '48m', cost: 700,
    networkTotalStock: 180,
    partners: [
      { id:'P1', name:'SwiftFix Delhi',      tier:'Gold', stock:180, threshold_asis:20, threshold_tobe:2,   demand_mo:0.8, hasFleet:true,
        status_asis:'dead_stock', status_tobe:'surplus', action_asis:'None (undetected)', action_tobe:'Auto-Transfer 50 → P5' },
      { id:'P2', name:'TechMend Mumbai',     tier:'Platinum', stock:0, threshold_asis:null, threshold_tobe:null, demand_mo:0, hasFleet:false },
      { id:'P3', name:'ReliRepair Bangalore',tier:'Platinum', stock:0, threshold_asis:null, threshold_tobe:null, demand_mo:0, hasFleet:false },
      { id:'P4', name:'QuickCare Chennai',   tier:'Silver',   stock:0, threshold_asis:null, threshold_tobe:null, demand_mo:0, hasFleet:false },
      { id:'P5', name:'DigiServ Hyderabad',  tier:'Gold', stock:0,   threshold_asis:5,    threshold_tobe:15,  demand_mo:3.2, hasFleet:true,
        status_asis:'stockout', status_tobe:'healthy', action_asis:'None', action_tobe:'Inbound Transfer from P1' },
    ],
    centralWarehouse: { available: 25, onOrder: 0, pendingAlloc: 0 },
    networkInsight: {
      AS_IS: 'P1 has ₹1.26L in dead stock (180 × ₹700). P5 has zero. Zero lateral visibility between them. Both anomalies are completely invisible to the static rule engine.',
      TO_BE: '50 units auto-rebalanced P1→P5. Net procurement cost: ₹0. P1 dead stock reduced from 178-day cover to actual need. P5 restored to healthy buffer. Classic rebalancing win.'
    }
  }
};

// Formatting utility
const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

export default function App() {
  const [model, setModel] = useState('TO_BE'); // 'AS_IS' | 'TO_BE'
  const [view, setView] = useState('ENGINE'); // 'SCOPE' | 'ENGINE' | 'GUIDE' | 'OEM' | 'PARTNER' | 'PART'
  const [selectedPartner, setSelectedPartner] = useState('P3');
  const [selectedPart, setSelectedPart] = useState('PT01');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModelToggle = (newModel) => {
    if (newModel === model) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setModel(newModel);
      setIsTransitioning(false);
    }, 400); 
  };

  const currentMetrics = oemMetrics[model];
  const currentInventory = inventoryData[model]?.[selectedPartner] || [];
  const partnerInfo = partners.find(p => p.id === selectedPartner);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 flex flex-col">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-[#034EA2] text-white px-3 py-1 font-bold tracking-tighter text-xl rounded-sm shadow-inner">SAMSUNG</div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="flex flex-col">
            <h1 className="font-bold text-slate-800 text-sm leading-tight">Predictive Inventory Platform</h1>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Live Data Sync</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* PRESENTER GUIDE BUTTON */}
          <button 
            onClick={() => setView('GUIDE')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              view === 'GUIDE' 
                ? 'bg-blue-50 text-[#034EA2] border-blue-200 shadow-sm' 
                : 'bg-white text-slate-500 hover:bg-slate-100 border-slate-200'
            }`}
            title="Presenter Guide"
          >
            <BookOpen size={16} />
            Pitch Guide
          </button>
          
          <div className="h-6 w-px bg-slate-200"></div>

          {/* THE CORE TOGGLE */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200 shadow-inner relative">
            {isTransitioning && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-full z-10 flex items-center justify-center">
                 <RefreshCw size={16} className="text-[#034EA2] animate-spin" />
              </div>
            )}
            <button 
              onClick={() => handleModelToggle('AS_IS')}
              disabled={isTransitioning}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                model === 'AS_IS' 
                  ? 'bg-white text-slate-800 shadow-sm border border-slate-200' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <ServerCog size={16} />
              AS-IS (Static Rules)
            </button>
            <button 
              onClick={() => handleModelToggle('TO_BE')}
              disabled={isTransitioning}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                model === 'TO_BE' 
                  ? 'bg-[#034EA2] text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <BrainCircuit size={16} />
              TO-BE (MTBF Engine)
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-72 bg-white border-r border-slate-200 p-4 flex flex-col gap-6 h-full overflow-y-auto z-10">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3 px-3">System Navigation</p>
            <button 
              onClick={() => setView('SCOPE')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                view === 'SCOPE' ? 'bg-[#034EA2] text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Target size={18} /> Scope & Problem Setup
            </button>
            <button 
              onClick={() => setView('ENGINE')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                view === 'ENGINE' ? 'bg-[#034EA2] text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Calculator size={18} /> MTBF Engine Logic
            </button>
            <button 
              onClick={() => setView('OEM')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                view === 'OEM' ? 'bg-[#034EA2] text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Factory size={18} /> OEM Network Dashboard
            </button>
            <button
              onClick={() => setView('PARTNER')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                view === 'PARTNER' ? 'bg-[#034EA2] text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <MapPin size={18} /> Partner Diagnostics
            </button>
            <button
              onClick={() => setView('PART')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                view === 'PART' ? 'bg-[#034EA2] text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Package size={18} /> Part Intelligence
            </button>
          </div>

          {view === 'PARTNER' && (
            <div className="space-y-2 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3 px-3 flex justify-between items-center">
                Select Service Center
              </p>
              {partners.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPartner(p.id)}
                  className={`w-full flex flex-col items-start px-4 py-3 rounded-xl transition-all border ${
                    selectedPartner === p.id
                      ? 'bg-blue-50 border-[#034EA2] shadow-sm'
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between w-full items-center mb-1">
                    <span className={`text-sm font-bold ${selectedPartner === p.id ? 'text-[#034EA2]' : 'text-slate-800'}`}>{p.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                      p.tier === 'Platinum' ? 'bg-slate-800 text-white' : p.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-200 text-slate-600'
                    }`}>{p.tier}</span>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={10}/> {p.region} • ID: {p.id}</span>
                </button>
              ))}
            </div>
          )}

          {view === 'PART' && (
            <div className="space-y-2 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3 px-3">
                Select Part Number
              </p>
              {Object.values(partNetworkData).map(p => (
                <button
                  key={p.code}
                  onClick={() => setSelectedPart(p.code)}
                  className={`w-full flex flex-col items-start px-4 py-3 rounded-xl transition-all border ${
                    selectedPart === p.code
                      ? 'bg-blue-50 border-[#034EA2] shadow-sm'
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between w-full items-center mb-1">
                    <span className={`text-sm font-bold ${selectedPart === p.code ? 'text-[#034EA2]' : 'text-slate-800'}`}>{p.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider bg-slate-100 text-slate-600">{p.code}</span>
                  </div>
                  <span className="text-xs text-slate-500">{p.compatibleModel} • {p.mtbf} MTBF</span>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className={`flex-1 p-8 overflow-y-auto bg-slate-50/50 relative transition-opacity duration-300 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
          
          {/* =========================================
              VIEW: STATIC MTBF ENGINE INFOGRAPHIC
          ========================================= */}
          {view === 'ENGINE' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#034EA2]/10 text-[#034EA2] rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                    <Cpu size={14} /> The Intelligence Layer
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    How the AI <span className="text-[#034EA2]">Forecasts Demand</span>
                  </h2>
                  <p className="text-lg text-slate-600">
                    The platform abandons static "reorder points". Instead, it calculates expected demand by mapping a region's active device fleet against engineering failure curves.
                  </p>
                </div>
              </div>

              {/* The Visual Equation */}
              <div className="bg-[#034EA2] p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-bl-full -z-0"></div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-8 text-blue-200 flex items-center gap-2 relative z-10">
                  <Calculator size={18} /> The Visual Equation
                </h3>
                
                <div className="flex items-center justify-between gap-6 relative z-10">
                  
                  {/* Fleet Size */}
                  <div className="bg-white/10 border border-white/20 p-6 rounded-2xl flex-1 backdrop-blur-sm text-center">
                    <Users className="mx-auto mb-3 text-blue-300" size={32} />
                    <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider mb-1">Active Devices in Region</p>
                    <p className="text-4xl font-black">1,120</p>
                    <p className="text-sm font-medium text-blue-200 mt-2">Galaxy A54s in Bangalore</p>
                  </div>

                  <X className="text-blue-300 w-12 h-12 flex-shrink-0" />

                  {/* Failure Curve */}
                  <div className="bg-white/10 border border-white/20 p-6 rounded-2xl flex-1 backdrop-blur-sm text-center">
                    <TrendingUp className="mx-auto mb-3 text-blue-300" size={32} />
                    <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider mb-1">Failure Probability Curve</p>
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-lg font-bold text-blue-200">Age: 28m</span>
                      <span className="text-2xl font-light text-blue-300">/</span>
                      <span className="text-lg font-bold text-blue-200">MTBF: 14m</span>
                    </div>
                    <p className="text-sm font-bold text-white mt-2 bg-blue-500/50 inline-block px-3 py-1 rounded-full">Hitting 2nd Failure Cycle</p>
                  </div>

                  <Equal className="text-blue-300 w-12 h-12 flex-shrink-0" />

                  {/* Result */}
                  <div className="bg-white p-6 rounded-2xl flex-1 text-center shadow-lg transform scale-105 border-4 border-blue-400">
                    <Box className="mx-auto mb-3 text-[#034EA2]" size={32} />
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Dynamic Stock Requirement</p>
                    <p className="text-5xl font-black text-[#034EA2]">42</p>
                    <p className="text-sm font-bold text-green-600 mt-2 bg-green-50 inline-block px-3 py-1 rounded-full border border-green-200">Units Auto-Ordered</p>
                  </div>

                </div>
              </div>

              {/* The Data Pipeline */}
              <div className="pt-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-8">
                  <Network className="text-[#034EA2]"/> The Four-Step Analytics Pipeline
                </h3>
                
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 hidden lg:block"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
                    
                    {/* Step 1 */}
                    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-blue-50 text-[#034EA2]">
                        <Smartphone size={24}/>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">1. Device Telemetry</h4>
                      <p className="text-sm text-slate-500">System isolates the active install base in a specific partner's territory (e.g., 1,120 active devices).</p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-purple-50 text-purple-600">
                        <Wrench size={24}/>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">2. Component Specs</h4>
                      <p className="text-sm text-slate-500">Retrieves the engineering failure rate (MTBF) for the specific component being analyzed.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-orange-50 text-orange-600">
                        <BrainCircuit size={24}/>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">3. Weibull Calculation</h4>
                      <p className="text-sm text-slate-500">Cross-references average device age against MTBF to locate exactly where the fleet sits on the failure curve.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="p-6 rounded-2xl border border-[#034EA2] bg-blue-50/30 shadow-md ring-4 ring-blue-50 flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-[#034EA2] text-white">
                        <Factory size={24}/>
                      </div>
                      <h4 className="font-bold text-[#034EA2] mb-2">4. Pre-Emptive Action</h4>
                      <p className="text-sm text-blue-900 font-medium">Replaces the static threshold with a dynamic quantity and triggers POs 30 days before the failure wave hits.</p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =========================================
              VIEW: SCOPE & PROBLEM STATEMENT
          ========================================= */}
          {view === 'SCOPE' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Problem Statement Header */}
              <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#034EA2]/10 text-[#034EA2] rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                    <Target size={14} /> Problem Definition
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Ending the <span className={model === 'AS_IS' ? 'text-red-500' : 'text-[#034EA2]'}>"Blind Approval"</span> Cycle
                  </h2>
                  <p className="text-lg text-slate-600">
                    {model === 'AS_IS' 
                      ? "Our understanding of the problem statement highlights a critical disconnect: OEM systems currently approve customer repair reservations without accounting for actual, allocated partner inventory. This results in parts being unavailable upon arrival, causing missed SLAs and degraded customer trust." 
                      : "The proposed architecture resolves this disconnected loop. By leveraging MTBF and fleet aging data, the system intelligently predicts failure waves and automatically allocates partner inventory before the customer demand even occurs."}
                  </p>
                </div>
              </div>

              {/* Dynamic Flowchart */}
              <div className={`p-8 rounded-3xl border transition-all duration-700 shadow-sm relative overflow-hidden ${
                model === 'AS_IS' ? 'bg-white border-red-200' : 'bg-[#034EA2] border-blue-800 text-white shadow-xl'
              }`}>
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-10 rounded-bl-full -z-0 ${model === 'AS_IS' ? 'from-red-500 to-transparent' : 'from-white to-transparent'}`}></div>
                
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-8 z-10 relative flex items-center gap-2 ${model === 'AS_IS' ? 'text-red-500' : 'text-blue-200'}`}>
                  {model === 'AS_IS' ? <AlertTriangle size={16}/> : <CheckCircle2 size={16}/>}
                  {model === 'AS_IS' ? 'Current Reality (As-Is)' : 'Platform Architecture (To-Be)'}
                </h3>

                <div className="flex items-center justify-between gap-4 z-10 relative">
                  
                  {/* Step 1 */}
                  <div className={`flex flex-col items-center flex-1 p-6 rounded-2xl border ${model === 'AS_IS' ? 'bg-slate-50 border-slate-200' : 'bg-white/10 border-white/20 backdrop-blur-md'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${model === 'AS_IS' ? 'bg-blue-100 text-[#034EA2]' : 'bg-blue-400 text-white'}`}><Activity size={24}/></div>
                    <h4 className="font-bold mb-1 text-center">OEM Portal</h4>
                    <p className={`text-xs text-center ${model === 'AS_IS' ? 'text-slate-500' : 'text-blue-100'}`}>Customer books repair.</p>
                  </div>

                  <ArrowRight size={32} className={model === 'AS_IS' ? 'text-slate-300' : 'text-blue-300'} />

                  {/* Step 2 (The Gap vs The MTBF Engine) */}
                  <div className={`flex flex-col items-center flex-1 p-6 rounded-2xl border-2 transform transition-all duration-500 ${
                    model === 'AS_IS' 
                      ? 'bg-red-50 border-red-200 border-dashed scale-100' 
                      : 'bg-green-400 border-green-300 text-slate-900 scale-110 shadow-lg'
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${model === 'AS_IS' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-700'}`}>
                      {model === 'AS_IS' ? <XCircle size={24}/> : <BrainCircuit size={24}/>}
                    </div>
                    <h4 className="font-bold mb-1 text-center">
                      {model === 'AS_IS' ? 'No Inventory Check' : 'Predictive MTBF'}
                    </h4>
                    <p className={`text-xs text-center font-medium ${model === 'AS_IS' ? 'text-red-500' : 'text-green-900'}`}>
                      {model === 'AS_IS' ? 'Approves without partner stock data.' : 'Forecasts failure waves & auto-orders.'}
                    </p>
                  </div>

                  <ArrowRight size={32} className={model === 'AS_IS' ? 'text-red-300' : 'text-blue-300'} />

                  {/* Step 3 */}
                  <div className={`flex flex-col items-center flex-1 p-6 rounded-2xl border ${model === 'AS_IS' ? 'bg-slate-50 border-slate-200' : 'bg-white/10 border-white/20 backdrop-blur-md'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${model === 'AS_IS' ? 'bg-slate-200 text-slate-500' : 'bg-blue-400 text-white'}`}><Factory size={24}/></div>
                    <h4 className="font-bold mb-1 text-center">Service Center</h4>
                    <p className={`text-xs text-center ${model === 'AS_IS' ? 'text-slate-500' : 'text-blue-100'}`}>
                      {model === 'AS_IS' ? 'Has ZERO parts physically in store.' : 'Fully stocked ahead of incoming demand.'}
                    </p>
                  </div>

                  <ArrowRight size={32} className={model === 'AS_IS' ? 'text-slate-300' : 'text-blue-300'} />

                  {/* Step 4 */}
                  <div className={`flex flex-col items-center flex-1 p-6 rounded-2xl border ${model === 'AS_IS' ? 'bg-red-50 border-red-200' : 'bg-green-400/20 border-green-300/30'}`}>
                    <div className={`text-4xl font-black mb-2 ${model === 'AS_IS' ? 'text-red-500' : 'text-green-400'}`}>
                      {model === 'AS_IS' ? '52%' : '77%'}
                    </div>
                    <h4 className="font-bold mb-1 text-center">First-Time Fix</h4>
                    <p className={`text-[10px] text-center font-bold uppercase ${model === 'AS_IS' ? 'text-red-400' : 'text-green-300'}`}>
                      {model === 'AS_IS' ? 'Customer Rescheduled' : 'Customer Success'}
                    </p>
                  </div>

                </div>
              </div>

              {/* Data Scope Detail Grid */}
              <div className="pt-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <Database className="text-[#034EA2]"/> Simulated Ecosystem Data
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  
                  {/* Timeline */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#034EA2] flex items-center justify-center"><CalendarDays size={20}/></div>
                    <h4 className="font-bold text-lg">Timeline & Volume</h4>
                    <div className="space-y-3">
                      {scopeDetails.dataPoints.map((dp, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                          <div>
                            <p className="text-sm font-bold text-slate-800">{dp.label}</p>
                            <p className="text-[10px] text-slate-500">{dp.desc}</p>
                          </div>
                          <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{dp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Partners */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#034EA2] flex items-center justify-center"><Users size={20}/></div>
                    <h4 className="font-bold text-lg">5 Network Partners</h4>
                    <div className="space-y-2">
                      {partners.map(p => (
                        <div key={p.id} className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50 transition-colors">
                          <div className="flex gap-2 items-center">
                            <span className="text-[10px] font-bold text-slate-400 w-5">{p.id}</span>
                            <span className="font-semibold text-slate-700">{p.name}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            p.tier === 'Platinum' ? 'bg-slate-800 text-white' : p.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-200 text-slate-600'
                          }`}>{p.tier}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Models & Parts */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#034EA2] flex items-center justify-center"><SmartphoneNfc size={20}/></div>
                    <h4 className="font-bold text-lg">25 Device/Part Combos</h4>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {scopeDetails.models.map(m => (
                          <span key={m} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{m}</span>
                        ))}
                      </div>
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {scopeDetails.parts.map((pt, i) => (
                          <div key={i} className="flex flex-col">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-slate-800">{pt.type}</span>
                              <span className="text-[10px] font-semibold text-slate-500">{pt.trait}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">{pt.examples}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* =========================================
              VIEW: PRESENTER GUIDE
          ========================================= */}
          {view === 'GUIDE' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-[#034EA2] rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                  <FileText size={14} /> Context & Walkthrough
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">How to pitch this demo.</h2>
                <p className="text-lg text-slate-600">This prototype visualizes a synthetic dataset representing 18 months of repair history across 5 Samsung service centers in India.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2"><AlertTriangle className="text-red-500"/> The Core Problem</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Currently, Samsung OEM approves customer reservations without checking local partner stock. This creates the <strong>"Blind Approval"</strong> loop. Customers show up to fix their phones, but the part isn't there. Result: <strong>52% First-Time Fix Rate (FTFR)</strong> and damaged brand trust.
                  </p>
                </div>
                <div className="bg-[#034EA2] p-6 rounded-2xl shadow-md space-y-4 text-white">
                  <h3 className="font-bold text-lg flex items-center gap-2 text-blue-100"><ShieldCheck /> The Solution</h3>
                  <p className="text-sm text-blue-50 leading-relaxed">
                    An <strong>Inventory-Aware Platform</strong>. We intercept bookings at the gate. More importantly, we use <strong>MTBF (Mean Time Between Failure)</strong> + Device Age to predict "Failure Waves" and restock partners <em>before</em> the demand hits.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
                <div className="bg-slate-50 border-b border-slate-200 p-5">
                  <h3 className="font-bold text-slate-800">Key Scenarios to Demo (Switch to Partner View)</h3>
                </div>
                <div className="p-0">
                  <div className="p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className="mt-1"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#034EA2] text-xs font-bold">1</span></div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The S23U Display Crisis (Partner P3 - Bangalore)</h4>
                      <p className="text-sm text-slate-600 mb-2"><strong>The Setup:</strong> Very expensive part (₹12,000). High backlog. Platinum Partner. Only 4 units in stock but 14 reservations open.</p>
                      <p className="text-sm text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <strong>How to pitch:</strong> Show "AS-IS". Point out the system thinks 4 units is fine because the static threshold is 15. Then toggle "TO-BE". Show how the MTBF engine sees a 28m failure wave coming, auto-adjusts the threshold to 35, and triggers a priority allocation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className="mt-1"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#034EA2] text-xs font-bold">2</span></div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The Dead Stock Trap (Partner P1 - Delhi)</h4>
                      <p className="text-sm text-slate-600 mb-2"><strong>The Setup:</strong> Cheap part (M34 Back Panel, ₹700). Massive overstock (180 units). Low failure rate (48m MTBF).</p>
                      <p className="text-sm text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <strong>How to pitch:</strong> Show "AS-IS". Point out ₹1.2L of capital is trapped covering 1,300 days of demand. Toggle "TO-BE". Show how AI shrinks the threshold to 2, and automatically drafts an order to shift this dead stock to another partner (P5) who needs it.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className="mt-1"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#034EA2] text-xs font-bold">3</span></div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Battery Degradation Trend (Partner P3 - Bangalore)</h4>
                      <p className="text-sm text-slate-600 mb-2"><strong>The Setup:</strong> A54 Battery has a 14-month MTBF. The fleet is aging rapidly.</p>
                      <p className="text-sm text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <strong>How to pitch:</strong> In P3, the average device age is 28 months. That means they are hitting their <em>second</em> battery failure wave. Static policies don't know math. The "TO-BE" model calculates (28 ÷ 14) and triggers a massive pre-order to absorb the hit.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className="mt-1"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#034EA2] text-xs font-bold">4</span></div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The Allocation Arbiter (Partner P4 vs P3)</h4>
                      <p className="text-sm text-slate-600 mb-2"><strong>The Setup:</strong> Both P4 (Chennai) and P3 (Bangalore) desperately need the S23U Display. Warehouse only has 14 units to share.</p>
                      <p className="text-sm text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <strong>How to pitch:</strong> Navigate to P4. Show the TO-BE model. Highlight how the AI deferred P4's allocation because they are a Silver tier partner with a smaller backlog (27) vs P3's Platinum tier (124 backlog). It resolves conflicts without phone calls.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className="mt-1"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#034EA2] text-xs font-bold">5</span></div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The Rebalancing Magic (Partner P5 - Hyderabad)</h4>
                      <p className="text-sm text-slate-600 mb-2"><strong>The Setup:</strong> P5 is out of M34 Back Panels, but P1 (Delhi) has 180 idle units.</p>
                      <p className="text-sm text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <strong>How to pitch:</strong> Show P5's TO-BE state. Highlight the "Inbound Transfer" of 50 units. The AI automatically connected P1's dead stock to P5's shortage, solving two problems for ₹0 in new procurement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              VIEW: OEM DASHBOARD
          ========================================= */}
          {view === 'OEM' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-end border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mother Warehouse Hub</h2>
                  <p className="text-slate-500 mt-2 text-sm">Aggregated operational metrics across the 5 India regional partners.</p>
                </div>
                <div className={`px-4 py-2 rounded-xl border-2 flex items-center gap-2 ${currentMetrics.statusColor} shadow-sm`}>
                  {model === 'AS_IS' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                  <span className="text-sm font-bold uppercase tracking-widest">Logic: {currentMetrics.status}</span>
                </div>
              </div>

              {/* TOP ROW: Primary KPI Cards */}
              <div className="grid grid-cols-3 gap-6">
                {/* FTFR Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full -z-10 transition-transform group-hover:scale-110 ${model === 'TO_BE' ? 'from-green-400 to-transparent' : 'from-slate-400 to-transparent'}`}></div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#034EA2] flex items-center justify-center border border-blue-100"><Activity size={24}/></div>
                    <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${model === 'TO_BE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {model === 'TO_BE' ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                      {currentMetrics.ftfrTrend}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Network FTFR</p>
                    <div className="text-6xl font-black text-slate-900 tracking-tighter">{currentMetrics.ftfr}%</div>
                  </div>
                </div>

                {/* Stockouts Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full -z-10 transition-transform group-hover:scale-110 ${model === 'AS_IS' ? 'from-red-400 to-transparent' : 'from-green-400 to-transparent'}`}></div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${model === 'AS_IS' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}><PackageX size={24}/></div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Day-of Stockouts</p>
                    <div className="text-6xl font-black text-slate-900 tracking-tighter">{currentMetrics.stockouts}</div>
                    {model === 'AS_IS' && <p className="text-xs text-red-500 mt-2 font-medium">Customer trust damaged.</p>}
                  </div>
                </div>

                {/* Dead Stock Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                   <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full -z-10 transition-transform group-hover:scale-110 ${model === 'AS_IS' ? 'from-orange-400 to-transparent' : 'from-green-400 to-transparent'}`}></div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-200"><Banknote size={24}/></div>
                    <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${model === 'TO_BE' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {model === 'TO_BE' ? <TrendingDown size={12}/> : <TrendingUp size={12}/>}
                      {currentMetrics.deadStockTrend}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Dead Stock Value</p>
                    <div className="text-5xl font-black text-slate-900 tracking-tighter mt-1">{currentMetrics.deadStock}</div>
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: Alerts & Partner Leaderboard */}
              <div className="grid grid-cols-3 gap-6">
                
                {/* Secondary KPIs (Col 1) */}
                <div className="col-span-1 space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${model === 'AS_IS' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Avg Wait Time</p>
                      <p className="text-2xl font-bold text-slate-900">{currentMetrics.avgWaitTime}</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${model === 'AS_IS' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      <Repeat size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Annual Reschedules</p>
                      <p className="text-2xl font-bold text-slate-900">{currentMetrics.reschedules}</p>
                    </div>
                  </div>
                </div>

                {/* System Action Center (Col 2 & 3) */}
                <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Zap className={model === 'AS_IS' ? 'text-orange-500' : 'text-[#034EA2]'} size={18}/> 
                      {model === 'AS_IS' ? 'Critical Network Alerts' : 'AI Action Center (Live)'}
                    </h3>
                  </div>
                  <div className="p-2 space-y-1">
                    {currentMetrics.alerts.map(alert => (
                      <div key={alert.id} className={`p-3 rounded-xl flex items-start gap-3 border ${
                        alert.type === 'danger' ? 'bg-red-50 border-red-100' : 
                        alert.type === 'warning' ? 'bg-orange-50 border-orange-100' : 
                        'bg-blue-50 border-blue-100'
                      }`}>
                        <div className="mt-0.5">
                          {alert.type === 'danger' && <AlertTriangle size={16} className="text-red-500" />}
                          {alert.type === 'warning' && <AlertTriangle size={16} className="text-orange-500" />}
                          {alert.type === 'success' && <CheckCircle2 size={16} className="text-[#034EA2]" />}
                        </div>
                        <div>
                          <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                            alert.type === 'danger' ? 'text-red-700' : alert.type === 'warning' ? 'text-orange-700' : 'text-[#034EA2]'
                          }`}>{alert.title}</p>
                          <p className="text-sm text-slate-700 font-medium">{alert.msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Matrix & Chart */}
              <div className="grid grid-cols-3 gap-6">
                
                {/* Partner Matrix (Col 1) */}
                <div className="col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-slate-100 flex items-center gap-2">
                    <BarChart3 className="text-[#034EA2]" size={18}/>
                    <h3 className="font-bold text-slate-800">Partner FTFR Matrix</h3>
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                    {currentMetrics.partnerFtfr.map(partner => (
                      <div key={partner.id}>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-xs font-bold text-slate-700">{partner.id} - {partner.name}</span>
                          <span className={`text-xs font-black ${partner.ftfr < 60 ? 'text-red-500' : 'text-green-600'}`}>{partner.ftfr}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ${partner.ftfr < 60 ? 'bg-red-400' : 'bg-green-500'}`} 
                            style={{ width: `${partner.ftfr}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual MTBF Explainer (Col 2 & 3) */}
                <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="text-[#034EA2]"/> A54 Battery: The Failure Wave</h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">Network Aggregation</span>
                  </div>
                  
                  <div className="relative h-48 w-full flex items-end justify-between border-b-2 border-slate-200 pb-4 px-4 mt-12">
                     {[...Array(12)].map((_, i) => {
                       const isWave = i === 9;
                       let heightClass = 'h-12 bg-slate-100';
                       if (isWave) {
                          heightClass = model === 'TO_BE' ? 'h-36 bg-[#034EA2] shadow-lg shadow-blue-500/30' : 'h-36 bg-red-400 shadow-lg shadow-red-500/30';
                       } else if (i === 7 && model === 'TO_BE') {
                          heightClass = 'h-24 bg-green-400 border-2 border-green-500 border-dashed opacity-60'; // Pre-order visual
                       }

                       return (
                        <div key={i} className="flex flex-col items-center gap-2 relative w-full px-1">
                          {i === 7 && model === 'TO_BE' && (
                            <div className="absolute -top-10 whitespace-nowrap text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">AI Pre-Order</div>
                          )}
                          <div className={`w-full max-w-[40px] rounded-t-lg transition-all duration-700 ease-in-out ${heightClass}`}></div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Mo {i+1}</span>
                        </div>
                     )})}
                     
                     {/* Threshold Lines */}
                     <div className="absolute top-[40%] left-0 w-full h-px bg-red-400/50 border-b border-dashed border-red-500 z-0"></div>
                     <div className="absolute top-[35%] right-4 bg-white border border-red-200 text-red-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        14m MTBF Wave Hits
                     </div>
                  </div>

                  <div className="mt-8 flex items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    {model === 'AS_IS' ? (
                      <p className="text-slate-600 font-medium text-sm">
                        <strong className="text-orange-600 block mb-1 text-base"><AlertTriangle className="inline pb-1"/> Blind to the Future</strong> 
                        Static thresholds ignore the 14-month MTBF. The network continues ordering fixed quantities,<br/>resulting in a massive, unmitigated shortfall in Month 10 when devices age out.
                      </p>
                    ) : (
                      <p className="text-slate-600 font-medium text-sm">
                        <strong className="text-[#034EA2] block mb-1 text-base"><CheckCircle2 className="inline pb-1"/> Proactive Mitigation</strong> 
                        System maps average fleet age against MTBF curves. Recognizing the wave is approaching,<br/>it auto-triggers a massive pre-order (Month 8) to fully absorb the Month 10 demand spike.
                      </p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* =========================================
              VIEW: PARTNER DETAILS
          ========================================= */}
          {view === 'PARTNER' && (
            <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
              
              {/* Partner Hero Header */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-64 bg-slate-50 border-l border-slate-100 flex flex-col justify-center px-8">
                   <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Backlog Weight</p>
                   <div className="text-4xl font-black text-slate-800">{partnerInfo.backlog} <span className="text-lg font-medium text-slate-500">jobs</span></div>
                   
                   <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-4 mb-2">SLA Score</p>
                   <div className="text-2xl font-bold text-[#034EA2]">{partnerInfo.score}</div>
                </div>

                <div className="flex items-center gap-6 z-10">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center border-2 border-blue-100 text-[#034EA2] shadow-inner">
                    <Factory size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{partnerInfo.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                        partnerInfo.tier === 'Platinum' ? 'bg-slate-900 text-white border-slate-800' : partnerInfo.tier === 'Gold' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>{partnerInfo.tier} Tier</span>
                    </div>
                    <p className="text-slate-500 font-medium flex items-center gap-1.5">
                      <MapPin size={16}/> {partnerInfo.region} Region • ID Code: {partnerInfo.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Partner Performance Stats ── */}
              {(() => {
                const pd = partnerDetails[selectedPartner];
                if (!pd) return null;
                return (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Scenario Badge */}
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                        model === 'TO_BE' ? 'bg-blue-50 text-[#034EA2] border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        <Hash size={12}/> Scenario: {pd.scenario}
                      </span>
                      <span className="text-xs text-slate-500 italic">{pd.highlight}</span>
                    </div>

                    {/* KPI Row */}
                    <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Monthly Repairs', value: pd.monthlyRepairs[model], unit: 'jobs', icon: <Wrench size={18}/>, color: 'text-[#034EA2] bg-blue-50' },
                        { label: 'Technicians', value: pd.techCount, unit: 'staff', icon: <Users size={18}/>, color: 'text-purple-600 bg-purple-50' },
                        { label: 'Utilization', value: `${pd.utilization[model]}%`, unit: '', icon: <Activity size={18}/>, color: model === 'TO_BE' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50' },
                        { label: 'Avg Turnaround', value: pd.avgTurnaroundHrs[model], unit: 'hrs', icon: <Clock size={18}/>, color: model === 'TO_BE' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50' },
                        { label: 'Open Escalations', value: pd.openEscalations[model], unit: '', icon: <AlertTriangle size={18}/>, color: pd.openEscalations[model] > 10 ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50' },
                      ].map((kpi, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col gap-2">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.color}`}>{kpi.icon}</div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{kpi.label}</p>
                            <p className="text-2xl font-black text-slate-900 leading-none">{kpi.value}<span className="text-sm font-medium text-slate-400 ml-1">{kpi.unit}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Customer Rating + FTFR by Part */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Customer Rating */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border-2 ${
                          pd.customerRating[model] >= 4.5 ? 'bg-green-50 text-green-700 border-green-200' :
                          pd.customerRating[model] >= 4.0 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {pd.customerRating[model]}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Customer Rating</p>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} size={14} className={s <= Math.round(pd.customerRating[model]) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'} />
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{model === 'AS_IS' ? 'Customer satisfaction low' : 'Improved with faster fixes'}</p>
                        </div>
                      </div>

                      {/* FTFR by Part */}
                      <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                          <BarChart3 size={13}/> FTFR Breakdown by Part
                        </p>
                        <div className="space-y-3">
                          {pd.ftfrByPart[model].map((fp, i) => (
                            <div key={i}>
                              <div className="flex justify-between items-end mb-1">
                                <div>
                                  <span className="text-xs font-bold text-slate-800">{fp.part}</span>
                                  <span className="text-[10px] text-slate-400 ml-2">— {fp.note}</span>
                                </div>
                                <span className={`text-xs font-black ml-4 shrink-0 ${fp.ftfr < 50 ? 'text-red-600' : fp.ftfr < 75 ? 'text-orange-600' : 'text-green-600'}`}>{fp.ftfr}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${fp.ftfr < 50 ? 'bg-red-400' : fp.ftfr < 75 ? 'bg-orange-400' : 'bg-green-500'}`}
                                  style={{ width: `${fp.ftfr}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Inventory Table Engine */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2"><Smartphone size={20} className="text-[#034EA2]"/> Part-Level Inventory Readiness</h3>
                    <p className="text-sm text-slate-500 mt-1">Analyzing physical stock against fleet demographics.</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-[10px] uppercase tracking-wider">
                        <th className="p-4 font-bold rounded-tl-xl">Component Info</th>
                        <th className="p-4 font-bold text-center">MTBF vs Age</th>
                        <th className="p-4 font-bold text-center">Unit Cost</th>
                        <th className="p-4 font-bold text-center border-l border-slate-200">Current Stock</th>
                        <th className="p-4 font-bold text-center">System Threshold</th>
                        <th className="p-4 font-bold">Status & AI Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(currentInventory || []).map((item, idx) => {
                        const totalValue = item.stock * item.cost;
                        
                        return (
                        <React.Fragment key={idx}>
                          {/* Main Row */}
                          <tr className="hover:bg-slate-50/50 transition-colors group">
                            <td className="p-5 align-top">
                              <p className="font-bold text-slate-900 text-base">{item.part}</p>
                              <p className="text-xs text-slate-500 mt-1 font-medium">{item.model}</p>
                              <p className="text-[10px] text-slate-400 mt-2 bg-slate-100 inline-block px-2 py-0.5 rounded">Fleet: {item.fleetSize} active</p>
                            </td>
                            
                            <td className="p-5 align-top">
                              <div className="flex flex-col items-center gap-1">
                                <div className="text-sm font-mono font-bold text-slate-700">{item.mtbf}</div>
                                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">MTBF</div>
                                <div className="h-px w-8 bg-slate-200 my-1"></div>
                                <div className={`text-sm font-mono font-bold ${model === 'TO_BE' ? 'text-[#034EA2]' : 'text-slate-500'}`}>{item.fleetAge}</div>
                                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Avg Age</div>
                              </div>
                            </td>

                            <td className="p-5 text-center align-top font-mono text-slate-600">
                              {formatCurrency(item.cost)}
                            </td>
                            
                            <td className="p-5 align-top border-l border-slate-100">
                              <div className="flex flex-col items-center">
                                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-black text-lg border-2 ${
                                  item.stock < 5 ? 'bg-red-50 text-red-600 border-red-200' : 
                                  item.stock > 100 ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                                }`}>
                                  {item.stock}
                                </span>
                                <div className="mt-2 text-[10px] text-slate-400 font-bold">
                                  VAL: <span className="text-slate-600">{formatCurrency(totalValue)}</span>
                                </div>
                              </div>
                            </td>

                            <td className="p-5 text-center align-top">
                              <div className={`inline-flex flex-col px-3 py-2 rounded-xl border ${
                                model === 'TO_BE' ? 'bg-blue-50 border-blue-200 text-[#034EA2]' : 'bg-slate-50 border-slate-200 text-slate-600'
                              }`}>
                                <span className="font-bold text-lg">{item.threshold.split(' ')[0]}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                                  {model === 'TO_BE' ? 'Dynamic' : 'Static'}
                                </span>
                              </div>
                            </td>

                            <td className="p-5 align-top w-1/3">
                              <div className="space-y-3">
                                <div className={`px-3 py-1.5 rounded-lg border inline-flex items-center gap-2 text-sm font-bold w-max shadow-sm ${
                                  item.alertType === 'danger' ? 'bg-red-50 text-red-700 border-red-200' :
                                  item.alertType === 'warning' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                  'bg-green-50 text-green-700 border-green-200'
                                }`}>
                                  {item.alertType === 'danger' && <AlertTriangle size={16}/>}
                                  {item.alertType === 'success' && <CheckCircle2 size={16}/>}
                                  {item.alertType === 'warning' && <AlertTriangle size={16}/>}
                                  {item.alert}
                                </div>
                                
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">System Action Taken</p>
                                  <p className={`text-sm font-bold flex items-center gap-1 ${
                                    item.action !== 'None' ? 'text-[#034EA2]' : 'text-slate-400'
                                  }`}>
                                    {item.action !== 'None' && <ArrowRight size={14}/>}
                                    {item.action}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          
                          {/* Deep Insight Sub-Row */}
                          <tr className={`border-b ${model === 'TO_BE' ? 'border-blue-100 bg-blue-50/30' : 'border-slate-200 bg-slate-50/50'}`}>
                            <td colSpan="6" className="p-4 px-6">
                              <div className="flex items-start gap-3">
                                <div className={`mt-0.5 ${model === 'TO_BE' ? 'text-[#034EA2]' : 'text-slate-400'}`}>
                                  {model === 'TO_BE' ? <BrainCircuit size={16}/> : <Info size={16}/>}
                                </div>
                                <div>
                                  <span className={`text-[10px] font-bold uppercase tracking-widest ${model === 'TO_BE' ? 'text-[#034EA2]' : 'text-slate-500'}`}>
                                    {model === 'TO_BE' ? 'AI Diagnostic Insight' : 'System Evaluation'}
                                  </span>
                                  <p className={`text-sm mt-0.5 ${model === 'TO_BE' ? 'text-blue-900 font-medium' : 'text-slate-600'}`}>
                                    {item.insight}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* =========================================
              VIEW: PART INTELLIGENCE
          ========================================= */}
          {view === 'PART' && (() => {
            const part = partNetworkData[selectedPart];
            if (!part) return null;
            const insight = part.networkInsight[model];

            const statusConfig = {
              critical:   { label: 'Critical',    cls: 'bg-red-50 text-red-700 border-red-200' },
              deficit:    { label: 'Deficit',     cls: 'bg-red-50 text-red-700 border-red-200' },
              low:        { label: 'Low Stock',   cls: 'bg-orange-50 text-orange-700 border-orange-200' },
              warning:    { label: 'Warning',     cls: 'bg-orange-50 text-orange-700 border-orange-200' },
              dead_stock: { label: 'Dead Stock',  cls: 'bg-orange-50 text-orange-700 border-orange-200' },
              surplus:    { label: 'Surplus',     cls: 'bg-orange-50 text-orange-700 border-orange-200' },
              stockout:   { label: 'Stockout',    cls: 'bg-red-50 text-red-700 border-red-200' },
              normal:     { label: 'Normal',      cls: 'bg-slate-50 text-slate-600 border-slate-200' },
              healthy:    { label: 'Healthy',     cls: 'bg-green-50 text-green-700 border-green-200' },
              buffer:     { label: 'Buffer OK',   cls: 'bg-green-50 text-green-700 border-green-200' },
              reserved:   { label: 'Reserved',    cls: 'bg-blue-50 text-[#034EA2] border-blue-200' },
              no_fleet:   { label: 'No Fleet',    cls: 'bg-slate-50 text-slate-400 border-slate-100' },
            };

            return (
              <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">

                {/* Page Header */}
                <div className="flex justify-between items-end border-b border-slate-200 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#034EA2]/10 text-[#034EA2] rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                      <Package size={13}/> Part Intelligence
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Network View: {part.name}</h2>
                    <p className="text-slate-500 mt-1 text-sm">Cross-partner stock, demand, and rebalancing signals for <strong>{part.code}</strong> · {part.compatibleModel}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="font-medium">MTBF</span>
                    <span className="font-black text-slate-800 text-lg">{part.mtbf}</span>
                    <span className="w-px h-6 bg-slate-200"></span>
                    <span className="font-medium">Unit Cost</span>
                    <span className="font-black text-slate-800 text-lg">{formatCurrency(part.cost)}</span>
                  </div>
                </div>

                {/* Part selector strip */}
                <div className="flex gap-3">
                  {Object.values(partNetworkData).map(p => (
                    <button
                      key={p.code}
                      onClick={() => setSelectedPart(p.code)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                        selectedPart === p.code
                          ? 'bg-[#034EA2] text-white border-[#034EA2] shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <Hash size={13}/>{p.code}
                      <span className={`text-[10px] font-medium ${selectedPart === p.code ? 'text-blue-200' : 'text-slate-400'}`}>{p.name}</span>
                    </button>
                  ))}
                </div>

                {/* Summary KPIs */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Network Total Stock', value: part.networkTotalStock, sub: 'units across all partners', icon: <Package size={20}/>, cls: 'text-[#034EA2] bg-blue-50' },
                    { label: 'Central Warehouse', value: part.centralWarehouse.available, sub: `${part.centralWarehouse.onOrder} on order`, icon: <Building2 size={20}/>, cls: 'text-purple-600 bg-purple-50' },
                    { label: 'Pending Allocations', value: part.centralWarehouse.pendingAlloc, sub: 'units reserved for partners', icon: <ArrowLeftRight size={20}/>, cls: part.centralWarehouse.pendingAlloc > 0 ? 'text-orange-600 bg-orange-50' : 'text-green-600 bg-green-50' },
                    { label: 'Partners With Fleet', value: part.partners.filter(p => p.hasFleet).length, sub: `of ${part.partners.length} in network`, icon: <MapPin size={20}/>, cls: 'text-slate-600 bg-slate-100' },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${kpi.cls}`}>{kpi.icon}</div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{kpi.label}</p>
                        <p className="text-2xl font-black text-slate-900 leading-none">{kpi.value}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Partner Rebalancing Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <ArrowLeftRight size={18} className="text-[#034EA2]"/>
                      Partner-by-Partner Rebalancing Analysis
                    </h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${model === 'TO_BE' ? 'bg-blue-50 text-[#034EA2] border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {model === 'TO_BE' ? 'Dynamic Thresholds Active' : 'Static Thresholds'}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-[10px] uppercase tracking-wider">
                          <th className="p-4 font-bold">Partner</th>
                          <th className="p-4 font-bold text-center">SLA Tier</th>
                          <th className="p-4 font-bold text-center">Fleet?</th>
                          <th className="p-4 font-bold text-center">Current Stock</th>
                          <th className="p-4 font-bold text-center">Threshold</th>
                          <th className="p-4 font-bold text-center">Demand /mo</th>
                          <th className="p-4 font-bold text-center">Surplus / Deficit</th>
                          <th className="p-4 font-bold">Recommended Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {part.partners.map(p => {
                          const threshold = model === 'TO_BE' ? p.threshold_tobe : p.threshold_asis;
                          const statusKey = model === 'TO_BE' ? p.status_tobe : p.status_asis;
                          const action = model === 'TO_BE' ? p.action_tobe : p.action_asis;
                          const sc = statusConfig[statusKey || 'no_fleet'] || statusConfig.no_fleet;
                          const surplus = p.hasFleet && threshold != null ? p.stock - threshold : null;

                          return (
                            <tr key={p.id} className={`hover:bg-slate-50/50 transition-colors ${!p.hasFleet ? 'opacity-50' : ''}`}>
                              <td className="p-4">
                                <p className="font-bold text-slate-900">{p.name}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">ID: {p.id}</p>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                                  p.tier === 'Platinum' ? 'bg-slate-800 text-white' : p.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-200 text-slate-600'
                                }`}>{p.tier}</span>
                              </td>
                              <td className="p-4 text-center">
                                {p.hasFleet
                                  ? <CheckCircle2 size={18} className="text-green-500 mx-auto"/>
                                  : <span className="text-xs text-slate-300 font-bold">—</span>
                                }
                              </td>
                              <td className="p-4 text-center">
                                {p.hasFleet ? (
                                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-black text-base border-2 ${
                                    p.stock === 0 ? 'bg-red-50 text-red-600 border-red-200' :
                                    p.stock > 50 ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                    'bg-slate-50 text-slate-700 border-slate-200'
                                  }`}>{p.stock}</span>
                                ) : <span className="text-slate-200 font-bold">—</span>}
                              </td>
                              <td className="p-4 text-center">
                                {threshold != null ? (
                                  <div className={`inline-flex flex-col px-3 py-1.5 rounded-xl border ${
                                    model === 'TO_BE' ? 'bg-blue-50 border-blue-200 text-[#034EA2]' : 'bg-slate-50 border-slate-200 text-slate-600'
                                  }`}>
                                    <span className="font-bold text-sm">{threshold}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{model === 'TO_BE' ? 'Dyn' : 'Static'}</span>
                                  </div>
                                ) : <span className="text-slate-200 font-bold">—</span>}
                              </td>
                              <td className="p-4 text-center">
                                {p.hasFleet && p.demand_mo > 0
                                  ? <span className="font-mono font-bold text-slate-700">{p.demand_mo}</span>
                                  : <span className="text-slate-200 font-bold">—</span>
                                }
                              </td>
                              <td className="p-4 text-center">
                                {surplus != null ? (
                                  <span className={`font-black text-base ${surplus >= 0 ? (surplus > 20 ? 'text-orange-500' : 'text-green-600') : 'text-red-600'}`}>
                                    {surplus >= 0 ? `+${surplus}` : surplus}
                                  </span>
                                ) : <span className="text-slate-200 font-bold">—</span>}
                              </td>
                              <td className="p-4">
                                {p.hasFleet ? (
                                  <div className="space-y-1.5">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${sc.cls}`}>
                                      {statusKey === 'critical' || statusKey === 'stockout' || statusKey === 'deficit' ? <AlertTriangle size={12}/> :
                                       statusKey === 'healthy' || statusKey === 'buffer' ? <CheckCircle2 size={12}/> :
                                       statusKey === 'surplus' || statusKey === 'dead_stock' ? <TrendingDown size={12}/> :
                                       <Info size={12}/>}
                                      {sc.label}
                                    </span>
                                    {action && action !== 'None' && (
                                      <p className="text-xs font-bold text-[#034EA2] flex items-center gap-1">
                                        <ArrowRight size={12}/>{action}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-slate-300">No fleet assigned for this part</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Central Warehouse + Rebalancing Policy */}
                <div className="grid grid-cols-2 gap-6">

                  {/* Central Warehouse Status */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                      <Building2 size={24}/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">Mother Warehouse (Central Hub)</h3>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        {[
                          { label: 'Available', value: part.centralWarehouse.available, cls: 'text-green-700 bg-green-50 border-green-200' },
                          { label: 'On Order',  value: part.centralWarehouse.onOrder,   cls: 'text-blue-700 bg-blue-50 border-blue-200' },
                          { label: 'Allocated', value: part.centralWarehouse.pendingAlloc, cls: part.centralWarehouse.pendingAlloc > 0 ? 'text-orange-700 bg-orange-50 border-orange-200' : 'text-slate-600 bg-slate-50 border-slate-200' },
                        ].map((s, i) => (
                          <div key={i} className={`rounded-xl border p-3 ${s.cls}`}>
                            <p className="text-2xl font-black">{s.value}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rebalancing Policy Banner */}
                  <div className="bg-slate-900 rounded-2xl p-6 flex items-start gap-4 text-white">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <ArrowLeftRight size={24} className="text-blue-300"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                        Rebalancing Policy
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase tracking-wider">Fallback</span>
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        When <strong className="text-white">partner-to-partner transfer infrastructure is not available</strong> at a client, surplus stock is automatically flagged for <strong className="text-blue-300">rollback to the Central Warehouse</strong>. The Mother Hub then becomes the single decision point for redistribution — maintaining full traceability and SLA-based prioritization without requiring bilateral partner coordination.
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        P2P rebalancing enabled when client systems support lateral transfers.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Insight */}
                <div className={`rounded-2xl border p-5 flex items-start gap-4 ${
                  model === 'TO_BE' ? 'bg-blue-50/60 border-blue-200' : 'bg-orange-50/60 border-orange-200'
                }`}>
                  <div className={`mt-0.5 shrink-0 ${model === 'TO_BE' ? 'text-[#034EA2]' : 'text-orange-600'}`}>
                    {model === 'TO_BE' ? <BrainCircuit size={20}/> : <AlertTriangle size={20}/>}
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${model === 'TO_BE' ? 'text-[#034EA2]' : 'text-orange-700'}`}>
                      {model === 'TO_BE' ? 'AI Network Insight' : 'Network Risk Assessment'}
                    </p>
                    <p className={`text-sm font-medium leading-relaxed ${model === 'TO_BE' ? 'text-blue-900' : 'text-orange-900'}`}>{insight}</p>
                  </div>
                </div>

              </div>
            );
          })()}

        </main>
      </div>
    </div>
  );
}