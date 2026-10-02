// Build-time SEO for the Vite SPA on Vercel. After `vite build`, writes
// dist/<route>/index.html for every store URL with the right <title>,
// description, canonical and OG tags (so crawlers see them without running JS),
// and generates dist/sitemap.xml from the same route list.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORIES, PRODUCTS, ALL_PEPTIDES_DESCRIPTION } from "../src/constants";
import { PAGES, POLICIES } from "../src/content";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const INDEX = resolve(DIST, "index.html");
const BASE_URL = "https://www.ascendlabz.org";

interface Seo { path: string; title: string; description: string; image?: string; priority: string }

const clip = (s: string, n = 158) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…");
const firstText = (blocks: { p?: string }[]) => blocks.find(b => b.p)?.p ?? "";

const routes: Seo[] = [
  { path: "/", title: "AscendLabz | Research Peptides", description: "Research peptides, verified batch by batch. 99%+ purity, third-party HPLC/MS tested with a Certificate of Analysis for every product. Ships within 24 hours.", priority: "1.0" },
  { path: "/collections/all-peptides", title: "All Peptides | AscendLabz", description: clip(ALL_PEPTIDES_DESCRIPTION), priority: "0.9" },
  ...CATEGORIES.map(c => ({ path: `/collections/${c.slug}`, title: `${c.name} | AscendLabz`, description: clip(c.description), priority: "0.8" })),
  ...PRODUCTS.map(p => ({ path: `/products/${p.id}`, title: `${p.name} | AscendLabz`, description: clip(p.description[0]), image: p.image, priority: "0.9" })),
  { path: "/pages/contact", title: "Contact | AscendLabz", description: "Questions about an order or a research peptide? Email ascendlabz@gmail.com or call (720) 781-9031. We respond within 1-2 business days.", priority: "0.5" },
  ...Object.entries(PAGES).map(([slug, pg]) => ({ path: `/pages/${slug}`, title: `${pg.title} | AscendLabz`, description: clip(firstText(pg.blocks as { p?: string }[])), priority: "0.6" })),
  ...Object.entries(POLICIES).map(([slug, pg]) => ({ path: `/policies/${slug}`, title: `${pg.title} | AscendLabz`, description: clip(firstText(pg.blocks as { p?: string }[])), priority: "0.3" })),
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function rewrite(html: string, r: Seo) {
  const url = BASE_URL + r.path;
  const title = esc(r.title);
  const desc = esc(r.description);
  const set = (re: RegExp, tag: string) => (html = html.replace(re, tag));
  set(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  set(/<meta name="description"[^>]*>/, `<meta name="description" content="${desc}" />`);
  set(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  set(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  set(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
  set(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${desc}" />`);
  set(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}" />`);
  set(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${desc}" />`);
  if (r.image) {
    set(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${BASE_URL}${r.image}" />`);
    set(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${BASE_URL}${r.image}" />`);
  }
  return html;
}

if (!existsSync(INDEX)) {
  console.error("[prerender-seo] dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const template = readFileSync(INDEX, "utf8");
for (const r of routes) {
  const dir = r.path === "/" ? DIST : resolve(DIST, r.path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), rewrite(template, r));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url><loc>${BASE_URL}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join("\n")}
</urlset>
`;
writeFileSync(resolve(DIST, "sitemap.xml"), sitemap);

console.log(`[prerender-seo] wrote ${routes.length} pages and sitemap.xml`);
