// ── Partner organisations (companies) ─────────────────────────────────────────
export const partnerOrgs = [
  { id: 'ORG-01', name: 'TechServ Corp',            tier: 'Platinum', region: 'Northeast',  score: '94%', totalBacklog: 70  },
  { id: 'ORG-02', name: 'Pacific Repair Group',      tier: 'Platinum', region: 'West',       score: '92%', totalBacklog: 95  },
  { id: 'ORG-03', name: 'MidWest Service Alliance',  tier: 'Gold',     region: 'Midwest',    score: '87%', totalBacklog: 151 },
  { id: 'ORG-04', name: 'Southern Tech Solutions',   tier: 'Gold',     region: 'South',      score: '88%', totalBacklog: 94  },
  { id: 'ORG-05', name: 'Heartland Repair',          tier: 'Silver',   region: 'Central/SW', score: '83%', totalBacklog: 54  },
];

// ── Individual service centers (flat list, grouped by orgId) ──────────────────
export const partners = [
  // TechServ Corp
  { id: 'S-045', orgId: 'ORG-01', name: 'TechServ — New York',       city: 'New York, NY',       region: 'Northeast', tier: 'Platinum', backlog: 42, score: '91%' },
  { id: 'S-046', orgId: 'ORG-01', name: 'TechServ — Boston',         city: 'Boston, MA',          region: 'Northeast', tier: 'Platinum', backlog: 28, score: '93%' },
  // Pacific Repair Group
  { id: 'S-092', orgId: 'ORG-02', name: 'Pacific — Los Angeles',     city: 'Los Angeles, CA',     region: 'West',      tier: 'Platinum', backlog: 45, score: '94%' },
  { id: 'S-093', orgId: 'ORG-02', name: 'Pacific — San Francisco',   city: 'San Francisco, CA',   region: 'West',      tier: 'Platinum', backlog: 31, score: '92%' },
  { id: 'S-094', orgId: 'ORG-02', name: 'Pacific — Seattle',         city: 'Seattle, WA',         region: 'West',      tier: 'Platinum', backlog: 19, score: '90%' },
  // MidWest Service Alliance
  { id: 'S-142', orgId: 'ORG-03', name: 'MidWest — Chicago',         city: 'Chicago, IL',         region: 'Midwest',   tier: 'Gold',     backlog: 124, score: '88%' },
  { id: 'S-187', orgId: 'ORG-03', name: 'MidWest — Naperville',      city: 'Naperville, IL',      region: 'Midwest',   tier: 'Gold',     backlog: 27,  score: '85%' },
  // Southern Tech Solutions
  { id: 'S-210', orgId: 'ORG-04', name: 'Southern — Dallas',         city: 'Dallas, TX',          region: 'South',     tier: 'Gold',     backlog: 56, score: '89%' },
  { id: 'S-211', orgId: 'ORG-04', name: 'Southern — Houston',        city: 'Houston, TX',         region: 'South',     tier: 'Gold',     backlog: 38, score: '87%' },
  // Heartland Repair
  { id: 'S-301', orgId: 'ORG-05', name: 'Heartland — Phoenix',       city: 'Phoenix, AZ',         region: 'Southwest', tier: 'Silver',   backlog: 33, score: '82%' },
  { id: 'S-302', orgId: 'ORG-05', name: 'Heartland — Denver',        city: 'Denver, CO',          region: 'Central',   tier: 'Silver',   backlog: 21, score: '84%' },
];

// ── Per-service-center performance detail ─────────────────────────────────────
export const partnerDetails = {
  'S-045': {
    scenario: 'Dead Stock Trap',
    monthlyRepairs: { AS_IS: 312, TO_BE: 356 },
    techCount: 8, utilization: { AS_IS: 74, TO_BE: 86 },
    avgTurnaroundHrs: { AS_IS: 4.2, TO_BE: 1.8 },
    customerRating: { AS_IS: 3.8, TO_BE: 4.6 },
    openEscalations: { AS_IS: 12, TO_BE: 2 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Back Panel (M34)',  ftfr: 88, note: 'Overstocked — $18K capital frozen' },
        { part: 'Battery (A54)',     ftfr: 51, note: 'Demand growing; static threshold barely covers' },
      ],
      TO_BE: [
        { part: 'Back Panel (M34)',  ftfr: 95, note: '50 units auto-transferred to Dallas; dead stock released' },
        { part: 'Battery (A54)',     ftfr: 89, note: 'MTBF threshold right-sized for young fleet age (10m)' },
      ],
    },
    highlight: 'New York hub has the lowest demand density but inherited bulk Back Panel stock. Capital is frozen in low-risk parts while other centers starve.',
  },
  'S-046': {
    scenario: 'Healthy with Opportunity',
    monthlyRepairs: { AS_IS: 198, TO_BE: 241 },
    techCount: 5, utilization: { AS_IS: 61, TO_BE: 78 },
    avgTurnaroundHrs: { AS_IS: 3.1, TO_BE: 1.5 },
    customerRating: { AS_IS: 4.1, TO_BE: 4.7 },
    openEscalations: { AS_IS: 4, TO_BE: 0 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Camera Module (S24U)', ftfr: 71, note: 'Moderate stock but threshold set too conservatively' },
        { part: 'Battery (A54)',         ftfr: 68, note: 'Static threshold misses growing demand' },
      ],
      TO_BE: [
        { part: 'Camera Module (S24U)', ftfr: 91, note: 'Dynamic threshold reduced buffer; freed $4K capital' },
        { part: 'Battery (A54)',         ftfr: 88, note: 'Pre-order triggered at 10m fleet age — wave covered' },
      ],
    },
    highlight: 'Boston is a smaller center with decent baseline performance. Biggest opportunity: AI right-sizing unlocks idle capital currently sitting in over-ordered parts.',
  },
  'S-092': {
    scenario: 'Chronic Shortage',
    monthlyRepairs: { AS_IS: 445, TO_BE: 501 },
    techCount: 11, utilization: { AS_IS: 68, TO_BE: 91 },
    avgTurnaroundHrs: { AS_IS: 5.8, TO_BE: 2.1 },
    customerRating: { AS_IS: 3.4, TO_BE: 4.7 },
    openEscalations: { AS_IS: 23, TO_BE: 1 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Charging Port (S24)', ftfr: 28, note: 'Only 3 units vs 12/mo demand — perpetual stockout' },
        { part: 'Camera Module (S24U)',ftfr: 55, note: 'Inconsistent supply; 2–3 week gaps common' },
      ],
      TO_BE: [
        { part: 'Charging Port (S24)', ftfr: 92, note: 'Threshold raised to 22; proactive PO triggered' },
        { part: 'Camera Module (S24U)',ftfr: 86, note: 'Demand forecast locked; buffer maintained' },
      ],
    },
    highlight: 'LA handles the highest repair volume on the West Coast. Two chronic shortages — S24 ports and camera modules — are responsible for 23 escalations/month.',
  },
  'S-093': {
    scenario: 'High-Cost Part Pressure',
    monthlyRepairs: { AS_IS: 267, TO_BE: 318 },
    techCount: 7, utilization: { AS_IS: 72, TO_BE: 88 },
    avgTurnaroundHrs: { AS_IS: 4.5, TO_BE: 2.0 },
    customerRating: { AS_IS: 3.7, TO_BE: 4.5 },
    openEscalations: { AS_IS: 11, TO_BE: 2 },
    ftfrByPart: {
      AS_IS: [
        { part: 'OLED Display (S24U)',  ftfr: 43, note: 'High device density; display failures spike at 24m' },
        { part: 'Logic Board (S24)',    ftfr: 61, note: 'Long lead-time part; static rules create waiting windows' },
      ],
      TO_BE: [
        { part: 'OLED Display (S24U)',  ftfr: 84, note: 'Priority allocation from central due to Platinum SLA' },
        { part: 'Logic Board (S24)',    ftfr: 79, note: '60m MTBF detected; forward buffer maintained' },
      ],
    },
    highlight: 'San Francisco fleet skews toward premium S24 Ultra devices with high-cost parts. Display and logic board failures dominate — both expensive and long lead-time.',
  },
  'S-094': {
    scenario: 'Underserved Market',
    monthlyRepairs: { AS_IS: 154, TO_BE: 202 },
    techCount: 4, utilization: { AS_IS: 55, TO_BE: 74 },
    avgTurnaroundHrs: { AS_IS: 3.8, TO_BE: 2.2 },
    customerRating: { AS_IS: 3.9, TO_BE: 4.4 },
    openEscalations: { AS_IS: 6, TO_BE: 1 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Battery (A54)',         ftfr: 58, note: 'Adequate stock but threshold wastes buffer capital' },
        { part: 'Speaker Assembly (A54)',ftfr: 47, note: 'Low-visibility part; not tracked in static system' },
      ],
      TO_BE: [
        { part: 'Battery (A54)',         ftfr: 84, note: 'Threshold right-sized; 8 units freed for other centers' },
        { part: 'Speaker Assembly (A54)',ftfr: 81, note: 'Added to MTBF tracking; first pre-order triggered' },
      ],
    },
    highlight: 'Seattle is the smallest Pacific center but growing fast. Speaker assembly failures — an often-invisible part — are the primary hidden drag on FTFR.',
  },
  'S-142': {
    scenario: 'Display Crisis + Battery Wave',
    monthlyRepairs: { AS_IS: 589, TO_BE: 672 },
    techCount: 14, utilization: { AS_IS: 91, TO_BE: 94 },
    avgTurnaroundHrs: { AS_IS: 7.2, TO_BE: 1.4 },
    customerRating: { AS_IS: 2.9, TO_BE: 4.9 },
    openEscalations: { AS_IS: 41, TO_BE: 0 },
    ftfrByPart: {
      AS_IS: [
        { part: 'OLED Display (S24U)', ftfr: 22, note: '0 units vs 14 open reservations — complete crisis' },
        { part: 'Battery (A54)',        ftfr: 44, note: '2nd MTBF cycle active; static PO insufficient' },
      ],
      TO_BE: [
        { part: 'OLED Display (S24U)', ftfr: 94, note: 'Priority allocation won vs Naperville (Gold > Silver)' },
        { part: 'Battery (A54)',        ftfr: 88, note: '42-unit wave pre-order fully absorbed the surge' },
      ],
    },
    highlight: 'Most distressed center in AS-IS. Highest volume (589 repairs/mo), Platinum SLA, yet critically short on two parts simultaneously — a dual-crisis scenario.',
  },
  'S-187': {
    scenario: 'Allocation Deferred',
    monthlyRepairs: { AS_IS: 198, TO_BE: 231 },
    techCount: 5, utilization: { AS_IS: 55, TO_BE: 72 },
    avgTurnaroundHrs: { AS_IS: 3.1, TO_BE: 2.6 },
    customerRating: { AS_IS: 4.0, TO_BE: 4.3 },
    openEscalations: { AS_IS: 6, TO_BE: 4 },
    ftfrByPart: {
      AS_IS: [
        { part: 'OLED Display (S24U)', ftfr: 60, note: 'Marginal cover — manual escalation required each cycle' },
        { part: 'Logic Board (S24)',   ftfr: 73, note: 'Adequate but over-buffered; excess holding cost' },
      ],
      TO_BE: [
        { part: 'OLED Display (S24U)', ftfr: 71, note: 'Allocation deferred to S-142; Gold SLA lower priority' },
        { part: 'Logic Board (S24)',   ftfr: 82, note: 'Right-sized buffer; excess redirected to Chicago' },
      ],
    },
    highlight: 'Naperville is smallest by volume and Gold tier. System correctly prioritizes Chicago in shortfall scenarios — SLA-based conflict resolution without phone calls.',
  },
  'S-210': {
    scenario: 'Rebalancing Beneficiary',
    monthlyRepairs: { AS_IS: 278, TO_BE: 334 },
    techCount: 7, utilization: { AS_IS: 62, TO_BE: 84 },
    avgTurnaroundHrs: { AS_IS: 6.5, TO_BE: 2.0 },
    customerRating: { AS_IS: 3.5, TO_BE: 4.5 },
    openEscalations: { AS_IS: 18, TO_BE: 1 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Battery (A54)',     ftfr: 38, note: 'Fleet at 30m — deep into 2nd cycle, severe shortage' },
        { part: 'Back Panel (M34)', ftfr: 0,  note: 'Zero stock — complete blockout, all jobs rescheduled' },
      ],
      TO_BE: [
        { part: 'Battery (A54)',     ftfr: 78, note: 'Partial allocation (9 units) from central (Gold SLA)' },
        { part: 'Back Panel (M34)', ftfr: 91, note: '50-unit inbound transfer from New York dead stock' },
      ],
    },
    highlight: 'Dallas was the silent victim in AS-IS — two stockouts hidden behind static rules. TO-BE resolves both via lateral rebalancing for $0 new procurement cost.',
  },
  'S-211': {
    scenario: 'Growing Volume Risk',
    monthlyRepairs: { AS_IS: 224, TO_BE: 271 },
    techCount: 6, utilization: { AS_IS: 67, TO_BE: 83 },
    avgTurnaroundHrs: { AS_IS: 4.8, TO_BE: 2.3 },
    customerRating: { AS_IS: 3.6, TO_BE: 4.4 },
    openEscalations: { AS_IS: 9, TO_BE: 1 },
    ftfrByPart: {
      AS_IS: [
        { part: 'USB-C Port (M34)',      ftfr: 45, note: 'Fleet at 21m vs 20m MTBF — actively in failure cycle' },
        { part: 'Speaker Assembly (A54)',ftfr: 52, note: 'Untracked part; demand growing invisibly' },
      ],
      TO_BE: [
        { part: 'USB-C Port (M34)',      ftfr: 87, note: 'MTBF engine flagged cycle entry; proactive PO triggered' },
        { part: 'Speaker Assembly (A54)',ftfr: 83, note: 'Added to monitoring; threshold set and stock reserved' },
      ],
    },
    highlight: 'Houston has the highest growth rate in the Southern network. Two low-visibility parts — USB-C ports and speakers — are silently degrading FTFR.',
  },
  'S-301': {
    scenario: 'Camera Module Crisis',
    monthlyRepairs: { AS_IS: 189, TO_BE: 228 },
    techCount: 5, utilization: { AS_IS: 58, TO_BE: 79 },
    avgTurnaroundHrs: { AS_IS: 5.2, TO_BE: 2.4 },
    customerRating: { AS_IS: 3.3, TO_BE: 4.3 },
    openEscalations: { AS_IS: 14, TO_BE: 2 },
    ftfrByPart: {
      AS_IS: [
        { part: 'Camera Module (S24U)',  ftfr: 18, note: 'High desert heat accelerates optical degradation' },
        { part: 'Battery (A54)',          ftfr: 49, note: 'Hot climate increases battery failure rate' },
      ],
      TO_BE: [
        { part: 'Camera Module (S24U)',  ftfr: 82, note: 'Climate-adjusted MTBF applied; buffer increased' },
        { part: 'Battery (A54)',          ftfr: 79, note: 'Regional failure-rate multiplier factored in' },
      ],
    },
    highlight: 'Phoenix climate (extreme heat) accelerates component failure beyond standard MTBF curves. Camera modules and batteries are disproportionately impacted.',
  },
  'S-302': {
    scenario: 'Thin Margins, Improving',
    monthlyRepairs: { AS_IS: 134, TO_BE: 168 },
    techCount: 3, utilization: { AS_IS: 49, TO_BE: 68 },
    avgTurnaroundHrs: { AS_IS: 4.1, TO_BE: 2.1 },
    customerRating: { AS_IS: 3.7, TO_BE: 4.2 },
    openEscalations: { AS_IS: 5, TO_BE: 1 },
    ftfrByPart: {
      AS_IS: [
        { part: 'USB-C Port (M34)',  ftfr: 52, note: 'Thin stock; reorders are reactive and slow' },
        { part: 'Back Panel (M34)', ftfr: 64, note: 'Adequate but threshold mismatch wastes capital' },
      ],
      TO_BE: [
        { part: 'USB-C Port (M34)',  ftfr: 84, note: 'Predictive PO removes reactive cycle' },
        { part: 'Back Panel (M34)', ftfr: 88, note: 'Dead stock detected and rerouted to Dallas' },
      ],
    },
    highlight: 'Denver is the smallest center in the network. Low volume means even one stockout disproportionately hits FTFR. Predictive stocking has outsized impact at this scale.',
  },
};
