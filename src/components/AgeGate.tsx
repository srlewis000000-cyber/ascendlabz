import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CheckCircle2, FlaskConical, AlertTriangle } from 'lucide-react';

export const AgeGate: React.FC<{ onVerified: () => void }> = ({ onVerified }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('age-verified');
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerify = () => {
    if (hasConsented) {
      localStorage.setItem('age-verified', 'true');
      setIsOpen(false);
      onVerified();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#f8fafc] sm:bg-slate-900/40 sm:backdrop-blur-xl p-0 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="w-full h-full sm:h-auto sm:max-w-xl bg-white sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header / Intro */}
            <div className="bg-slate-900 p-10 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">ACCESS AUTHORIZATION REQUIRED.</h1>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                The Ascend Labz portal provides access to specialized laboratory research materials. Professional verification is mandatory.
              </p>
            </div>

            <div className="p-10 space-y-8 flex-1">
              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldAlert className="w-6 h-6 text-blue-600 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-black text-xs uppercase tracking-widest text-slate-900">Age Qualification</p>
                    <p className="text-sm text-slate-500 font-medium">By entering, you confirm you are 18 years of age or older (21+ in specific jurisdictions).</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-black text-xs uppercase tracking-widest text-orange-900">Research Declaration</p>
                    <p className="text-sm text-slate-600 font-medium">Materials found herein are strictly for in-vitro laboratory research. Not for human or animal consumption.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-slate-100">
                 <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative mt-1">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={hasConsented}
                        onChange={() => setHasConsented(!hasConsented)}
                      />
                      <div className="w-6 h-6 rounded-lg border-2 border-slate-200 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-600 leading-relaxed select-none group-hover:text-slate-900 transition-colors">
                      I certify that I am at least 18 years of age and understand that all products are strictly for laboratory research use only. NOT FOR HUMAN CONSUMPTION.
                    </span>
                 </label>

                 <button
                   onClick={handleVerify}
                   disabled={!hasConsented}
                   className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/10 ${
                     hasConsented 
                       ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer" 
                       : "bg-slate-100 text-slate-400 cursor-not-allowed"
                   }`}
                 >
                   AUTHORIZE ACCESS
                 </button>
                 
                 <p className="text-[10px] text-center font-black uppercase tracking-[0.3em] text-slate-400">
                   Secure Laboratory Verification System 2.4.1
                 </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
