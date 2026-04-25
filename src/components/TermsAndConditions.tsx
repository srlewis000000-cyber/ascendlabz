import React from 'react';
import { ShieldAlert, ChevronRight } from 'lucide-react';

export const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-12 lg:px-12 lg:pb-12 space-y-12 bg-white min-h-screen">
      <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-blue-600 font-black">Terms & Conditions</span>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 italic">TERMS OF USE.</h1>
        <p className="text-slate-500 font-medium leading-relaxed">Please read these terms carefully before utilizing our services or purchasing research materials.</p>
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Last Updated: April 2026</p>
      </div>

      <div className="space-y-8 text-slate-600 font-medium leading-relaxed text-sm lg:text-base">
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
          <div className="space-y-2">
            <h2 className="text-lg font-black text-red-800 tracking-tight">STRICTLY FOR LABORATORY RESEARCH</h2>
            <p className="text-sm text-red-700">
              All products offered by Ascend Labz are strictly for laboratory research purposes only. They are NOT for human consumption, diagnostic, therapeutic, or any agricultural/veterinary purposes. By purchasing, the buyer assumes all responsibility and liability for the handling, application, and use of these materials.
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">1. Required Qualifications</h2>
          <p>By accessing or using the Ascend Labz website and purchasing our products, you agree to be bound by these Terms and Conditions. You must be at least 18 years of age to purchase any materials. Buyer represents that they belong to an appropriate research institution, laboratory, or are an independent researcher fully qualified to handle the aforementioned compounds.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">2. Non-Medical Status</h2>
          <p>The materials sold herein have not been evaluated or approved by the FDA (Food and Drug Administration) or any global sanitary authority equivalent. No medical or therapeutic claims are made about the properties or effects of these products.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">3. Final Sales & Refunds</h2>
          <p>Due to the hyper-sensitive biochemical nature of research chemicals, purity degradation risks during uncontrolled transit, and overarching regulatory safety protocols, <strong className="text-slate-900">all sales are final. We do not accept returns.</strong> No refunds will be provided once a shipment has been securely dispatched. Exceptions are solely made for items demonstrably damaged during courier transit.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">4. Assumption of Formidable Liability</h2>
          <p>The purchaser acknowledges the inherent risks attached to these unapproved biochemicals. Ascend Labz, its directors, holding companies, and logistical partners are hereby fully indemnified against, and assume zero liability for, any adverse reactions, personal injury, monetary damages, or property damages stemming from the misapplication, misuse, ingestion, or otherwise prohibited handling of any distributed products.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">5. Intellectual Property</h2>
          <p>All content on this site, including but not limited to branding, molecular illustrations, proprietary text, and operational graphics, is the intellectual property of Ascend Labz. Unauthorized distribution or copying is strictly prohibited.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">6. Governing Law & Jurisdiction</h2>
          <p>Any disputes arising under these Terms & Conditions shall be governed by the laws of the State of Delaware, United States without regard to its conflict of law provisions. Both parties consent to the exclusive jurisdiction of the state and federal courts located in Delaware for any such conflicts.</p>
        </section>
      </div>
    </div>
  );
};
