import React from 'react';
import { Microscope, ShieldCheck, Truck, Users, Mail, ChevronRight, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="pb-12 px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600 font-black">About Us</span>
        </div>
        <h1 className="text-6xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-[0.8]">
          ELEVATING.<br/>
          <span className="text-transparent border-text-stroke-1 ml-4" style={{ WebkitTextStroke: '1px #0f172a' }}>RESEARCH PURITY.</span>
        </h1>
        <p className="max-w-xl text-slate-500 font-medium py-10 leading-relaxed">
          Ascend Labz is a premier research biotechnology supplier dedicated to providing the global scientific community with high-purity peptides and raw materials for essential research.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-24 p-6 lg:p-12 max-w-7xl mx-auto items-center py-16">
        <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900">OUR MISSION TO SCIENTIFIC PRECISION.</h2>
            <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Why do we exist? Because research demands absolute certainty. Our mission is to eliminate the variables of purity and consistency from your studies. We believe that groundbreaking research shouldn't be held back by subpar materials.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div className="space-y-2">
                    <p className="text-3xl font-black text-blue-600 italic">99.9%</p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Average Purity</p>
                </div>
                <div className="space-y-2">
                    <p className="text-3xl font-black text-blue-600 italic">500+</p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Labs Served</p>
                </div>
            </div>
        </div>
        <div className="bg-slate-50 rounded-[3rem] p-12 aspect-square relative border border-slate-100 overflow-hidden flex items-center justify-center">
             {/* Abstract bio-tech patterns */}
             <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 p-8">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="w-12 h-12 bg-blue-600 rounded-lg" />
                ))}
             </div>
             <div className="relative z-10 text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl mx-auto">
                    <Microscope className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-2xl font-black text-slate-900 italic">LAB-CERTIFIED MATERIALS.</p>
             </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="bg-slate-900 py-16 rounded-[3rem] mx-4 my-16 overflow-hidden relative">
           <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-12 text-white">
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black italic">ULTRA-STRICT HPLC TESTING.</h3>
                    <p className="text-slate-400 font-medium">Every batch undergoes High-Performance Liquid Chromatography and Mass Spectrometry testing before we ship a single vial.</p>
                </div>
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black italic">CLIMATE-STABLE LOGISTICS.</h3>
                    <p className="text-slate-400 font-medium">We pack our materials using advanced thermal stability buffers and discreet labelling to ensure the integrity of your research materials upon arrival.</p>
                </div>
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black italic">RESEARCH-FIRST PHILOSOPHY.</h3>
                    <p className="text-slate-400 font-medium">Our team consists of specialists who understand the needs of research laboratories. We aren't just suppliers; we're scientific enablers.</p>
                </div>
           </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 max-w-4xl mx-auto text-center px-6">
          <div className="space-y-8">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Get In Touch</p>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-tight">QUESTIONS REGARDING BULK ORDERS OR RESEARCH DATA?</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                    <a
                      href="mailto:Ascendlabz@gmail.com"
                      className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-2xl shadow-slate-900/30"
                    >
                      Email Specialist <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'shop' }))}
                      className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Browse full catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <p className="text-xs text-slate-400 font-bold pt-8">Operating from standard laboratory hours (EST), Response within 24hrs.</p>
          </div>
      </section>
    </div>
  );
};
