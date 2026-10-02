import React, { useCallback, useEffect, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartItem } from "./types";
import { PRODUCTS } from "./constants";
import { PAGES, POLICIES } from "./content";
import { navigate, linkTo, useRoute } from "./lib/router";
import { AgeGate } from "./components/AgeGate";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Collection } from "./components/Collection";
import { ProductPage } from "./components/ProductPage";
import { CartDrawer } from "./components/CartDrawer";
import { SearchOverlay } from "./components/SearchOverlay";
import { Checkout } from "./components/Checkout";
import { ContactPage, InfoPageView } from "./components/InfoPages";

const CART_KEY = "ascend_cart";

const paypalOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb",
  currency: "USD",
  intent: "capture",
  "enable-funding": "venmo",
};

const loadCart = (): CartItem[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    // Drop anything that no longer matches the catalog (e.g. carts from the old site).
    return Array.isArray(saved)
      ? saved.filter((i: CartItem) => PRODUCTS.some(p => p.id === i.productId && p.variants.some(v => v.size === i.size && v.price === i.price)))
      : [];
  } catch {
    return [];
  }
};

export default function App() {
  const route = useRoute();
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    const titles: Record<string, string> = {
      home: "AscendLabz | Research Peptides",
      checkout: "Checkout | AscendLabz",
      contact: "Contact | AscendLabz",
      "not-found": "Page not found | AscendLabz",
    };
    if (route.name === "page") document.title = `${PAGES[route.slug].title} | AscendLabz`;
    else if (route.name === "policy") document.title = `${POLICIES[route.slug].title} | AscendLabz`;
    else if (titles[route.name]) document.title = titles[route.name];
  }, [route]);

  const addToCart = useCallback((item: CartItem, open = true) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      return existing
        ? prev.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
        : [...prev, item];
    });
    if (open) setCartOpen(true);
  }, []);

  const buyNow = useCallback((item: CartItem) => {
    addToCart(item, false);
    navigate("/checkout");
  }, [addToCart]);

  const updateQuantity = (id: string, delta: number) =>
    setCart(prev => prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)));
  const removeItem = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const closeCart = useCallback(() => setCartOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  let page: React.ReactNode;
  switch (route.name) {
    case "home":
      page = <Home onAddToCart={addToCart} />;
      break;
    case "collection":
      page = <Collection slug={route.slug} onAddToCart={addToCart} />;
      break;
    case "product":
      page = <ProductPage product={PRODUCTS.find(p => p.id === route.id)!} onAddToCart={addToCart} onBuyNow={buyNow} />;
      break;
    case "page":
      page = <InfoPageView page={PAGES[route.slug]} />;
      break;
    case "policy":
      page = <InfoPageView page={POLICIES[route.slug]} />;
      break;
    case "contact":
      page = <ContactPage />;
      break;
    case "checkout":
      page = <Checkout cart={cart} onOrderPlaced={() => setCart([])} />;
      break;
    default:
      page = (
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="text-5xl text-ink">Page not found</h1>
          <p className="mt-4 text-ink-soft">The page you were looking for does not exist.</p>
          <a href="/collections/all-peptides" onClick={linkTo("/collections/all-peptides")} className="btn-primary mt-8">Continue shopping</a>
        </div>
      );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <AgeGate />
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={closeCart}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={() => { setCartOpen(false); navigate("/checkout"); }}
      />
      <div className="flex min-h-screen flex-col">
        <Header cartCount={cart.reduce((n, i) => n + i.quantity, 0)} onOpenCart={() => setCartOpen(true)} onOpenSearch={() => setSearchOpen(true)} />
        <main className="flex-1">{page}</main>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}
