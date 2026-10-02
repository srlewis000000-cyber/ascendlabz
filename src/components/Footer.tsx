import React, { useState } from "react";
import { FlaskConical, Lock } from "lucide-react";
import { linkTo } from "../lib/router";
import { CONTACT } from "../content";

const QUICK_LINKS = [
  { label: "Catalog", to: "/collections/all-peptides" },
  { label: "Contact", to: "/pages/contact" },
  { label: "About & FAQ", to: "/pages/about-us-faq" },
  { label: "Quality & Testing", to: "/pages/quality-testing" },
  { label: "Research Use Policy", to: "/pages/research-use-policy" },
];

const POLICY_LINKS = [
  { label: "Refund Policy", to: "/policies/refund-policy" },
  { label: "Privacy Policy", to: "/policies/privacy-policy" },
  { label: "Terms of Service", to: "/policies/terms-of-service" },
  { label: "Shipping Policy", to: "/policies/shipping-policy" },
];

const PAYMENT_MARKS = ["PayPal", "Venmo", "Visa", "Mastercard", "Amex", "Bitcoin"];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: "service_0kztjcw", template_id: "template_72gxbfl", user_id: "WSYK-Hg-ybgwidKVK", template_params: { subscriber_email: email } }),
      });
    } catch {}
  };

  return (
    <footer className="mt-auto">
      <div className="border-y border-line bg-mist">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-sm text-ink-soft">
          <span className="flex items-center gap-2 font-semibold text-ink"><Lock className="h-4 w-4 text-brand" /> Secure Checkout</span>
          <span className="flex flex-wrap justify-center gap-2">
            {PAYMENT_MARKS.map(m => (
              <span key={m} className="rounded border border-line bg-white px-2 py-1 text-xs font-semibold text-ink">{m}</span>
            ))}
          </span>
          <span className="flex items-center gap-2 font-semibold text-ink"><FlaskConical className="h-4 w-4 text-brand" /> Third-Party Lab Tested</span>
        </div>
      </div>

      <div className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="text-2xl">Get 10% off your first order</h2>
            <p className="mt-2 max-w-md text-sm text-gray-300">
              Sign up for restock alerts, or add 3 compounds to your cart for our automatic Buy 2, Get 1 Free offer.
            </p>
            {done ? (
              <p className="mt-4 text-sm font-semibold text-teal-300">Thanks for signing up! Use code RESEARCH10 at checkout for 10% off.</p>
            ) : (
              <form onSubmit={subscribe} className="mt-4 flex max-w-md gap-2">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input id="footer-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-teal-400 focus:outline-none" />
                <button className="btn-primary shrink-0">Sign up</button>
              </form>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {QUICK_LINKS.map(l => (
                <li key={l.to}><a href={l.to} onClick={linkTo(l.to)} className="hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {POLICY_LINKS.map(l => (
                <li key={l.to}><a href={l.to} onClick={linkTo(l.to)} className="hover:text-white">{l.label}</a></li>
              ))}
            </ul>
            <div className="mt-5 space-y-1 text-sm text-gray-300">
              <a href={`mailto:${CONTACT.email}`} className="block hover:text-white">{CONTACT.email}</a>
              <a href={CONTACT.phoneHref} className="block hover:text-white">{CONTACT.phone}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 text-xs text-gray-400 sm:px-6">
            <p>All products are sold for in-vitro laboratory research use only. Not for human or veterinary use. Not evaluated by the FDA. Must be 21+ to purchase.</p>
            <p>© {new Date().getFullYear()} AscendLabz</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
