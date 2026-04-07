import React, { useState } from 'react';
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
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Repair Reservation <span className="text-indigo-600">Hub</span></h2>
          </div>
          <p className="text-sm font-semibold text-gray-400 ml-12">End-to-end repair lifecycle management · Performance intelligence · Demand planning.</p>
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
          { id: 'performance', label: 'Repair Performance Mgt', icon: BarChart3 },
          ...(isToBe ? [{ id: 'planning', label: 'Demand Planning', icon: Layers }] : []),
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
                    <span className={`font-black text-[11px] ${activeReqId === req.id ? 'text-indigo-700' : 'text-gray-800'}`}>{req.id} · {req.issueShort}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${priorityColor[req.priority]}`}>{req.priority}</span>
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-0.5"><Clock size={10}/>{req.time}</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-gray-800 truncate mb-0.5">{req.device}</div>

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


      {/* ═══════════ TAB: REPAIR PERFORMANCE MGT ═══════════ */}
      {activeTab === 'performance' && (
        <div className="space-y-5">

          {/* GLOBAL FILTER BAR */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">
              <Filter size={13} className="text-indigo-600" /> Global Filters
            </div>
            {['All', 'S24 Ultra', 'A54', 'M34', 'Z Fold4'].map(m => (
              <button key={m} onClick={() => setPerfModelFilter(m)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg border transition-all ${perfModelFilter === m ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'}`}>{m}</button>
            ))}
            <div className="w-px h-5 bg-gray-200 mx-1" />
            {['All Partners', 'CHI-142', 'NY-045', 'LA-092', 'MIA-301', 'NAP-187'].map(p => (
              <button key={p} onClick={() => setPerfPartnerFilter(p)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg border transition-all ${perfPartnerFilter === p ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'}`}>{p}</button>
            ))}
            <div className="ml-auto text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              Scope: Apr 2026 · {perfPartnerFilter} · {perfModelFilter}
            </div>
          </div>

          {/* PERFORMANCE KPIs */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: 'Total Repairs MTD', value: '419', sub: 'Jan–Apr 2026', trend: '+14%', color: 'indigo', icon: Wrench },
              { label: 'FTFR Rate', value: '87%', sub: 'vs 83% Jan baseline', trend: '+4pp', color: 'emerald', icon: CheckCircle2 },
              { label: 'Avg Resolution', value: '2.8h', sub: 'down from 3.8h Jan', trend: '-28%', color: 'blue', icon: Clock },
              { label: 'Repeat Repair Rate', value: '8.2%', sub: 'returned cases', trend: '-2.1pp', color: 'amber', icon: RefreshCw },
              { label: 'Delayed Repairs', value: '70', sub: 'of 419 total cases', trend: '-12%', color: 'red', icon: AlertTriangle },
            ].map((kpi, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-indigo-200 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-xl bg-${kpi.color}-50`}>
                    <kpi.icon size={15} className={`text-${kpi.color}-600`} />
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{kpi.trend}</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{kpi.label}</p>
                <p className="text-2xl font-black text-gray-900 mb-0.5">{kpi.value}</p>
                <p className="text-[9px] text-gray-400 font-semibold">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* HISTORICAL TRENDS + FTFR BY MODEL */}
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Historical Performance —</h4>
                  <p className="text-base font-black text-gray-900">Monthly Repair Volume & Resolution Trends</p>
                </div>
                <div className="flex gap-3 text-[9px] font-black text-gray-400 uppercase">
                  {[['#6366F1','Volume'],['#10B981','Resolved'],['#F97316','Escalated'],['#F59E0B','FTFR %']].map(([c,l]) => (
                    <span key={l} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{background:c}}/>{l}</span>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={historicalRepairData} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} domain={[60, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: 11, fontWeight: 700 }} />
                  <Bar yAxisId="left" dataKey="volume" fill="#6366F1" fillOpacity={0.85} radius={[4,4,0,0]} barSize={28} name="Volume" />
                  <Bar yAxisId="left" dataKey="resolved" fill="#10B981" fillOpacity={0.85} radius={[4,4,0,0]} barSize={28} name="Resolved" />
                  <Bar yAxisId="left" dataKey="escalated" fill="#F97316" fillOpacity={0.85} radius={[4,4,0,0]} barSize={16} name="Escalated" />
                  <Line yAxisId="right" type="monotone" dataKey="ftfr" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5, fill: '#F59E0B', stroke: '#fff', strokeWidth: 2 }} name="FTFR %" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-[10px] font-bold text-indigo-800 leading-relaxed"><span className="font-black">AI Insight:</span> FTFR improved +8pp (Jan→Apr). Primary driver: CHI-142 stock realignment driven by MTBF predictions cut escalations from 12 to 2 cases/month.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Model Cut —</h4>
              <p className="text-base font-black text-gray-900 mb-5">FTFR % by Device Family</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={ftfrByModelData} margin={{ top: 5, right: 15, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} domain={[55, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: 11, fontWeight: 700 }} />
                  <Line type="monotone" dataKey="S24 Ultra" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366F1', stroke: '#fff', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="A54" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="M34" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4, fill: '#F59E0B', stroke: '#fff', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="Z Fold4" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 4, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-3">
                {[['#6366F1','S24 Ultra'],['#10B981','A54'],['#F59E0B','M34'],['#8B5CF6','Z Fold4']].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1 text-[9px] font-black text-gray-500"><span className="w-2 h-2 rounded-full" style={{background:c}}/>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* HOTSPOT + RCA */}
          <div className="grid grid-cols-2 gap-5">
            {/* Hotspot Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Hotspot Identification —</h4>
                  <p className="text-base font-black text-gray-900">Partner Delay Risk Ranking</p>
                </div>
                <span className="px-2 py-1 bg-red-50 text-red-600 text-[9px] font-black rounded-lg border border-red-100 uppercase">2 Critical</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>{['Partner','Region','Avg Res.','Repeat%','SLA Breach','Score'].map(h=>(
                      <th key={h} className="px-3 py-2 text-[9px] font-black text-gray-400 uppercase tracking-widest text-left whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {hotspotData.map((h, i) => (
                      <tr key={i} className={`hover:bg-gray-50 transition-colors ${h.level==='critical'?'bg-red-50/40':h.level==='high'?'bg-amber-50/30':''}`}>
                        <td className="px-3 py-2.5 font-bold text-gray-800 flex items-center gap-1.5">
                          {h.level==='critical'&&<span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"/>}
                          {h.level==='high'&&<span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>}
                          {h.level==='low'&&<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"/>}
                          <span className="truncate max-w-[110px]">{h.name}</span>
                        </td>
                        <td className="px-3 py-2.5 text-gray-500 font-semibold">{h.region}</td>
                        <td className="px-3 py-2.5 font-black text-gray-800">{h.avgResTime}h</td>
                        <td className="px-3 py-2.5 font-bold text-gray-700">{h.repeatRate}%</td>
                        <td className="px-3 py-2.5 font-bold text-gray-700">{h.slaBreach}%</td>
                        <td className="px-3 py-2.5">
                          <span className={`font-black text-[10px] px-2 py-0.5 rounded-full ${h.score>70?'bg-red-100 text-red-700':h.score>45?'bg-amber-100 text-amber-700':'bg-emerald-100 text-emerald-700'}`}>{h.score}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Automated RCA */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Automated RCA —</h4>
                  <p className="text-base font-black text-gray-900">Time Delay Root Cause Pareto</p>
                </div>
                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black rounded-lg border border-indigo-100 uppercase">P80 Rule</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={rcaDelayData} margin={{ top: 5, right: 30, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="cause" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#9CA3AF', fontWeight: 700 }} interval={0} angle={-15} textAnchor="end" height={45} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: 11, fontWeight: 700 }} />
                  <Bar yAxisId="left" dataKey="count" radius={[4,4,0,0]} barSize={36} name="Case Count">
                    {rcaDelayData.map((e,i) => <Cell key={i} fill={e.color} fillOpacity={0.85} />)}
                  </Bar>
                  <Line yAxisId="right" type="monotone" dataKey="cumPct" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }} name="Cumulative %" />
                  <ReferenceLine yAxisId="right" y={80} stroke="#4F46E5" strokeDasharray="4 4" strokeWidth={1.5} />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-[10px] font-bold text-red-800 leading-relaxed"><span className="font-black">AI RCA:</span> 70% of delays are driven by Part Stockout + Wrong Routing. CHI-142 accounts for 42% of stockout-delay cases. Recommend safety stock uplift + AI triage routing.</p>
              </div>
            </div>
          </div>

          {/* DELAY PIE + ACTIONABLE INSIGHTS */}
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Delay Analysis —</h4>
              <p className="text-base font-black text-gray-900 mb-4">Delayed Repairs by Root Bucket</p>
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie data={delayBucketData} cx="50%" cy="50%" innerRadius={48} outerRadius={78} paddingAngle={3} dataKey="value">
                    {delayBucketData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB', fontSize: 11, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-3">
                {delayBucketData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-600"><span className="w-2 h-2 rounded-full" style={{background:d.color}}/>{d.name}</span>
                    <span className="font-black text-gray-800">{d.value} cases</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-500">Screen + Battery stockouts = <span className="text-red-600 font-black">44%</span> of all delays this period.</p>
              </div>
            </div>

            <div className="col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Actionable Insights —</h4>
              <p className="text-base font-black text-gray-900 mb-4">System-Generated Recommendations</p>
              <div className="grid grid-cols-2 gap-3">
                {actionableInsightsData.map((ins, i) => (
                  <div key={i} className={`bg-${ins.color}-50 border border-${ins.color}-200 rounded-xl p-4`}>
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`p-1.5 rounded-lg bg-${ins.color}-100`}>
                        <ins.icon size={13} className={`text-${ins.color}-600`} />
                      </div>
                      <p className={`text-[11px] font-black text-${ins.color}-900 leading-tight flex-1`}>{ins.title}</p>
                    </div>
                    <p className={`text-[10px] font-semibold text-${ins.color}-700 leading-relaxed mb-3`}>{ins.desc}</p>
                    <button className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-${ins.color}-600 text-white hover:opacity-90 transition-opacity shadow-sm`}>{ins.action} →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PARTNER PERFORMANCE TABLE */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Partner Performance Mgt —</h4>
                <p className="text-base font-black text-gray-900">Top / Bottom Performing Partners</p>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"/>Top 3</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"/>Bottom 2</span>
              </div>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['#','Partner','Region','Tier','FTFR%','Avg Res. Time','Delayed','SLA Comp.','Trend','Repairs MTD'].map(h => (
                  <th key={h} className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-left whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {partnerPerformanceData.map((p, i) => {
                  const isTop = i < 3;
                  const isBot = i >= partnerPerformanceData.length - 2;
                  return (
                    <tr key={p.id} className={`hover:bg-gray-50 transition-colors ${isTop ? 'bg-emerald-50/30' : isBot ? 'bg-red-50/30' : ''}`}>
                      <td className="px-4 py-3">
                        {isTop ? <Award size={14} className="text-emerald-500" /> : isBot ? <AlertCircle size={14} className="text-red-400" /> : <span className="text-gray-400 font-bold text-xs">{i+1}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-black text-gray-900">{p.name}</div>
                        <div className="text-[9px] text-gray-400 font-semibold">{p.id} · {p.city}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-semibold">{p.region}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${p.tier==='Platinum'?'bg-purple-100 text-purple-700':p.tier==='Gold'?'bg-amber-100 text-amber-700':'bg-gray-100 text-gray-600'}`}>{p.tier}</span>
                      </td>
                      <td className="px-4 py-3 font-black text-gray-900">{p.ftfr}%</td>
                      <td className="px-4 py-3 font-bold text-gray-700">{p.avgResTime}h</td>
                      <td className="px-4 py-3 font-bold text-gray-700">{p.delayedCases}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden w-16">
                            <div className={`h-full rounded-full ${p.slaCompliance>90?'bg-emerald-500':p.slaCompliance>80?'bg-amber-400':'bg-red-500'}`} style={{width:`${p.slaCompliance}%`}} />
                          </div>
                          <span className="font-black text-[10px] text-gray-700">{p.slaCompliance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {p.trend==='up' ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-red-400" />}
                      </td>
                      <td className="px-4 py-3 font-black text-indigo-700">{p.repairs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* TECHNICIAN LOAD */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Human Capital —</h4>
            <p className="text-base font-black text-gray-900 mb-5">Technician Load & Active Cases</p>
            <div className="grid grid-cols-3 gap-4">
              {techLoadData.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-black text-gray-800 truncate">{t.tech}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${t.load>90?'bg-red-100 text-red-700':'bg-indigo-100 text-indigo-700'}`}>{t.active} ACT</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${t.load>90?'bg-red-500':t.load>75?'bg-amber-400':'bg-indigo-500'}`} style={{width:`${t.load}%`}} />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[9px] text-gray-400 font-semibold">{t.store}</span>
                      <span className={`text-[9px] font-black ${t.load>90?'text-red-600':t.load>75?'text-amber-600':'text-gray-500'}`}>{t.load}%</span>
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
                <Line type="monotone" dataKey="S24 Ultra" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 3 }} strokeDasharray={(d) => d.isForecast ? '5 4' : '0'} />
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