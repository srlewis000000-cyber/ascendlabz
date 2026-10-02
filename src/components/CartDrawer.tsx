import React, { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { CartItem } from "../types";
import { FREE_SHIPPING_THRESHOLD } from "../constants";
import { bogoDiscountOf, money, subtotalOf } from "../lib/pricing";
import { linkTo } from "../lib/router";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = subtotalOf(items);
  const bogo = bogoDiscountOf(items);
  const total = subtotal - bogo;
  const units = items.reduce((n, i) => n + i.quantity, 0);
  const toFreeShip = FREE_SHIPPING_THRESHOLD - total;
  const toNextFree = units % 3 === 0 ? 3 : 3 - (units % 3);

  return (
    <>
      <div className="fixed inset-0 z-[200] bg-black/50" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-[201] flex h-full w-full max-w-md flex-col bg-white shadow-2xl" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-2xl text-ink">Your cart</h2>
          <button onClick={onClose} className="p-2" aria-label="Close cart"><X className="h-5 w-5" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300" />
            <p className="text-lg text-ink">Your cart is empty</p>
            <a href="/collections/all-peptides" onClick={e => { linkTo("/collections/all-peptides")(e); onClose(); }} className="btn-primary">Continue shopping</a>
          </div>
        ) : (
          <>
            <div className="space-y-1 border-b border-line bg-mist px-5 py-3 text-sm">
              <p className="text-ink">
                {units % 3 === 0
                  ? <>Buy 2, Get 1 Free applied — {units / 3 === 1 ? "1 vial is" : `${units / 3} vials are`} free. Add 3 more for another.</>
                  : toNextFree === 1
                    ? <>Add <strong>1 more vial</strong> and it's free — Buy 2, Get 1 Free.</>
                    : <>Buy 2, Get 1 Free — add <strong>{toNextFree} more vials</strong> to get one free.</>}
              </p>
              <p className="text-ink-soft">
                {toFreeShip > 0 ? <>You're {money(toFreeShip)} away from free shipping.</> : <>You've unlocked free standard shipping.</>}
              </p>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map(item => (
                <li key={item.id} className="flex gap-4 py-4">
                  <img src={item.image} alt="" className="h-20 w-20 shrink-0 rounded-md border border-line object-contain" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-ink">{item.name}</p>
                        <p className="text-sm text-ink-soft">Size: {item.size}</p>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="p-1 text-gray-400 hover:text-red-600" aria-label={`Remove ${item.name}`}><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-line">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-2" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-2" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <span className="font-semibold text-ink">{money(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-line px-5 py-5">
              <div className="flex justify-between text-sm text-ink-soft"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              {bogo > 0 && (
                <div className="flex justify-between text-sm font-semibold text-brand-dark"><span>Buy 2, Get 1 Free</span><span>−{money(bogo)}</span></div>
              )}
              <div className="flex justify-between text-lg font-semibold text-ink"><span>Estimated total</span><span>{money(total)}</span></div>
              <p className="text-xs text-ink-soft">Shipping and promo codes are applied at checkout.</p>
              <button onClick={onCheckout} className="btn-primary w-full py-3.5 text-base">Check out</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};
