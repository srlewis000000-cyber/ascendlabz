import { CartItem } from "../types";
import { FREE_SHIPPING_THRESHOLD } from "../constants";

export const money = (n: number) => "$" + n.toFixed(2);

export const subtotalOf = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

/**
 * Buy 2, Get 1 Free: across every vial in the cart, each group of three makes
 * the cheapest vial in that group free. Units are sorted high-to-low so the
 * customer always gets the lowest-priced vials free (matches Shopify's BXGY).
 */
export const bogoDiscountOf = (items: CartItem[]) => {
  const units = items
    .flatMap(i => Array.from({ length: i.quantity }, () => i.price))
    .sort((a, b) => b - a);
  let discount = 0;
  for (let i = 2; i < units.length; i += 3) discount += units[i];
  return discount;
};

export const PROMO_CODES: Record<string, number> = { RESEARCH10: 0.1 };

export const promoDiscountOf = (code: string, amount: number) =>
  amount * (PROMO_CODES[code.trim().toUpperCase()] ?? 0);

export const SHIPPING_METHODS = [
  { id: "standard", name: "Standard", time: "5-7 business days", price: 6.99 },
  { id: "express", name: "Express", time: "2-3 business days", price: 16.99 },
  { id: "overnight", name: "Overnight", time: "Next business day", price: 28.99 },
] as const;

export type ShippingMethodId = (typeof SHIPPING_METHODS)[number]["id"];

export const shippingCostOf = (method: ShippingMethodId, merchandiseTotal: number) => {
  if (method === "standard" && merchandiseTotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_METHODS.find(m => m.id === method)!.price;
};

export const totalsOf = (items: CartItem[], promoCode: string, method: ShippingMethodId) => {
  const subtotal = subtotalOf(items);
  const bogo = bogoDiscountOf(items);
  const promo = promoDiscountOf(promoCode, subtotal - bogo);
  const merchandise = subtotal - bogo - promo;
  const shipping = shippingCostOf(method, merchandise);
  return { subtotal, bogo, promo, merchandise, shipping, total: merchandise + shipping };
};
