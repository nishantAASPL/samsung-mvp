import React from 'react';
import { Info } from 'lucide-react';
import { storeHealthData } from '../../data/mockData';

export default function HealthMap({ model }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Network Health Map</h2>
          <p className="text-gray-500 mt-1 text-sm">Identifying stockout risks across 800+ simulated US locations.</p>
        </div>
        <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#059669]"></div> Healthy</span>
          <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#D97706]"></div> Risk</span>
          <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></div> Stockout</span>
          {model === 'TO_BE' && <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#D97706]"></div> Dead Stock</span>}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-[#E5E7EB]">
            <tr>
              <th className="p-3 font-bold text-gray-600">Service Center</th>
              <th className="p-3 font-bold text-gray-600 text-center">S24U Displays</th>
              <th className="p-3 font-bold text-gray-600 text-center">A54 Batteries</th>
              <th className="p-3 font-bold text-gray-600 text-center">S24 Charging Ports</th>
              <th className="p-3 font-bold text-gray-600 text-center">M34 Back Panels</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {storeHealthData.slice(0,10).map((store, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 font-semibold text-gray-800">{store.id} - {store.location}</td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.screen.stock === 0 ? 'bg-[#DC2626]' : store.screen.stock < 5 ? (model === 'AS_IS' ? 'bg-[#D97706]' : 'bg-[#DC2626]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.screen.stock} units</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.battery.stock === 0 ? 'bg-[#DC2626]' : store.battery.stock < 5 ? (model === 'AS_IS' ? 'bg-[#D97706]' : 'bg-[#DC2626]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.battery.stock} units</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.logic.stock === 0 ? 'bg-[#DC2626]' : store.logic.stock < 5 ? (model === 'AS_IS' ? 'bg-[#D97706]' : 'bg-[#DC2626]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.logic.stock} units</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-16 h-1.5 rounded-full ${
                      store.logic.stock === 0 ? 'bg-[#DC2626]' : store.logic.stock > 10 ? (model === 'AS_IS' ? 'bg-[#059669]' : 'bg-[#D97706]') : 'bg-[#059669]'
                    }`}></div>
                    <span className="text-[10px] font-mono text-gray-500">{store.logic.stock * 4} units</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {model === 'TO_BE' && (
        <div className="p-3 bg-[#EBF0FA] border border-blue-200 rounded-lg flex items-center gap-3 animate-in slide-in-from-bottom-2">
          <Info className="text-[#1428A0] flex-shrink-0" size={16}/>
          <p className="text-xs text-blue-900"><strong>AI Diagnostic:</strong> The TO-BE model correctly identifies the 180 M34 Panels at New York as severe dead stock (orange), whereas the AS-IS model marks it as healthy (green) because it exceeds the minimum threshold.</p>
        </div>
      )}
    </div>
  );
}
