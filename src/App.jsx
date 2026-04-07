import React, { useState } from 'react';
import { Target, Calculator, List, Zap, Map, ArrowLeftRight, LineChart, Factory, MapPin, BarChart3, BookOpen, ServerCog, BrainCircuit, RefreshCw } from 'lucide-react';
import { partners } from './data/mockData';

// Import Views
import ScopeView from './components/views/ScopeView';
import EngineView from './components/views/EngineView';
import ReservationQueue from './components/views/ReservationQueue';
import HealthMap from './components/views/HealthMap';
import DemandGap from './components/views/DemandGap';
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
      case 'VIEW_3': return <DemandGap model={model} />;
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
            <button onClick={() => setView('SCOPE')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'SCOPE' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Target size={16} /> Scope & Setup</button>
            <button onClick={() => setView('ENGINE')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all ${view === 'ENGINE' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Calculator size={16} /> Engine Logic</button>
          </div>
          <div className="h-px w-full bg-gray-100 my-2"></div>
          <div className="mb-2">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Live Operations</p>
            <button onClick={() => setView('VIEW_QUEUE')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_QUEUE' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><List size={16} /> Reservation Queue</button>
            <button onClick={() => setView('VIEW_2')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_2' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Map size={16} /> Health Map</button>
            <button onClick={() => setView('NETWORK_MAP')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'NETWORK_MAP' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Map size={16} /> Live Topography</button>
            <button onClick={() => setView('VIEW_INTEL')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_INTEL' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><LineChart size={16} /> Network Intelligence</button>
            <button onClick={() => setView('VIEW_3')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'VIEW_3' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><ArrowLeftRight size={16} /> Supply vs Demand</button>
          </div>
          <div className="h-px w-full bg-gray-100 my-2"></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Policy Dashboards</p>
            <button onClick={() => setView('DYNAMIC_POLICY')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'DYNAMIC_POLICY' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><List size={16} /> Stocking Rules</button>
            <button onClick={() => setView('OEM')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'OEM' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><Factory size={16} /> Network Hub</button>
            <button onClick={() => setView('PARTNER')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-1 ${view === 'PARTNER' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><MapPin size={16} /> Partner Detail</button>
            <button onClick={() => setView('VIEW_5')} className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all ${view === 'VIEW_5' ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'}`}><BarChart3 size={16} /> Impact Scorecard</button>
          </div>
          {(view === 'NETWORK_MAP' || view === 'PARTNER') && (
            <div className="space-y-1 pt-4 border-t border-gray-100 mt-2">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Partner Selector</p>
              {partners.map(p => (
                <button key={p.id} onClick={() => setSelectedPartner(p.id)} className={`w-full flex flex-col items-start px-3 py-2 rounded transition-all border ${selectedPartner === p.id ? 'bg-[#EBF0FA] border-blue-200' : 'border-transparent hover:bg-gray-50'}`}>
                  <span className={`text-xs font-bold ${selectedPartner === p.id ? 'text-[#1428A0]' : 'text-gray-800'}`}>{p.id}</span>
                  <span className="text-[9px] text-gray-500 font-medium truncate w-full text-left">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
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

              {/* AS-IS / TO-BE TOGGLE */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded border border-gray-200 shadow-inner relative">
                {isTransitioning && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded z-10 flex items-center justify-center">
                     <RefreshCw size={16} className="text-[#1428A0] animate-spin" />
                  </div>
                )}
                <button 
                  onClick={() => handleModelToggle('AS_IS')}
                  disabled={isTransitioning}
                  className={`px-4 py-1.5 rounded text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    model === 'AS_IS' 
                      ? 'bg-white text-gray-800 shadow-sm border border-gray-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <ServerCog size={14} />
                  AS-IS (Static System)
                </button>
                <button 
                  onClick={() => handleModelToggle('TO_BE')}
                  disabled={isTransitioning}
                  className={`px-4 py-1.5 rounded text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    model === 'TO_BE' 
                      ? 'bg-[#1428A0] text-white shadow-sm border border-[#1E3A8A]' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <BrainCircuit size={14} />
                  TO-BE (MTBF Engine)
                </button>
              </div>
            </div>
          </div>
          
          <div className={`p-8 flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}