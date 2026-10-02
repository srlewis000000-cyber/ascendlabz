import React, { useMemo, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Bitcoin, CheckCircle2, Lock } from "lucide-react";
import { db } from "../firebase";
import { CartItem, Order, PaymentMethod } from "../types";
import { money, SHIPPING_METHODS, ShippingMethodId, totalsOf } from "../lib/pricing";
import { linkTo, navigate } from "../lib/router";
import { cn } from "../lib/utils";
import { PayPalIntegration } from "./PayPalIntegration";
import { BitcoinPayment } from "./BitcoinPayment";

const BITCOIN_ADDRESS = import.meta.env.VITE_BITCOIN_ADDRESS || "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

const EMAILJS = { service_id: "service_0kztjcw", user_id: "WSYK-Hg-ybgwidKVK" };

const EMPTY_ADDRESS = { fullName: "", email: "", phone: "", line1: "", line2: "", city: "", state: "", zip: "", country: "United States" };

interface CheckoutProps {
  cart: CartItem[];
  onOrderPlaced: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, onOrderPlaced }) => {
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [shipping, setShipping] = useState<ShippingMethodId>("standard");
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const t = useMemo(() => totalsOf(cart, promoCode, shipping), [cart, promoCode, shipping]);
  const addressValid = ["fullName", "email", "phone", "line1", "city", "state", "zip", "country"].every(k => (address as any)[k].trim());
  const ready = addressValid && agreed;
  const field = (k: keyof typeof EMPTY_ADDRESS) => ({
    value: address[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAddress({ ...address, [k]: e.target.value }),
  });

  const placeOrder = async (method: PaymentMethod, status: Order["status"], details?: unknown) => {
    setPlacing(true);
    setError("");
    const shippingName = SHIPPING_METHODS.find(m => m.id === shipping)!;
    const record: Order = {
      id: `AL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      items: cart,
      total: t.total,
      paymentMethod: method,
      status,
      createdAt: new Date().toISOString(),
      email: address.email,
      shippingAddress: address,
    };
    try {
      await setDoc(doc(db, "orders", record.id), { ...record, totals: t, shippingMethod: shipping, promoCode: promoCode.trim().toUpperCase(), paymentDetails: details || {} });
    } catch (err) {
      // Payment has already been taken at this point, so still confirm the order
      // and rely on the email notification below.
      console.error("Order record failed:", err);
    }
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...EMAILJS,
          template_id: "template_q3h417w",
          template_params: {
            customer_name: address.fullName,
            customer_email: address.email,
            customer_phone: address.phone,
            shipping_address: address.line1 + (address.line2 ? ", " + address.line2 : ""),
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
            shipping_method: `${shippingName.name} (${shippingName.time}) - ${t.shipping === 0 ? "FREE" : money(t.shipping)}`,
            order_items: cart.map(i => `${i.name} ${i.size} x${i.quantity} - ${money(i.price * i.quantity)}`).join(", "),
            subtotal: t.subtotal.toFixed(2),
            discount: (t.bogo + t.promo).toFixed(2),
            shipping_price: t.shipping.toFixed(2),
            total: t.total.toFixed(2),
            payment_method: method,
            order_id: record.id,
            orders: cart.map(i => ({ name: `${i.name} ${i.size}`, units: i.quantity, price: i.price })),
            to_email: address.email,
            reply_to: address.email,
          },
        }),
      });
    } catch (err) {
      console.error("Order email failed:", err);
    }
    try { localStorage.setItem("last_order", JSON.stringify(record)); } catch {}
    setOrder(record);
    setPlacing(false);
    onOrderPlaced();
    window.scrollTo({ top: 0 });
  };

  if (order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand" />
        <h1 className="mt-4 text-4xl text-ink">Thank you for your order</h1>
        <p className="mt-3 text-ink-soft">Order <strong className="text-ink">{order.id}</strong> has been received. A confirmation will be sent to {order.email}, and tracking follows once it ships (usually within 24 hours).</p>
        {order.paymentMethod === "bitcoin" && (
          <p className="mt-4 rounded-md bg-amber-50 p-4 text-sm text-amber-900">Your order ships once your Bitcoin payment is confirmed. Email a screenshot of the transaction to ascendlabz@gmail.com with {order.id} as the subject.</p>
        )}
        <div className="mt-8 space-y-2 rounded-lg border border-line p-5 text-left text-sm">
          {order.items.map(i => (
            <div key={i.id} className="flex justify-between"><span>{i.quantity} × {i.name} ({i.size})</span><span>{money(i.price * i.quantity)}</span></div>
          ))}
          <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><span>Total</span><span>{money(order.total)}</span></div>
        </div>
        <a href="/" onClick={linkTo("/")} className="btn-primary mt-8">Continue shopping</a>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-4xl text-ink">Your cart is empty</h1>
        <a href="/collections/all-peptides" onClick={linkTo("/collections/all-peptides")} className="btn-primary mt-6">Continue shopping</a>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_400px] lg:py-14">
      <div className="order-2 space-y-10 lg:order-1">
        <h1 className="text-4xl text-ink">Checkout</h1>

        <section>
          <h2 className="mb-4 text-xl text-ink">1. Shipping address</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field sm:col-span-2" placeholder="Full name" autoComplete="name" {...field("fullName")} />
            <input className="field" type="email" placeholder="Email" autoComplete="email" {...field("email")} />
            <input className="field" type="tel" placeholder="Phone" autoComplete="tel" {...field("phone")} />
            <input className="field sm:col-span-2" placeholder="Address" autoComplete="address-line1" {...field("line1")} />
            <input className="field sm:col-span-2" placeholder="Apartment, suite, etc. (optional)" autoComplete="address-line2" {...field("line2")} />
            <input className="field" placeholder="City" autoComplete="address-level2" {...field("city")} />
            <input className="field" placeholder="State / Province" autoComplete="address-level1" {...field("state")} />
            <input className="field" placeholder="ZIP / Postal code" autoComplete="postal-code" {...field("zip")} />
            <input className="field" placeholder="Country" autoComplete="country-name" {...field("country")} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl text-ink">2. Shipping method</h2>
          <div className="divide-y divide-line rounded-lg border border-line">
            {SHIPPING_METHODS.map(m => {
              const free = m.id === "standard" && t.merchandise >= 150;
              return (
                <label key={m.id} className={cn("flex cursor-pointer items-center gap-3 px-4 py-3.5", shipping === m.id && "bg-brand-soft")}>
                  <input type="radio" name="shipping" checked={shipping === m.id} onChange={() => setShipping(m.id)} className="accent-[#0f8a7e]" />
                  <span className="flex-1"><span className="font-semibold text-ink">{m.name}</span> <span className="text-sm text-ink-soft">· {m.time}</span></span>
                  <span className="font-semibold text-ink">{free ? "FREE" : money(m.price)}</span>
                </label>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl text-ink">3. Payment</h2>

          <label className={cn("mb-4 flex items-start gap-3 rounded-lg border p-4 text-sm", agreed ? "border-line" : "border-amber-400 bg-amber-50")}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0f8a7e]" />
            <span className="leading-relaxed text-ink-soft">
              I am 21 or older, I agree to the <a href="/policies/terms-of-service" target="_blank" className="font-semibold text-ink underline">Terms of Service</a> and <a href="/pages/research-use-policy" target="_blank" className="font-semibold text-ink underline">Research Use Policy</a>, and I confirm these products are for in-vitro laboratory research only — not for human or veterinary use.
            </span>
          </label>
          {!ready && <p className="mb-4 text-sm text-ink-soft">Fill in your shipping address and check the box above to unlock payment.</p>}

          <div className="grid gap-3 sm:grid-cols-3">
            {([
              { id: "paypal", label: "PayPal / Card", sub: "Pay with PayPal or debit/credit card" },
              { id: "venmo", label: "Venmo", sub: "Pay with Venmo on any device" },
              { id: "bitcoin", label: "Bitcoin", sub: "Send BTC to our wallet" },
            ] as const).map(o => (
              <button key={o.id} onClick={() => setPayment(o.id)} className={cn("rounded-lg border p-4 text-left transition-colors", payment === o.id ? "border-ink ring-1 ring-ink" : "border-line hover:border-ink")} aria-pressed={payment === o.id}>
                <span className="flex items-center gap-2 font-semibold text-ink">{o.id === "bitcoin" && <Bitcoin className="h-4 w-4 text-orange-500" />}{o.label}</span>
                <span className="mt-1 block text-xs text-ink-soft">{o.sub}</span>
              </button>
            ))}
          </div>

          <div className="mt-5">
            {placing && <p className="mb-3 text-sm text-ink-soft">Placing your order…</p>}
            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            {payment === "paypal" && (
              <PayPalIntegration amount={t.total} disabled={!ready || placing} onSuccess={d => placeOrder("paypal", "Paid", d)} onError={() => setError("PayPal couldn't complete the payment. Please try again or choose another method.")} />
            )}
            {payment === "venmo" && (
              <PayPalIntegration amount={t.total} fundingSource="venmo" disabled={!ready || placing} onSuccess={d => placeOrder("venmo", "Paid", d)} onError={() => setError("Venmo couldn't complete the payment. Please try again or choose another method.")} />
            )}
            {payment === "bitcoin" && (
              <BitcoinPayment address={BITCOIN_ADDRESS} amount={t.total} disabled={!ready || placing} onInitiate={() => placeOrder("bitcoin", "Pending Bitcoin Payment")} />
            )}
            {!payment && (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-line py-10 text-sm text-ink-soft">
                <Lock className="h-4 w-4" /> Choose a payment method
              </div>
            )}
          </div>
        </section>
      </div>

      <aside className="order-1 h-fit rounded-lg bg-mist p-5 lg:sticky lg:top-28 lg:order-2">
        <h2 className="mb-4 text-xl text-ink">Order summary</h2>
        <ul className="space-y-3">
          {cart.map(i => (
            <li key={i.id} className="flex items-center gap-3 text-sm">
              <span className="relative">
                <img src={i.image} alt="" className="h-14 w-14 rounded-md border border-line bg-white object-contain" />
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-soft px-1 text-[11px] text-white">{i.quantity}</span>
              </span>
              <span className="flex-1"><span className="block font-semibold text-ink">{i.name}</span><span className="text-ink-soft">{i.size}</span></span>
              <span className="text-ink">{money(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-2">
          <label htmlFor="promo" className="sr-only">Discount code</label>
          <input id="promo" className="field bg-white" placeholder="Discount code" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
        </div>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd>{money(t.subtotal)}</dd></div>
          {t.bogo > 0 && <div className="flex justify-between font-semibold text-brand-dark"><dt>Buy 2, Get 1 Free</dt><dd>−{money(t.bogo)}</dd></div>}
          {t.promo > 0 && <div className="flex justify-between font-semibold text-brand-dark"><dt>{promoCode.trim().toUpperCase()}</dt><dd>−{money(t.promo)}</dd></div>}
          <div className="flex justify-between"><dt className="text-ink-soft">Shipping</dt><dd>{t.shipping === 0 ? "FREE" : money(t.shipping)}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 text-lg font-semibold"><dt>Total</dt><dd>{money(t.total)}</dd></div>
        </dl>
        <button onClick={() => navigate("/collections/all-peptides")} className="mt-4 text-sm text-ink-soft underline">Continue shopping</button>
      </aside>
    </div>
  );
};
