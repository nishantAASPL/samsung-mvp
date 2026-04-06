import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertTriangle, XCircle, ChevronDown, Phone, TrendingUp } from 'lucide-react';
import { oemRequests, oemMetrics } from '../../data/mockData';

export default function ReservationQueue({ model }) {
  const [reqFilter, setReqFilter] = useState('All');
  const [activeReqId, setActiveReqId] = useState(oemRequests[model][0].id);
  const [toastMessage, setToastMessage] = useState(null);
  const [contextOpen, setContextOpen] = useState(false);

  const currentReqs = oemRequests[model];
  const activeReq = currentReqs.find(r => r.id === activeReqId) || currentReqs[0];
  const qStats = oemMetrics[model].queueStats;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReqs = currentReqs.filter(r => {
    if (reqFilter === 'Ready') return r.status === 'GREEN';
    if (reqFilter === 'Needs Action') return r.status !== 'GREEN';
    return true;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F9FAFB] space-y-4 max-w-7xl mx-auto w-full animate-in fade-in duration-500 relative">
      {toastMessage && (
        <div className="absolute bottom-6 right-6 bg-[#1F2937] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-4">
          <CheckCircle2 size={18} className="text-[#059669]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-3 flex-shrink-0">
        <div><h2 className="text-2xl font-bold text-[#1F2937]">Reservation Queue</h2><p className="text-gray-500 text-xs">Real-time triage of incoming customer repair requests.</p></div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#EBF0FA] px-6 py-4 flex justify-between border border-blue-100 rounded-lg flex-shrink-0 shadow-sm transition-all duration-300">
        <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Today's Requests</span><span className="text-2xl font-black text-[#1F2937]">{qStats.total}</span></div>
        <div className="w-px bg-blue-200"></div>
        <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Approved</span><span className="text-2xl font-black text-[#059669]">{qStats.approved}</span></div>
        <div className="w-px bg-blue-200"></div>
        <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Redirected</span><span className="text-2xl font-black text-[#D97706]">{qStats.redirected}</span></div>
        <div className="w-px bg-blue-200"></div>
        <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">Pending Restock</span><span className="text-2xl font-black text-[#DC2626]">{qStats.pending}</span></div>
        <div className="w-px bg-blue-200"></div>
        <div className="flex flex-col"><span className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-1">First-Time Fix Rate</span><span className="text-2xl font-black text-[#1428A0]">{qStats.ftfr}</span></div>
      </div>

      <div className="flex gap-4 flex-1 overflow-hidden min-h-[500px]">
        {/* Left Panel: Request List */}
        <div className="w-2/5 bg-white border border-[#E5E7EB] rounded-lg shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 border-b border-[#E5E7EB] flex gap-2 bg-gray-50 flex-shrink-0">
            {['All', 'Ready', 'Needs Action'].map(f => (
              <button key={f} onClick={() => setReqFilter(f)} className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider border ${reqFilter === f ? 'bg-[#1428A0] text-white border-[#1428A0]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                {f} {f === 'All' ? `(${qStats.total})` : f === 'Ready' ? `(${qStats.approved})` : `(${qStats.total - qStats.approved})`}
              </button>
            ))}
          </div>
          <div className="overflow-y-auto flex-1 p-3 space-y-2">
            {filteredReqs.map(req => {
              const bColor = req.status === 'GREEN' ? '#059669' : req.status === 'AMBER' ? '#D97706' : '#DC2626';
              return (
                <div 
                  key={req.id} 
                  onClick={() => setActiveReqId(req.id)}
                  className={`p-3 border rounded cursor-pointer transition-colors ${activeReqId === req.id ? 'bg-[#EBF0FA] border-blue-200' : 'bg-white border-[#E5E7EB] hover:bg-gray-50'}`}
                  style={{ borderLeftWidth: '4px', borderLeftColor: bColor }}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`font-bold text-xs ${activeReqId === req.id ? 'text-[#1428A0]' : 'text-gray-800'}`}>{req.id}</span>
                    <span className="text-[10px] font-bold text-gray-400">{req.time}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800 truncate">{req.device} • {req.part}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} className="text-gray-400"/> {req.store}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Panel: Request Details */}
        <div className="w-3/5 bg-white border border-[#E5E7EB] rounded-lg shadow-sm flex flex-col overflow-y-auto p-6 transition-all duration-300">
          {!activeReq ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium">Select a request to view details</div>
          ) : (
            <div className="space-y-6">
              
              {/* Block 1: Info */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-[10px] font-bold text-[#1428A0] uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Request Details</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Request ID</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.id}</span></div>
                  <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Preferred Store</span><span className="text-sm font-semibold text-[#1F2937] flex items-center gap-1"><MapPin size={14} className="text-[#1428A0]"/> {activeReq.store}</span></div>
                  <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Customer ID</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.customer}</span></div>
                  <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Part Required</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.part}</span></div>
                  <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Device & Warranty</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.device} <span className="text-xs font-normal text-gray-500">({activeReq.warranty})</span></span></div>
                  <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Reservation Date</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.date}</span></div>
                  <div className="col-span-2 pt-2 border-t border-gray-200"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Issue Reported</span><span className="text-sm font-semibold text-[#1F2937]">{activeReq.issue}</span></div>
                </div>
              </div>

              {/* Block 2: Inventory Check Hero */}
              {activeReq.status === 'GREEN' && (
                <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-6 rounded-lg flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                  <CheckCircle2 size={32} className="text-[#059669] mb-3" />
                  <h2 className="text-lg font-bold text-[#059669] mb-1">Part Available at Preferred Store</h2>
                  <p className="text-xs text-green-800 font-medium mb-6">Current Stock: 12 units (Safety Threshold: 5)</p>
                  <button onClick={() => showToast("Reservation Approved")} className="bg-[#059669] hover:bg-green-700 text-white font-bold py-2.5 px-8 rounded shadow-sm transition-colors text-sm">Approve Reservation</button>
                  {model === 'TO_BE' && (
                    <p className="text-[10px] text-green-700 font-bold mt-4 flex items-center gap-1"><TrendingUp size={12}/> AI pre-emptively restocked this location to prevent failure wave.</p>
                  )}
                </div>
              )}

              {activeReq.status === 'AMBER' && model === 'TO_BE' && (
                <div className="bg-[#FFFBEB] border border-[#FDE68A] p-6 rounded-lg animate-in fade-in zoom-in-95">
                  <div className="flex flex-col items-center text-center mb-6">
                    <AlertTriangle size={32} className="text-[#D97706] mb-3" />
                    <h2 className="text-lg font-bold text-[#D97706] mb-1">Stock-Out at Preferred Store</h2>
                    <p className="text-xs text-amber-800 font-medium">Part is physically unavailable here, but available nearby.</p>
                  </div>
                  <div className="bg-white rounded border border-amber-200 overflow-hidden mb-6">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-amber-50 border-b border-amber-100">
                        <tr><th className="p-2.5 text-amber-900 font-bold">Alternative Store</th><th className="p-2.5 text-amber-900 font-bold">Distance</th><th className="p-2.5 text-amber-900 font-bold text-right">Stock</th></tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100"><td className="p-2.5 font-semibold text-gray-800">Store #187 (Naperville)</td><td className="p-2.5 text-gray-600">8.2 miles</td><td className="p-2.5 font-bold text-[#059669] text-right">4 units</td></tr>
                        <tr><td className="p-2.5 font-semibold text-gray-800">Store #210 (Schaumburg)</td><td className="p-2.5 text-gray-600">14.1 miles</td><td className="p-2.5 font-bold text-[#059669] text-right">11 units</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => showToast("Redirected to Store #187")} className="bg-[#D97706] hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Redirect to Store #187</button>
                    <button onClick={() => showToast("Rescheduled at Preferred")} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Reschedule Wait</button>
                  </div>
                </div>
              )}

              {activeReq.status === 'AMBER' && model === 'AS_IS' && (
                <div className="bg-[#FFFBEB] border border-[#FDE68A] p-6 rounded-lg flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                  <AlertTriangle size={32} className="text-[#D97706] mb-3" />
                  <h2 className="text-lg font-bold text-[#D97706] mb-1">Local Stock-Out Detected</h2>
                  <p className="text-xs text-amber-800 font-medium mb-6">Part is physically unavailable at preferred store. No network visibility.</p>
                  
                  <div className="bg-white w-full p-4 rounded border border-amber-200 mb-6 text-center text-sm text-gray-600 flex flex-col items-center">
                    <Phone size={24} className="text-gray-400 mb-2" />
                    Manager must manually call nearby stores to locate inventory before approving or redirecting.
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button onClick={() => showToast("Rescheduled to Wait")} className="bg-[#D97706] hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Reschedule to Apr 10</button>
                  </div>
                </div>
              )}

              {activeReq.status === 'RED' && (
                <div className="bg-[#FEF2F2] border border-[#FCA5A5] p-6 rounded-lg flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                  <XCircle size={32} className="text-[#DC2626] mb-3" />
                  <h2 className="text-lg font-bold text-[#DC2626] mb-1">Regional Stock-Out</h2>
                  <p className="text-xs text-red-800 font-medium mb-2">No viable alternatives within 25 miles.</p>
                  <p className="text-[10px] text-red-700 font-bold mb-6 bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider">Incoming supply expected: Apr 9 (5 days)</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => showToast("Rescheduled to April 10")} className="bg-[#DC2626] hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Reschedule to Apr 10</button>
                    <button onClick={() => showToast("Escalated to Supply Chain")} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded shadow-sm transition-colors text-sm">Escalate</button>
                  </div>
                </div>
              )}

              {/* Block 3: Context */}
              <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                <button onClick={() => setContextOpen(!contextOpen)} className="w-full p-4 font-bold text-[#1428A0] text-sm flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  Device & Repair Context <ChevronDown size={16} className={`transition-transform ${contextOpen ? 'rotate-180' : ''}`} />
                </button>
                {contextOpen && (
                  <div className="p-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-4 text-sm bg-white">
                    <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Device Age</span><span className="font-semibold text-gray-800">{activeReq.age}</span></div>
                    <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Component MTBF</span><span className="font-semibold text-gray-800">{activeReq.mtbf}</span></div>
                    <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Prior Repairs</span><span className="font-semibold text-gray-800">0</span></div>
                    <div><span className="text-gray-500 block text-[10px] font-bold uppercase tracking-widest mb-0.5">Regional Install Base</span><span className="font-semibold text-gray-800">12,450 active units</span></div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
