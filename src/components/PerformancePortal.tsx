import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Target, FileDown, PieChart } from 'lucide-react';

export const PerformancePortal: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 px-6 lg:px-12 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
           <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                ADMINISTRATION PANEL
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">CONVERSION ANALYTICS.</h1>
              <p className="text-slate-400 font-medium">Monitoring the biological research distribution funnel in real-time.</p>
           </div>
           <button className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <FileDown className="w-4 h-4" /> Export Audit Trail
           </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: "Total Research Distro", value: "$124,502", change: "+14.2%", icon: <TrendingUp className="w-6 h-6" /> },
             { label: "Active Researchers", value: "2,842", change: "+8.1%", icon: <Users className="w-6 h-6" /> },
             { label: "Conversion Rate", value: "4.82%", change: "+0.4%", icon: <Target className="w-6 h-6" /> },
             { label: "Audit Pass Rate", value: "100%", change: "0.0%", icon: <ShieldCheck className="w-6 h-6" /> }
           ].map((stat, i) => (
             <div key={i} className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">{stat.icon}</div>
                   <span className="text-xs font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Funnel chart simulation */}
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 p-10 bg-slate-900 rounded-[40px] text-white space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />
              <div className="space-y-2 relative z-10">
                 <h3 className="text-xl font-black italic">ACQUISITION FUNNEL.</h3>
                 <p className="text-slate-500 text-sm font-medium">Distribution stages for laboratory materials.</p>
              </div>

              <div className="space-y-6 relative z-10">
                 {[
                   { label: "Portal Access", count: "14,200", percent: 100, color: "bg-blue-600" },
                   { label: "PEPTIDE SELECTION", count: "8,420", percent: 59, color: "bg-blue-500" },
                   { label: "AUTH TRANSMISSION", count: "3,120", percent: 22, color: "bg-blue-400" },
                   { label: "VERIFIED SETTLEMENT", count: "1,420", percent: 10, color: "bg-cyan-400" }
                 ].map((stage, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-slate-400">{stage.label}</span>
                         <span>{stage.count} ({stage.percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stage.percent}%` }}
                          viewport={{ once: true }}
                          className={`${stage.color} h-full rounded-full transition-all duration-1000`}
                        />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-10 bg-white border border-slate-100 rounded-[40px] space-y-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
                 <PieChart className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 uppercase italic">AUDIT READY.</h3>
                <p className="text-slate-400 text-sm font-medium">Compliance signatures and encrypted transaction logs are fully indexed.</p>
              </div>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
                VIEW FULL AUDIT TRAIL
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

import { ShieldCheck } from 'lucide-react';
