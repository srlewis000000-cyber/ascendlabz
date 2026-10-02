import { useEffect, useState, type MouseEvent } from "react";
import { PRODUCTS, CATEGORIES } from "../constants";
import { PAGES, POLICIES } from "../content";

// URLs mirror the old Shopify store (/products/x, /collections/x, /pages/x,
// /policies/x) so existing links and search results keep working.

export type Route =
  | { name: "home" }
  | { name: "collection"; slug: string }
  | { name: "product"; id: string }
  | { name: "page"; slug: string }
  | { name: "policy"; slug: string }
  | { name: "contact" }
  | { name: "checkout" }
  | { name: "not-found" };

const PRODUCT_IDS = new Set(PRODUCTS.map(p => p.id));
const COLLECTION_SLUGS = new Set(["all", "all-peptides", ...CATEGORIES.map(c => c.slug)]);

// Paths from the previous version of this site and Shopify aliases.
const LEGACY: Record<string, string> = {
  shop: "/collections/all-peptides",
  catalog: "/collections/all-peptides",
  collections: "/collections/all-peptides",
  "collections/all": "/collections/all-peptides",
  about: "/pages/about-us-faq",
  faq: "/pages/about-us-faq",
  "pages/about-testing-3": "/pages/about-us-faq",
  coa: "/pages/quality-testing",
  "lab-solutions": "/pages/quality-testing",
  contact: "/pages/contact",
  policies: "/policies/refund-policy",
  terms: "/policies/terms-of-service",
  privacy: "/policies/privacy-policy",
  "melanotan-2": "/products/mt-2",
  cart: "/checkout",
};

export function resolve(pathname: string): { route: Route; redirect?: string } {
  const clean = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (!clean) return { route: { name: "home" } };
  if (LEGACY[clean]) return { route: resolve(LEGACY[clean]).route, redirect: LEGACY[clean] };
  // Old site served products at the root: /bpc-157
  if (PRODUCT_IDS.has(clean)) return { route: { name: "product", id: clean }, redirect: "/products/" + clean };

  const [head, slug, ...rest] = clean.split("/");
  if (rest.length) return { route: { name: "not-found" } };
  if (head === "checkout" && !slug) return { route: { name: "checkout" } };
  if (head === "products" && slug && PRODUCT_IDS.has(slug)) return { route: { name: "product", id: slug } };
  if (head === "collections" && slug && COLLECTION_SLUGS.has(slug)) return { route: { name: "collection", slug } };
  if (head === "pages" && slug === "contact") return { route: { name: "contact" } };
  if (head === "pages" && slug && PAGES[slug]) return { route: { name: "page", slug } };
  if (head === "policies" && slug && POLICIES[slug]) return { route: { name: "policy", slug } };
  return { route: { name: "not-found" } };
}

export function navigate(to: string) {
  if (window.location.pathname + window.location.search === to) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

/** Click handler for internal <a> tags so they route without a full reload. */
export const linkTo = (to: string) => (e: MouseEvent) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  navigate(to);
};

export function useRoute(): Route {
  const read = () => {
    const { route, redirect } = resolve(window.location.pathname);
    if (redirect) window.history.replaceState({}, "", redirect);
    return route;
  };
  const [route, setRoute] = useState<Route>(read);
  useEffect(() => {
    const onPop = () => {
      setRoute(read());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return route;
}
