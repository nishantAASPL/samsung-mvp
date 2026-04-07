import React, { useState, useMemo } from 'react';
import {
  MapPin, CheckCircle2, AlertTriangle, XCircle, ChevronDown, Phone, TrendingUp,
  Clock, User, Wrench, Filter, Search, BarChart3, Activity, Calendar,
  ArrowUpRight, ArrowDownRight, History, Inbox, Star, RefreshCw, Download,
  ChevronRight, Shield, Zap, Package
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
  ComposedChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { oemMetrics } from '../../data/mockData';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// Canonical part map — mirrors Part Intelligence exactly
const PARTS = {
  PT01: 'PT01 - S24U OLED Display',
  PT08: 'PT08 - S24 Charging Port',
  PT10: 'PT10 - A54 Battery',
  PT19: 'PT19 - M34 Back Panel',
  PT34: 'PT34 - M34 AMOLED Display',
  PT35: 'PT35 - Z Fold 4 Screen Protector',
  PT36: 'PT36 - Galaxy Watch 6 Battery',
};

const liveRequests = {
  AS_IS: [
    { id: 'REQ-20260407-001', device: 'Galaxy S24 Ultra', issueShort: 'OLED Display', tentativeParts: [PARTS.PT01], store: 'Store #142 (Chicago, IL)', status: 'RED', time: '09:14', customer: 'C-88291', warranty: 'Out of Warranty', issue: 'Shattered display, touch unresponsive at lower quadrant', date: 'Apr 7, 2026', age: '24', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260407-002', device: 'Galaxy A54', issueShort: 'Battery Replacement', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '09:32', customer: 'C-10934', warranty: 'In Warranty', issue: 'Rapid battery drain, slight swelling near port', date: 'Apr 7, 2026', age: '15', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260407-003', device: 'Galaxy Z Fold4', issueShort: 'Screen Protector', tentativeParts: [PARTS.PT35], store: 'Store #092 (Los Angeles, CA)', status: 'AMBER', time: '10:05', customer: 'C-44920', warranty: 'In Warranty', issue: 'Bubbling protector at hinge', date: 'Apr 7, 2026', age: '11', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260407-004', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '10:22', customer: 'C-33019', warranty: 'Out of Warranty', issue: 'Intermittent charging', date: 'Apr 7, 2026', age: '14', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260407-005', device: 'Galaxy M34', issueShort: 'Back Panel', tentativeParts: [PARTS.PT19], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '10:58', customer: 'C-99211', warranty: 'Out of Warranty', issue: 'Rear glass cracked', date: 'Apr 7, 2026', age: '18', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260407-006', device: 'Galaxy A54', issueShort: 'Battery Replacement', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '11:15', customer: 'C-11044', warranty: 'In Warranty', issue: 'Shutdown at 20%', date: 'Apr 7, 2026', age: '12', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260407-007', device: 'Galaxy M34', issueShort: 'AMOLED Display', tentativeParts: [PARTS.PT34], store: 'Store #142 (Chicago, IL)', status: 'AMBER', time: '11:24', customer: 'C-55821', warranty: 'Out of Warranty', issue: 'Ghost touch issues', date: 'Apr 7, 2026', age: '22', technician: 'Marcus T.', priority: 'Low' },
    { id: 'REQ-20260407-008', device: 'Galaxy S24 Ultra', issueShort: 'OLED Display', tentativeParts: [PARTS.PT01], store: 'Store #301 (Miami, FL)', status: 'RED', time: '11:45', customer: 'C-99012', warranty: 'In Warranty', issue: 'Dead pixel line', date: 'Apr 7, 2026', age: '2', technician: 'Elena V.', priority: 'High' },
    { id: 'REQ-20260407-009', device: 'Galaxy Watch 6', issueShort: 'Watch Battery', tentativeParts: [PARTS.PT36], store: 'Store #404 (Seattle, WA)', status: 'GREEN', time: '12:05', customer: 'C-22311', warranty: 'In Warranty', issue: 'Battery drain', date: 'Apr 7, 2026', age: '8', technician: 'Dana K.', priority: 'Standard' },
    { id: 'REQ-20260407-010', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #092 (Los Angeles, CA)', status: 'AMBER', time: '12:15', customer: 'C-44501', warranty: 'In Warranty', issue: 'Broken pins', date: 'Apr 7, 2026', age: '4', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260407-011', device: 'Galaxy M34', issueShort: 'Back Panel', tentativeParts: [PARTS.PT19], store: 'Store #142 (Chicago, IL)', status: 'RED', time: '12:40', customer: 'C-89033', warranty: 'In Warranty', issue: 'Shattered back', date: 'Apr 7, 2026', age: '6', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260407-012', device: 'Galaxy A54', issueShort: 'Battery Replacement', tentativeParts: [PARTS.PT10], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '13:02', customer: 'C-31199', warranty: 'Out of Warranty', issue: 'Overheating', date: 'Apr 7, 2026', age: '28', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260407-013', device: 'Galaxy S24 Ultra', issueShort: 'OLED Display', tentativeParts: [PARTS.PT01], store: 'Store #045 (New York, NY)', status: 'AMBER', time: '13:25', customer: 'C-10988', warranty: 'In Warranty', issue: 'Touch lag', date: 'Apr 7, 2026', age: '3', technician: 'Priya S.', priority: 'High' },
    { id: 'REQ-20260407-014', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '13:45', customer: 'C-99255', warranty: 'In Warranty', issue: 'Loose port', date: 'Apr 7, 2026', age: '14', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260407-015', device: 'Galaxy M34', issueShort: 'AMOLED Display', tentativeParts: [PARTS.PT34], store: 'Store #301 (Miami, FL)', status: 'GREEN', time: '14:10', customer: 'C-99055', warranty: 'Out of Warranty', issue: 'Screen flicker', date: 'Apr 7, 2026', age: '17', technician: 'Elena V.', priority: 'Standard' },
    { id: 'REQ-20260407-016', device: 'Galaxy A54', issueShort: 'Battery Replacement', tentativeParts: [PARTS.PT10], store: 'Store #404 (Seattle, WA)', status: 'AMBER', time: '14:30', customer: 'C-22399', warranty: 'In Warranty', issue: 'Fast drain', date: 'Apr 7, 2026', age: '5', technician: 'Dana K.', priority: 'High' },
    { id: 'REQ-20260407-017', device: 'Galaxy S24 Ultra', issueShort: 'OLED Display', tentativeParts: [PARTS.PT01], store: 'Store #142 (Chicago, IL)', status: 'GREEN', time: '15:05', customer: 'C-88211', warranty: 'Out of Warranty', issue: 'Cracked screen', date: 'Apr 7, 2026', age: '10', technician: 'Marcus T.', priority: 'Low' },
    { id: 'REQ-20260407-018', device: 'Galaxy Z Fold4', issueShort: 'Screen Protector', tentativeParts: [PARTS.PT35], store: 'Store #187 (Naperville, IL)', status: 'RED', time: '15:24', customer: 'C-33099', warranty: 'In Warranty', issue: 'Protector peeling', date: 'Apr 7, 2026', age: '1', technician: 'Laura M.', priority: 'High' },
    { id: 'REQ-20260407-019', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #092 (Los Angeles, CA)', status: 'GREEN', time: '15:45', customer: 'C-44511', warranty: 'In Warranty', issue: 'Moisture detected', date: 'Apr 7, 2026', age: '11', technician: 'James R.', priority: 'Standard' },
    { id: 'REQ-20260407-020', device: 'Galaxy M34', issueShort: 'Back Panel', tentativeParts: [PARTS.PT19], store: 'Store #045 (New York, NY)', status: 'AMBER', time: '16:10', customer: 'C-10922', warranty: 'Out of Warranty', issue: 'Swollen gap', date: 'Apr 7, 2026', age: '20', technician: 'Priya S.', priority: 'Standard' }
  ],
  TO_BE: [
    { id: 'REQ-20260407-001', device: 'Galaxy S24 Ultra', issueShort: 'OLED Display', tentativeParts: [PARTS.PT01], store: 'Store #142 (Chicago, IL)', status: 'AMBER', time: '09:14', customer: 'C-88291', warranty: 'Out of Warranty', issue: 'Shattered display', date: 'Apr 7, 2026', age: '24', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260407-002', device: 'Galaxy A54', issueShort: 'Battery Replacement', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '09:32', customer: 'C-10934', warranty: 'In Warranty', issue: 'Rapid battery drain', date: 'Apr 7, 2026', age: '15', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260407-003', device: 'Galaxy Z Fold4', issueShort: 'Screen Protector', tentativeParts: [PARTS.PT35], store: 'Store #092 (Los Angeles, CA)', status: 'GREEN', time: '10:05', customer: 'C-44920', warranty: 'In Warranty', issue: 'Peeling hinge protector', date: 'Apr 7, 2026', age: '11', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260407-004', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '10:22', customer: 'C-33019', warranty: 'Out of Warranty', issue: 'Port failure', date: 'Apr 7, 2026', age: '14', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260407-005', device: 'Galaxy M34', issueShort: 'Back Panel', tentativeParts: [PARTS.PT19], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '10:58', customer: 'C-99211', warranty: 'Out of Warranty', issue: 'Back glass cracked', date: 'Apr 7, 2026', age: '18', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260407-006', device: 'Galaxy A54', issueShort: 'Battery Replacement', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '11:15', customer: 'C-11044', warranty: 'In Warranty', issue: 'Battery drain', date: 'Apr 7, 2026', age: '12', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260407-007', device: 'Galaxy M34', issueShort: 'AMOLED Display', tentativeParts: [PARTS.PT34], store: 'Store #142 (Chicago, IL)', status: 'GREEN', time: '11:24', customer: 'C-55821', warranty: 'Out of Warranty', issue: 'Display flicker', date: 'Apr 7, 2026', age: '22', technician: 'Marcus T.', priority: 'Low' },
    { id: 'REQ-20260407-008', device: 'Galaxy S24 Ultra', issueShort: 'OLED Display', tentativeParts: [PARTS.PT01], store: 'Store #301 (Miami, FL)', status: 'GREEN', time: '11:45', customer: 'C-99012', warranty: 'In Warranty', issue: 'Dead pixel cluster', date: 'Apr 7, 2026', age: '2', technician: 'Elena V.', priority: 'High' },
    { id: 'REQ-20260407-009', device: 'Galaxy Watch 6', issueShort: 'Watch Battery', tentativeParts: [PARTS.PT36], store: 'Store #404 (Seattle, WA)', status: 'GREEN', time: '12:05', customer: 'C-22311', warranty: 'In Warranty', issue: "Watch won't charge", date: 'Apr 7, 2026', age: '8', technician: 'Dana K.', priority: 'Standard' },
    { id: 'REQ-20260407-010', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #092 (Los Angeles, CA)', status: 'GREEN', time: '12:15', customer: 'C-44501', warranty: 'In Warranty', issue: 'Moisture in port', date: 'Apr 7, 2026', age: '4', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260407-011', device: 'Galaxy M34', issueShort: 'AMOLED Display', tentativeParts: [PARTS.PT34], store: 'Store #142 (Chicago, IL)', status: 'AMBER', time: '12:40', customer: 'C-89033', warranty: 'In Warranty', issue: 'Hinge impact on screen', date: 'Apr 7, 2026', age: '6', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260407-012', device: 'Galaxy A54', issueShort: 'Battery Replacement', tentativeParts: [PARTS.PT10], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '13:02', customer: 'C-31199', warranty: 'Out of Warranty', issue: 'Overheating during charge', date: 'Apr 7, 2026', age: '28', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260407-013', device: 'Galaxy S24 Ultra', issueShort: 'OLED Display', tentativeParts: [PARTS.PT01], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '13:25', customer: 'C-10988', warranty: 'In Warranty', issue: 'Internal bleeding on screen', date: 'Apr 7, 2026', age: '3', technician: 'Priya S.', priority: 'High' },
    { id: 'REQ-20260407-014', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '13:45', customer: 'C-99255', warranty: 'In Warranty', issue: 'Port damaged by cable', date: 'Apr 7, 2026', age: '14', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260407-015', device: 'Galaxy M34', issueShort: 'AMOLED Display', tentativeParts: [PARTS.PT34], store: 'Store #301 (Miami, FL)', status: 'GREEN', time: '14:10', customer: 'C-99055', warranty: 'Out of Warranty', issue: 'Flicker at low brightness', date: 'Apr 7, 2026', age: '17', technician: 'Elena V.', priority: 'Standard' }
  ]
};

const historicalRequests = [
  { id: 'REQ-20260406-018', device: 'Galaxy S24', part: PARTS.PT08, store: 'Store #045 (NY)', status: 'RESOLVED', date: 'Apr 6', resolution: '1.2', outcome: 'First-Time Fix', technician: 'Priya S.', customer: 'C-11234', warranty: 'In Warranty' },
  { id: 'REQ-20260406-019', device: 'Galaxy S24 Ultra', part: PARTS.PT01, store: 'Store #142 (CHI)', status: 'RESOLVED', date: 'Apr 6', resolution: '3.1', outcome: 'Part Substituted', technician: 'Marcus T.', customer: 'C-20812', warranty: 'Out of Warranty' },
  { id: 'REQ-20260406-020', device: 'Galaxy M34', part: PARTS.PT19, store: 'Store #210 (DAL)', status: 'RESCHEDULED', date: 'Apr 6', resolution: '--', outcome: 'Awaiting Stock', technician: 'Raj P.', customer: 'C-55099', warranty: 'Out of Warranty' },
  { id: 'REQ-20260405-012', device: 'Galaxy M34', part: PARTS.PT34, store: 'Store #092 (LA)', status: 'RESOLVED', date: 'Apr 5', resolution: '4.8', outcome: 'First-Time Fix', technician: 'James R.', customer: 'C-87401', warranty: 'In Warranty' },
  { id: 'REQ-20260405-013', device: 'Galaxy A54', part: PARTS.PT10, store: 'Store #187 (NAP)', status: 'RESOLVED', date: 'Apr 5', resolution: '0.9', outcome: 'First-Time Fix', technician: 'Laura M.', customer: 'C-30099', warranty: 'In Warranty' },
  { id: 'REQ-20260405-014', device: 'Galaxy S24 Ultra', part: PARTS.PT01, store: 'Store #404 (SEA)', status: 'ESCALATED', date: 'Apr 5', resolution: '--', outcome: 'Supply Chain Escalation', technician: 'Dana K.', customer: 'C-60022', warranty: 'Out of Warranty' },
  { id: 'REQ-20260404-009', device: 'Galaxy S24', part: PARTS.PT08, store: 'Store #301 (MIA)', status: 'RESOLVED', date: 'Apr 4', resolution: '6.2', outcome: 'First-Time Fix', technician: 'Omar N.', customer: 'C-14455', warranty: 'In Warranty' },
  { id: 'REQ-20260404-010', device: 'Galaxy S24', part: PARTS.PT08, store: 'Store #045 (NY)', status: 'RESOLVED', date: 'Apr 4', resolution: '1.0', outcome: 'First-Time Fix', technician: 'Priya S.', customer: 'C-77821', warranty: 'In Warranty' },
  { id: 'REQ-20260404-011', device: 'Galaxy S24 Ultra', part: PARTS.PT01, store: 'Store #142 (CHI)', status: 'RESCHEDULED', date: 'Apr 4', resolution: '--', outcome: 'Customer No-Show', technician: 'Marcus T.', customer: 'C-44001', warranty: 'Out of Warranty' }
];

// ─── ANALYTICS DATA ───────────────────────────────────────────────────────────
const regionalDistributionData = [
  { region: 'Northeast', requests: 145, color: '#6366F1' },
  { region: 'Midwest', requests: 112, color: '#10B981' },
  { region: 'South', requests: 88, color: '#F59E0B' },
  { region: 'West', requests: 132, color: '#8B5CF6' },
  { region: 'Southeast', requests: 65, color: '#06B6D4' }
];

const warrantyMixData = [
  { name: 'In Warranty', value: 68, color: '#10B981' },
  { name: 'Out of Warranty', value: 32, color: '#9CA3AF' }
];

const modelComplexityData = [
  { model: 'S24 Ultra', complexity: 85, avgTime: 4.2 },
  { model: 'S24', complexity: 65, avgTime: 3.1 },
  { model: 'Z Fold5', complexity: 95, avgTime: 5.8 },
  { model: 'Z Flip5', complexity: 90, avgTime: 5.2 },
  { model: 'A54', complexity: 45, avgTime: 1.8 },
  { model: 'M34', complexity: 35, avgTime: 1.2 }
];

const requestHeatmapData = [
  { day: 'Mon', morning: 12, afternoon: 24, evening: 18 },
  { day: 'Tue', morning: 15, afternoon: 28, evening: 22 },
  { day: 'Wed', morning: 18, afternoon: 35, evening: 25 },
  { day: 'Thu', morning: 22, afternoon: 42, evening: 30 },
  { day: 'Fri', morning: 25, afternoon: 48, evening: 15 },
  { day: 'Sat', morning: 35, afternoon: 52, evening: 12 },
  { day: 'Sun', morning: 10, afternoon: 15, evening: 8 }
];

const techLoadData = [
  { tech: 'Marcus T.', active: 8, load: 92 },
  { tech: 'Priya S.', active: 12, load: 78 },
  { tech: 'James R.', active: 6, load: 85 },
  { tech: 'Laura M.', active: 9, load: 65 },
  { tech: 'Raj P.', active: 4, load: 45 },
  { tech: 'Elena V.', active: 7, load: 72 }
];

const topOutliers = [
  { id: 'REQ-X920', device: 'Z Fold5', resolution: '18.4h', reason: 'Adhesive Failure (Retry)' },
  { id: 'REQ-B221', device: 'S24 Ultra', resolution: '12.2h', reason: 'Substrate Cleaning Delay' },
  { id: 'REQ-C881', device: 'Z Flip5', resolution: '11.5h', reason: 'Cable Rerouting Issue' }
];

const resolutionEfficiency = [
  { week: 'W1', value: 68 },
  { week: 'W2', value: 72 },
  { week: 'W3', value: 75 },
  { week: 'W4', value: 82 },
  { week: 'W5', value: 91 }
];

const weeklyVolumeData = [
  { week: 'Wk 1 (Mar 10)', requests: 34, resolved: 28, ftfr: 82, backlog: 6 },
  { week: 'Wk 2 (Mar 17)', requests: 41, resolved: 35, ftfr: 85, backlog: 12 },
  { week: 'Wk 3 (Mar 24)', requests: 38, resolved: 33, ftfr: 87, backlog: 17 },
  { week: 'Wk 4 (Mar 31)', requests: 52, resolved: 44, ftfr: 84, backlog: 25 },
  { week: 'Wk 5 (Apr 7)', requests: 47, resolved: 43, ftfr: 91, backlog: 29 },
];

// NEW: SKU Specific Trends
const partTrendData = {
  'PT01': [
    { date: 'Apr 01', demand: 12, arrival: 10, gap: 2 },
    { date: 'Apr 02', demand: 15, arrival: 12, gap: 3 },
    { date: 'Apr 03', demand: 8, arrival: 15, gap: -7 },
    { date: 'Apr 04', demand: 22, arrival: 14, gap: 8 },
    { date: 'Apr 05', demand: 18, arrival: 18, gap: 0 },
  ],
  'PT10': [
    { date: 'Apr 01', demand: 5, arrival: 8, gap: -3 },
    { date: 'Apr 02', demand: 7, arrival: 6, gap: 1 },
    { date: 'Apr 03', demand: 12, arrival: 10, gap: 2 },
    { date: 'Apr 04', demand: 15, arrival: 12, gap: 3 },
    { date: 'Apr 05', demand: 9, arrival: 15, gap: -6 },
  ]
};

const resolutionTimeData = [
  { week: 'W1', avgHours: 3.8 },
  { week: 'W2', avgHours: 3.4 },
  { week: 'W3', avgHours: 3.1 },
  { week: 'W4', avgHours: 2.9 },
  { week: 'W5', avgHours: 2.4 },
];

// NEW: RCA Data - Failure Drivers (Pareto)
const rootCauseData = [
  { cause: 'Physical Impact (Drops)', count: 42, color: '#6366F1', percentage: 45 },
  { cause: 'Thermal Stress (Battery)', count: 18, color: '#10B981', percentage: 65 },
  { cause: 'Moisture ingress', count: 12, color: '#F59E0B', percentage: 78 },
  { cause: 'Connector Fatigue', count: 8, color: '#EF4444', percentage: 90 },
  { cause: 'Firmware/Logic', count: 5, color: '#9CA3AF', percentage: 100 },
];

// NEW: Device Stress Radar
const stressVectorData = [
  { subject: 'Impact Res.', A: 120, B: 110, fullMark: 150 },
  { subject: 'Thermal Sol.', A: 98, B: 130, fullMark: 150 },
  { subject: 'Water Res.', A: 86, B: 130, fullMark: 150 },
  { subject: 'Adhesion', A: 99, B: 100, fullMark: 150 },
  { subject: 'Cycle Life', A: 85, B: 90, fullMark: 150 },
];

// NEW: SLA Performance Heatmap (Mocked)
const slaStorePerformance = [
  { store: 'NY-045', slaRate: 94, load: 82 },
  { store: 'LA-092', slaRate: 88, load: 95 },
  { store: 'CHI-142', slaRate: 96, load: 74 },
  { store: 'DAL-210', slaRate: 91, load: 68 },
  { store: 'MIA-301', slaRate: 72, load: 99 },
];

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-3 text-xs">
        <p className="font-black text-gray-700 mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }}></div>
            <span className="text-gray-500 font-semibold">{p.name}:</span>
            <span className="font-black text-gray-900">{p.value}{p.name === 'FTFR' || p.name === 'ftfr' ? '%' : p.name === 'avgHours' ? 'h' : ''}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ReservationQueue({ model }) {
  const [activeTab, setActiveTab] = useState('live');
  const [reqFilter, setReqFilter] = useState('All');
  const [activeReqId, setActiveReqId] = useState(liveRequests[model][0].id);
  const [toastMessage, setToastMessage] = useState(null);
  const [contextOpen, setContextOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [historyFilter, setHistoryFilter] = useState('All');
  const [selectedAnalyicsPart, setSelectedAnalyticsPart] = useState('PT01');

  const isToBe = model === 'TO_BE';
  const qStats = oemMetrics[model].queueStats;
  const currentReqs = liveRequests[model];
  const activeReq = currentReqs.find(r => r.id === activeReqId) || currentReqs[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredLive = currentReqs.filter(r => {
    const matchesFilter = reqFilter === 'All' ? true : reqFilter === 'Ready' ? r.status === 'GREEN' : r.status !== 'GREEN';
    const matchesSearch = !searchQuery || r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.device.toLowerCase().includes(searchQuery.toLowerCase()) || r.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredHistory = historicalRequests.filter(r => {
    if (historyFilter === 'All') return true;
    return r.status === historyFilter;
  });

  const statusColor = { GREEN: '#10B981', AMBER: '#F59E0B', RED: '#EF4444' };
  const priorityColor = { Critical: 'bg-red-100 text-red-700', High: 'bg-orange-100 text-orange-700', Standard: 'bg-blue-100 text-blue-700', Low: 'bg-gray-100 text-gray-600' };
  const histStatusColor = { RESOLVED: 'bg-emerald-50 text-emerald-700', RESCHEDULED: 'bg-amber-50 text-amber-700', ESCALATED: 'bg-red-50 text-red-700' };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] max-w-[1440px] mx-auto w-full animate-in fade-in duration-500 relative pb-10">
      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-4">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <Inbox className="text-white" size={20} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Requests Hub <span className="text-indigo-600">Control</span></h2>
          </div>
          <p className="text-sm font-semibold text-gray-400 ml-12">Live triage of incoming service requests with full lifecycle tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* ── KPI STRIP ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Today's Requests", value: qStats.total, icon: Activity, color: 'indigo', trend: '+8%' },
          { label: 'Approved', value: qStats.approved, icon: CheckCircle2, color: 'emerald', trend: isToBe ? '+18%' : '+2%' },
          { label: 'Redirected', value: qStats.redirected, icon: ArrowUpRight, color: 'amber', trend: isToBe ? '-4%' : '+12%' },
          { label: 'Pending Restock', value: qStats.pending, icon: Package, color: 'red', trend: isToBe ? '-91%' : '+34%' },
          { label: 'FTFR Rate', value: `${qStats.ftfr}`, icon: Star, color: 'indigo', trend: isToBe ? '+35pp' : '-12pp' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between hover:border-indigo-200 transition-all group overflow-hidden relative">
            <div className="absolute -right-3 -bottom-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <kpi.icon size={70} />
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-xl bg-${kpi.color}-50 text-${kpi.color}-600 group-hover:scale-110 transition-transform`}>
                <kpi.icon size={16} />
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${kpi.trend.startsWith('+') && !kpi.label.includes('Pending') ? 'bg-emerald-50 text-emerald-600' : kpi.trend.startsWith('-') && kpi.label.includes('Pending') ? 'bg-emerald-50 text-emerald-600' : kpi.trend.startsWith('+') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <p className="text-2xl font-black text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* ── TABS ── */}
      <div className="flex gap-2 mb-5 border-b border-gray-200 pb-0">
        {[
          { id: 'live', label: 'Live Queue', icon: Inbox },
          { id: 'history', label: 'Request History', icon: History },
          { id: 'analytics', label: 'Analytics & EDA', icon: BarChart3 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          TAB: LIVE QUEUE
      ═══════════════════════════════════════════════════ */}
      {activeTab === 'live' && (
        <div className="flex gap-5 flex-1 overflow-hidden min-h-[600px]">
          {/* LEFT: Request List */}
          <div className="w-[38%] bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden flex-shrink-0">
            {/* Search & Filter */}
            <div className="p-3 border-b border-gray-100 bg-gray-50/50 space-y-2 flex-shrink-0">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, device, customer..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-xl outline-none focus:border-indigo-400 transition-colors"
                />
              </div>
              <div className="flex gap-1.5">
                {['All', 'Ready', 'Needs Action'].map(f => (
                  <button key={f} onClick={() => setReqFilter(f)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${reqFilter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {/* List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-1.5">
              {filteredLive.map(req => (
                <div
                  key={req.id}
                  onClick={() => setActiveReqId(req.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all group ${activeReqId === req.id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-gray-100 hover:border-indigo-100 hover:shadow-sm'}`}
                  style={{ borderLeftWidth: '3px', borderLeftColor: statusColor[req.status] }}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`font-black text-[11px] ${activeReqId === req.id ? 'text-indigo-700' : 'text-gray-800'}`}>{req.id}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${priorityColor[req.priority]}`}>{req.priority}</span>
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-0.5"><Clock size={10}/>{req.time}</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-gray-800 truncate mb-0.5">{req.device}</div>
                  <div className="text-[10px] font-bold text-indigo-500 truncate mb-1.5">{req.issueShort}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-gray-500 flex items-center gap-1 font-semibold"><MapPin size={10} className="text-gray-400"/>{req.store.split('(')[0].trim()}</div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1"><User size={10}/>{req.technician}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Request Detail */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-y-auto">
            {!activeReq ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-semibold">Select a request to view details</div>
            ) : (
              <div className="p-6 space-y-5">
                {/* Detail Header */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-gray-900">{activeReq.id}</h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${priorityColor[activeReq.priority]}`}>{activeReq.priority}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500">{activeReq.device} · {activeReq.warranty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor[activeReq.status] }}></div>
                    <span className="text-xs font-black text-gray-600 uppercase tracking-wide">{activeReq.status === 'GREEN' ? 'Part Ready' : activeReq.status === 'AMBER' ? 'Needs Redirect' : 'Stockout'}</span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Wrench size={12}/> Request Details</h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Request ID</span><span className="font-bold text-gray-900">{activeReq.id}</span></div>
                    <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Customer ID</span><span className="font-bold text-gray-900">{activeReq.customer}</span></div>
                    <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Assigned Technician</span><span className="font-bold text-gray-900">{activeReq.technician}</span></div>
                    <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Preferred Store</span><span className="font-bold text-gray-900 flex items-center gap-1"><MapPin size={12} className="text-indigo-600"/>{activeReq.store}</span></div>
                    <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Reservation Date</span><span className="font-bold text-gray-900">{activeReq.date}</span></div>
                    <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Warranty Status</span><span className={`font-bold text-xs px-2 py-0.5 rounded-full inline-block ${activeReq.warranty === 'In Warranty' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{activeReq.warranty}</span></div>
                    <div className="col-span-2 pt-3 border-t border-gray-200">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Tentative Part Number(s)</span>
                      <div className="flex flex-wrap gap-2">
                        {activeReq.tentativeParts.map((p, i) => (
                          <span key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[11px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5">
                            <Package size={10}/> {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2"><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Issue Reported</span><span className="font-semibold text-gray-700 text-sm leading-relaxed">{activeReq.issue}</span></div>
                  </div>
                </div>

                {/* Status Action Panel */}
                {activeReq.status === 'GREEN' && (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-5 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                    <CheckCircle2 size={36} className="text-emerald-600 mb-3" />
                    <h3 className="text-base font-black text-emerald-900 mb-1">Part Available at Preferred Store</h3>
                    <p className="text-xs text-emerald-700 font-semibold mb-5">Stock confirmed: 12 units · Safety Threshold: 5 units</p>
                    <div className="flex gap-3">
                      <button onClick={() => showToast(`✅ Reservation ${activeReq.id} Approved`)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-6 rounded-xl shadow-md shadow-emerald-200 transition-all text-sm">
                        Approve Reservation
                      </button>
                      <button onClick={() => showToast('Assigned to next technician slot')} className="bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 font-bold py-2.5 px-4 rounded-xl text-sm transition-all">
                        Assign Slot
                      </button>
                    </div>
                    {isToBe && <p className="text-[10px] text-emerald-600 font-bold mt-4 flex items-center gap-1"><Zap size={10}/> AI pre-stocked this location ahead of MTBF demand wave.</p>}
                  </div>
                )}

                {activeReq.status === 'AMBER' && isToBe && (
                  <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl animate-in fade-in zoom-in-95">
                    <div className="flex flex-col items-center text-center mb-4">
                      <AlertTriangle size={32} className="text-amber-500 mb-2" />
                      <h3 className="font-black text-amber-900">Preferred Store Out of Stock</h3>
                      <p className="text-xs text-amber-700 font-semibold mt-1">Alternate locations identified automatically.</p>
                    </div>
                    <div className="bg-white rounded-xl border border-amber-100 overflow-hidden mb-4">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-amber-50 border-b border-amber-100">
                          <tr><th className="p-3 text-amber-900 font-black">Alternative Store</th><th className="p-3 text-amber-900 font-black">Distance</th><th className="p-3 text-amber-900 font-black text-right">Stock</th></tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-amber-50/30 transition-colors"><td className="p-3 font-bold text-gray-800">Store #187 (Naperville)</td><td className="p-3 text-gray-500">8.2 mi</td><td className="p-3 font-black text-emerald-600 text-right">4 units</td></tr>
                          <tr className="hover:bg-amber-50/30 transition-colors"><td className="p-3 font-bold text-gray-800">Store #210 (Schaumburg)</td><td className="p-3 text-gray-500">14.1 mi</td><td className="p-3 font-black text-emerald-600 text-right">11 units</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => showToast('Redirected to Store #187')} className="bg-amber-500 hover:bg-amber-600 text-white font-black py-2.5 px-5 rounded-xl shadow-md transition-all text-sm">Redirect → #187</button>
                      <button onClick={() => showToast('Rescheduled for restock')} className="bg-white border border-amber-200 text-amber-700 font-bold py-2.5 px-5 rounded-xl text-sm transition-all hover:border-amber-400">Schedule Wait</button>
                    </div>
                  </div>
                )}

                {activeReq.status === 'AMBER' && !isToBe && (
                  <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                    <AlertTriangle size={32} className="text-amber-500 mb-2" />
                    <h3 className="font-black text-amber-900 mb-1">Local Stock-Out · No Network Visibility</h3>
                    <div className="bg-white w-full p-4 rounded-xl border border-amber-200 my-4 flex flex-col items-center gap-2">
                      <Phone size={24} className="text-gray-400" />
                      <p className="text-xs font-semibold text-gray-600">Manager must manually call nearby stores to locate inventory.</p>
                    </div>
                    <button onClick={() => showToast('Rescheduled for Apr 10')} className="bg-amber-500 hover:bg-amber-600 text-white font-black py-2.5 px-6 rounded-xl shadow-md transition-all text-sm">Reschedule to Apr 10</button>
                  </div>
                )}

                {activeReq.status === 'RED' && (
                  <div className="bg-red-50 border border-red-200 p-5 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                    <XCircle size={32} className="text-red-500 mb-2" />
                    <h3 className="font-black text-red-900 mb-1">Regional Stock-Out</h3>
                    <p className="text-xs text-red-700 font-semibold mb-1">No viable stock within 25-mile radius.</p>
                    <span className="text-[10px] text-red-700 font-black bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider mb-5">ETA: Apr 9 (5 days)</span>
                    <div className="flex gap-3">
                      <button onClick={() => showToast('Rescheduled to Apr 10')} className="bg-red-600 hover:bg-red-700 text-white font-black py-2.5 px-5 rounded-xl shadow-md transition-all text-sm">Reschedule → Apr 10</button>
                      <button onClick={() => showToast('Escalated to Supply Chain')} className="bg-white border border-red-200 text-red-700 font-bold py-2.5 px-5 rounded-xl text-sm hover:border-red-400 transition-all">Escalate</button>
                    </div>
                  </div>
                )}

                {/* Device Context (Collapsible) */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button onClick={() => setContextOpen(!contextOpen)} className="w-full p-4 font-black text-gray-700 text-xs flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Shield size={12} className="text-indigo-600"/> Device History & Context</span>
                    <ChevronDown size={14} className={`transition-transform ${contextOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {contextOpen && (
                    <div className="p-5 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm bg-white">
                      <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Device Age</span><span className="font-bold text-gray-800">{activeReq.age} months</span></div>
                      <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Prior Repairs</span><span className="font-bold text-gray-800">0 on record</span></div>
                      <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Regional Install Base</span><span className="font-bold text-gray-800">12,450 active units</span></div>
                      <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Assigned Slot</span><span className="font-bold text-gray-800">{activeReq.time} · {activeReq.date}</span></div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB: HISTORY
      ═══════════════════════════════════════════════════ */}
      {activeTab === 'history' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2"><History size={14} className="text-indigo-600"/> Showing last 30 days</h3>
            <div className="flex gap-2">
              {['All', 'RESOLVED', 'RESCHEDULED', 'ESCALATED'].map(f => (
                <button key={f} onClick={() => setHistoryFilter(f)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${historyFilter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'}`}>
                  {f === 'All' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Request ID', 'Date', 'Device', 'Part Used', 'Store', 'Technician', 'Resolution Time', 'Outcome', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredHistory.map((r, i) => (
                  <tr key={i} className="hover:bg-indigo-50/30 transition-colors group cursor-pointer">
                    <td className="px-4 py-3 font-black text-indigo-700">{r.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-500 flex items-center gap-1"><Calendar size={10}/>{r.date}</td>
                    <td className="px-4 py-3 font-bold text-gray-800">{r.device}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold max-w-[180px] truncate">{r.part}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold">{r.store}</td>
                    <td className="px-4 py-3 text-gray-700 font-bold flex items-center gap-1"><User size={10}/>{r.technician}</td>
                    <td className="px-4 py-3 font-black text-gray-900">{r.resolution === '--' ? <span className="text-gray-400">—</span> : `${r.resolution}h`}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold">{r.outcome}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full ${histStatusColor[r.status]}`}>{r.status.charAt(0) + r.status.slice(1).toLowerCase()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB: ANALYTICS
      ═══════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ROW 1: Network Pulse (Wide) */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Network Pulse —</h4>
                <p className="text-lg font-black text-gray-900 leading-tight pr-4">Global Request Velocity & Backlog Accumulation</p>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600"/> Velocity</span>
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"/> Resolved</span>
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/> Backlog Delta</span>
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm border-2 border-amber-400 border-dashed bg-white"/> FTFR %</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={weeklyVolumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 700 }} dy={10}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700 }} dx={-10}/>
                <Tooltip content={<ChartTooltip />}/>
                <Area type="monotone" dataKey="requests" stroke="#6366F1" strokeWidth={4} fill="url(#colorReq)" name="Velocity" dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }}/>
                <Area type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={4} fill="url(#colorRes)" name="Resolved" dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }}/>
                <Area type="monotone" dataKey="backlog" stroke="#EF4444" strokeWidth={2} fill="url(#colorBack)" name="Backlog Delta" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="ftfr" stroke="#F59E0B" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#F59E0B' }} name="FTFR" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 flex gap-6">
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex-1">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Weekly Volume Trend</p>
                <p className="text-sm font-black text-indigo-900">+12% Peak Demand Increase in Wk 4</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex-1">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Efficiency Delta</p>
                <p className="text-sm font-black text-emerald-900">91% Resolution rate achieved in Current Wk</p>
              </div>
              <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex-1">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Backlog Warning</p>
                <p className="text-sm font-black text-red-900">Critical backlog growth in Central Hub (#142)</p>
              </div>
            </div>
          </div>

          {/* ROW 2: Distributions */}

          {/* Regional Load */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Geographic EDA —</h4>
            <p className="text-base font-black text-gray-900 mb-6">Regional Request Distribution</p>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={regionalDistributionData} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#4B5563', fontWeight: 800 }} width={80}/>
                  <Tooltip content={<ChartTooltip />}/>
                  <Bar dataKey="requests" radius={[0, 6, 6, 0]} barSize={20}>
                    {regionalDistributionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROW 2: Root Cause & Stress Profiling */}
          
          {/* RCA: Failure Drivers (Pareto) */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Root Cause —</h4>
                <p className="text-base font-black text-gray-900 leading-tight">Pareto: Top Failure Drivers</p>
              </div>
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black rounded-lg border border-indigo-100 uppercase">Analysis: P82</span>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={rootCauseData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="cause" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#9CA3AF', fontWeight: 800 }} interval={0} angle={-20} textAnchor="end" height={50} />
                  <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} />
                  <Tooltip content={<ChartTooltip />}/>
                  <Bar yAxisId="left" dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                    {rootCauseData.map((entry, index) => <Cell key={index} fill={entry.color} fillOpacity={0.8} />)}
                  </Bar>
                  <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }} name="Cumulative %" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                <p className="text-[10px] font-bold text-gray-500 leading-relaxed italic"><span className="text-indigo-600 font-black">AI Insight:</span> Physical Impact remains the #1 driver for S24U. 82% of screened cases show secondary hinge stress clusters.</p>
              </div>
            </div>
          </div>

          {/* Stress Vector Radar */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Diagnostic Profiling —</h4>
            <p className="text-base font-black text-gray-900 mb-6">Device Stress Vectors (Reliability)</p>
            <div className="flex-1 mt-4">
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={stressVectorData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fontWeights: 900, fill: '#9CA3AF' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="AS-IS Avg" dataKey="A" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} />
                  <Radar name="Target SLA" dataKey="B" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} />
                  <Tooltip content={<ChartTooltip />}/>
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400"/> <span className="text-[10px] font-black text-gray-400">Current</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-600"/> <span className="text-[10px] font-black text-gray-400">Bench: S24U</span></div>
              </div>
            </div>
          </div>

          {/* SLA Performance Grid (Heatmap Style) */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Performance Heatmap —</h4>
            <p className="text-base font-black text-gray-900 mb-6">SLA Fix-Rate by Node Load</p>
            <div className="space-y-3.5 flex-1 justify-center flex flex-col">
              {slaStorePerformance.map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    <span>{item.store}</span>
                    <span className={item.slaRate > 90 ? 'text-emerald-500' : item.slaRate > 80 ? 'text-amber-500' : 'text-red-500'}>{item.slaRate}% SLA</span>
                  </div>
                  <div className="h-5 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative group cursor-help">
                    <div className={`h-full transition-all duration-1000 ${
                      item.slaRate > 90 ? 'bg-emerald-500/80' : item.slaRate > 80 ? 'bg-amber-400/80' : 'bg-red-500/80'
                    }`} style={{ width: `${item.slaRate}%` }} />
                    <div className="absolute inset-0 flex items-center justify-end px-3">
                       <span className="text-[9px] font-black text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">LOAD: {item.load}%</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                 <span className="text-[10px] font-black text-gray-400 flex items-center gap-1"><Zap size={10} className="text-amber-500"/> Nodes at Critical Load: 2</span>
                 <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Full Audit</button>
              </div>
            </div>
          </div>

          {/* ROW 3: Velocity & Load */}

          {/* Heatmap-esque Daily Velocity */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Temporal Analysis —</h4>
                <p className="text-base font-black text-gray-900 leading-tight pr-4">Daily Demand Velocity Patterns</p>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={requestHeatmapData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 700 }}/>
                  <YAxis axisLine={false} tickLine={false} hide />
                  <Tooltip content={<ChartTooltip />}/>
                  <Area type="monotone" dataKey="morning" stackId="1" stroke="#818CF8" fill="#818CF8" fillOpacity={0.4} name="Morning" />
                  <Area type="monotone" dataKey="afternoon" stackId="1" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} name="Afternoon" />
                  <Area type="monotone" dataKey="evening" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.8} name="Evening" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Part Intelligence Profile SKU selector */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Part Profile —</h4>
                <p className="text-base font-black text-gray-900 leading-tight">SKU Demand vs Supply Stability</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
                <button 
                  onClick={() => setSelectedAnalyticsPart('PT01')}
                  className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${selectedAnalyicsPart === 'PT01' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >PT01 (OLED)</button>
                <button 
                  onClick={() => setSelectedAnalyticsPart('PT10')}
                  className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${selectedAnalyicsPart === 'PT10' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >PT10 (BATT)</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="md:col-span-3">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={partTrendData[selectedAnalyicsPart]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9CA3AF', fontWeights: 700 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} />
                      <Tooltip content={<ChartTooltip />}/>
                      <Bar dataKey="demand" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={24} name="Demand" />
                      <Bar dataKey="arrival" fill="#10B981" radius={[4, 4, 0, 0]} barSize={24} name="Arrival" />
                      <Line type="monotone" dataKey="gap" stroke="#EF4444" strokeWidth={3} name="Supply Gap" dot={{ r: 4, fill: '#EF4444' }} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex flex-col gap-3 justify-center">
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                    <p className="text-[9px] font-black text-indigo-400 uppercase mb-1">SLA Stability</p>
                    <p className="text-xl font-black text-indigo-900">92.4%</p>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                    <p className="text-[9px] font-black text-emerald-400 uppercase mb-1">Lead Time</p>
                    <p className="text-xl font-black text-emerald-900">4.2d</p>
                  </div>
                  <button className="mt-2 w-full py-2.5 bg-gray-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2">
                    <RefreshCw size={12}/> Sync Stocks
                  </button>
               </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50">
               <p className="text-[10px] font-bold text-gray-400 italic flex items-center gap-2">
                 <Shield size={12} className="text-indigo-400"/> Diagnostic Profile: {selectedAnalyicsPart} showing persistent 3-day backlog in Midwest region.
               </p>
            </div>
          </div>

          {/* Anomaly / Outlier List (Filling the Gap) */}
          <div className="bg-indigo-600 border border-indigo-700 rounded-2xl shadow-lg p-6 flex flex-col text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Anomalies Detected</h4>
                <p className="text-base font-black">Resolution Outliers</p>
              </div>
              <Activity size={24} className="text-indigo-300 opacity-60" />
            </div>
            <div className="space-y-4 flex-1">
              {topOutliers.map((o, i) => (
                <div key={i} className="bg-indigo-500/50 p-3 rounded-xl border border-indigo-400/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-indigo-100">{o.id}</span>
                    <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">{o.resolution}</span>
                  </div>
                  <p className="text-xs font-bold truncate">{o.device} • {o.reason}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-bold text-indigo-200 mt-6 pt-4 border-t border-indigo-500 flex items-center gap-2 italic">
              <Shield size={12}/> AI identifies 3.4% of total volume as process anomalies.
            </p>
          </div>

          {/* ROW 4: Load & Human Resources */}

          {/* Technician Resource Load (Full Width) */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:col-span-3">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Human Capital —</h4>
            <p className="text-base font-black text-gray-900 mb-6">Technician Load & Active Cases</p>
            <div className="space-y-4">
              {techLoadData.map((t, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-24 text-[10px] font-black text-gray-600 truncate">{t.tech}</div>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${t.load}%` }} />
                  </div>
                  <div className="w-12 text-[10px] font-black text-indigo-600 text-right">{t.active} ACT</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
