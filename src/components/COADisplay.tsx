import React from 'react';
import { Product } from '../types';

interface COADisplayProps {
  product: Product;
  onClose?: () => void;
}

export const COADisplay: React.FC<COADisplayProps> = ({ product, onClose }) => {
  if (!product.coa) return null;

  const { coa } = product;
  if (!coa.imageUrl) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl max-w-2xl w-full mx-auto">
      <a
        href={coa.imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white"
      >
        <img
          src={coa.imageUrl}
          alt={`${product.name} ${product.mg} Certificate of Analysis`}
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </a>

      {onClose && (
        <div className="p-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors"
          >
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
};
