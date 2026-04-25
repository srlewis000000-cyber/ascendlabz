import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, Mail, ChevronRight } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string | React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 lg:py-8 text-left group"
      >
        <h3 className={`text-lg lg:text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-500'}`}>
          {question}
        </h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="pb-8 text-slate-500 leading-relaxed font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQPage = () => {
  const faqs = [
    {
      question: "What does 'Research Purposes Only' mean?",
      answer: "All products listed on Ascend Labz are strictly for laboratory research, in vitro studies, and institutional use only. They are not intended for human consumption, clinical use, or diagnostic purposes. Purchasing signifies agreement that these materials will be used only in a researcher-controlled environment."
    },
    {
      question: "How are your peptides tested for purity?",
      answer: "Every batch undergoes rigorous quality control, including High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS). We provide third-party Certificates of Analysis (COA) for all peptides to guarantee a minimum purity level of 99%."
    },
    {
      question: "What are your shipping times and methods?",
      answer: "Domestic orders typically ship within 24-48 business hours via USPS or FedEx. Delivery usually takes 3-5 business days. International orders can take 10-21 days depending on customs and location. All orders are packed in temperature-stable, discreet packaging."
    },
    {
      question: "Which payment methods do you accept?",
      answer: "We accept secure payments via Credit/Debit Cards, PayPal, and Cryptocurrency (Bitcoin/Ethereum). For bulk orders, we can also arrange for bank wire transfers. All transactions are encrypted and secure."
    },
    {
      question: "How should I store my peptides upon arrival?",
      answer: "Lyophilized (powder) peptides should be stored in a cool, dry place away from direct light. For long-term stability, we recommend storage in a laboratory freezer at -20°C. Once reconstituted, products should be refrigerated at 2-8°C and used within defined research protocol timelines."
    },
    {
      question: "Do you offer bulk ordering or institutional discounts?",
      answer: <>Yes, we specialize in supplying large-scale research projects. Bulk discounts are available for orders exceeding 50 units. Please contact us at <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">ascendlabz@gmail.com</a> with your institution details for a custom quote.</>
    },
    {
      question: "What is your return and refund policy?",
      answer: "ALL SALES FINAL. Due to the sensitive nature of research materials and biochemical stability, we cannot accept returns once a product has left our controlled storage facility. However, if there is a verified issue with purity or verifiable shipping damage, we offer full replacements. Contact support within 48 hours of delivery."
    },
    {
      question: "How can I contact technical support?",
      answer: <>For technical questions regarding COAs, storage, or order status, please email our support team at <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">ascendlabz@gmail.com</a>. We typically respond to all technical inquiries within one business day.</>
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Header */}
      <section className="pb-12 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full border border-blue-100 mb-4">
          <HelpCircle className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Help Center</span>
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
          FREQUENTLY ASKED.<br/>
          <span className="text-transparent border-text-stroke-1" style={{ WebkitTextStroke: '1px #0f172a' }}>RESEARCH QUESTIONS.</span>
        </h1>
        <p className="max-w-xl text-slate-500 font-medium py-6">
          Everything you need to know about our quality standards, shipping protocols, and research compliance.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 bg-slate-900 rounded-[2rem] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-white text-2xl font-bold tracking-tight">Still have questions?</h3>
            <p className="text-slate-400">Can't find the answer you're looking for? Reach out to our research specialists.</p>
          </div>
          <a
            href="mailto:ascendlabz@gmail.com"
            className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap"
          >
            Email Support <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};
