import { Product, ProductGroup } from "./types";

export const CATEGORIES: { name: ProductGroup; color: string }[] = [
  { name: "Weight Loss & Metabolic", color: "#3b82f6" }, // Blue
  { name: "Healing & Recovery", color: "#22c55e" }, // Green
  { name: "Growth Hormone & IGF", color: "#f97316" }, // Orange
  { name: "Anti-Aging & Longevity", color: "#a855f7" }, // Purple
  { name: "Sexual Health & Wellness", color: "#ec4899" }, // Pink
  { name: "Cognitive & Neuro", color: "#eab308" }, // Yellow
  { name: "Immune & Inflammation", color: "#ef4444" }, // Red
  { name: "Peptide Blends & Combos", color: "#14b8a6" }, // Teal
];

const createProduct = (name: string, p1: number, p5: number, p10: number, group: ProductGroup, mg: string = "10mg", coa?: Product['coa'], rating: number = 4.7, reviewCount: number = 89, image?: string): Product => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  description: `${name} is a high-purity research peptide synthesized for analytical evaluation. Professional grade lyophilized powder with >99% purity guaranteed. Validated via HPLC/MS for specialized biological observation. Not for human consumption.`,
  prices: { 1: p1, 5: p5, 10: p10 },
  group,
  categoryColor: CATEGORIES.find(c => c.name === group)?.color || "#ffffff",
  mg,
  coa,
  rating,
  reviewCount,
    image: image || undefined
});

const DESCRIPTIONS: Record<string, string> = {
    "Retatrutide": "Retatrutide is a multi-receptor agonist targeting GIP, GLP-1, and glucagon receptors. This research-grade compound is synthesized for analytical studies investigating triple-agonist metabolic pathways and glucose regulation efficiency.",
    "Tirzepatide": "Tirzepatide is a dual GLP-1 and GIP receptor agonist. Our high-fidelity lyophilized peptide is engineered for precise measurement of dual-pathway metabolic activation and lipid metabolism profiling in laboratory environments.",
    "BPC-157": "BPC-157 (Body Protection Compound 157) is a pentadecapeptide derived from human gastric juice. This research material is optimized for in-vitro observation of angiogenic processes and cellular regenerative markers during laboratory trials.",
    "TB-500": "TB-500 is a synthetic version of Thymosin Beta-4. It is provided for analytical research into cellular migration, actin polymerization, and potential wound-healing signal pathways in controlled biological models.",
    "Semaglutide": "Semaglutide is a specialized GLP-1 receptor agonist. This analytic-grade peptide is designed for research applications focused on incretin mimetic effects and weight regulation signaling in biological systems.",
    "Tesamorelin": "Tesamorelin is a growth hormone-releasing hormone (GHRH) analogue. Synthesized to >99% purity for investigating targeted growth hormone secretion and visceral adipose tissue research in clinical-adjacent models.",
    "AOD-9604": "AOD9604 is a C-terminal fragment of the human growth hormone molecule. This research peptide is intended for focused investigations into lipolytic signaling without promoting systemic growth effects.",
    "NAD+": "Nicotinamide Adenine Dinucleotide (NAD+) is an essential coenzyme for redox reactions. Our laboratory-stabilized formulation is prepared for observing cellular energy metabolism and DNA repair mechanism kinetics.",
    "Ipamorelin": "Ipamorelin is a selective GHRP (Growth Hormone Releasing Peptide) agonist. This research-grade material allows for isolated observation of pulsatile growth hormone release without significant cortisol or prolactin activation.",
};

const getDesc = (name: string) => DESCRIPTIONS[name] || `${name} is a high-purity research peptide synthesized for analytical evaluation. Professional grade lyophilized powder with >99% purity guaranteed for specialized biological observation. Not for human consumption.`;

export const PRODUCTS: Product[] = [
  // GROUP 1 — Weight Loss & Metabolic
  { ...createProduct("Retatrutide", 53, 238.5, 424, "Weight Loss & Metabolic", "30mg", {
    taskNumber: "#70490",
    date: "08 JUL 2025",
    purity: "99.780%",
    content: "31.08 mg",
    key: "9ESQLUYRP983"
  }, 4.7, 136), description: getDesc("Retatrutide") },
  { ...createProduct("Tirzepatide", 55, 247.5, 440, "Weight Loss & Metabolic", "30mg", {
    taskNumber: "#70489",
    date: "08 JUL 2025",
    purity: "99.637%",
    content: "31.33 mg",
    key: "9SFDV8AW56HZ"
  }, 4.9, 142), description: getDesc("Tirzepatide") },
  { ...createProduct("Semaglutide", 45, 202.5, 360, "Weight Loss & Metabolic", "10mg", undefined, 4.8, 139), description: getDesc("Semaglutide") },
  createProduct("Cagrilintide", 65, 292.5, 520, "Weight Loss & Metabolic", "10mg", undefined, 4.6, 98),
  createProduct("Survodutide", 70, 315, 560, "Weight Loss & Metabolic", "10mg", undefined, 4.5, 74),
  createProduct("Mazdutide", 70, 315, 560, "Weight Loss & Metabolic", "10mg", undefined, 4.7, 83),
  createProduct("Sema 5mg + Cagri 5mg Blend", 90, 405, 720, "Weight Loss & Metabolic", "10mg", undefined, 4.8, 112),
  { ...createProduct("AOD-9604", 60, 270, 480, "Weight Loss & Metabolic", "10mg", undefined, 4.6, 91), description: getDesc("AOD-9604") },
  createProduct("Adipotide", 95, 427.5, 760, "Weight Loss & Metabolic", "10mg", undefined, 4.4, 67),
  createProduct("5-amino-1mq", 100, 450, 800, "Weight Loss & Metabolic", "10mg", undefined, 4.3, 55),
  createProduct("Lemon Bottle", 45, 202.5, 360, "Weight Loss & Metabolic", "10mg", undefined, 4.7, 103),

  // GROUP 2 — Healing & Recovery
  { ...createProduct("BPC-157", 55, 247.5, 440, "Healing & Recovery", "10mg", {
    taskNumber: "#70491",
    date: "08 JUL 2025",
    purity: "99.755%",
    content: "14.04 mg",
    key: "CGNEL1DPZYUQ"
  }, 4.9, 187), description: getDesc("BPC-157") },
  { ...createProduct("TB-500", 60, 270, 480, "Healing & Recovery", "10mg", undefined, 4.8, 143), description: getDesc("TB-500") },
  createProduct("BPC 5mg + TB 5mg Blend", 80, 360, 640, "Healing & Recovery", "10mg", {
    taskNumber: "#70494",
    date: "08 JUL 2025",
    purity: "Mixed Ratio",
    content: "BPC 5.71mg / TB 5.44mg",
    key: "YRQWW55JFKHI"
  }, 4.9, 156),
  createProduct("BPC 10mg + TB 10mg Blend", 130, 585, 1040, "Healing & Recovery", "10mg", undefined, 4.8, 128),
  createProduct("Glow (BPC+GHK-Cu+TB)", 150, 675, 1200, "Healing & Recovery", "70mg", {
    taskNumber: "#70495",
    date: "10 JUL 2025",
    purity: "99.612%",
    content: "72.1 mg",
    key: "GLOW9XKPZMVW"
  }, 4.7, 94),
  createProduct("KPV (Lysine-Proline-Valine)", 60, 270, 480, "Healing & Recovery", "10mg", undefined, 4.6, 77),

  // GROUP 3 — Growth Hormone & IGF
  { ...createProduct("Ipamorelin", 48, 216, 384, "Growth Hormone & IGF", "10mg", undefined, 4.8, 162), description: getDesc("Ipamorelin") },
  createProduct("CJC-1295 No DAC", 50, 225, 400, "Growth Hormone & IGF", "10mg", undefined, 4.7, 118),
  createProduct("CJC-1295 DAC", 60, 270, 480, "Growth Hormone & IGF", "10mg", undefined, 4.6, 99),
  createProduct("CJC No DAC 5mg + IPA 5mg", 85, 382.5, 680, "Growth Hormone & IGF", "10mg", undefined, 4.9, 134),
  createProduct("Sermorelin", 45, 202.5, 360, "Growth Hormone & IGF", "10mg", undefined, 4.5, 86),
  { ...createProduct("Tesamorelin", 100, 450, 800, "Growth Hormone & IGF", "10mg", {
    taskNumber: "#70492",
    date: "09 JUL 2025",
    purity: "99.841%",
    content: "10.22 mg",
    key: "TESM3RLN4829"
  }, 4.8, 109), description: getDesc("Tesamorelin") },
  createProduct("GHRP-2", 45, 202.5, 360, "Growth Hormone & IGF", "10mg", undefined, 4.4, 72),
  createProduct("GHRP-6", 45, 202.5, 360, "Growth Hormone & IGF", "10mg", undefined, 4.5, 88),
  createProduct("IGF-1 LR3", 90, 405, 720, "Growth Hormone & IGF", "10mg", undefined, 4.7, 116),
  createProduct("Hexarelin Acetate", 50, 225, 400, "Growth Hormone & IGF", "10mg", undefined, 4.6, 81),
  createProduct("GHRP-2 / GHRP-6", 45, 202.5, 360, "Growth Hormone & IGF", "10mg", undefined, 4.5, 67),
  createProduct("MOTs-c", 75, 337.5, 600, "Growth Hormone & IGF", "10mg", undefined, 4.7, 93),
  createProduct("SS-31", 110, 495, 880, "Growth Hormone & IGF", "10mg", undefined, 4.6, 58),

  // GROUP 4 — Anti-Aging & Longevity
  createProduct("GHK-CU / AHK-CU", 80, 360, 640, "Anti-Aging & Longevity", "10mg", undefined, 4.8, 147),
  { ...createProduct("NAD+", 80, 360, 640, "Anti-Aging & Longevity", "10mg", undefined, 4.7, 133), description: getDesc("NAD+") },
  createProduct("Glutathione", 40, 180, 320, "Anti-Aging & Longevity", "10mg", undefined, 4.6, 119),
  createProduct("Epitalon", 50, 225, 400, "Anti-Aging & Longevity", "10mg", undefined, 4.5, 97),
  createProduct("Thymalin / Thymosin Alpha-1", 65, 292.5, 520, "Anti-Aging & Longevity", "10mg", undefined, 4.7, 88),
  createProduct("Cerebrolysin", 90, 405, 720, "Anti-Aging & Longevity", "10mg", undefined, 4.8, 76),
  createProduct("Pinealon", 70, 315, 560, "Anti-Aging & Longevity", "10mg", undefined, 4.4, 63),

  // GROUP 5 — Sexual Health & Wellness
  createProduct("MT-2 (Melanotan 2)", 40, 180, 320, "Sexual Health & Wellness", "10mg", undefined, 4.6, 124),
  createProduct("Melanotan 1", 45, 202.5, 360, "Sexual Health & Wellness", "10mg", undefined, 4.5, 91),
  createProduct("PT-141", 55, 247.5, 440, "Sexual Health & Wellness", "10mg", undefined, 4.8, 138),
  createProduct("Oxytocin", 40, 180, 320, "Sexual Health & Wellness", "10mg", undefined, 4.7, 107),
  createProduct("KissPeptin-10", 55, 247.5, 440, "Sexual Health & Wellness", "10mg", undefined, 4.6, 79),
  createProduct("Alprostadil", 75, 337.5, 600, "Sexual Health & Wellness", "10mg", undefined, 4.5, 66),

  // GROUP 6 — Cognitive & Neuro
  createProduct("Selank / Semax", 55, 247.5, 440, "Cognitive & Neuro", "10mg", undefined, 4.7, 112),
  createProduct("DSIP", 50, 225, 400, "Cognitive & Neuro", "10mg", undefined, 4.5, 84),
  createProduct("Snap-8", 65, 292.5, 520, "Cognitive & Neuro", "10mg", undefined, 4.6, 73),

  // GROUP 7 — Immune & Inflammation
  createProduct("LL37", 85, 382.5, 680, "Immune & Inflammation", "10mg", undefined, 4.7, 96),
  createProduct("Ara-290", 95, 427.5, 760, "Immune & Inflammation", "10mg", undefined, 4.8, 82),
  createProduct("ACE-031 / GDF-8", 120, 540, 960, "Immune & Inflammation", "10mg", undefined, 4.6, 61),

  // GROUP 8 — Peptide Blends & Combos
  createProduct("L-Carnitine / Lipo-C", 45, 202.5, 360, "Peptide Blends & Combos", "10mg", undefined, 4.6, 88),
  createProduct("VIP (Vasoactive Intestinal)", 80, 360, 640, "Peptide Blends & Combos", "10mg", undefined, 4.7, 71),
  createProduct("HCG", 50, 225, 400, "Peptide Blends & Combos", "10mg", undefined, 4.8, 143),
  createProduct("CU50+TB10+BC10+KPV10", 180, 810, 1440, "Peptide Blends & Combos", "10mg", undefined, 4.9, 167),
];
