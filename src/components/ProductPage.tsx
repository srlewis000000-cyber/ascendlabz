import React, { useState, useMemo } from 'react';
import { ArrowLeft, ShoppingCart, Share2, ChevronDown, ChevronUp, Info, ShieldCheck, Truck, FlaskConical, Lock, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';
import { VialImage } from './VialImage';
import { StarRating } from './StarRating';
import { COADisplay } from './COADisplay';
import { ProductSchema } from './ProductSchema';
import { PRODUCTS } from '../constants';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onSelectProduct?: (p: Product) => void;
}

const PACK_OPTIONS = [
  { vials: 1, label: '1 Vial', badge: null },
  { vials: 5, label: '5 Vials', badge: 'Save 5%' },
  { vials: 10, label: '10 Vials', badge: 'Save 10%' },
  { vials: 20, label: '20 Vials', badge: 'Best Value' },
];

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onAddToCart, onSelectProduct }) => {
  const [selectedDosageIdx, setSelectedDosageIdx] = useState(0);
  const [selectedPack, setSelectedPack] = useState(1);
  const [showCOA, setShowCOA] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const currentDosage = product.dosages[selectedDosageIdx];
  const hasMultipleDosages = product.dosages.length > 1;

  const getPrice = (vials: number) => {
    if (vials === 1) return currentDosage.prices[1];
    if (vials === 5) return currentDosage.prices[5] || currentDosage.prices[1] * 5 * 0.95;
    if (vials === 10) return currentDosage.prices[10] || currentDosage.prices[1] * 10 * 0.90;
    if (vials === 20) return currentDosage.prices[20] || currentDosage.prices[1] * 20 * 0.85;
    return currentDosage.prices[1] * vials;
  };

  const totalPrice = getPrice(selectedPack) * quantity;
  const anchorPrice = totalPrice * 1.25;

  const related = useMemo(() => {
    return PRODUCTS.filter(p => p.group === product.group && p.id !== product.id).slice(0, 3);
  }, [product.id, product.group]);

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id + '-' + currentDosage.mg + '-' + selectedPack,
      name: product.name,
      price: getPrice(selectedPack),
      quantity,
      mg: currentDosage.mg,
      vials: selectedPack,
      image: product.image,
    } as any);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <ProductSchema product={product} />
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <button onClick={handleShare} className="p-2 text-gray-400 hover:text-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <div className="relative rounded-2xl overflow-hidden bg-gray-900">
            <VialImage name={product.name} image={product.image} className="w-full h-64 object-cover" />
            {(product as any).badge && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {(product as any).badge}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                In Stock
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-300">
                <FlaskConical className="w-3 h-3" />
                99%+ Purity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <Truck className="w-3 h-3" />
                Discreet US Shipping
              </span>
            </div>

            {(product as any).description && (
              <p className="text-gray-400 text-sm leading-relaxed">{(product as any).description}</p>
            )}
          </div>

          {hasMultipleDosages && (
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Select Dosage</h3>
              <div className="flex flex-wrap gap-2">
                {product.dosages.map((d, idx) => (
                  <button
                    key={d.mg}
                    onClick={() => { setSelectedDosageIdx(idx); setSelectedPack(1); }}
                    className={'px-4 py-2 rounded-lg text-sm font-medium border transition-all ' + (selectedDosageIdx === idx ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500')}
                  >
                    {d.mg}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Select Pack Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {PACK_OPTIONS.map(({ vials, label, badge }) => {
                const price = getPrice(vials);
                const pricePer = price / vials;
                const isSelected = selectedPack === vials;
                return (
                  <button
                    key={vials}
                    onClick={() => setSelectedPack(vials)}
                    className={'relative flex flex-col items-center p-3 rounded-xl border transition-all ' + (isSelected ? 'bg-blue-600/20 border-blue-500' : 'bg-gray-800 border-gray-700 hover:border-gray-500')}
                  >
                    {badge && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        {badge}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 mb-1">{label}</span>
                    <span className={'text-sm font-bold ' + (isSelected ? 'text-blue-300' : 'text-white')}>
                      {'$' + price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-gray-500">{'$' + pricePer.toFixed(2) + '/vial'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Qty:</span>
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors">-</button>
                <span className="w-8 text-center text-white font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors">+</button>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <span className="text-xs text-gray-500 line-through">{'$' + anchorPrice.toFixed(2)}</span>
                <span className="text-xl font-bold text-green-400">{'$' + totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Order today, we ship within 24h (Mon–Fri)</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              style={addedFeedback ? {} : { background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', color: '#1a1a1a', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255,255,255,0.25)' }}
              className={'w-full py-4 rounded-xl font-extrabold text-base flex items-center justify-center gap-2 transition-all ' + (addedFeedback ? 'bg-green-600 text-white' : 'hover:brightness-110')}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedFeedback ? 'Added to Cart!' : 'Add to Cart'}
            </motion.button>

            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="flex flex-col items-center text-center gap-1 text-[10px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Lab Tested</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 text-[10px] text-gray-400">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 text-[10px] text-gray-400">
                <Truck className="w-4 h-4 text-purple-400" />
                <span>Discreet Pkg.</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 text-[10px] text-gray-400">
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span>99%+ Purity</span>
              </div>
            </div>
          </div>

          {(currentDosage.coa || (product as any).coa) && (
            <div>
              <button
                onClick={() => setShowCOA(!showCOA)}
                className="w-full flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">Certificate of Analysis (COA)</span>
                </div>
                {showCOA ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              <AnimatePresence>
                {showCOA && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3">
                      <COADisplay product={{ ...product, coa: (currentDosage.coa || (product as any).coa) } as any} productName={product.name} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
            >
              <span className="text-sm font-medium">Product Details & Research Use</span>
              {showDetails ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-900/50 rounded-b-xl border-x border-b border-gray-700 text-sm text-gray-400 space-y-2">
                    <p>For research purposes only. Not for human consumption.</p>
                    <p>Purity: {(product as any).purity || '99%+'} | Storage: -20°C | Lyophilized powder</p>
                    {(product as any).molecularWeight && <p>Molecular Weight: {(product as any).molecularWeight}</p>}
                    {(product as any).sequence && <p className="font-mono text-xs break-all">Sequence: {(product as any).sequence}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {related.length > 0 && (
            <div className="pt-4 border-t border-gray-800">
              <h2 className="text-lg font-bold text-white mb-1">You May Also Like</h2>
              <p className="text-xs text-gray-500 mb-4">Other researchers in {product.group} also purchased</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {related.map(r => {
                  const rPrice = r.dosages?.[0]?.prices?.[1] ?? (r as any).prices?.[1] ?? 0;
                  return (
                    <button
                      key={r.id}
                      onClick={() => onSelectProduct ? onSelectProduct(r) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="group relative flex flex-col items-start p-3 rounded-xl bg-gray-900 border border-blue-500/15 hover:border-amber-500/50 hover:-translate-y-1 transition-all text-left"
                    >
                      <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-800 mb-2">
                        <VialImage name={r.name} image={r.image} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-semibold text-white line-clamp-1">{r.name}</span>
                      <span className="text-xs text-gray-500 line-clamp-1">{r.dosages?.[0]?.mg || (r as any).mg}</span>
                      <div className="mt-2 flex items-center justify-between w-full">
                        <span className="text-emerald-400 font-bold text-sm">{'$' + Number(rPrice).toFixed(2)}</span>
                        <span className="text-[10px] text-amber-300 group-hover:text-amber-200">View →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
