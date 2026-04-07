import React, { useState, useEffect, useRef } from 'react';
import { Network, Server, Factory, Store, ShieldCheck, AlertTriangle, Zap, ChevronDown, Package, Play, RefreshCw, CheckCircle2, DollarSign, Globe2, ArrowRight, Eye, LayoutGrid, Maximize2, Plus, Minus, MousePointer2, TrendingUp, TrendingDown, Activity, Info, BarChart2, X, AlertCircle } from 'lucide-react';
import { partners, networkStores, partIntelligenceData, formatCurrency } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, ReferenceLine } from 'recharts';

export default function NetworkTree({ model }) {
  const [selectedHubId, setSelectedHubId] = useState(null);
  const [rebalanceMode, setRebalanceMode] = useState('OFF'); // OFF, SUGGESTING, EXECUTING
  const [activeScenario, setActiveScenario] = useState(null);
  const [simStep, setSimStep] = useState('IDLE'); // IDLE, RUNNING, DONE
  
  // CANVAS ZOOM & PAN STATE
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  const partsList = Object.keys(partIntelligenceData).map(key => ({
    id: key,
    name: partIntelligenceData[key].title
  }));
  const [activePartId, setActivePartId] = useState(partsList.some(p => p.id === 'PT10') ? 'PT10' : partsList[0].id);

  useEffect(() => {
    setRebalanceMode('OFF');
    setSimStep('IDLE');
    setActiveScenario(null);
  }, [model, activePartId]);

  const partData = partIntelligenceData[activePartId];
  const globalInv = partData?.globalInventory || 0;
  const isToBe = model === 'TO_BE';

  // CALCULATE GLOBAL DISTRIBUTION MODEL
  const globalNetworkModel = partners.map(partner => {
      const partnerAvail = partData?.partnerAvailability?.find(p => p.partnerId === partner.id);
      const basePartnerStock = partnerAvail?.stock || 0;
      const partnerThreshold = partnerAvail?.threshold || 50;
      const partnerStores = networkStores.filter(s => s.partnerId === partner.id);
      
      const storeCount = partnerStores.length;
      const distributedStores = partnerStores.map((store, i) => {
          const sc = storeCount || 1;
          let shareRatio = 1 / sc;
          if (sc === 3) shareRatio = i === 0 ? 0.45 : i === 1 ? 0.35 : 0.2;
          else if (sc === 2) shareRatio = i === 0 ? 0.6 : 0.4;
          
          return {
              ...store,
              dynamicStock: Math.floor(basePartnerStock * shareRatio),
              dynamicThreshold: Math.floor(partnerThreshold * shareRatio) + 2
          };
      });
      
      const assigned = distributedStores.reduce((sum, s) => sum + s.dynamicStock, 0);
      if (distributedStores.length > 0) {
          distributedStores[distributedStores.length - 1].dynamicStock += (basePartnerStock - assigned);
      }
      
      return {
          ...partner,
          basePartnerStock,
          partnerThreshold,
          stores: distributedStores
      };
  });

  const allStores = globalNetworkModel.flatMap(p => p.stores);

  // Rebalance Scenarios
  const scenarios = [
    { 
        id: 1, 
        name: 'Critical SLA Rescue', 
        desc: 'Prioritize absolute stock-out prevention in Chicago Hub stores.',
        source: allStores.find(s => s.location.includes('Seattle')) || allStores[12],
        target: allStores.find(s => s.location.includes('Chicago')) || allStores[0],
        units: 30, 
        savings: 13500,
        tag: 'HIGH PRIORITY',
        kpiImpact: { sl: 2.1, stockouts: -4, otif: 1.5, ftfr: 1.8 }
    },
    { 
        id: 2, 
        name: 'Dead Stock Redistribution', 
        desc: 'Relieve massive excess from New York to Suburban Chicago.',
        source: allStores.find(s => s.location.includes('New York')) || allStores[5],
        target: allStores.find(s => s.location.includes('Naperville')) || allStores[8],
        units: 50, 
        savings: 22500,
        tag: 'OPPORTUNISTIC',
        kpiImpact: { cost: -0.15, excess: -45, sl: 1.1, ftfr: 0.8 }
    },
    { 
        id: 3, 
        name: 'Hub Equilibrium', 
        desc: 'Balance Midwest Hub surplus into Southeast shortfall.',
        source: allStores.find(s => s.location.includes('Dallas')) || allStores[15],
        target: allStores.find(s => s.location.includes('Miami')) || allStores[18],
        units: 20, 
        savings: 9000,
        tag: 'MAINTENANCE',
        kpiImpact: { sl: 0.8, excess: -12, stockouts: -1, cost: -0.04 }
    }
  ];

  const handleExecute = (scenario) => {
    setActiveScenario(scenario);
    setSimStep('RUNNING');
    setRebalanceMode('EXECUTING');
    setTimeout(() => {
        setSimStep('DONE');
    }, 2000);
  };

  // PAN & ZOOM HANDLERS
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomIntensity = 0.001;
    const nextScale = Math.min(Math.max(scale - e.deltaY * zoomIntensity, 0.4), 2.5);
    setScale(nextScale);
  };

  const centerMap = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setSelectedHubId(null);
  };

  return (
    <div className="max-w-[1440px] mx-auto space-y-4 animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col pb-4 px-4 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-gray-100 pb-3 flex-shrink-0 pt-1 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black text-[#111827] tracking-tight whitespace-nowrap flex items-center gap-2">
              <Globe2 className="text-indigo-600" size={20}/> Network Command Center
            </h2>
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border shadow-sm ${isToBe ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
              {isToBe ? 'Neural Mapping Active' : 'Siloed Mapping'}
            </div>
          </div>
          <p className="text-gray-400 text-xs font-semibold flex items-center gap-2">
             <Activity size={12} className={isToBe ? "text-emerald-500 animate-pulse" : "text-gray-400"}/>
             SKU Telemetry: {activePartId} — Command over {partners.length} Regional Hubs
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          <div className="relative group min-w-[220px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Package size={14} className="text-indigo-500" />
            </div>
            <select 
              className="appearance-none bg-white border border-gray-300 w-full rounded-xl pl-10 pr-8 py-2 text-[10px] font-black text-gray-800 cursor-pointer outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all hover:border-indigo-400"
              value={activePartId}
              onChange={(e) => setActivePartId(e.target.value)}
            >
              {partsList.map(p => <option key={p.id} value={p.id}>{p.id} - {p.name}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>

          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

          <button 
            onClick={() => setRebalanceMode('SUGGESTING')} 
            disabled={rebalanceMode !== 'OFF' || !isToBe}
            className={`px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-md active:scale-95 ${
               !isToBe ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 opacity-60' :
               rebalanceMode === 'OFF' ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100/50' : 
               'bg-indigo-100 text-indigo-400 cursor-not-allowed'
            }`}
          >
            {rebalanceMode === 'EXECUTING' ? <RefreshCw size={14} className="animate-spin"/> : <Zap size={14} />}
            {rebalanceMode === 'EXECUTING' ? 'Processing...' : 'Run Global Rebalance'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden relative">

        
        {/* INTERACTIVE COMMAND MAP */}
        <div 
            className={`flex-1 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center justify-start relative overflow-hidden active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-all duration-300 ${rebalanceMode === 'SUGGESTING' ? 'mr-80' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        >
             {/* Background Grid - Moves with Pan/Zoom */}
             <div 
                className="absolute inset-0 opacity-[0.03] transition-none" 
                style={{
                    backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)', 
                    backgroundSize: `${30 * scale}px ${30 * scale}px`,
                    backgroundPosition: `${offset.x}px ${offset.y}px`
                }}
             ></div>

             {/* MAP NAVIGATION HUD */}
             <div className="absolute bottom-6 right-6 z-[70] flex flex-col gap-2 pointer-events-auto">
                <button 
                    onClick={() => setScale(prev => Math.min(prev + 0.1, 2.5))}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 shadow-lg transition-all active:scale-90"
                >
                    <Plus size={18}/>
                </button>
                <button 
                    onClick={() => setScale(prev => Math.max(prev - 0.1, 0.4))}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 shadow-lg transition-all active:scale-90"
                >
                    <Minus size={18}/>
                </button>
                <div className="h-px bg-gray-100 mx-2"></div>
                <button 
                    onClick={centerMap}
                    className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-90 hover:bg-indigo-700"
                    title="Center & Reset View"
                >
                    <Maximize2 size={18}/>
                </button>
             </div>

             {/* INTERACTIVE CROSSHAIR OVERLAY */}
             <div className="absolute top-6 left-6 z-[60] flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-100 px-3 py-1.5 rounded-lg shadow-sm">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Live Map Active</span>
                <span className="text-[10px] font-black text-indigo-600 ml-2">{(scale * 100).toFixed(0)}% ZOOM</span>
             </div>

             {!isToBe && (
                <div className="absolute inset-0 z-50 bg-gray-50/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                    <div className="bg-white/95 p-4 border border-red-100 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in duration-500 max-w-sm">
                        <AlertTriangle className="text-red-500" size={20}/>
                        <p className="text-[10px] font-bold text-red-700">Legacy Architecture: Deep store telemetry unavailable. Map zoom restricted to Hub-tier.</p>
                    </div>
                </div>
             )}

             {/* TRANSFORMABLE TOPOLOGY CANVAS */}
             <div 
                className="relative w-full h-full flex flex-col items-center justify-start pt-16 flex-shrink-0 transition-transform duration-75 select-none pointer-events-none"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
             >
                 {/* OEM NODE */}
                 <div className={`flex flex-col items-center z-20 transition-all duration-700 pointer-events-auto ${selectedHubId ? 'opacity-30 blur-md scale-90' : 'mb-12'}`}>
                    <div className="bg-white p-4 w-60 rounded-2xl shadow-xl border-2 border-indigo-600 flex items-center justify-between relative transition-transform hover:scale-105">
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center border-2 border-white shadow-lg"><Server size={14}/></div>
                        <div className="pl-6">
                            <h3 className="text-[8px] font-black uppercase tracking-widest text-indigo-400">Master Core</h3>
                            <p className="font-black text-gray-900 text-md tracking-tight">OEM Global Reserve</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-black text-indigo-600 tracking-tighter">{globalInv.toLocaleString()}</p>
                            <p className="text-[8px] font-bold text-gray-400">UNITS</p>
                        </div>
                    </div>
                    <div className="h-6 w-0.5 bg-indigo-200"></div>
                    <div className={`h-0.5 bg-indigo-50 rounded-full transition-all duration-1000 ${selectedHubId ? 'w-0' : 'w-[900px]'}`}></div>
                 </div>

                 {/* HUB TIERS */}
                 <div className="flex justify-between w-full max-w-5xl z-20 px-2 flex-wrap items-start">
                    {globalNetworkModel.map((partner) => {
                       const isActive = selectedHubId === null || selectedHubId === partner.id;
                       const isSource = activeScenario?.source?.partnerId === partner.id;
                       const isTarget = activeScenario?.target?.partnerId === partner.id;

                       return (
                          <div key={partner.id} className={`flex flex-col items-center transition-all duration-500 ${isActive ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-10 blur-xl scale-75 pointer-events-none'}`}>
                             <div className="h-4 w-0.5 bg-indigo-50"></div>
                             
                             {/* HUB CARD */}
                             <button 
                                onClick={(e) => { e.stopPropagation(); setSelectedHubId(partner.id); }}
                                className={`p-3 w-40 rounded-2xl shadow-lg relative bg-white flex flex-col transition-all border-2 group ${
                                    isToBe ? partner.basePartnerStock < partner.partnerThreshold ? 'border-red-400' : 'border-emerald-500' : 'border-gray-200'
                                } ${isSource ? 'ring-4 ring-indigo-300 border-indigo-600 scale-110 -translate-y-2' : isTarget ? 'ring-4 ring-emerald-300 border-emerald-600 scale-110 -translate-y-2 shadow-emerald-200' : 'hover:border-indigo-400 hover:-translate-y-1'}`}
                                style={{ transform: isDragging ? 'none' : undefined }}
                             >
                                <div className="flex items-center justify-between mb-1.5">
                                   <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center shadow-sm ${partner.basePartnerStock < partner.partnerThreshold ? 'bg-red-500' : isToBe ? 'bg-emerald-500' : 'bg-gray-400'}`}><Factory size={10}/></div>
                                   <p className={`text-md font-black tracking-tighter ${partner.basePartnerStock < partner.partnerThreshold ? 'text-red-600' : isToBe ? 'text-emerald-600' : 'text-gray-900'}`}>{partner.basePartnerStock}</p>
                                </div>
                                <div className="border-t border-gray-50 pt-1 text-left">
                                   <p className="text-[8px] font-black text-indigo-600 mb-0.5">{partner.id}</p>
                                   <p className="font-bold text-gray-800 text-[9px] truncate">{partner.name}</p>
                                   <p className="text-[7px] font-black uppercase text-gray-400">{partner.region}</p>
                                </div>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400"><MousePointer2 size={10} className="rotate-45"/></div>
                                {isActive && partner.basePartnerStock < partner.partnerThreshold && <div className="absolute inset-0 rounded-2xl ring-2 ring-red-500 ring-offset-2 opacity-30 animate-pulse"></div>}
                             </button>

                             {/* DRILL DOWN: STORE TIER */}
                             {selectedHubId === partner.id && (
                                <div className="flex flex-col items-center animate-in slide-in-from-top-4 duration-500 pointer-events-auto mt-4">
                                    <div className="h-6 w-1 bg-gradient-to-b from-indigo-200 to-indigo-100 rounded-full"></div>
                                    <div className="flex gap-4 mt-2">
                                        {partner.stores.map(store => {
                                            const isSimTarget = simStep !== 'IDLE' && store.id === activeScenario?.target?.id;
                                            const isSimSource = simStep !== 'IDLE' && store.id === activeScenario?.source?.id;
                                            
                                            let displayStock = store.dynamicStock;
                                            if (simStep === 'DONE' && isSimTarget) displayStock += activeScenario.units;
                                            if (simStep === 'DONE' && isSimSource) displayStock -= activeScenario.units;

                                            const isCrit = displayStock < store.dynamicThreshold;

                                            return (
                                                <div key={store.id} className={`w-28 p-2.5 rounded-xl border-2 relative bg-white shadow-xl flex flex-col transition-all duration-700 ${isSimTarget ? 'ring-4 ring-emerald-200 border-emerald-500 scale-125 z-30' : isSimSource ? 'opacity-40 scale-75 blur-[1px]' : 'border-gray-50'}`}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isCrit ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}><Store size={10}/></div>
                                                        <span className={`text-xs font-black tabular-nums transition-all ${isCrit ? 'text-red-500' : 'text-gray-900'}`}>{displayStock}</span>
                                                    </div>
                                                    <p className="text-[7.5px] font-black text-gray-500 uppercase tracking-widest truncate leading-tight">{store.location}</p>
                                                    {simStep === 'DONE' && isSimTarget && <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">Updated</div>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                             )}
                          </div>
                       );
                    })}
                 </div>
             </div>

             {/* REBALANCE SIMULATION OVERLAY */}
             {simStep === 'DONE' && activeScenario && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white border-2 border-indigo-100 p-5 px-10 rounded-3xl flex items-center gap-10 shadow-2xl animate-in slide-in-from-bottom-12 duration-1000 z-[80] ring-12 ring-indigo-50/50 min-w-[700px] pointer-events-auto">
                   <div className="flex items-center gap-6 border-r border-gray-100 pr-12">
                      <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-100"><DollarSign size={28}/></div>
                      <div>
                         <h3 className="font-black text-gray-950 text-lg tracking-tight uppercase">Strategic Transfer Success</h3>
                         <p className="text-gray-500 text-xs font-bold mt-1">Cross-territory allocation <span className="text-indigo-600 underline decoration-indigo-200">"{activeScenario.name}"</span> has normalized regional demand.</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Value Rescue</p>
                      <p className="text-4xl font-black text-indigo-600 tracking-tighter tabular-nums">{formatCurrency(activeScenario.savings)}</p>
                   </div>
                   <button onClick={() => {setSimStep('IDLE'); setRebalanceMode('OFF'); setActiveScenario(null);}} className="absolute top-4 right-4 w-10 h-10 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-full flex items-center justify-center transition-all border border-transparent hover:border-gray-100 shadow-sm group">
                      <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-1000"/>
                   </button>
                </div>
             )}
        </div>

        {/* SCENARIO COMMAND CENTER - SIDEBAR */}
        {rebalanceMode === 'SUGGESTING' && (
            <div className="w-80 flex flex-col gap-5 animate-in slide-in-from-right-full duration-500 pt-2 z-50">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="font-black text-sm uppercase tracking-widest text-indigo-800 flex items-center gap-2">
                        <ShieldCheck size={16}/> AI Strategist Core
                    </h3>
                    <button onClick={() => setRebalanceMode('OFF')} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                        <Minus size={14}/>
                    </button>
                </div>
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {scenarios.map((sc) => (
                        <div 
                            key={sc.id} 
                            className={`p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer bg-white shadow-xl flex flex-col gap-4 group relative overflow-hidden ${activeScenario?.id === sc.id ? 'border-indigo-600 ring-4 ring-indigo-50 -translate-x-1' : 'border-gray-50 hover:border-indigo-200 hover:shadow-2xl'}`}
                            onClick={() => setActiveScenario(sc)}
                        >
                            <div className="flex justify-between items-start z-10">
                                <span className={`text-[8px] font-black px-2 py-1 rounded shadow-sm border ${sc.tag === 'HIGH PRIORITY' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>{sc.tag}</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-emerald-600">{formatCurrency(sc.savings)} Save</span>
                                    <span className="text-[8px] font-bold text-gray-400">PROJECTED RESCUE</span>
                                </div>
                            </div>
                            <div className="z-10">
                                <h4 className="font-black text-gray-900 text-sm mb-1.5">{sc.name}</h4>
                                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed line-clamp-2">{sc.desc}</p>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 z-10">
                                <div className="flex items-center gap-1.5 group-hover:text-indigo-600 transition-colors"><Factory size={12}/> {sc.source.partnerId}</div>
                                <ArrowRight size={12} className="text-gray-300"/>
                                <div className="flex items-center gap-1.5 group-hover:text-indigo-600 transition-colors"><Store size={12}/> {sc.target.id}</div>
                            </div>
                            {activeScenario?.id === sc.id && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleExecute(sc); }}
                                    className="w-full bg-[#1428A0] text-white rounded-xl py-3 text-[11px] font-black uppercase tracking-widest mt-2 hover:bg-black transition-all shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Zap size={14} fill="white"/> Execute Strategy
                                </button>
                            )}
                            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-all"><Zap size={100}/></div>
                        </div>
                    ))}
                </div>
                <div className="bg-[#1428A0] rounded-[1.5rem] p-5 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Globe2 size={60}/></div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-3 underline decoration-indigo-400 underline-offset-4">Strategic Intelligence Meta-Data</p>
                    <p className="text-[11px] font-bold leading-relaxed text-indigo-100 italic relative z-10">"Cross-border optimization suggests {activePartId} reallocation to absorb regional SLA risk. Predicted efficiency gain: <span className="text-emerald-400 font-black">+31%</span> across unified US hubs."</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
