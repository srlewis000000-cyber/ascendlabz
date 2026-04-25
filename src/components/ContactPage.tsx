import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, Send, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    // We let the browser handle the mailto action, but we trigger the success UI
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="pb-12 px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600">Contact Us</span>
        </div>
        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
          REACH OUT.<br/>
          <span className="text-transparent border-text-stroke-1 ml-4" style={{ WebkitTextStroke: '1px #0f172a' }}>GET ANSWERS.</span>
        </h1>
      </section>

      {/* Main Content Grid */}
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-24 p-6 lg:p-12 max-w-7xl mx-auto py-16">
        {/* Info Column */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 underline decoration-blue-600 decoration-4 underline-offset-8">DIRECT CHANNEL.</h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-md">
              Whether it's a bulk research inquiry or a technical product question, our team of specialists provides direct support for all legitimate research institutions and private researchers.
            </p>
          </div>

          <div className="grid gap-6">
            <a 
              href="mailto:ascendlabz@gmail.com" 
              className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Support</p>
                <p className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">ascendlabz@gmail.com</p>
                <p className="text-xs text-slate-500 mt-1">Direct inquiries only</p>
              </div>
            </a>

            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
                <p className="text-xl font-bold text-slate-900">Within 24 Hours</p>
                <p className="text-xs text-slate-500 mt-1">Operational Monday - Friday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-slate-900 p-8 lg:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-white text-3xl font-black italic">MESSAGE THE LAB.</h3>
                  <p className="text-slate-400 text-sm">Fill out the secure form below to initiate contact.</p>
                </div>

                <form 
                  action="mailto:ascendlabz@gmail.com" 
                  method="GET" 
                  encType="text/plain"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                    <select 
                      name="subject"
                      required
                      className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                      <option value="Order Inquiry">Order Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Bulk Order">Bulk Order Request</option>
                      <option value="Research Partnership">Research Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Details of your inquiry..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/50">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-4xl font-black">SENT.</h3>
                  <p className="text-slate-400">Your email client should have opened. If not, contact us directly at <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">ascendlabz@gmail.com</a></p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
