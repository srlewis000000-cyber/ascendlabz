import { Product, ProductGroup, ProductDosage } from "./types";

export const CATEGORIES: { name: ProductGroup; color: string }[] = [
  { name: "Weight Loss & Metabolic", color: "#3b82f6" },
  { name: "Healing & Recovery", color: "#22c55e" },
  { name: "Growth Hormone & IGF", color: "#f97316" },
  { name: "Anti-Aging & Longevity", color: "#a855f7" },
  { name: "Sexual Health & Wellness", color: "#ec4899" },
  { name: "Cognitive & Neuro", color: "#eab308" },
  { name: "Immune & Inflammation", color: "#ef4444" },
  { name: "Peptide Blends & Combos", color: "#14b8a6" },
  ];

const d = (mg: string, p1: number, p5: number, p10: number, p20: number, coa?: ProductDosage['coa']): ProductDosage => ({
    mg,
    prices: { 1: p1, 5: p5, 10: p10, 20: p20 },
    ...(coa ? { coa } : {}),
});

const p = (
    id: string,
    name: string,
    group: ProductGroup,
    dosages: ProductDosage[],
    rating: number = 4.7,
    reviewCount: number = 89,
    image?: string
  ): Product => ({
      id,
      name,
      description: `${name} is a high-purity research peptide synthesized for analytical evaluation. Professional grade lyophilized powder with >99% purity guaranteed. Validated via HPLC/MS for specialized biological observation. Not for human consumption.`,
      dosages,
      prices: dosages[0].prices,
      group,
      categoryColor: CATEGORIES.find(c => c.name === group)?.color || "#ffffff",
      mg: dosages[0].mg,
      coa: dosages[0].coa,
      rating,
      reviewCount,
      image,
  });

export const PRODUCTS: Product[] = [
    p("retatrutide", "Retatrutide", "Weight Loss & Metabolic", [
          d("5mg", 46, 211.60, 391, 717.60),
          d("10mg", 54, 248.40, 459, 842.40, { taskNumber: "RT-2024-047", date: "2024-03-15", purity: "99.2%", content: "10.1mg", key: "retatrutide-10mg" }),
          d("15mg", 79, 363.40, 671.50, 1232.40),
          d("20mg", 94, 432.40, 799, 1466.40),
          d("30mg", 119, 547.40, 1011.50, 1856.40),
          d("40mg", 149, 685.40, 1266.50, 2324.40),
          d("50mg", 164, 754.40, 1394, 2558.40),
          d("60mg", 179, 823.40, 1521.50, 2792.40),
        ], 4.9, 142),
    p("tirzepatide", "Tirzepatide", "Weight Loss & Metabolic", [
          d("5mg", 32.20, 148.12, 273.70, 502.32),
          d("10mg", 57, 262.20, 484.50, 889.20, { taskNumber: "TZ-2024-031", date: "2024-02-20", purity: "99.5%", content: "10.2mg", key: "tirzepatide-10mg" }),
          d("15mg", 57, 262.20, 484.50, 889.20),
          d("20mg", 61.60, 283.36, 523.60, 960.96),
          d("30mg", 64.40, 296.24, 547.40, 1004.64),
          d("40mg", 78.20, 359.72, 664.70, 1219.92),
          d("50mg", 87.40, 402.04, 742.90, 1363.44),
          d("60mg", 101.20, 465.52, 860.20, 1578.72),
        ], 4.8, 217),
    p("semaglutide", "Semaglutide", "Weight Loss & Metabolic", [
          d("5mg", 26.70, 122.82, 226.95, 416.52),
          d("10mg", 26.70, 122.82, 226.95, 416.52),
          d("15mg", 54.30, 249.78, 461.55, 847.08),
          d("20mg", 72.70, 334.42, 617.95, 1134.12),
          d("30mg", 91.10, 419.06, 774.35, 1421.16),
        ], 4.7, 183),
    p("cagrilintide", "Cagrilintide", "Weight Loss & Metabolic", [
          d("5mg", 36.80, 169.28, 312.80, 574.08),
          d("10mg", 59.80, 275.08, 508.30, 932.88),
        ], 4.8, 96),
    p("survodutide", "Survodutide", "Weight Loss & Metabolic", [
          d("10mg", 67.99, 312.75, 577.92, 1060.64),
        ], 4.6, 44),
    p("mazdutide", "Mazdutide", "Weight Loss & Metabolic", [
          d("10mg", 85, 391, 722.50, 1326),
        ], 4.5, 31),
    p("aod-9604", "AOD-9604", "Weight Loss & Metabolic", [
          d("5mg", 49.99, 229.95, 424.92, 779.84),
        ], 4.5, 67),
    p("cagrilintide-semaglutide", "Cagrilintide + Semaglutide", "Weight Loss & Metabolic", [
          d("10mg", 90, 414, 765, 1404),
        ], 4.8, 52),
    p("bpc-157", "BPC-157", "Healing & Recovery", [
          d("5mg", 23, 105.80, 195.50, 358.80, { taskNumber: "BP-2024-089", date: "2024-01-10", purity: "99.1%", content: "5.1mg", key: "bpc-157-5mg" }),
          d("10mg", 25.70, 118.22, 218.45, 400.92),
        ], 4.8, 204),
    p("tb-500", "TB-500", "Healing & Recovery", [
          d("5mg", 26.70, 122.82, 226.95, 416.52),
          d("10mg", 32.20, 148.12, 273.70, 502.32),
        ], 4.7, 156),
    p("bpc-tb-stack", "BPC-157 + TB-500 Stack", "Healing & Recovery", [
          d("10mg", 40.80, 187.68, 346.80, 636.48),
          d("20mg", 55, 253, 467.50, 858),
        ], 4.9, 112),
    p("glow-stack", "Glow Stack (BPC+TB+GHK)", "Healing & Recovery", [
          d("70mg", 71.25, 327.75, 605.63, 1111.50, { taskNumber: "GL-2024-012", date: "2024-02-05", purity: "98.9%", content: "Blend verified", key: "glow-stack" }),
        ], 4.9, 78),
    p("multi-repair-stack", "Multi Repair Stack", "Healing & Recovery", [
          d("80mg", 63, 289.80, 535.50, 982.80),
        ], 4.8, 63),
    p("ghk-cu", "GHK-Cu", "Healing & Recovery", [
          d("50mg", 10, 46, 85, 156),
          d("100mg", 13.60, 62.56, 115.60, 212.16),
        ], 4.6, 89),
    p("ahk-cu", "AHK-Cu", "Healing & Recovery", [
          d("100mg", 45, 207, 382.50, 702),
        ], 4.5, 41),
    p("sermorelin", "Sermorelin", "Growth Hormone & IGF", [
          d("5mg", 27.60, 126.96, 234.60, 430.56),
          d("10mg", 43.20, 198.72, 367.20, 673.92),
        ], 4.6, 98),
    p("tesamorelin", "Tesamorelin", "Growth Hormone & IGF", [
          d("5mg", 39.60, 182.16, 336.60, 617.76, { taskNumber: "TS-2024-019", date: "2024-03-01", purity: "99.3%", content: "5.0mg", key: "tesamorelin-5mg" }),
          d("10mg", 46, 211.60, 391, 717.60),
        ], 4.7, 74),
    p("ipamorelin", "Ipamorelin", "Growth Hormone & IGF", [
          d("5mg", 27.60, 126.96, 234.60, 430.56),
          d("10mg", 32.20, 148.12, 273.70, 502.32),
        ], 4.7, 131),
    p("hexarelin", "Hexarelin", "Growth Hormone & IGF", [
          d("5mg", 23.24, 106.90, 197.54, 362.54),
        ], 4.5, 49),
    p("ghrp-2", "GHRP-2", "Growth Hormone & IGF", [
          d("5mg", 25, 115, 212.50, 390),
        ], 4.5, 62),
    p("ghrp-6", "GHRP-6", "Growth Hormone & IGF", [
          d("5mg", 25, 115, 212.50, 390),
          d("10mg", 35, 161, 297.50, 546),
        ], 4.5, 58),
    p("igf-1-lr3", "IGF-1 LR3", "Growth Hormone & IGF", [
          d("0.1mg", 20, 92, 170, 312),
          d("1mg", 60, 276, 510, 936),
        ], 4.7, 87),
    p("gdf-8", "GDF-8 (Myostatin)", "Growth Hormone & IGF", [
          d("1mg", 80, 368, 680, 1248),
        ], 4.4, 29),
    p("ace-031", "ACE-031", "Growth Hormone & IGF", [
          d("1mg", 80, 368, 680, 1248),
        ], 4.5, 33),
    p("nad-plus", "NAD+", "Anti-Aging & Longevity", [
          d("100mg", 20, 92, 170, 312),
          d("500mg", 35.64, 163.94, 303.94, 558.86),
          d("1000mg", 35.64, 163.94, 303.94, 558.86),
        ], 4.7, 144),
    p("5-amino-1mq", "5-Amino-1MQ", "Anti-Aging & Longevity", [
          d("5mg", 31.49, 144.85, 267.67, 491.54),
          d("50mg", 31.49, 144.85, 267.67, 491.54),
        ], 4.6, 57),
    p("mots-c", "MOTS-c", "Anti-Aging & Longevity", [
          d("10mg", 32.72, 150.52, 278.12, 510.80),
          d("40mg", 32.72, 150.52, 278.12, 510.80),
        ], 4.6, 48),
    p("epitalon", "Epitalon", "Anti-Aging & Longevity", [
          d("10mg", 24.74, 113.85, 210.39, 386.09),
          d("50mg", 25.49, 117.31, 216.78, 397.82),
        ], 4.7, 93),
    p("cerebrolysin", "Cerebrolysin", "Anti-Aging & Longevity", [
          d("60mg", 55, 253, 467.50, 858),
        ], 4.6, 38),
    p("slu-pp-332", "SLU-PP-332", "Anti-Aging & Longevity", [
          d("10mg", 90, 414, 765, 1404),
        ], 4.5, 22),
    p("ss-31", "SS-31", "Anti-Aging & Longevity", [
          d("10mg", 65, 299, 552.50, 1014),
          d("50mg", 65, 299, 552.50, 1014),
        ], 4.6, 41),
    p("pt-141", "PT-141 (Bremelanotide)", "Sexual Health & Wellness", [
          d("10mg", 24.29, 111.73, 206.47, 379.54),
        ], 4.7, 118),
    p("mt-2", "Melanotan II (MT-2)", "Sexual Health & Wellness", [
          d("10mg", 45, 207, 382.50, 702),
        ], 4.6, 84),
    p("melanotan-1", "Melanotan 1", "Sexual Health & Wellness", [
          d("10mg", 50, 230, 425, 780),
        ], 4.5, 61),
    p("triptorelin", "Triptorelin", "Sexual Health & Wellness", [
          d("2mg", 25, 115, 212.50, 390),
        ], 4.5, 47),
    p("hcg", "HCG", "Sexual Health & Wellness", [
          d("5000iu", 45, 207, 382.50, 702),
          d("10000iu", 90, 414, 765, 1404),
        ], 4.6, 76),
    p("kisspeptin-10", "Kisspeptin-10", "Sexual Health & Wellness", [
          d("5mg", 20, 92, 170, 312),
          d("10mg", 24.65, 113.39, 209.53, 384.06),
        ], 4.5, 39),
    p("oxytocin", "Oxytocin", "Sexual Health & Wellness", [
          d("2mg", 18.74, 86.20, 159.29, 292.80),
        ], 4.6, 88),
    p("alprostadil", "Alprostadil", "Sexual Health & Wellness", [
          d("20mg", 65, 299, 552.50, 1014),
        ], 4.5, 35),
    p("insulin", "Insulin", "Sexual Health & Wellness", [
          d("1mg", 25, 115, 212.50, 390),
        ], 4.4, 27),
    p("selank", "Selank", "Cognitive & Neuro", [
          d("5mg", 21.25, 97.75, 180.63, 331.50),
          d("10mg", 21.25, 97.75, 180.63, 331.50),
        ], 4.6, 72),
    p("semax", "Semax", "Cognitive & Neuro", [
          d("5mg", 27.76, 127.70, 235.96, 433.14),
          d("10mg", 27.76, 127.70, 235.96, 433.14),
        ], 4.7, 81),
    p("snap-8", "Snap-8 (Acetyl Octapeptide)", "Cognitive & Neuro", [
          d("10mg", 25.50, 117.30, 216.75, 397.80),
        ], 4.5, 53),
    p("pinealon", "Pinealon", "Cognitive & Neuro", [
          d("5mg", 25, 115, 212.50, 390),
          d("10mg", 29.74, 136.71, 252.79, 463.82),
        ], 4.5, 44),
    p("thymosin-alpha-1", "Thymosin Alpha-1", "Immune & Inflammation", [
          d("5mg", 26.99, 124.15, 229.42, 421.72),
          d("10mg", 26.99, 124.15, 229.42, 421.72),
        ], 4.7, 97),
    p("thymalin", "Thymalin", "Immune & Inflammation", [
          d("10mg", 34.49, 158.63, 293.67, 539.84),
        ], 4.6, 55),
    p("ll-37", "LL-37", "Immune & Inflammation", [
          d("10mg", 75, 345, 637.50, 1170),
        ], 4.6, 48),
    p("kpv", "KPV", "Immune & Inflammation", [
          d("5mg", 31.49, 144.85, 267.67, 491.54),
          d("10mg", 31.49, 144.85, 267.67, 491.54),
        ], 4.6, 61),
    p("ara-290", "Ara-290", "Immune & Inflammation", [
          d("10mg", 29, 133.40, 246.50, 452.40),
        ], 4.5, 38),
    p("adipotide", "Adipotide (FTPP)", "Immune & Inflammation", [
          d("5mg", 45, 207, 382.50, 702),
        ], 4.5, 32),
    p("glutathione", "Glutathione", "Peptide Blends & Combos", [
          d("600mg", 26.24, 120.70, 223.04, 409.34),
        ], 4.7, 103),
    p("hyaluronic-acid", "Hyaluronic Acid", "Peptide Blends & Combos", [
          d("5mg", 20, 92, 170, 312),
        ], 4.5, 67),
    p("lipo-c-b12", "Lipo-C + B12", "Peptide Blends & Combos", [
          d("216mg", 50, 230, 425, 780),
        ], 4.6, 82),
    p("l-carnitine", "L-Carnitine", "Peptide Blends & Combos", [
          d("600mg", 55, 253, 467.50, 858),
        ], 4.6, 74),
    p("lemon-bottle", "Lemon Bottle", "Peptide Blends & Combos", [
          d("10ml", 28.49, 131.01, 242.17, 444.32),
        ], 4.5, 56),
  ];
