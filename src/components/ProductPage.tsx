import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, FileText, Minus, Plus, X } from "lucide-react";
import { Product, CartItem } from "../types";
import { PRODUCTS } from "../constants";
import { linkTo } from "../lib/router";
import { money } from "../lib/pricing";
import { cn } from "../lib/utils";
import { ProductCard } from "./ProductCard";
import { ProductSchema } from "./ProductSchema";

interface ProductPageProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}

const ACCORDIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Storage & Handling",
    body: "Store lyophilized vials in a freezer, protected from light, until ready for use. Reconstitute with bacteriostatic water in a controlled laboratory setting only. Once reconstituted, keep refrigerated and follow your lab's protocol for the use window.",
  },
  {
    title: "Returns & Refunds",
    body: (
      <>Because these are research chemicals, we can't accept returns once an order ships, except for items that arrive damaged, defective, or incorrect. Contact us within 7 days of delivery with photos and we'll make it right. See the full <a href="/policies/refund-policy" onClick={linkTo("/policies/refund-policy")} className="underline">Refund Policy</a>.</>
    ),
  },
  {
    title: "Shipping",
    body: (
      <>Orders ship within 24 hours of purchase (excluding weekends and holidays) with tracking emailed once shipped. Standard shipping is free on orders over $150. See the full <a href="/policies/shipping-policy" onClick={linkTo("/policies/shipping-policy")} className="underline">Shipping Policy</a>.</>
    ),
  },
  {
    title: "Lab Testing & Purity",
    body: (
      <>Every batch is independently tested by Janoshik Analytical via HPLC/MS. The Certificate of Analysis for the current batch is shown in the product images and can be verified with the unique key printed on it at janoshik.com/verify. Learn more on our <a href="/pages/quality-testing" onClick={linkTo("/pages/quality-testing")} className="underline">Quality & Testing</a> page.</>
    ),
  },
];

export const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [imageIdx, setImageIdx] = useState(0);
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [showCoa, setShowCoa] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => { setVariantIdx(0); setQty(1); setImageIdx(0); setOpenAcc(null); }, [product.id]);

  useEffect(() => {
    document.title = `${product.name} | AscendLabz`;
    return () => { document.title = "AscendLabz | Research Peptides"; };
  }, [product.name]);

  const variant = product.variants[variantIdx];
  const images = [product.image, product.coaImage];
  const related = useMemo(() => {
    const same = PRODUCTS.filter(p => p.group === product.group && p.id !== product.id);
    const rest = PRODUCTS.filter(p => p.group !== product.group && p.id !== product.id);
    return [...same, ...rest].slice(0, 4);
  }, [product.id, product.group]);

  const item = (): CartItem => ({
    id: `${product.id}-${variant.size}`,
    productId: product.id,
    name: product.name,
    size: variant.size,
    price: variant.price,
    quantity: qty,
    image: product.image,
  });

  const add = () => {
    onAddToCart(item());
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <ProductSchema product={product} />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <img src={images[imageIdx]} alt={imageIdx === 0 ? product.name : `${product.name} Certificate of Analysis`} className="aspect-square w-full object-contain" />
          </div>
          <div className="mt-3 flex gap-3">
            {images.map((src, i) => (
              <button key={src} onClick={() => setImageIdx(i)} className={cn("h-20 w-20 overflow-hidden rounded-md border-2 bg-white", i === imageIdx ? "border-ink" : "border-line")} aria-label={i === 0 ? "Show product image" : "Show Certificate of Analysis"}>
                <img src={src} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <h1 className="text-3xl text-ink sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className={cn("text-2xl font-semibold", variant.compareAt ? "text-sale" : "text-ink")}>{money(variant.price)}</span>
            {variant.compareAt && variant.compareAt > variant.price && (
              <>
                <span className="text-lg text-ink-soft line-through">{money(variant.compareAt)}</span>
                <span className="rounded-full bg-ink px-3 py-0.5 text-xs font-semibold text-white">Sale</span>
              </>
            )}
          </div>

          <p className="mt-4 text-sm text-ink-soft">Lab-Tested for Purity | COA Verified | Secure Checkout | Free Shipping on Orders $150+</p>

          <div className="mt-5 space-y-2">
            <p className="rounded-md border border-brand/30 bg-brand-soft px-4 py-2.5 text-sm font-semibold text-brand-dark">
              This Batch: {product.purity} Purity (HPLC/MS Verified)
            </p>
            <p className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white">
              Buy 2, Get 1 Free — automatically applied at checkout, no code needed
            </p>
          </div>

          <fieldset className="mt-6">
            <legend className="mb-2 text-sm text-ink">Size</legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <button key={v.size} onClick={() => setVariantIdx(i)} className={cn("min-w-20 rounded-full border px-5 py-2 text-sm transition-colors", i === variantIdx ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink")} aria-pressed={i === variantIdx}>
                  {v.size}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <p className="mb-2 text-sm text-ink">Quantity</p>
            <div className="inline-flex items-center rounded-md border border-line">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 hover:text-brand" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center" aria-live="polite">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-3 hover:text-brand" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button onClick={add} className="btn-outline w-full py-3.5 text-base">
              {added ? <><Check className="h-5 w-5" /> Added to cart</> : "Add to cart"}
            </button>
            <button onClick={() => onBuyNow(item())} className="btn-primary w-full py-3.5 text-base">Buy it now</button>
          </div>

          <button onClick={() => setShowCoa(true)} className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-dark underline underline-offset-4">
            <FileText className="h-4 w-4" /> View Certificate of Analysis (COA)
          </button>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" /> In stock
          </p>

          <div className="mt-6 divide-y divide-line border-y border-line">
            {ACCORDIONS.map((a, i) => (
              <div key={a.title}>
                <button onClick={() => setOpenAcc(openAcc === i ? null : i)} className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold text-ink" aria-expanded={openAcc === i}>
                  {a.title}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openAcc === i && "rotate-180")} />
                </button>
                {openAcc === i && <div className="pb-4 text-sm leading-relaxed text-ink-soft">{a.body}</div>}
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
            {product.description.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="mb-6 text-2xl text-ink">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
          </div>
        </section>
      )}

      {showCoa && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4" onClick={() => setShowCoa(false)} role="dialog" aria-modal="true" aria-label={`${product.name} Certificate of Analysis`}>
          <div className="relative max-h-full overflow-auto rounded-lg bg-white" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowCoa(false)} className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow" aria-label="Close"><X className="h-5 w-5" /></button>
            <img src={product.coaImage} alt={`${product.name} Certificate of Analysis`} className="max-h-[85vh] w-auto" />
          </div>
        </div>
      )}
    </div>
  );
};
