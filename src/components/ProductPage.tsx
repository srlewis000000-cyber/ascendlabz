import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Share2, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';
import { VialImage } from './VialImage';
import { StarRating } from './StarRating';
import { COADisplay } from './COADisplay';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

const PACK_OPTIONS = [
  { vials: 1, label: '1 Vial', badge: null },
  { vials: 5, label: '5 Vials', badge: 'Save 5%' },
  { vials: 10, label: '10 Vials', badge: 'Save 10%' },
  { vials: 20, label: '20 Vials', badge: 'Best Value' },
];

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onAddToCart }) => {
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

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id + '-' + currentDosage.mg + '-' + selectedPack,
      name: product.name,
      price: getPrice(selectedPack),
      quantity,
      mg: currentDosage.mg,
      vials: selectedPack,
      image: product.image,
    });
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
          <VialImage productId={product.id} category={product.category} className="w-full h-64 object-cover" />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {product.badge}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          {product.description && (
            <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
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
            <span className="ml-auto text-xl font-bold text-green-400">{'$' + totalPrice.toFixed(2)}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={'w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ' + (addedFeedback ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500')}
          >
            <ShoppingCart className="w-5 h-5" />
            {addedFeedback ? 'Added to Cart!' : 'Add to Cart'}
          </motion.button>
        </div>

        {currentDosage.coa && (
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
                    <COADisplay coaData={currentDosage.coa} productName={product.name} />
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
                  <p>Purity: {product.purity || '99%+'} | Storage: -20°C | Lyophilized powder</p>
                  {product.molecularWeight && <p>Molecular Weight: {product.molecularWeight}</p>}
                  {product.sequence && <p className="font-mono text-xs break-all">Sequence: {product.sequence}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
