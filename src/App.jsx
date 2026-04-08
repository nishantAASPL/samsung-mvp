import React, { useState } from 'react';
import { Target, Calculator, List, Zap, Map, LineChart, Factory, MapPin, BarChart3, BookOpen, ServerCog, BrainCircuit, RefreshCw } from 'lucide-react';
import { partners } from './data/mockData';

// Import Views
import ScopeView from './components/views/ScopeView';
import EngineView from './components/views/EngineView';
import ReservationQueue from './components/views/ReservationQueue';
import HealthMap from './components/views/HealthMap';
import PartIntelligence from './components/views/PartIntelligence';
import NetworkTree from './components/views/NetworkTree';
import PolicyTable from './components/views/PolicyTable';
import OemDashboard from './components/views/OemDashboard';
import PartnerDiagnostics from './components/views/PartnerDiagnostics';
import Scorecard from './components/views/Scorecard';
import PitchGuide from './components/views/PitchGuide';

export default function App() {
  const [model, setModel] = useState('TO_BE');
  const [view, setView] = useState('SCOPE'); 
  const [selectedPartner, setSelectedPartner] = useState('P-142');
  const [selectedPart, setSelectedPart] = useState('PT10');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModelToggle = (newModel) => {
    if (newModel === model) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setModel(newModel);
      setIsTransitioning(false);
    }, 400); 
  };

  const renderView = () => {
    switch(view) {
      case 'SCOPE': return <ScopeView model={model} />;
      case 'ENGINE': return <EngineView model={model} />;
      case 'VIEW_QUEUE': return <ReservationQueue model={model} />;
      case 'VIEW_2': return <HealthMap model={model} />;
      case 'VIEW_INTEL': return <PartIntelligence model={model} selectedPart={selectedPart} onPartChange={setSelectedPart} />;
      case 'NETWORK_MAP': return <NetworkTree model={model} />;
      case 'DYNAMIC_POLICY': return <PolicyTable model={model} />;
      case 'VIEW_5': return <Scorecard model={model} />;
      case 'OEM': return <OemDashboard model={model} />;
      case 'PARTNER': return <PartnerDiagnostics model={model} selectedPartner={selectedPartner} />;
      case 'GUIDE': return <PitchGuide model={model} onNavigate={setView} />;
      default: return <ScopeView model={model} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1F2937] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-[#E5E7EB] p-4 flex flex-col h-full overflow-y-auto z-10 flex-shrink-0 relative">
          <div className="mb-2">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Strategic Context</p>
            <button onClick={() => setView('SCOPE')} className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all mb-1 ${view === 'SCOPE' ? 'bg-gray-100 text-indigo-700 border-l-4 border-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}><Target size={16} /> Scope & Setup</button>
            <button onClick={() => setView('ENGINE')} className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all ${view === 'ENGINE' ? 'bg-gray-100 text-indigo-700 border-l-4 border-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}><Calculator size={16} /> Engine Logic</button>
          </div>
          <div className="h-px w-full bg-gray-100 my-2"></div>
          <div className="mb-2">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Live Operations</p>
            <button onClick={() => setView('VIEW_QUEUE')} className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all mb-1 ${view === 'VIEW_QUEUE' ? 'bg-gray-100 text-indigo-700 border-l-4 border-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}><List size={16} /> Repair Reservation Hub</button>
            <button onClick={() => setView('VIEW_2')} className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all mb-1 ${view === 'VIEW_2' ? 'bg-gray-100 text-indigo-700 border-l-4 border-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}><Map size={16} /> Health Map</button>
            <button onClick={() => setView('NETWORK_MAP')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-semibold transition-all mb-1 ${view === 'NETWORK_MAP' ? 'bg-slate-100 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-slate-50'}`}><Map size={16} /> Live Topography</button>
            <button onClick={() => setView('VIEW_INTEL')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-semibold transition-all mb-1 ${view === 'VIEW_INTEL' ? 'bg-slate-100 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-slate-50'}`}><LineChart size={16} /> Network Intelligence</button>
          </div>
          <div className="h-px w-full bg-gray-100 my-2"></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Policy Dashboards</p>
            <button onClick={() => setView('DYNAMIC_POLICY')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-semibold transition-all mb-1 ${view === 'DYNAMIC_POLICY' ? 'bg-slate-100 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-slate-50'}`}><List size={16} /> Stocking Rules</button>
            <button onClick={() => setView('OEM')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-semibold transition-all mb-1 ${view === 'OEM' ? 'bg-slate-100 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-slate-50'}`}><Factory size={16} /> OEM Control Hub</button>
            <button onClick={() => setView('PARTNER')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-semibold transition-all mb-1 ${view === 'PARTNER' ? 'bg-slate-100 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-slate-50'}`}><MapPin size={16} /> Partner Detail</button>
            <button onClick={() => setView('VIEW_5')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-semibold transition-all ${view === 'VIEW_5' ? 'bg-slate-100 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-slate-50'}`}><BarChart3 size={16} /> Impact Scorecard</button>
          </div>
          {(view === 'NETWORK_MAP' || view === 'PARTNER') && (
            <div className="space-y-1 pt-4 border-t border-gray-100 mt-2">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Partner Selector</p>
              {partners.map(p => (
                <button key={p.id} onClick={() => setSelectedPartner(p.id)} className={`w-full flex flex-col items-start px-3 py-2 rounded-sm transition-all border ${selectedPartner === p.id ? 'bg-slate-100 border-slate-300' : 'border-transparent hover:bg-slate-50'}`}>
                  <span className={`text-xs font-bold ${selectedPartner === p.id ? 'text-blue-700' : 'text-slate-800'}`}>{p.id}</span>
                  <span className="text-[9px] text-slate-500 font-medium truncate w-full text-left">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className={`flex-1 overflow-y-auto relative bg-[#F9FAFB] flex flex-col`}>
          <div className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="bg-[#1428A0] text-white px-3 py-1 font-bold tracking-tighter text-lg rounded-sm">SAMSUNG</div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <h1 className="font-bold text-slate-800 text-sm leading-tight uppercase tracking-tight">Supply Chain Intelligence</h1>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">OPERATIONS LIVE</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('GUIDE')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border ${
                  view === 'GUIDE' 
                    ? 'bg-slate-100 text-blue-700 border-slate-300' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'
                }`}
                title="Presenter Guide"
              >
                <BookOpen size={16} />
                Pitch Guide
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              {/* AS-IS / TO-BE TOGGLE */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-sm border border-slate-200 relative">
                {isTransitioning && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-sm z-10 flex items-center justify-center">
                     <RefreshCw size={14} className="text-blue-700 animate-spin" />
                  </div>
                )}
                <button 
                  onClick={() => handleModelToggle('AS_IS')}
                  disabled={isTransitioning}
                  className={`px-3 py-1 rounded-sm text-[10px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
                    model === 'AS_IS' 
                      ? 'bg-white text-slate-800 border border-slate-300 shadow-sm' 
                      : 'text-slate-400 hover:text-gray-700'
                  }`}
                >
                  <ServerCog size={12} />
                  AS-IS (STATIC)
                </button>
                <button 
                  onClick={() => handleModelToggle('TO_BE')}
                  disabled={isTransitioning}
                  className={`px-3 py-1 rounded-sm text-[10px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
                    model === 'TO_BE' 
                      ? 'bg-blue-700 text-white border border-blue-800 shadow-sm' 
                      : 'text-slate-400 hover:text-gray-700'
                  }`}
                >
                  <BrainCircuit size={12} />
                  TO-BE (MTBF)
                </button>
              </div>
            </div>
          </div>
          
          <div className={`p-6 flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}