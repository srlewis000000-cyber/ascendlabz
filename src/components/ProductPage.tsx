import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Info, ShoppingCart, ShieldCheck, Truck, Package } from 'lucide-react';
import { Product, UnitType, CartItem } from '../types';
import { VialImage } from './VialImage';
import { StarRating } from './StarRating';
import { cn } from '../lib/utils';

interface ProductPageProps {
  product: Product | null;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ 
  product, 
  onBack, 
  onAddToCart 
}) => {
  const [selectedPack, setSelectedPack] = useState<UnitType>(1);

  // Reset selected pack when product changes
  useEffect(() => {
    setSelectedPack(1);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart({
      id: `${product.id}-${selectedPack}`,
      name: product.name,
      price: product.prices[selectedPack],
      quantity: 1,
      packSize: selectedPack,
      image: product.image || product.categoryColor,
      group: product.group,
      mg: product.mg
    });
    onBack();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm tracking-widest uppercase"
        >
          <X className="w-5 h-5" />
          Back to Shop
        </button>
      </div>

      <div className="bg-white border border-slate-200 w-full rounded-[40px] overflow-hidden shadow-sm">
        <div className="grid md:grid-cols-2">
              <div className="bg-slate-50 p-12 flex items-center justify-center relative overflow-hidden">
                <div className="relative inline-block w-full max-w-sm aspect-[4/5]">
                  <VialImage 
                    name={product.name} 
                    mg={product.mg} 
                    group={product.group} 
                    image={product.image}
                    className="rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>

              <div className="p-10 lg:p-14 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                      PHARMA GRADE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      {product.mg}
                    </span>
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter italic uppercase">{product.name}</h2>
                  
                  <div className="flex items-center gap-2">
                     <StarRating rating={product.rating} size={16} />
                     <span className="text-sm font-bold text-slate-900">{product.rating.toFixed(1)}</span>
                     <span className="text-sm text-slate-500">
                       ({product.reviewCount} Research Reviews)
                     </span>
                  </div>

                  <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                    {product.description} Highest purity available for laboratory research. Lyophilized and vacuum sealed for maximum stability.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Select Pack Size</p>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.keys(product.prices) as unknown as UnitType[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedPack(Number(size) as UnitType)}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-1",
                          selectedPack === Number(size) 
                            ? "border-blue-600 bg-blue-50 text-blue-600" 
                            : "border-slate-100 hover:border-slate-200 text-slate-500"
                        )}
                      >
                        <span className="text-sm font-bold">{size} Vial{Number(size) > 1 ? 's' : ''}</span>
                        <span className="text-lg font-black">${product.prices[Number(size) as UnitType].toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                       <Info className="w-4 h-4 text-blue-600" />
                       <span>In Stock & Ready to Ship</span>
                    </div>
                    <span className="text-4xl font-black text-slate-900">${product.prices[selectedPack].toFixed(2)}</span>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    ADD TO CART
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-800/50 pt-8 mt-4">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                      <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Lab Tested</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Truck className="w-5 h-5 text-blue-500" />
                      <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Package className="w-5 h-5 text-blue-500" />
                      <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Discreet</span>
                    </div>
                </div>

                <div className="bg-red-50/50 border border-red-100 rounded-xl p-3 flex items-center justify-center -mb-2 mt-4">
                   <p className="text-[10px] text-red-600 font-black uppercase tracking-[0.2em] text-center">
                     Strictly for laboratory research use only. Not for human consumption.
                   </p>
                </div>

                {product.coa && (
                  <button 
                    onClick={() => {
                      onBack();
                      window.scrollTo(0, 0);
                      window.dispatchEvent(new CustomEvent('navigate', { detail: 'coa' }));
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 border-2 border-green-100 bg-green-50/50 text-[#00a651] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-all group/coa"
                  >
                    <ShieldCheck className="w-4 h-4 group-hover/coa:scale-110 transition-transform" />
                    VIEW VERIFIED LAB REPORT (COA)
                  </button>
                )}
              </div>
            </div>
      </div>
    </div>
  );
};
