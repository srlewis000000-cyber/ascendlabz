import { Product, ProductGroup } from "./types";

// Catalog mirrored from the AscendLabz Shopify store. Image 1 is the vial shot,
// image 2 is the Janoshik Certificate of Analysis for the current batch.

export const CATEGORIES: { name: ProductGroup; slug: string; description: string }[] = [
  { name: "Tissue Repair Research", slug: "tissue-repair-research", description: "Peptides studied in tissue-repair research, including BPC-157, TB-500, GHK-Cu, KPV and CJC-1295. Every compound ships with a third-party Certificate of Analysis confirming 99%+ purity via HPLC/MS." },
  { name: "Cellular Research", slug: "cognitive-mood-longevity", description: "Peptides studied in cellular, cognitive, and longevity research, including Thymosin Alpha-1, MOTS-c, IGF-1 LR3, and NAD+. Every compound in this collection ships with a third-party Certificate of Analysis confirming 99%+ purity via HPLC/MS." },
  { name: "Dermal Research", slug: "skin-anti-aging-wellness", description: "Peptides studied for skin and dermal research, including Glutathione and Melanotan II. Every compound ships with a third-party Certificate of Analysis confirming 99%+ purity via HPLC/MS." },
  { name: "Secretagogue Research", slug: "secretagogue-research", description: "Growth-hormone secretagogue peptides for endocrine research. Every compound ships with a third-party Certificate of Analysis confirming 99%+ purity via HPLC/MS." },
  { name: "Cognitive Research", slug: "cognitive-research", description: "Peptides studied in cognitive and neuro research, including Selank and Semax. Every compound ships with a third-party Certificate of Analysis confirming 99%+ purity via HPLC/MS." },
];

export const ALL_PEPTIDES_DESCRIPTION =
  "The full AscendLabz catalog: research peptides spanning tissue repair, metabolic, cellular, and dermal research. Every batch is independently tested via HPLC/MS, with a Certificate of Analysis available for each product. For in-vitro laboratory research use only.";

export const FREE_SHIPPING_THRESHOLD = 150;

export const PRODUCTS: Product[] = [
  {
    id: "mt-2",
    name: "Melanotan II (MT-2)",
    group: "Dermal Research",
    variants: [{ size: "10mg", price: 30.99, compareAt: 35.99 }],
    purity: "99.79%",
    image: "/products/mt-2-1.jpg",
    coaImage: "/products/mt-2-2.jpg",
    description: [
      "Melanotan II (MT-2) is a synthetic analog of alpha-melanocyte-stimulating hormone (a-MSH), used in laboratory research investigating melanocortin receptor activity, pigmentation pathways, and appetite-regulation models. Each production lot is manufactured as a lyophilized powder and independently verified via HPLC/MS at greater than 99% purity — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: Store lyophilized, unmixed vials in a freezer, protected from light, until ready for use. Reconstitute with bacteriostatic water in a controlled laboratory setting only. Once reconstituted, keep refrigerated and follow your lab's protocol for use window; discard if the solution appears cloudy or discolored.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    group: "Tissue Repair Research",
    variants: [{ size: "50mg", price: 30.99, compareAt: 35.99 }, { size: "100mg", price: 40.99, compareAt: 47.99 }],
    purity: "99.49%",
    image: "/products/ghk-cu-1.jpg",
    coaImage: "/products/ghk-cu-2.jpg",
    description: [
      "GHK-Cu is a naturally occurring copper-binding tripeptide studied extensively in dermal and connective tissue research for its role in collagen synthesis, tissue-repair signaling, and antioxidant activity at the cellular level. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "semax",
    name: "Semax",
    group: "Cognitive Research",
    variants: [{ size: "5mg", price: 35.99, compareAt: 45.99 }, { size: "10mg", price: 45.99, compareAt: 58.99 }],
    purity: "99.69%",
    image: "/products/semax-1.jpg",
    coaImage: "/products/semax-2.jpg",
    description: [
      "Semax is a synthetic peptide analog of ACTH(4-10), studied in neuroscience research for its nootropic and neuroprotective properties, including effects on BDNF expression and cognitive performance in animal models. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "kpv",
    name: "KPV",
    group: "Tissue Repair Research",
    variants: [{ size: "5mg", price: 31.99 }, { size: "10mg", price: 39.10 }],
    purity: "99.613%",
    image: "/products/kpv-1.jpg",
    coaImage: "/products/kpv-2.jpg",
    description: [
      "KPV is a tripeptide fragment (Lys-Pro-Val) derived from the C-terminus of alpha-MSH, studied for its effects on inflammatory signaling pathways independent of melanocortin receptor pigmentation effects, including research into gut and skin inflammation models. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "glutathione",
    name: "Glutathione",
    group: "Dermal Research",
    variants: [{ size: "600mg", price: 29.99 }],
    purity: "99.840%",
    image: "/products/glutathione-1.jpg",
    coaImage: "/products/glutathione-2.jpg",
    description: [
      "Glutathione is the body's primary intracellular antioxidant, a tripeptide of glutamine, cysteine, and glycine studied for its role in oxidative stress regulation, detoxification pathways, and cellular redox balance. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    group: "Cellular Research",
    variants: [{ size: "5mg", price: 26.99, compareAt: 29.99 }, { size: "10mg", price: 32.99, compareAt: 36.99 }],
    purity: "99.81%",
    image: "/products/thymosin-alpha-1-1.jpg",
    coaImage: "/products/thymosin-alpha-1-2.jpg",
    description: [
      "Thymosin Alpha-1 is a synthetic peptide fragment of prothymosin alpha, widely studied in immunology research for its role in modulating T-cell function and immune response pathways. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "mots-c",
    name: "MOTS-c",
    group: "Cellular Research",
    variants: [{ size: "10mg", price: 35.99 }, { size: "40mg", price: 58.99 }],
    purity: "99.86%",
    image: "/products/mots-c-1.jpg",
    coaImage: "/products/mots-c-2.jpg",
    description: [
      "MOTS-c is a mitochondrial-derived peptide studied in metabolic research for its role in regulating insulin sensitivity, energy homeostasis, and exercise-induced cellular adaptation. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "ipamorelin",
    name: "Ipamorelin",
    group: "Secretagogue Research",
    variants: [{ size: "5mg", price: 27.99, compareAt: 31.99 }, { size: "10mg", price: 33.99, compareAt: 38.99 }],
    purity: "99.77%",
    image: "/products/ipamorelin-1.jpg",
    coaImage: "/products/ipamorelin-2.jpg",
    description: [
      "Ipamorelin is a selective growth hormone secretagogue (a ghrelin receptor agonist) studied for its ability to stimulate pulsatile GH release with minimal effect on cortisol or prolactin, making it a frequent pairing with GHRH analogs like CJC-1295 in growth hormone axis research. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "igf-1-lr3",
    name: "IGF-1 LR3",
    group: "Cellular Research",
    variants: [{ size: "0.1mg", price: 25.99 }, { size: "1mg", price: 60.99 }],
    purity: "99.79%",
    image: "/products/igf-1-lr3-1.jpg",
    coaImage: "/products/igf-1-lr3-2.jpg",
    description: [
      "IGF-1 LR3 is a long-acting analog of insulin-like growth factor 1, modified to resist protein binding and extend its biological half-life relative to native IGF-1, making it a common tool in cell proliferation and muscle tissue growth research. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "selank",
    name: "Selank",
    group: "Cognitive Research",
    variants: [{ size: "5mg", price: 25.99, compareAt: 31.99 }, { size: "10mg", price: 35.99, compareAt: 43.99 }],
    purity: "99.83%",
    image: "/products/selank-1.jpg",
    coaImage: "/products/selank-2.jpg",
    description: [
      "Selank is a synthetic heptapeptide analog of the immunomodulator tuftsin, studied in neuroscience research for its effects on stress-response and cognitive signaling pathways. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "nad-plus",
    name: "NAD+",
    group: "Cellular Research",
    variants: [{ size: "100mg", price: 34.99 }, { size: "500mg", price: 45.99 }, { size: "1000mg", price: 65.99 }],
    purity: "99.14%",
    image: "/products/nad-plus-1.jpg",
    coaImage: "/products/nad-plus-2.jpg",
    description: [
      "NAD+ (nicotinamide adenine dinucleotide) is a coenzyme central to cellular energy metabolism, studied for its role in mitochondrial function, DNA repair signaling, and age-related decline in NAD+ availability. Independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "tb-500",
    name: "TB-500",
    group: "Tissue Repair Research",
    variants: [{ size: "5mg", price: 28.99 }, { size: "10mg", price: 36.99 }],
    purity: "99.78%",
    image: "/products/tb-500-1.jpg",
    coaImage: "/products/tb-500-2.jpg",
    description: [
      "TB-500 is a synthetic fragment of Thymosin Beta-4, a naturally occurring peptide studied in tissue-repair and regenerative research for its role in actin regulation, cell migration, and tissue-repairsignaling pathways. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    group: "Tissue Repair Research",
    variants: [{ size: "5mg", price: 27.99 }, { size: "10mg", price: 35.99 }],
    purity: "99.755%",
    image: "/products/bpc-157-1.jpg",
    coaImage: "/products/bpc-157-2.png",
    description: [
      "BPC-157 is a pentadecapeptide derived from a protective protein found in gastric juice, extensively studied in tissue-repair research for its effects on angiogenesis, tendon and ligament tissue-repair mechanisms, and gut barrier integrity in animal models. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "cjc-1295-no-dac",
    name: "CJC-1295 (No DAC)",
    group: "Tissue Repair Research",
    variants: [{ size: "5mg", price: 29.99 }, { size: "10mg", price: 35.99 }],
    purity: "99.755%",
    image: "/products/cjc-1295-no-dac-1.jpg",
    coaImage: "/products/cjc-1295-no-dac-2.jpg",
    description: [
      "CJC-1295 (No DAC), also known as Mod GRF 1-29, is a GHRH analog with a short half-life, commonly studied alongside GHRP-series compounds (such as Ipamorelin) for pulsatile growth hormone secretion research. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
  {
    id: "cjc-1295-with-dac",
    name: "CJC-1295 (With DAC)",
    group: "Tissue Repair Research",
    variants: [{ size: "5mg", price: 33.99, compareAt: 38.19 }, { size: "10mg", price: 39.99, compareAt: 44.99 }],
    purity: "99.840%",
    image: "/products/cjc-1295-with-dac-1.jpg",
    coaImage: "/products/cjc-1295-with-dac-2.jpg",
    description: [
      "CJC-1295 with DAC (Drug Affinity Complex) is a modified GHRH analog researched for its extended half-life relative to unmodified GHRH, making it a common tool in studies of sustained growth hormone and IGF-1 secretion patterns. Manufactured as a lyophilized powder and independently verified via HPLC/MS for purity above 99% — see the attached Certificate of Analysis for this batch.",
      "Reconstitution & Storage: store lyophilized vials in a freezer, protected from light. Reconstitute with bacteriostatic water in a controlled laboratory setting only; once mixed, refrigerate and follow your lab's protocol for use window.",
      "For in-vitro laboratory research use only. Not for human or veterinary use, not a drug, food, or cosmetic, and has not been evaluated by the FDA."
    ],
  },
];

export const FEATURED_IDS = ["mt-2", "ghk-cu", "semax", "kpv", "glutathione", "thymosin-alpha-1", "mots-c", "ipamorelin"];
