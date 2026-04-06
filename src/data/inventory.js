export const inventoryData = {
  AS_IS: {
    'S-045': [
      { part: 'PT19 - Back Panel',    model: 'Galaxy M34',   mtbf: '48m', fleetAge: '12m', fleetSize: 850,  stock: 180, cost: 25,  threshold: '20',   action: 'None',          alert: 'Severe Dead Stock',     alertType: 'warning', insight: 'Stock covers 1,300+ days of demand. $4,500 capital is trapped.' },
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15,  cost: 35,  threshold: '15',   action: 'None',          alert: 'Normal',                alertType: 'success', insight: 'Stock matches static rules. System sees no issues.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '14m', fleetSize: 420,  stock: 8,   cost: 180, threshold: '8',    action: 'None',          alert: 'Normal',                alertType: 'success', insight: 'Fleet age well below MTBF. No risk flagged by static system.' },
    ],
    'S-046': [
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '12m', fleetSize: 680,  stock: 12,  cost: 35,  threshold: '10',   action: 'None',          alert: 'Normal',                alertType: 'success', insight: 'Static threshold met. Demand growth not anticipated.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '16m', fleetSize: 280,  stock: 5,   cost: 180, threshold: '5',    action: 'None',          alert: 'At Threshold',          alertType: 'warning', insight: 'Exactly at safety stock. Next failure spike will cause stockout.' },
    ],
    'S-092': [
      { part: 'PT08 - Charging Port', model: 'Galaxy S24',   mtbf: '18m', fleetAge: '20m', fleetSize: 920,  stock: 3,   cost: 45,  threshold: '10',   action: 'Emergency PO',  alert: 'Chronic Shortage',      alertType: 'danger',  insight: 'Burning 7–12 units/mo. Always reacting after stockouts.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '18m', fleetSize: 510,  stock: 4,   cost: 180, threshold: '8',    action: 'Wait for PO',   alert: 'Low Stock',             alertType: 'warning', insight: 'Fleet approaching 50% of MTBF — failure rate is climbing.' },
    ],
    'S-093': [
      { part: 'PT01 - OLED Display',  model: 'Galaxy S24U',  mtbf: '28m', fleetAge: '22m', fleetSize: 480,  stock: 5,   cost: 280, threshold: '12',   action: 'Wait for PO',   alert: 'Low Stock',             alertType: 'warning', insight: 'Fleet at 22m vs 28m MTBF. Failure rate accelerating; threshold too low.' },
      { part: 'PT05 - Logic Board',   model: 'Galaxy S24',   mtbf: '60m', fleetAge: '14m', fleetSize: 390,  stock: 3,   cost: 320, threshold: '4',     action: 'None',          alert: 'Normal',                alertType: 'success', insight: 'Long MTBF; static system holds minimal buffer. Appears fine.' },
    ],
    'S-094': [
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '16m', fleetSize: 560,  stock: 10,  cost: 35,  threshold: '10',   action: 'Standard PO',   alert: 'At Threshold',          alertType: 'warning', insight: 'Fleet past first MTBF cycle. Demand will accelerate but static rules ignore it.' },
      { part: 'PT12 - Speaker',       model: 'Galaxy A54',   mtbf: '24m', fleetAge: '16m', fleetSize: 560,  stock: 4,   cost: 45,  threshold: '5',    action: 'None',          alert: 'Low Stock',             alertType: 'warning', insight: 'Near-threshold stock. Speaker failures often occur with battery failures.' },
    ],
    'S-142': [
      { part: 'PT01 - OLED Display',  model: 'Galaxy S24U',  mtbf: '28m', fleetAge: '24m', fleetSize: 640,  stock: 0,   cost: 280, threshold: '15',   action: 'Wait for PO',   alert: 'Stockout Crisis',       alertType: 'danger',  insight: '14 open reservations. 0 parts in stock. Immediate SLA failure.' },
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12,  cost: 35,  threshold: '15',   action: 'Standard PO',   alert: 'Approaching Stockout',  alertType: 'warning', insight: 'Fleet hitting 2nd failure cycle. Static PO will be insufficient.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '24m', fleetSize: 640,  stock: 2,   cost: 180, threshold: '8',    action: 'Wait for PO',   alert: 'Critical Low',          alertType: 'danger',  insight: 'Fleet at 67% of MTBF. Camera failure wave approaching. Only 2 units remain.' },
    ],
    'S-187': [
      { part: 'PT01 - OLED Display',  model: 'Galaxy S24U',  mtbf: '28m', fleetAge: '24m', fleetSize: 310,  stock: 4,   cost: 280, threshold: '12',   action: 'Wait for PO',   alert: 'Low Stock',             alertType: 'warning', insight: 'Silver SLA center. System blindly holds parts here.' },
      { part: 'PT05 - Logic Board',   model: 'Galaxy S24',   mtbf: '60m', fleetAge: '18m', fleetSize: 220,  stock: 6,   cost: 320, threshold: '4',    action: 'None',          alert: 'Over-buffered',         alertType: 'warning', insight: 'Holding 6 units for a part with 60m MTBF. Excess holding cost.' },
    ],
    'S-210': [
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8,   cost: 35,  threshold: '15',   action: 'Standard PO',   alert: 'Approaching Stockout',  alertType: 'warning', insight: 'Fleet past 2nd MTBF cycle (28m). Demand wave already active.' },
      { part: 'PT19 - Back Panel',    model: 'Galaxy M34',   mtbf: '48m', fleetAge: '31m', fleetSize: 960,  stock: 0,   cost: 25,  threshold: '5',    action: 'None',          alert: 'Stockout',              alertType: 'danger',  insight: 'Zero stock. Rising demand hidden by static threshold.' },
    ],
    'S-211': [
      { part: 'PT21 - USB-C Port',    model: 'Galaxy M34',   mtbf: '20m', fleetAge: '21m', fleetSize: 720,  stock: 4,   cost: 28,  threshold: '8',    action: 'Wait for PO',   alert: 'Low Stock',             alertType: 'warning', insight: 'Fleet at 21m vs 20m MTBF. Already in failure cycle — demand accelerating.' },
      { part: 'PT12 - Speaker',       model: 'Galaxy A54',   mtbf: '24m', fleetAge: '18m', fleetSize: 580,  stock: 3,   cost: 45,  threshold: '5',    action: 'None',          alert: 'Low Stock',             alertType: 'warning', insight: 'Speaker failures not tracked. Approaching threshold with no reorder.' },
    ],
    'S-301': [
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '22m', fleetSize: 360,  stock: 1,   cost: 180, threshold: '6',    action: 'Emergency PO',  alert: 'Critical Stockout',     alertType: 'danger',  insight: 'Desert heat degrades optical components faster. Only 1 unit remains.' },
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '13m', fleetSize: 490,  stock: 9,   cost: 35,  threshold: '10',   action: 'None',          alert: 'At Threshold',          alertType: 'warning', insight: 'Near threshold. Climate accelerates failure; standard MTBF understates risk.' },
    ],
    'S-302': [
      { part: 'PT21 - USB-C Port',    model: 'Galaxy M34',   mtbf: '20m', fleetAge: '18m', fleetSize: 410,  stock: 5,   cost: 28,  threshold: '6',    action: 'None',          alert: 'At Threshold',          alertType: 'warning', insight: 'Approaching MTBF cycle end. Reactive system will miss the failure window.' },
      { part: 'PT19 - Back Panel',    model: 'Galaxy M34',   mtbf: '48m', fleetAge: '18m', fleetSize: 410,  stock: 22,  cost: 25,  threshold: '5',    action: 'None',          alert: 'Over-buffered',         alertType: 'warning', insight: 'Fleet age at 37% of MTBF. Holding 22 units for negligible current demand.' },
    ],
  },

  TO_BE: {
    'S-045': [
      { part: 'PT19 - Back Panel',    model: 'Galaxy M34',   mtbf: '48m', fleetAge: '12m', fleetSize: 850,  stock: 180, cost: 25,  threshold: '2 (Dyn)',  action: 'Auto-Transfer to Dallas',   alert: 'Rebalancing',            alertType: 'success', insight: 'AI flagged idle capital. 50 units auto-transferred to Dallas for $0 net cost.' },
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '10m', fleetSize: 1100, stock: 15,  cost: 35,  threshold: '12 (Dyn)', action: 'Optimized',                 alert: 'Healthy Buffer',         alertType: 'success', insight: 'Fleet age is young. MTBF wave is 4 months away. Stock maintained at right level.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '14m', fleetSize: 420,  stock: 8,   cost: 180, threshold: '5 (Dyn)',  action: 'Right-Sized',               alert: 'Optimized',              alertType: 'success', insight: 'Fleet at 39% of MTBF. Reduced buffer by 3 units, freeing $540 in capital.' },
    ],
    'S-046': [
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '12m', fleetSize: 680,  stock: 12,  cost: 35,  threshold: '14 (Dyn)', action: 'Proactive PO',              alert: 'Wave Approaching',       alertType: 'success', insight: 'Fleet at 12m — nearing first failure wave. AI staged stock ahead of expected spike.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '16m', fleetSize: 280,  stock: 5,   cost: 180, threshold: '8 (Dyn)',  action: 'Central Reserve Triggered', alert: 'Buffer Requested',       alertType: 'success', insight: 'Threshold raised to 8. Central warehouse reserved 3 units for Boston.' },
    ],
    'S-092': [
      { part: 'PT08 - Charging Port', model: 'Galaxy S24',   mtbf: '18m', fleetAge: '20m', fleetSize: 920,  stock: 15,  cost: 45,  threshold: '22 (Dyn)', action: 'Proactive PO Triggered',    alert: 'Matching Burn Rate',     alertType: 'success', insight: 'Threshold adjusted to match actual consumption (12/mo). Shortages eliminated.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '18m', fleetSize: 510,  stock: 12,  cost: 180, threshold: '14 (Dyn)', action: 'Demand-Matched PO',         alert: 'Stabilized',             alertType: 'success', insight: 'Camera demand curve mapped. Threshold raised to match fleet age trajectory.' },
    ],
    'S-093': [
      { part: 'PT01 - OLED Display',  model: 'Galaxy S24U',  mtbf: '28m', fleetAge: '22m', fleetSize: 480,  stock: 5,   cost: 280, threshold: '28 (Dyn)', action: 'Priority Allocation (Platinum)', alert: 'Deficit — Action Taken', alertType: 'success', insight: 'Platinum SLA. Central warehouse allocated 23 additional units ahead of demand peak.' },
      { part: 'PT05 - Logic Board',   model: 'Galaxy S24',   mtbf: '60m', fleetAge: '14m', fleetSize: 390,  stock: 3,   cost: 320, threshold: '3 (Dyn)',  action: 'Right-Sized',               alert: 'Healthy Buffer',         alertType: 'success', insight: '60m MTBF, fleet at 23%. One unit is sufficient buffer. Excess capital freed.' },
    ],
    'S-094': [
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '16m', fleetSize: 560,  stock: 10,  cost: 35,  threshold: '18 (Dyn)', action: 'Wave Pre-Order',            alert: '1st Cycle Wave Predicted', alertType: 'success', insight: 'Fleet past 1st MTBF cycle. Pre-order triggered 2 months before expected spike.' },
      { part: 'PT12 - Speaker',       model: 'Galaxy A54',   mtbf: '24m', fleetAge: '16m', fleetSize: 560,  stock: 8,   cost: 45,  threshold: '10 (Dyn)', action: 'Proactive PO',              alert: 'Buffer Staged',          alertType: 'success', insight: 'Speaker co-failure with battery tracked. Demand modeled jointly; stock staged.' },
    ],
    'S-142': [
      { part: 'PT01 - OLED Display',  model: 'Galaxy S24U',  mtbf: '28m', fleetAge: '24m', fleetSize: 640,  stock: 0,   cost: 280, threshold: '35 (Dyn)', action: 'Priority Allocation',       alert: 'Crisis Intercepted',     alertType: 'success', insight: 'AI rerouted customer to Store #187. Emergency inbound stock triggered from central.' },
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '28m', fleetSize: 1120, stock: 12,  cost: 35,  threshold: '42 (Dyn)', action: 'Wave Pre-Order',            alert: '2nd Cycle Wave Predicted', alertType: 'success', insight: '28m ÷ 14m MTBF = 2nd wave. 42 units pre-ordered to absorb full spike.' },
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '24m', fleetSize: 640,  stock: 2,   cost: 180, threshold: '18 (Dyn)', action: 'Emergency Central Alloc',   alert: 'Deficit — Escalated',    alertType: 'success', insight: 'Camera failure rate at 67% MTBF cycle. Central allocated 16 units on priority.' },
    ],
    'S-187': [
      { part: 'PT01 - OLED Display',  model: 'Galaxy S24U',  mtbf: '28m', fleetAge: '24m', fleetSize: 310,  stock: 4,   cost: 280, threshold: '18 (Dyn)', action: 'Allocation Deferred',       alert: 'Redirect Executed',      alertType: 'success', insight: 'Successfully fulfilled redirect from Chicago. Lower SLA = deferred allocation.' },
      { part: 'PT05 - Logic Board',   model: 'Galaxy S24',   mtbf: '60m', fleetAge: '18m', fleetSize: 220,  stock: 4,   cost: 320, threshold: '2 (Dyn)',  action: 'Excess Released to Central', alert: 'Capital Freed',         alertType: 'success', insight: '4 units vs 2 needed. 2 excess units returned to central; $640 freed.' },
    ],
    'S-210': [
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '30m', fleetSize: 1120, stock: 8,   cost: 35,  threshold: '38 (Dyn)', action: 'Partial Allocation',        alert: 'Conflict Managed',       alertType: 'success', insight: 'Shared limited central stock with Chicago. Dallas received 9 units (Gold SLA).' },
      { part: 'PT19 - Back Panel',    model: 'Galaxy M34',   mtbf: '48m', fleetAge: '31m', fleetSize: 960,  stock: 50,  cost: 25,  threshold: '15 (Dyn)', action: 'Inbound Transfer from NY',  alert: 'Rebalanced',             alertType: 'success', insight: 'AI connected New York dead stock to Dallas shortage. 50 units transferred, $0 cost.' },
    ],
    'S-211': [
      { part: 'PT21 - USB-C Port',    model: 'Galaxy M34',   mtbf: '20m', fleetAge: '21m', fleetSize: 720,  stock: 14,  cost: 28,  threshold: '16 (Dyn)', action: 'Proactive PO Triggered',    alert: 'Cycle Entry Detected',   alertType: 'success', insight: 'Fleet crossed 20m MTBF boundary. Failure rate now in active phase; stock staged.' },
      { part: 'PT12 - Speaker',       model: 'Galaxy A54',   mtbf: '24m', fleetAge: '18m', fleetSize: 580,  stock: 10,  cost: 45,  threshold: '12 (Dyn)', action: 'Added to MTBF Tracking',    alert: 'Now Tracked',            alertType: 'success', insight: 'Speaker failures added to predictive model. First pre-order issued automatically.' },
    ],
    'S-301': [
      { part: 'PT03 - Camera Module', model: 'Galaxy S24U',  mtbf: '36m', fleetAge: '22m', fleetSize: 360,  stock: 1,   cost: 180, threshold: '12 (Dyn)', action: 'Emergency Alloc + Climate Adj', alert: 'Climate Factor Applied', alertType: 'success', insight: 'Desert heat MTBF modifier applied (+15%). Central allocated 11 units on priority.' },
      { part: 'PT10 - Battery',       model: 'Galaxy A54',   mtbf: '14m', fleetAge: '13m', fleetSize: 490,  stock: 14,  cost: 35,  threshold: '16 (Dyn)', action: 'Climate-Adjusted PO',        alert: 'Regional Factor Applied', alertType: 'success', insight: 'Heat-accelerated degradation flagged. Threshold raised 20% above standard formula.' },
    ],
    'S-302': [
      { part: 'PT21 - USB-C Port',    model: 'Galaxy M34',   mtbf: '20m', fleetAge: '18m', fleetSize: 410,  stock: 10,  cost: 28,  threshold: '12 (Dyn)', action: 'Proactive PO',              alert: 'Wave Imminent',          alertType: 'success', insight: 'Fleet at 90% of MTBF cycle. Pre-order triggered to prevent stockout at cycle peak.' },
      { part: 'PT19 - Back Panel',    model: 'Galaxy M34',   mtbf: '48m', fleetAge: '18m', fleetSize: 410,  stock: 8,   cost: 25,  threshold: '4 (Dyn)',  action: 'Excess Flagged → Central',  alert: 'Capital Released',       alertType: 'success', insight: 'Right-sized from 22 to 4 units needed. 18 units returned to central; $450 freed.' },
    ],
  },
};
