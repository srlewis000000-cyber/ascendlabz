// Vercel Edge Middleware (works with Vite SPA on Vercel)
// Rewrites <title>, <meta description>, <link rel="canonical"> and OG/Twitter tags
// per route BEFORE the response leaves the edge — so Googlebot sees correct SEO
// without needing to render JavaScript.

export const config = {
  matcher: [
    // Run on every path EXCEPT static assets, Vercel internals, and known asset dirs.
    '/((?!_next/|_vercel/|assets/|coas/|favicon\\.|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
};

const BASE_URL = 'https://www.ascendlabz.org';

interface SeoEntry {
  title: string;
  description: string;
}

// Product slug -> friendly name + 1-line research description.
const PRODUCTS: Record<string, { name: string; lead: string }> = {
  'retatrutide':              { name: 'Retatrutide',              lead: 'GLP-1/GIP/glucagon triple-agonist peptide for weight-management research' },
  'tirzepatide':              { name: 'Tirzepatide',              lead: 'Dual GIP/GLP-1 receptor agonist peptide for metabolic research' },
  'semaglutide':              { name: 'Semaglutide',              lead: 'GLP-1 receptor agonist peptide for metabolic and weight research' },
  'cagrilintide':             { name: 'Cagrilintide',             lead: 'Long-acting amylin analog peptide for satiety research' },
  'survodutide':              { name: 'Survodutide',              lead: 'GLP-1 / glucagon dual-agonist peptide for metabolic research' },
  'mazdutide':                { name: 'Mazdutide',                lead: 'GLP-1 / glucagon co-agonist peptide for weight research' },
  'aod-9604':                 { name: 'AOD-9604',                 lead: 'Modified hGH fragment peptide for lipid-metabolism research' },
  'cagrilintide-semaglutide': { name: 'Cagrilintide + Semaglutide', lead: 'Amylin + GLP-1 blend peptide for combined metabolic research' },
  'bpc-157':                  { name: 'BPC-157',                  lead: 'Body Protective Compound peptide for healing & recovery research' },
  'tb-500':                   { name: 'TB-500',                   lead: 'Thymosin Beta-4 fragment peptide for tissue-repair research' },
  'bpc-tb-stack':             { name: 'BPC-157 + TB-500 Stack',   lead: 'Combined BPC-157 and TB-500 peptide blend for recovery research' },
  'glow-stack':               { name: 'Glow Stack',               lead: 'BPC-157 + GHK-Cu + TB-500 blend peptide for skin & repair research' },
  'multi-repair-stack':       { name: 'Multi Repair Stack',       lead: 'Multi-peptide repair blend for advanced recovery research' },
  'ghk-cu':                   { name: 'GHK-Cu',                   lead: 'Copper tripeptide for skin and tissue-regeneration research' },
  'ahk-cu':                   { name: 'AHK-Cu',                   lead: 'Copper tripeptide for hair-follicle research' },
  'sermorelin':               { name: 'Sermorelin',               lead: 'GHRH analog peptide for growth-hormone-axis research' },
  'tesamorelin':              { name: 'Tesamorelin',              lead: 'GHRH analog peptide for visceral-fat and GH research' },
  'ipamorelin':               { name: 'Ipamorelin',               lead: 'Selective GH-secretagogue peptide for endocrine research' },
  'hexarelin':                { name: 'Hexarelin',                lead: 'Potent GH-releasing hexapeptide for endocrine research' },
  'ghrp-2':                   { name: 'GHRP-2',                   lead: 'Growth-hormone-releasing peptide for endocrine research' },
  'ghrp-6':                   { name: 'GHRP-6',                   lead: 'Growth-hormone-releasing peptide for endocrine research' },
  'igf-1-lr3':                { name: 'IGF-1 LR3',                lead: 'Long R3 insulin-like growth factor peptide for anabolic research' },
  'gdf-8':                    { name: 'GDF-8 (Myostatin)',        lead: 'Myostatin peptide for muscle-physiology research' },
  'ace-031':                  { name: 'ACE-031',                  lead: 'Soluble ActRIIB decoy peptide for muscle research' },
  'nad-plus':                 { name: 'NAD+',                     lead: 'NAD+ precursor for cellular-energy and longevity research' },
  '5-amino-1mq':              { name: '5-Amino-1MQ',              lead: 'NNMT inhibitor compound for metabolic-aging research' },
  'mots-c':                   { name: 'MOTS-c',                   lead: 'Mitochondrial-derived peptide for metabolic research' },
  'epitalon':                 { name: 'Epitalon',                 lead: 'Pineal tetrapeptide for telomere and longevity research' },
  'cerebrolysin':             { name: 'Cerebrolysin',             lead: 'Neurotrophic peptide blend for neuro-protection research' },
  'slu-pp-332':               { name: 'SLU-PP-332',               lead: 'ERR pan-agonist compound for metabolic-fitness research' },
  'ss-31':                    { name: 'SS-31',                    lead: 'Mitochondria-targeted peptide for cellular-energy research' },
  'pt-141':                   { name: 'PT-141 (Bremelanotide)',   lead: 'Melanocortin-receptor agonist peptide for libido research' },
  'mt-2':                     { name: 'Melanotan II',             lead: 'Alpha-MSH analog peptide for melanogenesis research' },
  'melanotan-1':              { name: 'Melanotan I',              lead: 'Alpha-MSH analog peptide for tanning-pathway research' },
  'triptorelin':              { name: 'Triptorelin',              lead: 'GnRH analog peptide for endocrine research' },
  'hcg':                      { name: 'HCG',                      lead: 'Human Chorionic Gonadotropin peptide for endocrine research' },
  'kisspeptin-10':            { name: 'Kisspeptin-10',            lead: 'KISS1R agonist peptide for reproductive-axis research' },
  'oxytocin':                 { name: 'Oxytocin',                 lead: 'Nonapeptide hormone for social-behavior research' },
  'alprostadil':              { name: 'Alprostadil',              lead: 'Prostaglandin E1 compound for vascular research' },
  'insulin':                  { name: 'Insulin',                  lead: 'Recombinant insulin for metabolic research' },
  'selank':                   { name: 'Selank',                   lead: 'Anxiolytic nootropic peptide for neuro research' },
  'semax':                    { name: 'Semax',                    lead: 'ACTH-derived nootropic peptide for cognitive research' },
  'snap-8':                   { name: 'Snap-8',                   lead: 'Acetyl octapeptide for cosmetic-peptide research' },
  'pinealon':                 { name: 'Pinealon',                 lead: 'Tripeptide for neuro-aging research' },
  'thymosin-alpha-1':         { name: 'Thymosin Alpha-1',         lead: 'Immunomodulating peptide for immune-research applications' },
  'thymalin':                 { name: 'Thymalin',                 lead: 'Thymic peptide blend for immune-aging research' },
  'll-37':                    { name: 'LL-37',                    lead: 'Cathelicidin antimicrobial peptide for immunity research' },
  'kpv':                      { name: 'KPV',                      lead: 'Alpha-MSH C-terminal tripeptide for anti-inflammatory research' },
  'ara-290':                  { name: 'Ara-290',                  lead: 'Erythropoietin-derived peptide for tissue-protection research' },
  'adipotide':                { name: 'Adipotide (FTPP)',         lead: 'Pro-apoptotic peptide for adipose-tissue research' },
  'glutathione':              { name: 'Glutathione',              lead: 'Tripeptide antioxidant for cellular-research applications' },
  'hyaluronic-acid':          { name: 'Hyaluronic Acid',          lead: 'Glycosaminoglycan compound for connective-tissue research' },
  'lipo-c-b12':               { name: 'Lipo-C + B12',             lead: 'Lipotropic + B12 blend for metabolic-research applications' },
  'l-carnitine':              { name: 'L-Carnitine',              lead: 'Quaternary ammonium compound for fat-metabolism research' },
  'lemon-bottle':             { name: 'Lemon Bottle',             lead: 'Lipolytic solution blend for adipose-research applications' },
};

const STATIC_ROUTES: Record<string, SeoEntry> = {
  '/': {
    title: 'AscendLabz | #1 Most Affordable Retatrutide, Tirzepatide & Research Peptides Online',
    description: 'AscendLabz — buy affordable research peptides online. Retatrutide, Tirzepatide, Semaglutide & Cagrilintide with 99%+ purity, third-party COA, fast US shipping.',
  },
  '/shop': {
    title: 'Shop Research Peptides | AscendLabz',
    description: 'Browse 50+ research peptides at AscendLabz. Retatrutide, Tirzepatide, BPC-157, GHK-Cu and more — 99%+ purity, verified by third-party COA.',
  },
  '/coa': {
    title: 'Certificates of Analysis (COA) | AscendLabz',
    description: 'View third-party Janoshik HPLC certificates of analysis for AscendLabz research peptides. Verified purity, real lab reports, traceable batch keys.',
  },
  '/about': {
    title: 'About AscendLabz | Research Peptides You Can Trust',
    description: 'AscendLabz supplies high-purity research peptides with third-party verified COAs and fast US shipping. Learn about our quality standards.',
  },
  '/faq': {
    title: 'FAQ | AscendLabz Research Peptides',
    description: 'Answers to common questions about AscendLabz: ordering, shipping, peptide purity, COAs, payment methods and more.',
  },
  '/contact': {
    title: 'Contact AscendLabz | Research Peptide Support',
    description: 'Get in touch with the AscendLabz team for order questions, COA requests, or general support.',
  },
  '/privacy': {
    title: 'Privacy Policy | AscendLabz',
    description: 'AscendLabz privacy policy. How we collect, use, and protect your information.',
  },
  '/terms': {
    title: 'Terms of Service | AscendLabz',
    description: 'AscendLabz terms of service. Research-use-only disclaimer and conditions of sale.',
  },
  '/policies': {
    title: 'Policies | AscendLabz',
    description: 'AscendLabz shipping, returns, and research-use policies.',
  },
  '/lab-solutions': {
    title: 'Lab Solutions | AscendLabz',
    description: 'AscendLabz lab solutions — research peptides and supporting compounds for in-vitro and pre-clinical research.',
  },
  '/performance-portal': {
    title: 'Performance Portal | AscendLabz',
    description: 'AscendLabz performance portal for tracking research-peptide projects.',
  },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

function resolveSeo(pathname: string): { seo: SeoEntry; canonicalPath: string } {
  let p = pathname;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  const lower = p.toLowerCase();

  if (STATIC_ROUTES[lower]) {
    return { seo: STATIC_ROUTES[lower], canonicalPath: lower };
  }

  const slug = lower.replace(/^\//, '');
  if (PRODUCTS[slug]) {
    const prod = PRODUCTS[slug];
    return {
      seo: {
        title: `Buy ${prod.name} Online | Research Peptide | AscendLabz`,
        description: `${prod.lead}. 99%+ purity, third-party COA, fast US shipping from AscendLabz.`,
      },
      canonicalPath: lower,
    };
  }

  return { seo: STATIC_ROUTES['/'], canonicalPath: lower || '/' };
}

function rewriteHtml(html: string, seo: SeoEntry, canonicalUrl: string): string {
  const title = escapeHtml(seo.title);
  const description = escapeAttr(seo.description);
  const url = escapeAttr(canonicalUrl);

  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  out = out.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${description}" />`,
  );

  out = out.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`,
  );

  out = out.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`,
  );

  out = out.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:title" content="${title}" />`,
  );

  out = out.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:description" content="${description}" />`,
  );

  out = out.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:title" content="${title}" />`,
  );

  out = out.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:description" content="${description}" />`,
  );

  return out;
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;

  if (request.method !== 'GET') {
    return fetch(request);
  }

  // Avoid recursion when the middleware fetches /index.html.
  if (request.headers.get('x-mw-passthrough') === '1') {
    return fetch(request);
  }

  // Fetch the underlying static index.html from the same origin.
  const indexUrl = new URL('/index.html', url.origin);
  const res = await fetch(indexUrl.toString(), {
    headers: { 'x-mw-passthrough': '1' },
  });

  const contentType = res.headers.get('content-type') || '';
  if (!res.ok || !contentType.includes('text/html')) {
    // Fall back to whatever Vercel would have served.
    return fetch(request);
  }

  const original = await res.text();
  const { seo, canonicalPath } = resolveSeo(pathname);
  const canonicalUrl = BASE_URL + (canonicalPath === '/' ? '/' : canonicalPath);
  const rewritten = rewriteHtml(original, seo, canonicalUrl);

  const headers = new Headers();
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('cache-control', 'public, s-maxage=300, stale-while-revalidate=86400');
  headers.set('x-seo-middleware', 'v1');

  return new Response(rewritten, { status: 200, headers });
}
