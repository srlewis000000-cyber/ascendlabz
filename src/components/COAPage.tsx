import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Search, FlaskConical, ChevronRight, FileCheck, ExternalLink, Download } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { COADisplay } from './COADisplay';
import { Product } from '../types';

export const COAPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsWithCOA = PRODUCTS.filter(p => p.coa);
  const filteredProducts = productsWithCOA.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.coa?.taskNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 mb-4">
             <ShieldCheck className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Verified Authenticity</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic text-slate-900 leading-[0.9]">
            CERTIFICATES OF <span className="text-[#00a651]">ANALYSIS.</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            We operate with radical transparency. Access verified Janoshik laboratory reports for every batch in our research inventory.
          </p>
          <p className="text-sm font-bold text-slate-500 mt-4 border border-slate-200 bg-white inline-block px-4 py-2 rounded-xl">
             Don't see your batch listed? <a href="mailto:Ascendlabz@gmail.com" className="text-blue-600 hover:underline">Complete COAs are available upon request.</a>
          </p>
        </div>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-100">
           <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by peptide name or task #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-all shadow-sm"
              />
           </div>
           
           <div className="flex gap-12 items-center">
              <div>
                <div className="text-2xl font-black text-slate-900">{productsWithCOA.length}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reports Online</div>
              </div>
              <div className="w-px h-10 bg-slate-100" />
              <div>
                <div className="text-2xl font-black text-[#00a651]">100%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Purity Goal</div>
              </div>
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <AnimatePresence mode="popLayout">
             {filteredProducts.map((p) => (
               <motion.div 
                 key={p.id}
                 layout
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="group bg-white border border-slate-100 rounded-[32px] p-8 hover:border-blue-600/20 transition-all shadow-sm flex flex-col items-start gap-8"
               >
                  <div className="flex justify-between items-start w-full">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <FlaskConical className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Task Reference</div>
                       <div className="text-xs font-black text-slate-900">{p.coa?.taskNumber}</div>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1 w-full">
                     <h3 className="text-2xl font-black tracking-tight text-slate-900">{p.name}</h3>
                     <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-700 uppercase tracking-widest">{p.mg}</span>
                        <span className="px-3 py-1 bg-green-50 rounded-lg text-[10px] font-black text-[#00a651] uppercase tracking-widest">Verified {p.coa?.purity}</span>
                     </div>
                  </div>

                  <button 
                    onClick={() => setSelectedProduct(p)}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all"
                  >
                    View Report <ExternalLink className="w-4 h-4" />
                  </button>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 space-y-4">
             <div className="text-slate-300">
               <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-20" />
               <p className="text-lg font-bold">No verified reports found matching your criteria.</p>
               <button onClick={() => setSearchQuery('')} className="text-blue-600 font-black text-xs uppercase tracking-widest mt-4">Clear search</button>
             </div>
          </div>
        )}
      </div>

      {/* Modal / Report Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <COADisplay product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
