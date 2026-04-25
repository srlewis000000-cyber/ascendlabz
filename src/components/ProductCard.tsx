import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Info, ShieldCheck, Truck, Package, Share2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';
import { VialImage } from './VialImage';
import { StarRating } from './StarRating';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onViewProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewProduct }) => {
  const handleView = () => {
    try {
      const stored = localStorage.getItem('recently_viewed');
      let viewed = stored ? JSON.parse(stored) : [];
      viewed = viewed.filter((id: string) => id !== product.id);
      viewed.unshift(product.id);
      if (viewed.length > 5) viewed = viewed.slice(0, 5);
      localStorage.setItem('recently_viewed', JSON.stringify(viewed));
      window.dispatchEvent(new Event('recently_viewed_updated'));
    } catch (e) {}

    window.dispatchEvent(new CustomEvent('view_product', { detail: product }));
    if (onViewProduct) onViewProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      id: `${product.id}-1`,
      name: product.name,
      price: product.prices[1],
      quantity: 1,
      packSize: 1,
      image: product.image || product.categoryColor,
      group: product.group,
      mg: product.mg
    });
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        onClick={handleView}
        className="group bg-white border border-slate-200 rounded-2xl p-2 cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden relative shadow-sm"
      >
        <div className="absolute top-2.5 left-2.5 z-10 flex gap-1">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               if (navigator.share) {
                 navigator.share({
                   title: `Ascend Labz | ${product.name}`,
                   text: `Check out ${product.name} ${product.mg} for research.`,
                   url: window.location.href,
                 });
               }
             }}
             className="w-6 h-6 rounded-full bg-white/80 backdrop-blur-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm active:scale-90"
           >
              <Share2 className="w-3 h-3" />
           </button>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="bg-blue-50 text-blue-600 text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-full border border-blue-100">
            {product.mg}
          </span>
        </div>

        <div className="relative h-44 mb-2 rounded-xl overflow-hidden">
          <VialImage color={product.categoryColor} name={product.name} mg={product.mg} group={product.group} image={product.image} />
        </div>

        <div className="space-y-2 px-1 pb-1">
          <div>
            <p className="text-[8px] font-bold text-blue-600 uppercase tracking-widest mb-0.5 opacity-80">{product.group}</p>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors truncate">{product.name}</h3>
            
            <div className="flex items-center gap-0.5 mt-1 transition-opacity opacity-70 group-hover:opacity-100">
               <StarRating rating={product.rating} size={10} />
               <span className="text-[9px] font-bold text-slate-500 ml-1">
                 {product.rating.toFixed(1)} ({product.reviewCount} Research Reviews)
               </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
            <span className="text-base font-black text-slate-900">${product.prices[1].toFixed(2)}</span>
            <button
              onClick={handleQuickAdd}
              className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
