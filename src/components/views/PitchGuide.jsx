import React from 'react';
import { Target, Zap, Map, LineChart, BarChart3, ArrowRight } from 'lucide-react';

export default function PitchGuide({ model, onNavigate }) {
  const steps = [
    { id: 'SCOPE', title: 'Scope & Setup', icon: <Target size={18}/>, desc: 'Set the stage and explain the "Blind Approval" cycle problem.' },
    { id: 'VIEW_QUEUE', title: 'Reservation Gate', icon: <Zap size={18}/>, desc: 'Show how customer repairs are blindly approved without inventory checks.' },
    { id: 'VIEW_2', title: 'Health Map', icon: <Map size={18}/>, desc: 'Demonstrate network visibility and how dead stock vs stockouts are visualized.' },
    { id: 'VIEW_3', title: 'Supply vs Demand', icon: <LineChart size={18}/>, desc: 'Explain the MTBF math and how dynamic thresholds beat static models.' },
    { id: 'VIEW_5', title: 'Impact Scorecard', icon: <BarChart3 size={18}/>, desc: 'Conclude with the overall ROI and performance uplift metrics.' }
  ];

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5E7EB]">
        <h2 className="text-2xl font-bold text-[#1428A0] mb-4">Presenter Pitch Guide</h2>
        <p className="text-gray-600 text-sm mb-8">Follow this sequence to effectively communicate the value of the new predictive MTBF engine compared to the legacy static system. Click any step to jump directly to that view.</p>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              onClick={() => onNavigate && onNavigate(step.id)}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EBF0FA] text-[#1428A0] flex items-center justify-center mr-4">
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm">Step {index + 1}: {step.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
              </div>
              <div className="text-gray-300 group-hover:text-[#1428A0] transition-colors">
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
