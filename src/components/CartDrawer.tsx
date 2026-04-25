import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { VialImage } from './VialImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  promoCode?: string;
  setPromoCode?: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  promoCode = "",
  setPromoCode
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = promoCode.toUpperCase() === 'RESEARCH10' ? total * 0.1 : 0;
  const finalTotal = total - discountAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[201] w-full max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-slate-100"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                  {items.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                      {items.length}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <ShoppingBag className="w-16 h-16 text-slate-300" />
                  <p className="font-bold text-lg text-slate-400">Your cart is empty</p>
                  <button onClick={onClose} className="text-blue-600 font-bold hover:underline">Start Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm"
                  >
                    <div className="relative w-16 h-16 shrink-0 bg-slate-50 rounded-xl p-0.5 overflow-hidden border border-slate-100 flex items-center justify-center">
                        <VialImage 
                          name={item.name} 
                          mg={item.mg}
                          image={item.image}
                          className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{item.packSize} VIAL PACK</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-black text-slate-900">${item.price}</span>
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 text-slate-400 hover:text-slate-900 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-slate-400 hover:text-slate-900 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-100 space-y-6">
                
                {setPromoCode && (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. RESEARCH10)" 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-400 placeholder:font-normal uppercase"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${total.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-blue-600 text-sm font-bold">
                      <span>Promo Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Shipping</span>
                    <span className={finalTotal >= 150 ? "text-green-600 font-bold uppercase text-[10px]" : "text-slate-400 font-bold uppercase text-[10px]"}>
                      {finalTotal >= 150 ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 text-xl font-black pt-4 border-t border-slate-100">
                    <span>Estimated Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={onCheckout}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/10 flex items-center justify-center gap-3 group"
                  >
                    CHECKOUT NOW
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" />
                    <span>256-bit Secure Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
