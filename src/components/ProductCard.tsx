import React from "react";
import { Product, CartItem } from "../types";
import { linkTo } from "../lib/router";
import { money } from "../lib/pricing";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

export const lowestVariant = (p: Product) =>
  p.variants.reduce((min, v) => (v.price < min.price ? v : min), p.variants[0]);

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const v = lowestVariant(product);
  const onSale = product.variants.some(x => x.compareAt && x.compareAt > x.price);
  const href = `/products/${product.id}`;
  const single = product.variants.length === 1;

  const add = () =>
    onAddToCart({
      id: `${product.id}-${v.size}`,
      productId: product.id,
      name: product.name,
      size: v.size,
      price: v.price,
      quantity: 1,
      image: product.image,
    });

  return (
    <div className="group flex flex-col">
      <a href={href} onClick={linkTo(href)} className="relative block overflow-hidden rounded-lg bg-white">
        {onSale && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">Sale</span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </a>
      <div className="flex flex-1 flex-col pt-3">
        <a href={href} onClick={linkTo(href)} className="text-[15px] font-semibold text-ink hover:text-brand">
          {product.name}
        </a>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[15px]">
          {!single && <span className="text-sm text-ink-soft">From</span>}
          <span className={onSale ? "font-semibold text-sale" : "font-semibold text-ink"}>{money(v.price)}</span>
          {v.compareAt && v.compareAt > v.price && (
            <span className="text-sm text-ink-soft line-through">{money(v.compareAt)}</span>
          )}
        </div>
        {single ? (
          <button onClick={add} className="btn-outline mt-3 w-full py-2.5">Add to cart</button>
        ) : (
          <a href={href} onClick={linkTo(href)} className="btn-outline mt-3 w-full py-2.5">Choose options</a>
        )}
      </div>
    </div>
  );
};
