import React, { useState, useMemo } from 'react';
import {
  MapPin, CheckCircle2, AlertTriangle, Clock, User, Wrench, Filter, Search,
  BarChart3, Activity, Calendar, ArrowUpRight, ArrowDownRight, History, Inbox,
  Star, RefreshCw, Download, Shield, Zap, Package, TrendingUp, TrendingDown,
  Award, Globe, AlertCircle, Info, Target, Layers, Phone, XCircle, ChevronDown
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
  ComposedChart, ReferenceLine
} from 'recharts';
import { oemMetrics } from '../../data/mockData';
import { requestTelemetry } from '../../data/telemetry';

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
    { id: 'REQ-20260409-001', device: 'Galaxy S24 Ultra', issueShort: 'Shattered Display', tentativeParts: [PARTS.PT01], store: 'Store #142 (Chicago, IL)', status: 'RED', time: '09:14', customer: 'C-88291', warranty: 'Out of Warranty', issue: 'I dropped my phone on the sidewalk and the screen is completely shattered. It won\'t even respond when I try to swipe now, and there are some green lines appearing.', date: 'Apr 9, 2026', age: '24', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260409-002', device: 'Galaxy A54', issueShort: 'Battery Drain', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '09:32', customer: 'C-10934', warranty: 'In Warranty', issue: 'My battery is draining incredibly fast. I charged it to 100% this morning and it\'s already at 10% after just two hours of light use.', date: 'Apr 9, 2026', age: '15', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260409-003', device: 'Galaxy Z Fold4', issueShort: 'Peeling Hinge', tentativeParts: [PARTS.PT35], store: 'Store #092 (Los Angeles, CA)', status: 'AMBER', time: '10:05', customer: 'C-44920', warranty: 'In Warranty', issue: 'The screen protector near the hinge is starting to peel off and bubble. I\'m worried it might damage the actual screen if I keep folding it.', date: 'Apr 9, 2026', age: '11', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260409-004', device: 'Galaxy S24', issueShort: 'Charging Port', tentativeParts: [PARTS.PT08], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '10:22', customer: 'C-33019', warranty: 'Out of Warranty', issue: 'I have to wiggle the charging cable quite a bit to get it to start charging. It seems like the port inside is loose or dirty.', date: 'Apr 9, 2026', age: '14', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260409-005', device: 'Galaxy M34', issueShort: 'Cracked Back', tentativeParts: [PARTS.PT19], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '10:58', customer: 'C-99211', warranty: 'Out of Warranty', issue: 'The back glass of my phone is cracked after a small fall. It\'s mostly cosmetic but I\'m worried about water getting inside.', date: 'Apr 9, 2026', age: '18', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260409-006', device: 'Galaxy A54', issueShort: 'Sudden Shutdown', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '11:15', customer: 'C-11044', warranty: 'In Warranty', issue: 'My phone keeps shutting down unexpectedly even when the battery shows around 20-30%. It\'s very frustrating.', date: 'Apr 9, 2026', age: '12', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260409-007', device: 'Galaxy M34', issueShort: 'Ghost Touch', tentativeParts: [PARTS.PT34], store: 'Store #142 (Chicago, IL)', status: 'AMBER', time: '11:24', customer: 'C-55821', warranty: 'Out of Warranty', issue: 'The screen is acting like it\'s being touched when I\'m not doing anything. Apps open on their own and it\'s hard to type.', date: 'Apr 9, 2026', age: '22', technician: 'Marcus T.', priority: 'Low' },
    { id: 'REQ-20260409-008', device: 'Galaxy S24 Ultra', issueShort: 'Dead Pixels', tentativeParts: [PARTS.PT01], store: 'Store #301 (Miami, FL)', status: 'RED', time: '11:45', customer: 'C-99012', warranty: 'In Warranty', issue: 'A thin line of dead pixels has appeared across the middle of my screen. It happened overnight while it was charging.', date: 'Apr 9, 2026', age: '2', technician: 'Elena V.', priority: 'High' },
    { id: 'REQ-20260409-009', device: 'Galaxy Watch 6', issueShort: 'Watch Power', tentativeParts: [PARTS.PT36], store: 'Store #404 (Seattle, WA)', status: 'GREEN', time: '12:05', customer: 'C-22311', warranty: 'In Warranty', issue: 'My watch won\'t turn on at all. I tried several different chargers but nothing happens.', date: 'Apr 9, 2026', age: '8', technician: 'Dana K.', priority: 'Standard' },
    { id: 'REQ-20260409-010', device: 'Galaxy S24', issueShort: 'Noisy Audio', tentativeParts: [PARTS.PT08], store: 'Store #092 (Los Angeles, CA)', status: 'AMBER', time: '12:15', customer: 'C-44501', warranty: 'In Warranty', issue: 'There\'s a weird crackling noise coming from the speakers whenever I play music or take a call.', date: 'Apr 9, 2026', age: '4', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260409-011', device: 'Galaxy M34', issueShort: 'Total Blackout', tentativeParts: [PARTS.PT19], store: 'Store #142 (Chicago, IL)', status: 'RED', time: '12:40', customer: 'C-89033', warranty: 'In Warranty', issue: 'I sat on my phone by accident and now the whole screen is black. It still vibrates but I can\'t see anything.', date: 'Apr 9, 2026', age: '6', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260409-012', device: 'Galaxy A54', issueShort: 'Overheating', tentativeParts: [PARTS.PT10], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '13:02', customer: 'C-31199', warranty: 'Out of Warranty', issue: 'The back of the phone gets incredibly hot when I\'m using the camera or playing games. Sometimes it shows a temperature warning.', date: 'Apr 9, 2026', age: '28', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260409-013', device: 'Galaxy S24 Ultra', issueShort: 'Screen Lag', tentativeParts: [PARTS.PT01], store: 'Store #045 (New York, NY)', status: 'AMBER', time: '13:25', customer: 'C-10988', warranty: 'In Warranty', issue: 'The touch screen feels very delayed. It takes a second for the phone to react to any of my swipes or taps.', date: 'Apr 9, 2026', age: '3', technician: 'Priya S.', priority: 'High' },
    { id: 'REQ-20260409-014', device: 'Galaxy S24', issueShort: 'Broken Buttons', tentativeParts: [PARTS.PT08], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '13:45', customer: 'C-99255', warranty: 'In Warranty', issue: 'The volume up button is stuck and won\'t click anymore. I can\'t change the volume without using the screen settings.', date: 'Apr 9, 2026', age: '14', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260409-015', device: 'Galaxy M34', issueShort: 'Screen Flicker', tentativeParts: [PARTS.PT34], store: 'Store #301 (Miami, FL)', status: 'GREEN', time: '14:10', customer: 'C-99055', warranty: 'Out of Warranty', issue: 'My display has started flickering constantly, especially when the brightness is low. It\'s making me dizzy to look at it.', date: 'Apr 9, 2026', age: '17', technician: 'Elena V.', priority: 'Standard' },
    { id: 'REQ-20260409-016', device: 'Galaxy A54', issueShort: 'Slow Charge', tentativeParts: [PARTS.PT10], store: 'Store #404 (Seattle, WA)', status: 'AMBER', time: '14:30', customer: 'C-22399', warranty: 'In Warranty', issue: 'It takes almost 6 hours to get a full charge now, even using the original Samsung charger. Something is definitely wrong.', date: 'Apr 9, 2026', age: '5', technician: 'Dana K.', priority: 'High' },
    { id: 'REQ-20260409-017', device: 'Galaxy S24 Ultra', issueShort: 'Glass Cracks', tentativeParts: [PARTS.PT01], store: 'Store #142 (Chicago, IL)', status: 'GREEN', time: '15:05', customer: 'C-88211', warranty: 'Out of Warranty', issue: 'I have a few hairline cracks across the screen. They aren\'t deep but they are getting longer every day.', date: 'Apr 9, 2026', age: '10', technician: 'Marcus T.', priority: 'Low' },
    { id: 'REQ-20260409-018', device: 'Galaxy Z Fold4', issueShort: 'Hinge Noise', tentativeParts: [PARTS.PT35], store: 'Store #187 (Naperville, IL)', status: 'RED', time: '15:24', customer: 'C-33099', warranty: 'In Warranty', issue: 'The hinge is making a weird crunching sound when I open the phone. It feels like there might be dust or grit inside.', date: 'Apr 9, 2026', age: '1', technician: 'Laura M.', priority: 'High' },
    { id: 'REQ-20260409-019', device: 'Galaxy S24', issueShort: 'Moisture Alert', tentativeParts: [PARTS.PT08], store: 'Store #092 (Los Angeles, CA)', status: 'GREEN', time: '15:45', customer: 'C-44511', warranty: 'In Warranty', issue: 'My phone keeps showing a "moisture detected" alert for the charging port, but it hasn\'t been anywhere near water.', date: 'Apr 9, 2026', age: '11', technician: 'James R.', priority: 'Standard' },
    { id: 'REQ-20260409-020', device: 'Galaxy M34', issueShort: 'Swollen Case', tentativeParts: [PARTS.PT19], store: 'Store #045 (New York, NY)', status: 'AMBER', time: '16:10', customer: 'C-10922', warranty: 'Out of Warranty', issue: 'The back of my phone seems to be lifting up. There\'s a small gap between the frame and the glass now.', date: 'Apr 9, 2026', age: '20', technician: 'Priya S.', priority: 'Standard' }
  ],
  TO_BE: [
    { id: 'REQ-20260410-001', device: 'Galaxy S24 Ultra', issueShort: 'Broken Screen', tentativeParts: [PARTS.PT01], store: 'Store #142 (Chicago, IL)', status: 'AMBER', time: '09:14', customer: 'C-88291', warranty: 'Out of Warranty', issue: 'The screen is badly cracked after I dropped it this morning. I can barely see anything through the glass.', date: 'Apr 10, 2026', age: '24', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260410-002', device: 'Galaxy A54', issueShort: 'Battery Issues', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '09:32', customer: 'C-10934', warranty: 'In Warranty', issue: 'My battery doesn\'t even last half a day anymore. I have to keep it plugged in constantly.', date: 'Apr 10, 2026', age: '15', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260410-003', device: 'Galaxy Z Fold4', issueShort: 'Hinge Protector', tentativeParts: [PARTS.PT35], store: 'Store #092 (Los Angeles, CA)', status: 'GREEN', time: '10:05', customer: 'C-44920', warranty: 'In Warranty', issue: 'There\'s a bubble under the screen protector specifically where it folds. It\'s making a clicking noise now.', date: 'Apr 10, 2026', age: '11', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260410-004', device: 'Galaxy S24', issueShort: 'Loose Port', tentativeParts: [PARTS.PT08], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '10:22', customer: 'C-33019', warranty: 'Out of Warranty', issue: 'I think the charging port is broken. None of my cables work unless I hold them at a precise angle.', date: 'Apr 10, 2026', age: '14', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260410-005', device: 'Galaxy M34', issueShort: 'Cracked Glass', tentativeParts: [PARTS.PT19], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '10:58', customer: 'C-99211', warranty: 'Out of Warranty', issue: 'The back of my phone just cracked out of nowhere. I didn\'t even drop it, it might have been the heat.', date: 'Apr 10, 2026', age: '18', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260410-006', device: 'Galaxy A54', issueShort: 'Rapid Drain', tentativeParts: [PARTS.PT10], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '11:15', customer: 'C-11044', warranty: 'In Warranty', issue: 'My battery percentage jumps all over the place. It\'ll be at 50% and then suddenly 10%.', date: 'Apr 10, 2026', age: '12', technician: 'Priya S.', priority: 'Standard' },
    { id: 'REQ-20260410-007', device: 'Galaxy M34', issueShort: 'Flickering Screen', tentativeParts: [PARTS.PT34], store: 'Store #142 (Chicago, IL)', status: 'GREEN', time: '11:24', customer: 'C-55821', warranty: 'Out of Warranty', issue: 'The display is flickering and sometimes items on the screen move around on their own.', date: 'Apr 10, 2026', age: '22', technician: 'Marcus T.', priority: 'Low' },
    { id: 'REQ-20260410-008', device: 'Galaxy S24 Ultra', issueShort: 'Screen Spots', tentativeParts: [PARTS.PT01], store: 'Store #301 (Miami, FL)', status: 'GREEN', time: '11:45', customer: 'C-99012', warranty: 'In Warranty', issue: 'I noticed some dark spots on the screen that won\'t go away. They look like ink stains under the glass.', date: 'Apr 10, 2026', age: '2', technician: 'Elena V.', priority: 'High' },
    { id: 'REQ-20260410-009', device: 'Galaxy Watch 6', issueShort: 'Dead Battery', tentativeParts: [PARTS.PT36], store: 'Store #404 (Seattle, WA)', status: 'GREEN', time: '12:05', customer: 'C-22311', warranty: 'In Warranty', issue: 'My watch just died and won\'t recharge. I haven\'t even had it for a whole year yet.', date: 'Apr 10, 2026', age: '8', technician: 'Dana K.', priority: 'Standard' },
    { id: 'REQ-20260410-010', device: 'Galaxy S24', issueShort: 'Water Damage', tentativeParts: [PARTS.PT08], store: 'Store #092 (Los Angeles, CA)', status: 'GREEN', time: '12:15', customer: 'C-44501', warranty: 'In Warranty', issue: 'It says there is moisture in the charging port even though everything is dry. I can\'t charge it at all.', date: 'Apr 10, 2026', age: '4', technician: 'James R.', priority: 'High' },
    { id: 'REQ-20260410-011', device: 'Galaxy M34', issueShort: 'Impact Damage', tentativeParts: [PARTS.PT34], store: 'Store #142 (Chicago, IL)', status: 'AMBER', time: '12:40', customer: 'C-89033', warranty: 'In Warranty', issue: 'My kid dropped the phone and now there are colorful lines running down the whole screen.', date: 'Apr 10, 2026', age: '6', technician: 'Marcus T.', priority: 'Critical' },
    { id: 'REQ-20260410-012', device: 'Galaxy A54', issueShort: 'Charging Heat', tentativeParts: [PARTS.PT10], store: 'Store #187 (Naperville, IL)', status: 'GREEN', time: '13:02', customer: 'C-31199', warranty: 'Out of Warranty', issue: 'The phone gets scary hot when it\'s plugged in. I\'m afraid to leave it charging overnight.', date: 'Apr 10, 2026', age: '28', technician: 'Laura M.', priority: 'Standard' },
    { id: 'REQ-20260410-013', device: 'Galaxy S24 Ultra', issueShort: 'Screen Bleed', tentativeParts: [PARTS.PT01], store: 'Store #045 (New York, NY)', status: 'GREEN', time: '13:25', customer: 'C-10988', warranty: 'In Warranty', issue: 'The colors on the edge of the screen look all washed out and blurry. It seems to be getting worse.', date: 'Apr 10, 2026', age: '3', technician: 'Priya S.', priority: 'High' },
    { id: 'REQ-20260410-014', device: 'Galaxy S24', issueShort: 'Broken Port', tentativeParts: [PARTS.PT08], store: 'Store #210 (Dallas, TX)', status: 'GREEN', time: '13:45', customer: 'C-99255', warranty: 'In Warranty', issue: 'I think the charging pin inside is bent. I can\'t even get the cable to plug in all the way.', date: 'Apr 10, 2026', age: '14', technician: 'Raj P.', priority: 'Low' },
    { id: 'REQ-20260410-015', device: 'Galaxy M34', issueShort: 'Low Brightness', tentativeParts: [PARTS.PT34], store: 'Store #301 (Miami, FL)', status: 'GREEN', time: '14:10', customer: 'C-99055', warranty: 'Out of Warranty', issue: 'The screen keeps flickering when I try to lower the brightness. It\'s very annoying in dark rooms.', date: 'Apr 10, 2026', age: '17', technician: 'Elena V.', priority: 'Standard' }
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

// ─── REPAIR PERFORMANCE DATA ──────────────────────────────────────────────────
const historicalRepairData = [
  { month: 'Jan', volume: 142, resolved: 118, escalated: 12, rescheduled: 12, ftfr: 83, avgTime: 3.8 },
  { month: 'Feb', volume: 158, resolved: 132, escalated: 14, rescheduled: 12, ftfr: 84, avgTime: 3.6 },
  { month: 'Mar', volume: 172, resolved: 148, escalated: 11, rescheduled: 13, ftfr: 86, avgTime: 3.1 },
  { month: 'Apr', volume: 47, resolved: 43, escalated: 2, rescheduled: 2, ftfr: 91, avgTime: 2.4 },
];

const ftfrByModelData = [
  { month: 'Jan', 'S24 Ultra': 71, 'A54': 88, 'M34': 82, 'Z Fold4': 65 },
  { month: 'Feb', 'S24 Ultra': 73, 'A54': 89, 'M34': 84, 'Z Fold4': 67 },
  { month: 'Mar', 'S24 Ultra': 78, 'A54': 91, 'M34': 87, 'Z Fold4': 71 },
  { month: 'Apr', 'S24 Ultra': 85, 'A54': 94, 'M34': 89, 'Z Fold4': 76 },
];

const partnerPerformanceData = [
  { id: 'P-404', name: 'Northwest Hub', city: 'SEA', region: 'West', tier: 'Gold', ftfr: 85, avgResTime: 2.4, delayedCases: 6, slaCompliance: 91, trend: 'up', repairs: 78 },
  { id: 'P-142', name: 'Central Hub', city: 'CHI', region: 'Midwest', tier: 'Platinum', ftfr: 82, avgResTime: 2.1, delayedCases: 5, slaCompliance: 96, trend: 'up', repairs: 112 },
  { id: 'P-045', name: 'Northeast Hub', city: 'NY', region: 'Northeast', tier: 'Gold', ftfr: 79, avgResTime: 2.8, delayedCases: 8, slaCompliance: 94, trend: 'up', repairs: 145 },
  { id: 'P-210', name: 'South Hub', city: 'DAL', region: 'South', tier: 'Gold', ftfr: 75, avgResTime: 3.5, delayedCases: 10, slaCompliance: 89, trend: 'up', repairs: 98 },
  { id: 'P-092', name: 'West Coast Hub', city: 'LA', region: 'West', tier: 'Platinum', ftfr: 71, avgResTime: 3.2, delayedCases: 11, slaCompliance: 88, trend: 'down', repairs: 132 },
  { id: 'P-187', name: 'Suburban Hub', city: 'NAP', region: 'Midwest', tier: 'Silver', ftfr: 65, avgResTime: 4.1, delayedCases: 14, slaCompliance: 82, trend: 'down', repairs: 88 },
  { id: 'P-301', name: 'Southeast Hub', city: 'MIA', region: 'South', tier: 'Silver', ftfr: 58, avgResTime: 4.8, delayedCases: 18, slaCompliance: 72, trend: 'down', repairs: 65 },
];

const rcaDelayData = [
  { cause: 'Part Stockout', count: 31, color: '#EF4444', cumPct: 44, action: 'Raise safety stock for PT01/PT10 at CHI-142 and MIA-301' },
  { cause: 'Wrong Routing', count: 18, color: '#F59E0B', cumPct: 70, action: 'Enable AI-driven partner selection at triage stage' },
  { cause: 'Tech Unavailable', count: 12, color: '#6366F1', cumPct: 87, action: 'Expand technician coverage on weekends and peak hours' },
  { cause: 'Customer No-Show', count: 6, color: '#8B5CF6', cumPct: 95, action: 'Enforce SMS pre-confirmation 2 hours before appointment' },
  { cause: 'Admin Error', count: 3, color: '#9CA3AF', cumPct: 100, action: 'Standardize intake form validation rules' },
];

const delayBucketData = [
  { name: 'Screen Stockout', value: 22, color: '#EF4444' },
  { name: 'Battery Stockout', value: 9, color: '#F97316' },
  { name: 'Wrong Routing', value: 18, color: '#F59E0B' },
  { name: 'Tech Unavailable', value: 12, color: '#6366F1' },
  { name: 'Customer Delays', value: 9, color: '#9CA3AF' },
];

const hotspotData = [
  { id: 'P-301', name: 'Southeast Hub (MIA)', region: 'South', avgResTime: 4.8, repeatRate: 24, slaBreach: 28, score: 91, level: 'critical' },
  { id: 'P-187', name: 'Suburban Hub (NAP)', region: 'Midwest', avgResTime: 4.1, repeatRate: 18, slaBreach: 18, score: 74, level: 'high' },
  { id: 'P-092', name: 'West Coast Hub (LA)', region: 'West', avgResTime: 3.2, repeatRate: 12, slaBreach: 12, score: 58, level: 'medium' },
  { id: 'P-210', name: 'South Hub (DAL)', region: 'South', avgResTime: 3.5, repeatRate: 10, slaBreach: 11, score: 52, level: 'medium' },
  { id: 'P-045', name: 'Northeast Hub (NY)', region: 'Northeast', avgResTime: 2.8, repeatRate: 8, slaBreach: 6, score: 34, level: 'low' },
  { id: 'P-404', name: 'Northwest Hub (SEA)', region: 'West', avgResTime: 2.4, repeatRate: 6, slaBreach: 9, score: 28, level: 'low' },
  { id: 'P-142', name: 'Central Hub (CHI)', region: 'Midwest', avgResTime: 2.1, repeatRate: 4, slaBreach: 4, score: 18, level: 'low' },
];

const actionableInsightsData = [
  { color: 'red', icon: AlertTriangle, title: 'PT01 Stockout Risk — CHI-142', desc: 'S24U OLED at Central Hub is 4 days from critical stockout (3 units left, avg demand 1.8/day). Auto-reorder of 20 units recommended.', action: 'Trigger Reorder' },
  { color: 'amber', icon: AlertCircle, title: 'Overload: Laura M. at 98% Load', desc: 'Technician has 9 active + 3 escalated cases. SLA breach risk is high within 4 hours. Redistribute 3 pending cases now.', action: 'Redistribute Cases' },
  { color: 'emerald', icon: TrendingUp, title: 'PT10 Demand Wave — NY-045', desc: 'Installed base analysis projects +22% A54 battery demand at NYC cluster in 8–12 days. Pre-stage 22 units to prevent stockout.', action: 'Pre-Stage Stock' },
  { color: 'indigo', icon: Star, title: 'FTFR Up +4pp Week-on-Week', desc: 'FTFR improved 87% → 91% this week. Primary driver: Z Fold4 screen protector (PT35) stock alignment across 3 partner stores.', action: 'View Report' },
];

// ─── PERFORMANCE TAB ENHANCEMENT DATA ──────────────────────────────────────────
// RCA Drill-Down Table Data
const rcaDrilldownData = [
  { partner: 'Central Hub (CHI)', part: 'PT01 — S24U OLED', delayedCount: 14, cause: 'Part Stockout', avgDelay: 3.2, pctTotal: 42, status: 'critical', action: 'Raise stock level to 25 units' },
  { partner: 'Central Hub (CHI)', part: 'PT10 — A54 Battery', delayedCount: 8, cause: 'Part Stockout', avgDelay: 2.8, pctTotal: 24, status: 'critical', action: 'Reorder 15 units' },
  { partner: 'Southeast Hub (MIA)', part: 'PT01 — S24U OLED', delayedCount: 6, cause: 'Wrong Routing', avgDelay: 2.4, pctTotal: 18, status: 'high', action: 'Enable AI routing at MIA-301' },
  { partner: 'West Coast Hub (LA)', part: 'PT34 — M34 AMOLED', delayedCount: 5, cause: 'Tech Unavailable', avgDelay: 1.9, pctTotal: 15, status: 'medium', action: 'Add technician Saturday shift' },
  { partner: 'Suburban Hub (NAP)', part: 'PT08 — S24 Port', delayedCount: 3, cause: 'Admin Error', avgDelay: 1.2, pctTotal: 9, status: 'low', action: 'Training on intake forms' },
];

// Top Delayed Parts Table Data
const topDelayedPartsData = [
  { sku: 'PT01', part: 'S24U OLED Display', delayEvents: 20, avgOosDays: 3.2, minStock: 15, maxStock: 45, status: 'critical' },
  { sku: 'PT10', part: 'A54 Battery Pack', delayEvents: 8, avgOosDays: 2.1, minStock: 20, maxStock: 50, status: 'critical' },
  { sku: 'PT34', part: 'M34 AMOLED Screen', delayEvents: 6, avgOosDays: 1.8, minStock: 12, maxStock: 35, status: 'high' },
  { sku: 'PT08', part: 'S24 Charging Port', delayEvents: 4, avgOosDays: 0.9, minStock: 18, maxStock: 40, status: 'medium' },
  { sku: 'PT35', part: 'Z Fold4 Protector', delayEvents: 2, avgOosDays: 0.4, minStock: 8, maxStock: 25, status: 'low' },
  { sku: 'PT36', part: 'Watch 6 Battery', delayEvents: 1, avgOosDays: 0.2, minStock: 6, maxStock: 15, status: 'low' },
];

// Partner Performance Comparative Table Data (enhanced)
const partnerComparisonData = [
  { partner: 'Central Hub (CHI)', slaRate: 96, avgLeadTime: 2.1, stockouts: 3, customerScore: 4.8, tier: 'Platinum' },
  { partner: 'Northwest Hub (SEA)', slaRate: 91, avgLeadTime: 2.4, stockouts: 4, customerScore: 4.6, tier: 'Gold' },
  { partner: 'Northeast Hub (NY)', slaRate: 94, avgLeadTime: 2.8, stockouts: 6, customerScore: 4.5, tier: 'Gold' },
  { partner: 'South Hub (DAL)', slaRate: 89, avgLeadTime: 3.5, stockouts: 8, customerScore: 4.2, tier: 'Gold' },
  { partner: 'West Coast Hub (LA)', slaRate: 88, avgLeadTime: 3.2, stockouts: 9, customerScore: 4.1, tier: 'Platinum' },
  { partner: 'Suburban Hub (NAP)', slaRate: 82, avgLeadTime: 4.1, stockouts: 12, customerScore: 3.8, tier: 'Silver' },
  { partner: 'Southeast Hub (MIA)', slaRate: 72, avgLeadTime: 4.8, stockouts: 16, customerScore: 3.2, tier: 'Silver' },
];

// ─── DEMAND PLANNING TAB ENHANCEMENT DATA ──────────────────────────────────────
// Install Base by Region (Model × Region)
const installBaseByRegion = [
  { model: 'S24 Ultra', nMetro: 50000, sMetro: 38000, ruralW: 12000, total: 100000, avgAge: 18 },
  { model: 'A54', nMetro: 85000, sMetro: 62000, ruralW: 28000, total: 175000, avgAge: 24 },
  { model: 'M34', nMetro: 35000, sMetro: 28000, ruralW: 16000, total: 79000, avgAge: 32 },
  { model: 'Z Fold4', nMetro: 12000, sMetro: 8500, ruralW: 2500, total: 23000, avgAge: 14 },
  { model: 'S22 Pro', nMetro: 8000, sMetro: 6500, ruralW: 1500, total: 16000, avgAge: 45 },
  { model: 'TOTAL', nMetro: 190000, sMetro: 143000, ruralW: 60000, total: 393000, avgAge: 26 },
];

// Failure Rates by Part
const failureRateByPart = [
  { model: 'S24 Ultra', part: 'PT01 — OLED Display', failPct: 8.0, bomQty: 1, annualDemand: 4000, demand: 667 },
  { model: 'S24 Ultra', part: 'PT08 — Charging Port', failPct: 3.2, bomQty: 1, annualDemand: 1600, demand: 267 },
  { model: 'A54', part: 'PT10 — Battery Pack', failPct: 12.0, bomQty: 1, annualDemand: 8400, demand: 1400 },
  { model: 'A54', part: 'PT08 — Charging Port', failPct: 4.1, bomQty: 1, annualDemand: 2870, demand: 478 },
  { model: 'M34', part: 'PT34 — AMOLED Screen', failPct: 6.5, bomQty: 1, annualDemand: 3094, demand: 516 },
  { model: 'M34', part: 'PT19 — Back Panel', failPct: 7.0, bomQty: 1, annualDemand: 3367, demand: 561 },
  { model: 'Z Fold4', part: 'PT35 — Screen Protector', failPct: 9.5, bomQty: 1, annualDemand: 1449, demand: 241 },
];

// BOM Usage Per Repair Type
const bomUsageData = [
  { repairType: 'Battery Swap', parts: 'Battery Pack + Adhesive', skus: 'PT10, ADH-GEN', qty: '1, 1', cost: 34.00 + 2.50, laborCost: 145.00, total: 181.50 },
  { repairType: 'Screen Replace', parts: 'Display + Frame Seal', skus: 'PT01/PT34, SEAL-KIT', qty: '1, 1', cost: 120.00 + 8.00, laborCost: 280.00, total: 408.00 },
  { repairType: 'Charge Port Repair', parts: 'Charging Port + Flex', skus: 'PT08, FLEX-CHG', qty: '1, 1', cost: 22.00 + 5.00, laborCost: 95.00, total: 122.00 },
  { repairType: 'Back Panel Replace', parts: 'Back Panel + Adhesive', skus: 'PT19, ADH-GEN', qty: '1, 1', cost: 45.00 + 2.50, laborCost: 120.00, total: 167.50 },
  { repairType: 'Protector/Screen Seal', parts: 'Screen Protector', skus: 'PT35', qty: '1', cost: 8.00, laborCost: 45.00, total: 53.00 },
];

// Expected Monthly Demand with formula
const expectedMonthlyDemand = [
  { sku: 'PT01 — S24U OLED', ib: 100000, failRate: 8.0, bomQty: 1, monthlyBase: 667, peakMultiplier: 1.35, peak: 901 },
  { sku: 'PT10 — A54 Battery', ib: 175000, failRate: 12.0, bomQty: 1, monthlyBase: 1400, peakMultiplier: 1.35, peak: 1890 },
  { sku: 'PT34 — M34 AMOLED', ib: 79000, failRate: 6.5, bomQty: 1, monthlyBase: 516, peakMultiplier: 1.35, peak: 696 },
  { sku: 'PT08 — S24 Port', ib: 275000, failRate: 3.6, bomQty: 1, monthlyBase: 825, peakMultiplier: 1.35, peak: 1114 },
  { sku: 'PT35 — Z Fold4 Protector', ib: 23000, failRate: 9.5, bomQty: 1, monthlyBase: 241, peakMultiplier: 1.35, peak: 325 },
];

// Historical vs IB-Driven Policy Comparison
const policyComparison = [
  { part: 'B-S24-ULTRA at CHI-142', oldMin: 15, oldMax: 35, newMin: 30, newMax: 75, oldCoverage: 11, newCoverage: 24.6, impact: 'Reduced stockouts from 3-4x/month to 0-1x/month' },
  { part: 'B-A54 at NY-045', oldMin: 20, oldMax: 45, newMin: 45, newMax: 95, oldCoverage: 15, newCoverage: 28.3, impact: 'Eliminated peak season stockouts' },
  { part: 'B-M34 at MIA-301', oldMin: 10, oldMax: 25, newMin: 20, newMax: 55, oldCoverage: 8, newCoverage: 21.8, impact: 'Improved SLA from 72% to 89%' },
];

const techLoadData = [
  { tech: 'Marcus T.', active: 8, load: 92, store: 'CHI-142' },
  { tech: 'Priya S.', active: 12, load: 78, store: 'NY-045' },
  { tech: 'James R.', active: 6, load: 85, store: 'LA-092' },
  { tech: 'Laura M.', active: 9, load: 98, store: 'NAP-187' },
  { tech: 'Raj P.', active: 4, load: 45, store: 'DAL-210' },
  { tech: 'Elena V.', active: 7, load: 72, store: 'MIA-301' },
];

// ─── DEMAND PLANNING DATA ─────────────────────────────────────────────────────
const installedBaseForecast = [
  { month: 'Jan', 'S24 Ultra': 820, 'A54': 1140, 'M34': 980, 'Z Fold4': 340 },
  { month: 'Feb', 'S24 Ultra': 845, 'A54': 1180, 'M34': 1010, 'Z Fold4': 360 },
  { month: 'Mar', 'S24 Ultra': 870, 'A54': 1220, 'M34': 1040, 'Z Fold4': 375 },
  { month: 'Apr', 'S24 Ultra': 892, 'A54': 1265, 'M34': 1070, 'Z Fold4': 390 },
  { month: 'May', 'S24 Ultra': 918, 'A54': 1305, 'M34': 1090, 'Z Fold4': 412, isForecast: true },
  { month: 'Jun', 'S24 Ultra': 940, 'A54': 1348, 'M34': 1108, 'Z Fold4': 428, isForecast: true },
  { month: 'Jul', 'S24 Ultra': 958, 'A54': 1388, 'M34': 1122, 'Z Fold4': 446, isForecast: true },
  { month: 'Aug', 'S24 Ultra': 975, 'A54': 1420, 'M34': 1135, 'Z Fold4': 462, isForecast: true },
  { month: 'Sep', 'S24 Ultra': 990, 'A54': 1455, 'M34': 1148, 'Z Fold4': 480, isForecast: true },
  { month: 'Oct', 'S24 Ultra': 1008, 'A54': 1492, 'M34': 1158, 'Z Fold4': 498, isForecast: true },
  { month: 'Nov', 'S24 Ultra': 1022, 'A54': 1528, 'M34': 1168, 'Z Fold4': 515, isForecast: true },
  { month: 'Dec', 'S24 Ultra': 1040, 'A54': 1568, 'M34': 1180, 'Z Fold4': 532, isForecast: true },
];

const repairDemandForecast = [
  { month: 'Apr', screen: 42, battery: 35, port: 18, protector: 12 },
  { month: 'May', screen: 45, battery: 38, port: 20, protector: 14 },
  { month: 'Jun', screen: 49, battery: 42, port: 22, protector: 15 },
  { month: 'Jul', screen: 53, battery: 46, port: 24, protector: 17 },
  { month: 'Aug', screen: 57, battery: 50, port: 26, protector: 19 },
  { month: 'Sep', screen: 61, battery: 54, port: 28, protector: 21 },
  { month: 'Oct', screen: 66, battery: 58, port: 30, protector: 23 },
  { month: 'Nov', screen: 70, battery: 62, port: 32, protector: 25 },
  { month: 'Dec', screen: 74, battery: 67, port: 34, protector: 27 },
];

const partDemandMatrix = [
  { part: 'PT01 — S24U OLED', May: 14, Jun: 16, Jul: 18, Aug: 20, Sep: 22, peakPartner: 'CHI-142', risk: 'High' },
  { part: 'PT10 — A54 Battery', May: 22, Jun: 25, Jul: 28, Aug: 31, Sep: 34, peakPartner: 'NY-045', risk: 'Medium' },
  { part: 'PT08 — S24 Charging Port', May: 9, Jun: 10, Jul: 11, Aug: 12, Sep: 13, peakPartner: 'LA-092', risk: 'Low' },
  { part: 'PT34 — M34 AMOLED', May: 7, Jun: 8, Jul: 9, Aug: 10, Sep: 11, peakPartner: 'MIA-301', risk: 'Medium' },
  { part: 'PT35 — Z Fold4 Protector', May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, peakPartner: 'SEA-404', risk: 'Low' },
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

// ─── SMART TELEMETRY RENDERER ────────────────────────────────────────────────
function getTelemetryCards(t) {
  const cards = [];
  const d = t.diagnostics || {};
  const hw = t.hardware || t.hardwareFold || {};
  const sw = t.softwareAnalysis || t.software || {};
  const usage = t.usagePatterns || {};
  const analysis = t.analysisAndDecision || {};
  const usb = t.usbConnectorAnalysis || {};

  // Screen / display
  if (d.screenHealth !== undefined)
    cards.push({ label: 'Screen Health', value: `${d.screenHealth}%`, status: d.screenHealth >= 80 ? 'ok' : d.screenHealth >= 50 ? 'warn' : 'crit' });
  if (d.touchPanel)
    cards.push({ label: 'Touch Panel', value: d.touchPanel, status: d.touchPanel === 'OFFLINE' ? 'crit' : 'ok' });
  if (d.deadPixels !== undefined && d.deadPixels !== false)
    cards.push({ label: 'Dead Pixels', value: d.deadPixels === 'ALL' ? 'All pixels' : `${d.deadPixels} pixels`, status: 'crit' });
  if (d.panelTemperature !== undefined)
    cards.push({ label: 'Panel Temp', value: `${d.panelTemperature}°C`, status: d.panelTemperature > 60 ? 'crit' : d.panelTemperature > 45 ? 'warn' : 'ok' });

  // Battery
  if (d.batteryHealth !== undefined)
    cards.push({ label: 'Battery Health', value: `${d.batteryHealth}%`, status: d.batteryHealth >= 80 ? 'ok' : d.batteryHealth >= 60 ? 'warn' : 'crit' });
  if (d.swellingDetected)
    cards.push({ label: 'Swelling', value: `${d.swellingPercentage}% expansion`, status: 'crit' });
  if (d.chargeVoltage !== undefined && d.chargeVoltage === 0)
    cards.push({ label: 'Charge Detect', value: 'Not detected', status: 'crit' });

  // USB / Port
  if (usb.connectorWear)
    cards.push({ label: 'Port Wear', value: usb.connectorWear, status: usb.connectorWear === 'HIGH' ? 'crit' : 'warn' });
  if (usb.contactResistance)
    cards.push({ label: 'Contact Resistance', value: usb.contactResistance, status: 'crit' });

  // Hardware impact / drop
  if (hw.lastImpact)
    cards.push({ label: 'Impact Force', value: `${hw.lastImpact}G`, status: 'crit' });
  if (hw.dropDetection)
    cards.push({ label: 'Drop Detected', value: hw.fallHeight || 'Yes', status: 'crit' });
  if (hw.hinge_cycles)
    cards.push({ label: 'Hinge Cycles', value: hw.hinge_cycles.toLocaleString(), status: hw.hinge_cycles > 7000 ? 'warn' : 'ok' });

  // Software / OS
  if (d.osHealth && d.osHealth !== 'PERFECT')
    cards.push({ label: 'OS Health', value: d.osHealth, status: 'crit' });
  if (d.ramTest && d.ramTest !== 'OK')
    cards.push({ label: 'RAM Test', value: d.ramTest, status: 'crit' });
  if (sw.lastOsUpdate)
    cards.push({ label: 'Last OS Update', value: sw.lastOsUpdate, status: sw.updateIssue ? 'warn' : 'ok' });

  // Usage
  if (usage.chargeCount !== undefined)
    cards.push({ label: 'Charge Cycles', value: `${usage.chargeCount}`, status: usage.chargeCount > 500 ? 'warn' : 'ok' });

  // Analysis
  if (analysis.probabilityHardwareFailure)
    cards.push({ label: 'HW Failure Prob.', value: analysis.probabilityHardwareFailure, status: parseInt(analysis.probabilityHardwareFailure) >= 80 ? 'crit' : parseInt(analysis.probabilityHardwareFailure) >= 50 ? 'warn' : 'ok' });
  if (analysis.estimatedRepairTime || analysis.estRepairTime)
    cards.push({ label: 'Est. Repair', value: analysis.estimatedRepairTime || analysis.estRepairTime, status: 'neutral' });
  if (analysis.partCost)
    cards.push({ label: 'Part Cost', value: analysis.partCost, status: 'neutral' });

  return cards.slice(0, 6); // max 6 cards
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ReservationQueue({ model }) {
  const [activeTab, setActiveTab] = useState('live');
  const [reqFilter, setReqFilter] = useState('All');
  const [activeReqId, setActiveReqId] = useState(liveRequests[model][0].id);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [historyFilter, setHistoryFilter] = useState('All');
  const [perfModelFilter, setPerfModelFilter] = useState('All');
  const [perfPartnerFilter, setPerfPartnerFilter] = useState('All Partners');
  const [contextOpen, setContextOpen] = useState(false);

  // ─── ANALYTICS REACTIVE LAYER ──────────────────────────────────────────────
  const isToBe = model === 'TO_BE';
  const qStats = oemMetrics[model].queueStats;
  const currentReqs = liveRequests[model];

  // Derived Performance KPIs
  const filteredKpis = useMemo(() => {
    let base = [
      { label: 'Total Repairs MTD', value: 419, sub: 'Jan–Apr 2026', trend: '+14%', color: 'indigo', icon: Wrench },
      { label: 'FTFR Rate', value: 87, sub: 'vs 83% Jan baseline', trend: '+4pp', color: 'emerald', icon: CheckCircle2 },
      { label: 'Avg Resolution', value: 2.8, sub: 'down from 3.8h Jan', trend: '-28%', color: 'blue', icon: Clock },
      { label: 'Repeat Repair Rate', value: 8.2, sub: 'returned cases', trend: '-2.1pp', color: 'amber', icon: RefreshCw },
      { label: 'Delayed Repairs', value: 70, sub: 'of 419 total cases', trend: '-12%', color: 'red', icon: AlertTriangle },
    ];

    if (perfPartnerFilter !== 'All Partners' || perfModelFilter !== 'All') {
      // Simulate filtering effects
      const mult = perfPartnerFilter !== 'All Partners' ? 0.15 : 1;
      const modelMult = perfModelFilter !== 'All' ? 0.3 : 1;
      const combined = mult * modelMult;

      return base.map(k => {
        if (k.label.includes('Total') || k.label.includes('Delayed')) {
          return { ...k, value: Math.round(k.value * combined) };
        }
        if (k.label.includes('FTFR') && perfModelFilter !== 'All') {
          // Model specific FTFR variation
          const offset = perfModelFilter === 'S24 Ultra' ? -3 : 2;
          return { ...k, value: k.value + offset };
        }
        return k;
      });
    }
    return base;
  }, [perfModelFilter, perfPartnerFilter]);

  // Derived Historical Trend
  const filteredTrend = useMemo(() => {
    if (perfPartnerFilter === 'All Partners' && perfModelFilter === 'All') return historicalRepairData;
    const mult = perfPartnerFilter !== 'All Partners' ? 0.18 : (perfModelFilter !== 'All' ? 0.35 : 1);
    return historicalRepairData.map(d => ({
      ...d,
      volume: Math.round(d.volume * mult),
      resolved: Math.round(d.resolved * mult),
      escalated: Math.round(d.escalated * mult),
    }));
  }, [perfModelFilter, perfPartnerFilter]);

  // Derived ftfrByModel
  const filteredFtfrByModel = useMemo(() => {
    if (perfModelFilter === 'All') return ftfrByModelData;
    return ftfrByModelData.map(d => ({
      month: d.month,
      [perfModelFilter]: d[perfModelFilter]
    }));
  }, [perfModelFilter]);

  // Derived Hotspots
  const filteredHotspots = useMemo(() => {
    if (perfPartnerFilter === 'All Partners') return hotspotData;
    return hotspotData.filter(h => h.id.includes(perfPartnerFilter.split('-')[1]) || h.name.includes(perfPartnerFilter.split('-')[0]));
  }, [perfPartnerFilter]);

  // Derived RCA
  const filteredRca = useMemo(() => {
    if (perfModelFilter === 'All' && perfPartnerFilter === 'All Partners') return rcaDelayData;
    const mult = perfPartnerFilter !== 'All Partners' ? 0.2 : (perfModelFilter !== 'All' ? 0.4 : 1);
    return rcaDelayData.map(d => ({
      ...d,
      count: Math.round(d.count * mult) || 1
    }));
  }, [perfModelFilter, perfPartnerFilter]);

  // Derived Partner Performance
  const filteredPartnerPerf = useMemo(() => {
    if (perfPartnerFilter === 'All Partners') return partnerPerformanceData;
    return partnerPerformanceData.filter(p => p.id.includes(perfPartnerFilter.split('-')[1]) || p.name.includes(perfPartnerFilter.split('-')[0]));
  }, [perfPartnerFilter]);

  // Derived Tech Load
  const filteredTechLoad = useMemo(() => {
    if (perfPartnerFilter === 'All Partners') return techLoadData;
    const pid = perfPartnerFilter.split('-')[1];
    return techLoadData.filter(t => t.store.includes(pid));
  }, [perfPartnerFilter]);

  // Derived Delay Buckets
  const filteredDelayBuckets = useMemo(() => {
    if (perfModelFilter === 'All' && perfPartnerFilter === 'All Partners') return delayBucketData;
    const mult = perfPartnerFilter !== 'All Partners' ? 0.25 : (perfModelFilter !== 'All' ? 0.45 : 1);
    return delayBucketData.map(d => ({
      ...d,
      value: Math.round(d.value * mult) || 1
    }));
  }, [perfModelFilter, perfPartnerFilter]);

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
    <div className="flex flex-col h-full bg-slate-50 max-w-[1536px] mx-auto w-full animate-in fade-in duration-500 relative pb-10">
      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-4 py-2 border border-slate-700 rounded-sm shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-4">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}
      <div className="flex justify-between items-start mb-5 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Inbox className="text-blue-700" size={24} /> 
              Repair Reservation <span className="text-blue-700">Workbench</span>
            </h2>
          </div>
          <p className="text-xs font-medium text-slate-500">Comprehensive repair operations management, performance intelligence, and demand forecasting.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={14} /> EXPORT
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <RefreshCw size={14} /> REFRESH
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
      <div className="flex gap-4 mb-5 border-b border-slate-200">
        {[
          { id: 'live', label: 'Live Queue', icon: Inbox },
          { id: 'history', label: 'Request History', icon: History },
          { id: 'performance', label: 'Performance Management', icon: BarChart3 },
          ...(isToBe ? [{ id: 'planning', label: 'Demand Planning', icon: Layers }] : []),
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-1 py-2 text-[11px] font-bold uppercase tracking-wider border-b-[3px] transition-all ${activeTab === tab.id ? 'border-blue-700 text-blue-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          TAB: LIVE QUEUE
      ═══════════════════════════════════════════════════ */}
      {activeTab === 'live' && (
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col min-h-[600px]">
          {/* MAIN CONTENT: 65/35 SPLIT */}
          <div className="flex gap-4 flex-1 overflow-hidden">
            {/* LEFT: Request List (65%) */}
            <div className="w-[48%] bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col overflow-hidden flex-shrink-0">
            {/* Search & Filter */}
            <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center gap-3 flex-shrink-0">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by ID, device, customer..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-sm outline-none focus:border-blue-600 transition-colors"
                />
              </div>
              <div className="flex gap-1">
                {['All', 'Ready', 'Needs Action'].map(f => (
                  <button key={f} onClick={() => setReqFilter(f)} className={`px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border transition-all ${reqFilter === f ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-500 border-slate-300 hover:border-blue-400'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {/* List */}
            <div className="overflow-y-auto flex-1 space-y-0.5 h-full">
              {filteredLive.map(req => (
                <div
                  key={req.id}
                  onClick={() => setActiveReqId(req.id)}
                  className={`px-4 py-3.5 border-b border-slate-100 cursor-pointer transition-all ${activeReqId === req.id ? 'bg-slate-100 border-l-[4px] border-l-blue-700' : 'bg-white border-l-[4px] border-l-transparent hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`font-bold text-[12px] uppercase tracking-tight ${activeReqId === req.id ? 'text-blue-800' : 'text-slate-800'}`}>{req.id} · {req.issueShort}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${priorityColor[req.priority]}`}>{req.priority}</span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1"><Clock size={11}/>{req.time}</span>
                    </div>
                  </div>
                  <div className="text-[12px] font-bold text-slate-600 flex items-center justify-between">
                    <span>{req.device}</span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1"><User size={11} className="text-slate-300"/>{req.technician}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Request Detail (35%) */}
          <div className="w-[52%] flex-shrink-0 bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col overflow-hidden">
            {!activeReq ? (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm font-semibold">Select a request to view details</div>
            ) : (
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto px-4 pr-4 py-4 space-y-4">
                  {/* HEADER */}
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[9px] text-blue-600 font-bold uppercase tracking-widest mb-1">{activeReq.id} · ACTIVE REQUEST</div>
                        <div className="text-[15px] font-extrabold text-slate-900 leading-tight">{activeReq.device}</div>
                        <div className="text-[11px] text-slate-500 mt-1 italic">"{activeReq.issueShort}"</div>
                      </div>
                      <span className={`flex-shrink-0 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${activeReq.status === 'GREEN' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : activeReq.status === 'AMBER' ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-red-50 text-red-700 border-red-300'}`}>
                        {activeReq.status === 'GREEN' ? 'READY TO PEG' : activeReq.status === 'AMBER' ? 'REVIEW' : 'CRITICAL'}
                      </span>
                    </div>
                  </div>

                  {/* CUSTOMER & DEVICE INFO - Grid Layout */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                    {[
                      { label: 'Customer', value: activeReq.customer, color: 'text-slate-800' },
                      { label: 'Model', value: activeReq.device.split(' ')[0], color: 'text-slate-800' },
                      { label: 'Device Age', value: `${activeReq.age} months`, color: 'text-slate-800' },
                      { label: 'Entitlement', value: activeReq.warranty === 'In Warranty' ? 'GalaxyCare+' : 'Out of Warranty', color: activeReq.warranty === 'In Warranty' ? 'text-blue-700' : 'text-slate-600' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="bg-slate-50 border border-slate-200 rounded px-2.5 py-2">
                        <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide mb-0.5">{label}</div>
                        <div className={`text-[11px] font-bold ${color}`}>{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* SMART TELEMETRY PANEL */}
                  {(requestTelemetry[activeReq.id] || requestTelemetry[activeReq.id.replace(/2026041\d/, '20260409')]) && (() => {
                    const t = requestTelemetry[activeReq.id] || requestTelemetry[activeReq.id.replace(/2026041\d/, '20260409')];
                    const analysis = t.analysisAndDecision || {};
                    const cards = getTelemetryCards(t);
                    const isCritical = parseInt(analysis.probabilityHardwareFailure) >= 80;
                    const statusColor = isCritical ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50';
                    const labelColor = isCritical ? 'text-red-600' : 'text-amber-600';
                    return (
                      <div className={`border rounded overflow-hidden ${statusColor}`}>
                        {/* Header */}
                        <div className={`px-3 py-2 border-b ${isCritical ? 'border-red-200 bg-red-100/60' : 'border-amber-200 bg-amber-100/60'} flex items-center justify-between`}>
                          <div className={`text-[9px] font-bold uppercase tracking-widest ${labelColor} flex items-center gap-1.5`}>
                            {isCritical ? '⚠️' : '🔍'} Device Diagnostics
                          </div>
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${isCritical ? 'bg-red-200 text-red-700' : 'bg-amber-200 text-amber-700'}`}>
                            {analysis.softFixApplicable === true ? 'Soft Fix Possible' : analysis.softFixApplicable === false ? 'Hardware Required' : 'Mixed'}
                          </span>
                        </div>

                        {/* Metric cards grid */}
                        {cards.length > 0 && (
                          <div className="grid grid-cols-2 gap-px bg-slate-200 border-b border-slate-200">
                            {cards.map(({ label, value, status }) => {
                              const valColor = status === 'crit' ? 'text-red-700' : status === 'warn' ? 'text-amber-700' : status === 'ok' ? 'text-emerald-700' : 'text-slate-700';
                              return (
                                <div key={label} className="bg-white px-2.5 py-2">
                                  <div className="text-[8px] text-slate-400 font-semibold uppercase tracking-wide mb-0.5">{label}</div>
                                  <div className={`text-[11px] font-bold ${valColor} leading-tight`}>{value}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Root cause + repair path */}
                        <div className="px-3 py-2.5 space-y-2">
                          {analysis.primaryCause && (
                            <div>
                              <div className="text-[8px] text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Root Cause</div>
                              <div className={`text-[10px] font-semibold ${isCritical ? 'text-red-800' : 'text-amber-800'} leading-snug`}>{analysis.primaryCause}</div>
                            </div>
                          )}
                          {analysis.secondaryCause && (
                            <div>
                              <div className="text-[8px] text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Secondary Factor</div>
                              <div className="text-[9px] text-slate-600 leading-snug">{analysis.secondaryCause}</div>
                            </div>
                          )}
                          {analysis.details && (
                            <div>
                              <div className="text-[8px] text-slate-400 font-semibold uppercase tracking-wide mb-1">Findings</div>
                              <div className="space-y-0.5">
                                {(Array.isArray(analysis.details) ? analysis.details : [analysis.details]).map((d, i) => (
                                  <div key={i} className="flex gap-1.5 text-[9px] text-slate-600 leading-snug">
                                    <span className="text-slate-400 flex-shrink-0">·</span><span>{d}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Repair strategy steps if present */}
                          {analysis.repairStrategy && (
                            <div>
                              <div className="text-[8px] text-slate-400 font-semibold uppercase tracking-wide mb-1">Repair Path</div>
                              <div className="space-y-1">
                                {analysis.repairStrategy.map((s) => (
                                  <div key={s.step} className="flex gap-2 text-[9px] leading-snug">
                                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-[8px]">{s.step}</span>
                                    <div>
                                      <span className="font-semibold text-slate-700">{s.action}</span>
                                      {s.success_rate && <span className="text-slate-400 ml-1">({s.success_rate} success)</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {analysis.warrantyStatus && (
                            <div className={`text-[9px] font-semibold px-2 py-1 rounded ${analysis.warrantyStatus.includes('IN WARRANTY') ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                              {analysis.warrantyStatus.includes('IN WARRANTY') ? '🛡️' : '💳'} {analysis.warrantyStatus}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* AI PART PREDICTION TABLE */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-slate-400">📋</span> AI Part Prediction <span className="text-slate-400 font-normal normal-case tracking-normal">(Symptom → Parts)</span>
                    </div>
                    <div className="border border-slate-200 rounded overflow-hidden">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr className="text-slate-500 font-bold uppercase tracking-wide">
                            <th className="px-2.5 py-2 text-left">Part SKU</th>
                            <th className="px-2.5 py-2 text-left">Description</th>
                            <th className="px-2.5 py-2 text-center">Prob.</th>
                            <th className="px-2.5 py-2 text-center">QTY</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {activeReq.tentativeParts?.map((part, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-2.5 py-2 font-bold text-blue-700">{part.split(' - ')[0]}</td>
                              <td className="px-2.5 py-2 text-slate-600">{part.split(' - ')[1]}</td>
                              <td className="px-2.5 py-2 text-center font-bold text-emerald-600">92%</td>
                              <td className="px-2.5 py-2 text-center text-slate-600">1</td>
                            </tr>
                          ))}
                          <tr className="hover:bg-slate-50 bg-slate-50/50">
                            <td className="px-2.5 py-2 font-bold text-slate-500">ADH-GEN-K</td>
                            <td className="px-2.5 py-2 text-slate-500">Adhesive Kit (generic)</td>
                            <td className="px-2.5 py-2 text-center font-bold text-emerald-600">92%</td>
                            <td className="px-2.5 py-2 text-center text-slate-500">1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* PARTNER CAPACITY EVALUATION */}
                  {(() => {
                    const storeNumMatch = activeReq.store.match(/#(\d+)/);
                    const storeNum = storeNumMatch ? storeNumMatch[1] : null;
                    const primary = partnerPerformanceData.find(p => p.id === `P-${storeNum}`) || partnerPerformanceData[0];
                    const alt = partnerPerformanceData.filter(p => p.id !== primary.id).sort((a, b) => a.slaCompliance - b.slaCompliance)[0];
                    const partSku = activeReq.tentativeParts?.[0]?.split(' - ')[0] || '';
                    const partDesc = activeReq.tentativeParts?.[0]?.split(' - ')[1] || '';
                    const partInv = topDelayedPartsData.find(p => p.sku === partSku);
                    const primaryStock = partInv ? partInv.maxStock : 45;
                    const altStock = partInv ? partInv.minStock : 8;
                    const warehouseStock = primaryStock * 40;
                    return (
                      <>
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="text-slate-400">📍</span> Partner Capacity Evaluation
                          </div>
                          <div className="space-y-2">
                            {/* Primary */}
                            <div className="p-3 border-2 border-emerald-300 bg-emerald-50 rounded">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="min-w-0">
                                  <div className="text-[11px] font-bold text-slate-800 leading-tight">{primary.name} — {primary.city}</div>
                                  <div className="text-[9px] text-slate-500 mt-1 leading-relaxed">
                                    {primary.region} · {primary.tier} Partner<br/>
                                    Avg resolution: {primary.avgResTime}h · FTFR: {primary.ftfr}%
                                  </div>
                                </div>
                                <div className="flex flex-col items-end flex-shrink-0">
                                  <div className="text-2xl font-black text-emerald-700 leading-none">{primary.slaCompliance}</div>
                                  <div className="text-[8px] text-emerald-600 font-bold tracking-wider mt-0.5">SLA %</div>
                                </div>
                              </div>
                              <div className="text-[9px] text-emerald-700 font-bold uppercase tracking-wide flex items-center gap-1">
                                <span>✓</span> RECOMMENDED · {activeReq.store}
                              </div>
                            </div>
                            {/* Alt */}
                            <div className="p-3 border border-slate-200 bg-slate-50 rounded opacity-70">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="min-w-0">
                                  <div className="text-[11px] font-bold text-slate-600 leading-tight">{alt.name} — {alt.city}</div>
                                  <div className="text-[9px] text-slate-500 mt-1 leading-relaxed">
                                    {alt.region} · {alt.tier} Partner<br/>
                                    {alt.delayedCases} delayed cases · Avg res: {alt.avgResTime}h
                                  </div>
                                </div>
                                <div className="flex flex-col items-end flex-shrink-0">
                                  <div className="text-2xl font-black text-slate-400 leading-none">{alt.slaCompliance}</div>
                                  <div className="text-[8px] text-slate-400 font-bold tracking-wider mt-0.5">SLA %</div>
                                </div>
                              </div>
                              <div className="text-[9px] text-slate-400 uppercase tracking-wide font-semibold">NOT RECOMMENDED</div>
                            </div>
                          </div>
                        </div>

                        {/* INVENTORY AVAILABILITY */}
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="text-slate-400">📦</span> Inventory — <span className="font-bold text-blue-700">{partSku}</span><span className="text-slate-400 font-normal"> {partDesc}</span>
                          </div>
                          <div className="space-y-2.5">
                            {[
                              { label: `${primary.name} (${primary.city})`, units: `${primaryStock} units`, pct: `${Math.min(100, Math.round(primaryStock / (partInv?.maxStock || primaryStock) * 100))}%`, color: 'bg-emerald-500', textColor: 'text-emerald-700' },
                              { label: `${alt.name} (${alt.city})`, units: `${altStock} units`, pct: `${Math.min(100, Math.round(altStock / (partInv?.maxStock || primaryStock) * 100))}%`, color: altStock < 12 ? 'bg-red-500' : 'bg-amber-400', textColor: altStock < 12 ? 'text-red-600' : 'text-amber-700' },
                              { label: 'Warehouse (Central)', units: `${warehouseStock.toLocaleString()} units`, pct: '100%', color: 'bg-emerald-500', textColor: 'text-emerald-700' },
                            ].map(({ label, units, pct, color, textColor }) => (
                              <div key={label}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-semibold text-slate-700">{label}</span>
                                  <span className={`text-[10px] font-bold ${textColor}`}>{units}</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-1.5">
                                  <div className={`${color} h-1.5 rounded-full transition-all`} style={{width: pct}}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* SYSTEM RECOMMENDATION */}
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                          <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <span>✅</span> System Recommendation
                          </div>
                          <div className="space-y-2">
                            {[
                              { label: 'Request', value: activeReq.id },
                              { label: 'Assigned Partner', value: `${primary.name} — ${primary.city}` },
                              { label: 'Technician', value: activeReq.technician },
                              { label: 'Appointment', value: `${activeReq.date} · ${activeReq.time}` },
                            ].map(({ label, value }) => (
                              <div key={label} className="flex items-start justify-between gap-2">
                                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wide whitespace-nowrap">{label}</span>
                                <span className="text-[10px] text-blue-900 font-semibold text-right">{value}</span>
                              </div>
                            ))}
                            <div className="pt-1 border-t border-blue-200">
                              <div className="text-[9px] font-bold text-blue-400 uppercase tracking-wide mb-1.5">Pre-Actions</div>
                              <div className="text-[9px] text-blue-700 space-y-1 leading-relaxed">
                                <div className="flex gap-1.5"><span className="text-blue-400 flex-shrink-0">•</span><span>Inventory hard-peg: <strong>{partSku}</strong> reserved for {activeReq.id} at {primary.city}</span></div>
                                <div className="flex gap-1.5"><span className="text-blue-400 flex-shrink-0">•</span><span>Replenishment check: {partDesc} stock at {primary.name}</span></div>
                                <div className="flex gap-1.5"><span className="text-blue-400 flex-shrink-0">•</span><span>{alt.name} flagged — {alt.delayedCases} delayed cases, rebalancing advised</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* ACTION BUTTONS */}
                <div className="border-t border-slate-200 p-3 bg-slate-50 space-y-2">
                  <button
                    onClick={() => showToast(`✅ Confirmed & Pegged ${activeReq.id}`)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-sm text-xs transition-all uppercase tracking-widest"
                  >
                    ✓ Confirm & Peg
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-sm text-[10px] hover:bg-slate-100 transition-all uppercase">
                      Override Partner
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-sm text-[10px] hover:bg-slate-100 transition-all uppercase">
                      Escalate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB: HISTORY
      ═══════════════════════════════════════════════════ */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2"><History size={14} className="text-blue-700"/> RECENT RESOLUTIONS (30 DAYS)</h3>
            <div className="flex gap-1">
              {['All', 'RESOLVED', 'RESCHEDULED', 'ESCALATED'].map(f => (
                <button key={f} onClick={() => setHistoryFilter(f)} className={`px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-wider border transition-all ${historyFilter === f ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400'}`}>
                  {f === 'All' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-slate-400 font-bold uppercase tracking-tight text-[9px]">
                  {['Request ID', 'Date', 'Device', 'Part Used', 'Store', 'Technician', 'Res. Time', 'Outcome', 'Status'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredHistory.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                    <td className="px-4 py-3 font-bold text-blue-700 uppercase tracking-tighter">{r.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-500 flex items-center gap-1"><Calendar size={10}/>{r.date}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{r.device}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium max-w-[180px] truncate">{r.part}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{r.store}</td>
                    <td className="px-4 py-3 text-slate-700 font-bold flex items-center gap-1"><User size={10}/>{r.technician}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{r.resolution === '--' ? <span className="text-slate-300">—</span> : `${r.resolution}h`}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{r.outcome}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-wider ${histStatusColor[r.status].replace('bg-', 'bg-').replace('text-', 'text-')}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ═══════════ TAB: REPAIR PERFORMANCE MGT ═══════════ */}
      {activeTab === 'performance' && (
        <div className="space-y-5">

          {/* GLOBAL FILTER BAR */}
          <div className="bg-white border border-slate-200 rounded-sm p-3 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mr-2">
              <Filter size={12} className="text-blue-700" /> Filter Suite:
            </div>
            {['All', 'S24 Ultra', 'A54', 'M34', 'Z Fold4'].map(m => (
              <button key={m} onClick={() => setPerfModelFilter(m)}
                className={`px-3 py-1 text-[10px] font-bold rounded-sm border transition-all ${perfModelFilter === m ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400'}`}>{m}</button>
            ))}
            <div className="w-px h-4 bg-slate-200 mx-1" />
            {['All Partners', 'CHI-142', 'NY-045', 'LA-092', 'MIA-301', 'NAP-187'].map(p => (
              <button key={p} onClick={() => setPerfPartnerFilter(p)}
                className={`px-3 py-1 text-[10px] font-bold rounded-sm border transition-all ${perfPartnerFilter === p ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400'}`}>{p}</button>
            ))}
            <div className="ml-auto text-[9px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-sm border border-slate-200 uppercase">
              Current Scope: Apr 2026
            </div>
          </div>

          {/* PERFORMANCE KPIs */}
          <div className="grid grid-cols-5 gap-3">
            {filteredKpis.map((kpi, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-sm p-4 shadow-sm hover:border-blue-300 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-1.5 rounded-sm bg-slate-50 border border-slate-100`}>
                    <kpi.icon size={14} className={`text-blue-700`} />
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-100`}>{kpi.trend}</span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                <p className="text-xl font-bold text-slate-900 leading-none">{kpi.value}{kpi.label.includes('FTFR') || kpi.label.includes('Rate') ? '%' : kpi.label.includes('Avg') ? 'h' : ''}</p>
                <div className="mt-2 text-[8px] text-slate-400 font-medium uppercase tracking-tighter">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* HISTORICAL TRENDS + FTFR BY MODEL */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 bg-white border border-slate-200 rounded-sm shadow-sm p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Repair Volume & Resolution</h4>
                  <p className="text-sm font-bold text-slate-900">Historical Performance Metrics</p>
                </div>
                <div className="flex gap-4 text-[8px] font-bold text-slate-400 uppercase">
                  {[['#1d4ed8','Volume'],['#059669','Resolved'],['#ea580c','Escalated'],['#d97706','FTFR %']].map(([c,l]) => (
                    <span key={l} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{background:c}}/>{l}</span>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={filteredTrend} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#94a3b8' }} domain={[60, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '0px', border: '1px solid #e2e8f0', fontSize: 10, fontWeight: 700, boxShadow: 'none' }} />
                  <Bar yAxisId="left" dataKey="volume" fill="#1d4ed8" fillOpacity={0.8} radius={[2,2,0,0]} barSize={24} />
                  <Bar yAxisId="left" dataKey="resolved" fill="#059669" fillOpacity={0.8} radius={[2,2,0,0]} barSize={24} />
                  <Bar yAxisId="left" dataKey="escalated" fill="#ea580c" fillOpacity={0.8} radius={[2,2,0,0]} barSize={12} />
                  <Line yAxisId="right" type="monotone" dataKey="ftfr" stroke="#d97706" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#d97706', strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-sm">
                <p className="text-[10px] font-bold text-blue-900 leading-relaxed"><span className="bg-blue-700 text-white px-1.5 py-0.5 rounded-sm text-[8px] mr-2">AI INSIGHT</span> FTFR improved +8pp (Jan→Apr). Realignment driven by predictive modeling at CHI-142 reduced critical escalations by 83%.</p>
              </div>
            </div>

            <div className="col-span-4 bg-white border border-slate-200 rounded-sm shadow-sm p-5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Model Distribution</h4>
              <p className="text-sm font-bold text-slate-900 mb-6">FTFR % Trends by Family</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={filteredFtfrByModel} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#94a3b8' }} domain={[55, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '0px', border: '1px solid #e2e8f0', fontSize: 10, fontWeight: 700 }} />
                  <Line type="monotone" dataKey="S24 Ultra" stroke="#1d4ed8" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="A54" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="M34" stroke="#d97706" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Z Fold4" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5">
                {[['#1d4ed8','S24 Ultra'],['#059669','A54'],['#d97706','M34'],['#7c3aed','Z Fold4']].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase"><span className="w-2 h-2 rounded-full" style={{background:c}}/>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* HOTSPOT + RCA */}
          <div className="grid grid-cols-2 gap-4">
            {/* Hotspot Table */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-5">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Partner Risk Hub</h4>
                  <p className="text-sm font-bold text-slate-900">Delay Hotspot Identification</p>
                </div>
                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-bold rounded-sm border border-red-100 uppercase">2 Critical</span>
              </div>
              <div className="rounded-sm overflow-hidden border border-slate-100">
                <table className="w-full text-[11px]">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-slate-400 font-bold uppercase tracking-tight text-[9px] text-left">
                      {['Partner','Region','Avg Res.','SLA Gap','Score'].map(h=>(
                        <th key={h} className="px-3 py-2 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredHotspots.length > 0 ? filteredHotspots.map((h, i) => (
                      <tr key={i} className={`hover:bg-slate-50 transition-colors ${h.level==='critical'?'bg-red-50/20':h.level==='high'?'bg-amber-50/20':''}`}>
                        <td className="px-3 py-2.5 font-bold text-slate-800 flex items-center gap-1.5 whitespace-nowrap">
                          {h.level==='critical'&&<span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"/>}
                          {h.level==='high'&&<span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>}
                          <span className="truncate">{h.name}</span>
                        </td>
                        <td className="px-3 py-2.5 text-slate-500 font-medium">{h.region}</td>
                        <td className="px-3 py-2.5 font-bold text-slate-800">{h.avgResTime}h</td>
                        <td className="px-3 py-2.5 font-bold text-red-600">{h.slaBreach}%</td>
                        <td className="px-3 py-2.5">
                          <span className={`font-bold text-[9px] px-2 py-0.5 rounded-sm ${h.score>70?'bg-red-800 text-white':h.score>45?'bg-amber-100 text-amber-800':'bg-emerald-100 text-emerald-800'}`}>{h.score}</span>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" className="p-10 text-center text-slate-400 font-bold uppercase text-[9px]">No matching partners</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Automated RCA */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-5">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Root Cause Analysis</h4>
                  <p className="text-sm font-bold text-slate-900">Time Delay Distribution (Pareto)</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-800 text-white text-[9px] font-bold rounded-sm uppercase">P80 Rule Map</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <ComposedChart data={filteredRca} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="cause" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#64748b', fontWeight: 600 }} angle={-10} textAnchor="end" height={35} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#94a3b8' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '0', border: '1px solid #e2e8f0', fontSize: 10, fontWeight: 700 }} />
                  <Bar yAxisId="left" dataKey="count" radius={[2,2,0,0]} barSize={30}>
                    {filteredRca.map((e,i) => <Cell key={i} fill={e.color} fillOpacity={0.8} />)}
                  </Bar>
                  <Line yAxisId="right" type="monotone" dataKey="cumPct" stroke="#1e293b" strokeWidth={2} dot={{ r: 3, fill: '#1e293b' }} />
                  <ReferenceLine yAxisId="right" y={80} stroke="#1e293b" strokeDasharray="4 4" strokeWidth={1} />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-sm">
                <p className="text-[10px] font-bold text-red-900 leading-relaxed"><span className="text-red-700 uppercase font-bold mr-2 text-[8px] border border-red-200 px-1 py-0.5 rounded-sm bg-white">RCA ALARM</span> 70% of bottleneck driven by Stockout + Routing. Recommend immediate buffer adjustment for SKU group PT01.</p>
              </div>
            </div>
          </div>

          {/* RCA DRILL-DOWN TABLE */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Drill-Down Matrix</h4>
                <p className="text-sm font-bold text-slate-900">Partner × Root Cause Detail Analysis</p>
              </div>
              <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[9px] font-bold rounded-sm border border-red-100 uppercase">33 Delayed Cases</span>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-400 font-bold uppercase tracking-tight text-[9px] text-left">
                  {['Partner','Part SKU','# Delays','Primary Cause','Avg Latency','% Impact','Fix Strategy'].map(h=>(
                    <th key={h} className="px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rcaDrilldownData.map((row, i) => (
                  <tr key={i} className={`hover:bg-slate-50 transition-colors ${row.status === 'critical' ? 'bg-red-50/20' : ''}`}>
                    <td className="px-4 py-3 font-bold text-slate-800">{row.partner}</td>
                    <td className="px-4 py-3 text-slate-500 font-bold tracking-tighter">{row.part}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{row.delayedCount}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{row.cause}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{row.avgDelay}h</td>
                    <td className="px-4 py-3"><span className={`font-bold text-[9px] px-2 py-0.5 rounded-sm ${row.pctTotal > 20 ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{row.pctTotal}%</span></td>
                    <td className="px-4 py-3 text-[9px] font-bold text-blue-700 uppercase tracking-tight">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOP DELAYED PARTS + PARTNER PERFORMANCE COMPARISON */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Delayed Parts */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Part Impact Analysis</h4>
                  <p className="text-sm font-bold text-slate-900">Highest Frequency Delay SKU List</p>
                </div>
              </div>
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-bold tracking-tight text-left">
                  <tr>
                    {['SKU','Impact Events','Avg Latency','Stock Policy','Status'].map(h=>(
                      <th key={h} className="px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topDelayedPartsData.map((row, i) => (
                    <tr key={i} className={`hover:bg-slate-50 transition-colors ${row.status === 'critical' ? 'bg-red-50/20' : ''}`}>
                      <td className="px-4 py-3 font-bold text-slate-800 uppercase tracking-tighter">{row.sku}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{row.delayEvents}</td>
                      <td className="px-4 py-3 font-medium text-slate-600">{row.avgOosDays} days</td>
                      <td className="px-4 py-3 text-slate-500 font-medium">{row.minStock}/{row.maxStock}</td>
                      <td className="px-4 py-3"><span className={`font-bold text-[9px] px-2 py-0.5 rounded-sm ${row.status === 'critical' ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{row.status.toUpperCase()}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Partner Performance Comparative */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Partner Ranking</h4>
                  <p className="text-sm font-bold text-slate-900">Comparative Performance Assessment</p>
                </div>
              </div>
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-bold tracking-tight text-left">
                  <tr>
                    {['Partner','SLA Rate','Lead Time','OOS','Score','Tier'].map(h=>(
                      <th key={h} className="px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {partnerComparisonData.map((row, i) => {
                    const isTop = row.slaRate >= 90;
                    return (
                      <tr key={i} className={`hover:bg-slate-50 transition-colors ${isTop ? 'bg-emerald-50/20' : ''}`}>
                        <td className="px-4 py-3 font-bold text-slate-800">{row.partner.split(' (')[0]}</td>
                        <td className="px-4 py-3 font-bold text-slate-900">{row.slaRate}%</td>
                        <td className="px-4 py-3 font-medium text-slate-600">{row.avgLeadTime}h</td>
                        <td className="px-4 py-3"><span className={`font-bold text-[9px] px-2 py-0.5 rounded-sm ${row.stockouts > 10 ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{row.stockouts}</span></td>
                        <td className="px-4 py-3 font-bold text-slate-800">{row.customerScore}</td>
                        <td className="px-4 py-3"><span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 border border-slate-200 rounded-sm">{row.tier}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* DELAY PIE + ACTIONABLE INSIGHTS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Delay Attribution</h4>
              <p className="text-sm font-bold text-slate-900 mb-6">Root Cause Volume by Segment</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={filteredDelayBuckets} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                    {filteredDelayBuckets.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '0', border: '1px solid #e2e8f0', fontSize: 10, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-5">
                {filteredDelayBuckets.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-[9px] uppercase font-bold">
                    <span className="flex items-center gap-2 text-slate-500 font-bold"><span className="w-2 h-2 rounded-full" style={{background:d.color}}/>{d.name}</span>
                    <span className="text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[9px] font-bold text-slate-500">Inventory factors = <span className="text-red-700 font-bold">44%</span> of aggregate delays.</p>
              </div>
            </div>

            <div className="col-span-2 bg-white border border-slate-200 rounded-sm shadow-sm p-5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Countermeasures</h4>
              <p className="text-sm font-bold text-slate-900 mb-6">Autonomous Recommendation Engine</p>
              <div className="grid grid-cols-2 gap-3">
                {actionableInsightsData.map((ins, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-sm p-4 relative overflow-hidden group hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-1.5 rounded-sm bg-white border border-slate-100`}>
                        <ins.icon size={13} className="text-blue-700" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-800 leading-tight uppercase tracking-tight">{ins.title}</p>
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 leading-normal mb-4 h-[30px] overflow-hidden">{ins.desc}</p>
                    <button className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm bg-slate-800 text-white hover:bg-slate-900 transition-all">EXECUTE ACTION</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PARTNER PERFORMANCE TABLE */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Partner Performance</h4>
                <p className="text-sm font-bold text-slate-900">SLA Compliance & FTFR Reliability Matrix</p>
              </div>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-tight text-[9px] text-left">
                <tr>
                  {['','Vendor','Region','Tier','FTFR','Avg Res.','Delayed','SLA Compliance','Trend','Load'].map(h=>(
                    <th key={h} className="px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPartnerPerf.map((p, i) => {
                  const isTop = (i < 3 && perfPartnerFilter === 'All Partners');
                  const isBot = (i >= partnerPerformanceData.length - 2 && perfPartnerFilter === 'All Partners');
                  return (
                    <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${isTop ? 'bg-emerald-50/20' : isBot ? 'bg-red-50/20' : ''}`}>
                      <td className="px-4 py-3">
                        {isTop ? <Award size={14} className="text-emerald-600" /> : isBot ? <AlertCircle size={14} className="text-red-500" /> : <span className="text-slate-300 font-bold text-xs">{i+1}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[9px] text-slate-400 font-medium uppercase">{p.id} · {p.city}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-medium">{p.region}</td>
                      <td className="px-4 py-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 border border-slate-200 rounded-sm">{p.tier}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">{p.ftfr}%</td>
                      <td className="px-4 py-3 font-medium text-slate-700">{p.avgResTime}h</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{p.delayedCases}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-20">
                            <div className={`h-full rounded-full ${p.slaCompliance>90?'bg-emerald-500':p.slaCompliance>80?'bg-amber-400':'bg-red-500'}`} style={{width:`${p.slaCompliance}%`}} />
                          </div>
                          <span className="font-bold text-[10px] text-slate-700">{p.slaCompliance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {p.trend==='up' ? <TrendingUp size={14} className="text-emerald-600" /> : <TrendingDown size={14} className="text-red-500" />}
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-700">{p.repairs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* TECHNICIAN LOAD */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Human Capital</h4>
            <p className="text-sm font-bold text-slate-900 mb-6">Technician Load & Active Queue Analysis</p>
            <div className="grid grid-cols-3 gap-4">
              {filteredTechLoad.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-sm bg-slate-50 border border-slate-100 group hover:border-blue-300 transition-all">
                  <div className="w-8 h-8 rounded-sm bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-slate-400 group-hover:text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-bold text-slate-800 truncate">{t.tech}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-700 tracking-tighter`}>{t.active} PROJECTS</span>
                    </div>
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${t.load>90?'bg-red-600':t.load>75?'bg-amber-500':'bg-blue-600'}`} style={{width:`${t.load}%`}} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">{t.store}</span>
                      <span className={`text-[9px] font-bold ${t.load>90?'text-red-600':'text-slate-600'}`}>{t.load}% UTIL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ TAB: DEMAND PLANNING (TO-BE ONLY) ═══════════ */}
      {activeTab === 'planning' && isToBe && (
        <div className="space-y-5">

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: 'Peak Demand Month', value: 'Dec 2026', sub: 'A54 Battery: 67 units projected', color: 'indigo', icon: Calendar },
              { label: 'At-Risk SKU', value: 'PT01 — S24U OLED', sub: 'CHI-142: 4-day stockout window', color: 'red', icon: AlertTriangle },
              { label: 'Pre-Order Recommendation', value: '22 Units · PT10', sub: 'NY-045 cluster · 8-day lead time', color: 'emerald', icon: Package },
            ].map((c, i) => (
              <div key={i} className={`bg-${c.color}-50 border border-${c.color}-200 rounded-2xl p-6 flex items-start gap-4`}>
                <div className={`p-3 rounded-xl bg-${c.color}-100`}>
                  <c.icon size={20} className={`text-${c.color}-600`} />
                </div>
                <div>
                  <p className={`text-[10px] font-black text-${c.color}-400 uppercase tracking-widest mb-1`}>{c.label}</p>
                  <p className={`text-lg font-black text-${c.color}-900 mb-0.5`}>{c.value}</p>
                  <p className={`text-[11px] font-semibold text-${c.color}-700`}>{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* INSTALL BASE BY MODEL × REGION */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Install Base Analysis —</h4>
              <p className="text-base font-black text-gray-900">Device Population by Model × Region (Units)</p>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Model','N. Metro','S. Metro','Rural W','Total','Avg Age'].map(h=>(
                    <th key={h} className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {installBaseByRegion.map((row, i) => {
                  const isTotal = row.model === 'TOTAL';
                  const isHeroProduct = row.model === 'S24 Ultra' || row.model === 'A54';
                  return (
                    <tr key={i} className={`hover:bg-gray-50 transition-colors ${isTotal ? 'bg-gray-100' : isHeroProduct ? 'bg-teal-50/30' : ''}`}>
                      <td className={`px-4 py-3 font-black ${isTotal ? 'text-gray-800' : 'text-gray-800'}`}>{row.model}</td>
                      <td className="px-4 py-3 text-gray-700 font-semibold">{row.nMetro.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-700 font-semibold">{row.sMetro.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-700 font-semibold">{row.ruralW.toLocaleString()}</td>
                      <td className={`px-4 py-3 font-black ${isTotal ? 'text-gray-900' : 'text-gray-800'}`}>{row.total.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600 font-semibold">{row.avgAge} mo</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ANNUAL FAILURE RATES */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Failure Analysis —</h4>
              <p className="text-base font-black text-gray-900">Annual Failure Rates & Monthly Demand by Part</p>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Device','Part','Annual %','BOM','Monthly Demand','Formula'].map(h=>(
                    <th key={h} className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {failureRateByPart.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-800 text-[10px]">{row.model}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold text-[10px]">{row.part}</td>
                    <td className="px-4 py-3"><span className="font-black text-gray-800">{row.failPct}%</span></td>
                    <td className="px-4 py-3 text-gray-700 font-bold">{row.bomQty}</td>
                    <td className="px-4 py-3 font-black text-gray-800">{row.demand} units</td>
                    <td className="px-4 py-3 text-[9px] text-indigo-600 font-semibold">IB×{row.failPct}%÷12</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOM USAGE BY REPAIR TYPE + EXPECTED MONTHLY DEMAND */}
          <div className="grid grid-cols-2 gap-5">
            {/* BOM Usage Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Parts Requirements —</h4>
                <p className="text-base font-black text-gray-900">BOM Usage Per Repair Scenario</p>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Repair Type','Parts','SKU','Cost','Total'].map(h=>(
                      <th key={h} className="px-3 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bomUsageData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 font-bold text-gray-800 text-[10px]">{row.repairType}</td>
                      <td className="px-3 py-3 text-gray-600 font-semibold text-[9px]">{row.parts}</td>
                      <td className="px-3 py-3 text-gray-600 text-[9px]">{row.skus}</td>
                      <td className="px-3 py-3 text-gray-700 font-bold">${row.cost.toFixed(2)}</td>
                      <td className="px-3 py-3 font-black text-indigo-700">${row.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Expected Monthly Demand */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Demand Calculation —</h4>
                <p className="text-base font-black text-gray-900">Expected Monthly Demand with Peak Multiplier</p>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['SKU','IB','Fail%','Base','Peak','Formula'].map(h=>(
                      <th key={h} className="px-3 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {expectedMonthlyDemand.map((row, i) => (
                    <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                      <td className="px-3 py-3 font-bold text-gray-800 text-[9px]">{row.sku.split(' —')[0]}</td>
                      <td className="px-3 py-3 text-center font-bold text-gray-700 text-[10px]">{(row.ib/1000).toFixed(0)}K</td>
                      <td className="px-3 py-3 text-center font-bold text-gray-700">{row.failRate}%</td>
                      <td className="px-3 py-3 text-center font-black text-indigo-700">{row.monthlyBase}</td>
                      <td className="px-3 py-3 text-center font-black text-amber-700">{row.peak}</td>
                      <td className="px-3 py-3 text-center text-[8px] text-gray-500 font-semibold">IB×F÷12×1.35</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 bg-slate-950 border-t border-gray-100">
                <p className="text-[9px] font-bold text-teal-300"><span className="font-black">Formula:</span> Monthly = (IB × Failure_Rate ÷ 12) | Peak = Monthly × 1.35</p>
              </div>
            </div>
          </div>

          {/* HISTORICAL VS IB-DRIVEN POLICY COMPARISON */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Policy Evolution —</h4>
                <p className="text-base font-black text-gray-900">Historical vs IB-Driven Stocking Strategy</p>
              </div>
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded-lg border border-emerald-100 uppercase">Optimized</span>
            </div>
            <div className="space-y-3">
              {policyComparison.map((policy, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  {/* Old Policy */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-[9px] font-black text-red-400 uppercase">Historical Policy</p>
                        <p className="text-[11px] font-black text-red-900">{policy.part}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-[10px]">
                      <div><span className="text-red-600 font-black">Min/Max:</span> <span className="text-red-800 font-bold">{policy.oldMin}/{policy.oldMax}</span></div>
                      <div><span className="text-red-600 font-black">Coverage:</span> <span className="text-red-800 font-bold">{policy.oldCoverage} days</span></div>
                      <p className="text-red-700 font-semibold mt-2">Based on historical demand only. Frequent stockouts during peak seasons.</p>
                    </div>
                  </div>

                  {/* New Policy */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="text-[9px] font-black text-emerald-400 uppercase">IB-Driven Policy</p>
                        <p className="text-[11px] font-black text-emerald-900">{policy.part}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-[10px]">
                      <div><span className="text-emerald-600 font-black">Min/Max:</span> <span className="text-emerald-800 font-bold">{policy.newMin}/{policy.newMax}</span></div>
                      <div><span className="text-emerald-600 font-black">Coverage:</span> <span className="text-emerald-800 font-bold">{policy.newCoverage} days</span></div>
                      <p className="text-emerald-700 font-semibold mt-2">{policy.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INSTALLED BASE FORECAST */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Capabilities as Enablers —</h4>
                <p className="text-lg font-black text-gray-900">Device Installed Base Forecast · Jan–Dec 2026</p>
              </div>
              <div className="flex gap-3 text-[9px] font-black text-gray-400 uppercase">
                {[['#6366F1','S24 Ultra'],['#10B981','A54'],['#F59E0B','M34'],['#8B5CF6','Z Fold4']].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:c}}/>{l}</span>
                ))}
                <span className="flex items-center gap-1 ml-2"><span className="inline-block w-6 border-t-2 border-dashed border-gray-400"/><span className="text-gray-400">Forecast</span></span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={installedBaseForecast} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: 11, fontWeight: 700 }} />
                <ReferenceLine x="Apr" stroke="#E5E7EB" strokeWidth={2} strokeDasharray="6 3" label={{ value: 'Forecast →', position: 'top', fontSize: 9, fill: '#9CA3AF', fontWeight: 700 }} />
                <Line type="monotone" dataKey="S24 Ultra" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="A54" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="M34" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Z Fold4" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: 'Largest Active Base', value: 'A54 · 1,568 units by Dec', color: 'emerald' },
                { label: 'Fastest Growing', value: 'A54 +37% Jan→Dec', color: 'indigo' },
                { label: 'Repair Rate At Maturity', value: '~8% of installed base/yr', color: 'amber' },
              ].map((s,i) => (
                <div key={i} className={`p-3 bg-${s.color}-50 border border-${s.color}-100 rounded-xl`}>
                  <p className={`text-[9px] font-black text-${s.color}-400 uppercase mb-1`}>{s.label}</p>
                  <p className={`text-sm font-black text-${s.color}-900`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DEMAND FORECAST + PART MATRIX */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Demand Planning —</h4>
              <p className="text-base font-black text-gray-900 mb-5">Repair Demand Projection by Part Category (Apr–Dec)</p>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={repairDemandForecast} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    {[['screen','#6366F1'],['battery','#10B981'],['port','#F59E0B'],['protector','#8B5CF6']].map(([k,c]) => (
                      <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={0.25}/>
                        <stop offset="95%" stopColor={c} stopOpacity={0}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: 11, fontWeight: 700 }} />
                  <Area type="monotone" dataKey="screen" stroke="#6366F1" strokeWidth={2.5} fill="url(#grad-screen)" name="Screen (PT01/PT34)" />
                  <Area type="monotone" dataKey="battery" stroke="#10B981" strokeWidth={2.5} fill="url(#grad-battery)" name="Battery (PT10/PT36)" />
                  <Area type="monotone" dataKey="port" stroke="#F59E0B" strokeWidth={2.5} fill="url(#grad-port)" name="Charging Port (PT08)" />
                  <Area type="monotone" dataKey="protector" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#grad-protector)" name="Screen Protector (PT35)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Part × Partner Matrix —</h4>
              <p className="text-base font-black text-gray-900 mb-5">Forecasted Monthly Demand by SKU (Units)</p>
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-3 py-2.5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-left">Part SKU</th>
                      {['May','Jun','Jul','Aug','Sep'].map(m => (
                        <th key={m} className="px-3 py-2.5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">{m}</th>
                      ))}
                      <th className="px-3 py-2.5 text-[9px] font-black text-gray-400 uppercase text-left">Peak Partner</th>
                      <th className="px-3 py-2.5 text-[9px] font-black text-gray-400 uppercase text-center">Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {partDemandMatrix.map((r, i) => (
                      <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                        <td className="px-3 py-3 font-black text-gray-800 text-[10px]">{r.part}</td>
                        {[r.May, r.Jun, r.Jul, r.Aug, r.Sep].map((v, j) => (
                          <td key={j} className="px-3 py-3 text-center font-bold text-gray-700">{v}</td>
                        ))}
                        <td className="px-3 py-3 font-semibold text-indigo-600 text-[10px]">{r.peakPartner}</td>
                        <td className="px-3 py-3 text-center">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${r.risk==='High'?'bg-red-100 text-red-700':r.risk==='Medium'?'bg-amber-100 text-amber-700':'bg-emerald-100 text-emerald-700'}`}>{r.risk}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                <p className="text-[10px] font-bold text-indigo-800 leading-relaxed"><span className="font-black">Planning Signal:</span> PT01 and PT10 show sustained growth through Sep 2026. Pre-order windows for both SKUs should be triggered in May for 8-week lead time coverage.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}