import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Briefcase, Zap, Globe, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const LabSolutions: React.FC = () => {
  return (
    <div className="min-h-screen pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-[40px] overflow-hidden bg-slate-900 p-12 lg:p-16 text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center shadow-2xl">
           <div className="absolute inset-0 z-0 overflow-hidden">
             <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[120px] rounded-full" />
             <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-blue-400/5 blur-[120px] rounded-full" />
           </div>

           <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                 <Zap className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">BULK & WHOLESALE</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-white italic leading-[0.9]">
                BULK RESEARCH <br/><span className="text-blue-500">ORDERS.</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
                Global fulfillment, custom synthesis, and white-label manufacturing for government bodies, private clinical labs, and large-scale research institutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20">
                    GET A QUOTE <Mail className="w-5 h-5" />
                 </button>
              </div>
           </div>

           <div className="relative z-10 hidden lg:block">
              <div className="grid grid-cols-2 gap-6 p-8 bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10">
                 {[
                   { icon: <Landmark />, title: "Institutional Bulk", desc: "Pricing for orders exceeding 500 units." },
                   { icon: <Briefcase />, title: "White Label", desc: "Your branding, our purity. Turnkey retail solutions." },
                   { icon: <Zap />, title: "Custom Blends", desc: "Proprietary ratios synthesized to your specs." },
                   { icon: <Globe />, title: "Global Logistics", desc: "DDP shipping for frictionless international arrival." }
                 ].map((box, i) => (
                   <div key={i} className="p-6 space-y-4 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-500 flex items-center justify-center">{box.icon}</div>
                      <h3 className="font-bold text-white text-sm uppercase tracking-tight">{box.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{box.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           <div className="space-y-6 p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:border-blue-500/20 transition-all flex flex-col items-start group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 italic">VIP PORTAL ACCESS.</h3>
              <p className="text-slate-500 font-medium leading-relaxed flex-1">
                Gain entry to our encrypted wholesale dashboard for real-time inventory tracking, priority fulfillment, and early access to clinical release candidates.
              </p>
              <button className="flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest pt-4 hover:gap-5 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
           </div>
           
           <div className="space-y-6 p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:border-blue-500/20 transition-all flex flex-col items-start group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 italic">RAPID PROTOTYPING.</h3>
              <p className="text-slate-500 font-medium leading-relaxed flex-1">
                From concept to lyophilized vial in as little as 14 days. Our synthesis facility is optimized for speed without compromising biological precision.
              </p>
              <button className="flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest pt-4 hover:gap-5 transition-all">
                Lab Capabilities <ArrowRight className="w-4 h-4" />
              </button>
           </div>

           <div className="space-y-6 p-10 rounded-[40px] bg-slate-900 text-white shadow-2xl flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full" />
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center relative z-10">
                 <Landmark className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black tracking-tight italic relative z-10">CUSTOM FORMULATIONS.</h3>
              <p className="text-slate-400 font-medium leading-relaxed flex-1 relative z-10">
                Leverage our automated synthesis pipeline to create proprietary peptide sequences to your exact molecular weight and purity specifications.
              </p>
              <button className="flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-widest pt-4 hover:gap-5 transition-all relative z-10">
                Start Project <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Audit / Compliance */}
        <div className="text-center space-y-12">
           <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">ENTERPRISE COMPLIANCE.</h2>
              <p className="text-slate-400 font-medium">Digital audit trails and secure chain-of-custody documentation provided for every batch.</p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2 font-black text-sm tracking-tighter"><ShieldCheck className="w-5 h-5" /> GMP CERTIFIED</div>
              <div className="flex items-center gap-2 font-black text-sm tracking-tighter"><ShieldCheck className="w-5 h-5" /> ISO 9001:2015</div>
              <div className="flex items-center gap-2 font-black text-sm tracking-tighter"><ShieldCheck className="w-5 h-5" /> FDA REGISTERED FACILITY</div>
              <div className="flex items-center gap-2 font-black text-sm tracking-tighter"><ShieldCheck className="w-5 h-5" /> DATA ENCRYPTION (SSL)</div>
           </div>
        </div>
      </div>
    </div>
  );
};
