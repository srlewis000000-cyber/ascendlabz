import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ShoppingBag, ArrowRight, FlaskConical } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { VialImage } from './VialImage';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.group.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-white"
        >
          {/* Header */}
          <div className="border-b border-slate-100 px-6 lg:px-12 h-24 flex items-center gap-6">
            <Search className="w-6 h-6 text-blue-600" />
            <input
              autoFocus
              type="text"
              placeholder="Search research materials, peptides, or categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-2xl lg:text-4xl font-black tracking-tighter text-slate-900 focus:outline-none placeholder:text-slate-200 uppercase italic"
            />
            <button 
              onClick={onClose}
              className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors group"
            >
              <X className="w-6 h-6 text-slate-900 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
              {!query ? (
                <div className="space-y-12">
                   <div className="space-y-4">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Suggested Categories</h3>
                      <div className="flex flex-wrap gap-4">
                         {['GLP-1', 'Healers', 'Brain Health', 'Longevity'].map(cat => (
                           <button 
                             key={cat}
                             onClick={() => setQuery(cat)}
                             className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
                           >
                             {cat}
                           </button>
                         ))}
                      </div>
                   </div>
                   
                   <div className="grid lg:grid-cols-2 gap-12">
                      <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] group-hover:bg-blue-600/30 transition-colors" />
                         <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                            <FlaskConical className="w-6 h-6" />
                         </div>
                         <div className="space-y-4 relative z-10">
                            <h4 className="text-3xl font-black italic tracking-tighter">PHARMA-GRADE PURITY.</h4>
                            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                               Every peptide in our inventory is HPLC tested for research consistency.
                            </p>
                         </div>
                      </div>
                      
                      <div className="bg-blue-600 rounded-[3rem] p-10 text-white space-y-6 relative overflow-hidden group">
                         <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 blur-[80px] group-hover:bg-white/20 transition-colors" />
                         <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                            <ShoppingBag className="w-6 h-6" />
                         </div>
                         <div className="space-y-4 relative z-10">
                            <h4 className="text-3xl font-black italic tracking-tighter">BROWSE CATALOG.</h4>
                            <p className="text-white/80 font-medium leading-relaxed max-w-sm">
                               Explore our complete range of high-performance research materials.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((product) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={product.id}
                      onClick={() => onSelectProduct(product.id)}
                      className="group bg-white border border-slate-200 rounded-[2.5rem] p-3 cursor-pointer hover:border-blue-600 transition-all shadow-sm"
                    >
                      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 bg-slate-50">
                        <VialImage name={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4">
                           <span className="bg-white/90 backdrop-blur-md border border-slate-100 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                              {product.mg}
                           </span>
                        </div>
                      </div>
                      <div className="px-3 pb-3 space-y-2">
                        <div>
                          <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.group}</p>
                          <h4 className="text-lg font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors truncate italic uppercase">{product.name}</h4>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-xl font-black text-slate-900">${product.prices[1].toFixed(2)}</span>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                             <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 space-y-6">
                   <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                      <Search className="w-8 h-8 text-slate-300" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-2xl font-black italic tracking-tighter text-slate-900">NO EXPERIMENTAL MATCHES.</h3>
                      <p className="text-slate-500 font-medium tracking-tight">We couldn't find any materials matching "{query}" in our research database.</p>
                   </div>
                   <button 
                     onClick={() => setQuery('')}
                     className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline"
                   >
                     Reset filter
                   </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
