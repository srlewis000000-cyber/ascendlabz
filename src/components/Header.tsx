import React, { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { CATEGORIES } from "../constants";
import { linkTo } from "../lib/router";
import { cn } from "../lib/utils";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

const NAV = [
  { label: "Home", to: "/" },
  { label: "Catalog", to: "/collections/all-peptides" },
  { label: "Contact", to: "/pages/contact" },
  { label: "About & FAQ", to: "/pages/about-us-faq" },
];

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  // Close menus on navigation.
  useEffect(() => {
    const close = () => { setMenuOpen(false); setCatOpen(false); };
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  const link = "text-[15px] text-ink hover:text-brand transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-navy px-4 py-2 text-center text-xs font-medium text-white sm:text-[13px]">
        Buy 2, Get 1 Free on research peptides — automatically applied at checkout · Free shipping on orders over $150
      </div>

      <div className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20">
          <button className="-ml-2 p-2 lg:hidden" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <a href="/" onClick={linkTo("/")} className="font-display text-2xl tracking-wide text-ink lg:mr-6">
            ASCEND<span className="text-brand">LABZ</span>
          </a>

          <nav className="hidden flex-1 items-center gap-7 lg:flex" aria-label="Main">
            <a href="/" onClick={linkTo("/")} className={link}>Home</a>
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className={cn(link, "flex items-center gap-1 py-6")} onClick={() => setCatOpen(o => !o)} aria-expanded={catOpen}>
                Shop by Category <ChevronDown className="h-4 w-4" />
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full w-64 rounded-b-lg border border-line bg-white py-2 shadow-lg">
                  {CATEGORIES.map(c => (
                    <a key={c.slug} href={`/collections/${c.slug}`} onClick={linkTo(`/collections/${c.slug}`)} className="block px-5 py-2.5 text-sm text-ink hover:bg-mist hover:text-brand">
                      {c.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {NAV.slice(1).map(n => (
              <a key={n.to} href={n.to} onClick={linkTo(n.to)} className={link}>{n.label}</a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button onClick={onOpenSearch} className="p-2 hover:text-brand" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={onOpenCart} className="relative p-2 hover:text-brand" aria-label={`Cart, ${cartCount} items`}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="max-h-[calc(100vh-6rem)] overflow-y-auto border-b border-line bg-white px-4 pb-4 lg:hidden" aria-label="Mobile">
          <a href="/" onClick={linkTo("/")} className="block border-b border-line py-3.5">Home</a>
          <p className="pb-1 pt-3.5 text-xs font-semibold uppercase tracking-wider text-ink-soft">Shop by Category</p>
          {CATEGORIES.map(c => (
            <a key={c.slug} href={`/collections/${c.slug}`} onClick={linkTo(`/collections/${c.slug}`)} className="block py-2 pl-3 text-ink">
              {c.name}
            </a>
          ))}
          {NAV.slice(1).map(n => (
            <a key={n.to} href={n.to} onClick={linkTo(n.to)} className="block border-t border-line py-3.5">{n.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
};
