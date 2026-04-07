import {
  Target, Calculator, List, Zap, Map, ArrowLeftRight,
  LineChart, Factory, MapPin, BarChart3, Package, Hash,
} from 'lucide-react';
import { partnerOrgs, partners } from '../../data/partners';
import { partNetworkData } from '../../data/parts';

const NAV_STRATEGIC = [
  { id: 'SCOPE',  icon: Target,     label: 'Scope & Setup'   },
  { id: 'ENGINE', icon: Calculator, label: 'Engine Logic'     },
];
const NAV_LIVE = [
  { id: 'VIEW_QUEUE', icon: List,         label: 'Reservation Queue'   },
  { id: 'VIEW_2',     icon: Map,          label: 'Health Map'          },
  { id: 'VIEW_3',     icon: ArrowLeftRight,label: 'Supply vs Demand'   },
  { id: 'VIEW_4',     icon: LineChart,    label: 'Part Deep-Dive'      },
];
const NAV_DASHBOARDS = [
  { id: 'OEM',     icon: Factory,  label: 'Network Hub'     },
  { id: 'PARTNER', icon: MapPin,   label: 'Center Diagnostics' },
  { id: 'PART',    icon: Package,  label: 'Part Intelligence' },
  { id: 'VIEW_5',  icon: BarChart3,label: 'Impact Scorecard' },
];

function NavBtn({ id, icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-all mb-0.5 ${
        active ? 'bg-[#EBF0FA] text-[#1428A0]' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon size={15} /> {label}
    </button>
  );
}

export default function Sidebar({
  activeView, onViewChange,
  selectedPartner, onPartnerChange,
  selectedPart, onPartChange,
}) {
  const showPartnerSelector = activeView === 'PARTNER' || activeView === 'VIEW_4';
  const showPartSelector    = activeView === 'PART';

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] p-4 flex flex-col h-full overflow-y-auto z-10 flex-shrink-0">

      {/* Strategic Context */}
      <div className="mb-1">
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Strategic Context</p>
        {NAV_STRATEGIC.map(n => <NavBtn key={n.id} {...n} active={activeView === n.id} onClick={onViewChange} />)}
      </div>

      <div className="h-px w-full bg-gray-100 my-2" />

      {/* Live Operations */}
      <div className="mb-1">
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Live Operations</p>
        {NAV_LIVE.map(n => <NavBtn key={n.id} {...n} active={activeView === n.id} onClick={onViewChange} />)}
      </div>

      <div className="h-px w-full bg-gray-100 my-2" />

      {/* Dashboards */}
      <div className="mb-1">
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Dashboards</p>
        {NAV_DASHBOARDS.map(n => <NavBtn key={n.id} {...n} active={activeView === n.id} onClick={onViewChange} />)}
      </div>

      {/* Partner / Service Center Selector */}
      {showPartnerSelector && (
        <div className="space-y-1 pt-3 border-t border-gray-100 mt-2">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Service Center</p>
          {partnerOrgs.map(org => {
            const centers = partners.filter(p => p.orgId === org.id);
            return (
              <div key={org.id} className="mb-2">
                {/* Org header */}
                <div className="flex items-center gap-1.5 px-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{org.name}</span>
                  <span className={`text-[8px] font-bold px-1 py-0.5 rounded uppercase ${
                    org.tier === 'Platinum' ? 'bg-gray-800 text-white' :
                    org.tier === 'Gold'     ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]' :
                    'bg-gray-100 text-gray-500'
                  }`}>{org.tier}</span>
                </div>
                {/* Service centers */}
                {centers.map(p => (
                  <button
                    key={p.id}
                    onClick={() => onPartnerChange(p.id)}
                    className={`w-full flex flex-col items-start px-3 py-1.5 rounded transition-all border mb-0.5 ml-2 ${
                      selectedPartner === p.id
                        ? 'bg-[#EBF0FA] border-blue-200'
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <span className={`text-xs font-bold ${selectedPartner === p.id ? 'text-[#1428A0]' : 'text-gray-800'}`}>
                      {p.id}
                    </span>
                    <span className="text-[9px] text-gray-500">{p.city}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Part Selector */}
      {showPartSelector && (
        <div className="space-y-1 pt-3 border-t border-gray-100 mt-2">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 px-2">Part Number</p>
          {Object.values(partNetworkData).map(p => (
            <button
              key={p.code}
              onClick={() => onPartChange(p.code)}
              className={`w-full flex flex-col items-start px-3 py-2 rounded transition-all border mb-0.5 ${
                selectedPart === p.code
                  ? 'bg-[#EBF0FA] border-blue-200'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-1.5 w-full">
                <Hash size={10} className={selectedPart === p.code ? 'text-[#1428A0]' : 'text-gray-400'} />
                <span className={`text-xs font-bold ${selectedPart === p.code ? 'text-[#1428A0]' : 'text-gray-800'}`}>{p.code}</span>
                <span className={`text-[9px] ml-auto ${selectedPart === p.code ? 'text-[#1428A0]' : 'text-gray-400'}`}>{p.mtbf}</span>
              </div>
              <span className="text-[9px] text-gray-500 pl-4">{p.name}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
