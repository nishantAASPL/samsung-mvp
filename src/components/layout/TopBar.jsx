import { BrainCircuit, ServerCog, RefreshCw, BookOpen } from 'lucide-react';

export default function TopBar({ model, isTransitioning, onModelToggle, activeView, onViewChange, simState }) {
  const simRunning = simState && simState !== 'IDLE';

  return (
    <div className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm flex-shrink-0">
      {/* Left: Brand */}
      <div className="flex items-center gap-4">
        <div className="bg-[#1428A0] text-white px-3 py-1 font-bold tracking-tighter text-xl rounded-sm shadow-inner">
          SAMSUNG
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div className="flex flex-col">
          <h1 className="font-bold text-gray-800 text-sm leading-tight">Supply Chain Intelligence</h1>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
            </span>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">US Operations Live</p>
          </div>
        </div>
      </div>

      {/* Right: Pitch Guide + Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onViewChange('GUIDE')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all border ${
            activeView === 'GUIDE'
              ? 'bg-[#EBF0FA] text-[#1428A0] border-blue-200 shadow-sm'
              : 'bg-white text-gray-500 hover:bg-gray-100 border-gray-200'
          }`}
        >
          <BookOpen size={15} /> Pitch Guide
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded border border-gray-200 shadow-inner relative">
          {isTransitioning && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded z-10 flex items-center justify-center">
              <RefreshCw size={14} className="text-[#1428A0] animate-spin" />
            </div>
          )}
          <button
            onClick={() => onModelToggle('AS_IS')}
            disabled={isTransitioning || simRunning}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2 ${
              model === 'AS_IS'
                ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
                : 'text-gray-400 hover:text-gray-600'
            } ${simRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ServerCog size={14} /> AS-IS (Static)
          </button>
          <button
            onClick={() => onModelToggle('TO_BE')}
            disabled={isTransitioning || simRunning}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2 ${
              model === 'TO_BE'
                ? 'bg-[#1428A0] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            } ${simRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <BrainCircuit size={14} /> TO-BE (MTBF)
          </button>
        </div>
      </div>
    </div>
  );
}
