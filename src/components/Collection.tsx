import React, { useEffect, useMemo, useState } from "react";
import { ALL_PEPTIDES_DESCRIPTION, CATEGORIES, PRODUCTS } from "../constants";
import { CartItem } from "../types";
import { linkTo } from "../lib/router";
import { cn } from "../lib/utils";
import { ProductCard, lowestVariant } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "az" | "za";

export const Collection: React.FC<{ slug: string; onAddToCart: (item: CartItem) => void }> = ({ slug, onAddToCart }) => {
  const category = CATEGORIES.find(c => c.slug === slug);
  const [sort, setSort] = useState<Sort>("featured");

  useEffect(() => {
    document.title = `${category ? category.name : "All Peptides"} | AscendLabz`;
    return () => { document.title = "AscendLabz | Research Peptides"; };
  }, [category]);

  const products = useMemo(() => {
    const list = category ? PRODUCTS.filter(p => p.group === category.name) : [...PRODUCTS];
    const price = (p: typeof PRODUCTS[number]) => lowestVariant(p).price;
    if (sort === "price-asc") list.sort((a, b) => price(a) - price(b));
    if (sort === "price-desc") list.sort((a, b) => price(b) - price(a));
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [category, sort]);

  const tabs = [{ name: "All Peptides", slug: "all-peptides" }, ...CATEGORIES.map(c => ({ name: c.name.replace(" Research", ""), slug: c.slug }))];
  const active = category ? slug : "all-peptides";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="text-4xl text-ink sm:text-5xl">{category ? category.name : "All Peptides"}</h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{category ? category.description : ALL_PEPTIDES_DESCRIPTION}</p>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Categories">
        {tabs.map(t => (
          <a key={t.slug} href={`/collections/${t.slug}`} onClick={linkTo(`/collections/${t.slug}`)} className={cn("rounded-full border px-4 py-2 text-sm transition-colors", active === t.slug ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink")} aria-current={active === t.slug ? "page" : undefined}>
            {t.name}
          </a>
        ))}
      </nav>

      <div className="mt-6 flex items-center justify-between border-b border-line pb-4 text-sm text-ink-soft">
        <span>{products.length} {products.length === 1 ? "item" : "items"}</span>
        <label className="flex items-center gap-2">
          Sort
          <select value={sort} onChange={e => setSort(e.target.value as Sort)} className="rounded-md border border-line bg-white px-3 py-2 text-ink">
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="az">Alphabetically, A-Z</option>
            <option value="za">Alphabetically, Z-A</option>
          </select>
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
      </div>
    </div>
  );
};
