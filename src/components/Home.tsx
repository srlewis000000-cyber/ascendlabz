import React from "react";
import { FlaskConical, Lock, ShieldCheck, Truck, BadgeCheck, ClipboardCheck } from "lucide-react";
import { CATEGORIES, FEATURED_IDS, PRODUCTS } from "../constants";
import { CartItem } from "../types";
import { linkTo } from "../lib/router";
import { ProductCard } from "./ProductCard";

const CATALOG = "/collections/all-peptides";

// One representative vial per category tile.
const CATEGORY_IMAGE: Record<string, string> = {
  "tissue-repair-research": "/products/bpc-157-1.jpg",
  "cognitive-mood-longevity": "/products/thymosin-alpha-1-1.jpg",
  "skin-anti-aging-wellness": "/products/glutathione-1.jpg",
  "secretagogue-research": "/products/ipamorelin-1.jpg",
  "cognitive-research": "/products/semax-1.jpg",
};

export const Home: React.FC<{ onAddToCart: (item: CartItem) => void }> = ({ onAddToCart }) => {
  const featured = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#e9ecef]">
        <img src="/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-[520px]">
          <h1 className="max-w-xl text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">Research peptides, verified batch by batch.</h1>
          <p className="mt-4 max-w-md text-lg text-ink-soft">99%+ purity peptides, third-party lab tested and shipped same day.</p>
          <a href={CATALOG} onClick={linkTo(CATALOG)} className="btn-dark mt-8 self-start px-8 py-3.5 text-base">Shop the Catalog</a>
        </div>
      </section>

      {/* Offer strip */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6">
          <p className="text-lg sm:text-xl"><span className="font-display">Buy 2, Get 1 Free</span> on research peptides — automatically applied at checkout.</p>
          <p className="mt-1 text-sm text-gray-300">Free shipping on orders over $150.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl text-ink sm:text-3xl">Shop by research category</h2>
          <a href={CATALOG} onClick={linkTo(CATALOG)} className="shrink-0 text-sm font-semibold text-ink underline underline-offset-4">View all</a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(c => (
            <a key={c.slug} href={`/collections/${c.slug}`} onClick={linkTo(`/collections/${c.slug}`)} className="group overflow-hidden rounded-lg border border-line bg-white">
              <img src={CATEGORY_IMAGE[c.slug]} alt="" loading="lazy" className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-105" />
              <p className="border-t border-line px-3 py-3 text-center text-sm font-semibold text-ink group-hover:text-brand">{c.name} →</p>
            </a>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl text-ink sm:text-3xl">Featured products</h2>
          <a href={CATALOG} onClick={linkTo(CATALOG)} className="shrink-0 text-sm font-semibold text-ink underline underline-offset-4">View all</a>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {featured.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
        </div>
      </section>

      {/* Three pillars */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {[
            { icon: FlaskConical, title: "Third-Party Tested", body: "Every batch of our peptides is third-party lab tested for purity and identity via HPLC/MS, with a Certificate of Analysis available for each product." },
            { icon: BadgeCheck, title: "99%+ Purity Standard", body: "Results are independently verified via HPLC/MS, consistently confirming purity above 99% for every compound in the catalog." },
            { icon: ClipboardCheck, title: "Research-Use Eligibility", body: "Every order requires researcher affirmation before checkout. Products are sold strictly for laboratory and in-vitro research use." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto h-9 w-9 text-brand" strokeWidth={1.5} />
              <h3 className="mt-4 text-xl text-ink">{title}</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our shop */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl text-ink sm:text-4xl">Our shop</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">We stand for transparent science—every product is formulated, tested, and delivered with clinical rigor so you can optimize without hesitation.</p>
        <a href={CATALOG} onClick={linkTo(CATALOG)} className="mt-6 inline-block font-semibold text-ink underline underline-offset-4">Shop now →</a>
      </section>

      {/* Image with text */}
      <section className="mx-auto max-w-7xl space-y-12 px-4 pb-16 sm:px-6">
        {[
          { img: "/products/kpv-2.jpg", title: "Every Batch, Verified", body: "Every production run is independently tested via HPLC/MS and issued its own Certificate of Analysis, so you always know exactly what's in the vial before you buy.", to: "/pages/quality-testing", cta: "See our testing process" },
          { img: "/products/cjc-1295-with-dac-1.jpg", title: "Built for serious research", body: "From product selection to storage guidance, our team supports researchers at every step, backed by a growing catalog and clear, accurate information you can rely on.", to: CATALOG, cta: "Shop now" },
        ].map((b, i) => (
          <div key={b.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <img src={b.img} alt="" loading="lazy" className={`max-h-[460px] w-full rounded-lg border border-line bg-white object-contain ${i % 2 ? "md:order-2" : ""}`} />
            <div>
              <h2 className="text-3xl text-ink">{b.title}</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{b.body}</p>
              <a href={b.to} onClick={linkTo(b.to)} className="btn-dark mt-6">{b.cta}</a>
            </div>
          </div>
        ))}
      </section>

      {/* Feature grid */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Third-Party Lab Tested", body: "Every batch is verified by an independent lab for 99%+ purity, so you always know exactly what you're getting." },
            { icon: FlaskConical, title: "Every Compound Documented", body: "From growth-hormone secretagogues to cellular and dermal research compounds, every peptide in our catalog is independently lab-tested and documented with a Certificate of Analysis." },
            { icon: Truck, title: "Fast, Reliable Shipping", body: "Orders ship within 24 hours, and shipping is free on orders over $150." },
            { icon: Lock, title: "Secure Checkout", body: "Payments are processed through PayPal's encrypted checkout, so your card details never touch our servers." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="h-7 w-7 text-brand" strokeWidth={1.5} />
              <h3 className="mt-3 text-lg text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
