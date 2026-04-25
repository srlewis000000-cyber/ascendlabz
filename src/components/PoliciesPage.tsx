import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Mail, ChevronRight } from 'lucide-react';

export const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pb-12 px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-100 mt-0">
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600 font-black">Shipping & Returns</span>
        </div>
        <h1 className="text-6xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-[0.8]">
          POLICIES.<br/>
          <span className="text-transparent border-text-stroke-1 ml-4" style={{ WebkitTextStroke: '1px #0f172a' }}>LOGISTICS & PROTECTIONS.</span>
        </h1>
      </section>

      <section className="p-6 lg:p-12 max-w-7xl mx-auto py-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Shipping Policy */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                <Truck className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-black italic text-slate-900 tracking-tight">SHIPPING PROTOCOLS.</h2>
            </div>
            
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                We prioritize both the speed of delivery and the stability of your research materials. Every order is packed with state-of-the-art temperature-stabilizing buffers to ensure biochemical integrity.
              </p>
              
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeframes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> <strong>Processing:</strong> Dispatch within 24-48 business hours.</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> <strong>Domestic (USA):</strong> 3-5 business days delivery via USPS/FedEx.</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> <strong>International:</strong> 10-21 business days reaching most major research hubs.</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Packaging:</h4>
                <p className="text-sm">
                  All products ship in discreet, secure laboratory packaging with no mention of research peptides or biotechnological materials on the outer carton. This ensures confidentiality and reduces customs complications.
                </p>
              </div>
            </div>
          </div>

          {/* Returns & Refunds */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                <RotateCcw className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-black italic text-slate-900 tracking-tight">REFUND POLICY.</h2>
            </div>

            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                <strong className="text-slate-900">ALL SALES ARE FINAL.</strong> Due to the sensitive nature of scientific research materials, biochemical stability, and the inability to guarantee temperature control after a product has left our facility, we cannot accept returns under any condition for research chemicals.
              </p>
              
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 space-y-4">
                <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-loose">Exceptions for Replacement:</h4>
                <p className="text-sm">
                  We stand by the quality of our peptides. Replacements (no refunds) are exclusively granted if:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" /> A third-party HPLC test verifies purity below 98%.</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" /> The product arrived physically damaged during courier transit.</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" /> The incorrect research item was dispatched by our facility.</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry & Claim Process:</h4>
                <p className="text-sm">
                  Submit damaged package or missing item claims to <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">ascendlabz@gmail.com</a> with your order ID, clear photos of damaged goods/packaging, and the courier tracking number within 48 hours of delivery. Once an item is handed off to the courier, the risk of loss transfers to the buyer unless standard postal insurance confirms a loss.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Compliance Warning */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-7xl mx-auto flex items-start gap-4 p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
            <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div className="space-y-2">
                <p className="font-bold text-slate-900">Legal Disclaimer Regarding Terms & Logistics</p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    By confirming your order, you acknowledge that these materials are only for in vitro and laboratory research. Logistics and delivery are handled by third-party carriers. Ascend Labz is not liable for research experiments that fail due to improper storage once delivered or incorrect lab protocol applications.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
};
