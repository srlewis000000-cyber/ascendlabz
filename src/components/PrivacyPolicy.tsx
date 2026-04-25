import React from 'react';
import { Lock, ChevronRight } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-12 lg:px-12 lg:pb-12 space-y-12 bg-white min-h-screen">
      <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-blue-600 font-black">Privacy Policy</span>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 italic">PRIVACY POLICY.</h1>
        <p className="text-slate-500 font-medium leading-relaxed">How we collect, use, and protect your data.</p>
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Last Updated: April 2026</p>
      </div>

      <div className="space-y-8 text-slate-600 font-medium leading-relaxed text-sm lg:text-base">
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
          <Lock className="w-6 h-6 text-blue-600 shrink-0" />
          <div className="space-y-2">
            <h2 className="text-lg font-black text-blue-800 tracking-tight">DATA SECURITY</h2>
            <p className="text-sm text-blue-700">
              We encrypt sensitive information and never store unencrypted payment details. Your privacy and data security are our top priorities.
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">1. Information We Collect</h2>
          <p>We only collect the minimum information necessary to process your order, prevent fraud, and provide rapid customer support. This includes basic details such as your full name, shipping address, contact email, and phone number. Payment details are strictly tokenized and handled exclusively by our PCI-DSS compliant third-party processors. We do not store raw credit card data on our servers.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">2. How We Use & Protect Your Information</h2>
          <p>Your information is utilized solely to facilitate the shipment of research materials, communicate critical logistical updates, and uphold our security protocols. All connections to our site use 256-bit encrypted SSL/TLS. <strong className="text-slate-900">We categorically do not sell, rent, or trade your personal information to any third parties.</strong></p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">3. Cookie Policy & Local Storage</h2>
          <p>We rely on strictly necessary cookies and local storage to maintain session states (e.g., keeping items in your cart) and to enforce our security age-gates. These minimalist trackers do not attempt to behaviorally profile users.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">4. User Rights (GDPR & CCPA Compliance)</h2>
          <p>Depending on your jurisdiction, you may have the right to request access to the data we hold, or ask for complete deletion of your records (Right to be Forgotten). If you wish to exercise your data rights, please submit a formal request to our privacy team via email. Rest assured, your data is handled with the utmost respect for global privacy standards.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">5. Contact Us</h2>
          <p>If you have any questions regarding our cryptographic measures or how we handle your privacy, please contact us at <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">ascendlabz@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
};
