import React, { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "../constants";
import { navigate } from "../lib/router";
import { money } from "../lib/pricing";
import { lowestVariant } from "./ProductCard";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) { setQuery(""); return; }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.group.toLowerCase().includes(q) ||
      p.description.some(d => d.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  const open = (id: string) => { onClose(); navigate(`/products/${id}`); };

  return (
    <div className="fixed inset-0 z-[150] flex flex-col bg-white" role="dialog" aria-modal="true" aria-label="Search">
      <div className="border-b border-line">
        <div className="mx-auto flex h-20 max-w-3xl items-center gap-3 px-4">
          <Search className="h-5 w-5 text-ink-soft" />
          <input autoFocus type="search" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && results[0] && open(results[0].id)} placeholder="Search" className="flex-1 bg-transparent text-xl text-ink focus:outline-none" aria-label="Search products" />
          <button onClick={onClose} className="p-2" aria-label="Close search"><X className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-4">
          {query.trim() && results.length === 0 && <p className="py-8 text-center text-ink-soft">No results for “{query}”.</p>}
          <ul className="divide-y divide-line">
            {results.map(p => (
              <li key={p.id}>
                <button onClick={() => open(p.id)} className="flex w-full items-center gap-4 py-3 text-left hover:bg-mist">
                  <img src={p.image} alt="" className="h-16 w-16 rounded border border-line object-contain" />
                  <span className="flex-1">
                    <span className="block font-semibold text-ink">{p.name}</span>
                    <span className="block text-sm text-ink-soft">{p.group}</span>
                  </span>
                  <span className="font-semibold text-ink">{money(lowestVariant(p).price)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
