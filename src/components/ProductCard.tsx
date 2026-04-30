import React from 'react';
import { Plus, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, CartItem } from '../types';
import { VialImage } from './VialImage';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onViewProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewProduct }) => {
  const lowestPrice = Math.min(...product.dosages.map(d => d.prices[1]));
  const firstDosage = product.dosages[0];
  const hasMultipleDosages = product.dosages.length > 1;

  const handleView = () => {
    try {
      const stored = localStorage.getItem('recently_viewed');
      let viewed = stored ? JSON.parse(stored) : [];
      viewed = viewed.filter((id: string) => id !== product.id);
      viewed.unshift(product.id);
      if (viewed.length > 5) viewed = viewed.slice(0, 5);
      localStorage.setItem('recently_viewed', JSON.stringify(viewed));
    } catch {}
    if (onViewProduct) onViewProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      id: product.id + '-' + firstDosage.mg + '-1',
      name: product.name,
      price: firstDosage.prices[1],
      quantity: 1,
      mg: firstDosage.mg,
      vials: 1,
      image: product.image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer group flex flex-col"
      onClick={handleView}
    >
      <div className="relative">
        <button
          onClick={(e) => { e.stopPropagation(); if (navigator.share) { navigator.share({ title: product.name, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); } }}
          className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 backdrop-blur-sm rounded-full text-gray-400 hover:text-white transition-colors"
          aria-label="Share product"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
        {hasMultipleDosages ? (
          <div className="absolute top-3 left-3 z-10 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.dosages.length} sizes
          </div>
        ) : (
          <div className="absolute top-3 left-3 z-10 bg-gray-800/90 backdrop-blur-sm text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
            {firstDosage.mg}
          </div>
        )}
        <VialImage
          productId={product.id}
          category={product.category}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-base mb-1 line-clamp-2 leading-snug">{product.name}</h3>
        {(
          <div className="flex flex-wrap gap-1 mb-2">
            {product.dosages.map(d => (
              <span key={d.mg} className="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
                {d.mg}
              </span>
            ))}
          </div>
        )}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 leading-none mb-0.5">from</p>
            <p className="text-green-400 font-bold text-lg leading-none">{'$' + lowestPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleQuickAdd}
            className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
            aria-label="Quick add to cart"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
